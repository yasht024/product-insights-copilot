# Product Insights Copilot

Privacy-safe weekly product insights from approved Google Play and Apple App
Store review exports. The project is currently at **Phase 0: readiness and
project setup**.

## Requirements

- Python 3.12, 3.13, or 3.14
- Dependencies installed from `requirements.lock`

## Setup

```powershell
py -3.14 -m venv .venv
.venv\Scripts\python -m pip install --upgrade pip
.venv\Scripts\python -m pip install -r requirements.lock
.venv\Scripts\python -m pip install --no-deps --no-build-isolation .
```

Use any supported Python version and its matching launcher flag.

## Commands

```powershell
product-insights config-check
product-insights config-check --production
pytest
ruff format --check .
ruff check .
mypy src tests scripts
python scripts/check_secrets.py
pip-audit -r requirements.lock
```

The default configuration is intentionally fixture-only. The first command
passes for development; the production command reports unresolved external
approvals and exits non-zero.

See [Phase 0 decisions](docs/phase0-decisions.md) for the readiness record.
