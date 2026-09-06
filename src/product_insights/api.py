from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Product Insights Copilot API")

# Setup CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "FastAPI is running"}

@app.get("/api/dashboard/stats")
def get_dashboard_stats():
    return {
        "total_reviews": 24648,
        "platform_ratio": {"ios": 74.7, "android": 25.3},
        "average_rating": 4.4,
        "nps_score": 74,
        "sentiment_split": {"positive": 76, "neutral": 14, "negative": 10},
        "pipeline_progress": {"categorized": 21890, "total": 24648, "percentage": 88.8}
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
