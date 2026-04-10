"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/cart-context";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/services", label: "Services" },
  { href: "/events", label: "Events" },
  { href: "/locations", label: "Locations" },
  { href: "/club", label: "Club" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b-2 border-black/40 bg-[var(--splifft-ink)]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-[var(--splifft-cream)] sm:text-3xl"
        >
          SPLIFFT
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-[var(--splifft-pink)] text-black"
                    : "text-[var(--splifft-cream)] hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="relative inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border-2 border-[var(--splifft-blue)] bg-black/30 px-3 font-semibold text-[var(--splifft-cream)] transition hover:bg-[var(--splifft-blue)]/15"
            aria-label={`Cart, ${itemCount} items`}
          >
            Cart
            {itemCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--splifft-pink)] px-1 text-xs font-bold text-black">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            ) : null}
          </Link>
        </div>
      </div>

      <div className="border-t border-white/5 md:hidden">
        <nav className="flex max-w-6xl flex-wrap gap-1 px-2 py-2 sm:px-4">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                  active
                    ? "bg-[var(--splifft-pink)] text-black"
                    : "text-[var(--splifft-cream)]/90"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
