"""Framework-independent ports for review ingestion."""

from __future__ import annotations

from collections.abc import Iterator
from datetime import date
from pathlib import Path
from typing import Protocol

from product_insights.domain.models import ParseRejection, RawReview, SourceStore


class ReviewSource(Protocol):
    store: SourceStore
    path: Path

    def load(
        self, period_start: date, period_end: date
    ) -> Iterator[RawReview | ParseRejection]: ...
