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
    name: "Cabin Pack",
    description:
      "Cozy night in: rolls, snack ideas, and a neat kit — everything in one box.",
    price: 64,
    memberPrice: 54,
    badge: "Cozy drop",
    highlights: ["Curated rolls", "Session kit", "Snack pairing card"],
  },
  {
    id: "pack-dankndevour",
    slug: "dankndevour-pack",
    name: "DankNDevour Pack",
    description:
      "Snack night, upgraded. Extras that pair with Roll Up — less planning, more eating.",
    price: 72,
    memberPrice: 61,
    badge: "Fan favorite",
    highlights: ["Shareable setup", "Graze-friendly", "Party-ready vibes"],
  },
  {
    id: "pack-lake",
    slug: "lake-day-pack",
    name: "Lake Day Pack",
    description:
      "Sun and water. A tidy bundle for when you park and smoke — made to travel.",
    price: 68,
    memberPrice: 58,
    highlights: ["Travel-tight", "Labeled jars", "Cooler-friendly layout"],
  },
  {
    id: "pack-mystery",
    slug: "mystery-pack",
    name: "Mystery Pack",
    description:
      "A new Splifft box each time — small surprise, same quality.",
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
  "Member prices on Roll Up and Fresh Hit (where listed)",
  "Priority booking and better times when it is busy",
  "First-class treatment at every meet-up — you skip the rush",
  "Early shop drops before everyone else",
  "Glass tips and pack upgrades included or discounted",
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
    label: "Curated packs",
    description:
      "Themed pack-outs: lake day, cabin night, or your own idea — not one size for all.",
  },
  {
    id: "guest-packs",
    label: "Guest-ready smoke packs",
    description:
      "Optional single packs so guests can grab the same thing — great when the head count shifts.",
  },
] as const;
