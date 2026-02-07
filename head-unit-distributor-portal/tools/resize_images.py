from __future__ import annotations

from pathlib import Path
import pillow_avif  # noqa: F401
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]

IMAGES = {
    "exhibition.webp": [320, 480, 640],
    "factory.webp": [240, 360],
    "warehouse.webp": [240, 360, 480],
    "product-flagship.webp": [400, 600],
}


def resize_image(path: Path, widths: list[int]) -> None:
    with Image.open(path) as img:
        original_width, original_height = img.size
        print(f"{path.name}: {original_width}x{original_height}")
        rgb = img.convert("RGB")
        for width in widths:
            if width >= original_width:
                continue
            height = round(original_height * (width / original_width))
            resized = rgb.resize((width, height), Image.LANCZOS)
            output_webp = path.with_name(f"{path.stem}-{width}.webp")
            resized.save(output_webp, "WEBP", quality=78, method=6, optimize=True)
            print(f"  -> {output_webp.name} ({width}x{height})")

            output_avif = path.with_name(f"{path.stem}-{width}.avif")
            resized.save(output_avif, "AVIF", quality=50, speed=5)
            print(f"  -> {output_avif.name} ({width}x{height})")


def main() -> None:
    for name, widths in IMAGES.items():
        path = ROOT / name
        if not path.exists():
            print(f"Missing: {name}")
            continue
        resize_image(path, widths)


if __name__ == "__main__":
    main()
