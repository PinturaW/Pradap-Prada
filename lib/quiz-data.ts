import type { LucideIcon } from "lucide-react";
import {
  Moon,
  BookOpen,
  MessagesSquare,
  Headphones,
  Waves,
  Map,
  Sparkles,
  Trees,
  Leaf,
  Heart,
  Shield,
  Brain,
  Crown,
  Flame,
  Flower2,
  Users,
  Smile,
  Compass,
  Gem,
  Shirt,
  Eye,
  WandSparkles,
  Clapperboard,
} from "lucide-react";
import { allowedGemTypes, gemPowerData, type GemType } from "@/lib/gem-data";

const allowedQuizTypeSet = new Set<GemType>(allowedGemTypes);
const currentQuizGemTypeSet = new Set<GemType>(Object.keys(gemPowerData) as GemType[]);
const excludedQuizGemTypes = new Set<GemType>([
  "fluorite",
  "spessartite-garnet",
  "golden-star-sapphire",
  "lapis-lazuli",
]);

export interface QuizOption {
  id: string;
  icon: LucideIcon;
  label: string;
  sub: string;
  scores: Partial<Record<GemType, number>>;
}

export interface QuizQuestion {
  id: number;
  narrative: string;
  story: string;
  question: string;
  bgClass: string;
  options: QuizOption[];
}

