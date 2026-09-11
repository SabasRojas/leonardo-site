import { useState, type ImgHTMLAttributes } from 'react'
import { cn } from '../lib/cn'
import type { ImageAsset } from '../data/images'

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'width' | 'height'> & {
  asset: ImageAsset
  alt: string
  /** Wrapper classes (position/aspect/rounding). */
  className?: string
  /** <img> classes (object-fit etc). */
  imgClassName?: string
  priority?: boolean
}

/**
 * Blur-up image: paints an inline base64 placeholder instantly, then fades the
 * real WebP in once decoded. Reserves layout via intrinsic width/height.
 * Renders spans (phrasing content) so it is valid inside <button> and <a>.
 */
export function Img({ asset, alt, className, imgClassName, priority, ...rest }: Props) {
  const [loaded, setLoaded] = useState(false)

  return (
    <span
      className={cn('relative block overflow-hidden bg-surface-2', className)}
      style={{ backgroundImage: `url(${asset.blur})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <img
        src={asset.src}
        width={asset.width}
        height={asset.height}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        className={cn(
          'block h-full w-full object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)]',
          loaded ? 'opacity-100' : 'opacity-0',
          imgClassName,
        )}
        {...rest}
      />
    </span>
  )
}
