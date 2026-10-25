from fastapi import APIRouter
from app.models.schemas import FeedbackCreateRequest, FeedbackResponse
from app.database.db import add_feedback, get_feedbacks

router = APIRouter(prefix="/api", tags=["Feedback"])

@router.post("/feedback", response_model=FeedbackResponse)
def submit_feedback(payload: FeedbackCreateRequest):
    add_feedback(
        name=payload.name,
        location=payload.location,
        rating=payload.rating,
        comments=payload.comments
    )
    return FeedbackResponse(
        status="success",
        message="Thank you! Your feedback has been recorded for the Community Service Project."
    )

@router.get("/feedback")
def fetch_feedbacks():
    return get_feedbacks(limit=20)
