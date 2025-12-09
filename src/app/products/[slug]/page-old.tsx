"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  RollyClient,
  ProductService,
  type Product,
  type ProductDetailsResponse,
  type ProductReview,
} from "@rolly_ecommerce/rolly-api-client";
import { useCart } from "../../../context/CartContext";

const BUSINESS_ID =
  process.env.NEXT_PUBLIC_ROLLY_BUSINESS_ID ??
  "4a69825a-b817-4e71-8bfd-76a5f04095e8";

function formatPrice(price: number, currencyLabel?: string | null) {
  if (!Number.isFinite(price)) return "-";
  const formatted = new Intl.NumberFormat("id-ID").format(price);
  return currencyLabel ? `${currencyLabel} ${formatted}` : `Rp${formatted}`;
}

type ProductDetailPageProps = {
  params: {
    slug: string;
  };
};

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = params;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [meta, setMeta] = useState<{
    currency: string;
    symbol: string;
  } | null>(null);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [quantity, setQuantity] = useState(1);

  const { items, addItem, updateQuantity } = useCart();
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const client = new RollyClient();
        const productService = new ProductService(client);

        productService.setBusinessId(BUSINESS_ID);

        const response = await productService.getProductDetailsByPath(slug);
        const data = response.data as ProductDetailsResponse;

        if (isCancelled) return;

        const firstProduct = data.products[0] ?? null;

        if (!firstProduct) {
          setError("Produk tidak ditemukan");
          setProduct(null);
          setReviews([]);
        } else {
          setProduct(firstProduct as Product);
          setMeta({
            currency: data.currency,
            symbol: data.symbol,
          });

          const rawReviews =
            (firstProduct as any).reviews ??
            (firstProduct as any).metadata?.reviews ??
            [];

          setReviews(
            Array.isArray(rawReviews) ? (rawReviews as ProductReview[]) : [],
          );
        }

        setLoading(false);
      } catch (err: unknown) {
        if (isCancelled) return;

        const message =
          err instanceof Error ? err.message : "Gagal memuat detail produk";
        setError(message);
        setProduct(null);
        setLoading(false);
      }
    };

    void fetchProduct();

    return () => {
      isCancelled = true;
    };
  }, [slug]);

  const price = product ? product.sale_price || product.price : 0;
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews === 0
      ? 0
      : reviews.reduce((sum, review) => sum + (review.star ?? 0), 0) /
        totalReviews;

  const ratingBuckets = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((review) => review.star === star).length;
    const percentage = totalReviews ? (count / totalReviews) * 100 : 0;
    return { star, count, percentage };
  });

  const handleAddToCart = () => {
    if (!product) return;
    const existing = items.find((item) => item.id === product.id);

    if (existing) {
      updateQuantity(product.id, quantity);
    } else {
      addItem(
        {
          id: product.id,
          name: product.name,
          slug,
          imageUrl: product.image_url,
          price: product.sale_price || product.price,
        },
        quantity,
      );
    }

    setFeedback("Produk berhasil ditambahkan ke cart");
    window.setTimeout(() => {
      setFeedback(null);
    }, 2000);
  };

  const decreaseQuantity = () =>
    setQuantity((prev) => Math.max(1, prev - 1));

  const increaseQuantity = () =>
    setQuantity((prev) => Math.min(99, prev + 1));

  useEffect(() => {
    if (!product) return;
    const existing = items.find((item) => item.id === product.id);
    if (existing) {
      setQuantity(existing.quantity);
    } else {
      setQuantity(1);
    }
  }, [items, product]);

  return (
    <div className="min-h-screen bg-[#F9FBF7] text-[#1F3D2B]">
      {feedback && (
        <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
          <div className="rounded-full bg-[#1F3D2B] px-4 py-2 text-xs font-medium text-white shadow-lg">
            {feedback}
          </div>
        </div>
      )}
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <header className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#3F6B3F]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF3E4]">
              ←
            </span>
            Back to menu
          </Link>
        </header>

        {loading && (
          <p className="mt-6 text-sm text-[#4A6B4A]">
            Loading product details...
          </p>
        )}

        {error && !loading && (
          <p className="mt-6 text-sm text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && product && (
          <>
            <main className="grid gap-8 rounded-3xl bg-white p-6 shadow-md ring-1 ring-[#E1E9DA] sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] sm:p-8">
              <div className="relative overflow-hidden rounded-3xl bg-[#F6FAF2] px-4 pb-6 pt-6">
                <div className="absolute right-4 top-4 rounded-full bg-[#E2F4D7] px-3 py-1 text-xs font-medium text-[#3F6B3F]">
                  Available
                </div>
                <div className="relative mx-auto mt-10 h-72 w-full sm:h-80">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#6A826A]">
                    {product.category_name}
                  </p>
                  <h1 className="mt-1 text-2xl font-semibold text-[#1F3D2B]">
                    {product.name}
                  </h1>
                </div>

                <div
                  className="space-y-2 text-sm leading-relaxed text-[#4A6B4A]"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />

                <div className="mt-2 flex items-baseline gap-2">
                  <p className="text-xl font-semibold text-[#3F6B3F]">
                    {formatPrice(
                      price,
                      meta?.currency ?? meta?.symbol ?? null,
                    )}
                  </p>
                  {product.sale_price && product.sale_price < product.price && (
                    <p className="text-sm text-[#9BAA97] line-through">
                      {formatPrice(product.price, meta?.currency ?? null)}
                    </p>
                  )}
                </div>
              </div>
            </main>

            <section className="mt-6 rounded-3xl bg-white p-6 shadow-md ring-1 ring-[#E1E9DA]">
              <h2 className="text-base font-semibold text-[#1F3D2B]">
                Reviews
              </h2>

              <div className="mt-4 flex flex-col gap-6 sm:flex-row">
                <div className="sm:w-1/4">
                  <p className="text-3xl font-semibold text-[#3F6B3F]">
                    {averageRating.toFixed(1)}
                    <span className="text-sm text-[#6A826A]"> / 5</span>
                  </p>
                  <p className="mt-1 text-xs text-[#6A826A]">
                    {totalReviews} review{totalReviews === 1 ? "" : "s"}
                  </p>
                </div>

                <div className="flex-1 space-y-2">
                  {ratingBuckets.map(({ star, count, percentage }) => (
                    <div
                      key={star}
                      className="flex items-center gap-3 text-xs text-[#4A6B4A]"
                    >
                      <span className="w-4 text-right">{star}</span>
                      <span className="text-[#3F6B3F]">★</span>
                      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-[#EAF3E4]">
                        <div
                          className="absolute inset-y-0 left-0 rounded-full bg-[#3F6B3F]"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-6 text-right text-[#6A826A]">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {totalReviews === 0 ? (
                <p className="mt-4 text-xs text-[#9BAA97]">
                  No reviews found for this filter.
                </p>
              ) : (
                <div className="mt-6 space-y-4">
                  {reviews.map((review) => (
                    <article
                      key={review.id}
                      className="flex gap-3 border-t border-[#EEF3EA] pt-4 text-sm text-[#4A6B4A]"
                    >
                      <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF3E4] text-xs font-semibold text-[#3F6B3F]">
                        {review.name?.[0] ?? "U"}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium text-[#1F3D2B]">
                            {review.name || "Anonymous"}
                          </p>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, index) => {
                              const filled = (review.star ?? 0) > index;
                              return (
                                <svg
                                  key={index}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  className="h-3 w-3"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M10 1.5 7.7 6.4l-5.2.4 4 3.4-1.2 5 4.7-2.8 4.7 2.8-1.2-5 4-3.4-5.2-.4L10 1.5Z"
                                    fill={filled ? "#3F6B3F" : "#EAF3E4"}
                                    stroke="#3F6B3F"
                                    strokeWidth="0.7"
                                  />
                                </svg>
                              );
                            })}
                          </div>
                        </div>
                        {review.description && (
                          <p className="mt-1 text-xs leading-relaxed">
                            {review.description}
                          </p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section className="sticky bottom-0 mt-4 border-t border-[#E1E9DA] bg-[#F9FBF7]/95 py-3 backdrop-blur-sm">
              <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-1 sm:px-0">
                <div className="flex flex-1 items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-white shadow-sm">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#1F3D2B]">
                      {product.name}
                    </p>
                    <p className="text-xs font-semibold text-[#3F6B3F]">
                      {formatPrice(
                        price,
                        meta?.currency ?? meta?.symbol ?? null,
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-[#C9D8C1] bg-white px-3 py-1.5 text-xs">
                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      className="flex h-6 w-6 items-center justify-center rounded-full border border-[#C9D8C1] text-[#3F6B3F]"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-sm font-medium text-[#1F3D2B]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={increaseQuantity}
                      className="flex h-6 w-6 items-center justify-center rounded-full border border-[#C9D8C1] text-[#3F6B3F]"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="inline-flex items-center justify-center rounded-full border border-[#3F6B3F] bg-[#3F6B3F] px-5 py-2 text-xs font-semibold tracking-wide text-white shadow-sm transition-colors hover:bg-[#2E5330]"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
