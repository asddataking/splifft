"use client";

import type { Product } from "@/lib/data";
import { formatUsdForShop } from "@/lib/money";
import { SplifftButton } from "@/components/ui/SplifftButton";
import { useCart } from "@/context/cart-context";

type Props = { product: Product; showMemberPrice?: boolean };

export function ProductCard({ product, showMemberPrice = true }: Props) {
  const { addLine } = useCart();

  return (
    <article className="group flex flex-col rounded-2xl border-2 border-black bg-[var(--splifft-card)] p-5 shadow-[6px_6px_0_0_rgba(255,45,146,0.35)] transition hover:-translate-y-0.5 hover:shadow-[8px_8px_0_0_rgba(0,191,255,0.35)]">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-[var(--splifft-ink)]">
          {product.name}
        </h3>
        {product.badge ? (
          <span className="shrink-0 rounded-full bg-black px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--splifft-pink)]">
            {product.badge}
          </span>
        ) : null}
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--splifft-ink-soft)]">
        {product.description}
      </p>
      {product.highlights ? (
        <ul className="mt-3 space-y-1 text-xs font-medium text-[var(--splifft-ink)]">
          {product.highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <span className="text-[var(--splifft-blue)]" aria-hidden>
                •
              </span>
              {h}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-5 flex flex-wrap items-end justify-between gap-3 border-t-2 border-dashed border-black/15 pt-4">
        <div>
          <p className="text-xs font-bold uppercase text-[var(--splifft-ink-soft)]">
            Standard
          </p>
          <p className="text-xl font-bold text-[var(--splifft-ink)]">
            {formatUsdForShop(product.oneTimePackPrice)}
          </p>
          {showMemberPrice ? (
            <p className="text-xs text-[var(--splifft-ink-soft)]">
              Monthly Access{" "}
              <span className="font-semibold text-[var(--splifft-pink)]">
                {formatUsdForShop(product.monthlyAccessPrice)}
              </span>
            </p>
          ) : null}
        </div>
        <SplifftButton
          variant="primary"
          className="min-w-[140px]"
          onClick={() =>
            addLine({
              id: product.id,
              name: product.name,
              price: product.oneTimePackPrice,
            })
          }
        >
          Add to cart
        </SplifftButton>
      </div>
    </article>
  );
}
