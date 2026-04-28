import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/data";
import { formatUsdForShop } from "@/lib/money";
import { getPackImage } from "@/lib/pack-images";

type Props = { product: Product; ctaLabel?: string };

export function ShopProductCard({
  product,
  ctaLabel = "View Drop",
  locked = false,
}: Props & { locked?: boolean }) {
  const src = product.imageUrl ?? getPackImage(product.slug).url;
  const alt = product.imageAlt ?? getPackImage(product.slug).alt;

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block overflow-hidden rounded-2xl border-2 border-black bg-[var(--splifft-card)] shadow-[6px_6px_0_0_rgba(255,45,146,0.35)] transition hover:-translate-y-1 hover:shadow-[10px_10px_0_0_rgba(0,191,255,0.4)]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/20">
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover transition duration-500 group-hover:scale-105 ${
            locked ? "blur-[10px]" : ""
          }`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
        {product.badge ? (
          <span className="absolute right-3 top-3 rounded-full bg-[var(--splifft-pink)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-black">
            {product.badge}
          </span>
        ) : null}
        {locked ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/45 p-4 text-center">
            <span className="text-4xl" aria-hidden>
              🔒
            </span>
            <p className="text-sm font-bold uppercase tracking-wide text-[var(--splifft-cream)]">
              Get Monthly Access to Unlock
            </p>
          </div>
        ) : null}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          <h2 className="font-[family-name:var(--font-display)] text-2xl uppercase leading-tight tracking-wide text-[var(--splifft-cream)] sm:text-3xl">
            {product.name}
          </h2>
          {product.shopTagline ? (
            <p className="mt-1 line-clamp-2 text-sm text-[var(--splifft-muted)]">
              {product.shopTagline}
            </p>
          ) : null}
          <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-lg font-bold text-white">
              Monthly Access {formatUsdForShop(product.monthlyAccessPrice)}
            </p>
            <p className="text-sm text-[var(--splifft-muted)] line-through">
              One-Time Pack {formatUsdForShop(product.oneTimePackPrice)}
            </p>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--splifft-blue)] group-hover:text-[var(--splifft-pink)]">
              {ctaLabel} →
            </span>
          </div>
          <div className="mt-2 flex items-center justify-end">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--splifft-cream)]/70">
              {locked ? "One-Time preview" : "Monthly Access saves more"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
