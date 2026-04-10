import Image from "next/image";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

const explore = [
  { href: "/shop", label: "Shop packs" },
  { href: "/services", label: "Services" },
  { href: "/services/events", label: "Events" },
  { href: "/cart", label: "Cart" },
] as const;

const service = [
  { href: "/services/roll-up", label: "Roll Up" },
  { href: "/services/fresh-hit", label: "Fresh Hit" },
  { href: "/locations", label: "Locations & areas" },
  { href: "/club", label: "Splifft Club" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden border-t-2 border-black bg-[#0a0a0c]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--splifft-pink)] to-transparent opacity-80"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-[var(--splifft-pink)]/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-32 h-72 w-72 rounded-full bg-[var(--splifft-blue)]/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col items-center text-center lg:col-span-5 lg:items-start lg:text-left">
            <Link
              href="/"
              className="inline-block transition hover:opacity-90"
              aria-label="Splifft home"
            >
              <Image
                src="/splifftlogo.png"
                alt="Splifft"
                width={200}
                height={60}
                className="h-11 w-auto sm:h-12"
              />
            </Link>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--splifft-muted)]">
              Stop rolling. Start smoking. Roll Up, Fresh Hit, packs, and events
              — mobile handoff, curated extras, easier seshes without the scramble.
            </p>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-[var(--splifft-blue)]">
              Michigan · Mobile handoff energy
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7 lg:justify-items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--splifft-pink)]">
                Explore
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                {explore.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[var(--splifft-cream)] transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--splifft-blue)]">
                Book &amp; visit
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                {service.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[var(--splifft-cream)] transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--splifft-cream)]/80">
                Connect
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href={SITE_URL}
                    className="text-[var(--splifft-cream)] underline decoration-[var(--splifft-pink)]/60 underline-offset-4 transition hover:decoration-[var(--splifft-pink)] hover:text-white"
                  >
                    getsplifft.com
                  </a>
                </li>
                <li>
                  <span className="text-[var(--splifft-muted)]">
                    Questions? Book Roll Up or request an event quote from the
                    site — we pull up for a quick handoff.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:gap-6">
          <p className="text-center text-xs text-[var(--splifft-muted)] sm:text-left">
            © {year} Splifft. Mock checkout until your processor is wired.
          </p>
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--splifft-muted)]/70">
            Built for the sesh
          </p>
        </div>
      </div>
    </footer>
  );
}
