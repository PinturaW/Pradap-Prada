import {
  gemPowerData,
  gemTypeDisplayData,
  type GemPowerCategory,
  type GemType,
} from "@/lib/gem-data";

// ═══════════════════════════════════════════════════
// BIRTHSTONES — 12 months
// ═══════════════════════════════════════════════════
export interface Birthstone {
  month: number;
  monthEn: string;
  monthTh: string;
  gemNameEn: string;
  gemNameTh: string;
  gemType: GemType;
  keyProperty: string;
  unsplashUrl: string;
}

export const birthstones: Birthstone[] = [
  {
    month: 1, monthEn: "January", monthTh: "มกราคม",
    gemNameEn: "Garnet", gemNameTh: "การ์เน็ต",
    gemType: "garnet", keyProperty: "Stone of vitality and passion",
    unsplashUrl: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=400&h=400&fit=crop",
  },
  {
    month: 2, monthEn: "February", monthTh: "กุมภาพันธ์",
    gemNameEn: "Amethyst", gemNameTh: "อเมทิสต์",
    gemType: "amethyst", keyProperty: "Stone of calm and inner wisdom",
    unsplashUrl: "https://images.unsplash.com/photo-1583937443538-4755e5deab79?w=400&h=400&fit=crop",
  },
  {
    month: 3, monthEn: "March", monthTh: "มีนาคม",
    gemNameEn: "Aquamarine", gemNameTh: "อะความารีน",
    gemType: "aquamarine", keyProperty: "Stone of courage and clarity",
    unsplashUrl: "https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?w=400&h=400&fit=crop",
  },
  {
    month: 4, monthEn: "April", monthTh: "เมษายน",
    gemNameEn: "Diamond / Zircon", gemNameTh: "เพชร / เพทาย",
    gemType: "zircon", keyProperty: "Stone of purity and strength",
    unsplashUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
  },
  {
    month: 5, monthEn: "May", monthTh: "พฤษภาคม",
    gemNameEn: "Emerald", gemNameTh: "มรกต",
    gemType: "emerald", keyProperty: "Stone of abundance and growth",
    unsplashUrl: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop",
  },
  {
    month: 6, monthEn: "June", monthTh: "มิถุนายน",
    gemNameEn: "Pearl / Moonstone", gemNameTh: "มุก / มูนสโตน",
    gemType: "moonstone", keyProperty: "Stone of purity and grace",
    unsplashUrl: "https://images.unsplash.com/photo-1551122089-4e3e72477432?w=400&h=400&fit=crop",
  },
  {
    month: 7, monthEn: "July", monthTh: "กรกฎาคม",
    gemNameEn: "Ruby", gemNameTh: "ทับทิม",
    gemType: "ruby", keyProperty: "King of gems — amplifies power and prestige",
    unsplashUrl: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
  },
  {
    month: 8, monthEn: "August", monthTh: "สิงหาคม",
    gemNameEn: "Peridot", gemNameTh: "เพอริดอต",
    gemType: "peridot", keyProperty: "Stone of radiance and good fortune",
    unsplashUrl: "https://images.unsplash.com/photo-1551122089-4e3e72477432?w=400&h=400&fit=crop&crop=bottom",
  },
  {
    month: 9, monthEn: "September", monthTh: "กันยายน",
    gemNameEn: "Sapphire", gemNameTh: "ไพลิน",
    gemType: "sapphire", keyProperty: "Gem of stability and wisdom",
    unsplashUrl: "https://images.unsplash.com/photo-1602752250015-52934bc45613?w=400&h=400&fit=crop",
  },
  {
    month: 10, monthEn: "October", monthTh: "ตุลาคม",
    gemNameEn: "Opal / Labradorite", gemNameTh: "โอปอล / ลาบราดอไรท์",
    gemType: "labradorite", keyProperty: "Stone of creativity and allure",
    unsplashUrl: "https://images.unsplash.com/photo-1602752250015-52934bc45613?w=400&h=400&fit=crop&crop=top",
  },
  {
    month: 11, monthEn: "November", monthTh: "พฤศจิกายน",
    gemNameEn: "Citrine / Amber", gemNameTh: "ซิทรีน / แอมเบอร์",
    gemType: "amber", keyProperty: "Stone of success and positive energy",
    unsplashUrl: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
  },
  {
    month: 12, monthEn: "December", monthTh: "ธันวาคม",
    gemNameEn: "Blue Zircon / Turquoise", gemNameTh: "เพชรพญานาค / เทอร์คอยซ์",
    gemType: "zircon", keyProperty: "Stone of balance and protection",
    unsplashUrl: "https://images.unsplash.com/photo-1602752250015-52934bc45613?w=400&h=400&fit=crop&crop=bottom",
  },
];

