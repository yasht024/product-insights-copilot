"""Strict, secret-free application configuration."""

from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path
from typing import Any, Literal

import yaml
from pydantic import BaseModel, ConfigDict, Field, ValidationError, field_validator, model_validator

APPROVED_GOOGLE_PLAY_PACKAGE = "com.nextbillion.groww"
APPROVED_APPLE_APP_STORE_ID = "1404871703"
SECRET_FIELD_PATTERN = re.compile(
    r"(?:api[_-]?key|access[_-]?token|refresh[_-]?token|client[_-]?secret|password|credential)",
    re.IGNORECASE,
)
EMAIL_PATTERN = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
CRON_FIELD_PATTERN = re.compile(r"^[\d*,/\-]+$")
CRON_RANGES = ((0, 59), (0, 23), (1, 31), (1, 12), (0, 7))


class StrictModel(BaseModel):
    """Base contract that rejects misspelled fields and cannot mutate mid-run."""

    model_config = ConfigDict(extra="forbid", frozen=True)


class ProductConfig(StrictModel):
    name: str = Field(min_length=1)
    google_play_package: str
    apple_app_store_id: str

    @model_validator(mode="after")
    def identifiers_match_approved_product(self) -> ProductConfig:
        if self.google_play_package != APPROVED_GOOGLE_PLAY_PACKAGE:
            raise ValueError("google_play_package does not match the approved Groww product")
        if self.apple_app_store_id != APPROVED_APPLE_APP_STORE_ID:
            raise ValueError("apple_app_store_id does not match the approved Groww product")
        return self


class SourceConfig(StrictModel):
    adapter: Literal["fixture_csv", "fixture_json", "approved_csv", "approved_json"]
    format: Literal["csv", "json"]
    provider: str = Field(min_length=1)
    approval_status: Literal["fixture_only", "approved", "suspended"]
    provenance_required: bool = True
    sample_path: str = Field(min_length=1)


class SourcesConfig(StrictModel):
    google_play: SourceConfig
    apple_app_store: SourceConfig


class ReportingConfig(StrictModel):
    lookback_weeks: int = Field(ge=8, le=12)
    timezone: Literal["Asia/Kolkata"]
    schedule: str
    minimum_eligible_reviews: int = Field(ge=1)
    max_themes: int = Field(ge=1, le=5)
    highlighted_themes: Literal[3]
    quote_count: Literal[3]
    action_count: Literal[3]
    max_words: int = Field(ge=1, le=250)
    naming_convention: str = Field(min_length=1)

    @field_validator("schedule")
    @classmethod
    def schedule_is_five_field_cron(cls, value: str) -> str:
        fields = value.split()
        if len(fields) != 5 or any(not CRON_FIELD_PATTERN.fullmatch(field) for field in fields):
            raise ValueError("schedule must be a valid five-field cron expression")
        for field, bounds in zip(fields, CRON_RANGES, strict=True):
            _validate_cron_field(field, *bounds)
        return value


class AnalysisConfig(StrictModel):
    framework: Literal["langchain"]
    provider: str = Field(min_length=1)
    model: str = Field(min_length=1)
    approved_for_production: bool
    temperature: float = Field(ge=0, le=2)
    max_concurrency: int = Field(ge=1, le=32)
    prompt_version: str = Field(pattern=r"^v\d+$")
    schema_version: str = Field(pattern=r"^v\d+$")


class WorkflowConfig(StrictModel):
    framework: Literal["langgraph"]
    checkpointer: Literal["sqlite", "postgresql"]


class ToolRolesConfig(StrictModel):
    document_upsert: Literal["docs_upsert", "google_docs_append_text"]
    draft_create: Literal["gmail_create_draft"]


class McpConfig(StrictModel):
    client: Literal["langchain-mcp-adapters"]
    server_alias: str | None = None
    transport: Literal["stdio", "sse"] = "stdio"
    server_url: str | None = None
    docs_server_alias: str | None = None
    gmail_server_alias: str | None = None
    capabilities_confirmed: bool
    tool_roles: ToolRolesConfig


class DeliveryConfig(StrictModel):
    google_drive_folder_id: str = Field(min_length=1)
    allowed_drive_folder_ids: tuple[str, ...]
    target_document_id: str | None = None
    sharing_policy: str = Field(min_length=1)
    recipient: str = Field(min_length=1)
    allowed_recipients: tuple[str, ...]
    create_email_draft_only: Literal[True]

    @field_validator("recipient")
    @classmethod
    def recipient_is_email_or_placeholder(cls, value: str) -> str:
        if value.startswith("pending-") or EMAIL_PATTERN.fullmatch(value):
            return value
        raise ValueError("recipient must be an email address or a pending-* placeholder")


