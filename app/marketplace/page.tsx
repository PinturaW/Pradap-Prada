"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Gem, SlidersHorizontal, ArrowLeft, Search } from "lucide-react";
import {
  gems,
  allowedGemTypes,
  type GemType,
  type GemShape,
  type PriceRange,
} from "@/lib/gem-data";
import { FilterSidebar } from "@/components/marketplace/filter-sidebar";
import { GemCard } from "@/components/marketplace/gem-card";
import { GemDetailModal } from "@/components/marketplace/gem-detail-modal";
import type { Gem as GemItem } from "@/lib/gem-data";
import { gemPlaceholderByType, USE_MOCK_IMAGES } from "@/lib/placeholder-images";

interface Filters {
  types: GemType[];
  shapes: GemShape[];
  priceRange: PriceRange;
  energyQuery: string;
}

function matchesPriceRange(price: number, range: PriceRange): boolean {
  switch (range) {
    case "all":
      return true;
    case "under1k":
      return price < 1000;
    case "1k-3k":
      return price >= 1000 && price <= 3000;
    case "3k-5k":
      return price > 3000 && price <= 5000;
    case "over5k":
      return price > 5000;
    default:
      return true;
  }
}

export default function MarketplacePage() {
  const allowedTypeSet = useMemo(() => new Set<GemType>(allowedGemTypes), []);

  const [filters, setFilters] = useState<Filters>({
    types: [],
    shapes: [],
    priceRange: "all",
    energyQuery: "",
  });
  const [search, setSearch] = useState("");
  const [selectedGem, setSelectedGem] = useState<GemItem | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredGems = useMemo(() => {
    return gems.filter((gem) => {
      if (!allowedTypeSet.has(gem.type)) return false;
      if (gem.status === "sold" || gem.status === "reserved") return false;
      if (filters.types.length > 0 && !filters.types.includes(gem.type))
        return false;
      if (filters.shapes.length > 0 && !filters.shapes.includes(gem.shape))
        return false;
      if (!matchesPriceRange(gem.price, filters.priceRange)) return false;
      if (filters.energyQuery.trim()) {
        const q = filters.energyQuery.toLowerCase();
        const spiritual =
          `${gem.spiritualTh} ${gem.spiritualEn}`.toLowerCase();
        if (!spiritual.includes(q)) return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          gem.nameEn.toLowerCase().includes(q) ||
          gem.nameTh.includes(q) ||
          gem.originTh.includes(q) ||
          gem.code.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allowedTypeSet, filters, search]);

  const previewGems = useMemo(() => {
    return gems
      .filter(
        (gem) =>
          allowedTypeSet.has(gem.type) &&
          gem.status !== "sold" &&
          gem.status !== "reserved"
      )
      .slice(0, 8);
  }, [allowedTypeSet]);

  const handleSelectGem = (gem: GemItem) => {
    setSelectedGem(gem);
    setDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav */}
      <nav className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">กลับหน้าหลัก</span>
            </Link>
            <div className="hidden h-5 w-px bg-border sm:block" />
            <div className="flex items-center gap-2">
              <Gem className="h-5 w-5 text-primary" />
              <span className="font-serif text-lg font-bold text-foreground">
                ตลาดพลอย
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="relative hidden w-72 md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="ค้นหาพลอย... (เช่น P001, ทับทิม)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border bg-background py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Mobile filter trigger */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            ตัวกรอง
          </button>
        </div>
      </nav>

      {/* Page header with hero image */}
      <header className="relative border-b border-border overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-stone-50" />
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: "url('/images/placeholders/premium-white.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-white/70" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24 text-center">
          <p className="mb-3 text-lg font-semibold uppercase tracking-[0.3em] text-muted-foreground md:text-2xl">
            CRYSTAL & GEMSTONE COLLECTION
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            คัดสรรพลอยแท้เพื่อการออกแบบเฉพาะคุณ
          </p>
          {/* Mobile search */}
          <div className="relative mx-auto mt-6 max-w-sm md:hidden">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="ค้นหาพลอย... (เช่น P001)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </header>



      {/* Main content */}
      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-10">
        <FilterSidebar
          filters={filters}
          onFiltersChange={setFilters}
          resultCount={filteredGems.length}
          mobileOpen={mobileFiltersOpen}
          onMobileClose={() => setMobileFiltersOpen(false)}
        />

        {/* Grid */}
        <div className="flex-1">
          {filteredGems.length > 0 ? (
            <div className="grid gap-5 grid-cols-2 lg:grid-cols-3">
              {filteredGems.map((gem) => (
                <GemCard
                  key={gem.id}
                  gem={gem}
                  onSelect={handleSelectGem}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <Gem className="h-16 w-16 text-border" />
              <h3 className="font-serif text-xl font-semibold text-foreground">
                ไม่พบพลอยที่ตรงกับเงื่อนไข
              </h3>
              <p className="max-w-sm text-sm text-muted-foreground">
                ลองปรับตัวกรองหรือล้างเงื่อนไขทั้งหมดเพื่อดูพลอยทั้งหมด
              </p>
              <button
                onClick={() =>
                  setFilters({
                    types: [],
                    shapes: [],
                    priceRange: "all",
                    energyQuery: "",
                  })
                }
                className="mt-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                ล้างตัวกรองทั้งหมด
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Detail modal */}
      <GemDetailModal
        gem={selectedGem}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </div>
  );
}
