import type { Metadata } from "next";

/** Production site URL — used for metadata, sitemap, JSON-LD, and social cards. */
export const SITE_URL = "https://getsplifft.com";

/** Google Analytics 4 measurement ID (gtag.js). */
export const GOOGLE_ANALYTICS_MEASUREMENT_ID = "G-9FT8YGPK4K";

/** Meta (Facebook) Pixel ID — loaded in root layout (fbq PageView). */
export const META_PIXEL_ID = "1605409814016301";

/** Primary line for Open Graph / Twitter (share previews). */
export const SOCIAL_SHARE_DESCRIPTION =
  "Stop rolling. Start smoking. Get Monthly Access for premium 5-packs, cleaner ready-to-smoke sessions, and One-Time Pack flexibility. Splifft Events available for custom quotes.";

/** DankNDevour brand partner links. */
export const DANKNDEVOUR_SITE_URL = "https://www.dankndevour.com";

/** Replace with YouTube, TikTok, or reviews page when ready. */
export const DANKNDEVOUR_REVIEWS_URL = "https://www.dankndevour.com";

export const OG_IMAGE_PATH = "/splifftlogo.png";

export const defaultOpenGraphImage = {
  url: OG_IMAGE_PATH,
  width: 1200,
  height: 1200,
  alt: "Splifft logo — pink SPLIFFT wordmark with spliff graphic on a cyan triangle",
  type: "image/png" as const,
};

/** Per-route SEO + social cards (logo image on every share). */
export function buildPageMetadata(opts: {
  path: string;
  /** Short segment; becomes "{title} | Splifft" in OG/Twitter unless `absoluteTitle` is set. */
  title: string;
  description: string;
  shareDescription?: string;
  /** Use on the homepage to avoid the title template adding a second "| Splifft". */
  absoluteTitle?: string;
}): Metadata {
  const pathNorm =
    opts.path === "/" ? "/" : opts.path.startsWith("/") ? opts.path : `/${opts.path}`;
  const pageUrl = pathNorm === "/" ? SITE_URL : `${SITE_URL}${pathNorm}`;
  const desc = opts.shareDescription ?? opts.description;
  const ogTitle = opts.absoluteTitle ?? `${opts.title} | Splifft`;

  return {
    title: opts.absoluteTitle
      ? { absolute: opts.absoluteTitle }
      : opts.title,
    description: opts.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: ogTitle,
      description: desc,
      url: pageUrl,
      siteName: "Splifft",
      locale: "en_US",
      type: "website",
      images: [defaultOpenGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: desc,
      images: [`${SITE_URL}${OG_IMAGE_PATH}`],
    },
  };
}
