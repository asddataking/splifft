import Link from "next/link";
import { buildPageMetadata, SOCIAL_SHARE_DESCRIPTION } from "@/lib/site";

export const metadata = buildPageMetadata({
  path: "/blog",
  title: "Blog",
  description: "Splifft blog: simple smoke tips, product stories, and Monthly Access updates.",
  shareDescription: SOCIAL_SHARE_DESCRIPTION,
});

export default function BlogPage() {
  return (
    <div className="flex-1 bg-[#0a0a0c] py-14 sm:py-18">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--splifft-blue)]">
          Blog
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl uppercase text-[var(--splifft-cream)] sm:text-5xl">
          Splifft Stories
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--splifft-muted)]">
          Straight smoke tips. No fluff.
        </p>

        <article className="mt-8 rounded-2xl border-2 border-black bg-[var(--splifft-card)] p-6 shadow-[8px_8px_0_0_rgba(255,45,146,0.3)]">
          <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-ink)]">
            Stop the Side-Burn
          </h2>
          <p className="mt-2 text-sm text-[var(--splifft-ink-soft)]">
            Why your joints burn wrong and how we fixed it.
          </p>
          <Link
            href="/blog/why-joints-burn-uneven-michigan"
            className="mt-4 inline-block text-sm font-bold uppercase tracking-wide text-[var(--splifft-pink)] underline-offset-4 hover:underline"
          >
            Read article →
          </Link>
        </article>
      </div>
    </div>
  );
}
