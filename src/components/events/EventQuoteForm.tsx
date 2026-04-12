"use client";

import { useState } from "react";
import { eventUpsells } from "@/lib/data";
import { SplifftButton } from "@/components/ui/SplifftButton";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function EventQuoteForm() {
  const [upsells, setUpsells] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);

  function toggle(id: string) {
    setUpsells((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const eventType = String(fd.get("eventType") ?? "").trim();
    const guests = Number(fd.get("guests"));
    const eventDate = String(fd.get("date") ?? "");
    const location = String(fd.get("location") ?? "").trim();

    setSaving(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.from("event_quote_requests").insert({
        event_type: eventType,
        guest_count: guests,
        event_date: eventDate,
        venue_location: location,
        upsell_ids: Array.from(upsells),
      });
      if (error) throw error;
      form.reset();
      setUpsells(new Set());
      alert(
        "Quote request sent. We will follow up with a custom proposal — no pricing until we talk.",
      );
    } catch {
      alert(
        "Could not send quote request. Check your connection or try again shortly.",
      );
    } finally {
      setSaving(false);
    }
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
        <SplifftButton
          type="submit"
          variant="primary"
          className="mt-8 w-full"
          disabled={saving}
        >
          {saving ? "Sending…" : "Request custom quote"}
        </SplifftButton>
      </form>

      <div>
        <h2 className="font-[family-name:var(--font-display)] text-2xl uppercase text-[var(--splifft-cream)]">
          Optional sesh upgrades
        </h2>
        <p className="mt-2 text-sm text-[var(--splifft-muted)]">
          Guest-ready curated drops and other extras — fold into your custom quote.
          No dollar amounts here; every event is different.
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
