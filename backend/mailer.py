from datetime import date
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, To
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


def _build_html_email(
    full_name: str,
    sector: str,
    summary_html: str,
    articles: list[dict],
) -> str:
    sector_label = SECTOR_LABELS.get(sector, "Technology & AI")
    today = date.today().strftime("%B %d, %Y")

    articles_html = ""
    for art in articles:
        articles_html += f"""
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #eee;">
            <a href="{art['url']}" style="color:#4f46e5;font-weight:600;text-decoration:none;">
              {art['title']}
            </a>
            <span style="color:#6b7280;font-size:12px;margin-left:8px;">— {art['source']}</span>
          </td>
        </tr>"""

    return f"""<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:32px 40px;">
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">AI News Digest</h1>
            <p style="margin:6px 0 0;color:#c7d2fe;font-size:14px;">{sector_label} Edition &mdash; {today}</p>
          </td>
        </tr>

        <!-- Greeting -->
        <tr>
          <td style="padding:28px 40px 0;">
            <p style="margin:0;color:#374151;font-size:15px;">Hi {full_name},</p>
            <p style="margin:12px 0 0;color:#6b7280;font-size:14px;">
              Here is your daily AI briefing tailored for the <strong>{sector_label}</strong> sector.
            </p>
          </td>
        </tr>

        <!-- AI Summary -->
        <tr>
          <td style="padding:24px 40px;">
            <div style="background:#f5f3ff;border-left:4px solid #4f46e5;border-radius:0 8px 8px 0;padding:20px 24px;color:#374151;font-size:14px;line-height:1.7;">
              {summary_html}
            </div>
          </td>
        </tr>

        <!-- Source Articles -->
        <tr>
          <td style="padding:0 40px 28px;">
            <h3 style="margin:0 0 12px;color:#111827;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Source Articles</h3>
            <table width="100%" cellpadding="0" cellspacing="0">
              {articles_html}
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:20px 40px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;color:#9ca3af;font-size:12px;text-align:center;">
              You are receiving this because you subscribed to AI News Digest.<br>
              <a href="{settings.app_url}/dashboard" style="color:#4f46e5;">Manage preferences</a>
              &nbsp;&middot;&nbsp;
              <a href="{settings.app_url}/unsubscribe" style="color:#4f46e5;">Unsubscribe</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>"""


def send_digest_email(
    to_email: str,
    full_name: str,
    sector: str,
    summary_html: str,
    articles: list[dict],
) -> bool:
    """
    Send the daily digest email via SendGrid.
    Returns True on success, False on failure.
    """
    sector_label = SECTOR_LABELS.get(sector, "Technology & AI")
    today = date.today().strftime("%B %d, %Y")
    subject = f"Your AI Digest: {sector_label} — {today}"

    html_content = _build_html_email(full_name, sector, summary_html, articles)

    message = Mail(
        from_email=(settings.from_email, settings.from_name),
        to_emails=To(to_email, full_name),
        subject=subject,
        html_content=html_content,
    )

    try:
        sg = SendGridAPIClient(settings.sendgrid_api_key)
        response = sg.send(message)
        return response.status_code in (200, 202)
    except Exception as exc:
        print(f"[mailer] Failed to send to {to_email}: {exc}")
        return False
