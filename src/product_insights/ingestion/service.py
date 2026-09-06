"""Fixture-safe Phase 1 ingestion workflow."""

from __future__ import annotations

import os
from collections import Counter
from collections.abc import Iterable
from dataclasses import dataclass
from datetime import date
from uuid import uuid4

from product_insights.config import AppConfig
from product_insights.domain.errors import IngestionError
from product_insights.domain.models import (
    ImportMetrics,
    IngestionResult,
    ParseRejection,
    PrivacyStatus,
    RunManifest,
    RunStatus,
    SourceBatch,
)
from product_insights.domain.ports import ReviewSource
from product_insights.ingestion.base import now_ist, row_batch_fingerprint
from product_insights.persistence.repository import SQLiteRepository
from product_insights.processing.normalize import normalize_review
from product_insights.processing.privacy import SANITIZER_VERSION, sanitize_review
from product_insights.processing.window import reporting_window


@dataclass(frozen=True)
class IngestionService:
    config: AppConfig
    repository: SQLiteRepository
    fingerprint_key: bytes

    def run(self, reporting_week_end: date, sources: Iterable[ReviewSource]) -> IngestionResult:
        period_start, period_end = reporting_window(
            reporting_week_end, self.config.reporting.lookback_weeks
        )
        run_key = f"{self.config.product.google_play_package}:{period_end.isoformat()}"
        existing = self.repository.existing_manifest(run_key)
        if existing and existing.status is not RunStatus.RUNNING:
            return IngestionResult(
                manifest=existing,
                eligible_review_ids=self.repository.eligible_ids(existing.run_id),
                reused_existing_run=True,
            )
        started_at = now_ist()
        run_id = uuid4()
        metrics = Counter[str]()
        rejection_categories = Counter[str]()
        manifest = RunManifest(
            run_id=run_id,
            run_key=run_key,
            status=RunStatus.RUNNING,
            period_start=period_start,
            period_end=period_end,
            config_version=self.config.config_version,
            config_snapshot_hash=self.config.safe_snapshot_hash(),
            sanitizer_version=SANITIZER_VERSION,
            metrics=_metrics(metrics),
            rejection_categories={},
            started_at=started_at,
        )
        with self.repository.transaction():
            self.repository.create_manifest(manifest)
            for source in sources:
                source_path = source.path
                batch = SourceBatch(
                    source_batch_id=uuid4(),
                    source_store=source.store,
                    source_path=str(source_path),
                    batch_fingerprint=row_batch_fingerprint(source_path, source.store),
                    imported_at=now_ist(),
                )
                self.repository.add_batch(batch)
                for item in source.load(period_start, period_end):
                    metrics["rows_read"] += 1
                    if isinstance(item, ParseRejection):
                        _count_rejection(metrics, rejection_categories, item.category)
                        continue
                    record = normalize_review(item, batch, self.fingerprint_key)
                    sanitized = sanitize_review(record)
                    review_id, duplicate = self.repository.store_review(record, sanitized)
                    if duplicate:
                        metrics["deduplicated"] += 1
                        continue
                    self.repository.link_run_review(run_id, review_id, sanitized.privacy_status)
                    if sanitized.privacy_status is PrivacyStatus.APPROVED:
                        metrics["accepted"] += 1
                        _count_eligible(
                            metrics,
                            record.rating,
                            record.source_store.value,
                            record.language_code,
                            record.source_datetime.date(),
                        )
                    elif sanitized.privacy_status is PrivacyStatus.NEEDS_REVIEW:
                        metrics["needs_review"] += 1
                    else:
                        metrics["privacy_rejected"] += 1
                        for finding in sanitized.privacy_finding_types:
                            rejection_categories[finding.value] += 1
            eligible_ids = self.repository.eligible_ids(run_id)
            status = (
                RunStatus.COMPLETED
                if len(eligible_ids) >= self.config.reporting.minimum_eligible_reviews
                else RunStatus.NEEDS_HUMAN_REVIEW
            )
            completed = manifest.model_copy(
                update={
                    "status": status,
                    "metrics": _metrics(metrics),
                    "rejection_categories": dict(rejection_categories),
                    "completed_at": now_ist(),
                }
            )
            self.repository.complete_manifest(completed)
        return IngestionResult(manifest=completed, eligible_review_ids=eligible_ids)


def fingerprint_key_from_environment(config: AppConfig) -> bytes:
    key_name = config.persistence.fingerprint_key_environment_variable
    value = os.environ.get(key_name)
    if not value:
        raise IngestionError(
            "missing_fingerprint_key", "fingerprint key is not configured in the runtime"
        )
    return value.encode("utf-8")


def _count_rejection(metrics: Counter[str], categories: Counter[str], category: str) -> None:
    categories[category] += 1
    if category == "out_of_window":
        metrics["out_of_window"] += 1
    else:
        metrics["malformed"] += 1
    if category == "missing_text":
        metrics["missing_text"] += 1
    if category == "missing_date":
        metrics["missing_date"] += 1
    if category == "invalid_rating":
        metrics["missing_rating"] += 1


def _count_eligible(
    metrics: Counter[str], rating: int, store: str, language: str | None, review_date: date
) -> None:
    metrics[f"rating:{rating}"] += 1
    metrics[f"store:{store}"] += 1
    metrics[f"week:{review_date.isoformat()}"] += 1
    if language:
        metrics[f"language:{language}"] += 1


def _metrics(counts: Counter[str]) -> ImportMetrics:
    accepted = counts["accepted"]
    ratings = {
        str(number): counts[f"rating:{number}"]
        for number in range(1, 6)
        if counts[f"rating:{number}"]
    }
    average = (
        sum(int(rating) * count for rating, count in ratings.items()) / accepted
        if accepted
        else None
    )
    return ImportMetrics(
        rows_read=counts["rows_read"],
        accepted=accepted,
        malformed=counts["malformed"],
        out_of_window=counts["out_of_window"],
        privacy_rejected=counts["privacy_rejected"],
        needs_review=counts["needs_review"],
        deduplicated=counts["deduplicated"],
        missing_title=counts["missing_title"],
        missing_text=counts["missing_text"],
        missing_date=counts["missing_date"],
        missing_rating=counts["missing_rating"],
        source_counts={
            key.removeprefix("store:"): value
            for key, value in counts.items()
            if key.startswith("store:")
        },
        rating_distribution=ratings,
        review_volume_by_week={
            key.removeprefix("week:"): value
            for key, value in counts.items()
            if key.startswith("week:")
        },
        language_distribution={
            key.removeprefix("language:"): value
            for key, value in counts.items()
            if key.startswith("language:")
        },
        average_rating=average,
    )
