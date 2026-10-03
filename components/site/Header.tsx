"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/cn";
import { CATEGORIES, GIFT_PRICE_LIMIT } from "@/lib/constants";
import { formatPrice } from "@/lib/format";
import { useEscape, useLockBody } from "@/lib/hooks";
import type { Collection } from "@/lib/types";

type NavCollection = Pick<Collection, "name" | "slug" | "image_url">;
type MegaKey = "joaillerie" | "collections";

const NAV: { label: string; href: string; mega?: MegaKey }[] = [
  { label: "Fiançailles", href: "/collections/fiancailles" },
  { label: "Joaillerie", href: "/boutique", mega: "joaillerie" },
  { label: "Haute Joaillerie", href: "/collections/haute-joaillerie" },
  { label: "Collections", href: "/collections", mega: "collections" },
  { label: "Cadeaux", href: "/boutique?prix=cadeaux" },
  { label: "La Maison", href: "/maison" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function Header({ collections }: { collections: NavCollection[] }) {
  const pathname = usePathname();
  const { count, ready, open: openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState<MegaKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMega(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const closeAll = useCallback(() => {
    setMega(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }, []);
  useEscape(closeAll);
  useLockBody(mobileOpen || searchOpen);

  const openMega = (key: MegaKey | null) => {
    window.clearTimeout(closeTimer.current);
    setMega(key);
  };
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMega(null), 160);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b bg-white/95 backdrop-blur-md transition-shadow duration-500",
          scrolled ? "border-sable shadow-[0_8px_30px_-20px_rgba(44,0,1,0.35)]" : "border-transparent"
        )}
        onMouseLeave={scheduleClose}
      >
        <div
          className={cn(
            "container relative flex items-center justify-between transition-[height] duration-500 ease-luxe",
            scrolled ? "h-16" : "h-16 lg:h-[92px]"
          )}
        >
          {/* Gauche */}
          <div className="flex items-center gap-1 lg:gap-6">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
              className="-ml-2 flex h-11 w-11 cursor-pointer items-center justify-center text-bordeaux-900 lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.4} />
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Rechercher"
              className="flex h-11 cursor-pointer items-center gap-3 px-1 text-bordeaux-900 transition-colors hover:text-or-700 lg:px-0"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.4} />
              <span className="hidden text-[11px] font-medium uppercase tracking-[0.2em] lg:inline">Rechercher</span>
            </button>
            <Link
              href="/maison#boutique"
              className="hidden text-[11px] font-medium uppercase tracking-[0.2em] text-bordeaux-900 transition-colors hover:text-or-700 xl:inline"
            >
              Notre boutique
            </Link>
          </div>

          {/* Logo centré */}
          <Link href="/" aria-label="BL Jewels — accueil" className="absolute left-1/2 -translate-x-1/2">
            <Logo compact={scrolled} className="max-lg:[&>span:first-child]:text-[24px] max-lg:[&>span:last-child]:hidden" />
          </Link>

          {/* Droite */}
          <div className="flex items-center gap-1 lg:gap-4">
            <Link
              href="/compte"
              aria-label="Mon compte"
              className="flex h-11 w-11 items-center justify-center text-bordeaux-900 transition-colors hover:text-or-700"
            >
              <User className="h-[19px] w-[19px]" strokeWidth={1.4} />
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Panier${ready && count ? `, ${count} article${count > 1 ? "s" : ""}` : ""}`}
              className="relative -mr-2 flex h-11 w-11 cursor-pointer items-center justify-center text-bordeaux-900 transition-colors hover:text-or-700"
            >
              <ShoppingBag className="h-[19px] w-[19px]" strokeWidth={1.4} />
              <AnimatePresence>
                {ready && count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    className="absolute right-1 top-1.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-bordeaux-900 px-1 text-[9px] font-semibold text-or-200"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Navigation principale (desktop) */}
        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex h-12 items-center justify-center gap-9 xl:gap-12">
            {NAV.map((item) => {
              const active = mega === item.mega && !!item.mega;
              const current = pathname === item.href.split("?")[0] && item.href !== "/boutique?prix=cadeaux";
              return (
                <li key={item.label} className="relative h-full">
                  <Link
                    href={item.href}
                    onMouseEnter={() => openMega(item.mega ?? null)}
                    onFocus={() => openMega(item.mega ?? null)}
                    aria-expanded={item.mega ? active : undefined}
                    aria-haspopup={item.mega ? "true" : undefined}
                    className={cn(
                      "group relative flex h-full items-center text-[11.5px] font-medium uppercase tracking-[0.2em] transition-colors",
                      active || current ? "text-or-700" : "text-bordeaux-900 hover:text-or-700"
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute inset-x-0 bottom-2 h-px origin-center bg-or-500 transition-transform duration-500 ease-luxe",
                        active || current ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Méga-menu */}
        <AnimatePresence>
          {mega && (
            <motion.div
              key={mega}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6, transition: { duration: 0.18 } }}
              transition={{ duration: 0.35, ease: EASE }}
              onMouseEnter={() => openMega(mega)}
              className="absolute inset-x-0 top-full hidden border-t border-sable bg-white lg:block"
            >
              <div className="container py-10">
                {mega === "joaillerie" ? <JewelryMega /> : <CollectionsMega collections={collections} />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Voile derrière le méga-menu */}
      <AnimatePresence>
        {mega && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseEnter={() => setMega(null)}
            className="fixed inset-0 z-30 hidden bg-bordeaux-950/25 lg:block"
            aria-hidden
          />
        )}
      </AnimatePresence>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} collections={collections} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} collections={collections} />
    </>
  );
}

function MegaLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="inline-block py-1.5 text-[14px] text-encre transition-colors hover:text-or-700">
        {children}
      </Link>
    </li>
  );
}

function JewelryMega() {
  return (
    <div className="grid grid-cols-12 gap-10">
      <div className="col-span-3">
        <p className="eyebrow mb-5 text-or-700">Catégories</p>
        <ul>
          {CATEGORIES.map((c) => (
            <MegaLink key={c.slug} href={`/boutique?categorie=${c.slug}`}>
              {c.label}
            </MegaLink>
          ))}
          <MegaLink href="/boutique">Toute la joaillerie</MegaLink>
        </ul>
      </div>
      <div className="col-span-3">
        <p className="eyebrow mb-5 text-or-700">Découvrir</p>
        <ul>
          <MegaLink href="/boutique?tri=nouveautes">Nouveautés</MegaLink>
          <MegaLink href="/collections/fiancailles">Bagues de fiançailles</MegaLink>
          <MegaLink href="/collections/haute-joaillerie">Haute Joaillerie</MegaLink>
          <MegaLink href="/boutique?prix=cadeaux">Cadeaux de moins de {formatPrice(GIFT_PRICE_LIMIT)}</MegaLink>
        </ul>
      </div>
      <div className="col-span-6 grid grid-cols-2 gap-6">
        {CATEGORIES.slice(0, 2).map((c) => (
          <Link key={c.slug} href={`/boutique?categorie=${c.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden bg-champagne">
              <Image src={c.image} alt={c.label} fill sizes="25vw" className="object-cover transition-transform duration-1000 ease-luxe group-hover:scale-105" />
            </div>
            <p className="mt-3 font-serif text-xl text-bordeaux-900">{c.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function CollectionsMega({ collections }: { collections: NavCollection[] }) {
  return (
    <div className="grid grid-cols-12 gap-10">
      <div className="col-span-3">
        <p className="eyebrow mb-5 text-or-700">Nos collections</p>
        <ul>
          {collections.map((c) => (
            <MegaLink key={c.slug} href={`/collections/${c.slug}`}>
              {c.name}
            </MegaLink>
          ))}
          <MegaLink href="/collections">Toutes les collections</MegaLink>
        </ul>
      </div>
      <div className="col-span-9 grid grid-cols-4 gap-5">
        {collections.slice(0, 4).map((c) => (
          <Link key={c.slug} href={`/collections/${c.slug}`} className="group block">
            <div className="relative aspect-[3/4] overflow-hidden bg-champagne">
              {c.image_url && (
                <Image src={c.image_url} alt={c.name} fill sizes="18vw" className="object-cover transition-transform duration-1000 ease-luxe group-hover:scale-105" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-bordeaux-950/60 via-transparent" />
              <p className="absolute inset-x-0 bottom-4 text-center font-serif text-xl text-ivoire">{c.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileMenu({ open, onClose, collections }: { open: boolean; onClose: () => void; collections: NavCollection[] }) {
  const [expanded, setExpanded] = useState<MegaKey | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bordeaux-950/50"
          />
          <motion.nav
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%", transition: { duration: 0.25 } }}
            transition={{ duration: 0.45, ease: EASE }}
            className="absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col bg-white"
          >
            <div className="flex h-16 items-center justify-between border-b border-sable px-5">
              <Logo compact />
              <button type="button" onClick={onClose} aria-label="Fermer le menu" className="-mr-2 flex h-11 w-11 cursor-pointer items-center justify-center text-bordeaux-900">
                <X className="h-5 w-5" strokeWidth={1.4} />
              </button>
            </div>
            <ul className="flex-1 overflow-y-auto px-5 py-4">
              {NAV.map((item) => (
                <li key={item.label} className="border-b border-sable/70">
                  {item.mega ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setExpanded((e) => (e === item.mega ? null : item.mega!))}
                        aria-expanded={expanded === item.mega}
                        className="flex min-h-[56px] w-full cursor-pointer items-center justify-between font-serif text-[22px] text-bordeaux-900"
                      >
                        {item.label}
                        <ChevronDown className={cn("h-4 w-4 text-or-700 transition-transform duration-300", expanded === item.mega && "rotate-180")} strokeWidth={1.5} />
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded === item.mega && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: EASE }}
                            className="overflow-hidden pb-3"
                          >
                            {(item.mega === "joaillerie"
                              ? [...CATEGORIES.map((c) => ({ label: c.label, href: `/boutique?categorie=${c.slug}` })), { label: "Toute la joaillerie", href: "/boutique" }]
                              : [...collections.map((c) => ({ label: c.name, href: `/collections/${c.slug}` })), { label: "Toutes les collections", href: "/collections" }]
                            ).map((l) => (
                              <li key={l.href}>
                                <Link href={l.href} className="flex min-h-[44px] items-center text-[14px] text-taupe">
                                  {l.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link href={item.href} className="flex min-h-[56px] items-center font-serif text-[22px] text-bordeaux-900">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="space-y-1 border-t border-sable bg-ivoire px-5 py-5">
              <Link href="/compte" className="flex min-h-[44px] items-center gap-3 text-[12px] font-medium uppercase tracking-[0.18em] text-bordeaux-900">
                <User className="h-4 w-4" strokeWidth={1.4} /> Mon compte
              </Link>
              <Link href="/panier" className="flex min-h-[44px] items-center gap-3 text-[12px] font-medium uppercase tracking-[0.18em] text-bordeaux-900">
                <ShoppingBag className="h-4 w-4" strokeWidth={1.4} /> Mon panier
              </Link>
            </div>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  );
}

const POPULAR = ["Perles", "Or jaune", "Diamant", "Créoles", "Solitaire"];

function SearchOverlay({ open, onClose, collections }: { open: boolean; onClose: () => void; collections: NavCollection[] }) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) window.setTimeout(() => input.current?.focus(), 150);
  }, [open]);

  const go = (q: string) => {
    if (!q.trim()) return;
    router.push(`/boutique?q=${encodeURIComponent(q.trim())}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Recherche">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-bordeaux-950/40" />
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.25 } }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative bg-white"
          >
            <div className="container py-6 md:py-12">
              <div className="flex justify-end">
                <button type="button" onClick={onClose} aria-label="Fermer la recherche" className="-mr-2 flex h-11 w-11 cursor-pointer items-center justify-center text-bordeaux-900">
                  <X className="h-5 w-5" strokeWidth={1.4} />
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  go(value);
                }}
                className="mx-auto mt-2 flex max-w-3xl items-center gap-4 border-b border-bordeaux-900 pb-3"
                role="search"
              >
                <Search className="h-6 w-6 shrink-0 text-or-700" strokeWidth={1.3} />
                <label htmlFor="site-search" className="sr-only">
                  Rechercher un bijou
                </label>
                <input
                  ref={input}
                  id="site-search"
                  type="search"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Rechercher un bijou, une collection…"
                  className="w-full bg-transparent font-serif text-[26px] text-bordeaux-900 placeholder:text-taupe/50 focus:outline-none md:text-[38px]"
                  autoComplete="off"
                />
              </form>
              <div className="mx-auto mt-8 grid max-w-3xl gap-8 pb-4 sm:grid-cols-2">
                <div>
                  <p className="eyebrow mb-4 text-or-700">Recherches populaires</p>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => go(p)}
                        className="min-h-[40px] cursor-pointer border border-sable px-4 text-[13px] text-encre transition-colors hover:border-bordeaux-900"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="eyebrow mb-4 text-or-700">Collections</p>
                  <ul className="space-y-1">
                    {collections.slice(0, 5).map((c) => (
                      <li key={c.slug}>
                        <Link href={`/collections/${c.slug}`} onClick={onClose} className="inline-flex min-h-[36px] items-center font-serif text-lg text-bordeaux-900 hover:text-or-700">
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
