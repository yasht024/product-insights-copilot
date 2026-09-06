"""SQLite repository for Phase 1 ingestion state."""

from __future__ import annotations

import json
import sqlite3
from datetime import date, datetime
from pathlib import Path
from uuid import UUID

from product_insights.domain.models import (
    ImportMetrics,
    PrivacyFindingType,
    PrivacyStatus,
    ReviewRecord,
    RunManifest,
    RunStatus,
    SanitizedReview,
    SourceBatch,
)

SCHEMA_VERSION = 1


class SQLiteRepository:
    def __init__(self, database_path: Path) -> None:
        self.database_path = database_path
        self.database_path.parent.mkdir(parents=True, exist_ok=True)
        self.connection = sqlite3.connect(database_path, check_same_thread=False)
        self.connection.row_factory = sqlite3.Row
        self.connection.execute("PRAGMA foreign_keys = ON")
        self.connection.execute("PRAGMA journal_mode = WAL")
        self.migrate()

    def close(self) -> None:
        self.connection.close()

    def migrate(self) -> None:
        with self.connection:
            self.connection.executescript(
                """
                CREATE TABLE IF NOT EXISTS schema_migrations (version INTEGER PRIMARY KEY);
                CREATE TABLE IF NOT EXISTS source_batches (
                    source_batch_id TEXT PRIMARY KEY, source_store TEXT NOT NULL,
                    source_path TEXT NOT NULL, batch_fingerprint TEXT NOT NULL, imported_at TEXT NOT NULL
                );
                CREATE TABLE IF NOT EXISTS run_manifests (
                    run_id TEXT PRIMARY KEY, run_key TEXT NOT NULL UNIQUE, status TEXT NOT NULL,
                    period_start TEXT NOT NULL, period_end TEXT NOT NULL, config_version TEXT NOT NULL,
                    config_snapshot_hash TEXT NOT NULL, sanitizer_version TEXT NOT NULL,
                    metrics_json TEXT NOT NULL, rejection_categories_json TEXT NOT NULL,
                    started_at TEXT NOT NULL, completed_at TEXT, error_code TEXT
                );
                CREATE TABLE IF NOT EXISTS raw_reviews (
                    review_id TEXT PRIMARY KEY, source_store TEXT NOT NULL, source_review_key_hash TEXT,
                    rating INTEGER NOT NULL, title TEXT, review_text TEXT NOT NULL,
                    source_datetime TEXT NOT NULL, source_datetime_original TEXT NOT NULL,
                    language_code TEXT, imported_at TEXT NOT NULL, source_batch_id TEXT NOT NULL,
                    content_fingerprint TEXT NOT NULL, FOREIGN KEY(source_batch_id) REFERENCES source_batches(source_batch_id)
                );
                CREATE UNIQUE INDEX IF NOT EXISTS raw_reviews_source_key ON raw_reviews(source_store, source_review_key_hash) WHERE source_review_key_hash IS NOT NULL;
                CREATE UNIQUE INDEX IF NOT EXISTS raw_reviews_fingerprint ON raw_reviews(source_store, content_fingerprint);
                CREATE TABLE IF NOT EXISTS sanitized_reviews (
                    review_id TEXT PRIMARY KEY, sanitized_title TEXT, sanitized_text TEXT,
                    privacy_status TEXT NOT NULL, privacy_finding_types_json TEXT NOT NULL,
                    sanitizer_version TEXT NOT NULL, FOREIGN KEY(review_id) REFERENCES raw_reviews(review_id)
                );
                CREATE TABLE IF NOT EXISTS run_reviews (
                    run_id TEXT NOT NULL, review_id TEXT NOT NULL, privacy_status TEXT NOT NULL,
                    PRIMARY KEY(run_id, review_id), FOREIGN KEY(run_id) REFERENCES run_manifests(run_id),
                    FOREIGN KEY(review_id) REFERENCES raw_reviews(review_id)
                );
                INSERT OR IGNORE INTO schema_migrations(version) VALUES (1);
                """
            )

    def existing_manifest(self, run_key: str) -> RunManifest | None:
        row = self.connection.execute(
            "SELECT * FROM run_manifests WHERE run_key = ?", (run_key,)
        ).fetchone()
        return self._manifest(row) if row else None

    def create_manifest(self, manifest: RunManifest) -> None:
        self._write_manifest(manifest)

    def complete_manifest(self, manifest: RunManifest) -> None:
        self._write_manifest(manifest)

    def add_batch(self, batch: SourceBatch) -> None:
        self.connection.execute(
            "INSERT INTO source_batches VALUES (?, ?, ?, ?, ?)",
            (
                str(batch.source_batch_id),
                batch.source_store.value,
                batch.source_path,
                batch.batch_fingerprint,
                batch.imported_at.isoformat(),
            ),
        )

    def store_review(self, record: ReviewRecord, sanitized: SanitizedReview) -> tuple[UUID, bool]:
        row = None
        if record.source_review_key_hash:
            row = self.connection.execute(
                "SELECT review_id FROM raw_reviews WHERE source_store = ? AND source_review_key_hash = ?",
                (record.source_store.value, record.source_review_key_hash),
            ).fetchone()
        if row is None:
            row = self.connection.execute(
                "SELECT review_id FROM raw_reviews WHERE source_store = ? AND content_fingerprint = ?",
                (record.source_store.value, record.content_fingerprint),
            ).fetchone()
        if row:
            return UUID(row["review_id"]), True
        self.connection.execute(
            "INSERT INTO raw_reviews VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (
                str(record.review_id),
                record.source_store.value,
                record.source_review_key_hash,
                record.rating,
                record.title,
                record.review_text,
                record.source_datetime.isoformat(),
                record.source_datetime_original,
                record.language_code,
                record.imported_at.isoformat(),
                str(record.source_batch_id),
                record.content_fingerprint,
            ),
        )
        self.connection.execute(
            "INSERT INTO sanitized_reviews VALUES (?, ?, ?, ?, ?, ?)",
            (
                str(sanitized.review_id),
                sanitized.sanitized_title,
                sanitized.sanitized_text,
                sanitized.privacy_status.value,
                json.dumps([finding.value for finding in sanitized.privacy_finding_types]),
                sanitized.sanitizer_version,
            ),
        )
        return record.review_id, False

    def link_run_review(self, run_id: UUID, review_id: UUID, status: PrivacyStatus) -> None:
        self.connection.execute(
            "INSERT OR REPLACE INTO run_reviews VALUES (?, ?, ?)",
            (str(run_id), str(review_id), status.value),
        )

    def eligible_ids(self, run_id: UUID) -> tuple[UUID, ...]:
        rows = self.connection.execute(
            "SELECT review_id FROM run_reviews WHERE run_id = ? AND privacy_status = ? ORDER BY review_id",
            (str(run_id), PrivacyStatus.APPROVED.value),
        ).fetchall()
        return tuple(UUID(row["review_id"]) for row in rows)

    def fetch_sanitized(self, review_ids: list[UUID]) -> list[SanitizedReview]:
        if not review_ids:
            return []
        
        results = []
        batch_size = 500
        for i in range(0, len(review_ids), batch_size):
            batch_ids = review_ids[i:i + batch_size]
            placeholders = ",".join("?" for _ in batch_ids)
            query = f"SELECT * FROM sanitized_reviews WHERE review_id IN ({placeholders})"
            rows = self.connection.execute(query, [str(rid) for rid in batch_ids]).fetchall()
            for row in rows:
                results.append(
                    SanitizedReview(
                        review_id=UUID(row["review_id"]),
                        sanitized_title=row["sanitized_title"],
                        sanitized_text=row["sanitized_text"],
                        privacy_status=PrivacyStatus(row["privacy_status"]),
                        privacy_finding_types=tuple(PrivacyFindingType(t) for t in json.loads(row["privacy_finding_types_json"])),
                        sanitizer_version=row["sanitizer_version"]
                    )
                )
        return results

    def transaction(self) -> sqlite3.Connection:
        return self.connection

    def _write_manifest(self, manifest: RunManifest) -> None:
        self.connection.execute(
            """INSERT OR REPLACE INTO run_manifests VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                str(manifest.run_id),
                manifest.run_key,
                manifest.status.value,
                manifest.period_start.isoformat(),
                manifest.period_end.isoformat(),
                manifest.config_version,
                manifest.config_snapshot_hash,
                manifest.sanitizer_version,
                json.dumps(manifest.metrics.model_dump(mode="json"), sort_keys=True),
                json.dumps(manifest.rejection_categories, sort_keys=True),
                manifest.started_at.isoformat(),
                manifest.completed_at.isoformat() if manifest.completed_at else None,
                manifest.error_code,
            ),
        )

    def _manifest(self, row: sqlite3.Row) -> RunManifest:
        return RunManifest(
            run_id=UUID(row["run_id"]),
            run_key=row["run_key"],
            status=RunStatus(row["status"]),
            period_start=date.fromisoformat(row["period_start"]),
            period_end=date.fromisoformat(row["period_end"]),
            config_version=row["config_version"],
            config_snapshot_hash=row["config_snapshot_hash"],
            sanitizer_version=row["sanitizer_version"],
            metrics=ImportMetrics.model_validate(json.loads(row["metrics_json"])),
            rejection_categories=json.loads(row["rejection_categories_json"]),
            started_at=datetime.fromisoformat(row["started_at"]),
            completed_at=datetime.fromisoformat(row["completed_at"])
            if row["completed_at"]
            else None,
            error_code=row["error_code"],
        )

    def backup(self, backup_dir: Path) -> Path:
        """Create a safe backup of the current database."""
        backup_dir.mkdir(parents=True, exist_ok=True)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_path = backup_dir / f"{self.database_path.stem}_{timestamp}.sqlite3"
        with sqlite3.connect(backup_path) as backup_conn:
            self.connection.backup(backup_conn)
        return backup_path

    def purge_old_records(self, raw_days: int, sanitized_days: int, audit_days: int) -> dict[str, int]:
        """Purge old records based on retention policy."""
        counts = {"raw": 0, "sanitized": 0, "audit": 0}
        with self.connection:
            # 1. Purge old run manifests
            cursor = self.connection.execute(
                "DELETE FROM run_manifests WHERE started_at < datetime('now', ?)",
                (f"-{audit_days} days",)
            )
            counts["audit"] = cursor.rowcount

            # 2. Delete orphaned run_reviews (run_id deleted)
            self.connection.execute(
                "DELETE FROM run_reviews WHERE run_id NOT IN (SELECT run_id FROM run_manifests)"
            )

            # 3. Purge old sanitized reviews
            cursor = self.connection.execute(
                """
                DELETE FROM sanitized_reviews 
                WHERE review_id IN (
                    SELECT review_id FROM raw_reviews WHERE imported_at < datetime('now', ?)
                )
                """,
                (f"-{sanitized_days} days",)
            )
            counts["sanitized"] = cursor.rowcount

            # 4. Clean up run_reviews for raw_reviews that will be deleted
            self.connection.execute(
                """
                DELETE FROM run_reviews 
                WHERE review_id IN (
                    SELECT review_id FROM raw_reviews WHERE imported_at < datetime('now', ?)
                )
                """,
                (f"-{raw_days} days",)
            )

            # 5. Delete raw reviews
            cursor = self.connection.execute(
                "DELETE FROM raw_reviews WHERE imported_at < datetime('now', ?)",
                (f"-{raw_days} days",)
            )
            counts["raw"] = cursor.rowcount

            # 6. Delete empty source batches
            self.connection.execute(
                "DELETE FROM source_batches WHERE source_batch_id NOT IN (SELECT source_batch_id FROM raw_reviews)"
            )
            
        return counts

