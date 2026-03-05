"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export function QuizCtaSection() {
  const { ref, isVisible } = useScrollAnimation(0.15);

  return (
    <section className="bg-stone-50 py-28 md:py-36">
      <div
        ref={ref}
        className="mx-auto max-w-[1400px] px-6 text-center"
      >
        {/* Icon */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10">
            <Sparkles className="h-7 w-7 text-amber-400" />
          </div>
        </div>

        {/* Label */}
        <p
          className={`text-champagne-gradient text-xs font-bold uppercase tracking-[0.45em] transition-all duration-700 delay-100 md:text-sm ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          ค้นหาพลอยของคุณ
        </p>

        {/* Headline */}
        <h2
          className={`mt-5 font-serif text-3xl font-semibold leading-tight text-foreground transition-all duration-700 delay-200 md:text-5xl ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          ทุกคนมีอัญมณี
          <br className="md:hidden" />
          {" "}ที่โหยหาตัวเอง
        </h2>

        {/* Body */}
        <p
          className={`mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground transition-all duration-700 delay-300 md:text-lg ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          ตอบคำถามสั้นๆ แล้วค้นพบพลอยที่ตรงกับ
          เรื่องราว พลังงานและจิตวิญญาณของคุณ
        </p>

        {/* CTA */}
        <div
          className={`mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center transition-all duration-700 delay-400 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <Link
            href="/quiz"
            className="group inline-flex h-14 items-center gap-3 rounded-xl bg-foreground px-10 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-luxury-lg"
          >
            เริ่มค้นหาพลอยของฉัน
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/gems"
            className="inline-flex h-14 items-center gap-2 rounded-xl border border-border px-8 text-base font-medium text-foreground/60 transition-all duration-300 hover:border-border/60 hover:text-foreground"
          >
            ดูพลอยทั้งหมด
          </Link>
        </div>

        {/* Decorative */}
        <div
          className={`mt-14 transition-all duration-700 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <span className="text-champagne-gradient text-sm font-light tracking-[0.5em]">
            {"— "}&#9670;{" —"}
          </span>
        </div>
      </div>
    </section>
  );
}
