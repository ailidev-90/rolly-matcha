"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@rolly_ecommerce/rolly-api-client";
import { useMatchaCatalog } from "../hooks/useMatchaCatalog";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext";
import { BUSINESS_DOMAIN_SLUG, BUSINESS_ID } from "../config/rolly";
import { FilterModal } from "@/components/home/FilterModal";
import { CartPanel } from "@/components/home/CartPanel";
import { WishlistPanel } from "@/components/home/WishlistPanel";
import { HeroBanner } from "@/components/theme/HeroBanner";
import { FeaturedProducts } from "@/components/theme/FeaturedProducts";
import { CallToAction } from "@/components/theme/CallToAction";
import { ProductGrid } from "@/components/theme/ProductGrid";
import { ThemedHeader } from "@/components/theme/ThemedHeader";
import { ThemedFooter } from "@/components/theme/ThemedFooter";
import { ThemeSelector } from "@/components/theme/ThemeSelector";
import { Features } from "@/components/theme/Features";
import { Testimonials } from "@/components/theme/Testimonials";
import { getProductSlug } from "./homeUtils";
import type { SortOption, StatusFilter } from "./homeTypes";

export default function Home() {
  const { theme } = useTheme();
  const { loading, error, products, business } = useMatchaCatalog({
    businessId: BUSINESS_ID,
    domain: BUSINESS_DOMAIN_SLUG,
  });

  const { items, addItem, totalQuantity, totalPrice, updateQuantity } = useCart();
  const { items: wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, totalItems: wishlistTotal } = useWishlist();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy] = useState<SortOption>("name-asc");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [minPriceFilter, setMinPriceFilter] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [addingProductId, setAddingProductId] = useState<string | null>(null);

  const pageSize = 8;

  const handleAddToCart = (product: Product) => {
    setAddingProductId(product.id);

    addItem(
      {
        id: product.id,
        name: product.name,
        slug: getProductSlug(product),
        imageUrl: product.image_url,
        price: product.sale_price || product.price,
      },
      1,
    );

    window.setTimeout(() => {
      setAddingProductId((prev) => (prev === product.id ? null : prev));
    }, 400);
  };

  const handleAddToCartFromWishlist = (item: typeof wishlistItems[0]) => {
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
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  const handleToggleWishlist = (product: Product) => {
    const productSlug = product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        slug: productSlug,
        imageUrl: product.image_url,
        price: product.sale_price || product.price,
        description: product.description,
      });
    }
  };

  const categoryOptions = useMemo(
    () =>
      Array.from(
        new Set(
          products
            .map((product) => product.category_name)
            .filter((name) => typeof name === "string" && name.length > 0),
        ),
      ),
    [products],
  );

  const priceBounds = useMemo(() => {
    const prices = products.map((product) => product.sale_price || product.price);
    if (!prices.length) {
      return { min: 0, max: 0 };
    }
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [products]);

  const visibleProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((product) => {
        const name = product.name?.toLowerCase() ?? "";
        const category = product.category_name?.toLowerCase() ?? "";
        return name.includes(query) || category.includes(query);
      });
    }

    if (categoryFilter !== "all") {
      result = result.filter(
        (product) => product.category_name === categoryFilter,
      );
    }

    if (statusFilter === "available") {
      result = result.filter((product) => product.state === "available");
    }

    if (onSaleOnly) {
      result = result.filter(
        (product) =>
          product.sale_price !== null &&
          product.sale_price !== undefined &&
          product.sale_price < product.price,
      );
    }

    const effectiveMinPrice = minPriceFilter ?? priceBounds.min ?? 0;
    const effectiveMaxPrice = priceBounds.max ?? 0;

    result = result.filter((product) => {
      const productPrice = product.sale_price || product.price;
      return (
        productPrice >= effectiveMinPrice && productPrice <= effectiveMaxPrice
      );
    });

    result.sort((a, b) => {
      const priceA = a.sale_price || a.price;
      const priceB = b.sale_price || b.price;

      switch (sortBy) {
        case "price-asc":
          return priceA - priceB;
        case "price-desc":
          return priceB - priceA;
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "name-asc":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return result;
  }, [
    products,
    searchQuery,
    categoryFilter,
    statusFilter,
    onSaleOnly,
    minPriceFilter,
    priceBounds.min,
    priceBounds.max,
    sortBy,
  ]);

  const totalPages = useMemo(
    () =>
      visibleProducts.length > 0
        ? Math.ceil(visibleProducts.length / pageSize)
        : 1,
    [visibleProducts.length],
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter, statusFilter, onSaleOnly, minPriceFilter, sortBy]);

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return visibleProducts.slice(start, start + pageSize);
  }, [visibleProducts, currentPage]);

  if (loading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: theme.colors.background }}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-t-transparent"
            style={{ borderColor: theme.colors.primaryButton, borderTopColor: "transparent" }}
          />
          <p style={{ color: theme.colors.textSecondary }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: theme.colors.background }}
      >
        <div className="text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: theme.colors.background }}
    >
      <ThemedHeader
        businessName={business?.name}
        businessLogo={business?.img}
        cartQuantity={totalQuantity}
        wishlistQuantity={wishlistTotal}
        onToggleCart={() => setIsCartOpen(true)}
        onToggleWishlist={() => setIsWishlistOpen(true)}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        products={visibleProducts}
      />

      {/* Hero Banner - Full Width */}
      <HeroBanner
        businessName={business?.name}
        businessDescription={business?.metadata?.description}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Featured Products */}
        {products.length > 0 && (
          <FeaturedProducts
            products={products}
            currency={business?.currency}
            onAddToCart={handleAddToCart}
            addingProductId={addingProductId}
            onToggleWishlist={handleToggleWishlist}
            isInWishlist={isInWishlist}
          />
        )}

        {/* Features */}
        <Features />

        {/* Testimonials */}
        <Testimonials />
      </div>

      {/* Call to Action - Full Width */}
      <CallToAction />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* All Products Section */}
        <section id="products" className="py-12">
          <div className="mb-8 text-center">
            <h2
              className="mb-3 text-3xl font-bold sm:text-4xl"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: theme.colors.textPrimary,
              }}
            >
              All Products
            </h2>
            <p
              className="text-lg"
              style={{ color: theme.colors.textSecondary }}
            >
              {visibleProducts.length} products available
            </p>
          </div>

          {visibleProducts.length === 0 ? (
            <p
              className="py-12 text-center text-lg"
              style={{ color: theme.colors.textSecondary }}
            >
              No products match your search or filters.
            </p>
          ) : (
            <>
              <ProductGrid
                products={paginatedProducts}
                currency={business?.currency}
                onAddToCart={handleAddToCart}
                addingProductId={addingProductId}
                onToggleWishlist={handleToggleWishlist}
                isInWishlist={isInWishlist}
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 disabled:opacity-30 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #7cb342 0%, #558b2f 100%)",
                      color: "#ffffff",
                    }}
                  >
                    Previous
                  </button>

                  <span
                    className="px-4 py-2 text-sm font-medium"
                    style={{ color: theme.colors.textPrimary }}
                  >
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    type="button"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 disabled:opacity-30 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #7cb342 0%, #558b2f 100%)",
                      color: "#ffffff",
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>

      {/* Footer */}
      <ThemedFooter />

      {/* Modals */}
      <FilterModal
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        categoryOptions={categoryOptions}
        categoryFilter={categoryFilter}
        statusFilter={statusFilter}
        onSaleOnly={onSaleOnly}
        minPriceFilter={minPriceFilter}
        priceBounds={priceBounds}
        currency={business?.currency}
        onChangeCategory={setCategoryFilter}
        onChangeStatus={setStatusFilter}
        onToggleOnSale={() => setOnSaleOnly((prev) => !prev)}
        onChangeMinPrice={setMinPriceFilter}
        onReset={() => {
          setCategoryFilter("all");
          setStatusFilter("all");
          setOnSaleOnly(false);
          setMinPriceFilter(null);
        }}
      />

      {isCartOpen && (
        <CartPanel
          items={items}
          totalQuantity={totalQuantity}
          totalPrice={totalPrice}
          currency={business?.currency}
          onUpdateQuantity={updateQuantity}
          onClose={() => setIsCartOpen(false)}
        />
      )}

      {isWishlistOpen && (
        <WishlistPanel
          items={wishlistItems}
          currency={business?.currency}
          onRemove={removeFromWishlist}
          onAddToCart={handleAddToCartFromWishlist}
          onClose={() => setIsWishlistOpen(false)}
        />
      )}

      {/* Theme Selector */}
      <ThemeSelector />
    </div>
  );
}
