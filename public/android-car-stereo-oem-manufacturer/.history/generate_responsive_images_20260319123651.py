from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parent
IMAGES_DIR = ROOT / "images"


SPECS = {
    "factory overview.jpg": {
        "basename": "factory-overview",
        "widths": [640, 960, 1280],
        "quality": 78,
    },
    "factory assemble line.jpg": {
        "basename": "factory-assemble-line",
        "widths": [480, 768, 960],
        "quality": 76,
    },
    "factory QC test line.jpg": {
        "basename": "factory-qc-test-line",
        "widths": [480, 768, 960],
        "quality": 76,
    },
    "factory aging room.jpg": {
        "basename": "factory-aging-room",
        "widths": [480, 768, 960],
        "quality": 76,
    },
    "teyes head unit.jpg": {
        "basename": "teyes-head-unit",
        "widths": [480, 768, 960, 1280],
        "quality": 76,
    },
}


def generate_variants(source_name: str, config: dict) -> None:
    source_path = IMAGES_DIR / source_name
    with Image.open(source_path) as image:
        image = image.convert("RGB")
        source_width, source_height = image.size

        for width in config["widths"]:
            if width >= source_width:
                resized = image
            else:
                height = round(source_height * (width / source_width))
                resized = image.resize((width, height), Image.Resampling.LANCZOS)

            output_path = IMAGES_DIR / f"{config['basename']}-{width}.webp"
            resized.save(
                output_path,
                format="WEBP",
                quality=config["quality"],
                method=6,
            )
            print(f"generated {output_path.name}")


def main() -> None:
    for source_name, config in SPECS.items():
        generate_variants(source_name, config)


if __name__ == "__main__":
    main()
