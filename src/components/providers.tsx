"use client";

import type { ReactNode } from "react";
import { WaitlistScrollPopup } from "@/components/marketing/WaitlistScrollPopup";
import { CartProvider } from "@/context/cart-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <WaitlistScrollPopup />
    </CartProvider>
  );
}
