import type { Product } from "@/lib/data";
import { getPackImage } from "@/lib/pack-images";

export const SPLIFFT_MONTHLY_SLUG = "splifft-monthly";

/** Teaser-only subscription product — not in DB, not purchasable. */
export function getSplifftMonthlyTeaserProduct(): Product {
  const { url, alt } = getPackImage(SPLIFFT_MONTHLY_SLUG);
  return {
    id: "splifft-monthly",
    slug: SPLIFFT_MONTHLY_SLUG,
    name: "Splifft Monthly",
    description:
      "5 artisinally hand rolled 0.7g joints with a glass tip on each, curated for monthly delivery you can count on. Choose indica or sativa — member pricing and priority access when we go live.",
    price: 75,
    memberPrice: 60,
    badge: "Coming Soon",
    comingSoon: true,
    highlights: [
      "5 × 0.7g joints · 3.5g total per month",
      "Indica or sativa — your choice",
      "Glass tip on every joint",
      "Artisinally hand rolled",
      "Curated monthly delivery",
    ],
    imageUrl: url,
    imageAlt: alt,
  };
}
