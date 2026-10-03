# BL Jewels — Maison de Joaillerie

Boutique de bijoux en ligne inspirée de Tiffany.com, aux couleurs de la Maison : bordeaux profond (#2C0001) et or (#BB8656).

**Stack :** Next.js 15 (App Router) · Tailwind CSS · Framer Motion · Supabase (base de données, authentification, stockage, temps réel) · Vercel.

## Pages

| URL | Contenu |
|---|---|
| `/` | Accueil : hero animé, incontournables, catégories, éditorial, nouveautés, collections, écrin, services |
| `/boutique` | Catalogue avec filtres (catégorie), tri, recherche (`?q=`) et cadeaux (`?prix=cadeaux`) |
| `/collections`, `/collections/[slug]` | Collections |
| `/produit/[slug]` | Fiche produit : galerie avec zoom, ajout au panier, détails |
| `/panier` | Panier + informations de l'acheteur + paiement à la livraison |
| `/commande/[id]` | Confirmation de commande |
| `/inscription`, `/connexion`, `/compte` | Comptes clients et suivi des commandes |
| `/maison` | Histoire et services |
| `/admin` | Tableau de bord : revenus, commandes, meilleures ventes, stock faible |
| `/admin/commandes` | Suivi et changement de statut des commandes |
| `/admin/produits` | Ajout et modification des produits, avec téléversement d'images |
| `/admin/collections` | Ajout et modification des collections, avec image |
| `/admin/clients` | Clients et abonnés à la newsletter |
| `/admin/notifications` | Alertes de nouvelles commandes (en temps réel, avec son et notification du navigateur) |

> Tant que Supabase n'est pas configuré, la vitrine fonctionne en **mode démo** avec `data/catalog.json`.

## Installation (une seule fois)

### 1. Créer la base Supabase (gratuite)
1. Créez un projet sur [supabase.com](https://supabase.com).
2. Dans **SQL Editor**, exécutez le contenu de `supabase/schema.sql`, puis celui de `supabase/seed.sql` (le catalogue de démarrage).
3. Dans **Project Settings → API**, copiez l'URL du projet, la clé `anon` et la clé `service_role`.

### 2. Configurer le projet en local
Complétez `.env.local` (déjà créé, jamais publié) :
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```
Puis :
```bash
npm install
npm run create-admin   # crée le compte admin bl.jewels.store@gmail.com
npm run dev            # http://localhost:3000
```
Espace admin : `http://localhost:3000/admin`

### 3. Authentification Supabase
Dans **Authentication → URL Configuration** :
- **Site URL** : l'adresse de votre site (par ex. `https://bljewels.vercel.app`)
- **Redirect URLs** : ajoutez `https://votre-domaine/auth/callback` et `http://localhost:3000/auth/callback`

Le service d'e-mail gratuit de Supabase n'envoie que quelques e-mails par heure. Pour l'inscription des clients, branchez un SMTP (Authentication → SMTP), ou désactivez « Confirm email ».

### 4. Déployer sur Vercel
1. Publiez le dossier sur GitHub, puis importez le dépôt sur [vercel.com/new](https://vercel.com/new).
2. Ajoutez ces variables d'environnement : `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL` (l'URL Vercel) et `NEXT_PUBLIC_CURRENCY` (`MAD` par défaut).
   La clé `service_role` et le mot de passe admin **ne doivent pas** être ajoutés sur Vercel.
3. Lancez le déploiement.

## Sécurité
- Les prix et le stock sont recalculés côté base (`place_order`) : un client ne peut pas modifier le montant de sa commande.
- Row Level Security sur toutes les tables : seul le compte admin peut gérer le catalogue, les commandes et les notifications.
- Le compte `bl.jewels.store@gmail.com` reçoit automatiquement le rôle admin.
- Changez le mot de passe admin après le premier déploiement : modifiez `ADMIN_PASSWORD` dans `.env.local`, puis relancez `npm run create-admin`.

## Personnalisation
- **Couleurs** : `tailwind.config.ts` (`bordeaux`, `or`).
- **Visuels éditoriaux** (hero, écrin…) et **réseaux sociaux** : `lib/constants.ts`.
- **Devise** : `NEXT_PUBLIC_CURRENCY`.
- Les photos de démonstration proviennent d'Unsplash (licence libre). Remplacez-les par vos propres photos depuis l'admin.
