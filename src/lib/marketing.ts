/**
 * Homepage and shared marketing copy — single source for labels and hero imagery.
 * Align with: Splifft Subscription, Drop of the Month, Dank Drops, Roll Up, Fresh Hit, Splifft Events, Splifft Club.
 */

import {
  DROP_OF_THE_MONTH_SLUG,
  dropOfTheMonthTheme,
} from "@/lib/drop-of-the-month";
import { getPackImage } from "@/lib/pack-images";
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

/** Same asset as Splifft Subscription PDP / shop teaser (`splifft-monthly` in pack-images). */
const subscriptionHeroVisual = getPackImage(SPLIFFT_MONTHLY_SLUG);

export const heroMarketing = {
  eyebrow: "Product-first · Curated monthly",
  lead: "Get artisinally hand rolled joints and curated sesh boxes delivered to your door.",
  supporting: "No rolling. No prep. Just smoke.",
  trustLine: "Michigan-based. Built for real smokers.",
  heroImageSrc: subscriptionHeroVisual.url,
  heroImageAlt: subscriptionHeroVisual.alt,
  cardTitle: "READY TO LIGHT UP.",
  cardCaption: "Curated monthly. Everything handled.",
} as const;

export const chooseYourSplifftSection = {
  heading: "Choose your Splifft",
  subheading:
    "Pick your monthly joints, or this month’s limited curated box — both are built to sesh.",
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
      "Indica or Sativa — your choice",
    ],
    cta: "Start Subscription",
    href: `/shop/${SPLIFFT_MONTHLY_SLUG}`,
    stripe: "from-[var(--splifft-pink)]/25 to-transparent",
  },
  {
    title: "Drop of the Month",
    body: "This month’s curated sesh. Limited. Ready.",
    bullets: [
      `${dropOfTheMonthTheme.themeName} — rotating theme`,
      "Snacks, gear & vibe picks",
      "Member & non-member pricing — exclusive feel",
    ],
    cta: "Get This Month’s Drop",
    href: `/shop/${DROP_OF_THE_MONTH_SLUG}`,
    stripe: "from-[var(--splifft-blue)]/25 to-transparent",
  },
] as const;

export const whatYouGetSection = {
  heading: "What you get",
  subheading:
    "Two ways in — subscription joints or the monthly box. Both are curated, limited where it counts, and built for real sessions.",
  subscriptionTitle: "Splifft Subscription",
  subscriptionBullets: [
    "5 × 0.7g joints — artisinally hand rolled",
    "glass tip included",
    "curated monthly",
    "delivered ready — no prep at your place",
  ],
  dropTitle: "Drop of the Month",
  dropBullets: [
    "rotating themed box each month",
    "snacks, gear, and vibe-forward picks",
    "exclusive, limited feel",
    "stack with your sub or grab solo",
  ],
} as const;

export const dankDropsSection = {
  heading: "Dank Drops",
  subheading: "Curated sesh boxes — not random filler. Each one’s a vibe.",
  intro:
    "Cabin, lake day, mystery, DankNDevour — pick a curated drop, add it to your subscription, or run it solo.",
} as const;

export const fullSeshSection = {
  heading: "Make it a full sesh",
  subheading:
    "Add a Dank Drop to your subscription, or buy one on its own — trips, gifts, or leveling up the night.",
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
      "We pull up. You hand it off. We prep it and return it ready.",
    ctaLabel: "Book Roll Up",
    ctaHref: "/services/roll-up",
  },
  {
    id: "fresh-hit",
    name: "Fresh Hit",
    description: "Clean glass. Better hits.",
    ctaLabel: "Book Fresh Hit",
    ctaHref: "/services/fresh-hit",
  },
] as const;

export const eventsTeaserSection = {
  heading: "Stop Rolling. Start Hosting.",
  subheading: "Cannabis, prepared for your event.",
  body: "Weddings, private parties, brand nights — Splifft Events is concierge prep: curated, on your timeline, ready before guests arrive.",
  cta: "Request Event Quote",
} as const;

export const serviceAreaSection = {
  heading: "Where We Pull Up",
  subheading:
    "Michigan — tap a city for neighborhoods and coverage, or open the full locations hub.",
} as const;

export const membershipSection = {
  eyebrow: "Membership",
  heading: "Join Splifft Club & Save Every Sesh",
  intro:
    "Lower subscription and drop prices, priority booking, early access, and glass-tip upgrades — repeat buyers win.",
  subscriptionPriceCallout:
    "Splifft Subscription: $60/mo members · $75/mo non-members — save $15 every month in Club.",
  pricingBlurb:
    "Club is $9/mo on top of those product savings — worth it if you order often.",
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
