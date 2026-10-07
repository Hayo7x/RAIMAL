create table if not exists public.pivotwatch_inspections (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  task_id text not null check (char_length(task_id) between 1 and 160),
  zone_id text not null check (zone_id ~ '^S[0-9]{2}-R[1-4]$'),
  replay_date date not null,
  finding text not null check (finding in ('Not inspected', 'Water delivery issue observed', 'No equipment issue observed', 'Crop or soil variation suspected', 'Explained by management', 'Inconclusive')),
  measurement text not null default '' check (char_length(measurement) <= 200),
  action text not null default '' check (char_length(action) <= 2000),
  is_synthetic boolean not null default true check (is_synthetic = true),
  recorded_at timestamptz not null default now()
);
create index if not exists pivotwatch_inspections_owner_time on public.pivotwatch_inspections(owner_id, recorded_at desc);
alter table public.pivotwatch_inspections enable row level security;
revoke all on public.pivotwatch_inspections from anon, authenticated;
grant select, insert on public.pivotwatch_inspections to authenticated;
create policy "Read own demo findings" on public.pivotwatch_inspections for select to authenticated using ((select auth.uid()) = owner_id);
create policy "Insert own demo findings" on public.pivotwatch_inspections for insert to authenticated with check ((select auth.uid()) = owner_id and is_synthetic = true);
