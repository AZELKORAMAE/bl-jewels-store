import { ArrowDown, ArrowUp, ExternalLink, Flame, Sparkles, TriangleAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { moveHomeRank } from "@/app/admin/actions";
import { Card, PageHeader } from "@/components/admin/ui";
import { formatPrice } from "@/lib/format";
import { getAdmin } from "@/lib/supabase/server";

export const metadata = { title: "Page d'accueil" };

type Row = { id: string; name: string; price: number; images: string[]; collection: { name: string } | null };
type Section = "featured" | "new";

export default async function AdminHomePage() {
  const { supabase } = await getAdmin();

  const load = (section: Section) =>
    supabase
      .from("products")
      .select("id, name, price, images, collection:collections(name)")
      .eq(section === "featured" ? "is_featured" : "is_new", true)
      .eq("is_active", true)
      .order(section === "featured" ? "featured_rank" : "new_rank", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false });

  const [featured, fresh] = await Promise.all([load("featured"), load("new")]);
  const missingColumns = Boolean(featured.error || fresh.error);

  return (
    <>
      <PageHeader title="Page d'accueil" description="Choisissez l'ordre d'affichage des bijoux dans les sections de l'accueil.">
        <Link href="/" target="_blank" className="inline-flex min-h-[44px] items-center gap-2 rounded-md px-4 text-[13px] text-bordeaux-900 hover:bg-champagne">
          <ExternalLink className="h-4 w-4" strokeWidth={1.5} /> Voir l&apos;accueil
        </Link>
      </PageHeader>

      {missingColumns && (
        <div role="alert" className="mb-6 flex gap-3 rounded-lg border border-or-300 bg-or-50 p-5 text-[14px] text-or-900">
          <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-or-700" strokeWidth={1.5} />
          <div>
            <p className="font-medium">Une étape reste à faire pour activer le classement.</p>
            <p className="mt-1">
              Dans Supabase → <strong>SQL Editor</strong>, collez le contenu du fichier <code>supabase/ordre-accueil.sql</code> puis cliquez sur{" "}
              <strong>Run</strong>. Rechargez ensuite cette page.
            </p>
          </div>
        </div>
      )}

      {!missingColumns && (
        <div className="grid gap-6 xl:grid-cols-2">
          <SectionList
            section="featured"
            title="Les plus vendus"
            icon={<Flame className="h-5 w-5 text-or-600" strokeWidth={1.8} />}
            hint="Produits cochés « Meilleure vente ». Les 12 premiers s'affichent sur l'accueil."
            rows={(featured.data ?? []) as unknown as Row[]}
          />
          <SectionList
            section="new"
            title="Nouveautés"
            icon={<Sparkles className="h-5 w-5 text-or-600" strokeWidth={1.8} />}
            hint="Produits cochés « Nouveauté ». Les 12 premiers s'affichent sur l'accueil."
            rows={(fresh.data ?? []) as unknown as Row[]}
          />
        </div>
      )}
    </>
  );
}

function SectionList({ section, title, icon, hint, rows }: { section: Section; title: string; icon: React.ReactNode; hint: string; rows: Row[] }) {
  return (
    <Card title={title} action={icon}>
      <p className="mb-4 text-[13px] text-taupe">{hint}</p>
      {rows.length === 0 ? (
        <p className="rounded-md bg-ivoire px-4 py-8 text-center text-[13px] text-taupe">
          Aucun produit coché pour le moment. Activez l&apos;option dans <Link href="/admin/produits" className="text-bordeaux-900 underline">Produits</Link>.
        </p>
      ) : (
        <ol className="divide-y divide-sable rounded-md border border-sable">
          {rows.map((p, i) => (
            <li key={p.id} className={`flex items-center gap-3 px-3 py-2 ${i === 11 && rows.length > 12 ? "border-b-2 border-b-or-400" : ""}`}>
              <span className={`w-6 text-center font-serif text-lg tabular-nums ${i < 12 ? "text-or-700" : "text-taupe/50"}`}>{i + 1}</span>
              <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded bg-[#F6F1EB]">
                {p.images?.[0] && <Image src={p.images[0]} alt="" fill sizes="44px" className="object-cover" />}
              </span>
              <span className="min-w-0 flex-1">
                <Link href={`/admin/produits/${p.id}`} className="block truncate text-[13px] text-encre hover:underline">
                  {p.name}
                </Link>
                <span className="text-[12px] text-taupe">
                  {p.collection?.name ?? "Sans collection"} · {formatPrice(p.price)}
                  {i >= 12 && " · non affiché"}
                </span>
              </span>
              <form action={async () => { "use server"; await moveHomeRank(section, p.id, -1); }}>
                <button
                  type="submit"
                  disabled={i === 0}
                  aria-label={`Monter ${p.name}`}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-bordeaux-900 hover:bg-champagne disabled:cursor-default disabled:opacity-25 disabled:hover:bg-transparent"
                >
                  <ArrowUp className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </form>
              <form action={async () => { "use server"; await moveHomeRank(section, p.id, 1); }}>
                <button
                  type="submit"
                  disabled={i === rows.length - 1}
                  aria-label={`Descendre ${p.name}`}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-bordeaux-900 hover:bg-champagne disabled:cursor-default disabled:opacity-25 disabled:hover:bg-transparent"
                >
                  <ArrowDown className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </form>
            </li>
          ))}
        </ol>
      )}
    </Card>
  );
}
