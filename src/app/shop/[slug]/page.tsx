import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ComingSoonProductActions } from "@/components/shop/ComingSoonProductActions";
import { ProductAddToCart } from "@/components/shop/ProductAddToCart";
import { SplifftButton } from "@/components/ui/SplifftButton";
import { getProductBySlug, getShopProducts } from "@/lib/catalog";
import { getPackImage } from "@/lib/pack-images";
import {
  DROP_OF_THE_MONTH_SLUG,
  dropOfTheMonthTheme,
} from "@/lib/drop-of-the-month";
import { SPLIFFT_MONTHLY_SLUG } from "@/lib/splifft-monthly-teaser";
import { SITE_URL, buildPageMetadata } from "@/lib/site";
import type { Metadata } from "next";
import type { Product } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const products = await getShopProducts();
  const slugs = new Set(products.map((p) => p.slug));
  slugs.add(SPLIFFT_MONTHLY_SLUG);
  slugs.add(DROP_OF_THE_MONTH_SLUG);
  return Array.from(slugs, (slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return { title: "Product not found" };
  }
  const src = product.imageUrl ?? getPackImage(product.slug).url;
  const alt = product.imageAlt ?? getPackImage(product.slug).alt;
  const titleSeg = product.comingSoon
    ? `${product.name} — Coming Soon`
    : product.name;
  const desc = product.comingSoon
    ? `Coming soon — ${product.description}`
    : product.description;
  const base = buildPageMetadata({
    path: `/shop/${product.slug}`,
    title: titleSeg,
    description: desc,
  });
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      images: [{ url: src, width: 1200, height: 1200, alt, type: "image/jpeg" }],
    },
    twitter: {
      ...base.twitter,
      images: [src.startsWith("http") ? src : `${SITE_URL}${src}`],
    },
  };
}

