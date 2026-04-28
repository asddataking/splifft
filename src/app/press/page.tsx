import Image from "next/image";
import { buildPageMetadata, SOCIAL_SHARE_DESCRIPTION } from "@/lib/site";

export const metadata = buildPageMetadata({
  path: "/press",
  title: "Press Room",
  description:
    "Splifft press room with brand story and high-res logo files.",
  shareDescription: SOCIAL_SHARE_DESCRIPTION,
});

export default function PressPage() {
  return (
    <div className="flex-1 bg-[#0a0a0c] py-14 sm:py-18">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--splifft-blue)]">
          Press Room
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl uppercase text-[var(--splifft-cream)] sm:text-5xl">
          Splifft Media
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--splifft-muted)]">
          We make smoking easier. People get Monthly Access, save on packs, and get
          ready to smoke without rolling.
        </p>

        <section className="mt-8 grid gap-6 rounded-2xl border-2 border-black bg-[var(--splifft-card)] p-6 shadow-[8px_8px_0_0_rgba(255,45,146,0.28)] sm:grid-cols-[1fr_1.2fr] sm:p-8">
          <div className="overflow-hidden rounded-xl border border-black/10 bg-black/5 p-4">
            <Image
              src="/press-logo-highres.png"
              alt="Splifft high resolution logo"
              width={1024}
              height={1024}
              className="mx-auto h-auto w-full max-w-[320px] object-contain"
              priority
            />
            <a
              href="/press-logo-highres.png"
              download
              className="mt-4 inline-block text-sm font-semibold text-[var(--splifft-pink)] underline-offset-4 hover:underline"
            >
              Download high-res logo
            </a>
          </div>
          <article className="rounded-xl border border-white/10 bg-black/30 p-5">
            <h2 className="font-[family-name:var(--font-display)] text-2xl uppercase text-[var(--splifft-cream)]">
              Brand story
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--splifft-muted)]">
              Splifft started with one simple idea: smoking should be easy. A lot of
              people want to light up, but they do not want to spend time rolling.
              We fix that.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--splifft-muted)]">
              We sell premium packs and themed boxes. Monthly Access helps people save
              money fast. We also offer premium event quotes for parties.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--splifft-muted)]">
              The goal is simple: stop rolling, start smoking, and enjoy better
              sessions with less work.
            </p>
          </article>
        </section>
      </div>
    </div>
  );
}
