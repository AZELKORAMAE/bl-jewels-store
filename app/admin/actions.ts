"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/format";
import { getAdmin } from "@/lib/supabase/server";
import type { OrderStatus } from "@/lib/types";

export type ActionState = { ok: boolean; message: string; fieldErrors?: Record<string, string> } | null;

async function requireAdmin() {
  const { supabase, profile } = await getAdmin();
  if (!profile) throw new Error("Accès refusé");
  return supabase;
}

const str = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();
const num = (fd: FormData, key: string) => {
  const raw = str(fd, key).replace(/\s/g, "").replace(",", ".");
  return raw === "" ? null : Number(raw);
};

function refreshStore() {
  revalidatePath("/", "layout");
}

// ------------------------------------------------------------------ Produits
export async function saveProduct(_: ActionState, fd: FormData): Promise<ActionState> {
  const supabase = await requireAdmin();
  const id = str(fd, "id");
  const name = str(fd, "name");
  const price = num(fd, "price");
  const compare = num(fd, "compare_at_price");
  const stock = num(fd, "stock");
  let images: string[] = [];
  try {
    images = JSON.parse(str(fd, "images") || "[]");
  } catch {}

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = "Le nom est obligatoire.";
  if (price === null || Number.isNaN(price) || price < 0) fieldErrors.price = "Indiquez un prix valide.";
  if (compare !== null && (Number.isNaN(compare) || compare < 0)) fieldErrors.compare_at_price = "Prix barré invalide.";
  if (stock === null || !Number.isInteger(stock) || stock < 0) fieldErrors.stock = "Le stock doit être un nombre entier positif.";
  if (Object.keys(fieldErrors).length) return { ok: false, message: "Certains champs sont à corriger.", fieldErrors };

  const payload = {
    name,
    slug: slugify(str(fd, "slug") || name),
    description: str(fd, "description") || null,
    details: str(fd, "details") || null,
    price,
    // Promotion seulement si le prix initial dépasse le prix de vente
    compare_at_price: compare !== null && price !== null && compare > price ? compare : null,
    category: str(fd, "category") || "bagues",
    material: str(fd, "material") || null,
    collection_id: str(fd, "collection_id") || null,
    images: images.filter((u) => typeof u === "string" && u.startsWith("http")),
    stock,
    is_featured: fd.get("is_featured") === "on",
    is_new: fd.get("is_new") === "on",
    is_active: fd.get("is_active") === "on",
  };

  const { error } = id ? await supabase.from("products").update(payload).eq("id", id) : await supabase.from("products").insert(payload);
  if (error) {
    if (error.code === "23505") return { ok: false, message: "Ce lien (slug) est déjà utilisé.", fieldErrors: { slug: "Choisissez un autre lien." } };
    return { ok: false, message: error.message };
  }
  refreshStore();
  revalidatePath("/admin/produits");
  redirect("/admin/produits?ok=1");
}

export async function deleteProduct(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { ok: false, message: error.message };
  refreshStore();
  revalidatePath("/admin/produits");
  return { ok: true, message: "Produit supprimé." };
}

export async function toggleProductActive(id: string, active: boolean) {
  const supabase = await requireAdmin();
  await supabase.from("products").update({ is_active: active }).eq("id", id);
  refreshStore();
  revalidatePath("/admin/produits");
}

// -------------------------------------------------------- Page d'accueil
/** Monte ou descend un produit dans « Les plus vendus » ou « Nouveautés » (ordres renumérotés 1, 2, 3…). */
export async function moveHomeRank(section: "featured" | "new", id: string, direction: -1 | 1) {
  const supabase = await requireAdmin();
  const flag = section === "featured" ? "is_featured" : "is_new";
  const rank = section === "featured" ? "featured_rank" : "new_rank";
  const { data, error } = await supabase
    .from("products")
    .select("id")
    .eq(flag, true)
    .eq("is_active", true)
    .order(rank, { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });
  if (error) return { ok: false, message: "Exécutez d'abord supabase/ordre-accueil.sql dans Supabase." };
  const list = (data ?? []).map((p) => p.id as string);
  const i = list.indexOf(id);
  const j = i + direction;
  if (i < 0 || j < 0 || j >= list.length) return { ok: true, message: "" };
  [list[i], list[j]] = [list[j], list[i]];
  await Promise.all(list.map((pid, index) => supabase.from("products").update({ [rank]: index + 1 }).eq("id", pid)));
  refreshStore();
  revalidatePath("/admin/accueil");
  return { ok: true, message: "" };
}

// ------------------------------------------------------------- Collections
export async function saveCollection(_: ActionState, fd: FormData): Promise<ActionState> {
  const supabase = await requireAdmin();
  const id = str(fd, "id");
  const name = str(fd, "name");
  if (!name) return { ok: false, message: "Le nom est obligatoire.", fieldErrors: { name: "Le nom est obligatoire." } };

  const payload = {
    name,
    slug: slugify(str(fd, "slug") || name),
    description: str(fd, "description") || null,
    image_url: str(fd, "image_url") || null,
    sort_order: num(fd, "sort_order") ?? 0,
    is_featured: fd.get("is_featured") === "on",
  };

  const { error } = id ? await supabase.from("collections").update(payload).eq("id", id) : await supabase.from("collections").insert(payload);
  if (error) {
    if (error.code === "23505") return { ok: false, message: "Ce lien (slug) est déjà utilisé.", fieldErrors: { slug: "Choisissez un autre lien." } };
    return { ok: false, message: error.message };
  }
  refreshStore();
  revalidatePath("/admin/collections");
  redirect("/admin/collections?ok=1");
}

export async function deleteCollection(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("collections").delete().eq("id", id);
  if (error) return { ok: false, message: error.message };
  refreshStore();
  revalidatePath("/admin/collections");
  return { ok: true, message: "Collection supprimée." };
}

// ---------------------------------------------------------------- Commandes
const STATUSES: OrderStatus[] = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

export async function updateOrderStatus(id: string, status: OrderStatus) {
  const supabase = await requireAdmin();
  if (!STATUSES.includes(status)) return { ok: false, message: "Statut invalide." };
  const { error } = await supabase.from("orders").update({ status }).eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin", "layout");
  refreshStore();
  return { ok: true, message: "Statut mis à jour." };
}

// ----------------------------------------------------------- Notifications
export async function markNotificationsRead(ids?: string[]) {
  const supabase = await requireAdmin();
  let req = supabase.from("notifications").update({ is_read: true }).eq("is_read", false);
  if (ids?.length) req = req.in("id", ids);
  await req;
  revalidatePath("/admin", "layout");
}

export async function signOutAdmin() {
  const { supabase } = await getAdmin();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
