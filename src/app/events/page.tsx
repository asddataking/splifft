import { EventQuoteForm } from "@/components/events/EventQuoteForm";
import { buildPageMetadata, SOCIAL_SHARE_DESCRIPTION } from "@/lib/site";

export const metadata = buildPageMetadata({
  path: "/events",
  title: "Events",
  description:
    "Splifft Events — cannabis prepared for your event. Custom quote; guest-ready packs available as add-ons.",
  shareDescription: SOCIAL_SHARE_DESCRIPTION,
});

export default function EventsPage() {
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
            Cannabis, prepared for your event.
          </p>
          <p className="mt-3 max-w-2xl text-[var(--splifft-muted)]">
            Everything ready before your guests arrive — tailored to your headcount,
            venue, and vibe. Not all events are the same; we build to your brief.{" "}
            <strong className="text-[var(--splifft-cream)]">
              Custom quote only — no pricing on this page.
            </strong>
          </p>
        </div>
      </section>

      <section className="bg-[#101018] py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <EventQuoteForm />
        </div>
      </section>
    </div>
  );
}
