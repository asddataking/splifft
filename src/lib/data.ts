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
      "Cozy night energy: curated rolls, snacks-forward pairing notes, and a tidy kit — built for an easier sesh.",
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
      "The munchies menu, leveled up. Themed extras that pair perfectly with Roll Up — less thinking, more smoking.",
    price: 72,
    memberPrice: 61,
    badge: "Fan favorite",
    highlights: ["Shareable setup", "Graze-friendly", "Full-sesh vibes"],
  },
  {
    id: "pack-lake",
    slug: "lake-day-pack",
    name: "Lake Day Pack",
    description:
      "Sun, water, and a breezy bundle that travels clean. Curated extras for a better smoke when you park.",
    price: 68,
    memberPrice: 58,
    highlights: ["Travel-tight", "Labeled jars", "Cooler-friendly layout"],
  },
  {
    id: "pack-mystery",
    slug: "mystery-pack",
    name: "Mystery Pack",
    description:
      "A rotating Splifft drop — a little surprise in every box, same standards.",
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
      "We pull up, take your flower, prep it, and hand it back ready — mobile handoff, no stress, built like a service appointment.",
    startingAt: 34.99,
    memberStartingAt: 29.99,
    ctaLabel: "Book Roll Up",
    ctaHref: "/services/roll-up",
  },
  {
    id: "fresh-hit",
    name: "Fresh Hit",
    description:
      "Glass cleaning as a mobile handoff — we prep it and hand pieces back fresh. Easier sesh, zero sink time for you.",
    startingAt: 22,
    memberStartingAt: 18,
    ctaLabel: "Book Fresh Hit",
    ctaHref: "/services/fresh-hit",
  },
  {
    id: "splifft-events",
    name: "Splifft Events",
    description:
      "Cannabis, prepared for your event — ready before guests arrive. Custom quote; we build to your brief.",
    startingAt: 0,
    memberStartingAt: 0,
    ctaLabel: "Request quote",
    ctaHref: "/services/events",
    quoteOnly: true,
  },
];

export const membershipPerks: string[] = [
  "Member pricing on Roll Up (and Fresh Hit where listed)",
  "Priority booking & better availability on busy windows",
  "VIP feel at every handoff — you skip the scramble",
  "Early drops before the public shop opens",
  "Glass tips & select pack upgrades included or discounted",
];

export const locations: LocationArea[] = [
  {
    slug: "port-huron",
    name: "Port Huron",
    blurb:
      "Mobile handoff routes with tight scheduling. Meet at the curb or lot — we prep it and hand it back ready.",
    neighborhoods: ["Downtown", "Fort Gratiot", "Marysville"],
  },
  {
    slug: "detroit",
    name: "Detroit",
    blurb:
      "City runs with event-aware timing — mobile handoff so you’re not prepping when you should be hosting.",
    neighborhoods: ["Midtown", "Corktown", "New Center"],
  },
  {
    slug: "ann-arbor",
    name: "Ann Arbor",
    blurb:
      "Neighborhood-friendly stops — appointment slots built around real traffic. Quick handoff; everything stays mobile until you get it back.",
    neighborhoods: ["Kerrytown", "Burns Park", "Ypsi line"],
  },
  {
    slug: "macomb-county",
    name: "Macomb County",
    blurb:
      "Suburban meetups with the same mobile prep standard — rolled, cleaned, or packed, then handed back ready to smoke.",
    neighborhoods: ["Sterling Heights", "Clinton Twp", "Shelby Twp"],
  },
];

export const eventUpsells = [
  {
    id: "premium-packaging",
    label: "Premium packaging",
    description:
      "Branded bags and polished presentation for photos and gifting — prepped before guests arrive.",
  },
  {
    id: "curated-bundles",
    label: "Curated bundles",
    description:
      "Themed pack-outs: lake day, cabin night, or custom to your crowd — not one-size-fits-all.",
  },
  {
    id: "guest-packs",
    label: "Guest-ready smoke packs",
    description:
      "Optional add-on: individual packs so guests grab something consistent — great when headcounts vary.",
  },
] as const;
