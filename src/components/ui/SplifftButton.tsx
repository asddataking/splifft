"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--splifft-pink)] text-black shadow-[0_0_0_2px_rgba(255,45,146,0.35)] hover:brightness-110 active:translate-y-px",
  secondary:
    "bg-[var(--splifft-blue)] text-black shadow-[0_0_0_2px_rgba(0,191,255,0.35)] hover:brightness-110 active:translate-y-px",
  ghost:
    "border-2 border-[var(--splifft-pink)] text-[var(--splifft-cream)] hover:bg-[var(--splifft-pink)]/10",
};

type ButtonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
} & (
  | ({ href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">)
  | ({ href?: undefined } & ComponentProps<"button">)
);

export function SplifftButton({
  variant = "primary",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-semibold tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--splifft-blue)] min-h-[48px]";

  if ("href" in rest && rest.href) {
    const { href, ...linkProps } = rest;
    return (
      <Link
        href={href}
        className={`${base} ${variants[variant]} ${className}`}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = rest as ComponentProps<"button">;
  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
