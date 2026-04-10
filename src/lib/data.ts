export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  memberPrice: number;
  badge?: string;
  highlights?: string[];
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
      "A rotating drop from the wagon. Same Splifft standards — a little surprise in every box.",
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
      "We pull up, you hand us your flower, and we prep it inside the Roll Wagon so it's ready when we hand it back. Quick handoff — we stay in the vehicle.",
    startingAt: 58,
    memberStartingAt: 49,
    ctaLabel: "Book Roll Up",
    ctaHref: "/services#roll-up",
  },
  {
    id: "fresh-hit",
    name: "Fresh Hit",
    description:
      "Hand us your glass, we clean it inside the wagon, and return it fresh. No mess for you — done in our mobile setup.",
    startingAt: 29,
    memberStartingAt: 24,
    ctaLabel: "Book Fresh Hit",
    ctaHref: "/services#roll-up",
  },
  {
    id: "splifft-events",
    name: "Splifft Events",
    description:
      "Custom prepped cannabis for events — delivered ready before guests arrive. Not every event is the same; we build to your brief.",
    startingAt: 0,
    memberStartingAt: 0,
    ctaLabel: "Request quote",
    ctaHref: "/events",
    quoteOnly: true,
  },
];

export const membershipPerks: string[] = [
  "Member pricing on Roll Up",
  "Priority appointment times & VIP scheduling visibility",
  "VIP treatment at every handoff",
  "Early access to drops",
  "Glass tips and select upgrades included or discounted",
];

export const locations: LocationArea[] = [
  {
    slug: "port-huron",
    name: "Port Huron",
    blurb:
      "Roll Wagon routes with tight scheduling. Meet at the curb or lot — everything’s prepped inside the vehicle, then handed back ready.",
    neighborhoods: ["Downtown", "Fort Gratiot", "Marysville"],
  },
  {
    slug: "detroit",
    name: "Detroit",
    blurb:
      "City runs with event-aware timing. We prep from the wagon so you’re not rolling when you should be hosting.",
    neighborhoods: ["Midtown", "Corktown", "New Center"],
  },
  {
    slug: "ann-arbor",
    name: "Ann Arbor",
    blurb:
      "Neighborhood-friendly stops — appointment slots built around real traffic. Quick handoff; all work stays in the Roll Wagon.",
    neighborhoods: ["Kerrytown", "Burns Park", "Ypsi line"],
  },
  {
    slug: "macomb-county",
    name: "Macomb County",
    blurb:
      "Suburban meetups with the same mobile workstation: rolled, cleaned, or packed — done inside the wagon, returned ready to smoke.",
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
