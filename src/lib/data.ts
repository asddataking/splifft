export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  oneTimePackPrice: number;
  monthlyAccessPrice: number;
  /** Backward-compatible alias; prefer `monthlyAccessPrice`. */
  price: number;
  /** Backward-compatible alias; prefer `oneTimePackPrice`. */
  memberPrice: number;
  badge?: string;
  highlights?: string[];
  /** One-line vibe for shop grid cards. */
  shopTagline?: string;
  /** Filled by catalog layer via `getPackImage(slug)` for shop UI. */
  imageUrl?: string;
  imageAlt?: string;
  /** Teaser-only: visible in shop, not purchasable, no cart. */
  comingSoon?: boolean;
};

export type ServiceCard = {
  id: string;
  name: string;
  description: string;
  startingAt: number;
  memberStartingAt: number;
  ctaLabel: string;
  ctaHref: string;
  /** When true, hide prices and show custom-quote positioning */
  quoteOnly?: boolean;
};

export type LocationArea = {
  slug: string;
  name: string;
  blurb: string;
  neighborhoods?: string[];
};

export const products: Product[] = [
  {
    id: "pack-sativa-5",
    slug: "sativa-5-pack",
    name: "Sativa 5-Pack",
    shopTagline: "Daytime-ready pre-roll pack.",
    description:
      "Five hand-rolled sativa pre-rolls. Ready to light. No rolling needed.",
    oneTimePackPrice: 75,
    monthlyAccessPrice: 60,
    price: 75,
    memberPrice: 60,
    badge: "Core Pack",
    highlights: ["5 pre-rolls", "Fast daytime vibe", "Ships ready to smoke"],
  },
  {
    id: "pack-indica-5",
    slug: "indica-5-pack",
    name: "Indica 5-Pack",
    shopTagline: "Night-ready pre-roll pack.",
    description:
      "Five hand-rolled indica pre-rolls. Calm down and spark up faster.",
    oneTimePackPrice: 75,
    monthlyAccessPrice: 60,
    price: 75,
    memberPrice: 60,
    badge: "Core Pack",
    highlights: ["5 pre-rolls", "Smooth evening vibe", "Ships ready to smoke"],
  },
  {
    id: "pack-cabin",
    slug: "cabin-pack",
    name: "Cabin Drop",
    shopTagline: "Cozy night-in energy — cabin vibes without the prep.",
    description:
      "Curated sesh box for a cozy night in — trip-ready, giftable, or add to your monthly.",
    oneTimePackPrice: 24.99,
    monthlyAccessPrice: 19.99,
    price: 24.99,
    memberPrice: 19.99,
    badge: "Curated drop",
    highlights: ["Curated rolls", "Session kit", "Snack pairing card"],
  },
  {
    id: "pack-dankndevour",
    slug: "dankndevour-pack",
    name: "DankNDevour Drop",
    shopTagline: "Graze, pass, repeat — food-truck smoke without the line.",
    description:
      "Real food meets real smoke — a graze-friendly sesh upgrade, great standalone or with your monthly.",
    oneTimePackPrice: 24.99,
    monthlyAccessPrice: 19.99,
    price: 24.99,
    memberPrice: 19.99,
    badge: "Fan favorite",
    highlights: ["Shareable setup", "Graze-friendly", "Party-ready vibes"],
  },
  {
    id: "pack-lake",
    slug: "lake-day-pack",
    name: "Lake Day Drop",
    shopTagline: "Sun, water, and a box built to travel with you.",
    description:
      "Sun and water. A tidy one-off box for when you park and smoke — made to travel.",
    oneTimePackPrice: 24.99,
    monthlyAccessPrice: 19.99,
    price: 24.99,
    memberPrice: 19.99,
    highlights: ["Travel-tight", "Labeled jars", "Cooler-friendly layout"],
  },
  {
    id: "pack-mystery",
    slug: "mystery-pack",
    name: "Mystery Drop",
    shopTagline: "A fresh curated surprise every time — same quality, new twist.",
    description:
      "A new Splifft curated drop each time — small surprise, same quality. Perfect for gifts.",
    oneTimePackPrice: 24.99,
    monthlyAccessPrice: 19.99,
    price: 24.99,
    memberPrice: 19.99,
    badge: "Limited",
    highlights: ["Rotating picks", "Monthly Access customers shop first", "Collectible card"],
  },
];

export const serviceCards: ServiceCard[] = [
  {
    id: "splifft-events",
    name: "Splifft Events",
    description:
      "Cannabis prepped for your event before guests arrive. Custom quote — we follow your plan.",
    startingAt: 0,
    memberStartingAt: 0,
    ctaLabel: "Request quote",
    ctaHref: "/services/events",
    quoteOnly: true,
  },
];

export const membershipPerks: string[] = [
  "Monthly Access at $60 per month",
  "Save on every premium 5-pack",
  "Get optional add-ons at preferred pricing",
  "First access to limited drops",
  "First access to flower and rosin collabs",
];

export const locations: LocationArea[] = [
  {
    slug: "port-huron",
    name: "Port Huron",
    blurb:
      "Tight routes and set times. Meet at the curb or lot — we prep and hand it back ready.",
    neighborhoods: ["Downtown", "Fort Gratiot", "Marysville"],
  },
  {
    slug: "detroit",
    name: "Detroit",
    blurb:
      "City runs with smart timing — we meet you so you are not stuck prepping when guests show up.",
    neighborhoods: ["Midtown", "Corktown", "New Center"],
  },
  {
    slug: "ann-arbor",
    name: "Ann Arbor",
    blurb:
      "Neighborhood stops with real-traffic timing. Quick meet-up; your order stays with us until it is ready.",
    neighborhoods: ["Kerrytown", "Burns Park", "Ypsi line"],
  },
  {
    slug: "macomb-county",
    name: "Macomb County",
    blurb:
      "Suburban meet-ups with the same prep rules — rolled, cleaned, or packed, then handed back ready.",
    neighborhoods: ["Sterling Heights", "Clinton Twp", "Shelby Twp"],
  },
  {
    slug: "st-clair-county",
    name: "St. Clair County",
    blurb:
      "East-side routes with quick handoff — products ship statewide where allowed; services by coverage.",
    neighborhoods: ["Marysville", "St. Clair", "Marine City"],
  },
];

export const eventUpsells = [
  {
    id: "premium-packaging",
    label: "Premium packaging",
    description:
      "Branded bags and clean presentation for photos and gifts — ready before guests arrive.",
  },
  {
    id: "curated-bundles",
    label: "Curated sesh upgrades",
    description:
      "Themed Dank Drops and one-off boxes — lake day, cabin night, or your own idea.",
  },
  {
    id: "guest-packs",
    label: "Guest-ready sesh boxes",
    description:
      "Optional curated drops so guests grab the same thing — great when the head count shifts.",
  },
] as const;
