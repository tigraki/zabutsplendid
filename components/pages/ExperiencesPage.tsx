import Link from 'next/link';
import type { Lang } from '@/content/types';
import { offers, signupUrl } from '@/content/shared';
import { getContent } from '@/lib/i18n';
import { pagePath } from '@/lib/routes';
import { PageIntro } from '../PageIntro';
import { SiteImage } from '../SiteImage';

const OFFER_SIZES =
  '(max-width: 36rem) calc(100vw - 2.5rem), (max-width: 55rem) 45vw, (max-width: 73.75rem) 30vw, 340px';

export function ExperiencesPage({ lang }: { lang: Lang }) {
  const c = getContent(lang).pages.experiences;
  return (
    <section className="page" data-page="experiences" id="page-experiences-overview">
      <PageIntro label={c.label} title={c.title} intro={c.intro} />
      <div className="wrap">
        <div className="offer-grid">
          {offers.map((offer) => (
            <div className="offer" key={offer.key}>
              <SiteImage className="card-img" image={offer.image} lang={lang} sizes={OFFER_SIZES} />
              <h3>{c.offers[offer.key].title}</h3>
              <p>{c.offers[offer.key].text}</p>
            </div>
          ))}
        </div>
        <p className="caption offer-caption">{c.caption}</p>
        <div className="offer-close">
          <h2>{c.close.title}</h2>
          <p>{c.close.text}</p>
          <div className="fund-cta-row">
            <Link className="cta" href={pagePath(lang, 'contact')}>
              {c.close.primaryCta}
            </Link>
            <a className="cta cta-outline" href={signupUrl[lang]}>
              {c.close.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
