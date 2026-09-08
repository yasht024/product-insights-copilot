import os
from pathlib import Path
from threading import Lock

from sqlalchemy import create_engine, inspect, select, text
from sqlalchemy.engine import make_url
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool

from product_insights.db.models import Base, Workspace

DEFAULT_DB_PATH = Path(__file__).resolve().parents[3] / "product_insights.db"


def database_url() -> str:
    configured = os.environ.get("DATABASE_URL") or os.environ.get("POSTGRES_URL")
    if os.environ.get("VERCEL") and not configured:
        raise RuntimeError("Set DATABASE_URL to a persistent PostgreSQL database in Vercel.")
    value = configured or f"sqlite:///{DEFAULT_DB_PATH.as_posix()}"
    url = make_url(value)
    if os.environ.get("VERCEL") and url.get_backend_name() not in {"postgres", "postgresql"}:
        raise RuntimeError(
            "Vercel requires persistent PostgreSQL storage; local SQLite is unsupported."
        )
    if url.drivername in {"postgres", "postgresql"}:
        url = url.set(drivername="postgresql+psycopg")
    return url.render_as_string(hide_password=False)


DATABASE_URL = database_url()
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine_options = {"poolclass": NullPool} if os.environ.get("VERCEL") else {}
engine = create_engine(
    DATABASE_URL, connect_args=connect_args, pool_pre_ping=True, **engine_options
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
_schema_lock = Lock()
_schema_ready = False


def ensure_schema_compatibility(connection) -> None:
    """Apply additive dashboard migrations without replacing stored reviews."""
    inspector = inspect(connection)
    columns = {column["name"] for column in inspector.get_columns("workspaces")}
    if "last_synced_at" not in columns:
        connection.execute(text("ALTER TABLE workspaces ADD COLUMN last_synced_at TIMESTAMP"))
    if "last_sync_status" not in columns:
        connection.execute(text("ALTER TABLE workspaces ADD COLUMN last_sync_status VARCHAR"))
    review_columns = {column["name"] for column in inspector.get_columns("reviews")}
    if "word_count" not in review_columns:
        connection.execute(text("ALTER TABLE reviews ADD COLUMN word_count INTEGER"))
    missing_counts = connection.execute(
        text("SELECT id, text FROM reviews WHERE word_count IS NULL")
    ).all()
    if missing_counts:
        connection.execute(
            text("UPDATE reviews SET word_count = :word_count WHERE id = :id"),
            [
                {"id": review_id, "word_count": len((review_text or "").split())}
                for review_id, review_text in missing_counts
            ],
        )


def initialize_database() -> None:
    """Create the schema and workspace, never seed fabricated review data."""
    global _schema_ready
    if _schema_ready:
        return
    with _schema_lock:
        if _schema_ready:
            return
        with engine.begin() as connection:
            # Serialize first requests from different serverless instances, too.
            if connection.dialect.name == "postgresql":
                connection.execute(
                    text("SELECT pg_advisory_xact_lock(hashtext('product-insights-schema'))")
                )
            Base.metadata.create_all(connection)
            ensure_schema_compatibility(connection)
            if (
                connection.execute(select(Workspace.id).where(Workspace.id == "ws_1")).first()
                is None
            ):
                connection.execute(
                    Workspace.__table__.insert().values(
                        id="ws_1", name="Groww Mobile App", slug="groww-mobile-app"
                    )
                )
        _schema_ready = True


def get_db():
    initialize_database()
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
