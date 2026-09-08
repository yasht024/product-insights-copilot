"""Deploy the same FastAPI application used by the local dashboard."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from product_insights.api.main import app  # noqa: F401
