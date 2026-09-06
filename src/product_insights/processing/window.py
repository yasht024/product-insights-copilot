"""Fixed IST reporting-window calculations."""

from __future__ import annotations

from datetime import date, timedelta


def reporting_window(reporting_week_end: date, lookback_weeks: int) -> tuple[date, date]:
    if not 8 <= lookback_weeks <= 12:
        raise ValueError("lookback_weeks must be between 8 and 12")
    return reporting_week_end - timedelta(weeks=lookback_weeks) + timedelta(
        days=1
    ), reporting_week_end
