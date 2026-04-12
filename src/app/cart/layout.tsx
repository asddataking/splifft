import { buildPageMetadata, SOCIAL_SHARE_DESCRIPTION } from "@/lib/site";

export const metadata = buildPageMetadata({
  path: "/cart",
  title: "Cart",
  description:
    "Review your cart — Dank Drops, Drop of the Month, and more. Checkout is mocked until your processor is wired.",
  shareDescription: SOCIAL_SHARE_DESCRIPTION,
});

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
