"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  type GemType,
  type GemShape,
  type PriceRange,
  gemTypeLabels,
  gemShapeLabels,
  priceRangeLabels,
} from "@/lib/gem-data";
import { SlidersHorizontal, X } from "lucide-react";

interface Filters {
  types: GemType[];
  shapes: GemShape[];
  priceRange: PriceRange;
  energyQuery: string;
}

interface FilterSidebarProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  resultCount: number;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

function toggleItem<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="mb-4 text-base font-semibold uppercase tracking-[0.18em] text-foreground/70">
        {title}
      </h4>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

function FilterCheckbox({
  id,
  label,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: () => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-3 text-base text-foreground transition-colors duration-200 hover:text-primary"
    >
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="rounded-[4px] border-border data-[state=checked]:border-primary data-[state=checked]:bg-primary"
      />
      <span>{label}</span>
    </label>
  );
}

export function FilterSidebar({
  filters,
  onFiltersChange,
  resultCount,
  mobileOpen,
  onMobileClose,
}: FilterSidebarProps) {
  const hasFilters =
    filters.types.length > 0 ||
    filters.shapes.length > 0 ||
    filters.priceRange !== "all";

  const clearAll = () =>
    onFiltersChange({ types: [], shapes: [], priceRange: "all", energyQuery: "" });

  const content = (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          <h3 className="font-serif text-2xl font-semibold text-foreground">
            ตัวกรอง
          </h3>
        </div>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-sm font-medium text-primary transition-colors hover:text-primary/70"
          >
            ล้างทั้งหมด
          </button>
        )}
      </div>

      {/* Price Range - Radio */}
      <FilterGroup title="ราคา (Price Range)">
        {(Object.keys(priceRangeLabels) as PriceRange[]).map((range) => (
          <label
            key={range}
            className="flex cursor-pointer items-center gap-3 text-base text-foreground transition-colors duration-200 hover:text-primary"
          >
            <div
              className={`flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors ${
                filters.priceRange === range
                  ? "border-primary"
                  : "border-border"
              }`}
            >
              {filters.priceRange === range && (
                <div className="h-2 w-2 rounded-full bg-primary" />
              )}
            </div>
            <span>{priceRangeLabels[range]}</span>
          </label>
        ))}
      </FilterGroup>

      {/* Energy Search */}
      <FilterGroup title="พลังงานของหิน (ค้นหา)">
        <input
          type="text"
          value={filters.energyQuery}
          onChange={(e) =>
            onFiltersChange({ ...filters, energyQuery: e.target.value })
          }
          placeholder="เช่น มั่นใจ / ปกป้อง / สงบ"
          className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </FilterGroup>

      {/* Gem Type */}
      <FilterGroup title="ประเภทพลอย">
        {Object.entries(gemTypeLabels).map(([rawType, label]) => {
          if (!label) return null;
          const type = rawType as GemType;

          return (
          <FilterCheckbox
            key={type}
            id={`type-${type}`}
            label={label}
            checked={filters.types.includes(type)}
            onCheckedChange={() =>
              onFiltersChange({
                ...filters,
                types: toggleItem(filters.types, type),
              })
            }
          />
          );
        })}
      </FilterGroup>

      {/* Shape */}
      <FilterGroup title="รูปทรง (Shape)">
        {(Object.keys(gemShapeLabels) as GemShape[]).map((shape) => (
          <FilterCheckbox
            key={shape}
            id={`shape-${shape}`}
            label={gemShapeLabels[shape]}
            checked={filters.shapes.includes(shape)}
            onCheckedChange={() =>
              onFiltersChange({
                ...filters,
                shapes: toggleItem(filters.shapes, shape),
              })
            }
          />
        ))}
      </FilterGroup>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-[280px] shrink-0 lg:block">
        <div className="sticky top-28 rounded-2xl bg-card p-10">
          {content}
          <p className="mt-8 text-base text-muted-foreground">
            พบ{" "}
            <span className="font-semibold text-foreground">{resultCount}</span>{" "}
            รายการ
          </p>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] animate-fade-in overflow-y-auto rounded-t-3xl bg-background p-8">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-serif text-2xl font-semibold text-foreground">
                ตัวกรอง
              </h3>
              <button
                onClick={onMobileClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground"
                aria-label="ปิดตัวกรอง"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {content}
            <button
              onClick={onMobileClose}
              className="mt-8 flex h-14 w-full items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground"
            >
              ดูผลลัพธ์ ({resultCount})
            </button>
          </div>
        </div>
      )}
    </>
  );
}
