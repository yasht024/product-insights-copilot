"""LangGraph state definition for the Phase 3 orchestration pipeline."""

from datetime import date
from typing import Annotated, Optional, TypedDict
from uuid import UUID

from product_insights.analysis.models import (
    Action,
    Quote,
    ThemeBatchOutput,
    ThemeMetrics,
)


def _merge_lists(a: list | None, b: list | None) -> list:
    """Merge two lists for LangGraph state reduction."""
    if a is None:
        return b or []
    if b is None:
        return a
    return a + b


class WorkflowState(TypedDict):
    """The central state object passed between LangGraph nodes."""
    
    # 1. Identity & Config
    run_key: str
    period_start: date
    period_end: date
    
    # 2. Input Data
    review_ids: list[UUID]
    
    # 3. Analysis Outputs
    batch_outputs: Annotated[list[ThemeBatchOutput], _merge_lists]
    final_themes: list[ThemeMetrics]
    quotes: list[Quote]
    actions: list[Action]
    
    # 4. Composed Artifact
    pulse_markdown: str
    
    # 5. Validation & Status
    is_valid: bool
    error: Optional[str]
    
    # 6. Idempotency Tracking (MCP Side Effects)
    document_id: Optional[str]
    draft_id: Optional[str]
