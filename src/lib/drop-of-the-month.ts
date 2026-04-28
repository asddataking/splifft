import type { Product } from "@/lib/data";
import { getPackImage } from "@/lib/pack-images";

export const DROP_OF_THE_MONTH_SLUG = "drop-of-the-month";

/** Rotating monthly theme — update copy when the box changes. */
export const dropOfTheMonthTheme = {
  themeName: "April Afterglow",
  tagline: "This month’s curated sesh. Limited. Ready.",
} as const;

/** Primary Drop of the Month product — UI launch-ready; checkout remains mocked like other shop items. */
export function getDropOfTheMonthProduct(): Product {
  const { url, alt } = getPackImage(DROP_OF_THE_MONTH_SLUG);
  return {
    id: "drop-of-the-month",
    slug: DROP_OF_THE_MONTH_SLUG,
    name: "Drop of the Month",
    description:
      `${dropOfTheMonthTheme.themeName} — a curated sesh box built for this month’s vibe. Rotating theme, limited feel, and first-access pricing with Monthly Access.`,
    oneTimePackPrice: 24.99,
    monthlyAccessPrice: 19.99,
    price: 24.99,
    memberPrice: 19.99,
    badge: "Limited drop",
    highlights: [
      "Rotating monthly theme",
      "Themed extras & sesh upgrades",
      "Snacks, gear, and session-ready picks",
      "Monthly Access discount built in",
    ],
    imageUrl: url,
    imageAlt: alt,
  };
}
