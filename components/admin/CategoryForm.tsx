"use client";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";
import { saveCategory } from "@/app/admin/actions";
import { slugify } from "@/lib/format";
import type { Category } from "@/lib/types";
import { ImageUploader } from "./ImageUploader";
import { Card } from "./ui";

export function CategoryForm({ category, nextOrder = 1 }: { category?: Category; nextOrder?: number }) {
  const [state, action, pending] = useActionState(saveCategory, null);
  const [slug, setSlug] = useState(category?.slug ?? "");
  const [touched, setTouched] = useState(Boolean(category));

  return (
    <form action={action} className="grid gap-6 xl:grid-cols-3">
      {category && <input type="hidden" name="id" value={category.id} />}
      <div className="space-y-6 xl:col-span-2">
        <Card title="Informations">
          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="field-label">
                Titre de la catégorie <span className="text-bordeaux-600">*</span>
              </label>
              <input
                id="name"
                name="name"
                defaultValue={category?.name}
                onChange={(e) => !touched && setSlug(slugify(e.target.value))}
                placeholder="Ex. : Colliers"
                className="field rounded-md"
                required
              />
              {state?.fieldErrors?.name && <p role="alert" className="mt-1.5 text-[13px] text-bordeaux-600">{state.fieldErrors.name}</p>}
            </div>
            <div>
              <label htmlFor="slug" className="field-label">
                Lien
              </label>
              <div className="flex items-center rounded-md border border-sable bg-ivoire focus-within:border-bordeaux-900">
                <span className="hidden pl-4 text-[14px] text-taupe sm:inline">/boutique?categorie=</span>
                <input
                  id="slug"
                  name="slug"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setTouched(true);
                  }}
                  className="min-h-[48px] w-full bg-transparent px-2 text-[15px] focus:outline-none"
                />
              </div>
              {state?.fieldErrors?.slug && <p role="alert" className="mt-1.5 text-[13px] text-bordeaux-600">{state.fieldErrors.slug}</p>}
              {category && <p className="mt-1.5 text-[12px] text-taupe">Modifier le lien met automatiquement à jour les produits de cette catégorie.</p>}
            </div>
          </div>
        </Card>
        <Card title="Image">
          <ImageUploader name="image_url" initial={category?.image_url ? [category.image_url] : []} multiple={false} folder="categories" format="single" />
          <p className="mt-3 text-[12px] text-taupe">Format portrait conseillé (3:4), par exemple 1200 × 1600 px, sujet centré.</p>
        </Card>
      </div>

      <div className="space-y-6">
        <Card title="Affichage">
          <label htmlFor="sort_order" className="field-label">
            Ordre d&apos;affichage
          </label>
          <input id="sort_order" name="sort_order" inputMode="numeric" defaultValue={category?.sort_order ?? nextOrder} className="field rounded-md" />
          <p className="mt-2 text-[12px] text-taupe">1 = affichée en premier, puis 2, 3… sur l&apos;accueil, la boutique et le pied de page.</p>
        </Card>
        <div className="space-y-3 rounded-lg border border-sable bg-white p-4">
          {state && !state.ok && (
            <p role="alert" className="rounded-md bg-bordeaux-50 px-3 py-2 text-[13px] text-bordeaux-700">
              {state.message}
            </p>
          )}
          <button type="submit" disabled={pending} className="btn-primary w-full rounded-md">
            {pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : category ? "Enregistrer" : "Créer la catégorie"}
          </button>
          <Link href="/admin/categories" className="block min-h-[40px] py-2 text-center text-[13px] text-taupe hover:text-encre">
            Annuler
          </Link>
        </div>
      </div>
    </form>
  );
}
