import Link from 'next/link';
import type { Lang } from '@/content/types';
import { brand, images, pillars, signupUrl } from '@/content/shared';
import { getContent } from '@/lib/i18n';
import { pagePath } from '@/lib/routes';
import { SiteImage } from '../SiteImage';
import { Spark } from '../Spark';

const CARD_SIZES = '(max-width: 48rem) calc(100vw - 2.5rem), (max-width: 73.75rem) 30vw, 350px';

export function HomePage({ lang }: { lang: Lang }) {
  const c = getContent(lang).pages.home;
  return (
    <section className="page" data-page="home" id="page-home">
      <div className="hero">
        <SiteImage className="mark" id="heroMark" image={images.markHero} lang={lang} sizes="(min-width: 100rem) 134px, 112px" preload />
        <h1>{brand.wordmark}</h1>
        <div className="label" lang="en">
          {brand.subtitle}
        </div>
        <p className="place">
          <span lang="it">{brand.town}</span>
          {' · '}
          <span>{c.place.country}</span>
        </p>
        <div className="hero-ctas">
          <Link className="cta" href={pagePath(lang, 'fundraising')} id="heroCta">
            {c.hero.primaryCta}
          </Link>
          <a className="cta cta-outline" href={signupUrl[lang]}>
            {c.hero.secondaryCta}
          </a>
        </div>
      </div>

      <div className="essence">
        <div className="label">{c.essence}</div>
      </div>
      <div className="rule-spark">
        <hr className="rule" />
        <Spark sizes="24px" />
      </div>

      <section className="project wrap">
        <div className="project-grid">
          <div className="project-head">
            <div className="label">{c.project.label}</div>
            <h2>{c.project.title}</h2>
          </div>
          <div className="project-lead">
            {c.project.lead.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <div className="pillars">
          {pillars.map((pillar) => (
            <div className="pillar" key={pillar.key}>
              <SiteImage className="card-img" image={pillar.image} lang={lang} sizes={CARD_SIZES} />
              <div className="label" lang="it">
                {pillar.label}
              </div>
              <p>{c.project.pillars[pillar.key]}</p>
            </div>
          ))}
        </div>
        <p className="caption pillars-caption">{c.project.caption}</p>
        <Link className="cta project-link" href={pagePath(lang, 'fundraising')}>
          {c.project.cta}
        </Link>
      </section>

      <section className="home-place wrap">
        <SiteImage
          className="illustration panorama"
          image={images.panorama}
          lang={lang}
          sizes="(max-width: 73.75rem) calc(100vw - 2.5rem), 1116px"
        />
        <div className="location">
          <h2>{c.location.title}</h2>
        </div>
      </section>
    </section>
  );
}
