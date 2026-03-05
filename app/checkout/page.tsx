"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Gift, ShieldCheck, ShoppingBag } from "lucide-react";
import {
  gems,
  gemPowerData,
  jewelryOptions,
  materialOptions,
  gemTypeDisplayData,
  type GemType,
} from "@/lib/gem-data";
import { jewelryPlaceholderById } from "@/lib/placeholder-images";
import { CheckoutAnimation } from "@/components/checkout-animation";
import { Navbar } from "@/components/navbar";
import { categoryAdjustments, gemBasePrices, fixedDesignByType, fixedProductDetailByType } from "@/lib/customizer-data";
import { addOrder, getAuthUser, getCartSelection, setCartSelection, type AuthUser } from "@/lib/account-storage";
import {
  GIT_CERTIFICATION_FEE,
  calculateGitVat,
  getGitReportDescription,
  getGitReportTitle,
  getGitReportTypeForGem,
  isGitEnabledParam,
} from "@/lib/git-certification";

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <ShoppingBag className="h-8 w-8 animate-pulse text-primary" />
        </div>
      }
    >
      <CheckoutInner />
    </Suspense>
  );
}

function CheckoutInner() {
  const router = useRouter();
  const params = useSearchParams();
  // Old marketplace flow params
  const gemId = params.get("gem");
  const jewelryId = params.get("jewelry");
  const materialId = params.get("material");
  // New customize flow params
  const customType = params.get("type");
  const customGemType = params.get("gemType") as GemType | null;
  const ringSize = params.get("ringSize");
  const braceletSize = params.get("braceletSize");
  const paramGitCertified = params.get("gitCertified");

  const gem = useMemo(
    () => gems.find((g) => g.id === Number(gemId)) ?? null,
    [gemId]
  );
  const jewelry = jewelryOptions.find((j) => j.id === jewelryId) ?? null;
  const material = materialOptions.find((m) => m.id === materialId) ?? null;

  // Whether this is a new custom piece (from customize pages)
  const isCustomPiece = !gemId && !jewelryId && !!customType;
  const selectedCustomGem = customGemType ? gemTypeDisplayData[customGemType] : null;
  const customTypeLabel: Record<string, string> = {
    ring: "Lotus Bloom Ring",
    earring: "Lamduan Drop Earrings",
    bracelet: "Kritsana Bangle",
    necklace: "Ylang Pendant Necklace",
    pendant: "Pendant",
  };
  const effectiveType = customType ?? jewelry?.id ?? null;
  const effectiveGemType = customGemType ?? gem?.type ?? null;
  const effectiveGemPower = effectiveGemType ? gemPowerData[effectiveGemType] : null;
  const customDesign = customType ? fixedDesignByType[customType] : null;
  const customProduct = customType ? fixedProductDetailByType[customType] : null;
  const craftFee = effectiveType ? (categoryAdjustments[effectiveType] ?? 0) : 0;
  const gemAddon = effectiveGemType ? (gemBasePrices[effectiveGemType] ?? 0) : 0;
  const jewelryBasePrice = craftFee + gemAddon;
  const gitReportType = getGitReportTypeForGem(effectiveGemType);
  const gitReportTitle = getGitReportTitle(gitReportType);
  const gitReportDescription = getGitReportDescription(gitReportType);
  const [gitCertificationEnabled, setGitCertificationEnabled] = useState(false);

  useEffect(() => {
    if (paramGitCertified !== null) {
      setGitCertificationEnabled(isGitEnabledParam(paramGitCertified));
      return;
    }

    const storedSelection = getCartSelection();
    if (
      storedSelection
      && storedSelection.type === (effectiveType ?? "")
      && storedSelection.gemType === (effectiveGemType ?? undefined)
    ) {
      setGitCertificationEnabled(Boolean(storedSelection.gitCertificationEnabled));
      return;
    }

    setGitCertificationEnabled(false);
  }, [paramGitCertified, effectiveType, effectiveGemType]);

  const gitCertificationFee = gitCertificationEnabled ? GIT_CERTIFICATION_FEE : 0;
  const vatOnGitFee = calculateGitVat(gitCertificationFee);
  const subtotal = jewelryBasePrice + gitCertificationFee;
  const estimatedTotal = subtotal + vatOnGitFee;

  const hasMarketplaceSelection = !!gem && !!jewelry;
  const hasCustomSelection = !!customType;
  const hasDesignSelection = hasMarketplaceSelection || hasCustomSelection;

  const [isGift, setIsGift] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [fullName, setFullName] = useState("Demo Customer");
  const [phoneNumber, setPhoneNumber] = useState("089-000-0000");
  const [addressLine, setAddressLine] = useState("88 Sukhumvit Road");
  const [district, setDistrict] = useState("Khlong Toei");
  const [province, setProvince] = useState("Bangkok");
  const [postalCode, setPostalCode] = useState("10110");
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    setAuthUser(getAuthUser());
  }, []);

  const designTypeLabel = customType
    ? customTypeLabel[customType] ?? "Custom bespoke piece"
    : jewelry?.label ?? "No design selected";
  const gemstoneLabel =
    selectedCustomGem?.nameEn ?? gem?.nameEn ?? (effectiveGemType ? gemTypeDisplayData[effectiveGemType]?.nameEn : null) ?? "Not selected";
  const summaryImage =
    effectiveGemPower?.unsplashUrl ??
    (customDesign?.imageUrl ?? (jewelry ? jewelryPlaceholderById[jewelry.id] : "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=240&h=240&fit=crop"));
  const summaryTitle = hasDesignSelection
    ? `${designTypeLabel}${gemstoneLabel !== "Not selected" ? ` · ${gemstoneLabel}` : ""}`
    : "Design not selected";

  useEffect(() => {
    if (!effectiveType) return;
    setCartSelection({
      type: effectiveType,
      gemType: effectiveGemType ?? undefined,
      ringSize: ringSize ?? undefined,
      braceletSize: braceletSize ?? undefined,
      gitCertificationEnabled,
      gitReportType,
    });
  }, [effectiveType, effectiveGemType, ringSize, braceletSize, gitCertificationEnabled, gitReportType]);

  const missingDesignItems: string[] = [];
  if (!hasDesignSelection) {
    missingDesignItems.push("Choose your jewelry design");
  }
  if (customType && !effectiveGemType) {
    missingDesignItems.push("Select gemstone");
  }
  if (customType === "ring" && !ringSize) {
    missingDesignItems.push("Select ring size");
  }
  if (customType === "bracelet" && !braceletSize) {
    missingDesignItems.push("Select bracelet size");
  }

  const handleConfirmOrder = () => {
    setSubmitAttempted(true);

    if (!hasDesignSelection || missingDesignItems.length > 0) {
      return;
    }

    if (!authUser) {
      const nextPath = typeof window !== "undefined" ? `${window.location.pathname}${window.location.search}` : "/checkout";
      router.push(`/login?next=${encodeURIComponent(nextPath)}`);
      return;
    }

    addOrder({
      id: `PP-${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toISOString(),
      userEmail: authUser.email,
      designType: designTypeLabel,
      gemstone: gemstoneLabel,
      gemType: effectiveGemType ?? undefined,
      gitCertificationEnabled,
      gitReportType,
      gitCertificationLabel: gitReportTitle,
      productionStatus: "in-production",
      shippingStatus: "pending",
      chainStyle:
        customType === "ring" && ringSize
          ? `Ring Size ${ringSize}`
          : customType === "bracelet" && braceletSize
            ? `Bracelet Size ${braceletSize}mm`
            : undefined,
      pendantStyle: undefined,
      total: estimatedTotal,
      status: "confirmed",
      isGift,
    });
    setShowAnimation(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Navbar />

      {showAnimation && (
        <CheckoutAnimation
          gem={gem}
          jewelry={jewelry}
          customerName={fullName}
          orderTitle={summaryTitle}
          onDone={() => {
            setShowAnimation(false);
            setConfirmed(true);
          }}
        />
      )}

      <div className="mx-auto max-w-5xl px-6 pt-[65px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EBEBEB] py-8">
          <Link
            href="/customize"
            className="flex items-center gap-2 text-[13px] font-light text-[#9A9A9A] transition-colors hover:text-[#2A2A2A]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Design
          </Link>
          <p className="font-serif text-xl font-light text-[#2A2A2A]">Checkout</p>
          <div className="w-24" />
        </div>

        <div className="grid items-start gap-8 py-10 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Shipping form */}
          <div className="rounded-none border border-[#EBEBEB] bg-white p-8">
            <p className="font-serif text-2xl font-light text-[#2A2A2A]">Shipping Information</p>
            <p className="mt-2 text-[13px] font-light text-[#9A9A9A]">
              Please enter your delivery address before confirming.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-[11px] font-light tracking-[0.15em] uppercase text-[#9A9A9A]">
                  Full Name
                </label>
                <input
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="mt-2 w-full border border-[#EBEBEB] bg-[#FAFAF8] px-4 py-3 text-[14px] font-light outline-none focus:border-[#C4956A] transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="text-[11px] font-light tracking-[0.15em] uppercase text-[#9A9A9A]">
                  Phone Number
                </label>
                <input
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  className="mt-2 w-full border border-[#EBEBEB] bg-[#FAFAF8] px-4 py-3 text-[14px] font-light outline-none focus:border-[#C4956A] transition-colors"
                  placeholder="e.g. 08x-xxx-xxxx"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-[11px] font-light tracking-[0.15em] uppercase text-[#9A9A9A]">
                  Address
                </label>
                <input
                  value={addressLine}
                  onChange={(event) => setAddressLine(event.target.value)}
                  className="mt-2 w-full border border-[#EBEBEB] bg-[#FAFAF8] px-4 py-3 text-[14px] font-light outline-none focus:border-[#C4956A] transition-colors"
                  placeholder="House number / Street / Village"
                />
              </div>
              <div className="md:col-span-2">
                <input
                  value={district}
                  onChange={(event) => setDistrict(event.target.value)}
                  className="w-full border border-[#EBEBEB] bg-[#FAFAF8] px-4 py-3 text-[14px] font-light outline-none focus:border-[#C4956A] transition-colors"
                  placeholder="Sub-district / District"
                />
              </div>
              <div>
                <input
                  value={province}
                  onChange={(event) => setProvince(event.target.value)}
                  className="w-full border border-[#EBEBEB] bg-[#FAFAF8] px-4 py-3 text-[14px] font-light outline-none focus:border-[#C4956A] transition-colors"
                  placeholder="Province"
                />
              </div>
              <div>
                <input
                  value={postalCode}
                  onChange={(event) => setPostalCode(event.target.value)}
                  className="w-full border border-[#EBEBEB] bg-[#FAFAF8] px-4 py-3 text-[14px] font-light outline-none focus:border-[#C4956A] transition-colors"
                  placeholder="Postal code"
                />
              </div>
            </div>

            {/* Gift toggle */}
            <div className="mt-8 border border-[#EBEBEB] bg-[#FAFAF8] p-5">
              <div className="flex items-center gap-3">
                <Gift className="h-5 w-5 text-[#C4956A]" />
                <div className="flex-1">
                  <p className="text-[14px] font-light text-[#2A2A2A]">Send as a Gift</p>
                  <p className="text-[12px] font-light text-[#9A9A9A]">
                    Add a personal message card
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsGift(!isGift)}
                  className={`h-7 w-12 rounded-full transition-colors ${
                    isGift ? "bg-[#2A2A2A]" : "bg-[#EBEBEB]"
                  }`}
                >
                  <span
                    className={`block h-6 w-6 translate-x-0.5 rounded-full bg-white transition-transform shadow-sm ${
                      isGift ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>

              {isGift && (
                <div className="mt-4">
                  <label className="text-[11px] font-light tracking-[0.15em] uppercase text-[#9A9A9A]">
                    Gift Message
                  </label>
                  <textarea
                    className="mt-2 w-full border border-[#EBEBEB] bg-white px-4 py-3 text-[14px] font-light outline-none focus:border-[#C4956A] transition-colors"
                    rows={4}
                    placeholder="Write the message you'd like printed on the card..."
                  />
                </div>
              )}
            </div>

            {/* Confirm button */}
            <div className="relative z-10 mt-8">
              {confirmed ? (
                <div className="border border-[#EBEBEB] bg-[#FAFAF8] p-6 text-center">
                  <Check className="mx-auto h-8 w-8" style={{ color: "#C4956A" }} />
                  <p className="mt-2 text-[15px] font-light text-[#2A2A2A]">
                    Order Confirmed
                  </p>
                  <p className="mt-1 text-[13px] font-light text-[#9A9A9A]">
                    Our team will be in touch to confirm your order details.
                  </p>
                  <Link
                    href="/"
                    className="mt-5 inline-flex items-center gap-2 text-[13px] font-light transition-opacity hover:opacity-70"
                    style={{ color: "#C4956A" }}
                  >
                    Return to Home →
                  </Link>
                  <Link
                    href="/orders"
                    className="mt-3 inline-flex items-center gap-2 text-[13px] font-light transition-opacity hover:opacity-70"
                    style={{ color: "#C4956A" }}
                  >
                    View My Orders →
                  </Link>
                </div>
              ) : (
                authUser ? (
                  <button
                    onClick={handleConfirmOrder}
                    className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#2A2A2A] text-[13px] font-light tracking-[0.1em] text-white transition-all hover:bg-[#3A3A3A]"
                  >
                    Confirm Order
                  </button>
                ) : (
                  <div className="space-y-3">
                    <p className="text-center text-[12px] font-light text-[#9A9A9A]">
                      Please log in before placing your order.
                    </p>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <button
                        onClick={() => {
                          const nextPath = typeof window !== "undefined" ? `${window.location.pathname}${window.location.search}` : "/checkout";
                          router.push(`/login?next=${encodeURIComponent(nextPath)}`);
                        }}
                        className="flex h-12 flex-1 items-center justify-center rounded-full bg-[#2A2A2A] px-5 text-[13px] font-light tracking-[0.08em] text-white transition-colors hover:bg-[#3A3A3A]"
                      >
                        Login to Continue
                      </button>
                      <button
                        onClick={() => {
                          const nextPath = typeof window !== "undefined" ? `${window.location.pathname}${window.location.search}` : "/checkout";
                          router.push(`/signup?next=${encodeURIComponent(nextPath)}`);
                        }}
                        className="flex h-12 flex-1 items-center justify-center rounded-full border border-[#2A2A2A] px-5 text-[13px] font-light tracking-[0.08em] text-[#2A2A2A] transition-colors hover:bg-[#2A2A2A] hover:text-white"
                      >
                        Create Account
                      </button>
                    </div>
                  </div>
                )
              )}

              {submitAttempted && missingDesignItems.length > 0 && (
                <div className="mt-3 border border-[#EED9CC] bg-[#FFF8F3] p-3 text-[12px] font-light text-[#9A6A4A]">
                  <p className="text-[#8A5A3B]">Please complete your design before checkout:</p>
                  <ul className="mt-1 space-y-1">
                    {missingDesignItems.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                  <Link href="/customize" className="mt-2 inline-block text-[#C4956A] hover:opacity-70">
                    Continue design →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Order summary */}
          <div className="h-fit border border-[#EBEBEB] bg-white p-8">
            <p className="font-serif text-xl font-light text-[#2A2A2A]">Order Summary</p>

            {hasDesignSelection && (
              <div className="mt-5 border border-[#EBEBEB] bg-[#FAFAF8] p-5">
                <div className="flex items-start gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden border border-[#EBEBEB] bg-white">
                    <Image src={summaryImage} alt={summaryTitle} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-[14px] font-light text-[#2A2A2A]">{summaryTitle}</p>
                    {effectiveGemPower?.powerTagline && (
                      <p className="mt-1 text-[12px] font-light italic text-[#C4956A]">
                        {effectiveGemPower.powerTagline}
                      </p>
                    )}
                    {effectiveType === "ring" && ringSize && (
                      <p className="mt-1 text-[12px] font-light text-[#9A9A9A]">Ring size: {ringSize}</p>
                    )}
                    {effectiveType === "bracelet" && braceletSize && (
                      <p className="mt-1 text-[12px] font-light text-[#9A9A9A]">Bracelet size: {braceletSize}mm</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Price breakdown */}
            <div className="mt-6 bg-[#FAFAF8] p-5">
              <div className="space-y-2 text-[13px] font-light">
                <div className="flex justify-between text-[#9A9A9A]">
                  <span>Jewelry ({designTypeLabel})</span>
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
                <div className="flex justify-between">
                  <span className="font-light text-[#2A2A2A]">Total</span>
                  <span className="text-[18px] font-light text-[#2A2A2A]">฿{estimatedTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Trust signals */}
            <div className="mt-6 space-y-3">
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

            {material && (
              <p className="mt-4 text-[12px] font-light text-[#9A9A9A]">
                Material:{" "}
                <span className="text-[#2A2A2A]">
                  {material.label} (×{material.multiplier})
                </span>
              </p>
            )}

            {hasDesignSelection && (
              <div
                className={`mt-6 border p-5 transition-all ${
                  gitCertificationEnabled
                    ? "border-[1.5px] border-[#B08D6A] bg-[rgba(176,141,106,0.08)]"
                    : "border border-[#EBEBEB] bg-white"
                }`}
              >
                <p className="text-[11px] font-light tracking-[0.15em] uppercase text-[#9A9A9A]">GIT Certification</p>
                <div className="mt-2 flex items-start gap-2 text-[#B08D6A]">
                  <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <p className="text-[12px] font-light italic">
                    Every gemstone is hand-selected with care. For extra peace of mind, we can send your gemstone to
                    GIT — Thailand&apos;s national gemological authority — for official certification.
                  </p>
                </div>

                <div className="mt-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="inline-flex items-center gap-1.5 text-[13px] font-light text-[#2A2A2A]"><ShieldCheck className="h-3.5 w-3.5 text-[#B08D6A]" />GIT Certified Report</p>
                    <p className="text-[11px] font-light text-[#9A9A9A]">Official National Gem Certificate</p>
                    <p className="mt-2 text-[13px] font-light text-[#2A2A2A]">{gitReportTitle}</p>
                    <p className="text-[11px] font-light text-[#9A9A9A]">{gitReportDescription}</p>
                    <p className="text-[11px] font-light text-[#9A9A9A]">Certified by GIT (ISO/IEC 17025)</p>
                    {gemstoneLabel !== "Not selected" && (
                      <p className="mt-1 text-[11px] font-light text-[#9A9A9A]">Auto-matched for {gemstoneLabel}</p>
                    )}
                  </div>
                  <span className="text-[14px] font-light text-[#2A2A2A]">+฿{GIT_CERTIFICATION_FEE.toLocaleString()}</span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-[12px] font-light text-[#6B6358]">Add GIT Certificate</p>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={gitCertificationEnabled}
                    onClick={() => {
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
          </div>
        </div>
      </div>
    </div>
  );
}
