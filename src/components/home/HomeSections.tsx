import Image from "next/image";
import Link from "next/link";
import { getShopProducts } from "@/lib/catalog";
import { serviceCards } from "@/lib/data";
import {
  chooseSplifftCards,
  chooseYourSplifftSection,
  dankDropsSection,
  dankDropProductIds,
  dankndevourPartnerSection,
  eventsTeaserSection,
  fullSeshSection,
  heroMarketing,
  homeServiceCards,
  membershipSection,
  serviceAreaSection,
  servicesPreviewSection,
  whatYouGetSection,
} from "@/lib/marketing";
import { DROP_OF_THE_MONTH_SLUG } from "@/lib/drop-of-the-month";
import { SPLIFFT_MONTHLY_SLUG } from "@/lib/splifft-monthly-teaser";
import { HeroParallax } from "@/components/home/HeroParallax";
import { HeroSubscriptionCtas } from "@/components/home/HeroSubscriptionCtas";
import { ClubWaitlistCapture } from "@/components/club/ClubWaitlistCapture";
import { ChooseSplifftSubscriptionCard } from "@/components/home/ChooseSplifftSubscriptionCard";
import { SplifftButton } from "@/components/ui/SplifftButton";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { membershipPerks, locations } from "@/lib/data";

const actionCardClass =
  "group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl border-2 border-black bg-gradient-to-br p-6 shadow-[6px_6px_0_0_rgba(0,0,0,0.65)] transition-all duration-300 ease-out motion-safe:transition-[transform,box-shadow,border-color] motion-reduce:transition-none hover:-translate-y-1 hover:border-[var(--splifft-pink)]/35 hover:shadow-[10px_10px_0_0_rgba(255,45,146,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--splifft-pink)]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--splifft-ink)] active:scale-[0.99] motion-reduce:active:scale-100";

