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
