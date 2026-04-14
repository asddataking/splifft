import Link from "next/link";
import { locations } from "@/lib/data";
import { SplifftButton } from "@/components/ui/SplifftButton";
import { buildPageMetadata, SOCIAL_SHARE_DESCRIPTION } from "@/lib/site";

export const metadata = buildPageMetadata({
  path: "/locations",
  title: "Locations & service areas",
  description:
    "Where Splifft pulls up — Port Huron, Detroit, Ann Arbor, Macomb County and expanding.",
  shareDescription: SOCIAL_SHARE_DESCRIPTION,
});

export default function LocationsPage() {
  return (
    <div className="flex-1">
      <article className="border-b-2 border-black bg-[#0a0a0c] py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--splifft-pink)]">
            Locations
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl uppercase text-[var(--splifft-cream)] sm:text-5xl">
            Where we pull up
          </h1>
          <p className="mt-4 max-w-2xl text-[var(--splifft-muted)]">
            SEO-friendly structure: each area can grow into its own city page
            under{" "}
            <code className="rounded bg-black/50 px-1 text-[var(--splifft-blue)]">
              /locations/[city]
            </code>{" "}
            when you are ready to scale content.
          </p>
        </div>
      </article>

      <section className="bg-[#101018] py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="sr-only">Service areas</h2>
          <ul className="grid gap-6 md:grid-cols-2">
            {locations.map((loc) => (
              <li key={loc.slug}>
                <article className="h-full rounded-2xl border-2 border-black bg-[var(--splifft-card)] p-6 shadow-[6px_6px_0_0_rgba(255,45,146,0.35)]">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl uppercase text-[var(--splifft-ink)]">
                    {loc.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--splifft-ink-soft)]">
                    {loc.blurb}
                  </p>
                  {loc.neighborhoods ? (
                    <div className="mt-4">
                      <p className="text-xs font-bold uppercase text-[var(--splifft-ink-soft)]">
                        Neighborhoods / notes
                      </p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {loc.neighborhoods.map((n) => (
                          <li
                            key={n}
                            className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-[var(--splifft-ink)]"
                          >
                            {n}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  <p className="mt-4 text-xs text-[var(--splifft-ink-soft)]">
                    City page:{" "}
                    <Link
                      href={`/locations/${loc.slug}`}
                      className="font-medium text-[var(--splifft-pink)] underline-offset-4 hover:underline"
                    >
                      /locations/{loc.slug}
                    </Link>
                  </p>
                </article>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border-2 border-[var(--splifft-blue)]/50 bg-black/35 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-[var(--splifft-cream)]">
                Not sure we service your block yet?
              </p>
              <p className="mt-1 text-sm text-[var(--splifft-muted)]">
                Drop a line — we expand routes based on demand.
              </p>
            </div>
            <SplifftButton href="/services/events" variant="secondary">
              Request Event Quote
            </SplifftButton>
          </div>
        </div>
      </section>
    </div>
  );
}
