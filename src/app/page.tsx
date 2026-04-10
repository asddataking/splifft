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
    "Splifft makes your sesh easier: Roll Up and Fresh Hit inside the Roll Wagon, curated packs, and Michigan event prep. Quick handoff — ready to smoke.",
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
