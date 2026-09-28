/**
 * Colour palettes. The active one is the `data-palette` attribute on <html>;
 * styles/tokens.css defines the warm palette on :root and the silver overrides on
 * [data-palette="silver"].
 */
export const PALETTES = ['warm', 'silver'] as const;
export type Palette = (typeof PALETTES)[number];
export const DEFAULT_PALETTE: Palette = 'warm';

/** Switch the whole site to a palette (client only). */
export function setPalette(palette: Palette): void {
  document.documentElement.dataset.palette = palette;
}

export function getPalette(): Palette {
  const value = document.documentElement.dataset.palette;
  return (PALETTES as readonly string[]).includes(value ?? '') ? (value as Palette) : DEFAULT_PALETTE;
}
