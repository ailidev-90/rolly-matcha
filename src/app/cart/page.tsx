"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { useMatchaCatalog } from "../../hooks/useMatchaCatalog";
import { BUSINESS_DOMAIN_SLUG, BUSINESS_ID } from "../../config/rolly";
import { ThemedHeader } from "@/components/theme/ThemedHeader";
import { ThemedFooter } from "@/components/theme/ThemedFooter";
import { formatPrice } from "../homeUtils";

export default function CartPage() {
    const { theme } = useTheme();
    const { items, updateQuantity, totalQuantity, totalPrice } = useCart();
    const { business } = useMatchaCatalog({
        businessId: BUSINESS_ID,
        domain: BUSINESS_DOMAIN_SLUG,
    });

    const shippingCost = totalPrice > 50 ? 0 : 10;
    const tax = totalPrice * 0.1; // 10% tax
    const finalTotal = totalPrice + shippingCost + tax;

    return (
        <div
            className="min-h-screen"
            style={{ backgroundColor: theme.colors.background || "#ffffff" }}
        >
            <ThemedHeader
                businessName={business?.name}
                businessImage={business?.img}
                totalQuantity={totalQuantity}
                onToggleCart={() => { }}
                products={[]}
            />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-8 flex items-center gap-2 text-sm">
                    <Link
                        href="/"
                        className="transition-colors hover:underline"
                        style={{ color: theme.colors.textSecondary || "#6b7280" }}
                    >
                        Home
                    </Link>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span
                        className="font-medium"
                        style={{ color: theme.colors.textPrimary || "#1a1a1a" }}
                    >
                        Shopping Cart
                    </span>
                </nav>

                <h1
                    className="mb-8 text-4xl font-bold"
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        color: theme.colors.textPrimary || "#1a1a1a",
                    }}
                >
                    Shopping Cart
                </h1>

                {items.length === 0 ? (
                    /* Empty Cart State */
                    <div className="py-16 text-center">
                        <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gray-100">
                            <svg
                                className="h-16 w-16 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                            </svg>
                        </div>
                        <h2
                            className="mb-3 text-2xl font-bold"
                            style={{ color: theme.colors.textPrimary || "#1a1a1a" }}
                        >
                            Your cart is empty
                        </h2>
                        <p
                            className="mb-8 text-lg"
                            style={{ color: theme.colors.textSecondary || "#6b7280" }}
                        >
                            Looks like you haven't added anything to your cart yet.
                        </p>
                        <Link
                            href="/"
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="card-shopify flex flex-col gap-4 p-4 sm:flex-row sm:gap-6 sm:p-6"
                                    >
                                        {/* Product Image */}
                                        <Link
                                            href={`/products/${item.slug}`}
                                            className="relative h-32 w-full flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 sm:h-32 sm:w-32"
                                        >
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.name}
                                                fill
                                                className="object-contain p-3"
                                            />
                                        </Link>

                                        {/* Product Info */}
                                        <div className="flex flex-1 flex-col">
                                            <Link href={`/products/${item.slug}`}>
                                                <h3
                                                    className="mb-2 text-lg font-semibold transition-colors hover:text-purple-600"
                                                    style={{ color: theme.colors.textPrimary || "#1a1a1a" }}
                                                >
                                                    {item.name}
                                                </h3>
                                            </Link>

                                            <p
                                                className="mb-4 text-xl font-bold"
                                                style={{ color: theme.colors.textAccent || "#667eea" }}
                                            >
                                                {formatPrice(item.price, business?.currency)}
                                            </p>

                                            <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            item.quantity > 1
                                                                ? updateQuantity(item.id, item.quantity - 1)
                                                                : updateQuantity(item.id, 0)
                                                        }
                                                        className="flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all hover:bg-gray-50"
                                                        style={{ borderColor: theme.colors.cardBorder || "#e5e7eb" }}
                                                    >
                                                        {item.quantity > 1 ? (
                                                            <span className="text-lg">−</span>
                                                        ) : (
                                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                    <span
                                                        className="w-12 text-center text-lg font-semibold"
                                                        style={{ color: theme.colors.textPrimary || "#1a1a1a" }}
                                                    >
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQuantity(item.id, Math.min(99, item.quantity + 1))}
                                                        className="flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all hover:bg-gray-50"
                                                        style={{ borderColor: theme.colors.cardBorder || "#e5e7eb" }}
                                                    >
                                                        <span className="text-lg">+</span>
                                                    </button>
                                                </div>

                                                {/* Subtotal */}
                                                <p
                                                    className="text-lg font-bold sm:text-right"
                                                    style={{ color: theme.colors.textPrimary || "#1a1a1a" }}
                                                >
                                                    {formatPrice(item.price * item.quantity, business?.currency)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Continue Shopping */}
                            <Link
                                href="/"
                                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-purple-600"
                                style={{ color: theme.colors.textPrimary || "#1a1a1a" }}
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Continue Shopping
                            </Link>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="card-shopify p-4 sm:p-6 lg:sticky lg:top-24">
                                <h2
                                    className="mb-6 text-xl font-bold"
                                    style={{ color: theme.colors.textPrimary || "#1a1a1a" }}
                                >
                                    Order Summary
                                </h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span style={{ color: theme.colors.textSecondary || "#6b7280" }}>
                                            Subtotal ({totalQuantity} items)
                                        </span>
                                        <span
                                            className="font-semibold"
                                            style={{ color: theme.colors.textPrimary || "#1a1a1a" }}
                                        >
                                            {formatPrice(totalPrice, business?.currency)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span style={{ color: theme.colors.textSecondary || "#6b7280" }}>
                                            Shipping
                                        </span>
                                        <span
                                            className="font-semibold"
                                            style={{ color: shippingCost === 0 ? "#10b981" : theme.colors.textPrimary }}
                                        >
                                            {shippingCost === 0 ? "FREE" : formatPrice(shippingCost, business?.currency)}
                                        </span>
                                    </div>

                                    {totalPrice < 50 && totalPrice > 0 && (
                                        <div className="rounded-lg bg-purple-50 p-3 text-xs text-purple-700">
                                            Add {formatPrice(50 - totalPrice, business?.currency)} more for free shipping!
                                        </div>
                                    )}

                                    <div className="flex justify-between text-sm">
                                        <span style={{ color: theme.colors.textSecondary || "#6b7280" }}>
                                            Tax (10%)
                                        </span>
                                        <span
                                            className="font-semibold"
                                            style={{ color: theme.colors.textPrimary || "#1a1a1a" }}
                                        >
                                            {formatPrice(tax, business?.currency)}
                                        </span>
                                    </div>
                                </div>

                                <div
                                    className="border-t pt-4 mb-6"
                                    style={{ borderColor: theme.colors.cardBorder || "#e5e7eb" }}
                                >
                                    <div className="flex justify-between text-lg font-bold">
                                        <span style={{ color: theme.colors.textPrimary || "#1a1a1a" }}>
                                            Total
                                        </span>
                                        <span style={{ color: theme.colors.textAccent || "#7cb342" }}>
                                            {formatPrice(finalTotal, business?.currency)}
                                        </span>
                                    </div>
                                </div>

                                {/* Promo Code */}
                                <div className="mb-6">
                                    <label
                                        className="mb-2 block text-sm font-semibold"
                                        style={{ color: theme.colors.textPrimary || "#1a1a1a" }}
                                    >
                                        Promo Code
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Enter code"
                                            className="input-shopify flex-1"
                                        />
                                        <button className="btn-secondary whitespace-nowrap">
                                            Apply
                                        </button>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <button className="btn-primary w-full mb-3">
                                    Proceed to Checkout
                                </button>

                                {/* Trust Badges */}
                                <div className="mt-6 space-y-3 text-xs" style={{ color: theme.colors.textSecondary || "#6b7280" }}>
                                    <div className="flex items-center gap-2">
                                        <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Secure checkout</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>30-day money-back guarantee</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Free shipping on orders over $50</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <ThemedFooter />
        </div>
    );
}
