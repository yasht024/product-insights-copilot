"""LangGraph nodes for Phase 3 orchestration."""

import logging
import os
from typing import Any

from product_insights.analysis.composer import build_pulse_markdown
from product_insights.analysis.models import PulseData
from product_insights.analysis.pipeline import (
    batch_analyze_themes,
    generate_actions,
    merge_and_rank_themes,
    select_quotes,
)
from product_insights.analysis.validator import validate_pulse
from product_insights.config import AppConfig
from product_insights.domain.models import PrivacyStatus, SanitizedReview
from product_insights.integrations.gmail import create_gmail_draft
from product_insights.integrations.docs import publish_pulse_to_docs
from product_insights.orchestration.state import WorkflowState

logger = logging.getLogger(__name__)


class WorkflowNodes:
    """Contains the node functions for the LangGraph workflow."""

    def __init__(self, config: AppConfig, model: Any, mcp_client: Any, repository: Any) -> None:
        self.config = config
        self.model = model
        self.mcp_client = mcp_client
        self.repository = repository

    def _fetch_reviews(self, review_ids: list) -> list[SanitizedReview]:
        """Fetch sanitized reviews from the repository."""
        # MVP: mock fetch if repository method doesn't exist
        # In a real implementation, we would query:
        # SELECT * FROM sanitized_reviews WHERE review_id IN (...)
        
        # We assume repository has a fetch_sanitized method, or we mock it for tests.
        if hasattr(self.repository, "fetch_sanitized"):
            return self.repository.fetch_sanitized(review_ids)
            
        # Mock for graph testing
        import uuid
        return [
            SanitizedReview(
                review_id=uuid.UUID(str(rid)),
                sanitized_title="Mock Title",
                sanitized_text="Mock review text that is long enough to be included as a quote. " * 3,
                privacy_status=PrivacyStatus.APPROVED,
                privacy_finding_types=tuple(),
                sanitizer_version="v1"
            )
            for rid in review_ids
        ]

    def analyze_node(self, state: WorkflowState) -> dict:
        """Run batch analysis on all reviews."""
        logger.info(f"Analyzing {len(state['review_ids'])} reviews.")
        reviews = self._fetch_reviews(state["review_ids"])
        
        batch_outputs = batch_analyze_themes(reviews, self.model)
        
        return {"batch_outputs": batch_outputs}

    def compose_and_validate_node(self, state: WorkflowState) -> dict:
        """Merge themes, select quotes, generate actions, and validate pulse."""
        logger.info("Composing and validating pulse.")
        reviews = self._fetch_reviews(state["review_ids"])
        
        final_themes = merge_and_rank_themes(state["batch_outputs"], reviews)
        quotes = select_quotes(final_themes, reviews)
        actions = generate_actions(final_themes, self.model)
        
        pulse = PulseData(
            product_name=self.config.product.name,
            period_start=state["period_start"],
            period_end=state["period_end"],
            top_themes=final_themes,
            quotes=quotes,
            actions=actions,
            total_eligible_reviews=len(state["review_ids"]),
            average_rating=4.0, # Mock rating
            run_key=state["run_key"],
        )
        
        markdown = build_pulse_markdown(pulse)
        
        # Save a local copy so the user can view it during local testing!
        os.makedirs("var/artifacts", exist_ok=True)
        with open("var/artifacts/pulse.md", "w", encoding="utf-8") as f:
            f.write(markdown)
        
        try:
            validate_pulse(pulse, markdown, reviews)
            return {
                "final_themes": final_themes,
                "quotes": quotes,
                "actions": actions,
                "pulse_markdown": markdown,
                "is_valid": True,
            }
        except ValueError as e:
            logger.error(f"Validation failed: {e}")
            return {
                "final_themes": final_themes,
                "quotes": quotes,
                "actions": actions,
                "pulse_markdown": markdown,
                "is_valid": False,
                "error": str(e)
            }

    async def publish_doc_node(self, state: WorkflowState) -> dict:
        """Publish to Google Docs if not already published."""
        if not state.get("is_valid"):
            logger.info("Skipping doc publishing: Pulse is invalid.")
            return {}
            
        if state.get("document_id"):
            logger.info(f"Skipping doc publishing: Document already exists ({state['document_id']}).")
            return {}
            
        logger.info("Publishing pulse to Google Docs via MCP.")
        title = f"Product Insights Pulse - {self.config.product.name} - {state['period_end']}"
        doc_id = await publish_pulse_to_docs(
            self.mcp_client, self.config, title, state["pulse_markdown"], state.get("document_id")
        )
        
        return {"document_id": doc_id}

    async def create_draft_node(self, state: WorkflowState) -> dict:
        """Create a Gmail draft if not already created."""
        if not state.get("is_valid"):
            logger.info("Skipping draft creation: Pulse is invalid.")
            return {}
            
        if state.get("draft_id"):
            logger.info(f"Skipping draft creation: Draft already exists ({state['draft_id']}).")
            return {}
            
        logger.info("Creating Gmail draft via MCP.")
        subject = f"Weekly Product Pulse: {self.config.product.name} ({state['period_end']})"
        
        # Link to the document if available
        doc_link = f"Google Doc ID: {state.get('document_id')}" if state.get("document_id") else "No document linked."
        body = f"Here is the weekly product pulse.\n\n{doc_link}\n\n{state['pulse_markdown']}"
        
        draft_id = await create_gmail_draft(
            self.mcp_client, self.config, subject, body, state.get("draft_id")
        )
        
        return {"draft_id": draft_id}
