"use client";

import { Check, ShoppingBag, Zap } from "lucide-react";
import { useState } from "react";
import { QuantityStepper } from "@/components/site/CartDrawer";
import { OrderModal } from "@/components/shop/OrderModal";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/types";

const SIZES = ["5", "6", "7", "8", "9", "10"];

export function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
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
        size: product.requires_size ? size : null,
        sizable: Boolean(product.requires_size),
        stock: product.stock,
      },
      qty
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div>
      {product.requires_size && !soldOut && (
        <fieldset className="mb-6">
          <legend className="mb-3 flex w-full items-center justify-between text-[12px] font-medium uppercase tracking-[0.15em] text-encre">
            <span>
              Taille <span className="normal-case tracking-normal text-taupe">(facultatif)</span>
            </span>
            {size && <span className="normal-case tracking-normal text-or-700">Taille {size} sélectionnée</span>}
          </legend>
          <div role="radiogroup" aria-label="Choisir une taille" className="grid grid-cols-6 gap-2 focus:outline-none">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={size === s}
                onClick={() => setSize((cur) => (cur === s ? null : s))}
                className={cn(
                  "flex h-12 cursor-pointer items-center justify-center border text-[15px] tabular-nums transition-colors",
                  size === s ? "border-bordeaux-900 bg-bordeaux-900 text-or-100" : "border-sable bg-white text-encre hover:border-bordeaux-900"
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <p className="mt-2 text-[12px] text-taupe">
            Vous pouvez laisser vide : nous confirmerons la taille avec vous sur WhatsApp.
          </p>
        </fieldset>
      )}

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
      {!soldOut && (
        <button
          type="button"
          onClick={() => setOrderOpen(true)}
          className="btn-primary mb-3 w-full animate-attention justify-between px-6 text-[13px] shadow-lg shadow-bordeaux-900/25 hover:animate-none"
        >
          <span className="inline-flex items-center gap-2">
            <Zap className="h-4 w-4 text-or-300" strokeWidth={1.8} /> Commander
          </span>
          <span dir="rtl" lang="ar" className="font-sans text-[15px] font-semibold normal-case tracking-normal">
            اطلب الآن
          </span>
        </button>
      )}
      <div className="flex gap-3">
        {!soldOut && <QuantityStepper value={qty} max={max} onChange={(v) => setQty(Math.max(1, v))} label={product.name} />}
        <button type="button" onClick={onAdd} disabled={soldOut} className="btn-outline flex-1 whitespace-nowrap px-3 tracking-[0.1em] sm:px-4 sm:tracking-[0.2em]">
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
      <OrderModal
        open={orderOpen}
        onClose={() => setOrderOpen(false)}
        lines={[
          {
            productId: product.id,
            name: product.name,
            image: product.images[0] ?? null,
            price: product.price,
            compareAt: product.compare_at_price && product.compare_at_price > product.price ? product.compare_at_price : null,
            quantity: qty,
            size: product.requires_size ? size : null,
            sizable: Boolean(product.requires_size),
          },
        ]}
      />
    </div>
  );
}
