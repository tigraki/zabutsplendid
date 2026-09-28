'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, type ReactNode } from 'react';

/**
 * <header class="site-nav"> with two ported behaviours:
 * - adds `.scrolled` once the page has scrolled more than 8px (and re-checks after navigation);
 * - jumps to the top instantly on every page change, like the reference router's
 *   `scrollTo({ top: 0, behavior: 'instant' })`.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    const setScrolled = () => header.classList.toggle('scrolled', window.scrollY > 8);
    setScrolled();
    window.addEventListener('scroll', setScrolled, { passive: true });
    return () => window.removeEventListener('scroll', setScrolled);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const id = requestAnimationFrame(() => ref.current?.classList.toggle('scrolled', window.scrollY > 8));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <header className="site-nav" ref={ref}>
      {children}
    </header>
  );
}
