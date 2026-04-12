export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  memberPrice: number;
  badge?: string;
  highlights?: string[];
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
    id: "pack-cabin",
    slug: "cabin-pack",
    name: "Cabin Drop",
    description:
      "Curated sesh box for a cozy night in — trip-ready, giftable, or add to your monthly.",
    price: 64,
    memberPrice: 54,
    badge: "Curated drop",
    highlights: ["Curated rolls", "Session kit", "Snack pairing card"],
  },
  {
    id: "pack-dankndevour",
    slug: "dankndevour-pack",
    name: "DankNDevour Drop",
    description:
      "Real food meets real smoke — a graze-friendly sesh upgrade, great standalone or with your monthly.",
    price: 72,
    memberPrice: 61,
    badge: "Fan favorite",
    highlights: ["Shareable setup", "Graze-friendly", "Party-ready vibes"],
  },
  {
    id: "pack-lake",
    slug: "lake-day-pack",
    name: "Lake Day Drop",
    description:
      "Sun and water. A tidy one-off box for when you park and smoke — made to travel.",
    price: 68,
    memberPrice: 58,
    highlights: ["Travel-tight", "Labeled jars", "Cooler-friendly layout"],
  },
  {
    id: "pack-mystery",
    slug: "mystery-pack",
    name: "Mystery Box",
    description:
      "A new Splifft curated drop each time — small surprise, same quality. Perfect for gifts.",
    price: 55,
    memberPrice: 47,
    badge: "Limited",
    highlights: ["Rotating picks", "Members shop first", "Collectible card"],
  },
];

export const serviceCards: ServiceCard[] = [
  {
    id: "roll-up",
    name: "Roll Up",
    description:
      "We meet you, take your flower, roll it, and hand it back ready. You book a time — we show up.",
    startingAt: 34.99,
    memberStartingAt: 29.99,
    ctaLabel: "Book Roll Up",
    ctaHref: "/services/roll-up",
  },
  {
    id: "fresh-hit",
    name: "Fresh Hit",
    description:
      "We clean your glass and hand it back fresh. No sink time for you — book like Roll Up.",
    startingAt: 22,
    memberStartingAt: 18,
    ctaLabel: "Book Fresh Hit",
    ctaHref: "/services/fresh-hit",
  },
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
  "Lower Splifft Subscription price — $60/mo vs $75 non-member",
  "Lower Drop of the Month and Dank Drops pricing where listed",
  "Priority appointment times for Roll Up and Fresh Hit",
  "Early access to limited drops before everyone else",
  "Glass tip upgrades on subscription and curated rolls",
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
