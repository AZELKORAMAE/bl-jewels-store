import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteCategory } from "@/app/admin/actions";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { PageHeader } from "@/components/admin/ui";
import { getAdmin } from "@/lib/supabase/server";
import type { Category } from "@/lib/types";

export const metadata = { title: "Modifier la catégorie" };

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await getAdmin();
  const { data } = await supabase.from("categories").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const category = data as Category;

  return (
    <>
      <Link href="/admin/categories" className="mb-4 inline-flex min-h-[44px] items-center gap-2 text-[12px] uppercase tracking-[0.15em] text-taupe hover:text-bordeaux-900">
        <ArrowLeft className="h-4 w-4" /> Catégories
      </Link>
      <PageHeader title={category.name} description="Une catégorie qui contient encore des produits ne peut pas être supprimée.">
        <Link
          href={`/boutique?categorie=${category.slug}`}
          target="_blank"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-md px-4 text-[13px] text-bordeaux-900 hover:bg-champagne"
        >
          <ExternalLink className="h-4 w-4" strokeWidth={1.5} /> Voir en boutique
        </Link>
        <DeleteButton action={deleteCategory.bind(null, category.id)} label="Supprimer" redirectTo="/admin/categories" />
      </PageHeader>
      <CategoryForm category={category} />
    </>
  );
}
