"use client";

import { Badge } from "@/components/ui/badge";
import type { Gem } from "@/lib/gem-data";
import { gemShapeLabels, gemGradients, gemTypeLabels, gemTypeTaglines } from "@/lib/gem-data";
import {
  gemPlaceholderByType,
  MOCK_IMAGE_ALT,
  USE_MOCK_IMAGES,
} from "@/lib/placeholder-images";
import { Heart, Sparkles } from "lucide-react";
import { useState } from "react";

interface GemCardProps {
  gem: Gem;
  onSelect: (gem: Gem) => void;
}

export function GemCard({ gem, onSelect }: GemCardProps) {
  const isSold = gem.status === "sold";
  const isReserved = gem.status === "reserved";
  const [imgError, setImgError] = useState(false);
  const [hoverError, setHoverError] = useState(false);
  const isLabradorite = gem.code === "LB-A1092" || gem.code === "LB-E1092";
  const isAmethyst = gem.code === "AM-A790" || gem.code === "AM-B790";
  const showRealImage = !USE_MOCK_IMAGES || isLabradorite || isAmethyst;
  const stoneName =
    gemTypeLabels[gem.type]?.match(/\(([^)]+)\)/)?.[1] ??
    gem.nameEn.split(" ")[0];
  const stoneId =
    gem.nameEn.match(/#\w+/)?.[0] ??
    gem.code.split("-")[1]?.replace(/\d/g, "") ??
    "";
  const placeholderSrc = gemPlaceholderByType[gem.type];
  const spiritualHint = gemTypeTaglines[gem.type] ?? gem.spiritualTh;
  const lifestyleSrc =
    isLabradorite
      ? "/images/labradorite-hover.png"
      : isAmethyst
      ? "/images/amethyst-hover.png"
      : USE_MOCK_IMAGES
      ? MOCK_IMAGE_ALT
      : gem.id % 2 === 0
      ? "/images/placeholders/lifestyle-hand.svg"
      : "/images/placeholders/lifestyle-neck.svg";

  return (
    <button
      onClick={() => onSelect(gem)}
      disabled={isSold}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-white text-left transition-all duration-500 hover:-translate-y-2 hover:shadow-luxury-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-70"
    >
      {/* Image */}
      <div className="relative h-[250px] overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${gemGradients[gem.type]}`} />
        {!imgError && !showRealImage && <div className="absolute inset-0 animate-shimmer" />}
        {!showRealImage && (
          <img
            src={placeholderSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        {showRealImage && (
          <>
            <img
              src={imgError ? placeholderSrc : gem.image}
              alt={gem.nameTh}
              onError={() => setImgError(true)}
              className={`absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity duration-500 ${
                hoverError ? "" : "group-hover:opacity-0"
              } ${isLabradorite || isAmethyst ? "scale-[1.02]" : ""}`}
            />
            {!hoverError && (
              <img
                src={lifestyleSrc}
                alt=""
                onError={() => setHoverError(true)}
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            )}
          </>
        )}
        {!showRealImage && (
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/60" />
        )}
        {imgError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white/60">
              <Sparkles className="mx-auto h-10 w-10" />
              <p className="mt-2 text-xs font-medium tracking-wider uppercase">{gem.code}</p>
            </div>
          </div>
        )}

        {/* Code badge */}
        <div className="absolute left-3 top-3 rounded-lg bg-black/60 px-2.5 py-1 backdrop-blur-md">
          <span className="font-mono text-[11px] font-bold tracking-wider text-white">{gem.code}</span>
        </div>

        {/* Status badges */}
        {gem.status === "rare" && (
          <Badge className="absolute right-3 top-3 border-0 bg-amber-500/90 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">Rare</Badge>
        )}
        {isSold && (
          <Badge variant="secondary" className="absolute right-3 top-3 border-0 bg-foreground/80 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">Sold</Badge>
        )}
        {isReserved && (
          <Badge className="absolute right-3 top-3 border-0 bg-yellow-500/90 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">จอง</Badge>
        )}

        {gem.certified && (
          <div className="absolute bottom-3 left-3 rounded-lg bg-amber-500/90 px-2.5 py-1 backdrop-blur-sm">
            <span className="text-[9px] font-bold uppercase tracking-wider text-white">{gem.certified}</span>
          </div>
        )}

        <div className="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
          <Heart className="h-4 w-4 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-serif text-xl font-semibold leading-tight text-foreground sm:text-2xl">
          {stoneName} {stoneId}
        </h3>
        <p className="mt-1 text-base font-medium text-foreground/70">
          {gem.nameTh.replace(/^จี้\s*/, "")} &middot; {gem.code}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-muted px-3 py-1 text-base font-medium text-foreground">{gem.carat} ct</span>
          <span className="rounded-md bg-muted px-3 py-1 text-base font-medium text-foreground">{gemShapeLabels[gem.shape]?.split(" (")[0] || gem.shape}</span>
        </div>

        {/* Spiritual hint */}
        <p className="mt-3 line-clamp-2 text-base font-medium leading-relaxed text-foreground/70 italic">
          {spiritualHint}
        </p>

        <p className="mt-2 text-base font-medium text-foreground/70">{gem.originTh}</p>

        <div className="mt-auto pt-4">
          {isSold ? (
            <span className="text-base font-medium text-muted-foreground line-through">ขายแล้ว</span>
          ) : isReserved ? (
            <div className="flex items-baseline gap-2">
              <span className="price-luxury text-3xl sm:text-4xl">฿{gem.price.toLocaleString()}</span>
              <span className="text-sm text-yellow-600 font-medium">จอง</span>
            </div>
          ) : (
            <span className="price-luxury text-3xl sm:text-4xl">฿{gem.price.toLocaleString()}</span>
          )}
        </div>
      </div>
    </button>
  );
}
