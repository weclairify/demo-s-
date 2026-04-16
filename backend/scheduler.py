"""
Daily digest scheduler.

Runs every day at 07:00 UTC. For every active subscriber, it:
  1. Fetches the latest AI news for their sector (NewsAPI)
  2. Summarises with Claude
  3. Sends the email via SendGrid
  4. Logs the result to digest_logs
"""

import asyncio
import logging
from datetime import datetime

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from sqlalchemy.orm import Session

from backend.database import SessionLocal
from backend.models import User, DigestLog, SubscriptionStatus
from backend.news import fetch_news
from backend.summarizer import summarize_digest
from backend.mailer import send_digest_email

logger = logging.getLogger(__name__)


async def send_digest_for_user(user: User, db: Session) -> None:
    """Fetch news, summarise, send email, and log for a single user."""
    try:
        articles = await fetch_news(user.sector)
        if not articles:
            logger.warning("[scheduler] No articles found for sector=%s user=%s", user.sector, user.id)

        summary_html = await summarize_digest(user.sector, articles)

        success = send_digest_email(
            to_email=user.email,
            full_name=user.full_name,
            sector=user.sector,
            summary_html=summary_html,
            articles=articles,
        )

        log = DigestLog(
            user_id=user.id,
            sector=user.sector,
            articles_count=len(articles),
            summary=summary_html,
            status="sent" if success else "failed",
        )
        db.add(log)
        db.commit()

        logger.info(
            "[scheduler] Digest %s for user=%s (%s)",
            "sent" if success else "FAILED",
            user.id,
            user.email,
        )

    except Exception as exc:
        logger.error("[scheduler] Error for user=%s: %s", user.id, exc, exc_info=True)
        log = DigestLog(
            user_id=user.id,
            sector=user.sector,
            articles_count=0,
            status="failed",
        )
        db.add(log)
        db.commit()


async def run_daily_digest() -> None:
    """Entry point called by APScheduler — sends digests to all active subscribers."""
    logger.info("[scheduler] Daily digest job started at %s", datetime.utcnow().isoformat())
    db: Session = SessionLocal()
    try:
        active_users = (
            db.query(User)
            .filter(
                User.subscription_status == SubscriptionStatus.active,
                User.is_active == True,
            )
            .all()
        )
        logger.info("[scheduler] Sending to %d active users", len(active_users))

        # Send concurrently but cap at 5 at a time to avoid rate limits
        semaphore = asyncio.Semaphore(5)

        async def guarded(user):
            async with semaphore:
                await send_digest_for_user(user, db)

        await asyncio.gather(*[guarded(u) for u in active_users])

    finally:
        db.close()
    logger.info("[scheduler] Daily digest job finished at %s", datetime.utcnow().isoformat())


def create_scheduler() -> AsyncIOScheduler:
    """Create and configure the APScheduler instance."""
    scheduler = AsyncIOScheduler()
    scheduler.add_job(
        run_daily_digest,
        trigger=CronTrigger(hour=7, minute=0, timezone="UTC"),
        id="daily_digest",
        name="Daily AI News Digest",
        replace_existing=True,
        misfire_grace_time=3600,  # allow up to 1 h late if server was down
    )
    return scheduler
