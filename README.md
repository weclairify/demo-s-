# AI News Digest

A SaaS web app that delivers daily, sector-specific AI news digests to subscribers.
Users choose their industry, pay via Stripe, and receive a Claude-powered email summary every morning at 07:00 UTC.

## Architecture

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────┐
│   FastAPI app   │────▶│  NewsAPI     │     │   Stripe    │
│  (backend/)     │     └──────────────┘     │  (payments) │
│                 │     ┌──────────────┐     └─────────────┘
│  APScheduler    │────▶│  Claude API  │
│  (daily 07:00)  │     │ (summarise)  │
│                 │     └──────────────┘
│  SQLite / PG    │     ┌──────────────┐
│  (users/logs)   │────▶│  SendGrid    │
└─────────────────┘     │  (email)     │
                        └──────────────┘
```

## Tech Stack

| Layer        | Technology          |
|--------------|---------------------|
| Backend      | Python 3.11+ / FastAPI |
| Database     | SQLite (dev) / PostgreSQL (prod) |
| Auth         | JWT via python-jose  |
| News         | NewsAPI             |
| AI           | Anthropic Claude (claude-sonnet-4-6) |
| Email        | SendGrid            |
| Payments     | Stripe Checkout + Webhooks |
| Scheduler    | APScheduler (async) |
| Frontend     | Vanilla JS + Tailwind CSS |

## Quick Start

### 1. Clone & install

```bash
git clone <repo>
cd demo-s-
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env with your API keys
```

### 3. Run the app

```bash
uvicorn backend.main:app --reload
```

Open [http://localhost:8000](http://localhost:8000).

### 4. Set up Stripe webhook (local dev)

Install the Stripe CLI and forward webhooks:

```bash
stripe listen --forward-to localhost:8000/api/stripe/webhook
```

Copy the webhook signing secret into `.env` as `STRIPE_WEBHOOK_SECRET`.

## Project Structure

```
demo-s-/
├── backend/
│   ├── __init__.py
│   ├── main.py           # FastAPI app, routes, lifespan
│   ├── config.py         # Pydantic settings (reads .env)
│   ├── database.py       # SQLAlchemy engine & session
│   ├── models.py         # User, DigestLog ORM models
│   ├── auth.py           # JWT auth, password hashing
│   ├── news.py           # NewsAPI fetching per sector
│   ├── summarizer.py     # Claude summarisation
│   ├── mailer.py         # SendGrid HTML email builder
│   ├── stripe_handler.py # Stripe checkout, portal, webhooks
│   └── scheduler.py      # APScheduler daily digest job
├── frontend/
│   ├── index.html        # Landing page + login modal
│   ├── register.html     # Registration + sector picker
│   └── dashboard.html    # User dashboard
├── .env.example
├── requirements.txt
└── README.md
```

## API Endpoints

| Method | Path                                | Description                     |
|--------|-------------------------------------|---------------------------------|
| POST   | `/api/auth/register`                | Register new user               |
| POST   | `/api/auth/login`                   | Login (returns JWT)             |
| GET    | `/api/me`                           | Get current user profile        |
| PATCH  | `/api/me/sector`                    | Update sector preference        |
| GET    | `/api/digests`                      | List last 30 digest logs        |
| GET    | `/api/sectors`                      | List available sectors          |
| POST   | `/api/stripe/create-checkout-session` | Start Stripe subscription     |
| POST   | `/api/stripe/portal`                | Open Stripe billing portal      |
| POST   | `/api/stripe/webhook`               | Stripe webhook receiver         |
| POST   | `/api/admin/trigger-digest`         | Manually trigger digest job     |
| GET    | `/api/health`                       | Health check                    |

## Supported Sectors

- Retail & E-commerce
- Telecom & 5G
- Marketing & Advertising
- Finance & Fintech
- Healthcare & MedTech
- Logistics & Supply Chain
- HR & Recruitment
- Legal & Compliance
- Education & EdTech
- General AI & Technology

## Digest Flow (Daily at 07:00 UTC)

1. APScheduler fires `run_daily_digest()`
2. Query all `users` where `subscription_status = active`
3. For each user (max 5 concurrent):
   - Fetch top 10 articles from NewsAPI matching their sector + "AI"
   - Send articles to Claude → get HTML-formatted digest
   - Send email via SendGrid with branded HTML template
   - Log result to `digest_logs` table

## Deployment (Production)

1. Switch `DATABASE_URL` to PostgreSQL
2. Set `APP_URL` to your domain (for Stripe redirects)
3. Register your `/api/stripe/webhook` endpoint in the Stripe dashboard
4. Deploy with Gunicorn + Uvicorn workers:
   ```bash
   gunicorn backend.main:app -w 2 -k uvicorn.workers.UvicornWorker
   ```
5. Use a reverse proxy (nginx) with TLS

## Environment Variables

See `.env.example` for all required variables.
