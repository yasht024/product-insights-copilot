"""Evidence-based, bounded weekly pulses from the dashboard's stored reviews."""

import re
from collections import defaultdict
from datetime import datetime, timedelta, timezone

from product_insights.processing import privacy

# Assign each review once; at most five clusters including the fallback.
THEMES = [
    (
        "Account access & KYC",
        r"\b(kyc|login|log in|otp|verification|onboarding|sign in)\b",
        [
            "Reproduce reported login and KYC failures; prioritize the most common blocked step.",
            "Add recovery guidance at the failing verification step; track completion rates.",
            "Review support contacts about account access and test the revised recovery flow.",
        ],
    ),
    (
        "Payments & withdrawals",
        r"\b(payment|payments|withdraw\w*|deposit\w*|upi|refund\w*|money|bank)\b",
        [
            "Audit reported payment and withdrawal failures; "
            "add clear status and recovery guidance.",
            "Reproduce delayed fund transfers and track time to resolution after fixes.",
            "Test payment error messages with support; measure repeat payment complaints.",
        ],
    ),
    (
        "App reliability",
        r"\b(crash\w*|slow|bug\w*|freeze\w*|frozen|lag\w*|loading|hang\w*|error)\b",
        [
            "Reproduce reported crashes and slow screens; "
            "prioritize a fix and monitor repeat complaints.",
            "Add regression coverage for the failing screens and measure load times.",
            "Compare reliability complaints after release to verify that the fixes help.",
        ],
    ),
    (
        "Investing experience",
        r"\b(stock\w*|trade\w*|trading|portfolio|chart\w*|mutual|sip|ipo|statement\w*|brokerage)\b",
        [
            "Review investing-flow feedback and prototype an improvement "
            "to the most frequent friction point.",
            "Test portfolio and statement clarity with users; track related support contacts.",
            "Validate the revised investing flow and compare repeat complaints after release.",
        ],
    ),
    (
        "General app experience",
        None,
        [
            "Review general feedback with Product and Support; "
            "test the most recurring usability concern.",
            "Compare high- and low-rated feedback to identify "
            "which experiences to preserve or improve.",
            "Validate one usability improvement with users and monitor subsequent review ratings.",
        ],
    ),
]


def safe_text(text: str, author: str | None = None) -> bool:
    value = privacy._detection_copy(text)
    patterns = (
        privacy.EMAIL,
        privacy.OBFUSCATED_EMAIL,
        privacy.PHONE,
        privacy.FINANCIAL,
        privacy.IDENTIFIER,
        privacy.PERSONAL_URL_OR_HANDLE,
        privacy.HIGH_CONFIDENCE_NAME,
    )
    if any(pattern.search(value) for pattern in patterns):
        return False
    if re.search(r"\b\d{6,}\b|\b[A-Z]{5}\d{4}[A-Z]\b", value):
        return False
    return not (
        author
        and author.casefold() not in {"anonymous", "a google user"}
        and len(author.strip()) > 2
        and author.casefold() in value.casefold()
    )


def build_report(reviews, days: int, platform: str) -> dict:
    groups = defaultdict(list)
    unique = set()
    for review in reviews:
        text = (review.text or "").strip()
        key = re.sub(r"\s+", " ", text).casefold()
        if not text or key in unique or not safe_text(text, review.author):
            continue
        if review.rating not in {1, 2, 3, 4, 5}:
            continue
        unique.add(key)
        index = next(
            i
            for i, (_, pattern, _) in enumerate(THEMES)
            if pattern is None or re.search(pattern, text, re.IGNORECASE)
        )
        groups[index].append(review)
    eligible = sum(map(len, groups.values()))
    if eligible < 3:
        raise ValueError(
            "At least three distinct, privacy-safe reviews are needed. "
            "Import more reviews or widen the time window."
        )
    ranked = sorted(groups, key=lambda i: (-len(groups[i]), i))
    top = ranked[:3]
    for index in ranked:
        # Prefer substantive evidence over short praise, then actionable low ratings.
        groups[index].sort(key=lambda r: (len(r.text.split()) < 8, r.rating > 3))
    themes = [
        {
            "label": THEMES[i][0],
            "count": len(groups[i]),
            "share": round(len(groups[i]) / eligible * 100, 1),
        }
        for i in top
    ]
    # Round-robin across ranked themes gives distinct, representative source quotes.
    selected = []
    for offset in range(eligible):
        for index in ranked:
            if offset < len(groups[index]):
                selected.append(groups[index][offset])
            if len(selected) == 3:
                break
        if len(selected) == 3:
            break
    quotes = []
    for review in selected:
        text = review.text.strip()
        words = list(re.finditer(r"\S+", text))
        snippet = text[: words[min(24, len(words)) - 1].end()]
        quotes.append({"text": snippet, "rating": review.rating})
    actions = []
    for i in range(3):
        index = top[i % len(top)]
        if any(review.rating <= 3 for review in groups[index]):
            actions.append(THEMES[index][2][i // len(top)])
        else:
            label = THEMES[index][0].lower()
            positive_actions = [
                f"Identify what users value in {label}; preserve it in the next release.",
                f"Validate the strongest positive {label} feedback with users before expanding it.",
                f"Track {label} satisfaction after release "
                "to check that valued experiences remain intact.",
            ]
            actions.append(positive_actions[i // len(top)])
    end = datetime.now(timezone(timedelta(hours=5, minutes=30))).date()
    start = end - timedelta(days=days)
    average = sum(r.rating for group in groups.values() for r in group) / eligible
    title = f"Groww Weekly Product Pulse — {end.isoformat()}"
    lines = [
        title,
        f"Review window: {start} to {end} ({days} days).",
        f"{eligible:,} eligible reviews · Average rating {average:.1f}/5.",
        "",
        "Top themes",
    ]
    lines += [
        f"{i}. {t['label']}: {t['count']:,} reviews ({t['share']}%)."
        for i, t in enumerate(themes, 1)
    ]
    lines += ["", "Anonymous user quotes"]
    lines += [f"“{q['text']}” ({q['rating']}/5)" for q in quotes]
    lines += ["", "Three action ideas"]
    lines += [f"{i}. {action}" for i, action in enumerate(actions, 1)]
    content = "\n".join(lines)
    if len(content.split()) > 250:
        raise ValueError("The report exceeds 250 words. Select a different review window.")
    return {
        "title": title,
        "content": content,
        "themes": themes,
        "quotes": quotes,
        "actions": actions,
        "word_count": len(content.split()),
        "review_count": eligible,
        "excluded_count": len(reviews) - eligible,
        "cluster_count": len(groups),
        "average_rating": round(average, 1),
        "days": days,
        "platform": platform,
        "period_start": str(start),
        "period_end": str(end),
        "method": "Keyword grouping of distinct, privacy-screened store reviews",
    }
