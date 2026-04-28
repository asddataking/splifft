"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/cart-context";

const nav = [
  { href: "/", label: "Home" },
  { href: "/monthly-access", label: "Monthly Access" },
  { href: "/shop", label: "Shop Packs" },
  { href: "/shop#the-vault", label: "The Vault" },
  { href: "/services/events", label: "Events" },
] as const;

/** Items to the left of the logo (desktop). */
const NAV_LEFT = nav.slice(0, 3);
/** Items to the right of the logo (desktop). */
const NAV_RIGHT = nav.slice(3);

const cartButtonClass =
  "relative inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border-2 border-[var(--splifft-blue)] bg-black/40 px-3 font-semibold text-[var(--splifft-cream)] shadow-[0_0_0_1px_rgba(0,191,255,0.2)] transition hover:bg-[var(--splifft-blue)]/15";

function CartButton({ className }: { className?: string }) {
  const { itemCount } = useCart();
  return (
    <Link
      href="/cart"
      className={[cartButtonClass, className].filter(Boolean).join(" ")}
      aria-label={`Cart, ${itemCount} items`}
    >
      Cart
      {itemCount > 0 ? (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--splifft-pink)] px-1 text-xs font-bold text-black">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      ) : null}
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  const linkClass = (active: boolean) =>
    `rounded-lg px-2.5 py-2 text-sm font-semibold transition lg:px-3 ${
      active
        ? "bg-[var(--splifft-pink)] text-black"
        : "text-[var(--splifft-cream)] hover:bg-white/5"
    }`;

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-black/40 bg-[var(--splifft-ink)]/95 backdrop-blur-md">
      <div className="relative mx-auto max-w-6xl px-4 py-3 sm:px-6 md:py-4">
        <CartButton className="absolute right-4 top-1/2 z-10 -translate-y-1/2 md:hidden sm:right-6" />

        {/* Desktop: nav — logo — nav + cart */}
        <div className="hidden items-center md:grid md:grid-cols-[1fr_auto_1fr] md:gap-4 lg:gap-6">
          <nav
            className="flex flex-wrap items-center justify-end gap-0.5 lg:gap-1"
            aria-label="Primary left"
          >
            {NAV_LEFT.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={linkClass(isActive(item.href))}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/"
            className="relative z-[1] mx-auto shrink-0 px-2 transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--splifft-blue)] lg:px-4"
            aria-label="Splifft home"
          >
            <Image
              src="/splifftlogo.png"
              alt="Splifft"
              width={420}
              height={126}
              className="h-[3.25rem] w-auto sm:h-14 lg:h-[4.5rem] xl:h-[5rem]"
              priority
            />
          </Link>

          <div className="flex flex-wrap items-center justify-start gap-2 lg:gap-3">
            <nav
              className="flex flex-wrap items-center gap-0.5 lg:gap-1"
              aria-label="Primary right"
            >
              {NAV_RIGHT.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={linkClass(isActive(item.href))}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <CartButton className="shrink-0" />
          </div>
        </div>

        {/* Mobile: larger logo centered */}
        <div className="flex justify-center pr-14 md:hidden sm:pr-16">
          <Link
            href="/"
            className="block transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--splifft-blue)]"
            aria-label="Splifft home"
          >
            <Image
              src="/splifftlogo.png"
              alt="Splifft"
              width={420}
              height={126}
              className="h-[3.75rem] w-auto sm:h-16"
              priority
            />
          </Link>
        </div>
      </div>

      <div className="border-t border-white/5 md:hidden">
        <nav
          className="mx-auto flex max-w-6xl flex-wrap justify-center gap-1 px-2 py-2 sm:px-4"
          aria-label="Mobile"
        >
          {nav.map((item) => {
            const active = isActive(item.href);
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
      <div className="fixed bottom-3 left-0 right-0 z-50 px-3 md:hidden">
        <Link
          href="/monthly-access"
          className="mx-auto flex min-h-[48px] w-full max-w-sm items-center justify-center rounded-xl border-2 border-black bg-[var(--splifft-pink)] px-4 py-3 text-sm font-extrabold uppercase tracking-wide text-black shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
        >
          Get Monthly Access
        </Link>
      </div>
    </header>
  );
}
