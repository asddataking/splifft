/**
 * Homepage and shared marketing copy — single source for labels and hero/wow imagery.
 * Keep names aligned: Roll Up, Fresh Hit, Splifft Events, Shop packs, Splifft Club.
 */

import { getPackImage } from "@/lib/pack-images";
import { SPLIFFT_MONTHLY_SLUG } from "@/lib/splifft-monthly-teaser";

export const heroMarketing = {
  eyebrow: "We meet you · Prep done for you",
  lead: "We pull up, prep your smoke, and hand it back ready.",
  supporting:
    "Fast meet-up. Clean prep. Ready to smoke. You skip the mess — we bring the service.",
  heroImageSrc:
    "https://images.unsplash.com/photo-1449965408867-eaa3f722e40d?w=800&q=80",
  heroImageAlt: "Night drive — car on the road, we pull up to meet you",
  cardTitle: "ROLL UP. GRAB IT. SMOKE.",
  cardCaption: "We prep it. You take it. Done.",
} as const;

export type HomeActionCard = {
  title: string;
  body: string;
  cta: string;
  href: string;
  stripe: string;
};

export const homeActionCards: HomeActionCard[] = [
  {
    title: "Roll Up",
    body: "We meet you, take your flower, roll it, and hand it back ready.",
    cta: "Book Roll Up",
    href: "/services/roll-up",
    stripe: "from-[var(--splifft-pink)]/25 to-transparent",
  },
  {
    title: "Shop packs",
    body: "Add-ons and themed packs that go with your Roll Up.",
    cta: "Shop packs",
    href: "/shop",
    stripe: "from-[var(--splifft-blue)]/25 to-transparent",
  },
  {
    title: "Splifft Events",
    body: "We prep cannabis for your party — ready before guests show up.",
    cta: "Request quote",
    href: "/services/events",
    stripe: "from-white/10 to-transparent",
  },
];

export const actionCardsSection = {
  heading: "Pick your path",
  subheading:
    "Need mobile prep? Book Roll Up. Want extras? Shop packs. Hosting a crowd? Get a Splifft Events quote — three doors, one brand.",
} as const;

export type WowTile = {
  title: string;
  caption: string;
  src: string;
  alt: string;
  href?: string;
};

const splifftMonthlyImage = getPackImage(SPLIFFT_MONTHLY_SLUG);

export const wowGridTiles: WowTile[] = [
  {
    title: "Splifft Subscription",
    caption: "Hand-rolled joints, glass tips, monthly delivery — coming soon.",
    src: splifftMonthlyImage.url,
    alt: splifftMonthlyImage.alt,
    href: `/shop/${SPLIFFT_MONTHLY_SLUG}`,
  },
  {
    title: "Fresh Hit",
    caption: "Glass comes back clean and ready.",
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    alt: "Clear glass on a dark surface — clean and simple",
  },
  {
    title: "Packs",
    caption: "Boxes and add-ons for your order.",
    src: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
    alt: "Stacked shipping boxes and packages",
  },
  {
    title: "Easy mode",
    caption: "No rolling table at your place. We handle it.",
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    alt: "Friends relaxing together",
  },
];

export const wowGridSection = {
  heading: "More ways to Splifft",
  subheading:
    "Subscription delivery, clean glass, curated packs — plus Roll Up when you want us on-site.",
} as const;

export const featuredPacksSection = {
  heading: "Featured packs",
  subheading:
    "Add packs to your Roll Up — picks for a better night in or out. Splifft Subscription (monthly joints) lives in the shop.",
} as const;

export const servicesPreviewSection = {
  heading: "Services — book like an appointment",
  subheading:
    "Roll Up is the main move — we prep and hand it back ready. Fresh Hit, Splifft Events, packs, and Splifft Club fill out the list.",
} as const;

export const eventsTeaserSection = {
  heading: "Stop Rolling. Start Hosting.",
  body: "We prep cannabis for your event before anyone rings the doorbell. Timelines, packs, and timing — custom quote because every party is different.",
  cta: "Request quote",
} as const;

export const serviceAreaSection = {
  heading: "Where we pull up",
  subheading: "Michigan — curb or lot, quick meet-up.",
} as const;

export const membershipSection = {
  eyebrow: "Membership",
  heading: "Splifft Club",
  intro:
    "Lower prices, first pick of times, early drops, and glass-tip perks — worth it if you order often.",
  pricingBlurb:
    "Save on Roll Up, get better time slots, early drops, and glass-tip perks — members first.",
} as const;
