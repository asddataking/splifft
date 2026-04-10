import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductAddToCart } from "@/components/shop/ProductAddToCart";
import { SplifftButton } from "@/components/ui/SplifftButton";
import { getProductBySlug, getShopProducts } from "@/lib/catalog";
import { getPackImage } from "@/lib/pack-images";
import { SITE_URL, buildPageMetadata } from "@/lib/site";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const products = await getShopProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return { title: "Pack not found" };
  }
  const src = product.imageUrl ?? getPackImage(product.slug).url;
  const alt = product.imageAlt ?? getPackImage(product.slug).alt;
  const base = buildPageMetadata({
    path: `/shop/${product.slug}`,
    title: product.name,
    description: product.description,
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

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

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
                Order this pack
              </p>
              <p className="mt-1 text-sm text-[var(--splifft-muted)]">
                Add to cart, then checkout when you wire payments. Pair with Roll
                Up for a full sesh.
              </p>
              <div className="mt-6">
                <ProductAddToCart product={product} />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <SplifftButton href="/cart" variant="secondary">
                View cart
              </SplifftButton>
              <SplifftButton href="/services#roll-up" variant="ghost">
                Book Roll Up
              </SplifftButton>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
