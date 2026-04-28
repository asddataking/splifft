"use client";

import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
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

function buildPieceStyle(progress: number, globalProgress: number) {
  const assemble = easeOutCubic(splitProgress(progress, 0.02, 0.62));
  const settle = easeOutCubic(splitProgress(progress, 0.62, 0.85));
  const drop = easeOutCubic(splitProgress(globalProgress, 0.74, 0.96));

  return {
    tipX: -70 + 70 * assemble,
    bodyX: 85 - 85 * assemble,
    bandX: 15 - 15 * assemble,
    tipY: 14 - 14 * assemble,
    bodyY: -10 + 10 * assemble,
    bandY: -18 + 18 * assemble,
    pieceRotate: 2.2 - 2.2 * assemble,
    settleRotate: 6 - 6 * settle,
    pieceOpacity: 0.08 + 0.92 * assemble,
    stackY: drop * 220,
    finalOpacity: 1 - drop * 0.45,
  };
}

function SplifftUnit({
  progress,
  globalProgress,
  index,
  reducedMotion,
}: {
  progress: number;
  globalProgress: number;
  index: number;
  reducedMotion: boolean;
}) {
  const staggerWindow = 0.11;
  const start = 0.08 + index * staggerWindow;
  const end = start + 0.28;
  const localProgress = splitProgress(progress, start, end);
  const style = buildPieceStyle(localProgress, globalProgress);

  const yOffset = index * 34;
  const opacity = reducedMotion ? 1 : style.finalOpacity;
  const rotation = reducedMotion ? -23 : -23 + style.settleRotate;

  return (
    <div
      className="absolute left-1/2 top-1/2 h-[210px] w-[120px] -translate-x-1/2"
      style={{
        transform: `translate(-50%, ${-170 + yOffset + style.stackY}px) rotate(${rotation}deg)`,
        opacity,
      }}
    >
      <div className="relative h-full w-full">
        <Image
          src="/splifft-1.png"
          alt=""
          fill
          className="object-contain object-center drop-shadow-[0_8px_10px_rgba(0,0,0,0.4)]"
          sizes="120px"
          style={{
            transform: `translateX(${style.bodyX}px) translateY(${style.bodyY}px) rotate(${style.pieceRotate}deg)`,
            opacity: style.pieceOpacity,
            clipPath: "polygon(12% 0%, 88% 0%, 78% 70%, 24% 70%)",
          }}
        />
        <Image
          src="/splifft-1.png"
          alt=""
          fill
          className="object-contain object-center"
          sizes="120px"
          style={{
            transform: `translateX(${style.bandX}px) translateY(${style.bandY}px)`,
            opacity: style.pieceOpacity,
            clipPath: "polygon(14% 63%, 88% 63%, 80% 80%, 22% 80%)",
          }}
        />
        <Image
          src="/splifft-1.png"
          alt=""
          fill
          className="object-contain object-center drop-shadow-[0_10px_16px_rgba(0,191,255,0.28)]"
          sizes="120px"
          style={{
            transform: `translateX(${style.tipX}px) translateY(${style.tipY}px) rotate(${-style.pieceRotate}deg)`,
            opacity: style.pieceOpacity,
            clipPath: "polygon(16% 76%, 88% 76%, 79% 100%, 20% 100%)",
          }}
        />
      </div>
    </div>
  );
}

export function SignatureAssemblySection({ onWaitlistCta }: SignatureAssemblySectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [progressValue, setProgressValue] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.25,
  });

  const sectionProgress = useTransform(smoothProgress, [0, 1], [0, 1], { clamp: true });
  const glowOpacity = useTransform(sectionProgress, [0.62, 1], [0.2, 0.82]);
  const ctaOpacity = useTransform(sectionProgress, [0.84, 1], [0, 1]);
  const boxY = useTransform(sectionProgress, [0.76, 0.92], [30, 0]);
  const boxScale = useTransform(sectionProgress, [0.75, 0.95], [0.95, 1]);

  useMotionValueEvent(sectionProgress, "change", (value) => {
    setProgressValue(value);
  });

  return (
    <section id="build-animation" ref={sectionRef} className="relative h-[340svh] snap-start">
      <div className="sticky top-0 flex min-h-[100svh] items-center justify-center overflow-hidden px-4">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,45,146,0.2),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(0,191,255,0.2),transparent_45%)]"
          style={{ opacity: glowOpacity }}
        />

        <div className="relative mx-auto flex w-full max-w-md flex-col items-center md:max-w-3xl">
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

          <div className="relative h-[470px] w-full md:h-[560px]">
            {Array.from({ length: 5 }).map((_, index) => (
              <motion.div
                key={`splifft-${index}`}
                style={{ opacity: reduceMotion ? 1 : sectionProgress }}
              >
                <SplifftUnit
                  progress={reduceMotion ? 1 : progressValue}
                  globalProgress={reduceMotion ? 1 : progressValue}
                  index={index}
                  reducedMotion={Boolean(reduceMotion)}
                />
              </motion.div>
            ))}

            <motion.div
              className="absolute left-1/2 top-[255px] h-[220px] w-[250px] -translate-x-1/2 md:top-[300px] md:h-[250px] md:w-[290px]"
              style={{ y: boxY, scale: boxScale }}
            >
              <Image
                src="/Splifft 2.png"
                alt="Open Splifft premium 5-pack box"
                fill
                className="object-contain object-center drop-shadow-[0_20px_26px_rgba(0,0,0,0.5)]"
                sizes="(max-width: 768px) 250px, 290px"
                priority
              />
              <motion.div
                aria-hidden
                className="absolute inset-0 rounded-[24px] bg-[radial-gradient(circle_at_50%_35%,rgba(0,191,255,0.2),transparent_62%),radial-gradient(circle_at_50%_70%,rgba(255,45,146,0.2),transparent_62%)]"
                style={{ opacity: glowOpacity }}
              />
            </motion.div>
          </div>

          <ul className="mt-3 grid w-full max-w-xs grid-cols-2 gap-2 text-[11px] uppercase tracking-wide text-[var(--splifft-cream)]/85">
            <li className="rounded-xl border border-white/15 bg-black/30 px-3 py-2">Glass filter tip</li>
            <li className="rounded-xl border border-white/15 bg-black/30 px-3 py-2">Branded Splifft band</li>
            <li className="rounded-xl border border-white/15 bg-black/30 px-3 py-2">Clean white cone</li>
            <li className="rounded-xl border border-white/15 bg-black/30 px-3 py-2">Packed as a premium 5-pack</li>
          </ul>

          <motion.div className="mt-6" style={{ opacity: ctaOpacity }}>
            <SplifftButton onClick={onWaitlistCta} variant="primary">
              Get Monthly Access →
            </SplifftButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
