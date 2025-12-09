/* Simple cart context for storing cart items on the client side. */

"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  price: number;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "rolly-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount (only once)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      console.log('Loading cart from localStorage:', raw);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) {
          console.log('Cart items loaded:', parsed);
          setItems(parsed);
        }
      }
    } catch (err) {
      console.error('Error loading cart:', err);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage whenever items change (only after initialization)
  useEffect(() => {
    if (!isInitialized) return; // Don't save until we've loaded from localStorage first
    if (typeof window === "undefined") return;
    try {
      console.log('Saving cart to localStorage:', items);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error('Error saving cart:', err);
    }
  }, [items, isInitialized]);

  const value = useMemo<CartContextValue>(() => {
    const totalQuantity = items.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const addItem = (item: Omit<CartItem, "quantity">, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find((p) => p.id === item.id);
        if (existing) {
          return prev.map((p) =>
            p.id === item.id
              ? { ...p, quantity: p.quantity + quantity }
              : p,
          );
        }
        return [...prev, { ...item, quantity }];
      });
    };

    const updateQuantity = (id: string, quantity: number) => {
      setItems((prev) =>
        prev
          .map((item) =>
            item.id === id ? { ...item, quantity } : item,
          )
          .filter((item) => item.quantity > 0),
      );
    };

    const clearCart = () => setItems([]);

    return {
      items,
      totalQuantity,
      totalPrice,
      addItem,
      updateQuantity,
      clearCart,
    };
  }, [items]);

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}

