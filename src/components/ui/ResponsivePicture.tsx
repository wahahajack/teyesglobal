import React from 'react';

interface ResponsivePictureProps {
  /** 图片基础名称，如 'cc4-pro-screen' */
  baseName: string;
  /** 图片目录，如 '@/assets/products' */
  basePath: string;
  /** 图片alt文本 */
  alt: string;
  /** 图片类名 */
  className?: string;
  /** 图片宽度 */
  width?: number;
  /** 图片高度 */
  height?: number;
  /** 加载优先级 */
  priority?: 'high' | 'low' | 'auto';
  /** 是否懒加载 */
  lazy?: boolean;
  /** 图片尺寸，默认 [400, 800, 1200] */
  sizes?: number[];
  /** 响应式尺寸字符串 */
  sizesAttr?: string;
}

export function ResponsivePicture({
  baseName,
  basePath,
  alt,
  className = '',
  width,
  height,
  priority = 'auto',
  lazy = false,
  sizes = [400, 800, 1200],
  sizesAttr = '100vw',
}: ResponsivePictureProps) {
  // 生成srcSet字符串
  const generateSrcSet = (extension: string) => {
    return sizes
      .map((size) => `${basePath}/${baseName}-${size}.${extension} ${size}w`)
      .join(', ');
  };

  // 获取默认图片（中等尺寸）
  const defaultImage = `${basePath}/${baseName}-${sizes[1] || 800}.webp`;

  return (
    <picture>
      {/* AVIF格式（优先） */}
      <source
        type="image/avif"
        srcSet={generateSrcSet('avif')}
        sizes={sizesAttr}
      />
      {/* WebP格式（备选） */}
      <source
        type="image/webp"
        srcSet={generateSrcSet('webp')}
        sizes={sizesAttr}
      />
      {/* 原始图片（回退） */}
      <img
        src={defaultImage}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={lazy ? 'lazy' : 'eager'}
        fetchPriority={priority}
        decoding="async"
      />
    </picture>
  );
}

export default ResponsivePicture;