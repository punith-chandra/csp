from typing import Dict, Any, Union
import hashlib
from datetime import datetime
from app.rag.knowledge_retriever import retriever
from app.rag.food_db import is_definitely_non_food
from app.services.gemini_service import analyze_food_with_llm
from app.database.db import log_search

def build_official_advisory(data: Dict[str, Any]) -> str:
    """
    Generates a formal, official government & institutional advisory text
    in the style of FSSAI Gazettes, WHO Technical Guidelines, and Academic SOPs.
    """
    food_name = data.get("foodName", "Staple Commodity").upper()
    category = data.get("category", "General Food Commodity")
    adulterants = ", ".join(data.get("adulterants", ["Unspecified foreign matter"]))
    why = data.get("whyAdulterated", "Economic adulteration aimed at artificial weight enhancement.")
    health_risks = "\n".join([f"  • {r}" for r in data.get("healthRisks", ["General gastrointestinal toxicity"])])
    test_method = data.get("testMethod", "Visual & Physical Clarification Protocol")
    test_proc = data.get("testProcedure", "Standard physical dissolution in water.")
    observation = data.get("observation", "Uniform physical properties without unnatural separation.")
    safe_tips = "\n".join([f"  • {t}" for t in data.get("safeTips", ["Inspect FSSAI 14-digit license number and batch code."])])
    storage_tips = "\n".join([f"  • {t}" for t in data.get("storageTips", ["Store in hermetically sealed food-grade containers."])])
    sources_str = ", ".join([s.get("name", "") for s in data.get("sources", [])])
    
    hash_code = hashlib.md5(food_name.encode()).hexdigest()[:6].upper()
    ref_id = f"FSSAI-CSP-2026/SOP-{hash_code}"

    official_text = f"""================================================================================
OFFICIAL TECHNICAL ADVISORY & RAPID SCREENING PROTOCOL
COMMUNITY SERVICE PROJECT • SRI VASAVI ENGINEERING COLLEGE (AUTONOMOUS)
DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING • TANUKU, ANDHRA PRADESH
GUIDE: MR. SYED AKHEEL HASSAN GORI | REF ID: {ref_id}
================================================================================

DOCUMENT TITLE: STATUTORY FOOD SAFETY & ADULTERATION AWARENESS DOSSIER
TARGET COMMODITY: {food_name}
REGULATORY CLASSIFICATION: {category.upper()}
STANDARDS CONFORMITY: FSSAI DART MANUAL & CODEX ALIMENTARIUS GUIDELINES

--------------------------------------------------------------------------------
CLAUSE 1: REGULATORY IDENTITY & APPLICABILITY
--------------------------------------------------------------------------------
This technical directive establishes community awareness guidelines for the 
statutory identification, risk assessment, and non-destructive preliminary screening 
of {food_name} under provisions aligned with the Food Safety and Standards Act, 2006.

--------------------------------------------------------------------------------
CLAUSE 2: DOCUMENTED ADULTERATION MECHANISMS & COMMERCIAL MOTIVES
--------------------------------------------------------------------------------
Primary reported adulterants in commerce:
  • {adulterants}

Economic and forensic rationale:
  {why}

--------------------------------------------------------------------------------
CLAUSE 3: TOXICOLOGICAL PROFILE & PUBLIC HEALTH HAZARDS
--------------------------------------------------------------------------------
Exposure to substandard or adulterated {food_name} presents documented clinical risks:
{health_risks}

--------------------------------------------------------------------------------
CLAUSE 4: APPROVED HOUSEHOLD PRELIMINARY SCREENING PROTOCOL (SOP)
--------------------------------------------------------------------------------
Protocol Designation: {test_method}

Standard Operating Procedure (SOP):
{test_proc}

Prescribed Diagnostic Observation:
  {observation}

--------------------------------------------------------------------------------
CLAUSE 5: STATUTORY PURCHASING DIRECTIVES & COMPLIANCE CRITERIA
--------------------------------------------------------------------------------
Consumers are advised to mandate the following verifications prior to procurement:
{safe_tips}

--------------------------------------------------------------------------------
CLAUSE 6: PRESCRIBED PRESERVATION, STORAGE & HYGIENE DIRECTIVES
--------------------------------------------------------------------------------
Preservation conditions to prevent decomposition and secondary contamination:
{storage_tips}

--------------------------------------------------------------------------------
CLAUSE 7: STATUTORY REGULATORY DISCLAIMER & ACCREDITED LABORATORY REFERRAL
--------------------------------------------------------------------------------
STATUTORY DECLARATION: This household screening procedure constitutes a PRELIMINARY
AWARENESS INDICATION ONLY and does NOT provide scientific or legal certification of 
adulteration. In accordance with Section 38/47 of the Food Safety & Standards Act, 
conclusive scientific and prosecutorial verification strictly requires quantitative 
testing by a certified NABL / FSSAI Notified Laboratory.
Do not consume or handle suspicious chemical substances during testing.

Grievance Redressal: Consumers encountering suspected commercial adulteration are 
instructed to log official complaints via the National Consumer Helpline (1915) 
or the FSSAI Food Safety Voice Portal (Toll-Free: 1800-112-100).

--------------------------------------------------------------------------------
CLAUSE 8: GAZETTED REFERENCES & REGULATORY AUTHORITIES
--------------------------------------------------------------------------------
Primary Authority Citations: {sources_str}
Prepared by: CSE Project Team, Sri Vasavi Engineering College (Autonomous), Tanuku.
================================================================================"""
    return official_text

