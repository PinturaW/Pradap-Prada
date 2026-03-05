export type GemType =
  | "ruby"
  | "sapphire"
  | "black-star-sapphire"
  | "golden-star-sapphire"
  | "sapphire-rough"
  | "yellow-sapphire"
  | "zircon"
  | "amber"
  | "labradorite"
  | "amethyst"
  | "rose-quartz"
  | "chalcedony"
  | "fluorite"
  | "moonstone"
  | "tiger-eye"
  | "garnet"
  | "spessartite-garnet"
  | "rhodolite-garnet"
  | "ruby-zoisite"
  | "peridot"
  | "emerald"
  | "apatite"
  | "aquamarine"
  | "tourmaline"
  | "lapis-lazuli";

export const allowedGemTypes = [
  "amethyst",
  "apatite",
  "aquamarine",
  "black-star-sapphire",
  "chalcedony",
  "emerald",
  "fluorite",
  "spessartite-garnet",
  "garnet",
  "golden-star-sapphire",
  "lapis-lazuli",
  "moonstone",
  "rhodolite-garnet",
  "rose-quartz",
  "ruby",
  "ruby-zoisite",
  "sapphire",
  "sapphire-rough",
  "yellow-sapphire",
  "zircon",
  "amber",
] as const satisfies GemType[];

export type GemShape =
  | "round"
  | "oval"
  | "cushion"
  | "emerald"
  | "pear"
  | "heart"
  | "cabochon"
  | "freeform";

export type GemStatus = "available" | "reserved" | "rare" | "sold";
export type PriceRange = "all" | "under1k" | "1k-3k" | "3k-5k" | "over5k";

export interface GemSpec {
  colorGrade: string;
  clarity: string;
  cut: string;
  carat: number;
  dimensions: string;
  inclusions: string;
}

export interface Gem {
  id: number;
  code: string;
  nameTh: string;
  nameEn: string;
  type: GemType;
  shape: GemShape;
  carat: number;
  price: number;
  origin: string;
  originTh: string;
  status: GemStatus;
  image: string;
  yearMined: number;
  color?: string;
  certified?: string;
  storyTh: string;
  storyEn: string;
  spec: GemSpec;
  spiritualTh: string;
  spiritualEn: string;
}

// Gem color gradients for card backgrounds
export const gemGradients: Record<GemType, string> = {
  ruby:            "from-red-950 via-rose-900 to-red-800",
  sapphire:        "from-blue-950 via-blue-900 to-indigo-800",
  "black-star-sapphire": "from-slate-950 via-indigo-950 to-slate-900",
  "golden-star-sapphire": "from-amber-900 via-yellow-800 to-amber-700",
  "sapphire-rough": "from-slate-800 via-blue-900 to-slate-700",
  "yellow-sapphire": "from-amber-800 via-yellow-700 to-amber-600",
  zircon:          "from-cyan-800 via-teal-700 to-cyan-600",
  amber:           "from-orange-800 via-amber-700 to-orange-600",
  labradorite:     "from-slate-900 via-blue-900 to-slate-800",
  amethyst:        "from-purple-950 via-violet-900 to-purple-800",
  "rose-quartz":   "from-pink-700 via-rose-600 to-pink-800",
  chalcedony:      "from-sky-700 via-cyan-600 to-sky-500",
  fluorite:        "from-fuchsia-800 via-violet-700 to-emerald-700",
  moonstone:       "from-slate-600 via-blue-300 to-slate-500",
  "tiger-eye":     "from-amber-900 via-amber-700 to-yellow-800",
  garnet:          "from-red-950 via-red-900 to-rose-950",
  "spessartite-garnet": "from-orange-900 via-red-800 to-orange-700",
  "rhodolite-garnet": "from-rose-900 via-fuchsia-800 to-rose-700",
  "ruby-zoisite": "from-emerald-900 via-red-900 to-emerald-700",
  peridot:         "from-green-800 via-lime-700 to-green-700",
  emerald:         "from-emerald-950 via-green-900 to-emerald-800",
  apatite:         "from-cyan-900 via-blue-800 to-cyan-700",
  aquamarine:      "from-cyan-700 via-teal-600 to-cyan-800",
  tourmaline:      "from-emerald-800 via-teal-700 to-emerald-700",
  "lapis-lazuli":  "from-blue-950 via-indigo-900 to-blue-950",
};

// Gem accent colors for UI elements
export const gemAccentColors: Record<GemType, string> = {
  ruby: "#9B1B30",
  sapphire: "#1B3A9B",
  "black-star-sapphire": "#0F172A",
  "golden-star-sapphire": "#A9761A",
  "sapphire-rough": "#334155",
  "yellow-sapphire": "#C49B2F",
  zircon: "#4A90A4",
  amber: "#D97706",
  labradorite: "#3B6B8A",
  amethyst: "#7B2D8E",
  "rose-quartz": "#E8A0BF",
  chalcedony: "#60A5FA",
  fluorite: "#8B5CF6",
  moonstone: "#B8C4D0",
  "tiger-eye": "#B8860B",
  garnet: "#8B0000",
  "spessartite-garnet": "#C2410C",
  "rhodolite-garnet": "#BE185D",
  "ruby-zoisite": "#15803D",
  peridot: "#6B8E23",
  emerald: "#166534",
  apatite: "#0E7490",
  aquamarine: "#5BB5D5",
  tourmaline: "#2E8B57",
  "lapis-lazuli": "#1B3A8A",
};

// ═══════════════════════════════════════════════════
// GEM POWER DATA — for PRADAP PRADA Category Section
// ═══════════════════════════════════════════════════
export type GemPowerCategory = "love" | "luck" | "wisdom" | "balance" | "protection";

export interface GemPowerInfo {
  powerCategory: GemPowerCategory;
  powerTagline: string;
  meaningTh: string;
  colorHex: string;
  unsplashUrl: string;
}

export const gemPowerData: Partial<Record<GemType, GemPowerInfo>> = {
  "chalcedony": {
    powerCategory: "love",
    powerTagline: "Stone of Friendship & Charm",
    meaningTh:
      "Radiates warm, inviting energy that strengthens harmonious relationships and deepens lasting friendships. It helps reduce daily stress while acting as a gentle amulet for steady good luck and personal magnetism.",
    colorHex: "#B0C4DE",
    unsplashUrl: "/gem-power/chalcedony.png",
  },
  "emerald": {
    powerCategory: "love",
    powerTagline: "Symbol of Faith & True Love",
    meaningTh:
      "Celebrated for attracting unconditional love and elevating reputation and fame. It is believed to support vitality by encouraging healthy energy flow and blood circulation.",
    colorHex: "#50C878",
    unsplashUrl: "/gem-power/emerald.png",
  },
  "moonstone": {
    powerCategory: "love",
    powerTagline: "Gem of New Beginnings",
    meaningTh:
      "A gentle stone of love, sensitivity, and feminine energy. It soothes emotional instability, bringing calmness, inner peace, and a renewed perspective through life transitions.",
    colorHex: "#E8E8F0",
    unsplashUrl: "/gem-power/moonstone.png",
  },
  "rhodolite-garnet": {
    powerCategory: "love",
    powerTagline: "Stone of Compassion",
    meaningTh:
      "Draws genuine love and opens the heart deeply to others. It helps heal past emotional wounds, restoring harmony and balancing your overall energy field.",
    colorHex: "#B5446E",
    unsplashUrl: "/gem-power/rhodolite-garnet.png",
  },
  "rose-quartz": {
    powerCategory: "love",
    powerTagline: "Ultimate Stone of Unconditional Love",
    meaningTh:
      "Radiates gentle energies of love and forgiveness, ideal for attracting romance and strengthening existing bonds. It supports emotional healing and an open, compassionate heart.",
    colorHex: "#F4C2C2",
    unsplashUrl: "/gem-power/rose-quartz.png",
  },

  "golden-star-sapphire": {
    powerCategory: "luck",
    powerTagline: "Symbol of Honesty & Hope",
    meaningTh:
      "A prestigious gemstone linked with positive faith and major wealth attraction. It elevates charisma, prosperity, and distinguished social standing.",
    colorHex: "#C8A951",
    unsplashUrl: "/gem-power/golden-star-sapphire.png",
  },
  "yellow-sapphire": {
    powerCategory: "luck",
    powerTagline: "Gem of Prosperity & Charm",
    meaningTh:
      "Invites personal magnetism, romantic luck, and financial abundance. It boosts confidence and supports profitable, life-enhancing decisions.",
    colorHex: "#FFD700",
    unsplashUrl: "/gem-power/yellow-sapphire.png",
  },
  "zircon": {
    powerCategory: "luck",
    powerTagline: "Gem of Abundance",
    meaningTh:
      "Associated with riches, honor, and grounding energy. It sharpens intelligence and is traditionally used as a protective talisman against negativity.",
    colorHex: "#4FC3F7",
    unsplashUrl: "/gem-power/zircon.png",
  },

  "apatite": {
    powerCategory: "wisdom",
    powerTagline: "Stone of Inspiration",
    meaningTh:
      "Stimulates creativity and supports clear, confident communication through throat-chakra energy. It attracts fresh opportunities and momentum in life.",
    colorHex: "#00CED1",
    unsplashUrl: "/gem-power/apatite.png",
  },
  "fluorite": {
    powerCategory: "wisdom",
    powerTagline: "Crystal of Mental Clarity",
    meaningTh:
      "Helps organize scattered thoughts, improve memory retention, and accelerate learning. It also clears mental fog and lingering negative energy.",
    colorHex: "#7B68EE",
    unsplashUrl: "/gem-power/fluorite.png",
  },
  "lapis-lazuli": {
    powerCategory: "wisdom",
    powerTagline: "Stone of Knowledge & Insight",
    meaningTh:
      "Awakens intellect, inner wisdom, and the pursuit of truth. It is an excellent companion for deeper meditation and spiritual expansion.",
    colorHex: "#26619C",
    unsplashUrl: "/gem-power/lapis-lazuli.png",
  },
  "ruby": {
    powerCategory: "wisdom",
    powerTagline: "King of Gemstones",
    meaningTh:
      "A revered symbol of success, prestige, and life force. It instills courage, confidence, and the determination to pursue your highest ambitions.",
    colorHex: "#9B1B30",
    unsplashUrl: "/gem-power/ruby.png",
  },

  "amethyst": {
    powerCategory: "balance",
    powerTagline: "Stone of Peace & Protection",
    meaningTh:
      "Helps reduce stress and anxiety while enhancing concentration and spiritual awareness. It also acts as a protective shield against negative energies.",
    colorHex: "#9B59B6",
    unsplashUrl: "/gem-power/amethyst.png",
  },
  "aquamarine": {
    powerCategory: "balance",
    powerTagline: "Stone of Courage & Peace",
    meaningTh:
      "Its calming oceanic energy eases fear and daily stress. It surrounds the wearer with protection and supports clear, honest communication.",
    colorHex: "#7FFFD4",
    unsplashUrl: "/gem-power/aquamarine.png",
  },
  "black-star-sapphire": {
    powerCategory: "protection",
    powerTagline: "Gem of Ultimate Defense",
    meaningTh:
      "Provides grounding stability and reflects away harmful thoughts or intentions. It reinforces decision-making and subtly attracts steady wealth.",
    colorHex: "#1C1C2E",
    unsplashUrl: "/gem-power/black-star-sapphire.png",
  },
  "spessartite-garnet": {
    powerCategory: "balance",
    powerTagline: "Stone of Fiery Courage",
    meaningTh:
      "Radiates intense fire energy as a protective shield. It activates life force, ignites passion, and builds bold, unshakeable confidence.",
    colorHex: "#D2691E",
    unsplashUrl: "/gem-power/spessartite-garnet.png",
  },
  "garnet": {
    powerCategory: "protection",
    powerTagline: "Gem of Vitality & Power",
    meaningTh:
      "Offers formidable protection while revitalizing spirit and overcoming sluggishness. It awakens passion and empowers courageous action.",
    colorHex: "#8B0000",
    unsplashUrl: "/gem-power/garnet.png",
  },
  "ruby-zoisite": {
    powerCategory: "balance",
    powerTagline: "Heart-Mind Connector",
    meaningTh:
      "Aligns logic and emotion for balanced decisions. It boosts inner encouragement and self-belief while gently supporting healing and immunity.",
    colorHex: "#5C8A4A",
    unsplashUrl: "/gem-power/ruby-zoisite.png",
  },
  "sapphire": {
    powerCategory: "balance",
    powerTagline: "Gem of Stability & Virtue",
    meaningTh:
      "Regulates turbulent emotions and strengthens quiet confidence. It carries noble, protective energy that guards against unseen danger.",
    colorHex: "#0F52BA",
    unsplashUrl: "/gem-power/sapphire.png",
  },
  "amber": {
    powerCategory: "protection",
    powerTagline: "Ultimate Healing Stone",
    meaningTh:
      "Acts as a natural purifier that absorbs negativity and transforms it into positive energy. It restores joyful vitality and attracts good luck.",
    colorHex: "#FFBF00",
    unsplashUrl: "/gem-power/amber.png",
  },
};

