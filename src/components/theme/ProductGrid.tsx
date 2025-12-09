"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@rolly_ecommerce/rolly-api-client";
import { useTheme } from "../../context/ThemeContext";
import { formatPrice } from "../../app/homeUtils";
import { getProductSlug } from "../../app/homeUtils";

type ProductGridProps = {
  products: Product[];
  currency?: string;
  onAddToCart: (product: Product) => void;
  addingProductId: string | null;
  onToggleWishlist?: (product: Product) => void;
  isInWishlist?: (productId: string) => boolean;
};

export function ProductGrid({
  products,
  currency,
  onAddToCart,
  addingProductId,
  onToggleWishlist,
  isInWishlist,
}: ProductGridProps) {
  const { theme } = useTheme();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        const hasDiscount = product.sale_price && product.sale_price < product.price;
        const discountPercentage = hasDiscount
          ? Math.round(((product.price - product.sale_price) / product.price) * 100)
          : 0;
        const isAdding = addingProductId === product.id;

        return (
          <div
            key={product.id}
            className="card-shopify group"
          >
            {/* Product Image */}
            <Link href={`/products/${getProductSlug(product)}`} className="block relative aspect-square overflow-hidden bg-gray-50">
              {/* Badges */}
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                {hasDiscount && (
                  <div className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold shadow-lg">
                    -{discountPercentage}%
                  </div>
                )}
                {product.state !== "available" && (
                  <div className="px-3 py-1 rounded-full bg-gray-500 text-white text-xs font-bold shadow-lg">
                    Out of Stock
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (onToggleWishlist) {
                      onToggleWishlist(product);
                    }
                  }}
                  className={`p-2 rounded-full backdrop-blur-sm hover:scale-110 transition-transform ${isInWishlist && isInWishlist(product.id)
                      ? "bg-red-500 text-white"
                      : "bg-white/90 text-gray-700"
                    }`}
                  aria-label="Add to wishlist"
                >
                  <svg
                    className="h-5 w-5"
                    fill={isInWishlist && isInWishlist(product.id) ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = `/products/${getProductSlug(product)}`;
                  }}
                  className="p-2 rounded-full bg-white/90 backdrop-blur-sm hover:scale-110 transition-transform text-gray-700"
                  aria-label="Quick view"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>

              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
              />
            </Link>

            {/* Product Info */}
            <div className="p-5">
              {product.category_name && (
                <p className="text-xs font-semibold uppercase tracking-wider text-green-600 mb-2">
                  {product.category_name}
                </p>
              )}

              <Link href={`/products/${getProductSlug(product)}`}>
                <h3
                  className="font-semibold mb-2 line-clamp-2 transition-colors hover:text-green-600 min-h-[3rem]"
                  style={{ color: theme.colors.textPrimary || "#1a1a1a" }}
                >
                  {product.name}
                </h3>
              </Link>

              {/* Rating (Mock) */}
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="h-4 w-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs text-gray-500 ml-1">(4.9)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4">
                <span
                  className="text-xl font-bold"
                  style={{ color: theme.colors.textAccent || "#7cb342" }}
                >
                  {formatPrice(product.sale_price || product.price, currency)}
                </span>
                {hasDiscount && (
                  <span className="text-sm line-through text-gray-400">
                    {formatPrice(product.price, currency)}
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={() => onAddToCart(product)}
                disabled={isAdding || product.state !== "available"}
                className="w-full py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #7cb342 0%, #558b2f 100%)",
                }}
              >
                {isAdding ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Adding...
                  </span>
                ) : product.state !== "available" ? (
                  "Out of Stock"
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Add to Cart
                  </span>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
