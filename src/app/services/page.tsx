import { BookingFlow } from "@/components/services/BookingFlow";
import { serviceCards } from "@/lib/data";
import { SplifftButton } from "@/components/ui/SplifftButton";

export const metadata = {
  title: "Services & booking | Splifft",
  description:
    "Book mobile sesh prep — weight-based rolling, upgrades, and appointment checkout.",
};

export default function ServicesPage() {
  return (
    <div className="flex-1">
      <section className="border-b-2 border-black bg-[radial-gradient(circle_at_70%_0%,rgba(0,191,255,0.2),transparent_45%),#0a0a0c] py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--splifft-pink)]">
            Services
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl uppercase text-[var(--splifft-cream)] sm:text-5xl">
            Book your sesh
          </h1>
          <p className="mt-4 max-w-2xl text-[var(--splifft-muted)]">
            Rolling priced by weight — not joint count. Add upgrades, pick a
            slot, and check out like you ordered from the window.
          </p>
        </div>
      </section>

      <section className="border-b-2 border-black bg-[#101018] py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-[family-name:var(--font-display)] text-2xl uppercase text-[var(--splifft-cream)]">
            Menu board — service cards
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
                <p className="mt-4 text-xs font-bold uppercase text-[var(--splifft-pink)]">
                  From ${s.startingAt}{" "}
                  <span className="text-[var(--splifft-ink-soft)]">
                    · Club ${s.memberStartingAt}
                  </span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="rolling" className="bg-[#0c0c10] py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-cream)]">
            Rolling & prep booking
          </h2>
          <p className="mt-2 max-w-2xl text-[var(--splifft-muted)]">
            Step through weight, upgrades, time, and checkout. Members see extra
            slots in step 3.
          </p>
          <div className="mt-10">
            <BookingFlow />
          </div>
          <div className="mx-auto mt-12 max-w-3xl rounded-xl border border-[var(--splifft-blue)]/40 bg-black/30 p-4 text-center text-sm text-[var(--splifft-muted)]">
            Need glass-only or a quick reset?{" "}
            <SplifftButton
              href="/services#rolling"
              variant="ghost"
              className="inline-flex min-h-0 px-3 py-2 text-sm"
            >
              Same flow — toggle upgrades
            </SplifftButton>
          </div>
        </div>
      </section>
    </div>
  );
}
