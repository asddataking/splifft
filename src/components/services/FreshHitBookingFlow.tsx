"use client";

import { useMemo, useState } from "react";
import {
  freshHitAddons,
  freshHitCleaningTypes,
  memberPrioritySlots,
  standardTimeSlots,
} from "@/lib/booking-tiers";
import { SplifftButton } from "@/components/ui/SplifftButton";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const steps = ["Type", "Sesh upgrades", "Time", "Checkout"] as const;

export function FreshHitBookingFlow() {
  const [step, setStep] = useState(0);
  const [typeIndex, setTypeIndex] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [addonIds, setAddonIds] = useState<Set<string>>(new Set());
  const [isMember, setIsMember] = useState(false);
  const [slot, setSlot] = useState<string | null>(null);
  const [bookingSaving, setBookingSaving] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [serviceAddress, setServiceAddress] = useState("");
  const [paymentNotes, setPaymentNotes] = useState("");

  const cleaningType = freshHitCleaningTypes[typeIndex]!;

  const availableSlots = useMemo(() => {
    const base = [...standardTimeSlots];
    if (isMember) {
      return [...memberPrioritySlots, ...base].sort();
    }
    return base;
  }, [isMember]);

  const unitPrice = isMember
    ? cleaningType.memberPrice
    : cleaningType.standardPrice;
  const baseServiceTotal = unitPrice * quantity;

  const addonsTotal = useMemo(
    () =>
      freshHitAddons
        .filter((a) => addonIds.has(a.id))
        .reduce((s, a) => s + a.price, 0),
    [addonIds],
  );

  const total = baseServiceTotal + addonsTotal;

  function toggleAddon(id: string) {
    setAddonIds((prev) => {
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
      const label =
        quantity > 1
          ? `${cleaningType.label} × ${quantity}`
          : cleaningType.label;
      const { error } = await supabase.from("fresh_hit_bookings").insert({
        cleaning_tier_id: cleaningType.id,
        cleaning_tier_label: label,
        piece_quantity: quantity,
        addon_ids: [...addonIds],
        appointment_slot: slot,
        is_member_preview: isMember,
        service_price_cents: Math.round(baseServiceTotal * 100),
        total_cents: Math.round(total * 100),
        customer_name: customerName.trim() || null,
        service_address: serviceAddress.trim() || null,
        payment_notes: paymentNotes.trim() || null,
      });
      if (error) throw error;
      alert(
        "Fresh Hit booking saved. We will confirm your slot and payment next — thanks.",
      );
    } catch {
      alert(
        "Could not save booking. Check your connection, run the latest Supabase migrations, then try again.",
      );
    } finally {
      setBookingSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 flex flex-wrap justify-center gap-2 sm:justify-start">
        {steps.map((label, i) => (
          <div
            key={label}
            className={`flex items-center gap-2 rounded-full border-2 px-3 py-1 text-xs font-bold uppercase tracking-wide ${
              i === step
                ? "border-[var(--splifft-blue)] bg-[var(--splifft-blue)] text-black"
                : i < step
                  ? "border-[var(--splifft-pink)] text-[var(--splifft-pink)]"
                  : "border-white/20 text-[var(--splifft-muted)]"
            }`}
          >
            <span className="opacity-70">{i + 1}</span>
            {label}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border-2 border-black bg-[var(--splifft-card)] p-6 shadow-[8px_8px_0_0_rgba(255,45,146,0.35)] sm:p-8">
        {step === 0 ? (
          <div className="space-y-6">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-ink)]">
                Cleaning type
              </h2>
              <p className="mt-2 text-sm text-[var(--splifft-ink-soft)]">
                Fresh Hit is glass-only — we meet you and hand pieces back clean.
                Book Roll Up too if you also need flower rolled.
              </p>
            </div>
            <ul className="space-y-3">
              {freshHitCleaningTypes.map((t, i) => {
                const selected = i === typeIndex;
                return (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => setTypeIndex(i)}
                      className={`w-full rounded-xl border-2 p-4 text-left transition ${
                        selected
                          ? "border-[var(--splifft-blue)] bg-[var(--splifft-blue)]/15 shadow-[4px_4px_0_0_rgba(0,191,255,0.45)]"
                          : "border-black/15 bg-white/90 hover:border-[var(--splifft-pink)]/50"
                      }`}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="font-[family-name:var(--font-display)] text-xl uppercase text-[var(--splifft-ink)]">
                          {t.label}
                        </span>
                        <span className="text-sm font-bold text-[var(--splifft-ink)]">
                          ${t.standardPrice}{" "}
                          <span className="font-semibold text-[var(--splifft-pink)]">
                            · Club ${t.memberPrice}
                          </span>
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-[var(--splifft-ink-soft)]">
                        {t.description}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div>
              <label
                htmlFor="fh-qty"
                className="text-xs font-bold uppercase tracking-wider text-[var(--splifft-ink-soft)]"
              >
                Quantity (pieces this visit)
              </label>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <input
                  id="fh-qty"
                  type="number"
                  min={1}
                  max={8}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.min(8, Math.max(1, Number(e.target.value) || 1)),
                    )
                  }
                  className="w-24 rounded-xl border-2 border-black/15 bg-white px-3 py-2 text-center text-lg font-bold text-[var(--splifft-ink)]"
                />
                <span className="text-sm text-[var(--splifft-ink-soft)]">
                  Line total uses type price × quantity (estimate — final when we
                  meet you).
                </span>
              </div>
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="space-y-6">
            <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-ink)]">
              Sesh upgrades
            </h2>
            <p className="text-sm text-[var(--splifft-ink-soft)]">
              Stack options on the same Fresh Hit stop — priority, extra pieces,
              protective packaging.
            </p>
            <ul className="space-y-3">
              {freshHitAddons.map((a) => {
                const on = addonIds.has(a.id);
                return (
                  <li key={a.id}>
                    <label className="flex cursor-pointer gap-4 rounded-xl border-2 border-black/15 bg-white/90 p-4 transition hover:border-[var(--splifft-blue)] has-[:checked]:border-[var(--splifft-pink)] has-[:checked]:shadow-[4px_4px_0_0_rgba(255,45,146,0.35)]">
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() => toggleAddon(a.id)}
                        className="mt-1 size-5 accent-[var(--splifft-pink)]"
                      />
                      <span className="flex-1">
                        <span className="flex flex-wrap items-baseline justify-between gap-2">
                          <span className="font-semibold text-[var(--splifft-ink)]">
                            {a.label}
                          </span>
                          <span className="text-sm font-bold text-[var(--splifft-ink)]">
                            +${a.price}
                          </span>
                        </span>
                        <span className="mt-1 block text-sm text-[var(--splifft-ink-soft)]">
                          {a.description}
                        </span>
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-6">
            <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-ink)]">
              Pick a time
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
                <strong>Preview as Splifft Club member</strong> — priority slots
                and better availability (mock).
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
                          ? "border-[var(--splifft-blue)] bg-[var(--splifft-blue)] text-black"
                          : "border-black/20 bg-white/90 text-[var(--splifft-ink)] hover:border-[var(--splifft-pink)]"
                      }`}
                    >
                      {t}
                      {isPriority ? (
                        <span className="ml-2 text-[10px] font-bold uppercase text-[var(--splifft-pink)]">
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

        {step === 3 ? (
          <div className="space-y-6">
            <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-ink)]">
              Checkout
            </h2>
            <p className="text-sm text-[var(--splifft-ink-soft)]">
              Review Fresh Hit, then name, meet-up, and payment notes — same vibe
              as Roll Up checkout.
            </p>
            <dl className="space-y-3 rounded-xl border-2 border-black/15 bg-white/90 p-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt>Service</dt>
                <dd className="text-right font-semibold">Fresh Hit</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Type</dt>
                <dd className="font-semibold text-right">
                  {cleaningType.label}
                  {quantity > 1 ? ` × ${quantity}` : ""}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Service ({isMember ? "Club" : "Standard"})</dt>
                <dd className="font-semibold">${baseServiceTotal}</dd>
              </div>
              {freshHitAddons
                .filter((a) => addonIds.has(a.id))
                .map((a) => (
                  <div key={a.id} className="flex justify-between gap-4">
                    <dt>{a.label}</dt>
                    <dd className="font-semibold">+${a.price}</dd>
                  </div>
                ))}
              <div className="flex justify-between gap-4 border-t border-dashed border-black/20 pt-3 text-base">
                <dt className="font-bold">Total (mock)</dt>
                <dd className="font-bold">${total}</dd>
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
                  htmlFor="fh-name"
                  className="text-xs font-bold uppercase text-[var(--splifft-ink-soft)]"
                >
                  Name
                </label>
                <input
                  id="fh-name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  autoComplete="name"
                  placeholder="Full name"
                  className="mt-1 w-full rounded-xl border-2 border-black/15 bg-white px-3 py-3 text-[var(--splifft-ink)]"
                />
              </div>
              <div>
                <label
                  htmlFor="fh-address"
                  className="text-xs font-bold uppercase text-[var(--splifft-ink-soft)]"
                >
                  Address / meet-up
                </label>
                <input
                  id="fh-address"
                  value={serviceAddress}
                  onChange={(e) => setServiceAddress(e.target.value)}
                  placeholder="Where we pull up"
                  className="mt-1 w-full rounded-xl border-2 border-black/15 bg-white px-3 py-3 text-[var(--splifft-ink)]"
                />
              </div>
              <div>
                <label
                  htmlFor="fh-pay"
                  className="text-xs font-bold uppercase text-[var(--splifft-ink-soft)]"
                >
                  Payment
                </label>
                <input
                  id="fh-pay"
                  value={paymentNotes}
                  onChange={(e) => setPaymentNotes(e.target.value)}
                  placeholder="e.g. Card on file (mock)"
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
              {bookingSaving ? "Saving…" : "Place Fresh Hit booking"}
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
