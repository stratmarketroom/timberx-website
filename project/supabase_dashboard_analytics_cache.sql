-- TimberX dashboard analytics cache
-- Run in Supabase SQL Editor after the lead-system schema.

create table if not exists dashboard_analytics_cache (
  cache_key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists idx_dashboard_analytics_cache_updated_at
  on dashboard_analytics_cache(updated_at desc);

drop trigger if exists set_dashboard_analytics_cache_updated_at on dashboard_analytics_cache;
create trigger set_dashboard_analytics_cache_updated_at
before update on dashboard_analytics_cache
for each row execute function set_updated_at();

alter table dashboard_analytics_cache enable row level security;

grant select, insert, update, delete on table dashboard_analytics_cache to service_role;