export const gemPowerCategoryLabels: Record<GemPowerCategory, string> = {
  love: "Love ♡",
  luck: "Luck & Wealth ✦",
  wisdom: "Wisdom & Success ★",
  balance: "Balance ◎",
  protection: "Protection ◈",
};

export const gemLongMeaningData: Partial<Record<GemType, string>> = {
  "chalcedony": "The Stone of Friendship & Charm. It radiates a warm, inviting energy that promotes harmonious relationships and deepens lasting friendships. Alongside its ability to reduce daily stress, it acts as a gentle amulet that brings consistent good luck and personal magnetism.",
  "emerald": "The Symbol of Faith & True Love. This lush gemstone is celebrated for bringing unconditional love and elevating one's public reputation and fame. Physically and spiritually, it is believed to promote vitality by encouraging healthy energy and blood circulation.",
  "moonstone": "The Gem of New Beginnings. A gentle, ethereal stone representing love, sensitivity, and feminine energy. It beautifully soothes emotional instability, bringing profound calmness, inner peace, and a fresh perspective during life's transitions.",
  "rhodolite-garnet": "The Stone of Compassion. A powerful crystal for attracting genuine love and fully opening the heart to others. It works deeply to heal past emotional wounds, seamlessly restoring harmony and balancing your overall energy field.",
  "rose-quartz": "The Ultimate Stone of Unconditional Love. It constantly radiates gentle energies of love and forgiveness, making it perfect for attracting romantic partners and strengthening existing bonds. It delicately heals emotional trauma and encourages a truly open, compassionate heart.",
  "golden-star-sapphire": "The Symbol of Honesty & Hope. Radiating with positive faith, this highly prestigious and majestic gemstone naturally attracts extreme wealth. It elevates the wearer's charisma, bringing lasting prosperity and distinguished social standing.",
  "yellow-sapphire": "The Gem of Prosperity & Charm. It brings immense personal magnetism, romantic luck, and abundant financial wealth. It greatly boosts self-confidence, empowering the wearer to make excellent, profitable, and life-enhancing decisions.",
  "zircon": "The Gem of Abundance. A magnificent stone that ushers in immense riches, high honor, and physical grounding. It also sharpens intelligence and has historically served as a powerful protective talisman to warn its wearer against incoming negativity.",
  "apatite": "The Stone of Inspiration. It vigorously stimulates creativity and opens the throat chakra, empowering you to communicate with clarity and confidence. This dynamic energy acts as a magnet, constantly drawing new and exciting opportunities into your life.",
  "fluorite": "The Crystal of Mental Clarity. Highly effective for organizing chaotic thoughts, it significantly boosts memory retention and accelerates the learning process. It also acts as a mental detox, drawing out mental fog and lingering negative energies.",
  "lapis-lazuli": "The Stone of Knowledge & Insight. It awakens the mind and inner wisdom by stimulating intellectual abilities and the desire for truth. It is an excellent companion for achieving deep, meaningful meditation and expanding one's spiritual awareness.",
  "ruby": "The King of Gemstones. A highly revered symbol of ultimate success, elevated prestige, and vibrant life force. It instills absolute courage, bold confidence, and the unwavering determination needed to achieve your highest ambitions.",
  "amethyst": "The Stone of Peace & Protection. It masterfully reduces stress and anxiety while enhancing deep concentration and spiritual awakening. Additionally, it serves as a powerful shield to block and ward off negative energies from your surroundings.",
  "aquamarine": "The Stone of Courage & Peace. Known for its calming oceanic energy, it washes away deep-seated fears and significantly relieves daily stress. It wraps the wearer in a protective aura while promoting crystal-clear, honest communication.",
  "black-star-sapphire": "The Gem of Ultimate Defense. It provides grounding stability and acts as a mirror, actively reflecting away negative thoughts and malicious intentions. It also reinforces unwavering decision-making skills while subtly attracting steady wealth.",
  "spessartite-garnet": "The Stone of Fiery Courage. Radiating with intense fire energy, it serves as a robust protective shield for the wearer. It powerfully stimulates your core life force, igniting passion and building unshakeable, bold self-confidence.",
  "garnet": "The Gem of Vitality & Power. Offering formidable protection, this vibrant stone deeply revitalizes the spirit and overcomes sluggishness. It awakens dormant passions, boosts your life force energy, and empowers you to face challenges with courage.",
  "ruby-zoisite": "The Heart-Mind Connector. It beautifully aligns the logical brain with the emotional heart, ensuring balanced decision-making. It provides a surge of inner encouragement and self-belief, while also gently supporting physical healing and the immune system.",
  "sapphire": "The Gem of Stability & Virtue. A noble stone that helps regulate turbulent emotions and instills deep, quiet self-assurance. It holds a commanding, authoritative power designed to fiercely protect its wearer from unseen dangers and harm.",
  "amber": "The Ultimate Healing Stone. Acting as a natural energetic purifier, it absorbs negative energy and magically transforms it into bright, positive vibrations. It restores joyful vitality, uplifts the spirit, and constantly ushers in good luck.",
};

// Gem type display data
export const gemTypeDisplayData: Partial<Record<GemType, { nameTh: string; nameEn: string }>> = {
  "ruby":               { nameTh: "ทับทิม",           nameEn: "Ruby" },
  "sapphire":           { nameTh: "ไพลิน",            nameEn: "Sapphire" },
  "black-star-sapphire": { nameTh: "แบล็คสตาร์แซฟไฟร์", nameEn: "Black Star Sapphire" },
  "golden-star-sapphire": { nameTh: "โกลเด้นสตาร์ไพลิน", nameEn: "Golden Star Sapphire" },
  "sapphire-rough":     { nameTh: "ไพลินดิบ",         nameEn: "Sapphire Rough" },
  "yellow-sapphire":    { nameTh: "บุษราคัม",          nameEn: "Yellow Sapphire" },
  "zircon":             { nameTh: "เพทาย",             nameEn: "Zircon" },
  "amber":              { nameTh: "แอมเบอร์",          nameEn: "Amber" },
  "labradorite":        { nameTh: "ลาบราดอไรท์",       nameEn: "Labradorite" },
  "amethyst":           { nameTh: "อเมทิสต์",          nameEn: "Amethyst" },
  "rose-quartz":        { nameTh: "โรสควอตซ์",        nameEn: "Rose Quartz" },
  "chalcedony":         { nameTh: "คาลซิโดนี",        nameEn: "Chalcedony" },
  "fluorite":           { nameTh: "ฟลูออไรท์",        nameEn: "Fluorite" },
  "moonstone":          { nameTh: "มูนสโตน",           nameEn: "Moonstone" },
  "tiger-eye":          { nameTh: "ตาเสือ",            nameEn: "Tiger Eye" },
  "garnet":             { nameTh: "โกเมน",             nameEn: "Garnet" },
  "spessartite-garnet": { nameTh: "โกเมนสเปคซาร์ไทร์", nameEn: "Spessartite Garnet" },
  "rhodolite-garnet":   { nameTh: "โรโดไลท์",         nameEn: "Rhodolite Garnet" },
  "ruby-zoisite":       { nameTh: "รูบี้ ซอยไซต์",   nameEn: "Ruby Zoisite" },
  "peridot":            { nameTh: "เพอริดอต",          nameEn: "Peridot" },
  "emerald":            { nameTh: "มรกต",              nameEn: "Emerald" },
  "apatite":            { nameTh: "อะพาไทต์",         nameEn: "Apatite" },
  "aquamarine":         { nameTh: "อะความารีน",        nameEn: "Aquamarine" },
  "tourmaline":         { nameTh: "ทัวร์มาลีน",       nameEn: "Tourmaline" },
  "lapis-lazuli":       { nameTh: "ลาพิส ลาซูลี",    nameEn: "Lapis Lazuli" },
};

