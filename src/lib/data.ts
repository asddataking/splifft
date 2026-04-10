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
      "Cozy night energy: curated rolls, snacks-forward pairing notes, and a tidy kit that feels like you packed for the woods.",
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
      "The munchies menu, leveled up. Built for grazing, sharing, and zero decision fatigue when the sesh hits.",
    price: 72,
    memberPrice: 61,
    badge: "Fan favorite",
    highlights: ["Shareable setup", "Graze-friendly", "Zero guesswork"],
  },
  {
    id: "pack-lake",
    slug: "lake-day-pack",
    name: "Lake Day Pack",
    description:
      "Sun, water, and a breezy bundle that travels clean. Everything sealed, labeled, and ready when you park.",
    price: 68,
    memberPrice: 58,
    highlights: ["Travel-tight", "Labeled jars", "Cooler-friendly layout"],
  },
  {
    id: "pack-mystery",
    slug: "mystery-pack",
    name: "Mystery Pack",
    description:
      "A rotating drop from the wagon. Same Splifft standards, a little surprise in every box.",
    price: 55,
    memberPrice: 47,
    badge: "Limited",
    highlights: ["Rotating picks", "Members shop first", "Collectible card"],
  },
];

export const serviceCards: ServiceCard[] = [
  {
    id: "quick-prep",
    name: "Quick Sesh Prep",
    description:
      "Fast, dialed prep when you want it handled: rolls staged, tools tidy, and a clean surface to spark on.",
    startingAt: 39,
    memberStartingAt: 33,
    ctaLabel: "Book now",
  },
  {
    id: "full-reset",
    name: "Full Sesh Reset",
    description:
      "The whole reset: prep, pack-out, and a wagon-style finish so your space feels brand new before you light up.",
    startingAt: 89,
    memberStartingAt: 75,
    ctaLabel: "Book now",
  },
  {
    id: "fresh-hit",
    name: "Fresh Hit",
    description:
      "Glass cleaning that actually gets you back to clear flavor—no weird residue, no rushed rinse.",
    startingAt: 29,
    memberStartingAt: 24,
    ctaLabel: "Book now",
  },
];

export const membershipPerks: string[] = [
  "Priority booking windows",
  "VIP experience at pull-ups",
  "Better pricing on packs and prep",
  "Early access to mystery drops",
  "Upgraded rolling options (glass tips, premium pack-outs)",
];

export const locations: LocationArea[] = [
  {
    slug: "port-huron",
    name: "Port Huron",
    blurb:
      "River town pull-ups with tight scheduling and a clean handoff at your door, dock, or driveway.",
    neighborhoods: ["Downtown", "Fort Gratiot", "Marysville"],
  },
  {
    slug: "detroit",
    name: "Detroit",
    blurb:
      "City routes with event-aware timing. We stage everything so you can host without the scramble.",
    neighborhoods: ["Midtown", "Corktown", "New Center"],
  },
  {
    slug: "ann-arbor",
    name: "Ann Arbor",
    blurb:
      "Campus-adjacent and neighborhood friendly—appointment slots built around real traffic, not guesswork.",
    neighborhoods: ["Kerrytown", "Burns Park", "Ypsi line"],
  },
  {
    slug: "macomb-county",
    name: "Macomb County",
    blurb:
      "Suburban stops with wagon setup: labeled packs, clean tools, and a consistent finish every time.",
    neighborhoods: ["Sterling Heights", "Clinton Twp", "Shelby Twp"],
  },
];

export const eventUpsells = [
  {
    id: "guest-packs",
    label: "Guest-ready packs",
    description: "Individual bundles so everyone gets something clean and consistent.",
  },
  {
    id: "premium-packaging",
    label: "Premium packaging",
    description: "Branded bags, labels, and a polished handoff for photos and gifting.",
  },
  {
    id: "curated-bundles",
    label: "Curated bundles",
    description: "Themed tables: lake day, cabin night, or fully custom to your crowd.",
  },
] as const;
