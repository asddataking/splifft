import { redirect } from "next/navigation";

export default function CheckoutOneTimePackPage() {
  redirect("/checkout?plan=one_time_pack");
}
