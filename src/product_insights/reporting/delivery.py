"""Dashboard delivery through the configured MCP server; no Google REST client."""

import asyncio
import json
import os
from contextlib import asynccontextmanager
from pathlib import Path

import yaml
from mcp import ClientSession
from mcp.client.sse import sse_client
from mcp.client.streamable_http import streamable_http_client


def settings() -> dict:
    config = yaml.safe_load(
        (Path(__file__).resolve().parents[3] / "config/default.yaml").read_text(encoding="utf-8")
    )
    return {
        "url": os.getenv("REPORT_MCP_URL", config["mcp"]["server_url"]),
        "transport": os.getenv("REPORT_MCP_TRANSPORT", config["mcp"]["transport"]),
        "document_id": os.getenv(
            "REPORT_DOCUMENT_ID", config["delivery"].get("target_document_id", "")
        ),
    }


@asynccontextmanager
async def session():
    config = settings()
    async with asyncio.timeout(60):
        connection = (
            sse_client(config["url"], timeout=15)
            if config["transport"] == "sse"
            else streamable_http_client(config["url"])
        )
        async with connection as streams, ClientSession(streams[0], streams[1]) as client:
            await client.initialize()
            yield client


async def capabilities() -> dict:
    config = settings()
    try:
        async with session() as client:
            names = {tool.name for tool in (await client.list_tools()).tools}
        return {
            "docs": "google_docs_append_text" in names,
            "draft": "gmail_create_draft" in names,
            "send": "gmail_send_email" in names,
            "document_id": config["document_id"],
            "error": None,
        }
    except Exception:
        return {
            "docs": False,
            "draft": False,
            "send": False,
            "document_id": config["document_id"],
            "error": "Cannot reach the Docs and Gmail connection. "
            "Retry connection or check the MCP server.",
        }


def parse_result(result) -> dict:
    if result.isError:
        raise RuntimeError("The connector rejected the operation.")
    value = result.structuredContent
    if value is None:
        for block in result.content:
            if getattr(block, "type", None) == "text":
                try:
                    value = json.loads(block.text)
                    break
                except (ValueError, TypeError):
                    continue
    if not isinstance(value, dict) or not value:
        raise RuntimeError("The connector did not return a verifiable result.")
    if (
        value.get("error")
        or value.get("success") is False
        or value.get("status") in {"error", "failed"}
    ):
        raise RuntimeError("The connector reported an unsuccessful operation.")
    return value


async def deliver(
    action: str,
    report: dict,
    recipients: list[str],
    document_id: str | None,
    published_document_id: str | None,
    operation_key: str,
    message: str = "",
) -> dict:
    if action == "docs":
        tool = "google_docs_append_text"
        args = {
            "document_id": document_id,
            "text": report["content"],
            "prepend_newline": True,
            "append_newline": True,
            "idempotency_key": operation_key,
        }
    else:
        tool = "gmail_create_draft" if action == "draft" else "gmail_send_email"
        body = report["content"]
        if published_document_id:
            body += (
                f"\n\nGoogle Docs: https://docs.google.com/document/d/{published_document_id}/edit"
            )
        if message.strip():
            body = message.strip() + "\n\n" + body
        args = {"to": recipients, "subject": report["title"], "body_text": body}
        if action == "send":
            args["idempotency_key"] = operation_key
    async with session() as client:
        names = {t.name for t in (await client.list_tools()).tools}
        if tool not in names:
            raise RuntimeError("The required connector capability is unavailable.")
        result = parse_result(await client.call_tool(tool, args))
    # Never invent success identifiers. MCP tools may wrap provider fields in data.
    data = result.get("data", result)
    if not isinstance(data, dict):
        raise RuntimeError("The connector returned an unexpected result.")
    reference = next(
        (
            data[k]
            for k in ("draft_id", "message_id", "document_id", "documentId", "id")
            if isinstance(data.get(k), str) and data[k]
        ),
        None,
    )
    if not reference and result.get("success") is not True:
        raise RuntimeError("The connector did not confirm completion.")
    return {
        "action": action,
        "status": "completed",
        "reference": reference,
        "document_url": f"https://docs.google.com/document/d/{document_id}/edit"
        if action == "docs"
        else None,
        "recipients": recipients,
    }
