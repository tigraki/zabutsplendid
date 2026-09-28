import type { Lang } from '@/content/types';
import { getContent } from '@/lib/i18n';
import { RichText } from '../RichText';

export function LegalPage({ lang, page }: { lang: Lang; page: 'privacy' | 'terms' }) {
  const c = getContent(lang).pages[page];
  return (
    <section className="page" data-page={page} id={`page-${page}`}>
      <div className="page-intro wrap">
        <div className="label">{c.label}</div>
        <h1>{c.title}</h1>
      </div>
      <div className="wrap">
        <div className="story">
          <div className="body-copy">
            {c.paragraphs.map((p, i) => (
              <p key={i}>
                <RichText text={p} />
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
