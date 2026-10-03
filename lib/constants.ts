import type { OrderStatus } from "./types";

export const BRAND = {
  name: "BL Jewels",
  tagline: "Maison de Joaillerie",
  email: "bl.jewels.store@gmail.com",
};

const U = "https://images.unsplash.com/";

export const CATEGORIES = [
  { slug: "colliers", label: "Colliers & Pendentifs", short: "Colliers", image: `${U}photo-1611652022419-a9419f74343d` },
  { slug: "boucles-oreilles", label: "Boucles d'oreilles", short: "Boucles d'oreilles", image: `${U}photo-1652766540048-de0a878a3266` },
  { slug: "bracelets", label: "Bracelets", short: "Bracelets", image: `${U}photo-1619893454156-26a705ac9eb5` },
  { slug: "bagues", label: "Bagues", short: "Bagues", image: `${U}photo-1588814096146-e7c56156f9f8` },
] as const;

/** Visuels éditoriaux de la page d'accueil (remplaçables par vos propres photos). */
export const EDITORIAL_IMAGES = {
  hero: [
    `${U}photo-1613945407943-59cd755fd69e`,
    `${U}photo-1620656798579-1984d9e87df7`,
    `${U}photo-1585960622850-ed33c41d6418`,
  ],
  pearls: `${U}photo-1763628212781-7d52844cf358`,
  ecrin: `${U}photo-1515562141207-7a88fb7ce338`,
  atelier: `${U}photo-1606760227091-3dd870d97f1d`,
  auth: `${U}photo-1694062045776-f48d9b6de57e`,
  admin: `${U}photo-1613945407943-59cd755fd69e`,
};

/** Réseaux sociaux : renseignez vos liens pour les afficher dans le pied de page. */
export const SOCIAL_LINKS: { label: string; href: string; icon: "instagram" | "facebook" | "tiktok" | "whatsapp" }[] = [
  { label: "Instagram", href: "https://www.instagram.com/bl_jewels168/", icon: "instagram" },
  { label: "Facebook", href: "", icon: "facebook" },
  { label: "TikTok", href: "", icon: "tiktok" },
  { label: "WhatsApp", href: "https://wa.me/212655777934", icon: "whatsapp" },
];

/** Boutique physique */
export const STORE = {
  tagline: "Vente de bijoux en or 18 carats",
  instagramHandle: "@bl_jewels168",
  addressLine1: "N°168, Centre Commercial El Manjra",
  addressLine2: "Bd El Fida, Casablanca",
  hours: "11h00 – 18h30",
  closed: "Fermé le vendredi",
  phone: "+212 6 55 77 79 34",
  phoneHref: "tel:+212655777934",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Centre+Commercial+El+Manjra+Bd+El+Fida+Casablanca",
  mapsEmbed: "https://www.google.com/maps?q=Centre+Commercial+El+Manjra+Bd+El+Fida+Casablanca&output=embed",
};

export function categoryLabel(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

export const SORT_OPTIONS = [
  { value: "", label: "Recommandés" },
  { value: "nouveautes", label: "Nouveautés" },
  { value: "prix-asc", label: "Prix croissant" },
  { value: "prix-desc", label: "Prix décroissant" },
] as const;

export const ORDER_STATUSES: Record<OrderStatus, { label: string; tone: string }> = {
  pending: { label: "En attente", tone: "bg-or-100 text-or-800 ring-or-300" },
  confirmed: { label: "Confirmée", tone: "bg-bordeaux-50 text-bordeaux-700 ring-bordeaux-200" },
  shipped: { label: "Expédiée", tone: "bg-sable text-encre ring-or-200" },
  delivered: { label: "Livrée", tone: "bg-emerald-50 text-emerald-800 ring-emerald-200" },
  cancelled: { label: "Annulée", tone: "bg-neutral-100 text-neutral-600 ring-neutral-300" },
};

export const GIFT_PRICE_LIMIT = 5000;
