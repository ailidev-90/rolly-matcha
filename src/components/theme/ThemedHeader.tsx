"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import { useTheme } from "../../context/ThemeContext";
import type { Product } from "@rolly_ecommerce/rolly-api-client";
import type { SortOption } from "../../app/homeTypes";

type ThemedHeaderProps = {
  businessName?: string;
  businessLogo?: string | null;
  businessImage?: string | null;
  cartQuantity?: number;
  totalQuantity?: number;
  wishlistQuantity?: number;
  onToggleCart?: () => void;
  onToggleWishlist?: () => void;
  onToggleSearch?: () => void;
  onSearch?: (query: string) => void;
  onChangeSearch?: Dispatch<SetStateAction<string>>;
  onChangeSort?: Dispatch<SetStateAction<SortOption>>;
  onOpenFilter?: () => void;
  searchQuery?: string;
  searchOpen?: boolean;
  sortBy?: string;
  hideSearchAndFilter?: boolean;
  products?: Product[];
};

export function ThemedHeader({
  businessName = "Mamamatcha",
  businessLogo,
  businessImage,
  cartQuantity = 0,
  totalQuantity,
  wishlistQuantity = 0,
  onToggleCart,
  onToggleWishlist,
  onSearch,
  searchQuery = "",
  products = [],
}: ThemedHeaderProps) {
  // Use businessImage if provided, otherwise fall back to businessLogo
  const logoUrl = businessImage || businessLogo;
  // Use totalQuantity if provided, otherwise fall back to cartQuantity
  const displayQuantity = totalQuantity ?? cartQuantity;
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  // Handle search input and filter products
  useEffect(() => {
    if (localSearchQuery.trim().length > 0) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(localSearchQuery.toLowerCase())
      ).slice(0, 6); // Limit to 6 results
      setFilteredProducts(filtered);
      setShowSearchResults(true);
    } else {
      setFilteredProducts([]);
      setShowSearchResults(false);
    }
  }, [localSearchQuery, products]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setLocalSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSearchResults(false);
    if (onSearch) {
      onSearch(localSearchQuery);
    }
  };

  const formatPrice = (price: number) => {
    return `Rp${price.toLocaleString("id-ID")}`;
  };

  return (
    <>
      {/* Announcement Bar */}
      <div
        className="py-2 text-center text-sm font-medium text-white"
        style={{
          background: "linear-gradient(135deg, #7cb342 0%, #558b2f 100%)",
        }}
      >
        ✨ Free shipping on orders over $50 | Shop now and save! ✨
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? "shadow-lg" : "shadow-sm"
          }`}
        style={{
          backgroundColor: theme.colors.headerBg || "#ffffff",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo & Brand */}
            <Link href="/" className="flex items-center gap-3 group">
              <div
                className="relative h-12 w-12 overflow-hidden bg-white shadow-sm transition-transform duration-300 group-hover:scale-105"
                style={{ borderRadius: "12px" }}
              >
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt={businessName ?? "Store logo"}
                    fill
                    className="object-contain p-1"
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center text-xl font-bold text-green-600"
                  >
                    {businessName?.[0] ?? "S"}
                  </div>
                )}
              </div>
              <div className="hidden sm:block">
                <h1
                  className="text-xl font-bold tracking-tight text-gray-900"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {businessName ?? "Rolly Store"}
                </h1>
                <p className="text-xs text-gray-500">Premium Quality Products</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="/"
                className="text-sm font-medium text-gray-900 transition-colors hover:text-green-600"
              >
                Shop All
              </Link>
              <Link
                href="/#featured"
                className="text-sm font-medium text-gray-900 transition-colors hover:text-green-600"
              >
                Featured
              </Link>
              <Link
                href="/#contact"
                className="text-sm font-medium text-gray-900 transition-colors hover:text-green-600"
              >
                Contact
              </Link>
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:block flex-1 max-w-xl mx-8" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={localSearchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => localSearchQuery.trim().length > 0 && setShowSearchResults(true)}
                  className="w-full rounded-full border-2 border-gray-200 bg-gray-50 py-2 pl-12 pr-4 text-sm transition-all focus:border-green-500 focus:bg-white focus:outline-none"
                />
                <svg
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </form>

              {/* Search Results Megamenu */}
              {showSearchResults && (
                <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[500px] overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl">
                  {filteredProducts.length > 0 ? (
                    <div className="p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-900">
                          Search Results ({filteredProducts.length})
                        </h3>
                        <button
                          onClick={() => setShowSearchResults(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="space-y-2">
                        {filteredProducts.map((product) => {
                          // Generate slug from product name
                          const productSlug = product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

                          return (
                            <Link
                              key={product.id}
                              href={`/products/${productSlug}`}
                              onClick={() => setShowSearchResults(false)}
                              className="flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-gray-50"
                            >
                              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                <Image
                                  src={product.image_url}
                                  alt={product.name}
                                  fill
                                  className="object-contain p-2"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="truncate font-semibold text-gray-900">
                                  {product.name}
                                </h4>
                                {product.category_name && (
                                  <p className="text-xs text-green-600">
                                    {product.category_name}
                                  </p>
                                )}
                                <p className="mt-1 font-bold text-green-600">
                                  {formatPrice(product.sale_price || product.price)}
                                </p>
                              </div>
                              <svg
                                className="h-5 w-5 flex-shrink-0 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </Link>
                          )
                        })}
                      </div>
                      {filteredProducts.length >= 6 && (
                        <div className="mt-4 border-t pt-3">
                          <button
                            onClick={() => {
                              setShowSearchResults(false);
                              if (onSearch) onSearch(localSearchQuery);
                            }}
                            className="w-full rounded-full bg-green-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                          >
                            View All Results
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <svg
                        className="mx-auto mb-3 h-12 w-12 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-sm font-medium text-gray-900">No products found</p>
                      <p className="mt-1 text-xs text-gray-500">
                        Try searching with different keywords
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Wishlist Button */}
              <button
                onClick={onToggleWishlist}
                className="relative rounded-full p-3 text-white transition-all hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, #7cb342 0%, #558b2f 100%)",
                }}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {wishlistQuantity > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {wishlistQuantity}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={onToggleCart}
                className="relative rounded-full p-3 text-white transition-all hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, #7cb342 0%, #558b2f 100%)",
                }}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {displayQuantity > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {displayQuantity}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden rounded-full p-2 text-gray-900 hover:bg-gray-100"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white">
          <div className="p-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="mb-4 rounded-full p-2 hover:bg-gray-100"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <nav className="space-y-4">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-medium text-gray-900"
              >
                Shop All
              </Link>
              <Link
                href="/#featured"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-medium text-gray-900"
              >
                Featured
              </Link>
              <Link
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-medium text-gray-900"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
