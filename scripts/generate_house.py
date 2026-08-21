# Generates src/content/house.ts from parsed FR/EN menus.
import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(r"C:\Users\north\scarolies-github")
fr = json.loads((ROOT / "menu-fr.json").read_text(encoding="utf-8"))
en = json.loads((ROOT / "menu-en.json").read_text(encoding="utf-8"))

USED = set()


def slug(title: str, prefix: str = "") -> str:
    s = unicodedata.normalize("NFD", title.lower())
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    s = s[:48] or "item"
    if prefix:
        s = f"{prefix}-{s}"
    base = s
    n = 2
    while s in USED:
        s = f"{base}-{n}"
        n += 1
    USED.add(s)
    return s


def money(p: str) -> str:
    p = p.strip()
    if not p:
        return ""
    if p.startswith("$"):
        return p
    return f"${p}"


def fmt_price(prices):
    if not prices:
        return None
    if len(prices) == 1:
        p = money(prices[0]["price"])
        label = prices[0]["label"]
        if label and label.lower() not in ("portion individuelle",):
            return p
        return p
    labels = [p["label"].strip() for p in prices]
    vals = [money(p["price"]) for p in prices]
    if labels == ["P", "G"]:
        return f"{vals[0]} / {vals[1]}"
    if set(x.lower() for x in labels) <= {"calf", "pollo", "veau"}:
        return f"{vals[0]} / {vals[1]}"
    if prices[0]["label"] == "" and prices[1]["label"]:
        extra = prices[1]
        return vals[0]
    return " · ".join(vals)


def extra_note(prices, fr=True):
    if len(prices) == 2 and prices[0]["label"] == "" and prices[1]["label"]:
        lab = prices[1]["label"]
        p = money(prices[1]["price"])
        return f"{lab} {p}"
    if labels := [p["label"] for p in prices]:
        if labels == ["P", "G"]:
            return "Petite / grande" if fr else "Small / large"
        if set(x.lower() for x in labels) <= {"calf", "pollo", "veau"}:
            return "Veau / poulet" if fr else "Veal / chicken"
    return ""


