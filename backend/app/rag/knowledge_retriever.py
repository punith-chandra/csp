import difflib
from typing import Optional, Dict, Any, Tuple
from app.rag.food_db import FOOD_KNOWLEDGE_BASE, is_definitely_non_food, get_food_by_name

class KnowledgeRetriever:
    """
    RAG Knowledge Retriever for Food Adulteration Information.
    Indexes verified food safety sources from FSSAI, WHO, FAO, and CSIR-CFTRI.
    """

    def __init__(self):
        self.kb = FOOD_KNOWLEDGE_BASE

    def search_food(self, query: str) -> Tuple[Optional[Dict[str, Any]], bool, float]:
        """
        Returns (food_record, is_food_item, confidence_score)
        """
        clean_query = query.strip().lower()

        # Step 1: Reject known non-food items
        if is_definitely_non_food(clean_query):
            return None, False, 1.0

        # Step 2: Exact or alias lookup
        match = get_food_by_name(clean_query)
        if match:
            return match, True, 1.0

        # Step 3: Substring search in food names and aliases
        for key, record in self.kb.items():
            if key in clean_query or clean_query in key:
                return record, True, 0.9
            for alias in record.get("aliases", []):
                if alias in clean_query or clean_query in alias:
                    return record, True, 0.85

        # Step 4: Fuzzy matching with food keys
        all_keys = list(self.kb.keys())
        close_matches = difflib.get_close_matches(clean_query, all_keys, n=1, cutoff=0.6)
        if close_matches:
            matched_key = close_matches[0]
            return self.kb[matched_key], True, 0.75

        # Step 5: Fuzzy matching with aliases
        all_aliases = []
        alias_to_key = {}
        for key, record in self.kb.items():
            for al in record.get("aliases", []):
                all_aliases.append(al)
                alias_to_key[al] = key

        close_alias = difflib.get_close_matches(clean_query, all_aliases, n=1, cutoff=0.65)
        if close_alias:
            matched_key = alias_to_key[close_alias[0]]
            return self.kb[matched_key], True, 0.7

        return None, True, 0.0

    def get_all_foods(self):
        """Returns all registered foods in the knowledge base."""
        return list(self.kb.values())

    def get_food_context_for_rag(self, food_data: Dict[str, Any]) -> str:
        """Formats food item knowledge into a structured document context for LLM retrieval."""
        adulterants_str = ", ".join(food_data.get("adulterants", []))
        risks_str = "; ".join(food_data.get("healthRisks", []))
        safe_str = "; ".join(food_data.get("safeTips", []))
        sources_str = ", ".join([s["name"] for s in food_data.get("sources", [])])

        return f"""
Food Item: {food_data.get('foodName')}
Category: {food_data.get('category')}
Adulterants: {adulterants_str}
Why Adulteration Occurs: {food_data.get('whyAdulterated')}
Health Concerns: {risks_str}
Preliminary Awareness Test Method: {food_data.get('testMethod')}
Procedure: {food_data.get('testProcedure', '')}
Expected Observation: {food_data.get('observation')}
Safe Purchasing Tips: {safe_str}
Trusted Authorities / Sources: {sources_str}
Disclaimer: Preliminary awareness check only. Laboratory testing is required for scientific confirmation.
"""

retriever = KnowledgeRetriever()
