-- Fresh Hit (glass cleaning) bookings — separate from roll_up_bookings.
create table public.fresh_hit_bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  appointment_slot text,
  cleaning_tier_id text not null,
  cleaning_tier_label text not null,
  customer_notes text,
  customer_email text,
  customer_phone text,
  is_member_preview boolean not null default false,
  service_price_cents integer not null,
  total_cents integer not null,
  status text not null default 'pending',
  user_id uuid references auth.users (id) on delete set null
);

create index fresh_hit_bookings_created_at_idx
  on public.fresh_hit_bookings (created_at desc);

alter table public.fresh_hit_bookings enable row level security;

create policy "fresh_hit_bookings_insert_public"
  on public.fresh_hit_bookings
  for insert
  to anon, authenticated
  with check (true);
