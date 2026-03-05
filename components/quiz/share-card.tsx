"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Download, Loader2 } from "lucide-react";
import { gemAccentColors, gemPowerData, gemTypeDisplayData } from "@/lib/gem-data";
import { gemPlaceholderByType } from "@/lib/placeholder-images";
import { gemPersonality } from "@/lib/quiz-data";
import type { GemType } from "@/lib/gem-data";
import { Navbar } from "@/components/navbar";

interface ShareCardProps {
  gemType: GemType;
}

export function ShareCard({ gemType }: ShareCardProps) {
  const [saving, setSaving] = useState(false);
  const personality = gemPersonality[gemType];
  const display = gemTypeDisplayData[gemType];
  const gemLabelEn = (display?.nameEn ?? gemType).toUpperCase();
  const glowColor = gemAccentColors[gemType] ?? "#B08D6A";
  const teaserDescription =
    personality?.detail?.split(".")[0]?.trim() ??
    personality?.soul ??
    "A refined energy that blends calm confidence with quiet magnetism.";
  const gemImage = gemPowerData[gemType]?.unsplashUrl ?? gemPlaceholderByType[gemType];

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    const apiUrl = `/api/share-card?type=${gemType}`;
    try {
      // Fetch PNG generated server-side — works on Vercel, no CORS issues
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Image generation failed");
      const blob = await res.blob();

      const file = new File([blob], "gem-personality.png", { type: "image/png" });

      // Mobile: share directly (opens share sheet → Instagram Stories etc.)
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: `My gemstone is ${gemLabelEn}` });
        return;
      }

      // Desktop / fallback: auto-download
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `gem-${gemType}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      if (e instanceof Error && e.name !== "AbortError") {
        console.error("Share failed:", e);
        const a = document.createElement("a");
        a.href = apiUrl;
        a.download = `gem-${gemType}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF8F2]">
      <Navbar />
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#FAF8F2] px-6 py-12 pt-[96px]">

      {/* Share card preview — 9:16 */}
      <div
        id="share-card"
        className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-[#B08D6A]/35 bg-[#FAF8F2] shadow-luxury-lg"
        style={{ aspectRatio: "9 / 16" }}
      >
        <div className="absolute inset-0 bg-[#FAF8F2]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(176,141,106,0.12),transparent_34%),radial-gradient(circle_at_80%_90%,rgba(176,141,106,0.08),transparent_42%)]" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-between px-7 py-8 text-center">

          {/* Top branding */}
          <div className="pt-1">
            <p className="font-serif text-[11px] font-semibold uppercase tracking-[0.34em] text-[#B08D6A]">
              ◆ PRADAP PRADA ◆
            </p>
            <p className="mt-2 text-[9px] font-light uppercase tracking-[0.34em] text-[#B08D6A]">
              GEM PERSONALITY
            </p>
          </div>

          {/* Hero + text */}
          <div className="flex flex-col items-center gap-5">
            <div className="relative flex h-[305px] w-[305px] items-center justify-center">
              <div
                className="absolute h-[220px] w-[220px] rounded-full blur-3xl"
                style={{ backgroundColor: `${glowColor}66` }}
              />
              <div className="absolute h-[280px] w-[280px] rounded-full border border-[rgba(176,141,106,0.3)]" />
              <div className="absolute h-[248px] w-[248px] rounded-full border border-[rgba(176,141,106,0.3)]" />
              <div className="absolute h-[292px] w-[2px] bg-[rgba(176,141,106,0.3)]" />
              <div className="absolute h-[2px] w-[292px] bg-[rgba(176,141,106,0.3)]" />
              <div className="absolute h-[278px] w-[278px] rotate-45 border border-[rgba(176,141,106,0.3)]" />
              <div className="absolute h-[236px] w-[236px] rotate-45 border border-[rgba(176,141,106,0.3)]" />
              <div className="relative h-[190px] w-[190px] overflow-hidden rounded-full border border-[#B08D6A] p-[5px]">
                <div className="h-full w-full overflow-hidden rounded-full border border-[#B08D6A]/70">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={gemImage} alt={gemLabelEn} className="h-full w-full object-cover" />
                </div>
              </div>
            </div>

            <div className="-mt-4">
              <p className="text-[10px] font-light uppercase tracking-[0.36em] text-[#B08D6A]">
                Your Gemstone
              </p>
              <h2 className="mt-2 font-serif text-[34px] font-semibold leading-[0.95] tracking-[0.03em] text-[#2C2C2C]">
                {gemLabelEn}
              </h2>
              <div className="mx-auto mt-4 h-px w-[180px] bg-[#B08D6A]/85" />
            </div>

            {personality && (
              <div className="mt-1 w-full rounded-2xl border border-[#B08D6A]/35 bg-[rgba(0,0,0,0.06)] px-5 py-4 shadow-luxury-sm">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#B08D6A]">
                  {personality.title.toUpperCase()}
                </p>
                <p
                  className="mt-3 text-[12px] italic leading-[1.6] text-[#2C2C2C]"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {teaserDescription}
                </p>
              </div>
            )}
          </div>

          <div className="flex w-full flex-col items-center gap-4">
            <p className="text-[9px] font-light uppercase tracking-[0.3em] text-[#2C2C2C]/65">
              PRADAPPRADA.COM
            </p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="relative z-10 mt-8 w-full max-w-sm space-y-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#2C2C2C] px-7 text-[15px] font-medium tracking-[0.02em] text-[#FAF8F2] transition-all duration-300 hover:bg-[#1F1F1F] hover:shadow-luxury disabled:opacity-70"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {saving ? "Generating image..." : "Save Image & Share"}
        </button>
        <Link
          href="/customize"
          className="group flex h-14 w-full items-center justify-center gap-2 rounded-full border border-[#B08D6A]/45 bg-transparent px-7 text-[15px] font-medium tracking-[0.02em] text-[#7A6248] transition-all duration-300 hover:border-[#B08D6A]/65 hover:bg-[#B08D6A]/10 hover:text-[#2C2C2C]"
        >
          Choose Jewelry
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      </div>
    </main>
  );
}
