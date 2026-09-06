"""Google Docs integration via MCP."""

import logging
from typing import Any

from langchain_mcp_adapters.client import MultiServerMCPClient

from product_insights.config import AppConfig

logger = logging.getLogger(__name__)


async def publish_pulse_to_docs(
    client: MultiServerMCPClient,
    config: AppConfig,
    title: str,
    content: str,
    document_id: str | None = None
) -> str:
    """
    Publish the weekly pulse to Google Docs via MCP.
    If `document_id` is provided, update the existing document to ensure idempotency.
    Otherwise, create a new document in the configured destination folder.
    
    Returns the document ID.
    """
    tool_name = config.mcp.tool_roles.document_upsert
    tools = await client.get_tools()
    tool = next((t for t in tools if t.name == tool_name), None)
    
    if not tool:
        raise RuntimeError(f"Required MCP tool '{tool_name}' not found.")

    logger.info(f"Publishing pulse to Google Docs (document_id={document_id})...")
    
    # We invoke the tool directly
    # Tool schemas are dependent on the actual MCP server implementation.
    # We pass title, content, folder_id, and document_id for upsert.
    tool_args = {
        "title": title,
        "content": content,
        "folder_id": config.delivery.google_drive_folder_id,
    }
    if document_id:
        tool_args["document_id"] = document_id

    try:
        # tool.invoke() or client.invoke_tool() might be async depending on the adapter.
        # We assume standard LangChain tool invocation.
        result = await tool.ainvoke(tool_args)
        
        # Result should ideally contain the document ID or URL.
        # For this MVP, we try to extract a document ID from the result or just return a dummy if we can't.
        # This will need to be refined based on actual MCP server return schemas.
        if isinstance(result, dict) and "document_id" in result:
            returned_id = result["document_id"]
        elif isinstance(result, str) and "id:" in result.lower():
            # Basic parsing if it returns a string message
            returned_id = result.split("id:")[-1].strip()
        else:
            returned_id = document_id or "unknown_doc_id"
            
        logger.info(f"Successfully published to Docs. Document ID: {returned_id}")
        return returned_id
        
    except Exception as e:
        logger.error(f"Failed to publish to Google Docs: {e}")
        raise
