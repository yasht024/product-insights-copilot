from __future__ import annotations

from datetime import date
from uuid import uuid4

import pytest

from product_insights.domain.models import RawReview, SourceBatch, SourceStore
from product_insights.ingestion.base import IST, now_ist
from product_insights.processing.normalize import normalize_review
from product_insights.processing.privacy import sanitize_review
from product_insights.processing.window import reporting_window


def raw_review(text: str, *, source_datetime: str = "2026-08-30T12:00:00+05:30") -> RawReview:
    return RawReview(
        source_store=SourceStore.GOOGLE_PLAY,
        source_review_key="synthetic-key",
        rating=4,
        title="Title",
        review_text=text,
        source_datetime=__import__("datetime").datetime.fromisoformat(source_datetime),
        source_datetime_original=source_datetime,
        language_code="en",
        source_product_id="com.nextbillion.groww",
        is_public=True,
    )


@pytest.mark.parametrize("weeks, start", [(8, date(2026, 7, 6)), (12, date(2026, 6, 8))])
def test_reporting_window_is_inclusive_calendar_window(weeks: int, start: date) -> None:
    assert reporting_window(date(2026, 8, 30), weeks) == (start, date(2026, 8, 30))


def test_normalization_preserves_unicode_and_normalizes_to_ist() -> None:
    batch = SourceBatch(
        source_batch_id=uuid4(),
        source_store=SourceStore.GOOGLE_PLAY,
        source_path="fixture",
        batch_fingerprint="fingerprint",
        imported_at=now_ist(),
    )
    record = normalize_review(
        raw_review(" निवेश आसान है ", source_datetime="2026-08-30T23:30:00-02:00"), batch, b"key"
    )

    assert record.review_text == "निवेश आसान है"
    assert record.source_datetime.tzinfo == IST
    assert record.source_datetime.date() == date(2026, 8, 31)


@pytest.mark.parametrize(
    "text",
    [
        "write fixture.user@example.invalid",
        "call +91 98765 43210",
        "device TEST-DEVICE-000 needs help",
        "my name is Synthetic Person",
    ],
)
def test_privacy_filter_rejects_synthetic_pii(text: str) -> None:
    batch = SourceBatch(
        source_batch_id=uuid4(),
        source_store=SourceStore.GOOGLE_PLAY,
        source_path="fixture",
        batch_fingerprint="fingerprint",
        imported_at=now_ist(),
    )
    sanitized = sanitize_review(normalize_review(raw_review(text), batch, b"key"))

    assert sanitized.sanitized_text is None
    assert sanitized.privacy_finding_types


def test_domain_model_has_no_reviewer_identity_field() -> None:
    assert "reviewer_name" not in RawReview.model_fields
    assert "reviewer_name" not in normalize_review.__annotations__
