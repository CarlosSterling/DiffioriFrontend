"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import { cookies } from "@/lib/cookies";

/* ── Types ── */
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  variant: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeFromCart: (productId: string, variant: string) => void;
  updateQty: (productId: string, variant: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "vivatech_cart";

/* ── Provider ── */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  /* Hydration-safe: read storage after mount */
  useEffect(() => {
    try {
      const saved = cookies.get(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch { /* empty */ }
    setMounted(true);
  }, []);

  /* Persist */
  useEffect(() => {
    if (mounted) cookies.set(STORAGE_KEY, JSON.stringify(items));
  }, [items, mounted]);

  const addToCart = useCallback(
    (item: Omit<CartItem, "qty">, qty = 1) => {
      setItems((prev) => {
        const idx = prev.findIndex(
          (i) => i.productId === item.productId && i.variant === item.variant,
        );
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], qty: next[idx].qty + qty };
          return next;
        }
        return [...prev, { ...item, qty }];
      });
    },
    [],
  );

  const removeFromCart = useCallback(
    (productId: string, variant: string) =>
      setItems((prev) =>
        prev.filter(
          (i) => !(i.productId === productId && i.variant === variant),
        ),
      ),
    [],
  );

  const updateQty = useCallback(
    (productId: string, variant: string, qty: number) => {
      if (qty < 1) return;
      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId && i.variant === variant
            ? { ...i, qty }
            : i,
        ),
      );
    },
    [],
  );

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = useMemo(
    () => items.reduce((s, i) => s + i.qty, 0),
    [items],
  );

  const totalPrice = useMemo(
    () => items.reduce((s, i) => s + i.price * i.qty, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      totalItems,
      totalPrice,
    }),
    [items, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

/* ── Hook ── */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside <CartProvider>");
  return ctx;
}
