import { NextResponse } from "next/server";
import {
  PLAN_SLUGS,
  getStripePriceIdForPlan,
  isRecurringPlan,
} from "@/lib/pricing";

type CheckoutRequest = {
  plan_slug?: string;
  quantity?: number;
};

export async function POST(request: Request) {
  let body: CheckoutRequest;
  try {
    body = (await request.json()) as CheckoutRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const planSlug = body.plan_slug;
  const quantity = Math.max(1, Math.min(99, Number(body.quantity ?? 1) || 1));
  if (
    planSlug !== PLAN_SLUGS.monthlyAccess &&
    planSlug !== PLAN_SLUGS.oneTimePack
  ) {
    return NextResponse.json({ error: "Unsupported plan_slug" }, { status: 400 });
  }

  const stripePriceId = getStripePriceIdForPlan(planSlug);
  if (!stripePriceId) {
    return NextResponse.json(
      {
        error:
          planSlug === PLAN_SLUGS.monthlyAccess
            ? "Missing STRIPE_PRICE_MONTHLY_ACCESS"
            : "Missing STRIPE_PRICE_ONE_TIME_PACK",
      },
      { status: 503 },
    );
  }

  const mode = isRecurringPlan(planSlug) ? "subscription" : "payment";
  return NextResponse.json({
    ok: true,
    mode,
    plan_slug: planSlug,
    line_items: [{ price: stripePriceId, quantity }],
  });
}
