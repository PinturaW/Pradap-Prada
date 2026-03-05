"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Share2, RotateCcw } from "lucide-react";
import { gemGradients, gemPowerData, gemTypeDisplayData } from "@/lib/gem-data";
import { gemPlaceholderByType } from "@/lib/placeholder-images";
import { gemPersonality } from "@/lib/quiz-data";
import type { QuizResult } from "@/lib/quiz-data";

interface ResultSlideProps {
  result: QuizResult;
  onRestart: () => void;
}

export function ResultSlide({ result, onRestart }: ResultSlideProps) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  const { gemType } = result;
  const personality = gemPersonality[gemType];
  const display = gemTypeDisplayData[gemType];
  const gemTagline = gemPowerData[gemType]?.powerTagline ?? personality?.soul;
  const gemLabel = display?.nameEn ?? gemType;
  const gemImage = gemPowerData[gemType]?.unsplashUrl ?? gemPlaceholderByType[gemType];

  const shareUrl = `/quiz/result?gem=${gemType}`;

  return (
    <div className="min-h-screen px-6 pb-24 pt-16">
      <div className="mx-auto max-w-2xl">
        {/* Result header */}
        <div className="text-center">
          <p
            className="text-champagne-gradient animate-fade-in-up text-[11px] font-bold uppercase tracking-[0.45em] opacity-0"
            style={{ animationDelay: "0ms" }}
          >
            Your gemstone is
          </p>

          {/* Gem orb reveal */}
          <div
            className={`mx-auto mt-8 flex h-36 w-36 items-center justify-center rounded-full transition-all duration-[800ms] ease-out ${
              gemGradients[gemType]
            } shadow-luxury-lg ${
              revealed
                ? "scale-100 opacity-100 blur-0"
                : "scale-0 opacity-0 blur-xl"
            } relative`}
          >
            <Image
              src={gemImage}
              alt={gemLabel}
              fill
              className="rounded-full object-cover"
            />
            {/* Ping rings */}
            {revealed &&
              [0, 300, 600].map((delay) => (
                <span
                  key={delay}
                  className="absolute inline-flex h-full w-full rounded-full border border-primary/20 animate-ping"
                  style={{ animationDuration: "2s", animationDelay: `${delay}ms` }}
                />
              ))}
          </div>

          {/* Gem name */}
          <div
            className="mt-6 animate-fade-in-up opacity-0"
            style={{ animationDelay: "500ms" }}
          >
            <h2 className="font-serif text-4xl font-semibold text-foreground md:text-5xl">
              {gemLabel}
            </h2>
          </div>

          {/* Personality */}
          {personality && (
            <div
              className="mt-6 animate-fade-in-up opacity-0"
              style={{ animationDelay: "650ms" }}
            >
              <p className="text-champagne-gradient text-sm font-semibold uppercase tracking-[0.3em]">
                {personality.title}
              </p>
              <p className="mt-3 text-sm italic leading-relaxed text-foreground/70">
                &ldquo;{gemTagline}&rdquo;
              </p>
              <p className="mt-4 text-xs leading-loose text-foreground/55">
                {personality.detail}
              </p>
            </div>
          )}
        </div>

        <div
          className="mt-12 animate-fade-in-up rounded-2xl border border-border bg-white/80 p-5 text-center opacity-0"
          style={{ animationDelay: "850ms" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground/70">
            Next Step
          </p>
          <p className="mt-2 text-sm text-foreground/70">
            Choose your jewelry type and customize this gemstone into your own signature piece.
          </p>
        </div>

        {/* CTAs */}
        <div
          className="mt-10 animate-fade-in-up space-y-3 opacity-0"
          style={{ animationDelay: "1050ms" }}
        >
          <Link
            href="/customize"
            className="group flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary font-semibold text-primary-foreground transition-all duration-300 hover:opacity-90 hover:shadow-luxury"
          >
            Choose Jewelry
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href={shareUrl}
              className="flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-white text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:shadow-luxury-sm"
            >
              <Share2 className="h-4 w-4" />
              Share Result
            </Link>
            <button
              onClick={onRestart}
              className="flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-white text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:shadow-luxury-sm"
            >
              <RotateCcw className="h-4 w-4" />
              Restart Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
