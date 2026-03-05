"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { QuizOption } from "@/lib/quiz-data";

interface OptionCardProps {
  option: QuizOption;
  selected: boolean;
  dimmed: boolean;
  onSelect: (id: string) => void;
  revealDelay: number;
}

interface BurstParticle {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
}

export function OptionCard({ option, selected, dimmed, onSelect, revealDelay }: OptionCardProps) {
  const reduceMotion = useReducedMotion();
  const [particles, setParticles] = useState<BurstParticle[]>([]);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setCanHover(media.matches);
    apply();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", apply);
      return () => media.removeEventListener("change", apply);
    }

    media.addListener(apply);
    return () => media.removeListener(apply);
  }, []);

  const handleSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!reduceMotion) {
      const rect = event.currentTarget.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      const nextParticles: BurstParticle[] = Array.from({ length: 8 }).map((_, index) => {
        const angle = (Math.PI * 2 * index) / 8 + Math.random() * 0.4;
        const distance = 30 + Math.random() * 20;
        return {
          id: Date.now() + index,
          x: clickX,
          y: clickY,
          dx: Math.cos(angle) * distance,
          dy: Math.sin(angle) * distance,
        };
      });
      setParticles(nextParticles);
      window.setTimeout(() => setParticles([]), 620);
    }

    onSelect(option.id);
  };

  return (
    <motion.button
      onClick={handleSelect}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: dimmed ? 0.5 : 1, y: 0, scale: selected ? [1, 0.97, 1] : 1 }}
      transition={{
        opacity: { duration: reduceMotion ? 0 : 0.2, delay: reduceMotion ? 0 : revealDelay },
        y: { duration: reduceMotion ? 0 : 0.25, delay: reduceMotion ? 0 : revealDelay },
        scale: { duration: reduceMotion ? 0 : 0.25, ease: "easeOut" },
      }}
      whileHover={
        reduceMotion || !canHover
          ? undefined
          : {
              scale: 1.02,
              borderColor: "#B08D6A",
              transition: { duration: 0.2, ease: "easeOut" },
            }
      }
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      className={`group relative h-full w-full rounded-2xl border p-5 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
        selected
          ? "border-[#B08D6A] bg-[#FBF6F0]"
          : "border-[#E4DDD3] bg-white/95"
      }`}
      style={{ boxShadow: selected ? "0 0 20px rgba(176,141,106,0.4)" : undefined }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(120deg,rgba(255,255,255,0.4)_0%,transparent_35%)]" />

      {!reduceMotion &&
        particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="pointer-events-none absolute h-[3px] w-[3px] rounded-full bg-[#B08D6A]"
            initial={{ x: particle.x, y: particle.y, opacity: 1, scale: 1 }}
            animate={{
              x: particle.x + particle.dx,
              y: particle.y + particle.dy,
              opacity: 0,
              scale: 0.7,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}

      {/* Checkmark */}
      <div
        className={`absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 ${
          selected ? "scale-100 bg-[#B47D52] opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
      </div>

      <div className="flex items-start gap-4">
        <option.icon
          className="h-7 w-7 shrink-0 mt-0.5 text-[#A7744C]/80 animate-icon-float transition-all duration-300"
          strokeWidth={1.5}
          style={{ animationDelay: `${(revealDelay * 1000 * 0.4) % 900}ms` }}
        />
        <div>
          <p className="font-serif text-lg font-semibold leading-snug text-[#2E2A25]">
            {option.label}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[#857A6D]">
            {option.sub}
          </p>
        </div>
      </div>
    </motion.button>
  );
}
