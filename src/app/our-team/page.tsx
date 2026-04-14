import Image from "next/image";
import { buildPageMetadata, SOCIAL_SHARE_DESCRIPTION } from "@/lib/site";

export const metadata = buildPageMetadata({
  path: "/our-team",
  title: "Our Team",
  description:
    "Meet Shaggy Rolls, our Chief Roller in Charge at Splifft.",
  shareDescription: SOCIAL_SHARE_DESCRIPTION,
});

export default function OurTeamPage() {
  return (
    <div className="flex-1 bg-[#0a0a0c] py-14 sm:py-18">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--splifft-blue)]">
          Our Team
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl uppercase text-[var(--splifft-cream)] sm:text-5xl">
          Chief Roller in Charge
        </h1>
        <p className="mt-4 text-lg text-[var(--splifft-muted)]">
          Meet <span className="font-semibold text-[var(--splifft-cream)]">Shaggy Rolls</span>.
        </p>

        <section className="mt-8 grid gap-6 rounded-2xl border-2 border-black bg-[var(--splifft-card)] p-6 shadow-[8px_8px_0_0_rgba(0,191,255,0.3)] sm:grid-cols-[1.4fr_1fr] sm:p-8">
          <div className="overflow-hidden rounded-xl border border-black/10">
            <Image
              src="/team-shaggy-rolling.png"
              alt="Shaggy Rolls hand-rolling at the prep table"
              width={768}
              height={1024}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="flex flex-col justify-between gap-5">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-black/20 p-3">
              <Image
                src="/team-shaggy-logo.png"
                alt="Shaggy Rolls logo"
                width={512}
                height={512}
                className="mx-auto h-auto w-full max-w-[220px] object-contain"
              />
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-[var(--splifft-muted)]">
                Instagram
              </p>
              <a
                href="https://instagram.com/shaggy_hashco"
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-block text-lg font-semibold text-[var(--splifft-pink)] underline-offset-4 hover:underline"
              >
                @shaggy_hashco
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
