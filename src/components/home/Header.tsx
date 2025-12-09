import Image from "next/image";
import type { SortOption } from "../../app/homeTypes";

type HeaderProps = {
  businessName?: string;
  businessImage?: string | null;
  businessDescription?: string | null;
  totalQuantity: number;
  searchQuery: string;
  searchOpen: boolean;
  sortBy: SortOption;
  onToggleSearch: () => void;
  onToggleCart: () => void;
  onChangeSearch: (value: string) => void;
  onChangeSort: (value: SortOption) => void;
  onOpenFilter: () => void;
};

export function Header({
  businessName,
  businessImage,
  businessDescription,
  totalQuantity,
  searchQuery,
  searchOpen,
  sortBy,
  onToggleSearch,
  onToggleCart,
  onChangeSearch,
  onChangeSort,
  onOpenFilter,
}: HeaderProps) {
  return (
    <header className="flex flex-col gap-4">
      <div className="flex flex-col items-center justify-between gap-4 rounded-3xl bg-[#EAF3E4] px-5 py-5 shadow-sm sm:flex-row sm:px-8">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-white shadow-sm sm:h-20 sm:w-20">
            {businessImage ? (
              <Image
                src={businessImage}
                alt={businessName ?? "Store logo"}
                fill
                className="object-contain"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-[#3F6B3F]">
                {businessName?.[0] ?? "M"}
              </div>
            )}
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-semibold sm:text-2xl">
              {businessName ?? "Mamamatcha"}
            </h1>
            <p className="max-w-xl text-sm text-[#4A6B4A]">
              {businessDescription ??
                "Elevate your tea game with our delicious matcha variations."}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[#3F6B3F]">
          <button
            type="button"
            onClick={onToggleSearch}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
          >
            <span className="sr-only">Search</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <circle cx="11" cy="11" r="6" />
              <line x1="16" y1="16" x2="21" y2="21" />
            </svg>
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={onToggleCart}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
            >
              <span className="sr-only">Cart</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path d="M6 6h15l-1.5 9h-12z" />
                <circle cx="9" cy="19" r="1" />
                <circle cx="17" cy="19" r="1" />
                <path d="M6 6 5 3H3" />
              </svg>
            </button>
            {totalQuantity > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#3F6B3F] px-1 text-[10px] font-semibold text-white">
                {totalQuantity}
              </span>
            )}
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="mt-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => onChangeSearch(event.target.value)}
            placeholder="Cari menu matcha..."
            className="w-full rounded-full border border-[#C9D8C1] bg-white px-4 py-2 text-sm text-[#1F3D2B] outline-none focus:ring-2 focus:ring-[#3F6B3F]"
          />
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onOpenFilter}
          className="inline-flex items-center gap-2 rounded-full border border-[#C9D8C1] bg-white px-4 py-2 text-sm font-medium text-[#3F6B3F] shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4"
          >
            <path d="M4 6h16" />
            <path d="M7 12h10" />
            <path d="M10 18h4" />
          </svg>
          Filter
        </button>
        <div className="inline-flex items-center gap-2 rounded-full border border-[#C9D8C1] bg-white px-3 py-1.5 text-sm font-medium text-[#3F6B3F] shadow-sm">
          <span className="hidden text-xs sm:inline">Sort by</span>
          <select
            value={sortBy}
            onChange={(event) =>
              onChangeSort(event.target.value as SortOption)
            }
            className="bg-transparent text-xs outline-none"
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name A–Z</option>
            <option value="name-desc">Name Z–A</option>
          </select>
        </div>
      </div>
    </header>
  );
}

