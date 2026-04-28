"use client";

import { ClubWaitlistCapture } from "@/components/club/ClubWaitlistCapture";
import { SplifftButton } from "@/components/ui/SplifftButton";

export function ClubJoinCard() {
  return (
    <div className="rounded-2xl border-2 border-black bg-[var(--splifft-card)] p-8 shadow-[10px_10px_0_0_rgba(0,191,255,0.4)]">
      <p className="text-sm font-bold uppercase tracking-wider text-[var(--splifft-ink-soft)]">
        Monthly Access pricing
      </p>
      <p className="mt-2 font-[family-name:var(--font-display)] text-6xl text-[var(--splifft-ink)]">
        $60
        <span className="text-2xl font-sans font-semibold text-[var(--splifft-ink-soft)]">
          /month
        </span>
      </p>
      <p className="mt-4 text-sm text-[var(--splifft-ink-soft)]">
        Your 5-pack, ready before the session starts. Includes first access to
        limited drops and future collabs.
      </p>
      <div className="mt-8 border-t-2 border-dashed border-black/15 pt-8">
        <p className="text-sm font-bold uppercase tracking-wider text-[var(--splifft-ink)]">
          Monthly Access list
        </p>
        <ClubWaitlistCapture surface="club_page" idPrefix="club-page" />
      </div>
      <SplifftButton href="/shop" variant="ghost" className="mt-6 w-full">
        Buy One Pack →
      </SplifftButton>
    </div>
  );
}
