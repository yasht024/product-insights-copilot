from __future__ import annotations

from copy import deepcopy
from pathlib import Path
from typing import Any

import pytest
import yaml
from pydantic import ValidationError

from product_insights.config import AppConfig, load_config

DEFAULT_CONFIG = Path("config/default.yaml")


@pytest.fixture
def raw_config() -> dict[str, Any]:
    loaded = yaml.safe_load(DEFAULT_CONFIG.read_text(encoding="utf-8"))
    assert isinstance(loaded, dict)
    return loaded


def parse(raw: dict[str, Any]) -> AppConfig:
    return AppConfig.model_validate(raw)


def test_default_config_is_valid_for_fixture_development() -> None:
    config = load_config(DEFAULT_CONFIG)

    assert config.environment == "development"
    assert config.product.google_play_package == "com.nextbillion.groww"
    assert config.product.apple_app_store_id == "1404871703"
    assert config.production_blockers()


@pytest.mark.parametrize("lookback", [8, 10, 12])
def test_allowed_lookback_boundaries(raw_config: dict[str, Any], lookback: int) -> None:
    raw_config["reporting"]["lookback_weeks"] = lookback
    assert parse(raw_config).reporting.lookback_weeks == lookback


@pytest.mark.parametrize("lookback", [7, 13, -1, 8.5, "ten", None])
def test_invalid_lookbacks_are_rejected(raw_config: dict[str, Any], lookback: Any) -> None:
    raw_config["reporting"]["lookback_weeks"] = lookback
    with pytest.raises(ValidationError):
        parse(raw_config)


@pytest.mark.parametrize(
    "schedule",
    [
        "60 9 * * 1",
        "0 24 * * 1",
        "0 9 0 * 1",
        "0 9 * 13 1",
        "0 9 * * 8",
        "0 9 * * 5-1",
        "*/0 9 * * 1",
        "0 9 * * MON",
    ],
)
def test_invalid_cron_values_are_rejected(raw_config: dict[str, Any], schedule: str) -> None:
    raw_config["reporting"]["schedule"] = schedule
    with pytest.raises(ValidationError, match="schedule"):
        parse(raw_config)


@pytest.mark.parametrize(
    ("path", "value"),
    [
        (("product", "google_play_package"), "com.example.other"),
        (("product", "apple_app_store_id"), "9999999999"),
        (("reporting", "timezone"), "UTC"),
        (("reporting", "schedule"), "not a cron"),
        (("reporting", "max_themes"), 6),
        (("reporting", "highlighted_themes"), 2),
        (("reporting", "quote_count"), 4),
        (("reporting", "action_count"), 0),
        (("reporting", "max_words"), 251),
        (("delivery", "create_email_draft_only"), False),
        (("retention", "raw_import_days"), -1),
    ],
)
def test_safety_invariants_are_rejected(
    raw_config: dict[str, Any], path: tuple[str, str], value: Any
) -> None:
    raw_config[path[0]][path[1]] = value
    with pytest.raises(ValidationError):
        parse(raw_config)


def test_unknown_fields_are_rejected(raw_config: dict[str, Any]) -> None:
    raw_config["reporting"]["lookbak_weeks"] = 10
    with pytest.raises(ValidationError, match="lookbak_weeks"):
        parse(raw_config)


def test_configuration_is_immutable(raw_config: dict[str, Any]) -> None:
    config = parse(raw_config)
    with pytest.raises(ValidationError):
        config.reporting.lookback_weeks = 8


def test_snapshot_hash_is_stable_and_content_sensitive(raw_config: dict[str, Any]) -> None:
    original = parse(raw_config)
    changed_raw = deepcopy(raw_config)
    changed_raw["reporting"]["minimum_eligible_reviews"] = 21
    changed = parse(changed_raw)

    assert original.safe_snapshot_hash() == parse(deepcopy(raw_config)).safe_snapshot_hash()
    assert original.safe_snapshot_hash() != changed.safe_snapshot_hash()


def test_secret_like_fields_are_rejected_before_schema_validation(
    tmp_path: Path, raw_config: dict[str, Any]
) -> None:
    raw_config["analysis"]["api_key"] = "synthetic-value"  # pragma: allowlist secret
    path = tmp_path / "unsafe.yaml"
    path.write_text(yaml.safe_dump(raw_config), encoding="utf-8")

    with pytest.raises(ValueError, match="secret-like configuration field"):
        load_config(path)


def test_production_blockers_clear_only_for_approved_values(raw_config: dict[str, Any]) -> None:
    for source in raw_config["sources"].values():
        source["adapter"] = "approved_csv"
        source["format"] = "csv"
        source["provider"] = "approved-export-provider"
        source["approval_status"] = "approved"
    raw_config["analysis"].update(
        provider="approved-provider", model="approved-model", approved_for_production=True
    )
    raw_config["mcp"]["capabilities_confirmed"] = True
    raw_config["delivery"].update(
        google_drive_folder_id="approved-folder",
        allowed_drive_folder_ids=["approved-folder"],
        recipient="product@example.invalid",
        allowed_recipients=["product@example.invalid"],
    )
    raw_config["retention"]["policy_approved"] = True

    assert parse(raw_config).production_blockers() == ()


@pytest.mark.parametrize(
    "section_update, expected",
    [
        ({"recipient": "outside@example.invalid"}, "recipient"),
        ({"google_drive_folder_id": "outside-folder"}, "Drive"),
    ],
)
def test_delivery_allowlists_block_unapproved_targets(
    raw_config: dict[str, Any], section_update: dict[str, Any], expected: str
) -> None:
    raw_config["delivery"].update(
        recipient="inside@example.invalid",
        allowed_recipients=["inside@example.invalid"],
        google_drive_folder_id="inside-folder",
        allowed_drive_folder_ids=["inside-folder"],
    )
    raw_config["delivery"].update(section_update)

    assert expected in " ".join(parse(raw_config).production_blockers())


def test_retention_order_is_rejected(raw_config: dict[str, Any]) -> None:
    raw_config["retention"].update(raw_import_days=200, sanitized_review_days=100)
    with pytest.raises(ValidationError, match="raw_import_days"):
        parse(raw_config)
