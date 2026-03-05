"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface LoadingRevealProps {
  onDone: () => void;
}

export function LoadingReveal({ onDone }: LoadingRevealProps) {
  const reduceMotion = useReducedMotion();
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    const glowTimer = window.setTimeout(() => setBurst(true), reduceMotion ? 400 : 2500);
    const doneTimer = window.setTimeout(onDone, reduceMotion ? 650 : 3100);

    return () => {
      window.clearTimeout(glowTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onDone, reduceMotion]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: "rgba(245,240,232,0.95)" }}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.3 }}
    >
      <div className="relative flex items-center justify-center">
        <motion.div
          className="relative overflow-hidden rounded-full border border-[#B08D6A]/45"
          initial={reduceMotion ? false : { width: 100, height: 100, opacity: 0.7 }}
          animate={{
            width: burst && !reduceMotion ? 220 : 200,
            height: burst && !reduceMotion ? 220 : 200,
            opacity: 1,
            boxShadow: burst
              ? "0 0 65px rgba(176,141,106,0.58)"
              : "0 0 28px rgba(176,141,106,0.3)",
          }}
          transition={{
            width: { duration: reduceMotion ? 0 : 0.5, ease: "easeOut" },
            height: { duration: reduceMotion ? 0 : 0.5, ease: "easeOut" },
            boxShadow: { duration: reduceMotion ? 0 : 0.35, ease: "easeOut" },
            opacity: { duration: reduceMotion ? 0 : 0.35 },
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: 0.4,
              background:
                "conic-gradient(from 0deg, rgba(255,255,255,0.7), rgba(176,141,106,0.45), rgba(255,255,255,0.62), rgba(176,141,106,0.35), rgba(255,255,255,0.7))",
            }}
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }
            }
          />
          <div className="absolute inset-4 rounded-full bg-white/35 blur-xl" />
        </motion.div>

        {!reduceMotion && burst && (
          <motion.div
            className="pointer-events-none absolute rounded-full border border-[#B08D6A]/55"
            initial={{ width: 200, height: 200, opacity: 0.8, scale: 1 }}
            animate={{ scale: 8, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
      </div>

      <motion.p
        className="mt-12 text-sm font-medium text-[#6F6254]"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={
          reduceMotion
            ? { opacity: 1 }
            : {
                opacity: 1,
                y: 0,
                letterSpacing: ["0.08em", "0.2em", "0.08em"],
              }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                opacity: { duration: 0.4, ease: "easeOut" },
                y: { duration: 0.4, ease: "easeOut" },
                letterSpacing: { duration: 1.4, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY },
              }
        }
      >
        Reading your energy...
      </motion.p>

      <p className="mt-4 text-[10px] uppercase tracking-[0.4em] text-[#A38E76]/65">
        Pradap Prada
      </p>
    </motion.div>
  );
}
