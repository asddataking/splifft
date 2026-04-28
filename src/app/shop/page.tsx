import { getShopProducts } from "@/lib/catalog";
import { dankDropProductIds } from "@/lib/marketing";
import { ShopPageClient } from "@/components/shop/ShopPageClient";
import { buildPageMetadata, SOCIAL_SHARE_DESCRIPTION } from "@/lib/site";

export const metadata = buildPageMetadata({
  path: "/shop",
  title: "Shop",
  description:
    "Shop Splifft 5-packs with Monthly Access or buy a One-Time Pack.",
  shareDescription: SOCIAL_SHARE_DESCRIPTION,
});

export default async function ShopPage() {
  const products = await getShopProducts();
  const corePacks = products.filter(
    (p) => p.slug === "sativa-5-pack" || p.slug === "indica-5-pack",
  );
  const dankDrops = products.filter((p) =>
    (dankDropProductIds as readonly string[]).includes(p.id),
  );
  return <ShopPageClient corePacks={corePacks} dankDrops={dankDrops} />;
}
