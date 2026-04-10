import type { MetadataRoute } from "next";
import { getShopProducts } from "@/lib/catalog";
import { locations } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

const base = SITE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const products = await getShopProducts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/shop`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/services`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/events`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/locations`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/club`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/cart`, lastModified, changeFrequency: "monthly", priority: 0.4 },
  ];

  const locationRoutes: MetadataRoute.Sitemap = locations.map((loc) => ({
    url: `${base}/locations/${loc.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const shopProductRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/shop/${p.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...shopProductRoutes, ...locationRoutes];
}
