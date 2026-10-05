"use client";

import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { QuantityStepper } from "@/components/site/CartDrawer";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/types";

const SIZES = ["5", "6", "7", "8", "9", "10"];

export function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);
  const soldOut = product.stock <= 0;
  const max = Math.min(20, Math.max(product.stock, 1));

  const onAdd = () => {
    if (product.requires_size && !size) {
      setSizeError(true);
      document.getElementById("size-picker")?.focus();
      return;
    }
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
              Taille <span className="text-bordeaux-600" aria-hidden>*</span>
            </span>
            {size && <span className="normal-case tracking-normal text-or-700">Taille {size} sélectionnée</span>}
          </legend>
          <div id="size-picker" tabIndex={-1} role="radiogroup" aria-label="Choisir une taille" className="grid grid-cols-6 gap-2 focus:outline-none">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={size === s}
                onClick={() => {
                  setSize(s);
                  setSizeError(false);
                }}
                className={cn(
                  "flex h-12 cursor-pointer items-center justify-center border text-[15px] tabular-nums transition-colors",
                  size === s ? "border-bordeaux-900 bg-bordeaux-900 text-or-100" : "border-sable bg-white text-encre hover:border-bordeaux-900",
                  sizeError && !size && "border-bordeaux-600"
                )}
              >
                {s}
              </button>
            ))}
          </div>
          {sizeError ? (
            <p role="alert" className="mt-2 text-[13px] text-bordeaux-600">
              Merci de choisir votre taille avant d&apos;ajouter au panier.
            </p>
          ) : (
            <p className="mt-2 text-[12px] text-taupe">
              Un doute sur votre taille ? Écrivez-nous sur WhatsApp, nous vous guidons.
            </p>
          )}
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
