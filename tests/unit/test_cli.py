from __future__ import annotations

from pathlib import Path

import yaml
from pytest import MonkeyPatch

from product_insights.cli import main


def test_development_config_check_passes(capsys: object) -> None:
    assert main(["config-check"]) == 0


def test_production_config_check_fails_closed(capsys: object) -> None:
    assert main(["config-check", "--production"]) == 3


def test_production_environment_triggers_readiness_without_flag(tmp_path: Path) -> None:
    config = yaml.safe_load(Path("config/default.yaml").read_text(encoding="utf-8"))
    config["environment"] = "production"
    path = tmp_path / "production.yaml"
    path.write_text(yaml.safe_dump(config), encoding="utf-8")

    assert main(["config-check", "--config", str(path)]) == 3


def test_ingest_requires_runtime_fingerprint_key(tmp_path: Path, monkeypatch: MonkeyPatch) -> None:
    monkeypatch.delenv("PRODUCT_INSIGHTS_FINGERPRINT_KEY", raising=False)

    assert (
        main(["ingest", "--as-of", "2026-08-30", "--database", str(tmp_path / "reviews.db")]) == 2
    )


def test_fixture_ingestion_cli_is_idempotent(tmp_path: Path, monkeypatch: MonkeyPatch) -> None:
    monkeypatch.setenv("PRODUCT_INSIGHTS_FINGERPRINT_KEY", "test-key")
    arguments = ["ingest", "--as-of", "2026-08-30", "--database", str(tmp_path / "reviews.db")]

    assert main(arguments) == 0
    assert main(arguments) == 0
