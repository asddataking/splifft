"use client";

import { SplifftButton } from "@/components/ui/SplifftButton";

export function ComingSoonProductActions() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <SplifftButton
        type="button"
        variant="primary"
        onClick={() =>
          alert(
            "Notify list (demo) — connect email capture when Splifft Monthly launches.",
          )
        }
      >
        Notify Me
      </SplifftButton>
      <SplifftButton href="/club" variant="secondary">
        Join Splifft Club
      </SplifftButton>
      <SplifftButton type="button" variant="ghost" disabled className="cursor-not-allowed opacity-70">
        Coming Soon — not on sale yet
      </SplifftButton>
    </div>
  );
}
