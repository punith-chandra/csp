import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from dotenv import load_dotenv

from app.database.db import init_db
from app.routes.food_analysis import router as food_router
from app.routes.dashboard import router as dashboard_router
from app.routes.feedback import router as feedback_router

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize SQLite database
    init_db()
    print(">>> SQLite database initialized successfully at farm_to_fork.db")
    yield
    # Shutdown logic if any
    print(">>> Server shutting down gracefully.")

app = FastAPI(
    title="AI-Powered Food Safety and Purity Analysis API",
    description="Community Service Project API by Sri Vasavi Engineering College (Autonomous), Tanuku. Department of CSE.",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register route modules
app.include_router(food_router)
app.include_router(dashboard_router)
app.include_router(feedback_router)

@app.get("/")
def root():
    return {
        "project": "AI-Powered Food Safety and Purity Analysis",
        "institution": "Sri Vasavi Engineering College (Autonomous)",
        "department": "Department of Computer Science and Engineering",
        "guide": "Mr. Syed Akheel Hassan Gori",
        "status": "online",
        "endpoints": {
            "analyze_food": "POST /api/analyze-food",
            "chat": "POST /api/chat",
            "foods": "GET /api/foods",
            "dashboard_stats": "GET /api/dashboard-stats",
            "recent_searches": "GET /api/searches",
            "feedback": "POST /api/feedback"
        }
    }

@app.get("/health")
def healthcheck():
    return {"status": "healthy", "service": "Food Safety AI Backend"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
