"""Conservative privacy screening that stores categories, never matched values."""

from __future__ import annotations

import re
import unicodedata

from product_insights.domain.models import (
    PrivacyFindingType,
    PrivacyStatus,
    ReviewRecord,
    SanitizedReview,
)

SANITIZER_VERSION = "v1"
EMAIL = re.compile(r"\b[\w.+-]+@[\w-]+(?:\.[\w-]+)+\b", re.IGNORECASE)
OBFUSCATED_EMAIL = re.compile(
    r"\b\w+\s*(?:\[at\]|\(at\)|at)\s*\w+(?:\s*(?:\[dot\]|\(dot\)|dot)\s*\w+)+", re.IGNORECASE
)
PHONE = re.compile(r"(?<!\d)(?:\+?91[\s.-]?)?[6-9]\d(?:[\s.-]?\d){8}(?!\d)")
FINANCIAL = re.compile(r"\b(?:[A-Z]{5}\d{4}[A-Z]|\d{12}|\d[ -]?){13,19}\b")
IDENTIFIER = re.compile(
    r"\b(?:account|device|order|ticket|transaction)(?:\s*(?:id|number)|\s+(?=[A-Z0-9-]*\d))[\s:#-]*[A-Z0-9][A-Z0-9-]{5,}\b",
    re.IGNORECASE,
)
PERSONAL_URL_OR_HANDLE = re.compile(r"(?:https?://\S+|\B@[A-Za-z0-9_]{3,})", re.IGNORECASE)
HIGH_CONFIDENCE_NAME = re.compile(r"\b(?:my name is|i am|i'm)\s+[A-Z][a-z]+\s+[A-Z][a-z]+\b")


def sanitize_review(record: ReviewRecord) -> SanitizedReview:
    detection_copy = _detection_copy("\n".join(filter(None, (record.title, record.review_text))))
    findings: set[PrivacyFindingType] = set()
    if EMAIL.search(detection_copy) or OBFUSCATED_EMAIL.search(detection_copy):
        findings.add(PrivacyFindingType.EMAIL)
    if PHONE.search(detection_copy):
        findings.add(PrivacyFindingType.PHONE)
    if FINANCIAL.search(detection_copy):
        findings.add(PrivacyFindingType.FINANCIAL_IDENTIFIER)
    if IDENTIFIER.search(detection_copy):
        findings.add(PrivacyFindingType.DEVICE_OR_TRANSACTION_IDENTIFIER)
    if PERSONAL_URL_OR_HANDLE.search(detection_copy):
        findings.add(PrivacyFindingType.PERSONAL_URL_OR_HANDLE)
    if HIGH_CONFIDENCE_NAME.search(detection_copy):
        findings.add(PrivacyFindingType.HIGH_CONFIDENCE_NAME)
    status = PrivacyStatus.APPROVED if not findings else PrivacyStatus.REJECTED
    return SanitizedReview(
        review_id=record.review_id,
        sanitized_title=record.title if status is PrivacyStatus.APPROVED else None,
        sanitized_text=record.review_text if status is PrivacyStatus.APPROVED else None,
        privacy_status=status,
        privacy_finding_types=tuple(sorted(findings, key=str)),
        sanitizer_version=SANITIZER_VERSION,
    )


def _detection_copy(value: str) -> str:
    normalized = unicodedata.normalize("NFKC", value).replace("\u200b", "").replace("\u200c", "")
    return re.sub(r"\s+", " ", normalized)
