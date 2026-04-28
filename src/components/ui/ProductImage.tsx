"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type ProductImageProps = {
  src: string;
  alt: string;
  fallbackLabel: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function ProductImage({
  src,
  alt,
  fallbackLabel,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  const logoFallbackText = useMemo(() => "SPLIFFT", []);

  if (failed) {
    return (
      <div
        className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl border border-white/15 bg-[linear-gradient(145deg,#12121a,#0a0a11)] ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(0,191,255,0.24),transparent_42%),radial-gradient(circle_at_80%_70%,rgba(255,45,146,0.22),transparent_45%)]" />
        <div className="relative flex max-w-[85%] flex-col items-center text-center">
          <span className="rounded-full border border-cyan-300/40 bg-black/40 px-3 py-1 text-[10px] font-bold tracking-[0.24em] text-cyan-300">
            {logoFallbackText}
          </span>
          <p className="mt-3 text-sm font-semibold text-[var(--splifft-cream)]">
            Product image coming soon
          </p>
          <p className="mt-1 text-xs text-[var(--splifft-muted)]">{fallbackLabel}</p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={`object-contain ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
