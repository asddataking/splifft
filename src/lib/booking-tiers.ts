export type RollingTier = {
  grams: number;
  useCase: string;
  standardPrice: number;
  memberPrice: number;
  popular?: boolean;
};

/** Roll Up is priced by flower weight. Pre-roll count is derived from weight + roll size in the booking UI. */
export const rollingTiers: RollingTier[] = [
  {
    grams: 3.5,
    useCase: "Quick personal sesh",
    standardPrice: 58,
    memberPrice: 49,
  },
  {
    grams: 7,
    useCase: "Weekend ready",
    standardPrice: 98,
    memberPrice: 83,
    popular: true,
  },
  {
    grams: 14,
    useCase: "Group-ready",
    standardPrice: 175,
    memberPrice: 149,
  },
  {
    grams: 28,
    useCase: "Event prep",
    standardPrice: 320,
    memberPrice: 272,
  },
];

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
    description: "Premium glass tips on your rolls — mobile handoff when ready.",
    price: 18,
  },
  {
    id: "tube-packaging",
    label: "Tube packaging",
    description: "Protective tubes so your rolls travel clean after handoff.",
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
    description: "Bowls, chillums, small pipes — quick clean, mobile handoff.",
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
    description: "Reclaim-heavy or neglected glass — extra soak time, same handoff.",
    standardPrice: 48,
    memberPrice: 40,
  },
  {
    id: "multi-piece",
    label: "Multi-piece",
    description: "Multiple pieces in one stop — scope confirmed at meet-up.",
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

/** Fresh Hit step-2 add-ons (priced). */
export const freshHitAddons: FreshHitAddon[] = [
  {
    id: "priority-turnaround",
    label: "Priority turnaround",
    description: "Bump your slot — first off the line when we pull up (mock).",
    price: 15,
  },
  {
    id: "multi-piece-pricing",
    label: "Extra piece add-on",
    description: "Additional piece beyond your base type — stacked on the same visit.",
    price: 12,
  },
  {
    id: "protective-packaging",
    label: "Protective packaging",
    description: "Padded bags or tubes so glass rides home safe after handoff.",
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
