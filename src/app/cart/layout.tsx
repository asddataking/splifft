import { buildPageMetadata, SOCIAL_SHARE_DESCRIPTION } from "@/lib/site";

export const metadata = buildPageMetadata({
  path: "/cart",
  title: "Cart",
  description:
    "Review your Splifft packs and continue to checkout — built to pair with Roll Up.",
  shareDescription: SOCIAL_SHARE_DESCRIPTION,
});

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
