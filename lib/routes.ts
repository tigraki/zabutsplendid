import type { Lang } from '@/content/types';
import { DEFAULT_LANG, isLang } from './i18n';

/** Every page of the site. Keys match the reference site's hash routes (#/story → 'story'). */
export const PAGE_PATHS = {
  home: '',
  fundraising: 'fundraising',
  story: 'story',
  vision: 'vision',
  experiences: 'experiences',
  blog: 'blog',
  'post-land-vision': 'blog/land-vision',
  contact: 'contact',
  privacy: 'privacy',
  terms: 'terms',
} as const;

export type PageKey = keyof typeof PAGE_PATHS;

/** Top-level nav item that is marked current for each page (the reference's NAV_PARENT map). */
export const NAV_KEY: Partial<Record<PageKey, 'fundraising' | 'story' | 'vision' | 'experiences' | 'blog' | 'contact'>> = {
  fundraising: 'fundraising',
  story: 'story',
  vision: 'vision',
  experiences: 'experiences',
  blog: 'blog',
  contact: 'contact',
};

/** Site-relative URL of a page in a language: /story, /it/story, /tr ... */
export function pagePath(lang: Lang, key: PageKey): string {
  const slug = PAGE_PATHS[key];
  const prefix = lang === DEFAULT_LANG ? '' : `/${lang}`;
  if (!slug) return prefix || '/';
  return `${prefix}/${slug}`;
}

/** Resolve a pathname back to its language and page (used by client components). */
export function parsePathname(pathname: string): { lang: Lang; key: PageKey | null } {
  const parts = pathname.replace(/\/+$/, '').split('/').filter(Boolean);
  let lang: Lang = DEFAULT_LANG;
  const first = parts[0];
  if (first && first !== DEFAULT_LANG && isLang(first)) {
    lang = first;
    parts.shift();
  }
  const slug = parts.join('/');
  const key = (Object.keys(PAGE_PATHS) as PageKey[]).find((k) => PAGE_PATHS[k] === slug) ?? null;
  return { lang, key };
}
