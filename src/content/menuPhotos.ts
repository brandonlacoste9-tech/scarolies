const itemPhoto: Record<string, string> = {
  'carre-d-agneau': '/menu/lamb.jpg',
  'bistecca-surlonge-alla-griglia': '/menu/lamb.jpg',
  'bistecca-di-rib': '/menu/lamb.jpg',
  'calamari-fritti': '/menu/calamari.jpg',
  'saumon-et-crevettes-style-langoustines': '/menu/salmon.jpg',
  'filet-de-saumon': '/menu/salmon.jpg',
  'crevettes-alla-griglia': '/menu/salmon.jpg',
  'crevettes-style-langoustines': '/menu/salmon.jpg',
  'lunch-saumon-atlantico': '/menu/salmon.jpg',
  'family-3-filets-de-saumon': '/menu/salmon.jpg',
  'spaghetti-cacciatore': '/menu/chicken.jpg',
  'lunch-spaghetti-cacciatore': '/menu/chicken.jpg',
  'family-2-cacciatore-au-poulet-casserole': '/menu/chicken.jpg',
  'poulet-parmegan': '/menu/chicken.jpg',
  'pollo-calabrese': '/menu/chicken.jpg',
  'lunch-pollo-parmegan': '/menu/chicken.jpg',
  'lunch-pollo-alla-griglia-chipotle': '/menu/chicken.jpg',
  'family-7-assiette-pollo-callabrese': '/menu/chicken.jpg',
  'family-10-pollo-parmiggiano': '/menu/chicken.jpg',
  'rotolo-alla-milanese': '/menu/rotolo.jpg',
  'lasagna-casalinga': '/menu/rotolo.jpg',
  'manicotti': '/menu/rotolo.jpg',
  'cannelloni': '/menu/rotolo.jpg',
  'portafoglio-di-cranchio-e-aragosta': '/menu/rotolo.jpg',
  'lunch-casalinga-lasagna': '/menu/rotolo.jpg',
  'family-1-assiette-de-lasagne': '/menu/rotolo.jpg',
  'linguini-con-gamberetti-alla-brandy-rosa': '/menu/lobster.jpg',
  'ravioli-of-aragosta': '/menu/lobster.jpg',
  'capelli-di-angelo-alla-diablo': '/menu/lobster.jpg',
  'capelli-di-angelo-gamberi-funghi': '/menu/lobster.jpg',
  'linguini-pescatore': '/menu/lobster.jpg',
  'insalata-caprese-di-burrata': '/gallery/15.jpg',
  'insalata-siciliana': '/gallery/15.jpg',
  'insalata-cesare': '/gallery/15.jpg',
  'pizza-americana': '/pasta.jpg',
  'pizza-napolitana': '/pasta.jpg',
  'pizza-paesana': '/pasta.jpg',
  'pizza-bella': '/pasta.jpg',
  'pizza-carbonara': '/pasta.jpg',
  'pizza-giardino': '/pasta.jpg',
  'pizza-amorosa': '/pasta.jpg',
  'pizza-pollo-meditarraneo': '/pasta.jpg',
  'lunch-pizza-americana': '/pasta.jpg',
};

const sectionPhoto: Record<string, string> = {
  pasta: '/pasta.jpg',
  antipasto: '/menu/calamari.jpg',
  insalata: '/gallery/15.jpg',
  pollo: '/menu/chicken.jpg',
  pizza: '/pasta.jpg',
  griglia: '/menu/lamb.jpg',
  zuppe: '/gallery/15.jpg',
  pesce: '/menu/salmon.jpg',
  forno: '/menu/rotolo.jpg',
  lunch: '/pasta.jpg',
  family: '/menu/rotolo.jpg',
  cocktails: '/gallery/5.jpg',
};

export function photoForItem(itemId: string, sectionId?: string): string | undefined {
  return itemPhoto[itemId] ?? (sectionId ? sectionPhoto[sectionId] : undefined);
}

export function photoForSection(sectionId: string): string {
  return sectionPhoto[sectionId] ?? '/hero.jpg';
}
