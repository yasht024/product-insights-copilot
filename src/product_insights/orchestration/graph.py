"""LangGraph workflow definition for Phase 3 orchestration."""

import logging
from typing import Any

from langgraph.graph import END, StateGraph

from product_insights.config import AppConfig
from product_insights.orchestration.nodes import WorkflowNodes
from product_insights.orchestration.state import WorkflowState

logger = logging.getLogger(__name__)


def build_orchestration_graph(
    config: AppConfig,
    model: Any,
    mcp_client: Any,
    repository: Any,
    checkpointer: Any = None,
) -> Any:
    """Build and compile the Phase 3 LangGraph orchestration workflow."""
    
    nodes = WorkflowNodes(config, model, mcp_client, repository)
    
    # Initialize the graph with our typed state
    workflow = StateGraph(WorkflowState)
    
    # 1. Add Nodes
    workflow.add_node("analyze", nodes.analyze_node)
    workflow.add_node("compose_and_validate", nodes.compose_and_validate_node)
    workflow.add_node("publish_doc", nodes.publish_doc_node)
    workflow.add_node("create_draft", nodes.create_draft_node)
    
    # 2. Add Edges
    workflow.set_entry_point("analyze")
    workflow.add_edge("analyze", "compose_and_validate")
    
    # Conditional edge: Only proceed to delivery if validation passed
    def route_after_validation(state: WorkflowState) -> str:
        if state.get("is_valid"):
            logger.info("Validation passed. Routing to publish_doc.")
            return "publish_doc"
        else:
            logger.error("Validation failed. Routing to END.")
            return END
            
    workflow.add_conditional_edges(
        "compose_and_validate",
        route_after_validation,
        {
            "publish_doc": "publish_doc",
            END: END
        }
    )
    
    workflow.add_edge("publish_doc", "create_draft")
    workflow.add_edge("create_draft", END)
    
    # 3. Compile
    return workflow.compile(checkpointer=checkpointer)
