import asyncio
from datetime import UTC, datetime, timedelta
from importlib import import_module

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from product_insights.api.main import (
    SyncRequest,
    get_dashboard_metrics,
    get_reviews_summary,
    get_sync_status,
    sync_workspace,
)
from product_insights.db.models import Base, Review, Workspace


def test_sync_imports_only_reviews_inside_requested_days(monkeypatch) -> None:
    api_module = import_module("product_insights.api.main")
    now = datetime.now(UTC)

    def fake_google_reviews(*args, **kwargs):
        return (
            [
                {
                    "reviewId": "google_recent",
                    "content": "Recent Play review",
                    "score": 4,
                    "reviewCreatedVersion": "1.0",
                    "at": now - timedelta(days=2),
                },
                {
                    "reviewId": "google_old",
                    "content": "Old Play review",
                    "score": 2,
                    "reviewCreatedVersion": "0.9",
                    "at": now - timedelta(days=40),
                },
            ],
            None,
        )

    class FakeAppleResponse:
        def raise_for_status(self) -> None:
            return None

        def json(self) -> dict:
            return {
                "feed": {
                    "entry": [
                        {
                            "id": {"label": "apple_recent"},
                            "updated": {"label": (now - timedelta(days=3)).isoformat()},
                            "content": {"label": "Recent App Store review"},
                            "im:rating": {"label": "5"},
                            "im:version": {"label": "1.0"},
                        },
                        {
                            "id": {"label": "apple_old"},
                            "updated": {"label": (now - timedelta(days=50)).isoformat()},
                            "content": {"label": "Old App Store review"},
                            "im:rating": {"label": "1"},
                        },
                    ]
                }
            }

    monkeypatch.setattr(api_module, "gp_reviews", fake_google_reviews)
    monkeypatch.setattr(api_module.requests, "get", lambda *args, **kwargs: FakeAppleResponse())

    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(engine)
    session = sessionmaker(bind=engine)()
    session.add(Workspace(id="ws_test", name="Test", slug="test"))
    session.commit()

    request = SyncRequest(days=7, max_reviews_per_store=200)
    result = asyncio.run(sync_workspace("ws_test", request, session))
    repeated = asyncio.run(sync_workspace("ws_test", request, session))

    assert result["new_reviews"] == 2
    assert result["source_counts"] == {"google_play": 1, "apple_app_store": 1}
    assert session.get(Review, "google_old") is None
    assert session.get(Review, "apple_old") is None
    assert session.get(Review, "google_recent").author == "Anonymous"
    assert repeated["new_reviews"] == 0
    assert repeated["duplicate_counts"] == {"google_play": 1, "apple_app_store": 1}
    sync_status = asyncio.run(get_sync_status("ws_test", session))
    assert sync_status["status"] == "success"
    assert sync_status["last_synced_at"] is not None


def test_dashboard_metrics_are_computed_from_selected_reviews() -> None:
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(engine)
    session = sessionmaker(bind=engine)()
    session.add(Workspace(id="ws_test", name="Test", slug="test"))
    session.add_all(
        [
            Review(id="r1", workspace_id="ws_test", platform="Apple App Store", rating=5, text="A"),
            Review(id="r2", workspace_id="ws_test", platform="Apple App Store", rating=4, text="B"),
            Review(id="r3", workspace_id="ws_test", platform="Google Play Store", rating=1, text="C"),
            Review(
                id="r4",
                workspace_id="ws_test",
                platform="Google Play Store",
                rating=1,
                text="Outside selected window",
                created_at=datetime.now(UTC) - timedelta(days=40),
            ),
        ]
    )
    session.commit()

    all_metrics = asyncio.run(get_dashboard_metrics("ws_test", "All Platforms", 5, 3, 30, 0, session))
    ios_metrics = asyncio.run(get_dashboard_metrics("ws_test", "iOS", 5, 3, 30, 0, session))

    assert all_metrics["total_reviews"] == 3
    assert all_metrics["average_rating"] == 3.3
    assert all_metrics["median_rating"] == 4.0
    assert all_metrics["rating_advocacy_score"] == 0
    assert all_metrics["advocates_count"] == 1
    assert all_metrics["neutral_count"] == 1
    assert all_metrics["critics_count"] == 1
    assert all_metrics["advocates_percent"] == 33.3
    assert all_metrics["neutral_percent"] == 33.3
    assert all_metrics["critics_percent"] == 33.3
    assert all_metrics["ios_average_rating"] == 4.5
    assert all_metrics["android_average_rating"] == 1.0
    assert all_metrics["store_rating_difference"] == 3.5
    assert all_metrics["rating_distribution"] == {"1": 1, "2": 0, "3": 0, "4": 1, "5": 1}
    assert ios_metrics["total_reviews"] == 2
    assert ios_metrics["android_reviews"] == 0
    assert ios_metrics["ios_average_rating"] == 4.5
    assert ios_metrics["android_average_rating"] == 1.0


