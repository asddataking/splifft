export type RollingTier = {
  grams: number;
  useCase: string;
  standardPrice: number;
  memberPrice: number;
  rollEstimateMin: number;
  rollEstimateMax: number;
  popular?: boolean;
};

/** Mobile rolling is priced by weight, not joint count. Estimates assume typical roll sizes. */
export const rollingTiers: RollingTier[] = [
  {
    grams: 3.5,
    useCase: "Quick personal sesh",
    standardPrice: 58,
    memberPrice: 49,
    rollEstimateMin: 5,
    rollEstimateMax: 8,
  },
  {
    grams: 7,
    useCase: "Weekend ready",
    standardPrice: 98,
    memberPrice: 83,
    rollEstimateMin: 10,
    rollEstimateMax: 16,
    popular: true,
  },
  {
    grams: 14,
    useCase: "Group session",
    standardPrice: 175,
    memberPrice: 149,
    rollEstimateMin: 22,
    rollEstimateMax: 32,
  },
  {
    grams: 28,
    useCase: "Event prep",
    standardPrice: 320,
    memberPrice: 272,
    rollEstimateMin: 44,
    rollEstimateMax: 60,
  },
];

export const minMobileGrams = 3.5;

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
    description: "Premium tips on every roll in your batch.",
    price: 18,
  },
  {
    id: "packaging",
    label: "Packaging upgrade",
    description: "Labeled jars, travel-tight bags, and a clean presentation.",
    price: 14,
  },
  {
    id: "dankndevour",
    label: "Add DankNDevour Pack",
    description: "Drop in our graze-ready bundle with your appointment.",
    price: 72,
  },
  {
    id: "fresh-hit",
    label: "Fresh Hit (glass cleaning)",
    description: "Add a glass pass so everything hits clean the same day.",
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
