import type { Metadata } from 'next';
import type { Lang } from '@/content/types';
import { ogImage, posts } from '@/content/shared';
import { vision } from '@/content/vision';
import { getContent, LANGS } from './i18n';
import { pagePath, type PageKey } from './routes';
import { SITE_URL } from './site-url';

/** The page's h1, which the reference router used for document.title. */
function pageHeading(lang: Lang, key: PageKey): string | null {
  const c = getContent(lang);
  switch (key) {
    case 'home':
      return null;
    case 'post-land-vision':
      return c.posts['land-vision'].title;
    case 'vision':
      return vision.intro.title[lang];
    default:
      return c.pages[key].title;
  }
}

/**
 * Title rule ported from the reference router: home uses the site name; every other
 * page is "<h1 without a trailing . or !> · <site name>".
 */
export function pageTitle(lang: Lang, key: PageKey): string {
  const siteName = getContent(lang).site.meta.siteName;
  const h1 = pageHeading(lang, key);
  return h1 ? `${h1.trim().replace(/[.!]$/, '')} · ${siteName}` : siteName;
}

export function buildMetadata(lang: Lang, key: PageKey): Metadata {
  const { meta } = getContent(lang).site;
  const title = pageTitle(lang, key);
  // pages with their own description; the rest use the site's
  const description = key === 'vision' ? vision.meta.description[lang] : meta.description;
  const url = pagePath(lang, key);
  const languages: Record<string, string> = {};
  for (const l of LANGS) languages[l] = pagePath(l, key);
  languages['x-default'] = pagePath('en', key);
  const alternateLocale = LANGS.filter((l) => l !== lang).map((l) => getContent(l).site.meta.ogLocale);
  const post = key === 'post-land-vision' ? posts.find((p) => p.slug === 'land-vision') : undefined;

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: post ? 'article' : 'website',
      siteName: meta.siteName,
      title,
      description,
      url,
      locale: meta.ogLocale,
      alternateLocale,
      images: [{ url: ogImage.src, width: ogImage.width, height: ogImage.height }],
      ...(post ? { publishedTime: post.publishedAt } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.src],
    },
  };
}
