-- ============================================================
-- Atatürk Community Center — Supabase Schema
-- Run this entire script in Supabase SQL Editor (one-shot).
-- It is idempotent — safe to re-run without errors.
-- ============================================================

-- 1. Events table
create table if not exists events (
  id uuid default gen_random_uuid() primary key,
  title jsonb not null default '{"en":"","bg":"","tr":""}',
  category jsonb not null default '{"en":"","bg":"","tr":""}',
  date date not null default current_date,
  summary jsonb not null default '{"en":"","bg":"","tr":""}',
  cover_image text not null default '',
  content_blocks jsonb not null default '[]',
  is_highlighted boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Index for sorting by date
create index if not exists events_date_idx on events (date desc);

-- 3. Auto-update updated_at timestamp
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists events_updated_at on events;
create trigger events_updated_at
  before update on events
  for each row
  execute function update_updated_at();

-- 4. Enable Row Level Security
alter table events enable row level security;

-- 5. RLS policies for events (public read, open write for admin)
drop policy if exists "Events are publicly readable" on events;
create policy "Events are publicly readable"
  on events for select
  using (true);

drop policy if exists "Allow insert for all" on events;
create policy "Allow insert for all"
  on events for insert
  with check (true);

drop policy if exists "Allow update for all" on events;
create policy "Allow update for all"
  on events for update
  using (true);

drop policy if exists "Allow delete for all" on events;
create policy "Allow delete for all"
  on events for delete
  using (true);

-- 6. Storage bucket for event images
insert into storage.buckets (id, name, public)
values ('event-images', 'event-images', true)
on conflict (id) do nothing;

-- 7. Storage policies (public read + anon upload)
drop policy if exists "Public read access for event images" on storage.objects;
create policy "Public read access for event images"
  on storage.objects for select
  using (bucket_id = 'event-images');

drop policy if exists "Allow uploads to event images" on storage.objects;
create policy "Allow uploads to event images"
  on storage.objects for insert
  with check (bucket_id = 'event-images');

drop policy if exists "Allow delete event images" on storage.objects;
create policy "Allow delete event images"
  on storage.objects for delete
  using (bucket_id = 'event-images');
