"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductImage } from "@/components/ui/ProductImage";
import { SplifftButton } from "@/components/ui/SplifftButton";
import { PLAN_PRICING_USD, PLAN_SLUGS } from "@/lib/pricing";

type PlanSlug = (typeof PLAN_SLUGS)[keyof typeof PLAN_SLUGS];
type CheckoutStep = "plan" | "addons" | "review" | "payment";
type DropKey = "cabin" | "lake_day" | "mystery";

type DropOption = {
  key: DropKey;
  name: string;
  description: string;
  price: number;
  image: string;
  fallbackLabel: string;
};

const checkoutSteps: { id: CheckoutStep; label: string }[] = [
  { id: "plan", label: "Choose Your Access" },
  { id: "addons", label: "Add a Drop" },
  { id: "review", label: "Review" },
  { id: "payment", label: "Payment" },
];

const dropOptions: DropOption[] = [
  {
    key: "cabin",
    name: "Cabin Drop",
    description: "Cozy limited mix for weekends up north.",
    price: 18,
    image: "/events-private-parties.jpg",
    fallbackLabel: "splifft-lifestyle-session.png",
  },
  {
    key: "lake_day",
    name: "Lake Day Drop",
    description: "Bright, social add-on for daytime sessions.",
    price: 22,
    image: "/events-brand-rooftop.jpg",
    fallbackLabel: "splifft-pack-hero.png",
  },
  {
    key: "mystery",
    name: "Mystery Drop",
    description: "Surprise seasonal extra curated by Splifft.",
    price: 20,
    image: "/events-weddings-milestones.jpg",
    fallbackLabel: "splifft-box-open.png",
  },
];

function formatUsd(value: number) {
  return `$${value.toFixed(2)}`;
}

