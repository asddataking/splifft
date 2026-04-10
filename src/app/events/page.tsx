import { EventQuoteForm } from "@/components/events/EventQuoteForm";

export const metadata = {
  title: "Events | Splifft",
  description:
    "Event cannabis prep — request a custom quote for hosting with Splifft.",
};

export default function EventsPage() {
  return (
    <div className="flex-1">
      <section className="border-b-2 border-black bg-[radial-gradient(circle_at_20%_20%,rgba(255,45,146,0.22),transparent_40%),#0a0a0c] py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--splifft-blue)]">
            Events
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl uppercase text-[var(--splifft-cream)] sm:text-5xl">
            Stop Rolling. Start Hosting.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--splifft-muted)]">
            Cannabis, prepared for your event. Tell us what you are planning — we
            handle prep, pack-outs, and timing.{" "}
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
