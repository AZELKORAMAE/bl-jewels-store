import { Banknote, Clock, Gem, Gift, MapPin, PenLine, Phone, MessageCircle, Truck } from "lucide-react";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ParallaxImage } from "@/components/home/ParallaxImage";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EDITORIAL_IMAGES, LEGAL, SOCIAL_LINKS, STORE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "La Maison",
  description: "L'histoire, le savoir-faire et les services de BL Jewels, Maison de Joaillerie.",
};

const SERVICES = [
  { icon: Truck, title: "Livraison offerte", text: "La plupart de nos créations sont expédiées gratuitement, soigneusement emballées et assurées." },
  { icon: Banknote, title: "Paiement à la livraison", text: "Vous réglez votre commande uniquement lorsque vous la recevez, en toute confiance." },
  { icon: Gift, title: "Écrin signature", text: "Chaque bijou est présenté dans notre écrin bordeaux, avec ruban or et carte manuscrite." },
  { icon: PenLine, title: "Gravure offerte", text: "Précisez vos initiales, une date ou un mot doux lors de la commande." },
  { icon: Gem, title: "Certificat d'authenticité", text: "Métaux précieux poinçonnés et pierres accompagnées de leur certificat." },
  { icon: MessageCircle, title: "Échange & retour sur WhatsApp", text: "Pour échanger ou retourner une création, écrivez-nous sur WhatsApp au +212 6 55 77 79 34." },
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
              Or 18 carats certifié, finitions polies et ciselées à la main : nous ne travaillons que l&apos;or, pour des créations
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

      <section id="boutique" className="scroll-mt-32">
        <div className="grid md:grid-cols-2">
          <div className="flex items-center bg-bordeaux-900 px-6 py-16 md:px-16 lg:px-24">
            <Reveal className="max-w-md">
              <p className="eyebrow text-or-400">Visitez-nous</p>
              <h2 className="display mt-5 text-[40px] text-ivoire md:text-[54px]">Notre boutique</h2>
              <p className="mt-3 font-serif text-xl italic text-or-300">{STORE.tagline}</p>
              <div className="my-8 h-px w-16 bg-or-500" />
              <ul className="space-y-5 text-[15px] text-or-100/90">
                <li className="flex gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-or-400" strokeWidth={1.3} />
                  <span>
                    <span className="font-medium text-ivoire">{STORE.storeName}</span>
                    <br />
                    {STORE.addressLine1}
                    <br />
                    {STORE.addressLine2}
                  </span>
                </li>
                <li className="flex gap-4">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-or-400" strokeWidth={1.3} />
                  <span>
                    Samedi – jeudi : {STORE.hours}
                    <br />
                    {STORE.closed}
                  </span>
                </li>
                <li className="flex gap-4">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-or-400" strokeWidth={1.3} />
                  <a href={STORE.phoneHref} className="tabular-nums hover:text-or-300">
                    {STORE.phone}
                  </a>
                </li>
              </ul>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href={STORE.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-gold">
                  Itinéraire
                </a>
                <a href={SOCIAL_LINKS[0].href} target="_blank" rel="noopener noreferrer" className="btn-outline-light">
                  <InstagramIcon className="h-4 w-4" /> {STORE.instagramHandle}
                </a>
              </div>
            </Reveal>
          </div>
          <iframe
            src={STORE.mapsEmbed}
            title="Plan d'accès à la boutique BL Jewels, Centre Commercial El Manjra, Casablanca"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[380px] w-full border-0 grayscale-[35%] md:h-auto md:min-h-[560px]"
          />
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
      <section id="informations-legales" className="scroll-mt-32 bg-ivoire py-16 md:py-20">
        <div className="container max-w-3xl text-center">
          <SectionHeading eyebrow="Informations légales" title="Business Legal Information" />
          <dl className="mt-10 space-y-3 text-[15px]">
            <div><dt className="inline font-medium">Business Legal Name : </dt><dd className="inline">{LEGAL.legalName}</dd></div>
            <div><dt className="inline font-medium">Commercial Brand Name : </dt><dd className="inline">{LEGAL.brandName}</dd></div>
            <div><dt className="inline font-medium">Business Address : </dt><dd className="inline">{LEGAL.address}</dd></div>
            <div><dt className="inline font-medium">Business Manager : </dt><dd className="inline">{LEGAL.manager}</dd></div>
          </dl>
          <p className="mt-6 text-[14px] opacity-80">
            {LEGAL.brandName} is the commercial brand operated by {LEGAL.legalName}.
          </p>
        </div>
      </section>
    </>
  );
}