export interface QuizResult {
  gemType: GemType;
  score: number;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    narrative: "CHAPTER I",
    story: "The city is quiet, your screen glows, and your mind starts wandering into your real mood.",
    question: "It’s 2am and you can’t sleep... what are you doing?",
    bgClass: "from-slate-50 to-white",
    options: [
      {
        id: "1a",
        icon: BookOpen,
        label: "Journaling your thoughts",
        sub: "Writing what your heart can’t say out loud",
        scores: { amethyst: 2, moonstone: 1, "rose-quartz": 1 },
      },
      {
        id: "1b",
        icon: Brain,
        label: "Deep-dive research mode",
        sub: "Wikipedia rabbit hole + documentary energy",
        scores: { sapphire: 2, "lapis-lazuli": 2 },
      },
      {
        id: "1c",
        icon: MessagesSquare,
        label: "Chaotic meme texting",
        sub: "Voice notes, inside jokes, and no sleep club",
        scores: { apatite: 2, "spessartite-garnet": 1, fluorite: 1 },
      },
      {
        id: "1d",
        icon: Headphones,
        label: "Lying in the dark with music",
        sub: "In your own world, no one can touch your vibe",
        scores: { "black-star-sapphire": 2, chalcedony: 2, zircon: 1 },
      },
    ],
  },
  {
    id: 2,
    narrative: "CHAPTER II",
    story: "Your passport is ready, your camera roll is empty, and your next mood-board trip is calling.",
    question: "Pick your dream travel aesthetic",
    bgClass: "from-cyan-50 to-white",
    options: [
      {
        id: "2a",
        icon: Waves,
        label: "Crystal ocean minimalism",
        sub: "White sand, sea breeze, peace mode",
        scores: { aquamarine: 2, chalcedony: 2, zircon: 1 },
      },
      {
        id: "2b",
        icon: Map,
        label: "Ancient city explorer",
        sub: "Ruins, local markets, and getting lost on purpose",
        scores: { "lapis-lazuli": 2, amber: 2, "ruby-zoisite": 1 },
      },
      {
        id: "2c",
        icon: Crown,
        label: "Luxury fashion getaway",
        sub: "Paris rooftops, couture moments, all eyes on you",
        scores: { ruby: 2, "golden-star-sapphire": 2, "yellow-sapphire": 1 },
      },
      {
        id: "2d",
        icon: Trees,
        label: "Quiet forest retreat",
        sub: "Ryokan mornings, matcha rituals, soft silence",
        scores: { amethyst: 2, moonstone: 2, emerald: 1 },
      },
    ],
  },
  {
    id: 3,
    narrative: "CHAPTER III",
    story: "Before anyone sees you, there’s always one invisible detail that says ‘this is me’.",
    question: "Your signature scent is...",
    bgClass: "from-rose-50 to-white",
    options: [
      {
        id: "3a",
        icon: Leaf,
        label: "Rain + green earth",
        sub: "Fresh soil, leaves, nature air",
        scores: { emerald: 2, "ruby-zoisite": 2, apatite: 1 },
      },
      {
        id: "3b",
        icon: Heart,
        label: "Warm vanilla amber",
        sub: "Soft, comforting, like a hug you trust",
        scores: { amber: 2, "rose-quartz": 2, "rhodolite-garnet": 1 },
      },
      {
        id: "3c",
        icon: Flame,
        label: "Dark rose + oud",
        sub: "Mysterious, smoky, unforgettable",
        scores: { "black-star-sapphire": 2, ruby: 1, garnet: 2 },
      },
      {
        id: "3d",
        icon: Waves,
        label: "Clean linen + ocean mist",
        sub: "Light, airy, barely-there elegance",
        scores: { chalcedony: 2, aquamarine: 1, moonstone: 2 },
      },
    ],
  },
  {
    id: 4,
    narrative: "CHAPTER IV",
    story: "Some tears come from pain, some from beauty, some from finally being seen.",
    question: "When you cry, it’s usually because...",
    bgClass: "from-violet-50 to-white",
    options: [
      {
        id: "4a",
        icon: Flower2,
        label: "Beauty hit too hard",
        sub: "A song, a film, a sunset, and your heart opens",
        scores: { "rose-quartz": 2, moonstone: 2, "rhodolite-garnet": 1 },
      },
      {
        id: "4b",
        icon: Moon,
        label: "You held too much for too long",
        sub: "You stayed strong until you couldn’t",
        scores: { amethyst: 2, chalcedony: 2, zircon: 1 },
      },
      {
        id: "4c",
        icon: Shield,
        label: "Someone crossed your boundary",
        sub: "You’ll forgive, but you don’t tolerate disrespect",
        scores: { ruby: 2, "spessartite-garnet": 2, "black-star-sapphire": 1 },
      },
      {
        id: "4d",
        icon: Brain,
        label: "No one listens to your solution",
        sub: "You can see the answer, but they can’t",
        scores: { sapphire: 2, "lapis-lazuli": 1, emerald: 2 },
      },
    ],
  },
  {
    id: 5,
    narrative: "CHAPTER V",
    story: "The outfit changes, but your power aura always finds a way to speak first.",
    question: "Your power outfit is...",
    bgClass: "from-stone-100 to-white",
    options: [
      {
        id: "5a",
        icon: Shirt,
        label: "All-black structured look",
        sub: "Sharp lines, quiet authority, untouchable mood",
        scores: { "black-star-sapphire": 2, sapphire: 1, garnet: 2 },
      },
      {
        id: "5b",
        icon: Leaf,
        label: "Earthy bohemian layers",
        sub: "Linen flow, grounded elegance, natural glow",
        scores: { amber: 2, "ruby-zoisite": 2, apatite: 1 },
      },
      {
        id: "5c",
        icon: Sparkles,
        label: "Bold statement color",
        sub: "You enter, the room notices",
        scores: { ruby: 2, "spessartite-garnet": 2, "golden-star-sapphire": 1 },
      },
      {
        id: "5d",
        icon: Flower2,
        label: "Romantic soft pastels",
        sub: "Delicate details with strong feminine energy",
        scores: { "rose-quartz": 2, fluorite: 2, "rhodolite-garnet": 1 },
      },
    ],
  },
  {
    id: 6,
    narrative: "CHAPTER VI",
    story: "Every friend group has roles. Yours is the one everyone remembers.",
    question: "What kind of friend are you?",
    bgClass: "from-amber-50 to-white",
    options: [
      {
        id: "6a",
        icon: Heart,
        label: "The therapist friend",
        sub: "People feel safe telling you everything",
        scores: { amethyst: 2, "rose-quartz": 1, chalcedony: 2 },
      },
      {
        id: "6b",
        icon: Smile,
        label: "The hype queen",
        sub: "You make everyone feel like main character",
        scores: { "golden-star-sapphire": 2, "yellow-sapphire": 2, apatite: 1 },
      },
      {
        id: "6c",
        icon: Shield,
        label: "The loyal ride-or-die",
        sub: "Quiet energy, strong presence, always there",
        scores: { zircon: 2, "lapis-lazuli": 2, moonstone: 1 },
      },
      {
        id: "6d",
        icon: Compass,
        label: "The chaotic fun planner",
        sub: "Spontaneous plans, no regrets, pure stories",
        scores: { "spessartite-garnet": 2, ruby: 1, fluorite: 2 },
      },
    ],
  },
  {
    id: 7,
    narrative: "CHAPTER VII",
    story: "Texture carries memory. Touch one and your soul recognizes itself.",
    question: "Pick a texture that matches your soul",
    bgClass: "from-blue-50 to-white",
    options: [
      {
        id: "7a",
        icon: Gem,
        label: "Smooth river stone",
        sub: "Cool, calm, shaped beautifully by time",
        scores: { aquamarine: 2, chalcedony: 2, zircon: 1 },
      },
      {
        id: "7b",
        icon: Sparkles,
        label: "Raw crystal cluster",
        sub: "Jagged edges, brilliant depth, hidden facets",
        scores: { fluorite: 2, amethyst: 1, "black-star-sapphire": 2 },
      },
      {
        id: "7c",
        icon: Crown,
        label: "Silk at night",
        sub: "Luxury flow, sensual movement, expensive calm",
        scores: { "golden-star-sapphire": 2, ruby: 1, sapphire: 2 },
      },
      {
        id: "7d",
        icon: Leaf,
        label: "Moss on old stone",
        sub: "Earthy, alive, quietly magical",
        scores: { emerald: 2, "ruby-zoisite": 2, amber: 1 },
      },
    ],
  },
  {
    id: 8,
    narrative: "CHAPTER VIII",
    story: "Everyone has a hidden flex. Yours isn’t loud, it’s undeniable.",
    question: "Your biggest flex is...",
    bgClass: "from-zinc-50 to-white",
    options: [
      {
        id: "8a",
        icon: Heart,
        label: "Emotional intelligence",
        sub: "You read people and rooms in seconds",
        scores: { moonstone: 2, "rose-quartz": 2, "rhodolite-garnet": 1 },
      },
      {
        id: "8b",
        icon: Brain,
        label: "Knowledge depth",
        sub: "You know a little about everything, and a lot about key things",
        scores: { "lapis-lazuli": 2, sapphire: 2, "yellow-sapphire": 1 },
      },
      {
        id: "8c",
        icon: Sparkles,
        label: "Your aesthetic universe",
        sub: "Feed, room, outfits — consistently iconic",
        scores: { fluorite: 2, apatite: 2, chalcedony: 1 },
      },
      {
        id: "8d",
        icon: Shield,
        label: "Resilience",
        sub: "You’ve been through it and came back stronger",
        scores: { garnet: 2, "black-star-sapphire": 1, zircon: 2 },
      },
    ],
  },
  {
    id: 9,
    narrative: "CHAPTER IX",
    story: "If the universe gave you one gift tonight, which power would choose you?",
    question: "If you had one magic ability...",
    bgClass: "from-violet-50 to-white",
    options: [
      {
        id: "9a",
        icon: Eye,
        label: "Read hidden feelings",
        sub: "See the truth under every smile",
        scores: { moonstone: 2, amethyst: 2, "rose-quartz": 1 },
      },
      {
        id: "9b",
        icon: Heart,
        label: "Heal what is broken",
        sub: "Bodies, minds, objects, memories",
        scores: { emerald: 2, "ruby-zoisite": 2, chalcedony: 1 },
      },
      {
        id: "9c",
        icon: WandSparkles,
        label: "Manifest instantly",
        sub: "Desire → reality in one breath",
        scores: { "golden-star-sapphire": 2, ruby: 1, "yellow-sapphire": 2 },
      },
      {
        id: "9d",
        icon: Sparkles,
        label: "See cosmic truth",
        sub: "Past lives, patterns, and hidden codes",
        scores: { "lapis-lazuli": 2, "black-star-sapphire": 2, sapphire: 1 },
      },
    ],
  },
  {
    id: 10,
    narrative: "CHAPTER X",
    story: "The camera turns to you. The soundtrack rises. This is your scene.",
    question: "Your main character moment is...",
    bgClass: "from-orange-50 to-white",
    options: [
      {
        id: "10a",
        icon: Clapperboard,
        label: "Golden-hour solo walk abroad",
        sub: "Headphones in, city lights, cinematic confidence",
        scores: { aquamarine: 2, apatite: 2, amber: 1 },
      },
      {
        id: "10b",
        icon: Moon,
        label: "Candlelit self-realization",
        sub: "You finally understand your own heart",
        scores: { amethyst: 2, "rhodolite-garnet": 2, moonstone: 1 },
      },
      {
        id: "10c",
        icon: Crown,
        label: "Owning the room",
        sub: "You walk in and the energy shifts",
        scores: { ruby: 2, "spessartite-garnet": 1, "golden-star-sapphire": 2 },
      },
      {
        id: "10d",
        icon: Flame,
        label: "Pure creative flow state",
        sub: "Building, making, becoming in your element",
        scores: { emerald: 2, fluorite: 2, zircon: 1 },
      },
    ],
  },
];

