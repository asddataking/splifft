-- Monthly Access pricing model migration
-- Safe, idempotent, and non-destructive.

-- 1) Add compatibility columns on products (if table exists)
ALTER TABLE IF EXISTS public.products
  ADD COLUMN IF NOT EXISTS deprecated_at timestamptz,
  ADD COLUMN IF NOT EXISTS is_primary boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS billing_interval text,
  ADD COLUMN IF NOT EXISTS type text NOT NULL DEFAULT 'catalog_item';

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'products'
      AND column_name = 'active'
  ) THEN
    EXECUTE 'ALTER TABLE public.products RENAME COLUMN active TO is_active';
  END IF;
EXCEPTION WHEN duplicate_column THEN
  -- Already renamed in another environment.
  NULL;
END $$;

-- 2) Canonical plans table
CREATE TABLE IF NOT EXISTS public.plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  price_cents integer NOT NULL CHECK (price_cents >= 0),
  billing_interval text,
  type text NOT NULL CHECK (type IN ('subscription', 'one_time')),
  description text NOT NULL,
  is_primary boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  deprecated_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT plans_billing_interval_chk CHECK (
    (type = 'subscription' AND billing_interval = 'month')
    OR
    (type = 'one_time' AND billing_interval IS NULL)
  )
);

CREATE INDEX IF NOT EXISTS plans_is_active_idx ON public.plans (is_active);
CREATE INDEX IF NOT EXISTS plans_is_primary_idx ON public.plans (is_primary);

-- 3) Subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  plan_slug text NOT NULL REFERENCES public.plans (slug),
  status text NOT NULL CHECK (status IN ('active', 'trialing', 'past_due', 'canceled', 'paused', 'skipped')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean NOT NULL DEFAULT false,
  skipped_until timestamptz,
  stripe_subscription_id text UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS subscriptions_user_id_idx ON public.subscriptions (user_id);
CREATE INDEX IF NOT EXISTS subscriptions_plan_slug_idx ON public.subscriptions (plan_slug);
CREATE INDEX IF NOT EXISTS subscriptions_status_idx ON public.subscriptions (status);

-- 4) Access perks table
CREATE TABLE IF NOT EXISTS public.access_perks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_slug text NOT NULL REFERENCES public.plans (slug) ON DELETE CASCADE,
  perk text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (plan_slug, perk)
);

CREATE INDEX IF NOT EXISTS access_perks_plan_slug_idx ON public.access_perks (plan_slug);

-- 5) Drops table and normalized access naming
CREATE TABLE IF NOT EXISTS public.drops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL DEFAULT '',
  drop_type text NOT NULL CHECK (
    drop_type IN (
      'limited_drop',
      'flower_collab',
      'rosin_collab',
      'signature_splifft',
      'event_pack',
      'seasonal_box'
    )
  ),
  access_level text NOT NULL CHECK (
    access_level IN ('public', 'monthly_access_first', 'monthly_access_only')
  ) DEFAULT 'public',
  release_date timestamptz,
  public_release_date timestamptz,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS drops_is_active_idx ON public.drops (is_active);
CREATE INDEX IF NOT EXISTS drops_access_level_idx ON public.drops (access_level);

-- 6) Orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users (id) ON DELETE SET NULL,
  order_type text NOT NULL CHECK (order_type IN ('monthly_access', 'one_time_pack', 'drop', 'event_request')),
  plan_slug text REFERENCES public.plans (slug),
  total_cents integer NOT NULL CHECK (total_cents >= 0),
  status text NOT NULL DEFAULT 'pending',
  stripe_checkout_session_id text UNIQUE,
  stripe_payment_intent_id text UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS orders_user_id_idx ON public.orders (user_id);
CREATE INDEX IF NOT EXISTS orders_order_type_idx ON public.orders (order_type);
CREATE INDEX IF NOT EXISTS orders_plan_slug_idx ON public.orders (plan_slug);

