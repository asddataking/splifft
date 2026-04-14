/**
 * Homepage and shared marketing copy — single source for labels and hero imagery.
 * Align with: Splifft Club, 5-packs, Dank Drops, and Splifft Events.
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
  eyebrow: "Join. Save. Shop.",
  lead: "Hand-rolled packs delivered to your door.",
  supporting: "Join the club for $7 to save $15 on every pack.",
  trustLine: "Michigan-based. Built for real smokers.",
  heroImageSrc: subscriptionHeroVisual.url,
  heroImageAlt: subscriptionHeroVisual.alt,
  cardTitle: "THE SMARTEST WAY TO SMOKE.",
  cardCaption: "Stop Rolling. Start Smoking.",
} as const;

export const chooseYourSplifftSection = {
  heading: "Shop your way",
  subheading:
    "Start with a 5-pack, then unlock The Vault for themed boxes.",
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
    "Simple setup: join for $7, save on every 5-pack, and unlock The Vault.",
  subscriptionTitle: "Core 5-Packs",
  subscriptionBullets: [
    "Sativa or Indica 5-pack",
    "Hand-rolled and delivered",
    "Members pay $60, guests pay $75",
    "No rolling needed",
  ],
  dropTitle: "The Vault (Dank Drops)",
  dropBullets: [
    "Themed boxes for every mood",
    "Members pay $19.99, guests pay $24.99",
    "Members see full access first",
    "Easy add-on after you pick a pack",
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
  heading: "Events only",
  subheading: "Need party prep? Splifft Events is custom quote only.",
} as const;

export const homeServiceCards = [] as const;

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
  heading: "Join Splifft Club & Save Fast",
  intro:
    "Pay $7 per month. Save $15 on every 5-pack and get lower Vault prices.",
  subscriptionPriceCallout:
    "5-Packs: $60 for members · $75 for guests.",
  pricingBlurb:
    "One pack already beats the fee: pay $7, save $15, net $8 saved today.",
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
