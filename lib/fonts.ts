import { Cormorant_Garamond, Playfair_Display } from 'next/font/google';

/*
 * Same families, weights and styles as the reference site's Google Fonts request.
 * Exposed as CSS variables; styles/tokens.css builds --serif-body / --serif-display
 * from them, followed by the reference's own fallback stacks.
 * `adjustFontFallback: false` asks for the reference's fallback stack to be used as is;
 * Turbopack (the default bundler in Next.js 16) currently ignores it and still adds a
 * metric-adjusted Times New Roman fallback. `next build --webpack` honours it. See README.
 */
export const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
  adjustFontFallback: false,
});

export const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-playfair',
  adjustFontFallback: false,
});
