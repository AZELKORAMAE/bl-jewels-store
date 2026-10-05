"use client";

import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/types";

/** Ajout rapide au panier depuis une carte produit (barre au survol sur ordinateur, bouton rond sur mobile). */
export function QuickAdd({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  if (product.stock <= 0) return null;

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
        size: null,
        stock: product.stock,
      },
      1
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const label = `Ajouter ${product.name} au panier`;

  return (
    <>
      {/* Ordinateur : barre qui remonte au survol de la carte */}
      <button
        type="button"
        onClick={onAdd}
        aria-label={label}
        className="absolute inset-x-3 bottom-3 hidden min-h-[44px] translate-y-[calc(100%+12px)] cursor-pointer items-center justify-center gap-2 bg-bordeaux-900/95 text-[11px] font-medium uppercase tracking-[0.2em] text-ivoire opacity-0 backdrop-blur-sm transition-all duration-500 ease-luxe hover:bg-bordeaux-700 focus-visible:translate-y-0 focus-visible:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 md:flex"
      >
        {added ? (
          <>
            <Check className="h-4 w-4" strokeWidth={1.8} /> Ajouté
          </>
        ) : (
          <>
            <ShoppingBag className="h-4 w-4" strokeWidth={1.5} /> Ajouter au panier
          </>
        )}
      </button>

      {/* Mobile : bouton rond toujours visible */}
      <button
        type="button"
        onClick={onAdd}
        aria-label={label}
        className="absolute bottom-2.5 right-2.5 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/95 text-bordeaux-900 shadow-md shadow-bordeaux-950/10 transition-transform active:scale-95 md:hidden"
      >
        {added ? <Check className="h-[18px] w-[18px]" strokeWidth={2} /> : <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.6} />}
      </button>
    </>
  );
}
