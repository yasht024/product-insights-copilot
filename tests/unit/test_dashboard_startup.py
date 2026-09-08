"""Regression checks for launching the dashboard from a different directory."""

import runpy
from pathlib import Path

import sqlalchemy
from sqlalchemy.engine import make_url


def test_default_database_does_not_depend_on_working_directory(tmp_path, monkeypatch):
    project = Path(__file__).resolve().parents[2]
    session_file = project / "src/product_insights/db/session.py"
    memory_engine = sqlalchemy.create_engine("sqlite:///:memory:")
    urls = []

    def capture_engine(url, **kwargs):
        urls.append(url)
        return memory_engine

    monkeypatch.delenv("DATABASE_URL", raising=False)
    monkeypatch.setattr(sqlalchemy, "create_engine", capture_engine)
    monkeypatch.chdir(tmp_path)
    runpy.run_path(str(session_file))

    assert Path(make_url(urls[0]).database) == project / "product_insights.db"
    assert not (tmp_path / "product_insights.db").exists()
    memory_engine.dispose()


def test_database_environment_override_is_preserved(tmp_path, monkeypatch):
    session_file = Path(__file__).resolve().parents[2] / "src/product_insights/db/session.py"
    monkeypatch.setenv("DATABASE_URL", "sqlite:///:memory:")
    monkeypatch.chdir(tmp_path)
    module = runpy.run_path(str(session_file))
    assert module["DATABASE_URL"] == "sqlite:///:memory:"
    assert module["engine"].url.database == ":memory:"
    module["engine"].dispose()
