"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartLine = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  addLine: (item: Omit<CartLine, "quantity">, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeLine: (id: string) => void;
  clear: () => void;
  subtotal: number;
  itemCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const addLine = useCallback(
    (item: Omit<CartLine, "quantity">, quantity = 1) => {
      setLines((prev) => {
        const existing = prev.find((l) => l.id === item.id);
        if (existing) {
          return prev.map((l) =>
            l.id === item.id
              ? { ...l, quantity: l.quantity + quantity }
              : l,
          );
        }
        return [...prev, { ...item, quantity }];
      });
    },
    [],
  );

  const setQuantity = useCallback((id: string, quantity: number) => {
    setLines((prev) =>
      prev
        .map((l) => (l.id === id ? { ...l, quantity } : l))
        .filter((l) => l.quantity > 0),
    );
  }, []);

  const removeLine = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const { subtotal, itemCount } = useMemo(() => {
    const subtotal = lines.reduce((s, l) => s + l.price * l.quantity, 0);
    const itemCount = lines.reduce((n, l) => n + l.quantity, 0);
    return { subtotal, itemCount };
  }, [lines]);

  const value = useMemo(
    () => ({
      lines,
      addLine,
      setQuantity,
      removeLine,
      clear,
      subtotal,
      itemCount,
    }),
    [lines, addLine, setQuantity, removeLine, clear, subtotal, itemCount],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
