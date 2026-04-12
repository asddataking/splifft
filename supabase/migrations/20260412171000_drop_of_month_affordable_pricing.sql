-- Drop of the Month: member $19.99, non-member $24.99
UPDATE public.products
SET
  price_cents = 2499,
  member_price_cents = 1999,
  updated_at = now()
WHERE id = 'drop-of-the-month';
