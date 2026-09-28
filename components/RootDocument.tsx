import type { ReactNode } from 'react';
import type { Lang } from '@/content/types';
import { cormorant, playfair } from '@/lib/fonts';
import { Footer } from './Footer';
import { Header } from './Header';
import { DEFAULT_PALETTE } from '@/lib/palette';

import '@/styles/tokens.css';
import '@/styles/base.css';
import '@/styles/layout.css';
import '@/styles/components.css';

/**
 * The <html> document shared by every language. Each language has its own root layout
 * (app/(en)/layout.tsx, app/(intl)/[lang]/layout.tsx) so <html lang> is correct in the
 * static HTML; both render through this component.
 */
export function RootDocument({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html
      lang={lang}
      data-palette={DEFAULT_PALETTE}
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${playfair.variable}`}
    >
      <body>
        <Header lang={lang} />
        <main id="app">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
