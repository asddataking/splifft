import Link from "next/link";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/shop/ProductCard";
import { SplifftButton } from "@/components/ui/SplifftButton";

export const metadata = {
  title: "Shop packs | Splifft",
  description:
    "Curated Splifft packs — Cabin, DankNDevour, Lake Day, Mystery drops.",
};

export default function ShopPage() {
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
            Add packs to your cart like a storefront. Checkout is mocked — wire
            your processor when you are ready to charge.
          </p>
        </div>
      </section>

      <section className="border-b-2 border-[var(--splifft-blue)]/40 bg-[#12121a] py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-sm font-semibold text-[var(--splifft-cream)]">
            Make it ready with your sesh — book rolling, cleaning, and full prep
            in one pull-up.
          </p>
          <SplifftButton href="/services" variant="primary" className="shrink-0">
            Book prep
          </SplifftButton>
        </div>
      </section>

      <section className="bg-[#0a0a0c] py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-[var(--splifft-muted)]">
            Looking for something custom?{" "}
            <Link
              href="/events"
              className="font-semibold text-[var(--splifft-pink)] underline-offset-4 hover:underline"
            >
              Events & quotes
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
