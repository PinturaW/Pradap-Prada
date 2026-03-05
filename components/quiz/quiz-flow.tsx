"use client";

import { useCallback, useState } from "react";
import { IntroSlide } from "./intro-slide";
import { QuestionSlide } from "./question-slide";
import { LoadingReveal } from "./loading-reveal";
import { ResultSlide } from "./result-slide";
import { quizQuestions, calculateResult } from "@/lib/quiz-data";
import type { QuizResult } from "@/lib/quiz-data";
import { Navbar } from "@/components/navbar";

type Phase = "intro" | "quiz" | "loading" | "result";

const STEP_TOTAL = quizQuestions.length;

export function QuizFlow() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0); // 0-based index into quizQuestions
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const currentQuestion = quizQuestions[step];
  const bgClass = "from-stone-50 to-white";

  const handleStart = () => {
    setPhase("quiz");
    setStep(0);
  };

  const handleAnswer = useCallback(
    (optionId: string) => {
      const newAnswers = { ...answers, [currentQuestion.id]: optionId };
      setAnswers(newAnswers);

      setTransitioning(true);
      setTimeout(() => {
        if (step + 1 >= STEP_TOTAL) {
          setPhase("loading");
        } else {
          setStep((s) => s + 1);
        }
        setTransitioning(false);
      }, 400);
    },
    [answers, currentQuestion, step]
  );

  const handleLoadingDone = useCallback(() => {
    const r = calculateResult(answers);
    setResult(r);
    setPhase("result");
  }, [answers]);

  const handleRestart = () => {
    setPhase("intro");
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className={`relative min-h-screen bg-gradient-to-b ${bgClass} pt-[72px] transition-colors duration-700`}>
        {phase === "loading" && <LoadingReveal onDone={handleLoadingDone} />}

        <div
          className={`transition-opacity duration-300 ${
            transitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          {phase === "intro" && <IntroSlide onStart={handleStart} />}

          {phase === "quiz" && currentQuestion && (
            <QuestionSlide
              key={step}
              question={currentQuestion}
              currentStep={step + 1}
              totalSteps={STEP_TOTAL}
              onAnswer={handleAnswer}
            />
          )}

          {phase === "result" && result && (
            <ResultSlide result={result} onRestart={handleRestart} />
          )}
        </div>
      </div>
    </main>
  );
}
