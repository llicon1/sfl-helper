create table if not exists public.community_posts (
  id text primary key,
  farm_id text not null unique,
  nickname text not null default '',
  need text not null default 'clean',
  message text not null default '',
  visit_url text not null default '',
  avatar text not null default '',
  banner text not null default 'night',
  banner_image text not null default '',
  island text not null default '',
  faction text not null default '',
  level integer,
  visits integer not null default 0,
  clean_count integer not null default 0,
  cleaned_by text[] not null default '{}',
  likes integer not null default 0,
  liked_by text[] not null default '{}',
  visited_by text[] not null default '{}',
  capacity integer not null default 6,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

alter table public.community_posts enable row level security;

drop policy if exists "community_posts_select_public" on public.community_posts;
drop policy if exists "community_posts_insert_public" on public.community_posts;
drop policy if exists "community_posts_update_public" on public.community_posts;
drop policy if exists "community_posts_delete_public" on public.community_posts;

create policy "community_posts_select_public"
on public.community_posts for select
to anon
using (true);

create policy "community_posts_insert_public"
on public.community_posts for insert
to anon
with check (true);

create policy "community_posts_update_public"
on public.community_posts for update
to anon
using (true)
with check (true);

create policy "community_posts_delete_public"
on public.community_posts for delete
to anon
using (true);

create table if not exists public.farm_profiles (
  farm_id text primary key,
  nickname text not null default '',
  bio text not null default '',
  avatar text not null default '',
  banner text not null default 'night',
  banner_image text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.farm_profiles enable row level security;

drop policy if exists "farm_profiles_select_public" on public.farm_profiles;
drop policy if exists "farm_profiles_insert_public" on public.farm_profiles;
drop policy if exists "farm_profiles_update_public" on public.farm_profiles;

create policy "farm_profiles_select_public"
on public.farm_profiles for select
to anon
using (true);

create policy "farm_profiles_insert_public"
on public.farm_profiles for insert
to anon
with check (true);

create policy "farm_profiles_update_public"
on public.farm_profiles for update
to anon
using (true)
with check (true);

create table if not exists public.app_visits (
  id text primary key,
  visitor_id text not null,
  visit_date date not null default current_date,
  user_agent text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists app_visits_visit_date_idx
on public.app_visits (visit_date);

alter table public.app_visits enable row level security;

drop policy if exists "app_visits_select_public" on public.app_visits;
drop policy if exists "app_visits_insert_public" on public.app_visits;

create policy "app_visits_select_public"
on public.app_visits for select
to anon
using (true);

create policy "app_visits_insert_public"
on public.app_visits for insert
to anon
with check (true);
