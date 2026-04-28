"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/checkout", label: "Checkout" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  const linkClass = (active: boolean) =>
    `px-1 text-sm font-bold uppercase tracking-[0.08em] text-white transition ${
      active ? "opacity-100" : "opacity-85 hover:opacity-100"
    }`;

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b-2 border-black/40 bg-[var(--splifft-ink)]/95 backdrop-blur-md">
      <div className="relative mx-auto max-w-6xl px-4 py-3 sm:px-6 md:py-4">
        <div className="hidden items-center justify-center gap-8 md:flex">
          <nav className="flex items-center gap-3" aria-label="Primary left links">
            {nav.slice(0, 2).map((item, index) => (
              <div key={item.href} className="flex items-center gap-3">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={linkClass(isActive(item.href))}
                >
                  {item.label}
                </Link>
                {index < 1 ? <span className="text-sm font-bold text-white/80">|</span> : null}
              </div>
            ))}
          </nav>

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

          <nav className="flex items-center gap-3" aria-label="Primary right links">
            {nav.slice(2).map((item, index) => (
              <div key={item.href} className="flex items-center gap-3">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={linkClass(isActive(item.href))}
                >
                  {item.label}
                </Link>
                {index < 1 ? <span className="text-sm font-bold text-white/80">|</span> : null}
              </div>
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
          className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2 px-2 py-2 sm:px-4"
          aria-label="Mobile"
        >
          {nav.map((item, index) => {
            const active = isActive(item.href);
            return (
              <div key={item.href} className="flex items-center gap-2">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-[11px] font-bold uppercase tracking-[0.07em] text-white ${
                    active ? "opacity-100" : "opacity-85"
                  }`}
                >
                  {item.label}
                </Link>
                {index < nav.length - 1 ? <span className="text-[11px] font-bold text-white/80">|</span> : null}
              </div>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
