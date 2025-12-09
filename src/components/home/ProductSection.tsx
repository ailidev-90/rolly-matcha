import Image from "next/image";
import Link from "next/link";
import type { Product } from "@rolly_ecommerce/rolly-api-client";
import { formatPrice, getProductSlug } from "../../app/homeUtils";

type ProductSectionProps = {
  loading: boolean;
  error: string | null;
  products: Product[];
  hasVisibleProducts: boolean;
  currency?: string;
  currentPage: number;
  totalPages: number;
  addingProductId: string | null;
  onAddToCart: (product: Product) => void;
  onChangePage: (page: number) => void;
};

export function ProductSection({
  loading,
  error,
  products,
  hasVisibleProducts,
  currency,
  currentPage,
  totalPages,
  addingProductId,
  onAddToCart,
  onChangePage,
}: ProductSectionProps) {
  if (loading) {
    return (
      <p className="mt-6 text-sm text-[#4A6B4A]">
        Loading products...
      </p>
    );
  }

  if (error) {
    return (
      <p className="mt-6 text-sm text-red-600">
        {error}
      </p>
    );
  }

  if (!hasVisibleProducts) {
    return (
      <p className="mt-6 text-sm text-[#4A6B4A]">
        Tidak ada produk yang cocok dengan filter / pencarian.
      </p>
    );
  }

  return (
    <>
      <main className="mt-2 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => {
          const slug = getProductSlug(product);

          return (
            <article
              key={product.id}
              className="flex flex-col rounded-3xl bg-white p-4 shadow-md ring-1 ring-[#E1E9DA]"
            >
              <Link
                href={`/products/${encodeURIComponent(slug)}`}
                className="block"
              >
                <div className="relative mb-4 overflow-hidden rounded-2xl bg-[#F6FAF2] px-3 pb-3 pt-4">
                  <div className="absolute right-3 top-3 z-10 rounded-full bg-[#E2F4D7] px-3 py-1 text-xs font-medium text-[#3F6B3F]">
                    Available
                  </div>
                  <div className="relative mx-auto h-40 w-full">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <h2 className="text-sm font-medium text-[#1F3D2B]">
                    {product.name}
                  </h2>
                  <p className="mt-1 text-xs text-[#6A826A]">
                    {product.category_name}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#3F6B3F]">
                    {currency}{product.price}
                  </p>
                </div>
              </Link>

              <button
                type="button"
                onClick={() => onAddToCart(product)}
                disabled={addingProductId === product.id}
                className="mt-4 inline-flex items-center justify-center rounded-full border border-[#3F6B3F] px-4 py-2 text-xs font-semibold tracking-wide text-[#3F6B3F] transition-colors hover:bg-[#3F6B3F] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {addingProductId === product.id ? "Adding..." : "ADD TO CART"}
              </button>
            </article>
          );
        })}
      </main>

      <div className="mt-6 flex items-center justify-end gap-3 text-xs text-[#6A826A]">
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          type="button"
          onClick={() => onChangePage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-[#C9D8C1] bg-white disabled:opacity-40"
          aria-label="Previous page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-3 w-3"
            aria-hidden="true"
          >
            <path
              d="M15 6 9 12l6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => onChangePage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-[#C9D8C1] bg-white disabled:opacity-40"
          aria-label="Next page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-3 w-3"
            aria-hidden="true"
          >
            <path
              d="m9 6 6 6-6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
