"use client";

import type { ReactNode } from "react";
import { OrderNotificationPopup } from "@/components/marketing/OrderNotificationPopup";
import { WaitlistShareModal } from "@/components/marketing/WaitlistShareModal";
import { WaitlistScrollPopup } from "@/components/marketing/WaitlistScrollPopup";
import { CartProvider } from "@/context/cart-context";

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
