"use client";

import { useEffect, useRef } from "react";

type Props = { children: React.ReactNode };

/**
 * Subtle scroll parallax on hero decorative layers — md+ only, disabled for
 * prefers-reduced-motion and narrow viewports.
 */
export function HeroParallax({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;

    function shouldRun(): boolean {
      if (typeof window === "undefined") return false;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return false;
      }
      if (!window.matchMedia("(min-width: 768px)").matches) {
        return false;
      }
      return true;
    }

    function update() {
      if (!el) return;
      if (!shouldRun()) {
        el.style.transform = "";
        return;
      }
      const y = window.scrollY * -0.12;
      el.style.transform = `translate3d(0, ${Math.max(-80, Math.min(80, y))}px, 0)`;
    }

    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (el) el.style.transform = "";
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 will-change-transform motion-reduce:transform-none"
    >
      {children}
    </div>
  );
}
