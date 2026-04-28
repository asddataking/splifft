"use client";

import { useState } from "react";
import { GA_EVENTS, trackGaEvent } from "@/lib/analytics";
import type { Product } from "@/lib/data";
import { formatUsdForShop, roundUsd } from "@/lib/money";
import { SplifftButton } from "@/components/ui/SplifftButton";
import { useCart } from "@/context/cart-context";

type Props = { product: Product };

export function ProductAddToCart({ product }: Props) {
  const { addLine } = useCart();
  const [qty, setQty] = useState(1);

  if (product.comingSoon) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
      <div>
        <label
          htmlFor={`qty-${product.id}`}
          className="text-xs font-bold uppercase tracking-wider text-[var(--splifft-ink-soft)]"
        >
          Quantity
        </label>
        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-black/20 bg-white text-lg font-bold text-[var(--splifft-ink)] transition hover:border-[var(--splifft-pink)]"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input
            id={`qty-${product.id}`}
            type="number"
            min={1}
            max={99}
            value={qty}
            onChange={(e) =>
              setQty(Math.min(99, Math.max(1, Number(e.target.value) || 1)))
            }
            className="h-11 w-16 rounded-xl border-2 border-black/15 bg-white text-center text-lg font-bold text-[var(--splifft-ink)]"
          />
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-black/20 bg-white text-lg font-bold text-[var(--splifft-ink)] transition hover:border-[var(--splifft-pink)]"
            onClick={() => setQty((q) => Math.min(99, q + 1))}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
      <SplifftButton
        variant="primary"
        className="min-h-[48px] min-w-[200px] sm:flex-1"
        onClick={() => {
          addLine(
            {
              id: product.id,
              name: product.name,
              price: product.oneTimePackPrice,
            },
            qty,
          );
          trackGaEvent(GA_EVENTS.ADD_TO_CART, {
            currency: "USD",
            value: roundUsd(product.oneTimePackPrice * qty),
            items: [
              {
                item_id: product.id,
                item_name: product.name,
                price: product.oneTimePackPrice,
                quantity: qty,
              },
            ],
          });
          setQty(1);
        }}
      >
        Add to cart · {formatUsdForShop(roundUsd(product.oneTimePackPrice * qty))}
      </SplifftButton>
    </div>
  );
}
