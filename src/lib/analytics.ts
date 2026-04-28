/**
 * Google Analytics 4 (gtag) — events mirror the site funnel. Register custom
 * definitions in GA4 Admin → Data display → Events as needed.
 */

export const GA_EVENTS = {
  SUBSCRIPTION_MODAL_OPEN: "subscription_modal_open",
  WAITLIST_SCROLL_OPEN: "waitlist_scroll_open",
  WAITLIST_SCROLL_DISMISS: "waitlist_scroll_dismiss",
  NOTIFY_ME_SUBMIT: "notify_me_submit",
  MONTHLY_ACCESS_WAITLIST_SUBMIT: "monthly_access_waitlist_submit",
  ADD_TO_CART: "add_to_cart",
  BEGIN_CHECKOUT: "begin_checkout",
} as const;

type GtagFn = (
  command: "event" | "config" | "js" | "set",
  ...args: unknown[]
) => void;

function getGtag(): GtagFn | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as unknown as { gtag?: GtagFn };
  return typeof w.gtag === "function" ? w.gtag : undefined;
}

/** Fire a GA4 event (no-op until gtag loads). */
export function trackGaEvent(
  name: string,
  params?: Record<string, unknown>,
): void {
  const gtag = getGtag();
  if (!gtag) return;
  gtag("event", name, params ?? {});
}
