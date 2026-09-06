"""Weekly scheduler for the product insights workflow."""

import asyncio
from datetime import datetime
from typing import Callable, Awaitable
import zoneinfo

from croniter import croniter

from product_insights.config import AppConfig
from product_insights.orchestration.logging import get_logger

logger = get_logger("product_insights.scheduler")


async def run_scheduler(config: AppConfig, workflow_callback: Callable[[datetime], Awaitable[int]]) -> None:
    """
    Run a long-lived scheduling loop based on the config.reporting.schedule.
    """
    tz = zoneinfo.ZoneInfo(config.reporting.timezone)
    cron = croniter(config.reporting.schedule, datetime.now(tz))

    logger.info("Scheduler started", extra={
        "schedule": config.reporting.schedule,
        "timezone": config.reporting.timezone,
    })

    while True:
        next_run: datetime = cron.get_next(datetime)
        now = datetime.now(tz)
        sleep_seconds = (next_run - now).total_seconds()

        if sleep_seconds > 0:
            logger.info("Sleeping until next run", extra={"next_run": next_run.isoformat()})
            await asyncio.sleep(sleep_seconds)

        logger.info("Triggering workflow run", extra={"run_time": next_run.isoformat()})
        try:
            exit_code = await workflow_callback(next_run)
            logger.info("Workflow completed", extra={"exit_code": exit_code})
        except Exception as e:
            logger.exception("Workflow failed with an unexpected error", exc_info=e)
