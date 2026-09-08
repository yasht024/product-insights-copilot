# Deploy the real dashboard on Vercel

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
3. Redeploy. `api/pyproject.toml` contains only dashboard runtime dependencies,
   including the PostgreSQL driver. The full local AI pipeline is not needed.
4. Confirm `/api/health` returns JSON with `status: "ok"`, then open the dashboard
   and run **Scrape Reviews** to import real Google Play and Apple App Store reviews.
   A new database starts empty, with the Groww workspace and no synthetic reviews.
5. Confirm the inbox and metrics contain the imported reviews; reload or redeploy
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
