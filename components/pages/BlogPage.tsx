import Link from 'next/link';
import type { Lang } from '@/content/types';
import { posts } from '@/content/shared';
import { formatDate, getContent } from '@/lib/i18n';
import { pagePath, type PageKey } from '@/lib/routes';

export function BlogPage({ lang }: { lang: Lang }) {
  const content = getContent(lang);
  const c = content.pages.blog;
  return (
    <section className="page" data-page="blog" id="page-blog">
      <div className="page-intro wrap">
        <div className="label" id="blogPageLabel">
          {c.label}
        </div>
        <h1 id="blogPageH1">{c.title}</h1>
        <p id="blogPageIntro">{c.intro}</p>
      </div>
      <div className="wrap">
        <div className="blog-list">
          {posts.map((post) => {
            const p = content.posts[post.slug];
            return (
              <Link className="blog-row" href={pagePath(lang, `post-${post.slug}` as PageKey)} key={post.slug}>
                <div className="blog-date">{formatDate(post.publishedAt, lang)}</div>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>
                </div>
                <span className="pathway-arrow">&rarr;</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

