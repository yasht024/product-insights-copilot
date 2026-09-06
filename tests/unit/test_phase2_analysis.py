"""Unit tests for Phase 2 Analysis."""

import pytest
from datetime import date
from uuid import uuid4

from product_insights.analysis.composer import build_pulse_markdown
from product_insights.analysis.models import (
    Action,
    PulseData,
    Quote,
    ThemeBatchOutput,
    ThemeCandidate,
    ThemeMetrics,
)
from product_insights.analysis.pipeline import (
    merge_and_rank_themes,
    select_quotes,
)
from product_insights.analysis.validator import validate_pulse
from product_insights.domain.models import PrivacyStatus, SanitizedReview


def create_mock_review(text: str) -> SanitizedReview:
    return SanitizedReview(
        review_id=uuid4(),
        sanitized_title="Title",
        sanitized_text=text,
        privacy_status=PrivacyStatus.APPROVED,
        privacy_finding_types=tuple(),
        sanitizer_version="v1",
    )


def test_merge_and_rank_themes():
    r1 = create_mock_review("ui issue scalper")
    r2 = create_mock_review("scalper mode bad")
    r3 = create_mock_review("app is slow")

    t1 = ThemeCandidate(
        theme_id="ui_scalper",
        label="UI/UX - Scalper",
        description="Scalper mode UI issue",
        supporting_review_ids=[r1.review_id, r2.review_id],
    )
    t2 = ThemeCandidate(
        theme_id="performance",
        label="Performance",
        description="App is slow",
        supporting_review_ids=[r3.review_id],
    )

    batch_output = ThemeBatchOutput(themes=[t1, t2])
    reviews = [r1, r2, r3]

    ranked = merge_and_rank_themes([batch_output], reviews, max_themes=5, highlight_count=3)
    
    assert len(ranked) == 2
    assert ranked[0].label == "UI/UX - Scalper" # Higher count
    assert ranked[0].primary_review_count == 2
    assert ranked[1].label == "Performance"
    assert ranked[1].primary_review_count == 1


def test_select_quotes_exact_match():
    r1 = create_mock_review("This is a test review with exactly 55 characters length.")
    r2 = create_mock_review("Short.") # Too short, should be skipped
    r3 = create_mock_review("Another perfectly valid review with enough characters.")

    t1 = ThemeMetrics(
        theme_id="test_theme",
        label="Test",
        primary_review_count=3,
        share_of_eligible_reviews=1.0,
        average_rating=3.0,
        low_rating_share=0.0,
        recent_review_share=0.0,
        supporting_review_ids=[r1.review_id, r2.review_id, r3.review_id],
    )

    quotes = select_quotes([t1], [r1, r2, r3], quote_count=2)
    
    # Should skip r2 because it's < 10 chars
    assert len(quotes) == 1  # Only 1 quote needed since there is only 1 theme
    assert quotes[0].exact_text == "This is a test review with exactly 55 characters length."


def test_pulse_validator_success():
    reviews = [
        create_mock_review("Quote 1 text here is long enough to be included."),
        create_mock_review("Quote 2 text here is long enough to be included."),
        create_mock_review("Quote 3 text here is long enough to be included."),
    ]
    
    pulse = PulseData(
        product_name="Test Product",
        period_start=date(2026, 9, 1),
        period_end=date(2026, 9, 7),
        top_themes=[
            ThemeMetrics(theme_id="t1", label="T1", primary_review_count=1, share_of_eligible_reviews=0.1, average_rating=1.0, low_rating_share=1.0, recent_review_share=1.0, supporting_review_ids=[reviews[0].review_id]),
            ThemeMetrics(theme_id="t2", label="T2", primary_review_count=1, share_of_eligible_reviews=0.1, average_rating=1.0, low_rating_share=1.0, recent_review_share=1.0, supporting_review_ids=[reviews[1].review_id]),
            ThemeMetrics(theme_id="t3", label="T3", primary_review_count=1, share_of_eligible_reviews=0.1, average_rating=1.0, low_rating_share=1.0, recent_review_share=1.0, supporting_review_ids=[reviews[2].review_id]),
        ],
        quotes=[
            Quote(theme_id="t1", review_id=reviews[0].review_id, exact_text="Quote 1 text here is long enough to be included.", reviewer_rating=5),
            Quote(theme_id="t2", review_id=reviews[1].review_id, exact_text="Quote 2 text here is long enough to be included.", reviewer_rating=5),
            Quote(theme_id="t3", review_id=reviews[2].review_id, exact_text="Quote 3 text here is long enough to be included.", reviewer_rating=5),
        ],
        actions=[
            Action(action_id="a1", theme_id="t1", action_text="Do A", likely_owner="Team A", evidence_review_ids=[], follow_up_signal="Signal A"),
            Action(action_id="a2", theme_id="t2", action_text="Do B", likely_owner="Team B", evidence_review_ids=[], follow_up_signal="Signal B"),
            Action(action_id="a3", theme_id="t3", action_text="Do C", likely_owner="Team C", evidence_review_ids=[], follow_up_signal="Signal C"),
        ],
        total_eligible_reviews=100,
        average_rating=4.5,
        run_key="test_run",
    )
    
    markdown = build_pulse_markdown(pulse)
    
    # Should not raise exception
    validate_pulse(pulse, markdown, reviews)


def test_pulse_validator_fails_word_count():
    long_text = "word " * 300
    
    reviews = [
        create_mock_review("Quote 1"),
        create_mock_review("Quote 2"),
        create_mock_review("Quote 3"),
    ]
    
    pulse = PulseData(
        product_name="Test",
        period_start=date(2026, 9, 1),
        period_end=date(2026, 9, 7),
        top_themes=[],
        quotes=[],
        actions=[],
        total_eligible_reviews=100,
        average_rating=4.5,
        run_key="test",
    )
    
    with pytest.raises(ValueError, match="exceeds 250 words limit"):
        validate_pulse(pulse, long_text, reviews)


def test_pulse_validator_fails_exact_match():
    reviews = [
        create_mock_review("This is the original text"),
        create_mock_review("Quote 2 text here"),
        create_mock_review("Quote 3 text here"),
    ]
    
    pulse = PulseData(
        product_name="Test",
        period_start=date(2026, 9, 1),
        period_end=date(2026, 9, 7),
        top_themes=[ThemeMetrics(theme_id="t1", label="T1", primary_review_count=1, share_of_eligible_reviews=0.1, average_rating=1.0, low_rating_share=1.0, recent_review_share=1.0, supporting_review_ids=[]) for _ in range(3)],
        quotes=[
            Quote(theme_id="t1", review_id=reviews[0].review_id, exact_text="This is NOT the original text", reviewer_rating=5),
            Quote(theme_id="t2", review_id=reviews[1].review_id, exact_text="Quote 2 text here", reviewer_rating=5),
            Quote(theme_id="t3", review_id=reviews[2].review_id, exact_text="Quote 3 text here", reviewer_rating=5),
        ],
        actions=[Action(action_id="a1", theme_id="t1", action_text="A", likely_owner="O", evidence_review_ids=[], follow_up_signal="S") for _ in range(3)],
        total_eligible_reviews=100,
        average_rating=4.5,
        run_key="test",
    )
    
    markdown = "short text"
    with pytest.raises(ValueError, match="does not exactly match source text"):
        validate_pulse(pulse, markdown, reviews)
