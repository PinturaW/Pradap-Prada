"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  gemPowerData,
  gemTypeDisplayData,
  type GemPowerCategory,
  type GemType,
} from "@/lib/gem-data";
import { categoryAdjustments, gemBasePrices, gemPowerOrderByCategory } from "@/lib/customizer-data";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { GemInfoModal } from "@/components/customize/gem-info-modal";

// ─── Shop by Category data ────────────────────────────────────────
const jewelryTabs = [
  { id: "bracelet", label: "Bracelets",       href: "/customize/bracelet" },
  { id: "ring",     label: "Rings",           href: "/customize/ring" },
  { id: "necklace", label: "Necklaces",       href: "/customize/necklace" },
  { id: "earring",  label: "Earrings",        href: "/customize/earring" },
];

const productsByTab: Record<string, { name: string; img: string }[]> = {
  bracelet: [
    { name: "Kritsana Bangle", img: "/images/collection/kritsana-bangle.png" },
  ],
  ring: [
    { name: "Lotus Bloom Ring", img: "/images/collection/lotus-bloom-ring.png" },
  ],
  necklace: [
    { name: "Ylang Pendant Necklace", img: "/images/collection/ylang-pendant-necklace.png" },
  ],
  earring: [
    { name: "Lamduan Drop Earrings", img: "/images/collection/lamduan-drop-earrings.png" },
  ],
};

const minGemPrice = Math.min(...Object.values(gemBasePrices));

const priceLabelByTab: Record<string, string> = {
  bracelet: `Starting from ฿${(minGemPrice + categoryAdjustments.bracelet).toLocaleString()}`,
  ring: `Starting from ฿${(minGemPrice + categoryAdjustments.ring).toLocaleString()}`,
  necklace: `Starting from ฿${(minGemPrice + categoryAdjustments.necklace).toLocaleString()}`,
  earring: `Starting from ฿${(minGemPrice + categoryAdjustments.earring).toLocaleString()}`,
};

const flowerStories = [
  {
    flowerTag: "KRITSANA",
    jewelry: "Kritsana Bangle",
    image: "/images/collection/kritsana-bangle.png",
    story:
      "Trat's provincial flower, the Kritsana is one of Thailand's rarest blooms. Like the women who wear it — depth takes time. Rarity is earned. And what's precious is never ordinary.",
    href: "/customize/bracelet",
  },
  {
    flowerTag: "LOTUS",
    jewelry: "Lotus Bloom Ring",
    image: "/images/collection/lotus-bloom-ring.png",
    story:
      "The lotus rises from muddy water every morning — pristine, unhurried, untouched. In Thailand, it is the flower of the soul. For women who find clarity in stillness, and beauty in becoming.",
    href: "/customize/ring",
  },
  {
    flowerTag: "YLANG YLANG",
    jewelry: "Ylang Pendant Necklace",
    image: "/images/collection/ylang-pendant-necklace.png",
    story:
      "The flower of flowers. Ylang Ylang has perfumed the world's most iconic fragrances for centuries. For women who leave an impression long after they've left the room.",
    href: "/customize/necklace",
  },
  {
    flowerTag: "LAMDUAN",
    jewelry: "Lamduan Drop Earrings",
    image: "/images/collection/lamduan-drop-earrings.png",
    story:
      "The Lamduan blooms quietly at dusk, releasing its sweetness only when the world slows down. A flower for women of grace — noticed not by noise, but by presence.",
    href: "/customize/earring",
  },
] as const;

// ─── Gem Power data ───────────────────────────────────────────────
const powerTabs: { id: GemPowerCategory; label: string; symbol: string }[] = [
  { id: "love",    label: "Love",             symbol: "♡" },
  { id: "luck",    label: "Luck & Wealth",    symbol: "✦" },
  { id: "wisdom",  label: "Wisdom & Success", symbol: "★" },
  { id: "balance", label: "Balance", symbol: "◎" },
  { id: "protection", label: "Protection", symbol: "◈" },
];

function getGemsByPower(category: GemPowerCategory): GemType[] {
  const ordered = gemPowerOrderByCategory[category] ?? [];
  return ordered.filter((type) => !!gemPowerData[type]);
}

