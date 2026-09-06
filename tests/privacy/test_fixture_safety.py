from __future__ import annotations

import csv
import hashlib
import json
from pathlib import Path

import yaml

FIXTURE_ROOT = Path("tests/fixtures")


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def test_fixture_manifest_hashes_and_counts_match() -> None:
    manifest = yaml.safe_load((FIXTURE_ROOT / "manifest.yaml").read_text(encoding="utf-8"))
    for relative_path, metadata in manifest["files"].items():
        path = FIXTURE_ROOT / relative_path
        assert metadata["sha256"] == sha256(path)

    with (FIXTURE_ROOT / "google_play/reviews.csv").open(encoding="utf-8", newline="") as file:
        assert sum(1 for _ in csv.DictReader(file)) == 10
    app_store = json.loads((FIXTURE_ROOT / "app_store/reviews.json").read_text(encoding="utf-8"))
    assert len(app_store) == 8


def test_fixtures_are_explicitly_synthetic_and_cover_safety_cases() -> None:
    contents = "\n".join(
        path.read_text(encoding="utf-8") for path in FIXTURE_ROOT.rglob("*") if path.is_file()
    )
    assert "SYNTHETIC_USER_" in contents
    assert "example.invalid" in contents
    assert "Ignore prior instructions" in contents
    assert "not-a-number" in contents
    assert "fixture_only" in contents
