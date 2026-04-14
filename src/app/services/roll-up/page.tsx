import { redirect } from "next/navigation";

/** Legacy URL. Old manual service was removed. */
export default function RollUpServicePage() {
  redirect("/services/events");
}
