import { PremiumHomePage } from "@/components/premium-home/PremiumHomePage";
import { buildPageMetadata, SOCIAL_SHARE_DESCRIPTION } from "@/lib/site";

export const metadata = buildPageMetadata({
  path: "/",
  title: "Home",
  absoluteTitle: "Splifft — Stop Rolling. Start Smoking.",
  description:
    "Premium 5-pack Splifft boxes with glass tips and a smoother ready-to-smoke experience. Build your first pack today.",
  shareDescription: SOCIAL_SHARE_DESCRIPTION,
});

export default function Home() {
  return <PremiumHomePage />;
}
