import type { OrderStatus } from "./types";

export const BRAND = {
  name: "BL Jewels",
  tagline: "Maison de Joaillerie",
  email: "bl.jewels.store@gmail.com",
};

const U = "https://images.unsplash.com/";

/** Visuels éditoriaux de la page d'accueil (remplaçables par vos propres photos). */
export const EDITORIAL_IMAGES = {
  // Grand visuel de l'accueil : fichiers dans public/images/hero/ (remplacez-les en gardant le même nom)
  hero: ["/images/hero/accueil-1.jpg", "/images/hero/accueil-2.jpg", "/images/hero/accueil-3.jpg"],
  pearls: "/images/accueil-collection.jpg", // section éditoriale (1re collection)
  ecrin: "/images/accueil-ecrin.jpg",
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
const STORE_ADDRESS = "BL Jewels Store, Centre Commercial El Manjra, N°168 Bd El Fida, Casablanca 20250";

export const STORE = {
  tagline: "Vente de bijoux en or 18 carats",
  instagramHandle: "@bl_jewels168",
  storeName: "BL Jewels Store",
  addressLine1: "Centre Commercial El Manjra",
  addressLine2: "N°168 Bd El Fida, Casablanca 20250",
  hours: "11h00 – 18h30",
  closed: "Fermé le vendredi",
  phone: "+212 6 55 77 79 34",
  phoneHref: "tel:+212655777934",
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(STORE_ADDRESS)}`,
  mapsEmbed: `https://www.google.com/maps?q=${encodeURIComponent(STORE_ADDRESS)}&output=embed`,
};


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
