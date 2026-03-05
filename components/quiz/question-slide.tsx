"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { OptionCard } from "./option-card";
import type { QuizQuestion } from "@/lib/quiz-data";

interface QuestionSlideProps {
  question: QuizQuestion;
  currentStep: number;
  totalSteps: number;
  onAnswer: (optionId: string) => void;
}

export function QuestionSlide({
  question,
  currentStep,
  totalSteps,
  onAnswer,
}: QuestionSlideProps) {
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = useState<string | null>(null);
  const [typedQuestion, setTypedQuestion] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Auto-advance after selection
  useEffect(() => {
    if (!selected) return;
    const t = setTimeout(() => onAnswer(selected), reduceMotion ? 120 : 620);
    return () => clearTimeout(t);
  }, [selected, onAnswer, reduceMotion]);

  useEffect(() => {
    setSelected(null);
    if (reduceMotion) {
      setTypedQuestion(question.question);
      setTypingDone(true);
      return;
    }

    setTypedQuestion("");
    setTypingDone(false);
    let charIndex = 0;
    const intervalId = window.setInterval(() => {
      charIndex += 1;
      setTypedQuestion(question.question.slice(0, charIndex));
      if (charIndex >= question.question.length) {
        window.clearInterval(intervalId);
        setTypingDone(true);
      }
    }, 30);

    return () => window.clearInterval(intervalId);
  }, [question.question, reduceMotion]);

  // 6-option questions get 3-col grid; others 2-col
  const isSixOptions = question.options.length === 6;
  const isFiveOptions = question.options.length === 5;
  const progressPercent = (currentStep / totalSteps) * 100;

  const handleSelect = (id: string) => {
    try {
      if (typeof window !== "undefined") {
        const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          if (!audioContextRef.current) {
            audioContextRef.current = new AudioCtx();
          }
          const ctx = audioContextRef.current;
          const oscillator = ctx.createOscillator();
          const gainNode = ctx.createGain();

          oscillator.type = "triangle";
          oscillator.frequency.setValueAtTime(640, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);

          gainNode.gain.setValueAtTime(0.0001, ctx.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.02);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);

          oscillator.connect(gainNode);
          gainNode.connect(ctx.destination);
          oscillator.start();
          oscillator.stop(ctx.currentTime + 0.22);
        }
      }
    } catch {
    }

    setSelected(id);
  };

  return (
    <div className="relative flex min-h-[calc(100vh-72px)] flex-col items-center justify-center overflow-hidden px-6 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(212,175,55,0.12),transparent_34%),radial-gradient(circle_at_82%_85%,rgba(212,175,55,0.10),transparent_38%)]" />
      <Sparkles className="pointer-events-none absolute left-[12%] top-[24%] h-3.5 w-3.5 text-[#A7744C]/60 animate-pulse" />
      <Sparkles className="pointer-events-none absolute right-[13%] top-[30%] h-3 w-3 text-[#A7744C]/50 animate-pulse" style={{ animationDelay: "500ms" }} />
      <div className="w-full max-w-2xl">

        <div className="mb-5">
          <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-[#9A6A4A]">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Question</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.span
                key={currentStep}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
              >
                {currentStep} / {totalSteps}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="relative h-2 overflow-hidden rounded-full bg-[#E7DACD]">
            <motion.div
              className="h-full rounded-full bg-[#B08D6A]"
              initial={false}
              animate={{ width: `${progressPercent}%` }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 170, damping: 26 }
              }
            />
            {!reduceMotion && (
              <motion.div
                key={currentStep}
                className="pointer-events-none absolute inset-y-0 w-1/3"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,220,100,0.6), transparent)",
                }}
                initial={{ x: "-120%", opacity: 0 }}
                animate={{ x: "300%", opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            )}
          </div>
        </div>

        {/* Chapter label — prominent */}
        <motion.p
          className="text-center text-xl font-black uppercase tracking-[0.5em] text-[#A7744C] md:text-2xl"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
        >
          {question.narrative}
        </motion.p>

        {/* Story / narrative text */}
        <motion.p
          className="mt-5 text-center text-lg leading-relaxed text-[#7C7368] md:text-xl"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.1 }}
        >
          {question.story}
        </motion.p>

        {/* Question */}
        <h2
          className="mt-4 min-h-[72px] text-center font-serif text-2xl font-semibold leading-snug text-[#2E2A25] md:text-3xl"
        >
          {typedQuestion}
          {!typingDone && !reduceMotion && (
            <motion.span
              className="ml-1 inline-block text-[#B08D6A]"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              |
            </motion.span>
          )}
        </h2>

        {/* Divider */}
        <motion.div
          className="mx-auto mt-7 h-px w-12 bg-[#D9C7B6]"
          initial={reduceMotion ? false : { opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.3, delay: reduceMotion ? 0 : 0.2 }}
        />

        {/* Options grid */}
        <div
          className={`mt-8 grid grid-cols-1 gap-3 ${
            isSixOptions
              ? "sm:grid-cols-3"
              : "sm:grid-cols-2"
          }`}
        >
          {question.options.map((option, i) => (
            <div
              key={option.id}
              className={[
                "h-full",
                isFiveOptions && i === question.options.length - 1 ? "sm:col-span-2" : "",
              ].join(" ")}
            >
              <OptionCard
                option={option}
                selected={selected === option.id}
                dimmed={selected !== null && selected !== option.id}
                onSelect={handleSelect}
                revealDelay={typingDone || reduceMotion ? i * 0.1 : 0.45 + i * 0.1}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