export function CheckoutFlowClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get("plan");
  const initialStep = searchParams.get("step");

  const [step, setStep] = useState<CheckoutStep>(
    initialStep === "addons" ? "addons" : "plan",
  );
  const [plan, setPlan] = useState<PlanSlug>(
    initialPlan === PLAN_SLUGS.oneTimePack
      ? PLAN_SLUGS.oneTimePack
      : PLAN_SLUGS.monthlyAccess,
  );
  const [selectedDrops, setSelectedDrops] = useState<DropKey[]>([]);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "loading" | "mock_ready" | "error"
  >("idle");
  const [paymentMessage, setPaymentMessage] = useState<string>("");

  const currentStepIndex = useMemo(
    () => checkoutSteps.findIndex((s) => s.id === step),
    [step],
  );

  const basePrice =
    plan === PLAN_SLUGS.monthlyAccess
      ? PLAN_PRICING_USD.monthlyAccess
      : PLAN_PRICING_USD.oneTimePack;

  const dropsTotal = dropOptions
    .filter((drop) => selectedDrops.includes(drop.key))
    .reduce((sum, drop) => sum + drop.price, 0);
  const subtotal = basePrice + dropsTotal;

  const isLastStep = step === "payment";
  const continueLabel = isLastStep ? "Finish" : "Continue";

  const selectedDropData = dropOptions.filter((drop) =>
    selectedDrops.includes(drop.key),
  );

  function toggleDrop(dropKey: DropKey) {
    setSelectedDrops((prev) =>
      prev.includes(dropKey)
        ? prev.filter((item) => item !== dropKey)
        : [...prev, dropKey],
    );
  }

  function goNext() {
    if (step === "plan") setStep("addons");
    if (step === "addons") setStep("review");
    if (step === "review") setStep("payment");
  }

  function goBack() {
    if (step === "payment") setStep("review");
    if (step === "review") setStep("addons");
    if (step === "addons") setStep("plan");
  }

  async function onPaymentContinue() {
    setPaymentStatus("loading");
    setPaymentMessage("");
    try {
      // TODO: Replace with Stripe Payment Element intent creation once backend is wired.
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan_slug: plan,
          quantity: 1,
          drops: selectedDrops,
        }),
      });
      const data = (await response.json()) as { error?: string; mode?: string };
      if (!response.ok) {
        throw new Error(data.error ?? "Unable to start checkout.");
      }
      setPaymentStatus("mock_ready");
      setPaymentMessage(
        data.mode === "subscription"
          ? "Monthly checkout prepared. Connect Stripe Payment Element to complete payment."
          : "One-time checkout prepared. Connect Stripe Payment Element to complete payment.",
      );
      window.setTimeout(() => {
        router.push(
          `/checkout/success?plan=${encodeURIComponent(plan)}&total=${encodeURIComponent(subtotal.toFixed(2))}`,
        );
      }, 600);
    } catch (error) {
      setPaymentStatus("error");
      setPaymentMessage(
        error instanceof Error ? error.message : "Unable to start checkout.",
      );
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_10%,rgba(255,45,146,0.18),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(0,191,255,0.16),transparent_40%),linear-gradient(180deg,#07070b,#0b0912)] px-4 pb-28 pt-10 md:pb-10">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
          Build Your Splifft Box
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl uppercase leading-[0.9] text-[var(--splifft-cream)] md:text-6xl">
          Checkout
        </h1>
        <p className="mt-2 text-sm text-[var(--splifft-muted)] md:text-base">
          A branded Splifft flow before secure payment.
        </p>

        <div className="mt-5 grid gap-2 rounded-2xl border border-white/10 bg-black/30 p-3 md:grid-cols-4">
          {checkoutSteps.map((checkoutStep, index) => {
            const isActive = checkoutStep.id === step;
            const isComplete = index < currentStepIndex;
            return (
              <div
                key={checkoutStep.id}
                className={`rounded-xl px-3 py-2 text-xs uppercase tracking-[0.14em] ${
                  isActive
                    ? "bg-fuchsia-500/20 text-fuchsia-200"
                    : isComplete
                      ? "bg-cyan-500/15 text-cyan-200"
                      : "bg-white/5 text-[var(--splifft-muted)]"
                }`}
              >
                {index + 1}. {checkoutStep.label}
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-[1.4fr_0.9fr]">
          <main className="space-y-4">
            {step === "plan" ? (
              <section className="premium-glow-frame rounded-3xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm md:p-6">
                <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-cream)]">
                  Choose Your Access
                </h2>
                <div className="mt-4 grid gap-3">
                  <button
                    type="button"
                    onClick={() => setPlan(PLAN_SLUGS.monthlyAccess)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      plan === PLAN_SLUGS.monthlyAccess
                        ? "border-fuchsia-300/70 bg-fuchsia-500/15 shadow-[0_0_24px_rgba(255,45,146,0.25)]"
                        : "border-white/20 bg-white/[0.03]"
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.14em] text-cyan-300">Best Value</p>
                    <p className="mt-1 text-2xl font-semibold text-[var(--splifft-cream)]">
                      Monthly Access
                    </p>
                    <p className="text-lg font-bold text-cyan-300">$60 / month</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlan(PLAN_SLUGS.oneTimePack)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      plan === PLAN_SLUGS.oneTimePack
                        ? "border-fuchsia-300/70 bg-fuchsia-500/15 shadow-[0_0_24px_rgba(255,45,146,0.25)]"
                        : "border-white/20 bg-white/[0.03]"
                    }`}
                  >
                    <p className="mt-1 text-2xl font-semibold text-[var(--splifft-cream)]">
                      One-Time Pack
                    </p>
                    <p className="text-lg font-bold text-[var(--splifft-cream)]">$75</p>
                  </button>
                </div>
              </section>
            ) : null}

            {step === "addons" ? (
              <section className="premium-glow-frame rounded-3xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm md:p-6">
                <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-cream)]">
                  Add a Drop to Your Box
                </h2>
                <p className="mt-2 text-sm text-[var(--splifft-muted)]">
                  Optional limited extras for lake days, cabin weekends, parties, and mystery sessions.
                </p>
                <div className="mt-4 grid gap-3">
                  {dropOptions.map((drop) => {
                    const active = selectedDrops.includes(drop.key);
                    return (
                      <article
                        key={drop.key}
                        className={`premium-tilt-card rounded-2xl border p-4 ${
                          active
                            ? "border-cyan-300/60 bg-cyan-500/10"
                            : "border-white/20 bg-white/[0.03]"
                        }`}
                      >
                        <div className="grid grid-cols-[84px_1fr] gap-3">
                          <div className="relative h-20 overflow-hidden rounded-xl border border-white/15">
                            <ProductImage
                              src={drop.image}
                              alt={`${drop.name} lifestyle preview`}
                              fallbackLabel={drop.fallbackLabel}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-xl font-semibold text-[var(--splifft-cream)]">
                              {drop.name}
                            </p>
                            <p className="mt-1 text-sm text-[var(--splifft-muted)]">
                              {drop.description}
                            </p>
                            <div className="mt-3 flex items-center justify-between">
                              <p className="text-sm font-semibold text-cyan-300">
                                {formatUsd(drop.price)}
                              </p>
                              <SplifftButton
                                onClick={() => toggleDrop(drop.key)}
                                variant={active ? "secondary" : "ghost"}
                                className="min-h-[38px] px-3 py-1 text-sm"
                              >
                                {active ? "Remove" : "Add"}
                              </SplifftButton>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ) : null}

            {step === "review" ? (
              <section className="premium-glow-frame rounded-3xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm md:p-6">
                <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-cream)]">
                  Review
                </h2>
                <div className="mt-4 space-y-2 text-sm text-[var(--splifft-cream)]">
                  <p>
                    Plan:{" "}
                    <span className="font-semibold">
                      {plan === PLAN_SLUGS.monthlyAccess ? "Monthly Access" : "One-Time Pack"}
                    </span>
                  </p>
                  <p>
                    Billing:{" "}
                    <span className="font-semibold">
                      {plan === PLAN_SLUGS.monthlyAccess ? "Recurring monthly" : "One-time payment"}
                    </span>
                  </p>
                  <p>
                    Drops:{" "}
                    <span className="font-semibold">
                      {selectedDropData.length
                        ? selectedDropData.map((drop) => drop.name).join(", ")
                        : "None"}
                    </span>
                  </p>
                  <p>
                    Estimated total:{" "}
                    <span className="font-semibold text-cyan-300">{formatUsd(subtotal)}</span>
                  </p>
                </div>
              </section>
            ) : null}

            {step === "payment" ? (
              <section className="premium-glow-frame rounded-3xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm md:p-6">
                <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-cream)]">
                  Payment
                </h2>
                <p className="mt-2 text-sm text-[var(--splifft-muted)]">
                  Enter payment details securely in the embedded Stripe Payment Element.
                </p>
                <div className="mt-4 rounded-2xl border border-white/15 bg-black/35 p-4">
                  <p className="text-sm text-[var(--splifft-muted)]">
                    Payment Element placeholder UI.
                  </p>
                  <p className="mt-2 text-xs text-[var(--splifft-muted)]">
                    TODO: Mount Stripe Payment Element after creating a PaymentIntent/SetupIntent.
                  </p>
                </div>
                {paymentMessage ? (
                  <p
                    className={`mt-4 text-sm ${
                      paymentStatus === "error" ? "text-rose-300" : "text-cyan-300"
                    }`}
                  >
                    {paymentMessage}
                  </p>
                ) : null}
              </section>
            ) : null}
          </main>

          <aside className="premium-glow-frame rounded-3xl border border-white/15 bg-black/35 p-5 md:sticky md:top-6 md:h-fit">
            <h3 className="text-lg font-semibold uppercase tracking-[0.12em] text-[var(--splifft-cream)]">
              Order Summary
            </h3>
            <div className="mt-4 space-y-2 text-sm text-[var(--splifft-cream)]">
              <div className="flex justify-between gap-3">
                <span>{plan === PLAN_SLUGS.monthlyAccess ? "Monthly Access" : "One-Time Pack"}</span>
                <span className="font-semibold">{formatUsd(basePrice)}</span>
              </div>
              {selectedDropData.map((drop) => (
                <div key={drop.key} className="flex justify-between gap-3 text-[var(--splifft-muted)]">
                  <span>{drop.name}</span>
                  <span>{formatUsd(drop.price)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-white/10 pt-3">
              <div className="flex items-center justify-between text-base font-semibold text-[var(--splifft-cream)]">
                <span>Estimated subtotal</span>
                <span className="text-cyan-300">{formatUsd(subtotal)}</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-[var(--splifft-muted)]">
              {plan === PLAN_SLUGS.monthlyAccess
                ? "Monthly plan renews every month until canceled."
                : "One-Time Pack is charged once."}
            </p>
          </aside>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[rgba(7,7,11,0.95)] p-3 backdrop-blur-xl md:hidden">
        <div className="mx-auto flex w-full max-w-md gap-2">
          {step !== "plan" ? (
            <SplifftButton onClick={goBack} variant="ghost" className="flex-1">
              Back
            </SplifftButton>
          ) : null}
          <SplifftButton
            onClick={isLastStep ? onPaymentContinue : goNext}
            variant="primary"
            className="flex-1"
            disabled={paymentStatus === "loading"}
          >
            {paymentStatus === "loading" ? "Preparing..." : continueLabel}
          </SplifftButton>
        </div>
      </div>

      <div className="mt-6 hidden justify-end gap-2 md:flex">
        {step !== "plan" ? (
          <SplifftButton onClick={goBack} variant="ghost">
            Back
          </SplifftButton>
        ) : null}
        <SplifftButton
          onClick={isLastStep ? onPaymentContinue : goNext}
          variant="primary"
          disabled={paymentStatus === "loading"}
        >
          {paymentStatus === "loading" ? "Preparing..." : continueLabel}
        </SplifftButton>
      </div>
    </div>
  );
}
