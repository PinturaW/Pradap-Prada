"use client";

import Image from "next/image";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export function StorySection() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section id="story" className="bg-[#FAFAF8] pt-20 pb-12">
      <div
        ref={ref}
        className={`home-reveal mx-auto max-w-[1100px] px-6 ${isVisible ? "is-visible" : ""}`}
      >
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left: artisan photo */}
          <div className="home-stagger relative aspect-[4/5] overflow-hidden" style={{ transitionDelay: "80ms" }}>
            <Image
              src="/images/story-artisan.png"
              alt="Artisan craftsperson from Trat"
              fill
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Right: brand story */}
          <div className="home-stagger flex flex-col gap-6" style={{ transitionDelay: "180ms" }}>
            <p
              className="text-[11px] font-light tracking-[0.2em] uppercase"
              style={{ color: "#9A9A9A" }}
            >
              OUR STORY
            </p>

            <h2 className="font-serif text-[26px] font-light leading-snug text-[#2A2A2A] md:text-[30px]">
              From the hands of Trat artisans, to yours.
            </h2>

            <p className="text-[14px] font-light leading-[1.9] text-[#9A9A9A]">
              Pradap Prada began by connecting skilled female craftspeople in Trat Province with
              gemstone lovers across Thailand. Every piece is made to order, and every gem is
              traceable.
            </p>
            <p className="text-[14px] font-light leading-[1.9] text-[#9A9A9A]">
              Trat is not only home to over 52 stunning islands — it is the birthplace of the
              world&apos;s finest Siamese rubies. We believe a genuine gemstone with a story is always
              more beautiful.
            </p>

            {/* Craft value badge */}
            <div
              className="inline-flex w-fit items-center rounded-full border px-4 py-2 text-[12px] font-light tracking-[0.05em]"
              style={{ borderColor: "#C4956A", color: "#C4956A" }}
            >
              Made to Order · Traceable Gems
            </div>

            {/* Stats row */}
            <div className="mt-2 grid grid-cols-3 justify-items-center gap-6 border-t border-[#EBEBEB] pt-6">
              {[
                { value: "100%", label: "Handcraft" },
                { value: "100+", label: "Years of Craft" },
                { value: "1960", label: "Since" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="home-stagger flex flex-col items-center text-center"
                  style={{ transitionDelay: `${260 + i * 80}ms` }}
                >
                  <span className="font-serif text-2xl font-light text-[#2A2A2A]">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-[11px] font-light uppercase tracking-[0.15em] text-[#9A9A9A]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
