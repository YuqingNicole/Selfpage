-- 学园云同步：每个登录用户一行，四个 jsonb 快照（进度 / 错题本 / 徽章 / 每日任务）
create table if not exists public.learn_cloud (
  user_id uuid primary key references auth.users (id) on delete cascade,
  updated_at timestamptz not null default now(),
  progress jsonb not null default '{}'::jsonb,
  srs jsonb not null default '{}'::jsonb,
  badges jsonb not null default '{}'::jsonb,
  daily jsonb not null default '{}'::jsonb
);

alter table public.learn_cloud enable row level security;

-- 只允许本人读写自己的行
drop policy if exists "own row select" on public.learn_cloud;
create policy "own row select"
  on public.learn_cloud for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "own row insert" on public.learn_cloud;
create policy "own row insert"
  on public.learn_cloud for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "own row update" on public.learn_cloud;
create policy "own row update"
  on public.learn_cloud for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
