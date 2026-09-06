"""Phase 1 domain contracts. These models never contain reviewer identities."""

from __future__ import annotations

from collections.abc import Mapping
from datetime import date, datetime
from enum import StrEnum
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class DomainModel(BaseModel):
    model_config = ConfigDict(extra="forbid", frozen=True)


class SourceStore(StrEnum):
    GOOGLE_PLAY = "google_play"
    APPLE_APP_STORE = "apple_app_store"


class PrivacyStatus(StrEnum):
    APPROVED = "approved"
    REJECTED = "rejected"
    NEEDS_REVIEW = "needs_review"


class RunStatus(StrEnum):
    RUNNING = "running"
    COMPLETED = "completed"
    NEEDS_HUMAN_REVIEW = "needs_human_review"
    FAILED_TERMINAL = "failed_terminal"


class PrivacyFindingType(StrEnum):
    EMAIL = "email"
    PHONE = "phone"
    FINANCIAL_IDENTIFIER = "financial_identifier"
    DEVICE_OR_TRANSACTION_IDENTIFIER = "device_or_transaction_identifier"
    PERSONAL_URL_OR_HANDLE = "personal_url_or_handle"
    HIGH_CONFIDENCE_NAME = "high_confidence_name"


class RawReview(DomainModel):
    """Normalized, pre-privacy review data from a public export."""

    source_store: SourceStore
    source_review_key: str | None = Field(default=None, max_length=512)
    rating: int = Field(ge=1, le=5)
    title: str | None = Field(default=None, max_length=10_000)
    review_text: str = Field(min_length=1, max_length=50_000)
    source_datetime: datetime
    source_datetime_original: str = Field(min_length=1, max_length=128)
    language_code: str | None = Field(default=None, max_length=32)
    source_product_id: str = Field(min_length=1, max_length=256)
    is_public: bool


class ReviewRecord(DomainModel):
    review_id: UUID
    source_store: SourceStore
    source_review_key_hash: str | None
    rating: int = Field(ge=1, le=5)
    title: str | None
    review_text: str = Field(min_length=1)
    source_datetime: datetime
    source_datetime_original: str
    language_code: str | None
    imported_at: datetime
    source_batch_id: UUID
    content_fingerprint: str


class SanitizedReview(DomainModel):
    review_id: UUID
    sanitized_title: str | None
    sanitized_text: str | None
    privacy_status: PrivacyStatus
    privacy_finding_types: tuple[PrivacyFindingType, ...]
    sanitizer_version: str


class ParseRejection(DomainModel):
    source_store: SourceStore
    row_number: int | None = Field(default=None, ge=1)
    category: str = Field(min_length=1, max_length=80)


class SourceBatch(DomainModel):
    source_batch_id: UUID
    source_store: SourceStore
    source_path: str
    batch_fingerprint: str
    imported_at: datetime


class ImportMetrics(DomainModel):
    rows_read: int = Field(ge=0)
    accepted: int = Field(ge=0)
    malformed: int = Field(ge=0)
    out_of_window: int = Field(ge=0)
    privacy_rejected: int = Field(ge=0)
    needs_review: int = Field(ge=0)
    deduplicated: int = Field(ge=0)
    missing_title: int = Field(ge=0)
    missing_text: int = Field(ge=0)
    missing_date: int = Field(ge=0)
    missing_rating: int = Field(ge=0)
    source_counts: Mapping[str, int] = Field(default_factory=dict)
    rating_distribution: Mapping[str, int] = Field(default_factory=dict)
    review_volume_by_week: Mapping[str, int] = Field(default_factory=dict)
    language_distribution: Mapping[str, int] = Field(default_factory=dict)
    average_rating: float | None = None


class RunManifest(DomainModel):
    run_id: UUID
    run_key: str
    status: RunStatus
    period_start: date
    period_end: date
    config_version: str
    config_snapshot_hash: str
    sanitizer_version: str
    metrics: ImportMetrics
    rejection_categories: Mapping[str, int] = Field(default_factory=dict)
    started_at: datetime
    completed_at: datetime | None = None
    error_code: str | None = None
    document_id: str | None = None
    draft_id: str | None = None


class IngestionResult(DomainModel):
    manifest: RunManifest
    eligible_review_ids: tuple[UUID, ...]
    reused_existing_run: bool = False
