-- Create public storage bucket for article images
insert into storage.buckets (id, name, public)
values ('article-images', 'article-images', true)
on conflict (id) do update set public = true;

create policy "Article images are publicly readable"
  on storage.objects
  for select
  using (bucket_id = 'article-images');

create policy "Authenticated users can upload article images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'article-images');

create policy "Authenticated users can update article images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'article-images')
  with check (bucket_id = 'article-images');

create policy "Authenticated users can delete article images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'article-images');