export const gems: Gem[] = [
  // ═══════════════════════════════════════════════════
  // LABRADORITE (ลาบราดอไรท์) - จี้เงินแท้ S925
  // ═══════════════════════════════════════════════════
  {
    id: 101, code: "LB-A1092", nameTh: "Labradorite ทรงเพชรยาว #A", nameEn: "Labradorite Diamond #A",
    type: "labradorite", shape: "freeform", carat: 2.0, price: 1092,
    origin: "Madagascar", originTh: "มาดากัสการ์", status: "available",
    image: "/images/labradorite-raw.png",
    yearMined: 2024,
    storyTh: "Labradorite เงินแท้ S925 ดีไซน์ทรงเพชรยาว ช่วยขับให้แสงเหลือบสีฟ้า-เขียวดูเด่นเวลาสะท้อนแสง ใส่เดี่ยวๆก็สวยบนหน้าอกแบบพอดีๆ",
    storyEn: "Labradorite pendant in S925 silver, diamond-shaped design. Beautiful blue-green flash.",
    spiritualTh: "หินแห่งการเปลี่ยนแปลง ช่วยเสริมสัญชาตญาณ ปกป้องพลังงานลบ เพิ่มความมั่นใจ เหมาะกับคนที่กำลังเริ่มต้นสิ่งใหม่",
    spiritualEn: "Stone of transformation. Enhances intuition, protects against negativity.",
    spec: { colorGrade: "Blue Flash", clarity: "Translucent", cut: "Cabochon Diamond Shape", carat: 2.0, dimensions: "2.04 x 1.37 cm", inclusions: "เป็นหินธรรมชาติอาจมีรอยบ้าง" },
  },
  {
    id: 102, code: "LB-B1092", nameTh: "Labradorite ทรงเพชรยาว #B", nameEn: "Labradorite Diamond #B",
    type: "labradorite", shape: "freeform", carat: 2.1, price: 1092,
    origin: "Madagascar", originTh: "มาดากัสการ์", status: "sold",
    image: "https://images.unsplash.com/photo-1602752250015-52934bc45613?w=600&h=750&fit=crop&crop=top",
    yearMined: 2024,
    storyTh: "Labradorite เม็ด #B แสงเหลือบสีฟ้าอมเขียว สวยเป็นเอกลักษณ์ไม่ซ้ำใคร",
    storyEn: "Labradorite pendant #B. Unique blue-green flash.",
    spiritualTh: "หินแห่งการเปลี่ยนแปลง ช่วยเสริมสัญชาตญาณ ปกป้องพลังงานลบ",
    spiritualEn: "Stone of transformation.",
    spec: { colorGrade: "Blue-Green Flash", clarity: "Translucent", cut: "Cabochon Diamond Shape", carat: 2.1, dimensions: "2.04 x 1.37 cm", inclusions: "เป็นหินธรรมชาติอาจมีรอยบ้าง" },
  },
  {
    id: 103, code: "LB-C1092", nameTh: "Labradorite ทรงเพชรยาว #C", nameEn: "Labradorite Diamond #C",
    type: "labradorite", shape: "freeform", carat: 1.9, price: 1092,
    origin: "Madagascar", originTh: "มาดากัสการ์", status: "sold",
    image: "https://images.unsplash.com/photo-1602752250015-52934bc45613?w=600&h=750&fit=crop&crop=bottom",
    yearMined: 2024,
    storyTh: "Labradorite เม็ด #C แสงเหลือบสดใส", storyEn: "Labradorite pendant #C.",
    spiritualTh: "หินแห่งการเปลี่ยนแปลง ช่วยเสริมสัญชาตญาณ ปกป้องพลังงานลบ", spiritualEn: "Stone of transformation.",
    spec: { colorGrade: "Blue Flash", clarity: "Translucent", cut: "Cabochon Diamond Shape", carat: 1.9, dimensions: "2.04 x 1.37 cm", inclusions: "เป็นหินธรรมชาติอาจมีรอยบ้าง" },
  },
  {
    id: 104, code: "LB-D1092", nameTh: "Labradorite ทรงเพชรยาว #D", nameEn: "Labradorite Diamond #D",
    type: "labradorite", shape: "freeform", carat: 2.0, price: 1092,
    origin: "Madagascar", originTh: "มาดากัสการ์", status: "reserved",
    image: "https://images.unsplash.com/photo-1602752250015-52934bc45613?w=600&h=750&fit=crop&crop=left",
    yearMined: 2024,
    storyTh: "Labradorite เม็ด #D จองแล้ว แสงเหลือบสวย", storyEn: "Labradorite pendant #D. Reserved.",
    spiritualTh: "หินแห่งการเปลี่ยนแปลง ช่วยเสริมสัญชาตญาณ", spiritualEn: "Stone of transformation.",
    spec: { colorGrade: "Blue Flash", clarity: "Translucent", cut: "Cabochon Diamond Shape", carat: 2.0, dimensions: "2.04 x 1.37 cm", inclusions: "เป็นหินธรรมชาติอาจมีรอยบ้าง" },
  },
  {
    id: 105, code: "LB-E1092", nameTh: "Labradorite ทรงเพชรยาว #E", nameEn: "Labradorite Diamond #E",
    type: "labradorite", shape: "freeform", carat: 2.2, price: 1092,
    origin: "Madagascar", originTh: "มาดากัสการ์", status: "available",
    image: "/images/labradorite-raw.png",
    yearMined: 2024,
    storyTh: "Labradorite เม็ด #E แสงเหลือบสีฟ้าสดใส เม็ดใหญ่กว่าเฉลี่ย",
    storyEn: "Labradorite pendant #E. Larger than average with vivid flash.",
    spiritualTh: "หินแห่งการเปลี่ยนแปลง ช่วยเสริมสัญชาตญาณ ปกป้องพลังงานลบ", spiritualEn: "Stone of transformation.",
    spec: { colorGrade: "Vivid Blue Flash", clarity: "Translucent", cut: "Cabochon Diamond Shape", carat: 2.2, dimensions: "2.10 x 1.40 cm", inclusions: "เป็นหินธรรมชาติอาจมีรอยบ้าง" },
  },

  // ═══════════════════════════════════════════════════
  // AMETHYST (อเมทิสต์) - หินสีม่วงแห่งปัญญา
  // ═══════════════════════════════════════════════════
  {
    id: 201, code: "AM-A790", nameTh: "Amethyst ทรงหยดน้ำ #A", nameEn: "Amethyst Teardrop #A",
    type: "amethyst", shape: "pear", carat: 1.5, price: 790,
    origin: "Brazil", originTh: "บราซิล", status: "available",
    image: "/images/amethyst-raw.png",
    yearMined: 2024,
    storyTh: "อเมทิสต์สีม่วงเข้มทรงหยดน้ำ เงินแท้ S925 ขนาดพอดีสวมใส่ทุกวัน",
    storyEn: "Deep purple amethyst teardrop in S925 silver.",
    spiritualTh: "หินแห่งปัญญาและความสงบ ช่วยลดความเครียด เสริมสมาธิ ช่วยนอนหลับดี เหมาะกับคนทำงานหนัก",
    spiritualEn: "Stone of wisdom and calm. Reduces stress, promotes sleep.",
    spec: { colorGrade: "Deep Purple", clarity: "VS", cut: "Pear Cabochon", carat: 1.5, dimensions: "1.5 x 1.0 cm", inclusions: "ใสสะอาด" },
  },
  {
    id: 202, code: "AM-B790", nameTh: "Amethyst ทรงหยดน้ำ #B", nameEn: "Amethyst Teardrop #B",
    type: "amethyst", shape: "pear", carat: 1.6, price: 790,
    origin: "Brazil", originTh: "บราซิล", status: "available",
    image: "/images/amethyst-raw.png",
    yearMined: 2024,
    storyTh: "อเมทิสต์สีม่วงลาเวนเดอร์ทรงหยดน้ำ เงินแท้ S925 สีหวานๆ",
    storyEn: "Lavender amethyst teardrop in S925 silver.",
    spiritualTh: "หินแห่งปัญญาและความสงบ ช่วยลดความเครียด เสริมสมาธิ ช่วยนอนหลับดี",
    spiritualEn: "Stone of wisdom and calm.",
    spec: { colorGrade: "Lavender Purple", clarity: "VS", cut: "Pear Cabochon", carat: 1.6, dimensions: "1.5 x 1.0 cm", inclusions: "ใสสะอาด" },
  },
  {
    id: 203, code: "AM-C990", nameTh: "Amethyst ทรงกลม #C", nameEn: "Amethyst Round #C",
    type: "amethyst", shape: "round", carat: 2.0, price: 990,
    origin: "Brazil", originTh: "บราซิล", status: "available",
    image: "https://images.unsplash.com/photo-1583937443538-4755e5deab79?w=600&h=750&fit=crop&crop=bottom",
    yearMined: 2024,
    storyTh: "อเมทิสต์สีม่วงเข้มทรงกลม เงินแท้ S925 เม็ดใหญ่สะดุดตา",
    storyEn: "Deep purple amethyst round pendant in S925 silver.",
    spiritualTh: "หินแห่งปัญญาและความสงบ ช่วยลดความเครียด เสริมสมาธิ", spiritualEn: "Stone of wisdom and calm.",
    spec: { colorGrade: "Deep Purple", clarity: "VVS", cut: "Round Cabochon", carat: 2.0, dimensions: "1.2 x 1.2 cm", inclusions: "ใสมาก คุณภาพดี" },
  },

  // ═══════════════════════════════════════════════════
  // ROSE QUARTZ (โรสควอตซ์) - หินแห่งความรัก
  // ═══════════════════════════════════════════════════
  {
    id: 301, code: "RQ-A690", nameTh: "Rose Quartz ทรงหัวใจ #A", nameEn: "Rose Quartz Heart #A",
    type: "rose-quartz", shape: "heart", carat: 2.5, price: 690,
    origin: "Brazil", originTh: "บราซิล", status: "available",
    image: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=600&h=750&fit=crop&crop=center",
    yearMined: 2024,
    storyTh: "โรสควอตซ์ทรงหัวใจ เงินแท้ S925 สีชมพูอ่อนนุ่มนวล หินแห่งความรัก เหมาะเป็นของขวัญ",
    storyEn: "Rose quartz heart pendant in S925 silver. The stone of love.",
    spiritualTh: "หินแห่งความรักอันไม่มีเงื่อนไข ช่วยเปิดจักระหัวใจ ดึงดูดความรัก เสริมความสัมพันธ์ ช่วยให้รักตัวเองมากขึ้น",
    spiritualEn: "Stone of unconditional love. Opens heart chakra.",
    spec: { colorGrade: "Soft Pink", clarity: "Translucent", cut: "Heart Cabochon", carat: 2.5, dimensions: "1.5 x 1.5 cm", inclusions: "มีเส้นในธรรมชาติ" },
  },
  {
    id: 302, code: "RQ-B690", nameTh: "Rose Quartz ทรงหัวใจ #B", nameEn: "Rose Quartz Heart #B",
    type: "rose-quartz", shape: "heart", carat: 2.3, price: 690,
    origin: "Brazil", originTh: "บราซิล", status: "available",
    image: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=600&h=750&fit=crop&crop=top",
    yearMined: 2024,
    storyTh: "โรสควอตซ์ทรงหัวใจ เม็ด #B สีชมพูเข้มขึ้นเล็กน้อย", storyEn: "Rose quartz heart pendant #B.",
    spiritualTh: "หินแห่งความรักอันไม่มีเงื่อนไข ช่วยเปิดจักระหัวใจ ดึงดูดความรัก", spiritualEn: "Stone of unconditional love.",
    spec: { colorGrade: "Medium Pink", clarity: "Translucent", cut: "Heart Cabochon", carat: 2.3, dimensions: "1.4 x 1.4 cm", inclusions: "มีเส้นในธรรมชาติ" },
  },
  {
    id: 303, code: "RQ-C890", nameTh: "Rose Quartz ทรงไข่ #C", nameEn: "Rose Quartz Oval #C",
    type: "rose-quartz", shape: "oval", carat: 3.0, price: 890,
    origin: "Madagascar", originTh: "มาดากัสการ์", status: "available",
    image: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=600&h=750&fit=crop&crop=bottom",
    yearMined: 2024,
    storyTh: "โรสควอตซ์ทรงไข่ เม็ดใหญ่สวย จากมาดากัสการ์ สีชมพูเข้ม", storyEn: "Rose quartz oval from Madagascar.",
    spiritualTh: "หินแห่งความรักอันไม่มีเงื่อนไข ช่วยเปิดจักระหัวใจ เสริมความสัมพันธ์", spiritualEn: "Stone of unconditional love.",
    spec: { colorGrade: "Deep Pink", clarity: "Translucent", cut: "Oval Cabochon", carat: 3.0, dimensions: "1.8 x 1.3 cm", inclusions: "มีเส้นในตามธรรมชาติ" },
  },

  // ═══════════════════════════════════════════════════
  // MOONSTONE (มูนสโตน)
  // ═══════════════════════════════════════════════════
  {
    id: 401, code: "MS-A890", nameTh: "Moonstone ทรงไข่ #A", nameEn: "Moonstone Oval #A",
    type: "moonstone", shape: "oval", carat: 1.8, price: 890,
    origin: "Sri Lanka", originTh: "ศรีลังกา", status: "available",
    image: "https://images.unsplash.com/photo-1551122089-4e3e72477432?w=600&h=750&fit=crop&crop=center",
    yearMined: 2024,
    storyTh: "มูนสโตนสีขาวแสงจันทร์ ทรงไข่ เงินแท้ S925 ประกายแสงสีฟ้าเหมือนแสงจันทร์", storyEn: "White moonstone oval in S925 silver.",
    spiritualTh: "หินแห่งการเริ่มต้นใหม่ เชื่อมพลังจันทร์ ช่วยปรับสมดุลอารมณ์ เสริมสัญชาตญาณ เหมาะกับคนราศีกรกฎ",
    spiritualEn: "Stone of new beginnings. Connects to lunar energy.",
    spec: { colorGrade: "White with Blue Sheen", clarity: "Translucent", cut: "Oval Cabochon", carat: 1.8, dimensions: "1.4 x 1.0 cm", inclusions: "มีแสงเหลือบธรรมชาติ" },
  },
  {
    id: 402, code: "MS-B890", nameTh: "Moonstone ทรงไข่ #B", nameEn: "Moonstone Oval #B",
    type: "moonstone", shape: "oval", carat: 1.7, price: 890,
    origin: "Sri Lanka", originTh: "ศรีลังกา", status: "available",
    image: "https://images.unsplash.com/photo-1551122089-4e3e72477432?w=600&h=750&fit=crop&crop=top",
    yearMined: 2024,
    storyTh: "มูนสโตน เม็ด #B ประกายแสงสีฟ้าอ่อน", storyEn: "Moonstone oval #B.",
    spiritualTh: "หินแห่งการเริ่มต้นใหม่ ช่วยปรับสมดุลอารมณ์ เสริมสัญชาตญาณ", spiritualEn: "Stone of new beginnings.",
    spec: { colorGrade: "White with Blue Sheen", clarity: "Translucent", cut: "Oval Cabochon", carat: 1.7, dimensions: "1.3 x 1.0 cm", inclusions: "มีแสงเหลือบธรรมชาติ" },
  },
  {
    id: 403, code: "MS-C1290", nameTh: "Rainbow Moonstone ทรงกลม #C", nameEn: "Rainbow Moonstone Round #C",
    type: "moonstone", shape: "round", carat: 2.5, price: 1290,
    origin: "India", originTh: "อินเดีย", status: "available",
    image: "https://images.unsplash.com/photo-1551122089-4e3e72477432?w=600&h=750&fit=crop&crop=bottom",
    yearMined: 2024,
    storyTh: "Rainbow Moonstone เม็ดใหญ่ ประกายรุ้งสวยงาม เงินแท้ S925", storyEn: "Rainbow moonstone round in S925 silver.",
    spiritualTh: "หินแห่งการเริ่มต้นใหม่ เชื่อมพลังจันทร์ เสริมความคิดสร้างสรรค์ เหมาะกับศิลปิน",
    spiritualEn: "Stone of new beginnings and creativity.",
    spec: { colorGrade: "Rainbow Flash", clarity: "Semi-transparent", cut: "Round Cabochon", carat: 2.5, dimensions: "1.5 x 1.5 cm", inclusions: "มีแสงรุ้งธรรมชาติ" },
  },

  // ═══════════════════════════════════════════════════
  // TIGER EYE (ไทเกอร์อาย)
  // ═══════════════════════════════════════════════════
  {
    id: 501, code: "TE-A590", nameTh: "Tiger Eye ทรงไข่ #A", nameEn: "Tiger Eye Oval #A",
    type: "tiger-eye", shape: "oval", carat: 3.0, price: 590,
    origin: "South Africa", originTh: "แอฟริกาใต้", status: "available",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=750&fit=crop&crop=center",
    yearMined: 2024,
    storyTh: "หินตาเสือสีทอง ทรงไข่ เงินแท้ S925 ประกายแสงเหมือนตาเสือ", storyEn: "Golden tiger eye oval in S925 silver.",
    spiritualTh: "หินแห่งความกล้าหาญและโชคลาภ ช่วยเสริมความมั่นใจ ดึงดูดเงินทอง ป้องกันสิ่งชั่วร้าย เหมาะกับนักธุรกิจ",
    spiritualEn: "Stone of courage and fortune. Attracts wealth.",
    spec: { colorGrade: "Golden Brown", clarity: "Opaque with chatoyancy", cut: "Oval Cabochon", carat: 3.0, dimensions: "1.8 x 1.3 cm", inclusions: "มีลายตาเสือสวยงาม" },
  },
  {
    id: 502, code: "TE-B590", nameTh: "Tiger Eye ทรงไข่ #B", nameEn: "Tiger Eye Oval #B",
    type: "tiger-eye", shape: "oval", carat: 2.8, price: 590,
    origin: "South Africa", originTh: "แอฟริกาใต้", status: "available",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=750&fit=crop&crop=top",
    yearMined: 2024,
    storyTh: "หินตาเสือ เม็ด #B ลายสวยชัดเจน", storyEn: "Tiger eye oval #B.",
    spiritualTh: "หินแห่งความกล้าหาญและโชคลาภ ช่วยเสริมความมั่นใจ ดึงดูดเงินทอง", spiritualEn: "Stone of courage and fortune.",
    spec: { colorGrade: "Golden Brown", clarity: "Opaque with chatoyancy", cut: "Oval Cabochon", carat: 2.8, dimensions: "1.7 x 1.2 cm", inclusions: "มีลายตาเสือสวยงาม" },
  },
  {
    id: 503, code: "TE-C790", nameTh: "Red Tiger Eye ทรงกลม #C", nameEn: "Red Tiger Eye Round #C",
    type: "tiger-eye", shape: "round", carat: 2.5, price: 790,
    origin: "South Africa", originTh: "แอฟริกาใต้", status: "available",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=750&fit=crop&crop=bottom",
    yearMined: 2024,
    storyTh: "Red Tiger Eye สีแดงมะฮอกกานี ทรงกลม หายากกว่าสีทอง", storyEn: "Red tiger eye round. Rarer variant.",
    spiritualTh: "เวอร์ชั่นพลังเพิ่มของตาเสือ ช่วยเรื่องพลังใจ ความมุ่งมั่น เหมาะกับคนที่ต้องการแรงบันดาลใจ",
    spiritualEn: "Enhanced tiger eye. Boosts willpower.",
    spec: { colorGrade: "Red Mahogany", clarity: "Opaque with chatoyancy", cut: "Round Cabochon", carat: 2.5, dimensions: "1.4 x 1.4 cm", inclusions: "มีลายตาเสือสีแดง" },
  },

  // ═══════════════════════════════════════════════════
  // GARNET (การ์เน็ต)
  // ═══════════════════════════════════════════════════
  {
    id: 601, code: "GN-A890", nameTh: "Garnet ทรงกลม #A", nameEn: "Garnet Round #A",
    type: "garnet", shape: "round", carat: 1.2, price: 890,
    origin: "Mozambique", originTh: "โมซัมบิก", status: "available",
    image: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=600&h=750&fit=crop&crop=center",
    yearMined: 2024,
    storyTh: "การ์เน็ตสีแดงเลือดหมู ทรงกลม เงินแท้ S925 ให้ความรู้สึกทรงพลัง", storyEn: "Blood-red garnet round in S925 silver.",
    spiritualTh: "หินแห่งพลังชีวิตและความหลงใหล เสริมพลังงาน เพิ่มเสน่ห์ ช่วยเรื่องการเงิน เหมาะกับคนเกิดเดือนมกราคม",
    spiritualEn: "Stone of vitality and passion. Boosts energy and charisma.",
    spec: { colorGrade: "Deep Red (Pyrope)", clarity: "VS", cut: "Round Faceted", carat: 1.2, dimensions: "0.7 x 0.7 cm", inclusions: "ใสสะอาด" },
  },
  {
    id: 602, code: "GN-B890", nameTh: "Garnet ทรงกลม #B", nameEn: "Garnet Round #B",
    type: "garnet", shape: "round", carat: 1.3, price: 890,
    origin: "Mozambique", originTh: "โมซัมบิก", status: "available",
    image: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=600&h=750&fit=crop&crop=top",
    yearMined: 2024,
    storyTh: "การ์เน็ต เม็ด #B ใหญ่กว่า #A นิดหน่อย", storyEn: "Garnet round #B. Slightly larger.",
    spiritualTh: "หินแห่งพลังชีวิตและความหลงใหล เสริมพลังงาน เพิ่มเสน่ห์", spiritualEn: "Stone of vitality.",
    spec: { colorGrade: "Deep Red (Pyrope)", clarity: "VS", cut: "Round Faceted", carat: 1.3, dimensions: "0.75 x 0.75 cm", inclusions: "ใสสะอาด" },
  },
  {
    id: 603, code: "GN-C1290", nameTh: "Garnet ทรงไข่ #C", nameEn: "Garnet Oval #C",
    type: "garnet", shape: "oval", carat: 2.0, price: 1290,
    origin: "Mozambique", originTh: "โมซัมบิก", status: "available",
    image: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=600&h=750&fit=crop&crop=bottom",
    yearMined: 2024,
    storyTh: "การ์เน็ตทรงไข่ เม็ดใหญ่ เงินแท้ S925 สวยสะดุดตา", storyEn: "Large garnet oval in S925 silver.",
    spiritualTh: "หินแห่งพลังชีวิตและความหลงใหล เสริมพลังงาน เพิ่มเสน่ห์ ช่วยเรื่องการเงิน", spiritualEn: "Stone of vitality and passion.",
    spec: { colorGrade: "Deep Red (Rhodolite)", clarity: "VS", cut: "Oval Faceted", carat: 2.0, dimensions: "1.0 x 0.8 cm", inclusions: "ใสสะอาด คุณภาพดี" },
  },

  // ═══════════════════════════════════════════════════
  // PERIDOT (เพอริดอต)
  // ═══════════════════════════════════════════════════
  {
    id: 701, code: "PD-A990", nameTh: "Peridot ทรงไข่ #A", nameEn: "Peridot Oval #A",
    type: "peridot", shape: "oval", carat: 1.0, price: 990,
    origin: "Myanmar", originTh: "พม่า", status: "available",
    image: "https://images.unsplash.com/photo-1599707367785-cf15dfb1300b?w=600&h=750&fit=crop&crop=center",
    yearMined: 2024,
    storyTh: "เพอริดอตสีเขียวมะกอก ทรงไข่ เงินแท้ S925 สดใสเหมือนใบไม้ใหม่", storyEn: "Olive green peridot oval in S925 silver.",
    spiritualTh: "หินแห่งความอุดมสมบูรณ์ ช่วยเรื่องโชคลาภการเงิน ลดความริษยา เหมาะกับคนเกิดเดือนสิงหาคม",
    spiritualEn: "Stone of abundance. Helps with wealth.",
    spec: { colorGrade: "Vivid Green (Olive)", clarity: "VS", cut: "Oval Faceted", carat: 1.0, dimensions: "0.7 x 0.5 cm", inclusions: "มีตำหนิเล็กน้อย" },
  },
  {
    id: 702, code: "PD-B990", nameTh: "Peridot ทรงไข่ #B", nameEn: "Peridot Oval #B",
    type: "peridot", shape: "oval", carat: 1.1, price: 990,
    origin: "Myanmar", originTh: "พม่า", status: "available",
    image: "https://images.unsplash.com/photo-1599707367785-cf15dfb1300b?w=600&h=750&fit=crop&crop=top",
    yearMined: 2024,
    storyTh: "เพอริดอต เม็ด #B สีเขียวสดใส", storyEn: "Peridot oval #B.",
    spiritualTh: "หินแห่งความอุดมสมบูรณ์ ช่วยเรื่องโชคลาภการเงิน", spiritualEn: "Stone of abundance.",
    spec: { colorGrade: "Vivid Green (Olive)", clarity: "VS", cut: "Oval Faceted", carat: 1.1, dimensions: "0.75 x 0.55 cm", inclusions: "มีตำหนิเล็กน้อย" },
  },

  // ═══════════════════════════════════════════════════
  // AQUAMARINE (อะความารีน)
  // ═══════════════════════════════════════════════════
  {
    id: 801, code: "AQ-A1490", nameTh: "Aquamarine ทรงไข่ #A", nameEn: "Aquamarine Oval #A",
    type: "aquamarine", shape: "oval", carat: 1.2, price: 1490,
    origin: "Brazil", originTh: "บราซิล", status: "available",
    image: "https://images.unsplash.com/photo-1599707367785-cf15dfb1300b?w=600&h=750&fit=crop&crop=bottom",
    yearMined: 2024,
    storyTh: "อะความารีนสีฟ้าน้ำทะเล ทรงไข่ เงินแท้ S925 ใสเหมือนน้ำทะเล", storyEn: "Sea blue aquamarine oval in S925 silver.",
    spiritualTh: "หินแห่งท้องทะเลและความสงบ ช่วยเรื่องการสื่อสาร ลดความกังวล เหมาะกับนักเดินทาง",
    spiritualEn: "Stone of the sea. Enhances communication.",
    spec: { colorGrade: "Light Blue (Sea Blue)", clarity: "VS", cut: "Oval Faceted", carat: 1.2, dimensions: "0.8 x 0.6 cm", inclusions: "ใสมาก" },
  },
  {
    id: 802, code: "AQ-B1490", nameTh: "Aquamarine ทรงไข่ #B", nameEn: "Aquamarine Oval #B",
    type: "aquamarine", shape: "oval", carat: 1.3, price: 1490,
    origin: "Brazil", originTh: "บราซิล", status: "available",
    image: "https://images.unsplash.com/photo-1599707367785-cf15dfb1300b?w=600&h=750&fit=crop&crop=left",
    yearMined: 2024,
    storyTh: "อะความารีน เม็ด #B สีฟ้าเข้มขึ้น สวยมาก", storyEn: "Aquamarine oval #B. Deeper blue.",
    spiritualTh: "หินแห่งท้องทะเลและความสงบ ช่วยเรื่องการสื่อสาร ลดความกังวล", spiritualEn: "Stone of the sea.",
    spec: { colorGrade: "Medium Blue", clarity: "VS", cut: "Oval Faceted", carat: 1.3, dimensions: "0.85 x 0.65 cm", inclusions: "ใสมาก" },
  },

  // ═══════════════════════════════════════════════════
  // TOURMALINE (ทัวร์มาลีน)
  // ═══════════════════════════════════════════════════
  {
    id: 901, code: "TM-A1290", nameTh: "Green Tourmaline ทรงไข่ #A", nameEn: "Green Tourmaline Oval #A",
    type: "tourmaline", shape: "oval", carat: 1.0, price: 1290,
    origin: "Brazil", originTh: "บราซิล", status: "available",
    image: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=600&h=750&fit=crop&crop=center",
    yearMined: 2024,
    storyTh: "ทัวร์มาลีนสีเขียว ทรงไข่ เงินแท้ S925 สีเขียวเข้มสวย", storyEn: "Green tourmaline oval in S925 silver.",
    spiritualTh: "หินแห่งการรักษาและความสมดุล ช่วยฟื้นฟูพลังกายและใจ เสริมความอดทน ดีต่อสุขภาพหัวใจ",
    spiritualEn: "Stone of healing and balance.",
    spec: { colorGrade: "Deep Green (Verdelite)", clarity: "VS", cut: "Oval Faceted", carat: 1.0, dimensions: "0.7 x 0.5 cm", inclusions: "มีตำหนิเล็กน้อย" },
  },
  {
    id: 902, code: "TM-B1590", nameTh: "Pink Tourmaline ทรงหยดน้ำ #B", nameEn: "Pink Tourmaline Teardrop #B",
    type: "tourmaline", shape: "pear", carat: 0.8, price: 1590,
    origin: "Brazil", originTh: "บราซิล", status: "available",
    image: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=600&h=750&fit=crop&crop=top",
    yearMined: 2024,
    storyTh: "ทัวร์มาลีนชมพู (Rubellite) ทรงหยดน้ำ เงินแท้ S925 สีชมพูหวาน", storyEn: "Pink tourmaline (Rubellite) teardrop.",
    spiritualTh: "หินแห่งความรักและการเยียวยาอารมณ์ ช่วยเปิดจักระหัวใจ เสริมความเห็นอกเห็นใจ",
    spiritualEn: "Stone of love and emotional healing.",
    spec: { colorGrade: "Pink (Rubellite)", clarity: "VS", cut: "Pear Faceted", carat: 0.8, dimensions: "0.8 x 0.5 cm", inclusions: "มีตำหนิธรรมชาติ" },
  },

  // ═══════════════════════════════════════════════════
  // LAPIS LAZULI (ลาพิสลาซูลี)
  // ═══════════════════════════════════════════════════
  {
    id: 1001, code: "LL-A790", nameTh: "Lapis Lazuli ทรงกลม #A", nameEn: "Lapis Lazuli Round #A",
    type: "lapis-lazuli", shape: "round", carat: 3.0, price: 790,
    origin: "Afghanistan", originTh: "อัฟกานิสถาน", status: "available",
    image: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600&h=750&fit=crop&crop=center",
    yearMined: 2024,
    storyTh: "ลาพิสลาซูลีสีน้ำเงินเข้ม ทรงกลม เงินแท้ S925 มีจุดทองไพไรต์ สวยเหมือนท้องฟ้ายามค่ำ",
    storyEn: "Deep blue lapis lazuli round in S925 silver with golden pyrite.",
    spiritualTh: "หินแห่งความจริงและปัญญา ใช้มาตั้งแต่อียิปต์โบราณ ช่วยเรื่องการเรียน สร้างสรรค์ผลงาน เหมาะกับนักเรียน นักเขียน",
    spiritualEn: "Stone of truth and wisdom. Used since ancient Egypt.",
    spec: { colorGrade: "Deep Royal Blue", clarity: "Opaque", cut: "Round Cabochon", carat: 3.0, dimensions: "1.4 x 1.4 cm", inclusions: "มีจุดทองไพไรต์ธรรมชาติ" },
  },
  {
    id: 1002, code: "LL-B790", nameTh: "Lapis Lazuli ทรงกลม #B", nameEn: "Lapis Lazuli Round #B",
    type: "lapis-lazuli", shape: "round", carat: 2.8, price: 790,
    origin: "Afghanistan", originTh: "อัฟกานิสถาน", status: "available",
    image: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600&h=750&fit=crop&crop=top",
    yearMined: 2024,
    storyTh: "ลาพิสลาซูลี เม็ด #B สีน้ำเงินเข้ม สีเข้มสม่ำเสมอ", storyEn: "Lapis lazuli round #B. Uniform deep blue.",
    spiritualTh: "หินแห่งความจริงและปัญญา ช่วยเรื่องการเรียน สร้างสรรค์ผลงาน", spiritualEn: "Stone of truth and wisdom.",
    spec: { colorGrade: "Deep Royal Blue", clarity: "Opaque", cut: "Round Cabochon", carat: 2.8, dimensions: "1.3 x 1.3 cm", inclusions: "สีเข้มสม่ำเสมอ" },
  },
  {
    id: 1003, code: "LL-C990", nameTh: "Lapis Lazuli ทรงไข่ #C", nameEn: "Lapis Lazuli Oval #C",
    type: "lapis-lazuli", shape: "oval", carat: 4.0, price: 990,
    origin: "Afghanistan", originTh: "อัฟกานิสถาน", status: "available",
    image: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600&h=750&fit=crop&crop=bottom",
    yearMined: 2024,
    storyTh: "ลาพิสลาซูลี ทรงไข่ เม็ดใหญ่พิเศษ สีน้ำเงินเข้มพร้อมจุดทอง", storyEn: "Large lapis lazuli oval with golden pyrite.",
    spiritualTh: "หินแห่งความจริงและปัญญา ช่วยเรื่องการเรียน สร้างสรรค์ผลงาน เสริมความซื่อสัตย์", spiritualEn: "Stone of truth.",
    spec: { colorGrade: "Deep Royal Blue with Gold", clarity: "Opaque", cut: "Oval Cabochon", carat: 4.0, dimensions: "2.0 x 1.5 cm", inclusions: "มีจุดทองไพไรต์สวยงาม" },
  },

  // ═══════════════════════════════════════════════════
  // ZIRCON (เพชรพญานาค) - Most Affordable
  // ═══════════════════════════════════════════════════
  {
    id: 1, code: "ZR-A390", nameTh: "เพชรพญานาคขาวใส #A", nameEn: "Clear White Zircon #A",
    type: "zircon", shape: "round", carat: 0.3, price: 390,
    origin: "Bo Rai Mine", originTh: "เหมืองบ่อไร่, ตราด", status: "available",
    image: "https://images.unsplash.com/photo-1551122089-4e3e72477432?w=600&h=750&fit=crop&crop=top",
    yearMined: 2022,
    storyTh: "เพชรพญานาคขาวใสจากเหมืองบ่อไร่ ประกายระยิบระยับเทียบเท่าเพชรแท้", storyEn: "Crystal clear white zircon from Bo Rai.",
    spiritualTh: "หินแห่งความบริสุทธิ์ ช่วยชำระล้างพลังงาน เสริมสติปัญญา เชื่อว่าเป็นหินของพญานาค",
    spiritualEn: "Stone of purity. Cleanses energy, enhances wisdom.",
    spec: { colorGrade: "Colorless (D)", clarity: "VVS", cut: "Round Brilliant", carat: 0.3, dimensions: "4.0 x 4.0 x 2.5 mm", inclusions: "แทบมองไม่เห็นด้วยตาเปล่า" },
  },
  {
    id: 2, code: "ZR-B690", nameTh: "เพชรพญานาคขาว #B", nameEn: "White Zircon Medium #B",
    type: "zircon", shape: "round", carat: 0.5, price: 690,
    origin: "Bo Rai Mine", originTh: "เหมืองบ่อไร่, ตราด", status: "available",
    image: "https://images.unsplash.com/photo-1551122089-4e3e72477432?w=600&h=750&fit=crop&crop=bottom",
    yearMined: 2021,
    storyTh: "เพชรพญานาคขาว 0.5 กะรัต คุณภาพดี ประกายสดใส", storyEn: "0.5ct white zircon, excellent quality.",
    spiritualTh: "หินแห่งความบริสุทธิ์ ช่วยชำระล้างพลังงาน เสริมสติปัญญา", spiritualEn: "Stone of purity.",
    spec: { colorGrade: "Colorless (D-E)", clarity: "VVS", cut: "Round Brilliant", carat: 0.5, dimensions: "5.0 x 5.0 x 3.2 mm", inclusions: "ใสสะอาด" },
  },
  {
    id: 3, code: "ZR-C590", nameTh: "เพชรพญานาคฟ้า #C", nameEn: "Sky Blue Zircon #C",
    type: "zircon", shape: "oval", carat: 0.4, price: 590,
    origin: "Bo Rai Mine", originTh: "เหมืองบ่อไร่, ตราด", status: "available",
    image: "https://images.unsplash.com/photo-1602752250015-52934bc45613?w=600&h=750&fit=crop&crop=top",
    yearMined: 2023,
    storyTh: "เพชรพญานาคสีฟ้าใสจากบ่อไร่ ทรงไข่ สีฟ้าเหมือนท้องฟ้ายามเช้า", storyEn: "Sky blue zircon from Bo Rai.",
    spiritualTh: "หินแห่งความสงบและการสื่อสาร เหมาะกับคนที่ต้องพูดต่อหน้าสาธารณะ", spiritualEn: "Stone of calm and communication.",
    spec: { colorGrade: "Sky Blue", clarity: "VS", cut: "Oval Modified Brilliant", carat: 0.4, dimensions: "4.8 x 3.5 x 2.5 mm", inclusions: "มีตำหนิเล็กน้อย" },
  },

  // ═══════════════════════════════════════════════════
  // YELLOW SAPPHIRE (บุษราคัม)
  // ═══════════════════════════════════════════════════
  {
    id: 9, code: "YS-A1800", nameTh: "บุษราคัมเหลืองอ่อน #A", nameEn: "Light Yellow Sapphire #A",
    type: "yellow-sapphire", shape: "round", carat: 0.3, price: 1800,
    origin: "Bangkaja, Chanthaburi", originTh: "บางกะจะ, จันทบุรี", status: "available",
    image: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600&h=750&fit=crop&crop=top",
    yearMined: 2022,
    storyTh: "บุษราคัมสีเหลืองอ่อนจากบางกะจะ ราวแสงแรกของรุ่งอรุณ", storyEn: "Light yellow sapphire from Bangkaja.",
    spiritualTh: "หินแห่งโชคลาภและความเจริญ ตามโหราศาสตร์ช่วยเสริมดวงพฤหัส ดีสำหรับการเงินและอาชีพ",
    spiritualEn: "Stone of prosperity. Enhances Jupiter energy.",
    spec: { colorGrade: "Light Yellow (Lemon)", clarity: "VS", cut: "Round Brilliant", carat: 0.3, dimensions: "4.0 x 4.0 x 2.5 mm", inclusions: "มีตำหนิเล็กน้อย" },
  },
  {
    id: 10, code: "YS-B2900", nameTh: "บุษราคัมแชมเปญ #B", nameEn: "Champagne Sapphire #B",
    type: "yellow-sapphire", shape: "oval", carat: 0.4, price: 2900,
    origin: "Bangkaja, Chanthaburi", originTh: "บางกะจะ, จันทบุรี", status: "available",
    image: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=600&h=750&fit=crop&crop=bottom",
    yearMined: 2023,
    storyTh: "บุษราคัมสีแชมเปญอ่อนละมุน ทรงไข่ขนาดพอดี", storyEn: "Soft champagne sapphire oval.",
    spiritualTh: "หินแห่งโชคลาภและความเจริญ ช่วยเสริมดวงพฤหัส", spiritualEn: "Stone of prosperity.",
    spec: { colorGrade: "Champagne", clarity: "VS", cut: "Oval Brilliant", carat: 0.4, dimensions: "4.5 x 3.5 x 2.5 mm", inclusions: "ใสสะอาด" },
  },
  {
    id: 11, code: "YS-C3500", nameTh: "บุษราคัมทองแท้ #C", nameEn: "True Gold Sapphire #C",
    type: "yellow-sapphire", shape: "oval", carat: 0.5, price: 3500,
    origin: "Bangkaja, Chanthaburi", originTh: "บางกะจะ, จันทบุรี", status: "available",
    image: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600&h=750&fit=crop&crop=bottom",
    yearMined: 2021,
    storyTh: "บุษราคัมสีทองสดใส ทรงไข่งดงาม", storyEn: "Vivid golden sapphire oval.",
    spiritualTh: "หินแห่งโชคลาภและความเจริญ ช่วยเสริมดวงพฤหัส ดีสำหรับการเงิน ความสำเร็จ", spiritualEn: "Stone of prosperity.",
    spec: { colorGrade: "Vivid Yellow (Golden)", clarity: "VS", cut: "Oval Modified Brilliant", carat: 0.5, dimensions: "5.0 x 4.0 x 2.8 mm", inclusions: "มีตำหนิเล็กน้อย" },
  },

  // ═══════════════════════════════════════════════════
  // SAPPHIRE (ไพลิน)
  // ═══════════════════════════════════════════════════
  {
    id: 17, code: "SP-A2900", nameTh: "ไพลินเม็ดน้อย #A", nameEn: "Petite Blue Sapphire #A",
    type: "sapphire", shape: "round", carat: 0.25, price: 2900,
    origin: "Bangkaja, Chanthaburi", originTh: "บางกะจะ, จันทบุรี", status: "available",
    image: "https://images.unsplash.com/photo-1599707367785-cf15dfb1300b?w=600&h=750&fit=crop&crop=top",
    yearMined: 2023,
    storyTh: "ไพลินน้ำเงินขนาดเล็กกะทัดรัด สีสวยสดใส", storyEn: "Petite blue sapphire with vivid color.",
    spiritualTh: "หินแห่งสวรรค์และความจงรักภักดี ช่วยเสริมดวงเสาร์ ปกป้องภัยอันตราย เหมาะกับผู้นำ",
    spiritualEn: "Stone of heaven and loyalty.",
    spec: { colorGrade: "Medium Blue", clarity: "VS", cut: "Round Brilliant", carat: 0.25, dimensions: "3.8 x 3.8 x 2.3 mm", inclusions: "มีตำหนิเล็กน้อย" },
  },
  {
    id: 18, code: "SP-B3900", nameTh: "ไพลินชมพูหวาน #B", nameEn: "Sweet Pink Sapphire #B",
    type: "sapphire", shape: "pear", carat: 0.35, price: 3900,
    origin: "Bangkaja, Chanthaburi", originTh: "บางกะจะ, จันทบุรี", status: "available",
    image: "https://images.unsplash.com/photo-1583937443538-4755e5deab79?w=600&h=750&fit=crop&crop=center",
    yearMined: 2022,
    storyTh: "ไพลินชมพูทรงหยดน้ำ สีหวานน่ารัก เหมาะเป็นของขวัญ", storyEn: "Sweet pink sapphire pear. Perfect gift.",
    spiritualTh: "หินแห่งความรักและศรัทธา ช่วยเปิดจักระหัวใจ เสริมความนุ่มนวล", spiritualEn: "Stone of love and devotion.",
    spec: { colorGrade: "Medium Pink (Lotus)", clarity: "VVS", cut: "Pear Modified Brilliant", carat: 0.35, dimensions: "4.5 x 3.5 x 2.2 mm", inclusions: "ใสสะอาดมาก" },
  },
  {
    id: 20, code: "SP-C4900", nameTh: "ไพลินรอยัลบลู #C", nameEn: "Royal Blue Sapphire #C",
    type: "sapphire", shape: "cushion", carat: 0.5, price: 4900,
    origin: "Bangkaja, Chanthaburi", originTh: "บางกะจะ, จันทบุรี", status: "available",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=750&fit=crop&crop=top",
    yearMined: 2020,
    storyTh: "ไพลินสีน้ำเงินเข้มราชวงศ์ ทรงหมอนเจียระไนพิถีพิถัน", storyEn: "Royal blue sapphire cushion cut.",
    spiritualTh: "หินแห่งสวรรค์และความจงรักภักดี เหมาะกับผู้นำ นักบริหาร", spiritualEn: "Stone of heaven. Great for leaders.",
    spec: { colorGrade: "Vivid Blue (Royal)", clarity: "VS", cut: "Cushion Modified Brilliant", carat: 0.5, dimensions: "5.0 x 4.5 x 3.0 mm", inclusions: "มีซิลค์บางเบา" },
  },

  // ═══════════════════════════════════════════════════
  // RUBY (ทับทิม) - premium
  // ═══════════════════════════════════════════════════
  {
    id: 25, code: "RB-A1900", nameTh: "ทับทิมเม็ดจิ๋ว #A", nameEn: "Tiny Siam Ruby #A",
    type: "ruby", shape: "round", carat: 0.15, price: 1900,
    origin: "Bo Rai Mine", originTh: "เหมืองบ่อไร่, ตราด", status: "available",
    image: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=600&h=750&fit=crop&crop=center",
    yearMined: 2023,
    storyTh: "ทับทิมสยามเม็ดจิ๋วสีแดงสด แม้เล็กแต่ไฟแรง", storyEn: "Tiny but fiery Siam ruby.",
    spiritualTh: "ราชาแห่งอัญมณี หินแห่งพลังอำนาจและความกล้า เสริมบารมี ดึงดูดความรัก เหมาะกับคนที่ต้องการเป็นผู้นำ",
    spiritualEn: "King of gems. Stone of power and courage.",
    spec: { colorGrade: "Vivid Red", clarity: "VS", cut: "Round Brilliant", carat: 0.15, dimensions: "3.2 x 3.2 x 2.0 mm", inclusions: "มีตำหนิเล็กน้อย" },
  },
  {
    id: 26, code: "RB-B3500", nameTh: "ทับทิมแดงเชอรี่ #B", nameEn: "Cherry Red Ruby #B",
    type: "ruby", shape: "oval", carat: 0.25, price: 3500,
    origin: "Bo Rai Mine", originTh: "เหมืองบ่อไร่, ตราด", status: "available",
    image: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=600&h=750&fit=crop&crop=top",
    yearMined: 2022,
    storyTh: "ทับทิมสีแดงเชอรี่สดใส ทรงไข่ เป็นเอกลักษณ์ของบ่อไร่", storyEn: "Cherry red ruby oval. Bo Rai signature.",
    spiritualTh: "ราชาแห่งอัญมณี หินแห่งพลังอำนาจและความกล้า เสริมบารมี", spiritualEn: "King of gems.",
    spec: { colorGrade: "Vivid Red (Cherry)", clarity: "VS", cut: "Oval Modified Brilliant", carat: 0.25, dimensions: "4.0 x 3.0 x 2.0 mm", inclusions: "มีซิลค์บางเบา" },
  },
  {
    id: 28, code: "RB-C4900", nameTh: "ทับทิมเพลิง #C", nameEn: "Fire Red Ruby #C",
    type: "ruby", shape: "round", carat: 0.35, price: 4900,
    origin: "Bo Rai Mine", originTh: "เหมืองบ่อไร่, ตราด", status: "available",
    image: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=600&h=750&fit=crop&crop=bottom",
    yearMined: 2020, color: "Fire Red",
    storyTh: "ทับทิมสีแดงเพลิงสดใส ทรงกลมเจียระไนสมบูรณ์แบบ", storyEn: "Fire red ruby, perfect round brilliant cut.",
    spiritualTh: "ราชาแห่งอัญมณี หินแห่งพลังอำนาจและความกล้า เสริมบารมี ดึงดูดความรัก", spiritualEn: "King of gems. Stone of power.",
    spec: { colorGrade: "Vivid Red (Fire)", clarity: "VVS", cut: "Round Brilliant", carat: 0.35, dimensions: "4.2 x 4.2 x 2.6 mm", inclusions: "แทบมองไม่เห็น" },
  },
  {
    id: 901, code: "AP-A1290", nameTh: "อะพาไทต์น้ำทะเล #A", nameEn: "Apatite Ocean Blue #A",
    type: "apatite", shape: "oval", carat: 2.1, price: 1290,
    origin: "Madagascar", originTh: "มาดากัสการ์", status: "available",
    image: "/images/placeholders/premium-white.svg",
    yearMined: 2024,
    storyTh: "อะพาไทต์โทนน้ำทะเลใส ทรงไข่ ให้ภาพลักษณ์สดใหม่และมั่นใจ",
    storyEn: "Ocean-blue apatite oval with bright, confident energy.",
    spiritualTh: "หินแห่งแรงบันดาลใจและเป้าหมาย ช่วยกระตุ้นความคิดสร้างสรรค์และการสื่อสาร",
    spiritualEn: "Stone of motivation and expression.",
    spec: { colorGrade: "Neon Blue", clarity: "VS", cut: "Oval Faceted", carat: 2.1, dimensions: "8.2 x 6.1 x 4.3 mm", inclusions: "มีตำหนิตามธรรมชาติเล็กน้อย" },
  },
  {
    id: 902, code: "BSS-A2490", nameTh: "แบล็คสตาร์แซฟไฟร์ #A", nameEn: "Black Star Sapphire #A",
    type: "black-star-sapphire", shape: "cabochon", carat: 3.4, price: 2490,
    origin: "Thailand", originTh: "ประเทศไทย", status: "available",
    image: "/images/placeholders/premium-white.svg",
    yearMined: 2023,
    storyTh: "แบล็คสตาร์แซฟไฟร์เจียระไนคาโบชอง เผยดาว 6 แฉกเมื่อกระทบแสง",
    storyEn: "Cabochon black star sapphire with clear six-ray asterism.",
    spiritualTh: "หินแห่งการปกป้องและความชัดเจน เสริมสติและการตัดสินใจภายใต้แรงกดดัน",
    spiritualEn: "Protective stone for clarity and grounded decisions.",
    spec: { colorGrade: "Black to Charcoal", clarity: "Opaque", cut: "Cabochon", carat: 3.4, dimensions: "9.0 x 7.1 x 4.8 mm", inclusions: "เส้นรูไทล์สร้างปรากฏการณ์ดาว" },
  },
  {
    id: 903, code: "CH-A990", nameTh: "คาลซิโดนีฟ้าอ่อน #A", nameEn: "Blue Chalcedony #A",
    type: "chalcedony", shape: "pear", carat: 2.7, price: 990,
    origin: "Namibia", originTh: "นามิเบีย", status: "available",
    image: "/images/placeholders/premium-white.svg",
    yearMined: 2024,
    storyTh: "คาลซิโดนีสีฟ้าอ่อนทรงหยดน้ำ ลุคสุภาพ สะอาดตา",
    storyEn: "Soft blue chalcedony in teardrop cut, elegant and calm.",
    spiritualTh: "หินแห่งความอ่อนโยนในการสื่อสาร ช่วยให้พูดอย่างชัดเจนและสงบ",
    spiritualEn: "Stone for calm communication and emotional ease.",
    spec: { colorGrade: "Pastel Blue", clarity: "Translucent", cut: "Pear Cabochon", carat: 2.7, dimensions: "10.1 x 7.0 x 4.2 mm", inclusions: "เนื้อหินเนียนสม่ำเสมอ" },
  },
  {
    id: 904, code: "EM-A3890", nameTh: "มรกตเขียวสด #A", nameEn: "Emerald Vivid Green #A",
    type: "emerald", shape: "emerald", carat: 0.72, price: 3890,
    origin: "Colombia", originTh: "โคลอมเบีย", status: "available",
    image: "/images/placeholders/premium-white.svg",
    yearMined: 2022,
    storyTh: "มรกตสีเขียวสดทรงเอเมอรัลด์คัต โครงสร้างคมชัดแบบคลาสสิก",
    storyEn: "Vivid green emerald in classic emerald cut.",
    spiritualTh: "หินแห่งการเติบโตและความอุดมสมบูรณ์ เสริมวิสัยทัศน์และความมั่นคงทางใจ",
    spiritualEn: "Stone of growth, abundance, and heart-centered balance.",
    spec: { colorGrade: "Vivid Green", clarity: "SI", cut: "Emerald Cut", carat: 0.72, dimensions: "6.0 x 4.2 x 3.0 mm", inclusions: "มี Jardin ตามธรรมชาติ" },
  },
  {
    id: 905, code: "FL-A1090", nameTh: "ฟลูออไรต์ม่วงเขียว #A", nameEn: "Fluorite Bi-Color #A",
    type: "fluorite", shape: "freeform", carat: 4.2, price: 1090,
    origin: "China", originTh: "จีน", status: "available",
    image: "/images/placeholders/premium-white.svg",
    yearMined: 2024,
    storyTh: "ฟลูออไรต์โทนม่วง-เขียวแบบธรรมชาติ มิติสีเปลี่ยนไปตามมุมมอง",
    storyEn: "Natural bi-color fluorite with shifting purple-green tones.",
    spiritualTh: "หินแห่งสมาธิและการจัดระเบียบความคิด ช่วยตัดเสียงรบกวนภายใน",
    spiritualEn: "Stone of focus and mental organization.",
    spec: { colorGrade: "Purple-Green", clarity: "Translucent", cut: "Freeform Cabochon", carat: 4.2, dimensions: "12.5 x 9.4 x 5.1 mm", inclusions: "มี zoning สีตามธรรมชาติ" },
  },
  {
    id: 906, code: "SG-A1790", nameTh: "สเปสซาร์ไทต์การ์เน็ต #A", nameEn: "Spessartite Garnet #A",
    type: "spessartite-garnet", shape: "round", carat: 1.05, price: 1790,
    origin: "Namibia", originTh: "นามิเบีย", status: "available",
    image: "/images/placeholders/premium-white.svg",
    yearMined: 2023,
    storyTh: "การ์เน็ตสเปสซาร์ไทต์สีส้มสว่าง ให้ประกายไฟจัดจ้าน",
    storyEn: "Bright mandarin-like spessartite garnet with vivid sparkle.",
    spiritualTh: "หินแห่งความกล้าในการลงมือทำ จุดประกายพลังงานและความสุข",
    spiritualEn: "Stone of action, optimism, and creative fire.",
    spec: { colorGrade: "Mandarin Orange", clarity: "VS", cut: "Round Brilliant", carat: 1.05, dimensions: "6.2 x 6.2 x 4.0 mm", inclusions: "ใสสะอาด" },
  },
  {
    id: 907, code: "GSS-A2690", nameTh: "โกลเด้นสตาร์แซฟไฟร์ #A", nameEn: "Golden Star Sapphire #A",
    type: "golden-star-sapphire", shape: "cabochon", carat: 3.1, price: 2690,
    origin: "Sri Lanka", originTh: "ศรีลังกา", status: "available",
    image: "/images/placeholders/premium-white.svg",
    yearMined: 2021,
    storyTh: "โกลเด้นสตาร์แซฟไฟร์สีเหลืองทอง เห็นลายดาวชัดเจนเมื่อหมุนรับแสง",
    storyEn: "Golden star sapphire cabochon with visible asterism.",
    spiritualTh: "หินแห่งโอกาสและความสำเร็จ เสริมความมั่นใจในเส้นทางอาชีพ",
    spiritualEn: "Stone of prosperity, direction, and achievement.",
    spec: { colorGrade: "Golden Yellow", clarity: "Opaque", cut: "Cabochon", carat: 3.1, dimensions: "8.7 x 7.2 x 4.7 mm", inclusions: "เส้นรูไทล์สร้างปรากฏการณ์ดาว" },
  },
  {
    id: 908, code: "RG-A1690", nameTh: "โรโดไลต์การ์เน็ต #A", nameEn: "Rhodolite Garnet #A",
    type: "rhodolite-garnet", shape: "oval", carat: 1.3, price: 1690,
    origin: "Tanzania", originTh: "แทนซาเนีย", status: "available",
    image: "/images/placeholders/premium-white.svg",
    yearMined: 2023,
    storyTh: "โรโดไลต์การ์เน็ตโทนชมพูม่วง สง่างามและทันสมัย",
    storyEn: "Rose-violet rhodolite garnet with elegant brilliance.",
    spiritualTh: "หินแห่งความรักที่มั่นคงและความเข้มแข็งจากภายใน",
    spiritualEn: "Stone of heartfelt strength and graceful passion.",
    spec: { colorGrade: "Raspberry Rose", clarity: "VS", cut: "Oval Faceted", carat: 1.3, dimensions: "7.1 x 5.2 x 3.7 mm", inclusions: "ใสสะอาด" },
  },
  {
    id: 909, code: "RZ-A1190", nameTh: "รูบี้ซอยไซต์ #A", nameEn: "Ruby Zoisite #A",
    type: "ruby-zoisite", shape: "freeform", carat: 4.9, price: 1190,
    origin: "Tanzania", originTh: "แทนซาเนีย", status: "available",
    image: "/images/placeholders/premium-white.svg",
    yearMined: 2024,
    storyTh: "รูบี้ซอยไซต์ลวดลายแดง-เขียวโดดเด่น เม็ดเดียวมีเอกลักษณ์เฉพาะตัว",
    storyEn: "Unique ruby-zoisite with striking red-green natural pattern.",
    spiritualTh: "หินแห่งสมดุลหัวใจและการเติบโต ช่วยผสานพลังใจและการลงมือทำ",
    spiritualEn: "Stone of emotional balance and empowered growth.",
    spec: { colorGrade: "Green with Ruby Patches", clarity: "Opaque", cut: "Freeform Cabochon", carat: 4.9, dimensions: "13.0 x 9.2 x 5.4 mm", inclusions: "ลวดลายแร่ธรรมชาติชัดเจน" },
  },
  {
    id: 910, code: "SR-A790", nameTh: "ซัฟไฟร์ก้อนดิบ #A", nameEn: "Sapphire Rough (Bulk) #A",
    type: "sapphire-rough", shape: "freeform", carat: 7.8, price: 790,
    origin: "Thailand", originTh: "ประเทศไทย", status: "available",
    image: "/images/placeholders/premium-white.svg",
    yearMined: 2024,
    storyTh: "ซัฟไฟร์ก้อนดิบสำหรับสายสะสมและดีไซน์งานแฮนด์เมด เห็นผิวธรรมชาติครบ",
    storyEn: "Natural rough sapphire for collectors and custom crafting.",
    spiritualTh: "หินแห่งศักยภาพที่ยังไม่ถูกขัดเกลา เตือนให้เชื่อในพลังที่กำลังเติบโต",
    spiritualEn: "Represents untapped potential and grounded resilience.",
    spec: { colorGrade: "Blue-Gray Rough", clarity: "Rough", cut: "Natural Rough", carat: 7.8, dimensions: "15.0 x 11.4 x 8.0 mm", inclusions: "ผิวธรรมชาติและรอยแร่ดิบ" },
  },
  {
    id: 911, code: "AMB-A890", nameTh: "อำพันน้ำผึ้ง #A", nameEn: "Honey Amber #A",
    type: "amber", shape: "oval", carat: 3.6, price: 890,
    origin: "Baltic Region", originTh: "แถบทะเลบอลติก", status: "available",
    image: "/images/placeholders/premium-white.svg",
    yearMined: 2022,
    storyTh: "อำพันสีทองน้ำผึ้ง โทนอุ่น ใส่ง่ายทั้งวัน",
    storyEn: "Warm honey-toned amber with timeless glow.",
    spiritualTh: "หินแห่งความอบอุ่นและการเยียวยา ช่วยปล่อยพลังงานคั่งค้าง",
    spiritualEn: "Stone of warmth, cleansing, and gentle healing.",
    spec: { colorGrade: "Honey Gold", clarity: "Translucent", cut: "Oval Cabochon", carat: 3.6, dimensions: "11.2 x 8.0 x 5.3 mm", inclusions: "ฟองอากาศและลายในเรซินธรรมชาติ" },
  },
];

