"""Apple App Store public JSON export adapter."""

from __future__ import annotations

from collections.abc import Iterator
from datetime import date
from pathlib import Path
from typing import ClassVar

from product_insights.domain.models import ParseRejection, RawReview, SourceStore
from product_insights.ingestion.base import (
    clean_text,
    parse_datetime,
    parse_rating,
    read_json_rows,
    rejection,
    source_date_in_window,
)


class AppStoreExportSource:
    store = SourceStore.APPLE_APP_STORE
    _REQUIRED_FIELDS: ClassVar[set[str]] = {"app_id", "rating", "text", "review_date", "is_public"}

    def __init__(self, path: Path, expected_product_id: str) -> None:
        self.path = path
        self.expected_product_id = expected_product_id

    def load(self, period_start: date, period_end: date) -> Iterator[RawReview | ParseRejection]:
        for row_number, row in enumerate(read_json_rows(self.path), start=1):
            if "__rejection__" in row:
                yield rejection(self.store, row_number, str(row["__rejection__"]))
                continue
            if self._REQUIRED_FIELDS.difference(row):
                yield rejection(self.store, row_number, "missing_required_field")
                continue
            try:
                review = self._map_row(row)
            except ValueError as exc:
                yield rejection(self.store, row_number, str(exc))
                continue
            if review.source_product_id != self.expected_product_id:
                yield rejection(self.store, row_number, "unexpected_product")
            elif not review.is_public:
                yield rejection(self.store, row_number, "non_public_review")
            elif not source_date_in_window(review, period_start, period_end):
                yield rejection(self.store, row_number, "out_of_window")
            else:
                yield review

    def _map_row(self, row: dict[str, object]) -> RawReview:
        reviewed_at, original = parse_datetime(row["review_date"])
        return RawReview(
            source_store=self.store,
            source_review_key=clean_text(row.get("review_id"), allow_empty=True),
            rating=parse_rating(row["rating"]),
            title=clean_text(row.get("title"), allow_empty=True),
            review_text=clean_text(row["text"]) or "",
            source_datetime=reviewed_at,
            source_datetime_original=original,
            language_code=clean_text(row.get("language"), allow_empty=True),
            source_product_id=clean_text(row["app_id"]) or "",
            is_public=row["is_public"] is True,
        )
