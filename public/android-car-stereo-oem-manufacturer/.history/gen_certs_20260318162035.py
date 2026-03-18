#!/usr/bin/env python3
"""Generate certificate images using PIL"""
import sys
try:
    from PIL import Image, ImageDraw
    print("PIL imported successfully")
except ImportError as e:
    print(f"Import error: {e}")
    sys.exit(1)

from pathlib import Path

def create_certificates():
    output_folder = Path(__file__).parent / 'images'
    
    certs = [
        ('cert-iso-9001.jpg', 'ISO 9001', 'Quality Management', '#3C83F6'),
        ('cert-iatf-16949.jpg', 'IATF 16949', 'Automotive Quality', '#06B6D4'),
        ('cert-ce.jpg', 'CE Certification', 'European Conformity', '#8B5CF6'),
        ('cert-fcc.jpg', 'FCC Certificate', 'US Radio Compliance', '#EC4899'),
        ('cert-rohs.jpg', 'RoHS Compliance', 'Hazardous Substances', '#F59E0B'),
    ]
    
    for filename, title, subtitle, color_hex in certs:
        w, h = 1200, 900
        img = Image.new('RGB', (w, h), '#1a1a2e')
        draw = ImageDraw.Draw(img)
        
        # Color conversion
        r, g, b = int(color_hex[1:3], 16), int(color_hex[3:5], 16), int(color_hex[5:7], 16)
        color = (r, g, b)
        
        # Border
        bd = 8
        draw.rectangle([(bd, bd), (w-bd, h-bd)], outline=color, width=bd)
        draw.rectangle([(bd+4, bd+4), (w-bd-4, h-bd-4)], outline=color, width=2)
        
        # Top decoration
        draw.rectangle([(bd+4, bd+4), (w-bd-4, bd+84)], fill=color)
        
        # Text
        draw.text((w//2, bd+44), title, fill='white', anchor='mm')
        draw.text((w//2, bd+200), subtitle, fill=color, anchor='mm')
        draw.text((w//2, bd+300), '✓ Verified & Approved', fill='#22c55e', anchor='mm')
        draw.text((w//2, h-bd-60), 'TEYES High-tech', fill=color, anchor='mm')
        
        img.save(str(output_folder / filename), 'JPEG', quality=90)
        print(f"✓ {filename}")

if __name__ == '__main__':
    create_certificates()
    print("Done!")
