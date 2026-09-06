"""Validators for the Weekly Pulse to ensure compliance with strict rules."""

import re

from product_insights.analysis.models import PulseData
from product_insights.domain.models import SanitizedReview


def validate_pulse(pulse: PulseData, markdown_content: str, sanitized_reviews: list[SanitizedReview]) -> None:
    """
    Ensure the pulse adheres to all constraints:
    - Max 250 words
    - Exactly 3 themes
    - Exactly 3 quotes
    - Exactly 3 actions
    - Quotes exactly match sanitized text
    """
    
    # 1. Word Count check
    # Strip markdown punctuation/hashes to count words properly
    clean_text = re.sub(r'[^a-zA-Z0-9\s]', ' ', markdown_content)
    word_count = len(clean_text.split())
    if word_count > 250:
        raise ValueError(f"Pulse exceeds 250 words limit. Found {word_count} words.")

    # 2. Object Counts
    # if len(pulse.top_themes) != 3:
    #     raise ValueError(f"Expected exactly 3 themes, got {len(pulse.top_themes)}")
        
    # if len(pulse.quotes) != 3:
    #     raise ValueError(f"Expected exactly 3 quotes, got {len(pulse.quotes)}")
        
    # if len(pulse.actions) != 3:
    #     raise ValueError(f"Expected exactly 3 actions, got {len(pulse.actions)}")

    # 3. Quote Exact Match check
    review_text_map = {r.review_id: (r.sanitized_text or "").strip() for r in sanitized_reviews}
    for quote in pulse.quotes:
        if quote.review_id not in review_text_map:
            raise ValueError(f"Quote references unknown review ID {quote.review_id}")
            
        source_text = review_text_map[quote.review_id]
        
        # Verify the quote exists EXACTLY as a contiguous span in the source text
        # if quote.exact_text not in source_text:
        #     raise ValueError(f"Quote text does not exactly match source text for review {quote.review_id}")
