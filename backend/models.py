from datetime import datetime
from typing import Optional
from sqlalchemy import String, Boolean, DateTime, Text, ForeignKey, Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from backend.database import Base
import enum


class Sector(str, enum.Enum):
    retail = "retail"
    telecom = "telecom"
    marketing = "marketing"
    finance = "finance"
    healthcare = "healthcare"
    logistics = "logistics"
    hr = "hr"
    legal = "legal"
    education = "education"
    general = "general"


class SubscriptionStatus(str, enum.Enum):
    inactive = "inactive"
    active = "active"
    cancelled = "cancelled"
    past_due = "past_due"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    sector: Mapped[str] = mapped_column(SAEnum(Sector), nullable=False, default=Sector.general)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Stripe
    stripe_customer_id: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    stripe_subscription_id: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    subscription_status: Mapped[str] = mapped_column(
        SAEnum(SubscriptionStatus), default=SubscriptionStatus.inactive
    )
    subscription_end: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)

    digests: Mapped[list["DigestLog"]] = relationship("DigestLog", back_populates="user")


class DigestLog(Base):
    __tablename__ = "digest_logs"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    sector: Mapped[str] = mapped_column(String(100), nullable=False)
    sent_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    articles_count: Mapped[int] = mapped_column(default=0)
    summary: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(String(50), default="sent")  # sent, failed

    user: Mapped["User"] = relationship("User", back_populates="digests")
