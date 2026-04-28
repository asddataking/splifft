import { getStripePriceIdForPlan, PLAN_SLUGS, isRecurringPlan } from "@/lib/pricing";

export default function CheckoutOneTimePackPage() {
  const priceId = getStripePriceIdForPlan(PLAN_SLUGS.oneTimePack);
  const recurring = isRecurringPlan(PLAN_SLUGS.oneTimePack);

  return (
    <div className="flex-1 bg-[#0a0a0c] px-4 py-16">
      <div className="mx-auto max-w-2xl rounded-2xl border border-white/20 bg-black/40 p-6">
        <h1 className="font-[family-name:var(--font-display)] text-4xl uppercase text-[var(--splifft-cream)]">
          Checkout One-Time Pack
        </h1>
        <p className="mt-3 text-sm text-[var(--splifft-muted)]">
          Stripe checkout will create a one-time payment session when configured.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-[var(--splifft-cream)]">
          <li>Plan slug: {PLAN_SLUGS.oneTimePack}</li>
          <li>Recurring checkout: {recurring ? "yes" : "no"}</li>
          <li>Stripe price id: {priceId ?? "Missing STRIPE_PRICE_ONE_TIME_PACK"}</li>
        </ul>
      </div>
    </div>
  );
}
