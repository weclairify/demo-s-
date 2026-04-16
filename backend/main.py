import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session

from backend.config import get_settings
from backend.database import engine, get_db
from backend.models import Base, User, DigestLog, Sector
from backend.auth import (
    UserCreate,
    UserOut,
    Token,
    hash_password,
    authenticate_user,
    create_access_token,
    get_current_user,
    get_user_by_email,
)
from backend.scheduler import create_scheduler, run_daily_digest
from backend.stripe_handler import router as stripe_router

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
settings = get_settings()

# ---------- App lifecycle ----------

scheduler = create_scheduler()


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    scheduler.start()
    logger.info("Scheduler started — daily digest runs at 07:00 UTC")
    yield
    scheduler.shutdown()


app = FastAPI(
    title="AI News Digest",
    description="Daily sector-specific AI news digests powered by Claude",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount frontend static files
app.mount("/static", StaticFiles(directory="frontend/static"), name="static")

# Include Stripe router
app.include_router(stripe_router)


# ---------- Frontend routes ----------

@app.get("/", response_class=FileResponse)
async def index():
    return FileResponse("frontend/index.html")


@app.get("/register", response_class=FileResponse)
async def register_page():
    return FileResponse("frontend/register.html")


@app.get("/dashboard", response_class=FileResponse)
async def dashboard_page():
    return FileResponse("frontend/dashboard.html")


# ---------- Auth routes ----------

@app.post("/api/auth/register", response_model=Token, status_code=status.HTTP_201_CREATED)
async def register(user_in: UserCreate, db: Session = Depends(get_db)):
    if get_user_by_email(db, user_in.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email already exists.",
        )

    # Validate sector
    valid_sectors = [s.value for s in Sector]
    if user_in.sector not in valid_sectors:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Invalid sector. Choose from: {valid_sectors}",
        )

    user = User(
        email=user_in.email,
        hashed_password=hash_password(user_in.password),
        full_name=user_in.full_name,
        sector=user_in.sector,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token({"sub": user.email})
    return Token(
        access_token=token,
        token_type="bearer",
        user=UserOut.model_validate(user),
    )


@app.post("/api/auth/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = create_access_token({"sub": user.email})
    return Token(
        access_token=token,
        token_type="bearer",
        user=UserOut.model_validate(user),
    )


# ---------- User routes ----------

@app.get("/api/me", response_model=UserOut)
async def get_me(current_user: User = Depends(get_current_user)):
    return UserOut.model_validate(current_user)


class SectorUpdate(BaseModel):
    sector: str


@app.patch("/api/me/sector", response_model=UserOut)
async def update_sector(
    body: SectorUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    valid_sectors = [s.value for s in Sector]
    if body.sector not in valid_sectors:
        raise HTTPException(status_code=422, detail=f"Invalid sector. Choose from: {valid_sectors}")
    current_user.sector = body.sector
    db.commit()
    db.refresh(current_user)
    return UserOut.model_validate(current_user)


# ---------- Digest history ----------

class DigestOut(BaseModel):
    id: int
    sector: str
    sent_at: str
    articles_count: int
    status: str

    class Config:
        from_attributes = True


@app.get("/api/digests", response_model=list[DigestOut])
async def list_digests(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    logs = (
        db.query(DigestLog)
        .filter(DigestLog.user_id == current_user.id)
        .order_by(DigestLog.sent_at.desc())
        .limit(30)
        .all()
    )
    return [
        DigestOut(
            id=log.id,
            sector=log.sector,
            sent_at=log.sent_at.strftime("%Y-%m-%d %H:%M UTC"),
            articles_count=log.articles_count,
            status=log.status,
        )
        for log in logs
    ]


# ---------- Admin: trigger digest manually ----------

@app.post("/api/admin/trigger-digest")
async def trigger_digest(current_user: User = Depends(get_current_user)):
    """Manually trigger the digest job (dev/admin use)."""
    import asyncio
    asyncio.create_task(run_daily_digest())
    return {"message": "Digest job triggered in background."}


# ---------- Misc ----------

@app.get("/api/sectors")
async def list_sectors():
    return [s.value for s in Sector]


@app.get("/api/health")
async def health():
    return {"status": "ok"}
