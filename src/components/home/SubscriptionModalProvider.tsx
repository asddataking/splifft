"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { SplifftSubscriptionModal } from "@/components/subscription/SplifftSubscriptionModal";

type SubscriptionModalContextValue = {
  openSubscriptionModal: () => void;
};

const SubscriptionModalContext =
  createContext<SubscriptionModalContextValue | null>(null);

export function useSubscriptionModal() {
  const ctx = useContext(SubscriptionModalContext);
  if (!ctx) {
    throw new Error(
      "useSubscriptionModal must be used within SubscriptionModalProvider",
    );
  }
  return ctx;
}

export function SubscriptionModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const openSubscriptionModal = useCallback(() => setOpen(true), []);
  const value = useMemo(
    () => ({ openSubscriptionModal }),
    [openSubscriptionModal],
  );

  return (
    <SubscriptionModalContext.Provider value={value}>
      {children}
      <SplifftSubscriptionModal open={open} onClose={() => setOpen(false)} />
    </SubscriptionModalContext.Provider>
  );
}
