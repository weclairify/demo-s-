from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # App
    app_name: str = "AI News Digest"
    secret_key: str = "change-me-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 24 * 7  # 7 days

    # Database
    database_url: str = "sqlite:///./digest.db"

    # News API
    news_api_key: str = ""

    # Anthropic
    anthropic_api_key: str = ""

    # SendGrid
    sendgrid_api_key: str = ""
    from_email: str = "digest@yourdomain.com"
    from_name: str = "AI News Digest"

    # Stripe
    stripe_secret_key: str = ""
    stripe_webhook_secret: str = ""
    stripe_price_id: str = ""  # Your monthly subscription price ID

    # App URL (for Stripe redirects)
    app_url: str = "http://localhost:8000"

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
