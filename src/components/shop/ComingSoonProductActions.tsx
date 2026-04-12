"use client";

import { useState } from "react";
import { GA_EVENTS, trackGaEvent } from "@/lib/analytics";
import { submitEmailCapture } from "@/lib/email-capture";
import { SplifftButton } from "@/components/ui/SplifftButton";

type Props = {
  productSlug: string;
};

export function ComingSoonProductActions({ productSlug }: Props) {
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleNotify() {
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
      source: "subscription_pdp_teaser",
      metadata: { product_slug: productSlug },
    });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    trackGaEvent(GA_EVENTS.NOTIFY_ME_SUBMIT, {
      source: "subscription_pdp_teaser",
      product_slug: productSlug,
    });
    setMessage("You’re on the list.");
    setEmail("");
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label
          htmlFor={`notify-pdp-${productSlug}`}
          className="text-xs font-bold uppercase tracking-wider text-[var(--splifft-cream)]"
        >
          Email for launch updates
        </label>
        <input
          id={`notify-pdp-${productSlug}`}
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="mt-2 w-full max-w-md rounded-xl border-2 border-white/15 bg-black/50 px-4 py-3 text-[var(--splifft-cream)] placeholder:text-[var(--splifft-muted)] focus:border-[var(--splifft-pink)] focus:outline-none"
        />
        {error ? (
          <p className="mt-2 text-sm text-red-400" role="alert">
            {error}
          </p>
        ) : null}
        {message ? (
          <p className="mt-2 text-sm font-semibold text-[var(--splifft-blue)]">
            {message}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <SplifftButton
          type="button"
          variant="primary"
          disabled={saving}
          onClick={() => void handleNotify()}
        >
          {saving ? "Saving…" : "Notify Me"}
        </SplifftButton>
        <SplifftButton href="/club" variant="secondary">
          Join Splifft Club
        </SplifftButton>
        <SplifftButton
          type="button"
          variant="ghost"
          disabled
          className="cursor-not-allowed opacity-70"
        >
          Coming Soon — not on sale yet
        </SplifftButton>
      </div>
    </div>
  );
}
