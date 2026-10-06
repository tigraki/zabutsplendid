import Image, { type ImageProps } from 'next/image';
import type { SharedImage } from '@/content/shared';
import type { Lang } from '@/content/types';
import { getContent } from '@/lib/i18n';

type Props = Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'> & {
  image: SharedImage;
  lang: Lang;
  /**
   * Pin the box to the file's aspect ratio with an inline aspect-ratio. Use it for images
   * sized only by width (height: auto), so the box keeps its exact shape before the
   * file has loaded.
   */
  exactRatio?: boolean;
  /** Empty alt: for an image inside a link or heading that already names it. */
  decorative?: boolean;
};

/** next/image with the file, size and language-specific alt text taken from content. */
export function SiteImage({ image, lang, exactRatio, decorative, style, ...rest }: Props) {
  return (
    <Image
      src={image.src}
      width={image.width}
      height={image.height}
      alt={decorative ? '' : getContent(lang).site.images[image.alt]}
      style={exactRatio ? { aspectRatio: `${image.width} / ${image.height}`, ...style } : style}
      {...rest}
    />
  );
}
