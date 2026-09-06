"""Markdown composer for the Weekly Pulse."""

from product_insights.analysis.models import PulseData


def build_pulse_markdown(pulse: PulseData) -> str:
    """Render the Weekly Pulse as a Markdown document."""
    
    # 1. Header and Period
    md = [
        f"# {pulse.product_name} Weekly Product Pulse",
        f"**Period:** {pulse.period_start.isoformat()} to {pulse.period_end.isoformat()}",
        f"**Eligible Reviews Analyzed:** {pulse.total_eligible_reviews:,}",
        f"**Average Rating:** {pulse.average_rating:.1f}/5.0",
        "",
        "## Top Themes",
        "",
    ]

    # 2. Themes
    for i, theme in enumerate(pulse.top_themes, 1):
        md.append(
            f"### {i}. {theme.label} "
            f"({theme.primary_review_count} reviews, {theme.share_of_eligible_reviews:.1%})"
        )
        if theme.low_rating_share > 0:
            md.append(f"- **Low Rating Share (1-3 stars):** {theme.low_rating_share:.1%}")
        md.append("")

    # 3. User Voices (Quotes)
    md.append("## User Voices")
    md.append("")
    if pulse.quotes:
        for quote in pulse.quotes:
            md.append(f"> \"{quote.exact_text}\"")
            md.append(f"— *{quote.reviewer_rating} star rating*")
            md.append("")
    else:
        md.append("*No verbatim quotes available.*")
        md.append("")

    # 4. Recommended Actions
    md.append("## Recommended Actions")
    md.append("")
    if pulse.actions:
        for i, action in enumerate(pulse.actions, 1):
            md.append(f"**{i}. {action.action_text}**")
            md.append(f"- **Owner:** {action.likely_owner}")
            md.append(f"- **Follow-up Signal:** {action.follow_up_signal}")
            md.append("")
    else:
        md.append("*No actions recommended this week.*")
        md.append("")

    # 5. Footer with tracking
    md.append("---")
    md.append(f"**Run Key:** `{pulse.run_key}`")

    return "\n".join(md)
