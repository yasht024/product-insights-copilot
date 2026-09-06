from __future__ import annotations


def test_framework_entry_points_are_importable() -> None:
    from langchain.chat_models import init_chat_model
    from langchain_mcp_adapters.client import MultiServerMCPClient
    from langgraph.graph import StateGraph

    assert callable(init_chat_model)
    assert callable(MultiServerMCPClient)
    assert callable(StateGraph)
