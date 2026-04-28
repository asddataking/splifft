"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { SplifftButton } from "@/components/ui/SplifftButton";

type SignatureAssemblySectionProps = {
  onWaitlistCta: () => void;
};

function clamp01(value: number) {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

function splitProgress(progress: number, start: number, end: number) {
  return clamp01((progress - start) / (end - start));
}

function easeOutCubic(value: number) {
  const t = clamp01(value);
  return 1 - (1 - t) ** 3;
}

function buildPieceStyle(progress: number) {
  const assemble = easeOutCubic(splitProgress(progress, 0.08, 0.42));
  const drop = easeOutCubic(splitProgress(progress, 0.66, 0.9));

  return {
    tipX: -120 + 120 * assemble,
    bodyX: 120 - 120 * assemble,
    partY: 16 - 16 * assemble,
    bodyScale: 0.94 + 0.06 * assemble,
    bandScale: 0.72 + 0.28 * assemble,
    assembledOpacity: 0.2 + 0.8 * assemble,
    stackY: drop * 280,
  };
}

function SplifftUnit({
  progress,
  index,
  reducedMotion,
}: {
  progress: number;
  index: number;
  reducedMotion: boolean;
}) {
  const staggerWindow = 0.1;
  const start = 0.14 + index * staggerWindow;
  const end = start + 0.23;
  const localProgress = splitProgress(progress, start, end);
  const style = buildPieceStyle(localProgress);

  const yOffset = index * 58;
  const opacity = reducedMotion ? 1 : 0.16 + 0.84 * localProgress;

  return (
    <div
      className="absolute left-1/2 top-1/2 w-[220px] -translate-x-1/2"
      style={{
        transform: `translate(-50%, ${-150 + yOffset + style.stackY}px)`,
        opacity,
      }}
    >
      <div className="relative h-8">
        <div
          className="absolute left-6 top-[7px] h-4 w-8 rounded-l-full border border-cyan-200/60 bg-[linear-gradient(145deg,rgba(210,225,255,0.8),rgba(78,100,125,0.65))] shadow-[0_0_16px_rgba(0,191,255,0.33)]"
          style={{ transform: `translateX(${style.tipX}px) translateY(${style.partY}px)` }}
        />
        <div
          className="absolute left-11 top-0 h-6 w-40 rounded-full border border-white/55 bg-[linear-gradient(180deg,rgba(245,245,245,0.96),rgba(212,212,212,0.86))] shadow-[0_6px_12px_rgba(0,0,0,0.3)]"
          style={{
            transform: `translateX(${style.bodyX}px) translateY(${style.partY}px) scale(${style.bodyScale})`,
          }}
        />
        <div
          className="absolute left-[88px] top-[2px] h-5 w-10 rounded-md border border-fuchsia-300/65 bg-[linear-gradient(135deg,rgba(0,191,255,0.9),rgba(255,45,146,0.9))] shadow-[0_0_12px_rgba(255,45,146,0.35)]"
          style={{
            transform: `translateY(${style.partY * 0.7}px) scale(${style.bandScale})`,
            opacity: style.assembledOpacity,
          }}
        />
      </div>
    </div>
  );
}

export function SignatureAssemblySection({ onWaitlistCta }: SignatureAssemblySectionProps) {
  const reduceMotion = useReducedMotion();
  const [progressValue, setProgressValue] = useState(0);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 22,
    mass: 0.25,
  });

  const sectionProgress = useTransform(
    smoothProgress,
    [0.16, 0.52],
    [0, 1],
    { clamp: true },
  );
  const glowOpacity = useTransform(sectionProgress, [0.72, 1], [0.15, 0.85]);
  const ctaOpacity = useTransform(sectionProgress, [0.84, 1], [0, 1]);
  const boxY = useTransform(sectionProgress, [0.68, 0.9], [40, 0]);

  useMotionValueEvent(sectionProgress, "change", (value) => {
    setProgressValue(value);
  });

  return (
    <section id="build-animation" className="relative h-[320svh] snap-start">
      <div className="sticky top-0 flex min-h-[100svh] items-center justify-center overflow-hidden px-4">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,45,146,0.2),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(0,191,255,0.2),transparent_45%)]"
          style={{ opacity: glowOpacity }}
        />

        <div className="relative mx-auto flex w-full max-w-md flex-col items-center">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300/90">
              Signature Build
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl uppercase leading-[0.92] text-[var(--splifft-cream)]">
              Built Better.
              <br />
              Rolled Smarter.
            </h2>
            <p className="mx-auto mt-3 max-w-xs text-sm text-[var(--splifft-muted)]">
              Every Splifft is assembled for a cleaner, smoother, ready-to-smoke
              experience.
            </p>
          </div>

          <div className="relative h-[380px] w-full">
            {Array.from({ length: 5 }).map((_, index) => (
              <motion.div
                key={`splifft-${index}`}
                style={{ opacity: reduceMotion ? 1 : sectionProgress }}
              >
                <SplifftUnit
                  progress={reduceMotion ? 1 : progressValue}
                  index={index}
                  reducedMotion={Boolean(reduceMotion)}
                />
              </motion.div>
            ))}

            <motion.div
              className="absolute left-1/2 top-[230px] h-28 w-[250px] -translate-x-1/2 rounded-[26px] border border-white/20 bg-[linear-gradient(180deg,rgba(22,18,30,0.92),rgba(8,8,12,0.96))] shadow-[0_0_30px_rgba(0,191,255,0.2),0_0_42px_rgba(255,45,146,0.2)]"
              style={{ y: boxY }}
            >
              <div className="absolute inset-x-5 top-3 h-3 rounded-full bg-white/8" />
              <motion.div
                aria-hidden
                className="absolute inset-0 rounded-[26px] bg-[radial-gradient(circle_at_50%_0%,rgba(255,45,146,0.25),transparent_55%)]"
                style={{ opacity: glowOpacity }}
              />
            </motion.div>
          </div>

          <ul className="mt-3 grid w-full max-w-xs grid-cols-2 gap-2 text-[11px] uppercase tracking-wide text-[var(--splifft-cream)]/85">
            <li className="rounded-xl border border-white/15 bg-black/30 px-3 py-2">Glass filter tip</li>
            <li className="rounded-xl border border-white/15 bg-black/30 px-3 py-2">Branded band</li>
            <li className="rounded-xl border border-white/15 bg-black/30 px-3 py-2">Clean white cone</li>
            <li className="rounded-xl border border-white/15 bg-black/30 px-3 py-2">Premium 5-pack</li>
          </ul>

          <motion.div className="mt-6" style={{ opacity: ctaOpacity }}>
            <SplifftButton onClick={onWaitlistCta} variant="primary">
              Join Waitlist →
            </SplifftButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
