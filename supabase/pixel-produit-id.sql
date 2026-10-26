-- =====================================================================
--  BL JEWELS — Récapitulatif de commande avec l'identifiant produit
--  (Meta Pixel : l'achat « Purchase » utilise le même identifiant que
--  « ViewContent » et « AddToCart »). À exécuter une fois dans Supabase →
--  SQL Editor (ré-exécutable).
-- =====================================================================

create or replace function public.get_order_summary(p_id uuid)
returns json
language sql
stable
security definer
set search_path = public
as $$
  select json_build_object(
    'id', o.id,
    'order_number', o.order_number,
    'customer_name', o.customer_name,
    'email', o.email,
    'address', o.address,
    'city', o.city,
    'subtotal', o.subtotal,
    'shipping', o.shipping,
    'total', o.total,
    'status', o.status,
    'created_at', o.created_at,
    'items', coalesce((
      select json_agg(json_build_object(
        'product_id', i.product_id,
        'product_name', i.product_name, 'product_image', i.product_image,
        'unit_price', i.unit_price, 'quantity', i.quantity, 'line_total', i.line_total, 'size', i.size))
      from public.order_items i where i.order_id = o.id
    ), '[]'::json)
  )
  from public.orders o
  where o.id = p_id;
$$;

grant execute on function public.get_order_summary(uuid) to anon, authenticated;
