/**
 * Content model. Every language file (en.ts, it.ts, tr.ts) exports one object of
 * type `SiteContent`, so all three always have the identical shape.
 *
 * Each entry under `pages` and `posts` is self-contained on purpose: it maps 1:1 to
 * a future CMS document per page per language. `site` holds the chrome that every
 * page shares (header, footer, image alt text, SEO defaults).
 *
 * Copy only. Anything that is the same in every language (image files, URLs,
 * amounts, dates, brand words) lives in content/shared.ts.
 */

export type Lang = 'en' | 'it' | 'tr';

/**
 * Plain text in which `{email}` is replaced by the contact address from shared.ts,
 * rendered as a mailto link.
 */
export type RichText = string;

export type ImageAltKey =
  | 'mark'
  | 'markHero'
  | 'homeTerra'
  | 'privateEvents'
  | 'weddings'
  | 'retreats'
  | 'workshops'
  | 'table'
  | 'land'
  | 'fundTable'
  | 'panorama'
  | 'storyIllustration';

export type PillarKey = 'terra' | 'persone' | 'storie';
export type OfferKey = 'weddings' | 'privateEvents' | 'retreats' | 'workshops' | 'table' | 'land';
export type BudgetRowId =
  | 'property'
  | 'guestHouses'
  | 'weddingSetting'
  | 'entrance'
  | 'restaurants'
  | 'bathrooms'
  | 'digital'
  | 'contingency'
  | 'seed'
  | 'transport'
  | 'company'
  | 'total';
export type PostSlug = 'land-vision';

export interface BodySection {
  /** Sub-heading (h3). */
  title: string;
  paragraphs: string[];
  /** Italic closing line after the paragraphs. */
  italicLine?: string;
}

/** Long-form body: untitled opening paragraphs, then titled sections. */
export interface ArticleBody {
  opening: string[];
  sections: BodySection[];
}

export interface PageIntro {
  label: string;
  title: string;
  intro: string;
}

export interface SiteChrome {
  meta: {
    siteName: string;
    /** Meta / Open Graph description, used on every page. */
    description: string;
    /** Open Graph locale, e.g. en_US. */
    ogLocale: string;
  };
  header: {
    menuButtonLabel: string;
    languageSwitcherLabel: string;
  };
  nav: {
    fundraising: string;
    story: string;
    experiences: string;
    blog: string;
    contact: string;
  };
  footer: {
    country: string;
    newsletter: { title: string; text: string; linkLabel: string };
    columns: { explore: string; contact: string; follow: string; legal: string };
    instagramLabel: string;
    privacyLabel: string;
    termsLabel: string;
  };
  /** Alt text for every image, keyed from content/shared.ts. */
  images: Record<ImageAltKey, string>;
  behaviours: {
    /** Temporary text the cookie-preferences button shows when clicked (placeholder). */
    cookiePreferencesPlaceholder: string;
  };
}

export interface HomePage {
  place: { country: string };
  hero: { primaryCta: string; secondaryCta: string };
  essence: string;
  project: {
    label: string;
    title: string;
    lead: string[];
    pillars: Record<PillarKey, string>;
    caption: string;
    cta: string;
  };
  location: { title: string };
}

export interface FundraisingPage extends PageIntro {
  figureCaption: string;
  budget: {
    title: string;
    rows: Record<BudgetRowId, { label: string; note?: string; tip?: string }>;
    pendingValue: string;
    totalValue: string;
    infoButtonLabel: string;
    /** How amounts from shared.ts are written in this language. */
    currency: { symbol: string; position: 'before' | 'after'; groupSeparator: string };
  };
  deckNote: { label: string; text: string; linkLabel: string };
  support: BodySection;
  primaryCta: string;
  secondaryCta: string;
  closing: string;
}

export interface StoryPage extends PageIntro {
  figureCaption: string;
  body: ArticleBody;
  cta: string;
  pullQuote: string;
}

export interface ExperiencesPage extends PageIntro {
  offers: Record<OfferKey, { title: string; text: string }>;
  caption: string;
  close: { title: string; text: string; primaryCta: string; secondaryCta: string };
}

export interface BlogPage extends PageIntro {
  /** Back link on every post page. */
  allPostsLabel: string;
}

export interface BlogPost {
  title: string;
  summary: string;
  body: ArticleBody;
  signoff: { name: string; role: string };
}

export interface ContactPage extends PageIntro {
  signupCta: string;
  emailLabel: string;
  followLabel: string;
}

export interface LegalPage {
  label: string;
  title: string;
  paragraphs: RichText[];
}

export interface SiteContent {
  site: SiteChrome;
  pages: {
    home: HomePage;
    fundraising: FundraisingPage;
    story: StoryPage;
    experiences: ExperiencesPage;
    blog: BlogPage;
    contact: ContactPage;
    privacy: LegalPage;
    terms: LegalPage;
  };
  posts: Record<PostSlug, BlogPost>;
}
