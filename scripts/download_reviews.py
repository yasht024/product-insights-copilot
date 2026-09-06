import csv
import json
import os
import sys
import time
import urllib.request
from datetime import datetime, timedelta
from typing import Any, Dict, List

try:
    from google_play_scraper import Sort, reviews
except ImportError:
    print("Please install google-play-scraper: pip install google-play-scraper")
    sys.exit(1)

try:
    from langdetect import detect, DetectorFactory
    DetectorFactory.seed = 0
except ImportError:
    print("Please install langdetect: pip install langdetect")
    sys.exit(1)

# Config
GP_PACKAGE = "com.nextbillion.groww"
IOS_APP_ID = "1404871703"
OUTPUT_DIR = "var/imports"
LOOKBACK_WEEKS = 10

def get_cutoff_date() -> datetime:
    return datetime.now() - timedelta(weeks=LOOKBACK_WEEKS)

def download_google_play_reviews() -> None:
    print(f"Downloading Google Play reviews for {GP_PACKAGE} (last {LOOKBACK_WEEKS} weeks)...")
    cutoff = get_cutoff_date()
    
    # We fetch a larger chunk and then filter
    result, continuation_token = reviews(
        GP_PACKAGE,
        lang='en',
        country='in',
        sort=Sort.NEWEST,
        count=5000 
    )
    
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    out_path = os.path.join(OUTPUT_DIR, "google_play_reviews.csv")
    
    saved_count = 0
    with open(out_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["product_id", "review_id", "rating", "title", "text", "review_date", "language", "reviewer_name", "is_public"])
        
        for r in result:
            review_date = r.get("at", datetime.now())
            if review_date < cutoff:
                # Since it's sorted by NEWEST, we can stop early if we want, but filtering is safe
                break
                
            text = r.get("content", "").replace("\n", " ")
            if len(text.split()) < 8:
                continue
                
            try:
                if detect(text) != 'en':
                    continue
            except Exception:
                continue
                
            writer.writerow([
                GP_PACKAGE,
                r.get("reviewId"),
                r.get("score"),
                "", 
                text,
                review_date.strftime("%Y-%m-%d"),
                "en",
                r.get("userName"),
                "true"
            ])
            saved_count += 1
            
    print(f"Saved {saved_count} Google Play reviews to {out_path}")

def download_app_store_reviews() -> None:
    print(f"Downloading App Store reviews for {IOS_APP_ID} (last {LOOKBACK_WEEKS} weeks)...")
    cutoff = get_cutoff_date()
    out_data = []
    
    # Apple iTunes RSS feed allows up to 10 pages
    for page in range(1, 11):
        url = f"https://itunes.apple.com/in/rss/customerreviews/page={page}/id={IOS_APP_ID}/sortBy=mostRecent/json"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        try:
            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read().decode())
        except Exception as e:
            print(f"Failed to fetch App Store reviews page {page}: {e}")
            break

        entries = data.get("feed", {}).get("entry", [])
        if not entries:
            continue
            
        # First entry on page 1 is usually metadata about the app
        if page == 1 and not entries[0].get("author", {}).get("name"):
            entries = entries[1:]
            
        stop_fetching = False
        for entry in entries:
            try:
                review_date_str = entry.get("updated", {}).get("label")
                if not review_date_str:
                    continue
                    
                # Format: 2024-03-12T10:24:00-07:00
                # We'll just parse the first 19 chars to avoid timezone issues for simple cutoff
                review_date = datetime.strptime(review_date_str[:19], "%Y-%m-%dT%H:%M:%S")
                
                if review_date < cutoff:
                    stop_fetching = True
                    break

                review_id = entry.get("id", {}).get("label")
                rating = int(entry.get("im:rating", {}).get("label", 0))
                title = entry.get("title", {}).get("label")
                text = entry.get("content", {}).get("label", "")
                
                if len(text.split()) < 8:
                    continue
                    
                try:
                    if detect(text) != 'en':
                        continue
                except Exception:
                    continue
                    
                reviewer_name = entry.get("author", {}).get("name", {}).get("label")
                
                out_data.append({
                    "app_id": IOS_APP_ID,
                    "review_id": review_id,
                    "rating": rating,
                    "title": title,
                    "text": text,
                    "review_date": review_date_str,
                    "language": "en",
                    "reviewer_name": reviewer_name,
                    "is_public": True
                })
            except Exception as e:
                pass # Skip malformed
                
        if stop_fetching:
            break
            
        time.sleep(1) # Be nice to the API

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    out_path = os.path.join(OUTPUT_DIR, "app_store_reviews.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(out_data, f, indent=2, ensure_ascii=False)
        
    print(f"Saved {len(out_data)} App Store reviews to {out_path}")

def main():
    download_google_play_reviews()
    download_app_store_reviews()
    print("Download complete.")

if __name__ == "__main__":
    main()
