import type { Product } from "@/lib/data";
import { getPackImage } from "@/lib/pack-images";

export const SPLIFFT_MONTHLY_SLUG = "splifft-monthly";

/** Teaser-only subscription product — not in DB, not purchasable. */
export function getSplifftMonthlyTeaserProduct(): Product {
  const { url, alt } = getPackImage(SPLIFFT_MONTHLY_SLUG);
  return {
    id: "splifft-monthly",
    slug: SPLIFFT_MONTHLY_SLUG,
    name: "Monthly Access",
    description:
      "5 premium Spliffts with glass filter tips and branded bands, curated monthly. Pick indica or sativa and lock in Monthly Access pricing at launch.",
    oneTimePackPrice: 75,
    monthlyAccessPrice: 60,
    price: 75,
    memberPrice: 60,
    badge: "Coming Soon",
    comingSoon: true,
    highlights: [
      "5 × 0.7g premium Spliffts · 3.5g total per month",
      "Indica or sativa — your pick",
      "Glass tip included on every joint",
      "Curated monthly · delivered ready",
      "No rolling. No prep. Just smoke.",
    ],
    imageUrl: url,
    imageAlt: alt,
  };
}
