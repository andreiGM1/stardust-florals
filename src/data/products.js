/**
 * Catalog de Produse și Date Stardust Florals™
 */

export const PRODUCTS = [
  {
    id: 'signature-dual-noir-rouge',
    name: 'Buchet Signature Dual Noir & Rouge (Ediție Atelier)',
    rosesCount: 15,
    price: 269,
    oldPrice: 340,
    badge: 'CREAȚIE EXCLUSIVĂ ATELIER',
    isBestseller: true,
    image: '/images/buchet-dual-noir-rouge-hero.webp',
    gallery: [
      '/images/buchet-dual-noir-rouge-hero.webp',
      '/images/buchet-dual-noir-rouge-angle.webp',
      '/images/buchet-dual-noir-rouge-closeup.webp',
      '/images/buchet-dual-noir-rouge-overhead.webp'
    ],
    description: 'Creația originală din atelierul nostru: trandafiri negri cu praf galactic pe contur și trandafiri roșu rubiniu în mijloc, infuzați cu pulbere de diamant cosmetic, gypsophila diafană și ambalaj de lux.',
    features: ['Design bicolor iconic (Negru contur + Roșu centru)', 'Diamant cosmetic ecologic fără cădere', 'Ghirlandă micro-LED caldă inclusă', 'Felicitare QR video pe carton satinat inclusă']
  },
  {
    id: 'regal-glamour',
    name: 'Buchet Regal Glamour (19 Trandafiri)',
    rosesCount: 19,
    price: 249,
    oldPrice: 320,
    badge: 'BESTSELLER TIKTOK',
    isBestseller: true,
    image: '/images/buchet-dual-noir-rouge-angle.webp',
    description: '19 Trandafiri imperiali în aranjament spectaculos, strălucire holografică în lumină și cutie elegantă cu panglică de mătase.',
    features: ['19 Trandafiri de lux', 'Efect holografic intens', 'Ghirlandă LED 3 funcții', 'Felicitare QR video VIP']
  },
  {
    id: 'petite-sparkle',
    name: 'Buchet Petite Sparkle (9 Trandafiri)',
    rosesCount: 9,
    price: 149,
    oldPrice: 189,
    badge: 'START WOW',
    isBestseller: false,
    image: '/images/buchet-dual-noir-rouge-closeup.webp',
    description: '9 Trandafiri mari de Ecuador finisați manual cu sclipici fin de diamant cosmetic. Include ghirlandă de micro-LED-uri calde și felicitare cu cod QR video.',
    features: ['9 Trandafiri imperiali', 'Ghirlandă LED inclusă', 'Felicitare QR gratuită', 'Livrare în 2-4 ore']
  },
  {
    id: 'cutie-gigant',
    name: 'Cutie Gigant Stardust Luxury (35 Trandafiri)',
    rosesCount: 35,
    price: 399,
    oldPrice: 480,
    badge: 'ULTIMATE WOW',
    isBestseller: false,
    image: '/images/buchet-dual-noir-rouge-overhead.webp',
    description: '35 Trandafiri bogați într-o cutie rotundă din catifea neagră sau roz pastel. Punctul culminant al oricărei aniversări sau cereri în căsătorie.',
    features: ['35 Trandafiri bogați', 'Cutie catifea premium', 'Iluminare perimetrală LED', 'Cod QR video gravat']
  },
  {
    id: 'cutie-inima-velvet',
    name: 'Inimă Catifea Midnight Sparkle',
    rosesCount: 25,
    price: 349,
    oldPrice: 420,
    badge: 'ROMANTIC VIP',
    isBestseller: false,
    image: '/images/buchet-dual-noir-rouge-detaliu.webp',
    description: 'Cutie în formă de inimă umplută cu 25 de trandafiri roșii sau negri cu praf de stele argintiu. O declarație copleșitoare de dragoste.',
    features: ['25 Trandafiri în inimă', 'Cutie catifea regală', 'Micro-LED ascuns', 'Cod QR video personalizat']
  },
  {
    id: 'imperial-101',
    name: 'Buchet Imperial Grand 101 Trandafiri',
    rosesCount: 101,
    price: 999,
    oldPrice: 1250,
    badge: 'SUPREMAȚIE PURĂ',
    isBestseller: false,
    image: '/images/buchet-dual-noir-rouge-showcase.webp',
    description: '101 Trandafiri uriași acoperiți cu diamant cosmetic fin. Un spectacol vizual absolut ce oprește respirația la deschiderea ușii.',
    features: ['101 Trandafiri selectați manual', 'Ambalaj gigant regal', 'Dublă ghirlandă LED', 'Livrare VIP asigurată']
  }
];

