import type { ArticleBody as ArticleBodyValue } from '@/content/types';

/** Opening paragraphs, then h3 sections, each optionally closed by an italic line. */
export function ArticleBody({ body, lastHeadingId }: { body: ArticleBodyValue; lastHeadingId?: string }) {
  const last = body.sections.length - 1;
  return (
    <>
      {body.opening.map((p, i) => (
        <p key={`o${i}`}>{p}</p>
      ))}
      {body.sections.map((section, s) => [
        <h3 className="story-subhead" key={`h${s}`} id={s === last ? lastHeadingId : undefined}>
          {section.title}
        </h3>,
        ...section.paragraphs.map((p, i) => <p key={`p${s}-${i}`}>{p}</p>),
        section.italicLine !== undefined ? (
          <span className="italic-line" key={`i${s}`}>
            {section.italicLine}
          </span>
        ) : null,
      ])}
    </>
  );
}
