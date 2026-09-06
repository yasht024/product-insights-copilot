"""Deterministic duplicate identity selection."""

from __future__ import annotations

from product_insights.domain.models import ReviewRecord


def deduplication_key(record: ReviewRecord) -> tuple[str, str]:
    if record.source_review_key_hash:
        return "source_key", record.source_review_key_hash
    return "fingerprint", record.content_fingerprint
