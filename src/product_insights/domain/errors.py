"""Sanitized application errors used by the ingestion pipeline."""

from __future__ import annotations


class IngestionError(Exception):
    """A safe operational error that never embeds source content."""

    def __init__(self, code: str, message: str) -> None:
        super().__init__(message)
        self.code = code


class SourceSchemaError(IngestionError):
    pass


class UnsupportedSourceError(IngestionError):
    pass
