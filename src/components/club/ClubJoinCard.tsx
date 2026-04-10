"use client";

import { SplifftButton } from "@/components/ui/SplifftButton";

export function ClubJoinCard() {
  return (
    <div className="rounded-2xl border-2 border-black bg-[var(--splifft-card)] p-8 shadow-[10px_10px_0_0_rgba(0,191,255,0.4)]">
      <p className="text-sm font-bold uppercase tracking-wider text-[var(--splifft-ink-soft)]">
        Example pricing
      </p>
      <p className="mt-2 font-[family-name:var(--font-display)] text-6xl text-[var(--splifft-ink)]">
        $9
        <span className="text-2xl font-sans font-semibold text-[var(--splifft-ink-soft)]">
          /month
        </span>
      </p>
      <p className="mt-4 text-sm text-[var(--splifft-ink-soft)]">
        Placeholder — connect billing when you launch. Members get Roll Up
        pricing, priority times, VIP scheduling, and upgrade perks.
      </p>
      <SplifftButton
        variant="primary"
        className="mt-8 w-full"
        onClick={() => alert("Membership checkout — wire your provider.")}
      >
        Join Splifft Club
      </SplifftButton>
      <SplifftButton href="/services/roll-up" variant="ghost" className="mt-3 w-full">
        Book Roll Up with Club slots
      </SplifftButton>
    </div>
  );
}