export const gemTypeLabels: Partial<Record<GemType, string>> = {
  apatite: "อะพาไทต์ (Apatite)",
  amber: "อำพัน (Amber)",
  amethyst: "อเมทิสต์ (Amethyst)",
  chalcedony: "คาลซิโดนี (Chalcedony)",
  emerald: "มรกต (Emerald)",
  fluorite: "ฟลูออไรต์ (Fluorite)",
  "rose-quartz": "โรสควอตซ์ (Rose Quartz)",
  moonstone: "มูนสโตน (Moonstone)",
  garnet: "การ์เน็ต (Garnet)",
  "spessartite-garnet": "การ์เน็ตสเปสซาร์ไทต์ (Spessartite Garnet)",
  "rhodolite-garnet": "โรโดไลต์การ์เน็ต (Rhodolite Garnet)",
  "ruby-zoisite": "รูบี้ซอยไซต์ (Ruby Zoisite)",
  aquamarine: "อะความารีน (Aquamarine)",
  "lapis-lazuli": "ลาพิสลาซูลี (Lapis Lazuli)",
  "black-star-sapphire": "แบล็คสตาร์แซฟไฟร์ (Black Star Sapphire)",
  "golden-star-sapphire": "โกลเด้นสตาร์แซฟไฟร์ (Golden Star Sapphire)",
  "sapphire-rough": "ซัฟไฟร์ก้อนดิบ (Sapphire Rough)",
  zircon: "เพชรพญานาค (Zircon)",
  "yellow-sapphire": "บุษราคัม (Yellow Sapphire)",
  sapphire: "ไพลิน (Sapphire)",
  ruby: "ทับทิม (Ruby)",
};

