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
  { id: "r05", gramsPerRoll: 0.5, label: "0.5g rolls" },
  { id: "r07", gramsPerRoll: 0.7, label: "0.7g rolls" },
  { id: "r10", gramsPerRoll: 1, label: "1g rolls" },
  { id: "r20", gramsPerRoll: 2, label: "2g rolls" },
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
    description: "Premium glass tips on your rolls — done inside the Roll Wagon.",
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
  {
    id: "fresh-hit",
    label: "Fresh Hit (glass cleaning)",
    description:
      "Hand us your glass; we clean it inside the wagon and return it fresh.",
    price: 35,
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
