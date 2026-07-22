"""Remove fundo das fotos (padrao cutout Marina/Nikolas)."""
from pathlib import Path
from rembg import remove
from PIL import Image, ImageEnhance

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "public" / "images" / "raw"
OUT = ROOT / "public" / "images"

JOBS = [
    ("hero-source.png", "luzia-mary-hero.png"),
    ("trajetoria-source.png", "luzia-mary-trajetoria.png"),
    ("participe-source.png", "luzia-mary-participe.png"),
]


def polish(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    rgb = img.convert("RGB")
    rgb = ImageEnhance.Contrast(rgb).enhance(1.06)
    rgb = ImageEnhance.Color(rgb).enhance(1.08)
    rgb = ImageEnhance.Sharpness(rgb).enhance(1.12)
    out = rgb.convert("RGBA")
    out.putalpha(img.getchannel("A"))
    bbox = out.getbbox()
    if bbox:
        out = out.crop(bbox)
    return out


def main() -> None:
    for src_name, out_name in JOBS:
        src = RAW / src_name
        dest = OUT / out_name
        print(f"processando {src_name}...")
        with Image.open(src) as im:
            cut = remove(im)
            cut = polish(cut)
            cut.save(dest, "PNG", optimize=True)
            print(f"  ok -> {out_name} {cut.size}")
    print("done")


if __name__ == "__main__":
    main()
