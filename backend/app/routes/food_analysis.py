from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional, Dict, Any, Union
from app.models.schemas import (
    FoodAnalyzeRequest,
    FoodAnalyzeSuccessResponse,
    NonFoodResponse,
    ChatRequest,
    ChatResponse
)
from app.services.food_service import analyze_food_item
from app.services.gemini_service import chat_with_food_safety_ai
from app.rag.knowledge_retriever import retriever
from app.database.db import get_recent_searches, clear_search_history

router = APIRouter(prefix="/api", tags=["Food Analysis"])

@router.post("/analyze-food", response_model=Union[FoodAnalyzeSuccessResponse, NonFoodResponse])
def analyze_food(request: FoodAnalyzeRequest):
    """
    Main Food Adulteration Analysis endpoint.
    Accepts food name (e.g., 'milk', 'turmeric') or non-food (e.g., 'laptop').
    Returns structured food adulteration awareness data or non-food rejection notice.
    """
    result = analyze_food_item(request.food)
    return result

@router.post("/chat", response_model=ChatResponse)
def chat_with_ai(request: ChatRequest):
    """
    Multi-turn conversational assistant endpoint for Food Safety AI.
    """
    history_dicts = [{"role": msg.role, "content": msg.content} for msg in (request.history or [])]
    reply_text = chat_with_food_safety_ai(
        user_message=request.message,
        food_context=request.foodContext,
        history=history_dicts
    )

    suggested_followups = [
        "What are the health risks?",
        "How can I buy safer versions?",
        "What should I check on the packaging?",
        "Is there a simple home check method?"
    ]

    return ChatResponse(
        reply=reply_text,
        isFoodRelated=True,
        suggestedFollowUps=suggested_followups,
        sources=[
            {"name": "FSSAI DART Portal", "url": "https://www.fssai.gov.in/dart/"},
            {"name": "WHO Food Safety Guidelines", "url": "https://www.who.int/news-room/fact-sheets/detail/food-safety"}
        ]
    )

@router.get("/foods")
def list_all_foods():
    """Returns curated food database list for category explorer."""
    return retriever.get_all_foods()

@router.get("/foods/{name}")
def get_single_food(name: str):
    """Returns single food item details."""
    matched_data, is_food, confidence = retriever.search_food(name)
    if matched_data and is_food:
        return matched_data
    raise HTTPException(status_code=404, detail="Food item not found in knowledge base.")

@router.get("/searches")
def get_searches(limit: int = Query(default=10, ge=1, le=50)):
    """Returns recent food searches from SQLite database."""
    return get_recent_searches(limit)

@router.delete("/searches/{search_id}")
def delete_search_item(search_id: int):
    """Deletes a specific search history entry from SQLite."""
    clear_search_history(search_id)
    return {"status": "success", "message": f"Search item {search_id} removed."}

@router.delete("/searches")
def clear_all_searches():
    """Clears all search history from SQLite."""
    clear_search_history()
    return {"status": "success", "message": "Search history cleared."}
