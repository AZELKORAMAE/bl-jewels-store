import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { PageHeader } from "@/components/admin/ui";
import { getAdmin } from "@/lib/supabase/server";

export const metadata = { title: "Nouvelle catégorie" };

export default async function NewCategoryPage() {
  const { supabase } = await getAdmin();
  const { count } = await supabase.from("categories").select("id", { count: "exact", head: true });

  return (
    <>
      <Link href="/admin/categories" className="mb-4 inline-flex min-h-[44px] items-center gap-2 text-[12px] uppercase tracking-[0.15em] text-taupe hover:text-bordeaux-900">
        <ArrowLeft className="h-4 w-4" /> Catégories
      </Link>
      <PageHeader title="Nouvelle catégorie" description="Ajoutez un type de bijou à la boutique." />
      <CategoryForm nextOrder={(count ?? 0) + 1} />
    </>
  );
}
