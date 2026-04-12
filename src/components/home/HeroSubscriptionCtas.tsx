"use client";

import { SplifftButton } from "@/components/ui/SplifftButton";
import { DROP_OF_THE_MONTH_SLUG } from "@/lib/drop-of-the-month";
import { useSubscriptionModal } from "@/components/home/SubscriptionModalProvider";

export function HeroSubscriptionCtas() {
  const { openSubscriptionModal } = useSubscriptionModal();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <SplifftButton variant="primary" onClick={openSubscriptionModal}>
        Start Your Subscription
      </SplifftButton>
      <SplifftButton
        href={`/shop/${DROP_OF_THE_MONTH_SLUG}`}
        variant="secondary"
      >
        Get This Month&apos;s Drop
      </SplifftButton>
    </div>
  );
}
