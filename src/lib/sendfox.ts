import type { EmailCaptureSource } from "@/lib/email-capture";

/**
 * SendFox sync for waitlist / interest signups stored in Supabase `email_captures`.
 *
 * Configure in SendFox (dashboard):
 * 1. Create contact lists (e.g. "Splifft waitlist", "Splifft Club waitlist").
 * 2. For each list, add an automation: trigger when a contact is added to that list → send email(s).
 * 3. Copy each list’s numeric ID from the URL or API (`GET https://api.sendfox.com/lists`).
 *
 * Env:
 * - `NEXT_SENDFOX_KEY` — Personal access token (Bearer).
 * - `NEXT_SENDFOX_WAITLIST_LIST_ID` — List ID for general waitlist (scroll + subscription sources).
 * - `NEXT_SENDFOX_CLUB_LIST_ID` — Optional. If set, `club_waitlist` signups are added here and also to the waitlist list when both IDs are set.
 *
 * If the key or waitlist list ID is missing, sync is skipped (signup still succeeds in Supabase).
 */

const SENDFOX_API = "https://api.sendfox.com";

function parseListId(raw: string | undefined): number | null {
  if (raw == null || raw.trim() === "") return null;
  const n = Number.parseInt(raw.trim(), 10);
  return Number.isFinite(n) ? n : null;
}

function listIdsForSource(
  source: EmailCaptureSource,
  waitlistId: number,
  clubId: number | null,
): number[] {
  if (source === "club_waitlist" && clubId != null) {
    return clubId === waitlistId ? [clubId] : [clubId, waitlistId];
  }
  return [waitlistId];
}

async function sendfoxJson<T>(
  path: string,
  init: RequestInit & { token: string },
): Promise<{ ok: true; data: T; status: number } | { ok: false; status: number; body: unknown }> {
  const { token, ...rest } = init;
  const res = await fetch(`${SENDFOX_API}${path}`, {
    ...rest,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      ...rest.headers,
    },
  });
  const body = (await res.json().catch(() => ({}))) as T;
  if (res.ok) return { ok: true, data: body, status: res.status };
  return { ok: false, status: res.status, body };
}

type ContactRow = {
  id: number;
  email: string;
};

type ContactsListResponse = {
  data?: ContactRow[];
};

/** Add existing contact to a list (idempotent per SendFox docs). */
async function addContactToList(
  token: string,
  listId: number,
  contactId: number,
): Promise<boolean> {
  const r = await sendfoxJson<unknown>(`/lists/${listId}/contacts`, {
    token,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contact_id: contactId }),
  });
  return r.ok;
}

async function getContactIdByEmail(
  token: string,
  email: string,
): Promise<number | null> {
  const q = new URLSearchParams({ email });
  const r = await sendfoxJson<ContactsListResponse>(`/contacts?${q.toString()}`, {
    token,
    method: "GET",
  });
  if (!r.ok) return null;
  const first = r.data.data?.[0];
  return first?.id ?? null;
}

/**
 * Subscribes the email to the appropriate SendFox list(s) so your list-triggered automations run.
 * Does not throw; returns result for logging.
 */
export type SendfoxSyncResult =
  | { status: "skipped" }
  | { status: "synced" }
  | { status: "error"; error: string };

export async function syncEmailCaptureToSendfox(input: {
  email: string;
  source: EmailCaptureSource;
}): Promise<SendfoxSyncResult> {
  const token = process.env.NEXT_SENDFOX_KEY;
  const waitlistId = parseListId(process.env.NEXT_SENDFOX_WAITLIST_LIST_ID);
  const clubId = parseListId(process.env.NEXT_SENDFOX_CLUB_LIST_ID);

  if (!token?.trim() || waitlistId == null) {
    return { status: "skipped" };
  }

  const lists = listIdsForSource(input.source, waitlistId, clubId);
  const uniqueLists = [...new Set(lists)];

  const create = await sendfoxJson<ContactRow>(`/contacts`, {
    token,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: input.email,
      lists: uniqueLists,
    }),
  });

  if (create.ok) {
    return { status: "synced" };
  }

  const contactId = await getContactIdByEmail(token, input.email);
  if (contactId == null) {
    return {
      status: "error",
      error: `SendFox POST /contacts failed (${create.status})`,
    };
  }

  let added = 0;
  for (const listId of uniqueLists) {
    if (await addContactToList(token, listId, contactId)) added += 1;
  }

  if (added === 0) {
    return {
      status: "error",
      error: `SendFox could not add existing contact ${contactId} to lists`,
    };
  }

  return { status: "synced" };
}