export function CategoryGemSection() {
  const router = useRouter();
  const { ref, isVisible } = useScrollAnimation(0.12);
  const [activeJewelry, setActiveJewelry] = useState("bracelet");
  const [activePower, setActivePower] = useState<GemPowerCategory>("love");
  const [modalGem, setModalGem] = useState<GemType | null>(null);
  const [activeFlowerIndex, setActiveFlowerIndex] = useState(0);
  const [revealedFlowerCards, setRevealedFlowerCards] = useState<number[]>([0]);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const [isCarouselDragging, setIsCarouselDragging] = useState(false);
  const activeFlowerIndexRef = useRef(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const scrollAnimationFrameRef = useRef<number | null>(null);
  const momentumAnimationFrameRef = useRef<number | null>(null);
  const scrollIdleTimeoutRef = useRef<number | null>(null);
  const dragStateRef = useRef({
    isDragging: false,
    startX: 0,
    startScrollLeft: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
  });

  const currentHref = jewelryTabs.find((t) => t.id === activeJewelry)?.href ?? "/customize";
  const powerGems = getGemsByPower(activePower);
  const powerDesktopGridClass =
    activePower === "love"
      ? "md:grid-cols-5"
      : powerGems.length === 3
      ? "md:grid-cols-3"
      : powerGems.length === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-4";
  const powerMaxWidthClass =
    activePower === "love"
      ? "max-w-[960px]"
      : powerGems.length === 3
      ? "max-w-[580px]"
      : powerGems.length === 2
      ? "max-w-[400px]"
      : "max-w-[760px]";
  const modalPower = modalGem ? gemPowerData[modalGem] : null;
  const modalDisplay = modalGem ? gemTypeDisplayData[modalGem] : null;
  const stopScrollAnimations = useCallback(() => {
    if (scrollAnimationFrameRef.current) {
      window.cancelAnimationFrame(scrollAnimationFrameRef.current);
      scrollAnimationFrameRef.current = null;
    }
    if (momentumAnimationFrameRef.current) {
      window.cancelAnimationFrame(momentumAnimationFrameRef.current);
      momentumAnimationFrameRef.current = null;
    }
  }, []);

  const animateScrollTo = useCallback(
    (targetLeft: number, duration = 600) => {
      const container = carouselRef.current;
      if (!container) return;

      stopScrollAnimations();

      const startLeft = container.scrollLeft;
      const distance = targetLeft - startLeft;
      const startTime = performance.now();

      const easeInOutCubic = (progress: number) =>
        progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(progress);
        container.scrollLeft = startLeft + distance * eased;

        if (progress < 1) {
          scrollAnimationFrameRef.current = window.requestAnimationFrame(step);
          return;
        }

        scrollAnimationFrameRef.current = null;
      };

      scrollAnimationFrameRef.current = window.requestAnimationFrame(step);
    },
    [stopScrollAnimations]
  );

  const scrollToFlowerCard = useCallback(
    (index: number, duration = 600) => {
      const container = carouselRef.current;
      const card = cardRefs.current[index];
      if (!container || !card) return;

      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const rawTarget =
        container.scrollLeft +
        (cardRect.left - containerRect.left) -
        (container.clientWidth / 2 - cardRect.width / 2);
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const targetLeft = Math.max(0, Math.min(rawTarget, maxScrollLeft));

      animateScrollTo(targetLeft, duration);
    },
    [animateScrollTo]
  );

  const goToFlowerCard = useCallback(
    (index: number) => {
      setActiveFlowerIndex(index);
      scrollToFlowerCard(index);
    },
    [scrollToFlowerCard]
  );

  const handleFlowerPrev = useCallback(() => {
    if (activeFlowerIndex <= 0) return;
    goToFlowerCard(activeFlowerIndex - 1);
  }, [activeFlowerIndex, goToFlowerCard]);

  const handleFlowerNext = useCallback(() => {
    if (activeFlowerIndex >= flowerStories.length - 1) return;
    goToFlowerCard(activeFlowerIndex + 1);
  }, [activeFlowerIndex, goToFlowerCard]);

  useEffect(() => {
    setRevealedFlowerCards((prev) => (prev.includes(activeFlowerIndex) ? prev : [...prev, activeFlowerIndex]));
    activeFlowerIndexRef.current = activeFlowerIndex;
  }, [activeFlowerIndex]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      scrollToFlowerCard(0, 0);
    }, 60);
    return () => window.clearTimeout(timeout);
  }, [scrollToFlowerCard]);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    let ticking = false;

    const updateActiveFromScroll = () => {
      const centerLine = container.scrollLeft + container.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - centerLine);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveFlowerIndex(closestIndex);
      activeFlowerIndexRef.current = closestIndex;
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateActiveFromScroll);

      if (scrollIdleTimeoutRef.current) {
        window.clearTimeout(scrollIdleTimeoutRef.current);
      }
      scrollIdleTimeoutRef.current = window.setTimeout(() => {
        if (!dragStateRef.current.isDragging) {
          scrollToFlowerCard(activeFlowerIndexRef.current, 300);
        }
      }, 120);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (scrollIdleTimeoutRef.current) {
        window.clearTimeout(scrollIdleTimeoutRef.current);
      }
    };
  }, [scrollToFlowerCard]);

  useEffect(() => {
    if (isCarouselHovered || isCarouselDragging) return;
    const timer = window.setInterval(() => {
      const nextIndex = activeFlowerIndex >= flowerStories.length - 1 ? 0 : activeFlowerIndex + 1;
      goToFlowerCard(nextIndex);
    }, 4000);

    return () => window.clearInterval(timer);
  }, [activeFlowerIndex, goToFlowerCard, isCarouselDragging, isCarouselHovered]);

  useEffect(() => {
    const onResize = () => scrollToFlowerCard(activeFlowerIndex, 0);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeFlowerIndex, scrollToFlowerCard]);

  useEffect(() => {
    return () => {
      stopScrollAnimations();
    };
  }, [stopScrollAnimations]);

  const startMomentumScroll = useCallback(() => {
    const container = carouselRef.current;
    if (!container) return;

    const friction = 0.94;
    const minVelocity = 0.05;
    let currentVelocity = dragStateRef.current.velocity;

    const step = () => {
      currentVelocity *= friction;
      container.scrollLeft -= currentVelocity * 16;

      if (Math.abs(currentVelocity) > minVelocity) {
        momentumAnimationFrameRef.current = window.requestAnimationFrame(step);
        return;
      }

      momentumAnimationFrameRef.current = null;
      scrollToFlowerCard(activeFlowerIndexRef.current, 350);
    };

    if (Math.abs(currentVelocity) > minVelocity) {
      momentumAnimationFrameRef.current = window.requestAnimationFrame(step);
      return;
    }

    scrollToFlowerCard(activeFlowerIndexRef.current, 350);
  }, [scrollToFlowerCard]);

  const handleCarouselPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const container = carouselRef.current;
    if (!container) return;

    stopScrollAnimations();
    container.setPointerCapture(event.pointerId);
    dragStateRef.current = {
      isDragging: true,
      startX: event.clientX,
      startScrollLeft: container.scrollLeft,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
    };
    setIsCarouselDragging(true);
  };

  const handleCarouselPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = carouselRef.current;
    if (!container || !dragStateRef.current.isDragging) return;

    const deltaX = event.clientX - dragStateRef.current.startX;
    container.scrollLeft = dragStateRef.current.startScrollLeft - deltaX;

    const now = performance.now();
    const dt = Math.max(now - dragStateRef.current.lastTime, 1);
    const dx = event.clientX - dragStateRef.current.lastX;
    dragStateRef.current.velocity = dx / dt;
    dragStateRef.current.lastX = event.clientX;
    dragStateRef.current.lastTime = now;
  };

  const handleCarouselPointerEnd = useCallback(() => {
    if (!dragStateRef.current.isDragging) return;

    dragStateRef.current.isDragging = false;
    setIsCarouselDragging(false);
    startMomentumScroll();
  }, [startMomentumScroll]);

  return (
    <section id="collection" className="scroll-mt-24 bg-white pt-0 pb-16">
      {modalGem && modalPower && (
        <GemInfoModal
          gemType={modalGem}
          power={modalPower}
          display={modalDisplay ?? undefined}
          onClose={() => setModalGem(null)}
          onSelect={() => {
            setModalGem(null);
            router.push("/customize");
          }}
          selectLabel="Design Your Piece"
          showBackButton={false}
        />
      )}

      <div
        ref={ref}
        className={`home-reveal mx-auto max-w-[1100px] px-6 ${isVisible ? "is-visible" : ""}`}
      >
        {/* ══════ PART A: OUR COLLECTION + SHOP BY CATEGORY ══════ */}
        <div className="mb-24 home-stagger" style={{ transitionDelay: "80ms" }}>
          <div
            className="relative left-1/2 w-screen -translate-x-1/2 bg-[linear-gradient(180deg,#FAF8F2_0%,#FFFFFF_100%)] pt-12 pb-16"
          >
            <div className="mx-auto max-w-[1100px] px-6">
              <div className="mb-8 text-center">
                <p className="text-[11px] font-light uppercase tracking-[0.2em] text-[#9A9A9A]">OUR COLLECTION</p>
                <h3 className="mt-3 font-serif text-3xl font-light text-[#2F2F2F] md:text-4xl">The Secret of Flowers</h3>
                <div className="mx-auto mt-4 h-px w-24 bg-[#B08D6A]" />
                <p className="mx-auto mt-5 max-w-2xl font-serif text-[16px] leading-relaxed text-[#5F5F5F]">
                  Four sacred Thai blooms. Four stories of women who wear their meaning close to their skin.
                </p>
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={handleFlowerPrev}
                  aria-label="Previous flower story"
                  className={`absolute left-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#B08D6A] shadow-[0_2px_12px_rgba(0,0,0,0.12)] transition-all duration-300 hover:bg-[#B08D6A] hover:text-white md:flex ${
                    activeFlowerIndex === 0 ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M15 6 9 12l6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={handleFlowerNext}
                  aria-label="Next flower story"
                  className={`absolute right-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#B08D6A] shadow-[0_2px_12px_rgba(0,0,0,0.12)] transition-all duration-300 hover:bg-[#B08D6A] hover:text-white md:flex ${
                    activeFlowerIndex === flowerStories.length - 1 ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div
                  ref={carouselRef}
                  className={`flex snap-x snap-mandatory gap-6 overflow-x-auto px-[7.5vw] pb-4 pt-2 md:px-[calc(50%-230px)] [scroll-padding-left:7.5vw] [scroll-padding-right:7.5vw] md:[scroll-padding-left:calc(50%-230px)] md:[scroll-padding-right:calc(50%-230px)] scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] touch-pan-y ${
                    isCarouselDragging ? "cursor-grabbing" : "cursor-grab"
                  }`}
                  style={{ scrollBehavior: "auto" }}
                  onMouseEnter={() => setIsCarouselHovered(true)}
                  onMouseLeave={() => setIsCarouselHovered(false)}
                  onPointerDown={handleCarouselPointerDown}
                  onPointerMove={handleCarouselPointerMove}
                  onPointerUp={handleCarouselPointerEnd}
                  onPointerCancel={handleCarouselPointerEnd}
                >
                  {flowerStories.map((item, index) => {
                    const isActive = index === activeFlowerIndex;
                    const isRevealed = revealedFlowerCards.includes(index);

                    return (
                      <article
                        key={item.jewelry}
                        ref={(el) => {
                          cardRefs.current[index] = el;
                        }}
                        className="w-[85vw] snap-center shrink-0 rounded-[20px] border bg-white px-6 py-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-[400ms] ease-out md:w-[460px]"
                        style={{
                          minHeight: "410px",
                          borderColor: isActive ? "rgba(176,141,106,0.3)" : "#F0EBE3",
                          transform: isActive ? "scale(1)" : "scale(0.95)",
                          opacity: isActive ? 1 : 0.7,
                        }}
                      >
                        <div className="relative mx-auto h-[130px] w-full max-w-[250px]">
                          <Image
                            src={item.image}
                            alt={item.jewelry}
                            fill
                            className="object-contain transition-all duration-500 ease-out"
                            style={{
                              transform: isRevealed ? "scale(1)" : "scale(0.9)",
                              opacity: isRevealed ? 1 : 0,
                              transitionDelay: isActive ? "0ms" : "0ms",
                            }}
                            sizes="(max-width: 768px) 85vw, 480px"
                          />
                        </div>

                        <div className="mt-5 text-center">
                          <p
                            className="text-[11px] font-light uppercase tracking-[0.18em] text-[#B08D6A] transition-all duration-500 ease-out"
                            style={{
                              opacity: isRevealed ? 1 : 0,
                              transform: isRevealed ? "translateY(0px)" : "translateY(8px)",
                              transitionDelay: isActive ? "0ms" : "0ms",
                            }}
                          >
                            {item.flowerTag}
                          </p>
                          <h4
                            className="mt-2 font-serif text-[18px] text-[#333333] transition-all duration-500 ease-out"
                            style={{
                              opacity: isRevealed ? 1 : 0,
                              transform: isRevealed ? "translateY(0px)" : "translateY(12px)",
                              transitionDelay: isActive ? "100ms" : "0ms",
                            }}
                          >
                            {item.jewelry}
                          </h4>
                          <p
                            className="mt-3 text-[14px] italic leading-[1.65] text-[#666666] transition-all duration-500 ease-out"
                            style={{
                              opacity: isRevealed ? 1 : 0,
                              transform: isRevealed ? "translateY(0px)" : "translateY(8px)",
                              transitionDelay: isActive ? "200ms" : "0ms",
                            }}
                          >
                            {item.story}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>

                <div className="mt-5 flex items-center justify-center gap-3">
                  {flowerStories.map((item, index) => {
                    const isActive = index === activeFlowerIndex;
                    return (
                      <button
                        key={item.jewelry}
                        type="button"
                        aria-label={`Go to ${item.jewelry}`}
                        onClick={() => goToFlowerCard(index)}
                        className="rounded-full border transition-all duration-300"
                        style={{
                          width: isActive ? "24px" : "8px",
                          height: "8px",
                          borderColor: "#D4C4B0",
                          backgroundColor: isActive ? "#B08D6A" : "transparent",
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Section header */}
          <p className="mt-16 text-center font-serif text-3xl italic text-[#9A9A9A] md:text-4xl">
            Shop by Category
          </p>

          {/* Tab pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {jewelryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveJewelry(tab.id)}
                className={`rounded-full px-5 py-2 text-[14px] font-light transition-all ${
                  activeJewelry === tab.id
                    ? "bg-[#EDE8E1] text-[#2A2A2A]"
                    : "text-[#9A9A9A] hover:text-[#2A2A2A]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Subtitle */}
          <p className="mt-3 text-center text-[13px] italic font-light text-[#B0A89A]">
            Choose a style, then personalize it to be entirely your own.
          </p>

          {/* Product grid */}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-1">
            {productsByTab[activeJewelry]?.map((product, i) => (
              <div
                key={product.name}
                className="group home-stagger"
                style={{ transitionDelay: `${180 + i * 70}ms` }}
              >
                <div className="relative mx-auto aspect-square max-w-[320px]">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.08))", background: "transparent" }}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="text-[15px] font-light text-[#2A2A2A]">{product.name}</p>
                  <p className="mt-0.5 text-[13px] font-light text-[#9A9A9A]">
                    {priceLabelByTab[activeJewelry]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <Link
              href={currentHref}
              className="inline-flex items-center gap-2 rounded-full border border-[#2A2A2A] px-7 py-3 text-[13px] font-light tracking-[0.08em] text-[#2A2A2A] transition-all hover:bg-[#2A2A2A] hover:text-white"
            >
              Design Now →
            </Link>
          </div>
        </div>

        {/* ══════ PART B: SHOP BY GEM POWER ══════ */}
        <div className="home-stagger border-t border-[#EBEBEB] pt-24" style={{ transitionDelay: "120ms" }}>
          {/* Section header */}
          <p className="text-center font-serif text-3xl italic text-[#9A9A9A] md:text-4xl">
            Shop by Gem Power
          </p>
          <p className="mx-auto mt-3 max-w-xl text-center text-[13px] italic font-light leading-relaxed text-[#B0A89A]">
            Each gemstone carries its own energy. Choose the one that aligns with what you seek.
          </p>

          {/* Power tab pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {powerTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePower(tab.id)}
                className={`rounded-full px-5 py-2 text-[14px] font-light transition-all ${
                  activePower === tab.id
                    ? "bg-[#EDE8E1] text-[#2A2A2A]"
                    : "text-[#9A9A9A] hover:text-[#2A2A2A]"
                }`}
              >
                {tab.label} {tab.symbol}
              </button>
            ))}
          </div>

          {/* Gem cards */}
          <div className={`mx-auto mt-8 grid grid-cols-2 gap-4 ${powerMaxWidthClass} ${powerDesktopGridClass}`}>
            {powerGems.map((gemType, i) => {
              const power = gemPowerData[gemType];
              const display = gemTypeDisplayData[gemType];
              if (!power || !display) return null;
              return (
                <button
                  key={gemType}
                  onClick={() => setModalGem(gemType)}
                  className="group home-stagger flex w-full min-w-0 flex-col"
                  style={{ transitionDelay: `${180 + i * 55}ms` }}
                >
                  {/* Gem image */}
                  <div className="relative aspect-square overflow-hidden bg-[#FAFAF8]">
                    <Image
                      src={power.unsplashUrl}
                      alt={display.nameEn}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 33vw, 17vw"
                    />
                  </div>
                  {/* Gem info */}
                  <div className="mt-2 flex flex-col gap-0.5 px-0.5">
                    <p className="text-[13px] font-light text-[#2A2A2A] leading-snug">{display.nameEn}</p>
                    <p
                      className="text-[11px] italic font-light leading-snug"
                      style={{ color: "#C4956A" }}
                    >
                      {power.powerTagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
