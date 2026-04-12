"use client";

import { useMemo, useState } from "react";
import {
  HASH_HOLE_PRICE_MULTIPLIER,
  bookingUpgrades,
  estimatePreRollCount,
  formatUsd,
  memberPrioritySlots,
  rollSizeOptions,
  rollingTiers,
  roundUsd,
  standardTimeSlots,
  type InfusionId,
  type RollStyleId,
} from "@/lib/booking-tiers";
import { SplifftButton } from "@/components/ui/SplifftButton";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const steps = [
  "Flower",
  "Roll size",
  "Upgrades",
  "Time",
  "Checkout",
] as const;

export function BookingFlow() {
  const [step, setStep] = useState(0);
  const [tierIndex, setTierIndex] = useState(1);
  const [rollStyle, setRollStyle] = useState<RollStyleId>("regular");
  const [infusion, setInfusion] = useState<InfusionId>("none");
  const [rollSizeIndex, setRollSizeIndex] = useState(1);
  const [upgradeIds, setUpgradeIds] = useState<Set<string>>(new Set());
  const [isMember, setIsMember] = useState(false);
  const [slot, setSlot] = useState<string | null>(null);
  const [bookingSaving, setBookingSaving] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [serviceAddress, setServiceAddress] = useState("");
  const [paymentNotes, setPaymentNotes] = useState("");

  const tier = rollingTiers[tierIndex]!;
  const rollSize = rollSizeOptions[rollSizeIndex]!;

  const estimatedRolls = useMemo(
    () => estimatePreRollCount(tier.grams, rollSize.gramsPerRoll),
    [tier.grams, rollSize.gramsPerRoll],
  );

  const availableSlots = useMemo(() => {
    const base = [...standardTimeSlots];
    if (isMember) {
      return [...memberPrioritySlots, ...base].sort();
    }
    return base;
  }, [isMember]);

  const upgradesTotal = useMemo(
    () =>
      bookingUpgrades
        .filter((u) => upgradeIds.has(u.id))
        .reduce((s, u) => s + u.price, 0),
    [upgradeIds],
  );

  const servicePrice = useMemo(() => {
    const base = isMember ? tier.memberPrice : tier.standardPrice;
    const mult =
      rollStyle === "hash-hole" ? HASH_HOLE_PRICE_MULTIPLIER : 1;
    return roundUsd(base * mult);
  }, [isMember, rollStyle, tier.memberPrice, tier.standardPrice]);

  const total = useMemo(
    () => roundUsd(servicePrice + upgradesTotal),
    [servicePrice, upgradesTotal],
  );

  const displayStandard = useMemo(() => {
    const mult =
      rollStyle === "hash-hole" ? HASH_HOLE_PRICE_MULTIPLIER : 1;
    return roundUsd(tier.standardPrice * mult);
  }, [rollStyle, tier.standardPrice]);

  const displayMember = useMemo(() => {
    const mult =
      rollStyle === "hash-hole" ? HASH_HOLE_PRICE_MULTIPLIER : 1;
    return roundUsd(tier.memberPrice * mult);
  }, [rollStyle, tier.memberPrice]);

  function toggleUpgrade(id: string) {
    setUpgradeIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function nextStep() {
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }
  function prevStep() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function submitBooking() {
    setBookingSaving(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.from("roll_up_bookings").insert({
        flower_grams: tier.grams,
        roll_size_grams: rollSize.gramsPerRoll,
        roll_size_label: rollSize.label,
        estimated_rolls: estimatedRolls,
        tier_use_case: tier.useCase,
        is_member_preview: isMember,
        upgrade_ids: [...upgradeIds],
        appointment_slot: slot,
        roll_style: rollStyle,
        infusion,
        service_price_cents: Math.round(roundUsd(servicePrice) * 100),
        upgrades_total_cents: Math.round(roundUsd(upgradesTotal) * 100),
        total_cents: Math.round(roundUsd(total) * 100),
        customer_name: customerName.trim() || null,
        service_address: serviceAddress.trim() || null,
        payment_notes: paymentNotes.trim() || null,
      });
      if (error) throw error;
      alert(
        "Booking saved. We will confirm your slot and payment next — thanks.",
      );
    } catch {
      alert(
        "Could not save booking. Check your connection or try again shortly.",
      );
    } finally {
      setBookingSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 flex flex-wrap gap-2">
        {steps.map((label, i) => (
          <div
            key={label}
            className={`flex items-center gap-2 rounded-full border-2 px-3 py-1 text-xs font-bold uppercase tracking-wide ${
              i === step
                ? "border-[var(--splifft-pink)] bg-[var(--splifft-pink)] text-black"
                : i < step
                  ? "border-[var(--splifft-blue)] text-[var(--splifft-blue)]"
                  : "border-white/20 text-[var(--splifft-muted)]"
            }`}
          >
            <span className="opacity-70">{i + 1}</span>
            {label}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border-2 border-black bg-[var(--splifft-card)] p-6 shadow-[8px_8px_0_0_rgba(0,191,255,0.35)] sm:p-8">
        {step === 0 ? (
          <div className="space-y-6">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-ink)]">
                Choose flower amount
              </h2>
              <p className="mt-2 text-sm text-[var(--splifft-ink-soft)]">
                Price follows flower weight — we meet you when prep is done. Book
                it like any other service — we show up ready.
              </p>
              <p className="mt-2 rounded-lg border border-[var(--splifft-pink)]/40 bg-[var(--splifft-pink)]/10 px-3 py-2 text-sm font-semibold text-[var(--splifft-ink)]">
                3.5 grams is the minimum mobile appointment.
              </p>
            </div>

            <div>
              <label
                htmlFor="weight-slider"
                className="text-xs font-bold uppercase tracking-wider text-[var(--splifft-ink-soft)]"
              >
                Flower weight
              </label>
              <div className="mt-3 flex items-center gap-4">
                <input
                  id="weight-slider"
                  type="range"
                  min={0}
                  max={rollingTiers.length - 1}
                  step={1}
                  value={tierIndex}
                  onChange={(e) => setTierIndex(Number(e.target.value))}
                  className="h-3 w-full flex-1 cursor-pointer accent-[var(--splifft-pink)]"
                />
              </div>
              <div className="mt-2 flex justify-between text-[11px] font-semibold text-[var(--splifft-ink-soft)]">
                {rollingTiers.map((t, i) => (
                  <button
                    key={t.grams}
                    type="button"
                    onClick={() => setTierIndex(i)}
                    className={`rounded-lg px-1 py-1 underline-offset-4 hover:underline ${
                      i === tierIndex ? "text-[var(--splifft-pink)]" : ""
                    }`}
                  >
                    {t.grams}g
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--splifft-ink-soft)]">
                Spliff type
              </p>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Regular spliff or hash hole"
              >
                <button
                  type="button"
                  onClick={() => setRollStyle("regular")}
                  className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition ${
                    rollStyle === "regular"
                      ? "border-[var(--splifft-pink)] bg-[var(--splifft-pink)] text-black"
                      : "border-black/20 bg-white/90 text-[var(--splifft-ink)] hover:border-[var(--splifft-blue)]"
                  }`}
                >
                  Regular spliff
                </button>
                <button
                  type="button"
                  onClick={() => setRollStyle("hash-hole")}
                  className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition ${
                    rollStyle === "hash-hole"
                      ? "border-[var(--splifft-pink)] bg-[var(--splifft-pink)] text-black"
                      : "border-black/20 bg-white/90 text-[var(--splifft-ink)] hover:border-[var(--splifft-blue)]"
                  }`}
                >
                  Hash hole (+20%)
                </button>
              </div>
              <p className="text-sm text-[var(--splifft-ink-soft)]">
                Hash holes add 20% to regular spliff prices for the same flower
                weight.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--splifft-ink-soft)]">
                Infusion
              </p>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Infusion — crumble or rosin"
              >
                {(
                  [
                    ["none", "None"],
                    ["crumble", "Crumble"],
                    ["rosin", "Rosin"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setInfusion(id)}
                    className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition ${
                      infusion === id
                        ? "border-[var(--splifft-pink)] bg-[var(--splifft-pink)] text-black"
                        : "border-black/20 bg-white/90 text-[var(--splifft-ink)] hover:border-[var(--splifft-blue)]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p className="text-sm text-[var(--splifft-ink-soft)]">
                Infused options: crumble or rosin — pick one so we pack your order
                right.
              </p>
            </div>

            <div className="rounded-xl border-2 border-dashed border-black/20 bg-white/80 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-[family-name:var(--font-display)] text-4xl text-[var(--splifft-ink)]">
                  {tier.grams}g
                </p>
                {tier.popular ? (
                  <span className="rounded-full bg-[var(--splifft-pink)] px-2 py-1 text-[10px] font-bold uppercase text-black">
                    Most popular
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-sm font-medium text-[var(--splifft-ink)]">
                {tier.useCase}
                <span className="ml-2 text-[var(--splifft-ink-soft)]">
                  ·{" "}
                  {rollStyle === "hash-hole"
                    ? "Hash hole (+20%)"
                    : "Regular spliff"}
                  {infusion !== "none"
                    ? ` · Infused: ${infusion === "crumble" ? "Crumble" : "Rosin"}`
                    : ""}
                </span>
              </p>
              <div className="mt-4 flex flex-wrap gap-6">
                <div>
                  <p className="text-xs font-bold uppercase text-[var(--splifft-ink-soft)]">
                    Standard
                  </p>
                  <p className="text-2xl font-bold text-[var(--splifft-ink)]">
                    {formatUsd(displayStandard)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-[var(--splifft-ink-soft)]">
                    Club
                  </p>
                  <p className="text-2xl font-bold text-[var(--splifft-pink)]">
                    {formatUsd(displayMember)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="space-y-6">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-ink)]">
                Choose roll size
              </h2>
              <p className="mt-2 text-sm text-[var(--splifft-ink-soft)]">
                Pick each roll size (0.5g–2g). We estimate how many pre-rolls your
                {tier.grams}g yields — final count matches your flower when we meet
                you.
              </p>
              <p className="mt-3 rounded-lg border border-black/10 bg-white/70 px-3 py-2 text-sm text-[var(--splifft-ink)]">
                <span className="font-bold">Example:</span> 7g at 0.7g per roll ≈
                10 rolls. You: {tier.grams}g at {rollSize.gramsPerRoll}g → ~
                {estimatedRolls} rolls.
              </p>
            </div>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Preferred pre-roll size"
            >
              {rollSizeOptions.map((opt, i) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setRollSizeIndex(i)}
                  className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition ${
                    i === rollSizeIndex
                      ? "border-[var(--splifft-pink)] bg-[var(--splifft-pink)] text-black"
                      : "border-black/20 bg-white/90 text-[var(--splifft-ink)] hover:border-[var(--splifft-blue)]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="rounded-xl border-2 border-black/15 bg-white/90 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--splifft-ink-soft)]">
                Estimated pre-rolls
              </p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-4xl text-[var(--splifft-ink)]">
                ~{estimatedRolls}
              </p>
              <p className="mt-1 text-sm text-[var(--splifft-ink-soft)]">
                From {tier.grams}g at {rollSize.gramsPerRoll}g per roll (estimate
                only — final count matches your flower and pack-out).
              </p>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-6">
            <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-ink)]">
              Add upgrades
            </h2>
            <p className="text-sm text-[var(--splifft-ink-soft)]">
              Sesh upgrades ride on the same visit — same stop, same meet-up. Book
              Fresh Hit on its own if you only need glass cleaned.
            </p>
            <ul className="space-y-3">
              {bookingUpgrades.map((u) => {
                const on = upgradeIds.has(u.id);
                return (
                  <li key={u.id}>
                    <label className="flex cursor-pointer gap-4 rounded-xl border-2 border-black/15 bg-white/90 p-4 transition hover:border-[var(--splifft-blue)] has-[:checked]:border-[var(--splifft-pink)] has-[:checked]:shadow-[4px_4px_0_0_rgba(255,45,146,0.35)]">
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() => toggleUpgrade(u.id)}
                        className="mt-1 size-5 accent-[var(--splifft-pink)]"
                      />
                      <span className="flex-1">
                        <span className="flex flex-wrap items-baseline justify-between gap-2">
                          <span className="font-semibold text-[var(--splifft-ink)]">
                            {u.label}
                          </span>
                          <span className="text-sm font-bold text-[var(--splifft-ink)]">
                            +{formatUsd(u.price)}
                          </span>
                        </span>
                        <span className="mt-1 block text-sm text-[var(--splifft-ink-soft)]">
                          {u.description}
                        </span>
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-6">
            <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-ink)]">
              Choose appointment time
            </h2>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-black/15 bg-white/90 p-4">
              <input
                type="checkbox"
                checked={isMember}
                onChange={(e) => {
                  setIsMember(e.target.checked);
                  setSlot(null);
                }}
                className="size-5 accent-[var(--splifft-pink)]"
              />
              <span className="text-sm text-[var(--splifft-ink)]">
                <strong>Preview as Splifft Club member</strong> — priority slots,
                better availability, VIP labels on the calendar (mock).
              </span>
            </label>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--splifft-ink-soft)]">
                Available slots
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {availableSlots.map((t) => {
                  const isPriority =
                    isMember &&
                    memberPrioritySlots.includes(
                      t as (typeof memberPrioritySlots)[number],
                    );
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSlot(t)}
                      className={`rounded-xl border-2 px-4 py-2 text-sm font-semibold transition ${
                        slot === t
                          ? "border-[var(--splifft-pink)] bg-[var(--splifft-pink)] text-black"
                          : "border-black/20 bg-white/90 text-[var(--splifft-ink)] hover:border-[var(--splifft-blue)]"
                      }`}
                    >
                      {t}
                      {isPriority ? (
                        <span className="ml-2 text-[10px] font-bold uppercase text-[var(--splifft-blue)]">
                          Club / VIP
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="space-y-6">
            <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-ink)]">
              Checkout
            </h2>
            <p className="text-sm text-[var(--splifft-ink-soft)]">
              Review your Roll Up booking, then add contact and payment notes —
              wire real checkout when you launch.
            </p>
            <dl className="space-y-3 rounded-xl border-2 border-black/15 bg-white/90 p-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt>Roll Up</dt>
                <dd className="font-semibold text-right">
                  {tier.grams}g · {tier.useCase}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Spliff type</dt>
                <dd className="font-semibold text-right">
                  {rollStyle === "hash-hole"
                    ? "Hash hole (+20%)"
                    : "Regular spliff"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Infusion</dt>
                <dd className="font-semibold text-right">
                  {infusion === "none"
                    ? "None"
                    : infusion === "crumble"
                      ? "Crumble"
                      : "Rosin"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Roll size</dt>
                <dd className="font-semibold">{rollSize.label}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Est. pre-rolls</dt>
                <dd className="font-semibold">~{estimatedRolls}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Service price ({isMember ? "Club" : "Standard"})</dt>
                <dd className="font-semibold">{formatUsd(servicePrice)}</dd>
              </div>
              {bookingUpgrades
                .filter((u) => upgradeIds.has(u.id))
                .map((u) => (
                  <div key={u.id} className="flex justify-between gap-4">
                    <dt>{u.label}</dt>
                    <dd className="font-semibold">+{formatUsd(u.price)}</dd>
                  </div>
                ))}
              <div className="flex justify-between gap-4 border-t border-dashed border-black/20 pt-3 text-base">
                <dt className="font-bold">Total (mock)</dt>
                <dd className="font-bold">{formatUsd(total)}</dd>
              </div>
              <div className="flex justify-between gap-4 text-[var(--splifft-ink-soft)]">
                <dt>Time</dt>
                <dd>{slot ?? "Not selected — go back to Time"}</dd>
              </div>
            </dl>
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--splifft-ink-soft)]">
                Your details
              </h3>
              <div>
                <label
                  htmlFor="ru-name"
                  className="text-xs font-bold uppercase text-[var(--splifft-ink-soft)]"
                >
                  Name
                </label>
                <input
                  id="ru-name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  autoComplete="name"
                  placeholder="Full name"
                  className="mt-1 w-full rounded-xl border-2 border-black/15 bg-white px-3 py-3 text-[var(--splifft-ink)]"
                />
              </div>
              <div>
                <label
                  htmlFor="ru-address"
                  className="text-xs font-bold uppercase text-[var(--splifft-ink-soft)]"
                >
                  Address / meet-up
                </label>
                <input
                  id="ru-address"
                  value={serviceAddress}
                  onChange={(e) => setServiceAddress(e.target.value)}
                  autoComplete="street-address"
                  placeholder="Where we pull up — street, city, notes"
                  className="mt-1 w-full rounded-xl border-2 border-black/15 bg-white px-3 py-3 text-[var(--splifft-ink)]"
                />
              </div>
              <div>
                <label
                  htmlFor="ru-pay"
                  className="text-xs font-bold uppercase text-[var(--splifft-ink-soft)]"
                >
                  Payment
                </label>
                <input
                  id="ru-pay"
                  value={paymentNotes}
                  onChange={(e) => setPaymentNotes(e.target.value)}
                  placeholder="e.g. Card on file, Apple Pay, invoice (mock)"
                  className="mt-1 w-full rounded-xl border-2 border-black/15 bg-white px-3 py-3 text-[var(--splifft-ink)]"
                />
              </div>
            </div>
            <SplifftButton
              variant="primary"
              className="w-full"
              disabled={
                bookingSaving ||
                !customerName.trim() ||
                !serviceAddress.trim() ||
                !paymentNotes.trim()
              }
              onClick={() => void submitBooking()}
            >
              {bookingSaving ? "Saving…" : "Place booking"}
            </SplifftButton>
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap justify-between gap-3 border-t-2 border-dashed border-black/15 pt-6">
          <SplifftButton
            variant="ghost"
            onClick={prevStep}
            disabled={step === 0}
            className="disabled:cursor-not-allowed disabled:opacity-40"
          >
            Back
          </SplifftButton>
          {step < steps.length - 1 ? (
            <SplifftButton variant="secondary" onClick={nextStep}>
              Continue
            </SplifftButton>
          ) : null}
        </div>
      </div>
    </div>
  );
}
