"use client";

import { Suspense, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Gem, Handshake, Package, ShieldCheck } from "lucide-react";
import {
  fixedDesignByType,
  fixedProductDetailByType,
  categoryAdjustments,
  gemBasePrices,
} from "@/lib/customizer-data";
import { gemPowerData, gemTypeDisplayData, type GemType } from "@/lib/gem-data";
import { Navbar } from "@/components/navbar";
import { GemstoneSelector } from "@/components/customize/gemstone-selector";
import { GemInfoModal } from "@/components/customize/gem-info-modal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ringSizes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];

function RingCustomizerContent() {
  const searchParams = useSearchParams();
  const preselectedGemType = searchParams.get("gem");
  const initialGemType = useMemo(() => {
    if (!preselectedGemType) return null;
    if (preselectedGemType in gemPowerData) return preselectedGemType as GemType;
    return null;
  }, [preselectedGemType]);

  const [selectedGemType, setSelectedGemType] = useState<GemType | null>(initialGemType);
  const [previewGemType, setPreviewGemType] = useState<GemType | null>(null);
  const [selectedRingSize, setSelectedRingSize] = useState<number | null>(null);
  const [flowerOpen, setFlowerOpen] = useState(false);
  const fixedDesign = fixedDesignByType.ring;
  const productDetail = fixedProductDetailByType.ring;

  const previewPower = previewGemType ? gemPowerData[previewGemType] : null;
  const previewDisplay = previewGemType ? gemTypeDisplayData[previewGemType] : null;
  const selectedGemDisplay = selectedGemType ? gemTypeDisplayData[selectedGemType] : null;

  const buyNowHref =
    selectedGemType && selectedRingSize
      ? `/checkout?type=ring&gemType=${selectedGemType}&ringSize=${selectedRingSize}`
      : "/checkout?type=ring";

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {previewGemType && previewPower && (
        <GemInfoModal
          gemType={previewGemType}
          power={previewPower}
          display={previewDisplay ?? undefined}
          onClose={() => setPreviewGemType(null)}
          onSelect={() => {
            setSelectedGemType(previewGemType);
            setPreviewGemType(null);
          }}
          selectLabel="Select This Gem"
        />
      )}

      <div className="mx-auto max-w-[1200px] px-6 pt-[98px] pb-16">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
          <div>
            <div className="group md:pl-10">
              <Image
                src={fixedDesign.imageUrl}
                alt={productDetail.productName}
                width={700}
                height={560}
                style={{
                  width: "100%",
                  maxWidth: "620px",
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                  margin: "0",
                  background: "transparent",
                  transition: "transform 0.4s ease, filter 0.4s ease",
                }}
                className="[filter:drop-shadow(0_8px_32px_rgba(0,0,0,0.10))] transition-[transform,filter] duration-[400ms] ease-out group-hover:-translate-y-[6px] group-hover:[filter:drop-shadow(0_16px_40px_rgba(0,0,0,0.15))]"
                priority
              />
            </div>

            {/* Editorial description */}
            <div style={{ padding: "32px 40px" }}>
              <div className="flex items-center" style={{ marginBottom: 12 }}>
                <span style={{ fontSize: 11, letterSpacing: 3, color: "#B08D6A", textTransform: "uppercase", fontWeight: 500 }}>THE SECRET OF FLOWERS</span>
                <span style={{ display: "inline-block", width: 40, height: 1, background: "#B08D6A", marginLeft: 10 }} />
              </div>
              <p className="font-serif" style={{ fontSize: 32, color: "#1a1a1a", fontWeight: 400, letterSpacing: 0.5, marginBottom: 8 }}>{fixedDesign.labelEn}</p>
              <p style={{ fontStyle: "italic", color: "#888888", fontSize: 15, lineHeight: 1.8, maxWidth: 460, marginBottom: 24 }}>{fixedDesign.subtitle}</p>
              <hr style={{ border: "none", borderTop: "1px solid #E8DDD0", width: 60, margin: "20px 0" }} />
              <div className="flex flex-wrap items-center gap-5" style={{ fontSize: 12, color: "#888888" }}>
                <span className="inline-flex items-center gap-1.5">
                  <Handshake className="h-3.5 w-3.5 text-[#B08D6A]" /> Handcrafted in Trat
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Gem className="h-3.5 w-3.5 text-[#B08D6A]" /> Natural Gemstone
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Package className="h-3.5 w-3.5 text-[#B08D6A]" /> Made to Order
                </span>
              </div>
              <div style={{ marginTop: 20 }}>
                <button type="button" onClick={() => setFlowerOpen(!flowerOpen)} style={{ fontSize: 12, color: "#B08D6A", cursor: "pointer", letterSpacing: 1, background: "none", border: "none", padding: 0 }}>
                  The Flower Behind This Piece &nbsp;{flowerOpen ? "—" : "+"}
                </button>
                <div style={{ maxHeight: flowerOpen ? 300 : 0, overflow: "hidden", transition: "max-height 300ms ease" }}>
                  <p style={{ fontSize: 13, color: "#666666", lineHeight: 1.9, fontStyle: "italic", paddingTop: 12, maxWidth: 420 }}>
                    The lotus rises pure from muddy water every morning. In Thailand, it is the flower of purity and spiritual awakening — blooming beautifully no matter the depth from which it grows.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[34px] font-light text-[#2A2A2A]">{productDetail.productName}</p>
            <p className="mt-2 text-[13px] font-light text-[#9A9A9A]">{productDetail.shippingNote}</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-[12px] font-light text-[#888888]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#B08D6A]" /> Genuine gemstone guaranteed — full refund if found to be synthetic
            </p>

            <div className="mt-6 border border-[#EBEBEB] p-4">
              <p className="text-[12px] font-light tracking-[0.14em] uppercase text-[#9A9A9A]">Gemstone</p>
              <p className="mt-2 text-[13px] font-light text-[#9A9A9A]">
                Click a gem image to preview details, then confirm selection.
              </p>
              <div className="mt-4 max-h-[340px] overflow-y-auto pr-1">
                <GemstoneSelector
                  selectedGemType={selectedGemType}
                  onChange={setSelectedGemType}
                  onPreview={setPreviewGemType}
                />
              </div>
            </div>

            <div className="mt-4 border border-[#EBEBEB] p-4">
              <p className="text-[12px] font-light tracking-[0.14em] uppercase text-[#9A9A9A]">Ring Size</p>
              <p className="mt-2 text-[13px] font-light text-[#9A9A9A]">Choose your preferred size before adding to cart.</p>
              <div className="mt-4 grid grid-cols-4 gap-2.5 md:grid-cols-7">
                {ringSizes.map((size) => {
                  const isSelected = selectedRingSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedRingSize(size)}
                      className={`h-10 rounded-full border text-[12px] font-light transition-all ${
                        isSelected
                          ? "border-[#C4956A] bg-[#F8F2ED] text-[#2A2A2A]"
                          : "border-[#EBEBEB] text-[#9A9A9A] hover:border-[#C4956A]/60 hover:text-[#2A2A2A]"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedGemType && (
              <div className="mt-5 border border-[#EBEBEB] p-4">
                <div className="flex items-center justify-between text-[13px] font-light">
                  <span className="text-[#9A9A9A]">Selected gem</span>
                  <span className="text-[#2A2A2A]">{selectedGemDisplay?.nameEn ?? selectedGemType}</span>
                </div>
                {selectedRingSize && (
                  <div className="mt-2 flex items-center justify-between text-[13px] font-light">
                    <span className="text-[#9A9A9A]">Ring size</span>
                    <span className="text-[#2A2A2A]">{selectedRingSize}</span>
                  </div>
                )}
                <div className="mt-2 flex items-center justify-between text-[13px] font-light">
                  <span className="text-[#9A9A9A]">Estimated total</span>
                  <span className="text-[#2A2A2A]">
                    ฿{((gemBasePrices[selectedGemType] ?? 0) + categoryAdjustments.ring).toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            <div className="mt-5 grid grid-cols-2 gap-3">
              {selectedGemType && selectedRingSize ? (
                <Link
                  href={`/cart?type=ring&gemType=${selectedGemType}&ringSize=${selectedRingSize}`}
                  className="flex h-12 items-center justify-center rounded-full bg-[#E8DFD3] text-[14px] font-light text-[#6B6358] transition-colors hover:bg-[#DED3C6]"
                >
                  Add to cart
                </Link>
              ) : (
                <button
                  disabled
                  className="h-12 cursor-not-allowed rounded-full bg-[#ECE7DE] text-[14px] font-light text-[#B5AC9F]"
                >
                  Add to cart
                </button>
              )}
              {selectedGemType && selectedRingSize ? (
                <Link
                  href={buyNowHref}
                  className="flex h-12 items-center justify-center rounded-full border border-[#E0D8CC] text-[14px] font-light text-[#8A7F70] transition-colors hover:border-[#C7B9A6] hover:text-[#6F6557]"
                >
                  Buy it now
                </Link>
              ) : (
                <button
                  disabled
                  className="h-12 cursor-not-allowed rounded-full border border-[#EEE8DE] text-[14px] font-light text-[#C4BDB0]"
                >
                  Buy it now
                </button>
              )}
            </div>

            <Accordion type="multiple" className="mt-4 border-t border-[#EBEBEB]">
              <AccordionItem value="details" className="border-b border-[#EBEBEB]">
                <AccordionTrigger className="py-4 text-[13px] font-light tracking-[0.08em] text-[#6F6F6F] uppercase hover:no-underline">
                  Details
                </AccordionTrigger>
                <AccordionContent className="text-[13px] font-light leading-relaxed text-[#9A9A9A]">
                  {productDetail.details}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="description" className="border-b border-[#EBEBEB]">
                <AccordionTrigger className="py-4 text-[13px] font-light tracking-[0.08em] text-[#6F6F6F] uppercase hover:no-underline">
                  Description
                </AccordionTrigger>
                <AccordionContent className="text-[13px] font-light leading-relaxed text-[#9A9A9A]">
                  {productDetail.description}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="materials" className="border-b border-[#EBEBEB]">
                <AccordionTrigger className="py-4 text-[13px] font-light tracking-[0.08em] text-[#6F6F6F] uppercase hover:no-underline">
                  Materials
                </AccordionTrigger>
                <AccordionContent className="text-[13px] font-light leading-relaxed text-[#9A9A9A]">
                  {productDetail.materials}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function RingCustomizerPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-white" />}>
      <RingCustomizerContent />
    </Suspense>
  );
}
