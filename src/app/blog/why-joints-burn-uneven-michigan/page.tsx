import Link from "next/link";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  path: "/blog/why-joints-burn-uneven-michigan",
  title: "Why Joints Burn Uneven in Michigan",
  description:
    "Tired of your joints canoeing? Learn why your smoke burns down one side and how Splifft's hand-rolled 5-packs fix the problem. The smartest way to smoke in Detroit.",
});

export default function BlogArticlePage() {
  return (
    <div className="flex-1 bg-[#0a0a0c] py-14 sm:py-18">
      <article className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--splifft-blue)]">
          Blog
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl uppercase leading-tight text-[var(--splifft-cream)] sm:text-5xl">
          Stop the Side-Burn: Why Your Joints Burn Wrong (and How We Fixed It)
        </h1>

        <div className="mt-8 space-y-5 text-[var(--splifft-muted)]">
          <p>
            Have you ever lit a joint, taken a puff, and noticed it’s only burning
            down one side?
          </p>
          <p>
            In Michigan, we call that &quot;Canoeing.&quot; It looks like a canoe, it wastes
            your weed, and it tastes bad. It’s the number one thing that ruins a
            good smoke.
          </p>

          <h2 className="pt-3 font-[family-name:var(--font-display)] text-2xl uppercase text-[var(--splifft-cream)]">
            Why does this happen?
          </h2>
          <p>There are three main reasons your joints burn wrong:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong className="text-[var(--splifft-cream)]">Air Pockets:</strong>{" "}
              If the weed isn&apos;t packed tight enough, air gets stuck. One side burns
              fast, and the other side stays cold.
            </li>
            <li>
              <strong className="text-[var(--splifft-cream)]">Cheap Papers:</strong>{" "}
              Some papers are too thick or have too much glue. This makes them burn
              unevenly.
            </li>
            <li>
              <strong className="text-[var(--splifft-cream)]">Bad Rolling:</strong>{" "}
              If the joint is loose near the filter but tight at the top, it’s going
              to burn sideways.
            </li>
          </ul>

          <h2 className="pt-3 font-[family-name:var(--font-display)] text-2xl uppercase text-[var(--splifft-cream)]">
            How Splifft fixed the problem
          </h2>
          <p>
            We got tired of wasting weed. That’s why we built the Splifft Pack. We
            don’t use machines that shake the weed into a cone. We do it better.
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong className="text-[var(--splifft-cream)]">
                Hand-Rolled by Pros:
              </strong>{" "}
              Every Splifft joint is rolled by a human who knows exactly how much
              pressure to use. No air pockets. No soft spots.
            </li>
            <li>
              <strong className="text-[var(--splifft-cream)]">
                Premium Papers:
              </strong>{" "}
              We only use thin, high-quality papers. They stay out of the way so you
              only taste the flower.
            </li>
            <li>
              <strong className="text-[var(--splifft-cream)]">
                The Perfect Pack:
              </strong>{" "}
              Our joints are tight enough to burn slow, but loose enough to pull
              easy.
            </li>
          </ul>

          <h2 className="pt-3 font-[family-name:var(--font-display)] text-2xl uppercase text-[var(--splifft-cream)]">
            The smartest way to smoke
          </h2>
          <p>
            You shouldn&apos;t have to be a master at rolling just to enjoy your weekend.
            You shouldn&apos;t have to keep re-lighting your joint because it’s canoeing.
          </p>
          <p>
            When you join the Splifft Club, you get a pack of 5 perfect joints
            delivered to your door. They burn straight, they last long, and they
            save you money.
          </p>
          <p>
            Stop fighting your fire. Join the Club for $7 and get the best-rolled
            packs in Michigan for $60.
          </p>
        </div>

        <div className="mt-8">
          <Link
            href="/club"
            className="inline-flex min-h-[48px] items-center rounded-xl border-2 border-black bg-[var(--splifft-pink)] px-5 py-3 text-sm font-extrabold uppercase tracking-wide text-black shadow-[6px_6px_0_0_rgba(0,0,0,0.35)]"
          >
            Join the Club
          </Link>
        </div>
      </article>
    </div>
  );
}
