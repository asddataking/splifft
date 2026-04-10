import { buildPageMetadata, SOCIAL_SHARE_DESCRIPTION } from "@/lib/site";

export const metadata = buildPageMetadata({
  path: "/cart",
  title: "Cart",
  description:
    "Review your Splifft packs and continue to checkout — bundles built for an easier sesh.",
  shareDescription: SOCIAL_SHARE_DESCRIPTION,
});

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
