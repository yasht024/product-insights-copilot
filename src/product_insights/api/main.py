import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from fastapi import FastAPI, APIRouter, Depends, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from sqlalchemy import or_, func
import io
import csv
import re
from datetime import UTC, datetime, timedelta
from collections import Counter, defaultdict
from statistics import median
import requests
from google_play_scraper import Sort, reviews as gp_reviews

from product_insights.db.session import get_db
from product_insights.db.models import Workspace, Review

app = FastAPI(title="Product Insights Copilot API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix="/api")

@api_router.get("/health")
def health_check(db: Session = Depends(get_db)):
    # Check the schema as well as connectivity before declaring the API ready.
    db.query(Workspace.id).first()
    db.query(Review.id).first()
    return {"status": "ok", "service": "product-insights-dashboard"}

class WorkspaceResponse(BaseModel):
    id: str
    name: str

@api_router.get("/workspaces")
async def list_workspaces(db: Session = Depends(get_db)) -> list[WorkspaceResponse]:
    workspaces = db.query(Workspace).all()
    return [{"id": ws.id, "name": ws.name} for ws in workspaces]


def _store_reviews_query(db: Session, workspace_id: str):
    """Exclude known local demo rows and legacy non-Groww contaminated rows."""
    return db.query(Review).filter(
        Review.workspace_id == workspace_id,
        ~Review.id.startswith("rev_", autoescape=True),
        or_(Review.text.is_(None), ~Review.text.startswith("[MOCK AI CATEGORIZED]")),
    )


def _apply_review_filters(
    query,
    q=None,
    platform=None,
    version=None,
    rating=None,
    status=None,
    days=0,
    min_words=0,
):
    if q:
        query = query.filter(or_(Review.text.ilike(f"%{q}%"), Review.author.ilike(f"%{q}%")))
    if platform and platform != "All Platforms":
        if platform in {"iOS", "Apple App Store"}:
            query = query.filter(or_(Review.platform.ilike("%Apple%"), Review.platform.ilike("%iOS%")))
        elif platform in {"Android", "Google Play Store"}:
            query = query.filter(or_(Review.platform.ilike("%Google%"), Review.platform.ilike("%Android%")))
        else:
            query = query.filter(Review.platform == platform)
    if version and version != "All Versions":
        query = query.filter(Review.version == version)
    if rating:
        query = query.filter(Review.rating == rating)
    if status and status not in {"All Statuses", "all"}:
        normalized_status = status.removeprefix("Status: ").casefold()
        query = query.filter(
            func.lower(func.replace(Review.status, "Status: ", "")) == normalized_status
        )
    if days:
        cutoff = datetime.now(UTC).replace(tzinfo=None) - timedelta(days=days)
        query = query.filter(Review.created_at >= cutoff)
    if min_words:
        query = query.filter(Review.word_count > min_words)
    return query


def _canonical_review_status(value: str | None) -> str:
    if not value:
        return "Unread"
    if value.casefold().startswith("status:"):
        return value.split(":", 1)[1].strip().title()
    return value.strip().title()

@api_router.get("/workspaces/{workspace_id}/reviews")
async def list_reviews(
    workspace_id: str,
    q: str = None,
    platform: str = None,
    version: str = None,
    rating: int = None,
    status: str = None,
    days: int = Query(0, ge=0, le=365),
    min_words: int = Query(8, ge=0, le=100),
    page: int = Query(1, ge=1),
    limit: int = Query(25, ge=1, le=100),
    db: Session = Depends(get_db)
):
    workspace_query = _store_reviews_query(db, workspace_id)
    available_versions = [
        value for (value,) in workspace_query.with_entities(Review.version).distinct().order_by(Review.version.desc()).all()
        if value
    ]
    available_statuses = sorted({
        _canonical_review_status(value)
        for (value,) in workspace_query.with_entities(Review.status).distinct().all()
    })
    query = _apply_review_filters(
        workspace_query, q, platform, version, rating, status, days, min_words
    )
        
    total = query.count()
    items = query.order_by(Review.created_at.desc()).offset((page - 1) * limit).limit(limit).all()
    
    return {
        "items": [
            {
                "id": item.id,
                "author": item.author,
                "platform": item.platform,
                "rating": item.rating,
                "text": item.text,
                "version": item.version,
                "status": _canonical_review_status(item.status),
                "created_at": item.created_at.isoformat() if item.created_at else None
            } for item in items
        ],
        "total": total,
        "page": page,
        "limit": limit,
        "available_versions": available_versions,
        "available_statuses": available_statuses,
    }


@api_router.get("/workspaces/{workspace_id}/reviews/summary")
async def get_reviews_summary(
    workspace_id: str,
    q: str = None,
    platform: str = None,
    version: str = None,
    rating: int = None,
    status: str = None,
    days: int = Query(0, ge=0, le=365),
    min_words: int = Query(8, ge=0, le=100),
    db: Session = Depends(get_db),
):
    store_query = _store_reviews_query(db, workspace_id)
    all_workspace_reviews = db.query(Review).filter(Review.workspace_id == workspace_id).count()
    excluded_non_store = all_workspace_reviews - store_query.count()
    query = _apply_review_filters(
        store_query,
        q,
        platform,
        version,
        rating,
        status,
        days,
        min_words,
    )
    total = query.count()
    average_rating = query.with_entities(func.avg(Review.rating)).scalar()
    unread = query.filter(
        func.lower(func.replace(Review.status, "Status: ", "")) == "unread"
    ).count()
    one_star = query.filter(Review.rating == 1).count()
    ios = query.filter(or_(Review.platform.ilike("%Apple%"), Review.platform.ilike("%iOS%"))).count()
    android = query.filter(or_(Review.platform.ilike("%Google%"), Review.platform.ilike("%Android%"))).count()
    return {
        "total": total,
        "unread": unread,
        "one_star": one_star,
        "average_rating": round(float(average_rating), 1) if average_rating is not None else None,
        "ios": ios,
        "android": android,
        "excluded_non_store": excluded_non_store,
        "min_words": min_words,
        "days": days,
    }

@api_router.get("/workspaces/{workspace_id}/dashboard/metrics")
async def get_dashboard_metrics(
    workspace_id: str,
    platform: str = Query("All Platforms"),
    advocate_min: int = Query(5, ge=2, le=5),
    critic_max: int = Query(3, ge=1, le=4),
    days: int = Query(30, ge=1, le=365),
    min_words: int = Query(0, ge=0, le=100),
    db: Session = Depends(get_db),
):
    if critic_max >= advocate_min:
        raise HTTPException(
            status_code=422,
            detail="Critic maximum must be lower than advocate minimum.",
        )

    cutoff = datetime.now(UTC).replace(tzinfo=None) - timedelta(days=days)
    window_query = _store_reviews_query(db, workspace_id).filter(Review.created_at >= cutoff)
    if min_words:
        window_query = window_query.filter(Review.word_count > min_words)
    ios_filter = or_(Review.platform.ilike("%Apple%"), Review.platform.ilike("%iOS%"))
    android_filter = or_(Review.platform.ilike("%Google%"), Review.platform.ilike("%Android%"))

    ios_window_reviews = window_query.filter(ios_filter).count()
    android_window_reviews = window_query.filter(android_filter).count()
    ios_average_rating = window_query.filter(ios_filter).with_entities(func.avg(Review.rating)).scalar()
    android_average_rating = window_query.filter(android_filter).with_entities(func.avg(Review.rating)).scalar()
    store_rating_difference = (
        round(float(ios_average_rating) - float(android_average_rating), 1)
        if ios_average_rating is not None and android_average_rating is not None
        else None
    )

    query = window_query
    if platform == "iOS":
        query = query.filter(ios_filter)
    elif platform == "Android":
        query = query.filter(android_filter)
    
    total = query.count()
    if total == 0:
        return {
            "total_reviews": 0,
            "ios_reviews": 0,
            "android_reviews": 0,
            "ios_average_rating": round(float(ios_average_rating), 1) if ios_average_rating is not None else None,
            "android_average_rating": round(float(android_average_rating), 1) if android_average_rating is not None else None,
            "store_rating_difference": store_rating_difference,
            "average_rating": 0,
            "median_rating": 0,
            "rating_advocacy_score": 0,
            "advocates_count": 0,
            "neutral_count": 0,
            "critics_count": 0,
            "advocates_percent": 0,
            "neutral_percent": 0,
            "critics_percent": 0,
            "oldest_review_at": None,
            "newest_review_at": None,
            "rating_distribution": {str(rating): 0 for rating in range(1, 6)},
            "advocate_min": advocate_min,
            "critic_max": critic_max,
            "days": days,
            "min_words": min_words,
        }
        
    ios_reviews = query.filter(ios_filter).count()
    android_reviews = query.filter(android_filter).count()
    
    avg_rating = query.with_entities(func.avg(Review.rating)).scalar() or 0
    
    ratings = [rating for (rating,) in query.with_entities(Review.rating).all()]
    advocates = sum(rating >= advocate_min for rating in ratings)
    critics = sum(rating <= critic_max for rating in ratings)
    neutral = total - advocates - critics

    advocates_pct = round((advocates / total) * 100, 1)
    neutral_pct = round((neutral / total) * 100, 1)
    critics_pct = round((critics / total) * 100, 1)
    rating_advocacy_score = round(((advocates - critics) / total) * 100, 1)
    rating_distribution = {
        str(rating): ratings.count(rating) for rating in range(1, 6)
    }
    oldest_review_at = query.with_entities(func.min(Review.created_at)).scalar()
    newest_review_at = query.with_entities(func.max(Review.created_at)).scalar()
    
    return {
        "total_reviews": total,
        "ios_reviews": ios_reviews,
        "android_reviews": android_reviews,
        "ios_average_rating": round(float(ios_average_rating), 1) if ios_average_rating is not None else None,
        "android_average_rating": round(float(android_average_rating), 1) if android_average_rating is not None else None,
        "store_rating_difference": store_rating_difference,
        "average_rating": round(avg_rating, 1),
        "median_rating": float(median(ratings)),
        "rating_advocacy_score": rating_advocacy_score,
        "advocates_count": advocates,
        "neutral_count": neutral,
        "critics_count": critics,
        "advocates_percent": advocates_pct,
        "neutral_percent": neutral_pct,
        "critics_percent": critics_pct,
        "oldest_review_at": oldest_review_at.isoformat() if oldest_review_at else None,
        "newest_review_at": newest_review_at.isoformat() if newest_review_at else None,
        "rating_distribution": rating_distribution,
        "advocate_min": advocate_min,
        "critic_max": critic_max,
        "days": days,
        "min_words": min_words,
    }


def _analytics_bucket(value: datetime, granularity: str) -> datetime:
    if granularity == "daily":
        return value.replace(hour=0, minute=0, second=0, microsecond=0)
    if granularity == "weekly":
        day = value.replace(hour=0, minute=0, second=0, microsecond=0)
        return day - timedelta(days=day.weekday())
    if granularity == "monthly":
        return value.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    month = ((value.month - 1) // 3) * 3 + 1
    return value.replace(month=month, day=1, hour=0, minute=0, second=0, microsecond=0)


def _analytics_platform(value: str | None) -> str:
    normalized = (value or "").casefold()
    return "ios" if "apple" in normalized or "ios" in normalized else "android"


_WORD_CLOUD_STOP_WORDS = {
    "about", "after", "again", "also", "and", "any", "app", "are", "been", "being",
    "but", "can", "could", "did", "does", "doing", "for", "from", "get", "getting",
    "good", "got", "groww", "had", "has", "have", "how", "into", "its", "just",
    "like", "more", "most", "much", "not", "now", "only", "our", "out", "please",
    "really", "should", "some", "than", "that", "the", "their", "them", "then",
    "there", "these", "they", "this", "too", "use", "used", "user", "using", "very",
    "want", "was", "were", "what", "when", "which", "while", "will", "with", "would",
    "you", "your",
}
_WORD_CLOUD_TOKEN = re.compile(r"[^\W_][\w']{2,}", re.UNICODE)
_WORD_CLOUD_GENERIC_UNIGRAMS = {
    "aap", "all", "apps", "awesome", "bad", "best", "easy", "even", "excellent",
    "friendly", "great", "grow", "hai", "it's", "nice", "new", "one", "other",
    "super", "work", "worst",
}


def _review_terms(text: str | None) -> set[tuple[str, str]]:
    """Return unique meaningful unigrams and adjacent bigrams for one review."""
    tokens = [token.casefold().strip("'") for token in _WORD_CLOUD_TOKEN.findall(text or "")]
    valid = [token if token not in _WORD_CLOUD_STOP_WORDS and not token.isdigit() else None for token in tokens]
    terms = {
        (token, "unigram")
        for token in valid
        if token and token not in _WORD_CLOUD_GENERIC_UNIGRAMS
    }
    terms.update(
        (f"{left} {right}", "bigram")
        for left, right in zip(valid, valid[1:])
        if left and right and left != right
    )
    return terms


@api_router.get("/workspaces/{workspace_id}/word-cloud")
async def get_word_cloud(
    workspace_id: str,
    platform: str = Query("All Platforms"),
    sentiment: str = Query("all", pattern="^(all|positive|neutral|negative)$"),
    days: int = Query(30, ge=1, le=365),
    min_frequency: int = Query(2, ge=1, le=500),
    limit: int = Query(50, ge=10, le=100),
    db: Session = Depends(get_db),  # noqa: B008
):
    """Extract a fast, deterministic live term cloud from stored review text."""
    if db.get(Workspace, workspace_id) is None:
        raise HTTPException(status_code=404, detail="Workspace not found")

    now = datetime.now(UTC).replace(tzinfo=None)
    cutoff = now - timedelta(days=days)
    previous_cutoff = cutoff - timedelta(days=days)
    query = _store_reviews_query(db, workspace_id).filter(Review.created_at >= previous_cutoff)
    query = _apply_review_filters(query, platform=platform)
    if sentiment == "positive":
        query = query.filter(Review.rating >= 4)
    elif sentiment == "negative":
        query = query.filter(Review.rating <= 2)
    elif sentiment == "neutral":
        query = query.filter(Review.rating == 3)

    total_matching_reviews = query.count()
    rows = (
        query.with_entities(Review.text, Review.rating, Review.created_at)
        .order_by(Review.created_at.desc())
        .limit(10_000)
        .all()
    )
    current_rows = [row for row in rows if row.created_at and row.created_at >= cutoff]
    previous_rows = [row for row in rows if row.created_at and row.created_at < cutoff]

    current_counts: Counter[tuple[str, str]] = Counter()
    previous_counts: Counter[tuple[str, str]] = Counter()
    rating_totals: Counter[tuple[str, str]] = Counter()
    rating_counts: Counter[tuple[str, str]] = Counter()
    samples: dict[tuple[str, str], str] = {}

    for text_value, rating, _created_at in current_rows:
        review_terms = _review_terms(text_value)
        current_counts.update(review_terms)
        for term_key in review_terms:
            if rating is not None:
                rating_totals[term_key] += rating
                rating_counts[term_key] += 1
            if text_value and term_key not in samples:
                samples[term_key] = text_value.strip()

    for text_value, _rating, _created_at in previous_rows:
        previous_counts.update(_review_terms(text_value))

    eligible = [key for key, count in current_counts.items() if count >= min_frequency]
    eligible.sort(key=lambda key: (-current_counts[key], key[0]))
    unigram_limit = max(1, round(limit * 2 / 3))
    unigram_keys = [key for key in eligible if key[1] == "unigram"][:unigram_limit]
    bigram_keys = [key for key in eligible if key[1] == "bigram"][: limit - unigram_limit]
    display_keys = sorted(
        [*unigram_keys, *bigram_keys],
        key=lambda key: (-current_counts[key], key[0]),
    )
    terms = []
    for key in display_keys:
        mentions = current_counts[key]
        previous_mentions = previous_counts[key]
        average_rating = rating_totals[key] / rating_counts[key] if rating_counts[key] else 3
        polarity = round((average_rating - 3) / 2, 2)
        terms.append(
            {
                "term": key[0],
                "kind": key[1],
                "mentions": mentions,
                "polarity": polarity,
                "average_rating": round(average_rating, 2),
                "velocity_percent": (
                    round((mentions - previous_mentions) / previous_mentions * 100, 1)
                    if previous_mentions
                    else None
                ),
                "is_new": bool(previous_rows) and previous_mentions == 0,
                "sample_review": samples.get(key, ""),
            }
        )

    positive_terms = [term for term in terms if term["polarity"] > 0]
    negative_terms = [term for term in terms if term["polarity"] < 0]
    positive_phrases = [term for term in positive_terms if term["kind"] == "bigram"]
    negative_phrases = [term for term in negative_terms if term["kind"] == "bigram"]
    return {
        "generated_at": now.isoformat(),
        "days": days,
        "platform": platform,
        "sentiment": sentiment,
        "review_count": len(current_rows),
        "total_matching_reviews": total_matching_reviews,
        "truncated": total_matching_reviews > len(rows),
        "distinct_terms": len(eligible),
        "min_frequency": min_frequency,
        "top_positive": max(
            positive_phrases or positive_terms,
            key=lambda term: term["polarity"],
            default=None,
        ),
        "top_negative": min(
            negative_phrases or negative_terms,
            key=lambda term: term["polarity"],
            default=None,
        ),
        "terms": terms,
    }


@api_router.get("/workspaces/{workspace_id}/analytics")
async def get_analytics(
    workspace_id: str,
    platform: str = Query("All Platforms"),
    days: int = Query(90, ge=7, le=365),
    granularity: str = Query("weekly", pattern="^(daily|weekly|monthly|quarterly)$"),
    db: Session = Depends(get_db),  # noqa: B008
):
    """Return live, review-backed trend data for the analytics screen."""
    if db.get(Workspace, workspace_id) is None:
        raise HTTPException(status_code=404, detail="Workspace not found")

    now = datetime.now(UTC).replace(tzinfo=None)
    cutoff = now - timedelta(days=days)
    previous_cutoff = cutoff - timedelta(days=days)
    query = _store_reviews_query(db, workspace_id).filter(Review.created_at >= previous_cutoff)
    if platform == "iOS":
        query = query.filter(
            or_(Review.platform.ilike("%Apple%"), Review.platform.ilike("%iOS%"))
        )
    elif platform == "Android":
        query = query.filter(
            or_(Review.platform.ilike("%Google%"), Review.platform.ilike("%Android%"))
        )

    rows = query.order_by(Review.created_at.asc()).all()
    current = [row for row in rows if row.created_at and row.created_at >= cutoff]
    previous = [row for row in rows if row.created_at and row.created_at < cutoff]

    def average(items) -> float | None:
        ratings = [row.rating for row in items if row.rating is not None]
        return round(sum(ratings) / len(ratings), 2) if ratings else None

    buckets = defaultdict(lambda: {"ios": 0, "android": 0, "ratings": []})
    for row in current:
        bucket = _analytics_bucket(row.created_at, granularity)
        buckets[bucket][_analytics_platform(row.platform)] += 1
        if row.rating is not None:
            buckets[bucket]["ratings"].append(row.rating)

    series = []
    for bucket, values in sorted(buckets.items()):
        ratings = values["ratings"]
        series.append(
            {
                "period": bucket.date().isoformat(),
                "ios": values["ios"],
                "android": values["android"],
                "total": values["ios"] + values["android"],
                "average_rating": round(sum(ratings) / len(ratings), 2) if ratings else None,
                "critical_percent": (
                    round(sum(rating <= 3 for rating in ratings) / len(ratings) * 100, 1)
                    if ratings
                    else 0
                ),
            }
        )

    current_average = average(current)
    previous_average = average(previous)
    current_critical = sum(row.rating <= 3 for row in current if row.rating is not None)
    previous_critical = sum(row.rating <= 3 for row in previous if row.rating is not None)
    current_critical_percent = round(current_critical / len(current) * 100, 1) if current else 0
    previous_critical_percent = (
        round(previous_critical / len(previous) * 100, 1) if previous else 0
    )
    velocity_change = (
        round((len(current) - len(previous)) / len(previous) * 100, 1) if previous else None
    )
    version_groups = defaultdict(list)
    for row in current:
        version_groups[row.version or "Unknown"].append(row.rating)
    versions = [
        {
            "version": version,
            "reviews": len(ratings),
            "average_rating": round(sum(ratings) / len(ratings), 2),
        }
        for version, ratings in version_groups.items()
        if ratings
    ]
    versions.sort(key=lambda item: (-item["reviews"], item["version"]))

    ios = sum(_analytics_platform(row.platform) == "ios" for row in current)
    android = len(current) - ios
    return {
        "generated_at": now.isoformat(),
        "days": days,
        "granularity": granularity,
        "platform": platform,
        "total_reviews": len(current),
        "reviews_per_day": round(len(current) / days, 1),
        "velocity_change_percent": velocity_change,
        "average_rating": current_average,
        "previous_average_rating": previous_average,
        "rating_change": (
            round(current_average - previous_average, 2)
            if current_average is not None and previous_average is not None
            else None
        ),
        "critical_reviews": current_critical,
        "critical_percent": current_critical_percent,
        "critical_change_points": (
            round(current_critical_percent - previous_critical_percent, 1)
            if previous
            else None
        ),
        "ios_reviews": ios,
        "android_reviews": android,
        "oldest_review_at": current[0].created_at.isoformat() if current else None,
        "newest_review_at": current[-1].created_at.isoformat() if current else None,
        "rating_distribution": {
            str(rating): sum(row.rating == rating for row in current)
            for rating in range(1, 6)
        },
        "series": series,
        "versions": versions[:8],
    }

class SyncRequest(BaseModel):
    days: int = Field(ge=1, le=365)
    max_reviews_per_store: int = Field(default=200, ge=1, le=500)


def _utc_naive(value: datetime) -> datetime:
    if value.tzinfo is None:
        return value
    return value.astimezone(UTC).replace(tzinfo=None)


def _parse_apple_datetime(value: str) -> datetime:
    return _utc_naive(datetime.fromisoformat(value.replace("Z", "+00:00")))


@api_router.get("/workspaces/{workspace_id}/sync-status")
async def get_sync_status(
    workspace_id: str,
    db: Session = Depends(get_db),
):
    workspace = db.get(Workspace, workspace_id)
    if workspace is None:
        raise HTTPException(status_code=404, detail="Workspace not found")
    return {
        "last_synced_at": workspace.last_synced_at.isoformat() if workspace.last_synced_at else None,
        "status": workspace.last_sync_status or "never",
    }


@api_router.post("/workspaces/{workspace_id}/sync")
async def sync_workspace(
    workspace_id: str,
    request: SyncRequest,
    db: Session = Depends(get_db),
):
    """Import public reviews newer than the user-selected cutoff."""
    workspace = db.get(Workspace, workspace_id)
    if workspace is None:
        raise HTTPException(status_code=404, detail="Workspace not found")

    cutoff = datetime.now(UTC).replace(tzinfo=None) - timedelta(days=request.days)
    source_counts = {"google_play": 0, "apple_app_store": 0}
    scanned_counts = {"google_play": 0, "apple_app_store": 0}
    duplicate_counts = {"google_play": 0, "apple_app_store": 0}
    errors: list[str] = []

    try:
        continuation_token = None
        reached_cutoff = False
        while not reached_cutoff and scanned_counts["google_play"] < request.max_reviews_per_store:
            remaining = request.max_reviews_per_store - scanned_counts["google_play"]
            page, continuation_token = gp_reviews(
                "com.nextbillion.groww",
                lang="en",
                country="in",
                sort=Sort.NEWEST,
                count=min(200, remaining),
                continuation_token=continuation_token,
            )
            if not page:
                break
            for item in page:
                if scanned_counts["google_play"] >= request.max_reviews_per_store:
                    break
                scanned_counts["google_play"] += 1
                created_at = _utc_naive(item.get("at") or datetime.now(UTC))
                if created_at < cutoff:
                    reached_cutoff = True
                    break
                review_id = str(item.get("reviewId") or "")
                review_text = str(item.get("content") or "").strip()
                if not review_id or not review_text:
                    continue
                if db.get(Review, review_id) is not None:
                    duplicate_counts["google_play"] += 1
                    continue
                db.add(
                    Review(
                        id=review_id,
                        workspace_id=workspace_id,
                        author="Anonymous",
                        platform="Google Play Store",
                        rating=int(item.get("score") or 0),
                        text=review_text,
                        word_count=len(review_text.split()),
                        version=str(item.get("reviewCreatedVersion") or "Unknown"),
                        status="Unread",
                        created_at=created_at,
                    )
                )
                source_counts["google_play"] += 1
            if continuation_token is None:
                break
    except Exception:
        errors.append("Google Play could not be reached")

    try:
        reached_cutoff = False
        for page_number in range(1, 11):
            if scanned_counts["apple_app_store"] >= request.max_reviews_per_store:
                break
            response = requests.get(
                (
                    "https://itunes.apple.com/in/rss/customerreviews/"
                    f"page={page_number}/id=1404871703/sortby=mostrecent/json"
                ),
                timeout=20,
            )
            response.raise_for_status()
            entries = response.json().get("feed", {}).get("entry", [])
            if not entries:
                break
            for entry in entries:
                if "im:rating" not in entry:
                    continue
                if scanned_counts["apple_app_store"] >= request.max_reviews_per_store:
                    break
                scanned_counts["apple_app_store"] += 1
                created_at = _parse_apple_datetime(entry["updated"]["label"])
                if created_at < cutoff:
                    reached_cutoff = True
                    break
                review_id = str(entry["id"]["label"])
                review_text = str(entry["content"]["label"]).strip()
                if not review_text:
                    continue
                if db.get(Review, review_id) is not None:
                    duplicate_counts["apple_app_store"] += 1
                    continue
                db.add(
                    Review(
                        id=review_id,
                        workspace_id=workspace_id,
                        author="Anonymous",
                        platform="Apple App Store",
                        rating=int(entry["im:rating"]["label"]),
                        text=review_text,
                        word_count=len(review_text.split()),
                        version=str(entry.get("im:version", {}).get("label", "Unknown")),
                        status="Unread",
                        created_at=created_at,
                    )
                )
                source_counts["apple_app_store"] += 1
            if reached_cutoff:
                break
    except Exception:
        errors.append("Apple App Store could not be reached")

    sync_status = "partial" if errors else "success"
    workspace.last_synced_at = datetime.now(UTC).replace(tzinfo=None)
    workspace.last_sync_status = sync_status
    db.commit()
    new_reviews_count = sum(source_counts.values())
    return {
        "status": sync_status,
        "days": request.days,
        "max_reviews_per_store": request.max_reviews_per_store,
        "new_reviews": new_reviews_count,
        "source_counts": source_counts,
        "scanned_counts": scanned_counts,
        "duplicate_counts": duplicate_counts,
        "errors": errors,
    }

class BulkActionRequest(BaseModel):
    review_ids: list[str]
    action: str
    value: str | None = None

@api_router.post("/workspaces/{workspace_id}/reviews/bulk")
async def bulk_action(workspace_id: str, request: BulkActionRequest, db: Session = Depends(get_db)):
    query = db.query(Review).filter(Review.workspace_id == workspace_id, Review.id.in_(request.review_ids))
    if request.action != "mark_status" or request.value not in {"Unread", "Reviewed", "Flagged", "Archived"}:
        raise HTTPException(status_code=422, detail="Unsupported review action")
    updated_count = query.update({"status": request.value}, synchronize_session=False)
    db.commit()
    return {"success": True, "updated_count": updated_count}

class DraftRequest(BaseModel):
    tone: str = "concise"

@api_router.post("/workspaces/{workspace_id}/reviews/{review_id}/draft")
async def generate_draft(workspace_id: str, review_id: str, request: DraftRequest, db: Session = Depends(get_db)):
    review = db.query(Review).filter(Review.id == review_id, Review.workspace_id == workspace_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
        
    if request.tone.lower() == "concise":
        draft = "Thank you for sharing this feedback. We’re sorry the experience did not meet your expectations. We’ve shared your comments with the Groww team for review."
    else:
        draft = f"Hello,\n\nThank you for taking the time to leave a {review.rating}-star review. We’re sorry the experience did not meet your expectations. Your feedback has been shared with the Groww team for review and will help us improve the app.\n\nRegards,\nGroww Support"
        
    return {"draft": draft}

@api_router.get("/workspaces/{workspace_id}/reviews/export")
async def export_reviews(
    workspace_id: str,
    q: str = None,
    platform: str = None,
    version: str = None,
    rating: int = None,
    status: str = None,
    days: int = Query(0, ge=0, le=365),
    min_words: int = Query(8, ge=0, le=100),
    db: Session = Depends(get_db)
):
    query = _apply_review_filters(
        _store_reviews_query(db, workspace_id),
        q,
        platform,
        version,
        rating,
        status,
        days,
        min_words,
    )
        
    reviews = query.order_by(Review.created_at.desc()).all()
    
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["ID", "Author", "Platform", "Rating", "Version", "Status", "Text", "Date"])
    for r in reviews:
        writer.writerow([r.id, r.author, r.platform, r.rating, r.version, r.status, r.text, r.created_at.isoformat() if r.created_at else ""])
        
    response = StreamingResponse(iter([output.getvalue()]), media_type="text/csv")
    response.headers["Content-Disposition"] = "attachment; filename=reviews_export.csv"
    return response

app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    import sys
    import os
    
    sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))
    
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=False, app_dir=os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))
