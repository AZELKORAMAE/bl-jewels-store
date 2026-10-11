import { formatPrice } from "@/lib/format";

/** Numéro WhatsApp de la boutique (format international, sans « + »). */
export const WHATSAPP_NUMBER = "212655777934";

type Line = { name: string; quantity: number; price: number; size?: string | null };

/**
 * Lien WhatsApp avec un message de commande pré-rempli (français / arabe).
 * La taille n'apparaît que si elle a été choisie ; les champs vides restent
 * à compléter par le client.
 */
export function whatsappOrderUrl({
  lines,
  orderNumber,
  name = "",
  address = "",
  phone = "",
}: {
  lines: Line[];
  orderNumber?: string;
  name?: string;
  address?: string;
  phone?: string;
}) {
  const total = lines.reduce((n, l) => n + l.price * l.quantity, 0);
  const message = [
    "السلام عليكم، أريد تأكيد طلبي",
    orderNumber ? `Bonjour BL Jewels, je souhaite confirmer ma commande ${orderNumber} :` : "Bonjour BL Jewels, je souhaite commander :",
    "",
    ...lines.map((l) => `• ${l.name} × ${l.quantity}${l.size ? ` · Taille / المقاس ${l.size}` : ""} · ${formatPrice(l.price * l.quantity)}`),
    `Total : ${formatPrice(total)} (paiement à la livraison)`,
    "",
    `Nom complet / الاسم الكامل : ${name.trim()}`,
    `Adresse / العنوان : ${address.trim()}`,
    `Téléphone / الهاتف : ${phone.trim()}`,
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
