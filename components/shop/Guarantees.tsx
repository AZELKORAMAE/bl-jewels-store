import { Banknote, Gift, Truck } from "lucide-react";
import { cn } from "@/lib/cn";

const ITEMS = [
  { icon: Truck, fr: "Livraison offerte et assurée", ar: "التوصيل مجاني ومضمون" },
  { icon: Banknote, fr: "Paiement à la livraison", ar: "الدفع عند الاستلام" },
  { icon: Gift, fr: "Livré dans l'écrin bordeaux signature", ar: "يُسلَّم في علبة BL Jewels الفاخرة" },
];

/** Garanties de la Maison, en français et en arabe. */
export function Guarantees({ className }: { className?: string }) {
  return (
    <ul className={cn("space-y-2.5 text-[14px] text-taupe", className)}>
      {ITEMS.map(({ icon: Icon, fr, ar }) => (
        <li key={fr} className="flex items-center gap-3">
          <Icon className="h-4 w-4 shrink-0 text-or-600" strokeWidth={1.4} aria-hidden />
          <span className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
            <span>{fr}</span>
            <span dir="rtl" lang="ar" className="text-[14px] text-taupe/90">
              {ar}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
