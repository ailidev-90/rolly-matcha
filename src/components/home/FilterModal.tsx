import { formatPrice } from "../../app/homeUtils";
import type { StatusFilter } from "../../app/homeTypes";

type FilterModalProps = {
  open: boolean;
  onClose: () => void;
  categoryOptions: string[];
  categoryFilter: string;
  statusFilter: StatusFilter;
  onSaleOnly: boolean;
  minPriceFilter: number | null;
  priceBounds: { min: number; max: number };
  currency?: string;
  onChangeCategory: (value: string) => void;
  onChangeStatus: (value: StatusFilter) => void;
  onToggleOnSale: () => void;
  onChangeMinPrice: (value: number | null) => void;
  onReset: () => void;
};

export function FilterModal({
  open,
  onClose,
  categoryOptions,
  categoryFilter,
  statusFilter,
  onSaleOnly,
  minPriceFilter,
  priceBounds,
  currency,
  onChangeCategory,
  onChangeStatus,
  onToggleOnSale,
  onChangeMinPrice,
  onReset,
}: FilterModalProps) {
  if (!open) return null;

  const min = priceBounds.min;
  const max = priceBounds.max || priceBounds.min || 0;
  const sliderValue = minPriceFilter ?? min ?? 0;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-[#EEF3EA] px-6 py-4">
          <h2 className="text-base font-semibold text-[#1F3D2B]">
            Filter Products
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#6A826A] hover:bg-[#F2F5EF]"
            aria-label="Close filters"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[70vh] space-y-6 overflow-y-auto px-6 py-4 text-sm text-[#4A6B4A]">
          <div>
            <p className="text-xs font-semibold text-[#1F3D2B]">
              Category
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <FilterPill
                active={categoryFilter === "all"}
                label="All"
                onClick={() => onChangeCategory("all")}
              />
              {categoryOptions.map((category) => (
                <FilterPill
                  key={category}
                  active={categoryFilter === category}
                  label={category}
                  onClick={() => onChangeCategory(category)}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-[#1F3D2B]">
              Status
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <FilterPill
                active={statusFilter === "all"}
                label="All"
                onClick={() => onChangeStatus("all")}
              />
              <FilterPill
                active={statusFilter === "available"}
                label="Available"
                onClick={() => onChangeStatus("available")}
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-[#1F3D2B]">
              Special Offers
            </p>
            <button
              type="button"
              onClick={onToggleOnSale}
              className="mt-3 flex w-full items-center justify-between rounded-2xl border border-[#C9D8C1] bg-[#F7FAF5] px-4 py-3 text-xs"
            >
              <span className="inline-flex items-center gap-2 text-[#4A6B4A]">
                <span className="text-base">🏷️</span>
                On Sale
              </span>
              <span
                className={`flex h-5 w-9 items-center rounded-full ${
                  onSaleOnly ? "bg-[#3F6B3F]" : "bg-[#D6E1D1]"
                }`}
              >
                <span
                  className={`h-4 w-4 rounded-full bg-white shadow transition-transform ${
                    onSaleOnly ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </span>
            </button>
          </div>

          <div>
            <p className="text-xs font-semibold text-[#1F3D2B]">
              Price Range
            </p>
            <div className="mt-2 flex items-center justify-between text-[11px] text-[#6A826A]">
              <span>{formatPrice(priceBounds.min, currency)}</span>
              <span>{formatPrice(priceBounds.max, currency)}</span>
            </div>
            <div className="mt-3">
              <input
                type="range"
                min={min}
                max={max}
                value={sliderValue}
                onChange={(event) => onChangeMinPrice(Number(event.target.value))}
                className="w-full accent-[#3F6B3F]"
              />
              <p className="mt-1 text-center text-[11px] text-[#6A826A]">
                Range: {formatPrice(sliderValue, currency)} -{" "}
                {formatPrice(priceBounds.max, currency)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[#EEF3EA] px-6 py-4">
          <button
            type="button"
            onClick={onReset}
            className="flex-1 rounded-full border border-[#C9D8C1] bg-white px-4 py-2 text-sm font-medium text-[#3F6B3F]"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full bg-[#3F6B3F] px-4 py-2 text-sm font-semibold text-white shadow-md"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

type FilterPillProps = {
  active: boolean;
  label: string;
  onClick: () => void;
};

function FilterPill({ active, label, onClick }: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs ${
        active
          ? "border-[#3F6B3F] bg-[#EAF3E4] text-[#3F6B3F]"
          : "border-[#C9D8C1] bg-white text-[#4A6B4A]"
      }`}
    >
      {label}
    </button>
  );
}

