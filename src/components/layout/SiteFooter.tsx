import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t-2 border-black/50 bg-[var(--splifft-ink)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        <div>
          <p className="font-[family-name:var(--font-display)] text-3xl text-[var(--splifft-cream)]">
            SPLIFFT
          </p>
          <p className="mt-2 max-w-sm text-sm text-[var(--splifft-muted)]">
            Stop Rolling. Start Smoking. Roll Up & Fresh Hit in the Roll Wagon —
            food-truck energy, appointment-level booking, quick handoff ready to
            smoke.
          </p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-[var(--splifft-blue)]">
            Pull up online
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                className="text-[var(--splifft-cream)] underline decoration-[var(--splifft-pink)] underline-offset-4 hover:text-white"
                href="https://getsplifft.com"
              >
                getsplifft.com
              </a>
            </li>
            <li>
              <Link
                href="/locations"
                className="text-[var(--splifft-cream)] hover:text-white"
              >
                Service areas
              </Link>
            </li>
            <li>
              <Link
                href="/club"
                className="text-[var(--splifft-cream)] hover:text-white"
              >
                Splifft Club
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-[var(--splifft-pink)]">
            Menu
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/shop" className="text-[var(--splifft-cream)]">
                Shop packs
              </Link>
            </li>
            <li>
              <Link href="/services#roll-up" className="text-[var(--splifft-cream)]">
                Roll Up
              </Link>
            </li>
            <li>
              <Link href="/events" className="text-[var(--splifft-cream)]">
                Events
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-[var(--splifft-muted)]">
        © {new Date().getFullYear()} Splifft. Mock storefront — replace with live
        checkout when ready.
      </div>
    </footer>
  );
}
