import { Suspense } from "react";
import { ShareCardInner } from "./share-card-inner";

export const metadata = {
  title: "Your Gem Result | Pradap Prada",
};

export default function QuizResultPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-white" />}>
      <ShareCardInner />
    </Suspense>
  );
}
