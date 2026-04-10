-- Roll Up checkout contact + Fresh Hit options (run after core schema).
alter table public.roll_up_bookings
  add column if not exists customer_name text,
  add column if not exists service_address text,
  add column if not exists payment_notes text;

alter table public.fresh_hit_bookings
  add column if not exists piece_quantity integer not null default 1,
  add column if not exists addon_ids text[] not null default '{}',
  add column if not exists customer_name text,
  add column if not exists service_address text,
  add column if not exists payment_notes text;
