import Link from "next/link";
import { getShopProducts } from "@/lib/catalog";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { ShopSplifftMonthlyTeaserCard } from "@/components/shop/ShopSplifftMonthlyTeaserCard";
import { SplifftButton } from "@/components/ui/SplifftButton";
import { getSplifftMonthlyTeaserProduct } from "@/lib/splifft-monthly-teaser";
import { buildPageMetadata, SOCIAL_SHARE_DESCRIPTION } from "@/lib/site";

export const metadata = buildPageMetadata({
  path: "/shop",
  title: "Shop packs",
  description:
    "Curated packs — add-ons for your order. Pair with Roll Up. Checkout coming soon.",
  shareDescription: SOCIAL_SHARE_DESCRIPTION,
});

export default async function ShopPage() {
  const products = await getShopProducts();
  const splifftMonthly = getSplifftMonthlyTeaserProduct();

  return (
    <div className="flex-1">
      <section className="border-b-2 border-black bg-[radial-gradient(circle_at_30%_-10%,rgba(255,45,146,0.25),transparent_50%),#0c0c10] py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--splifft-blue)]">
            Shop
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl uppercase text-[var(--splifft-cream)] sm:text-5xl">
            Packs & drops
          </h1>
          <p className="mt-4 max-w-2xl text-[var(--splifft-muted)]">
            Packs round out your order — extras that make the night easier.
            Checkout is mocked until you wire your processor.
          </p>
        </div>
      </section>

      <section className="border-b-2 border-[var(--splifft-blue)]/40 bg-[#12121a] py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-sm font-semibold text-[var(--splifft-cream)]">
            Add packs to your Roll Up — picks for a better night; we prep your
            smoke and hand it back ready.
          </p>
          <SplifftButton
            href="/services/roll-up"
            variant="primary"
            className="shrink-0"
          >
            Book Roll Up
          </SplifftButton>
        </div>
      </section>

      <section className="bg-[#0a0a0c] py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[var(--splifft-pink)]">
            Featured — coming soon
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ShopSplifftMonthlyTeaserCard product={splifftMonthly} />
            {products.map((p) => (
              <ShopProductCard key={p.id} product={p} />
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-[var(--splifft-muted)]">
            Something bigger?{" "}
            <Link
              href="/services/events"
              className="font-semibold text-[var(--splifft-pink)] underline-offset-4 hover:underline"
            >
              Splifft Events & quotes
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
