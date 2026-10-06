import Link from 'next/link';
import type { Lang } from '@/content/types';
import { brand, contact, images, signupUrl } from '@/content/shared';
import { getContent } from '@/lib/i18n';
import { pagePath } from '@/lib/routes';
import { SiteImage } from './SiteImage';

export function Footer({ lang }: { lang: Lang }) {
  const { site } = getContent(lang);
  const f = site.footer;
  return (
    <footer>
      <div className="foot-inner">
        <div className="foot-top">
          <div className="foot-brand">
            <SiteImage className="mark" image={images.mark} lang={lang} sizes="60px" loading="eager" />
            <div>
              <div className="foot-word">{brand.wordmark}</div>
              <div className="foot-subtitle" lang="en">
                {brand.subtitle}
              </div>
              <div className="label foot-place">
                <span lang="it">{`${brand.town} · ${brand.province}`}</span>
                {' · '}
                <span>{f.country}</span>
              </div>
            </div>
          </div>
          <div className="foot-news">
            <div className="foot-col-title">{f.newsletter.title}</div>
            <p>{f.newsletter.text}</p>
            <a className="text-link" href={signupUrl[lang]}>
              {f.newsletter.linkLabel} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <div className="foot-columns">
          <div className="foot-col">
            <div className="foot-col-title">{f.columns.explore}</div>
            <Link href={pagePath(lang, 'fundraising')}>{site.nav.fundraising}</Link>
            <Link href={pagePath(lang, 'story')}>{site.nav.story}</Link>
            <Link href={pagePath(lang, 'vision')}>{site.nav.vision}</Link>
            <Link href={pagePath(lang, 'experiences')}>{site.nav.experiences}</Link>
            <Link href={pagePath(lang, 'blog')}>{site.nav.blog}</Link>
          </div>
          <div className="foot-col">
            <div className="foot-col-title">{f.columns.contact}</div>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
          <div className="foot-col">
            <div className="foot-col-title">{f.columns.follow}</div>
            <a href={contact.instagramUrl} target="_blank" rel="noopener">
              {f.instagramLabel}
            </a>
          </div>
          <div className="foot-col">
            <div className="foot-col-title">{f.columns.legal}</div>
            <Link href={pagePath(lang, 'privacy')}>{f.privacyLabel}</Link>
            <Link href={pagePath(lang, 'terms')}>{f.termsLabel}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
