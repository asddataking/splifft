import Link from "next/link";
import { PLAN_SLUGS } from "@/lib/pricing";

type SuccessPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const params = (await searchParams) ?? {};
  const plan = Array.isArray(params.plan) ? params.plan[0] : params.plan;
  const total = Array.isArray(params.total) ? params.total[0] : params.total;
  const planLabel =
    plan === PLAN_SLUGS.oneTimePack ? "One-Time Pack" : "Monthly Access";

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#07070b,#0b0912)] px-4 py-14">
      <div className="mx-auto max-w-2xl rounded-3xl border border-white/15 bg-white/5 p-7 text-[var(--splifft-cream)] backdrop-blur-sm">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
          Payment Confirmed
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-5xl uppercase leading-[0.9]">
          You&apos;re In
        </h1>
        <p className="mt-4 text-base text-[var(--splifft-muted)]">
          Your order is confirmed and your next session is one step closer.
        </p>
        <div className="mt-6 space-y-2 rounded-2xl border border-white/10 bg-black/35 p-4 text-sm">
          <p>
            Plan: <span className="font-semibold text-[var(--splifft-cream)]">{planLabel}</span>
          </p>
          <p>
            Estimated charged total:{" "}
            <span className="font-semibold text-cyan-300">${total ?? "0.00"}</span>
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[var(--splifft-pink)] px-5 py-3 text-sm font-bold text-black transition hover:brightness-110"
          >
            Back To Home
          </Link>
          <Link
            href="/shop"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-[var(--splifft-cream)] transition hover:bg-white/5"
          >
            Shop Packs
          </Link>
        </div>
      </div>
    </div>
  );
}
