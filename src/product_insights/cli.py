"""Command-line entry point for readiness checks and future workflows."""

from __future__ import annotations

import argparse
import logging
from collections.abc import Sequence
from datetime import date
from pathlib import Path

from pydantic import ValidationError

from product_insights.config import AppConfig, load_config
from product_insights.domain.errors import IngestionError
from product_insights.domain.ports import ReviewSource
from product_insights.ingestion import (
    AppStoreExportSource,
    GooglePlayExportSource,
    IngestionService,
    fingerprint_key_from_environment,
)
from product_insights.persistence import SQLiteRepository
from product_insights.integrations.mcp_client import initialize_mcp_client, preflight_check
from product_insights.orchestration.graph import build_orchestration_graph
from product_insights.orchestration.logging import setup_logging, get_logger
from product_insights.orchestration.scheduler import run_scheduler

DEFAULT_CONFIG = Path("config/default.yaml")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="product-insights")
    parser.add_argument("--log-level", type=str, default="INFO", help="Logging level (e.g., INFO, DEBUG)")
    parser.add_argument("--log-format", type=str, choices=["json", "text"], default="json", help="Log output format")
    subparsers = parser.add_subparsers(dest="command", required=True)
    check = subparsers.add_parser("config-check", help="validate startup configuration")
    check.add_argument("--config", type=Path, default=DEFAULT_CONFIG)
    check.add_argument(
        "--production",
        action="store_true",
        help="also require every production approval and allowlist",
    )
    ingest = subparsers.add_parser("ingest", help="import approved fixture or export reviews")
    ingest.add_argument("--config", type=Path, default=DEFAULT_CONFIG)
    ingest.add_argument(
        "--as-of", type=date.fromisoformat, required=True, help="IST reporting week end"
    )
    ingest.add_argument(
        "--source", choices=("all", "google-play", "apple-app-store"), default="all"
    )
    ingest.add_argument("--database", type=Path, default=None)

    workflow = subparsers.add_parser("run-workflow", help="run the full weekly pulse workflow")
    workflow.add_argument("--config", type=Path, default=DEFAULT_CONFIG)
    workflow.add_argument(
        "--as-of", type=date.fromisoformat, required=True, help="IST reporting week end"
    )
    workflow.add_argument("--database", type=Path, default=None)
    
    scheduler = subparsers.add_parser("scheduler", help="run the weekly workflow on a schedule")
    scheduler.add_argument("--config", type=Path, default=DEFAULT_CONFIG)
    scheduler.add_argument("--database", type=Path, default=None)

    purge = subparsers.add_parser("purge", help="enforce retention policy")
    purge.add_argument("--config", type=Path, default=DEFAULT_CONFIG)
    purge.add_argument("--database", type=Path, default=None)

    return parser


