import type { Product } from "@/lib/data";
import { products as staticProducts } from "@/lib/data";
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
    price: Math.round(row.price_cents / 100),
    memberPrice: Math.round(row.member_price_cents / 100),
    badge: row.badge ?? undefined,
    highlights: highlights.length ? highlights : undefined,
  };
}

/** Active catalog from Supabase; falls back to static `data.ts` if DB is empty or unreachable. */
export async function getShopProducts(): Promise<Product[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (error || !data?.length) {
      return staticProducts;
    }
    return data.map(rowToProduct);
  } catch {
    return staticProducts;
  }
}
