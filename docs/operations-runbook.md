# Product Insights Copilot - Operations Runbook

## 1. Overview
This runbook covers the operational procedures for Phase 4 of the Product Insights Copilot. The system runs via a cron scheduler (`product-insights scheduler`) that triggers the workflow on a weekly basis.

## 2. Starting the Scheduler
Run the following command to start the long-running scheduler:
```bash
product-insights scheduler --config config/default.yaml
```

## 3. Manual Backfills
To perform a manual backfill for a past date:
```bash
# Example: backfill for reporting week ending on 2023-10-15
product-insights run-workflow --as-of 2023-10-15
```

## 4. Retention and Purge
The `purge` command enforces the retention policy defined in `config/default.yaml`:
```bash
product-insights purge --config config/default.yaml
```

## 5. Backup
A database backup can be created programmatically using the `backup()` method in `SQLiteRepository`.

## 6. Checkpoint Recovery and Connector Reauthorization
- LangGraph checkpoints are stored in SQLite and are automatically resumed on the next run if the process terminates unexpectedly.
- If MCP connectors fail due to authorization, re-authorize the server and the workflow will safely retry on the next execution without duplicating side-effects (drafts or docs).
