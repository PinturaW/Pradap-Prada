"use client";

import Image from "next/image";
import { gemPowerData, gemTypeDisplayData, type GemPowerCategory, type GemType } from "@/lib/gem-data";
import { gemBasePrices, gemPowerOrderByCategory } from "@/lib/customizer-data";

const categoryLabels: Record<GemPowerCategory, string> = {
  love: "Love",
  luck: "Luck",
  wisdom: "Wisdom",
  balance: "Balance",
  protection: "Protection",
};

interface GemstoneSelectorProps {
  selectedGemType: GemType | null;
  onChange: (gemType: GemType | null) => void;
  onPreview?: (gemType: GemType) => void;
}

export function GemstoneSelector({ selectedGemType, onChange, onPreview }: GemstoneSelectorProps) {
  const categories = Object.entries(gemPowerOrderByCategory) as [GemPowerCategory, GemType[]][];

  return (
    <div className="space-y-8">
      {categories.map(([category, gemTypes]) => (
        <section key={category}>
          <p className="text-[12px] font-light tracking-[0.14em] uppercase text-[#9A9A9A]">
            {categoryLabels[category]}
          </p>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {gemTypes.map((gemType) => {
              const power = gemPowerData[gemType];
              const display = gemTypeDisplayData[gemType];
              if (!power || !display) return null;

              const isSelected = selectedGemType === gemType;
              const addonPrice = gemBasePrices[gemType] ?? 0;
              return (
                <div
                  key={gemType}
                  className={`block cursor-pointer border bg-white transition-all ${
                    isSelected
                      ? "border-[#C4956A] ring-1 ring-[#C4956A]/35"
                      : "border-[#EBEBEB] hover:border-[#C4956A]/60"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => (onPreview ? onPreview(gemType) : onChange(isSelected ? null : gemType))}
                    className="relative block aspect-square w-full overflow-hidden bg-[#FAFAF8]"
                  >
                    <Image src={power.unsplashUrl} alt={display.nameEn} fill className="object-cover" />
                  </button>
                  <div className="space-y-1 px-2.5 py-2.5">
                    <p className="line-clamp-2 min-h-[1.85rem] text-[11px] font-light leading-snug text-[#2A2A2A]">
                      {display.nameEn}
                    </p>
                    <p className="line-clamp-2 min-h-[1.65rem] text-[9px] font-light italic leading-snug text-[#9A9A9A]">
                      {power.powerTagline}
                    </p>
                    <p className="text-[9px] font-light leading-none text-[#C4956A]">+ ฿{addonPrice.toLocaleString()}</p>
                    <button
                      type="button"
                      onClick={() => onChange(isSelected ? null : gemType)}
                      className={`mt-1.5 w-full rounded-full border py-1 text-[9px] font-light tracking-[0.08em] transition-all ${
                        isSelected
                          ? "border-[#C4956A] bg-[#F8F2ED] text-[#2A2A2A]"
                          : "border-[#EBEBEB] text-[#9A9A9A] hover:border-[#2A2A2A] hover:text-[#2A2A2A]"
                      }`}
                    >
                      {isSelected ? "REMOVE" : "SELECT GEM"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
