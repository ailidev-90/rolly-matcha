"use client";

import Image from "next/image";
import Link from "next/link";
import type { WishlistItem } from "../../context/WishlistContext";
import { formatPrice } from "../../app/homeUtils";

type WishlistPanelProps = {
    items: WishlistItem[];
    currency?: string;
    onRemove: (id: string) => void;
    onAddToCart?: (item: WishlistItem) => void;
    onClose: () => void;
};

export function WishlistPanel({
    items,
    currency,
    onRemove,
    onAddToCart,
    onClose,
}: WishlistPanelProps) {
    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl">
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b p-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">My Wishlist</h2>
                            <p className="text-sm text-gray-500">
                                {items.length} {items.length === 1 ? "item" : "items"}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="rounded-full p-2 transition-colors hover:bg-gray-100"
                        >
                            <svg
                                className="h-6 w-6 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Items */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {items.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center text-center">
                                <svg
                                    className="mb-4 h-24 w-24 text-gray-300"
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
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                    Your wishlist is empty
                                </h3>
                                <p className="mb-6 text-sm text-gray-500">
                                    Save items you love for later!
                                </p>
                                <Link
                                    href="/"
                                    onClick={onClose}
                                    className="rounded-full px-6 py-3 font-semibold text-white transition-all hover:scale-105"
                                    style={{
                                        background: "linear-gradient(135deg, #7cb342 0%, #558b2f 100%)",
                                    }}
                                >
                                    Start Shopping
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-4 rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
                                    >
                                        {/* Image */}
                                        <Link
                                            href={`/products/${item.slug}`}
                                            onClick={onClose}
                                            className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50"
                                        >
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.name}
                                                fill
                                                className="object-contain p-2"
                                            />
                                        </Link>

                                        {/* Info */}
                                        <div className="flex flex-1 flex-col justify-between">
                                            <div>
                                                <Link
                                                    href={`/products/${item.slug}`}
                                                    onClick={onClose}
                                                    className="font-semibold text-gray-900 hover:text-green-600"
                                                >
                                                    {item.name}
                                                </Link>
                                                {item.description && (
                                                    <p className="mt-1 line-clamp-1 text-xs text-gray-500">
                                                        {item.description.replace(/<[^>]*>/g, '')}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="mt-2 flex items-center justify-between">
                                                <p className="font-bold text-green-600">
                                                    {formatPrice(item.price, currency)}
                                                </p>
                                                <div className="flex gap-2">
                                                    {onAddToCart && (
                                                        <button
                                                            onClick={() => onAddToCart(item)}
                                                            className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-green-700"
                                                        >
                                                            Add to Cart
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => onRemove(item.id)}
                                                        className="rounded-full p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
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
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="border-t p-6">
                            <Link
                                href="/wishlist"
                                onClick={onClose}
                                className="block w-full rounded-full py-3 text-center font-semibold text-white transition-all hover:scale-105"
                                style={{
                                    background: "linear-gradient(135deg, #7cb342 0%, #558b2f 100%)",
                                }}
                            >
                                View Full Wishlist
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
