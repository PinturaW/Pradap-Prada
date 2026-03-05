"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { USE_MOCK_IMAGES } from "@/lib/placeholder-images";

const collections = [
  {
    name: "ทับทิมสยาม",
    nameEn: "Siam Ruby",
    priceRange: "เริ่มต้น ฿1,900",
    image: "/images/red.png",
    gradient: "from-red-950/80 via-red-800/60 to-rose-900/70",
  },
  {
    name: "ไพลิน",
    nameEn: "Blue Sapphire",
    priceRange: "เริ่มต้น ฿2,900",
    image: "/images/blue.png",
    gradient: "from-blue-950/80 via-blue-800/60 to-indigo-900/70",
  },
  {
    name: "บุษราคัม",
    nameEn: "Yellow Sapphire",
    priceRange: "เริ่มต้น ฿1,800",
    image: "/images/yellow.png",
    gradient: "from-amber-900/80 via-yellow-700/60 to-orange-800/70",
  },
];

export function ProductShowcase() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  return (
    <section id="products" className="py-28 md:py-36">
      <div ref={ref} className="mx-auto max-w-[1400px] px-6">
        {/* Section header */}
        <div
          className={`text-center transition-all duration-700 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <p className="text-champagne-gradient text-lg font-semibold uppercase tracking-[0.4em] md:text-2xl">
            Featured Collections
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            ผลงานชิ้นเอกจากช่างฝีมือไทย ผสานอัญมณีแท้กับการออกแบบร่วมสมัย
          </p>
        </div>

        {/* 3-Column Featured Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {collections.map((item, i) => (
            <Link
              key={item.name}
              href="/gems"
              className={`group relative aspect-[4/3.5] overflow-hidden rounded-2xl transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              {/* Gradient base (always visible as fallback) */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  USE_MOCK_IMAGES
                    ? "from-white via-slate-50 to-stone-100"
                    : item.gradient
                }`}
              />
              {!imgErrors[i] && (
                <div className="absolute inset-0 p-20 md:p-24">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    onError={() => setImgErrors((prev) => ({ ...prev, [i]: true }))}
                  />
                </div>
              )}
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />

              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="font-serif text-2xl font-light text-primary-foreground md:text-3xl">
                  {item.name}
                </h3>
                <p className="mt-1 text-sm tracking-wider text-primary-foreground/70">
                  {item.nameEn}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Trust badges */}
        <div
          className={`mt-20 flex flex-wrap items-center justify-center gap-8 transition-all duration-700 delay-500 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          {["100% Authentic", "Free Insured Shipping"].map((badge) => (
            <div key={badge} className="flex items-center gap-2 text-muted-foreground">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-base font-medium uppercase tracking-[0.2em] md:text-lg">
                {badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