function servicePricing(id: string) {
  return serviceCards.find((s) => s.id === id);
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b-2 border-black bg-[radial-gradient(ellipse_at_top,_#1a1020_0%,_#0a0a0c_55%,_#050506_100%)]">
      <HeroParallax>
        <div className="absolute inset-0 opacity-40 [background-image:repeating-linear-gradient(90deg,transparent,transparent_40px,rgba(255,45,146,0.06)_40px,rgba(255,45,146,0.06)_41px),repeating-linear-gradient(0deg,transparent,transparent_40px,rgba(0,191,255,0.05)_40px,rgba(0,191,255,0.05)_41px)]" />
        <div
          className="splifft-hero-gradient-drift pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,45,146,0.12),transparent_50%)]"
          aria-hidden
        />
      </HeroParallax>
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:flex-row lg:items-center lg:py-24">
        <div className="flex-1 space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--splifft-pink)]/50 bg-black/40 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[var(--splifft-pink)]">
            {heroMarketing.eyebrow}
          </p>
          <div className="relative w-full max-w-[min(100%,28rem)]">
            <Image
              src="/splifftlogo.png"
              alt="Splifft"
              width={672}
              height={202}
              className="h-auto w-full object-contain object-left drop-shadow-[0_0_28px_rgba(255,45,146,0.2)]"
              priority
              sizes="(max-width: 640px) 100vw, 448px"
            />
          </div>
          <h1 className="max-w-xl font-[family-name:var(--font-display)] text-4xl uppercase leading-[0.95] tracking-wide text-[var(--splifft-cream)] sm:text-5xl">
            Stop Rolling. Start Smoking.
          </h1>
          <p className="max-w-xl text-lg text-[var(--splifft-muted)]">
            {heroMarketing.lead}
          </p>
          <p className="max-w-xl text-base font-medium text-[var(--splifft-cream)]/90">
            {heroMarketing.supporting}
          </p>
          <HeroSubscriptionCtas />
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--splifft-blue)]">
            {heroMarketing.trustLine}
          </p>
        </div>
        <div className="relative flex-1">
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border-2 border-black shadow-[12px_12px_0_0_rgba(255,45,146,0.45)] transition-transform duration-500 ease-out motion-safe:md:hover:scale-[1.02] lg:mx-auto">
            <Image
              src={heroMarketing.heroImageSrc}
              alt={heroMarketing.heroImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 400px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="font-[family-name:var(--font-display)] text-2xl text-[var(--splifft-cream)]">
                {heroMarketing.cardTitle}
              </p>
              <p className="mt-1 text-sm text-[var(--splifft-muted)]">
                {heroMarketing.cardCaption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ChooseYourSplifftSection() {
  const dropCard = chooseSplifftCards[1]!;

  return (
    <section className="border-b-2 border-black bg-[var(--splifft-ink)] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide text-[var(--splifft-cream)] sm:text-4xl">
          {chooseYourSplifftSection.heading}
        </h2>
        <p className="mt-2 max-w-2xl text-[var(--splifft-muted)]">
          {chooseYourSplifftSection.subheading}
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <ChooseSplifftSubscriptionCard />
          <Link
            href={dropCard.href}
            className={`${actionCardClass} ${dropCard.stripe}`}
          >
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-cream)]">
                {dropCard.title}
              </h3>
              <p className="mt-3 text-sm text-[var(--splifft-muted)]">
                {dropCard.body}
              </p>
              <ul className="mt-4 list-none space-y-1.5 text-sm font-medium text-[var(--splifft-cream)]/90">
                {dropCard.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-[var(--splifft-blue)]">•</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[var(--splifft-pink)] transition-colors duration-300 group-hover:text-[var(--splifft-blue)]">
              {dropCard.cta}
              <span aria-hidden>→</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function WhatYouGetSection() {
  return (
    <section className="border-b-2 border-black bg-[#111015] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-cream)] sm:text-4xl">
          {whatYouGetSection.heading}
        </h2>
        <p className="mt-2 max-w-xl text-[var(--splifft-muted)]">
          {whatYouGetSection.subheading}
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-[var(--splifft-pink)]/40 bg-black/40 p-6 shadow-[6px_6px_0_0_rgba(255,45,146,0.25)]">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--splifft-pink)]">
              Primary
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl uppercase text-[var(--splifft-cream)]">
              {whatYouGetSection.subscriptionTitle}
            </h3>
            <ul className="mt-4 space-y-3 text-sm font-medium text-[var(--splifft-muted)]">
              {whatYouGetSection.subscriptionBullets.map((line, i) => (
                <li key={line} className="flex gap-3">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 border-[var(--splifft-pink)] text-xs font-bold text-[var(--splifft-pink)]"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-[var(--splifft-blue)]/40 bg-black/40 p-6 shadow-[6px_6px_0_0_rgba(0,191,255,0.25)]">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--splifft-blue)]">
              Featured
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl uppercase text-[var(--splifft-cream)]">
              {whatYouGetSection.dropTitle}
            </h3>
            <ul className="mt-4 space-y-3 text-sm font-medium text-[var(--splifft-muted)]">
              {whatYouGetSection.dropBullets.map((line, i) => (
                <li key={line} className="flex gap-3">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 border-[var(--splifft-blue)] text-xs font-bold text-[var(--splifft-blue)]"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MembershipSection() {
  return (
    <section
      id="club"
      className="bg-[radial-gradient(circle_at_20%_20%,rgba(255,45,146,0.2),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(0,191,255,0.18),transparent_40%),#0a0a0c] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--splifft-blue)]">
              {membershipSection.eyebrow}
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl uppercase text-[var(--splifft-cream)] sm:text-5xl">
              {membershipSection.heading}
            </h2>
            <p className="mt-4 text-[var(--splifft-muted)]">
              {membershipSection.intro}
            </p>
            <p className="mt-4 rounded-xl border border-[var(--splifft-pink)]/40 bg-black/30 px-4 py-3 text-sm font-semibold text-[var(--splifft-cream)]">
              {membershipSection.subscriptionPriceCallout}
            </p>
            <ul className="mt-6 space-y-3">
              {membershipPerks.map((perk) => (
                <li
                  key={perk}
                  className="flex gap-3 text-sm text-[var(--splifft-cream)]"
                >
                  <span className="mt-0.5 text-[var(--splifft-pink)]">★</span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-black bg-[var(--splifft-card)] p-8 shadow-[10px_10px_0_0_rgba(255,45,146,0.45)]">
            <p className="text-sm font-bold uppercase tracking-wider text-[var(--splifft-ink-soft)]">
              Splifft Club
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-6xl text-[var(--splifft-ink)]">
              $9
              <span className="text-2xl font-sans font-semibold text-[var(--splifft-ink-soft)]">
                /month
              </span>
            </p>
            <p className="mt-4 text-sm text-[var(--splifft-ink-soft)]">
              {membershipSection.pricingBlurb} Billing opens soon — same Club
              waitlist as the Club page.
            </p>
            <div className="mt-8 border-t-2 border-dashed border-black/15 pt-8">
              <ClubWaitlistCapture surface="home_membership" idPrefix="home-club" />
            </div>
            <Link
              href="/club"
              className="mt-4 inline-flex text-sm font-bold uppercase tracking-wide text-[var(--splifft-blue)] underline-offset-4 hover:underline"
            >
              Full Splifft Club details →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export async function DankDropsSection() {
  const catalog = await getShopProducts();
  const dankDrops = catalog.filter((p) =>
    (dankDropProductIds as readonly string[]).includes(p.id),
  );

  return (
    <section
      id="dank-drops"
      className="border-b-2 border-black bg-[var(--splifft-pink)]/12 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-cream)] sm:text-4xl">
              {dankDropsSection.heading}
            </h2>
            <p className="mt-2 text-[var(--splifft-muted)]">
              {dankDropsSection.subheading}
            </p>
            <p className="mt-3 max-w-2xl text-sm font-medium text-[var(--splifft-cream)]/85">
              {dankDropsSection.intro}
            </p>
          </div>
          <SplifftButton href="/shop#dank-drops" variant="secondary">
            Full shop
          </SplifftButton>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dankDrops.map((p) => (
            <ShopProductCard key={p.id} product={p} ctaLabel="Add to Sesh" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function FullSeshSection() {
  const tiles = [
    {
      title: fullSeshSection.tileSubscription,
      href: `/shop/${SPLIFFT_MONTHLY_SLUG}`,
      stripe: "from-[var(--splifft-pink)]/30 to-transparent",
    },
    {
      title: fullSeshSection.tileDrop,
      href: `/shop/${DROP_OF_THE_MONTH_SLUG}`,
      stripe: "from-[var(--splifft-blue)]/30 to-transparent",
    },
    {
      title: fullSeshSection.tileDrops,
      href: "/shop#dank-drops",
      stripe: "from-white/10 to-transparent",
    },
  ] as const;

  return (
    <section className="border-b-2 border-black bg-[#0c0c10] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-cream)] sm:text-4xl">
          {fullSeshSection.heading}
        </h2>
        <p className="mt-2 max-w-2xl text-[var(--splifft-muted)]">
          {fullSeshSection.subheading}
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {tiles.map((t) => (
            <Link
              key={t.title}
              href={t.href}
              className={`${actionCardClass} ${t.stripe} min-h-[160px]`}
            >
              <span className="font-[family-name:var(--font-display)] text-2xl uppercase text-[var(--splifft-cream)]">
                {t.title}
              </span>
              <span className="mt-4 text-sm font-bold uppercase tracking-wide text-[var(--splifft-pink)]">
                Shop it →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesPreviewSection() {
  return (
    <section className="border-b-2 border-black bg-[var(--splifft-ink)] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-cream)] sm:text-4xl">
          {servicesPreviewSection.heading}
        </h2>
        <p className="mt-2 max-w-2xl text-[var(--splifft-muted)]">
          {servicesPreviewSection.subheading}
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {homeServiceCards.map((s) => {
            const pricing = servicePricing(s.id);
            return (
              <article
                key={s.id}
                className="flex flex-col rounded-2xl border-2 border-[var(--splifft-blue)]/50 bg-black/40 p-6"
              >
                <h3 className="font-[family-name:var(--font-display)] text-2xl uppercase text-[var(--splifft-cream)]">
                  {s.name}
                </h3>
                <p className="mt-3 flex-1 text-sm text-[var(--splifft-muted)]">
                  {s.description}
                </p>
                {pricing ? (
                  <p className="mt-4 text-xs font-bold uppercase tracking-wide text-[var(--splifft-pink)]">
                    From ${pricing.startingAt}{" "}
                    <span className="text-[var(--splifft-muted)]">
                      · Club ${pricing.memberStartingAt}
                    </span>
                  </p>
                ) : null}
                <SplifftButton
                  href={s.ctaHref}
                  variant="primary"
                  className="mt-5"
                >
                  {s.ctaLabel}
                </SplifftButton>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function EventsTeaserSection() {
  return (
    <section className="border-b-2 border-black bg-gradient-to-br from-[#1a0a14] via-[#0d0d12] to-[#050508] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl border-2 border-[var(--splifft-pink)] bg-black/35 p-8 sm:p-12">
          <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-cream)] sm:text-5xl">
            {eventsTeaserSection.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-lg font-medium text-[var(--splifft-cream)]">
            {eventsTeaserSection.subheading}
          </p>
          <p className="mt-4 max-w-2xl text-lg text-[var(--splifft-muted)]">
            {eventsTeaserSection.body}
          </p>
          <SplifftButton href="/services/events" variant="secondary" className="mt-8">
            {eventsTeaserSection.cta}
          </SplifftButton>
        </div>
      </div>
    </section>
  );
}

export function DankNDevourPartnerSection() {
  const { heading, subheading, supportLine, ctaVisit, ctaReviews, visitUrl, reviewsUrl } =
    dankndevourPartnerSection;

  return (
    <section className="border-b-2 border-black bg-[#12121a] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-cream)] sm:text-4xl">
          {heading}
        </h2>
        <p className="mt-2 max-w-2xl text-lg text-[var(--splifft-muted)]">
          {subheading}
        </p>
        <p className="mt-4 max-w-2xl text-sm font-medium text-[var(--splifft-cream)]/90">
          {supportLine}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <SplifftButton href={visitUrl} variant="primary">
            {ctaVisit}
          </SplifftButton>
          <SplifftButton href={reviewsUrl} variant="secondary">
            {ctaReviews}
          </SplifftButton>
        </div>
      </div>
    </section>
  );
}

export function ServiceAreaSection() {
  return (
    <section className="border-b-2 border-black bg-[#12121a] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-cream)] sm:text-4xl">
          {serviceAreaSection.heading}
        </h2>
        <p className="mt-2 text-[var(--splifft-muted)]">
          {serviceAreaSection.subheading}
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((loc) => (
            <li key={loc.slug}>
              <Link
                href={`/locations/${loc.slug}`}
                className="block rounded-xl border-2 border-black bg-[var(--splifft-card)] px-4 py-4 font-semibold text-[var(--splifft-ink)] shadow-[4px_4px_0_0_rgba(0,191,255,0.35)] transition hover:-translate-y-0.5 hover:border-[var(--splifft-pink)]/40"
              >
                {loc.name}
                <span className="mt-1 block text-xs font-normal text-[var(--splifft-ink-soft)]">
                  Area page →
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <SplifftButton href="/locations" variant="ghost" className="mt-8">
          View all service areas
        </SplifftButton>
      </div>
    </section>
  );
}
