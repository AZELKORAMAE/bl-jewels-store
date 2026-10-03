import { Banknote, Gem, Gift, PenLine, RotateCcw, Truck } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ParallaxImage } from "@/components/home/ParallaxImage";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EDITORIAL_IMAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "La Maison",
  description: "L'histoire, le savoir-faire et les services de BL Jewels, Maison de Joaillerie.",
};

const SERVICES = [
  { icon: Truck, title: "Livraison offerte", text: "Toutes nos créations sont expédiées gratuitement, soigneusement emballées et assurées." },
  { icon: Banknote, title: "Paiement à la livraison", text: "Vous réglez votre commande uniquement lorsque vous la recevez, en toute confiance." },
  { icon: Gift, title: "Écrin signature", text: "Chaque bijou est présenté dans notre écrin bordeaux, avec ruban or et carte manuscrite." },
  { icon: PenLine, title: "Gravure offerte", text: "Précisez vos initiales, une date ou un mot doux lors de la commande." },
  { icon: Gem, title: "Certificat d'authenticité", text: "Métaux précieux poinçonnés et pierres accompagnées de leur certificat." },
  { icon: RotateCcw, title: "Retours sous 14 jours", text: "Si la création ne vous convient pas, nous l'échangeons ou la reprenons." },
];

export default function MaisonPage() {
  return (
    <>
      <section className="relative flex h-[60svh] min-h-[440px] items-center justify-center overflow-hidden bg-bordeaux-950 text-center">
        <Image src={EDITORIAL_IMAGES.atelier} alt="" fill priority sizes="100vw" className="animate-ken-burns object-cover opacity-50" />
        <div className="absolute inset-0 bg-bordeaux-950/50" />
        <Reveal className="container relative">
          <Image src="/logo-gold.png" alt="" width={110} height={112} className="mx-auto h-auto w-[90px]" />
          <h1 className="display mt-8 text-[48px] text-ivoire md:text-[76px]">La Maison</h1>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-or-100/90 md:text-base">
            Une maison de joaillerie née d&apos;une passion : révéler la lumière de l&apos;or et des pierres dans des créations qui se transmettent.
          </p>
        </Reveal>
      </section>

      <section className="container grid items-center gap-12 py-20 md:grid-cols-2 md:gap-20 md:py-28">
        <Reveal>
          <p className="eyebrow text-or-700">Notre histoire</p>
          <h2 className="display mt-5 text-[38px] text-bordeaux-900 md:text-[52px]">Le geste juste, la matière noble</h2>
          <div className="my-8 h-px w-16 bg-or-500" />
          <div className="space-y-5 text-[15px] leading-relaxed text-taupe md:text-base">
            <p>
              BL Jewels est née de l&apos;envie de créer des bijoux à la fois intemporels et profondément personnels. Chaque pièce est dessinée
              avec soin, puis façonnée par des artisans qui maîtrisent le sertissage, le polissage et la ciselure.
            </p>
            <p>
              Or 18 carats, diamants sélectionnés, perles au lustre profond : nous ne travaillons que des matières nobles, pour des créations
              qui accompagnent chaque moment de votre vie.
            </p>
          </div>
        </Reveal>
        <ParallaxImage src={EDITORIAL_IMAGES.hero[2]} alt="Création BL Jewels portée" className="aspect-[4/5]" />
      </section>

      <section id="services" className="scroll-mt-32 bg-ivoire py-20 md:py-28">
        <div className="container">
          <SectionHeading eyebrow="À votre service" title="Les services de la Maison" />
          <RevealGroup className="mt-14 grid gap-px bg-sable sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ icon: Icon, title, text }) => (
              <RevealItem key={title} className="bg-ivoire p-8 md:p-10">
                <Icon className="h-7 w-7 text-or-600" strokeWidth={1.2} />
                <h3 className="mt-6 font-serif text-[24px] text-bordeaux-900">{title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-taupe">{text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section id="entretien" className="container scroll-mt-32 py-20 md:py-28">
        <SectionHeading
          eyebrow="Conseils"
          title="Prendre soin de vos bijoux"
          description="Rangez chaque pièce séparément dans son écrin. Retirez vos bijoux avant le sport, la baignade ou l'application de parfum. Nettoyez l'or avec une eau tiède savonneuse et une brosse douce ; les perles, simplement avec un chiffon sec."
        />
        <div className="mt-12 text-center">
          <Link href="/boutique" className="btn-primary">
            Découvrir nos créations
          </Link>
        </div>
      </section>
    </>
  );
}
