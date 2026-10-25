import sqlite3
import os
from datetime import datetime
from typing import List, Dict, Any, Optional

DB_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "farm_to_fork.db")

def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    # Table for user search history
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS search_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        food_name TEXT NOT NULL,
        is_food INTEGER NOT NULL,
        category TEXT,
        query_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # Table for community feedback and citizen responses
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS community_feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        location TEXT,
        rating INTEGER DEFAULT 5,
        comments TEXT NOT NULL,
        submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # Table for community survey metrics
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS survey_metrics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        metric_key TEXT UNIQUE,
        metric_value TEXT,
        description TEXT
    );
    """)

    # Seed initial project survey data if empty
    cursor.execute("SELECT COUNT(*) FROM survey_metrics;")
    if cursor.fetchone()[0] == 0:
        initial_metrics = [
            ("total_survey_participants", "250", "Total participants surveyed in Tanuku and nearby areas"),
            ("aware_percentage", "65", "Participants aware of food adulteration and general effects"),
            ("unaware_percentage", "35", "Participants needing additional adulteration awareness"),
            ("vendors_interacted", "42", "Local shopkeepers and grocery vendors engaged"),
            ("pamphlets_distributed", "500", "Educational awareness pamphlets distributed"),
            ("demonstrations_conducted", "12", "Simple awareness tests demonstrated to citizens")
        ]
        cursor.executemany(
            "INSERT INTO survey_metrics (metric_key, metric_value, description) VALUES (?, ?, ?);",
            initial_metrics
        )

    # Seed sample initial search history if empty
    cursor.execute("SELECT COUNT(*) FROM search_history;")
    if cursor.fetchone()[0] == 0:
        sample_searches = [
            ("Milk", 1, "Dairy Products"),
            ("Turmeric", 1, "Spices"),
            ("Honey", 1, "Sweeteners"),
            ("Edible Oil", 1, "Edible Oils"),
            ("Ghee", 1, "Dairy Products"),
            ("Chilli Powder", 1, "Spices"),
            ("Rice", 1, "Grains"),
            ("Tea", 1, "Beverages")
        ]
        cursor.executemany(
            "INSERT INTO search_history (food_name, is_food, category) VALUES (?, ?, ?);",
            sample_searches
        )

    conn.commit()
    conn.close()

def log_search(food_name: str, is_food: bool, category: Optional[str] = None):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO search_history (food_name, is_food, category) VALUES (?, ?, ?);",
        (food_name.strip().title(), 1 if is_food else 0, category)
    )
    conn.commit()
    conn.close()

def get_recent_searches(limit: int = 10) -> List[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT id, food_name, is_food, category, query_timestamp FROM search_history ORDER BY id DESC LIMIT ?",
        (limit,)
    )
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def clear_search_history(search_id: Optional[int] = None):
    conn = get_connection()
    cursor = conn.cursor()
    if search_id:
        cursor.execute("DELETE FROM search_history WHERE id = ?", (search_id,))
    else:
        cursor.execute("DELETE FROM search_history;")
    conn.commit()
    conn.close()

def add_feedback(name: str, location: str, rating: int, comments: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO community_feedback (name, location, rating, comments) VALUES (?, ?, ?, ?);",
        (name.strip(), location.strip(), rating, comments.strip())
    )
    conn.commit()
    conn.close()

def get_feedbacks(limit: int = 10) -> List[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT id, name, location, rating, comments, submitted_at FROM community_feedback ORDER BY id DESC LIMIT ?",
        (limit,)
    )
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def get_survey_statistics() -> Dict[str, Any]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT metric_key, metric_value FROM survey_metrics;")
    metrics = {row["metric_key"]: row["metric_value"] for row in cursor.fetchall()}

    cursor.execute("SELECT COUNT(*) FROM search_history;")
    total_searches = cursor.fetchone()[0]

    cursor.execute("SELECT category, COUNT(*) as count FROM search_history WHERE is_food = 1 AND category IS NOT NULL GROUP BY category ORDER BY count DESC;")
    category_counts = [dict(row) for row in cursor.fetchall()]

    cursor.execute("SELECT food_name, COUNT(*) as count FROM search_history WHERE is_food = 1 GROUP BY food_name ORDER BY count DESC LIMIT 5;")
    top_searched = [dict(row) for row in cursor.fetchall()]

    conn.close()
    return {
        "metrics": metrics,
        "total_searches": total_searches,
        "category_counts": category_counts,
        "top_searched": top_searched
    }
