"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useTheme } from "../../context/ThemeContext";
import { useMatchaCatalog } from "../../hooks/useMatchaCatalog";
import { BUSINESS_DOMAIN_SLUG, BUSINESS_ID } from "../../config/rolly";
import { formatPrice } from "../homeUtils";
import { ThemedHeader } from "@/components/theme/ThemedHeader";
import { ThemedFooter } from "@/components/theme/ThemedFooter";
import { CartPanel } from "@/components/home/CartPanel";

export default function WishlistPage() {
    const { theme } = useTheme();
    const { items: cartItems, addItem, updateQuantity, totalQuantity, totalPrice } = useCart();
    const { items: wishlistItems, removeFromWishlist, totalItems: wishlistTotal } = useWishlist();
    const { business } = useMatchaCatalog({
        businessId: BUSINESS_ID,
        domain: BUSINESS_DOMAIN_SLUG,
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleAddToCart = (item: typeof wishlistItems[0]) => {
        addItem(
            {
                id: item.id,
                name: item.name,
                slug: item.slug,
                imageUrl: item.imageUrl,
                price: item.price,
            },
            1
        );
        setIsCartOpen(true);
    };

    return (
        <div
            className="min-h-screen"
            style={{ backgroundColor: theme.colors.background }}
        >
            <ThemedHeader
                businessName={business?.name}
                businessImage={business?.img}
                totalQuantity={totalQuantity}
                wishlistQuantity={wishlistTotal}
                onToggleCart={() => setIsCartOpen(true)}
                products={[]}
            />

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1
                        className="mb-2 text-3xl font-bold sm:text-4xl"
                        style={{
                            color: theme.colors.textPrimary,
                            fontFamily: "'Playfair Display', serif",
                        }}
                    >
                        My Wishlist
                    </h1>
                    <p style={{ color: theme.colors.textSecondary }}>
                        {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved for later
                    </p>
                </div>

                {/* Wishlist Content */}
                {wishlistItems.length === 0 ? (
                    <div
                        className="flex flex-col items-center justify-center rounded-2xl py-20 text-center"
                        style={{
                            backgroundColor: theme.colors.cardBg,
                            border: `1px solid ${theme.colors.cardBorder}`,
                        }}
                    >
                        <svg
                            className="mb-6 h-32 w-32 opacity-30"
                            style={{ color: theme.colors.textSecondary }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                        <h2
                            className="mb-3 text-2xl font-bold"
                            style={{ color: theme.colors.textPrimary }}
                        >
                            Your wishlist is empty
                        </h2>
                        <p
                            className="mb-8 max-w-md text-lg"
                            style={{ color: theme.colors.textSecondary }}
                        >
                            Explore our collection and save your favorite items for later!
                        </p>
                        <Link
                            href="/"
                            className="rounded-full px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105"
                            style={{
                                background: "linear-gradient(135deg, #7cb342 0%, #558b2f 100%)",
                            }}
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {wishlistItems.map((item) => (
                            <div
                                key={item.id}
                                className="card-shopify group overflow-hidden transition-all hover:shadow-xl"
                                style={{
                                    backgroundColor: theme.colors.cardBg,
                                    border: `1px solid ${theme.colors.cardBorder}`,
                                }}
                            >
                                {/* Product Image */}
                                <Link
                                    href={`/products/${item.slug}`}
                                    className="relative block aspect-square overflow-hidden"
                                    style={{ backgroundColor: theme.colors.productImageBg }}
                                >
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.name}
                                        fill
                                        className="object-contain p-6 transition-transform duration-300 group-hover:scale-110"
                                    />
                                </Link>

                                {/* Product Info */}
                                <div className="p-4">
                                    <Link
                                        href={`/products/${item.slug}`}
                                        className="mb-2 block font-semibold transition-colors hover:text-green-600"
                                        style={{ color: theme.colors.textPrimary }}
                                    >
                                        {item.name}
                                    </Link>

                                    {item.description && (
                                        <p
                                            className="mb-3 line-clamp-2 text-sm"
                                            style={{ color: theme.colors.textSecondary }}
                                            dangerouslySetInnerHTML={{
                                                __html: item.description.substring(0, 100) + "...",
                                            }}
                                        />
                                    )}

                                    <p
                                        className="mb-4 text-xl font-bold"
                                        style={{ color: theme.colors.textAccent }}
                                    >
                                        {formatPrice(item.price, business?.currency)}
                                    </p>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleAddToCart(item)}
                                            className="flex-1 rounded-full py-2 text-sm font-semibold text-white transition-all hover:scale-105"
                                            style={{
                                                background:
                                                    "linear-gradient(135deg, #7cb342 0%, #558b2f 100%)",
                                            }}
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            onClick={() => removeFromWishlist(item.id)}
                                            className="rounded-full p-2 text-red-500 transition-colors hover:bg-red-50"
                                            title="Remove from wishlist"
                                        >
                                            <svg
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Continue Shopping */}
                {wishlistItems.length > 0 && (
                    <div className="mt-12 text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 rounded-full border-2 border-green-600 px-8 py-3 font-semibold text-green-600 transition-all hover:bg-green-600 hover:text-white"
                        >
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            Continue Shopping
                        </Link>
                    </div>
                )}
            </div>

            <ThemedFooter />

            {isCartOpen && (
                <CartPanel
                    items={cartItems}
                    totalQuantity={totalQuantity}
                    totalPrice={totalPrice}
                    currency={business?.currency}
                    onUpdateQuantity={updateQuantity}
                    onClose={() => setIsCartOpen(false)}
                />
            )}
        </div>
    );
}
