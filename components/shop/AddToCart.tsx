"use client";

import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { QuantityStepper } from "@/components/site/CartDrawer";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/types";

export function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const soldOut = product.stock <= 0;
  const max = Math.min(20, Math.max(product.stock, 1));

  const onAdd = () => {
    add(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        collection: product.collection?.name ?? null,
        image: product.images[0] ?? null,
        price: product.price,
        compareAt: product.compare_at_price && product.compare_at_price > product.price ? product.compare_at_price : null,
        stock: product.stock,
      },
      qty
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div>
      <p className="mb-3 text-[13px]" role="status">
        {soldOut ? (
          <span className="text-bordeaux-600">Cette création est momentanément épuisée.</span>
        ) : product.stock <= 3 ? (
          <span className="text-or-700">Plus que {product.stock} pièce{product.stock > 1 ? "s" : ""} disponible{product.stock > 1 ? "s" : ""}</span>
        ) : (
          <span className="inline-flex items-center gap-2 text-taupe">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" aria-hidden /> En stock, livré en moins de 24 h
          </span>
        )}
      </p>
      <div className="flex gap-3">
        {!soldOut && <QuantityStepper value={qty} max={max} onChange={(v) => setQty(Math.max(1, v))} label={product.name} />}
        <button type="button" onClick={onAdd} disabled={soldOut} className="btn-primary flex-1">
          {added ? (
            <>
              <Check className="h-4 w-4" strokeWidth={1.8} /> Ajouté au panier
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" strokeWidth={1.5} /> {soldOut ? "Épuisé" : "Ajouter au panier"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
