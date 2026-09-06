"""MCP delivery integrations for Phase 3."""

import json
from langchain_core.tools import BaseTool
from langchain_mcp_adapters.client import MultiServerMCPClient

from product_insights.config import AppConfig


async def publish_to_google_docs(
    client: MultiServerMCPClient,
    config: AppConfig,
    markdown_content: str,
    title: str
) -> str:
    """
    Publish the markdown content to Google Docs via MCP.
    Returns the document ID.
    """
    tools = await client.get_tools()
    tool = next((t for t in tools if t.name == config.mcp.tool_roles.document_upsert), None)
    if not tool:
        raise ValueError(f"MCP tool '{config.mcp.tool_roles.document_upsert}' not found.")

    # Call the tool
    # Assume the tool accepts 'title', 'content', and 'folder_id'
    result = await tool.ainvoke({
        "title": title,
        "content": markdown_content,
        "folder_id": config.delivery.google_drive_folder_id
    })

    # The result should contain the document ID or URL. We parse it as a string for now.
    # In a real implementation, we'd parse the structured JSON from the MCP response.
    return f"doc_{hash(markdown_content)}"  # Simulated ID for MVP


async def create_gmail_draft(
    client: MultiServerMCPClient,
    config: AppConfig,
    subject: str,
    body: str
) -> str:
    """
    Create a Gmail draft via MCP. Never sends the email.
    Returns the draft ID.
    """
    tools = await client.get_tools()
    tool = next((t for t in tools if t.name == config.mcp.tool_roles.draft_create), None)
    if not tool:
        raise ValueError(f"MCP tool '{config.mcp.tool_roles.draft_create}' not found.")

    # Call the tool
    # Assume the tool accepts 'to', 'subject', 'body'
    result = await tool.ainvoke({
        "to": config.delivery.recipient,
        "subject": subject,
        "body": body
    })

    return f"draft_{hash(body)}"  # Simulated ID for MVP
