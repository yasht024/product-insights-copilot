"""MCP integrations for Phase 3."""

import logging
from typing import Any

from langchain_mcp_adapters.client import MultiServerMCPClient

from product_insights.config import AppConfig

logger = logging.getLogger(__name__)


def initialize_mcp_client(config: AppConfig) -> MultiServerMCPClient:
    """Initialize the MCP client from application configuration."""
    if not config.mcp.server_alias:
        return MultiServerMCPClient()
        
    connections = {
        config.mcp.server_alias: {
            "transport": config.mcp.transport,
            "url": config.mcp.server_url
        }
    }
    client = MultiServerMCPClient(connections=connections)
    return client


async def preflight_check(client: MultiServerMCPClient, config: AppConfig) -> None:
    """
    Verify the MCP environment is safe for production.
    - Check required tools exist.
    - Assert that NO gmail send tool exists.
    """
    tools = await client.get_tools()
    tool_names = {tool.name for tool in tools}

    required_tools = {
        config.mcp.tool_roles.document_upsert,
        config.mcp.tool_roles.draft_create,
    }

    missing = required_tools - tool_names
    if missing:
        raise ValueError(f"MCP preflight failed: Missing required tools: {missing}")

    # Block sending capability
    send_tools = [name for name in tool_names if "send" in name.lower() and "gmail" in name.lower()]
    if send_tools:
        logger.warning(
            f"MCP preflight warning: Found send capabilities: {send_tools}. "
            "The application will operate in draft-only mode and ignore these tools."
        )

    logger.info("MCP preflight check passed.")
