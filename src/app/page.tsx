import {
  ChooseYourSplifftSection,
  DankDropsSection,
  DankNDevourPartnerSection,
  EventsTeaserSection,
  FullSeshSection,
  HeroSection,
  MemberMathSection,
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
    "The smartest way to smoke. Join Splifft Club for $7, save on 5-packs, and unlock The Vault themed boxes.",
  shareDescription: SOCIAL_SHARE_DESCRIPTION,
});

export default function Home() {
  return (
    <SubscriptionModalProvider>
      <HeroSection />
      <ChooseYourSplifftSection />
      <WhatYouGetSection />
      <MembershipSection />
      <MemberMathSection />
      <DankDropsSection />
      <FullSeshSection />
      <ServicesPreviewSection />
      <EventsTeaserSection />
      <DankNDevourPartnerSection />
      <ServiceAreaSection />
    </SubscriptionModalProvider>
  );
}
