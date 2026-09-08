"""Owner-only write access for the hosted workspace."""

from fastapi import HTTPException
from starlette.requests import Request

from product_insights.api.main import (
    access_status,
    api_router,
    require_owner,
    verify_access,
    AccessVerifyRequest,
)


def request_with_key(value: str | None = None) -> Request:
    headers = [] if value is None else [(b"x-owner-key", value.encode())]
    return Request({"type": "http", "method": "GET", "path": "/", "headers": headers})


def test_hosted_access_defaults_to_viewer_and_accepts_only_owner_key(monkeypatch):
    monkeypatch.setenv("VERCEL", "1")
    monkeypatch.setenv("OWNER_ACCESS_KEY", "owner-key-for-tests")
    assert access_status(request_with_key())["role"] == "viewer"
    assert access_status(request_with_key("wrong-key"))["permissions"]["scrape"] is False
    owner = access_status(request_with_key("owner-key-for-tests"))
    assert owner["role"] == "owner"
    assert all(owner["permissions"].values())
    assert verify_access(AccessVerifyRequest(access_key="owner-key-for-tests"))["verified"]
    try:
        require_owner(request_with_key("wrong-key"))
    except HTTPException as error:
        assert error.status_code == 403
    else:
        raise AssertionError("Invalid owner key was accepted")


def test_hosted_writes_fail_closed_when_owner_key_is_missing(monkeypatch):
    monkeypatch.setenv("VERCEL", "1")
    monkeypatch.delenv("OWNER_ACCESS_KEY", raising=False)
    try:
        require_owner(request_with_key())
    except HTTPException as error:
        assert error.status_code == 503
    else:
        raise AssertionError("Hosted write access was left open")


def test_every_mutating_review_route_requires_owner_access():
    protected_paths = {
        "/api/workspaces/{workspace_id}/sync",
        "/api/workspaces/{workspace_id}/reviews/bulk",
        "/api/workspaces/{workspace_id}/reviews/{review_id}/draft",
    }
    routes = {
        route.path: route
        for route in api_router.routes
        if getattr(route, "methods", set()) & {"POST"}
    }
    for path in protected_paths:
        dependencies = {dependency.call for dependency in routes[path].dependant.dependencies}
        assert require_owner in dependencies
