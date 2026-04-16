import stripe
from datetime import datetime
from fastapi import APIRouter, Request, HTTPException, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from backend.config import get_settings
from backend.database import get_db
from backend.models import User, SubscriptionStatus
from backend.auth import get_current_user

settings = get_settings()
stripe.api_key = settings.stripe_secret_key

router = APIRouter(prefix="/api/stripe", tags=["stripe"])


# ---------- Create Checkout Session ----------

@router.post("/create-checkout-session")
async def create_checkout_session(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Create a Stripe Checkout session for the subscription."""
    try:
        # Create or reuse Stripe customer
        if not current_user.stripe_customer_id:
            customer = stripe.Customer.create(
                email=current_user.email,
                name=current_user.full_name,
                metadata={"user_id": current_user.id},
            )
            current_user.stripe_customer_id = customer.id
            db.commit()

        session = stripe.checkout.Session.create(
            customer=current_user.stripe_customer_id,
            payment_method_types=["card"],
            mode="subscription",
            line_items=[{"price": settings.stripe_price_id, "quantity": 1}],
            success_url=f"{settings.app_url}/dashboard?checkout=success",
            cancel_url=f"{settings.app_url}/dashboard?checkout=cancelled",
            metadata={"user_id": current_user.id},
        )
        return {"checkout_url": session.url}
    except stripe.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))


# ---------- Customer Portal ----------

@router.post("/portal")
async def customer_portal(
    current_user: User = Depends(get_current_user),
):
    """Redirect user to Stripe billing portal to manage subscription."""
    if not current_user.stripe_customer_id:
        raise HTTPException(status_code=400, detail="No billing account found.")

    session = stripe.billing_portal.Session.create(
        customer=current_user.stripe_customer_id,
        return_url=f"{settings.app_url}/dashboard",
    )
    return {"portal_url": session.url}


# ---------- Webhook ----------

@router.post("/webhook")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    """Handle Stripe webhook events to keep subscription status in sync."""
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature", "")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.stripe_webhook_secret
        )
    except stripe.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid webhook signature.")

    event_type = event["type"]
    data = event["data"]["object"]

    if event_type == "checkout.session.completed":
        _handle_checkout_completed(db, data)

    elif event_type in ("customer.subscription.updated", "customer.subscription.created"):
        _handle_subscription_updated(db, data)

    elif event_type == "customer.subscription.deleted":
        _handle_subscription_deleted(db, data)

    elif event_type == "invoice.payment_failed":
        _handle_payment_failed(db, data)

    return JSONResponse({"status": "ok"})


# ---------- Internal helpers ----------

def _get_user_by_customer(db: Session, customer_id: str) -> User | None:
    return db.query(User).filter(User.stripe_customer_id == customer_id).first()


def _handle_checkout_completed(db: Session, session: dict):
    user_id = session.get("metadata", {}).get("user_id")
    if not user_id:
        return
    user = db.query(User).filter(User.id == int(user_id)).first()
    if user:
        user.stripe_subscription_id = session.get("subscription")
        user.subscription_status = SubscriptionStatus.active
        db.commit()


def _handle_subscription_updated(db: Session, subscription: dict):
    user = _get_user_by_customer(db, subscription["customer"])
    if not user:
        return

    status_map = {
        "active": SubscriptionStatus.active,
        "past_due": SubscriptionStatus.past_due,
        "canceled": SubscriptionStatus.cancelled,
        "unpaid": SubscriptionStatus.past_due,
    }
    stripe_status = subscription.get("status", "inactive")
    user.subscription_status = status_map.get(stripe_status, SubscriptionStatus.inactive)
    user.stripe_subscription_id = subscription["id"]

    period_end = subscription.get("current_period_end")
    if period_end:
        user.subscription_end = datetime.utcfromtimestamp(period_end)

    db.commit()


def _handle_subscription_deleted(db: Session, subscription: dict):
    user = _get_user_by_customer(db, subscription["customer"])
    if user:
        user.subscription_status = SubscriptionStatus.cancelled
        user.stripe_subscription_id = None
        db.commit()


def _handle_payment_failed(db: Session, invoice: dict):
    user = _get_user_by_customer(db, invoice["customer"])
    if user:
        user.subscription_status = SubscriptionStatus.past_due
        db.commit()
