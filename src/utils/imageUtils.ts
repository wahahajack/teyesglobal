/**
 * 产品图片映射配置
 * 将产品ID映射到对应的图片基础名称
 */
export const productImageMap: Record<string, {
  front: string;
  back?: string;
}> = {
  'cc4-pro': {
    front: 'cc4-pro-screen',
    back: 'cc4-pro-back',
  },
  'cc3-2k': {
    front: 'cc3-2k',
  },
  'x1-pro': {
    front: 'x1-pro',
  },
  'cc4': {
    front: 'cc4-screen',
    back: 'cc4-back',
  },
  'cc4l': {
    front: 'cc4l-screen',
    back: 'cc4l-back',
  },
};

/**
 * 获取产品图片基础名称
 */
export function getProductImageBase(productId: string): {
  front: string;
  back?: string;
} {
  return productImageMap[productId] || { front: productId };
}

/**
 * 生成图片路径
 */
export function generateImagePath(baseName: string, size: number, format: 'webp' | 'avif' = 'webp'): string {
  return `/src/assets/products/${baseName}-${size}.${format}`;
}

/**
 * 生成srcSet字符串
 */
export function generateSrcSet(baseName: string, sizes: number[] = [400, 800, 1200], format: 'webp' | 'avif' = 'webp'): string {
  return sizes
    .map((size) => `${generateImagePath(baseName, size, format)} ${size}w`)
    .join(', ');
}
