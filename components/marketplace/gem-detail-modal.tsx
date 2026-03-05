"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Gem } from "@/lib/gem-data";
import { gemShapeLabels, gemGradients, gemTypeTaglines } from "@/lib/gem-data";
import { gemPlaceholderByType, USE_MOCK_IMAGES } from "@/lib/placeholder-images";
import { MapPin, Calendar, Gem as GemIcon, Sparkles, Shield, Gift, Star, Truck } from "lucide-react";

interface GemDetailModalProps {
  gem: Gem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border py-2.5 last:border-0">
      <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="text-right text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}

export function GemDetailModal({ gem, open, onOpenChange }: GemDetailModalProps) {
  const [imgError, setImgError] = useState(false);
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");

  if (!gem) return null;

  const isLabradorite = gem.code === "LB-A1092" || gem.code === "LB-E1092";
  const isAmethyst = gem.code === "AM-A790" || gem.code === "AM-B790";
  const showRealImage = !USE_MOCK_IMAGES || isLabradorite || isAmethyst;
  const isSold = gem.status === "sold";
  const isReserved = gem.status === "reserved";
  const placeholderSrc = gemPlaceholderByType[gem.type];
  const spiritualTagline = gemTypeTaglines[gem.type] ?? gem.spiritualTh;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{gem.nameTh}</DialogTitle>
          <DialogDescription>{gem.nameEn}</DialogDescription>
        </DialogHeader>

        {/* Certificate-like header */}
        <div className="border-b-2 border-amber-300/30 pb-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-5 w-5 text-amber-600" />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-champagne-gradient">
              Pradap Prada Certificate of Authenticity
            </p>
          </div>
          <h2 className="mt-2 font-serif text-2xl font-bold text-foreground md:text-3xl text-balance">
            {gem.nameTh}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {gem.nameEn} &middot; <span className="font-mono font-bold">{gem.code}</span>
          </p>
          <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
            {gem.status === "rare" && (
              <Badge className="border-0 bg-amber-500 text-white">Rare</Badge>
            )}
            {isSold && (
              <Badge variant="secondary" className="border-0 bg-foreground text-card">Sold</Badge>
            )}
            {isReserved && (
              <Badge className="border-0 bg-yellow-500 text-white">จอง</Badge>
            )}
            {gem.certified && (
              <Badge className="border-0 bg-amber-500 text-white">{gem.certified}</Badge>
            )}
            <Badge variant="outline">{gemShapeLabels[gem.shape] || gem.shape}</Badge>
            <Badge variant="outline">{gem.carat} ct</Badge>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="mt-2 grid gap-6 md:grid-cols-2">
          {/* Left: Images */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square overflow-hidden rounded-xl border border-border">
              <div className={`absolute inset-0 bg-gradient-to-br ${gemGradients[gem.type]}`} />
              {!showRealImage && (
                <img
                  src={placeholderSrc}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              {showRealImage && (
                <img
                  src={imgError ? placeholderSrc : gem.image}
                  alt={gem.nameTh}
                  onError={() => setImgError(true)}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              {!showRealImage && (
                <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/70" />
              )}
              <div className="absolute bottom-3 left-3 rounded-lg bg-card/90 px-3 py-1.5 backdrop-blur-sm">
                <p className="font-mono text-xs font-bold text-foreground">
                  {gem.code} &middot; {gem.carat} ct
                </p>
              </div>
            </div>

            {/* Spiritual Properties */}
            <div className="rounded-xl border border-purple-200 bg-purple-50/50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Star className="h-4 w-4 text-purple-600" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-purple-700">
                  พลังงานและความเชื่อ (Spiritual Properties)
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-purple-900/80">
                {spiritualTagline}
              </p>
              <p className="mt-2 text-xs italic leading-relaxed text-purple-600/70">
                {gem.spiritualEn}
              </p>
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col gap-6">
            {/* Price */}
            <div className="rounded-xl border-2 border-amber-200/50 bg-amber-50/30 p-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">ราคา</p>
              <p className={`mt-1 ${isSold ? "price-luxury text-4xl text-muted-foreground" : "price-luxury text-5xl"}`}>
                {isSold ? "ขายแล้ว" : isReserved ? `฿${gem.price.toLocaleString()}` : `฿${gem.price.toLocaleString()}`}
              </p>
              {isReserved && <p className="mt-1 text-xs text-yellow-600 font-medium">สินค้าจองแล้ว</p>}
              {!isSold && !isReserved && (
                <p className="mt-1 text-xs text-muted-foreground">
                  รวม VAT แล้ว &middot; สร้อยเงินแท้เพิ่ม ฿390
                </p>
              )}
            </div>

            {/* Shipping info */}
            <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3">
              <Truck className="h-4 w-4 text-muted-foreground shrink-0" />
              <p className="text-xs text-muted-foreground">
                ค่าจัดส่ง ฿45 &middot; สามารถรวมออเดอร์ได้ &middot; ตรวจสอบวิดีโอก่อนเอฟนะครับ
              </p>
            </div>

            {/* Origin Story */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-600" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  ที่มาของหิน (Origin Story)
                </h3>
              </div>
              <div className="rounded-xl border border-border bg-muted/50 p-4">
                <div className="mb-2 flex items-center gap-4 text-sm text-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    {gem.originTh}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    {gem.yearMined}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-foreground">{gem.storyTh}</p>
              </div>
            </div>

            {/* Specifications */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <GemIcon className="h-4 w-4 text-amber-600" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  เอกลักษณ์เฉพาะเม็ด (Gem Identity)
                </h3>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <SpecRow label="Color" value={gem.spec.colorGrade} />
                <SpecRow label="Clarity" value={gem.spec.clarity} />
                <SpecRow label="Cut" value={gem.spec.cut} />
                <SpecRow label="Carat" value={`${gem.spec.carat} ct`} />
                <SpecRow label="Dimensions" value={gem.spec.dimensions} />
              </div>
            </div>

            {/* Inclusions */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-600" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  ตำหนิธรรมชาติ (Natural Inclusions)
                </h3>
              </div>
              <p className="rounded-xl border border-border bg-muted/50 p-4 text-sm leading-relaxed text-foreground">
                {gem.spec.inclusions}
              </p>
              <p className="mt-2 text-[11px] text-muted-foreground">
                *หินเป็นหินธรรมชาติ อาจมีรอยบ้าง รบกวนตรวจสอบวิดีโอให้ละเอียดก่อนเอฟนะครับ
              </p>
            </div>
          </div>
        </div>

        {/* Gift Option + CTA */}
        {!isSold && (
          <div className="sticky bottom-0 -mx-6 -mb-6 mt-4 border-t border-border bg-card p-4 md:p-6">
            {/* Gift option */}
            <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50/50 p-4">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={isGift}
                  onChange={(e) => setIsGift(e.target.checked)}
                  className="h-4 w-4 rounded border-amber-300 text-amber-600 accent-amber-600"
                />
                <Gift className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-medium text-foreground">
                  ส่งเป็นของขวัญ (Gift Wrapping)
                </span>
                <span className="ml-auto text-xs text-muted-foreground">+฿50</span>
              </label>
              {isGift && (
                <div className="mt-3 pl-7">
                  <textarea
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    placeholder="เขียนข้อความถึงผู้รับ... (ไม่บังคับ)"
                    className="w-full rounded-lg border border-amber-200 bg-white p-3 text-sm placeholder:text-muted-foreground focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    rows={2}
                  />
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    จัดส่งในกล่องของขวัญพร้อมการ์ดข้อความ
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <div className="flex-1 text-center sm:text-left">
                <p className="font-serif text-lg font-bold text-foreground">
                  {gem.nameTh}{" "}
                  <span className="font-mono text-sm font-medium text-muted-foreground">{gem.code}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {gem.carat} ct &middot; {gem.originTh}
                </p>
              </div>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                {isReserved ? (
                  <div className="flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-6 py-3 text-sm font-semibold text-white">
                    สินค้าจองแล้ว
                  </div>
                ) : (
                  <Link
                    href={`/customize?gem=${gem.id}`}
                    className="flex items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover:shadow-luxury"
                    onClick={() => onOpenChange(false)}
                  >
                    <Sparkles className="h-4 w-4" />
                    สั่งซื้อ &middot; ฿{(gem.price + (isGift ? 50 : 0)).toLocaleString()}
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
