"""Production storage and packaging regressions; no live store calls."""

import json
import runpy
from pathlib import Path

import pytest
import sqlalchemy
from sqlalchemy import text
from sqlalchemy.engine import make_url

PROJECT = Path(__file__).resolve().parents[2]
SESSION_FILE = PROJECT / "src/product_insights/db/session.py"


@pytest.mark.parametrize("value", [None, "sqlite:///:memory:", "sqlite:////tmp/reviews.db"])
def test_vercel_never_falls_back_to_ephemeral_storage(monkeypatch, value):
    monkeypatch.setenv("VERCEL", "1")
    monkeypatch.delenv("POSTGRES_URL", raising=False)
    if value:
        monkeypatch.setenv("DATABASE_URL", value)
    else:
        monkeypatch.delenv("DATABASE_URL", raising=False)
    with pytest.raises(RuntimeError, match="persistent PostgreSQL"):
        runpy.run_path(str(SESSION_FILE))


@pytest.mark.parametrize("variable", ["DATABASE_URL", "POSTGRES_URL"])
@pytest.mark.parametrize("scheme", ["postgres", "postgresql"])
def test_postgres_urls_select_the_bundled_driver(monkeypatch, variable, scheme):
    memory_engine = sqlalchemy.create_engine("sqlite:///:memory:")
    monkeypatch.setattr(sqlalchemy, "create_engine", lambda *a, **kw: memory_engine)
    monkeypatch.delenv("DATABASE_URL", raising=False)
    monkeypatch.delenv("POSTGRES_URL", raising=False)
    monkeypatch.setenv("VERCEL", "1")
    # Deliberate fake credentials exercise escaped-password parsing.
    monkeypatch.setenv(
        variable,
        f"{scheme}://user:p%40ss@db.example/reviews?sslmode=require",  # pragma: allowlist secret
    )
    module = runpy.run_path(str(SESSION_FILE))
    url = make_url(module["DATABASE_URL"])
    assert url.drivername == "postgresql+psycopg"
    assert url.password == "p@ss"  # noqa: S105  # pragma: allowlist secret
    assert url.query["sslmode"] == "require"
    memory_engine.dispose()


def test_fresh_database_contains_workspace_but_no_demo_and_survives_restart(tmp_path, monkeypatch):
    monkeypatch.delenv("VERCEL", raising=False)
    monkeypatch.setenv("DATABASE_URL", f"sqlite:///{(tmp_path / 'persistent.db').as_posix()}")
    module = runpy.run_path(str(SESSION_FILE))
    module["initialize_database"]()
    with module["engine"].begin() as connection:
        assert connection.execute(text("SELECT id FROM workspaces")).scalars().all() == ["ws_1"]
        assert connection.execute(text("SELECT COUNT(*) FROM reviews")).scalar() == 0
        connection.execute(
            text(
                "INSERT INTO reviews (id, workspace_id, text, status) "
                "VALUES ('store-id', 'ws_1', 'Review kept across restarts', 'Reviewed')"
            )
        )
    module["engine"].dispose()
    restarted = runpy.run_path(str(SESSION_FILE))
    restarted["initialize_database"]()
    restarted["initialize_database"]()
    with restarted["engine"].connect() as connection:
        row = connection.execute(text("SELECT id, status, word_count FROM reviews")).one()
        assert tuple(row) == ("store-id", "Reviewed", 4)
        assert connection.execute(text("SELECT COUNT(*) FROM workspaces")).scalar() == 1
    restarted["engine"].dispose()


def test_api_route_precedes_spa_fallback_and_backend_is_packaged():
    config = json.loads((PROJECT / "vercel.json").read_text())
    assert config["rewrites"][0] == {"source": "/api/:path*", "destination": "/api/index.py"}
    assert (PROJECT / "api/index.py").is_file()
    assert config["outputDirectory"] == "frontend/dist"


def test_existing_schema_migrates_without_replacing_reviews(tmp_path, monkeypatch):
    monkeypatch.delenv("VERCEL", raising=False)
    db_url = f"sqlite:///{(tmp_path / 'legacy.db').as_posix()}"
    legacy = sqlalchemy.create_engine(db_url)
    with legacy.begin() as connection:
        connection.execute(
            text("CREATE TABLE workspaces (id VARCHAR PRIMARY KEY, name VARCHAR, slug VARCHAR)")
        )
        connection.execute(
            text("INSERT INTO workspaces VALUES ('ws_1', 'Existing workspace', 'existing')")
        )
        connection.execute(
            text("CREATE TABLE reviews (id VARCHAR PRIMARY KEY, workspace_id VARCHAR, text TEXT)")
        )
        connection.execute(
            text("INSERT INTO reviews VALUES ('retained', 'ws_1', 'Original imported review')")
        )
    legacy.dispose()
    monkeypatch.setenv("DATABASE_URL", db_url)
    module = runpy.run_path(str(SESSION_FILE))
    module["initialize_database"]()
    with module["engine"].connect() as connection:
        assert (
            connection.execute(text("SELECT name FROM workspaces")).scalar() == "Existing workspace"
        )
        assert connection.execute(text("SELECT word_count FROM reviews")).scalar() == 3
        assert connection.execute(text("SELECT id FROM reviews")).scalar() == "retained"
        assert connection.execute(text("SELECT last_synced_at FROM workspaces")).scalar() is None
    module["engine"].dispose()
