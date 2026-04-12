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
      "Five hand-rolled 0.7g joints with a glass tip on each, shipped monthly. Pick indica or sativa — member price and early access when we launch.",
    price: 75,
    memberPrice: 60,
    badge: "Coming Soon",
    comingSoon: true,
    highlights: [
      "5 × 0.7g joints · 3.5g total per month",
      "Indica or sativa — your pick",
      "Glass tip on every joint",
      "Hand-rolled with care",
      "Monthly delivery you can count on",
    ],
    imageUrl: url,
    imageAlt: alt,
  };
}
