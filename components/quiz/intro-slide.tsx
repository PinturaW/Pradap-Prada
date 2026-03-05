"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface IntroSlideProps {
  onStart: () => void;
}

const PARTICLES: { top: string; left?: string; right?: string; size: number; delay: number; dur: number }[] = [
  { top: "10%", left: "7%",  size: 12, delay: 0,    dur: 3.5 },
  { top: "18%", right: "9%", size: 9,  delay: 700,  dur: 4.2 },
  { top: "55%", left: "4%",  size: 8,  delay: 1400, dur: 3.8 },
  { top: "70%", right: "6%", size: 11, delay: 500,  dur: 5.0 },
  { top: "35%", left: "3%",  size: 7,  delay: 1100, dur: 4.5 },
  { top: "45%", right: "4%", size: 7,  delay: 1800, dur: 3.2 },
  { top: "82%", left: "15%", size: 9,  delay: 300,  dur: 4.8 },
  { top: "85%", right: "17%",size: 8,  delay: 900,  dur: 3.6 },
];

export function IntroSlide({ onStart }: IntroSlideProps) {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: "easeOut" as const };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 65% at 50% 50%, rgba(212,175,55,0.11) 0%, transparent 70%)",
        }}
      />

      {/* Floating sparkle particles */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute"
          initial={{ opacity: 0 }}
          animate={{ opacity: reduceMotion ? 0.24 : [0.1, 0.35, 0.1] }}
          transition={{
            duration: reduceMotion ? 0 : p.dur,
            delay: reduceMotion ? 0 : p.delay / 1000,
            repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
          }}
        >
          <Sparkles
            className="text-amber-400/25"
            style={{ width: p.size, height: p.size }}
          />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-lg">
        {/* Central orb with ping rings */}
        <motion.div
          className="mx-auto mb-10"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={transition}
        >
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
            {/* Staggered ping rings */}
            {!reduceMotion &&
              [0, 600, 1200].map((delay) => (
                <motion.span
                  key={delay}
                  className="absolute inline-flex h-full w-full rounded-full border border-amber-400/20"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: [0.7, 1.25], opacity: [0.28, 0] }}
                  transition={{
                    duration: 2.4,
                    delay: delay / 1000,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeOut",
                  }}
                />
              ))}
            {/* Outer static ring */}
            <div className="absolute h-24 w-24 rounded-full border border-amber-200/30" />
            {/* Orb */}
            <motion.div
              className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-amber-200 bg-gradient-to-br from-amber-50 to-white shadow-luxury"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      boxShadow: [
                        "0 0 12px rgba(176,141,106,0.24)",
                        "0 0 26px rgba(176,141,106,0.38)",
                        "0 0 12px rgba(176,141,106,0.24)",
                      ],
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
              }
            >
              <Sparkles className="h-9 w-9 text-amber-500" />
            </motion.div>
          </div>
        </motion.div>

        {/* Label */}
        <motion.p
          className="text-champagne-gradient text-xs font-bold uppercase tracking-[0.4em]"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...transition, delay: reduceMotion ? 0 : 0.1 }}
        >
          Find Your Gem
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="mt-4 font-serif text-3xl font-semibold leading-tight text-foreground md:text-4xl"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: reduceMotion ? 0 : 0.2 }}
        >
          Everyone has a gemstone
          <br />
          calling their name
        </motion.h1>

        {/* Body */}
        <motion.p
          className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...transition, delay: reduceMotion ? 0 : 0.4 }}
        >
          Answer 10 short questions and discover
          <br />
          the gem that matches your energy and spirit
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-10"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: reduceMotion ? 0 : 0.6 }}
        >
          <motion.button
            onClick={onStart}
            className="group inline-flex h-12 items-center gap-3 rounded-full bg-primary px-9 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-luxury-lg"
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          >
            Start the Journey
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </motion.div>

        {/* Decorative */}
        <motion.div
          className="mt-12"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...transition, delay: reduceMotion ? 0 : 0.7 }}
        >
          <span className="text-champagne-gradient text-sm font-light tracking-[0.5em]">
            {"— "}&#9670;{" —"}
          </span>
        </motion.div>
      </div>
    </div>
  );
}
