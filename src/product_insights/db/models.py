from sqlalchemy import Column, String, Integer, DateTime, Text, ForeignKey, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from datetime import datetime, timezone

Base = declarative_base()

class Workspace(Base):
    __tablename__ = "workspaces"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    slug = Column(String, nullable=False, unique=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    last_synced_at = Column(DateTime, nullable=True)
    last_sync_status = Column(String, nullable=True)

class Review(Base):
    __tablename__ = "reviews"

    id = Column(String, primary_key=True)
    workspace_id = Column(String, ForeignKey("workspaces.id"), nullable=False)
    author = Column(String)
    platform = Column(String)
    rating = Column(Integer)
    text = Column(Text)
    version = Column(String)
    status = Column(String, default="unread")
    word_count = Column(
        Integer,
        default=lambda context: len((context.get_current_parameters().get("text") or "").split()),
    )
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    workspace = relationship("Workspace")
