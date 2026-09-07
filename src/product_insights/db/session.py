import os
from sqlalchemy import create_engine, inspect, text
from sqlalchemy.orm import sessionmaker

# Use a SQLite database for Phase 1 development until Postgres is provisioned
DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./product_insights.db")

# SQLite needs check_same_thread=False for FastAPI
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(
    DATABASE_URL, connect_args=connect_args
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def ensure_schema_compatibility() -> None:
    """Apply additive local-dashboard migrations without replacing user data."""
    inspector = inspect(engine)
    table_names = inspector.get_table_names()
    if "workspaces" not in table_names:
        return
    columns = {column["name"] for column in inspector.get_columns("workspaces")}
    statements = []
    if "last_synced_at" not in columns:
        statements.append("ALTER TABLE workspaces ADD COLUMN last_synced_at DATETIME")
    if "last_sync_status" not in columns:
        statements.append("ALTER TABLE workspaces ADD COLUMN last_sync_status VARCHAR")
    if statements:
        with engine.begin() as connection:
            for statement in statements:
                connection.execute(text(statement))

    if "reviews" in table_names:
        review_columns = {column["name"] for column in inspector.get_columns("reviews")}
        if "word_count" not in review_columns:
            with engine.begin() as connection:
                connection.execute(text("ALTER TABLE reviews ADD COLUMN word_count INTEGER"))
        with engine.begin() as connection:
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


ensure_schema_compatibility()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
