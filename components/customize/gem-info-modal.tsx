import Image from "next/image";
import { X } from "lucide-react";
import {
  gemLongMeaningData,
  gemPowerCategoryLabels,
  type GemPowerInfo,
  type GemType,
} from "@/lib/gem-data";

interface GemInfoModalProps {
  gemType: GemType;
  power: GemPowerInfo;
  display?: { nameEn: string; nameTh: string };
  onClose: () => void;
  onSelect: () => void;
  selectLabel?: string;
  showBackButton?: boolean;
}

export function GemInfoModal({
  gemType,
  power,
  display,
  onClose,
  onSelect,
  selectLabel = "Select This Gem →",
  showBackButton = false,
}: GemInfoModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex w-[78%] max-h-[88vh] max-w-[22rem] flex-col overflow-hidden bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center bg-white/80 transition-colors hover:bg-white"
          aria-label="Close gem details"
        >
          <X className="h-4 w-4 text-[#9A9A9A]" />
        </button>

        <div className="relative h-[240px] overflow-hidden bg-[#FAFAF8] sm:h-[260px]">
          <Image src={power.unsplashUrl} alt={display?.nameEn ?? gemType} fill className="object-cover" />
          <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-light tracking-[0.08em] text-[#9A9A9A] uppercase">
            {gemPowerCategoryLabels[power.powerCategory]}
          </div>
        </div>

        <div className="flex flex-1 flex-col [padding:18px_22px] sm:[padding:20px_24px]">
          <p className="text-[22px] font-light text-[#2A2A2A]">{display?.nameEn ?? gemType}</p>
          {display?.nameTh && (
            <p className="mt-0.5 text-[13px] font-light text-[#9A9A9A]">{display.nameTh}</p>
          )}
          <p className="mt-3 text-[14px] font-light italic" style={{ color: "#C4956A" }}>
            {power.powerTagline}
          </p>
          <p className="mt-2 line-clamp-6 text-[13px] font-light leading-relaxed text-[#9A9A9A] sm:line-clamp-none">
            {gemLongMeaningData[gemType] ?? power.meaningTh}
          </p>

          <div className="mt-5 flex gap-3 sm:mt-6">
            {showBackButton && (
              <button
                onClick={onClose}
                className="flex-1 rounded-full border border-[#EBEBEB] py-3 text-[13px] font-light text-[#9A9A9A] transition-all hover:border-[#2A2A2A] hover:text-[#2A2A2A]"
              >
                Back
              </button>
            )}
            <button
              onClick={onSelect}
              className={`${showBackButton ? "flex-1" : "w-full"} rounded-full bg-[#2A2A2A] py-3 text-[13px] font-light tracking-[0.08em] text-white transition-all hover:bg-[#3A3A3A]`}
            >
              {selectLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
