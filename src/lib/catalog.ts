import type { Product } from "@/lib/data";
import { products as staticProducts } from "@/lib/data";
import { getPackImage } from "@/lib/pack-images";
import {
  DROP_OF_THE_MONTH_SLUG,
  getDropOfTheMonthProduct,
} from "@/lib/drop-of-the-month";
import {
  SPLIFFT_MONTHLY_SLUG,
  getSplifftMonthlyTeaserProduct,
} from "@/lib/splifft-monthly-teaser";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Tables } from "@/types/database.types";

function rowToProduct(row: Tables<"products">): Product {
  const h = row.highlights;
  const highlights = Array.isArray(h)
    ? h.filter((x): x is string => typeof x === "string")
    : [];
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    price: Math.round(row.price_cents) / 100,
    memberPrice: Math.round(row.member_price_cents) / 100,
    badge: row.badge ?? undefined,
    highlights: highlights.length ? highlights : undefined,
  };
}

/** Copy-only fields (e.g. shop taglines) stay in static data until DB columns exist. */
function enrichFromStatic(p: Product): Product {
  const s = staticProducts.find((x) => x.slug === p.slug);
  if (!s?.shopTagline) return p;
  return { ...p, shopTagline: s.shopTagline };
}

function withPackImage(p: Product): Product {
  const { url, alt } = getPackImage(p.slug);
  return { ...p, imageUrl: url, imageAlt: alt };
}

/** Active catalog from Supabase; falls back to static `data.ts` if DB is empty or unreachable. */
export async function getShopProducts(): Promise<Product[]> {
  const staticCatalog = staticProducts.map(enrichFromStatic).map(withPackImage);

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (error || !data?.length) {
      return staticCatalog;
    }
    const dbCatalog = data
      .map(rowToProduct)
      .map(enrichFromStatic)
      .map(withPackImage);
    const merged = [...dbCatalog];
    for (const fallbackProduct of staticCatalog) {
      if (!merged.some((p) => p.slug === fallbackProduct.slug)) {
        merged.push(fallbackProduct);
      }
    }
    return merged;
  } catch {
    return staticCatalog;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (slug === SPLIFFT_MONTHLY_SLUG) {
    return getSplifftMonthlyTeaserProduct();
  }
  if (slug === DROP_OF_THE_MONTH_SLUG) {
    return getDropOfTheMonthProduct();
  }
  const products = await getShopProducts();
  return products.find((p) => p.slug === slug) ?? null;
}
