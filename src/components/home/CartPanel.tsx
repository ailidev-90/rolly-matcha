import Image from "next/image";
import Link from "next/link";
import type { CartItem } from "../../context/CartContext";
import { formatPrice } from "../../app/homeUtils";

type CartPanelProps = {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  currency?: string;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onClose?: () => void;
};

export function CartPanel({
  items,
  totalQuantity,
  totalPrice,
  currency,
  onUpdateQuantity,
  onClose,
}: CartPanelProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Cart Panel */}
      <aside className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto bg-white shadow-2xl sm:w-96">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-[#1F3D2B]">
              Shopping Cart
            </h2>
            <p className="text-sm text-[#6A826A]">
              {totalQuantity} item{totalQuantity === 1 ? "" : "s"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close cart"
          >
            <svg
              className="h-5 w-5 text-gray-500"
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

        {/* Cart Content */}
        <div className="px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                <svg
                  className="h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-600">
                Your cart is empty
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Add items to get started
              </p>
            </div>
          ) : (
            <>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-4 rounded-lg border border-gray-100 p-3 transition-shadow hover:shadow-md"
                  >
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-[#F6FAF2]">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <h3 className="text-sm font-medium text-[#1F3D2B] line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-[#3F6B3F]">
                        {formatPrice(item.price, currency)}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              item.quantity > 1
                                ? onUpdateQuantity(item.id, item.quantity - 1)
                                : onUpdateQuantity(item.id, 0)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-[#C9D8C1] text-[#3F6B3F] transition-colors hover:bg-[#F6FAF2]"
                          >
                            {item.quantity > 1 ? (
                              <span className="text-lg">−</span>
                            ) : (
                              <svg
                                className="h-4 w-4"
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
                            )}
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-[#1F3D2B]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(
                                item.id,
                                Math.min(99, item.quantity + 1)
                              )
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-[#C9D8C1] text-[#3F6B3F] transition-colors hover:bg-[#F6FAF2]"
                          >
                            <span className="text-lg">+</span>
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-[#3F6B3F]">
                          {formatPrice(item.price * item.quantity, currency)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Summary */}
              <div className="mt-6 space-y-3 border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-[#1F3D2B]">
                    {formatPrice(totalPrice, currency)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-base font-semibold">
                  <span className="text-[#1F3D2B]">Total</span>
                  <span className="text-[#3F6B3F]">
                    {formatPrice(totalPrice, currency)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="mt-6">
                <Link
                  href="/cart"
                  className="block w-full rounded-full bg-[#4CAF50] px-6 py-4 text-center text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#388E3C] hover:shadow-xl"
                >
                  View Full Cart
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 w-full rounded-full border-2 border-[#4CAF50] px-6 py-3 text-base font-semibold text-[#4CAF50] transition-all duration-300 hover:bg-[#F6FAF2]"
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}

