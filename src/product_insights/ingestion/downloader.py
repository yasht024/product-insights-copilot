"""Automated download of reviews from public app stores."""

import csv
import json
from datetime import datetime, timezone, timedelta
from pathlib import Path
import logging

from google_play_scraper import Sort, reviews
from app_store_scraper import AppStore

logger = logging.getLogger(__name__)

def download_google_play_reviews(package_name: str, dest_csv: Path, lookback_weeks: int) -> None:
    """Download Google Play reviews and save as CSV."""
    logger.info(f"Downloading Google Play reviews for {package_name}")
    dest_csv.parent.mkdir(parents=True, exist_ok=True)
    
    # Simple fetch. google_play_scraper fetches a batch.
    # In a real scenario we'd paginate, but for MVP we fetch a reasonable count.
    result, _ = reviews(
        package_name,
        lang='en', 
        country='in', 
        sort=Sort.NEWEST, 
        count=500 
    )
    
    headers = ["review_id", "rating", "title", "text", "review_date", "is_public", "language", "product_id"]
    
    with open(dest_csv, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=headers)
        writer.writeheader()
        for review in result:
            writer.writerow({
                "review_id": review.get("reviewId", ""),
                "rating": review.get("score", ""),
                "title": "", # Google play often doesn't have a separate title in this scraper
                "text": review.get("content", ""),
                "review_date": review.get("at", datetime.now()).isoformat(),
                "is_public": "true",
                "language": "en",
                "product_id": package_name
            })
    logger.info(f"Saved {len(result)} Google Play reviews to {dest_csv}")


def download_app_store_reviews(app_id: str, app_name: str, dest_json: Path, lookback_weeks: int) -> None:
    """Download App Store reviews and save as JSON."""
    logger.info(f"Downloading App Store reviews for {app_name} ({app_id})")
    dest_json.parent.mkdir(parents=True, exist_ok=True)
    
    store = AppStore(country="in", app_name=app_name, app_id=int(app_id))
    # Fetch reviews
    store.review(how_many=500)
    
    # app_store_scraper puts them in store.reviews
    result = store.reviews
    
    # Format according to expected format by AppStoreExportSource
    # The source expects standard json list of dicts.
    output = []
    for review in result:
        output.append({
            "id": review.get("id"),
            "rating": review.get("rating"),
            "title": review.get("title", ""),
            "review": review.get("review", ""),
            "date": review.get("date", datetime.now()).isoformat(),
            "app_id": app_id
        })
        
    with open(dest_json, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
        
    logger.info(f"Saved {len(result)} App Store reviews to {dest_json}")