def analyze_food_item(food_input: str) -> Dict[str, Any]:
    """
    Main service function to analyze food item, reject non-food objects,
    and return structured food adulteration awareness data with official text.
    """
    clean_input = food_input.strip()

    # Step 1: Check for empty input
    if not clean_input:
        return {
            "isFood": False,
            "foodName": "",
            "message": "Please enter a food item.",
            "suggestion": "Try searching for Milk, Turmeric, Honey, Sugar, Ghee, or Edible Oil."
        }

    # Step 2: Non-food item fast check
    if is_definitely_non_food(clean_input):
        log_search(clean_input, is_food=False, category=None)
        ref_id = f"ADVISORY-REJ-NF-{hashlib.md5(clean_input.encode()).hexdigest()[:5].upper()}"
        official_non_food_text = f"""================================================================================
STATUTORY COMMODITY JURISDICTION DIRECTIVE
REF ID: {ref_id} | DATE: {datetime.now().strftime('%Y-%m-%d')}
================================================================================
NOTICE OF NON-FOOD STATUS: "{clean_input.title()}"

CLAUSE 1: STATUTORY AMBIT & JURISDICTION
Pursuant to Section 3(1)(j) of the Food Safety and Standards Act (2006), the 
queried article "{clean_input.title()}" is officially classified as a manufactured, 
mechanical, or inanimate non-ingestible object.

CLAUSE 2: NON-APPLICABILITY OF FOOD SAFETY EVALUATION
Food Safety AI and associated regulatory screening models have jurisdiction 
strictly over substances intended for human oral nutrition and consumption. 
Adulteration screening protocols cannot be administered on non-food articles.

CLAUSE 3: DIRECTIVE FOR COMMODITY RE-SUBMISSION
The user is instructed to re-submit valid edible agricultural staples or food 
commodities, such as: Milk, Rice, Turmeric, Honey, Sugar, Ghee, or Edible Oil.
================================================================================"""
        return {
            "isFood": False,
            "foodName": clean_input.title(),
            "message": f"'{clean_input.title()}' does not appear to be a food item.",
            "suggestion": "Please enter a food item such as: Milk, Rice, Turmeric, Honey, Sugar, or Edible Oil.",
            "officialAdvisoryText": official_non_food_text,
            "documentReference": ref_id
        }

    # Step 3: Search knowledge base via RAG retriever
    matched_data, is_food, confidence = retriever.search_food(clean_input)

    if not is_food:
        log_search(clean_input, is_food=False, category=None)
        ref_id = f"ADVISORY-REJ-NF-{hashlib.md5(clean_input.encode()).hexdigest()[:5].upper()}"
        return {
            "isFood": False,
            "foodName": clean_input.title(),
            "message": f"'{clean_input.title()}' does not appear to be a food item.",
            "suggestion": "Please enter a food item such as: Milk, Rice, Turmeric, Honey, Sugar, or Edible Oil.",
            "documentReference": ref_id
        }

    # If matched with high confidence from our curated FSSAI database
    if matched_data and confidence >= 0.7:
        log_search(matched_data["foodName"], is_food=True, category=matched_data.get("category"))
        official_text = build_official_advisory(matched_data)
        ref_id = f"FSSAI-CSP-2026/SOP-{hashlib.md5(matched_data['foodName'].encode()).hexdigest()[:6].upper()}"
        return {
            "isFood": True,
            "foodName": matched_data["foodName"],
            "category": matched_data.get("category", "General Food"),
            "adulterants": matched_data.get("adulterants", []),
            "whyAdulterated": matched_data.get("whyAdulterated", ""),
            "healthRisks": matched_data.get("healthRisks", []),
            "testMethod": matched_data.get("testMethod", ""),
            "testProcedure": matched_data.get("testProcedure", ""),
            "observation": matched_data.get("observation", ""),
            "safeTips": matched_data.get("safeTips", []),
            "storageTips": matched_data.get("storageTips", []),
            "sources": matched_data.get("sources", []),
            "disclaimer": "This is only a preliminary awareness check. Laboratory testing is required for confirmation. Do not consume or handle suspicious substances during testing.",
            "officialAdvisoryText": official_text,
            "documentReference": ref_id,
            "issuingAuthority": "Sri Vasavi Engineering College (A) • Department of CSE • FSSAI DART Aligned"
        }

    # Fallback to general staple or LLM analysis
    rag_context = f"Analyze food item: {clean_input} for adulteration awareness under FSSAI / Codex standards."
    llm_result = analyze_food_with_llm(clean_input, rag_context)

    if llm_result:
        if not llm_result.get("isFood", True):
            log_search(clean_input, is_food=False, category=None)
            return {
                "isFood": False,
                "foodName": clean_input.title(),
                "message": f"'{clean_input.title()}' does not appear to be a food item.",
                "suggestion": "Please enter a food item such as: Milk, Rice, Turmeric, Honey, Sugar, or Edible Oil."
            }
        log_search(llm_result.get("foodName", clean_input.title()), is_food=True, category="General Food")
        official_text = build_official_advisory(llm_result)
        llm_result["officialAdvisoryText"] = official_text
        llm_result["documentReference"] = f"FSSAI-CSP-2026/SOP-{hashlib.md5(clean_input.encode()).hexdigest()[:6].upper()}"
        return llm_result

    # Basic fallback
    fallback_data = {
        "isFood": True,
        "foodName": clean_input.title(),
        "category": "General Food Item",
        "adulterants": ["Extraneous matter / water dilution", "Substandard bulk fillers", "Non-permitted artificial colorants"],
        "whyAdulterated": f"Economic adulteration aimed at inflating physical mass and commercial margins of {clean_input.title()}.",
        "healthRisks": ["Acute gastrointestinal discomfort", "Metabolic disruption from non-permitted additives", "Microbial load risk"],
        "testMethod": "Preliminary Physical Inspection & Dissolution Clarity Check",
        "testProcedure": "1. Inspect olfactory and visual consistency.\n2. Dilute sample in clear drinking water and examine settling velocity and coloration.",
        "observation": "Standard unadulterated products manifest uniform dispersion; synthetic additives trigger immediate turbidity or sediment.",
        "safeTips": ["Mandate verified 14-digit FSSAI licensing and batch packaging codes.", "Reject unlabelled loose commodities sold without date stamps."],
        "storageTips": ["Store in airtight opaque containers shielded from humidity and thermal degradation."],
        "sources": [{"name": "FSSAI (Food Safety and Standards Authority of India)", "url": "https://www.fssai.gov.in"}]
    }
    fallback_data["officialAdvisoryText"] = build_official_advisory(fallback_data)
    fallback_data["documentReference"] = f"FSSAI-CSP-2026/SOP-{hashlib.md5(clean_input.encode()).hexdigest()[:6].upper()}"
    return fallback_data
