"use client";

import { useState } from "react";
import type { Product } from "@/lib/data";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { SplifftButton } from "@/components/ui/SplifftButton";

type Props = {
  corePacks: Product[];
  dankDrops: Product[];
};

export function ShopPageClient({ corePacks, dankDrops }: Props) {
  const [isMember, setIsMember] = useState(false);

  return (
    <div className="flex-1">
      <section className="border-b-2 border-black bg-[radial-gradient(circle_at_30%_-10%,rgba(255,45,146,0.25),transparent_50%),#0c0c10] py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--splifft-blue)]">
            Join - Save - Shop
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl uppercase text-[var(--splifft-cream)] sm:text-5xl">
            Shop Packs
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--splifft-muted)]">
            Pick your 5-pack first. Then unlock The Vault.
          </p>
          <div className="mt-6 flex gap-3">
            <SplifftButton href="/club" variant="primary">
              Join the Club
            </SplifftButton>
            <button
              type="button"
              className="rounded-xl border-2 border-white/20 px-4 py-2 text-sm font-semibold text-[var(--splifft-cream)]"
              onClick={() => setIsMember((v) => !v)}
            >
              Viewing as: {isMember ? "Member" : "Guest"}
            </button>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-[var(--splifft-blue)]/40 bg-[#12121a] py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--splifft-pink)]">
            Core 5-Packs
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl uppercase text-[var(--splifft-cream)] sm:text-3xl">
            Sativa or Indica
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[var(--splifft-muted)]">
            Member price is $60. Guest price is $75.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {corePacks.map((p) => (
              <ShopProductCard key={p.id} product={p} ctaLabel="Shop Pack" />
            ))}
          </div>
        </div>
      </section>

      <section id="the-vault" className="border-b-2 border-black bg-[#0a0a0c] py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--splifft-pink)]">
            The Vault
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl uppercase text-[var(--splifft-cream)] sm:text-3xl">
            Themed Boxes (Dank Drops)
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[var(--splifft-muted)]">
            Member price is $19.99. Guest price is $24.99.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dankDrops.map((p) => (
              <ShopProductCard
                key={p.id}
                product={p}
                ctaLabel="Add Box"
                locked={!isMember}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
