"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home" },
  { href: "/monthly-access", label: "Monthly Access" },
  { href: "/shop", label: "Shop Packs" },
  { href: "/cart", label: "Cart" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  const linkClass = (active: boolean) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition ${
      active
        ? "bg-[var(--splifft-pink)] text-black"
        : "text-[var(--splifft-cream)] hover:bg-white/5"
    }`;

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-black/40 bg-[var(--splifft-ink)]/95 backdrop-blur-md">
      <div className="relative mx-auto max-w-6xl px-4 py-3 sm:px-6 md:py-4">
        <div className="hidden items-center justify-center gap-6 md:flex">
          <Link
            href="/"
            className="shrink-0 transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--splifft-blue)]"
            aria-label="Splifft home"
          >
            <Image
              src="/splifftlogo.png"
              alt="Splifft"
              width={420}
              height={126}
              className="h-12 w-auto lg:h-14"
              priority
            />
          </Link>
          <nav className="flex flex-wrap items-center justify-center gap-1" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={linkClass(isActive(item.href))}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex justify-center md:hidden">
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
                aria-current={active ? "page" : undefined}
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
