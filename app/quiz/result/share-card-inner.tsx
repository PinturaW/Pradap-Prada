"use client";

import { useSearchParams } from "next/navigation";
import { ShareCard } from "@/components/quiz/share-card";
import { allowedGemTypes, type GemType } from "@/lib/gem-data";

const allowedGemTypeSet = new Set<GemType>(allowedGemTypes);

export function ShareCardInner() {
  const params = useSearchParams();
  const gem = params.get("gem") as GemType | null;

  const validGem = gem && allowedGemTypeSet.has(gem) ? gem : "ruby";

  return <ShareCard gemType={validGem} />;
}