// ═══════════════════════════════════════════════════
// RING CUT SHAPES
// ═══════════════════════════════════════════════════
export interface CutShape {
  id: string;
  labelEn: string;
  labelTh: string;
  description: string;
  unsplashUrl: string;
}

export const ringCutShapes: CutShape[] = [
  {
    id: "round", labelEn: "Round", labelTh: "ทรงกลม",
    description: "The most classic cut — maximizes brilliance",
    unsplashUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
  },
  {
    id: "oval", labelEn: "Oval", labelTh: "ทรงไข่",
    description: "Elongated shape that makes fingers appear slender",
    unsplashUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
  },
  {
    id: "emerald", labelEn: "Emerald Cut", labelTh: "เอเมอรัลด์คัต",
    description: "Step-cut rectangle, sophisticated and architectural",
    unsplashUrl: "https://images.unsplash.com/photo-1633810543674-a41cf09c5e56?w=400&h=400&fit=crop",
  },
  {
    id: "heart", labelEn: "Heart", labelTh: "ทรงหัวใจ",
    description: "Romantic silhouette — the perfect sentimental gift",
    unsplashUrl: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=400&h=400&fit=crop",
  },
  {
    id: "pear", labelEn: "Pear", labelTh: "ทรงหยดน้ำ",
    description: "Unique teardrop profile, modern and individual",
    unsplashUrl: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop",
  },
];

// ═══════════════════════════════════════════════════
// BRACELET CONFIGS
// ═══════════════════════════════════════════════════
export interface BraceletConfig {
  id: string;
  charmCount: 1 | 3 | 5;
  labelEn: string;
  labelTh: string;
  description: string;
  unsplashUrl: string;
}

export const braceletConfigs: BraceletConfig[] = [
  {
    id: "single", charmCount: 1, labelEn: "1 Charm", labelTh: "1 ชาร์ม",
    description: "Clean and minimal — one bold focal charm",
    unsplashUrl: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=400&fit=crop",
  },
  {
    id: "trio", charmCount: 3, labelEn: "3 Charms", labelTh: "3 ชาร์ม",
    description: "Balanced trio — perfect for everyday wear",
    unsplashUrl: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=600&h=400&fit=crop",
  },
  {
    id: "full", charmCount: 5, labelEn: "5 Charms", labelTh: "5 ชาร์ม",
    description: "Full statement bracelet — five curated charms",
    unsplashUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=400&fit=crop",
  },
];

// ═══════════════════════════════════════════════════
// CHARM DESIGNS
// ═══════════════════════════════════════════════════
export interface CharmDesign {
  id: string;
  labelEn: string;
  labelTh: string;
  unsplashUrl: string;
}

