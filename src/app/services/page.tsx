import { BookingFlow } from "@/components/services/BookingFlow";
import { serviceCards } from "@/lib/data";
import { SplifftButton } from "@/components/ui/SplifftButton";
import { buildPageMetadata, SOCIAL_SHARE_DESCRIPTION } from "@/lib/site";

export const metadata = buildPageMetadata({
  path: "/services",
  title: "Services & booking",
  description:
    "Roll Up and Fresh Hit — prep done inside the Roll Wagon. Book by flower weight, roll size, upgrades, and time.",
  shareDescription: SOCIAL_SHARE_DESCRIPTION,
});

export default function ServicesPage() {
  return (
    <div className="flex-1">
      <section className="border-b-2 border-black bg-[radial-gradient(circle_at_70%_0%,rgba(0,191,255,0.2),transparent_45%),#0a0a0c] py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--splifft-pink)]">
            Services
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl uppercase text-[var(--splifft-cream)] sm:text-5xl">
            Book Roll Up
          </h1>
          <p className="mt-4 max-w-2xl text-[var(--splifft-muted)]">
            We make the sesh easier: flower weight + your preferred roll size,
            then upgrades and a time slot — like a service appointment. All prep
            happens inside our Roll Wagon; you get a quick handoff when it&apos;s
            ready.
          </p>
          <div className="mt-6 max-w-2xl rounded-xl border-2 border-[var(--splifft-blue)]/50 bg-black/40 px-4 py-3 text-sm text-[var(--splifft-cream)]">
            <strong className="text-[var(--splifft-pink)]">How it works:</strong>{" "}
            We stay in the vehicle. We don&apos;t enter your home or organize a
            sesh area — we prep from our mobile setup and return everything ready
            to smoke.
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-[#101018] py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-[family-name:var(--font-display)] text-2xl uppercase text-[var(--splifft-cream)]">
            Menu board
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
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
                      · Club ${s.memberStartingAt}
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
        </div>
      </section>

      <section id="roll-up" className="bg-[#0c0c10] py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-cream)]">
            Roll Up booking
          </h2>
          <p className="mt-2 max-w-2xl text-[var(--splifft-muted)]">
            Configure flower amount, roll size (for your estimate), upgrades, then
            time. Members see priority slots and VIP scheduling labels. Add Fresh
            Hit from upgrades if you want glass cleaned the same visit.
          </p>
          <div className="mt-10">
            <BookingFlow />
          </div>
        </div>
      </section>
    </div>
  );
}
