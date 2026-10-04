-- =====================================================================
--  BL JEWELS — Classement « Les plus vendus » de la page d'accueil
--  À exécuter une fois dans Supabase → SQL Editor (ré-exécutable).
--  Renvoie uniquement le nombre d'articles vendus par produit (aucune donnée client).
-- =====================================================================

create or replace function public.best_sellers(p_limit int default 12)
returns table (product_id uuid, sold bigint)
language sql
stable
security definer
set search_path = public
as $$
  select i.product_id, sum(i.quantity)::bigint as sold
  from public.order_items i
  join public.orders o on o.id = i.order_id
  join public.products p on p.id = i.product_id
  where o.status <> 'cancelled' and p.is_active
  group by i.product_id
  order by sold desc
  limit greatest(1, least(p_limit, 50));
$$;

grant execute on function public.best_sellers(int) to anon, authenticated;
