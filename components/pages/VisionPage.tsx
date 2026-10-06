import Image from 'next/image';
import Link from 'next/link';
import type { Lang } from '@/content/types';
import { signupUrl } from '@/content/shared';
import { vision, type VisionBlock, type VisionImage, type VisionLink, type VisionList, type VisionSection } from '@/content/vision';
import { pagePath } from '@/lib/routes';
import { Spark } from '../Spark';
import { VisionSwitchGallery } from '../VisionSwitchGallery';

/*
 * Vision page. Every word and image comes from content/vision.ts.
 *
 * Image layout (no per-image layout fields, so the data stays CMS-shaped):
 * - three or more images: Slider / Tiles switch (VisionSwitchGallery), tiles first;
 * - otherwise each image runs at the same width and shape: 60rem wide, cropped to 16:9,
 *   matching the slider.
 */

const SIZES = '(max-width: 64rem) calc(100vw - 2.5rem), 960px';

function VisionFigure({ image, lang, priority = false }: { image: VisionImage; lang: Lang; priority?: boolean }) {
  return (
    <figure className="figure vision-figure">
      <div className="vision-frame">
        <Image
          className="illustration"
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.alt[lang]}
          sizes={SIZES}
          preload={priority}
          loading={priority ? 'eager' : 'lazy'}
        />
        {image.concept && <span className="vision-concept">{vision.ui.conceptLabel[lang]}</span>}
      </div>
      {image.caption && <figcaption className="caption">{image.caption[lang]}</figcaption>}
    </figure>
  );
}

/** Galleries of this many images or more get the Slider / Tiles switch. */
const SWITCH_FROM = 3;

function Gallery({ images, lang }: { images: VisionImage[]; lang: Lang }) {
  if (images.length === 0) return null;
  if (images.length >= SWITCH_FROM) {
    const g = vision.ui.gallery;
    return (
      <div className="vision-gallery">
        <VisionSwitchGallery
          images={images.map((i) => ({ src: i.src, alt: i.alt[lang], caption: i.caption?.[lang], concept: i.concept }))}
          labels={{
            group: g.group[lang],
            slider: g.slider[lang],
            tiles: g.tiles[lang],
            previous: g.previous[lang],
            next: g.next[lang],
            viewInSlider: g.viewInSlider[lang],
            position: g.position[lang],
            hint: g.hint[lang],
            hintTouch: g.hintTouch[lang],
            concept: vision.ui.conceptLabel[lang],
          }}
        />
      </div>
    );
  }
  return (
    <div className="vision-gallery">
      {images.map((image) => (
        <VisionFigure key={image.src} image={image} lang={lang} />
      ))}
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
        <div className="vision-gallery vision-gallery--hero">
          <VisionFigure image={intro.hero} lang={lang} priority />
        </div>
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
