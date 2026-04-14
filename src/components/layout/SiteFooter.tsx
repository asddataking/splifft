import Image from "next/image";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

const explore = [
  { href: "/shop", label: "Shop Packs" },
  { href: "/shop#the-vault", label: "The Vault" },
  { href: "/services/events", label: "Events" },
  { href: "/blog", label: "Blog" },
  { href: "/press", label: "Press" },
  { href: "/cart", label: "Cart" },
] as const;

const service = [
  { href: "/club", label: "The Club" },
  { href: "/locations", label: "Locations & areas" },
  { href: "/services/events", label: "Event quotes" },
  { href: "/our-team", label: "Our Team" },
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
              Stop rolling. Start smoking. Join the Club, save on every pack, and
              unlock themed boxes in The Vault.
            </p>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-[var(--splifft-blue)]">
              Michigan · We pull up
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
                    Questions? Join the Club or request a Splifft Events quote.
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
            Built for your smoke
          </p>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-[var(--splifft-muted)]">
          <span className="font-semibold text-[var(--splifft-cream)]/85">
            Social
          </span>
          <span>/</span>
          <a
            href="https://www.instagram.com/getsplifft/"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--splifft-pink)] hover:underline"
          >
            @getsplifft
          </a>
          <span>/</span>
          <a
            href="https://www.facebook.com/profile.php?id=61572115349869"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--splifft-pink)] hover:underline"
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}
