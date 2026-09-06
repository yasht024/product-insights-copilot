$ErrorActionPreference = "Stop"

ruff format --check .
ruff check .
mypy src tests scripts
pytest
python scripts/check_secrets.py
pip-audit -r requirements.lock
