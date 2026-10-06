import Link from 'next/link';
import type { Lang } from '@/content/types';
import { brand, images } from '@/content/shared';
import { getContent } from '@/lib/i18n';
import { pagePath } from '@/lib/routes';
import { HeaderShell } from './HeaderShell';
import { NavMenu } from './NavMenu';
import { SiteImage } from './SiteImage';

export function Header({ lang }: { lang: Lang }) {
  const site = getContent(lang).site;
  return (
    <HeaderShell>
      <div className="nav-inner">
        <Link className="nav-brand" href={pagePath(lang, 'home')}>
          <SiteImage className="mark" image={images.mark} lang={lang} decorative sizes="32px" loading="eager" />
          <span>{brand.wordmark}</span>
        </Link>
        <NavMenu
          lang={lang}
          labels={site.nav}
          menuButtonLabel={site.header.menuButtonLabel}
          languageSwitcherLabel={site.header.languageSwitcherLabel}
        />
      </div>
    </HeaderShell>
  );
}
