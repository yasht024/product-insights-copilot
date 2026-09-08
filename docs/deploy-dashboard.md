# Deploy the real dashboard on Vercel

## Weekly report delivery

Reporting lets visitors compose a message and add recipient email tags locally.
Only an authenticated owner can generate reports, create Gmail drafts, send email,
or append reports to Google Docs. The API enforces this independently of the UI.

Generate a report from 8, 10, or 12 weeks of stored public store reviews. The report
contains at most three highlighted themes (from at most five keyword groups), three
anonymous verbatim snippets, and three theme-based action ideas within 250 words.
PII-screened and duplicate reviews are excluded; fewer than three eligible reviews
produces an actionable error. The dashboard uses deterministic keyword grouping,
not the separate CLI's LLM analysis pipeline.

The hosted API uses the official MCP Python SDK with the existing MCP server in
`config/default.yaml`. Optional server-only environment overrides are
`REPORT_MCP_URL`, `REPORT_MCP_TRANSPORT` (`sse` or streamable HTTP), and
`REPORT_DOCUMENT_ID`. No Google OAuth or REST client is added. The configured
connector must expose `gmail_create_draft`, `gmail_send_email`, and
`google_docs_append_text`; unavailable capabilities are disabled in the UI.

The From field is read-only because the current MCP server uses one fixed Google
account and exposes no profile or account-switching tools. Set
`REPORT_SENDER_EMAIL` to that account's owner-confirmed email address. Only the first
two characters and the domain are exposed in the public API and Reporting page;
the remaining characters are replaced by stars. This does not change the sending account. Never
infer it from the recipient configuration. If Gmail is reauthorized on the MCP
server, update this label to match; the app does not provide an OAuth connection
flow or accept a manually entered From header.

Choose an editable Google Doc URL or ID, then publish to append the pulse. Email
always includes the complete saved report and optionally the owner's introduction;
once published, it also includes the Doc URL. Doc access follows the document's
existing sharing settings. The recipient list does not grant Google Drive access.
Sending requires the owner's final Send now click. The CLI remains draft-only.

Report snapshots and delivery receipts are persisted in additive database tables.
Repeated identical operations return the original receipt without repeating the
external call. If completion is uncertain, inspect Gmail/Docs before generating a
new report; the app will not retry the external operation automatically.

The frontend always requests real data from `/api`. `VITE_API_BASE_URL` is an
optional override for a separately hosted API; omitting it never enables demo data.

## Existing Vercel project

1. Set **Settings → Build and Deployment → Root Directory** to the repository
   root (clear `frontend`). The root `vercel.json` builds the frontend and packages
   `api/index.py`, which imports the same FastAPI app used locally. The old
   frontend-only SPA rewrite cannot serve API requests.
2. Connect a persistent PostgreSQL database. Set **DATABASE_URL** in the server
   environment for Production, using the provider's TLS connection string.
   `POSTGRES_URL` is also supported. Use a separate database for Preview builds.
   Never put a database credential in a `VITE_` variable.
3. Set **OWNER_ACCESS_KEY** to a private value of at least 12 characters. Public
   visitors can read live insights, but the API rejects scraping, review status
   changes, reply generation, and premium tools unless the request carries this
   key. The browser keeps an unlocked key in session storage only.
4. Redeploy. `api/pyproject.toml` contains only dashboard runtime dependencies,
   including the PostgreSQL driver. The full local AI pipeline is not needed.
5. Confirm `/api/health` returns JSON with `status: "ok"`, unlock owner mode, then
   open the dashboard
   and run **Scrape Reviews** to import real Google Play and Apple App Store reviews.
   A new database starts empty, with the Groww workspace and no synthetic reviews.
6. Confirm the inbox and metrics contain the imported reviews; reload or redeploy
   and verify review IDs and statuses remain. The database, not the deployment,
   owns this state.

First use initializes the schema and applies additive migrations. PostgreSQL
advisory locking protects initialization across concurrent serverless instances.
Vercel deployments reject missing database configuration and SQLite storage rather
than silently creating an ephemeral database. Local development retains SQLite.

The local database is excluded from deployment. To see exactly the same review
history locally and remotely, configure both services to use the same authorized
database. Scraping a new production database imports the current store feed; it
does not automatically copy historical rows from your computer.

Until the root directory and persistent database are configured, do not promote
this build as a working live deployment. Code changes alone cannot provision or
connect the database in an account that is not signed in.
