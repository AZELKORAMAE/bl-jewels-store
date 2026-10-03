-- =====================================================================
--  BL JEWELS — Données de démarrage (collections + produits)
--  À exécuter APRÈS schema.sql. Fichier généré par scripts/generate-seed.mjs
-- =====================================================================

insert into public.collections (name, slug, description, image_url, is_featured, sort_order) values
  ('Or Signature', 'or-signature', 'Des lignes pures en or 18 carats, pensées pour être portées chaque jour et transmises toujours.', 'https://images.unsplash.com/photo-1620656798579-1984d9e87df7', true, 1),
  ('Perles de Lune', 'perles-de-lune', 'La douceur nacrée des perles d''eau douce, sublimée par l''or. Une lumière intime et lunaire.', 'https://images.unsplash.com/photo-1763628212781-7d52844cf358', true, 2),
  ('Éclat Éternel', 'eclat-eternel', 'Le diamant dans toute sa splendeur : des créations serties à la main qui capturent la lumière.', 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0', true, 3),
  ('Fiançailles', 'fiancailles', 'L''engagement d''une vie, serti avec la précision et l''émotion de nos ateliers.', 'https://images.unsplash.com/photo-1600143674013-a690b5d25104', true, 4),
  ('Haute Joaillerie', 'haute-joaillerie', 'Pièces d''exception aux pierres rares, nées du savoir-faire le plus rare de la Maison.', 'https://images.unsplash.com/photo-1721103418312-b0057a8c31c2', true, 5)
on conflict (slug) do nothing;

insert into public.products (name, slug, description, details, price, category, material, collection_id, images, stock, is_featured, is_new, created_at) values
  ('Bague Solitaire en Or Jaune', 'bague-solitaire-or-jaune', 'Un diamant taille émeraude élevé sur quatre griffes délicates, comme suspendu dans la lumière. L''essence même de la promesse.', 'Or jaune 18 carats
Diamant taille émeraude 0,50 ct, couleur G, pureté VS1
Largeur de l''anneau : 1,8 mm
Livrée dans l''écrin bordeaux BL Jewels avec certificat', 18900, 'bagues', 'Or jaune 18 carats, diamant 0,50 ct', (select id from public.collections where slug = 'fiancailles'), array['https://images.unsplash.com/photo-1598560917807-1bae44bd2be8', 'https://images.unsplash.com/photo-1600143674013-a690b5d25104']::text[], 8, true, false, now() - interval '45 days'),
  ('Bague Saphir Rose & Halo de Diamants', 'bague-saphir-rose-halo', 'Un saphir rose coussin enveloppé d''un halo de diamants : une pièce rare, à la fois romantique et audacieuse.', 'Or rose 18 carats
Saphir rose taille coussin 1,20 ct
Pavage de diamants 0,35 ct
Pièce numérotée', 24500, 'bagues', 'Or rose 18 carats, saphir rose, diamants', (select id from public.collections where slug = 'haute-joaillerie'), array['https://images.unsplash.com/photo-1603561591411-07134e71a2a9', 'https://images.unsplash.com/photo-1625516152414-8f33eef3d660']::text[], 3, true, true, now() - interval '1 days'),
  ('Bague Ovale en Or Rose', 'bague-ovale-or-rose', 'La taille ovale allonge la main avec grâce. Un anneau fin d''or rose pour une élégance tout en retenue.', 'Or rose 18 carats
Diamant taille ovale 0,40 ct
Monture quatre griffes
Gravure offerte', 15800, 'bagues', 'Or rose 18 carats, diamant ovale', (select id from public.collections where slug = 'fiancailles'), array['https://images.unsplash.com/photo-1499899833954-5ecd9439d17f', 'https://images.unsplash.com/photo-1588814096146-e7c56156f9f8']::text[], 6, false, false, now() - interval '43 days'),
  ('Bague Coussin Pavée', 'bague-coussin-pavee', 'Une constellation de diamants baguettes et brillants réunis en coussin, pour un éclat architectural.', 'Or blanc 18 carats
Diamants baguettes et brillants 0,85 ct au total
Sertissage à la main
Livrée avec certificat', 21000, 'bagues', 'Or blanc 18 carats, diamants', (select id from public.collections where slug = 'eclat-eternel'), array['https://images.unsplash.com/photo-1586104195538-050b9f74f58e']::text[], 4, false, false, now() - interval '42 days'),
  ('Bague Entrelacs de Diamants', 'bague-entrelacs-diamants', 'Deux rangs pavés qui se croisent et s''enlacent : le symbole de deux destins réunis.', 'Or blanc 18 carats
Diamants brillants 0,42 ct
Largeur : 6 mm', 9800, 'bagues', 'Or blanc 18 carats, diamants', (select id from public.collections where slug = 'eclat-eternel'), array['https://images.unsplash.com/photo-1589674781759-c21c37956a44']::text[], 10, false, true, now() - interval '4 days'),
  ('Trio de Bagues Cœur', 'trio-bagues-coeur', 'Trois anneaux texturés à porter ensemble ou séparément, dont un cœur pavé de diamants.', 'Or jaune 18 carats
Diamants 0,18 ct
Set de trois anneaux empilables', 7400, 'bagues', 'Or jaune 18 carats, diamants', (select id from public.collections where slug = 'or-signature'), array['https://images.unsplash.com/photo-1543294001-f7cd5d7fb516', 'https://images.unsplash.com/photo-1633934542430-0905ccb5f050']::text[], 12, true, false, now() - interval '40 days'),
  ('Bague Halo Rosée', 'bague-halo-rosee', 'Un diamant central auréolé d''or rose et de diamants, sur un anneau fendu d''une grande finesse.', 'Or blanc et or rose 18 carats
Diamant central 0,45 ct
Halo et anneau pavés 0,30 ct', 16500, 'bagues', 'Or blanc et or rose 18 carats, diamants', (select id from public.collections where slug = 'fiancailles'), array['https://images.unsplash.com/photo-1605100804763-247f67b3557e', 'https://images.unsplash.com/photo-1512163143273-bde0e3cc7407']::text[], 5, false, false, now() - interval '39 days'),
  ('Bague Poire Diamant', 'bague-poire-diamant', 'La taille poire, une larme de lumière, entourée d''un halo et portée par un anneau perlé.', 'Platine 950
Diamant taille poire 0,60 ct
Halo de diamants 0,25 ct', 19900, 'bagues', 'Platine, diamants', (select id from public.collections where slug = 'eclat-eternel'), array['https://images.unsplash.com/photo-1605100804567-1ffe942b5cd6']::text[], 4, false, false, now() - interval '38 days'),
  ('Boucles d''Oreilles Goutte en Or', 'boucles-goutte-or', 'Une goutte d''or poli, sculpturale et lumineuse, qui épouse le lobe avec légèreté.', 'Or jaune 18 carats poli miroir
Hauteur : 2,2 cm
Fermoir poussette sécurisé', 4900, 'boucles-oreilles', 'Or jaune 18 carats', (select id from public.collections where slug = 'or-signature'), array['https://images.unsplash.com/photo-1727990865600-91f8cb8b0168', 'https://images.unsplash.com/photo-1770721478216-3e5dbbe8dcc2']::text[], 15, true, true, now() - interval '1 days'),
  ('Boucles d''Oreilles Fleur en Or Rose', 'boucles-fleur-or-rose', 'Une fleur ciselée en or rose qui danse au moindre mouvement. Délicate et solaire.', 'Or rose 18 carats
Crochets fins
Hauteur : 2,8 cm', 3600, 'boucles-oreilles', 'Or rose 18 carats', (select id from public.collections where slug = 'or-signature'), array['https://images.unsplash.com/photo-1701777892740-88419a701472', 'https://images.unsplash.com/photo-1622584940190-0cedd29ebaa8']::text[], 14, false, false, now() - interval '36 days'),
  ('Puces Perles de Lune', 'puces-perles-de-lune', 'L''intemporel absolu : deux perles d''eau douce au lustre profond, montées sur or blanc.', 'Perles d''eau douce 7–7,5 mm
Or blanc 18 carats
Lustre AAA', 2400, 'boucles-oreilles', 'Or blanc 18 carats, perles d''eau douce', (select id from public.collections where slug = 'perles-de-lune'), array['https://images.unsplash.com/photo-1623303179820-de8ec58b03dc', 'https://images.unsplash.com/photo-1590166223826-12dee1677420']::text[], 20, true, false, now() - interval '35 days'),
  ('Puces Perles & Or Jaune', 'puces-perles-or', 'Une perle baroque posée sur une fine tige d''or jaune, pour un éclat chaleureux et moderne.', 'Perles d''eau douce 8 mm
Or jaune 18 carats
Fermoir poussette', 2900, 'boucles-oreilles', 'Or jaune 18 carats, perles d''eau douce', (select id from public.collections where slug = 'perles-de-lune'), array['https://images.unsplash.com/photo-1682822749969-61a63203c501', 'https://images.unsplash.com/photo-1763628212781-7d52844cf358']::text[], 18, false, true, now() - interval '4 days'),
  ('Créoles Torsadées en Or', 'creoles-torsadees-or', 'Des créoles généreuses à la torsade marquée, qui jouent avec l''ombre et la lumière.', 'Or jaune 18 carats
Diamètre : 2 cm
Fermoir clip', 5200, 'boucles-oreilles', 'Or jaune 18 carats', (select id from public.collections where slug = 'or-signature'), array['https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0', 'https://images.unsplash.com/photo-1617038220319-276d3cfab638']::text[], 11, true, false, now() - interval '33 days'),
  ('Créoles Perles Géométriques', 'creoles-perles-geometriques', 'Un carré et une étoile ornés de perles : une paire asymétrique, ludique et précieuse.', 'Or jaune 18 carats
Perles de culture 3 mm
Paire asymétrique', 3300, 'boucles-oreilles', 'Or jaune 18 carats, perles', (select id from public.collections where slug = 'perles-de-lune'), array['https://images.unsplash.com/photo-1583167616102-d8d4b7d02c6c']::text[], 9, false, false, now() - interval '32 days'),
  ('Chaîne Maille Torsadée en Or', 'chaine-maille-or', 'Une maille torsadée aux reflets liquides, à porter seule ou superposée.', 'Or jaune 18 carats
Longueur : 45 cm, anneau de réglage à 42 cm
Fermoir mousqueton', 6800, 'colliers', 'Or jaune 18 carats', (select id from public.collections where slug = 'or-signature'), array['https://images.unsplash.com/photo-1611107683227-e9060eccd846', 'https://images.unsplash.com/photo-1620656798579-1984d9e87df7']::text[], 10, true, false, now() - interval '31 days'),
  ('Collier de Perles Classique', 'collier-perles-classique', 'Un rang de perles parfaitement assorties, noué à la main perle après perle. Un classique pour toujours.', 'Perles d''eau douce 7–8 mm
Fermoir en or blanc 18 carats serti d''un diamant
Longueur : 42 cm
Nouage à la main', 8900, 'colliers', 'Perles d''eau douce, or blanc 18 carats', (select id from public.collections where slug = 'perles-de-lune'), array['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338', 'https://images.unsplash.com/photo-1613315986155-820432757035']::text[], 6, true, false, now() - interval '30 days'),
  ('Pendentif Perle Solitaire', 'pendentif-perle-solitaire', 'Une perle unique, suspendue à une chaîne d''une grande finesse. La pureté à l''état brut.', 'Perle des mers du Sud 10 mm
Chaîne en or blanc 18 carats, 42 cm', 3900, 'colliers', 'Or blanc 18 carats, perle des mers du Sud', (select id from public.collections where slug = 'perles-de-lune'), array['https://images.unsplash.com/photo-1682629846138-7db022565bd5', 'https://images.unsplash.com/photo-1611652022419-a9419f74343d']::text[], 12, false, true, now() - interval '2 days'),
  ('Rivière de Diamants', 'riviere-de-diamants', 'Une cascade de diamants taillés poire et brillant, véritable chef-d''œuvre de nos ateliers.', 'Or blanc 18 carats
Diamants 12,40 ct au total
Pièce unique, réalisée en 320 heures', 89000, 'colliers', 'Or blanc 18 carats, diamants', (select id from public.collections where slug = 'haute-joaillerie'), array['https://images.unsplash.com/photo-1744369382892-eb5b6a2fdc6f']::text[], 1, true, false, now() - interval '28 days'),
  ('Collier Rubis & Perles', 'collier-rubis-perles', 'Héritage et grandeur : une parure d''or ciselé, ponctuée de rubis et frangée de perles.', 'Or jaune 22 carats
Rubis, diamants et perles de culture
Fermoir à crochet ciselé', 45000, 'colliers', 'Or jaune 22 carats, rubis, perles, diamants', (select id from public.collections where slug = 'haute-joaillerie'), array['https://images.unsplash.com/photo-1721103418312-b0057a8c31c2', 'https://images.unsplash.com/photo-1694062045776-f48d9b6de57e']::text[], 2, false, true, now() - interval '4 days'),
  ('Pendentif Diamant Couronné de Perles', 'pendentif-diamant-perles', 'Un diamant solitaire dans un médaillon d''or, couronné d''un cercle de perles nacrées.', 'Or jaune 18 carats
Diamant 0,30 ct
Perles de culture 2 mm
Chaîne 45 cm', 12900, 'colliers', 'Or jaune 18 carats, diamant, perles', (select id from public.collections where slug = 'eclat-eternel'), array['https://images.unsplash.com/photo-1640083239745-9bbd77a2097f', 'https://images.unsplash.com/photo-1585960622850-ed33c41d6418']::text[], 7, false, false, now() - interval '26 days'),
  ('Jonc Diamants en Or', 'jonc-diamants-or', 'Un jonc ouvert, souligné d''une ligne de diamants : la quintessence du chic quotidien.', 'Or jaune 18 carats
Diamants 0,55 ct
Tour de poignet : 16,5 cm', 12500, 'bracelets', 'Or jaune 18 carats, diamants', (select id from public.collections where slug = 'eclat-eternel'), array['https://images.unsplash.com/photo-1655707063513-a08dad26440e', 'https://images.unsplash.com/photo-1619893454156-26a705ac9eb5']::text[], 7, true, true, now() - interval '6 days'),
  ('Bracelet Chaîne en Or Rose', 'bracelet-chaine-or-rose', 'Une chaîne aérienne ponctuée d''un motif serti, pour une touche de lumière au poignet.', 'Or rose 18 carats
Diamants 0,08 ct
Longueur ajustable 16–18 cm', 4200, 'bracelets', 'Or rose 18 carats, diamants', (select id from public.collections where slug = 'or-signature'), array['https://images.unsplash.com/photo-1689397136362-dce64e557fcc', 'https://images.unsplash.com/photo-1633810543462-77c4a3b13f07']::text[], 16, false, false, now() - interval '24 days'),
  ('Bracelet Serpent de Diamants', 'bracelet-serpent-diamants', 'Un serpent souple qui s''enroule autour du poignet, entièrement pavé de diamants.', 'Or blanc 18 carats
Diamants 6,20 ct au total
Structure articulée', 38000, 'bracelets', 'Or blanc 18 carats, diamants', (select id from public.collections where slug = 'haute-joaillerie'), array['https://images.unsplash.com/photo-1639065643006-e217c4fee12e']::text[], 2, false, false, now() - interval '23 days'),
  ('Bracelet Rivière de Diamants', 'bracelet-riviere-diamants', 'Des maillons ajourés sertis de diamants, pour un poignet constellé de lumière.', 'Or blanc 18 carats
Diamants 3,10 ct
Fermoir à double sécurité', 27500, 'bracelets', 'Or blanc 18 carats, diamants', (select id from public.collections where slug = 'eclat-eternel'), array['https://images.unsplash.com/photo-1573408301185-9146fe634ad0']::text[], 3, false, false, now() - interval '22 days'),
  ('Bracelet Maillons en Or', 'bracelet-maillons-or', 'Des maillons ovales, polis à la main, avec un pendentif cœur à graver.', 'Or jaune 18 carats
Longueur : 17 cm
Gravure offerte sur le cœur', 5600, 'bracelets', 'Or jaune 18 carats', (select id from public.collections where slug = 'or-signature'), array['https://images.unsplash.com/photo-1633810543462-77c4a3b13f07', 'https://images.unsplash.com/photo-1623321673989-830eff0fd59f']::text[], 13, false, false, now() - interval '21 days')
on conflict (slug) do nothing;
