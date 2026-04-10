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
    "Easier sesh — no prep, no stress. Roll Up, Fresh Hit, curated packs, Splifft Events, and Club. We pull up, prep your smoke, hand it back ready.",
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
