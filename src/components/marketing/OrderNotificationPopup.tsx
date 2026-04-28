"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const sampleNotifications = [
  "Someone from Detroit just got Monthly Access.",
  "Someone from Troy just grabbed a Sativa 5-Pack.",
  "Someone from Sterling Heights just unlocked The Vault.",
  "Someone from Clinton Township just joined the waitlist.",
  "Someone from Port Huron just added a Themed Box.",
] as const;

export function OrderNotificationPopup() {
  const [visible, setVisible] = useState(false);
  const [idx, setIdx] = useState(0);
  const [notifications, setNotifications] =
    useState<readonly string[]>(sampleNotifications);

  const message = useMemo(
    () => notifications[idx] ?? notifications[0] ?? sampleNotifications[0],
    [idx, notifications],
  );

  useEffect(() => {
    let ignore = false;
    async function loadRealActivity() {
      try {
        const res = await fetch("/api/activity-feed");
        const data = (await res.json()) as { items?: { message: string }[] };
        const realMessages = (data.items ?? [])
          .map((i) => i.message)
          .filter(Boolean);
        if (!ignore && realMessages.length) {
          setNotifications([...realMessages, ...sampleNotifications]);
        }
      } catch {
        /* keep samples only */
      }
    }
    void loadRealActivity();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    const showInitial = window.setTimeout(() => setVisible(true), 5000);
    const rotate = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIdx((prev) => (prev + 1) % Math.max(notifications.length, 1));
        setVisible(true);
      }, 450);
    }, 9000);

    return () => {
      window.clearTimeout(showInitial);
      window.clearInterval(rotate);
    };
  }, [notifications.length]);

  return (
    <div
      className={`fixed bottom-24 left-3 z-[120] w-[min(92vw,320px)] rounded-xl border border-white/15 bg-black/85 p-3 text-[13px] text-[var(--splifft-cream)] shadow-[0_8px_30px_rgba(0,0,0,0.45)] transition-all duration-300 md:bottom-5 md:left-5 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
      aria-live="polite"
      aria-atomic="true"
    >
      <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--splifft-pink)]">
        Live activity
      </p>
      <p className="mt-1 leading-relaxed text-[var(--splifft-cream)]/95">{message}</p>
      <Link
        href="/monthly-access"
        className="mt-2 inline-block text-xs font-semibold text-[var(--splifft-blue)] underline-offset-4 hover:underline"
      >
        Get Monthly Access
      </Link>
    </div>
  );
}
