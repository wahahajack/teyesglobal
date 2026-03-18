#!/usr/bin/env python3
"""
生成证书图片 - 创建合成证书卡片
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import textwrap

def create_cert_images():
    """创建证书展示卡片"""
    output_folder = Path(__file__).parent / 'images'
    
    # 证书定义
    certs = [
        {
            'name': 'ISO 9001',
            'subtitle': 'Quality Management',
            'color': '#3C83F6',
            'file': 'cert-iso-9001.jpg'
        },
        {
            'name': 'IATF 16949',
            'subtitle': 'Automotive Quality',
            'color': '#06B6D4',
            'file': 'cert-iatf-16949.jpg'
        },
        {
            'name': 'CE Certification',
            'subtitle': 'European Conformity',
            'color': '#8B5CF6',
            'file': 'cert-ce.jpg'
        },
        {
            'name': 'FCC Certificate',
            'subtitle': 'US Radio Compliance',
            'color': '#EC4899',
            'file': 'cert-fcc.jpg'
        },
        {
            'name': 'RoHS Compliance',
            'subtitle': 'Hazardous Substances',
            'color': '#F59E0B',
            'file': 'cert-rohs.jpg'
        },
    ]
    
    for cert in certs:
        try:
            # 创建图片 - 更大尺寸以便显示
            width, height = 1200, 900
            img = Image.new('RGB', (width, height), '#1a1a2e')
            draw = ImageDraw.Draw(img)
            
            # 创建渐变背景（通过多个矩形）
            for i in range(height):
                ratio = i / height
                # 从上面的颜色到下面的颜色的渐变
                r = int(26 + (60 - 26) * ratio)
                g = int(26 + (70 - 26) * ratio)
                b = int(46 + (90 - 46) * ratio)
                draw.line([(0, i), (width, i)], fill=(r, g, b))
            
            # 绘制证书边框
            border_width = 8
            hex_color = cert['color']
            rgb_color = tuple(int(hex_color.lstrip('#')[i:i+2], 16) for i in (0, 2, 4))
            
            # 外边框
            draw.rectangle(
                [(border_width, border_width), (width-border_width, height-border_width)],
                outline=rgb_color,
                width=border_width
            )
            
            # 内边框
            inner_border = border_width + 4
            draw.rectangle(
                [(inner_border, inner_border), (width-inner_border, height-inner_border)],
                outline=rgb_color,
                width=2
            )
            
            # 顶部装饰条
            draw.rectangle(
                [(inner_border, inner_border), (width-inner_border, inner_border+80)],
                fill=rgb_color
            )
            
            # 尝试加载字体，如果失败则使用默认字体
            try:
                title_font = ImageFont.truetype("arial.ttf", 72)
                subtitle_font = ImageFont.truetype("arial.ttf", 32)
                body_font = ImageFont.truetype("arial.ttf", 28)
            except:
                title_font = ImageFont.load_default()
                subtitle_font = ImageFont.load_default()
                body_font = ImageFont.load_default()
            
            # 绘制顶部文字（在装饰条上）
            cert_name = cert['name']
            draw.text(
                (width // 2, inner_border + 40),
                cert_name,
                font=title_font,
                fill='white',
                anchor='mm'
            )
            
            # 绘制副标题
            draw.text(
                (width // 2, inner_border + 200),
                cert['subtitle'],
                font=subtitle_font,
                fill=rgb_color,
                anchor='mm'
            )
            
            # 绘制描述文本和检验标志
            check_text = "✓ Verified & Approved"
            draw.text(
                (width // 2, inner_border + 300),
                check_text,
                font=body_font,
                fill='#22c55e',
                anchor='mm'
            )
            
            # 绘制底部文本
            bottom_text = "TEYES High-tech Co., Ltd."
            draw.text(
                (width // 2, height - inner_border - 60),
                bottom_text,
                font=body_font,
                fill=rgb_color,
                anchor='mm'
            )
            
            # 保存图片
            output_path = output_folder / cert['file']
            img.save(str(output_path), 'JPEG', quality=90)
            print(f"✓ Generated: {cert['file']}")
            
        except Exception as e:
            print(f"✗ Failed to create {cert['file']}: {e}")
    
    print("\nCertificate image generation complete!")

if __name__ == '__main__':
    create_cert_images()
