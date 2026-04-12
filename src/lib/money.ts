/** Round to cents for USD math. */
export function roundUsd(amount: number): number {
  return Math.round(amount * 100) / 100;
}

/**
 * USD for shop UI — omits “.00” for whole dollars (e.g. $64) but keeps cents
 * when present (e.g. $24.99).
 */
export function formatUsdForShop(amount: number): string {
  const rounded = roundUsd(amount);
  const cents = Math.round(rounded * 100) % 100;
  const hasCents = cents !== 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(rounded);
}
