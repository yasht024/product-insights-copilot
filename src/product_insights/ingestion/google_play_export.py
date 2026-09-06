"""Google Play public CSV export adapter."""

from __future__ import annotations

from collections.abc import Iterator
from datetime import date
from pathlib import Path

from product_insights.domain.models import ParseRejection, RawReview, SourceStore
from product_insights.ingestion.base import (
    clean_text,
    parse_datetime,
    parse_rating,
    read_csv_rows,
    rejection,
    required_columns,
    source_date_in_window,
)


class GooglePlayExportSource:
    store = SourceStore.GOOGLE_PLAY

    def __init__(self, path: Path, expected_product_id: str) -> None:
        self.path = path
        self.expected_product_id = expected_product_id

    def load(self, period_start: date, period_end: date) -> Iterator[RawReview | ParseRejection]:
        rows = read_csv_rows(self.path)
        _, headers = next(rows)
        required_columns(headers, {"product_id", "rating", "text", "review_date", "is_public"})
        for row_number, row in rows:
            if "__rejection__" in row:
                yield rejection(self.store, row_number, row["__rejection__"])
                continue
            try:
                review = self._map_row(row, headers)
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

    def _map_row(self, row: dict[str, str], headers: dict[str, str]) -> RawReview:
        def value(name: str) -> str:
            return row.get(headers.get(name, ""), "")

        reviewed_at, original = parse_datetime(value("review_date"))
        return RawReview(
            source_store=self.store,
            source_review_key=clean_text(value("review_id"), allow_empty=True),
            rating=parse_rating(value("rating")),
            title=clean_text(value("title"), allow_empty=True),
            review_text=clean_text(value("text")) or "",
            source_datetime=reviewed_at,
            source_datetime_original=original,
            language_code=clean_text(value("language"), allow_empty=True),
            source_product_id=clean_text(value("product_id")) or "",
            is_public=value("is_public").casefold() == "true",
        )
