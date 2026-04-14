/** Allowed `source` values for email_captures — keep in sync with API route. */
export const EMAIL_CAPTURE_SOURCES = [
  "subscription_modal",
  "shop_subscription_teaser",
  "subscription_pdp_teaser",
  "scroll_waitlist",
  "club_waitlist",
] as const;

export type EmailCaptureSource = (typeof EMAIL_CAPTURE_SOURCES)[number];

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function isValidEmail(email: string): boolean {
  const t = email.trim();
  return t.length <= 320 && EMAIL_RE.test(t);
}

export type EmailCapturePayload = {
  email: string;
  source: EmailCaptureSource;
  preference?: string | null;
  metadata?: Record<string, unknown>;
};

export async function submitEmailCapture(
  payload: EmailCapturePayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const normalizedEmail = payload.email.trim().toLowerCase();
  const res = await fetch("/api/email-capture", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await res.json().catch(() => ({}))) as {
    error?: string;
  };
  if (!res.ok) {
    return { ok: false, error: data.error ?? "Something went wrong" };
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("splifft:waitlist_joined", {
        detail: { source: payload.source, email: normalizedEmail },
      }),
    );
  }
  return { ok: true };
}
