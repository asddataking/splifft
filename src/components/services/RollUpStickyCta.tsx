"use client";

import Link from "next/link";

/** Fixed mobile CTA — desktop users use in-page buttons. */
export function RollUpStickyCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t-2 border-black bg-[var(--splifft-ink)]/95 p-3 backdrop-blur-md md:hidden">
      <Link
        href="#book-roll-up"
        className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[var(--splifft-pink)] text-center text-base font-bold text-black shadow-[0_0_0_2px_rgba(255,45,146,0.35)]"
      >
        Book Roll Up
      </Link>
    </div>
  );
}
