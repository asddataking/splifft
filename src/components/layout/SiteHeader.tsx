"use client";

import Image from "next/image";
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

  const linkClass = (active: boolean) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition ${
      active
        ? "bg-[var(--splifft-pink)] text-black"
        : "text-[var(--splifft-cream)] hover:bg-white/5"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b-2 border-black/40 bg-[var(--splifft-ink)]/95 backdrop-blur-md">
      <div className="relative mx-auto max-w-6xl px-4 py-3 sm:px-6">
        <Link
          href="/cart"
          className="absolute right-4 top-1/2 z-10 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-xl border-2 border-[var(--splifft-blue)] bg-black/40 px-3 font-semibold text-[var(--splifft-cream)] shadow-[0_0_0_1px_rgba(0,191,255,0.2)] transition hover:bg-[var(--splifft-blue)]/15 sm:right-6"
          aria-label={`Cart, ${itemCount} items`}
        >
          Cart
          {itemCount > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--splifft-pink)] px-1 text-xs font-bold text-black">
              {itemCount > 9 ? "9+" : itemCount}
            </span>
          ) : null}
        </Link>

        <div className="flex flex-col items-center gap-3 pr-14 sm:pr-16 md:flex-row md:justify-center md:gap-10 md:pr-20">
          <Link
            href="/"
            className="relative block shrink-0 transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--splifft-blue)]"
            aria-label="Splifft home"
          >
            <Image
              src="/splifftlogo.png"
              alt="Splifft"
              width={180}
              height={54}
              className="h-9 w-auto sm:h-10"
              priority
            />
          </Link>

          <nav className="hidden flex-wrap items-center justify-center gap-1 md:flex">
            {nav.map((item) => {
              const active =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={linkClass(active)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="border-t border-white/5 md:hidden">
        <nav className="mx-auto flex max-w-6xl flex-wrap justify-center gap-1 px-2 py-2 sm:px-4">
          {nav.map((item) => {
            const active =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);
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
