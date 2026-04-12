-- Interest / notify-me signups (written from server API using service role)
-- Idempotent fragments for local `supabase db` parity with hosted project.

CREATE TABLE IF NOT EXISTS public.email_captures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  source text NOT NULL,
  preference text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT email_captures_email_len CHECK (char_length(trim(email)) BETWEEN 3 AND 320)
);

COMMENT ON TABLE public.email_captures IS 'Notify-me and marketing interest emails from splifft.com';

CREATE INDEX IF NOT EXISTS email_captures_created_at_idx ON public.email_captures (created_at DESC);
CREATE INDEX IF NOT EXISTS email_captures_source_idx ON public.email_captures (source);

ALTER TABLE public.email_captures ENABLE ROW LEVEL SECURITY;