export const charmDesigns: CharmDesign[] = [
  { id: "heart",    labelEn: "Heart",    labelTh: "หัวใจ",       unsplashUrl: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=300&h=300&fit=crop" },
  { id: "round",    labelEn: "Round",    labelTh: "ทรงกลม",      unsplashUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop" },
  { id: "star",     labelEn: "Star",     labelTh: "ดาว",          unsplashUrl: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300&h=300&fit=crop" },
  { id: "square",   labelEn: "Square",   labelTh: "สี่เหลี่ยม", unsplashUrl: "https://images.unsplash.com/photo-1633810543674-a41cf09c5e56?w=300&h=300&fit=crop" },
  { id: "moon",     labelEn: "Moon",     labelTh: "พระจันทร์",   unsplashUrl: "https://images.unsplash.com/photo-1551122089-4e3e72477432?w=300&h=300&fit=crop" },
  { id: "teardrop", labelEn: "Teardrop", labelTh: "หยดน้ำ",      unsplashUrl: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=300&h=300&fit=crop" },
  { id: "almond",   labelEn: "Almond",   labelTh: "อัลมอนด์",   unsplashUrl: "https://images.unsplash.com/photo-1583937443538-4755e5deab79?w=300&h=300&fit=crop" },
];

// ═══════════════════════════════════════════════════
// CHAIN STYLES (Necklace Step 1)
// ═══════════════════════════════════════════════════
export interface ChainStyle {
  id: string;
  labelEn: string;
  labelTh: string;
  description: string;
  unsplashUrl: string;
}

export const chainStyles: ChainStyle[] = [
  {
    id: "chain", labelEn: "Chain", labelTh: "เชน",
    description: "Classic necklace chain for everyday elegance",
    unsplashUrl: "https://images.unsplash.com/photo-1633810543674-a41cf09c5e56?w=400&h=300&fit=crop",
  },
  {
    id: "rope", labelEn: "Rope", labelTh: "เวฟ / โรป",
    description: "Twisted rope texture with a soft luxury look",
    unsplashUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
  },
  {
    id: "box", labelEn: "Box", labelTh: "บ็อกซ์",
    description: "Modern square-link profile, clean and structured",
    unsplashUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop",
  },
  {
    id: "pearl-bead", labelEn: "Pearl & Bead", labelTh: "สายมุกและลูกปัด",
    description: "Soft and romantic — classic pearl strand",
    unsplashUrl: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=300&fit=crop",
  },
];

// ═══════════════════════════════════════════════════
// NECKLACE PENDANT STYLES (Necklace Step 2)
// ═══════════════════════════════════════════════════
export interface NecklacePendantStyle {
  id: string;
  labelEn: string;
  labelTh: string;
  description: string;
  unsplashUrl: string;
}

export const necklacePendantStyles: NecklacePendantStyle[] = [
  {
    id: "transparent", labelEn: "Transparent", labelTh: "โปร่งใส",
    description: "Open look that lets the gemstone be the main focus",
    unsplashUrl: "https://images.unsplash.com/photo-1633810543674-a41cf09c5e56?w=400&h=400&fit=crop&crop=top",
  },
  {
    id: "bezel", labelEn: "Bezel Setting", labelTh: "เบเซล",
    description: "Single bezel rim for a clean and secure setting",
    unsplashUrl: "https://images.unsplash.com/photo-1602752250015-52934bc45613?w=400&h=400&fit=crop",
  },
  {
    id: "double-bezel", labelEn: "Double Bezel", labelTh: "ดับเบิลเบเซล",
    description: "Double-frame bezel for extra depth and statement style",
    unsplashUrl: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
  },
];

// ═══════════════════════════════════════════════════
// NECKLACE GEM OPTIONS (Necklace Step 3)
// ═══════════════════════════════════════════════════
export interface PendantGem {
  id: string;
  gemType: GemType;
  labelEn: string;
  labelTh: string;
  unsplashUrl: string;
}

export const gemPowerOrderByCategory: Record<GemPowerCategory, GemType[]> = {
  love: ["chalcedony", "emerald", "moonstone", "rhodolite-garnet", "rose-quartz"],
  luck: ["yellow-sapphire", "zircon"],
  wisdom: ["apatite", "ruby"],
  balance: [
    "amethyst",
    "aquamarine",
    "ruby-zoisite",
    "sapphire",
  ],
  protection: [
    "black-star-sapphire",
    "garnet",
    "amber",
  ],
};

const allWalkthroughGemTypes = Object.values(gemPowerOrderByCategory).flat();

export const walkthroughGems: PendantGem[] = (allWalkthroughGemTypes
  .map((gemType) => {
    const power = gemPowerData[gemType];
    const display = gemTypeDisplayData[gemType];
    if (!power || !display) return null;
    return {
      id: gemType as string,
      gemType,
      labelEn: display.nameEn,
      labelTh: display.nameTh,
      unsplashUrl: power.unsplashUrl,
    };
  })
  .filter((gem) => gem !== null)) as PendantGem[];

export const necklaceGems: PendantGem[] = [
  ...walkthroughGems,
];

// ═══════════════════════════════════════════════════
// BAIL / HOOK STYLES (Pendant Step 2A)
// ═══════════════════════════════════════════════════
export interface BailStyle {
  id: string;
  labelEn: string;
  labelTh: string;
  description: string;
  unsplashUrl: string;
}

export const bailStyles: BailStyle[] = [
  {
    id: "simple", labelEn: "Simple Bail", labelTh: "ห่วงเรียบ",
    description: "Clean and versatile — fits any occasion",
    unsplashUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop&crop=top",
  },
  {
    id: "ornate", labelEn: "Ornate Bail", labelTh: "ห่วงลวดลาย",
    description: "Decorative detail — adds a luxurious touch",
    unsplashUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&crop=top",
  },
  {
    id: "ring", labelEn: "Ring Bail", labelTh: "ห่วงแหวน",
    description: "Large ring — allows the pendant to move freely",
    unsplashUrl: "https://images.unsplash.com/photo-1633810543674-a41cf09c5e56?w=300&h=300&fit=crop&crop=top",
  },
  {
    id: "s-hook", labelEn: "S-Hook", labelTh: "เกี่ยว S",
    description: "S-shaped hook — easy to attach and remove",
    unsplashUrl: "https://images.unsplash.com/photo-1583937443538-4755e5deab79?w=300&h=300&fit=crop&crop=top",
  },
];

// ═══════════════════════════════════════════════════
// PENDANT GEM OPTIONS (Pendant Step 1)
// ═══════════════════════════════════════════════════
export const pendantGems: PendantGem[] = [
  ...walkthroughGems,
];

// ═══════════════════════════════════════════════════
// PENDANT GEM CUT SHAPES (Pendant Step 2B)
// ═══════════════════════════════════════════════════
export const pendantCutShapes: CutShape[] = [
  {
    id: "oval",      labelEn: "Oval",      labelTh: "ทรงไข่",       description: "Elongated oval — adds visual height",
    unsplashUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop",
  },
  {
    id: "round",     labelEn: "Round",     labelTh: "ทรงกลม",       description: "Classic round — maximum light reflection",
    unsplashUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop",
  },
  {
    id: "teardrop",  labelEn: "Teardrop",  labelTh: "หยดน้ำ",       description: "Graceful teardrop — fluid and beautiful",
    unsplashUrl: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=300&h=300&fit=crop",
  },
  {
    id: "pear",      labelEn: "Pear",      labelTh: "ทรงแพร์",      description: "Pear-shaped — distinctive and modern",
    unsplashUrl: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=300&h=300&fit=crop",
  },
  {
    id: "princess",  labelEn: "Princess",  labelTh: "ทรงเจ้าหญิง",  description: "Geometric precision — elegant and sharp",
    unsplashUrl: "https://images.unsplash.com/photo-1633810543674-a41cf09c5e56?w=300&h=300&fit=crop",
  },
  {
    id: "snowflake", labelEn: "Snowflake", labelTh: "ทรงดาวหิมะ",   description: "Unique snowflake — unlike anything else",
    unsplashUrl: "https://images.unsplash.com/photo-1583937443538-4755e5deab79?w=300&h=300&fit=crop",
  },
  {
    id: "marquise",  labelEn: "Marquise",  labelTh: "ทรงเรือ",       description: "Long marquise — elongates and flatters",
    unsplashUrl: "https://images.unsplash.com/photo-1602752250015-52934bc45613?w=300&h=300&fit=crop",
  },
  {
    id: "cushion",   labelEn: "Cushion",   labelTh: "ทรงหมอน",      description: "Soft cushion shape — timeless comfort",
    unsplashUrl: "https://images.unsplash.com/photo-1551122089-4e3e72477432?w=300&h=300&fit=crop",
  },
];

// ═══════════════════════════════════════════════════
// PRODUCT CATEGORY CARDS (Customize Hub)
// ═══════════════════════════════════════════════════
export interface ProductCategory {
  id: string;
  href: string;
  labelEn: string;
  labelTh: string;
  tagline: string;
  stepCount: number;
  unsplashUrl: string;
}

export interface FixedDesign {
  labelEn: string;
  labelTh: string;
  subtitle: string;
  imageUrl: string;
}

export interface FixedProductDetail {
  productName: string;
  shippingNote: string;
  details: string;
  description: string;
  materials: string;
}

// ═══════════════════════════════════════════════════
// PRICING DATA
// ═══════════════════════════════════════════════════

// ค่างานฝีมือ (Category Adjustment) per jewelry type in ฿
export const categoryAdjustments: Record<string, number> = {
  ring:     1290,
  earring:  1490,
  necklace: 1990,
  bracelet: 1790,
  pendant:  1500,
};

// ค่าพลอย (Gem Adjustment) per gem type in ฿
export const gemBasePrices: Partial<Record<GemType, number>> = {
  // Premium
  ruby:                    600,
  emerald:                3600,
  sapphire:                  0,
  "black-star-sapphire":  5100,
  "golden-star-sapphire": 5100,
  "yellow-sapphire":      1600,
  // Mid-range
  aquamarine:                0,
  "rhodolite-garnet":      100,
  "spessartite-garnet":      0,
  moonstone:                 0,
  "sapphire-rough":          0,
  apatite:                   0,
  "ruby-zoisite":            0,
  "lapis-lazuli":            0,
  amber:                      0,
  // Accessible
  zircon:                    0,
  garnet:                    0,
  chalcedony:             1100,
  amethyst:                  0,
  fluorite:                  0,
  "rose-quartz":          400,
};

export const productCategories: ProductCategory[] = [
  {
    id: "ring", href: "/customize/ring",
    labelEn: "Lotus Bloom Ring", labelTh: "ดอกบัว",
    tagline: "Gem · Size",
    stepCount: 2,
    unsplashUrl: "/images/collection/lotus-bloom-ring.png",
  },
  {
    id: "earring", href: "/customize/earring",
    labelEn: "Lamduan Drop Earrings", labelTh: "ดอกลำดวน",
    tagline: "Gem",
    stepCount: 1,
    unsplashUrl: "/images/collection/lamduan-drop-earrings.png",
  },
  {
    id: "bracelet", href: "/customize/bracelet",
    labelEn: "Kritsana Bangle", labelTh: "ดอกกฤษณา",
    tagline: "Gem",
    stepCount: 1,
    unsplashUrl: "/images/collection/kritsana-bangle.png",
  },
  {
    id: "necklace", href: "/customize/necklace",
    labelEn: "Ylang Pendant Necklace", labelTh: "ดอกกระดังงา",
    tagline: "Gem",
    stepCount: 1,
    unsplashUrl: "/images/collection/ylang-pendant-necklace.png",
  },
];

export const fixedDesignByType: Record<string, FixedDesign> = {
  ring: {
    labelEn: "Lotus Bloom Ring",
    labelTh: "ดอกบัว",
    subtitle: "Inspired by the pink lotus, Thailand's symbol of purity and spiritual awakening.",
    imageUrl: "/images/collection/lotus-bloom-ring.png",
  },
  earring: {
    labelEn: "Lamduan Drop Earrings",
    labelTh: "ดอกลำดวน",
    subtitle: "Inspired by the five-petaled Lamduan blossom and its understated beauty.",
    imageUrl: "/images/collection/lamduan-drop-earrings.png",
  },
  necklace: {
    labelEn: "Ylang Pendant Necklace",
    labelTh: "ดอกกระดังงา",
    subtitle: "A pendant inspired by Ylang Ylang's long, softly curling petals.",
    imageUrl: "/images/collection/ylang-pendant-necklace.png",
  },
  bracelet: {
    labelEn: "Kritsana Bangle",
    labelTh: "ดอกกฤษณา",
    subtitle: "An open-cuff bangle inspired by Kritsana's rare, quietly magnetic character.",
    imageUrl: "/images/collection/kritsana-bangle.png",
  },
};

export const fixedProductDetailByType: Record<string, FixedProductDetail> = {
  ring: {
    productName: "Lotus Bloom Ring",
    shippingNote: "Shipping calculated at checkout.",
    details:
      "Born from the sacred waters of Thailand, the lotus rises pure and untouched above the mud beneath. Like the women who wear it, this ring carries the quiet power of grace under pressure — blooming beautifully no matter the depth from which you grow.",
    description:
      "A delicate ring inspired by the layered petals of the pink lotus, Thailand's symbol of purity and spiritual awakening. The lotus form cradles a hand-selected gemstone at its heart, making every piece a meditation in elegant simplicity.",
    materials:
      "Sterling Silver 925 band • Hand-selected natural gemstone center stone • Handcrafted by female artisans in Trat Province",
  },
  earring: {
    productName: "Lamduan Drop Earrings",
    shippingNote: "Shipping calculated at checkout.",
    details:
      "The Lamduan flower blooms quietly in the evening, releasing its fragrance only when the world slows down. These earrings are for the woman who carries her elegance softly — noticed not by noise, but by presence.",
    description:
      "Inspired by the five-petaled Lamduan blossom, these drop earrings capture the flower's understated beauty in wearable form. Light-catching and refined, they move gently with you — a whisper of luxury at every turn.",
    materials:
      "Sterling Silver 925 • Genuine gemstone accent stones • Hypoallergenic ear hooks • Handcrafted by female artisans in Trat Province",
  },
  necklace: {
    productName: "Ylang Pendant Necklace",
    shippingNote: "Shipping calculated at checkout.",
    details:
      "The Ylang Ylang — known as the flower of flowers — has perfumed the world's most iconic fragrances for centuries. Long, slender petals that curl softly at the edges, a scent that lingers long after you've left the room. This necklace is for the woman who leaves an impression without trying.",
    description:
      "A long pendant necklace inspired by the elongated, drooping petals of the Ylang Ylang bloom. The pendant rests at the heart — intentionally designed to be the piece people lean in to look at. Simple in form, unforgettable in feeling.",
    materials:
      "Sterling Silver 925 chain • Natural gemstone pendant stone • Adjustable chain length 40–45cm • Handcrafted by female artisans in Trat Province",
  },
  bracelet: {
    productName: "Kritsana Bangle",
    shippingNote: "Shipping calculated at checkout.",
    details:
      "The Kritsana — Trat's provincial flower — is one of Thailand's rarest and most precious blooms, known for its dark, intoxicating fragrance. Just as the tree must endure to produce its prized resin, this bangle is a reminder that depth and rarity are born from resilience.",
    description:
      "An open-cuff bangle inspired by Kritsana's rare, quietly magnetic character.",
    materials:
      "Sterling Silver 925 cuff • Natural gemstone end stones • Open adjustable cuff design • Handcrafted by female artisans in Trat Province",
  },
};
