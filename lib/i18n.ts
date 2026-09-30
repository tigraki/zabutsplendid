import { en } from '@/content/en';
import { it } from '@/content/it';
import { tr } from '@/content/tr';
import type { CurrencyCode, Lang, SiteContent } from '@/content/types';

export const LANGS: readonly Lang[] = ['en', 'it', 'tr'];
export const DEFAULT_LANG: Lang = 'en';
/** Languages served under a /<lang> prefix. English lives at the root. */
export const PREFIXED_LANGS: readonly Lang[] = ['it', 'tr'];

const CONTENT: Record<Lang, SiteContent> = { en, it, tr };

/** BCP 47 locale used for date formatting. */
export const LOCALE: Record<Lang, string> = { en: 'en-US', it: 'it-IT', tr: 'tr-TR' };

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

export function getContent(lang: Lang): SiteContent {
  return CONTENT[lang];
}

export function formatDate(iso: string, lang: Lang): string {
  return new Intl.DateTimeFormat(LOCALE[lang], { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(`${iso}T12:00:00Z`),
  );
}

export function formatAmount(
  amount: number,
  format: SiteContent['pages']['fundraising']['budget']['currency'],
  code: CurrencyCode = 'EUR',
): string {
  const digits = String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, format.groupSeparator);
  const symbol = format.symbols[code];
  return format.position === 'before' ? `${symbol}${digits}` : `${digits} ${symbol}`;
}

/** Validate the [lang] route param of the prefixed (it/tr) route tree. */
export function localizedLang(value: string): Lang {
  if (!isLang(value) || value === DEFAULT_LANG) throw new Error(`Unsupported language "${value}"`);
  return value;
}
