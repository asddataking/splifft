import Link from "next/link";
import { serviceCards } from "@/lib/data";
import { SplifftButton } from "@/components/ui/SplifftButton";
import { buildPageMetadata, SOCIAL_SHARE_DESCRIPTION } from "@/lib/site";

export const metadata = buildPageMetadata({
  path: "/services",
  title: "Services",
  description:
    "Splifft Events premium custom-quote service for parties.",
  shareDescription: SOCIAL_SHARE_DESCRIPTION,
});

export default function ServicesHubPage() {
  return (
    <div className="flex-1">
      <section className="border-b-2 border-black bg-[radial-gradient(circle_at_70%_0%,rgba(0,191,255,0.2),transparent_45%),#0a0a0c] py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--splifft-pink)]">
            Services
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl uppercase text-[var(--splifft-cream)] sm:text-5xl">
            Splifft Events
          </h1>
          <p className="mt-4 max-w-2xl text-[var(--splifft-muted)]">
            We now focus on Monthly Access, packs, and themed boxes. Services are now
            events only, with custom quotes for parties.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <SplifftButton href="/services/events" variant="primary">
              Request Event Quote
            </SplifftButton>
            <SplifftButton href="/shop" variant="secondary">
              Shop drops
            </SplifftButton>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-[#101018] py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-[family-name:var(--font-display)] text-2xl uppercase text-[var(--splifft-cream)]">
            Premium custom quote
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-1">
            {serviceCards.map((s) => (
              <article
                key={s.id}
                className="rounded-2xl border-2 border-black bg-[var(--splifft-card)] p-5 shadow-[4px_4px_0_0_rgba(255,45,146,0.35)]"
              >
                <h3 className="font-[family-name:var(--font-display)] text-xl uppercase text-[var(--splifft-ink)]">
                  {s.name}
                </h3>
                <p className="mt-2 text-sm text-[var(--splifft-ink-soft)]">
                  {s.description}
                </p>
                {s.quoteOnly ? (
                  <p className="mt-4 text-xs font-bold uppercase text-[var(--splifft-pink)]">
                    Custom quote
                  </p>
                ) : (
                  <p className="mt-4 text-xs font-bold uppercase text-[var(--splifft-pink)]">
                    From ${s.startingAt}{" "}
                    <span className="text-[var(--splifft-ink-soft)]">
                      · Monthly Access ${s.memberStartingAt}
                    </span>
                  </p>
                )}
                <SplifftButton
                  href={s.ctaHref}
                  variant="secondary"
                  className="mt-4 w-full text-sm"
                >
                  {s.ctaLabel}
                </SplifftButton>
              </article>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-[var(--splifft-muted)]">
            <Link
              href="/monthly-access"
              className="font-semibold text-[var(--splifft-pink)] underline-offset-4 hover:underline"
            >
              Monthly Access
            </Link>{" "}
            — better pricing, first access to drops, and smoother pack planning.
          </p>
        </div>
      </section>
    </div>
  );
}
