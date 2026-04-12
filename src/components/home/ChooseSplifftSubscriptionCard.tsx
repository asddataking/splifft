"use client";

import Link from "next/link";
import { SplifftButton } from "@/components/ui/SplifftButton";
import { chooseSplifftCards } from "@/lib/marketing";
import { useSubscriptionModal } from "@/components/home/SubscriptionModalProvider";

const actionCardClass =
  "group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl border-2 border-black bg-gradient-to-br p-6 shadow-[6px_6px_0_0_rgba(0,0,0,0.65)] transition-all duration-300 ease-out motion-safe:transition-[transform,box-shadow,border-color] motion-reduce:transition-none hover:-translate-y-1 hover:border-[var(--splifft-pink)]/35 hover:shadow-[10px_10px_0_0_rgba(255,45,146,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--splifft-pink)]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--splifft-ink)] active:scale-[0.99] motion-reduce:active:scale-100";

export function ChooseSplifftSubscriptionCard() {
  const { openSubscriptionModal } = useSubscriptionModal();
  const c = chooseSplifftCards[0]!;

  return (
    <div className={`${actionCardClass} ${c.stripe}`}>
      <div>
        <h3 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-cream)]">
          {c.title}
        </h3>
        <p className="mt-3 text-sm text-[var(--splifft-muted)]">{c.body}</p>
        <ul className="mt-4 list-none space-y-1.5 text-sm font-medium text-[var(--splifft-cream)]/90">
          {c.bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="text-[var(--splifft-pink)]">•</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        <SplifftButton
          type="button"
          variant="primary"
          className="w-full sm:w-auto"
          onClick={openSubscriptionModal}
        >
          {c.cta}
        </SplifftButton>
        <Link
          href={c.href}
          className="text-center text-xs font-bold uppercase tracking-wide text-[var(--splifft-blue)] underline-offset-4 hover:underline sm:text-left"
        >
          View details →
        </Link>
      </div>
    </div>
  );
}
