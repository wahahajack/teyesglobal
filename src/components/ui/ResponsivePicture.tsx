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
  // 在Vite中，我们需要使用导入语句，不能直接使用文件路径
  // 这里我们简化组件，只显示默认图片
  const defaultSize = sizes[1] || 800;
  
  // 注意：在Vite中，图片路径需要通过导入获取
  // 这里我们假设调用者会传递正确的导入路径
  const defaultImage = `${basePath}/${baseName}-${defaultSize}.webp`;
  
  return (
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
  );
}

export default ResponsivePicture;