/* Simple wishlist context for storing wishlist items on the client side. */

"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type WishlistItem = {
    id: string;
    name: string;
    slug: string;
    imageUrl: string;
    price: number;
    description?: string;
};

type WishlistContextValue = {
    items: WishlistItem[];
    totalItems: number;
    addToWishlist: (item: WishlistItem) => void;
    removeFromWishlist: (id: string) => void;
    isInWishlist: (id: string) => boolean;
    clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

const STORAGE_KEY = "rolly-wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<WishlistItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load from localStorage on mount (only once)
    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            console.log('Loading wishlist from localStorage:', raw);
            if (raw) {
                const parsed = JSON.parse(raw) as WishlistItem[];
                if (Array.isArray(parsed)) {
                    console.log('Wishlist items loaded:', parsed);
                    setItems(parsed);
                }
            }
        } catch (err) {
            console.error('Error loading wishlist:', err);
        } finally {
            setIsInitialized(true);
        }
    }, []);

    // Save to localStorage whenever items change (only after initialization)
    useEffect(() => {
        if (!isInitialized) return; // Don't save until we've loaded from localStorage first
        if (typeof window === "undefined") return;
        try {
            console.log('Saving wishlist to localStorage:', items);
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch (err) {
            console.error('Error saving wishlist:', err);
        }
    }, [items, isInitialized]);

    const value = useMemo<WishlistContextValue>(() => {
        const totalItems = items.length;

        const addToWishlist = (item: WishlistItem) => {
            setItems((prev) => {
                const existing = prev.find((p) => p.id === item.id);
                if (existing) {
                    // Already in wishlist, don't add again
                    return prev;
                }
                return [...prev, item];
            });
        };

        const removeFromWishlist = (id: string) => {
            setItems((prev) => prev.filter((item) => item.id !== id));
        };

        const isInWishlist = (id: string) => {
            return items.some((item) => item.id === id);
        };

        const clearWishlist = () => setItems([]);

        return {
            items,
            totalItems,
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            clearWishlist,
        };
    }, [items]);

    return (
        <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
    );
}

export function useWishlist(): WishlistContextValue {
    const ctx = useContext(WishlistContext);
    if (!ctx) {
        throw new Error("useWishlist must be used within WishlistProvider");
    }
    return ctx;
}
