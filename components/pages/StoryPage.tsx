import type { Lang } from '@/content/types';
import { images, signupUrl } from '@/content/shared';
import { getContent } from '@/lib/i18n';
import { ArticleBody } from '../ArticleBody';
import { PageIntro } from '../PageIntro';
import { SiteImage } from '../SiteImage';
import { Spark } from '../Spark';

export function StoryPage({ lang }: { lang: Lang }) {
  const c = getContent(lang).pages.story;
  return (
    <section className="page" data-page="story" id="page-story">
      <PageIntro label={c.label} title={c.title} intro={c.intro} />
      <div className="wrap">
        <div className="story">
          <figure className="figure">
            <SiteImage
              className="illustration"
              image={images.storyIllustration}
              lang={lang}
              sizes="(max-width: 52rem) calc(100vw - 2.5rem), 768px"
              loading="eager"
              exactRatio
            />
            <figcaption className="caption">{c.figureCaption}</figcaption>
          </figure>
          <div className="body-copy story-copy">
            <ArticleBody body={c.body} lastHeadingId="storyEndingHead" />
            <a className="cta" href={signupUrl[lang]}>
              {c.cta}
            </a>
          </div>
        </div>
      </div>
      <div className="pull-quote wrap">
        <Spark sizes="32px" />
        <p>{c.pullQuote}</p>
      </div>
    </section>
  );
}
