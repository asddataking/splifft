import { Suspense } from "react";
import { CheckoutFlowClient } from "@/components/checkout/CheckoutFlowClient";

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[linear-gradient(180deg,#07070b,#0b0912)] px-4 py-14">
          <div className="mx-auto w-full max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-6 text-[var(--splifft-muted)]">
            Loading checkout...
          </div>
        </div>
      }
    >
      <CheckoutFlowClient />
    </Suspense>
  );
}
