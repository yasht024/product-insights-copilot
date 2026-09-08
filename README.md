# Product Insights Copilot

Privacy-safe weekly product insights from approved Google Play and Apple App
Store review exports. The project is currently at **Phase 0: readiness and
project setup**.

## Requirements

- Python 3.12, 3.13, or 3.14
- Dependencies installed from `requirements.lock`

## Setup

```powershell
py -3.14 -m venv .venv
.venv\Scripts\python -m pip install --upgrade pip
.venv\Scripts\python -m pip install -r requirements.lock
.venv\Scripts\python -m pip install --no-deps --no-build-isolation .
```

Use any supported Python version and its matching launcher flag.

## Commands

### Run the dashboard

From the project root, start both the review API and frontend with:

```powershell
npm install --prefix frontend
npm run dev --prefix frontend
```

Open the local URL printed by Vite. The launcher waits for the database-backed
API to become ready before starting the frontend. Ctrl+C stops the services it
started. The default database is the project's `product_insights.db`, regardless
of the directory used to launch Python; `DATABASE_URL` still overrides it.

The dashboard and Analytics page refresh imported-review metrics every 30 seconds.
Analytics supports platform, date-range, and daily-to-quarterly aggregation controls,
plus CSV export. Use **Scrape Reviews** to import new public store reviews. Scraping
and viewing use separate date windows; an empty filtered window is displayed explicitly.

For separate services, run `.venv/Scripts/python -m uvicorn
product_insights.api.main:app --host 127.0.0.1 --port 8000` from the project root
and `npm run dev:frontend --prefix frontend`. Vite proxies `/api` to port 8000;
`API_PROXY_TARGET` can override that target. For a hosted frontend, route `/api`
to the deployed backend or set `VITE_API_BASE_URL` to its public API URL
(including `/api`) when building. Text and icon fonts are bundled locally.

For the existing Vercel website, follow [the full-stack deployment setup](docs/deploy-dashboard.md).
The Vercel project must build from the repository root and have a persistent
`DATABASE_URL`. Production always uses the real API; there is no automatic demo fallback.

```powershell
product-insights config-check
product-insights config-check --production
pytest
ruff format --check .
ruff check .
mypy src tests scripts
python scripts/check_secrets.py
pip-audit -r requirements.lock
```

The default configuration is intentionally fixture-only. The first command
passes for development; the production command reports unresolved external
approvals and exits non-zero.

See [Phase 0 decisions](docs/phase0-decisions.md) for the readiness record.
