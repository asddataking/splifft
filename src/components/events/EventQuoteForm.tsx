"use client";

import { useState } from "react";
import { eventUpsells } from "@/lib/data";
import { SplifftButton } from "@/components/ui/SplifftButton";

export function EventQuoteForm() {
  const [upsells, setUpsells] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setUpsells((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert(
      "Quote request received (mock). No pricing shown — your team follows up with a custom proposal.",
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <form
        onSubmit={onSubmit}
        className="rounded-2xl border-2 border-black bg-[var(--splifft-card)] p-6 shadow-[8px_8px_0_0_rgba(0,191,255,0.35)] sm:p-8"
      >
        <h2 className="font-[family-name:var(--font-display)] text-2xl uppercase text-[var(--splifft-ink)]">
          Request a quote
        </h2>
        <div className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="event-type"
              className="text-xs font-bold uppercase text-[var(--splifft-ink-soft)]"
            >
              Event type
            </label>
            <input
              id="event-type"
              name="eventType"
              required
              placeholder="Wedding, rooftop, brand night, etc."
              className="mt-1 w-full rounded-xl border-2 border-black/15 bg-white px-3 py-3 text-[var(--splifft-ink)]"
            />
          </div>
          <div>
            <label
              htmlFor="guests"
              className="text-xs font-bold uppercase text-[var(--splifft-ink-soft)]"
            >
              Guest count
            </label>
            <input
              id="guests"
              name="guests"
              type="number"
              min={1}
              required
              placeholder="Approximate headcount"
              className="mt-1 w-full rounded-xl border-2 border-black/15 bg-white px-3 py-3 text-[var(--splifft-ink)]"
            />
          </div>
          <div>
            <label
              htmlFor="date"
              className="text-xs font-bold uppercase text-[var(--splifft-ink-soft)]"
            >
              Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              className="mt-1 w-full rounded-xl border-2 border-black/15 bg-white px-3 py-3 text-[var(--splifft-ink)]"
            />
          </div>
          <div>
            <label
              htmlFor="location"
              className="text-xs font-bold uppercase text-[var(--splifft-ink-soft)]"
            >
              Location / venue
            </label>
            <input
              id="location"
              name="location"
              required
              placeholder="City, venue name, load-in notes"
              className="mt-1 w-full rounded-xl border-2 border-black/15 bg-white px-3 py-3 text-[var(--splifft-ink)]"
            />
          </div>
        </div>
        <SplifftButton type="submit" variant="primary" className="mt-8 w-full">
          Request custom quote
        </SplifftButton>
      </form>

      <div>
        <h2 className="font-[family-name:var(--font-display)] text-2xl uppercase text-[var(--splifft-cream)]">
          Add-ons & upsells
        </h2>
        <p className="mt-2 text-sm text-[var(--splifft-muted)]">
          Select what you want quoted — still no dollar amounts until we talk.
        </p>
        <ul className="mt-6 space-y-3">
          {eventUpsells.map((u) => (
            <li key={u.id}>
              <label className="flex cursor-pointer gap-3 rounded-xl border-2 border-white/10 bg-black/35 p-4 has-[:checked]:border-[var(--splifft-pink)]">
                <input
                  type="checkbox"
                  checked={upsells.has(u.id)}
                  onChange={() => toggle(u.id)}
                  className="mt-1 size-5 accent-[var(--splifft-pink)]"
                />
                <span>
                  <span className="font-semibold text-[var(--splifft-cream)]">
                    {u.label}
                  </span>
                  <span className="mt-1 block text-sm text-[var(--splifft-muted)]">
                    {u.description}
                  </span>
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