def main(argv: Sequence[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    
    level = getattr(logging, args.log_level.upper(), logging.INFO)
    setup_logging(level=level, as_json=(args.log_format == "json"))

    try:
        config = load_config(args.config)
    except (ValueError, ValidationError) as exc:
        print(f"BLOCKED_CONFIG: {exc}")
        return 2

    if args.command == "ingest":
        return _ingest(args, config)
    elif args.command == "run-workflow":
        import asyncio
        return asyncio.run(_run_workflow(args, config))
    elif args.command == "scheduler":
        import asyncio
        return asyncio.run(_scheduler(args, config))
    elif args.command == "purge":
        return _purge(args, config)

    production_check = args.production or config.environment == "production"
    blockers = config.production_blockers() if production_check else ()
    if blockers:
        print("BLOCKED_CONFIG: production readiness checks failed")
        for blocker in blockers:
            print(f"- {blocker}")
        return 3

    mode = "production" if production_check else "development"
    print(f"Configuration valid for {mode}; snapshot={config.safe_snapshot_hash()[:12]}")
    return 0


def _ingest(args: argparse.Namespace, config: AppConfig) -> int:
    try:
        key = fingerprint_key_from_environment(config)
    except IngestionError as exc:
        print(f"BLOCKED_CONFIG: {exc}")
        return 2
    database_path = args.database or Path(config.persistence.database_path)
    repository = SQLiteRepository(database_path)
    try:
        sources: list[ReviewSource] = []
        if args.source in ("all", "google-play"):
            sources.append(
                GooglePlayExportSource(
                    Path(config.sources.google_play.sample_path), config.product.google_play_package
                )
            )
        if args.source in ("all", "apple-app-store"):
            sources.append(
                AppStoreExportSource(
                    Path(config.sources.apple_app_store.sample_path),
                    config.product.apple_app_store_id,
                )
            )
        result = IngestionService(config, repository, key).run(args.as_of, sources)
    except IngestionError as exc:
        print(f"INGESTION_FAILED: {exc.code}")
        return 1
    finally:
        repository.close()
    print(
        f"Ingestion {result.manifest.status.value}; run_key={result.manifest.run_key}; "
        f"eligible={len(result.eligible_review_ids)}; reused={result.reused_existing_run}"
    )
    return 0


async def _run_workflow(args: argparse.Namespace, config: AppConfig) -> int:
    try:
        key = fingerprint_key_from_environment(config)
    except IngestionError as exc:
        print(f"BLOCKED_CONFIG: {exc}")
        return 2

    database_path = args.database or Path(config.persistence.database_path)
    repository = SQLiteRepository(database_path)

    # 1. MCP Preflight
    mcp_client = initialize_mcp_client(config)
    try:
        await preflight_check(mcp_client, config)
    except ValueError as exc:
        print(f"MCP_PREFLIGHT_FAILED: {exc}")
        return 2

    try:
        # 1.5 Download Latest Reviews
        try:
            from product_insights.ingestion.downloader import download_google_play_reviews, download_app_store_reviews
            download_google_play_reviews(
                config.product.google_play_package, 
                Path(config.sources.google_play.sample_path), 
                config.reporting.lookback_weeks
            )
            download_app_store_reviews(
                config.product.apple_app_store_id, 
                config.product.name, 
                Path(config.sources.apple_app_store.sample_path), 
                config.reporting.lookback_weeks
            )
        except Exception as exc:
            print(f"DOWNLOAD_FAILED: {exc}")
            # We continue since there might be existing data in sample_path

        # 2. Ingestion
        sources = [
            GooglePlayExportSource(Path(config.sources.google_play.sample_path), config.product.google_play_package),
            AppStoreExportSource(Path(config.sources.apple_app_store.sample_path), config.product.apple_app_store_id)
        ]
        result = IngestionService(config, repository, key).run(args.as_of, sources)
        print(f"Ingestion {result.manifest.status.value}; eligible={len(result.eligible_review_ids)}")

        if not result.eligible_review_ids:
            print("No eligible reviews found. Exiting.")
            return 0

        # 3. Orchestration
        from langchain_groq import ChatGroq
        import os
        model = ChatGroq(
            api_key=os.environ.get("GROQ_API_KEY"),
            model="openai/gpt-oss-20b",
            temperature=0
        )
        
        # We need a checkpointer, but for MVP we might skip passing it if we just want a run.
        # graph.py accepts checkpointer=None.
        workflow = build_orchestration_graph(config, model, mcp_client, repository)

        initial_state = {
            "run_key": result.manifest.run_key,
            "period_start": result.manifest.period_start,
            "period_end": result.manifest.period_end,
            "review_ids": list(result.eligible_review_ids),
        }

        # Run the workflow
        print("Starting workflow execution...")
        final_state = await workflow.ainvoke(initial_state)

        if final_state.get("is_valid"):
            print("Workflow completed successfully.")
            if final_state.get("document_id"):
                print(f"Docs published: {final_state['document_id']}")
            if final_state.get("draft_id"):
                print(f"Draft created: {final_state['draft_id']}")
        else:
            print(f"Workflow validation failed: {final_state.get('error')}")
            return 1
            
    except Exception as exc:
        print(f"WORKFLOW_FAILED: {exc}")
        return 1
    finally:
        repository.close()

    return 0


async def _scheduler(args: argparse.Namespace, config: AppConfig) -> int:
    async def workflow_callback(as_of_date: date) -> int:
        args.as_of = as_of_date
        return await _run_workflow(args, config)

    await run_scheduler(config, workflow_callback)
    return 0


def _purge(args: argparse.Namespace, config: AppConfig) -> int:
    logger = get_logger("product_insights.cli")
    database_path = args.database or Path(config.persistence.database_path)
    repository = SQLiteRepository(database_path)
    try:
        counts = repository.purge_old_records(
            raw_days=config.retention.raw_import_days,
            sanitized_days=config.retention.sanitized_review_days,
            audit_days=config.retention.audit_days
        )
        logger.info("Purged old records", extra={"purged_counts": counts})
        print(f"Purged old records: {counts}")
    except Exception as e:
        logger.exception("Failed to purge records", exc_info=e)
        return 1
    finally:
        repository.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