export function calculateResult(answers: Record<number, string>): QuizResult {
  const scores: Partial<Record<GemType, number>> = {};

  quizQuestions.forEach((question) => {
    const answerId = answers[question.id];
    if (!answerId) return;

    const option = question.options.find((choice) => choice.id === answerId);
    if (!option) return;

    Object.entries(option.scores).forEach(([type, points]) => {
      const gemType = type as GemType;
      if (!allowedQuizTypeSet.has(gemType)) return;
      if (!currentQuizTypeSetHas(gemType)) return;
      if (excludedQuizGemTypes.has(gemType)) return;
      scores[gemType] = (scores[gemType] ?? 0) + (points ?? 0);
    });
  });

  const sorted = Object.entries(scores).sort(([, first], [, second]) => (second ?? 0) - (first ?? 0));
  const [topType, topScore] = sorted[0] ?? ["rose-quartz", 0];

  return {
    gemType: topType as GemType,
    score: topScore ?? 0,
  };
}

function currentQuizTypeSetHas(gemType: GemType) {
  return currentQuizTypeSet.has(gemType);
}

const currentQuizTypeSet = currentQuizGemTypeSet;

export const gemPersonality: Record<GemType, { title: string; soul: string; detail: string }> = {
  amethyst: {
    title: "Stone of Peace & Clarity",
    soul: "Quiet depth, clear mind, soft power.",
    detail: "You have a deeply reflective heart and use stillness as your superpower. You process life with emotional intelligence and inner clarity, often understanding yourself before anyone else does.",
  },
  apatite: {
    title: "Stone of Inspiration",
    soul: "Creative spark with fearless curiosity.",
    detail: "You are naturally imaginative and full of expressive energy. You thrive on new ideas, new places, and new stories—and your presence inspires people around you to dream bigger.",
  },
  aquamarine: {
    title: "Stone of Serenity",
    soul: "Ocean calm with hidden depth.",
    detail: "You carry a graceful calm that comforts others instantly. Like the sea, you may look gentle on the surface, but your emotional depth and resilience are profoundly powerful.",
  },
  "black-star-sapphire": {
    title: "Stone of Mystery & Power",
    soul: "Magnetic, private, unforgettable.",
    detail: "You hold a mysterious aura that draws people in. Your strength is quiet but intense, and your inner light reveals itself only to those who truly take time to know you.",
  },
  chalcedony: {
    title: "Stone of Calm",
    soul: "Soft energy that heals spaces.",
    detail: "You are a grounding presence in every room. Your calm nature, kind spirit, and emotionally safe energy help others breathe easier and feel understood.",
  },
  emerald: {
    title: "Stone of Growth & Wisdom",
    soul: "Evolving with grace and intention.",
    detail: "You are always growing—emotionally, mentally, and spiritually. Your wisdom comes from lived experience, and your heart-led intelligence creates lasting impact.",
  },
  fluorite: {
    title: "Stone of Creativity",
    soul: "Colorful mind, original vision.",
    detail: "You see beauty where others see ordinary. Your ideas are fresh, expressive, and often ahead of their time, making you a natural creative force.",
  },
  "spessartite-garnet": {
    title: "Stone of Passion",
    soul: "Fire, motion, bold momentum.",
    detail: "You are vibrant, daring, and full of life-force. When you care about something, you show up with intensity and make things happen with unstoppable energy.",
  },
  garnet: {
    title: "Stone of Strength",
    soul: "Steady core, powerful resilience.",
    detail: "You are emotionally strong, dependable, and deeply loyal. Even in difficult seasons, you stand your ground and become a source of strength for others.",
  },
  "golden-star-sapphire": {
    title: "Stone of Brilliance",
    soul: "Natural glow, quiet authority.",
    detail: "You shine without trying. Your charisma attracts opportunities, people, and momentum—and your confidence lights up everything you enter.",
  },
  "lapis-lazuli": {
    title: "Stone of Truth & Wisdom",
    soul: "Depth, intellect, inner truth.",
    detail: "You are a seeker of meaning. Your thoughts run deep, your perspective is wide, and your voice carries truth with elegance and conviction.",
  },
  moonstone: {
    title: "Stone of Intuition",
    soul: "Soft instinct, accurate inner radar.",
    detail: "You feel what others miss. Your intuition is sharp, your emotional perception is high, and your sensitivity helps you navigate life with rare insight.",
  },
  "rhodolite-garnet": {
    title: "Stone of Love & Compassion",
    soul: "Warm heart, loyal tenderness.",
    detail: "You love deeply and sincerely. Your compassion is healing, your presence is comforting, and your emotional warmth creates strong, meaningful bonds.",
  },
  "rose-quartz": {
    title: "Stone of Unconditional Love",
    soul: "Gentle power, heart-first energy.",
    detail: "You lead with kindness and emotional generosity. Your love is genuine, your softness is strength, and you naturally create spaces where people feel safe.",
  },
  ruby: {
    title: "Stone of Vitality & Courage",
    soul: "Bold heart, fearless action.",
    detail: "You are brave, driven, and full of life. You move through the world with intensity and confidence, and your passion leaves a strong impression.",
  },
  "ruby-zoisite": {
    title: "Stone of Growth in Contrast",
    soul: "Harmony through duality.",
    detail: "You transform challenge into evolution. Even in complex situations, you find balance, heal quickly, and turn contrast into your signature beauty.",
  },
  sapphire: {
    title: "Stone of Wisdom & Loyalty",
    soul: "Steady intelligence, noble heart.",
    detail: "You are thoughtful, trustworthy, and emotionally composed. People rely on your judgment because your mind is clear and your values are solid.",
  },
  "yellow-sapphire": {
    title: "Stone of Prosperity",
    soul: "Bright confidence, golden momentum.",
    detail: "You carry optimistic energy that attracts success naturally. Your mindset turns opportunities into results and keeps your world moving upward.",
  },
  zircon: {
    title: "Stone of Clarity & Grounding",
    soul: "Clear mind, strong foundation.",
    detail: "You think clearly under pressure and stay centered in chaos. Your grounded perspective helps people trust you—and trust themselves.",
  },
  amber: {
    title: "Stone of Warmth & Memory",
    soul: "Comfort, nostalgia, soulful glow.",
    detail: "You are warm, emotionally rich, and full of meaningful stories. Your energy feels safe and timeless, making people feel instantly at home around you.",
  },

  "sapphire-rough": {
    title: "Stone of Raw Wisdom",
    soul: "Unpolished truth, grounded vision.",
    detail: "You value authenticity over perfection. Your strength comes from clear principles, practical insight, and the courage to stay real in every season.",
  },
  labradorite: {
    title: "Stone of Transformation",
    soul: "Mystic light, evolving spirit.",
    detail: "You are drawn to growth and reinvention. Your energy is intuitive and magnetic, helping you navigate change with creativity and quiet confidence.",
  },
  "tiger-eye": {
    title: "Stone of Focus & Courage",
    soul: "Steady will, bold direction.",
    detail: "You are strategic, resilient, and action-oriented. When others hesitate, you move with clarity and turn intention into measurable progress.",
  },
  peridot: {
    title: "Stone of Renewal",
    soul: "Fresh energy, open-hearted optimism.",
    detail: "You bring uplifting momentum wherever you go. Your mindset helps you release what is heavy and make space for growth, joy, and new beginnings.",
  },
  tourmaline: {
    title: "Stone of Protection",
    soul: "Grounded shield, calm strength.",
    detail: "You protect your peace and the people you love. Your presence is stabilizing, and your boundaries create a safe space where trust can thrive.",
  },
};
