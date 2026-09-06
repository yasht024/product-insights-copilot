"""Deterministic privacy-safe record normalization."""

from __future__ import annotations

import hashlib
import hmac
import unicodedata
from uuid import uuid4

from product_insights.domain.models import RawReview, ReviewRecord, SourceBatch
from product_insights.ingestion.base import IST, now_ist


def normalize_review(raw: RawReview, batch: SourceBatch, fingerprint_key: bytes) -> ReviewRecord:
    title = _normalize_visible_text(raw.title) if raw.title is not None else None
    text = _normalize_visible_text(raw.review_text)
    source_key_hash = (
        _keyed_hash(fingerprint_key, raw.source_review_key) if raw.source_review_key else None
    )
    fingerprint_parts = (
        raw.source_store.value,
        text,
        str(raw.rating),
        raw.source_datetime.isoformat(),
    )
    fingerprint = _keyed_hash(fingerprint_key, "\x1f".join(fingerprint_parts))
    return ReviewRecord(
        review_id=uuid4(),
        source_store=raw.source_store,
        source_review_key_hash=source_key_hash,
        rating=raw.rating,
        title=title,
        review_text=text,
        source_datetime=raw.source_datetime.astimezone(IST),
        source_datetime_original=raw.source_datetime_original,
        language_code=raw.language_code.casefold() if raw.language_code else None,
        imported_at=now_ist(),
        source_batch_id=batch.source_batch_id,
        content_fingerprint=fingerprint,
    )


def _normalize_visible_text(value: str) -> str:
    return unicodedata.normalize("NFC", value).strip()


def _keyed_hash(key: bytes, value: str) -> str:
    return hmac.new(key, value.encode("utf-8"), hashlib.sha256).hexdigest()
