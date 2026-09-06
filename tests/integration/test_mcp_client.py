"""Integration tests for MCP Client."""

import pytest
from pydantic import ValidationError

from product_insights.config import AppConfig
from product_insights.integrations.mcp_client import preflight_check


@pytest.mark.asyncio
async def test_preflight_check_missing_tools(mocker, fixture_config: AppConfig):
    """Ensure preflight_check fails if required tools are missing."""
    mock_client = mocker.AsyncMock()
    # Return empty list of tools
    mock_client.get_tools.return_value = []
    
    with pytest.raises(ValueError, match="Missing required tools"):
        await preflight_check(mock_client, fixture_config)


@pytest.mark.asyncio
async def test_preflight_check_with_send_tools(mocker, fixture_config: AppConfig):
    """Ensure preflight_check fails if gmail send tool exists."""
    mock_client = mocker.AsyncMock()
    
    class MockTool:
        def __init__(self, name):
            self.name = name

    # Include required tools and a forbidden send tool
    mock_client.get_tools.return_value = [
        MockTool(fixture_config.mcp.tool_roles.document_upsert),
        MockTool(fixture_config.mcp.tool_roles.draft_create),
        MockTool("gmail_send_email"),
    ]
    
    with pytest.raises(ValueError, match="Found forbidden send capabilities"):
        await preflight_check(mock_client, fixture_config)


@pytest.mark.asyncio
async def test_preflight_check_success(mocker, fixture_config: AppConfig):
    """Ensure preflight_check passes when only required tools are present."""
    mock_client = mocker.AsyncMock()
    
    class MockTool:
        def __init__(self, name):
            self.name = name

    mock_client.get_tools.return_value = [
        MockTool(fixture_config.mcp.tool_roles.document_upsert),
        MockTool(fixture_config.mcp.tool_roles.draft_create),
    ]
    
    # Should not raise
    await preflight_check(mock_client, fixture_config)
