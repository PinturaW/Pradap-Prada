import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

async function loadFontBuffer(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

// ── Gem background colors (converted from Tailwind gemGradients) ─────────────
const gemColors: Record<string, [string, string, string]> = {
  chalcedony: ["#64748b", "#94a3b8", "#cbd5e1"],
  emerald: ["#064e3b", "#166534", "#22c55e"],
  moonstone: ["#334155", "#64748b", "#94a3b8"],
  "rhodolite-garnet": ["#831843", "#be185d", "#e11d48"],
  "rose-quartz": ["#9d174d", "#ec4899", "#f9a8d4"],
  "golden-star-sapphire": ["#78350f", "#a16207", "#eab308"],
  "yellow-sapphire": ["#854d0e", "#ca8a04", "#facc15"],
  zircon: ["#155e75", "#0891b2", "#67e8f9"],
  apatite: ["#164e63", "#0891b2", "#22d3ee"],
  fluorite: ["#4c1d95", "#7c3aed", "#c4b5fd"],
  "lapis-lazuli": ["#172554", "#1e3a8a", "#3730a3"],
  ruby: ["#450a0a", "#991b1b", "#dc2626"],
  amethyst: ["#3b0764", "#6d28d9", "#a78bfa"],
  aquamarine: ["#0f766e", "#14b8a6", "#99f6e4"],
  "black-star-sapphire": ["#020617", "#1e293b", "#0f172a"],
  "spessartite-garnet": ["#7c2d12", "#c2410c", "#fb923c"],
  garnet: ["#450a0a", "#7f1d1d", "#b91c1c"],
  "ruby-zoisite": ["#14532d", "#166534", "#dc2626"],
  sapphire: ["#172554", "#1d4ed8", "#2563eb"],
  amber: ["#78350f", "#d97706", "#f59e0b"],
};

// ── Labels ────────────────────────────────────────────────────────────────────
const gemLabels: Record<string, string> = {
  chalcedony: "CHALCEDONY",
  emerald: "EMERALD",
  moonstone: "MOONSTONE",
  "rhodolite-garnet": "RHODOLITE GARNET",
  "rose-quartz": "ROSE QUARTZ",
  "golden-star-sapphire": "GOLDEN STAR SAPPHIRE",
  "yellow-sapphire": "YELLOW SAPPHIRE",
  zircon: "ZIRCON",
  apatite: "APATITE",
  fluorite: "FLUORITE",
  "lapis-lazuli": "LAPIS LAZULI",
  ruby: "RUBY",
  amethyst: "AMETHYST",
  aquamarine: "AQUAMARINE",
  "black-star-sapphire": "BLACK STAR SAPPHIRE",
  "spessartite-garnet": "SPESSARTITE GARNET",
  garnet: "GARNET",
  "ruby-zoisite": "RUBY ZOISITE",
  sapphire: "SAPPHIRE",
  amber: "AMBER",
};

// ── Personality ───────────────────────────────────────────────────────────────
const gemPersonality: Record<string, { title: string; soul: string }> = {
  chalcedony: { title: "Stone of Friendship & Charm", soul: "Warm, inviting energy for harmony and connection." },
  emerald: { title: "Symbol of Faith & True Love", soul: "Unconditional love, vitality, and graceful prestige." },
  moonstone: { title: "Gem of New Beginnings", soul: "Calm emotional flow and a fresh life perspective." },
  "rhodolite-garnet": { title: "Stone of Compassion", soul: "Heart-healing love and restored inner harmony." },
  "rose-quartz": { title: "Ultimate Stone of Unconditional Love", soul: "Gentle love, forgiveness, and open-hearted warmth." },
  "golden-star-sapphire": { title: "Symbol of Honesty & Hope", soul: "Prestige, charisma, and prosperity with integrity." },
  "yellow-sapphire": { title: "Gem of Prosperity & Charm", soul: "Magnetism, confidence, and abundant wealth energy." },
  zircon: { title: "Gem of Abundance", soul: "Grounded prosperity with sharp protection and intellect." },
  apatite: { title: "Stone of Inspiration", soul: "Creativity, clear communication, and new opportunities." },
  fluorite: { title: "Crystal of Mental Clarity", soul: "Focused thought, memory strength, and mental detox." },
  "lapis-lazuli": { title: "Stone of Knowledge & Insight", soul: "Wisdom, truth, and deep spiritual awareness." },
  ruby: { title: "King of Gemstones", soul: "Courage, prestige, and unstoppable life force." },
  amethyst: { title: "Stone of Peace & Clarity", soul: "Calm concentration with strong energetic shielding." },
  aquamarine: { title: "Stone of Courage & Peace", soul: "Oceanic calm, honesty, and protective clarity." },
  "black-star-sapphire": { title: "Gem of Ultimate Defense", soul: "Grounding strength that reflects negativity away." },
  "spessartite-garnet": { title: "Stone of Fiery Courage", soul: "Protective fire, passion, and bold confidence." },
  garnet: { title: "Gem of Vitality & Power", soul: "Revitalized spirit and courageous momentum." },
  "ruby-zoisite": { title: "Heart-Mind Connector", soul: "Balanced decisions through logic and emotion." },
  sapphire: { title: "Gem of Stability & Virtue", soul: "Quiet self-assurance with noble protection." },
  amber: { title: "Ultimate Healing Stone", soul: "Transforms negativity into joyful, lucky vitality." },
};

// ── Gem image paths in /public ────────────────────────────────────────────────
const gemImagePaths: Record<string, string> = {
  chalcedony: "/gem-power/chalcedony.png",
  emerald: "/gem-power/emerald.png",
  moonstone: "/gem-power/moonstone.png",
  "rhodolite-garnet": "/gem-power/rhodolite-garnet.png",
  "rose-quartz": "/gem-power/rose-quartz.png",
  "golden-star-sapphire": "/gem-power/golden-star-sapphire.png",
  "yellow-sapphire": "/gem-power/yellow-sapphire.png",
  zircon: "/gem-power/zircon.png",
  apatite: "/gem-power/apatite.png",
  fluorite: "/gem-power/fluorite.png",
  "lapis-lazuli": "/gem-power/lapis-lazuli.png",
  ruby: "/gem-power/ruby.png",
  amethyst: "/gem-power/amethyst.png",
  aquamarine: "/gem-power/aquamarine.png",
  "black-star-sapphire": "/gem-power/black-star-sapphire.png",
  "spessartite-garnet": "/gem-power/spessartite-garnet.png",
  garnet: "/gem-power/garnet.png",
  "ruby-zoisite": "/gem-power/ruby-zoisite.png",
  sapphire: "/gem-power/sapphire.png",
  amber: "/gem-power/amber.png",
};

// ── Route handler ─────────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const gemType = searchParams.get("type") ?? "ruby";

  const labelEn = gemLabels[gemType] ?? gemType.toUpperCase();
  const personality = gemPersonality[gemType];
  const [c1, c2, c3] = gemColors[gemType] ?? ["#1c1917", "#44403c", "#1c1917"];
  const imgPath = gemImagePaths[gemType];
  const teaserDescription = personality?.soul ?? "A refined energy that blends calm confidence with quiet magnetism.";
  const gemNameFontSize = labelEn.length > 16 ? 60 : labelEn.length > 12 ? 74 : 94;

  const [serifSemiBold, sansRegular, sansMedium] = await Promise.all([
    loadFontBuffer(`${origin}/fonts/Branch.ttf`),
    loadFontBuffer(`${origin}/fonts/TH-K2D-July8.ttf`),
    loadFontBuffer(`${origin}/fonts/TH-K2D-July8-Bold.ttf`),
  ]);

  const fonts = [
    serifSemiBold
      ? {
          name: "PP Serif",
          data: serifSemiBold,
          weight: 600 as const,
          style: "normal" as const,
        }
      : null,
    sansRegular
      ? {
          name: "PP Sans",
          data: sansRegular,
          weight: 400 as const,
          style: "normal" as const,
        }
      : null,
    sansMedium
      ? {
          name: "PP Sans",
          data: sansMedium,
          weight: 500 as const,
          style: "normal" as const,
        }
      : null,
  ].filter((font): font is { name: string; data: ArrayBuffer; weight: 400 | 500 | 600; style: "normal" } => Boolean(font));

  // Fetch gem image and convert to data URL for embedding
  let imgDataUrl: string | null = null;
  if (imgPath) {
    try {
      const res = await fetch(`${origin}${imgPath}`);
      if (res.ok) {
        const buf = await res.arrayBuffer();
        const bytes = new Uint8Array(buf);
        let binary = "";
        for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
        const b64 = btoa(binary);
        const mime = imgPath.endsWith(".jpg") ? "image/jpeg" : "image/png";
        imgDataUrl = `data:${mime};base64,${b64}`;
      }
    } catch {
      // ignore — card will show without gem image
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FAF8F2",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "96px 84px",
          fontFamily: "PP Sans",
          border: "1px solid rgba(176,141,106,0.28)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle_at_20%_10%, rgba(176,141,106,0.12), transparent 34%), radial-gradient(circle_at_80%_90%, rgba(176,141,106,0.08), transparent 42%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <p style={{ fontSize: 33, fontWeight: 600, color: "#B08D6A", letterSpacing: "0.3em", margin: 0, fontFamily: "PP Serif" }}>
            PRADAP PRADA
          </p>
          <p style={{ fontSize: 27, color: "#B08D6A", letterSpacing: "0.34em", margin: 0 }}>
            GEM PERSONALITY
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28, width: "100%" }}>
          <div
            style={{
              width: 340,
              height: 340,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="340"
              height="340"
              viewBox="0 0 340 340"
              style={{ position: "absolute", inset: 0, opacity: 0.68 }}
            >
              <circle cx="170" cy="170" r="140" fill="none" stroke="rgba(176,141,106,0.3)" strokeWidth="1" />
              <circle cx="170" cy="170" r="124" fill="none" stroke="rgba(176,141,106,0.3)" strokeWidth="1" />
              <line x1="170" y1="24" x2="170" y2="316" stroke="rgba(176,141,106,0.3)" strokeWidth="2" />
              <line x1="24" y1="170" x2="316" y2="170" stroke="rgba(176,141,106,0.3)" strokeWidth="2" />
              <rect x="71" y="71" width="198" height="198" fill="none" stroke="rgba(176,141,106,0.3)" strokeWidth="1" transform="rotate(45 170 170)" />
              <rect x="87" y="87" width="166" height="166" fill="none" stroke="rgba(176,141,106,0.3)" strokeWidth="1" transform="rotate(45 170 170)" />
            </svg>

            <div
              style={{
                width: 300,
                height: 300,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(176,141,106,0.3)",
                background: `radial-gradient(circle, ${c2}50 0%, transparent 72%)`,
              }}
            >
            <div
              style={{
                width: 210,
                height: 210,
                borderRadius: "50%",
                border: "1px solid #B08D6A",
                padding: 7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  border: "1px solid rgba(176,141,106,0.74)",
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.04)",
                  display: "flex",
                }}
              >
                {imgDataUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imgDataUrl} width={210} height={210} alt="" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                )}
              </div>
            </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <p style={{ fontSize: 30, color: "#B08D6A", letterSpacing: "0.3em", margin: 0 }}>
              YOUR GEMSTONE
            </p>
            <p
              style={{
                fontSize: gemNameFontSize,
                fontWeight: 600,
                color: "#2C2C2C",
                margin: 0,
                lineHeight: 0.95,
                textAlign: "center",
                letterSpacing: "0.02em",
                fontFamily: "PP Serif",
              }}
            >
              {labelEn}
            </p>
            <div style={{ width: 280, height: 1, background: "rgba(176,141,106,0.9)", display: "flex" }} />
          </div>

          {personality && (
            <div
              style={{
                background: "rgba(0,0,0,0.06)",
                border: "1px solid rgba(176,141,106,0.35)",
                borderRadius: 28,
                padding: "28px 40px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
                maxWidth: 860,
              }}
            >
              <p style={{ fontSize: 30, fontWeight: 500, color: "#B08D6A", letterSpacing: "0.2em", margin: 0, textTransform: "uppercase" }}>
                {personality.title}
              </p>
              <p style={{ fontSize: 34, fontStyle: "italic", color: "#2C2C2C", lineHeight: 1.6, margin: 0, textAlign: "center", maxWidth: 760, fontFamily: "PP Serif" }}>
                {teaserDescription}
              </p>
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, width: "100%" }}>
          <p style={{ fontSize: 27, color: "rgba(44,44,44,0.7)", letterSpacing: "0.34em", margin: 0 }}>
            PRADAPPRADA.COM
          </p>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1920,
      fonts,
    }
  );
}
