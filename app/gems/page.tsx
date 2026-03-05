"use client";

import { Suspense, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GemInfoModal } from "@/components/customize/gem-info-modal";
import {
  gemPowerData,
  gemTypeDisplayData,
  type GemPowerCategory,
  type GemType,
} from "@/lib/gem-data";
import { gemPowerOrderByCategory } from "@/lib/customizer-data";

const powerTabs: { id: GemPowerCategory; label: string; symbol: string }[] = [
  { id: "love", label: "Love", symbol: "♡" },
  { id: "luck", label: "Luck & Wealth", symbol: "✦" },
  { id: "wisdom", label: "Wisdom & Success", symbol: "★" },
  { id: "balance", label: "Balance", symbol: "◎" },
  { id: "protection", label: "Protection", symbol: "◈" },
];

function getGemsByPower(category: GemPowerCategory): GemType[] {
  const ordered = gemPowerOrderByCategory[category] ?? [];
  return ordered.filter((type) => !!gemPowerData[type] && !!gemTypeDisplayData[type]);
}

function GemsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryGem = searchParams.get("gem") as GemType | null;

  const initialPower = useMemo<GemPowerCategory>(() => {
    if (queryGem && gemPowerData[queryGem]) return gemPowerData[queryGem]!.powerCategory;
    return "love";
  }, [queryGem]);

  const [activePower, setActivePower] = useState<GemPowerCategory>(initialPower);
  const [modalGem, setModalGem] = useState<GemType | null>(null);
  const activeGems = getGemsByPower(activePower);
  const selectedDisplay = queryGem ? gemTypeDisplayData[queryGem] : null;
  const modalPower = modalGem ? gemPowerData[modalGem] : null;
  const modalDisplay = modalGem ? gemTypeDisplayData[modalGem] : null;

  const renderGemCard = (gemType: GemType) => {
    const power = gemPowerData[gemType];
    const display = gemTypeDisplayData[gemType];
    if (!power || !display) return null;

    return (
      <button
        key={gemType}
        type="button"
        onClick={() => setModalGem(gemType)}
        className="group flex w-[calc((100%-1.25rem)/2)] min-w-0 flex-col md:w-[205px]"
      >
        <div className="relative aspect-square overflow-hidden border border-[#EBEBEB] bg-white">
          <Image
            src={power.unsplashUrl}
            alt={display.nameEn}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 205px"
          />
        </div>
        <div className="mt-3 px-0.5">
          <p className="text-[15px] font-light text-[#2A2A2A]">{display.nameEn}</p>
          <p className="mt-0.5 text-[12px] font-light text-[#9A9A9A]">{display.nameTh}</p>
          <p className="mt-1 text-[12px] font-light italic leading-snug text-[#C4956A]">
            {power.powerTagline}
          </p>
        </div>
      </button>
    );
  };

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {modalGem && modalPower && (
        <GemInfoModal
          gemType={modalGem}
          power={modalPower}
          display={modalDisplay ?? undefined}
          onClose={() => setModalGem(null)}
          onSelect={() => {
            setModalGem(null);
            router.push(`/customize?gem=${modalGem}`);
          }}
          selectLabel="Design a Gem →"
          showBackButton={false}
        />
      )}

      <Navbar />

      <section className="mx-auto max-w-[1100px] px-6 pb-16 pt-[110px] md:pb-24">
        <div className="border-b border-[#EBEBEB] pb-10 text-center">
          <p className="text-[11px] font-light tracking-[0.2em] uppercase text-[#9A9A9A]">
            PRADAP PRADA
          </p>
          <h1 className="mt-3 font-serif text-4xl italic text-[#2A2A2A] md:text-5xl">
            Gem Collection
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[14px] font-light leading-relaxed text-[#9A9A9A]">
            Each gemstone carries its own energy. Choose the one that aligns with what you seek.
          </p>

          {selectedDisplay && (
            <div className="mx-auto mt-5 inline-flex items-center rounded-full border border-[#E7D4BF] bg-[#F7F1EA] px-4 py-2 text-[12px] font-light text-[#8A6C50]">
              Quiz match: {selectedDisplay.nameEn}
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {powerTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActivePower(tab.id)}
              className={`rounded-full px-5 py-2 text-[14px] font-light transition-all ${
                activePower === tab.id
                  ? "bg-[#EDE8E1] text-[#2A2A2A]"
                  : "text-[#9A9A9A] hover:text-[#2A2A2A]"
              }`}
            >
              {tab.label} {tab.symbol}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {activePower === "love" && activeGems.length === 5 ? (
            <div className="flex flex-col items-center gap-5">
              <div className="flex flex-wrap justify-center gap-5 md:flex-nowrap">
                {activeGems.slice(0, 3).map(renderGemCard)}
              </div>
              <div className="flex flex-wrap justify-center gap-5 md:flex-nowrap">
                {activeGems.slice(3).map(renderGemCard)}
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-5">{activeGems.map(renderGemCard)}</div>
          )}
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/customize"
            className="inline-flex h-12 items-center rounded-full bg-[#2A2A2A] px-8 text-[13px] font-light tracking-[0.1em] text-white transition-all hover:bg-[#3A3A3A]"
          >
            Design Your Piece
          </Link>
          <Link
            href="/quiz"
            className="inline-flex h-12 items-center rounded-full border border-[#2A2A2A] px-8 text-[13px] font-light tracking-[0.1em] text-[#2A2A2A] transition-all hover:bg-[#2A2A2A] hover:text-white"
          >
            Find Your Gem
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function GemsPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#FAFAF8]" />}>
      <GemsPageContent />
    </Suspense>
  );
}
