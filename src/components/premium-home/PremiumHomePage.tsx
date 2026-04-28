"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ClubWaitlistCapture } from "@/components/club/ClubWaitlistCapture";
import { useSubscriptionModal } from "@/components/home/SubscriptionModalProvider";
import { SplifftButton } from "@/components/ui/SplifftButton";
import { SignatureAssemblySection } from "@/components/premium-home/SignatureAssemblySection";

const sectionIds = [
  "hero",
  "build-animation",
  "what-you-get",
  "pricing",
  "access-perks",
  "drops",
  "waitlist",
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
  const waitlistRef = useRef<HTMLElement | null>(null);
  const { openSubscriptionModal } = useSubscriptionModal();
  const activeSection = useSectionProgress();

  useEffect(() => {
    waitlistRef.current = document.getElementById("waitlist");
  }, []);

  const jumpToWaitlist = () => {
    waitlistRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const trustPills = useMemo(
    () => [
      "5-pack format",
      "Glass tip included",
      "Monthly packs available",
      "Michigan-built",
    ],
    [],
  );

  return (
    <div className="premium-page relative">
      <section
        id="hero"
        className="relative flex min-h-[100svh] snap-start flex-col justify-center overflow-hidden bg-[radial-gradient(circle_at_20%_15%,rgba(255,45,146,0.24),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(0,191,255,0.24),transparent_45%),linear-gradient(180deg,#060608_0%,#0b0712_40%,#050507_100%)] px-4 pb-24 pt-16"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.03),transparent)]" />
        <div className="relative mx-auto flex w-full max-w-md flex-col items-start">
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="font-[family-name:var(--font-display)] text-6xl uppercase leading-[0.85] tracking-wide text-[var(--splifft-cream)]"
          >
            Stop Rolling.
            <br />
            Start Smoking.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: "easeOut" }}
            className="mt-4 max-w-xs text-base text-[var(--splifft-muted)]"
          >
            Premium 5-pack Splifft boxes built for smoother sessions, cleaner
            presentation, and zero setup.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.2, ease: "easeOut" }}
            className="mt-8 w-full rounded-3xl border border-white/15 bg-white/5 p-5 shadow-[0_0_34px_rgba(255,45,146,0.22)] backdrop-blur-md"
          >
            <div className="relative h-44 rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_25%_25%,rgba(0,191,255,0.3),transparent_45%),radial-gradient(circle_at_80%_50%,rgba(255,45,146,0.28),transparent_46%),linear-gradient(180deg,#14131c,#0a0a0f)]">
              <motion.div
                className="absolute left-8 top-[78px] h-4 w-9 rounded-l-full border border-cyan-100/70 bg-[linear-gradient(145deg,rgba(230,238,255,0.9),rgba(85,96,112,0.7))]"
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute left-[68px] top-[72px] h-6 w-40 rounded-full border border-white/60 bg-[linear-gradient(180deg,rgba(249,249,249,0.95),rgba(216,216,216,0.9))]"
                animate={{ y: [0, -8, 0], rotate: [0, -1.4, 0] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute left-[146px] top-[74px] h-5 w-10 rounded-md border border-fuchsia-200/70 bg-[linear-gradient(135deg,rgba(0,191,255,0.96),rgba(255,45,146,0.95))]"
                animate={{ y: [0, -8, 0], rotate: [0, 1.6, 0] }}
                transition={{ duration: 3.35, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          <div className="mt-8 grid w-full gap-3">
            <SplifftButton onClick={jumpToWaitlist} variant="primary" className="w-full">
              Join Waitlist →
            </SplifftButton>
            <SplifftButton onClick={jumpToWaitlist} variant="ghost" className="w-full">
              Explore Drops
            </SplifftButton>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {trustPills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--splifft-cream)]/90"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <SignatureAssemblySection onWaitlistCta={jumpToWaitlist} />

      <section
        id="what-you-get"
        className="flex min-h-[100svh] snap-start items-center bg-[linear-gradient(180deg,#f6f2eb,#efe7db)] px-4 py-16"
      >
        <div className="mx-auto w-full max-w-md">
          <h2 className="font-[family-name:var(--font-display)] text-5xl uppercase leading-[0.9] text-[#191622]">
            What You Get
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {[
              "Glass tip",
              "Branded band",
              "Clean roll",
              "Premium 5-pack box",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-black/10 bg-white/80 p-4 shadow-[0_8px_24px_rgba(12,12,20,0.12)]"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-[#5d5768]">Included</p>
                <p className="mt-2 text-sm font-semibold text-[#1d1a27]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="flex min-h-[100svh] snap-start items-center bg-[radial-gradient(circle_at_20%_20%,rgba(255,45,146,0.18),transparent_42%),radial-gradient(circle_at_80%_40%,rgba(0,191,255,0.15),transparent_45%),#09090d] px-4 py-16"
      >
        <div className="mx-auto w-full max-w-md">
          <h2 className="font-[family-name:var(--font-display)] text-5xl uppercase leading-[0.9] text-[var(--splifft-cream)]">
            Choose Your Access
          </h2>
          <div className="mt-6 rounded-3xl border border-fuchsia-300/35 bg-white/10 p-6 shadow-[0_0_36px_rgba(255,45,146,0.3)] backdrop-blur-md">
            <p className="inline-flex rounded-full border border-fuchsia-300/40 bg-fuchsia-400/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-fuchsia-200">
              Best Value
            </p>
            <p className="mt-4 font-[family-name:var(--font-display)] text-4xl uppercase text-[var(--splifft-cream)]">
              Monthly Access
            </p>
            <p className="mt-1 text-3xl font-bold text-cyan-300">$60 / month</p>
            <p className="mt-2 text-sm text-[var(--splifft-muted)]">
              Your 5-pack, ready before the session starts.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--splifft-cream)]">
              {[
                "5 premium Spliffts",
                "Glass filter tips",
                "First access to drops",
                "Monthly delivery",
                "Skip anytime",
                "Cancel anytime",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <span className="mt-1 text-cyan-300">•</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <SplifftButton onClick={jumpToWaitlist} variant="primary" className="mt-6 w-full">
              Join Waitlist →
            </SplifftButton>
          </div>

          <div className="mt-4 rounded-3xl border border-white/20 bg-transparent p-5 opacity-80">
            <p className="font-[family-name:var(--font-display)] text-2xl uppercase text-[var(--splifft-cream)]">
              One-Time Pack
            </p>
            <p className="mt-1 text-2xl font-bold text-[var(--splifft-cream)]">$75</p>
            <p className="mt-1 text-sm text-[var(--splifft-muted)]">
              For trying it once or gifting.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-[var(--splifft-cream)]/85">
              <li>• 5-pack</li>
              <li>• No early access</li>
              <li>• No perks</li>
            </ul>
            <SplifftButton onClick={jumpToWaitlist} variant="ghost" className="mt-4 w-full">
              Join Waitlist →
            </SplifftButton>
          </div>
        </div>
      </section>

      <section id="access-perks" className="flex min-h-[100svh] snap-start items-center px-4 py-16">
        <div className="mx-auto w-full max-w-md">
          <h2 className="font-[family-name:var(--font-display)] text-5xl uppercase leading-[0.9] text-[var(--splifft-cream)]">
            More Than
            <br />
            Just A Pack
          </h2>
          <div className="mt-6 grid gap-3">
            {[
              "First access to drops",
              "Collabs",
              "Limited releases",
              "Future Signature Spliffts",
            ].map((perk, index) => (
              <article
                key={perk}
                className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm"
              >
                <p className="text-xs uppercase tracking-[0.14em] text-cyan-300">
                  Perk {index + 1}
                </p>
                <p className="mt-1 text-base font-semibold text-[var(--splifft-cream)]">
                  {perk}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="drops" className="flex min-h-[100svh] snap-start items-center px-4 py-16">
        <div className="mx-auto w-full max-w-md">
          <h2 className="font-[family-name:var(--font-display)] text-5xl uppercase leading-[0.9] text-[var(--splifft-cream)]">
            Limited Drops
          </h2>
          <p className="mt-2 text-sm text-[var(--splifft-muted)]">
            Built for better sessions.
          </p>
          <div className="premium-drops-rail mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
            {["Cabin Drop", "Lake Day Drop", "Mystery Drop"].map((drop) => (
              <article
                key={drop}
                className="min-w-[78%] snap-start rounded-3xl border border-white/20 bg-[linear-gradient(135deg,rgba(255,45,146,0.15),rgba(0,191,255,0.12))] p-5 shadow-[0_12px_25px_rgba(0,0,0,0.35)]"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--splifft-muted)]">
                  Drop
                </p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-3xl uppercase text-[var(--splifft-cream)]">
                  {drop}
                </p>
                <p className="mt-2 text-sm text-[var(--splifft-cream)]/85">
                  Limited run, premium presentation, zero setup.
                </p>
                <SplifftButton onClick={jumpToWaitlist} variant="secondary" className="mt-4 w-full">
                  Join Waitlist →
                </SplifftButton>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="waitlist" className="flex min-h-[100svh] snap-start items-center px-4 py-16 pb-28">
        <div className="mx-auto w-full max-w-md rounded-3xl border border-white/20 bg-white/8 p-6 shadow-[0_0_35px_rgba(255,45,146,0.22)] backdrop-blur-xl">
          <h2 className="font-[family-name:var(--font-display)] text-5xl uppercase leading-[0.88] text-[var(--splifft-cream)]">
            Your Next Session
            <br />
            Should Already Be Ready.
          </h2>
          <p className="mt-3 text-sm text-[var(--splifft-muted)]">
            No rolling. No mess. No setup.
          </p>
          <div className="mt-5">
            <ClubWaitlistCapture surface="home_membership" idPrefix="premium-home-waitlist" />
          </div>
          <SplifftButton onClick={openSubscriptionModal} variant="ghost" className="mt-4 w-full">
            Set Indica/Sativa Preference →
          </SplifftButton>
        </div>
      </section>

      <div className="premium-progress-dots fixed right-3 top-1/2 z-40 -translate-y-1/2 md:right-6">
        {sectionIds.map((id) => {
          const active = id === activeSection;
          return (
            <button
              key={id}
              type="button"
              aria-label={`Go to ${id}`}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
              className={`h-2.5 w-2.5 rounded-full border transition ${active ? "border-cyan-200 bg-cyan-300 shadow-[0_0_14px_rgba(0,191,255,0.8)]" : "border-white/30 bg-white/20"}`}
            />
          );
        })}
      </div>

      <div className="premium-sticky-cta fixed bottom-0 left-0 right-0 z-50 px-4 pb-[calc(env(safe-area-inset-bottom)+0.9rem)] pt-3">
        <div className="mx-auto max-w-md rounded-3xl border border-white/20 bg-[rgba(10,10,16,0.78)] p-3 backdrop-blur-xl">
          <SplifftButton onClick={jumpToWaitlist} variant="primary" className="w-full">
            Join Waitlist →
          </SplifftButton>
        </div>
      </div>
    </div>
  );
}
