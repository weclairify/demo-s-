from datetime import datetime, timedelta
from typing import Optional
import httpx
from backend.config import get_settings

settings = get_settings()

# Sector → search queries for NewsAPI
SECTOR_QUERIES: dict[str, str] = {
    "retail":      "AI retail e-commerce shopping",
    "telecom":     "AI telecom telecommunications 5G",
    "marketing":   "AI marketing advertising digital",
    "finance":     "AI finance fintech banking",
    "healthcare":  "AI healthcare medical clinical",
    "logistics":   "AI logistics supply chain shipping",
    "hr":          "AI HR human resources recruitment",
    "legal":       "AI legal law compliance",
    "education":   "AI education edtech learning",
    "general":     "artificial intelligence technology",
}


async def fetch_news(sector: str, page_size: int = 10) -> list[dict]:
    """
    Fetch recent AI news articles for a given sector using NewsAPI.
    Returns a list of article dicts with keys: title, description, url, source, publishedAt.
    """
    query = SECTOR_QUERIES.get(sector, SECTOR_QUERIES["general"])
    from_date = (datetime.utcnow() - timedelta(days=1)).strftime("%Y-%m-%d")

    params = {
        "q": query,
        "language": "en",
        "sortBy": "relevancy",
        "pageSize": page_size,
        "from": from_date,
        "apiKey": settings.news_api_key,
    }

    async with httpx.AsyncClient(timeout=20.0) as client:
        response = await client.get("https://newsapi.org/v2/everything", params=params)
        response.raise_for_status()
        data = response.json()

    articles = []
    for art in data.get("articles", []):
        # Skip articles with missing content
        if not art.get("title") or art["title"] == "[Removed]":
            continue
        articles.append(
            {
                "title": art["title"],
                "description": art.get("description") or "",
                "url": art["url"],
                "source": art.get("source", {}).get("name", "Unknown"),
                "published_at": art.get("publishedAt", ""),
            }
        )
    return articles
