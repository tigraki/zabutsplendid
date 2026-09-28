'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import type { Lang } from '@/content/types';
import { LANGS } from '@/lib/i18n';
import { NAV_KEY, pagePath, parsePathname } from '@/lib/routes';

type NavKey = 'fundraising' | 'story' | 'experiences' | 'blog' | 'contact';
const NAV_ORDER: NavKey[] = ['fundraising', 'story', 'experiences', 'blog', 'contact'];

/**
 * Main nav, language switcher and the mobile menu button.
 * Ported behaviours:
 * - menu button toggles `.open` on the nav and keeps aria-expanded in sync;
 * - any link in the menu (pages or languages) closes it;
 * - the current section's link gets aria-current="page";
 * - the language switcher links to the same page in the chosen language.
 */
export function NavMenu({
  lang,
  labels,
  menuButtonLabel,
  languageSwitcherLabel,
}: {
  lang: Lang;
  labels: Record<NavKey, string>;
  menuButtonLabel: string;
  languageSwitcherLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const { key } = parsePathname(usePathname());
  const currentNav = key ? NAV_KEY[key] : undefined;
  const close = () => setOpen(false);

  return (
    <>
      <nav className={open ? 'nav-links open' : 'nav-links'} id="navLinks">
        {NAV_ORDER.map((nav) => (
          <Link
            key={nav}
            href={pagePath(lang, nav)}
            data-nav={nav}
            aria-current={currentNav === nav ? 'page' : undefined}
            onClick={close}
          >
            {labels[nav]}
          </Link>
        ))}
        <div className="lang-switch" role="group" aria-label={languageSwitcherLabel}>
          {LANGS.map((l) => (
            // Plain <a>: each language is its own root layout (<html lang>), so this is a full load.
            <a
              key={l}
              href={pagePath(l, key ?? 'home')}
              hrefLang={l}
              lang={l}
              aria-current={l === lang ? 'page' : undefined}
              onClick={close}
            >
              {l.toUpperCase()}
            </a>
          ))}
        </div>
      </nav>
      <button
        className="nav-toggle-btn"
        id="navToggle"
        aria-label={menuButtonLabel}
        aria-expanded={open ? 'true' : 'false'}
        onClick={() => setOpen((o) => !o)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </>
  );
}
