-- Seed data aligned with the Monthly Access model.

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
VALUES
  (
    'Cabin Drop',
    'cabin-drop',
    'Limited themed drop for cabin weekends.',
    'limited_drop',
    'monthly_access_first',
    now(),
    now() + interval '7 days',
    true
  ),
  (
    'Lake Day Drop',
    'lake-day-drop',
    'Limited themed drop for lake sessions.',
    'seasonal_box',
    'monthly_access_first',
    now(),
    now() + interval '7 days',
    true
  ),
  (
    'Mystery Drop',
    'mystery-drop',
    'Rotating mystery drop for curated sessions.',
    'limited_drop',
    'public',
    now(),
    now(),
    true
  )
ON CONFLICT (slug) DO UPDATE
SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  drop_type = EXCLUDED.drop_type,
  access_level = EXCLUDED.access_level,
  release_date = EXCLUDED.release_date,
  public_release_date = EXCLUDED.public_release_date,
  is_active = EXCLUDED.is_active,
  updated_at = now();
