import { bookUrl, house, locations, menu } from '@/content/house';
import type { Locale } from '@/i18n/routing';

type MenuSection = (typeof menu)[number];
type MenuItem = MenuSection['items'][number];
type DishHit = { section: MenuSection; item: MenuItem; score: number };

function fold(raw: string): string {
  return raw
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function has(text: string, ...needles: string[]): boolean {
  return needles.some((n) => text.includes(n));
}

function say(locale: Locale, lines: Record<Locale, string>): string {
  return lines[locale];
}

function stopword(w: string): boolean {
  return (
    w.length < 3 ||
    [
      'the',
      'and',
      'with',
      'for',
      'what',
      'you',
      'your',
      'our',
      'have',
      'has',
      'want',
      'like',
      'please',
      'tell',
      'about',
      'some',
      'that',
      'this',
      'from',
      'they',
      'how',
      'much',
      'cost',
      'menu',
      'dish',
      'food',
      'meal',
      'les',
      'des',
      'une',
      'est',
      'pas',
      'vous',
      'nous',
      'avec',
      'pour',
      'quoi',
      'quel',
      'quelle',
      'avez',
      'plat',
      'plats',
      'voir',
      'donne',
      'sais',
      'veux',
      'voudrais',
    ].includes(w)
  );
}

function dishHay(item: MenuItem): string {
  return fold(
    [item.title.en, item.title.fr, 'body' in item && item.body ? `${item.body.en} ${item.body.fr}` : ''].join(' '),
  );
}

function describeDish(item: MenuItem, locale: Locale): string {
  const name = item.title[locale];
  const price = 'price' in item && item.price ? ` ${item.price}` : '';
  const body = 'body' in item && item.body ? ` — ${item.body[locale]}` : '';
  return `${name}${price}${body}`;
}

function findDishes(q: string): DishHit[] {
  const words = q.split(' ').filter((w) => !stopword(w));
  if (!words.length && q.length < 3) return [];
  const hits: DishHit[] = [];
  for (const section of menu) {
    for (const item of section.items) {
      const titles = [fold(item.title.en), fold(item.title.fr)];
      const titleHay = titles.join(' ');
      const hay = `${fold(section.title.en)} ${fold(section.title.fr)} ${dishHay(item)}`;
      let score = 0;
      if (q.length > 3 && titles.some((t) => t === q || t.includes(q))) score += 50;
      if (q.length > 3 && hay.includes(q)) score += 12;
      for (const w of words) {
        if (titles.includes(w)) score += 40;
        else if (titleHay.split(' ').includes(w)) score += 18;
        else if (titleHay.includes(w)) score += 12;
        else if (hay.includes(w)) score += 4;
      }
      if (score > 0) hits.push({ section, item, score });
    }
  }
  return hits.sort((a, b) => b.score - a.score);
}

function menuLink(locale: Locale, hash?: string): ChatLink {
  const href = hash ? `/${locale}/menu#${hash}` : `/${locale}/menu`;
  return { href, label: locale === 'fr' ? 'Menu' : 'Menu' };
}

function taxNote(locale: Locale): string {
  return locale === 'fr' ? 'Taxes en sus. Prix sujets à changement.' : 'Tax extra. Prices may change.';
}

function sectionByNeedle(q: string): MenuSection | undefined {
  const map: { id: MenuSection['id']; keys: string[] }[] = [
    { id: 'pasta', keys: ['pasta', 'pate', 'spaghetti', 'penne', 'fettuccini', 'linguini', 'capelli', 'tortellini', 'gnocchi', 'gnochi', 'ravioli'] },
    { id: 'antipasto', keys: ['antipasto', 'calamari', 'calamar', 'moule', 'mussel', 'cozze', 'appetizer', 'entree'] },
    { id: 'insalata', keys: ['salad', 'salade', 'insalata', 'cesare', 'caesar', 'caprese'] },
    { id: 'pollo', keys: ['veal', 'veau', 'vitello', 'parmegan', 'parmigiano', 'marsala', 'picatta'] },
    { id: 'pizza', keys: ['pizza'] },
    { id: 'griglia', keys: ['grill', 'grillade', 'steak', 'agneau', 'lamb', 'sirloin', 'surlonge', 'rib', 'calabrese'] },
    { id: 'zuppe', keys: ['soup', 'soupe', 'minestrone', 'zuppe'] },
    { id: 'pesce', keys: ['fish', 'poisson', 'salmon', 'saumon', 'shrimp', 'crevette', 'pesce'] },
    { id: 'forno', keys: ['lasagna', 'lasagne', 'manicotti', 'cannelloni', 'rotolo', 'forno', 'baked'] },
    { id: 'lunch', keys: ['lunch', 'midi', 'diner'] },
    { id: 'family', keys: ['family', 'familial', 'emporter', 'takeaway', 'take away'] },
    { id: 'cocktails', keys: ['martini', 'cocktail', 'spritz', 'prosecco', 'drink', 'verre'] },
  ];
  for (const row of map) {
    if (has(q, ...row.keys)) return menu.find((s) => s.id === row.id);
  }
  return undefined;
}

function replySection(section: MenuSection, locale: Locale): ChatReply {
  const empty = { step: 'idle' as const, reason: '', links: [] as ChatLink[] };
  const lines = section.items.slice(0, 6).map((item) => {
    const price = 'price' in item && item.price ? ` ${item.price}` : '';
    return `${item.title[locale]}${price}`;
  });
  const more = section.items.length > 6;
  return {
    ...empty,
    reply: say(locale, {
      en: `${section.title.en}: ${lines.join('; ')}${more ? '…' : ''}. ${taxNote('en')}`,
      fr: `${section.title.fr} : ${lines.join(' ; ')}${more ? '…' : ''}. ${taxNote('fr')}`,
    }),
    links: [menuLink(locale, section.id)],
  };
}

function replyDishes(hits: DishHit[], locale: Locale): ChatReply {
  const empty = { step: 'idle' as const, reason: '', links: [] as ChatLink[] };
  const top = hits.slice(0, 3);
  const text = top.map((h) => describeDish(h.item, locale)).join(' ');
  return {
    ...empty,
    reply: `${text} ${taxNote(locale)}`,
    links: [menuLink(locale, top[0]?.section.id)],
  };
}

export function openingChat(locale: Locale): string {
  return say(locale, {
    en: "Welcome to Scarolie's. I know the card — pasta, grill, pizza, lunch with soup of the day, family plates for four. How can I look after you?",
    fr: "Bonjour — Scarolie's. Je connais la carte : pâtes, grillades, pizza, menu midi avec soupe du jour, repas familial pour quatre. Comment puis-je vous aider ?",
  });
}

export type BookStep = 'idle' | 'reason' | 'attached';
export type ChatLink = { href: string; label: string };
export type ChatReply = { reply: string; step: BookStep; reason: string; links: ChatLink[] };
export type BookState = { step: BookStep; reason: string };

export function emailNote(_text: string) {
  return house.emailHref;
}

export function continueChat(raw: string, locale: Locale, _state?: BookState): ChatReply {
  const q = fold(raw);
  const empty = { step: 'idle' as const, reason: '', links: [] as ChatLink[] };
  const site = locations[0];
  const reserve = bookUrl(locale);

  if (has(q, 'vip', 'newsletter', 'bulletin')) {
    return {
      ...empty,
      reply: say(locale, {
        en: 'Their VIP list is the form on the live site — we do not collect names here. Birthday extras and contests are described there.',
        fr: 'La liste VIP est le formulaire sur leur site actuel — nous ne recueillons pas les noms ici. Les avantages d’anniversaire et les concours y sont décrits.',
      }),
      links: [{ href: locale === 'fr' ? house.vipFr : house.vipEn, label: locale === 'fr' ? 'Liste VIP' : 'VIP list' }],
    };
  }

  if (has(q, 'wine', 'vin', 'carte des vins')) {
    return {
      ...empty,
      reply: say(locale, {
        en: 'The wine list is a PDF on their live site. We do not invent bottle prices here.',
        fr: 'La carte des vins est un PDF sur leur site. Nous n’inventons pas les prix des bouteilles ici.',
      }),
      links: [{ href: house.winePdf, label: locale === 'fr' ? 'PDF vins' : 'Wine PDF' }],
    };
  }

  if (has(q, 'hour', 'open', 'horaire', 'ouvert', 'late', 'tard') && !has(q, 'menu', 'pizza', 'pasta', 'grill')) {
    return {
      ...empty,
      reply: say(locale, {
        en: `${site.visitHours.en} 950 St-Jean Blvd., Pointe-Claire. ${site.phone}.`,
        fr: `${site.visitHours.fr} 950, boul. Saint-Jean, Pointe-Claire. ${site.phone}.`,
      }),
      links: [{ href: site.phoneHref, label: site.phone }],
    };
  }

  if (has(q, 'address', 'adresse', 'where', 'ou etes', 'parking', 'stationnement', 'pointe', 'st jean', 'saint jean')) {
    return {
      ...empty,
      reply: say(locale, {
        en: '950 St-Jean Blvd., Pointe-Claire, QC H9R 5N8. Free parking. Patio. Wheelchair accessible.',
        fr: '950, boul. Saint-Jean, Pointe-Claire, QC H9R 5N8. Stationnement gratuit. Patio. Accessible aux fauteuils.',
      }),
      links: [{ href: site.mapUrl, label: locale === 'fr' ? 'Carte' : 'Map' }],
    };
  }

  if (has(q, 'email', 'courriel', 'yahoo')) {
    return {
      ...empty,
      reply: say(locale, {
        en: 'scarolies@yahoo.ca is on their site. It does not take tables — reserve on TB Dine or call.',
        fr: 'scarolies@yahoo.ca est sur leur site. Il ne prend pas les tables — réservez sur TB Dine ou téléphonez.',
      }),
      links: [
        { href: house.emailHref, label: house.email },
        { href: reserve, label: 'TB Dine' },
      ],
    };
  }

  if (has(q, 'gluten', 'sans gluten')) {
    return {
      ...empty,
      reply: say(locale, {
        en: `Gluten-free penne is a $3.95 extra on the pasta section. ${taxNote('en')}`,
        fr: `Penne sans gluten : 3,95 $ de plus, sur la section pâtes. ${taxNote('fr')}`,
      }),
      links: [menuLink(locale, 'pasta')],
    };
  }

  if (has(q, 'recommend', 'recommande', 'signature', 'popular', 'meilleur', 'favori', 'suggest', 'quoi manger', 'what should')) {
    return {
      ...empty,
      reply: say(locale, {
        en: 'If I may — rack of lamb $48.95, linguini gamberetti brandy rosa $33.95, rotolo alla Milanese $25.25, calamari fritti $23.95. Lunch includes soup of the day. Tax extra.',
        fr: 'Si je peux me permettre — carré d’agneau 48,95 $, linguini gamberetti brandy rosa 33,95 $, rotolo alla Milanese 25,25 $, calamari fritti 23,95 $. Le midi, soupe du jour incluse. Taxes en sus.',
      }),
      links: [menuLink(locale, 'griglia')],
    };
  }

  if (has(q, 'vegetarian', 'vegetarien', 'vegetarienne', 'vegan')) {
    return {
      ...empty,
      reply: say(locale, {
        en: `Napolitana, arrabiata, primavera, aglio e olio, pizza Giardino or Bella, Siciliana salad, grilled portobello. Ask the kitchen about vegan. ${taxNote('en')}`,
        fr: `Napolitana, arrabiata, primavera, aglio e olio, pizza Giardino ou Bella, salade Siciliana, portobello grillé. Demandez à la cuisine pour le végane. ${taxNote('fr')}`,
      }),
      links: [menuLink(locale, 'pasta')],
    };
  }

  const dishHits = findDishes(q).filter((h) => h.score >= 6);
  const namedDish = has(
    q,
    'pasta',
    'pate',
    'pizza',
    'salmon',
    'saumon',
    'steak',
    'agneau',
    'lamb',
    'calamari',
    'calamar',
    'lasagna',
    'lasagne',
    'rotolo',
    'cacciatore',
    'martini',
    'carbonara',
    'alfredo',
    'parmesan',
    'parmegan',
    'parmigiano',
    'shrimp',
    'crevette',
    'veal',
    'veau',
    'burger',
    'family',
    'familial',
  );

  if (namedDish && dishHits.length) {
    return replyDishes(dishHits, locale);
  }

  if (
    has(
      q,
      'menu',
      'carte',
      'eat',
      'manger',
      'dish',
      'plat',
      'food',
      'lunch',
      'midi',
      'dinner',
      'souper',
      'grill',
      'pizza',
      'pasta',
      'dessert',
      'antipasto',
      'cocktail',
    ) &&
    !has(q, 'book', 'table', 'reserve', 'reservation', 'rendez')
  ) {
    const section = sectionByNeedle(q);
    if (section && q !== 'menu' && q !== 'carte') {
      return replySection(section, locale);
    }
    if (dishHits.length && dishHits[0].score >= 8) {
      return replyDishes(dishHits, locale);
    }
    return {
      ...empty,
      reply: say(locale, {
        en: 'The card: pasta, antipasto, salads, chicken and veal, pizza, grill, soup, fish, baked pasta. Lunch includes soup of the day. Family plates for four. $13 martinis. Tax extra.',
        fr: 'La carte : pâtes, antipasto, salades, poulet et veau, pizza, grillades, soupes, poisson, pâtes au four. Le midi, soupe du jour incluse. Repas familial pour quatre. Martinis 13 $. Taxes en sus.',
      }),
      links: [menuLink(locale)],
    };
  }

  if (dishHits.length && dishHits[0].score >= 10) {
    return replyDishes(dishHits, locale);
  }

  if (has(q, 'book', 'table', 'rendez', 'reserve', 'reservation', 'tbdine', 'tb dine')) {
    return {
      ...empty,
      reply: say(locale, {
        en: 'Reserve on TB Dine — that is their live booker — or call (514) 694-8611. Email does not take tables.',
        fr: 'Réservez sur TB Dine — c’est leur outil en ligne — ou au (514) 694-8611. Le courriel ne prend pas les tables.',
      }),
      links: [
        { href: reserve, label: 'TB Dine' },
        { href: site.phoneHref, label: site.phone },
      ],
    };
  }

  if (has(q, 'price', 'prix', 'cost', 'combien')) {
    if (dishHits.length) return replyDishes(dishHits, locale);
    return {
      ...empty,
      reply: say(locale, {
        en: 'Prices are on the menu. Napolitana $21.95, lasagna $25.45, rack of lamb $48.95, family lasagna platter $49.95. Tax extra. Prices may change.',
        fr: 'Les prix sont sur le menu. Napolitana 21,95 $, lasagne 25,45 $, carré d’agneau 48,95 $, lasagne familiale 49,95 $. Taxes en sus. Prix sujets à changement.',
      }),
      links: [menuLink(locale)],
    };
  }

  return {
    ...empty,
    reply: say(locale, {
      en: 'Ask me for a table, hours, or a dish. Reserve on TB Dine or call (514) 694-8611. 950 St-Jean, Pointe-Claire.',
      fr: 'Demandez-moi une table, les heures, ou un plat. Réservez sur TB Dine ou au (514) 694-8611. 950, Saint-Jean, Pointe-Claire.',
    }),
    links: [menuLink(locale), { href: reserve, label: 'TB Dine' }],
  };
}
