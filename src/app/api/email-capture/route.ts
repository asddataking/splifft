import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  EMAIL_CAPTURE_SOURCES,
  isValidEmail,
  type EmailCaptureSource,
} from "@/lib/email-capture";
import type { Json } from "@/types/database.types";

function isSource(s: string): s is EmailCaptureSource {
  return (EMAIL_CAPTURE_SOURCES as readonly string[]).includes(s);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;
  const email =
    typeof raw.email === "string" ? raw.email.trim().toLowerCase() : "";
  const source =
    typeof raw.source === "string" ? raw.source.trim() : "";
  const preference =
    typeof raw.preference === "string" ? raw.preference.trim() : null;
  const metadata: Json =
    raw.metadata && typeof raw.metadata === "object" && !Array.isArray(raw.metadata)
      ? (JSON.parse(JSON.stringify(raw.metadata)) as Json)
      : {};

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email" }, { status: 400 });
  }
  if (!source || !isSource(source)) {
    return NextResponse.json({ error: "Invalid source" }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json(
      {
        error:
          "Email capture is not configured. Add SUPABASE_SERVICE_ROLE_KEY on the server.",
      },
      { status: 503 },
    );
  }

  const { error } = await admin.from("email_captures").insert({
    email,
    source,
    preference: preference || null,
    metadata,
  });

  if (error) {
    console.error("[email-capture]", error.message);
    return NextResponse.json(
      { error: "Could not save. Try again later." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
