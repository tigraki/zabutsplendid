import Image from 'next/image';
import Link from 'next/link';
import type { Lang } from '@/content/types';
import { signupUrl } from '@/content/shared';
import { vision, type VisionBlock, type VisionImage, type VisionLink, type VisionList, type VisionSection } from '@/content/vision';
import { pagePath } from '@/lib/routes';
import { Spark } from '../Spark';

/*
 * Vision page. Every word and image comes from content/vision.ts.
 *
 * Image layout rules (no per-image layout fields, so the data stays CMS-shaped):
 * - large renders (≥ 1500px wide): the first one runs wide; one more runs wide too,
 *   several more sit in a grid (three columns on desktop when there are three or more);
 * - smaller concept visuals reused from the site sit at the reading width, or in a grid
 *   when there are several.
 */

const LARGE = 1500;
const SIZES = {
  hero: '(max-width: 73.75rem) calc(100vw - 2.5rem), 1116px',
  wide: '(max-width: 64rem) calc(100vw - 2.5rem), 960px',
  grid: '(max-width: 36rem) calc(100vw - 2.5rem), (max-width: 55rem) 46vw, 310px',
  measure: '(max-width: 40rem) calc(100vw - 2.5rem), 576px',
};

function VisionFigure({
  image,
  lang,
  variant,
  priority = false,
}: {
  image: VisionImage;
  lang: Lang;
  variant: keyof typeof SIZES;
  priority?: boolean;
}) {
  return (
    <figure className={`figure vision-figure vision-figure--${variant}`}>
      <div className="vision-frame">
        <Image
          className="illustration"
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.alt[lang]}
          sizes={SIZES[variant]}
          preload={priority}
          loading={priority ? 'eager' : 'lazy'}
          style={{ aspectRatio: `${image.width} / ${image.height}` }}
        />
        {image.concept && <span className="vision-concept">{vision.ui.conceptLabel[lang]}</span>}
      </div>
      {image.caption && <figcaption className="caption">{image.caption[lang]}</figcaption>}
    </figure>
  );
}

function Gallery({ images, lang }: { images: VisionImage[]; lang: Lang }) {
  if (images.length === 0) return null;
  const large = images.filter((i) => i.width >= LARGE);
  const small = images.filter((i) => i.width < LARGE);
  const [first, ...rest] = large;
  return (
    <div className="vision-gallery">
      {first && <VisionFigure image={first} lang={lang} variant="wide" />}
      {rest.length === 1 && <VisionFigure image={rest[0]!} lang={lang} variant="wide" />}
      {rest.length > 1 && (
        <div className={`vision-grid${rest.length >= 3 ? ' vision-grid--3' : ''}`}>
          {rest.map((image) => (
            <VisionFigure key={image.src} image={image} lang={lang} variant="grid" />
          ))}
        </div>
      )}
      {small.length === 1 && <VisionFigure image={small[0]!} lang={lang} variant="measure" />}
      {small.length > 1 && (
        <div className="vision-grid">
          {small.map((image) => (
            <VisionFigure key={image.src} image={image} lang={lang} variant="grid" />
          ))}
        </div>
      )}
    </div>
  );
}

function List({ list, lang }: { list: VisionList; lang: Lang }) {
  return (
    <div className="vision-list">
      <div className="label">{list.title[lang]}</div>
      <ul>
        {list.items[lang].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function Head({
  kicker,
  title,
  lead,
  lang,
  level,
}: {
  kicker?: VisionSection['kicker'];
  title: VisionSection['title'];
  lead?: VisionSection['lead'];
  lang: Lang;
  level: 2 | 3;
}) {
  const Title = level === 2 ? 'h2' : 'h3';
  return (
    <header className={`vision-head vision-head--h${level}`}>
      {kicker && <div className="label">{kicker[lang]}</div>}
      <Title>{title[lang]}</Title>
      {lead && <span className="italic-line">{lead[lang]}</span>}
    </header>
  );
}

function Block({ block, lang }: { block: VisionBlock; lang: Lang }) {
  return (
    <div className="vision-block" id={block.id}>
      <div className="body-copy">
        <Head kicker={block.kicker} title={block.title} lead={block.lead} lang={lang} level={3} />
        {block.text?.[lang].map((p) => <p key={p}>{p}</p>)}
        {block.list && <List list={block.list} lang={lang} />}
      </div>
      <Gallery images={block.images} lang={lang} />
    </div>
  );
}

function href(link: VisionLink, lang: Lang): string {
  return link.kind === 'signup' ? signupUrl[lang] : pagePath(lang, link.page);
}

function Section({ section, lang }: { section: VisionSection; lang: Lang }) {
  const verse = section.lines !== undefined;
  return (
    <section className={`vision-section wrap${verse ? ' vision-section--journey' : ''}`} id={section.id}>
      <div className="body-copy">
        <Head
          kicker={section.kicker}
          title={section.title}
          lead={verse ? undefined : section.lead}
          lang={lang}
          level={2}
        />
      </div>
      {verse && (
        <div className="pull-quote vision-verse">
          <Spark sizes="32px" />
          {section.lines![lang].map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      )}
      <div className="body-copy">
        {verse && section.lead && <h3 className="story-subhead">{section.lead[lang]}</h3>}
        {section.text[lang].map((p) => <p key={p}>{p}</p>)}
        {section.list && <List list={section.list} lang={lang} />}
      </div>
      {section.table && (
        <table className="vision-table">
          <thead>
            <tr>
              {section.table.headings[lang].map((h) => (
                <th key={h} scope="col" className="label">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.table.rows.map((row) => (
              <tr key={row.title.en}>
                <th scope="row">{row.title[lang]}</th>
                <td>{row.text[lang]}</td>
                <td className="vision-format">{row.format[lang]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {section.note && <p className="fund-caveat vision-note">{section.note[lang]}</p>}
      <Gallery images={section.images} lang={lang} />
      {section.blocks?.map((block) => <Block key={block.id} block={block} lang={lang} />)}
      {section.ctas && (
        <div className="fund-cta-row">
          {section.ctas.map((cta) => {
            const cls = cta.style === 'outline' ? 'cta cta-outline' : 'cta';
            return cta.link.kind === 'page' ? (
              <Link key={cta.label.en} className={cls} href={href(cta.link, lang)}>
                {cta.label[lang]}
              </Link>
            ) : (
              <a key={cta.label.en} className={cls} href={href(cta.link, lang)}>
                {cta.label[lang]}
              </a>
            );
          })}
        </div>
      )}
    </section>
  );
}

export function VisionPage({ lang }: { lang: Lang }) {
  const { intro, sections } = vision;
  return (
    <section className="page" data-page="vision" id="page-vision">
      <div className="page-intro wrap">
        <div className="label">{intro.label[lang]}</div>
        <h1>{intro.title[lang]}</h1>
        <p>{intro.lead[lang]}</p>
      </div>
      <div className="wrap">
        <VisionFigure image={intro.hero} lang={lang} variant="hero" priority />
        <div className="body-copy vision-intro-copy">
          {intro.text[lang].map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <p className="fund-caveat vision-note">{intro.note[lang]}</p>
        <Gallery images={intro.images} lang={lang} />
      </div>
      {sections.map((section) => (
        <Section key={section.id} section={section} lang={lang} />
      ))}
    </section>
  );
}
