"""Report contents, permission boundaries, MCP payloads and retry semantics."""

from contextlib import asynccontextmanager
from datetime import UTC, datetime, timedelta
from types import SimpleNamespace

import pytest
from fastapi.testclient import TestClient
from mcp.types import CallToolResult, TextContent
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from product_insights.api.main import app
from product_insights.db.models import Base, Review, Workspace
from product_insights.db.session import get_db
from product_insights.reporting import delivery
from product_insights.reporting.pulse import build_report


@pytest.fixture
def client(monkeypatch):
    monkeypatch.setenv("OWNER_ACCESS_KEY", "report-owner-test-key")
    engine = create_engine(
        "sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool
    )
    Base.metadata.create_all(engine)
    factory = sessionmaker(bind=engine)
    with factory() as db:
        db.add(Workspace(id="ws_test", name="Groww", slug="groww"))
        db.add_all(
            [
                Review(
                    id="play-1",
                    workspace_id="ws_test",
                    platform="Google Play Store",
                    rating=1,
                    text="KYC verification keeps failing at the last step.",
                ),
                Review(
                    id="play-2",
                    workspace_id="ws_test",
                    platform="Google Play Store",
                    rating=2,
                    text="The withdrawal is still pending after three days.",
                ),
                Review(
                    id="apple-1",
                    workspace_id="ws_test",
                    platform="Apple App Store",
                    rating=2,
                    text="The app crashes when opening my portfolio.",
                ),
                Review(
                    id="private",
                    workspace_id="ws_test",
                    platform="Google Play Store",
                    rating=1,
                    text="Email me at somebody@example.com about KYC.",
                ),
                Review(
                    id="duplicate",
                    workspace_id="ws_test",
                    platform="Google Play Store",
                    rating=1,
                    text="KYC verification keeps failing at the last step.",
                ),
                Review(
                    id="old",
                    workspace_id="ws_test",
                    platform="Google Play Store",
                    rating=1,
                    text="Ancient feedback",
                    created_at=datetime.now(UTC) - timedelta(days=100),
                ),
                Review(
                    id="future",
                    workspace_id="ws_test",
                    platform="Google Play Store",
                    rating=1,
                    text="Future feedback",
                    created_at=datetime.now(UTC) + timedelta(days=3),
                ),
                Review(
                    id="support",
                    workspace_id="ws_test",
                    platform="Zendesk",
                    rating=1,
                    text="Not a public store review",
                ),
            ]
        )
        db.commit()

    def override():
        with factory() as db:
            yield db

    app.dependency_overrides[get_db] = override
    with TestClient(app, headers={"X-Owner-Key": "report-owner-test-key"}) as api:
        yield api
    app.dependency_overrides.clear()
    engine.dispose()


def generate(client):
    result = client.post("/api/workspaces/ws_test/reports", json={})
    assert result.status_code == 200, result.text
    return result.json()


def test_public_sender_exposes_only_masked_confirmed_address(client, monkeypatch):
    monkeypatch.setenv("REPORT_SENDER_EMAIL", "owner@example.com")
    response = client.get("/api/mail/sender", headers={"X-Owner-Key": ""})
    assert response.status_code == 200
    assert response.json() == {"masked_email": "ow***@example.com", "can_switch_account": False}
    assert "owner@example.com" not in response.text
    monkeypatch.delenv("REPORT_SENDER_EMAIL")
    assert client.get("/api/mail/sender").json()["masked_email"] is None
    monkeypatch.setenv("REPORT_SENDER_EMAIL", "invalid\r\nvalue@example.com")
    assert client.get("/api/mail/sender").json()["masked_email"] is None


def test_report_meets_problem_statement_and_uses_only_current_safe_store_reviews(client):
    report = generate(client)
    assert report["review_count"] == 3
    assert report["cluster_count"] <= 5
    assert len(report["themes"]) == len(report["quotes"]) == len(report["actions"]) == 3
    assert report["word_count"] == len(report["content"].split()) <= 250
    assert "@" not in report["content"]
    assert report["quotes"][0]["text"] in report["content"]
    assert client.get(f"/api/workspaces/ws_other/reports/{report['id']}").status_code == 404


def test_insufficient_reviews_and_invalid_filters_fail_without_fabricating(client):
    result = client.post("/api/workspaces/ws_test/reports", json={"platform": "iOS"})
    assert result.status_code == 422
    assert "three distinct" in result.json()["detail"]
    assert client.post("/api/workspaces/ws_test/reports", json={"days": 365}).status_code == 422


