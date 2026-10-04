-- =====================================================================
--  BL JEWELS — Catégories gérées depuis l'admin
--  À exécuter une fois dans Supabase → SQL Editor (ré-exécutable).
-- =====================================================================

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.categories enable row level security;

drop policy if exists "categories_read" on public.categories;
create policy "categories_read" on public.categories for select using (true);
drop policy if exists "categories_admin" on public.categories;
create policy "categories_admin" on public.categories
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Catégories de départ (celles affichées jusqu'ici sur le site)
insert into public.categories (name, slug, image_url, sort_order) values
  ('Colliers', 'colliers', 'https://images.unsplash.com/photo-1611652022419-a9419f74343d', 1),
  ('Boucles d''oreilles', 'boucles-oreilles', 'https://images.unsplash.com/photo-1652766540048-de0a878a3266', 2),
  ('Bracelets', 'bracelets', 'https://images.unsplash.com/photo-1619893454156-26a705ac9eb5', 3),
  ('Bagues', 'bagues', 'https://images.unsplash.com/photo-1588814096146-e7c56156f9f8', 4)
on conflict (slug) do nothing;

-- Toute catégorie déjà utilisée par un produit doit exister
insert into public.categories (name, slug, sort_order)
select distinct p.category, p.category, 99 from public.products p
where not exists (select 1 from public.categories c where c.slug = p.category)
on conflict (slug) do nothing;

-- Lien produit → catégorie : renommer le lien d'une catégorie met à jour ses produits,
-- et une catégorie qui contient encore des produits ne peut pas être supprimée.
alter table public.products drop constraint if exists products_category_fkey;
alter table public.products
  add constraint products_category_fkey
  foreign key (category) references public.categories (slug)
  on update cascade on delete restrict;