def js_str(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def find_menu(data, *slugs):
    for m in data:
        if m["slug"] in slugs:
            return m
    return None


def find_section(menu, *needles):
    for s in menu["sections"]:
        t = s["title"].lower()
        if any(n.lower() in t for n in needles):
            return s
    return None


def match_en_item(en_section, fr_item, idx):
    if not en_section:
        return None
    items = en_section["items"]
    fr_key = unicodedata.normalize("NFD", fr_item["title"].lower())
    fr_key = "".join(c for c in fr_key if unicodedata.category(c) != "Mn")
    best = None
    best_score = 0
    for it in items:
        en_key = unicodedata.normalize("NFD", it["title"].lower())
        en_key = "".join(c for c in en_key if unicodedata.category(c) != "Mn")
        words = [w for w in re.split(r"[^a-z0-9]+", fr_key) if len(w) > 3]
        score = sum(1 for w in words if w in en_key)
        if fr_key[:8] in en_key or en_key[:8] in fr_key:
            score += 3
        if score > best_score:
            best_score = score
            best = it
    if best_score >= 1:
        return best
    if idx < len(items):
        return items[idx]
    return None


def emit_item(fr_it, en_it, prefix=""):
    iid = slug(fr_it["title"], prefix)
    price = fmt_price(fr_it["prices"])
    fr_title = fr_it["title"]
    en_title = en_it["title"] if en_it else fr_it["title"]
    fr_body = fr_it.get("body") or ""
    en_body = (en_it.get("body") if en_it else "") or ""
    note_fr = extra_note(fr_it["prices"], True)
    note_en = extra_note(fr_it["prices"], False)
    if note_fr:
        fr_body = f"{note_fr}. {fr_body}".strip() if fr_body else note_fr
        en_body = f"{note_en}. {en_body}".strip() if en_body else note_en
    if not en_body and fr_body:
        en_body = fr_body
    lines = [
        "      {",
        f"        id: {js_str(iid)},",
        f"        title: {{ en: {js_str(en_title)}, fr: {js_str(fr_title)} }},",
    ]
    if fr_body or en_body:
        lines.append(f"        body: {{ en: {js_str(en_body)}, fr: {js_str(fr_body)} }},")
    if price:
        lines.append(f"        price: {js_str(price)},")
    lines.append("      },")
    return "\n".join(lines), iid


def emit_section(sid, title_en, title_fr, fr_sec, en_sec, prefix=""):
    chunks = [
        "  {",
        f"    id: {js_str(sid)},",
        f"    title: {{ en: {js_str(title_en)}, fr: {js_str(title_fr)} }},",
        "    items: [",
    ]
    ids = []
    for i, it in enumerate(fr_sec["items"] if fr_sec else []):
        en_it = match_en_item(en_sec, it, i)
        block, iid = emit_item(it, en_it, prefix)
        chunks.append(block)
        ids.append(iid)
    chunks.append("    ],")
    chunks.append("  },")
    return "\n".join(chunks), ids


fr_dinner = find_menu(fr, "menu")
en_dinner = find_menu(en, "menu")
fr_lunch = find_menu(fr, "menu-midi")
en_lunch = find_menu(en, "lunch-menu")
fr_fam = find_menu(fr, "repas-familial-pour-emporter")
en_fam = find_menu(en, "family-meals-to-go")

sections_spec = [
    ("pasta", "Pasta", "Pasta", "Pasta", "Pasta", ""),
    ("antipasto", "Antipasto", "Antipasto", "Antipasto", "Antipasto", ""),
    ("insalata", "Insalata", "Insalata", "Insalata", "Insalata", ""),
    ("pollo", "Chicken & veal", "Pollo / Vitello", "Pollo", "Pollo", ""),
    ("pizza", "Pizza", "Pizza", "Pizza", "Pizza", ""),
    ("griglia", "From the grill", "Griglia", "Griglia", "Griglia", ""),
    ("zuppe", "Soup", "Zuppe", "Zuppe", "Zuppe", ""),
    ("pesce", "Fish", "Pesce", "Pesce", "Pesce", ""),
    ("forno", "Baked pasta", "Pasta al forno", "forno", "Forno", ""),
    ("lunch", "Lunch — soup of the day included", "Menu midi — soupe du jour incluse", "~ Soupe", "~ Soupe", "lunch"),
    ("family", "Family plates for 4", "Repas familial pour 4", "Repas familiaux", "Family", "family"),
]

out_sections = []
all_ids = {}
for sid, te, tf, fr_n, en_n, prefix in sections_spec:
    src_fr = fr_dinner if sid not in ("lunch", "family") else (fr_lunch if sid == "lunch" else fr_fam)
    src_en = en_dinner if sid not in ("lunch", "family") else (en_lunch if sid == "lunch" else en_fam)
    fr_sec = find_section(src_fr, fr_n) if src_fr else None
    en_sec = find_section(src_en, en_n) if src_en else None
    if sid == "zuppe" and not en_sec:
        en_sec = {"title": "Soup", "items": []}
    block, ids = emit_section(sid, te, tf, fr_sec, en_sec, prefix)
    out_sections.append(block)
    all_ids[sid] = ids

MARTINIS = [
    ("Raspberry Limoncello Prosecco", "Framboises fraîches, jus de citron, Limoncello, Prosecco et eau pétillante.", "Fresh raspberries, lemon, Limoncello, Prosecco and sparkling water."),
    ("Summer Strawberry Fizz", "Fraises, menthe, sucre, vodka, jus de limette, Prosecco et eau pétillante.", "Strawberries, mint, sugar, vodka, lime, Prosecco and sparkling water."),
    ("Prosecco Margarita", "Tequila, jus de limette, triple sec, jus d'orange et Prosecco, verre givré au sel.", "Tequila, lime, triple sec, orange juice and Prosecco, salted rim."),
    ("French 75", "Gin, jus de citron et sucre, Prosecco, zeste de citron.", "Gin, lemon and sugar, topped with Prosecco and a lemon twist."),
    ("Prosecco slushies", "Prosecco, vodka, fraises et jus de limette, glace, menthe.", "Prosecco, vodka, strawberries and lime, blended with ice and mint."),
    ("Bikini Martini", "Rhum Malibu, vodka, jus d'ananas, grenadine et cerises.", "Malibu rum, vodka, pineapple, grenadine and cherries."),
    ("Love Martini", "Rhum Malibu, schnaps aux pêches, jus de canneberge, fraises.", "Malibu rum, peach schnapps, cranberry, strawberries."),
    ("Bigbang Martini", "Vodka, schnaps aux pêches, jus de canneberge, roue de limette.", "Vodka, peach schnapps, cranberry, lime wheel."),
    ("Caribbean Martini", "Rhum Malibu, vodka, jus d'ananas, grenadine, oranges.", "Malibu rum, vodka, pineapple, grenadine, orange."),
    ("Lemon-drop Martini", "Limoncello, vodka, triple sec, jus de citron, zeste.", "Limoncello, vodka, triple sec, lemon, twist."),
    ("Malibu Mojito", "Rhum Malibu, jus de limette, eau pétillante, menthe fraîche.", "Malibu rum, lime, sparkling water, fresh mint."),
    ("Amaretto Sour", "Amaretto, triple sec, jus de limette, jus d'orange et cerises.", "Amaretto, triple sec, lime, orange juice and cherries."),
    ("Aperol Spritz", "Aperol, Prosecco, eau pétillante, oranges.", "Aperol, Prosecco, sparkling water, orange slices."),
    ("Pina Colada Sangria", "Rhum Malibu, jus d'ananas et vin blanc maison.", "Malibu rum, pineapple juice and house white wine."),
    ("Dirty Arnold Palmer", "Rhum blanc, thé glacé, limonade, jus de limette, menthe.", "White rum, iced tea, lemonade, lime and mint."),
]

martini_lines = [
    "  {",
    '    id: "cocktails",',
    '    title: { en: "$13 martinis & cocktails", fr: "Martinis et cocktails 13 $" },',
    "    items: [",
]
for name, fr_b, en_b in MARTINIS:
    iid = slug(name)
    martini_lines.append("      {")
    martini_lines.append(f"        id: {js_str(iid)},")
    martini_lines.append(f"        title: {{ en: {js_str(name)}, fr: {js_str(name)} }},")
    martini_lines.append(f"        body: {{ en: {js_str(en_b)}, fr: {js_str(fr_b)} }},")
    martini_lines.append('        price: "$13.00",')
    martini_lines.append("      },")
martini_lines.append("    ],")
martini_lines.append("  },")
out_sections.append("\n".join(martini_lines))

header = r'''export const house = {
  name: "Scarolie's Pasta Emporium",
  shortName: "Scarolie's",
  liveSite: 'http://www.scarolies.com/',
  liveSiteEn: 'http://www.scarolies.com/en/',
  email: 'scarolies@yahoo.ca',
  emailHref: 'mailto:scarolies@yahoo.ca',
  facebook: 'https://www.facebook.com/Scarolies',
  yelp: 'https://www.yelp.ca/biz/scarolies-pasta-emporium-pointe-claire',
  tripadvisor: 'https://www.tripadvisor.ca/Restaurant_Review-g181730-d806565-Reviews-Scarolie_s-Pointe_Claire_Quebec.html',
  winePdf: 'https://singleapp.com/menus/menu_182894_document.pdf?1675917708',
  vipFr: 'http://www.scarolies.com/#liste-vip',
  vipEn: 'http://www.scarolies.com/en/#vip-list',
  bookFr: 'https://www.tbdine.com/book/restaurant/scarolies-pasta-emporium?idApp=17&language=fr-ca',
  bookEn: 'https://www.tbdine.com/book/restaurant/scarolies-pasta-emporium?idApp=17&language=en-us',
  book: 'https://tbdine.com/pointe-claire/restaurants/scarolies-pasta-emporium',
} as const;

export const locations = [
  {
    id: 'pointe-claire' as const,
    slug: 'pointe-claire',
    name: { en: "Scarolie's Pasta Emporium", fr: "Scarolie's Pasta Emporium" },
    area: { en: 'Pointe-Claire', fr: 'Pointe-Claire' },
    addressLines: {
      en: ['950 St-Jean Blvd.', 'Pointe-Claire, QC'],
      fr: ['950, boul. Saint-Jean', 'Pointe-Claire, QC'],
    },
    postal: 'H9R 5N8',
    phone: '(514) 694-8611',
    phoneHref: 'tel:+15146948611',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=950+Boulevard+Saint-Jean+Pointe-Claire+QC+H9R+5N8',
    visitHours: {
      en: 'Monday–Thursday 11:00–21:00. Friday–Saturday 11:00–22:00. Sunday 11:00–21:00.',
      fr: 'Lundi au jeudi 11 h – 21 h. Vendredi et samedi 11 h – 22 h. Dimanche 11 h – 21 h.',
    },
    hoursShort: {
      en: 'Mon–Thu 11:00–21:00 · Fri–Sat 11:00–22:00 · Sun 11:00–21:00',
      fr: 'Lun–jeu 11 h – 21 h · ven–sam 11 h – 22 h · dim 11 h – 21 h',
    },
    phoneHours: {
      en: 'Reserve on TB Dine or call (514) 694-8611.',
      fr: 'Réservez sur TB Dine ou au (514) 694-8611.',
    },
  },
] as const;

export function bookUrl(locale: string) {
  return locale === 'fr' ? house.bookFr : house.bookEn;
}

export const bookingDoors = [
  {
    id: 'book',
    title: { en: 'Reserve a table', fr: 'Réserver une table' },
    body: {
      en: 'Online reservations go through TB Dine, the booker on their live site. You can also call.',
      fr: 'Les réservations en ligne passent par TB Dine, l’outil sur leur site. Vous pouvez aussi téléphoner.',
    },
    href: house.bookFr,
    cta: { en: 'TB Dine', fr: 'TB Dine' },
  },
  {
    id: 'call',
    title: { en: 'Call', fr: 'Téléphoner' },
    body: {
      en: '950 St-Jean Blvd., Pointe-Claire. (514) 694-8611.',
      fr: '950, boul. Saint-Jean, Pointe-Claire. (514) 694-8611.',
    },
    href: 'tel:+15146948611',
    cta: { en: '(514) 694-8611', fr: '(514) 694-8611' },
  },
  {
    id: 'menu',
    title: { en: 'The menu', fr: 'Le menu' },
    body: {
      en: 'Pasta, antipasto, salads, chicken and veal, pizza, grill, soup, fish, baked pasta. Lunch includes soup of the day. Tax extra. Prices may change.',
      fr: 'Pâtes, antipasto, salades, poulet et veau, pizza, grillades, soupes, poisson, pâtes au four. Le midi, soupe du jour incluse. Taxes en sus. Prix sujets à changement.',
    },
    href: '/menu',
    cta: { en: 'See the menu', fr: 'Voir le menu' },
  },
  {
    id: 'takeaway',
    title: { en: 'Family plates', fr: 'Repas familial' },
    body: {
      en: 'Takeaway plates for four. Call (514) 694-8611. Prices may change.',
      fr: 'Assiettes pour emporter, portions pour 4. Téléphonez au (514) 694-8611. Prix sujets à changement.',
    },
    href: '/takeaway',
    cta: { en: 'Family plates', fr: 'Repas familial' },
  },
] as const;

export const menu = [
'''

footer = '''
] as const;

export const menuCategories = menu.map((section) => ({ id: section.id, title: section.title }));

export function menuItemById(id: string) {
  for (const section of menu) {
    const found = section.items.find((item) => item.id === id);
    if (found) return found;
  }
  return undefined;
}

export const housePickIds = [
  'carre-d-agneau',
  'calamari-fritti',
  'saumon-et-crevettes-style-langoustines',
  'spaghetti-cacciatore',
  'linguini-con-gamberetti-alla-brandy-rosa',
  'rotolo-alla-milanese',
  'lasagna-casalinga',
  'bistecca-surlonge-alla-griglia',
  'pollo-calabrese',
  'capelli-di-angelo-alla-diablo',
  'insalata-caprese-di-burrata',
  'pizza-americana',
] as const;

export const housePicks = housePickIds
  .map((id) => menuItemById(id))
  .filter((item): item is NonNullable<typeof item> => Boolean(item));
'''

# fix housePick ids after slug generation - print them
print("IDs of interest:")
for sid, ids in all_ids.items():
    print(sid, ids[:6], "...")

# find lamb etc
wanted = ["agneau", "calamari", "cacciatore", "gamberetti", "rotolo", "lasagna", "surlonge", "calabrese", "diablo", "caprese", "americana", "langoustine"]
print("\nslug scan:")
for sid, ids in all_ids.items():
    for i in ids:
        if any(w in i for w in wanted):
            print(" ", sid, i)

text = header + "\n".join(out_sections) + footer
(ROOT / "src" / "content" / "house.ts").write_text(text, encoding="utf-8")
print("wrote house.ts", len(text), "chars")
