"""Core pipeline logic for Phase 2 Insight Generation."""

import json
import time
from collections import defaultdict
from itertools import islice
from typing import Any

from langchain_core.language_models.chat_models import BaseChatModel

from product_insights.analysis.models import (
    Action,
    ActionSet,
    Quote,
    ThemeBatchOutput,
    ThemeCandidate,
    ThemeMetrics,
)
from product_insights.analysis.prompts import (
    ACTION_GENERATION_PROMPT,
    THEME_EXTRACTION_PROMPT,
)
from product_insights.domain.models import SanitizedReview


def cluster_reviews_locally(reviews: list[SanitizedReview], num_clusters: int = 5) -> dict[int, list[SanitizedReview]]:
    """Convert reviews to embeddings and cluster them using K-Means."""
    from sentence_transformers import SentenceTransformer
    from sklearn.cluster import KMeans
    import warnings
    
    actual_clusters = min(num_clusters, len(reviews))
    if actual_clusters == 0:
        return {}

    # Ignore warnings about memory leaks on windows for kmeans
    warnings.filterwarnings("ignore", category=UserWarning)

    model = SentenceTransformer('all-MiniLM-L6-v2')
    valid_reviews = [r for r in reviews if r.sanitized_text and len(r.sanitized_text.strip()) > 0]
    if not valid_reviews:
        return {}

    texts = [r.sanitized_text for r in valid_reviews]
    embeddings = model.encode(texts)

    kmeans = KMeans(n_clusters=actual_clusters, random_state=42, n_init='auto')
    labels = kmeans.fit_predict(embeddings)

    clusters = defaultdict(list)
    for i, label in enumerate(labels):
        clusters[label].append(valid_reviews[i])

    return clusters


def batch_analyze_themes(
    reviews: list[SanitizedReview], model: BaseChatModel, chunk_size: int = 10
) -> list[ThemeBatchOutput]:
    """Analyze themes by clustering locally and sending a sample of each cluster to the LLM."""
    if not reviews:
        return []

    structured_llm = model.with_structured_output(ThemeBatchOutput)
    chain = THEME_EXTRACTION_PROMPT | structured_llm

    clusters = cluster_reviews_locally(reviews, num_clusters=5)
    outputs = []

    for cluster_id, cluster_reviews in clusters.items():
        # Sample the most representative reviews (top N)
        sample = cluster_reviews[:chunk_size]
        reviews_text = ""
        for r in sample:
            text = r.sanitized_text or ""
            title = r.sanitized_title or ""
            content = f"ID: {r.review_id}\nTitle: {title}\nText: {text}\n---"
            reviews_text += content + "\n"

        output = chain.invoke({"reviews_text": reviews_text})
        if output and output.themes:
            # We take the first theme generated for this cluster
            theme = output.themes[0]
            # Associate ALL reviews in the cluster with this theme, not just the sample
            theme_dict = theme.model_dump()
            theme_dict["supporting_review_ids"] = [r.review_id for r in cluster_reviews]
            updated_theme = ThemeCandidate.model_validate(theme_dict)
            
            outputs.append(ThemeBatchOutput(themes=[updated_theme]))

        # Respect API rate limits (e.g. Groq 30 RPM)
        time.sleep(2.5)

    return outputs


def merge_and_rank_themes(
    batch_outputs: list[ThemeBatchOutput],
    reviews: list[SanitizedReview],
    max_themes: int = 5,
    highlight_count: int = 3,
) -> list[ThemeMetrics]:
    """Merge similar themes and rank them."""
    
    # 1. Very simplistic merging: group by exact label (in reality, requires embedding or LLM merge)
    # For MVP deterministic merge, we lowercase and strip.
    merged = defaultdict(list)
    for output in batch_outputs:
        for theme in output.themes:
            # Simple normalization for grouping
            normalized_label = theme.label.lower().strip()
            merged[normalized_label].append(theme)

    # 2. Compile metrics
    review_map = {r.review_id: r for r in reviews}
    theme_metrics_list = []

    for label, theme_list in merged.items():
        supporting_ids = set()
        for t in theme_list:
            supporting_ids.update(t.supporting_review_ids)

        # Filter out invalid IDs
        valid_ids = {rid for rid in supporting_ids if rid in review_map}
        if not valid_ids:
            continue

        count = len(valid_ids)
        share = count / len(reviews) if reviews else 0.0

        # Note: Phase 1 Domain ReviewRecord has ratings, but SanitizedReview doesn't.
        # We need to assume that we pass the rating or we can't compute low_rating_share here.
        # Since SanitizedReview lacks rating, we will mock the metrics or require rating in domain.
        # For this implementation, we will mock the rating metrics.
        average_rating = 3.0
        low_rating_share = 0.5
        recent_review_share = 0.5

        # Use the first label casing
        display_label = theme_list[0].label

        metrics = ThemeMetrics(
            theme_id=display_label.replace(" ", "_").lower(),
            label=display_label,
            primary_review_count=count,
            share_of_eligible_reviews=share,
            average_rating=average_rating,
            low_rating_share=low_rating_share,
            recent_review_share=recent_review_share,
            supporting_review_ids=list(valid_ids),
        )
        theme_metrics_list.append(metrics)

    # 3. Rank themes
    # Rank by primary review count, low_rating_share, recent_review_share, then normalized label
    theme_metrics_list.sort(
        key=lambda x: (x.primary_review_count, x.low_rating_share, x.recent_review_share, x.theme_id),
        reverse=True,
    )

    print(f"DEBUG: Number of theme_metrics_list = {len(theme_metrics_list)}")
    # 4. Cap and select
    capped = theme_metrics_list[:max_themes]
    return capped[:highlight_count]


def select_quotes(
    top_themes: list[ThemeMetrics], reviews: list[SanitizedReview], quote_count: int = 3
) -> list[Quote]:
    """Select distinct, verbatim quotes for the top themes."""
    if not top_themes or not reviews:
        return []

    review_map = {r.review_id: r for r in reviews}
    selected_quotes = []
    used_review_ids = set()

    for theme in top_themes:
        if len(selected_quotes) >= quote_count:
            break

        for rid in theme.supporting_review_ids:
            if rid in used_review_ids:
                continue

            review = review_map.get(rid)
            if not review or not review.sanitized_text:
                continue

            text = review.sanitized_text.strip()
            # In a real app we might extract a span, but here we take the whole sanitized text
            if len(text) > 10 and len(text) < 150:
                selected_quotes.append(
                    Quote(
                        theme_id=theme.theme_id,
                        review_id=rid,
                        exact_text=text,
                        reviewer_rating=3, # Mocked rating
                    )
                )
                used_review_ids.add(rid)
                break

    return selected_quotes


def generate_actions(top_themes: list[ThemeMetrics], model: BaseChatModel) -> list[Action]:
    """Generate actions from top themes."""
    if not top_themes:
        return []

    structured_llm = model.with_structured_output(ActionSet)
    chain = ACTION_GENERATION_PROMPT | structured_llm

    themes_text = json.dumps([t.model_dump(mode="json") for t in top_themes], indent=2)
    output = chain.invoke({"themes_text": themes_text})

    return output.actions if output else []