@pytest.mark.parametrize(
    "method,path,payload",
    [
        ("POST", "", {}),
        ("GET", "/capabilities", None),
        ("GET", "/report-id", None),
        ("POST", "/report-id/deliver", {"action": "send", "recipients": ["a@example.com"]}),
        ("POST", "/report-id/deliver", {"action": "draft", "recipients": ["a@example.com"]}),
        ("POST", "/report-id/deliver", {"action": "docs", "document_id": "example_doc_id"}),
    ],
)
def test_visitors_cannot_read_private_reports_or_use_delivery(client, method, path, payload):
    response = client.request(
        method, "/api/workspaces/ws_test/reports" + path, json=payload, headers={"X-Owner-Key": ""}
    )
    assert response.status_code == 403


def test_multiple_recipients_are_validated_and_retries_do_not_send_twice(client, monkeypatch):
    calls = []

    async def fake_deliver(action, report, recipients, doc_id, published_id, key, message):
        calls.append((action, recipients, report["content"], message))
        return {
            "action": action,
            "status": "completed",
            "reference": "real-provider-id",
            "document_url": None,
            "recipients": recipients,
        }

    monkeypatch.setattr(delivery, "deliver", fake_deliver)
    report = generate(client)
    url = f"/api/workspaces/ws_test/reports/{report['id']}/deliver"
    payload = {
        "action": "send",
        "recipients": ["first@example.com", "SECOND@example.com", "First@example.com"],
        "message": "Hi team",
    }
    assert client.post(url, json=payload).status_code == 200
    assert client.post(url, json=payload).status_code == 200
    assert len(calls) == 1
    assert calls[0] == (
        "send",
        ["first@example.com", "SECOND@example.com"],
        report["content"],
        "Hi team",
    )
    assert client.post(url, json={"action": "send", "recipients": []}).status_code == 422
    for invalid in [
        "bad",
        "x@example.com\r\nBcc: sneaky@example.com",
        "@example.com",
        "a@-bad.com",
    ]:
        assert (
            client.post(url, json={"action": "draft", "recipients": [invalid]}).status_code == 422
        )


def test_uncertain_delivery_is_not_repeated(client, monkeypatch):
    calls = []

    async def uncertain(*args):
        calls.append(args)
        raise TimeoutError

    monkeypatch.setattr(delivery, "deliver", uncertain)
    report = generate(client)
    url = f"/api/workspaces/ws_test/reports/{report['id']}/deliver"
    payload = {"action": "send", "recipients": ["a@example.com"]}
    assert client.post(url, json=payload).status_code == 502
    assert client.post(url, json=payload).status_code == 409
    assert len(calls) == 1


@pytest.mark.asyncio
async def test_mcp_uses_verified_schemas_and_includes_same_report_and_doc_link(monkeypatch):
    calls = []

    class FakeSession:
        async def list_tools(self):
            return SimpleNamespace(
                tools=[
                    SimpleNamespace(name=name)
                    for name in [
                        "gmail_send_email",
                        "gmail_create_draft",
                        "google_docs_append_text",
                    ]
                ]
            )

        async def call_tool(self, name, args):
            calls.append((name, args))
            return CallToolResult(
                content=[TextContent(type="text", text='{"success":true,"id":"provider-id"}')]
            )

    @asynccontextmanager
    async def fake_session():
        yield FakeSession()

    monkeypatch.setattr(delivery, "session", fake_session)
    report = {"title": "Weekly pulse", "content": "Full generated report"}
    await delivery.deliver("docs", report, [], "document_123", None, "doc-operation")
    await delivery.deliver(
        "draft",
        report,
        ["a@example.com", "b@example.com"],
        None,
        "document_123",
        "draft-operation",
        "Hi team",
    )
    await delivery.deliver("send", report, ["a@example.com"], None, None, "send-operation")
    assert calls[0][0] == "google_docs_append_text"
    assert calls[0][1]["text"] == report["content"]
    assert calls[0][1]["document_id"] == "document_123"
    assert calls[1][1]["to"] == ["a@example.com", "b@example.com"]
    assert (
        calls[1][1]["body_text"]
        == "Hi team\n\nFull generated report\n\nGoogle Docs: https://docs.google.com/document/d/document_123/edit"
    )
    assert calls[2][1]["idempotency_key"] == "send-operation"


@pytest.mark.parametrize("response", ["{}", '{"error":"failed"}', '{"success":false}', "not json"])
def test_connector_errors_never_become_fake_success(response):
    with pytest.raises(RuntimeError):
        delivery.parse_result(CallToolResult(content=[TextContent(type="text", text=response)]))


def test_long_quotes_remain_exact_substrings_and_report_is_bounded():
    reviews = [
        SimpleNamespace(text=f"KYC {'word ' * 100}{i}", rating=2, author="Anonymous")
        for i in range(3)
    ]
    report = build_report(reviews, 70, "All Platforms")
    assert report["word_count"] <= 250
    assert len(report["themes"]) == 1
    assert len(report["actions"]) == 3
    assert all(any(q["text"] in r.text for r in reviews) for q in report["quotes"])
