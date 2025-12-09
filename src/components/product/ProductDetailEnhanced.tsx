"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@rolly_ecommerce/rolly-api-client";
import { formatPrice } from "../../app/homeUtils";

type ProductDetailEnhancedProps = {
    product: Product;
    currency?: string;
    onAddToCart: () => void;
    addingToCart: boolean;
    quantity: number;
    setQuantity: (qty: number) => void;
    onToggleWishlist?: () => void;
    isInWishlist?: boolean;
};

export function ProductDetailEnhanced({
    product,
    currency,
    onAddToCart,
    addingToCart,
    quantity,
    setQuantity,
    onToggleWishlist,
    isInWishlist = false,
}: ProductDetailEnhancedProps) {
    const [selectedImage, setSelectedImage] = useState(product.image_url);
    const [activeTab, setActiveTab] = useState<"description" | "benefits" | "ingredients" | "howto">("description");

    const hasDiscount = product.sale_price && product.sale_price < product.price;
    const discountPercentage = hasDiscount
        ? Math.round(((product.price - product.sale_price) / product.price) * 100)
        : 0;

    // Mock data for enhanced content
    const productBenefits = [
        { icon: "🍵", title: "Premium Quality", description: "Sourced from the finest matcha farms in Japan" },
        { icon: "🌿", title: "100% Organic", description: "No pesticides or harmful chemicals" },
        { icon: "⚡", title: "Energy Boost", description: "Natural caffeine for sustained energy" },
        { icon: "💚", title: "Rich in Antioxidants", description: "Packed with catechins and EGCG" },
    ];

    const ingredients = [
        "100% Pure Ceremonial Grade Matcha",
        "Organic Green Tea Leaves",
        "Natural L-Theanine",
        "Chlorophyll",
        "Amino Acids",
    ];

    const howToUse = [
        { step: 1, title: "Measure", description: "Add 1-2 teaspoons of matcha powder to your cup" },
        { step: 2, title: "Add Water", description: "Pour 60-70ml of hot water (70-80°C)" },
        { step: 3, title: "Whisk", description: "Whisk vigorously in a zigzag motion until frothy" },
        { step: 4, title: "Enjoy", description: "Drink immediately for best taste and benefits" },
    ];

    const relatedProducts = [
        { id: 1, name: "Matcha Whisk", price: 150000, image: product.image_url },
        { id: 2, name: "Matcha Bowl", price: 200000, image: product.image_url },
        { id: 3, name: "Bamboo Scoop", price: 75000, image: product.image_url },
    ];

    return (
        <div className="space-y-12">
            {/* Main Product Section */}
            <div className="grid gap-12 lg:grid-cols-2">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="card-shopify relative aspect-square overflow-hidden bg-gray-50">
                        {hasDiscount && (
                            <div className="absolute left-4 top-4 z-10 rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
                                -{discountPercentage}% OFF
                            </div>
                        )}
                        {product.state !== "available" && (
                            <div className="absolute right-4 top-4 z-10 rounded-full bg-gray-800 px-4 py-2 text-sm font-bold text-white">
                                Out of Stock
                            </div>
                        )}
                        <Image
                            src={selectedImage}
                            alt={product.name}
                            fill
                            className="object-contain p-8"
                            priority
                        />
                    </div>

                    {/* Thumbnail */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => setSelectedImage(product.image_url)}
                            className={`relative h-20 w-20 overflow-hidden rounded-lg border-2 transition-all ${selectedImage === product.image_url
                                ? "border-green-600 ring-2 ring-green-200"
                                : "border-gray-200 hover:border-green-300"
                                }`}
                        >
                            <Image
                                src={product.image_url}
                                alt={product.name}
                                fill
                                className="object-contain p-2"
                            />
                        </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-2 gap-4 pt-6">
                        <div className="flex items-center gap-3 rounded-lg bg-green-50 p-4">
                            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <div>
                                <p className="text-xs font-semibold text-green-900">Secure Payment</p>
                                <p className="text-xs text-green-700">100% Protected</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg bg-green-50 p-4">
                            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                            <div>
                                <p className="text-xs font-semibold text-green-900">Free Shipping</p>
                                <p className="text-xs text-green-700">Orders over Rp50.000</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                    {/* Product Name */}
                    <h1
                        className="mb-4 text-3xl font-bold leading-tight sm:text-4xl text-gray-900"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        {product.name}
                    </h1>

                    {/* Sold Indicator */}
                    <div className="mb-4 flex items-center gap-2 text-sm">
                        <svg className="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium text-red-500">7 sold in last 35 hours</span>
                    </div>

                    {/* Description */}
                    <div
                        className="mb-4 text-gray-600 leading-relaxed line-clamp-2"
                        dangerouslySetInnerHTML={{
                            __html: product.description || "Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Pellentesque diam dolor, elementum etos lobortis..."
                        }}
                    />

                    {/* Vendor & Availability */}
                    <div className="mb-4 space-y-1 text-sm">
                        <div className="flex gap-2">
                            <span className="font-semibold text-gray-900">Vendor:</span>
                            <span className="text-gray-600">Mamamatcha</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="font-semibold text-gray-900">Availability:</span>
                            <span className="text-green-600 font-medium">
                                {product.state === "available" ? "In stock" : "Out of stock"}
                            </span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="mb-6 flex items-baseline gap-3">
                        {hasDiscount && (
                            <span className="text-xl text-gray-400 line-through">
                                {formatPrice(product.price, currency)}
                            </span>
                        )}
                        <span className="text-3xl font-bold text-gray-900">
                            {formatPrice(product.sale_price || product.price, currency)}
                        </span>
                    </div>

                    {/* Size Selector */}
                    <div className="mb-6">
                        <label className="mb-3 block text-sm font-semibold text-gray-900">
                            Size: <span className="font-normal text-gray-600">250ml</span>
                        </label>
                        <div className="flex gap-3">
                            <button className="rounded border-2 border-green-600 px-6 py-2 text-sm font-medium text-white transition-colors" style={{ background: "linear-gradient(135deg, #7cb342 0%, #558b2f 100%)" }}>
                                250ml
                            </button>
                            <button className="rounded border-2 border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-green-600">
                                500ml
                            </button>
                            <button className="rounded border-2 border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-400 line-through">
                                1L
                            </button>
                        </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="mb-6">
                        <label className="mb-3 block text-sm font-semibold text-gray-900">
                            Quantity:
                        </label>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border-2 border-gray-300 rounded">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="flex h-10 w-10 items-center justify-center text-xl font-bold transition-colors hover:bg-gray-100 text-gray-900"
                                >
                                    −
                                </button>
                                <span className="w-12 text-center text-base font-medium text-gray-900">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(Math.min(99, quantity + 1))}
                                    className="flex h-10 w-10 items-center justify-center text-xl font-bold transition-colors hover:bg-gray-100 text-gray-900"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Subtotal */}
                    <div className="mb-6 flex items-center justify-between border-t border-b py-4">
                        <span className="text-sm font-semibold text-gray-900">Subtotal:</span>
                        <span className="text-xl font-bold text-gray-900">
                            {formatPrice((product.sale_price || product.price) * quantity, currency)}
                        </span>
                    </div>


                    {/* Add to Cart Button */}
                    <button
                        onClick={onAddToCart}
                        disabled={addingToCart || product.state !== "available"}
                        className="mb-4 w-full py-4 text-base font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-50"
                        style={{
                            background: "linear-gradient(135deg, #7cb342 0%, #558b2f 100%)",
                        }}
                    >
                        {addingToCart ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Adding...
                            </span>
                        ) : product.state !== "available" ? (
                            "Out of Stock"
                        ) : (
                            "Add To Cart"
                        )}
                    </button>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={onToggleWishlist}
                            className={`flex items-center justify-center gap-2 rounded border-2 px-4 py-2 text-sm font-medium transition-all ${isInWishlist
                                ? "border-green-600 bg-green-600 text-white hover:bg-green-700"
                                : "border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                                }`}
                        >
                            <svg className="h-5 w-5" fill={isInWishlist ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
                        </button>
                        <button className="flex items-center justify-center gap-2 rounded border-2 border-green-600 px-4 py-2 text-sm font-medium text-green-600 transition-all hover:bg-green-600 hover:text-white">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            Share
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="border-t pt-12">
                <div className="mb-8 flex gap-4 border-b">
                    {[
                        { id: "description", label: "Description" },
                        { id: "benefits", label: "Benefits" },
                        { id: "ingredients", label: "Ingredients" },
                        { id: "howto", label: "How to Use" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`pb-4 px-4 font-semibold transition-colors ${activeTab === tab.id
                                ? "border-b-2 border-green-600 text-green-600"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="py-8">
                    {activeTab === "description" && (
                        <div className="prose max-w-none">
                            <div
                                className="text-lg leading-relaxed text-gray-700"
                                dangerouslySetInnerHTML={{
                                    __html: product.description || "Experience the authentic taste of premium Japanese matcha. Our ceremonial grade matcha is carefully stone-ground from the finest shade-grown tea leaves, ensuring maximum flavor and nutritional benefits. Perfect for traditional tea ceremonies, modern lattes, or healthy smoothies.<br/><br/>Each batch is tested for quality and purity, guaranteeing you receive only the best matcha powder available. The vibrant green color and smooth, umami-rich flavor make this matcha a favorite among tea enthusiasts worldwide."
                                }}
                            />
                        </div>
                    )}

                    {activeTab === "benefits" && (
                        <div className="grid gap-6 md:grid-cols-2">
                            {productBenefits.map((benefit, index) => (
                                <div key={index} className="flex gap-4 rounded-lg bg-gray-50 p-6">
                                    <div className="text-4xl">{benefit.icon}</div>
                                    <div>
                                        <h3 className="mb-2 text-lg font-semibold text-gray-900">{benefit.title}</h3>
                                        <p className="text-gray-600">{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === "ingredients" && (
                        <div className="rounded-lg bg-gray-50 p-8">
                            <h3 className="mb-4 text-xl font-semibold text-gray-900">What's Inside</h3>
                            <ul className="space-y-3">
                                {ingredients.map((ingredient, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700">{ingredient}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {activeTab === "howto" && (
                        <div className="grid gap-6 md:grid-cols-2">
                            {howToUse.map((step) => (
                                <div key={step.step} className="flex gap-4">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white">
                                        {step.step}
                                    </div>
                                    <div>
                                        <h3 className="mb-2 text-lg font-semibold text-gray-900">{step.title}</h3>
                                        <p className="text-gray-600">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Related Products */}
            <div className="border-t pt-12">
                <h2 className="mb-8 text-2xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Complete Your Set
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {relatedProducts.map((item) => (
                        <div key={item.id} className="card-shopify overflow-hidden">
                            <div className="relative aspect-square bg-gray-50">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-contain p-8"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="mb-2 font-semibold text-gray-900">{item.name}</h3>
                                <p className="mb-4 text-lg font-bold text-green-600">
                                    {formatPrice(item.price, currency)}
                                </p>
                                <button className="w-full rounded-full border-2 border-green-600 py-2 font-semibold text-green-600 transition-all hover:bg-green-600 hover:text-white">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
