"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { CartProvider } from "@/context/cart-context";

const WaitlistScrollPopup = dynamic(
  () =>
    import("@/components/marketing/WaitlistScrollPopup").then(
      (m) => m.WaitlistScrollPopup,
    ),
  { ssr: false },
);
const OrderNotificationPopup = dynamic(
  () =>
    import("@/components/marketing/OrderNotificationPopup").then(
      (m) => m.OrderNotificationPopup,
    ),
  { ssr: false },
);
const WaitlistShareModal = dynamic(
  () =>
    import("@/components/marketing/WaitlistShareModal").then(
      (m) => m.WaitlistShareModal,
    ),
  { ssr: false },
);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <OrderNotificationPopup />
      <WaitlistShareModal />
      <WaitlistScrollPopup />
    </CartProvider>
  );
}
