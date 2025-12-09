"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@rolly_ecommerce/rolly-api-client";
import { useTheme } from "../../context/ThemeContext";
import { formatPrice } from "../../app/homeUtils";
import { getProductSlug } from "../../app/homeUtils";

type FeaturedProductsProps = {
  products: Product[];
  currency?: string;
  onAddToCart: (product: Product) => void;
  addingProductId: string | null;
  onToggleWishlist?: (product: Product) => void;
  isInWishlist?: (productId: string) => boolean;
};

export function FeaturedProducts({
  products,
  currency,
  onAddToCart,
  addingProductId,
  onToggleWishlist,
  isInWishlist,
}: FeaturedProductsProps) {
  const { theme } = useTheme();

  // Get first 4 products as featured
  const featuredProducts = products.slice(0, 4);

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section id="featured" className="py-16 animate-fade-in">
      <div className="mb-12 text-center">
        <div className="inline-block mb-3 px-4 py-1 rounded-full bg-green-100 text-green-600 text-sm font-semibold">
          ⭐ Featured Collection
        </div>
        <h2
          className="text-4xl sm:text-5xl font-bold mb-4"
          style={{ fontFamily: "'Playfair Display', serif", color: theme.colors.textPrimary || "#1a1a1a" }}
        >
          Handpicked for You
        </h2>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: theme.colors.textSecondary || "#6b7280" }}
        >
          Discover our most popular products, carefully selected to bring you the best quality and value.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => {
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
                {hasDiscount && (
                  <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold shadow-lg">
                    -{discountPercentage}% OFF
                  </div>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (onToggleWishlist) {
                      onToggleWishlist(product);
                    }
                  }}
                  className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 ${isInWishlist && isInWishlist(product.id)
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
                    className="font-semibold mb-2 line-clamp-2 transition-colors hover:text-green-600"
                    style={{ color: theme.colors.textPrimary || "#1a1a1a" }}
                  >
                    {product.name}
                  </h3>
                </Link>

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
                  disabled={isAdding}
                  className="w-full py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
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
    </section>
  );
}
