import Link from "next/link";
import { getShopProducts } from "@/lib/catalog";
import { getDropOfTheMonthProduct } from "@/lib/drop-of-the-month";
import { dankDropProductIds } from "@/lib/marketing";
import { getSplifftMonthlyTeaserProduct } from "@/lib/splifft-monthly-teaser";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { ShopSplifftMonthlyTeaserCard } from "@/components/shop/ShopSplifftMonthlyTeaserCard";
import { SplifftButton } from "@/components/ui/SplifftButton";
import { buildPageMetadata, SOCIAL_SHARE_DESCRIPTION } from "@/lib/site";

export const metadata = buildPageMetadata({
  path: "/shop",
  title: "Shop",
  description:
    "Splifft Subscription, Drop of the Month, and Dank Drops — choose your monthly, grab a curated drop, make it a better sesh.",
  shareDescription: SOCIAL_SHARE_DESCRIPTION,
});

export default async function ShopPage() {
  const products = await getShopProducts();
  const splifftMonthly = getSplifftMonthlyTeaserProduct();
  const dropOfTheMonth = getDropOfTheMonthProduct();
  const dankDrops = products.filter((p) =>
    (dankDropProductIds as readonly string[]).includes(p.id),
  );

  return (
    <div className="flex-1">
      <section className="border-b-2 border-black bg-[radial-gradient(circle_at_30%_-10%,rgba(255,45,146,0.25),transparent_50%),#0c0c10] py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--splifft-blue)]">
            Shop
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl uppercase text-[var(--splifft-cream)] sm:text-5xl">
            Subscriptions &amp; drops
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--splifft-muted)]">
            Choose your monthly. Grab a drop. Make it a better sesh.
          </p>
        </div>
      </section>

      <section className="border-b-2 border-[var(--splifft-blue)]/40 bg-[#12121a] py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--splifft-pink)]">
            1 · Subscriptions
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl uppercase text-[var(--splifft-cream)] sm:text-3xl">
            Your monthly, handled
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[var(--splifft-muted)]">
            Splifft Subscription for artisinally hand rolled joints — Drop of the
            Month for a limited curated box.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <ShopSplifftMonthlyTeaserCard product={splifftMonthly} />
            <ShopProductCard product={dropOfTheMonth} ctaLabel="View Drop" />
          </div>
        </div>
      </section>

      <section
        id="dank-drops"
        className="border-b-2 border-black bg-[#0a0a0c] py-14 sm:py-18"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--splifft-pink)]">
            2 · Dank Drops
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl uppercase text-[var(--splifft-cream)] sm:text-3xl">
            Curated sesh boxes
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[var(--splifft-muted)]">
            Great on their own, perfect for trips and gifts, or add a drop to your
            monthly. Add to sesh at checkout.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dankDrops.map((p) => (
              <ShopProductCard key={p.id} product={p} ctaLabel="Add to Sesh" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#101018] py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--splifft-blue)]">
            3 · Services
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl uppercase text-[var(--splifft-cream)] sm:text-3xl">
            Need it today?
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[var(--splifft-muted)]">
            Mobile handoff — book Roll Up or Fresh Hit when you want it done fast.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <article className="rounded-2xl border-2 border-black bg-[var(--splifft-card)] p-6 shadow-[6px_6px_0_0_rgba(255,45,146,0.35)]">
              <h3 className="font-[family-name:var(--font-display)] text-xl uppercase text-[var(--splifft-ink)]">
                Roll Up
              </h3>
              <p className="mt-2 text-sm text-[var(--splifft-ink-soft)]">
                We pull up, take your flower, prep it, and hand it back ready.
              </p>
              <SplifftButton
                href="/services/roll-up"
                variant="primary"
                className="mt-5"
              >
                Book Roll Up
              </SplifftButton>
            </article>
            <article className="rounded-2xl border-2 border-black bg-[var(--splifft-card)] p-6 shadow-[6px_6px_0_0_rgba(0,191,255,0.35)]">
              <h3 className="font-[family-name:var(--font-display)] text-xl uppercase text-[var(--splifft-ink)]">
                Fresh Hit
              </h3>
              <p className="mt-2 text-sm text-[var(--splifft-ink-soft)]">
                Hand us your glass. We clean it and return it fresh.
              </p>
              <SplifftButton
                href="/services/fresh-hit"
                variant="secondary"
                className="mt-5"
              >
                Book Fresh Hit
              </SplifftButton>
            </article>
          </div>
          <p className="mt-10 text-center text-sm text-[var(--splifft-muted)]">
            Something bigger?{" "}
            <Link
              href="/services/events"
              className="font-semibold text-[var(--splifft-pink)] underline-offset-4 hover:underline"
            >
              Splifft Events &amp; quotes
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
