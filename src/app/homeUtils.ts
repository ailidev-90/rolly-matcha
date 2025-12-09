import type { Product } from "@rolly_ecommerce/rolly-api-client";

export function formatPrice(price: number, currency?: string): string {
  // Use $ for USD, otherwise use Rp (for IDR and default)
  const currencySymbol = currency === "USD" ? "$" : "Rp";
  // Format with Indonesian locale for proper thousand separators
  const formattedNumber = price.toLocaleString('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  return `${currencySymbol}${formattedNumber}`;
}

export function getProductSlug(product: Product): string {
  const anyProduct = product as any;
  if (typeof anyProduct.path === "string" && anyProduct.path.length > 0) {
    return anyProduct.path;
  }

  return product.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

