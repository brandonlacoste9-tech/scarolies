import json
import re
from pathlib import Path

TEMP = Path.home() / "AppData/Local/Temp"
OUT = Path(r"C:\Users\north\scarolies-github")


def parse(html: str):
    menus = []
    menu_iter = list(re.finditer(r'<div id="menu_([^"]+)" class="menus_content', html))
    for i, m in enumerate(menu_iter):
        start = m.start()
        end = menu_iter[i + 1].start() if i + 1 < len(menu_iter) else html.find('id="tour"', start)
        if end == -1:
            end = html.find('id="gallery"', start)
        if end == -1:
            end = len(html)
        chunk = html[start:end]
        slug = m.group(1)
        name_m = re.search(r'<h3 class="menu_name">([^<]+)</h3>', chunk)
        menu_name = name_m.group(1).strip() if name_m else slug
        sections = []
        sec_iter = list(re.finditer(r'<div class=\'menu_section[^"]*section_([^\'\s]+)[^"]*\'[^>]*>', chunk))
        if not sec_iter:
            sec_iter = list(re.finditer(r"class='menu_section[^']*'", chunk))
        # split by section_name h4
        parts = re.split(r'(<h4 class="section_name sub_title">)', chunk)
        # first part is header; then pairs of (tag, rest)
        j = 1
        while j < len(parts):
            rest = parts[j + 1] if j + 1 < len(parts) else ""
            title_m = re.match(r"([^<]+)</h4>", rest)
            title = title_m.group(1).strip() if title_m else "Section"
            body = rest[title_m.end() :] if title_m else rest
            # next split happens at next tag which is already next parts[j]
            items = []
            for item_m in re.finditer(
                r'<h4 class="item_name sub_title">(?P<title>.*?)</h4>'
                r'<table class="menu_item_prices[^"]*">(?P<table>.*?)</table>'
                r'(?:\s*<div class="item_desc">(?P<desc>.*?)</div>)?',
                body,
                re.S,
            ):
                prices = []
                for row in re.finditer(
                    r'<td class="pTitle">(?P<label>.*?)</td><td class="price[^"]*">(?P<price>.*?)</td>',
                    item_m.group("table"),
                ):
                    prices.append(
                        {
                            "label": row.group("label").strip(),
                            "price": row.group("price").strip(),
                        }
                    )
                desc = item_m.group("desc") or ""
                desc = re.sub(r"<br\s*/?>", " ", desc)
                desc = re.sub(r"<[^>]+>", "", desc)
                desc = re.sub(r"\s+", " ", desc).strip()
                items.append(
                    {
                        "title": re.sub(r"\s+", " ", item_m.group("title")).strip(),
                        "prices": prices,
                        "body": desc,
                    }
                )
            sections.append({"title": title, "items": items})
            j += 2
        menus.append({"slug": slug, "name": menu_name, "sections": sections})
    return menus


for lang, fname in [("fr", "scarolies-home.html"), ("en", "scarolies-en.html")]:
    html = (TEMP / fname).read_text(encoding="utf-8", errors="replace")
    data = parse(html)
    (OUT / f"menu-{lang}.json").write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(lang)
    for menu in data:
        n = sum(len(s["items"]) for s in menu["sections"])
        print(f"  {menu['slug']} ({menu['name']}) sections={len(menu['sections'])} items={n}")
        for s in menu["sections"]:
            print(f"    - {s['title']}: {len(s['items'])}")
