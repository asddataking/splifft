import { PremiumHomePage } from "@/components/premium-home/PremiumHomePage";
import { SubscriptionModalProvider } from "@/components/home/SubscriptionModalProvider";
import { buildPageMetadata, SOCIAL_SHARE_DESCRIPTION } from "@/lib/site";

export const metadata = buildPageMetadata({
  path: "/",
  title: "Home",
  absoluteTitle: "Splifft — Stop Rolling. Start Smoking.",
  description:
    "Premium 5-pack Splifft boxes with glass tips, drop access, and a smoother ready-to-smoke experience. Join the waitlist.",
  shareDescription: SOCIAL_SHARE_DESCRIPTION,
});

export default function Home() {
  return (
    <SubscriptionModalProvider>
      <PremiumHomePage />
    </SubscriptionModalProvider>
  );
}
