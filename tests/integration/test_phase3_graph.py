"""Integration tests for the LangGraph orchestration."""

import pytest
from datetime import date
from unittest.mock import AsyncMock, MagicMock
from uuid import uuid4

from langgraph.checkpoint.memory import MemorySaver

from product_insights.config import load_config
from product_insights.orchestration.graph import build_orchestration_graph
from product_insights.orchestration.state import WorkflowState


@pytest.fixture
def mock_config(tmp_path):
    config_path = tmp_path / "test_config.yaml"
    config_path.write_text("""
config_version: v1
environment: development
product:
  name: "Groww App"
  google_play_package: "com.nextbillion.groww"
  apple_app_store_id: "1404871703"
sources:
  google_play:
    adapter: "fixture_csv"
    format: "csv"
    provider: "local"
    approval_status: "fixture_only"
    provenance_required: false
    sample_path: "/tmp/gp.csv"
  apple_app_store:
    adapter: "fixture_json"
    format: "json"
    provider: "local"
    approval_status: "fixture_only"
    provenance_required: false
    sample_path: "/tmp/ap.json"
reporting:
  lookback_weeks: 10
  timezone: "Asia/Kolkata"
  schedule: "0 9 * * 1"
  minimum_eligible_reviews: 10
  max_themes: 5
  highlighted_themes: 3
  quote_count: 3
  action_count: 3
  max_words: 250
  naming_convention: "Product Insights Pulse - {product_name} - {period_end}"
analysis:
  framework: "langchain"
  provider: "fake"
  model: "fake"
  approved_for_production: false
  temperature: 0.1
  max_concurrency: 5
  prompt_version: "v1"
  schema_version: "v1"
workflow:
  framework: "langgraph"
  checkpointer: "sqlite"
mcp:
  client: "langchain-mcp-adapters"
  docs_server_alias: "google-drive"
  gmail_server_alias: "gmail"
  capabilities_confirmed: false
  tool_roles:
    document_upsert: "docs_upsert"
    draft_create: "gmail_create_draft"
delivery:
  google_drive_folder_id: "test_folder"
  allowed_drive_folder_ids: ["test_folder"]
  sharing_policy: "restricted"
  recipient: "pending-test"
  allowed_recipients: ["pending-test"]
  create_email_draft_only: true
retention:
  raw_import_days: 30
  sanitized_review_days: 90
  audit_days: 365
  policy_approved: false
persistence:
  database_path: ":memory:"
  fingerprint_key_environment_variable: "TEST_KEY"
""")
    return load_config(config_path)


@pytest.mark.asyncio
async def test_graph_validation_failure_halts_delivery(mock_config):
    """Test that if validation fails, the graph halts before calling MCP tools."""
    
    mock_model = MagicMock()
    mock_mcp_client = AsyncMock()
    mock_repository = MagicMock()
    
    # We will force validation to fail by making the validation node raise or return is_valid=False.
    # The nodes handle validation internally and set is_valid=False if it fails.
    # To force it to fail, we can mock the model to return empty actions (violating the 3 actions rule).
    # Since our compose_and_validate node creates actions by calling model, returning [] will fail validation.
    
    graph = build_orchestration_graph(mock_config, mock_model, mock_mcp_client, mock_repository)
    
    initial_state = {
        "run_key": "test_run_1",
        "period_start": date(2026, 9, 1),
        "period_end": date(2026, 9, 7),
        "review_ids": [uuid4()],
    }
    
    final_state = await graph.ainvoke(initial_state)
    
    assert final_state["is_valid"] is False
    assert "Expected exactly 3 themes" in final_state["error"] or "Expected exactly 3 quotes" in final_state["error"]
    assert final_state.get("document_id") is None
    assert final_state.get("draft_id") is None


@pytest.mark.asyncio
async def test_graph_idempotency_recovery(mock_config, monkeypatch):
    """Test that if Gmail fails but Docs succeeds, restarting skips Docs and retries Gmail."""
    
    # Since we can't easily mock the entire LangChain pipeline inside the graph without 
    # elaborate setup, we will mock the nodes themselves to isolate orchestration testing.
    from product_insights.orchestration.nodes import WorkflowNodes
    
    mock_mcp_client = AsyncMock()
    checkpointer = MemorySaver()
    
    graph = build_orchestration_graph(mock_config, None, mock_mcp_client, None, checkpointer=checkpointer)
    
    # Mock analyze and compose to succeed immediately
    async def mock_analyze(state):
        return {"batch_outputs": []}
        
    async def mock_compose(state):
        return {"is_valid": True, "pulse_markdown": "Mock Pulse"}
        
    # We want to test publisher idempotency. We'll use the real publisher nodes but mock the underlying integration functions.
    import product_insights.orchestration.nodes as nodes_module
    
    docs_called = 0
    draft_called = 0
    
    async def mock_publish_to_google_docs(*args, **kwargs):
        nonlocal docs_called
        docs_called += 1
        return "doc_123"
        
    async def mock_create_gmail_draft(*args, **kwargs):
        nonlocal draft_called
        draft_called += 1
        if draft_called == 1:
            raise Exception("Simulated Gmail API Timeout")
        return "draft_456"
        
    monkeypatch.setattr(nodes_module, "publish_to_google_docs", mock_publish_to_google_docs)
    monkeypatch.setattr(nodes_module, "create_gmail_draft", mock_create_gmail_draft)
    
    # We must patch the nodes in the compiled graph. 
    # An easier way is to just invoke the nodes manually, or patch the functions they call.
    monkeypatch.setattr(WorkflowNodes, "analyze_node", mock_analyze)
    monkeypatch.setattr(WorkflowNodes, "compose_and_validate_node", mock_compose)
    
    config = {"configurable": {"thread_id": "thread_1"}}
    initial_state = {
        "run_key": "test_run_2",
        "period_start": date(2026, 9, 1),
        "period_end": date(2026, 9, 7),
        "review_ids": [uuid4()],
    }
    
    # Run 1: Should fail on Gmail draft
    with pytest.raises(Exception, match="Simulated Gmail API Timeout"):
        await graph.ainvoke(initial_state, config=config)
        
    assert docs_called == 1
    assert draft_called == 1
    
    # Checkpoint should have document_id="doc_123" but no draft_id
    state_checkpoint = graph.get_state(config)
    assert state_checkpoint.values.get("document_id") == "doc_123"
    assert state_checkpoint.values.get("draft_id") is None
    
    # Run 2: Resume. Should skip Docs, and succeed on Gmail
    final_state = await graph.ainvoke(None, config=config)
    
    assert docs_called == 1  # Still 1, didn't call again
    assert draft_called == 2 # Called a second time and succeeded
    assert final_state["document_id"] == "doc_123"
    assert final_state["draft_id"] == "draft_456"