def test_rating_advocacy_uses_raw_counts_before_rounding() -> None:
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(engine)
    session = sessionmaker(bind=engine)()
    session.add(Workspace(id="ws_test", name="Test", slug="test"))
    session.add_all(
        [
            Review(id=f"r{index}", workspace_id="ws_test", platform="Apple App Store", rating=rating, text="A")
            for index, rating in enumerate([5, 1, 1, 4, 4, 4], start=1)
        ]
    )
    session.commit()

    metrics = asyncio.run(get_dashboard_metrics("ws_test", "All Platforms", 5, 3, 30, 0, session))

    assert metrics["advocates_percent"] == 16.7
    assert metrics["critics_percent"] == 33.3
    assert metrics["rating_advocacy_score"] == -16.7


def test_review_summary_normalizes_store_and_legacy_statuses() -> None:
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(engine)
    session = sessionmaker(bind=engine)()
    session.add(Workspace(id="ws_test", name="Test", slug="test"))
    session.add_all(
        [
            Review(id="r1", workspace_id="ws_test", platform="Apple App Store", rating=5, status="Unread", text="A"),
            Review(id="r2", workspace_id="ws_test", platform="Apple App Store", rating=1, status="Status: Unread", text="B"),
            Review(id="r3", workspace_id="ws_test", platform="Google Play Store", rating=3, status="Reviewed", text="C"),
        ]
    )
    session.commit()

    ios_summary = asyncio.run(get_reviews_summary("ws_test", None, "iOS", None, None, None, 0, 0, session))

    assert ios_summary == {
        "total": 2,
        "unread": 2,
        "one_star": 1,
        "average_rating": 3.0,
        "ios": 2,
        "android": 0,
        "excluded_non_store": 0,
        "min_words": 0,
        "days": 0,
    }


def test_quality_filter_hides_short_reviews_but_dashboard_can_include_them() -> None:
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(engine)
    session = sessionmaker(bind=engine)()
    session.add(Workspace(id="ws_test", name="Test", slug="test"))
    session.add_all(
        [
            Review(id="short", workspace_id="ws_test", platform="Google Play Store", rating=1, text="Very bad"),
            Review(id="long", workspace_id="ws_test", platform="Google Play Store", rating=5, text="This genuine review contains more than eight useful words today"),
            Review(id="rev_1000", workspace_id="ws_test", platform="Google Play Store", rating=5, text="Synthetic demo review that must never affect real product metrics"),
            Review(id="legacy", workspace_id="ws_test", platform="Google Play Store", rating=5, text="[MOCK AI CATEGORIZED] unrelated legacy review content"),
        ]
    )
    session.commit()

    inbox_summary = asyncio.run(get_reviews_summary("ws_test", None, None, None, None, None, 0, 8, session))
    dashboard_metrics = asyncio.run(get_dashboard_metrics("ws_test", "All Platforms", 5, 3, 30, 0, session))

    assert inbox_summary["total"] == 1
    assert inbox_summary["excluded_non_store"] == 2
    assert dashboard_metrics["total_reviews"] == 2
    assert dashboard_metrics["average_rating"] == 3.0
