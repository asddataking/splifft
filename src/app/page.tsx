import {
  ActionCardsSection,
  EventsTeaserSection,
  FeaturedPacksSection,
  HeroSection,
  MembershipSection,
  ServiceAreaSection,
  ServicesPreviewSection,
  WowGridSection,
} from "@/components/home/HomeSections";
import { buildPageMetadata, SOCIAL_SHARE_DESCRIPTION } from "@/lib/site";

export const metadata = buildPageMetadata({
  path: "/",
  title: "Home",
  absoluteTitle: "Splifft — Stop Rolling. Start Smoking.",
  description:
    "Simple prep — no mess, no stress. Roll Up, Fresh Hit, packs, Splifft Events, and Splifft Club. We meet you, prep your smoke, hand it back ready.",
  shareDescription: SOCIAL_SHARE_DESCRIPTION,
});

export default function Home() {
  return (
    <>
      <HeroSection />
      <ActionCardsSection />
      <WowGridSection />
      <FeaturedPacksSection />
      <ServicesPreviewSection />
      <EventsTeaserSection />
      <ServiceAreaSection />
      <MembershipSection />
    </>
  );
}
