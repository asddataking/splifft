-- Roll Up: spliff type (regular vs hash hole) + infusion choice (crumble / rosin).
alter table public.roll_up_bookings
  add column if not exists roll_style text,
  add column if not exists infusion text;
