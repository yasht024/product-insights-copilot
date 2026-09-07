import sqlite3
from contextlib import contextmanager
from pathlib import Path
from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Product Insights Copilot API")

# Setup CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "https://product-insights-copilot-one.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = Path(__file__).parent.parent.parent / "var" / "product_insights.sqlite3"

def get_db_conn():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "FastAPI is running with real SQLite DB connection."}

@app.get("/api/dashboard/stats")
def get_dashboard_stats(conn: sqlite3.Connection = Depends(get_db_conn)):
    total_reviews = conn.execute("SELECT count(*) as c FROM raw_reviews").fetchone()["c"]
    avg_rating = conn.execute("SELECT avg(rating) as a FROM raw_reviews").fetchone()["a"]
    
    # Calculate platform ratio
    android_count = conn.execute("SELECT count(*) as c FROM raw_reviews WHERE source_store = 'google_play'").fetchone()["c"]
    ios_count = conn.execute("SELECT count(*) as c FROM raw_reviews WHERE source_store = 'apple_app_store'").fetchone()["c"]
    
    android_pct = round((android_count / max(total_reviews, 1)) * 100, 1)
    ios_pct = round((ios_count / max(total_reviews, 1)) * 100, 1)
    
    # Calculate NPS (Promoters = 5 stars, Passives = 4 stars, Detractors = 1-3 stars)
    promoters = conn.execute("SELECT count(*) as c FROM raw_reviews WHERE rating = 5").fetchone()["c"]
    detractors = conn.execute("SELECT count(*) as c FROM raw_reviews WHERE rating <= 3").fetchone()["c"]
    nps_score = round(((promoters - detractors) / max(total_reviews, 1)) * 100) if total_reviews > 0 else 0
    
    return {
        "total_reviews": total_reviews,
        "platform_ratio": {"ios": ios_pct, "android": android_pct},
        "average_rating": round(avg_rating or 0, 1),
        "nps_score": nps_score,
        "sentiment_split": {"positive": 76, "neutral": 14, "negative": 10}, # Mocked until AI pipeline writes sentiment
        "pipeline_progress": {"categorized": total_reviews, "total": total_reviews, "percentage": 100.0}
    }

@app.get("/api/reviews")
def get_reviews(
    conn: sqlite3.Connection = Depends(get_db_conn),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100)
):
    offset = (page - 1) * page_size
    query = """
        SELECT r.review_id, r.source_store, r.rating, r.title, r.review_text, r.source_datetime,
               s.sanitized_title, s.sanitized_text, s.privacy_status
        FROM raw_reviews r
        LEFT JOIN sanitized_reviews s ON r.review_id = s.review_id
        ORDER BY r.source_datetime DESC
        LIMIT ? OFFSET ?
    """
    rows = conn.execute(query, (page_size, offset)).fetchall()
    total = conn.execute("SELECT count(*) as c FROM raw_reviews").fetchone()["c"]
    
    reviews = []
    for row in rows:
        reviews.append({
            "id": row["review_id"],
            "platform": row["source_store"],
            "rating": row["rating"],
            "title": row["sanitized_title"] or row["title"],
            "text": row["sanitized_text"] or row["review_text"],
            "date": row["source_datetime"],
            "privacy_status": row["privacy_status"],
            "sentiment": "neutral", # Mocked
            "category": "Feedback" # Mocked
        })
        
    return {
        "items": reviews,
        "total": total,
        "page": page,
        "page_size": page_size,
        "pages": (total + page_size - 1) // page_size
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
