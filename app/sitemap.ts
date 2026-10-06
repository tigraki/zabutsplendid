import type { MetadataRoute } from 'next';
import { LANGS } from '@/lib/i18n';
import { PAGE_PATHS, pagePath, type PageKey } from '@/lib/routes';
import { SITE_URL } from '@/lib/site-url';

/** /sitemap.xml: every page in every language, each with its language alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const keys = Object.keys(PAGE_PATHS) as PageKey[];
  return keys.flatMap((key) => {
    const languages: Record<string, string> = {};
    for (const l of LANGS) languages[l] = SITE_URL + pagePath(l, key);
    languages['x-default'] = SITE_URL + pagePath('en', key);
    return LANGS.map((lang) => ({
      url: SITE_URL + pagePath(lang, key),
      alternates: { languages },
    }));
  });
}
