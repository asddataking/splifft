"use client";

import { useEffect, useId, useRef, useState } from "react";
import { GA_EVENTS, trackGaEvent } from "@/lib/analytics";
import { submitEmailCapture } from "@/lib/email-capture";
import { SplifftButton } from "@/components/ui/SplifftButton";
import { DROP_OF_THE_MONTH_SLUG } from "@/lib/drop-of-the-month";
import { SPLIFFT_MONTHLY_SLUG } from "@/lib/splifft-monthly-teaser";

type Props = {
  open: boolean;
  onClose: () => void;
};

const included = [
  "5 × 0.7g joints — premium crafted finish",
  "glass tip included",
  "curated monthly delivery",
  "3.5g total monthly · choose Indica or Sativa",
] as const;

export function SplifftSubscriptionModal({ open, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const emailFieldId = useId();
  const prevOpen = useRef(false);
  const [strain, setStrain] = useState<"indica" | "sativa">("indica");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleClose() {
    setStatus("idle");
    setErrorMessage(null);
    onClose();
  }

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open) {
      el.showModal();
    } else {
      el.close();
    }
  }, [open]);

  useEffect(() => {
    if (open && !prevOpen.current) {
      trackGaEvent(GA_EVENTS.SUBSCRIPTION_MODAL_OPEN, {
        source: "splifft_subscription_modal",
      });
    }
    prevOpen.current = open;
  }, [open]);

  async function handleNotify() {
    setErrorMessage(null);
    const trimmed = email.trim();
    if (!trimmed) {
      setErrorMessage("Enter your email");
      return;
    }
    setStatus("saving");
    const result = await submitEmailCapture({
      email: trimmed,
      source: "subscription_modal",
      preference: strain,
      metadata: { strain },
    });
    if (!result.ok) {
      setStatus("error");
      setErrorMessage(result.error);
      return;
    }
    trackGaEvent(GA_EVENTS.NOTIFY_ME_SUBMIT, {
      source: "subscription_modal",
      strain_preference: strain,
    });
    setStatus("done");
    window.setTimeout(() => {
      setEmail("");
      setStatus("idle");
      handleClose();
    }, 1600);
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="max-h-[90dvh] w-[min(100%,28rem)] overflow-y-auto rounded-2xl border-2 border-black bg-[#111015] p-0 text-[var(--splifft-cream)] shadow-[12px_12px_0_0_rgba(255,45,146,0.4)] backdrop:bg-black/70"
      onClose={handleClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) handleClose();
      }}
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2
            id={titleId}
            className="font-[family-name:var(--font-display)] text-2xl uppercase leading-tight tracking-wide text-[var(--splifft-cream)] sm:text-3xl"
          >
            Monthly Access
          </h2>
          <button
            type="button"
            className="shrink-0 rounded-lg border border-white/20 px-2 py-1 text-sm font-semibold text-[var(--splifft-muted)] hover:bg-white/5 hover:text-[var(--splifft-cream)]"
            onClick={handleClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[var(--splifft-muted)]">
          5 premium Spliffts. Curated monthly. Ready when you are.
        </p>

        <div className="mt-6 rounded-xl border border-[var(--splifft-blue)]/40 bg-black/40 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--splifft-blue)]">
            Included
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--splifft-cream)]">
            {included.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="text-[var(--splifft-pink)]">•</span>
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--splifft-pink)]">
            Preference
          </p>
          <div className="mt-2 flex gap-2">
            {(["indica", "sativa"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStrain(s)}
                className={`flex-1 rounded-xl border-2 px-3 py-2 text-sm font-bold uppercase tracking-wide transition ${
                  strain === s
                    ? "border-[var(--splifft-pink)] bg-[var(--splifft-pink)] text-black"
                    : "border-white/15 bg-black/40 text-[var(--splifft-muted)] hover:border-[var(--splifft-pink)]/40"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-dashed border-[var(--splifft-pink)]/45 bg-black/35 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--splifft-pink)]">
            Optional upsell
          </p>
          <p className="mt-1 text-sm text-[var(--splifft-muted)]">
            Add this month&apos;s curated drop — stack it with your subscription
            or peek pricing first.
          </p>
          <SplifftButton
            href={`/shop/${DROP_OF_THE_MONTH_SLUG}`}
            variant="ghost"
            className="mt-3 w-full border-2 border-[var(--splifft-pink)]/35"
            onClick={handleClose}
          >
            Add this month&apos;s drop →
          </SplifftButton>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-[var(--splifft-pink)]/50 bg-black/35 p-4">
            <p className="text-[10px] font-bold uppercase text-[var(--splifft-muted)]">
              Monthly Access
            </p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-3xl text-[var(--splifft-pink)]">
              $60
              <span className="text-base font-sans font-semibold text-[var(--splifft-cream)]">
                /mo
              </span>
            </p>
          </div>
          <div className="rounded-xl border border-white/15 bg-black/35 p-4">
            <p className="text-[10px] font-bold uppercase text-[var(--splifft-muted)]">
              One-Time Pack
            </p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-3xl text-[var(--splifft-cream)]">
              $75
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm font-medium text-[var(--splifft-cream)]/90">
          Monthly Access is the easiest way to keep your session ready, with first
          access to drops and future collabs.
        </p>

        <div className="mt-6">
          <label
            htmlFor={emailFieldId}
            className="text-xs font-bold uppercase tracking-wider text-[var(--splifft-blue)]"
          >
            Email for launch updates
          </label>
          <input
            id={emailFieldId}
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="mt-2 w-full rounded-xl border-2 border-white/15 bg-black/50 px-4 py-3 text-[var(--splifft-cream)] placeholder:text-[var(--splifft-muted)] focus:border-[var(--splifft-pink)] focus:outline-none"
          />
          {errorMessage ? (
            <p className="mt-2 text-sm text-red-400" role="alert">
              {errorMessage}
            </p>
          ) : null}
          {status === "done" ? (
            <p className="mt-2 text-sm font-semibold text-[var(--splifft-blue)]">
              You&apos;re on the list — we&apos;ll be in touch.
            </p>
          ) : null}
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <SplifftButton
            type="button"
            variant="primary"
            className="w-full"
            disabled={status === "saving"}
            onClick={() => void handleNotify()}
          >
            {status === "saving" ? "Saving…" : "Get Monthly Access"}
          </SplifftButton>
          <SplifftButton
            href={`/shop/${SPLIFFT_MONTHLY_SLUG}`}
            variant="secondary"
            className="w-full"
            onClick={handleClose}
          >
            View full details
          </SplifftButton>
        </div>

        <p className="mt-6 text-center text-xs font-semibold uppercase tracking-wide text-[var(--splifft-muted)]">
          No rolling. No prep. Just smoke.
        </p>
      </div>
    </dialog>
  );
}
