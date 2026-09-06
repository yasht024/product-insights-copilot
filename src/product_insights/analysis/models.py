"""Phase 2 analysis models and structured output schemas."""

from __future__ import annotations

from datetime import date
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class StrictModel(BaseModel):
    model_config = ConfigDict(extra="forbid", frozen=True)


class ThemeCandidate(StrictModel):
    """A theme extracted from a batch of reviews."""
    
    theme_id: str = Field(min_length=1, max_length=128, description="A short, unique identifier for the theme.")
    label: str = Field(min_length=1, max_length=128, description="A human-readable, concise label for the theme (e.g., 'UI/UX - Scalper Mode').")
    description: str = Field(min_length=1, max_length=512, description="A detailed explanation of the theme.")
    supporting_review_ids: list[UUID] = Field(min_length=1, description="List of review IDs that support this theme.")


class ThemeBatchOutput(StrictModel):
    """The structured output from a single batch analysis."""
    
    themes: list[ThemeCandidate] = Field(description="List of themes identified in this batch. Can be empty if no clear themes emerge.")


class ThemeMetrics(StrictModel):
    """Computed metrics for a consolidated theme."""
    
    theme_id: str
    label: str
    primary_review_count: int = Field(ge=1)
    share_of_eligible_reviews: float = Field(ge=0.0, le=1.0)
    average_rating: float = Field(ge=1.0, le=5.0)
    low_rating_share: float = Field(ge=0.0, le=1.0)
    recent_review_share: float = Field(ge=0.0, le=1.0)
    supporting_review_ids: list[UUID]


class Action(StrictModel):
    """An actionable insight derived from a theme."""
    
    action_id: str = Field(min_length=1, max_length=128)
    theme_id: str = Field(min_length=1, max_length=128)
    action_text: str = Field(min_length=1, max_length=256, description="A clear, concise, and specific action item.")
    likely_owner: str = Field(min_length=1, max_length=128, description="The likely team or persona responsible (e.g., 'Product Team', 'Customer Support').")
    evidence_review_ids: list[UUID] = Field(min_length=1)
    follow_up_signal: str = Field(min_length=1, max_length=256, description="How to measure if this action was successful (e.g., 'Decrease in UI-related negative reviews').")


class ActionSet(StrictModel):
    """Structured output for action generation."""
    
    actions: list[Action] = Field(description="Exactly three recommended actions.")


class Quote(StrictModel):
    """An exact-match verbatim quote from a source review."""
    
    theme_id: str
    review_id: UUID
    exact_text: str = Field(min_length=1)
    reviewer_rating: int = Field(ge=1, le=5)


class PulseData(StrictModel):
    """The complete data payload for the weekly pulse."""
    
    product_name: str
    period_start: date
    period_end: date
    top_themes: list[ThemeMetrics]
    quotes: list[Quote]
    actions: list[Action]
    total_eligible_reviews: int = Field(ge=1)
    average_rating: float = Field(ge=1.0, le=5.0)
    run_key: str
