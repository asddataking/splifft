import { EventQuoteForm } from "@/components/events/EventQuoteForm";
import { SplifftButton } from "@/components/ui/SplifftButton";
import { buildPageMetadata, SOCIAL_SHARE_DESCRIPTION } from "@/lib/site";

export const metadata = buildPageMetadata({
  path: "/services/events",
  title: "Splifft Events — custom quote",
  description:
    "Cannabis prepped for your event. Stop Rolling. Start Hosting. Request a custom quote; optional guest-ready sesh upgrades in the form.",
  shareDescription: SOCIAL_SHARE_DESCRIPTION,
});

const useCases = [
  {
    title: "Private parties",
    body: "Headcount, vibe, and timing — curated prep ready before the door opens.",
  },
  {
    title: "Brand & rooftop nights",
    body: "Prep that looks good on camera and scales with the room.",
  },
  {
    title: "Weddings & milestones",
    body: "Guest-friendly sizes and labels so nothing feels last minute.",
  },
] as const;

export default function ServicesEventsPage() {
  return (
    <div className="flex-1">
      <section className="border-b-2 border-black bg-[radial-gradient(circle_at_20%_20%,rgba(255,45,146,0.22),transparent_40%),#0a0a0c] py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--splifft-blue)]">
            Splifft Events
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl uppercase text-[var(--splifft-cream)] sm:text-5xl">
            Stop Rolling. Start Hosting.
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-medium text-[var(--splifft-cream)]">
            Cannabis prepped for your event.
          </p>
          <p className="mt-3 max-w-2xl text-[var(--splifft-muted)]">
            Everything ready before your guests arrive — sized to headcount,
            venue, and vibe.{" "}
            <strong className="text-[var(--splifft-cream)]">
              Custom quote only
            </strong>
            . Guest-ready sesh boxes are optional upgrades in the form below — not
            a one-size headline.
          </p>
          <SplifftButton href="#quote" variant="primary" className="mt-8">
            Request quote
          </SplifftButton>
        </div>
      </section>

      <section className="border-b-2 border-black bg-[#101018] py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-cream)]">
            Overview
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--splifft-muted)]">
            We plan your event with clear timelines, curated orders, and no
            guesswork before guests arrive. No public price list; we build to your
            brief.
          </p>
        </div>
      </section>

      <section className="border-b-2 border-black bg-[#0c0c10] py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-cream)]">
            Use cases
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {useCases.map((u) => (
              <article
                key={u.title}
                className="rounded-2xl border-2 border-[var(--splifft-blue)]/40 bg-black/40 p-6"
              >
                <h3 className="font-[family-name:var(--font-display)] text-xl uppercase text-[var(--splifft-cream)]">
                  {u.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--splifft-muted)]">
                  {u.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="quote" className="scroll-mt-24 bg-[#12121a] py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-cream)]">
            Request a quote
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[var(--splifft-muted)]">
            Tell us about the event; tick sesh upgrades like guest-ready drops if
            you want them in the proposal.
          </p>
          <div className="mt-10">
            <EventQuoteForm />
          </div>
        </div>
      </section>
    </div>
  );
}