function ComingSoonDetail({ product }: { product: Product }) {
  const src = product.imageUrl ?? getPackImage(product.slug).url;
  const alt = product.imageAlt ?? product.name;

  return (
    <div className="flex-1 bg-[#0a0a0c]">
      <div className="border-b border-white/10 bg-black/40">
        <div className="mx-auto max-w-6xl px-4 py-4 text-sm text-[var(--splifft-muted)] sm:px-6">
          <Link href="/shop" className="text-[var(--splifft-pink)] hover:underline">
            Shop
          </Link>
          <span className="mx-2 text-white/30">/</span>
          <span className="text-[var(--splifft-cream)]">{product.name}</span>
          <span className="ml-2 rounded-full border border-[var(--splifft-blue)]/50 bg-black/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--splifft-blue)]">
            Teaser
          </span>
        </div>
      </div>

      <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border-2 border-[var(--splifft-blue)]/50 shadow-[10px_10px_0_0_rgba(0,191,255,0.25)] lg:sticky lg:top-24">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover opacity-85 saturate-[0.7]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20" />
            <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent,transparent_14px,rgba(255,45,146,0.06)_14px,rgba(255,45,146,0.06)_15px)]" />
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-[var(--splifft-pink)] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-black">
                Coming Soon
              </span>
              <span className="rounded-full border border-white/25 bg-black/65 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[var(--splifft-cream)] backdrop-blur-sm">
                Not purchasable yet
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--splifft-blue)]">
              Flagship subscription
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl uppercase leading-none tracking-wide text-[var(--splifft-cream)] sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 font-[family-name:var(--font-display)] text-2xl uppercase leading-tight text-[var(--splifft-pink)] sm:text-3xl">
              Curated monthly. Ready when you are.
            </p>
            <p className="mt-2 text-lg font-medium text-[var(--splifft-cream)]/90">
              Built for easier sessions. Built like a service appointment —
              delivered like a perfect sesh.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[var(--splifft-muted)]">
              {product.description}
            </p>

            <section className="mt-10 rounded-2xl border-2 border-black/40 bg-[var(--splifft-card)]/95 p-6 text-[var(--splifft-ink)] shadow-[6px_6px_0_0_rgba(255,45,146,0.3)]">
              <h2 className="font-[family-name:var(--font-display)] text-xl uppercase tracking-wide">
                Product breakdown
              </h2>
              <ul className="mt-4 space-y-2 text-sm font-medium">
                <li className="flex gap-2">
                  <span className="text-[var(--splifft-pink)]">•</span>
                  5 × 0.7g joints — <strong>3.5g total per month</strong>
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--splifft-pink)]">•</span>
                  Your choice: <strong>indica</strong> or <strong>sativa</strong>
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--splifft-pink)]">•</span>
                  <strong>Glass tip</strong> on every joint
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--splifft-pink)]">•</span>
                  <strong>Artisinally hand rolled with care</strong>
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--splifft-pink)]">•</span>
                  <strong>Curated</strong> monthly delivery
                </li>
              </ul>
            </section>

            <section className="mt-8">
              <h2 className="font-[family-name:var(--font-display)] text-xl uppercase text-[var(--splifft-cream)]">
                Pricing comparison
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border-2 border-[var(--splifft-pink)]/50 bg-black/40 p-5">
                  <p className="text-xs font-bold uppercase text-[var(--splifft-muted)]">
                    Splifft Club members
                  </p>
                  <p className="mt-2 font-[family-name:var(--font-display)] text-4xl text-[var(--splifft-pink)]">
                    ${product.memberPrice}
                    <span className="text-lg font-sans font-semibold text-[var(--splifft-cream)]">
                      /mo
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-[var(--splifft-muted)]">
                    Member pricing when we launch — priority access first.
                  </p>
                </div>
                <div className="rounded-2xl border-2 border-white/15 bg-black/35 p-5">
                  <p className="text-xs font-bold uppercase text-[var(--splifft-muted)]">
                    Non-members
                  </p>
                  <p className="mt-2 font-[family-name:var(--font-display)] text-4xl text-[var(--splifft-cream)]">
                    ${product.price}
                    <span className="text-lg font-sans font-semibold text-[var(--splifft-muted)]">
                      /mo
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-[var(--splifft-muted)]">
                    Standard monthly rate — join Club to lock the better price.
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-8 rounded-2xl border-2 border-[var(--splifft-blue)]/35 bg-black/30 p-6">
              <h2 className="font-[family-name:var(--font-display)] text-xl uppercase text-[var(--splifft-cream)]">
                Membership tie-in
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--splifft-muted)]">
                Splifft Club is built for repeat buyers: <strong className="text-[var(--splifft-cream)]">member pricing</strong>,{" "}
                <strong className="text-[var(--splifft-cream)]">priority booking</strong>, early drops, and glass-tip perks. When Splifft Subscription goes live, members get the headline price and first dibs — the subscription is the core of the ecosystem.
              </p>
            </section>

            <div className="mt-10 rounded-2xl border-2 border-dashed border-[var(--splifft-pink)]/50 bg-black/45 p-6">
              <p className="text-sm font-bold uppercase tracking-wider text-[var(--splifft-pink)]">
                Not live in checkout
              </p>
              <p className="mt-2 text-sm text-[var(--splifft-muted)]">
                This is a preview only — no cart, no payment. Get notified when it
                drops, or join Club so you&apos;re first in line.
              </p>
              <div className="mt-6">
                <ComingSoonProductActions productSlug={product.slug} />
              </div>
            </div>

            <div className="mt-6">
              <SplifftButton href="/shop" variant="ghost">
                ← Back to shop
              </SplifftButton>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  if (product.comingSoon) {
    return <ComingSoonDetail product={product} />;
  }

  const isDropOfTheMonth = product.slug === DROP_OF_THE_MONTH_SLUG;

  const src = product.imageUrl ?? getPackImage(product.slug).url;
  const alt = product.imageAlt ?? getPackImage(product.slug).alt;

  return (
    <div className="flex-1 bg-[#0a0a0c]">
      <div className="border-b border-white/10 bg-black/40">
        <div className="mx-auto max-w-6xl px-4 py-4 text-sm text-[var(--splifft-muted)] sm:px-6">
          <Link href="/shop" className="text-[var(--splifft-pink)] hover:underline">
            Shop
          </Link>
          <span className="mx-2 text-white/30">/</span>
          <span className="text-[var(--splifft-cream)]">{product.name}</span>
        </div>
      </div>

      <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border-2 border-black shadow-[10px_10px_0_0_rgba(255,45,146,0.35)] lg:sticky lg:top-24">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="flex flex-col">
            {product.badge ? (
              <span className="mb-3 inline-flex w-fit rounded-full bg-[var(--splifft-pink)] px-3 py-1 text-xs font-bold uppercase tracking-wide text-black">
                {product.badge}
              </span>
            ) : null}
            <h1 className="font-[family-name:var(--font-display)] text-4xl uppercase leading-none tracking-wide text-[var(--splifft-cream)] sm:text-5xl">
              {product.name}
            </h1>
            {isDropOfTheMonth ? (
              <p className="mt-3 font-[family-name:var(--font-display)] text-xl uppercase leading-tight text-[var(--splifft-pink)] sm:text-2xl">
                {dropOfTheMonthTheme.tagline}
              </p>
            ) : null}
            <div className="mt-6 flex flex-wrap items-baseline gap-4 border-b border-white/10 pb-6">
              <div>
                <p className="text-xs font-bold uppercase text-[var(--splifft-muted)]">
                  Standard
                </p>
                <p className="text-3xl font-bold text-[var(--splifft-cream)]">
                  ${product.price}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-[var(--splifft-muted)]">
                  Splifft Club
                </p>
                <p className="text-3xl font-bold text-[var(--splifft-pink)]">
                  ${product.memberPrice}
                </p>
              </div>
            </div>
            <p className="mt-6 text-lg leading-relaxed text-[var(--splifft-muted)]">
              {product.description}
            </p>
            {product.highlights?.length ? (
              <ul className="mt-6 space-y-2">
                {product.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex gap-2 text-sm font-medium text-[var(--splifft-cream)]"
                  >
                    <span className="text-[var(--splifft-blue)]" aria-hidden>
                      •
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-10 rounded-2xl border-2 border-[var(--splifft-blue)]/40 bg-black/35 p-6">
              <p className="text-sm font-semibold text-[var(--splifft-cream)]">
                {isDropOfTheMonth ? "Claim this month’s drop" : "Add to your sesh"}
              </p>
              <p className="mt-1 text-sm text-[var(--splifft-muted)]">
                {isDropOfTheMonth
                  ? "Limited curated box — add to cart and make it a full sesh. Checkout is mocked until your processor is wired."
                  : "Add this Dank Drop to your cart — great solo, as a gift, or layered with your monthly. Checkout is mocked until your processor is wired."}
              </p>
              <div className="mt-6">
                <ProductAddToCart product={product} />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <SplifftButton href="/cart" variant="secondary">
                View cart
              </SplifftButton>
              <SplifftButton href="/services/roll-up" variant="ghost">
                Book Roll Up
              </SplifftButton>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
