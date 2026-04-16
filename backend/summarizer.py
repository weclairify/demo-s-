import anthropic
from backend.config import get_settings

settings = get_settings()

SECTOR_LABELS = {
    "retail": "Retail & E-commerce",
    "telecom": "Telecom & 5G",
    "marketing": "Marketing & Advertising",
    "finance": "Finance & Fintech",
    "healthcare": "Healthcare & MedTech",
    "logistics": "Logistics & Supply Chain",
    "hr": "HR & Recruitment",
    "legal": "Legal & Compliance",
    "education": "Education & EdTech",
    "general": "Technology & AI",
}


def _build_articles_text(articles: list[dict]) -> str:
    lines = []
    for i, art in enumerate(articles, 1):
        lines.append(
            f"{i}. [{art['source']}] {art['title']}\n"
            f"   {art['description']}\n"
            f"   URL: {art['url']}"
        )
    return "\n\n".join(lines)


async def summarize_digest(sector: str, articles: list[dict]) -> str:
    """
    Use Claude to produce a professional, sector-specific AI news digest.
    Returns HTML-formatted summary string.
    """
    if not articles:
        return "<p>No relevant AI news found for today. Check back tomorrow!</p>"

    sector_label = SECTOR_LABELS.get(sector, "Technology & AI")
    articles_text = _build_articles_text(articles)

    client = anthropic.AsyncAnthropic(api_key=settings.anthropic_api_key)

    prompt = f"""You are an expert analyst producing a daily AI news digest for professionals in the {sector_label} sector.

Below are today's AI news articles relevant to this sector:

{articles_text}

Please write a concise, professional daily digest that:
1. Opens with a 2-3 sentence executive summary of the most important AI development today
2. Covers each article with a bullet point: bold the key insight, then 1-2 sentences of context explaining why it matters for {sector_label} professionals
3. Closes with a "Key Takeaway" sentence highlighting the most actionable trend

Format your response as clean HTML using only: <h3>, <p>, <ul>, <li>, <strong>, <a href="..."> tags.
Include the article URL as a hyperlink on each bullet point title.
Keep the total length under 600 words. Be specific, insightful, and avoid generic statements."""

    message = await client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1500,
        messages=[{"role": "user", "content": prompt}],
    )

    return message.content[0].text
