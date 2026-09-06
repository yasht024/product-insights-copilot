# Phase 0 Readiness Record

Version: `v1`  
Last reviewed: `2026-09-02`  
Owners: technical owner and product reviewer pending assignment

This record separates facts that are safe to encode from organizational
approvals that cannot be inferred. Pending items block production but do not
block fixture-based development.

## Product identifiers

| Store | Identifier | Status | Evidence |
| --- | --- | --- | --- |
| Google Play | `com.nextbillion.groww` | Approved | [Public listing](https://play.google.com/store/apps/details?id=com.nextbillion.groww) |
| Apple App Store | `1404871703` | Approved | [Public listing](https://apps.apple.com/in/app/groww-stocks-mutual-fund-ipo/id1404871703) |

## Review sources

| Store | Development source | Production source | Format and cadence | Constraints |
| --- | --- | --- | --- | --- |
| Google Play | Versioned synthetic CSV fixture | Python scraping script (public API) | JSON; weekly | Public reviews only; no login scraping; provenance required; reviewer identity ignored |
| Apple App Store | Versioned synthetic JSON fixture | Python scraping script (public API) | JSON; weekly | Public reviews only; no bypassing controls; provenance required; reviewer identity ignored |

The fixture sources are approved only for development. No network scraper or
production adapter is enabled. A terms or access-policy change must suspend the
affected adapter until re-approval.

## Model decision

The development integration is `fake/deterministic-fixture`. The production model is approved as `gemini-3.5-pro` via `langchain-google-genai`.

## MCP capability matrix

| Semantic role | Server alias | Required capability | Allowed side effect | Status |
| --- | --- | --- | --- | --- |
| `docs_upsert` | `docs-mcp-server` | Create or update one document in an allowlisted folder | Document upsert | Approved |
| `gmail_create_draft` | `gmail-mcp-server` | Create or reconcile one unsent draft | Draft creation only | Approved |
| Gmail send | None | None | Forbidden | Must never enter the application allowlist |

Connector authentication and server transport details belong to the runtime,
not application YAML or source control.

## Delivery settings

| Setting | Development value | Production status |
| --- | --- | --- |
| Drive folder | `Groww Product Insights` | Approved |
| Recipient | `product-team@groww.in` | Approved |
| Report name | `Groww Product Pulse - {reporting_week_end}` | Approved |
| Email behavior | Create unsent draft only | Mandatory and enforced |

## Operating policy

| Setting | Proposed v1 value | Approval status |
| --- | --- | --- |
| Lookback | 10 weeks | Approved |
| Schedule | Monday 09:00 IST (`0 9 * * 1`) | Approved |
| Minimum eligible reviews | 20 | Approved |
| Raw import retention | 7 days | Approved |
| Sanitized review retention | 180 days | Approved |
| Audit retention | 365 days | Approved |

## Production blockers

All Phase 0 blockers have been resolved and approved by the product owner.

