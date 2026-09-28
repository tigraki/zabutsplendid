import Image from 'next/image';
import { images } from '@/content/shared';

/** Small decorative star. `sizes` is the rendered width (plus padding) in CSS px. */
export function Spark({ sizes }: { sizes: string }) {
  return (
    <Image
      className="spark"
      src={images.spark.src}
      width={images.spark.width}
      height={images.spark.height}
      alt=""
      aria-hidden="true"
      sizes={sizes}
      style={{ aspectRatio: `${images.spark.width} / ${images.spark.height}` }}
    />
  );
}