-- 7) Upsert canonical plans
INSERT INTO public.plans (
  slug,
  name,
  price_cents,
  billing_interval,
  type,
  description,
  is_primary,
  is_active
)
VALUES
  (
    'monthly_access',
    'Monthly Access',
    6000,
    'month',
    'subscription',
    'Your 5-pack, ready before the session starts.',
    true,
    true
  ),
  (
    'one_time_pack',
    'One-Time Pack',
    7500,
    NULL,
    'one_time',
    'For trying it once or gifting.',
    false,
    true
  )
ON CONFLICT (slug) DO UPDATE
SET
  name = EXCLUDED.name,
  price_cents = EXCLUDED.price_cents,
  billing_interval = EXCLUDED.billing_interval,
  type = EXCLUDED.type,
  description = EXCLUDED.description,
  is_primary = EXCLUDED.is_primary,
  is_active = EXCLUDED.is_active,
  deprecated_at = NULL,
  updated_at = now();

-- 8) Deprecate old plan slugs (soft only)
UPDATE public.plans
SET
  is_active = false,
  deprecated_at = COALESCE(deprecated_at, now()),
  updated_at = now()
WHERE lower(slug) IN (
  'splifft_club',
  'membership',
  'club_access',
  'vip',
  'monthly_club',
  'club_pricing'
);

-- 9) Migrate active legacy subscriptions to monthly_access (when safe)
UPDATE public.subscriptions
SET
  plan_slug = 'monthly_access',
  updated_at = now()
WHERE lower(plan_slug) IN (
  'splifft_club',
  'membership',
  'club_access',
  'vip',
  'monthly_club',
  'club_pricing'
)
AND status IN ('active', 'trialing', 'past_due', 'paused', 'skipped');

-- 10) Normalize drop access values and seed from products
UPDATE public.drops
SET
  access_level = CASE
    WHEN access_level IN ('club_only', 'member_only', 'vip_only') THEN 'monthly_access_only'
    WHEN access_level IN ('club_first', 'member_first', 'vip_first') THEN 'monthly_access_first'
    ELSE access_level
  END,
  updated_at = now()
WHERE access_level IN ('club_only', 'member_only', 'vip_only', 'club_first', 'member_first', 'vip_first');

INSERT INTO public.drops (
  title,
  slug,
  description,
  drop_type,
  access_level,
  release_date,
  public_release_date,
  is_active
)
SELECT
  p.name,
  p.slug,
  p.description,
  'limited_drop',
  'monthly_access_first',
  now(),
  now(),
  true
FROM public.products p
WHERE p.id IN ('pack-cabin', 'pack-lake', 'pack-mystery', 'pack-dankndevour', 'drop-of-the-month')
ON CONFLICT (slug) DO UPDATE
SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  drop_type = EXCLUDED.drop_type,
  access_level = EXCLUDED.access_level,
  is_active = EXCLUDED.is_active,
  updated_at = now();

-- 11) Keep products aligned for frontend compatibility (soft migration)
UPDATE public.products
SET
  name = 'Monthly Access',
  slug = 'monthly_access',
  price_cents = 7500,
  member_price_cents = 6000,
  billing_interval = 'month',
  type = 'subscription',
  is_primary = true,
  is_active = true,
  deprecated_at = NULL,
  description = 'Your 5-pack, ready before the session starts.',
  updated_at = now()
WHERE id = 'splifft-monthly';

INSERT INTO public.products (
  id,
  slug,
  name,
  description,
  price_cents,
  member_price_cents,
  badge,
  highlights,
  is_active,
  sort_order,
  is_primary,
  billing_interval,
  type
)
VALUES (
  'one-time-pack',
  'one_time_pack',
  'One-Time Pack',
  'For trying it once or gifting.',
  7500,
  6000,
  'Secondary',
  '["5 premium Spliffts","Glass filter tips","Branded Splifft bands","Single purchase","No early access","No monthly perks"]'::jsonb,
  true,
  2,
  false,
  NULL,
  'one_time'
)
ON CONFLICT (id) DO UPDATE
SET
  slug = EXCLUDED.slug,
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price_cents = EXCLUDED.price_cents,
  member_price_cents = EXCLUDED.member_price_cents,
  badge = EXCLUDED.badge,
  highlights = EXCLUDED.highlights,
  is_active = EXCLUDED.is_active,
  sort_order = EXCLUDED.sort_order,
  is_primary = EXCLUDED.is_primary,
  billing_interval = EXCLUDED.billing_interval,
  type = EXCLUDED.type,
  deprecated_at = NULL,
  updated_at = now();

