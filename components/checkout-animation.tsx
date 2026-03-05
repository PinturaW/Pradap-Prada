"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Sparkles, Gift, MapPin, X } from "lucide-react";
import type { Gem, JewelryOption, GemType } from "@/lib/gem-data";
import { gemGradients, gemShapeLabels } from "@/lib/gem-data";
import { gemPlaceholderByType } from "@/lib/placeholder-images";

interface Props {
  gem?: Gem | null;
  jewelry?: JewelryOption | null;
  customerName?: string;
  orderTitle?: string;
  onDone: () => void;
}

const STEPS = [
  { eyebrow: "Crafting in progress", title: "Infusing your story" },
  { eyebrow: "Crafting in progress", title: "Cutting the gemstone" },
  { eyebrow: "Crafting in progress", title: "Setting the jewel" },
  { eyebrow: "Crafting in progress", title: "Packing with love" },
] as const;

function WordCycler({ text }: { text: string }) {
  const words = text.split(/\s+/).filter(Boolean).slice(0, 12);
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 280);
    return () => clearInterval(t);
  }, [words.length]);
  return (
    <span key={i} className="animate-fade-in text-sm font-medium text-foreground/60">
      {words[i]}
    </span>
  );
}

function Step1({ story }: { story?: string | null }) {
  const defaultStory = "Every piece begins with your story — crafted with care by our artisans in Trat Thailand for you alone";
  return (
    <div className="relative flex h-48 w-full flex-col items-center justify-center gap-3">
      <div className="h-6 text-center">
        <WordCycler text={story || defaultStory} />
      </div>
      <div className="animate-glow-pulse relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-luxury">
        <div className="absolute inset-3 rounded-full bg-white/20" />
        <Sparkles
          className="relative z-10 h-10 w-10 animate-spin text-white"
          style={{ animationDuration: "4s" }}
        />
      </div>
    </div>
  );
}

function Step2() {
  const facetLines: [number, number, number, number][] = [
    [100, 15, 185, 100],
    [185, 100, 100, 185],
    [100, 185, 15, 100],
    [15, 100, 100, 15],
    [100, 15, 100, 185],
    [15, 100, 185, 100],
  ];

  return (
    <div className="flex h-48 w-full items-center justify-center">
      <svg viewBox="0 0 200 200" width="160" height="160">
        <polygon
          points="100,15 185,100 100,185 15,100"
          fill="rgba(212,175,55,0.05)"
          stroke="#D4AF37"
          strokeWidth="2"
          pathLength={1}
          className="animate-gem-draw"
        />
        {facetLines.map(([x1, y1, x2, y2], idx) => (
          <line
            key={idx}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#D4AF37"
            strokeWidth="0.8"
            strokeOpacity="0.35"
            pathLength={1}
            style={{
              strokeDasharray: 1,
              strokeDashoffset: 1,
              animation: `gem-draw 1.2s ease-out ${0.4 + idx * 0.15}s forwards`,
            }}
          />
        ))}
        <circle
          cx="100"
          cy="100"
          r="4"
          fill="#D4AF37"
          className="animate-fade-in"
          style={{ opacity: 0, animationDelay: "1.6s" }}
        />
      </svg>
    </div>
  );
}

