import { redirect } from "next/navigation";

/** Legacy URL — canonical events live under /services/events for SEO. */
export default function EventsRedirectPage() {
  redirect("/services/events");
}