export const REAL_PORTFOLIO_GALLERY = [
  {
    id: 'hero-shot',
    title: 'Buchetul Bicolor: Negru pe Margine & Roșu în Mijloc',
    caption: 'Vedere de sus ce evidențiază contrastul dramatic dintre negrul cosmic și roșul diamant',
    image: '/images/buchet-dual-noir-rouge-hero.webp',
    tag: 'FOTO REALĂ ATELIER'
  },
  {
    id: 'angle-shot',
    title: 'Ambalaj Artistic & Formă Ergonomică',
    caption: 'Hârtie de mătase texturată în tonuri calde, aranjată în falduri arhitecturale',
    image: '/images/buchet-dual-noir-rouge-angle.webp',
    tag: 'DETALIU FINISARE'
  },
  {
    id: 'macro-shot',
    title: 'Macro: Textura Pulberii de Diamant Cosmetic',
    caption: 'Fiecare petală captează reflexiile luminii asemenea diamantelor veritabile',
    image: '/images/buchet-dual-noir-rouge-closeup.webp',
    tag: 'MACRO GLITTER'
  },
  {
    id: 'lifestyle-boy',
    title: 'Emoția Predării: Livrare în Timp Real',
    caption: 'Cadoul în drum spre persoana iubită — buchetul dual și ursulețul de pluș cadou',
    image: '/images/client-surpriza-metrou-lifestyle.webp',
    tag: 'MOMENT REAL LIVRARE'
  },
  {
    id: 'portrait-shot',
    title: 'Portret Complet cu Buchetul și Cadoul Surpriză',
    caption: 'Pregătit pentru cel mai frumos „Te iubesc”',
    image: '/images/client-livrare-metrou-cadou.webp',
    tag: 'EXPERIENȚĂ CLIENȚI'
  },
  {
    id: 'overhead-full',
    title: 'Simetrie Florală & Verdeață Exotică',
    caption: 'Flori de gypsophila albă și frunze de palmier pentru un volum aerat și modern',
    image: '/images/buchet-dual-noir-rouge-overhead.webp',
    tag: 'ARHITECTURĂ FLORALĂ'
  }
];

export const COLOR_OPTIONS = [
  { id: 'bicolor-noir-rouge', name: 'Signature Dual (Negru contur + Roșu centru)', hex: '#881337' },
  { id: 'rosu-pasiune', name: 'Roșu Pasiune + Diamant Auriu', hex: '#b91c1c' },
  { id: 'negru-galactic', name: 'Negru Misterios + Praf Galactic Argintiu', hex: '#18181b' },
  { id: 'roz-pudrat', name: 'Roz Pudrat + Sclipici Argintiu', hex: '#f472b6' },
  { id: 'alb-perlat', name: 'Alb Perlat + Cristal Shimmer', hex: '#f4f4f5' },
  { id: 'auriu-luxury', name: 'Auriu Sampanie + Sparkle Glam', hex: '#d97706' }
];

