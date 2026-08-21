"""Build a mirrored damask tile that repeats without a seam."""

from pathlib import Path

from PIL import Image, ImageOps

SESSION = Path(
    r"C:\Users\north\.grok\sessions\C%3A%5CUsers%5Cnorth\01a00b7b-19c9-7501-83bc-5105b72148d6\images"
)
OUT_DIR = Path(r"C:\Users\north\scarolies-github\public\pattern")
PREVIEW_DIR = Path(r"C:\Users\north\scarolies-github\scripts")


def mirror_tile(im: Image.Image) -> Image.Image:
    fliph = ImageOps.mirror(im)
    flipv = ImageOps.flip(im)
    fliphv = ImageOps.flip(fliph)
    w, h = im.size
    canvas = Image.new("RGB", (w * 2, h * 2))
    canvas.paste(im, (0, 0))
    canvas.paste(fliph, (w, 0))
    canvas.paste(flipv, (0, h))
    canvas.paste(fliphv, (w, h))
    return canvas


def two_by_two(im: Image.Image, out_w: int = 1024) -> Image.Image:
    w, h = im.size
    canvas = Image.new("RGB", (w * 2, h * 2))
    for y in range(2):
        for x in range(2):
            canvas.paste(im, (x * w, y * h))
    return canvas.resize((out_w, out_w), Image.Resampling.LANCZOS)


def from_source(name: str, crop_frac: float = 0.06) -> Image.Image:
    src = Image.open(SESSION / name).convert("RGB")
    w, h = src.size
    m = int(min(w, h) * crop_frac)
    src = src.crop((m, m, w - m, h - m))
    src = src.resize((480, 480), Image.Resampling.LANCZOS)
    return mirror_tile(src)


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for label, src in (("28", "28.jpg"), ("29", "29.jpg"), ("30", "30.jpg")):
        tile = from_source(src)
        tile.save(PREVIEW_DIR / f"damask-mirror-{label}.jpg", quality=90)
        two_by_two(tile).save(PREVIEW_DIR / f"damask-2x2-{label}.jpg", quality=88)
        print(label, tile.size)


if __name__ == "__main__":
    main()
