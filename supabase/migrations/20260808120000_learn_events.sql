-- 学园埋点事件表：匿名设备号 + 事件流（只写不读）
create table if not exists public.learn_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  device_id text not null,
  event text not null,
  props jsonb not null default '{}'::jsonb
);

create index if not exists learn_events_event_idx on public.learn_events (event, created_at desc);
create index if not exists learn_events_device_idx on public.learn_events (device_id, created_at desc);

alter table public.learn_events enable row level security;

-- 匿名客户端只允许写入，不允许读取（分析在后台/SQL 编辑器做）
drop policy if exists "anon insert learn events" on public.learn_events;
create policy "anon insert learn events"
  on public.learn_events for insert
  to anon
  with check (true);