export const gemTypeTaglines: Partial<Record<GemType, string>> = {
  amethyst: "หินแห่งความสงบและการเยียวยา",
  apatite: "หินแห่งแรงบันดาลใจและความกล้าแสดงออก",
  aquamarine: "หินแห่งความกล้าทางอารมณ์และความชัดเจน",
  "black-star-sapphire": "หินแห่งการปกป้องและเสถียรภาพ",
  chalcedony: "หินแห่งการสื่อสารภายในและเสน่ห์อ่อนโยน",
  emerald: "หินแห่งความอุดมสมบูรณ์และการเติบโต",
  fluorite: "หินแห่งความกระจ่างและสมาธิ",
  "spessartite-garnet": "หินแห่งความกล้าหาญและความสดใส",
  garnet: "หินแห่งพลังชีวิต ความรัก และความมุ่งมั่น",
  "golden-star-sapphire": "หินล้ำค่าด้านความมั่งคั่งและชื่อเสียง",
  "lapis-lazuli": "หินแห่งปัญญาลึกลับและญาณรู้",
  moonstone: "หินแห่งจังหวะอารมณ์และการเริ่มต้นใหม่",
  "rhodolite-garnet": "หินแห่งความงดงามและแรงดึงดูด",
  "rose-quartz": "หินแห่งความรักและการให้อภัย",
  ruby: "ราชาแห่งอัญมณี เสริมพลังและบารมี",
  "ruby-zoisite": "หินแห่งการเชื่อมต่อหัวใจและการเติบโต",
  sapphire: "อัญมณีแห่งความมั่นคงและปัญญา",
  "sapphire-rough": "อัญมณีแห่งความมั่นคงในรูปธรรมชาติ",
  "yellow-sapphire": "อัญมณีแห่งเสน่ห์และความสำเร็จ",
  zircon: "อัญมณีแห่งความสมดุลและความบริสุทธิ์",
  amber: "หินแห่งความอบอุ่นและการเยียวยา",
};

