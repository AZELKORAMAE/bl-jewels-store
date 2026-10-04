import { ArrowDown, ArrowUp, CircleCheck, Pencil, Plus, TriangleAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { moveCategory } from "@/app/admin/actions";
import { EmptyState, PageHeader } from "@/components/admin/ui";
import { getAdmin } from "@/lib/supabase/server";
import type { Category } from "@/lib/types";

export const metadata = { title: "Catégories" };

export default async function AdminCategoriesPage({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  const { ok } = await searchParams;
  const { supabase } = await getAdmin();
  const [{ data, error }, { data: products }] = await Promise.all([
    supabase.from("categories").select("*").order("sort_order").order("name"),
    supabase.from("products").select("category"),
  ]);
  const categories = (data ?? []) as Category[];
  const counts = new Map<string, number>();
  for (const p of products ?? []) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);

  return (
    <>
      <PageHeader title="Catégories" description="Titres, images et ordre d'affichage des catégories (accueil, boutique, pied de page).">
        {!error && (
          <Link href="/admin/categories/nouvelle" className="btn-primary rounded-md px-5">
            <Plus className="h-4 w-4" /> Nouvelle catégorie
          </Link>
        )}
      </PageHeader>

      {error && (
        <div role="alert" className="mb-6 flex gap-3 rounded-lg border border-or-300 bg-or-50 p-5 text-[14px] text-or-900">
          <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-or-700" strokeWidth={1.5} />
          <div>
            <p className="font-medium">La table des catégories n&apos;est pas encore créée.</p>
            <p className="mt-1">
              Dans Supabase → <strong>SQL Editor</strong>, collez le contenu du fichier <code>supabase/categories.sql</code> puis cliquez sur{" "}
              <strong>Run</strong>. Rechargez ensuite cette page. En attendant, le site affiche les catégories par défaut.
            </p>
          </div>
        </div>
      )}

      {ok && (
        <p role="status" className="mb-5 flex items-center gap-2 rounded-md bg-emerald-50 px-4 py-3 text-[14px] text-emerald-800">
          <CircleCheck className="h-4 w-4" /> Catégorie enregistrée. Le site est à jour.
        </p>
      )}

      {!error && categories.length === 0 && (
        <EmptyState title="Aucune catégorie" text="Créez vos catégories (Colliers, Bagues…) pour organiser la boutique.">
          <Link href="/admin/categories/nouvelle" className="btn-primary rounded-md">
            Créer une catégorie
          </Link>
        </EmptyState>
      )}

      {categories.length > 0 && (
        <ul className="overflow-hidden rounded-lg border border-sable bg-white">
          {categories.map((c, i) => (
            <li key={c.id} className="flex items-center gap-4 border-b border-sable px-4 py-3 last:border-0 sm:px-5">
              <span className="w-6 text-center font-serif text-xl tabular-nums text-or-700">{i + 1}</span>
              <span className="relative h-16 w-12 shrink-0 overflow-hidden rounded bg-champagne">
                {c.image_url && <Image src={c.image_url} alt="" fill sizes="48px" className="object-cover" />}
              </span>
              <div className="min-w-0 flex-1">
                <Link href={`/admin/categories/${c.id}`} className="font-serif text-xl text-bordeaux-900 hover:underline">
                  {c.name}
                </Link>
                <p className="text-[12px] text-taupe">
                  {counts.get(c.slug) ?? 0} produit{(counts.get(c.slug) ?? 0) > 1 ? "s" : ""} · /boutique?categorie={c.slug}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <form action={moveCategory.bind(null, c.id, -1)}>
                  <button
                    type="submit"
                    disabled={i === 0}
                    aria-label={`Monter ${c.name}`}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-bordeaux-900 hover:bg-champagne disabled:cursor-default disabled:opacity-25 disabled:hover:bg-transparent"
                  >
                    <ArrowUp className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </form>
                <form action={moveCategory.bind(null, c.id, 1)}>
                  <button
                    type="submit"
                    disabled={i === categories.length - 1}
                    aria-label={`Descendre ${c.name}`}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-bordeaux-900 hover:bg-champagne disabled:cursor-default disabled:opacity-25 disabled:hover:bg-transparent"
                  >
                    <ArrowDown className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </form>
                <Link
                  href={`/admin/categories/${c.id}`}
                  aria-label={`Modifier ${c.name}`}
                  className="flex h-10 w-10 items-center justify-center rounded-md text-bordeaux-900 hover:bg-champagne"
                >
                  <Pencil className="h-4 w-4" strokeWidth={1.5} />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
