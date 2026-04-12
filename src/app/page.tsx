import {
  ChooseYourSplifftSection,
  DankDropsSection,
  DankNDevourPartnerSection,
  EventsTeaserSection,
  FullSeshSection,
  HeroSection,
  MembershipSection,
  ServiceAreaSection,
  ServicesPreviewSection,
  WhatYouGetSection,
} from "@/components/home/HomeSections";
import { SubscriptionModalProvider } from "@/components/home/SubscriptionModalProvider";
import { buildPageMetadata, SOCIAL_SHARE_DESCRIPTION } from "@/lib/site";

export const metadata = buildPageMetadata({
  path: "/",
  title: "Home",
  absoluteTitle: "Splifft — Stop Rolling. Start Smoking.",
  description:
    "Splifft Subscription, Drop of the Month, and Dank Drops — artisinally hand rolled joints and curated sesh boxes. Splifft Club saves every sesh. Michigan.",
  shareDescription: SOCIAL_SHARE_DESCRIPTION,
});

export default function Home() {
  return (
    <SubscriptionModalProvider>
      <HeroSection />
      <ChooseYourSplifftSection />
      <WhatYouGetSection />
      <MembershipSection />
      <DankDropsSection />
      <FullSeshSection />
      <ServicesPreviewSection />
      <EventsTeaserSection />
      <DankNDevourPartnerSection />
      <ServiceAreaSection />
    </SubscriptionModalProvider>
  );
}
