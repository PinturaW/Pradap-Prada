"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Gem,
  MessageCircle,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import {
  gems,
  jewelryOptions,
  materialOptions,
  craftFees,
  gemGradients,
  type JewelryType,
  type MaterialType,
} from "@/lib/gem-data";
import {
  gemPlaceholderByType,
  jewelryPlaceholderById,
  USE_MOCK_IMAGES,
} from "@/lib/placeholder-images";

const pendantStyles = [
  {
    id: "classic-solitaire",
    label: "Classic Solitaire",
    labelTh: "คลาสสิกโซลิแทร์",
    description: "หนามเตยเดี่ยว โดดเด่นแบบคลาสสิก",
  },
  {
    id: "halo",
    label: "Halo",
    labelTh: "ฮาโล",
    description: "ล้อมด้วยเม็ดเล็ก เพิ่มประกาย",
  },
  {
    id: "bezel",
    label: "Bezel Set",
    labelTh: "เบเซลเซต",
    description: "ขอบโลหะโอบล้อมทันสมัย",
  },
  {
    id: "vintage",
    label: "Vintage / Art Deco",
    labelTh: "วินเทจ / อาร์ตเดโค",
    description: "ลวดลายย้อนยุคหรูหรา",
  },
  {
    id: "geometric",
    label: "Geometric / Modern",
    labelTh: "เรขาคณิต / โมเดิร์น",
    description: "เส้นสายคมชัดร่วมสมัย",
  },
  {
    id: "drop",
    label: "Drop / Teardrop",
    labelTh: "หยดน้ำ / ดรอป",
    description: "ทรงหยดน้ำพริ้วไหว",
  },
] as const;

