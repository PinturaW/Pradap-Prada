import type { GemType, JewelryType } from "@/lib/gem-data";

export const USE_MOCK_IMAGES = true;
export const MOCK_IMAGE = "/images/placeholders/premium-white.svg";
export const MOCK_IMAGE_ALT = "/images/placeholders/premium-white-alt.svg";

export const gemPlaceholderByType: Record<GemType, string> = {
  ruby:            "/red.png",
  sapphire:        "/blue.png",
  "black-star-sapphire": "/blue.png",
  "golden-star-sapphire": "/yellow.png",
  "sapphire-rough": MOCK_IMAGE_ALT,
  "yellow-sapphire": "/yellow.png",
  zircon:          "/blue.png",
  amber:           "/yellow.png",
  labradorite:     "/gems/labradorite.png",
  amethyst:        "/gems/amethyst.png",
  "rose-quartz":   "/red.png",
  chalcedony:      "/blue.png",
  fluorite:        "/gems/amethyst.png",
  moonstone:       MOCK_IMAGE,
  "tiger-eye":     "/yellow.png",
  garnet:          "/gems/garnet.jpg",
  "spessartite-garnet": "/gems/garnet.jpg",
  "rhodolite-garnet": "/gems/garnet.jpg",
  "ruby-zoisite": "/gems/labradorite.png",
  peridot:         MOCK_IMAGE,
  emerald:         "/gems/labradorite.png",
  apatite:         "/blue.png",
  aquamarine:      "/blue.png",
  tourmaline:      MOCK_IMAGE,
  "lapis-lazuli":  "/blue.png",
};

export const jewelryPlaceholderById: Record<JewelryType, string> = {
  ring: MOCK_IMAGE,
  necklace: MOCK_IMAGE,
  bracelet: MOCK_IMAGE,
  earrings: MOCK_IMAGE,
};

export const storyImages = {
  trat: "/images/trat.jpg",
  ruby: "/images/craft.png",
};
