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
    { url: `${base}/blog`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/press`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/services`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    {
      url: `${base}/services/events`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.88,
    },
    { url: `${base}/events`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/locations`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/monthly-access`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${base}/blog/why-joints-burn-uneven-michigan`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.65,
    },
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

  const teaserShopUrl: MetadataRoute.Sitemap = [
    {
      url: `${base}/shop/splifft-monthly`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.88,
    },
  ];

  return [
    ...staticRoutes,
    ...teaserShopUrl,
    ...shopProductRoutes,
    ...locationRoutes,
  ];
}
