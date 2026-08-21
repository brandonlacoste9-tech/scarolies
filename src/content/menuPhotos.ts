const itemPhoto: Record<string, string> = {
  'carre-d-agneau': '/menu/lamb.jpg',
  'calamari-fritti': '/menu/calamari.jpg',
  'saumon-et-crevettes-style-langoustines': '/menu/salmon.jpg',
  'spaghetti-cacciatore': '/menu/chicken.jpg',
  'lunch-spaghetti-cacciatore': '/menu/chicken.jpg',
  'family-2-cacciatore-au-poulet-casserole': '/menu/chicken.jpg',
  'rotolo-alla-milanese': '/menu/rotolo.jpg',
  'linguini-con-gamberetti-alla-brandy-rosa': '/menu/lobster.jpg',
  'capelli-di-angelo-gamberi-funghi': '/menu/lobster.jpg',
  'ravioli-of-aragosta': '/gallery/13.jpg',
  'linguini-pescatore': '/gallery/12.jpg',
  'bistecca-di-rib': '/menu/rib.jpg',
  'insalata-mediterranea': '/menu/mediterranea.jpg',
};

export function photoForItem(itemId: string, _sectionId?: string): string | undefined {
  return itemPhoto[itemId];
}

export function photoForSection(_sectionId: string): string {
  return '/hero.jpg';
}
