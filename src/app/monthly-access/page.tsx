import { redirect } from "next/navigation";

export default function MonthlyAccessPage() {
  redirect("/checkout?plan=monthly_access");
}