export const gemShapeLabels: Record<GemShape, string> = {
  round: "ทรงกลม (Round)",
  oval: "ทรงไข่ (Oval)",
  cushion: "ทรงหมอน (Cushion)",
  emerald: "เอเมอรัลด์คัต (Emerald)",
  pear: "ทรงหยดน้ำ (Pear)",
  heart: "ทรงหัวใจ (Heart)",
  cabochon: "คาโบชอง (Cabochon)",
  freeform: "ฟรีฟอร์ม (Freeform)",
};

export const priceRangeLabels: Record<PriceRange, string> = {
  all: "ทั้งหมด",
  "under1k": "< ฿1,000",
  "1k-3k": "฿1,000 - ฿3,000",
  "3k-5k": "฿3,000 - ฿5,000",
  "over5k": "฿5,000+",
};

// Jewelry customization data
export type JewelryType = "ring" | "necklace" | "bracelet" | "earrings";
export type MaterialType = "silver925" | "gold18k-white" | "gold18k-rose";

export interface JewelryOption {
  id: JewelryType;
  label: string;
  labelTh: string;
  icon: string;
  previewImage: string;
  description: string;
}

export interface MaterialOption {
  id: MaterialType;
  label: string;
  labelTh: string;
  color: string;
  multiplier: number;
  description: string;
}

