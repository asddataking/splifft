"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { GA_EVENTS, trackGaEvent } from "@/lib/analytics";
import { submitEmailCapture } from "@/lib/email-capture";
import { SPLIFFT_MONTHLY_SLUG } from "@/lib/splifft-monthly-teaser";
import { SplifftButton } from "@/components/ui/SplifftButton";

const STORAGE_JOINED = "splifft_waitlist_joined";
const SESSION_SHOWN = "splifft_waitlist_scroll_popup_session";
const SCROLL_THRESHOLD_PCT = 30;

function getScrollDepthPercent(): number {
  const doc = document.documentElement;
  const scrollTop = doc.scrollTop;
  const scrollable = doc.scrollHeight - doc.clientHeight;
  if (scrollable <= 0) return 100;
  return (scrollTop / scrollable) * 100;
}

export function WaitlistScrollPopup() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const openedRef = useRef(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const closeSilently = useCallback(() => {
    setOpen(false);
    setError(null);
  }, []);

  const dismiss = useCallback(
    (method: "x" | "backdrop" | "escape" | "subscription_link") => {
      trackGaEvent(GA_EVENTS.WAITLIST_SCROLL_DISMISS, {
        dismiss_method: method,
      });
      setOpen(false);
      setError(null);
    },
    [],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (localStorage.getItem(STORAGE_JOINED) === "1") return;
      if (sessionStorage.getItem(SESSION_SHOWN) === "1") return;
    } catch {
      /* private mode */
    }

    const onScroll = () => {
      if (openedRef.current) return;
      if (getScrollDepthPercent() < SCROLL_THRESHOLD_PCT) return;
      openedRef.current = true;
      window.removeEventListener("scroll", onScroll);
      try {
        sessionStorage.setItem(SESSION_SHOWN, "1");
      } catch {
        /* ignore */
      }
      setOpen(true);
      trackGaEvent(GA_EVENTS.WAITLIST_SCROLL_OPEN, {
        threshold_pct: SCROLL_THRESHOLD_PCT,
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss("escape");
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, dismiss]);

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
      source: "scroll_waitlist",
      metadata: { product_slug: SPLIFFT_MONTHLY_SLUG },
    });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    try {
      localStorage.setItem(STORAGE_JOINED, "1");
    } catch {
      /* ignore */
    }
    trackGaEvent(GA_EVENTS.NOTIFY_ME_SUBMIT, {
      source: "scroll_waitlist",
      product_slug: SPLIFFT_MONTHLY_SLUG,
    });
    setMessage("You’re on the list.");
    setEmail("");
    window.setTimeout(() => {
      closeSilently();
    }, 1800);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-black/75 backdrop-blur-[2px]"
        aria-label="Close waitlist dialog"
        onClick={() => dismiss("backdrop")}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[1] w-full max-w-md overflow-hidden rounded-2xl border-2 border-black bg-[#111015] shadow-[12px_12px_0_0_rgba(255,45,146,0.45)]"
      >
        <button
          ref={closeBtnRef}
          type="button"
          onClick={() => dismiss("x")}
          className="absolute right-2 top-2 z-10 flex size-14 min-h-[56px] min-w-[56px] items-center justify-center rounded-xl border-2 border-white/20 bg-black/70 text-4xl font-light leading-none text-[var(--splifft-cream)] shadow-[4px_4px_0_0_rgba(255,45,146,0.35)] transition hover:border-[var(--splifft-pink)] hover:bg-black/90 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--splifft-blue)] sm:right-3 sm:top-3"
          aria-label="Close"
        >
          <span aria-hidden className="translate-y-[-2px]">
            ×
          </span>
        </button>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(0,191,255,0.12),transparent_50%),radial-gradient(ellipse_at_10%_100%,rgba(255,45,146,0.1),transparent_45%)] pointer-events-none" />
        <div className="relative border-b border-white/10 bg-black/40 px-5 pb-4 pt-5 pr-[4.5rem] sm:px-6 sm:pt-6 sm:pr-20">
          <div className="relative h-12 w-[min(100%,200px)] shrink-0 sm:h-14">
            <Image
              src="/splifftlogo.png"
              alt="Splifft"
              fill
              className="object-contain object-left"
              sizes="200px"
              priority
            />
          </div>
          <h2
            id={titleId}
            className="mt-5 font-[family-name:var(--font-display)] text-2xl uppercase leading-tight tracking-wide text-[var(--splifft-cream)] sm:text-3xl"
          >
            Join the waitlist
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--splifft-muted)]">
            Splifft Subscription — 5 hand rolled joints, glass tips, curated
            monthly. Same list as our subscription notify. No spam.
          </p>
        </div>

        <div className="relative space-y-4 px-5 py-5 sm:px-6 sm:py-6">
          <div>
            <label
              htmlFor="waitlist-scroll-email"
              className="text-xs font-bold uppercase tracking-wider text-[var(--splifft-cream)]"
            >
              Email for launch updates
            </label>
            <input
              id="waitlist-scroll-email"
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="mt-2 w-full rounded-xl border-2 border-white/15 bg-black/50 px-4 py-3 text-[var(--splifft-cream)] placeholder:text-[var(--splifft-muted)] focus:border-[var(--splifft-pink)] focus:outline-none"
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
              className="w-full sm:w-auto"
              disabled={saving}
              onClick={() => void handleSubmit()}
            >
              {saving ? "Saving…" : "Notify me"}
            </SplifftButton>
            <SplifftButton
              href={`/shop/${SPLIFFT_MONTHLY_SLUG}`}
              variant="secondary"
              className="w-full border-2 border-[var(--splifft-blue)]/50 sm:w-auto"
              onClick={() => dismiss("subscription_link")}
            >
              View subscription
            </SplifftButton>
          </div>
        </div>
      </div>
    </div>
  );
}
