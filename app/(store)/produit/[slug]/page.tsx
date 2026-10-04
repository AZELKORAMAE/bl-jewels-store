import { Banknote, Gift, Truck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/shop/AddToCart";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { AccordionItem } from "@/components/ui/Accordion";
import { ProductCarousel } from "@/components/ui/ProductCarousel";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProduct, getProducts } from "@/lib/data";
import { formatPrice } from "@/lib/format";

export const revalidate = 60;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Création introuvable" };
  return {
    title: product.name,
    description: product.description ?? undefined,
    openGraph: product.images[0] ? { images: [product.images[0]] } : undefined,
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  let related = product.collection_id ? await getProducts({ collectionId: product.collection_id, excludeId: product.id, limit: 10 }) : [];
  if (related.length < 4) related = [...related, ...(await getProducts({ featured: true, excludeId: product.id, limit: 8 }))].filter((p, i, a) => a.findIndex((x) => x.id === p.id) === i);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    brand: { "@type": "Brand", name: "BL Jewels" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: process.env.NEXT_PUBLIC_CURRENCY || "MAD",
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="container pt-6 md:pt-10">
        <Breadcrumbs
          items={[
            product.collection
              ? { label: product.collection.name, href: `/collections/${product.collection.slug}` }
              : { label: "Joaillerie", href: "/boutique" },
            { label: product.name },
          ]}
        />
      </div>

      <section className="container grid gap-10 py-8 md:py-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} name={product.name} />
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[136px]">
            <Reveal y={16}>
              {product.collection && (
                <Link href={`/collections/${product.collection.slug}`} className="font-serif text-[22px] italic text-or-700 hover:text-or-600">
                  {product.collection.name}
                </Link>
              )}
              <h1 className="mt-2 font-serif text-[34px] font-light leading-tight text-bordeaux-900 md:text-[44px]">{product.name}</h1>
              {product.material && <p className="mt-3 text-[14px] text-taupe">{product.material}</p>}
              <p className="mt-6 text-[22px] tabular-nums text-encre">
                {product.compare_at_price && product.compare_at_price > product.price && (
                  <span className="mr-3 text-[17px] text-taupe line-through">{formatPrice(product.compare_at_price)}</span>
                )}
                {formatPrice(product.price)}
              </p>
              <div className="my-8 h-px bg-sable" />
              <AddToCart product={product} />

              <ul className="mt-8 space-y-3 text-[14px] text-taupe">
                <li className="flex items-center gap-3">
                  <Truck className="h-4 w-4 text-or-600" strokeWidth={1.4} /> Livraison offerte et assurée
                </li>
                <li className="flex items-center gap-3">
                  <Banknote className="h-4 w-4 text-or-600" strokeWidth={1.4} /> Paiement à la livraison
                </li>
                <li className="flex items-center gap-3">
                  <Gift className="h-4 w-4 text-or-600" strokeWidth={1.4} /> Livré dans l&apos;écrin bordeaux signature
                </li>
              </ul>

              <div className="mt-10 border-t border-sable">
                <AccordionItem title="Description" defaultOpen>
                  <p>{product.description}</p>
                </AccordionItem>
                {product.details && (
                  <AccordionItem title="Détails de la création">
                    <ul className="space-y-2">
                      {product.details.split("\n").filter(Boolean).map((line) => (
                        <li key={line} className="flex gap-3">
                          <span className="mt-2.5 h-px w-3 shrink-0 bg-or-500" aria-hidden />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </AccordionItem>
                )}
                <AccordionItem title="Livraison & retours">
                  <p>
                    Livraison offerte sous 2 à 5 jours ouvrés, avec paiement à la réception. Vous disposez de 14 jours pour nous retourner
                    votre création dans son état d&apos;origine.
                  </p>
                </AccordionItem>
                <AccordionItem title="Entretien">
                  <p>
                    Rangez votre bijou dans son écrin, à l&apos;abri des chocs. Évitez le contact avec les parfums et l&apos;eau. Un nettoyage
                    doux avec un chiffon sec suffit à préserver son éclat.
                  </p>
                </AccordionItem>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container border-t border-sable py-20 md:py-24">
          <SectionHeading eyebrow="Vous aimerez aussi" title="Créations similaires" />
          <Reveal className="mt-12">
            <ProductCarousel products={related} label="Créations similaires" />
          </Reveal>
        </section>
      )}
    </>
  );
}
