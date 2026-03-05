"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check, Gift, ShieldCheck, Star, Truck } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { gemPowerData, gemTypeDisplayData } from "@/lib/gem-data";
import type { GemType } from "@/lib/gem-data";
import { categoryAdjustments, gemBasePrices } from "@/lib/customizer-data";
import {
  clearCartSelection,
  getCartSelection,
  setCartSelection,
  type StoredCartSelection,
} from "@/lib/account-storage";
import {
  GIT_CERTIFICATION_FEE,
  calculateGitVat,
  getGitReportDescription,
  getGitReportTitle,
  getGitReportTypeForGem,
  isGitEnabledParam,
} from "@/lib/git-certification";

const typeLabels: Record<string, string> = {
  ring: "Lotus Bloom Ring",
  earring: "Lamduan Drop Earrings",
  bracelet: "Kritsana Bangle",
  necklace: "Ylang Pendant Necklace",
  pendant: "Pendant",
};

const fallbackImages: Record<string, string> = {
  ring: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
  earring: "https://images.pexels.com/photos/5370658/pexels-photo-5370658.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
  bracelet: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop",
  necklace: "https://images.unsplash.com/photo-1633810543674-a41cf09c5e56?w=400&h=400&fit=crop",
  pendant: "https://images.unsplash.com/photo-1583937443538-4755e5deab79?w=400&h=400&fit=crop",
};

function CartInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [storedSelection, setStoredSelection] = useState<StoredCartSelection | null>(null);
  const [gitCertificationEnabled, setGitCertificationEnabled] = useState(false);
  const [gitTouched, setGitTouched] = useState(false);

  useEffect(() => {
    setStoredSelection(getCartSelection());
  }, []);

  const paramType = params.get("type");
  const paramGemType = params.get("gemType") as GemType | null;
  const paramRingSize = params.get("ringSize");
  const paramBraceletSize = params.get("braceletSize");
  const paramGitCertified = params.get("gitCertified");

  useEffect(() => {
    if (!paramType) return;
    const selection: StoredCartSelection = {
      type: paramType,
      gemType: paramGemType ?? undefined,
      ringSize: paramRingSize ?? undefined,
      braceletSize: paramBraceletSize ?? undefined,
      gitCertificationEnabled: isGitEnabledParam(paramGitCertified),
      gitReportType: getGitReportTypeForGem(paramGemType),
    };
    setCartSelection(selection);
    setStoredSelection(selection);
    setGitCertificationEnabled(Boolean(selection.gitCertificationEnabled));
    setGitTouched(false);
  }, [paramType, paramGemType, paramRingSize, paramBraceletSize, paramGitCertified]);

  const activeSelection = useMemo(() => {
    if (paramType) {
      return {
        type: paramType,
        gemType: paramGemType,
        ringSize: paramRingSize,
        braceletSize: paramBraceletSize,
        gitCertificationEnabled: isGitEnabledParam(paramGitCertified),
      };
    }
    if (!storedSelection) return null;
    return {
      type: storedSelection.type,
      gemType: storedSelection.gemType ?? null,
      ringSize: storedSelection.ringSize ?? null,
      braceletSize: storedSelection.braceletSize ?? null,
      gitCertificationEnabled: Boolean(storedSelection.gitCertificationEnabled),
    };
  }, [paramType, paramGemType, paramRingSize, paramBraceletSize, paramGitCertified, storedSelection]);

  const type = activeSelection?.type ?? null;
  const gemType = (activeSelection?.gemType ?? null) as GemType | null;
  const ringSize = activeSelection?.ringSize ?? null;
  const braceletSize = activeSelection?.braceletSize ?? null;
  const hasItem = !!type;

  useEffect(() => {
    if (!activeSelection?.type || gitTouched) return;
    setGitCertificationEnabled(Boolean(activeSelection.gitCertificationEnabled));
  }, [activeSelection?.type, activeSelection?.gitCertificationEnabled, gitTouched]);

  const gemPower = gemType ? gemPowerData[gemType] : null;
  const gemDisplay = gemType ? gemTypeDisplayData[gemType] : null;

  const jewelryLabel = type ? (typeLabels[type] ?? "Custom Piece") : "Custom Piece";
  const gemLabel = gemDisplay?.nameEn ?? null;
  const productName = gemLabel ? `${jewelryLabel} · ${gemLabel}` : jewelryLabel;
  const productImage =
    gemPower?.unsplashUrl ?? (type ? (fallbackImages[type] ?? fallbackImages.ring) : fallbackImages.ring);

  const gitReportType = getGitReportTypeForGem(gemType);
  const gitReportTitle = getGitReportTitle(gitReportType);
  const gitReportDescription = getGitReportDescription(gitReportType);

  const craftFee = hasItem && type ? (categoryAdjustments[type] ?? 1800) : 0;
  const gemAddon = gemType ? (gemBasePrices[gemType] ?? 0) : 0;
  const jewelryBasePrice = craftFee + gemAddon;
  const gitCertificationFee = hasItem && gitCertificationEnabled ? GIT_CERTIFICATION_FEE : 0;
  const vatOnGitFee = calculateGitVat(gitCertificationFee);
  const subtotal = jewelryBasePrice + gitCertificationFee;
  const estimatedTotal = subtotal + vatOnGitFee;

  useEffect(() => {
    if (!type) return;
    const nextSelection: StoredCartSelection = {
      type,
      gemType: gemType ?? undefined,
      ringSize: ringSize ?? undefined,
      braceletSize: braceletSize ?? undefined,
      gitCertificationEnabled,
      gitReportType,
    };
    setCartSelection(nextSelection);
    setStoredSelection(nextSelection);
  }, [type, gemType, ringSize, braceletSize, gitCertificationEnabled, gitReportType]);

  const checkoutParams = new URLSearchParams();
  if (type) checkoutParams.set("type", type);
  if (gemType) checkoutParams.set("gemType", gemType);
  if (ringSize) checkoutParams.set("ringSize", ringSize);
  if (braceletSize) checkoutParams.set("braceletSize", braceletSize);
  if (gitCertificationEnabled) checkoutParams.set("gitCertified", "1");
  const checkoutHref = hasItem ? `/checkout?${checkoutParams.toString()}` : "/customize";

  const trustBadges = [
    { icon: <Truck className="h-6 w-6" />, label: "FREE DELIVERY", desc: "Nationwide shipping" },
    { icon: <Gift className="h-6 w-6" />, label: "MEANINGFUL GIFT", desc: "Luxury gift wrapping" },
    { icon: <Star className="h-6 w-6" />, label: "EVERYDAY", desc: "Designed to be worn" },
    { icon: <ShieldCheck className="h-6 w-6" />, label: "TRACEABLE GEMS", desc: "Pradap Prada quality assurance" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-[1200px] px-6 pt-[95px] pb-24">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="font-serif text-[28px] font-light text-[#2A2A2A]">Your cart</h1>
          <Link
            href="/customize"
            className="text-[13px] font-light text-[#9A9A9A] transition-colors hover:text-[#2A2A2A]"
          >
            Continue shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 border-b border-[#EBEBEB] pb-3">
          <p className="text-[11px] font-light tracking-[0.15em] uppercase text-[#9A9A9A]">Product</p>
        </div>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            {hasItem ? (
              <div className="grid grid-cols-1 items-center gap-6 border-b border-[#EBEBEB] pb-6">
                <div className="flex gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden bg-[#FAFAF8]">
                    <Image src={productImage} alt={productName} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[15px] font-light text-[#2A2A2A]">{productName}</p>
                    {gemPower && (
                      <p className="mt-0.5 text-[12px] font-light italic text-[#C4956A]">{gemPower.powerTagline}</p>
                    )}
                    <p className="mt-1 text-[12px] font-light text-[#9A9A9A]">
                      Custom-made · 14–21 days · Pradap Prada Certificate included
                    </p>
                    {type === "ring" && ringSize && (
                      <p className="mt-1 text-[12px] font-light text-[#9A9A9A]">Ring size: {ringSize}</p>
                    )}
                    {type === "bracelet" && braceletSize && (
                      <p className="mt-1 text-[12px] font-light text-[#9A9A9A]">Bracelet size: {braceletSize}mm</p>
                    )}
                    <p className="mt-2 text-[13px] font-light text-[#2A2A2A]">
                      Estimated price: ฿{estimatedTotal.toLocaleString()}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        clearCartSelection();
                        setStoredSelection(null);
                        router.replace("/cart");
                      }}
                      className="mt-2 inline-flex text-[12px] font-light text-[#9A9A9A] underline underline-offset-4 transition-colors hover:text-[#2A2A2A]"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border border-[#EBEBEB] bg-[#FAFAF8] p-6">
                <p className="text-[14px] font-light text-[#2A2A2A]">Your cart is empty.</p>
                <p className="mt-1 text-[12px] font-light text-[#9A9A9A]">Choose a design and gemstone to start your order.</p>
              </div>
            )}

            {hasItem && (
              <div className="mt-6 border border-[#EBEBEB] p-5">
                <p className="text-[11px] font-light tracking-[0.15em] uppercase text-[#9A9A9A]">GIT Certification</p>
                <div className="mt-2 flex items-start gap-2 text-[#B08D6A]">
                  <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <p className="text-[12px] font-light italic">
                    Every gemstone is hand-selected with care. For extra peace of mind, we can send your gemstone to
                    GIT — Thailand&apos;s national gemological authority — for official certification.
                  </p>
                </div>

                <div
                  className={`mt-4 border p-4 transition-all ${
                    gitCertificationEnabled
                      ? "border-[1.5px] border-[#B08D6A] bg-[rgba(176,141,106,0.08)]"
                      : "border border-[#EBEBEB] bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="inline-flex items-center gap-1.5 text-[14px] font-light text-[#2A2A2A]"><ShieldCheck className="h-4 w-4 text-[#B08D6A]" />GIT Certified Report</p>
                      <p className="text-[12px] font-light text-[#9A9A9A]">Official National Gem Certificate</p>
                    </div>
                    <span
                      className={`inline-flex items-center text-[#B08D6A] transition-all ${
                        gitCertificationEnabled ? "scale-100 opacity-100" : "scale-75 opacity-0"
                      }`}
                    >
                      <Check className="h-4 w-4" />
                    </span>
                  </div>

                  <div className="mt-3 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[13px] font-light text-[#2A2A2A]">{gitReportTitle}</p>
                      <p className="text-[11px] font-light text-[#9A9A9A]">{gitReportDescription}</p>
                      <p className="text-[11px] font-light text-[#9A9A9A]">Certified by GIT (ISO/IEC 17025)</p>
                      {gemLabel && (
                        <p className="mt-1 text-[11px] font-light text-[#9A9A9A]">
                          Auto-matched for {gemLabel}
                        </p>
                      )}
                    </div>
                    <p className="text-[14px] font-light text-[#2A2A2A]">+฿{GIT_CERTIFICATION_FEE.toLocaleString()}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-[12px] font-light text-[#6B6358]">Add GIT Certificate</p>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={gitCertificationEnabled}
                      onClick={() => {
                        setGitTouched(true);
                        setGitCertificationEnabled((prev) => !prev);
                      }}
                      className={`relative h-7 w-12 overflow-hidden rounded-full transition-colors ${
                        gitCertificationEnabled ? "bg-[#B08D6A]" : "bg-[#D9D2C8]"
                      }`}
                    >
                      <span
                        className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                          gitCertificationEnabled ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {gitCertificationEnabled && (
                  <div className="mt-3 flex items-start gap-2 text-[11px] font-light text-[#9A9A9A]">
                    <Check className="mt-0.5 h-3.5 w-3.5 text-[#B08D6A]" />
                    <p>
                      Your certificate will be mailed with your order. Please allow 7–14 additional business days.
                      *Price excludes 7% VAT
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="mt-8">
              <p className="text-[11px] font-light tracking-[0.15em] uppercase text-[#9A9A9A]">Gift Card Message</p>
              <textarea
                className="mt-3 w-full resize-none border border-[#EBEBEB] bg-[#FAFAF8] px-4 py-3 text-[14px] font-light outline-none transition-colors focus:border-[#C4956A]"
                rows={4}
                placeholder="Write a personal message for your gift card..."
              />

              <Link
                href="/customize"
                className="mt-4 inline-flex text-[13px] font-light text-[#9A9A9A] underline underline-offset-4 transition-colors hover:text-[#2A2A2A]"
              >
                Continue shopping
              </Link>
            </div>
          </div>

          <div>
            <div className="border border-[#EBEBEB] p-6">
              <p className="text-[13px] font-light text-[#9A9A9A]">Estimated pricing</p>
              <div className="mt-3 space-y-2 text-[13px] font-light">
                <div className="flex justify-between text-[#9A9A9A]">
                  <span>Jewelry ({jewelryLabel})</span>
                  <span>฿{jewelryBasePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#9A9A9A]">
                  <span className="inline-flex items-center gap-2">
                    GIT Certification
                    {gitCertificationEnabled && (
                      <span className="rounded-full border border-[#B08D6A] px-2 py-0.5 text-[9px] tracking-[0.08em] text-[#B08D6A]">
                        GIT CERTIFIED
                      </span>
                    )}
                  </span>
                  <span>+฿{gitCertificationFee.toLocaleString()}</span>
                </div>
                <div className="h-px bg-[#EBEBEB]" />
                <div className="flex justify-between text-[#2A2A2A]">
                  <span>Subtotal</span>
                  <span>฿{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#9A9A9A]">
                  <span>*VAT 7% on certification fee</span>
                  <span>+฿{vatOnGitFee.toLocaleString()}</span>
                </div>
                <div className="h-px bg-[#EBEBEB]" />
                <div className="flex items-baseline justify-between text-[#2A2A2A]">
                  <span>Total</span>
                  <span className="font-serif text-[22px]">฿{estimatedTotal.toLocaleString()}</span>
                </div>
              </div>

              {hasItem ? (
                <Link
                  href={checkoutHref}
                  className="mt-5 flex h-12 w-full items-center justify-center bg-[#2A2A2A] text-[13px] font-light tracking-[0.08em] text-white transition-all hover:bg-[#3A3A3A]"
                >
                  Check out
                </Link>
              ) : (
                <button
                  disabled
                  className="mt-5 flex h-12 w-full cursor-not-allowed items-center justify-center bg-[#EBEBEB] text-[13px] font-light tracking-[0.08em] text-[#9A9A9A]"
                >
                  Check out
                </button>
              )}

              <Link
                href="/customize"
                className="mt-3 flex h-10 w-full items-center justify-center border border-[#EBEBEB] text-[13px] font-light text-[#9A9A9A] transition-colors hover:text-[#2A2A2A]"
              >
                Continue Shopping
              </Link>
            </div>

            <div className="mt-4 space-y-2 px-1">
              {[
                "Custom-made · 14–21 days production",
                "Pradap Prada Certificate included",
                "GIT certification adds 7–14 business days",
                "Free shipping nationwide",
              ].map((text) => (
                <div key={text} className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-[#C4956A]" />
                  <p className="text-[12px] font-light text-[#9A9A9A]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#EBEBEB]">
        <div className="mx-auto max-w-[1200px] px-6 py-10">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {trustBadges.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2 text-center">
                <div className="text-[#9A9A9A]">{item.icon}</div>
                <p className="text-[11px] font-light tracking-[0.15em] text-[#2A2A2A]">{item.label}</p>
                <p className="text-[12px] font-light text-[#9A9A9A]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-6 w-6 animate-pulse rounded-full bg-[#C4956A]" />
        </div>
      }
    >
      <CartInner />
    </Suspense>
  );
}