class RetentionConfig(StrictModel):
    raw_import_days: int = Field(ge=1)
    sanitized_review_days: int = Field(ge=1)
    audit_days: int = Field(ge=1)
    policy_approved: bool

    @model_validator(mode="after")
    def retention_order_is_safe(self) -> RetentionConfig:
        if self.raw_import_days > self.sanitized_review_days:
            raise ValueError("raw_import_days must not exceed sanitized_review_days")
        if self.sanitized_review_days > self.audit_days:
            raise ValueError("sanitized_review_days must not exceed audit_days")
        return self


class PersistenceConfig(StrictModel):
    database_path: str = Field(min_length=1)
    fingerprint_key_environment_variable: str = Field(
        default="PRODUCT_INSIGHTS_FINGERPRINT_KEY", pattern=r"^[A-Z][A-Z0-9_]*$"
    )


class AppConfig(StrictModel):
    config_version: str = Field(pattern=r"^v\d+$")
    environment: Literal["development", "production"]
    product: ProductConfig
    sources: SourcesConfig
    reporting: ReportingConfig
    analysis: AnalysisConfig
    workflow: WorkflowConfig
    mcp: McpConfig
    delivery: DeliveryConfig
    retention: RetentionConfig
    persistence: PersistenceConfig

    def production_blockers(self) -> tuple[str, ...]:
        blockers: list[str] = []
        source_pairs = (
            ("Google Play", self.sources.google_play),
            ("Apple App Store", self.sources.apple_app_store),
        )
        for label, source in source_pairs:
            if source.approval_status != "approved" or source.adapter.startswith("fixture_"):
                blockers.append(f"{label} review source is not approved for production")
        if not self.analysis.approved_for_production or self.analysis.provider == "fake":
            blockers.append("LangChain model/provider is not approved for production")
        if not self.mcp.capabilities_confirmed:
            blockers.append("Docs/Drive and Gmail MCP capabilities are not confirmed")
        if self.delivery.recipient not in self.delivery.allowed_recipients:
            blockers.append("delivery recipient is not allowlisted")
        if self.delivery.google_drive_folder_id not in self.delivery.allowed_drive_folder_ids:
            blockers.append("Google Drive destination is not allowlisted")
        if not self.retention.policy_approved:
            blockers.append("retention policy is not approved")
        return tuple(blockers)

    def safe_snapshot_hash(self) -> str:
        payload = json.dumps(self.model_dump(mode="json"), sort_keys=True, separators=(",", ":"))
        return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def _reject_secret_fields(value: Any, path: tuple[str, ...] = ()) -> None:
    if isinstance(value, dict):
        for key, nested in value.items():
            current_path = (*path, str(key))
            if SECRET_FIELD_PATTERN.search(str(key)):
                raise ValueError(
                    f"secret-like configuration field is forbidden: {'.'.join(current_path)}"
                )
            _reject_secret_fields(nested, current_path)
    elif isinstance(value, list):
        for index, nested in enumerate(value):
            _reject_secret_fields(nested, (*path, str(index)))


def _validate_cron_field(field: str, minimum: int, maximum: int) -> None:
    for item in field.split(","):
        base, separator, step = item.partition("/")
        if separator and (not step.isdigit() or not 1 <= int(step) <= maximum):
            raise ValueError("schedule contains an invalid cron step")
        if base == "*":
            continue
        endpoints = base.split("-")
        if len(endpoints) > 2 or any(not endpoint.isdigit() for endpoint in endpoints):
            raise ValueError("schedule contains an invalid cron range")
        numbers = tuple(int(endpoint) for endpoint in endpoints)
        if any(number < minimum or number > maximum for number in numbers):
            raise ValueError("schedule contains a cron value outside its allowed range")
        if len(numbers) == 2 and numbers[0] > numbers[1]:
            raise ValueError("schedule contains a descending cron range")


def load_config(path: Path) -> AppConfig:
    """Load immutable configuration while rejecting secrets and unknown fields."""

    try:
        loaded = yaml.safe_load(path.read_text(encoding="utf-8"))
    except (OSError, yaml.YAMLError) as exc:
        raise ValueError(f"unable to load configuration: {exc}") from exc
    if not isinstance(loaded, dict):
        raise ValueError("configuration root must be a mapping")
    _reject_secret_fields(loaded)
    return AppConfig.model_validate(loaded)


__all__ = ["AppConfig", "ValidationError", "load_config"]
