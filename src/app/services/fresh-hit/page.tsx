import Image from "next/image";
import Link from "next/link";
import { FreshHitBookingFlow } from "@/components/services/FreshHitBookingFlow";
import { SplifftButton } from "@/components/ui/SplifftButton";
import { freshHitCleaningTypes } from "@/lib/booking-tiers";
import { buildPageMetadata, SOCIAL_SHARE_DESCRIPTION } from "@/lib/site";

export const metadata = buildPageMetadata({
  path: "/services/fresh-hit",
  title: "Fresh Hit — glass cleaning, mobile handoff",
  description:
    "Fresh Hit: bongs, rigs, and pipes cleaned on a mobile handoff — separate from Roll Up. Pick type, add-ons, time, checkout.",
  shareDescription: SOCIAL_SHARE_DESCRIPTION,
});

export default function FreshHitServicePage() {
  const minP = Math.min(...freshHitCleaningTypes.map((t) => t.standardPrice));
  const maxP = Math.max(...freshHitCleaningTypes.map((t) => t.standardPrice));

  return (
    <div className="flex-1">
      <section className="border-b-2 border-black bg-[radial-gradient(circle_at_30%_0%,rgba(0,191,255,0.22),transparent_45%),#0a0a0c] py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--splifft-blue)]">
            Fresh Hit
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl uppercase text-[var(--splifft-cream)] sm:text-5xl">
            Glass back fresh — no sink time
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--splifft-muted)]">
            We pull up, handle the prep, and hand pieces back ready. Easier sesh;
            Fresh Hit is its own booking — not bundled with Roll Up.
          </p>
          <SplifftButton href="#book-fresh-hit" variant="primary" className="mt-6">
            Book Fresh Hit
          </SplifftButton>
        </div>
      </section>

      <section className="border-b-2 border-black bg-[#101018] py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-cream)]">
              What we clean
            </h2>
            <p className="mt-3 text-[var(--splifft-muted)]">
              Small pieces, bongs and rigs, heavy reclaim jobs, or multi-piece
              stops — scope at handoff, always mobile handoff.
            </p>
            <h3 className="mt-8 font-[family-name:var(--font-display)] text-xl uppercase text-[var(--splifft-cream)]">
              Piece types
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-[var(--splifft-muted)]">
              {freshHitCleaningTypes.map((t) => (
                <li key={t.id}>
                  <strong className="text-[var(--splifft-cream)]">{t.label}</strong>{" "}
                  — {t.description}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-black">
              <Image
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&q=80"
                alt="Clean glassware ready for handoff"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
              <p className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-center text-xs font-bold text-[var(--splifft-cream)]">
                After — fresh
              </p>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-black">
              <Image
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80"
                alt="Glass collection before cleaning"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
              <p className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-center text-xs font-bold text-[var(--splifft-muted)]">
                Before — we handle it
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-[#0c0c10] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-cream)]">
            Pricing guidance
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--splifft-muted)]">
            Types start around ${minP} standard (${Math.min(...freshHitCleaningTypes.map((t) => t.memberPrice))} Club) up
            to about ${maxP} for multi-piece — plus optional add-ons (priority,
            extra piece, protective packaging). Final total confirmed at checkout
            and handoff.
          </p>
          <SplifftButton href="/services/roll-up" variant="ghost" className="mt-6">
            Need flower prepped? Roll Up →
          </SplifftButton>
        </div>
      </section>

      <section
        id="book-fresh-hit"
        className="scroll-mt-24 bg-[#0e1018] py-14 sm:py-18"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-cream)]">
            Book Fresh Hit
          </h2>
          <p className="mt-2 max-w-2xl text-[var(--splifft-muted)]">
            Type → add-ons → time → checkout. Not merged with Roll Up.
          </p>
          <div className="mt-10">
            <FreshHitBookingFlow />
          </div>
        </div>
      </section>
    </div>
  );
}
