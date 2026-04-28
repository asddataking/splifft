"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ProductImage } from "@/components/ui/ProductImage";
import { SplifftButton } from "@/components/ui/SplifftButton";
import { PLAN_PRICING_USD } from "@/lib/pricing";

const sectionIds = [
  "hero",
  "what-you-get",
  "how-it-works",
  "pricing",
  "access-perks",
  "events",
  "final-cta",
] as const;

function useSectionProgress() {
  const [active, setActive] = useState<(typeof sectionIds)[number]>(sectionIds[0]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.find((entry) => entry.isIntersecting);
          if (visible) setActive(id);
        },
        { threshold: 0.55 },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return active;
}

export function PremiumHomePage() {
  const activeSection = useSectionProgress();
  const { scrollYProgress } = useScroll();
  const jointY = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const jointRotate = useTransform(scrollYProgress, [0, 1], [-18, 20]);
  const jointScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.08]);

  const trustPills = useMemo(
    () => [
      "5-pack format",
      "Glass tip included",
      "Monthly Access available",
      "Michigan-built",
    ],
    [],
  );

  return (
    <div className="premium-page relative">
      <motion.div
        aria-hidden
        className={`pointer-events-none fixed right-2 top-[22%] z-30 hidden h-40 w-24 md:block ${
          activeSection === "what-you-get" ? "opacity-0" : "opacity-85"
        }`}
        style={{ y: jointY, rotate: jointRotate, scale: jointScale }}
      >
        <div className="relative h-full w-full">
          <ProductImage
            src="/splifft-1.png"
            alt="Decorative Splifft joint accent"
            fallbackLabel="splifft-single.png"
            className="mix-blend-multiply drop-shadow-[0_12px_18px_rgba(0,0,0,0.45)]"
          />
        </div>
      </motion.div>

      <section
        id="hero"
        className="relative flex min-h-[100svh] snap-start flex-col justify-center overflow-hidden bg-[radial-gradient(circle_at_20%_15%,rgba(255,45,146,0.24),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(0,191,255,0.24),transparent_45%),linear-gradient(180deg,#060608_0%,#0b0712_40%,#050507_100%)] px-4 pb-24 pt-16 md:pt-20"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.03),transparent)]" />
        <div className="relative mx-auto grid w-full max-w-md items-center gap-10 md:max-w-7xl md:grid-cols-2 md:gap-14 xl:gap-20">
          <div className="flex flex-col items-start">
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="font-[family-name:var(--font-display)] text-5xl uppercase leading-[0.85] tracking-wide text-[var(--splifft-cream)] sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Stop Rolling.
            <br />
            Start Smoking.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: "easeOut" }}
            className="mt-4 max-w-xl text-base text-[var(--splifft-muted)] md:text-lg"
          >
            Premium 5-pack Splifft boxes built for smoother sessions, cleaner
            presentation, and zero setup.
          </motion.p>

          <div className="mt-10 grid w-full max-w-md gap-3">
            <SplifftButton href="/checkout" variant="primary" className="w-full">
              Build My First Pack →
            </SplifftButton>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {trustPills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--splifft-cream)]/90 md:text-xs"
              >
                {pill}
              </span>
            ))}
          </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: "easeOut" }}
            className="relative hidden min-h-[520px] items-center justify-center md:flex lg:min-h-[620px]"
          >
            <div className="absolute inset-0 rounded-[36px] bg-[radial-gradient(circle_at_35%_30%,rgba(255,45,146,0.18),transparent_45%),radial-gradient(circle_at_75%_70%,rgba(0,191,255,0.2),transparent_45%)]" />
            <div className="relative h-[560px] w-[78%] max-w-[520px]">
              <ProductImage
                src="/Splifft 2.png"
                alt="Open Splifft premium box with 5 joints"
                fallbackLabel="splifft-pack-hero.png"
                className="drop-shadow-[0_24px_30px_rgba(0,0,0,0.55)]"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="what-you-get"
        className="flex min-h-[86svh] snap-start items-start bg-[linear-gradient(180deg,#f6f2eb,#efe7db)] px-4 py-10 md:min-h-[82svh] md:py-10 lg:min-h-[80svh]"
      >
        <div className="mx-auto w-full max-w-md md:max-w-7xl">
          <div className="grid gap-6 md:grid-cols-[1.25fr_1fr] md:items-start">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-5xl uppercase leading-[0.9] text-[#191622] md:text-6xl">
                What You Get
              </h2>
              <p className="mt-3 max-w-3xl text-sm text-[#3b334a] md:text-base">
                Clean premium details in every pack, made to feel consistent from first open to final session.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 md:gap-4 lg:gap-5">
            {[
              "Glass tip",
              "Branded Splifft band",
              "Clean white cone",
              "Premium 5-pack box",
            ].map((item) => (
              <div
                key={item}
                className="premium-tilt-card rounded-2xl border border-black/10 bg-white/80 p-4 shadow-[0_8px_24px_rgba(12,12,20,0.12)] md:p-5"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-[#5d5768]">Included</p>
                <p className="mt-2 text-sm font-semibold text-[#1d1a27] md:text-base">{item}</p>
              </div>
            ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:mt-2">
              <div className="relative h-40 overflow-hidden rounded-2xl border border-black/15 bg-black/5 md:h-44">
                <ProductImage
                  src="/splifft-1.png"
                  alt="Single Splifft close-up showing glass tip"
                  fallbackLabel="splifft-glass-tip.png"
                />
              </div>
              <div className="relative h-40 overflow-hidden rounded-2xl border border-black/15 bg-black/5 md:h-44">
                <ProductImage
                  src="/Splifft 2.png"
                  alt="Open Splifft box showing branded band details"
                  fallbackLabel="splifft-band-detail.png"
                />
              </div>
              <div className="relative col-span-2 h-44 overflow-hidden rounded-2xl border border-black/15 bg-black/5 md:h-52">
                <ProductImage
                  src="/Splifft 2.png"
                  alt="Splifft premium 5-pack box product shot"
                  fallbackLabel="splifft-box-open.png"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="flex min-h-[88svh] snap-start items-start bg-[radial-gradient(circle_at_20%_20%,rgba(255,45,146,0.15),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(0,191,255,0.15),transparent_45%),#0a0a10] px-4 py-12 md:min-h-[82svh] md:py-10"
      >
        <div className="mx-auto w-full max-w-md md:max-w-7xl">
          <h2 className="font-[family-name:var(--font-display)] text-5xl uppercase leading-[0.9] text-[var(--splifft-cream)] md:text-6xl">
            How Splifft Works
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-[var(--splifft-muted)] md:text-base">
            A better session in three simple steps.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3 md:gap-4">
            {[
              {
                title: "Choose Your Pack",
                body: "Pick Monthly Access or grab a One-Time Pack.",
              },
              {
                title: "Make It Yours",
                body: "Add optional drops during checkout if you want to level up the box.",
              },
              {
                title: "Open and Smoke",
                body: "No rolling. No mess. Your session is ready.",
              },
            ].map((step, index) => (
              <article
                key={step.title}
                className="premium-tilt-card premium-glow-frame rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm md:p-6"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-cyan-300">Step {index + 1}</p>
                <h3 className="mt-2 text-xl font-semibold text-[var(--splifft-cream)]">{step.title}</h3>
                <p className="mt-2 text-sm text-[var(--splifft-muted)]">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="flex min-h-[90svh] snap-start items-start bg-[radial-gradient(circle_at_20%_20%,rgba(255,45,146,0.18),transparent_42%),radial-gradient(circle_at_80%_40%,rgba(0,191,255,0.15),transparent_45%),#09090d] px-4 py-12 md:min-h-[86svh] md:py-10"
      >
        <div className="mx-auto w-full max-w-md md:max-w-7xl">
          <h2 className="font-[family-name:var(--font-display)] text-5xl uppercase leading-[0.9] text-[var(--splifft-cream)] md:text-6xl">
            Choose Your Access
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-[var(--splifft-muted)] md:text-base">
            Choose the access style that fits your routine. Monthly Access stays front and center for best value.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-[1.5fr_1fr] md:items-start md:gap-6">
          <div className="premium-glow-frame rounded-3xl border border-fuchsia-300/35 bg-white/10 p-6 shadow-[0_0_36px_rgba(255,45,146,0.3)] backdrop-blur-md md:p-7">
            <p className="inline-flex rounded-full border border-fuchsia-300/40 bg-fuchsia-400/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-fuchsia-200">
              Best Value
            </p>
            <p className="mt-4 font-[family-name:var(--font-display)] text-4xl uppercase text-[var(--splifft-cream)]">
              Monthly Access
            </p>
            <p className="mt-1 text-3xl font-bold text-cyan-300">$60 / month</p>
            <p className="sr-only">{PLAN_PRICING_USD.monthlyAccess}</p>
            <p className="mt-2 text-sm text-[var(--splifft-muted)]">
              Your 5-pack, ready before the session starts.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--splifft-cream)]">
              {[
                "5 premium Spliffts",
                "Glass filter tips",
                "Branded Splifft bands",
                "Monthly delivery",
                "First access to drops",
                "First access to future flower and rosin collabs",
                "Skip anytime",
                "Cancel anytime",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <span className="mt-1 text-cyan-300">•</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <SplifftButton href="/checkout?plan=monthly_access" variant="primary" className="mt-6 w-full">
              Get Monthly Access →
            </SplifftButton>
          </div>

          <div className="premium-tilt-card rounded-3xl border border-white/15 bg-white/[0.04] p-5 md:p-6">
            <div className="relative mb-4 h-28 overflow-hidden rounded-2xl border border-white/10 bg-black/25">
              <ProductImage
                src="/Splifft 2.png"
                alt="Splifft pack detail for one-time option"
                fallbackLabel="splifft-pack-detail.png"
              />
            </div>
            <p className="font-[family-name:var(--font-display)] text-2xl uppercase text-[var(--splifft-cream)]">
              One-Time Pack
            </p>
            <p className="mt-1 text-2xl font-bold text-[var(--splifft-cream)]">$75</p>
            <p className="sr-only">{PLAN_PRICING_USD.oneTimePack}</p>
            <p className="mt-1 text-sm text-[var(--splifft-muted)]">
              For trying it once or gifting.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-[var(--splifft-cream)]/85">
              <li>• 5 premium Spliffts</li>
              <li>• Glass filter tips</li>
              <li>• Branded Splifft bands</li>
              <li>• Single purchase</li>
              <li>• No early access</li>
              <li>• No monthly perks</li>
            </ul>
            <SplifftButton href="/checkout?plan=one_time_pack" variant="ghost" className="mt-4 w-full">
              Buy One Pack →
            </SplifftButton>
          </div>
          </div>
        </div>
      </section>

      <section id="access-perks" className="flex min-h-[88svh] snap-start items-start px-4 py-12 md:min-h-[84svh] md:py-10">
        <div className="mx-auto w-full max-w-md md:max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
            Monthly Access Perks
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-5xl uppercase leading-[0.9] text-[var(--splifft-cream)] md:text-6xl">
            More Than
            <br />
            Just A Pack
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-[var(--splifft-muted)] md:text-base">
            Monthly Access gives you the easiest way to keep your session ready, plus
            first access to limited Splifft drops and future collabs.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-[1.2fr_1fr] md:gap-6">
            <div className="grid gap-3 md:grid-cols-2 md:gap-4">
            {[
              "First access to limited drops",
              "First access to future flower collabs",
              "First access to future rosin collabs",
              "Future Signature Splifft releases",
              "Skip anytime",
              "Cancel anytime",
            ].map((perk) => (
              <article
                key={perk}
                className="premium-tilt-card rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm md:p-6"
              >
                <p className="text-base font-semibold text-[var(--splifft-cream)] md:text-lg">
                  {perk}
                </p>
                <p className="mt-2 text-sm text-[var(--splifft-muted)]">
                  Included with Monthly Access.
                </p>
              </article>
            ))}
            </div>
            <div className="relative min-h-[220px] overflow-hidden rounded-3xl border border-white/15 bg-white/5 md:min-h-[100%]">
              <ProductImage
                src="/events-brand-rooftop.jpg"
                alt="Lifestyle scene showing premium Splifft vibe"
                fallbackLabel="splifft-lifestyle-session.png"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="events" className="flex min-h-[84svh] snap-start items-start px-4 py-12 md:min-h-[80svh] md:py-10">
        <div className="mx-auto w-full max-w-md md:max-w-7xl">
          <p className="max-w-2xl text-sm text-[var(--splifft-muted)] md:text-base">
            Hosting nights, private sessions, or elevated celebrations? Splifft Events gives you a premium presentation without prep stress.
          </p>
          <div className="premium-glow-frame relative mt-5 overflow-hidden rounded-3xl border border-white/20 bg-white/8 p-6 backdrop-blur-xl md:p-8">
          <div className="absolute inset-0">
            <ProductImage
              src="/events-private-parties.jpg"
              alt="Outdoor concert and crowd atmosphere for Splifft events"
              fallbackLabel="splifft-lifestyle-session.png"
              className="object-cover opacity-28"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,11,0.22),rgba(7,7,11,0.8))]" />
          <div className="relative z-10">
          <h2 className="font-[family-name:var(--font-display)] text-5xl uppercase leading-[0.9] text-[var(--splifft-cream)] md:text-6xl">
            Stop Rolling.
            <br />
            Start Hosting.
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-[var(--splifft-muted)]">
            Splifft Events stays separate from Monthly Access pricing. Events are
            custom-quote only.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <SplifftButton href="/services/events" variant="secondary">
              Request Event Quote →
            </SplifftButton>
            <SplifftButton href="/checkout?plan=monthly_access" variant="ghost">
              Get Monthly Access →
            </SplifftButton>
          </div>
          </div>
          </div>
        </div>
      </section>

      <section id="final-cta" className="flex min-h-[90svh] snap-start items-start px-4 py-12 pb-28 md:min-h-[86svh] md:py-10">
        <div className="mx-auto w-full max-w-md md:max-w-7xl">
        <div className="premium-glow-frame grid w-full gap-6 rounded-3xl border border-white/20 bg-white/8 p-6 shadow-[0_0_35px_rgba(255,45,146,0.22)] backdrop-blur-xl md:grid-cols-2 md:gap-10 md:p-8">
          <div>
          <h2 className="font-[family-name:var(--font-display)] text-5xl uppercase leading-[0.88] text-[var(--splifft-cream)] md:text-6xl lg:text-7xl">
            Your Next Session
            <br />
            Should Already Be Ready.
          </h2>
          <p className="mt-3 text-sm text-[var(--splifft-muted)]">
            No rolling. No mess. No setup.
          </p>
          <SplifftButton href="/checkout?plan=monthly_access" variant="primary" className="mt-5 w-full sm:w-auto">
            Get Monthly Access →
          </SplifftButton>
          </div>
          <div className="hidden items-center justify-center md:flex">
            <div className="relative h-[360px] w-[62%] min-w-[220px]">
              <ProductImage
                src="/splifft-1.png"
                alt="Single Splifft product image"
                fallbackLabel="splifft-single.png"
                className="-rotate-[14deg] drop-shadow-[0_18px_24px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>
        </div>
        </div>
      </section>

      <div
        className={`premium-sticky-cta fixed bottom-0 left-0 right-0 z-50 px-4 pb-[calc(env(safe-area-inset-bottom)+0.9rem)] pt-3 transition-all duration-300 ${
          activeSection === "hero"
            ? "pointer-events-none translate-y-4 opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <div className="mx-auto max-w-md rounded-3xl border border-white/20 bg-[rgba(10,10,16,0.78)] p-3 backdrop-blur-xl md:max-w-2xl">
          <SplifftButton href="/checkout?plan=monthly_access" variant="primary" className="w-full">
            Get Monthly Access →
          </SplifftButton>
        </div>
      </div>
    </div>
  );
}
