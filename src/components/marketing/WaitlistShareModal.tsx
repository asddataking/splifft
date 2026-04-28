"use client";

import { useEffect, useId, useState } from "react";

const SHARE_URL = "https://getsplifft.com/monthly-access";
const COOLDOWN_KEY_PREFIX = "splifft_waitlist_share_cooldown_until:";
const COOLDOWN_MS = 5 * 60 * 1000;

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="currentColor"
        d="M13.5 8h2V5h-2c-2.2 0-3.5 1.3-3.5 3.6V11H8v3h2v5h3v-5h2.2l.3-3H13V8.9c0-.6.3-.9.5-.9Z"
      />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="currentColor"
        d="M14 4c.6 1.7 1.8 2.8 3.5 3V10c-1.2 0-2.4-.3-3.5-.9v4.6c0 3-2.3 5.3-5.2 5.3A5.3 5.3 0 0 1 3.5 13c0-2.9 2.3-5.2 5.3-5.2h.2v3h-.2c-1.2 0-2.2 1-2.2 2.2 0 1.3 1 2.2 2.2 2.2 1.2 0 2.2-.9 2.2-2.2V4H14Z"
      />
    </svg>
  );
}

export function WaitlistShareModal() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function onJoined(e: Event) {
      const custom = e as CustomEvent<{ email?: string; source?: string }>;
      const email = (custom.detail?.email ?? "").trim().toLowerCase();
      const key = `${COOLDOWN_KEY_PREFIX}${email || "unknown"}`;
      try {
        const raw = sessionStorage.getItem(key);
        const until = raw ? Number(raw) : 0;
        if (until && Date.now() < until) return;
      } catch {
        /* ignore storage issues */
      }
      setOpen(true);
      setCopied(false);
      try {
        sessionStorage.setItem(key, String(Date.now() + COOLDOWN_MS));
      } catch {
        /* ignore storage issues */
      }
    }
    window.addEventListener("splifft:waitlist_joined", onJoined);
    return () => window.removeEventListener("splifft:waitlist_joined", onJoined);
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[210] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close share dialog"
        className="absolute inset-0 bg-black/70"
        onClick={() => setOpen(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[1] w-full max-w-md rounded-2xl border-2 border-black bg-[#111015] p-6 shadow-[10px_10px_0_0_rgba(255,45,146,0.4)]"
      >
        <h2 id={titleId} className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-cream)]">
          You’re In
        </h2>
        <p className="mt-2 text-sm text-[var(--splifft-muted)]">
          Share this with your people and help grow Monthly Access.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <a
            href="https://www.instagram.com/getsplifft/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm font-semibold text-[var(--splifft-cream)]"
          >
            <InstagramIcon />
            Instagram
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_URL)}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm font-semibold text-[var(--splifft-cream)]"
          >
            <FacebookIcon />
            Facebook
          </a>
          <a
            href="https://www.tiktok.com/@getsplifft"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm font-semibold text-[var(--splifft-cream)]"
          >
            <TikTokIcon />
            TikTok
          </a>
        </div>
        <button
          type="button"
          onClick={() => void copyLink()}
          className="mt-4 w-full rounded-xl border-2 border-[var(--splifft-pink)] bg-[var(--splifft-pink)]/15 px-4 py-3 text-sm font-bold uppercase tracking-wide text-[var(--splifft-cream)]"
        >
          {copied ? "Link Copied" : "Copy Share Link"}
        </button>
      </div>
    </div>
  );
}
