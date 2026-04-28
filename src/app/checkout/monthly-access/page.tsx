import { redirect } from "next/navigation";

export default function CheckoutMonthlyAccessPage() {
  redirect("/checkout?plan=monthly_access");
}