export const jewelryOptions: JewelryOption[] = [
  { id: "ring", label: "Ring", labelTh: "แหวน", icon: "ring", previewImage: "/images/ring.png", description: "แหวนพลอยแท้ สวมใส่ทุกวัน" },
  { id: "necklace", label: "Necklace", labelTh: "สร้อยคอ", icon: "necklace", previewImage: "/images/necklace.png", description: "สร้อยคอสำหรับพลอย เสริมเสน่ห์" },
  { id: "bracelet", label: "Bracelet", labelTh: "สร้อยข้อมือ", icon: "bracelet", previewImage: "/images/bracelet.png", description: "สร้อยข้อมือพลอย งดงามทุกมุมมอง" },
  { id: "earrings", label: "Earrings", labelTh: "ต่างหู", icon: "earrings", previewImage: "/images/earring.png", description: "ต่างหูพลอย สวยหรู" },
];

export const materialOptions: MaterialOption[] = [
  { id: "silver925", label: "Silver 925", labelTh: "เงินแท้ S925", color: "#C0C0C0", multiplier: 1.0, description: "ราคาประหยัด เหมาะสำหรับการสะสม" },
  { id: "gold18k-white", label: "White Gold 18K", labelTh: "ทองคำขาว 18K", color: "#E8E8E8", multiplier: 3.5, description: "หรูหรา ทนทาน เหมาะสำหรับวันพิเศษ" },
  { id: "gold18k-rose", label: "Rose Gold 18K", labelTh: "ทองคำแดง 18K", color: "#E8B4B8", multiplier: 4.0, description: "โรแมนติก อบอุ่น เทรนด์ระดับโลก" },
];

export const craftFees: Record<JewelryType, number> = {
  ring: 1800,
  necklace: 2400,
  bracelet: 2100,
  earrings: 1500,
};
