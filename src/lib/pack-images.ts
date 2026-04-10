/** Hero imagery per pack slug — swap for assets under /public when ready. */
const PACK_IMAGES: Record<string, { url: string; alt: string }> = {
  "cabin-pack": {
    url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=85",
    alt: "Warm cabin interior with wood and soft light — Cabin Pack vibe",
  },
  "dankndevour-pack": {
    url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=85",
    alt: "Colorful grazing table and shareable snacks — DankNDevour Pack vibe",
  },
  "lake-day-pack": {
    url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&q=85",
    alt: "Lake dock and open water — Lake Day Pack vibe",
  },
  "mystery-pack": {
    url: "https://images.unsplash.com/photo-1550684848-fac7c75b4e61?w=1200&q=85",
    alt: "Neon lights and night energy — Mystery Pack drop",
  },
};

const DEFAULT_PACK = {
  url: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1200&q=85",
  alt: "Splifft pack — Roll Wagon street energy",
};

export function getPackImage(slug: string): { url: string; alt: string } {
  return PACK_IMAGES[slug] ?? DEFAULT_PACK;
}
