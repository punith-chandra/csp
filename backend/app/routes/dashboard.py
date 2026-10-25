from fastapi import APIRouter
from app.database.db import get_survey_statistics

router = APIRouter(prefix="/api", tags=["Dashboard"])

@router.get("/dashboard-stats")
def get_dashboard_metrics():
    """
    Returns authentic Community Service Project statistics:
    Survey findings from Tanuku & surrounding areas, search analytics from SQLite.
    """
    db_stats = get_survey_statistics()

    survey_findings = [
        {
            "title": "Awareness Level",
            "stat": "65%",
            "description": "Participants were aware of food adulteration and its general adverse effects."
        },
        {
            "title": "Need for Awareness",
            "stat": "35%",
            "description": "Participants needed structured awareness regarding detection, certifications, and consumer rights."
        },
        {
            "title": "Identification Methods",
            "stat": "48%",
            "description": "Participants were initially unfamiliar with simple preliminary home test methods."
        },
        {
            "title": "Certification Knowledge",
            "stat": "42%",
            "description": "Participants were unaware of the specific meanings of AGMARK and FSSAI standards."
        }
    ]

    category_distribution = [
        {"name": "Dairy Products", "count": 28, "icon": "🥛"},
        {"name": "Spices & Condiments", "count": 34, "icon": "🌶️"},
        {"name": "Edible Oils & Fats", "count": 18, "icon": "🛢️"},
        {"name": "Sweeteners & Syrups", "count": 16, "icon": "🍯"},
        {"name": "Grains & Pulses", "count": 14, "icon": "🌾"},
        {"name": "Beverages", "count": 12, "icon": "☕"}
    ]

    return {
        "projectTitle": "FROM FARM TO FORK",
        "projectSubtitle": "Food Adulteration Awareness",
        "institution": "Sri Vasavi Engineering College (Autonomous)",
        "department": "Department of Computer Science and Engineering",
        "guide": "Mr. Syed Akheel Hassan Gori",
        "location": "Tanuku and surrounding urban areas, West Godavari District, Andhra Pradesh",
        "teamSize": 7,
        "surveySummary": {
            "awarePercentage": 65,
            "unawarePercentage": 35,
            "totalSurveyed": 250,
            "vendorsEngaged": 42,
            "pamphletsDistributed": 500,
            "demosConducted": 12
        },
        "findings": survey_findings,
        "categoryDistribution": category_distribution,
        "dbStats": db_stats,
        "labelNotice": "Project Survey Finding: Statistics reflect empirical survey data collected during the Community Service Project in Tanuku."
    }
