import { redirect } from "next/navigation";

export default function ClubPage() {
  redirect("/checkout?plan=monthly_access");
}
