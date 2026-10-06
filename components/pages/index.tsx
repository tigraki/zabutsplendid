import type { Lang } from '@/content/types';
import type { PageKey } from '@/lib/routes';
import { BlogPage } from './BlogPage';
import { BlogPostPage } from './BlogPostPage';
import { ContactPage } from './ContactPage';
import { ExperiencesPage } from './ExperiencesPage';
import { FundraisingPage } from './FundraisingPage';
import { HomePage } from './HomePage';
import { LegalPage } from './LegalPage';
import { StoryPage } from './StoryPage';
import { VisionPage } from './VisionPage';

/** One component per page; every language renders through the same component. */
export function PageView({ lang, page }: { lang: Lang; page: PageKey }) {
  switch (page) {
    case 'home':
      return <HomePage lang={lang} />;
    case 'fundraising':
      return <FundraisingPage lang={lang} />;
    case 'story':
      return <StoryPage lang={lang} />;
    case 'vision':
      return <VisionPage lang={lang} />;
    case 'experiences':
      return <ExperiencesPage lang={lang} />;
    case 'blog':
      return <BlogPage lang={lang} />;
    case 'post-land-vision':
      return <BlogPostPage lang={lang} slug="land-vision" />;
    case 'contact':
      return <ContactPage lang={lang} />;
    case 'privacy':
    case 'terms':
      return <LegalPage lang={lang} page={page} />;
  }
}
