from __future__ import annotations

import json
from datetime import date
from pathlib import Path

from product_insights.config import AppConfig, load_config
from product_insights.domain.ports import ReviewSource
from product_insights.ingestion import (
    AppStoreExportSource,
    GooglePlayExportSource,
    IngestionService,
)
from product_insights.persistence import SQLiteRepository


def sources(config: AppConfig) -> list[ReviewSource]:
    return [
        GooglePlayExportSource(
            Path(config.sources.google_play.sample_path), config.product.google_play_package
        ),
        AppStoreExportSource(
            Path(config.sources.apple_app_store.sample_path), config.product.apple_app_store_id
        ),
    ]


def test_fixture_ingestion_is_reproducible_and_manifest_is_content_safe(tmp_path: Path) -> None:
    config = load_config(Path("config/default.yaml"))
    repository = SQLiteRepository(tmp_path / "reviews.sqlite3")
    service = IngestionService(config, repository, b"test-key")

    first = service.run(date(2026, 8, 30), sources(config))
    second = service.run(date(2026, 8, 30), sources(config))

    assert first.reused_existing_run is False
    assert second.reused_existing_run is True
    assert first.eligible_review_ids == second.eligible_review_ids
    assert first.manifest.metrics.rows_read == 18
    assert first.manifest.metrics.deduplicated == 2
    assert first.manifest.metrics.privacy_rejected == 2
    audit = repository.connection.execute(
        "SELECT metrics_json, rejection_categories_json FROM run_manifests"
    ).fetchone()
    assert audit is not None
    assert "fixture.user@example.invalid" not in json.dumps(dict(audit))
    assert "reviewer_name" not in " ".join(
        row["name"]
        for row in repository.connection.execute("PRAGMA table_info(raw_reviews)").fetchall()
    )
    repository.close()
