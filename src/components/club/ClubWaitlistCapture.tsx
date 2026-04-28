"use client";

import { useId, useState } from "react";
import { GA_EVENTS, trackGaEvent } from "@/lib/analytics";
import { submitEmailCapture } from "@/lib/email-capture";
import { SplifftButton } from "@/components/ui/SplifftButton";

type Surface = "club_page" | "home_membership";

type Props = {
  /** Where the form is shown — stored on the capture row for reporting. */
  surface: Surface;
  /** Optional id prefix so multiple instances on a page have unique fields. */
  idPrefix?: string;
};

export function ClubWaitlistCapture({ surface, idPrefix = "club-waitlist" }: Props) {
  const baseId = useId();
  const emailId = `${idPrefix}-email-${baseId}`;
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setError(null);
    setMessage(null);
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Enter your email");
      return;
    }
    setSaving(true);
    const result = await submitEmailCapture({
      email: trimmed,
      source: "monthly_access_waitlist",
      metadata: { surface },
    });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    trackGaEvent(GA_EVENTS.MONTHLY_ACCESS_WAITLIST_SUBMIT, { surface });
    setMessage("You’re on the Monthly Access list.");
    setEmail("");
  }

  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-[var(--splifft-ink-soft)]">
        Drop your email to get Monthly Access updates, limited-drop alerts, and
        launch announcements.
      </p>
      <div>
        <label
          htmlFor={emailId}
          className="text-xs font-bold uppercase tracking-wider text-[var(--splifft-ink-soft)]"
        >
          Email for Monthly Access launch
        </label>
        <input
          id={emailId}
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="mt-2 w-full rounded-xl border-2 border-black/15 bg-white px-4 py-3 text-[var(--splifft-ink)] placeholder:text-[var(--splifft-ink-soft)] focus:border-[var(--splifft-pink)] focus:outline-none"
        />
        {error ? (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}
        {message ? (
          <p className="mt-2 text-sm font-semibold text-[var(--splifft-pink)]">
            {message}
          </p>
        ) : null}
      </div>
      <SplifftButton
        type="button"
        variant="primary"
        className="w-full"
        disabled={saving}
        onClick={() => void handleSubmit()}
      >
        {saving ? "Saving…" : "Get Monthly Access"}
      </SplifftButton>
    </div>
  );
}
