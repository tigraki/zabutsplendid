'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Footer "cookie preferences" button — placeholder behaviour ported from the reference:
 * clicking swaps its label for a notice (site.behaviours.cookiePreferencesPlaceholder)
 * for 2.2 seconds, then restores it. No consent logic, no tracking.
 *
 * NOT RENDERED anywhere yet: the reference script wires #cookiePrefsBtn, but the
 * button itself is not in the reference markup. To show it, add e.g. in Footer's
 * Legal column:
 *   <CookiePreferencesButton placeholder={site.behaviours.cookiePreferencesPlaceholder}>
 *     {label}
 *   </CookiePreferencesButton>
 */
export function CookiePreferencesButton({ placeholder, children }: { placeholder: string; children: ReactNode }) {
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <button
      type="button"
      className="foot-link-btn"
      id="cookiePrefsBtn"
      onClick={() => {
        setShowPlaceholder(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setShowPlaceholder(false), 2200);
      }}
    >
      {showPlaceholder ? placeholder : children}
    </button>
  );
}
