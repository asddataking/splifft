import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

/**
 * Server-only client with elevated access (Postgres `service_role`, bypasses RLS).
 * Prefer Supabase’s **secret key** (`sb_secret_...`) — see
 * https://supabase.com/docs/guides/api/api-keys — over the legacy JWT `service_role` key;
 * both work with `createClient` during the transition.
 * Do not import from client components.
 */
export function createSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey =
    process.env.NEXT_SUPABASE_SECRETKEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    return null;
  }
  return createClient<Database>(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
