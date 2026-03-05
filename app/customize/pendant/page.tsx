"use client";

import { Suspense, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  pendantGems,
  bailStyles,
  pendantCutShapes,
  categoryAdjustments,
  gemBasePrices,
  type PendantGem,
  type BailStyle,
  type CutShape,
} from "@/lib/customizer-data";
import { gemPowerData, gemTypeDisplayData } from "@/lib/gem-data";
import { Navbar } from "@/components/navbar";
import { ShapePreview } from "@/components/customize/shape-preview";
import { GemInfoModal } from "@/components/customize/gem-info-modal";

function CheckBadge() {
  return (
    <div
      className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full"
      style={{ background: "#C4956A" }}
    >
      <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3">
        <path d="M2 6 L5 9 L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function StepBar({ step }: { step: number }) {
  const steps = ["Gemstone", "Bail & Shape", "Summary"];
  return (
    <div className="border-b border-[#EBEBEB]">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-2 px-6 py-3 md:flex-nowrap md:gap-4">
        {steps.map((label, i) => (
          <div key={label} className="flex items-center">
            <div
              className={`flex items-center gap-2.5 rounded-full px-3 py-1.5 text-[12px] tracking-[0.08em] transition-all ${
                step === i + 1
                  ? "bg-[#F8F2ED] text-[#2A2A2A] ring-1 ring-[#C4956A]/30"
                  : step > i + 1
                    ? "text-[#2A2A2A]"
                    : "text-[#9A9A9A]"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                  step > i + 1
                    ? "text-white"
                    : step === i + 1
                      ? "border border-[#C4956A] text-[#C4956A]"
                      : "border border-[#D7D7D7] text-[#B0B0B0]"
                }`}
                style={step > i + 1 ? { background: "#C4956A" } : undefined}
              >
                {step > i + 1 ? "✓" : `0${i + 1}`}
              </span>
              {label}
            </div>
            {i < steps.length - 1 && <div className="mx-2 h-px w-6 bg-[#EBEBEB] md:w-8" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function PendantCustomizerContent() {
  const searchParams = useSearchParams();
  const preselectedGemType = searchParams.get("gem");
  const initialGem = useMemo(() => {
    if (!preselectedGemType) return null;
    return pendantGems.find((gem) => gem.gemType === preselectedGemType) ?? null;
  }, [preselectedGemType]);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedGem, setSelectedGem] = useState<PendantGem | null>(initialGem);
  const [selectedBail, setSelectedBail] = useState<BailStyle | null>(null);
  const [selectedCut, setSelectedCut] = useState<CutShape | null>(null);
  const [modalGem, setModalGem] = useState<PendantGem | null>(null);

  const canProceedStep2 = selectedBail !== null && selectedCut !== null;
  const modalPower = modalGem ? gemPowerData[modalGem.gemType] : null;
  const modalDisplay = modalGem ? gemTypeDisplayData[modalGem.gemType] : null;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {modalGem && modalPower && (
        <GemInfoModal
          gemType={modalGem.gemType}
          power={modalPower}
          display={modalDisplay ?? undefined}
          onClose={() => setModalGem(null)}
          onSelect={() => {
            setSelectedGem(modalGem);
            setModalGem(null);
            setStep(2);
          }}
        />
      )}

      {/* Hero */}
      <div className="relative h-[260px] mt-[65px] overflow-hidden bg-[#FAFAF8]">
        <Image
          src="https://images.unsplash.com/photo-1583937443538-4755e5deab79?w=1200&h=400&fit=crop"
          alt="Pendant"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="text-[11px] font-light tracking-[0.2em] uppercase text-white/60">
            CUSTOM JEWELLERY
          </p>
          <p className="mt-2 font-serif text-3xl italic text-white md:text-4xl">
            Pendant
          </p>
          <p className="mt-2 text-[13px] font-light italic text-white/70">
            Choose your gem · Bail style · Cut shape
          </p>
        </div>
      </div>

      <StepBar step={step} />

      <div key={step} className="animate-fade-in mx-auto max-w-[1100px] px-6 py-16">

        {/* ── STEP 1: GEMSTONE ── */}
        {step === 1 && (
          <div>
            <p className="text-[11px] font-light tracking-[0.2em] uppercase text-[#9A9A9A]">
              STEP 01
            </p>
            <p className="mt-2 text-[22px] font-light text-[#2A2A2A]">Choose Your Gemstone</p>
            <p className="mt-1 text-[13px] font-light text-[#9A9A9A]">
              The gem is the heart of your pendant.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-6">
              {pendantGems.map((gem) => {
                const power = gemPowerData[gem.gemType];
                const isSelected = selectedGem?.id === gem.id;
                return (
                  <button
                    key={gem.id}
                    onClick={() => setModalGem(gem)}
                    className="group text-left"
                  >
                    <div
                      className={`relative aspect-square overflow-hidden transition-all duration-200 ${
                        isSelected
                          ? "ring-[1.5px] ring-[#C4956A]"
                          : "ring-1 ring-transparent hover:ring-[#C4956A]/50"
                      }`}
                    >
                      <Image
                        src={gem.unsplashUrl}
                        alt={gem.labelEn}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 14vw"
                      />
                      {isSelected && <CheckBadge />}
                    </div>
                    <div className="mt-2 px-0.5">
                      <p className="text-[12px] font-light text-[#2A2A2A]">{gem.labelEn}</p>
                      {power && (
                        <p
                          className="mt-0.5 text-[10px] font-light italic leading-snug"
                          style={{ color: "#C4956A" }}
                        >
                          {power.powerTagline}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Marketplace banner */}
            <div className="mt-10 flex items-center justify-between border border-[#EBEBEB] p-6">
              <div>
                <p className="text-[13px] font-light text-[#2A2A2A]">
                  Browse our full gem gallery
                </p>
                <p className="mt-0.5 text-[12px] font-light text-[#9A9A9A]">
                  26+ varieties, traceable origins
                </p>
              </div>
              <Link
                href="/gems"
                className="ml-4 flex-shrink-0 text-[13px] font-light transition-opacity hover:opacity-70"
                style={{ color: "#C4956A" }}
              >
                Gem Gallery →
              </Link>
            </div>
          </div>
        )}

        {/* ── STEP 2: BAIL + CUT ── */}
        {step === 2 && (
          <div>
            <button
              onClick={() => setStep(1)}
              className="mb-8 text-[13px] font-light text-[#9A9A9A] transition-colors hover:text-[#2A2A2A]"
            >
              ← Back
            </button>

            {/* Gem summary chip */}
            {selectedGem && (
              <div className="mb-8 flex items-center gap-3 bg-[#FAFAF8] px-4 py-3">
                <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden">
                  <Image
                    src={selectedGem.unsplashUrl}
                    alt={selectedGem.labelEn}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-[11px] font-light text-[#9A9A9A]">Your gem</p>
                  <p className="text-[14px] font-light text-[#2A2A2A]">{selectedGem.labelEn}</p>
                </div>
              </div>
            )}

            <p className="text-[11px] font-light tracking-[0.2em] uppercase text-[#9A9A9A]">
              STEP 02
            </p>
            <p className="mt-2 text-[22px] font-light text-[#2A2A2A]">Bail & Cut Shape</p>
            <p className="mt-1 text-[13px] font-light text-[#9A9A9A]">
              Choose both a bail style and a cut shape to continue.
            </p>

            {/* Bail styles */}
            <div className="mt-10">
              <div className="mb-1 flex items-center gap-3">
                <p className="text-[13px] font-light text-[#2A2A2A]">Bail Style</p>
                <div className="h-px flex-1 bg-[#EBEBEB]" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                {bailStyles.map((bail) => {
                  const isSelected = selectedBail?.id === bail.id;
                  return (
                    <button
                      key={bail.id}
                      onClick={() => setSelectedBail(bail)}
                      className="group text-left"
                    >
                      <div
                        className={`relative aspect-square overflow-hidden transition-all duration-200 ${
                          isSelected
                            ? "ring-[1.5px] ring-[#C4956A]"
                            : "ring-1 ring-transparent hover:ring-[#C4956A]/50"
                        }`}
                      >
                        <Image
                          src={bail.unsplashUrl}
                          alt={bail.labelEn}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        {isSelected && <CheckBadge />}
                      </div>
                      <div className="mt-2 px-0.5">
                        <p className="text-[13px] font-light text-[#2A2A2A]">{bail.labelEn}</p>
                        <p className="mt-0.5 text-[11px] font-light text-[#9A9A9A]">
                          {bail.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cut shapes */}
            <div className="mt-10">
              <div className="mb-1 flex items-center gap-3">
                <p className="text-[13px] font-light text-[#2A2A2A]">Cut Shape</p>
                <div className="h-px flex-1 bg-[#EBEBEB]" />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-3 md:grid-cols-8">
                {pendantCutShapes.map((cut) => {
                  const isSelected = selectedCut?.id === cut.id;
                  return (
                    <button
                      key={cut.id}
                      onClick={() => setSelectedCut(cut)}
                      className="group text-left"
                    >
                      <div
                        className={`relative aspect-square overflow-hidden transition-all duration-200 ${
                          isSelected
                            ? "ring-[1.5px] ring-[#C4956A]"
                            : "ring-1 ring-transparent hover:ring-[#C4956A]/50"
                        }`}
                      >
                        <ShapePreview shapeId={cut.id} label={cut.labelEn} />
                        {isSelected && <CheckBadge />}
                      </div>
                      <p className="mt-1.5 text-center text-[11px] font-light text-[#2A2A2A]">
                        {cut.labelEn}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Continue CTA */}
            <div className="mt-10 flex items-center gap-4">
              <button
                onClick={() => setStep(3)}
                disabled={!canProceedStep2}
                className={`rounded-full px-8 py-3 text-[13px] font-light tracking-[0.08em] transition-all ${
                  canProceedStep2
                    ? "bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]"
                    : "cursor-not-allowed bg-[#EBEBEB] text-[#9A9A9A]"
                }`}
              >
                Continue →
              </button>
              {!canProceedStep2 && (
                <p className="text-[12px] font-light text-[#9A9A9A]">
                  {!selectedBail && !selectedCut
                    ? "Choose a bail style and cut shape"
                    : !selectedBail
                    ? "Choose a bail style"
                    : "Choose a cut shape"}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ── STEP 3: SUMMARY ── */}
        {step === 3 && (
          <div className="mx-auto max-w-xl">
            <button
              onClick={() => setStep(2)}
              className="mb-8 text-[13px] font-light text-[#9A9A9A] transition-colors hover:text-[#2A2A2A]"
            >
              ← Back
            </button>

            <p className="text-[11px] font-light tracking-[0.2em] uppercase text-[#9A9A9A]">
              STEP 03
            </p>
            <p className="mt-2 text-[22px] font-light text-[#2A2A2A]">Your Design Summary</p>

            <div className="mt-8 space-y-0">
              {selectedGem && (
                <div className="flex items-center gap-4 border-b border-[#EBEBEB] py-5">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden bg-[#FAFAF8]">
                    <Image
                      src={selectedGem.unsplashUrl}
                      alt={selectedGem.labelEn}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-[11px] font-light tracking-[0.1em] uppercase text-[#9A9A9A]">
                      Gemstone
                    </p>
                    <p className="text-[16px] font-light text-[#2A2A2A]">{selectedGem.labelEn}</p>
                    {gemPowerData[selectedGem.gemType] && (
                      <p
                        className="text-[12px] font-light italic"
                        style={{ color: "#C4956A" }}
                      >
                        {gemPowerData[selectedGem.gemType]?.powerTagline}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {selectedBail && (
                <div className="flex items-center gap-4 border-b border-[#EBEBEB] py-5">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden bg-[#FAFAF8]">
                    <Image
                      src={selectedBail.unsplashUrl}
                      alt={selectedBail.labelEn}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-[11px] font-light tracking-[0.1em] uppercase text-[#9A9A9A]">
                      Bail Style
                    </p>
                    <p className="text-[16px] font-light text-[#2A2A2A]">{selectedBail.labelEn}</p>
                    <p className="text-[12px] font-light text-[#9A9A9A]">{selectedBail.description}</p>
                  </div>
                </div>
              )}

              {selectedCut && (
                <div className="flex items-center gap-4 border-b border-[#EBEBEB] py-5">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden bg-[#FAFAF8]">
                    <ShapePreview shapeId={selectedCut.id} label={selectedCut.labelEn} />
                  </div>
                  <div>
                    <p className="text-[11px] font-light tracking-[0.1em] uppercase text-[#9A9A9A]">
                      Cut Shape
                    </p>
                    <p className="text-[16px] font-light text-[#2A2A2A]">{selectedCut.labelEn}</p>
                    <p className="text-[12px] font-light text-[#9A9A9A]">{selectedCut.description}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 border-b border-[#EBEBEB] py-5">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center bg-[#FAFAF8]">
                  <svg viewBox="0 0 32 32" fill="none" stroke="#C4956A" strokeWidth="1" className="h-8 w-8">
                    <circle cx="16" cy="16" r="11" />
                    <circle cx="16" cy="16" r="6" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-light tracking-[0.1em] uppercase text-[#9A9A9A]">
                    Metal
                  </p>
                  <p className="text-[16px] font-light text-[#2A2A2A]">Sterling Silver S925</p>
                  <p className="text-[12px] font-light text-[#9A9A9A]">Rhodium-plated finish</p>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            {selectedGem && (
              <div className="mt-8 border border-[#EBEBEB] p-6">
                <p className="text-[11px] font-light tracking-[0.15em] uppercase text-[#9A9A9A]">
                  Estimated Price
                </p>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] font-light text-[#9A9A9A]">Gemstone</p>
                    <p className="text-[13px] font-light text-[#2A2A2A]">
                      ฿{(gemBasePrices[selectedGem.gemType] ?? 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] font-light text-[#9A9A9A]">Craftsmanship</p>
                    <p className="text-[13px] font-light text-[#2A2A2A]">
                      ฿{categoryAdjustments.pendant.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#EBEBEB] pt-3">
                    <p className="text-[14px] font-light text-[#2A2A2A]">Total</p>
                    <p className="text-[17px] font-light text-[#2A2A2A]">
                      ฿{((gemBasePrices[selectedGem.gemType] ?? 0) + categoryAdjustments.pendant).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <Link
              href={`/cart?type=pendant${selectedGem ? `&gemType=${selectedGem.gemType}` : ""}`}
              className="mt-6 block w-full rounded-full bg-[#2A2A2A] py-4 text-center text-[13px] font-light tracking-[0.1em] text-white transition-all hover:bg-[#3A3A3A]"
            >
              Add to Cart
            </Link>
            <p className="mt-3 text-center text-[11px] font-light text-[#9A9A9A]">
              Custom-made · 14–21 days production · Free shipping
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default function PendantCustomizerPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-white" />}>
      <PendantCustomizerContent />
    </Suspense>
  );
}
