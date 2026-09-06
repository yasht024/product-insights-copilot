"""Integrations layer exports."""

from product_insights.integrations.mcp_client import (
    initialize_mcp_client,
    preflight_check,
)
from product_insights.integrations.publishers import (
    create_gmail_draft,
    publish_to_google_docs,
)

__all__ = [
    "initialize_mcp_client",
    "preflight_check",
    "publish_to_google_docs",
    "create_gmail_draft",
]