function Step3({ gemType }: { gemType?: GemType | null }) {
  const prongAngles = [0, 90, 180, 270] as const;
  const gradient = gemType ? gemGradients[gemType] : "from-amber-200 via-amber-400 to-amber-600";

  return (
    <div className="relative flex h-48 w-full items-center justify-center">
      {[0, 400, 800].map((delay) => (
        <span
          key={delay}
          className="absolute inline-flex h-24 w-24 rounded-full border-2 border-primary/25 animate-ping"
          style={{ animationDuration: "1.6s", animationDelay: `${delay}ms` }}
        />
      ))}
      <div
        className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${gradient} shadow-luxury`}
      >
        <div className="h-10 w-10 rounded-full bg-white/25" />
      </div>
      {prongAngles.map((angle, idx) => (
        <div
          key={angle}
          className="absolute z-20 h-3 w-3 rounded-full bg-amber-400 shadow-sm animate-fade-in"
          style={{
            transform: `translate(${Math.cos((angle * Math.PI) / 180) * 48}px, ${
              Math.sin((angle * Math.PI) / 180) * 48
            }px)`,
            opacity: 0,
            animationDelay: `${0.5 + idx * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}

function Step4() {
  const [cardIn, setCardIn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setCardIn(true), 320);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex h-48 w-full flex-col items-center justify-center gap-4">
      <Gift
        className="h-16 w-16 animate-fade-in text-primary"
        style={{ opacity: 0 }}
      />
      <div
        className={`transition-all duration-500 ${
          cardIn ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        <div className="rounded-lg border border-amber-200 bg-gradient-to-r from-amber-50 to-white px-5 py-3 shadow-luxury-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-amber-600">
            ◆ PRADAP PRADA ◆
          </p>
          <div className="mt-2 space-y-1">
            <div className="h-1.5 w-24 rounded-full bg-amber-200" />
            <div className="h-1.5 w-16 rounded-full bg-amber-100" />
            <div className="h-1.5 w-20 rounded-full bg-amber-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CheckoutAnimation({ gem, jewelry, customerName, orderTitle, onDone }: Props) {
  const [step, setStep] = useState(1);
  const [fading, setFading] = useState(false);
  const [certIn, setCertIn] = useState(false);

  useEffect(() => {
    if (step >= 5) return;
    const t = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setStep((s) => s + 1);
        setFading(false);
      }, 180);
    }, 1200);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    if (step !== 5) return;
    const t = setTimeout(() => setCertIn(true), 50);
    return () => clearTimeout(t);
  }, [step]);

  const current = STEPS[Math.min(step - 1, STEPS.length - 1)];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center">
      {step < 5 ? (
        <div
          className={`w-full max-w-sm rounded-3xl bg-white p-8 shadow-luxury-lg transition-all duration-300 ${
            fading ? "translate-y-1 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          <div key={step}>
            <div className="animate-fade-in-up" style={{ opacity: 0 }}>
              {step === 1 && <Step1 story={gem?.storyEn} />}
              {step === 2 && <Step2 />}
              {step === 3 && <Step3 gemType={gem?.type} />}
              {step === 4 && <Step4 />}
            </div>
            <div
              className="mt-4 text-center animate-fade-in-up"
              style={{ opacity: 0, animationDelay: "200ms" }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                {current.eyebrow}
              </p>
              <p className="mt-1 font-serif text-2xl font-semibold text-foreground">
                {current.title}
              </p>
            </div>
          </div>

          {/* Progress dots */}
          <div className="mt-6 flex justify-center gap-2">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i + 1 === step
                    ? "w-8 bg-primary"
                    : i + 1 < step
                    ? "w-4 bg-primary/40"
                    : "w-4 bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Story Certificate */
        <div
          className={`relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-luxury-lg transition-all duration-700 ease-out ${
            certIn ? "translate-y-0 scale-100 opacity-100" : "translate-y-12 scale-[0.98] opacity-0"
          }`}
        >
          <button
            onClick={onDone}
            className="absolute right-4 top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-amber-200/70 bg-white/90 text-[#8A7F70] transition-colors hover:border-amber-300 hover:text-[#2A2A2A]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Header */}
          <div className="border-b border-amber-200/50 bg-gradient-to-r from-amber-50 via-white to-amber-50 px-8 py-6 text-center">
            <p className="text-champagne-gradient text-[11px] font-bold uppercase tracking-[0.45em]">
              ◆ PRADAP PRADA ◆
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Certificate of Origin &amp; Story
            </p>
          </div>

          {/* Body */}
          <div className="max-h-[58vh] overflow-y-auto px-8 py-6">
            <div className="mb-5 rounded-xl border border-amber-200/60 bg-gradient-to-r from-amber-50/80 via-white to-amber-50/80 px-4 py-3 text-center">
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Bespoke Piece Confirmation
              </p>
            </div>

            <div className="mb-5 rounded-xl border border-[#EBEBEB] bg-[#FAFAF8] px-4 py-3">
              <div className="flex items-center justify-between gap-4 text-[11px] font-light">
                <p className="uppercase tracking-[0.16em] text-[#9A9A9A]">Ordered by</p>
                <p className="text-right text-[#2A2A2A]">{customerName?.trim() || "Valued Customer"}</p>
              </div>
              <div className="mt-2 h-px bg-[#EBEBEB]" />
              <div className="mt-2 flex items-start justify-between gap-4 text-[11px] font-light">
                <p className="uppercase tracking-[0.16em] text-[#9A9A9A]">Order</p>
                <p className="max-w-[70%] text-right text-[12px] text-[#2A2A2A]">
                  {orderTitle?.trim() || jewelry?.label || jewelry?.labelTh || "Bespoke Piece"}
                </p>
              </div>
            </div>

            {gem ? (
              <>
                {/* Gem identity */}
                <div className="flex items-center gap-4">
                  <div
                    className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br ${gemGradients[gem.type]}`}
                  >
                    <Image
                      src={gemPlaceholderByType[gem.type]}
                      alt={gem.nameEn}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-serif text-lg font-semibold leading-snug text-foreground">
                      {gem.nameEn ?? gem.nameTh}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {gem.code} · {gem.carat} ct ·{" "}
                      {gemShapeLabels[gem.shape]?.split(" (")[0] ?? gem.shape}
                    </p>
                  </div>
                </div>

                {/* Story */}
                <div className="mt-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground/60">
                    Story
                  </p>
                  <div className="mt-1.5 h-px bg-border" />
                  <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                    {gem.storyEn}
                  </p>
                </div>

                {/* Spiritual */}
                <div className="mt-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-purple-400">
                    Energy &amp; Belief
                  </p>
                  <div className="mt-1.5 h-px bg-purple-100" />
                  <p className="mt-3 text-sm italic leading-relaxed text-purple-900/70">
                    {gem.spiritualEn}
                  </p>
                </div>

                {/* Metadata chips */}
                <div className="mt-5 flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5">
                    <MapPin className="h-3 w-3 text-primary" />
                    <span className="text-xs font-medium text-foreground">
                      {gem.origin}
                    </span>
                  </div>
                  <div className="rounded-full bg-muted px-3 py-1.5">
                    <span className="text-xs font-medium text-foreground">
                      Mined {gem.yearMined}
                    </span>
                  </div>
                  {jewelry && (
                    <div className="rounded-full bg-muted px-3 py-1.5">
                      <span className="text-xs font-medium text-foreground">
                        {jewelry.label ?? jewelry.labelTh}
                      </span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Generic order confirmation when no gem selected */
              <div className="text-center py-4">
                <Gift className="mx-auto h-12 w-12 text-primary mb-4" />
                <p className="font-serif text-xl font-semibold text-foreground">
                  Bespoke Piece
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  Your custom jewelry order has been received. Our team will review your design selections and reach out to confirm every detail.
                </p>
                {jewelry && (
                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5">
                    <span className="text-xs font-medium text-foreground">
                      {jewelry.label ?? jewelry.labelTh}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Craftsman */}
            <div className="mt-5 rounded-xl border border-border bg-card px-5 py-4 text-center">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Thai Craftsmanship
              </p>
              <p className="mt-0.5 text-sm font-semibold text-foreground">
                Master Artisans · Trat Province
              </p>
              <p className="text-xs text-muted-foreground">
                A family tradition spanning over 60 years
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end border-t border-border bg-card/50 px-8 py-4">
            <button
              onClick={() => window.print()}
              className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Save this certificate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
