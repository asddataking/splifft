export type RollingTier = {
  grams: number;
  useCase: string;
  standardPrice: number;
  memberPrice: number;
  popular?: boolean;
};

/** Hash-hole pre-rolls: +20% on the tier service price (regular spliff list). */
export const HASH_HOLE_PRICE_MULTIPLIER = 1.2;

export type RollStyleId = "regular" | "hash-hole";

export type InfusionId = "none" | "crumble" | "rosin";

/** Roll Up is priced by flower weight. Pre-roll count is derived from weight + roll size in the booking UI. */
export const rollingTiers: RollingTier[] = [
  {
    grams: 3.5,
    useCase: "Eighth — solo or small night",
    standardPrice: 34.99,
    memberPrice: 29.99,
  },
  {
    grams: 7,
    useCase: "Quarter — weekend ready",
    standardPrice: 59.99,
    memberPrice: 49.99,
    popular: true,
  },
  {
    grams: 14,
    useCase: "Half — group-ready",
    standardPrice: 89.99,
    memberPrice: 75,
  },
  {
    grams: 28,
    useCase: "Ounce — event prep",
    standardPrice: 119,
    memberPrice: 99,
  },
];

/** Round USD for display and cent storage. */
export function roundUsd(amount: number): number {
  return Math.round(amount * 100) / 100;
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export const minMobileGrams = 3.5;

export type RollSizeOption = {
  id: string;
  gramsPerRoll: number;
  label: string;
};

export const rollSizeOptions: RollSizeOption[] = [
  { id: "r05", gramsPerRoll: 0.5, label: "0.5g" },
  { id: "r07", gramsPerRoll: 0.7, label: "0.7g" },
  { id: "r10", gramsPerRoll: 1, label: "1g" },
  { id: "r20", gramsPerRoll: 2, label: "2g" },
];

/** Estimated count from flower weight and chosen roll size (floor; trim loss not modeled). */
export function estimatePreRollCount(
  flowerGrams: number,
  gramsPerRoll: number,
): number {
  if (gramsPerRoll <= 0) return 0;
  const n = flowerGrams / gramsPerRoll;
  return Math.max(0, Math.floor(n + 1e-9));
}

export type BookingUpgrade = {
  id: string;
  label: string;
  description: string;
  price: number;
};

export const bookingUpgrades: BookingUpgrade[] = [
  {
    id: "glass-tips",
    label: "Glass tips",
    description: "Glass tips on your rolls — ready when we meet you.",
    price: 18,
  },
  {
    id: "tube-packaging",
    label: "Tube packaging",
    description: "Tubes so your rolls travel clean after we meet you.",
    price: 14,
  },
  {
    id: "labeled-packs",
    label: "Labeled packs",
    description: "Clear labels on every pack — easy to grab and go.",
    price: 12,
  },
  {
    id: "dankndevour",
    label: "DankNDevour bundle",
    description: "Add our graze-ready bundle to the same appointment.",
    price: 72,
  },
];

/** Fresh Hit cleaning types — separate booking flow from Roll Up. */
export type FreshHitCleaningType = {
  id: string;
  label: string;
  description: string;
  standardPrice: number;
  memberPrice: number;
};

export const freshHitCleaningTypes: FreshHitCleaningType[] = [
  {
    id: "small-piece",
    label: "Small piece",
    description: "Bowls, chillums, small pipes — quick clean, same meet-up.",
    standardPrice: 22,
    memberPrice: 18,
  },
  {
    id: "bong-rig",
    label: "Bong / rig",
    description: "Full-size water pieces — soak, rinse, and polish for a fresh hit.",
    standardPrice: 35,
    memberPrice: 29,
  },
  {
    id: "heavy-clean",
    label: "Heavy clean",
    description: "Dirty or neglected glass — extra soak, same meet-up.",
    standardPrice: 48,
    memberPrice: 40,
  },
  {
    id: "multi-piece",
    label: "Multi-piece",
    description: "Several pieces in one visit — we confirm scope when we meet.",
    standardPrice: 55,
    memberPrice: 46,
  },
];

export type FreshHitAddon = {
  id: string;
  label: string;
  description: string;
  price: number;
};

/** Fresh Hit step-2 priced sesh upgrades (internal ids still `addon_*` in DB). */
export const freshHitAddons: FreshHitAddon[] = [
  {
    id: "priority-turnaround",
    label: "Priority turnaround",
    description: "Bump your slot — first off the line when we pull up (mock).",
    price: 15,
  },
  {
    id: "multi-piece-pricing",
    label: "Extra piece (same visit)",
    description: "Additional piece beyond your base type — stacked on the same visit.",
    price: 12,
  },
  {
    id: "protective-packaging",
    label: "Protective packaging",
    description: "Padded bags or tubes so glass rides home safe.",
    price: 10,
  },
];

export const standardTimeSlots = [
  "10:00 AM",
  "1:30 PM",
  "4:30 PM",
] as const;

export const memberPrioritySlots = [
  "9:00 AM",
  "11:00 AM",
  "2:00 PM",
  "5:30 PM",
  "7:30 PM",
] as const;
