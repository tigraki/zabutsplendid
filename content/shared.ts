import type { BudgetRowId, CurrencyCode, ImageAltKey, Lang, OfferKey, PillarKey, PostSlug } from './types';

/**
 * Non-copy content shared by all three languages: image files and sizes, links,
 * amounts, dates and the brand words that stay the same in every language.
 * Alt text lives in each language file under `site.images`, keyed by `alt` below.
 */

export interface SharedImage {
  src: string;
  /** Intrinsic pixel size of the file in /public. */
  width: number;
  height: number;
  alt: ImageAltKey;
}

const img = (src: string, width: number, height: number, alt: ImageAltKey): SharedImage => ({
  src,
  width,
  height,
  alt,
});

export const images = {
  mark: img('/images/zabut-mark.webp', 641, 900, 'mark'),
  markHero: img('/images/zabut-mark.webp', 641, 900, 'markHero'),
  spark: { src: '/images/spark.png', width: 126, height: 128 },
  homeTerra: img('/images/home-terra.webp', 840, 560, 'homeTerra'),
  privateEvents: img('/images/exp-private-events.webp', 840, 630, 'privateEvents'),
  weddings: img('/images/exp-weddings.webp', 840, 630, 'weddings'),
  retreats: img('/images/exp-retreats.webp', 840, 630, 'retreats'),
  workshops: img('/images/exp-workshops.webp', 840, 630, 'workshops'),
  table: img('/images/exp-table.webp', 840, 560, 'table'),
  land: img('/images/exp-land.webp', 840, 560, 'land'),
  fundTable: img('/images/fund-table.webp', 1500, 1000, 'fundTable'),
  panorama: img('/images/sambuca-panorama.webp', 1600, 748, 'panorama'),
  storyIllustration: img('/images/story-guest-houses-olive-trees.webp', 1200, 674, 'storyIllustration'),
} as const;

/** Open Graph / Twitter image (public/og.jpg). */
export const ogImage = { src: '/og.jpg', width: 1200, height: 630 };

export const brand = {
  wordmark: 'ZABUT',
  /** Always English, marked lang="en" on every language version. */
  subtitle: 'The Splendid',
  /** Always Italian, marked lang="it" on every language version. */
  town: 'Sambuca di Sicilia',
  province: 'Agrigento',
};

export const contact = {
  email: 'zabutsplendid@gmail.com',
  instagramUrl: 'https://instagram.com/zabutsplendid',
  instagramHandle: '@zabutsplendid',
};

/** External Fillout signup form, one per language. Keep these URLs exactly as they are. */
export const signupUrl: Record<Lang, string> = {
  en: 'https://zabut.fillout.com/signup?lang=en',
  it: 'https://zabut.fillout.com/signup?lang=it',
  tr: 'https://zabut.fillout.com/signup?lang=tr',
};

/** Home "The first phase" pillars. Labels are Italian brand words (lang="it") in every language. */
export const pillars: { key: PillarKey; label: string; image: SharedImage }[] = [
  { key: 'terra', label: 'Terra', image: images.homeTerra },
  { key: 'persone', label: 'Persone', image: images.privateEvents },
  { key: 'storie', label: 'Storie', image: images.weddings },
];

/** Experiences overview, in display order. */
export const offers: { key: OfferKey; image: SharedImage }[] = [
  { key: 'weddings', image: images.weddings },
  { key: 'privateEvents', image: images.privateEvents },
  { key: 'retreats', image: images.retreats },
  { key: 'workshops', image: images.workshops },
  { key: 'table', image: images.table },
  { key: 'land', image: images.land },
];

export type BudgetRow =
  | {
      id: BudgetRowId;
      /** item: a costed line · itemsSubtotal: plain bold subtotal · subtotal: the highlighted total */
      kind: 'item' | 'itemsSubtotal' | 'subtotal';
      amount: number;
      /** Defaults to EUR. */
      currency?: CurrencyCode;
      tipId?: string;
    }
  | {
      id: BudgetRowId;
      /** pending: listed, not costed yet (`status` picks the wording) · total: the funding target */
      kind: 'pending' | 'total';
      status?: 'quote' | 'toBudget';
    };

/**
 * Fundraising budget, in display order. Mirrors the "Funding & Use of Funds" slide of the
 * investor pitch deck (preliminary costed scope €413,500, plus US$12,000 for brand,
 * website and pre-opening marketing). Items must add up; scripts/verify-behaviour.mjs checks it.
 */
export const budget: BudgetRow[] = [
  { id: 'twoPersonLodges', kind: 'item', amount: 96000 }, // 6 × €16,000
  { id: 'familyLodges', kind: 'item', amount: 186000 }, // 6 × €31,000
  { id: 'restaurants', kind: 'item', amount: 35000 },
  { id: 'bathrooms', kind: 'item', amount: 15000 },
  { id: 'entrance', kind: 'item', amount: 6000 },
  { id: 'weddingSetting', kind: 'item', amount: 5500 },
  { id: 'guestSubtotal', kind: 'itemsSubtotal', amount: 343500 },
  { id: 'property', kind: 'item', amount: 45000 },
  { id: 'itemsSubtotal', kind: 'itemsSubtotal', amount: 388500 },
  { id: 'transport', kind: 'item', amount: 25000 },
  { id: 'costedScope', kind: 'subtotal', amount: 413500, tipId: 'tip-subtotal' },
  { id: 'digital', kind: 'item', amount: 12000, currency: 'USD', tipId: 'tip-digital' },
  { id: 'company', kind: 'pending', status: 'quote' },
  { id: 'permits', kind: 'pending', status: 'quote' },
  { id: 'pools', kind: 'pending', status: 'quote' },
  { id: 'operating', kind: 'pending', status: 'toBudget' },
  { id: 'total', kind: 'total' },
];

/** Journal posts, newest first. Dates are formatted per language at build time. */
export const posts: { slug: PostSlug; publishedAt: string }[] = [
  { slug: 'land-vision', publishedAt: '2026-09-24' },
];
