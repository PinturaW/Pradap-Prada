"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export function FeatureBar() {
  const { ref, isVisible } = useScrollAnimation(0.18);

  const features = [
    {
      icon: (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
          <path d="M16 4 C12 8 8 10 4 10 C4 22 10 28 16 30 C22 28 28 22 28 10 C24 10 20 8 16 4Z" />
          <path d="M12 18 L15 21 L21 14" />
        </svg>
      ),
      label: "HANDCRAFTED",
      body: "Crafted by artisans in Trat. Every piece made to order.",
    },
    {
      icon: (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
          <rect x="6" y="5" width="20" height="18" rx="2" />
          <path d="M11 11 H21" />
          <path d="M11 15 H18" />
          <circle cx="22" cy="21" r="3" />
          <path d="M22 24 L20.5 27 L22 26 L23.5 27 L22 24" />
        </svg>
      ),
      label: "AUTHENTICATED",
      body: "Documented gem origin. Independent lab testing on request.",
    },
    {
      icon: (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
          <circle cx="16" cy="14" r="7" />
          <path d="M9 14 H4 M23 14 H28 M16 7 V2 M16 21 V28 L13 25 M16 28 L19 25" />
        </svg>
      ),
      label: "ARTISAN QUALITY",
      body: "Carefully finished by skilled hands for lasting beauty and quality.",
    },
    {
      icon: (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
          <path d="M16 6 C10 6 6 10 6 15 C6 22 16 28 16 28 C16 28 26 22 26 15 C26 10 22 6 16 6Z" />
          <circle cx="16" cy="15" r="4" />
        </svg>
      ),
      label: "MADE FOR YOU",
      body: "No two pieces are alike. Every piece is uniquely yours.",
    },
  ];

  return (
    <section className="border-y border-[#EBEBEB] bg-white py-20">
      <div
        ref={ref}
        className={`home-reveal mx-auto max-w-[1100px] px-6 ${isVisible ? "is-visible" : ""}`}
      >
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={f.label}
              className="home-stagger flex flex-col items-center text-center"
              style={{ transitionDelay: `${80 + i * 90}ms` }}
            >
              <div className="text-[#9A9A9A]">{f.icon}</div>
              <p className="mt-4 text-[11px] font-light tracking-[0.15em] uppercase text-[#2A2A2A]">
                {f.label}
              </p>
              <p className="mt-2 text-[13px] font-light leading-relaxed text-[#9A9A9A]">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
