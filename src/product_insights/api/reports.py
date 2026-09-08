"""Owner-controlled report snapshots and explicit delivery endpoints."""

import hashlib
import json
import re
from datetime import UTC, datetime
from typing import Annotated, Literal
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field, field_validator
from sqlalchemy import func
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from product_insights.db.models import PulseReport, ReportDelivery, Review, Workspace
from product_insights.db.session import get_db
from product_insights.reporting import delivery
from product_insights.reporting.pulse import build_report


class ReportRequest(BaseModel):
    days: Literal[56, 70, 84] = 70
    platform: Literal["All Platforms", "iOS", "Android"] = "All Platforms"


class DeliveryRequest(BaseModel):
    action: Literal["docs", "draft", "send"]
    recipients: list[str] = Field(default_factory=list, max_length=50)
    document_id: str | None = Field(default=None, max_length=256)
    message: str = Field(default="", max_length=2000)

    @field_validator("recipients")
    @classmethod
    def validate_recipients(cls, values):
        result = []
        for value in values:
            address = value.strip()
            if (
                len(address) > 254
                or not re.fullmatch(
                    r"[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+",
                    address,
                )
                or address.startswith(".")
                or ".." in address.split("@")[0]
            ):
                raise ValueError("Enter valid email addresses, with no names or line breaks.")
            if address.casefold() not in {item.casefold() for item in result}:
                result.append(address)
        return result

    @field_validator("document_id")
    @classmethod
    def validate_document(cls, value):
        if value is None:
            return value
        match = re.fullmatch(
            r"https://docs\.google\.com/document/d/([\w-]+)(?:/[^\s]*)?", value.strip()
        )
        value = match[1] if match else value.strip()
        if not re.fullmatch(r"[A-Za-z0-9_-]{10,200}", value):
            raise ValueError("Enter a valid Google Docs URL or document ID.")
        return value


def create_report_router(require_owner, store_query, apply_filters):
    router = APIRouter(
        prefix="/api/workspaces/{workspace_id}/reports", dependencies=[Depends(require_owner)]
    )

    def report_row(db, workspace_id, report_id):
        row = db.get(PulseReport, report_id)
        if row is None or row.workspace_id != workspace_id:
            raise HTTPException(404, "Report not found")
        return row

    @router.get("/capabilities")
    async def get_capabilities(workspace_id: str):
        return await delivery.capabilities()

    @router.post("")
    def generate_report(
        workspace_id: str, payload: ReportRequest, db: Annotated[Session, Depends(get_db)]
    ):
        if db.get(Workspace, workspace_id) is None:
            raise HTTPException(404, "Workspace not found")
        query = apply_filters(
            store_query(db, workspace_id), days=payload.days, platform=payload.platform
        )
        query = query.filter(
            func.lower(Review.platform).in_(
                ["apple app store", "google play store", "ios", "android"]
            )
        )
        reviews = (
            query.filter(Review.created_at <= datetime.now(UTC).replace(tzinfo=None))
            .order_by(Review.created_at.desc(), Review.id)
            .all()
        )
        try:
            report = build_report(reviews, payload.days, payload.platform)
        except ValueError as exc:
            raise HTTPException(422, str(exc)) from exc
        report["id"] = str(uuid4())
        db.add(PulseReport(id=report["id"], workspace_id=workspace_id, payload=json.dumps(report)))
        db.commit()
        return report

    @router.get("/{report_id}")
    def get_report(workspace_id: str, report_id: str, db: Annotated[Session, Depends(get_db)]):
        row = report_row(db, workspace_id, report_id)
        return {**json.loads(row.payload), "document_id": row.document_id}

    @router.post("/{report_id}/deliver")
    async def deliver_report(
        workspace_id: str,
        report_id: str,
        payload: DeliveryRequest,
        db: Annotated[Session, Depends(get_db)],
    ):
        row = report_row(db, workspace_id, report_id)
        if payload.action != "docs" and not payload.recipients:
            raise HTTPException(
                422, "Add at least one recipient before creating a draft or sending."
            )
        if payload.action == "docs" and not payload.document_id:
            raise HTTPException(422, "Choose a Google Doc before publishing.")
        # Bind retries to the immutable report and the actual delivery destination.
        destination = (
            payload.document_id
            if payload.action == "docs"
            else sorted(a.casefold() for a in payload.recipients)
        )
        key = hashlib.sha256(
            json.dumps([report_id, payload.action, destination, payload.message]).encode()
        ).hexdigest()
        operation = ReportDelivery(id=key, report_id=report_id, status="pending")
        try:
            db.add(operation)
            db.commit()
        except IntegrityError:
            db.rollback()
            existing = db.get(ReportDelivery, key)
            if existing and existing.status == "completed":
                return json.loads(existing.result)
            raise HTTPException(
                409,
                "This delivery is pending or its outcome is unconfirmed. "
                "Check Gmail or Docs before trying a new report.",
            ) from None
        try:
            result = await delivery.deliver(
                payload.action,
                json.loads(row.payload),
                payload.recipients,
                payload.document_id,
                row.document_id,
                key,
                payload.message,
            )
        except Exception:
            operation.status = "unconfirmed"
            db.commit()
            raise HTTPException(
                502,
                "Delivery could not be confirmed. Check Gmail or Docs before trying again; "
                "this request will not be automatically repeated.",
            ) from None
        if payload.action == "docs":
            row.document_id = payload.document_id
        operation.status = "completed"
        operation.result = json.dumps(result)
        db.commit()
        return result

    return router
