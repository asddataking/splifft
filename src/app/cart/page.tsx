"use client";

import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { SplifftButton } from "@/components/ui/SplifftButton";

export default function CartPage() {
  const { lines, setQuantity, removeLine, subtotal, clear } = useCart();

  return (
    <div className="flex-1 bg-[#0a0a0c] py-14 sm:py-18">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="font-[family-name:var(--font-display)] text-4xl uppercase text-[var(--splifft-cream)]">
          Cart
        </h1>
        <p className="mt-2 text-[var(--splifft-muted)]">
          Review your packs. Checkout is mocked for this build.
        </p>

        {lines.length === 0 ? (
          <div className="mt-10 rounded-2xl border-2 border-dashed border-white/20 p-8 text-center">
            <p className="text-[var(--splifft-cream)]">Your cart is empty.</p>
            <SplifftButton href="/shop" variant="primary" className="mt-6">
              Shop packs
            </SplifftButton>
          </div>
        ) : (
          <ul className="mt-8 space-y-4">
            {lines.map((line) => (
              <li
                key={line.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border-2 border-black bg-[var(--splifft-card)] p-4"
              >
                <div>
                  <p className="font-semibold text-[var(--splifft-ink)]">
                    {line.name}
                  </p>
                  <p className="text-sm text-[var(--splifft-ink-soft)]">
                    ${line.price} each
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="sr-only" htmlFor={`qty-${line.id}`}>
                    Quantity for {line.name}
                  </label>
                  <input
                    id={`qty-${line.id}`}
                    type="number"
                    min={1}
                    value={line.quantity}
                    onChange={(e) =>
                      setQuantity(line.id, Number(e.target.value) || 1)
                    }
                    className="w-20 rounded-lg border-2 border-black/15 px-2 py-2 text-center font-semibold text-[var(--splifft-ink)]"
                  />
                  <SplifftButton
                    variant="ghost"
                    className="min-h-0 px-3 py-2 text-sm"
                    onClick={() => removeLine(line.id)}
                  >
                    Remove
                  </SplifftButton>
                </div>
              </li>
            ))}
          </ul>
        )}

        {lines.length > 0 ? (
          <div className="mt-8 rounded-2xl border-2 border-[var(--splifft-pink)]/50 bg-black/40 p-6">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm font-bold uppercase text-[var(--splifft-muted)]">
                Subtotal
              </span>
              <span className="font-[family-name:var(--font-display)] text-3xl text-[var(--splifft-cream)]">
                ${subtotal}
              </span>
            </div>
            <p className="mt-4 text-sm text-[var(--splifft-muted)]">
              <Link
                href="/services#roll-up"
                className="font-semibold text-[var(--splifft-pink)] underline-offset-4 hover:underline"
              >
                Add a Roll Up appointment
              </Link>{" "}
              — bundles pair perfectly; we prep inside the Roll Wagon and hand
              everything back ready.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <SplifftButton
                variant="primary"
                onClick={() => alert("Connect checkout — Stripe, Square, etc.")}
              >
                Checkout
              </SplifftButton>
              <SplifftButton variant="ghost" onClick={clear}>
                Clear cart
              </SplifftButton>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
