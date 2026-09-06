"""Unit tests for LangGraph orchestration."""

import pytest
from datetime import date
from unittest.mock import AsyncMock, MagicMock

from product_insights.config import AppConfig
from product_insights.orchestration.graph import build_orchestration_graph


@pytest.fixture
def mock_dependencies():
    return {
        "model": MagicMock(),
        "mcp_client": AsyncMock(),
        "repository": MagicMock(),
    }


@pytest.mark.asyncio
async def test_graph_validation_failure(fixture_config: AppConfig, mock_dependencies, mocker):
    """Test that the graph routes to END when validation fails."""
    # We will mock the nodes to just return state updates directly.
    mocker.patch("product_insights.orchestration.nodes.WorkflowNodes.analyze_node", return_value={"batch_outputs": []})
    mocker.patch(
        "product_insights.orchestration.nodes.WorkflowNodes.compose_and_validate_node", 
        return_value={"is_valid": False, "error": "test failure"}
    )
    
    workflow = build_orchestration_graph(fixture_config, **mock_dependencies)
    
    initial_state = {
        "run_key": "test_run_key",
        "period_start": date(2023, 1, 1),
        "period_end": date(2023, 1, 7),
        "review_ids": [],
    }
    
    final_state = await workflow.ainvoke(initial_state)
    
    assert final_state["is_valid"] is False
    assert final_state["error"] == "test failure"
    assert "document_id" not in final_state or final_state["document_id"] is None
    assert "draft_id" not in final_state or final_state["draft_id"] is None


@pytest.mark.asyncio
async def test_graph_validation_success_routing(fixture_config: AppConfig, mock_dependencies, mocker):
    """Test that the graph routes to delivery when validation succeeds."""
    mocker.patch("product_insights.orchestration.nodes.WorkflowNodes.analyze_node", return_value={"batch_outputs": []})
    mocker.patch(
        "product_insights.orchestration.nodes.WorkflowNodes.compose_and_validate_node", 
        return_value={"is_valid": True, "pulse_markdown": "Test pulse"}
    )
    
    mocker.patch(
        "product_insights.orchestration.nodes.WorkflowNodes.publish_doc_node", 
        return_value={"document_id": "test_doc_id"}
    )
    
    mocker.patch(
        "product_insights.orchestration.nodes.WorkflowNodes.create_draft_node", 
        return_value={"draft_id": "test_draft_id"}
    )
    
    workflow = build_orchestration_graph(fixture_config, **mock_dependencies)
    
    initial_state = {
        "run_key": "test_run_key",
        "period_start": date(2023, 1, 1),
        "period_end": date(2023, 1, 7),
        "review_ids": [],
    }
    
    final_state = await workflow.ainvoke(initial_state)
    
    assert final_state["is_valid"] is True
    assert final_state["document_id"] == "test_doc_id"
    assert final_state["draft_id"] == "test_draft_id"