export const ADDONS = [
  { id: 'floare-mecatronica-puls-cardiac', name: 'Trandafir Mecatronic cu Petale Motorizate & Puls Cardiac Sincronizat', price: 95, isFeatured: true, isMechatronicRoseCustom: true },
  { id: 'pandantiv-capsula-diamant-cosmic', name: 'Pandantiv Secret cu Capsulă de Pulbere de Diamant Cosmic & Mesaj Micro-Gravat', price: 69, isFeatured: true, isCosmicLocketCustom: true },
  { id: 'efect-fum-cascada-dry-ice', name: 'Efect Teatral „Smoke & Dry Ice Cascade” — Vapori Reci Aromatizați la Deschidere', price: 59, isFeatured: true, isSmokeCascadeCustom: true },
  { id: 'cutie-secret-sertar-glisant', name: 'Cutie Secretă Tezaur cu Sertar Glisant Catifelat & Compartiment Bijuterie VIP', price: 49, isFeatured: true, isSecretDrawerCustom: true },
  { id: 'felicitare-holografica-3d', name: 'Felicitare Holografică 3D cu Folie Lenticulară & Efect de Diamant Plutitor', price: 35, isFeatured: true, isHoloCardCustom: true },
  { id: 'medalion-ceramic-parfum', name: 'Medalion Ceramic Difuzor de Parfum 30 Zile (Baza Cutiei de Catifea)', price: 39, isFeatured: true, isAromaMedallionCustom: true },
  { id: 'kit-ingrijire-longevitate', name: 'Kit VIP Nutrienți & Îngrijire Longevitate 14+ Zile (Plicuri Chrysal + Ghid Elena)', price: 29, isFeatured: true, isCareKitCustom: true },
  { id: 'gravura-laser-petala', name: 'Gravură Micro-Laser pe Petală Naturală Stabilizată (Monogramă / Mesaj Secret)', price: 49, isFeatured: true, isLaserPetalCustom: true },
  { id: 'royal-unboxing-experience', name: 'Experiență Regală de Despachetare: Seif Termo-Protejat, Sigiliu Ceară & Mătase Imperială', price: 35, isFeatured: true, isUnboxingCustom: true },
  { id: 'cutie-muzicala-mecanica', name: 'Cutie Muzicală Mecanică Vintage în Baza Aranjamentului (Cilindru Alamă 24K)', price: 85, isFeatured: true, isMusicBoxCustom: true },
  { id: 'pachet-gourmet-moet-capsuni', name: 'Pachet Gourmet: Moët & Chandon + Căpșuni Belgiane cu Foiță de Aur 24K', price: 400, isFeatured: true, isGourmetCustom: true },
  { id: 'gravura-audio-spectrograma', name: 'Gravură Audio Regală: Spectrogramă Aurie Tipărită + Cod QR Mesaj Vocal', price: 39, isFeatured: true, isAudioCustom: true },
  { id: 'felicitare-popup-3d-petale', name: 'Felicitare Pop-Up 3D: Sculptură Tridimensională cu Petale Plutitoare & Plic Sigilat', price: 29, isFeatured: true, isPopUpCustom: true },
  { id: 'cutie-catifea-gravata', name: 'Cutie Regală de Catifea cu Plăcuță Metalică Gravată Laser', price: 49, isFeatured: true },
  { id: 'panglica-caligrafica', name: 'Panglică Satinată Personalizată Caligrafiată Auriu', price: 25, isFeatured: true },
  { id: 'ursulet-plus', name: 'Ursuleț de Pluș Pufos (așa cum se vede în pozele din metrou)', price: 45 },
  { id: 'ferrero', name: 'Cutie Praline Ferrero Rocher (16 buc)', price: 35 },
  { id: 'balon-heliu', name: 'Balon Inimă Mare cu Heliu „Te Iubesc”', price: 25 },
  { id: 'spray-glitter', name: 'Spray Extra-Glitter Parfumat Stardust', price: 29 }
];

