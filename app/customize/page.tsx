import Image from "next/image";
import Link from "next/link";
import { productCategories } from "@/lib/customizer-data";
import { gems, gemTypeDisplayData, type GemType } from "@/lib/gem-data";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Design Your Jewelry | PRADAP PRADA",
  description: "Choose your jewelry type and personalize with gemstone selection.",
};

interface CustomizePageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

function formatCarat(value: number) {
  return value.toFixed(2).replace(/\.00$/, "").replace(/0$/, "");
}

export default async function CustomizePage({ searchParams }: CustomizePageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const rawGem = resolvedSearchParams.gem;
  const gemParam = Array.isArray(rawGem) ? rawGem[0] : rawGem;
  const selectedGemType = gemParam && gemTypeDisplayData[gemParam as GemType]
    ? (gemParam as GemType)
    : null;
  const selectedGemDisplay = selectedGemType ? gemTypeDisplayData[selectedGemType] : null;
  const matchingGems = selectedGemType ? gems.filter((item) => item.type === selectedGemType) : [];
  const availableGems = matchingGems.filter((item) => item.status === "available");
  const caratValues = matchingGems.map((item) => item.carat).filter((value) => Number.isFinite(value));
  const minCarat = caratValues.length ? Math.min(...caratValues) : null;
  const maxCarat = caratValues.length ? Math.max(...caratValues) : null;
  const minPrice = matchingGems.length
    ? Math.min(...matchingGems.map((item) => item.price))
    : null;

  const caratRangeLabel =
    minCarat === null || maxCarat === null
      ? null
      : minCarat === maxCarat
      ? `${formatCarat(minCarat)} ct`
      : `${formatCarat(minCarat)} - ${formatCarat(maxCarat)} ct`;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <div className="px-6 pt-24 mt-[65px] pb-12 text-center">
        <p className="font-serif text-3xl italic text-[#9A9A9A] md:text-4xl">
          Design Your Piece
        </p>
        <p className="mx-auto mt-3 max-w-md text-[13px] font-light leading-relaxed text-[#B0A89A]">
          Choose your jewelry type below, then personalize with your gemstone selection.
        </p>

        {selectedGemType && selectedGemDisplay && (
          <div className="mx-auto mt-5 max-w-xl border border-[#EBEBEB] bg-[#FAFAF8] px-4 py-3 text-left">
            <p className="text-[13px] font-light text-[#2A2A2A]">
              Selected gem: {selectedGemDisplay.nameEn} ({selectedGemDisplay.nameTh})
            </p>
            <p className="mt-1 text-[12px] font-light text-[#9A9A9A]">
              {caratRangeLabel ? `Carat ${caratRangeLabel}` : "Carat -"}
              {minPrice !== null ? ` · Starting from ฿${minPrice.toLocaleString()}` : ""}
              {matchingGems.length ? ` · ${availableGems.length} available` : ""}
            </p>
          </div>
        )}

        <Link
          href="/quiz"
          className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-light transition-opacity hover:opacity-70"
          style={{ color: "#C4956A" }}
        >
          Not sure which gem suits you? Take the quiz →
        </Link>
      </div>

      {/* 4 Category Cards */}
      <div className="mx-auto max-w-[1100px] px-6 pb-24">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {productCategories.map((cat) => (
            <Link
              key={cat.id}
              href={selectedGemType ? `${cat.href}?gem=${selectedGemType}` : cat.href}
              className="group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#FAFAF8]">
                <Image
                  src={cat.unsplashUrl}
                  alt={cat.labelEn}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="mt-4">
                <p className="text-[15px] font-light text-[#2A2A2A] transition-colors group-hover:text-[#C4956A]">
                  {cat.labelEn}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Quiz CTA Banner */}
        <div className="mt-20 border border-[#EBEBEB] px-10 py-12 text-center">
          <p className="font-serif text-2xl italic text-[#9A9A9A]">
            Find Your Signature Gem
          </p>
          <p className="mx-auto mt-3 max-w-md text-[13px] font-light leading-relaxed text-[#B0A89A]">
            Answer 10 short questions and discover the gemstone that resonates with your energy and spirit.
          </p>
          <Link
            href="/quiz"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#2A2A2A] px-7 py-3 text-[13px] font-light tracking-[0.08em] text-[#2A2A2A] transition-all hover:bg-[#2A2A2A] hover:text-white"
          >
            Take the Gem Quiz →
          </Link>
        </div>
      </div>
    </main>
  );
}
