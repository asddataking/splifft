-- Align public.products with app: Dank Drop naming, copy, and Drop of the Month SKU
-- Applied via Supabase MCP; keep in repo for local/CI parity.

UPDATE public.products
SET
  name = 'Cabin Drop',
  description = 'Curated sesh box for a cozy night in — trip-ready, giftable, or add to your monthly.',
  badge = 'Curated drop',
  highlights = '["Curated rolls","Session kit","Snack pairing card"]'::jsonb,
  sort_order = 1,
  updated_at = now()
WHERE id = 'pack-cabin';

UPDATE public.products
SET
  name = 'DankNDevour Drop',
  description = 'Real food meets real smoke — a graze-friendly sesh upgrade, great standalone or with your monthly.',
  badge = 'Fan favorite',
  highlights = '["Shareable setup","Graze-friendly","Party-ready vibes"]'::jsonb,
  sort_order = 2,
  updated_at = now()
WHERE id = 'pack-dankndevour';

UPDATE public.products
SET
  name = 'Lake Day Drop',
  description = 'Sun and water. A tidy one-off box for when you park and smoke — made to travel.',
  badge = NULL,
  highlights = '["Travel-tight","Labeled jars","Cooler-friendly layout"]'::jsonb,
  sort_order = 3,
  updated_at = now()
WHERE id = 'pack-lake';

UPDATE public.products
SET
  name = 'Mystery Box',
  description = 'A new Splifft curated drop each time — small surprise, same quality. Perfect for gifts.',
  badge = 'Limited',
  highlights = '["Rotating picks","Members shop first","Collectible card"]'::jsonb,
  sort_order = 4,
  updated_at = now()
WHERE id = 'pack-mystery';

INSERT INTO public.products (
  id,
  slug,
  name,
  description,
  price_cents,
  member_price_cents,
  badge,
  highlights,
  active,
  sort_order
)
VALUES (
  'drop-of-the-month',
  'drop-of-the-month',
  'Drop of the Month',
  'April Afterglow — a curated sesh box built for this month''s vibe. Rotating theme, limited feel, member pricing when you''re in Splifft Club.',
  8900,
  7200,
  'Limited drop',
  '["Rotating monthly theme","Themed extras & sesh upgrades","Snacks, gear, and session-ready picks","Member discount built in"]'::jsonb,
  true,
  0
)
ON CONFLICT (id) DO UPDATE SET
  slug = EXCLUDED.slug,
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price_cents = EXCLUDED.price_cents,
  member_price_cents = EXCLUDED.member_price_cents,
  badge = EXCLUDED.badge,
  highlights = EXCLUDED.highlights,
  active = EXCLUDED.active,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();
