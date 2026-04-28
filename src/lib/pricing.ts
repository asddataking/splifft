export const PLAN_SLUGS = {
  monthlyAccess: "monthly_access",
  oneTimePack: "one_time_pack",
} as const;

export const PLAN_PRICING_CENTS = {
  monthlyAccess: 6000,
  oneTimePack: 7500,
} as const;

export const PLAN_PRICING_USD = {
  monthlyAccess: PLAN_PRICING_CENTS.monthlyAccess / 100,
  oneTimePack: PLAN_PRICING_CENTS.oneTimePack / 100,
} as const;

export const ACCESS_PERKS = {
  monthly_access: [
    "5 premium Spliffts",
    "Glass filter tips",
    "Branded Splifft bands",
    "Monthly delivery",
    "First access to limited drops",
    "First access to future flower collabs",
    "First access to future rosin collabs",
    "Future Signature Splifft releases",
    "Skip anytime",
    "Cancel anytime",
  ],
  one_time_pack: [
    "5 premium Spliffts",
    "Glass filter tips",
    "Branded Splifft bands",
    "Single purchase",
    "No early access",
    "No monthly perks",
  ],
} as const;

export const STRIPE_PRICE_MONTHLY_ACCESS =
  process.env.STRIPE_PRICE_MONTHLY_ACCESS ?? "";

export const STRIPE_PRICE_ONE_TIME_PACK =
  process.env.STRIPE_PRICE_ONE_TIME_PACK ?? "";

export function getStripePriceIdForPlan(planSlug: string): string | null {
  if (planSlug === PLAN_SLUGS.monthlyAccess) {
    return STRIPE_PRICE_MONTHLY_ACCESS || null;
  }
  if (planSlug === PLAN_SLUGS.oneTimePack) {
    return STRIPE_PRICE_ONE_TIME_PACK || null;
  }
  return null;
}

export function isRecurringPlan(planSlug: string): boolean {
  return planSlug === PLAN_SLUGS.monthlyAccess;
}
