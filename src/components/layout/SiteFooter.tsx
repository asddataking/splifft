import Image from "next/image";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

const explore = [
  { href: "/", label: "Home" },
  { href: "/checkout?plan=monthly_access", label: "Monthly Access" },
  { href: "/shop", label: "Browse Packs" },
  { href: "/cart", label: "Cart" },
] as const;

const service = [
  { href: "/monthly-access", label: "Monthly Access" },
  { href: "/locations", label: "Locations & areas" },
  { href: "/services/events", label: "Event quotes" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();
  const instagramUrl = "https://www.instagram.com/getsplifft/";
  const facebookUrl = "https://www.facebook.com/profile.php?id=61572115349869";

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
              Stop rolling. Start smoking. Get Monthly Access for premium 5-packs
              and easy session-ready delivery.
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
                    Questions? Get Monthly Access, buy a One-Time Pack, or request
                    a Splifft Events quote.
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

        <div className="mt-8 rounded-2xl border border-white/10 bg-black/25 p-4 sm:p-5">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--splifft-blue)]">
            Social Breadcrumbs
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[var(--splifft-pink)]/45 px-3 py-1.5 font-semibold text-[var(--splifft-pink)] transition hover:bg-[var(--splifft-pink)]/12"
            >
              Instagram / @getsplifft
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[var(--splifft-blue)]/45 px-3 py-1.5 font-semibold text-[var(--splifft-blue)] transition hover:bg-[var(--splifft-blue)]/12"
            >
              Facebook / Splifft
            </a>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-[linear-gradient(140deg,rgba(255,45,146,0.08),rgba(0,191,255,0.08))] p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--splifft-cream)]">
              Latest On Instagram
            </p>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-[var(--splifft-pink)] hover:underline"
            >
              View Profile →
            </a>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
            {[
              "/events-brand-rooftop.jpg",
              "/events-private-parties.jpg",
              "/events-weddings-milestones.jpg",
            ].map((src) => (
              <a
                key={src}
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open Splifft Instagram profile"
                className="group relative block aspect-square overflow-hidden rounded-xl border border-white/10"
              >
                <Image
                  src={src}
                  alt="Latest Splifft Instagram preview"
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 33vw, 180px"
                />
                <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
