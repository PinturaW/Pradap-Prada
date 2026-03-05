"use client";

import Link from "next/link";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export function QuizCtaBanner() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section className="bg-[#FAFAF8] py-20">
      <div
        ref={ref}
        className={`home-reveal mx-auto max-w-[1100px] px-6 text-center ${isVisible ? "is-visible" : ""}`}
      >
        <p className="home-stagger font-serif text-3xl italic text-[#9A9A9A] md:text-4xl" style={{ transitionDelay: "60ms" }}>
          Find Your Signature Gem
        </p>
        <p className="home-stagger mx-auto mt-4 max-w-md text-[13px] font-light leading-relaxed text-[#B0A89A]" style={{ transitionDelay: "140ms" }}>
          Answer 10 short questions and discover the gemstone that resonates
          with your energy, personality, and spirit.
        </p>
        <Link
          href="/quiz"
          className="home-stagger mt-8 inline-flex items-center gap-2 rounded-full border border-[#2A2A2A] px-8 py-3.5 text-[13px] font-light tracking-[0.08em] text-[#2A2A2A] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2A2A2A] hover:text-white"
          style={{ transitionDelay: "220ms" }}
        >
          Personalize Your Gem →
        </Link>
      </div>
    </section>
  );
}
