import Link from 'next/link';
import type { Lang, PostSlug } from '@/content/types';
import { posts } from '@/content/shared';
import { formatDate, getContent } from '@/lib/i18n';
import { pagePath } from '@/lib/routes';
import { ArticleBody } from '../ArticleBody';
import { PageIntro } from '../PageIntro';
import { Spark } from '../Spark';

export function BlogPostPage({ lang, slug }: { lang: Lang; slug: PostSlug }) {
  const content = getContent(lang);
  const blog = content.pages.blog;
  const post = content.posts[slug];
  const meta = posts.find((p) => p.slug === slug);
  if (!meta) throw new Error(`Unknown post ${slug}`);
  return (
    <section className="page" data-page={`post-${slug}`} id={`page-post-${slug}`}>
      <PageIntro
        before={
          <Link className="back-link label" href={pagePath(lang, 'blog')}>
            {blog.allPostsLabel}
          </Link>
        }
        label={`${blog.label} · ${formatDate(meta.publishedAt, lang)}`}
        title={post.title}
        intro={post.summary}
      />
      <div className="wrap">
        <div className="story">
          <div className="body-copy">
            <ArticleBody body={post.body} />
            <div className="signoff">
              <p className="signoff-name">{post.signoff.name}</p>
              <p className="signoff-role label">{post.signoff.role}</p>
            </div>
            <Spark sizes="40px" />
          </div>
        </div>
      </div>
    </section>
  );
}