export const REVIEWS = [
  {
    id: 1,
    author: 'Andrei V.',
    city: 'București (Metrou Pipera)',
    rating: 5,
    date: 'Ieri',
    verified: true,
    hasPhoto: true,
    photoUrl: '/images/client-surpriza-metrou-lifestyle.webp',
    hasTeddy: true,
    isBicolor: true,
    text: 'Am comandat buchetul bicolor cu negru pe margine și roșu în mijloc + ursulețul de pluș! În metrou toată lumea se uita la cum strălucesc florile în lumină. Reacția iubitei mele a fost de nedescris, a plâns de fericire!',
    bouquet: 'Buchet Signature Dual Noir & Rouge'
  },
  {
    id: 2,
    author: 'Cristian & Elena',
    city: 'București (Aurel Vlaicu)',
    rating: 5,
    date: 'Acum 2 zile',
    verified: true,
    hasPhoto: true,
    photoUrl: '/images/client-livrare-metrou-cadou.webp',
    hasTeddy: true,
    isBicolor: true,
    text: 'Combo-ul perfect: buchetul bicolor gigantic și ursulețul cadou. Am fost impresionat de atenția la detalii și hârtia mată neagră cu sigiliu de ceară.',
    bouquet: 'Buchet Signature Dual Noir & Rouge'
  },
  {
    id: 3,
    author: 'Andreea M.',
    city: 'București (Sector 1)',
    rating: 5,
    date: 'Acum 3 zile',
    verified: true,
    hasPhoto: true,
    photoUrl: '/images/buchet-dual-noir-rouge-angle.webp',
    hasTeddy: false,
    isBicolor: true,
    text: 'A fost cel mai frumos cadou pe care l-am primit vreodată! Când am stins lumina și am aprins ghirlanda LED, străluceau incredibil. Iar videoclipul din codul QR m-a făcut să plâng de emoție.',
    bouquet: 'Buchet Signature Dual Noir & Rouge'
  },
  {
    id: 4,
    author: 'Marius T.',
    city: 'Cluj-Napoca',
    rating: 5,
    date: 'Acum 4 zile',
    verified: true,
    hasPhoto: false,
    photoUrl: null,
    hasTeddy: false,
    isBicolor: false,
    text: 'Am comandat pentru logodnica mea de aniversare. A fost șocată de calitatea trandafirilor și sclipiciul chiar nu cade pe haine deloc! Serviciul clienți pe WhatsApp a răspuns în 2 minute.',
    bouquet: 'Buchet Regal Glamour (19 Trandafiri)'
  },
  {
    id: 5,
    author: 'Diana & Radu',
    city: 'Timișoara',
    rating: 5,
    date: 'Acum 5 zile',
    verified: true,
    hasPhoto: true,
    photoUrl: '/images/buchet-dual-noir-rouge-closeup.webp',
    hasTeddy: false,
    isBicolor: true,
    text: 'Textura petalelor este hipnotizantă. Sclipiciul diamant are o strălucire fină și elegantă, nu este deloc kitsch. Florile au rezistat 11 zile în vază impecabile!',
    bouquet: 'Buchet Signature Dual Noir & Rouge'
  },
  {
    id: 6,
    author: 'Bogdan P.',
    city: 'Iași',
    rating: 5,
    date: 'Acum 6 zile',
    verified: true,
    hasPhoto: true,
    photoUrl: '/images/buchet-dual-noir-rouge-portret.webp',
    hasTeddy: true,
    isBicolor: true,
    text: 'Am vrut ceva unic pentru cererea în căsătorie. Toate prietenele ei au rămas fără cuvinte când au văzut pozele pe Instagram. A zis DA imediat! Mulțumesc Stardust!',
    bouquet: 'Buchet Signature Dual Noir & Rouge'
  }
];

export const FAQS = [
  {
    q: 'Cât timp rezistă trandafirii cu sclipici?',
    a: 'Trandafirii noștri sunt proaspeți de Ecuador, de calitate floristică superioară. Formula noastră Stardust Mist™ nu obturează hidratarea petalelor, astfel încât buchetul rezistă proaspăt între 7 și 10 zile în apă curată.'
  },
  {
    q: 'Este sclipiciul toxic pentru oameni sau animale?',
    a: 'Categoric nu. Folosim pulbere de diamant cosmetic biodegradabilă și non-toxică, sigură la atingere și mirosit.'
  },
  {
    q: 'Cum funcționează felicitarea cu cod QR video?',
    a: 'La plasarea comenzii introduci linkul video (de pe TikTok, YouTube, Instagram Reels, Google Drive) sau mesajul tău text. Noi generăm un cod QR pe o felicitare de lux din carton texturat cu sigiliu Stardust. Destinatarul deschide camera telefonului și vede instant videoclipul tău dedicat.'
  },
  {
    q: 'Cum se face livrarea și în cât timp ajunge?',
    a: 'În București și Ilfov livrăm prin curieri proprii în 2-4 ore sau la data și ora alese de tine. În restul țării livrăm prin curierat rapid securizat cu protecție termică în 24 de ore.'
  },
  {
    q: 'Pot trimite comanda anonim / surpriză?',
    a: 'Da! În formularul de finalizare poți bifa „Livrare Surpriză Secretă”. Nu vom menționa numele tău curierului sau destinatarului până când persoana nu citește felicitarea.'
  }
];
