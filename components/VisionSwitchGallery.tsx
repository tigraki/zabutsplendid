'use client';

import Image from 'next/image';
import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';

export interface SwitchImage {
  src: string;
  alt: string;
  caption?: string;
  concept: boolean;
}

export interface SwitchLabels {
  group: string;
  slider: string;
  tiles: string;
  previous: string;
  next: string;
  /** "{n}" is replaced by the image number. */
  viewInSlider: string;
  /** "{n}" and "{total}" are replaced. */
  position: string;
  /** Tiles-view hint, for mouse and for touch screens. */
  hint: string;
  hintTouch: string;
  concept: string;
}

/**
 * Image gallery with a Slider / Tiles switch, as in the pre-build prototype, using its
 * classes (.room-gallery, .view-toggle, .view-btn, .room-slider, .slide-nav, .slide-dots,
 * .room-tiles, .room-tile). Tiles is the default view, so the whole set is visible at
 * once, with a "click an image to enlarge" hint; picking a tile opens it in the slider. Also: swipe on touch screens and ←/→ keys when the slider has focus.
 */
export function VisionSwitchGallery({ images, labels }: { images: SwitchImage[]; labels: SwitchLabels }) {
  const [view, setView] = useState<'slider' | 'tiles'>('tiles');
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const total = images.length;
  const go = (n: number) => setIndex((n + total) % total);
  const fill = (s: string) => s.replace('{n}', String(index + 1)).replace('{total}', String(total));
  const current = images[index]!;

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') go(index - 1);
    if (e.key === 'ArrowRight') go(index + 1);
  };
  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') touchX.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (touchX.current === null) return;
    const dx = e.clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? index + 1 : index - 1);
  };

  return (
    <div className="room-gallery vision-switch">
      <div className="vision-switch-bar">
        {view === 'tiles' && (
          <p className="label vision-switch-hint">
            <span className="hint-pointer">{labels.hint}</span>
            <span className="hint-touch">{labels.hintTouch}</span>
          </p>
        )}
        <div className="view-toggle" role="group" aria-label={labels.group}>
          {(['slider', 'tiles'] as const).map((v) => (
            <button
              key={v}
              type="button"
              className={view === v ? 'view-btn active' : 'view-btn'}
              aria-pressed={view === v}
              onClick={() => setView(v)}
            >
              {labels[v]}
            </button>
          ))}
        </div>
      </div>

      <div hidden={view !== 'slider'}>
        <div
          ref={sliderRef}
          className="room-slider large"
          role="region"
          aria-roledescription="carousel"
          aria-label={labels.slider}
          tabIndex={0}
          onKeyDown={onKey}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          {images.map((image, i) => (
            <div
              key={image.src}
              className={i === index ? 'room-slide has-image active' : 'room-slide has-image'}
              aria-hidden={i !== index}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 64rem) calc(100vw - 2.5rem), 960px"
                style={{ objectFit: 'cover' }}
              />
              {image.concept && <span className="vision-concept">{labels.concept}</span>}
            </div>
          ))}
          <button type="button" className="slide-nav prev" aria-label={labels.previous} onClick={() => go(index - 1)}>
            &#8249;
          </button>
          <button type="button" className="slide-nav next" aria-label={labels.next} onClick={() => go(index + 1)}>
            &#8250;
          </button>
          <div className="slide-dots" aria-hidden="true">
            {images.map((image, i) => (
              <span key={image.src} className={i === index ? 'dot active' : 'dot'} />
            ))}
          </div>
        </div>
        <p className="caption vision-switch-caption" aria-live="polite">
          <span className="vision-sr">{fill(labels.position)} </span>
          {current.caption ?? ''}
        </p>
      </div>

      <div className="room-tiles" hidden={view !== 'tiles'}>
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            className="room-tile has-image"
            aria-label={`${image.alt}. ${labels.viewInSlider.replace('{n}', String(i + 1))}`}
            onClick={() => {
              setIndex(i);
              setView('slider');
              // the tile that had focus is now hidden: move focus to the slider
              requestAnimationFrame(() => sliderRef.current?.focus());
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 30rem) 46vw, 310px"
              style={{ objectFit: 'cover' }}
            />
            {image.concept && <span className="vision-concept">{labels.concept}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
