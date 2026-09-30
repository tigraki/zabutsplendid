import Link from 'next/link';
import type { Lang } from '@/content/types';
import { budget, images, signupUrl } from '@/content/shared';
import { formatAmount, getContent } from '@/lib/i18n';
import { pagePath } from '@/lib/routes';
import { BudgetBreakdown, type BudgetRowView } from '../BudgetBreakdown';
import { PageIntro } from '../PageIntro';
import { SiteImage } from '../SiteImage';

export function FundraisingPage({ lang }: { lang: Lang }) {
  const c = getContent(lang).pages.fundraising;
  const rows: BudgetRowView[] = budget.map((row) => {
    const copy = c.budget.rows[row.id];
    const value =
      'amount' in row
        ? formatAmount(row.amount, c.budget.currency, row.currency)
        : row.kind === 'total'
          ? c.budget.totalValue
          : row.status === 'toBudget'
            ? c.budget.toBudgetValue
            : c.budget.pendingValue;
    return {
      id: row.id,
      kind: row.kind,
      label: copy.label,
      note: copy.note,
      value,
      tip: 'tipId' in row && row.tipId && copy.tip ? { id: row.tipId, text: copy.tip } : undefined,
    };
  });

  return (
    <section className="page" data-page="fundraising" id="page-fundraising">
      <PageIntro label={c.label} title={c.title} intro={c.intro} />
      <div className="wrap">
        <figure className="figure fund-figure">
          <SiteImage
            className="illustration"
            image={images.fundTable}
            lang={lang}
            sizes="(max-width: 64rem) calc(100vw - 2.5rem), 960px"
          />
          <figcaption className="caption">{c.figureCaption}</figcaption>
        </figure>
        <h2 className="fund-section-head">{c.budget.title}</h2>
        <div className="fund-ask">
          <BudgetBreakdown rows={rows} infoButtonLabel={c.budget.infoButtonLabel} />
        </div>
        <div className="deck-note">
          <div className="label">{c.deckNote.label}</div>
          <p>{c.deckNote.text}</p>
          <a className="text-link" href={signupUrl[lang]}>
            {c.deckNote.linkLabel} <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        <div className="story">
          <div className="body-copy">
            <h3 className="story-subhead">{c.support.title}</h3>
            {c.support.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="fund-cta-row">
            <a className="cta" href={signupUrl[lang]}>
              {c.primaryCta}
            </a>
            <Link className="cta cta-outline" href={pagePath(lang, 'blog')}>
              {c.secondaryCta}
            </Link>
          </div>
          <div className="body-copy">
            <p>{c.closing}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
