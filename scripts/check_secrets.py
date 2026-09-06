"""Fail when detect-secrets finds a candidate in repository-owned files."""

from __future__ import annotations

from pathlib import Path

from detect_secrets.core.secrets_collection import SecretsCollection
from detect_secrets.settings import default_settings

ROOT = Path(__file__).resolve().parents[1]
EXCLUDED_DIRECTORIES = {
    ".git",
    ".mypy_cache",
    ".pytest_cache",
    ".ruff_cache",
    ".venv",
    "build",
    "dist",
    "__pycache__",
}
EXCLUDED_FILES = {
    Path(".coverage"),
    Path("requirements.lock"),
    Path("tests/fixtures/manifest.yaml"),
}


def repository_files() -> list[Path]:
    files: list[Path] = []
    for path in ROOT.rglob("*"):
        relative = path.relative_to(ROOT)
        if (
            path.is_file()
            and not set(relative.parts).intersection(EXCLUDED_DIRECTORIES)
            and not relative.name.startswith(".coverage.")
            and relative not in EXCLUDED_FILES
        ):
            files.append(path)
    return files


def main() -> int:
    secrets = SecretsCollection()
    with default_settings():
        for path in repository_files():
            secrets.scan_file(str(path))

    findings = [
        (Path(filename).relative_to(ROOT), secret.line_number, secret.type)
        for filename, candidates in secrets.data.items()
        for secret in candidates
    ]
    if findings:
        print("Secret scan failed; candidate values are intentionally suppressed:")
        for filename, line_number, secret_type in findings:
            print(f"- {filename}:{line_number} ({secret_type})")
        return 1

    print(f"Secret scan passed across {len(repository_files())} repository files")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
