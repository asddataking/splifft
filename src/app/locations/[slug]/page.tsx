import Link from "next/link";
import { notFound } from "next/navigation";
import { locations } from "@/lib/data";
import { SplifftButton } from "@/components/ui/SplifftButton";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) return { title: "Location | Splifft" };
  return {
    title: `${loc.name} service area | Splifft`,
    description: loc.blurb,
  };
}

export default async function LocationCityPage({ params }: Props) {
  const { slug } = await params;
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) notFound();

  return (
    <div className="flex-1">
      <article className="border-b-2 border-black bg-[#0a0a0c] py-14 sm:py-18">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link
            href="/locations"
            className="text-sm font-semibold text-[var(--splifft-pink)] hover:underline"
          >
            ← All locations
          </Link>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl uppercase text-[var(--splifft-cream)] sm:text-5xl">
            {loc.name}
          </h1>
          <p className="mt-4 text-lg text-[var(--splifft-muted)]">{loc.blurb}</p>
          {loc.neighborhoods ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {loc.neighborhoods.map((n) => (
                <li
                  key={n}
                  className="rounded-full border border-[var(--splifft-blue)]/40 px-3 py-1 text-sm text-[var(--splifft-cream)]"
                >
                  {n}
                </li>
              ))}
            </ul>
          ) : null}
          <SplifftButton href="/services" variant="primary" className="mt-8">
            Book in {loc.name}
          </SplifftButton>
        </div>
      </article>
    </div>
  );
}