UPDATE public.products
SET
  is_active = false,
  deprecated_at = COALESCE(deprecated_at, now()),
  updated_at = now()
WHERE lower(slug) IN (
  'splifft_club',
  'membership',
  'club_access',
  'vip',
  'monthly_club',
  'club_pricing'
);

-- 12) Seed access perks
DELETE FROM public.access_perks WHERE plan_slug IN ('monthly_access', 'one_time_pack');

INSERT INTO public.access_perks (plan_slug, perk, sort_order, is_active) VALUES
  ('monthly_access', '5 premium Spliffts', 1, true),
  ('monthly_access', 'Glass filter tips', 2, true),
  ('monthly_access', 'Branded Splifft bands', 3, true),
  ('monthly_access', 'Monthly delivery', 4, true),
  ('monthly_access', 'First access to limited drops', 5, true),
  ('monthly_access', 'First access to future flower collabs', 6, true),
  ('monthly_access', 'First access to future rosin collabs', 7, true),
  ('monthly_access', 'Future Signature Splifft releases', 8, true),
  ('monthly_access', 'Skip anytime', 9, true),
  ('monthly_access', 'Cancel anytime', 10, true),
  ('one_time_pack', '5 premium Spliffts', 1, true),
  ('one_time_pack', 'Glass filter tips', 2, true),
  ('one_time_pack', 'Branded Splifft bands', 3, true),
  ('one_time_pack', 'Single purchase', 4, true),
  ('one_time_pack', 'No early access', 5, true),
  ('one_time_pack', 'No monthly perks', 6, true);

-- 13) RLS and policies
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_perks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS plans_read_active ON public.plans;
CREATE POLICY plans_read_active
  ON public.plans
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS access_perks_read_active ON public.access_perks;
CREATE POLICY access_perks_read_active
  ON public.access_perks
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS subscriptions_select_own ON public.subscriptions;
CREATE POLICY subscriptions_select_own
  ON public.subscriptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS subscriptions_insert_own ON public.subscriptions;
CREATE POLICY subscriptions_insert_own
  ON public.subscriptions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS subscriptions_update_own ON public.subscriptions;
CREATE POLICY subscriptions_update_own
  ON public.subscriptions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS orders_select_own ON public.orders;
CREATE POLICY orders_select_own
  ON public.orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS orders_insert_own ON public.orders;
CREATE POLICY orders_insert_own
  ON public.orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS orders_update_own ON public.orders;
CREATE POLICY orders_update_own
  ON public.orders
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS drops_read_public ON public.drops;
CREATE POLICY drops_read_public
  ON public.drops
  FOR SELECT
  TO anon, authenticated
  USING (
    is_active = true
    AND (
      access_level = 'public'
      OR (public_release_date IS NOT NULL AND public_release_date <= now())
    )
  );

DROP POLICY IF EXISTS drops_read_monthly_access_authenticated ON public.drops;
CREATE POLICY drops_read_monthly_access_authenticated
  ON public.drops
  FOR SELECT
  TO authenticated
  USING (
    is_active = true
    AND access_level IN ('monthly_access_first', 'monthly_access_only')
    AND EXISTS (
      SELECT 1
      FROM public.subscriptions s
      WHERE s.user_id = auth.uid()
        AND s.plan_slug = 'monthly_access'
        AND s.status IN ('active', 'trialing', 'past_due', 'paused', 'skipped')
    )
  );
