"""Shared safe parsing helpers for public review exports."""

from __future__ import annotations

import csv
import hashlib
import json
from collections.abc import Iterator, Mapping, Sequence
from datetime import UTC, date, datetime, time
from pathlib import Path
from typing import Never
from zoneinfo import ZoneInfo

from product_insights.domain.errors import SourceSchemaError, UnsupportedSourceError
from product_insights.domain.models import ParseRejection, RawReview, SourceStore

IST = ZoneInfo("Asia/Kolkata")
MAX_FIELD_LENGTH = 50_000


def normalized_headers(fieldnames: Sequence[str] | None) -> dict[str, str]:
    if not fieldnames:
        raise SourceSchemaError("empty_export", "export has no header row")
    result: dict[str, str] = {}
    for fieldname in fieldnames:
        normalized = fieldname.strip().casefold()
        if not normalized or normalized in result:
            raise SourceSchemaError("ambiguous_headers", "export contains ambiguous headers")
        result[normalized] = fieldname
    return result


def required_columns(headers: Mapping[str, str], required: set[str]) -> None:
    if required.difference(headers):
        raise SourceSchemaError(
            "missing_required_column", "export is missing required review fields"
        )


def read_csv_rows(path: Path) -> Iterator[tuple[int, dict[str, str]]]:
    if path.suffix.casefold() != ".csv":
        raise UnsupportedSourceError("unsupported_format", "CSV adapter requires a .csv file")
    try:
        with path.open("r", encoding="utf-8-sig", newline="") as file:
            reader = csv.DictReader(file, restkey="__extra_columns__")
            headers = normalized_headers(reader.fieldnames)
            yield 0, headers
            for row_number, row in enumerate(reader, start=2):
                if row.get("__extra_columns__"):
                    yield row_number, {"__rejection__": "extra_columns"}
                else:
                    yield (
                        row_number,
                        {key: value or "" for key, value in row.items() if key is not None},
                    )
    except UnicodeDecodeError as exc:
        raise SourceSchemaError("unsupported_encoding", "CSV export must be UTF-8") from exc
    except csv.Error as exc:
        raise SourceSchemaError("malformed_csv", "CSV export is malformed") from exc
    except OSError as exc:
        raise SourceSchemaError("unreadable_export", "CSV export cannot be read") from exc


def read_json_rows(path: Path) -> list[dict[str, object]]:
    if path.suffix.casefold() != ".json":
        raise UnsupportedSourceError("unsupported_format", "JSON adapter requires a .json file")
    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
    except UnicodeDecodeError as exc:
        raise SourceSchemaError("unsupported_encoding", "JSON export must be UTF-8") from exc
    except (OSError, json.JSONDecodeError) as exc:
        raise SourceSchemaError("malformed_json", "JSON export is malformed") from exc
    if not isinstance(payload, list):
        raise SourceSchemaError("invalid_json_shape", "JSON export must contain a top-level array")
    if len(payload) > 100_000:
        raise SourceSchemaError("oversized_export", "JSON export exceeds the row limit")
    rows: list[dict[str, object]] = []
    for item in payload:
        if not isinstance(item, dict):
            rows.append({"__rejection__": "invalid_json_row"})
        elif _json_depth(item) > 8:
            rows.append({"__rejection__": "nested_json_row"})
        else:
            rows.append(item)
    return rows


def parse_rating(value: object) -> int:
    if isinstance(value, bool):
        raise ValueError("invalid_rating")
    if isinstance(value, int) and 1 <= value <= 5:
        return value
    if isinstance(value, str) and value.strip().isdigit() and 1 <= int(value.strip()) <= 5:
        return int(value.strip())
    raise ValueError("invalid_rating")


def parse_datetime(value: object) -> tuple[datetime, str]:
    if not isinstance(value, str) or not value.strip():
        raise ValueError("missing_date")
    original = value.strip()
    try:
        parsed = datetime.fromisoformat(original.replace("Z", "+00:00"))
    except ValueError as exc:
        raise ValueError("invalid_date") from exc
    if parsed.tzinfo is None:
        parsed = datetime.combine(parsed.date(), time.min, IST)
    return parsed.astimezone(IST), original


def clean_text(value: object, *, allow_empty: bool = False) -> str | None:
    if value is None:
        return None if allow_empty else _raise("missing_text")
    if not isinstance(value, str):
        return _raise("invalid_text")
    if "\x00" in value or len(value) > MAX_FIELD_LENGTH:
        return _raise("unsafe_text")
    cleaned = value.strip()
    if not cleaned:
        return None if allow_empty else _raise("missing_text")
    return cleaned


def row_batch_fingerprint(path: Path, store: SourceStore) -> str:
    digest = hashlib.sha256()
    digest.update(store.value.encode("utf-8"))
    digest.update(path.read_bytes())
    return digest.hexdigest()


def source_date_in_window(review: RawReview, start: date, end: date) -> bool:
    return start <= review.source_datetime.astimezone(IST).date() <= end


def now_ist() -> datetime:
    return datetime.now(UTC).astimezone(IST)


def _json_depth(value: object, depth: int = 0) -> int:
    if isinstance(value, dict):
        return max((_json_depth(item, depth + 1) for item in value.values()), default=depth)
    if isinstance(value, list):
        return max((_json_depth(item, depth + 1) for item in value), default=depth)
    return depth


def _raise(category: str) -> Never:
    raise ValueError(category)


def rejection(store: SourceStore, row_number: int | None, category: str) -> ParseRejection:
    return ParseRejection(source_store=store, row_number=row_number, category=category)
