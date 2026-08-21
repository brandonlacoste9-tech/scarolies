import re
from pathlib import Path

html = Path.home().joinpath("AppData/Local/Temp/scarolies-home.html")
if not html.exists():
    raise SystemExit("missing html")
text = html.read_text(encoding="utf-8", errors="replace")
urls = sorted(set(re.findall(r"https?://[^\"')\s>]+\.(?:jpg|jpeg|png|webp)(?:\?[^\"'\s>]*)?", text, re.I)))
print("count", len(urls))
for u in urls:
    print(u)
