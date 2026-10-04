import { Banknote, Gem, PenLine, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { ParallaxImage } from "@/components/home/ParallaxImage";
import { ProductCarousel } from "@/components/ui/ProductCarousel";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EDITORIAL_IMAGES } from "@/lib/constants";
import { getCategories, getCollections, getProducts } from "@/lib/data";
import { cn } from "@/lib/cn";

export const revalidate = 60;

const SERVICES = [
  { icon: Truck, title: "Livraison offerte", text: "Expédition soignée et assurée, sans frais, jusqu'à votre porte." },
  { icon: Banknote, title: "Paiement à la livraison", text: "Réglez votre bijou en toute sérénité au moment de le recevoir." },
  { icon: PenLine, title: "Gravure offerte", text: "Initiales, date ou message : rendez votre création unique." },
  { icon: Gem, title: "Certificat d'authenticité", text: "Chaque pièce est accompagnée de son certificat de la Maison." },
];

export default async function HomePage() {
  const [featured, newest, collections, categories] = await Promise.all([
    getProducts({ featured: true, limit: 12 }),
    getProducts({ sort: "nouveautes", limit: 12 }),
    getCollections(),
    getCategories(),
  ]);

  const pearls = collections.find((c) => c.slug === "perles-de-lune") ?? collections[0];
  const mosaic = collections.filter((c) => c.is_featured).slice(0, 5);

  const slides = [
    {
      image: EDITORIAL_IMAGES.hero[0],
      eyebrow: "Nouvelle collection",
      title: "L'Éclat Éternel",
      text: "Des diamants sertis à la main qui capturent la lumière, pour célébrer chaque instant précieux.",
      href: "/collections/eclat-eternel",
      cta: "Découvrir",
    },
    {
      image: EDITORIAL_IMAGES.hero[1],
      eyebrow: "Or Signature",
      title: "L'or, sublimé",
      text: "Des lignes pures en or 18 carats, pensées pour être portées chaque jour.",
      href: "/collections/or-signature",
      cta: "Explorer",
    },
    {
      image: EDITORIAL_IMAGES.hero[2],
      eyebrow: "Cadeaux d'exception",
      title: "Offrir l'inoubliable",
      text: "Chaque création voyage dans notre écrin bordeaux, noué d'un ruban or.",
      href: "/boutique?prix=cadeaux",
      cta: "Trouver un cadeau",
    },
  ];

  return (
    <>
      <Hero slides={slides} />

      {/* Incontournables */}
      <section className="container py-20 md:py-28">
        <SectionHeading
          eyebrow="Les incontournables"
          title="Des créations iconiques"
          description="Nos pièces les plus aimées, façonnées avec exigence pour traverser le temps."
        />
        <Reveal className="mt-14" delay={0.1}>
          <ProductCarousel products={featured} label="Créations iconiques" />
        </Reveal>
      </section>

      {/* Catégories (gérées depuis Admin → Catégories) */}
      {categories.length > 0 && (
        <section className="bg-ivoire py-20 md:py-28">
          <div className="container">
            <SectionHeading eyebrow="Explorer" title="Acheter par catégorie" />
            <RevealGroup
              className={cn(
                "mx-auto mt-14 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6",
                categories.length >= 4 ? "lg:grid-cols-4" : categories.length === 3 ? "lg:grid-cols-3" : "max-w-3xl"
              )}
            >
              {categories.map((c) => (
                <RevealItem key={c.id}>
                  <Link href={`/boutique?categorie=${c.slug}`} className="group block text-center">
                    <div className="relative aspect-[3/4] overflow-hidden bg-champagne">
                      {c.image_url ? (
                        <Image
                          src={c.image_url}
                          alt={c.name}
                          fill
                          sizes="(min-width:1024px) 25vw, 50vw"
                          className="object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-[1.06]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center font-script text-5xl text-or-500">BL</div>
                      )}
                      <div className="absolute inset-0 bg-bordeaux-950/0 transition-colors duration-500 group-hover:bg-bordeaux-950/10" />
                    </div>
                    <h3 className="mt-5 font-serif text-[22px] text-bordeaux-900 md:text-[26px]">{c.name}</h3>
                    <span className="link-underline mt-2 text-[11px] text-or-700">Découvrir</span>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* Éditorial Perles de Lune */}
      {pearls && (
        <section className="grid md:grid-cols-2">
          <ParallaxImage src={EDITORIAL_IMAGES.pearls} alt={pearls.name} className="aspect-[4/5] md:aspect-auto md:min-h-[720px]" />
          <div className="flex items-center bg-bordeaux-900 px-6 py-20 md:px-16 lg:px-24">
            <Reveal className="max-w-md">
              <p className="eyebrow text-or-400">Collection</p>
              <h2 className="display mt-5 text-[44px] text-ivoire md:text-[60px]">{pearls.name}</h2>
              <div className="my-8 h-px w-16 bg-or-500" />
              <p className="text-[15px] leading-relaxed text-or-100/85 md:text-base">{pearls.description}</p>
              <Link href={`/collections/${pearls.slug}`} className="btn-outline-light mt-10">
                Découvrir la collection
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Nouveautés */}
      <section className="container py-20 md:py-28">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading align="left" eyebrow="Nouveautés" title="Les dernières créations" className="max-w-xl" />
          <Reveal>
            <Link href="/boutique?tri=nouveautes" className="link-underline text-bordeaux-900">
              Tout voir
            </Link>
          </Reveal>
        </div>
        <Reveal className="mt-12" delay={0.1}>
          <ProductCarousel products={newest} label="Nouveautés" />
        </Reveal>
      </section>

      <Marquee />

      {/* Mosaïque des collections */}
      {mosaic.length > 0 && (
        <section className="container py-20 md:py-28">
          <SectionHeading eyebrow="Univers" title="Nos collections" description="Cinq univers, une même exigence : la beauté qui dure." />
          <RevealGroup className="mt-14 grid auto-rows-[260px] grid-cols-2 gap-3 md:auto-rows-[300px] md:grid-cols-4 md:gap-5">
            {mosaic.map((c, i) => (
              <RevealItem key={c.id} className={cn(i === 0 && "col-span-2 row-span-2", i >= 3 && "max-md:col-span-2")}>
                <Link href={`/collections/${c.slug}`} className="group relative block h-full overflow-hidden bg-bordeaux-900">
                  {c.image_url && (
                    <Image
                      src={c.image_url}
                      alt={c.name}
                      fill
                      sizes={i === 0 ? "(min-width:768px) 50vw, 100vw" : "(min-width:768px) 25vw, 50vw"}
                      className="object-cover opacity-90 transition-all duration-[1.2s] ease-luxe group-hover:scale-[1.06] group-hover:opacity-100"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-bordeaux-950/80 via-bordeaux-950/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                    <h3 className={cn("font-serif text-ivoire", i === 0 ? "text-[34px] md:text-[48px]" : "text-[22px] md:text-[26px]")}>{c.name}</h3>
                    <span className="mt-2 inline-block translate-y-2 text-[11px] font-medium uppercase tracking-[0.2em] text-or-300 opacity-0 transition-all duration-500 ease-luxe group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100">
                      Découvrir
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      )}

      {/* Écrin signature */}
      <section className="bg-champagne">
        <div className="container grid items-center gap-12 py-20 md:grid-cols-2 md:gap-20 md:py-28">
          <Reveal className="order-2 md:order-1">
            <p className="eyebrow text-or-700">L&apos;art d&apos;offrir</p>
            <h2 className="display mt-5 text-[40px] text-bordeaux-900 md:text-[56px]">L&apos;Écrin Bordeaux</h2>
            <div className="my-8 h-px w-16 bg-or-500" />
            <p className="max-w-md text-[15px] leading-relaxed text-taupe md:text-base">
              Chaque création BL Jewels voyage dans notre écrin bordeaux, noué d&apos;un ruban or et accompagné d&apos;une carte
              manuscrite. Un geste aussi précieux que ce qu&apos;il renferme.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/boutique?prix=cadeaux" className="btn-primary">
                Trouver un cadeau
              </Link>
              <Link href="/maison#services" className="btn-outline">
                Nos services
              </Link>
            </div>
          </Reveal>
          <Reveal className="order-1 md:order-2" delay={0.15}>
            <div className="relative">
              <ParallaxImage src={EDITORIAL_IMAGES.ecrin} alt="Collier de perles dans son écrin" className="aspect-[4/5]" strength={8} />
              <div className="absolute -bottom-6 -left-6 hidden h-32 w-32 border border-or-500 md:block" aria-hidden />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="container py-20 md:py-24">
        <RevealGroup className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, text }) => (
            <RevealItem key={title} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-or-300 text-or-600">
                <Icon className="h-6 w-6" strokeWidth={1.2} />
              </div>
              <h3 className="mt-6 font-serif text-[24px] text-bordeaux-900">{title}</h3>
              <p className="mx-auto mt-3 max-w-[30ch] text-[14px] leading-relaxed text-taupe">{text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    </>
  );
}
