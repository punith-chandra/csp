import os
import json
import logging
from typing import Optional, Dict, Any, List
import httpx
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

GEMINI_API_KEY = os.getenv("GOOGLE_API_KEY", "").strip()

SYSTEM_PROMPT = """
You are 'Food Safety AI', an intelligent, trustworthy Food Adulteration Awareness Assistant developed for the Community Service Project 'FROM FARM TO FORK' by students of Sri Vasavi Engineering College (Autonomous), Tanuku.

CRITICAL RULES & SAFETY GUIDELINES:
1. Do NOT claim that a simple home test scientifically proves adulteration.
2. Always use cautious wording:
   - "Preliminary awareness check"
   - "Possible indication"
   - "Laboratory testing is required for confirmation."
3. Strictly avoid dangerous chemical experiments or unsafe handling procedures.
4. If the user input is NOT a food item (e.g. laptop, chair, car, phone), explicitly state that it is not a food item.
5. Base food safety answers on trusted authorities: FSSAI (Food Safety and Standards Authority of India), WHO, FAO, CSIR-CFTRI, and AGMARK.
6. Tone must be professional, objective, encouraging, and educational.
"""

def generate_with_gemini_raw(prompt: str) -> Optional[str]:
    """Calls Gemini REST API via httpx using GOOGLE_API_KEY if configured."""
    api_key = os.getenv("GOOGLE_API_KEY", "").strip()
    if not api_key or api_key == "your_api_key_here":
        return None

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ],
        "generationConfig": {
            "temperature": 0.2,
            "maxOutputTokens": 1024
        }
    }

    try:
        with httpx.Client(timeout=10.0) as client:
            response = client.post(url, json=payload)
            if response.status_code == 200:
                data = response.json()
                candidates = data.get("candidates", [])
                if candidates:
                    parts = candidates[0].get("content", {}).get("parts", [])
                    if parts:
                        return parts[0].get("text", "")
            else:
                logger.warning(f"Gemini API returned status {response.status_code}: {response.text}")
    except Exception as e:
        logger.error(f"Error calling Gemini API: {e}")

    return None

def analyze_food_with_llm(food_name: str, rag_context: str) -> Optional[Dict[str, Any]]:
    """
    Uses Gemini to synthesize structured food safety response based on RAG context.
    Returns JSON if successful, or None to fall back to direct RAG template.
    """
    prompt = f"""{SYSTEM_PROMPT}

You are analyzing the food item: '{food_name}'.
Trusted knowledge context retrieved from FSSAI & Codex standards:
{rag_context}

Return a valid JSON object matching this structure EXACTLY:
{{
    "isFood": true,
    "foodName": "{food_name.title()}",
    "adulterants": ["Adulterant 1", "Adulterant 2"],
    "whyAdulterated": "Brief explanation why adulteration occurs for this item",
    "healthRisks": ["Health risk 1", "Health risk 2"],
    "testMethod": "Name of simple preliminary awareness check",
    "testProcedure": "1-2 lines simple procedure",
    "observation": "Expected preliminary observation",
    "safeTips": ["Safe buying tip 1", "Safe buying tip 2"],
    "storageTips": ["Storage tip 1", "Storage tip 2"],
    "sources": [
        {{"name": "FSSAI DART Manual", "url": "https://www.fssai.gov.in/dart/"}},
        {{"name": "WHO Food Safety", "url": "https://www.who.int/news-room/fact-sheets/detail/food-safety"}}
    ]
}}

If '{food_name}' is clearly NOT a food item (e.g., electronic gadget, furniture, vehicle):
Return:
{{
    "isFood": false,
    "foodName": "{food_name}",
    "message": "This is not a food item.",
    "suggestion": "Please enter a food item such as: Milk, Rice, Turmeric, Honey, Sugar or Edible Oil."
}}

Output ONLY the raw JSON object. Do not enclose in markdown ticks if possible.
"""
    raw_response = generate_with_gemini_raw(prompt)
    if not raw_response:
        return None

    try:
        clean_text = raw_response.strip()
        if clean_text.startswith("```json"):
            clean_text = clean_text[7:]
        if clean_text.startswith("```"):
            clean_text = clean_text[3:]
        if clean_text.endswith("```"):
            clean_text = clean_text[:-3]
        return json.loads(clean_text.strip())
    except Exception as e:
        logger.error(f"Failed to parse Gemini JSON: {e}")
        return None

def chat_with_food_safety_ai(user_message: str, food_context: Optional[str] = None, history: Optional[List[Dict[str, str]]] = None) -> str:
    """
    Multi-turn conversation helper for the Food Safety AI Assistant.
    """
    context_instruction = ""
    if food_context:
        context_instruction = f"Current food being discussed: {food_context}\n"

    history_str = ""
    if history:
        for item in history[-5:]: # Keep last 5 turns
            history_str += f"{item.get('role', 'user').title()}: {item.get('content', '')}\n"

    prompt = f"""{SYSTEM_PROMPT}

{context_instruction}
Recent conversation history:
{history_str}

User inquiry: "{user_message}"

Respond to the user as Food Safety AI. Maintain an empowering, informative tone.
Remember:
- Use phrases like "Preliminary awareness check", "Possible indication", "Laboratory testing is required for confirmation".
- Do not recommend unsafe chemistry.
- Provide practical, realistic consumer guidance.
"""
    raw = generate_with_gemini_raw(prompt)
    if raw:
        return raw.strip()

    # Fallback response engine if offline / without API key
    lower_msg = user_message.lower()
    if "health" in lower_msg or "risk" in lower_msg or "danger" in lower_msg:
        return "Adulterated foods can carry various health risks depending on the contaminant. Common adulterants like industrial dyes (such as Metanil Yellow) or detergents can cause digestive distress, kidney load, and toxic exposure over time. For accurate consumer safety, purchase AGMARK or FSSAI-certified sealed foods, and note that household checks are only preliminary indicators—official lab testing is needed for confirmation."
    elif "test" in lower_msg or "check" in lower_msg or "how to" in lower_msg:
        return "Household awareness checks—such as the iodine starch test for milk, the water settling test for spices, or the water dispersion test for honey—provide quick preliminary indications. However, please remember that home tests do not scientifically prove adulteration; laboratory testing under FSSAI protocols is mandatory for scientific confirmation."
    elif "buy" in lower_msg or "purchase" in lower_msg or "store" in lower_msg or "tips" in lower_msg:
        return "When shopping, always check for intact tamper-proof seals, clear FSSAI license numbers, AGMARK certification where applicable, manufacturing/expiry dates, and batch codes. Avoid purchasing unbranded loose powders or oils sold in open unhygienic conditions."
    else:
        return f"Food Safety AI is here to help! Regarding '{user_message}', our awareness project encourages checking certifications (FSSAI, AGMARK), observing preliminary quality indicators, and reporting suspected widespread adulteration to local food safety authorities."
