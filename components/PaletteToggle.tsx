'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { getPalette, setPalette, type Palette } from '@/lib/palette';

/**
 * Palette switch (warm ⇄ silver), styled by the reference's `.palette-toggle` class.
 *
 * NOT RENDERED anywhere yet: the reference keeps the data-palette mechanism and the
 * silver palette in its CSS, but has no toggle in its markup. Drop
 * <PaletteToggle>{label}</PaletteToggle> into the header or footer to expose it.
 */
export function PaletteToggle({ children }: { children: ReactNode }) {
  const [palette, setState] = useState<Palette>('warm');
  useEffect(() => setState(getPalette()), []);
  return (
    <button
      type="button"
      className="palette-toggle"
      aria-pressed={palette === 'silver'}
      onClick={() => {
        const next: Palette = palette === 'warm' ? 'silver' : 'warm';
        setPalette(next);
        setState(next);
      }}
    >
      {children}
    </button>
  );
}
