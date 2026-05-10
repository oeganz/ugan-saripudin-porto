-- Create articles table for dynamic blog system
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  cover_image text,
  author text not null,
  published_at timestamptz,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  meta_title text,
  meta_description text,
  og_image text,
  tags text[] not null default '{}',
  reading_time integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists articles_status_idx on public.articles (status);
create index if not exists articles_published_at_idx on public.articles (published_at desc);
create index if not exists articles_slug_idx on public.articles (slug);
create index if not exists articles_tags_idx on public.articles using gin (tags);

alter table public.articles enable row level security;

create policy "Published articles are publicly readable"
  on public.articles
  for select
  using (status = 'published');

create policy "Authenticated users can manage articles"
  on public.articles
  for all
  to authenticated
  using (true)
  with check (true);

create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists update_articles_updated_at on public.articles;
create trigger update_articles_updated_at
  before update on public.articles
  for each row
  execute function public.update_updated_at_column();