function CustomizerInner() {
  const searchParams = useSearchParams();
  const preselectedGemId = searchParams.get("gem");

  const [step, setStep] = useState(preselectedGemId ? 1 : 3);
  const [selectedJewelry, setSelectedJewelry] = useState<JewelryType | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType | null>(null);
  const [selectedPendantStyle, setSelectedPendantStyle] = useState<string | null>(null);
  const [selectedGemId, setSelectedGemId] = useState<number | null>(
    preselectedGemId ? parseInt(preselectedGemId) : null
  );
  const [confirmed, setConfirmed] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const showRealImage = true;

  const selectedGem = useMemo(
    () => gems.find((g) => g.id === selectedGemId) ?? null,
    [selectedGemId]
  );

  const material = materialOptions.find((m) => m.id === selectedMaterial);
  const jewelry = jewelryOptions.find((j) => j.id === selectedJewelry);
  const pendantStyle = pendantStyles.find((p) => p.id === selectedPendantStyle);
  const pendantSkipped = selectedPendantStyle === "skip";
  const requiresPendant = selectedJewelry === "necklace";
  const stepIndex = {
    type: 1,
    pendant: requiresPendant ? 2 : null,
    material: requiresPendant ? 3 : 2,
    gem: requiresPendant ? 4 : 3,
  };

  const craftFee = selectedJewelry ? craftFees[selectedJewelry] : 0;
  const materialMultiplier = material?.multiplier ?? 1;
  const gemPrice = selectedGem?.price ?? 0;
  const totalPrice = gemPrice + Math.round(craftFee * materialMultiplier);
  const checkoutHref =
    selectedGem && selectedJewelry && selectedMaterial
      ? `/checkout?gem=${selectedGem.id}&jewelry=${selectedJewelry}&material=${selectedMaterial}${
          selectedPendantStyle && !pendantSkipped ? `&pendant=${selectedPendantStyle}` : ""
        }`
      : "#";
  const isReady =
    !!selectedJewelry &&
    !!selectedMaterial &&
    !!selectedGemId &&
    (!requiresPendant || !!selectedPendantStyle);

  const steps = requiresPendant
    ? [
        { num: stepIndex.type, label: "ประเภท" },
        { num: stepIndex.pendant ?? 2, label: "สไตล์จี้" },
        { num: stepIndex.material, label: "วัสดุ" },
        { num: stepIndex.gem, label: "พลอย" },
      ]
    : [
        { num: stepIndex.type, label: "ประเภท" },
        { num: stepIndex.material, label: "วัสดุ" },
        { num: stepIndex.gem, label: "พลอย" },
      ];

  const handleConfirm = () => {
    setConfirmed(true);
  };

  const handleReset = () => {
    setSelectedJewelry(null);
    setSelectedMaterial(null);
    setSelectedPendantStyle(null);
    setSelectedGemId(preselectedGemId ? parseInt(preselectedGemId) : null);
    setStep(preselectedGemId ? 1 : 3);
    setConfirmed(false);
  };

  const handleImgError = (key: string) => {
    setImgErrors((prev) => ({ ...prev, [key]: true }));
  };

  const availableGems = gems.filter(
    (g) => g.status !== "sold" && g.status !== "reserved"
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav */}
      <nav className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href={preselectedGemId ? "/gems" : "/"}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">
              {preselectedGemId ? "กลับไปคลังพลอย" : "กลับหน้าหลัก"}
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-serif text-lg font-bold text-foreground">
              ออกแบบเครื่องประดับ
            </span>
          </div>
          <div className="w-20" />
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Progress Steps */}
        <div className="mx-auto mb-12 max-w-md">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center">
                <button
                  onClick={() => {
                    if (s.num <= step) setStep(s.num);
                  }}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                      step === s.num
                        ? "bg-primary text-primary-foreground shadow-luxury"
                        : s.num < step
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s.num < step ? <Check className="h-5 w-5" /> : s.num}
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    {s.label}
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <div
                    className={`mx-4 h-0.5 w-16 sm:w-24 ${
                      s.num < step ? "bg-primary/30" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Main Content */}
          <div>
            {/* ════════ STEP 1: Jewelry Type ════════ */}
            {step === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-center font-serif text-3xl font-light text-foreground md:text-4xl">
                  คุณต้องการออกแบบอะไร?
                </h2>
                <p className="mx-auto mt-3 max-w-md text-center text-sm text-muted-foreground">
                  เลือกประเภทเครื่องประดับที่คุณต้องการ
                </p>

                <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
                  {jewelryOptions.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedJewelry(item.id);
                        setSelectedPendantStyle(null);
                        setStep(item.id === "necklace" ? (stepIndex.pendant ?? 2) : stepIndex.material);
                      }}
                      className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                        selectedJewelry === item.id
                          ? "border-primary shadow-luxury"
                          : "border-border hover:border-primary/40 hover:-translate-y-1 hover:shadow-luxury-lg"
                      }`}
                    >
                      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                        <Image
                          src={jewelryPlaceholderById[item.id]}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        {showRealImage && !imgErrors[item.id] ? (
                          <Image
                            src={item.previewImage}
                            alt={item.labelTh}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, 25vw"
                            onError={() => handleImgError(item.id)}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/70" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                          <h3 className="mt-2 font-serif text-xl font-semibold text-white">
                            {item.labelTh}
                          </h3>
                          <p className="text-xs text-white/70">{item.label}</p>
                        </div>
                      </div>
                      {selectedJewelry === item.id && (
                        <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-primary">
                          <Check className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {selectedJewelry && jewelry && (
                  <div className="mt-8 animate-fade-in rounded-2xl border border-border bg-card p-6">
                    <div className="flex items-center gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                        <Image
                          src={jewelryPlaceholderById[jewelry.id]}
                          alt=""
                          fill
                          className="object-cover"
                        />
                        {showRealImage && !imgErrors[`preview-${selectedJewelry}`] ? (
                          <Image
                            src={jewelry.previewImage}
                            alt={jewelry.labelTh}
                            fill
                            className="object-cover"
                            onError={() => handleImgError(`preview-${selectedJewelry}`)}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/70" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-xl font-semibold text-foreground">
                          {jewelry.labelTh} ({jewelry.label})
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {jewelry.description}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          ค่าฝีมือเริ่มต้น:{" "}
                          <span className="price-luxury text-xs">
                            ฿{craftFees[selectedJewelry].toLocaleString()}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ════════ STEP 2 (Necklace): Pendant Style ════════ */}
            {requiresPendant && step === stepIndex.pendant && (
              <div className="animate-fade-in">
                <h2 className="text-center font-serif text-3xl font-light text-foreground md:text-4xl">
                  เลือกสไตล์จี้ที่ชอบ
                </h2>
                <p className="mx-auto mt-3 max-w-md text-center text-sm text-muted-foreground">
                  เลือกดีไซน์ตัวเรือนจี้ก่อนเลือกวัสดุและโซ่
                </p>

                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => {
                      setSelectedPendantStyle("skip");
                      setStep(stepIndex.material);
                    }}
                    className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
                      pendantSkipped
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
                    }`}
                  >
                    ข้ามการเลือกแบบจี้ (ซื้อพลอยอย่างเดียว)
                  </button>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  {pendantStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => {
                        setSelectedPendantStyle(style.id);
                        setStep(stepIndex.material);
                      }}
                      className={`group rounded-2xl border-2 p-6 text-left transition-all duration-300 ${
                        selectedPendantStyle === style.id
                          ? "border-primary shadow-luxury"
                          : "border-border hover:border-primary/40 hover:-translate-y-1 hover:shadow-luxury-lg"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-serif text-xl font-semibold text-foreground">
                            {style.labelTh}
                          </h3>
                          <p className="text-xs uppercase tracking-wider text-muted-foreground">
                            {style.label}
                          </p>
                        </div>
                        {selectedPendantStyle === style.id && (
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary">
                            <Check className="h-4 w-4 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground">
                        {style.description}
                      </p>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setStep(stepIndex.type)}
                  className="mt-6 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  ← ย้อนกลับ
                </button>
              </div>
            )}

            {/* ════════ STEP 2: Material ════════ */}
            {step === stepIndex.material && (
              <div className="animate-fade-in">
                <h2 className="text-center font-serif text-3xl font-light text-foreground md:text-4xl">
                  เลือกวัสดุที่คุณชื่นชอบ
                </h2>
                <p className="mx-auto mt-3 max-w-md text-center text-sm text-muted-foreground">
                  วัสดุโลหะสำหรับ{jewelry?.labelTh ?? "เครื่องประดับ"}ของคุณ
                </p>

                <div className="mt-10 grid gap-5 md:grid-cols-3">
                  {materialOptions.map((mat) => (
                    <button
                      key={mat.id}
                      onClick={() => {
                        setSelectedMaterial(mat.id);
                        setStep(3);
                      }}
                      className={`group rounded-2xl border-2 p-6 text-left transition-all duration-300 ${
                        selectedMaterial === mat.id
                          ? "border-primary shadow-luxury"
                          : "border-border hover:border-primary/40 hover:-translate-y-1 hover:shadow-luxury-lg"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="h-12 w-12 rounded-full border-2 border-border shadow-inner"
                          style={{ backgroundColor: mat.color }}
                        />
                        <div>
                          <h3 className="font-serif text-xl font-semibold text-foreground">
                            {mat.labelTh}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {mat.label}
                          </p>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {mat.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          ตัวคูณค่าฝีมือ
                        </span>
                        <span className="text-champagne-gradient font-serif text-2xl font-bold">
                          x{mat.multiplier}
                        </span>
                      </div>
                      {selectedMaterial === mat.id && (
                        <div className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-primary">
                          <Check className="h-4 w-4" />
                          เลือกแล้ว
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setStep(requiresPendant ? (stepIndex.pendant ?? 2) : stepIndex.type)}
                  className="mt-6 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  ← ย้อนกลับ
                </button>
              </div>
            )}

            {/* ════════ STEP 3: Choose Gem ════════ */}
            {step === stepIndex.gem && (
              <div className="animate-fade-in">
                <h2 className="text-center font-serif text-3xl font-light text-foreground md:text-4xl">
                  เลือกพลอยของคุณ
                </h2>
                <p className="mx-auto mt-3 max-w-md text-center text-sm text-muted-foreground">
                  เลือกพลอยที่จะนำมาประดับ{jewelry?.labelTh ?? "เครื่องประดับ"}
                </p>

                {selectedGem && (
                  <div className="mx-auto mt-8 max-w-lg animate-fade-in rounded-2xl border-2 border-primary/20 bg-primary/5 p-6">
                    <div className="flex items-center gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${gemGradients[selectedGem.type]}`}
                        />
                        <Image
                          src={gemPlaceholderByType[selectedGem.type]}
                          alt=""
                          fill
                          className="object-cover"
                        />
                        {showRealImage && !imgErrors[`gem-${selectedGem.id}`] && (
                          <Image
                            src={selectedGem.image}
                            alt={selectedGem.nameTh}
                            fill
                            className="object-cover"
                            onError={() => handleImgError(`gem-${selectedGem.id}`)}
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif text-lg font-semibold text-foreground">
                            {selectedGem.nameTh}
                          </h3>
                          <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs font-bold text-primary">
                            {selectedGem.code}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {selectedGem.nameEn} &middot; {selectedGem.carat} ct
                        </p>
                        <p className="mt-1 price-luxury text-lg">
                          ฿{selectedGem.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedGemId(null)}
                      className="mt-3 text-xs text-muted-foreground transition-colors hover:text-primary"
                    >
                      เลือกพลอยเม็ดอื่น
                    </button>
                  </div>
                )}

                {!selectedGem && (
                  <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                    {availableGems.slice(0, 12).map((g) => (
                      <button
                        key={g.id}
                        onClick={() => setSelectedGemId(g.id)}
                        className="group overflow-hidden rounded-xl border border-border bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-luxury"
                      >
                        <div className="relative aspect-square overflow-hidden">
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${gemGradients[g.type]}`}
                          />
                          <Image
                            src={gemPlaceholderByType[g.type]}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="25vw"
                          />
                          {showRealImage && !imgErrors[`grid-${g.id}`] && (
                            <Image
                              src={g.image}
                              alt={g.nameTh}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                              sizes="25vw"
                              onError={() => handleImgError(`grid-${g.id}`)}
                            />
                          )}
                          <div className="absolute left-2 top-2 rounded bg-black/50 px-1.5 py-0.5 backdrop-blur-sm">
                            <span className="font-mono text-[10px] font-bold text-white">
                              {g.code}
                            </span>
                          </div>
                        </div>
                        <div className="p-3">
                          <p className="truncate font-serif text-sm font-semibold text-foreground">
                            {g.nameTh}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {g.carat} ct
                          </p>
                          <p className="mt-1 price-luxury text-base">
                            ฿{g.price.toLocaleString()}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {!selectedGem && (
                  <div className="mt-4 text-center">
                    <Link
                      href="/gems"
                      className="text-sm font-medium text-primary transition-colors hover:text-primary/70"
                    >
                      ดูพลอยทั้งหมด →
                    </Link>
                  </div>
                )}

                <button
                  onClick={() => setStep(stepIndex.material)}
                  className="mt-6 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  ← ย้อนกลับ
                </button>
              </div>
            )}
          </div>

          {/* ════════ LIVE SUMMARY SIDEBAR ════════ */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-luxury">
              <h3 className="flex items-center gap-2 font-serif text-lg font-semibold text-foreground">
                <Gem className="h-5 w-5 text-primary" />
                สรุปการออกแบบ
              </h3>

              {selectedJewelry && jewelry && (
                <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={jewelryPlaceholderById[jewelry.id]}
                    alt=""
                    fill
                    className="object-cover"
                  />
                  {showRealImage && !imgErrors[`summary-${selectedJewelry}`] ? (
                    <Image
                      src={jewelry.previewImage}
                      alt={jewelry.labelTh}
                      fill
                      className="object-cover"
                      onError={() => handleImgError(`summary-${selectedJewelry}`)}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/70" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="font-serif text-lg font-semibold text-white">
                      {jewelry.labelTh}
                    </p>
                    {material && (
                      <p className="text-xs text-white/80">
                        วัสดุ: {material.labelTh}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    ประเภท
                  </span>
                  <span className="font-serif font-semibold text-foreground">
                    {jewelry?.labelTh ?? "ยังไม่ได้เลือก"}
                  </span>
                </div>
                {requiresPendant && (
                  <>
                    <div className="h-px bg-border" />
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        สไตล์จี้
                      </span>
                      <span className="font-serif font-semibold text-foreground">
                        {pendantSkipped
                          ? "ข้ามการเลือกแบบจี้"
                          : pendantStyle?.labelTh ?? "ยังไม่ได้เลือก"}
                      </span>
                    </div>
                  </>
                )}
                <div className="h-px bg-border" />
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    วัสดุ
                  </span>
                  <div className="flex items-center gap-2">
                    {material && (
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: material.color }}
                      />
                    )}
                    <span className="font-serif font-semibold text-foreground">
                      {material?.labelTh ?? "ยังไม่ได้เลือก"}
                    </span>
                  </div>
                </div>
                <div className="h-px bg-border" />
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    พลอย
                  </span>
                  <span className="font-serif font-semibold text-foreground">
                    {selectedGem
                      ? `${selectedGem.nameTh} (${selectedGem.code})`
                      : "ยังไม่ได้เลือก"}
                  </span>
                </div>
              </div>

              {selectedGem && selectedJewelry && selectedMaterial && material && (
                <div className="mt-5 rounded-xl bg-muted/50 p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ราคาพลอย</span>
                      <span className="price-luxury text-sm">
                        ฿{gemPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        ค่าฝีมือ ({material.labelTh})
                      </span>
                      <span className="price-luxury text-sm">
                        ฿{Math.round(craftFee * materialMultiplier).toLocaleString()}
                      </span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex justify-between">
                      <span className="font-semibold text-foreground">
                        รวมทั้งสิ้น
                      </span>
                      <span className="price-luxury text-2xl">
                        ฿{totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-5 flex flex-col gap-3">
                {confirmed ? (
                  <div className="rounded-xl bg-primary/10 p-5 text-center">
                    <Check className="mx-auto h-8 w-8 text-primary" />
                    <p className="mt-2 font-semibold text-primary">
                      ขอบคุณค่ะ!
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      ทีมงานจะติดต่อกลับภายใน 24 ชม.
                    </p>
                  </div>
                ) : (
                  <>
                    {isReady ? (
                      <Link
                        href={checkoutHref}
                        className="flex h-14 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover:shadow-luxury"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        ไปหน้าคิดเงิน
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="flex h-14 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground opacity-40"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        ไปหน้าคิดเงิน
                      </button>
                    )}
                    <button
                      onClick={handleConfirm}
                      disabled={!isReady}
                      className="flex h-14 items-center justify-center gap-2 rounded-xl border-2 border-primary text-sm font-semibold text-primary transition-colors hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <MessageCircle className="h-4 w-4" />
                      ปรึกษาผู้เชี่ยวชาญ
                    </button>
                  </>
                )}
                <button
                  onClick={handleReset}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  เริ่มใหม่
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GemCustomizer() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Gem className="h-8 w-8 animate-pulse text-primary" />
        </div>
      }
    >
      <CustomizerInner />
    </Suspense>
  );
}
