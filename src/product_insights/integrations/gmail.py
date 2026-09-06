"""Gmail draft integration via MCP."""

import logging

from langchain_mcp_adapters.client import MultiServerMCPClient

from product_insights.config import AppConfig

logger = logging.getLogger(__name__)


async def create_gmail_draft(
    client: MultiServerMCPClient,
    config: AppConfig,
    subject: str,
    content: str,
    draft_id: str | None = None
) -> str:
    """
    Create an unsent Gmail draft containing the weekly pulse.
    If `draft_id` is provided, we can potentially update it if supported, 
    but for now, we just avoid recreating if we already have a draft_id to ensure idempotency.
    
    Returns the draft ID.
    """
    if draft_id:
        logger.info(f"Draft already exists (draft_id={draft_id}), skipping recreation for idempotency.")
        return draft_id

    tool_name = config.mcp.tool_roles.draft_create
    tools = await client.get_tools()
    tool = next((t for t in tools if t.name == tool_name), None)
    
    if not tool:
        raise RuntimeError(f"Required MCP tool '{tool_name}' not found.")

    recipient = config.delivery.recipient
    if recipient not in config.delivery.allowed_recipients:
        raise ValueError(f"Recipient {recipient} is not allowlisted.")

    logger.info(f"Creating unsent Gmail draft for {recipient}...")
    
    tool_args = {
        "to": [recipient],
        "subject": subject,
        "body_text": content,
    }

    try:
        result = await tool.ainvoke(tool_args)
        
        if isinstance(result, dict) and "draft_id" in result:
            returned_id = result["draft_id"]
        elif isinstance(result, str) and "id:" in result.lower():
            returned_id = result.split("id:")[-1].strip()
        else:
            returned_id = "unknown_draft_id"
            
        logger.info(f"Successfully created Gmail draft. Draft ID: {returned_id}")
        return returned_id
        
    except Exception as e:
        logger.error(f"Failed to create Gmail draft: {e}")
        raise
