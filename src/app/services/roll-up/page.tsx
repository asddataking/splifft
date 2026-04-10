import Image from "next/image";
import Link from "next/link";
import { BookingFlow } from "@/components/services/BookingFlow";
import { RollUpStickyCta } from "@/components/services/RollUpStickyCta";
import { SplifftButton } from "@/components/ui/SplifftButton";
import { membershipPerks } from "@/lib/data";
import { buildPageMetadata, SOCIAL_SHARE_DESCRIPTION } from "@/lib/site";

export const metadata = buildPageMetadata({
  path: "/services/roll-up",
  title: "Roll Up — book by weight & roll size",
  description:
    "Stop Rolling. Start Smoking. Book Roll Up: choose flower weight, roll size, upgrades, time, and checkout — mobile handoff, ready to smoke.",
  shareDescription: SOCIAL_SHARE_DESCRIPTION,
});

export default function RollUpServicePage() {
  return (
    <div className="flex-1 pb-24 md:pb-0">
      <section className="border-b-2 border-black bg-[radial-gradient(circle_at_70%_0%,rgba(255,45,146,0.2),transparent_45%),#0a0a0c] py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--splifft-pink)]">
            Roll Up
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl uppercase text-[var(--splifft-cream)] sm:text-5xl">
            Stop Rolling. Start Smoking.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--splifft-muted)]">
            We pull up, prep your smoke, and hand it back ready. Quick handoff.
            Clean prep. Ready to smoke.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <SplifftButton href="#book-roll-up" variant="primary">
              Start booking
            </SplifftButton>
            <SplifftButton href="/services/fresh-hit" variant="ghost">
              Glass only? Fresh Hit
            </SplifftButton>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-[#101018] py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-cream)]">
              How it works
            </h2>
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-[var(--splifft-muted)]">
              <li>Pick flower weight (3.5g minimum) — see standard &amp; Club price.</li>
              <li>Choose roll size (0.5g–2g) — we show estimated pre-roll count.</li>
              <li>Add upgrades: glass tips, tubes, labels, DankNDevour.</li>
              <li>Lock a time — members get priority slots.</li>
              <li>Checkout with name, meet-up, payment notes (wire real pay later).</li>
            </ol>
            <p className="mt-6 text-sm text-[var(--splifft-cream)]">
              Built like a service appointment. Delivered like a perfect sesh.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-black shadow-[8px_8px_0_0_rgba(0,191,255,0.35)]">
            <Image
              src="https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=900&q=80"
              alt="Hands prepping rolls at a mobile workstation"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-[#0c0c10] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-cream)]">
            Weight + roll size
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--splifft-muted)]">
            Price follows weight. Roll size drives your pre-roll estimate — e.g.
            7g at 0.7g rolls ≈ 10 rolls. You configure; we prep and hand it back
            ready.
          </p>
        </div>
      </section>

      <section className="border-b-2 border-black bg-[#12121a] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-cream)]">
            Splifft Club perks
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {membershipPerks.map((perk) => (
              <li
                key={perk}
                className="rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-[var(--splifft-cream)]"
              >
                <span className="text-[var(--splifft-pink)]">★</span> {perk}
              </li>
            ))}
          </ul>
          <SplifftButton href="/club" variant="secondary" className="mt-8">
            View membership
          </SplifftButton>
        </div>
      </section>

      <section
        id="book-roll-up"
        className="scroll-mt-24 bg-[#0e1018] py-14 sm:py-18"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-cream)]">
            Book Roll Up
          </h2>
          <p className="mt-2 max-w-2xl text-[var(--splifft-muted)]">
            Same weight + roll-size flow you know — no Fresh Hit here; book glass
            on{" "}
            <Link
              href="/services/fresh-hit"
              className="font-semibold text-[var(--splifft-blue)] underline-offset-4 hover:underline"
            >
              Fresh Hit
            </Link>
            .
          </p>
          <div className="mt-10">
            <BookingFlow />
          </div>
        </div>
      </section>

      <RollUpStickyCta />
    </div>
  );
}
