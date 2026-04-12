/** Hero imagery per pack slug — swap for assets under /public when ready. */
const PACK_IMAGES: Record<string, { url: string; alt: string }> = {
  "splifft-monthly": {
    url: "/splifft-1.png",
    alt: "Splifft Subscription — artisinally hand rolled joints, glass tips, monthly delivery",
  },
  "drop-of-the-month": {
    url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=85",
    alt: "Curated box and session picks — Drop of the Month",
  },
  "cabin-pack": {
    url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=85",
    alt: "Warm wood cabin interior — Cabin Pack mood",
  },
  "dankndevour-pack": {
    url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=85",
    alt: "Snack spread for sharing — DankNDevour Pack mood",
  },
  "lake-day-pack": {
    url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&q=85",
    alt: "Lake dock and open water — Lake Day Pack mood",
  },
  "mystery-pack": {
    url: "https://images.unsplash.com/photo-1550684848-fac7c75b4e61?w=1200&q=85",
    alt: "Neon night lights — Mystery Pack drop",
  },
};

const DEFAULT_PACK = {
  url: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=85",
  alt: "Packages and boxes — Splifft pack",
};

export function getPackImage(slug: string): { url: string; alt: string } {
  return PACK_IMAGES[slug] ?? DEFAULT_PACK;
}
