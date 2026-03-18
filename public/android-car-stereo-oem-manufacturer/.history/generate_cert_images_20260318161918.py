#!/usr/bin/env python3
"""
生成证书图片 - 从PDF转换为图片
"""
import os
import sys
from pathlib import Path

# 尝试导入pdf2image
try:
    from pdf2image import convert_from_path
    PDFTOPPM_AVAILABLE = True
except ImportError:
    PDFTOPPM_AVAILABLE = False
    print("Warning: pdf2image not installed. Will attempt to use ImageMagick.")

def generate_cert_images():
    """从证书PDF文件生成图片"""
    cert_folder = Path(__file__).parent / 'images' / '证书'
    output_folder = Path(__file__).parent / 'images'
    
    if not cert_folder.exists():
        print(f"Error: Certificate folder not found: {cert_folder}")
        return False
    
    pdf_files = list(cert_folder.glob('*.pdf'))
    if not pdf_files:
        print("No PDF files found in certificate folder")
        return False
    
    print(f"Found {len(pdf_files)} PDF certificate files")
    
    # 证书映射 - 简化名称
    cert_mapping = {
        'ISO 9001': None,
        'IATF 16949': None,
        'CE': None,
        'FCC': None,
        'RoHS': None,
        'E-Mark': None,
    }
    
    # 优先选择主要证书
    priority_certs = [
        ('IATF16949', 'IATF 16949'),
        ('ISO 9001', 'ISO 9001'),
        ('CCC英文证书', 'CCC'),
        ('CE-EMC', 'CE'),
        ('FCC', 'FCC'),
        ('ROHS', 'RoHS'),
    ]
    
    selected_pdfs = []
    for pdf in pdf_files:
        filename = pdf.stem.lower()
        for keyword, cert_name in priority_certs:
            if keyword.lower() in filename and cert_name not in [p[1] for p in selected_pdfs]:
                selected_pdfs.append((pdf, cert_name))
                break
    
    if not selected_pdfs:
        selected_pdfs = [(pdf_files[0], 'Certificate 1')]
    
    print(f"Processing {len(selected_pdfs)} certificate PDFs...")
    
    if PDFTOPPM_AVAILABLE:
        try:
            for pdf_path, cert_name in selected_pdfs:
                try:
                    # 转换第一页为图片
                    images = convert_from_path(
                        str(pdf_path),
                        first_page=1,
                        last_page=1,
                        dpi=150
                    )
                    
                    if images:
                        # 生成输出文件名
                        safe_name = cert_name.replace('/', '-').replace(' ', '-').lower()
                        output_file = output_folder / f'cert-{safe_name}.jpg'
                        
                        # 保存图片
                        images[0].save(str(output_file), 'JPEG', quality=85)
                        print(f"✓ Generated: {output_file.name}")
                except Exception as e:
                    print(f"✗ Failed to process {pdf_path.name}: {e}")
        except Exception as e:
            print(f"Error during conversion: {e}")
            return False
    else:
        print("\nNote: To generate certificate images, please install pdf2image:")
        print("pip install pdf2image")
        print("\nYou'll also need to install poppler (pdftoppm):")
        print("- Windows: choco install poppler")
        print("- macOS: brew install poppler") 
        print("- Linux: apt-get install poppler-utils")
        return False
    
    print("\nCertificate image generation complete!")
    return True

if __name__ == '__main__':
    success = generate_cert_images()
    sys.exit(0 if success else 1)
