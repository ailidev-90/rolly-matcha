"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import {
  RollyClient,
  ProductService,
  type Product,
  type ProductReview,
} from "@rolly_ecommerce/rolly-api-client";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import { useTheme } from "../../../context/ThemeContext";
import { useMatchaCatalog } from "../../../hooks/useMatchaCatalog";
import { BUSINESS_DOMAIN_SLUG, BUSINESS_ID } from "../../../config/rolly";
import { ThemedHeader } from "@/components/theme/ThemedHeader";
import { ThemedFooter } from "@/components/theme/ThemedFooter";
import { CartPanel } from "@/components/home/CartPanel";
import { WishlistPanel } from "@/components/home/WishlistPanel";
import { ProductDetailEnhanced } from "@/components/product/ProductDetailEnhanced";

type ProductDetailPageProps = {
  params: {
    slug: string;
  };
};

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = params;
  const { theme } = useTheme();
  const { items, addItem, updateQuantity, totalQuantity, totalPrice } = useCart();
  const { items: wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, totalItems: wishlistTotal } = useWishlist();

  const { loading, error, business } = useMatchaCatalog({
    businessId: BUSINESS_ID,
    domain: BUSINESS_DOMAIN_SLUG,
  });

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  // Fetch product details with reviews using getProductDetailsByPath
  useEffect(() => {
    if (!slug) return;

    const fetchProductDetails = async () => {
      try {
        setDetailLoading(true);
        setDetailError(null);

        const client = new RollyClient();
        const productService = new ProductService(client);
        productService.setBusinessId(BUSINESS_ID);

        const response = await productService.getProductDetailsByPath(slug);
        const data = response.data as any;

        if (data && data.products && data.products.length > 0) {
          const firstProduct = data.products[0];
          setProduct(firstProduct);
          setSelectedImage(firstProduct.image_url);

          // Extract reviews from the detailed product response
          const rawReviews =
            (firstProduct as any).reviews ??
            (firstProduct as any).metadata?.reviews ??
            [];

          setReviews(Array.isArray(rawReviews) ? (rawReviews as ProductReview[]) : []);
        } else {
          setDetailError("Product not found");
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
        setDetailError("Failed to load product details");
      } finally {
        setDetailLoading(false);
      }
    };

    fetchProductDetails();
  }, [slug]);

  // Calculate review statistics
  const reviewStats = useMemo(() => {
    const totalReviews = reviews.length;
    const averageRating = totalReviews === 0
      ? 0
      : reviews.reduce((sum, review) => sum + (review.star ?? 0), 0) / totalReviews;

    const ratingBuckets = [5, 4, 3, 2, 1].map((star) => {
      const count = reviews.filter((review) => review.star === star).length;
      const percentage = totalReviews ? (count / totalReviews) * 100 : 0;
      return { star, count, percentage };
    });

    return { totalReviews, averageRating, ratingBuckets };
  }, [reviews]);

  const handleAddToCart = async () => {
    if (!product) return;

    setAddingToCart(true);

    try {
      // Call guestAnonymousCart API
      const client = new RollyClient();
      const productService = new ProductService(client);
      productService.setBusinessId(BUSINESS_ID);

      const cartResponse = await productService.guestAnonymousCart({
        p_cart_information: [
          {
            product_id: product.id,
            quantity: quantity,
          },
        ],
      });

      const orderResult = cartResponse.data.result;
      console.log('Cart created:', orderResult);

      // Add to local cart state (CartContext akan otomatis save ke localStorage)
      addItem(
        {
          id: product.id,
          name: product.name,
          slug: slug,
          imageUrl: product.image_url,
          price: product.sale_price || product.price,
        },
        quantity
      );

      setAddingToCart(false);
      setIsCartOpen(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setAddingToCart(false);
      // Still add to local cart even if API fails
      addItem(
        {
          id: product.id,
          name: product.name,
          slug: slug,
          imageUrl: product.image_url,
          price: product.sale_price || product.price,
        },
        quantity
      );
      setIsCartOpen(true);
    }
  };

  const handleToggleWishlist = () => {
    if (!product) return;

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        slug: slug,
        imageUrl: product.image_url,
        price: product.sale_price || product.price,
        description: product.description,
      });
    }
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

  if (loading || detailLoading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: theme.colors.background }}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <div
            className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-t-transparent"
            style={{
              borderColor: theme.colors.primaryButton,
              borderTopColor: "transparent",
            }}
          />
          <p style={{ color: theme.colors.textSecondary }}>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || detailError || !product) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: theme.colors.background }}
      >
        <div className="text-center">
          <p className="mb-4 text-xl font-semibold text-red-600">{error || detailError || "Product not found"}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white transition-all hover:scale-105"
            style={{ backgroundColor: theme.colors.primaryButton }}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const hasDiscount = product.sale_price && product.sale_price < product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.sale_price) / product.price) * 100)
    : 0;

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
        onToggleWishlist={() => setIsWishlistOpen(true)}
        products={[]}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm">
          <Link
            href="/"
            className="transition-colors hover:underline"
            style={{ color: theme.colors.textSecondary }}
          >
            Home
          </Link>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span style={{ color: theme.colors.textPrimary }} className="font-medium">
            {product.name}
          </span>
        </nav>

        {/* Enhanced Product Detail Component */}
        <ProductDetailEnhanced
          product={product}
          currency={business?.currency}
          onAddToCart={handleAddToCart}
          addingToCart={addingToCart}
          quantity={quantity}
          setQuantity={setQuantity}
          onToggleWishlist={handleToggleWishlist}
          isInWishlist={isInWishlist(product.id)}
        />
      </div>

      {/* Reviews Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-6">
        <section className="mt-12 px-4">
          <h2
            className="mb-6 text-2xl font-bold"
            style={{ color: theme.colors.textPrimary }}
          >
            Customer Reviews
          </h2>

          <div
            className="overflow-hidden rounded-2xl shadow-lg"
            style={{
              backgroundColor: theme.colors.cardBg,
              border: `1px solid ${theme.colors.cardBorder}`,
            }}
          >
            {/* Review Summary */}
            <div className="border-b p-6" style={{ borderColor: theme.colors.cardBorder }}>
              <div className="flex flex-col gap-6 sm:flex-row">
                {/* Average Rating */}
                <div className="sm:w-1/3">
                  <div className="text-center">
                    <p
                      className="text-5xl font-bold"
                      style={{ color: theme.colors.textAccent }}
                    >
                      {reviewStats.averageRating.toFixed(1)}
                    </p>
                    <div className="mt-2 flex items-center justify-center gap-1">
                      {Array.from({ length: 5 }).map((_, index) => {
                        const filled = reviewStats.averageRating > index;
                        return (
                          <svg
                            key={index}
                            className="h-5 w-5"
                            fill={filled ? theme.colors.textAccent : "none"}
                            stroke={theme.colors.textAccent}
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M10 1.5 7.7 6.4l-5.2.4 4 3.4-1.2 5 4.7-2.8 4.7 2.8-1.2-5 4-3.4-5.2-.4L10 1.5Z"
                              strokeWidth="1"
                            />
                          </svg>
                        );
                      })}
                    </div>
                    <p
                      className="mt-2 text-sm"
                      style={{ color: theme.colors.textSecondary }}
                    >
                      Based on {reviewStats.totalReviews} review{reviewStats.totalReviews === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>

                {/* Rating Distribution */}
                <div className="flex-1">
                  <div className="space-y-2">
                    {reviewStats.ratingBuckets.map(({ star, count, percentage }) => (
                      <div key={star} className="flex items-center gap-3">
                        <span
                          className="w-12 text-sm font-medium"
                          style={{ color: theme.colors.textPrimary }}
                        >
                          {star} Star
                        </span>
                        <div
                          className="relative h-3 flex-1 overflow-hidden rounded-full"
                          style={{ backgroundColor: theme.colors.productImageBg }}
                        >
                          <div
                            className="absolute inset-y-0 left-0 rounded-full transition-all duration-300"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: theme.colors.textAccent,
                            }}
                          />
                        </div>
                        <span
                          className="w-8 text-right text-sm"
                          style={{ color: theme.colors.textSecondary }}
                        >
                          {count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Review List */}
            <div className="p-6">
              {reviewStats.totalReviews === 0 ? (
                <div className="py-8 text-center">
                  <svg
                    className="mx-auto h-16 w-16 opacity-30"
                    style={{ color: theme.colors.textSecondary }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  <p
                    className="mt-4 text-sm"
                    style={{ color: theme.colors.textSecondary }}
                  >
                    No reviews yet. Be the first to review this product!
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <div
                      key={review.id || index}
                      className="flex gap-4 border-b pb-6 last:border-b-0"
                      style={{ borderColor: theme.colors.cardBorder }}
                    >
                      {/* Avatar */}
                      <div
                        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-lg font-semibold"
                        style={{
                          backgroundColor: theme.colors.productBadgeBg,
                          color: theme.colors.productBadgeText,
                        }}
                      >
                        {review.name?.[0]?.toUpperCase() ?? "U"}
                      </div>

                      {/* Review Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p
                              className="font-semibold"
                              style={{ color: theme.colors.textPrimary }}
                            >
                              {review.name || "Anonymous"}
                            </p>
                            <div className="mt-1 flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, starIndex) => {
                                const filled = (review.star ?? 0) > starIndex;
                                return (
                                  <svg
                                    key={starIndex}
                                    className="h-4 w-4"
                                    fill={filled ? theme.colors.textAccent : "none"}
                                    stroke={theme.colors.textAccent}
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      d="M10 1.5 7.7 6.4l-5.2.4 4 3.4-1.2 5 4.7-2.8 4.7 2.8-1.2-5 4-3.4-5.2-.4L10 1.5Z"
                                      strokeWidth="1"
                                    />
                                  </svg>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        {review.description && (
                          <p
                            className="mt-3 text-sm leading-relaxed"
                            style={{ color: theme.colors.textSecondary }}
                          >
                            {review.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <ThemedFooter />

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
    </div>
  );
}
