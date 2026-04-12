"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/data";
import { GA_EVENTS, trackGaEvent } from "@/lib/analytics";
import { submitEmailCapture } from "@/lib/email-capture";
import { SplifftButton } from "@/components/ui/SplifftButton";

type Props = { product: Product };

export function ShopSplifftMonthlyTeaserCard({ product }: Props) {
  const src = product.imageUrl!;
  const alt = product.imageAlt ?? product.name;
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
      source: "shop_subscription_teaser",
      metadata: { product_slug: product.slug },
    });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    trackGaEvent(GA_EVENTS.NOTIFY_ME_SUBMIT, {
      source: "shop_subscription_teaser",
      product_slug: product.slug,
    });
    setMessage("You’re on the list.");
    setEmail("");
  }

  return (
    <article className="group relative overflow-hidden rounded-2xl border-2 border-[var(--splifft-blue)]/60 bg-[#0d0d12] shadow-[6px_6px_0_0_rgba(0,191,255,0.25)] ring-1 ring-white/5">
      <Link
        href={`/shop/${product.slug}`}
        className="relative block outline-none focus-visible:ring-2 focus-visible:ring-[var(--splifft-pink)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0c]"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/40">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover opacity-75 saturate-[0.55] transition duration-500 group-hover:opacity-[0.88] group-hover:saturate-[0.72]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/25" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent,transparent_12px,rgba(255,45,146,0.05)_12px,rgba(255,45,146,0.05)_13px)]" />
          <div
            className="pointer-events-none absolute inset-0 border border-white/5 bg-[radial-gradient(ellipse_at_center,rgba(0,191,255,0.08),transparent_65%)]"
            aria-hidden
          />

          <span className="absolute left-3 top-3 z-[1] rounded-full border border-black/50 bg-[var(--splifft-pink)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-black shadow-[0_0_0_1px_rgba(255,45,146,0.5)]">
            Coming Soon
          </span>
          <span className="absolute right-3 top-3 z-[1] rounded-full border border-white/20 bg-black/75 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[var(--splifft-blue)] backdrop-blur-sm">
            Teaser
          </span>

          <div className="absolute bottom-0 left-0 right-0 z-[1] p-4 sm:p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--splifft-blue)]">
              Flagship subscription
            </p>
            <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl uppercase leading-tight tracking-wide text-[var(--splifft-cream)] sm:text-3xl">
              {product.name}
            </h2>
            <p className="mt-2 text-sm leading-snug text-[var(--splifft-muted)]">
              5 artisinally hand rolled 0.7g joints with glass tips, curated
              monthly.
            </p>
            <div className="mt-3 space-y-1.5 border-t border-white/10 pt-3">
              <p className="text-lg font-bold text-white">
                ${product.memberPrice}
                <span className="ml-2 text-xs font-bold uppercase tracking-wide text-[var(--splifft-pink)]">
                  /mo · Members
                </span>
              </p>
              <p className="text-sm font-semibold text-[var(--splifft-muted)]">
                ${product.price}/mo · Non-members
              </p>
            </div>
            <p className="mt-3 text-xs font-bold uppercase tracking-wider text-[var(--splifft-blue)]">
              Not purchasable yet · Open preview →
            </p>
          </div>
        </div>
      </Link>

      <div className="border-t border-white/10 bg-black/55 px-4 py-3 sm:px-5">
        <label className="sr-only" htmlFor={`notify-email-${product.id}`}>
          Email for Splifft Subscription updates
        </label>
        <input
          id={`notify-email-${product.id}`}
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email for updates"
          className="mb-2 w-full rounded-lg border border-white/15 bg-black/50 px-3 py-2 text-sm text-[var(--splifft-cream)] placeholder:text-[var(--splifft-muted)] focus:border-[var(--splifft-pink)] focus:outline-none"
        />
        {error ? (
          <p className="mb-2 text-xs text-red-400" role="alert">
            {error}
          </p>
        ) : null}
        {message ? (
          <p className="mb-2 text-xs font-semibold text-[var(--splifft-blue)]">
            {message}
          </p>
        ) : null}
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <SplifftButton
            type="button"
            variant="primary"
            className="min-h-[48px] flex-1"
            disabled={saving}
            onClick={() => void handleNotify()}
          >
            {saving ? "Saving…" : "Notify Me"}
          </SplifftButton>
          <SplifftButton
            type="button"
            variant="ghost"
            disabled
            className="min-h-[48px] flex-1 cursor-not-allowed opacity-60"
            aria-label="Coming soon — not available for purchase"
          >
            Coming Soon
          </SplifftButton>
        </div>
      </div>
    </article>
  );
}
