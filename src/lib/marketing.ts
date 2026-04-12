/**
 * Homepage and shared marketing copy — single source for labels and hero imagery.
 * Align with: Splifft Subscription, Drop of the Month, Dank Drops, Roll Up, Fresh Hit, Splifft Events, Splifft Club.
 */

import { DROP_OF_THE_MONTH_SLUG } from "@/lib/drop-of-the-month";
import { SPLIFFT_MONTHLY_SLUG } from "@/lib/splifft-monthly-teaser";
import {
  DANKNDEVOUR_REVIEWS_URL,
  DANKNDEVOUR_SITE_URL,
} from "@/lib/site";

/** Curated one-off / gift boxes (static catalog ids). */
export const dankDropProductIds = [
  "pack-mystery",
  "pack-cabin",
  "pack-lake",
  "pack-dankndevour",
] as const;

export const heroMarketing = {
  eyebrow: "Product-first · Curated monthly",
  lead: "Get artisinally hand rolled joints and curated sesh boxes delivered to your door.",
  supporting: "No rolling. No prep. Just smoke.",
  serviceLine: "Built like a service appointment. Delivered like a perfect sesh.",
  trustLine: "Michigan-based. Built for real smokers.",
  heroImageSrc:
    "https://images.unsplash.com/photo-1449965408867-eaa3f722e40d?w=800&q=80",
  heroImageAlt: "Night drive — Splifft delivery energy",
  cardTitle: "READY TO LIGHT UP.",
  cardCaption: "Curated monthly. Everything handled.",
} as const;

export const chooseYourSplifftSection = {
  heading: "Choose your Splifft",
  subheading:
    "The main fork: your monthly joints, or this month’s limited curated box.",
} as const;

export type ChooseSplifftCard = {
  title: string;
  body: string;
  bullets: readonly string[];
  cta: string;
  href: string;
  stripe: string;
};

export const chooseSplifftCards: ChooseSplifftCard[] = [
  {
    title: "Splifft Subscription",
    body: "Your sesh, handled every month.",
    bullets: [
      "5 × 0.7g joints",
      "glass tip included",
      "indica or sativa",
    ],
    cta: "Start Subscription",
    href: `/shop/${SPLIFFT_MONTHLY_SLUG}`,
    stripe: "from-[var(--splifft-pink)]/25 to-transparent",
  },
  {
    title: "Drop of the Month",
    body: "A curated box built for this month’s vibe.",
    bullets: ["rotating theme", "limited feel", "member discount"],
    cta: "Get This Month’s Drop",
    href: `/shop/${DROP_OF_THE_MONTH_SLUG}`,
    stripe: "from-[var(--splifft-blue)]/25 to-transparent",
  },
] as const;

export const whatYouGetSection = {
  heading: "What you get",
  subheading: "Built for easier sessions — fast to understand, ready when you are.",
  subscriptionTitle: "Splifft Subscription",
  subscriptionBullets: [
    "5 artisinally hand rolled 0.7g joints",
    "glass tip included",
    "curated monthly",
    "delivered ready",
  ],
  dropTitle: "Drop of the Month",
  dropBullets: [
    "rotating themed box",
    "snacks, gear, sesh items",
    "exclusive limited feel",
    "themed extras inside",
  ],
} as const;

export const dankDropsSection = {
  heading: "Dank Drops",
  subheading: "Curated sesh boxes built for real sessions.",
  intro:
    "Grab one on its own, gift one, or add one to your monthly. Great on their own — perfect for trips, gifts, and one-off sessions.",
} as const;

export const fullSeshSection = {
  heading: "Make it a full sesh",
  subheading:
    "Start with your monthly or this month’s drop — then layer in the extras.",
  tileSubscription: "Splifft Subscription",
  tileDrop: "Drop of the Month",
  tileDrops: "Dank Drops",
} as const;

export const servicesPreviewSection = {
  heading: "Need it done today?",
  subheading:
    "Mobile handoff services for quicker, easier sessions.",
} as const;

export const homeServiceCards = [
  {
    id: "roll-up",
    name: "Roll Up",
    description:
      "We pull up, take your flower, prep it, and hand it back ready.",
    ctaLabel: "Book Roll Up",
    ctaHref: "/services/roll-up",
  },
  {
    id: "fresh-hit",
    name: "Fresh Hit",
    description:
      "Hand us your glass. We clean it and return it fresh.",
    ctaLabel: "Book Fresh Hit",
    ctaHref: "/services/fresh-hit",
  },
] as const;

export const eventsTeaserSection = {
  heading: "Stop Rolling. Start Hosting.",
  subheading: "Cannabis, prepared for your event.",
  body: "From weddings to private parties, Splifft Events helps you plan cannabis experiences that are prepped, curated, and ready before your guests arrive.",
  cta: "Request Event Quote",
} as const;

export const serviceAreaSection = {
  heading: "Where We Pull Up",
  subheading: "Michigan — we meet you for handoff when you book services.",
} as const;

export const membershipSection = {
  eyebrow: "Membership",
  heading: "Join Splifft Club & Save Every Sesh",
  intro:
    "Lower pricing, priority access, and VIP perks built into every order.",
  pricingBlurb:
    "Save on Splifft Subscription, Drop of the Month, and Dank Drops — plus Roll Up, priority times, early drops, and glass tip upgrades.",
} as const;

export const dankndevourPartnerSection = {
  heading: "Powered by DankNDevour",
  subheading: "Real food. Real smoke. Real sessions.",
  supportLine:
    "Discover pairings, spots, and local session inspiration.",
  ctaVisit: "Visit DankNDevour",
  ctaReviews: "Watch Reviews",
  visitUrl: DANKNDEVOUR_SITE_URL,
  reviewsUrl: DANKNDEVOUR_REVIEWS_URL,
} as const;
