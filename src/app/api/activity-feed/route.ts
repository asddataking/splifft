import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const revalidate = 60;

const METRO_CITIES = [
  "Detroit",
  "Dearborn",
  "Southfield",
  "Royal Oak",
  "Troy",
  "Warren",
  "Sterling Heights",
  "Clinton Township",
  "Shelby Township",
  "St. Clair Shores",
  "Port Huron",
] as const;

type EmailCaptureRow = {
  source: string;
  created_at: string;
};

function cityFromTimestamp(createdAt: string): string {
  const ms = Date.parse(createdAt);
  const idx = Number.isNaN(ms) ? 0 : Math.abs(ms) % METRO_CITIES.length;
  return METRO_CITIES[idx] ?? "Detroit";
}

function sourceLabel(source: string): string {
  if (source === "monthly_access_waitlist") return "got Monthly Access";
  if (source === "scroll_waitlist") return "joined the waitlist";
  if (source === "subscription_modal") return "joined the waitlist";
  if (source === "subscription_pdp_teaser") return "joined the waitlist";
  return "joined the waitlist";
}

export async function GET() {
  const admin = createSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json({ items: [] });
  }

  const { data } = await admin
    .from("email_captures")
    .select("source, created_at")
    .order("created_at", { ascending: false })
    .limit(8);

  const rows = (data ?? []) as EmailCaptureRow[];
  const items = rows.map((row) => ({
    message: `Someone from ${cityFromTimestamp(row.created_at)} just ${sourceLabel(row.source)}.`,
  }));

  return NextResponse.json(
    { items },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" } },
  );
}
