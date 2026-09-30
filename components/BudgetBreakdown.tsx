'use client';

import { useEffect, useState } from 'react';

export interface BudgetRowView {
  id: string;
  kind: 'item' | 'itemsSubtotal' | 'subtotal' | 'pending' | 'total';
  label: string;
  note?: string;
  value: string;
  tip?: { id: string; text: string };
}

const ROW_CLASS: Record<BudgetRowView['kind'], string> = {
  item: 'fund-row',
  itemsSubtotal: 'fund-row fund-items-subtotal',
  subtotal: 'fund-row fund-subtotal',
  pending: 'fund-row fund-pending',
  total: 'fund-row fund-total',
};

/**
 * Fundraising budget table with the (i) popovers.
 * Ported behaviour: hover shows a tip (pure CSS, `:has(.info:hover)`); a click/tap
 * toggles it open and closes any other; clicking anywhere else or pressing Escape
 * closes all.
 */
export function BudgetBreakdown({ rows, infoButtonLabel }: { rows: BudgetRowView[]; infoButtonLabel: string }) {
  const [openTip, setOpenTip] = useState<string | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // The (i) buttons handle their own clicks; React listens on the same node, so
      // ignore them here instead of relying on stopPropagation.
      if (e.target instanceof Element && e.target.closest('.info')) return;
      setOpenTip(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenTip(null);
    };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <dl className="fund-breakdown">
      {rows.map((row) => {
        const tip = row.tip;
        const open = tip !== undefined && openTip === tip.id;
        return (
          <div className={ROW_CLASS[row.kind]} key={row.id}>
            <dt>
              {row.label}
              {tip !== undefined && (
                <>
                  {' '}
                  <button
                    type="button"
                    className="info"
                    aria-label={infoButtonLabel}
                    aria-expanded={open ? 'true' : 'false'}
                    aria-controls={tip.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenTip(open ? null : tip.id);
                    }}
                  >
                    i
                  </button>
                </>
              )}
              {row.note !== undefined && (
                <>
                  {' '}
                  <span className="fund-note">{row.note}</span>
                </>
              )}
            </dt>
            <dd>{row.value}</dd>
            {tip !== undefined && (
              <dd className={open ? 'tip open' : 'tip'} id={tip.id} role="tooltip">
                {tip.text}
              </dd>
            )}
          </div>
        );
      })}
    </dl>
  );
}
