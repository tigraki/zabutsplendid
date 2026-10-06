# Zabut the Splendid — website

Next.js (App Router, TypeScript strict) port of the single-file Zabut site in
`reference/`. It is a platform change, not a redesign: every page renders the same
markup, classes and CSS as the reference, statically generated in English, Italian and
Turkish.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (static pages)
npm start
npm run typecheck  # tsc --noEmit
npm run verify     # visual + computed-style diff vs reference/ (see Verification)
npm run verify:behaviour
```

Runtime dependencies are only `next`, `react` and `react-dom`. Dev dependencies:
`typescript`, the `@types/*` packages, and `playwright` (used only by the verification
scripts in `scripts/`).

### Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public base URL for canonical, hreflang, Open Graph, the sitemap and robots.txt. Built-in default: `https://www.zabutsplendid.com` (www, because the bare domain 308-redirects to it on Vercel). Only set it to override; it is read at build time, so a change needs a redeploy. |

Deploy on Vercel as a standard Next.js project. There is no `output: "export"`, so API
routes can be added under `app/api/` later.

---

## Folder structure

```
app/
  (en)/                     English route tree, served at the root (no prefix)
    layout.tsx              root layout → <html lang="en">
    page.tsx                /
    fundraising/ story/ vision/ experiences/ blog/ blog/land-vision/ contact/ privacy/ terms/
  (intl)/[lang]/            Italian and Turkish route tree: /it/..., /tr/...
    layout.tsx              root layout → <html lang="it|tr">, generateStaticParams = it, tr
    ...same page folders as (en)
  icon.png                  favicon (extracted from the reference)
  apple-icon.png            apple-touch icon (extracted from the reference)
  sitemap.ts, robots.ts     /sitemap.xml (every page × language, with alternates), /robots.txt
components/
  RootDocument.tsx          <html>/<body>, fonts, stylesheets, header, <main>, footer
  Header.tsx, Footer.tsx    site chrome (server components)
  HeaderShell.tsx           client: header .scrolled + scroll-to-top on navigation
  NavMenu.tsx               client: nav, aria-current, mobile menu, language switcher
  BudgetBreakdown.tsx       client: fundraising budget table with (i) popovers
  VisionSwitchGallery.tsx   client: Vision page Slider / Tiles gallery
  PaletteToggle.tsx         client: warm ⇄ silver palette switch (not rendered, see below)
  CookiePreferencesButton.tsx  client: cookie-preferences placeholder (not rendered, see below)
  PageIntro.tsx, ArticleBody.tsx, RichText.tsx, SiteImage.tsx, Spark.tsx   small helpers
  pages/                    one component per page, shared by all three languages
    index.tsx               PageView: page key → component
content/
  types.ts                  the content model (SiteContent)
  en.ts, it.ts, tr.ts       all copy, one file per language, identical shape
  shared.ts                 non-copy content shared by all languages
  vision.ts                 the Vision page: copy in all three languages side by side, and its images
lib/
  i18n.ts                   languages, getContent(), date and amount formatting
  routes.ts                 page keys ↔ URLs, current-page detection
  metadata.ts               per-page title, description, canonical, hreflang, OG, Twitter
  fonts.ts                  next/font/google setup
  palette.ts                palette names + set/get helpers
  site-url.ts               NEXT_PUBLIC_SITE_URL
styles/
  tokens.css                design tokens (single source of design values)
  base.css                  reset, document defaults, typography primitives, keyframes
  layout.css                container, header/nav, page shell, page intros, footer
  components.css            everything inside pages
public/
  images/                   site images: photos and concept visuals are high-quality JPEGs made
                            from the full-size originals in the project Drive (CONTENT FOR WEBSITE);
                            the logo mark (zabut-mark.webp) and the star (spark.png) are the reference's
  vision/                   Vision page renders (JPEG, see Vision page)
  og.jpg                    Open Graph / Twitter image
reference/                  the original site (read-only, not part of the build)
scripts/                    verification helpers (not part of the build); archive/ holds the
                            one-off migration scripts, kept for the record only (do not run)
```

The two route groups are there so each language gets its own root layout and therefore
the correct `<html lang>` in the static HTML, with English at the root and no rewrites,
redirects or middleware. Each `page.tsx` is a three-line wrapper; the page itself is in
`components/pages/`.

## Design tokens

All design values live in **`styles/tokens.css`**:

- **Palettes.** The warm palette is on `:root`; the silver palette overrides the five
  base colours on `[data-palette="silver"]`. The active palette is the `data-palette`
  attribute on `<html>` (set to `warm` in `components/RootDocument.tsx`; default in
  `lib/palette.ts`), exactly the reference's mechanism. Semantic colours (`--bg`, `--ink`,
  `--ink-soft`, `--accent`, `--line`, `--line-faint`) and every derived `color-mix()`
  colour (`--mix-<colour>-<percent>-<base>`) resolve against whichever palette is active.
- **Fonts.** `--serif-display` and `--serif-body` are built from the `next/font`
  variables `--font-playfair` and `--font-cormorant` (see `lib/fonts.ts`), followed by the
  reference's fallback stacks.
- **Type scale.** Fluid headings `--fs-h1/2/3`, font sizes `--fs-*`, line heights `--lh-*`,
  letter-spacing `--track-*` (plus `--track-caps`).
- **Spacing and layout.** `--space-*`, repeated fluid values `--fluid-*`, `--gutter`,
  `--container-max`, `--measure`, `--space-section`, `--size-*`.
- **Radii, borders, shadows, motion.** `--radius-*`, `--border-hair`, `--border-thick`,
  `--shadow-tip`, `--dur-*`, `--transition-palette`.

Scale tokens are named after their value so the visual match stays exact and a value is
easy to find: `--space-120` is 1.2rem, `--fs-078` is 0.78rem, `--track-260` is 0.26em,
`--lh-162` is 1.62.

The other stylesheets use tokens for every colour and every repeated size. Two things
stay literal by necessity or by rule: media-query breakpoints (CSS does not allow custom
properties inside `@media`), and one-off values that occur only once (mostly single-use
`clamp()` expressions).

The class names are the reference's. The CSS was split mechanically into
`base.css` → `layout.css` → `components.css` (imported in that order after `tokens.css`),
keeping the original source order inside each file so the cascade behaves the same. The
split and the value → token replacement were done by `scripts/archive/split-css.py`, and the
result was checked by comparing computed styles element by element (see *Verification*).

## Adding a page

1. **Route key.** Add the key and its slug to `PAGE_PATHS` in `lib/routes.ts` (and to
   `NAV_KEY` if a nav item should be marked current on it).
2. **Content model.** Add an interface for the page in `content/types.ts` and a field
   under `SiteContent['pages']`. TypeScript will then require the copy in all three
   language files.
3. **Copy.** Add the page's copy to `content/en.ts`, `content/it.ts` and `content/tr.ts`.
   Put anything that is not copy (images, links, numbers) in `content/shared.ts`.
4. **Component.** Create `components/pages/MyPage.tsx` taking `{ lang }`, reading
   `getContent(lang).pages.myPage`, and add it to the switch in `components/pages/index.tsx`.
5. **Title.** If the page has an h1, handle it in `pageHeading()` in `lib/metadata.ts`
   (the title is `<h1> · Zabut the Splendid`, as in the reference).
6. **Routes.** Add `app/(en)/my-page/page.tsx` and `app/(intl)/[lang]/my-page/page.tsx`;
   copy an existing pair and change the page key.
7. Link to it with `<Link href={pagePath(lang, 'myPage')}>`.

## How copy is organised

- **`content/en.ts`, `it.ts`, `tr.ts`** each export one `SiteContent` object, so the three
  files always have the same shape (the compiler enforces it).
  - `site`: chrome shared by all pages: SEO description, header labels, nav labels,
    footer, image alt text (`site.images`, keyed by the `alt` keys in `shared.ts`) and
    behaviour strings.
  - `pages.<page>`: one self-contained object per page with named fields (`label`,
    `title`, `intro`, sections, button labels…). Each maps directly to a future CMS
    document per page per language.
  - `posts.<slug>`: one object per journal post (title, summary, body sections, sign-off).
- **`content/shared.ts`**: everything identical in all languages: image files and their
  sizes, the Fillout signup URLs, email and Instagram, budget amounts (formatted per
  language with the `currency` settings in each language's fundraising copy), post dates
  (formatted with `Intl.DateTimeFormat`), and brand words that stay the same in every
  language (`ZABUT`, `The Splendid`, `Sambuca di Sicilia`, `Agrigento`, and the Italian
  pillar labels `Terra` / `Persone` / `Storie`).
- `{email}` inside a legal paragraph is rendered as the mailto link.
- Copy was extracted verbatim from the reference HTML by `scripts/archive/extract-content.py`
  (no retyping), and the verification compares every text node against the reference.
  Don't rerun it: it rewrites the content files from the reference.

## Behaviours

Every behaviour in the reference script, and what happened to it:

| Reference behaviour | Status | Where |
| --- | --- | --- |
| Hash router: show one page, hide the rest | Replaced by real routes | `app/` |
| Router: `aria-current="page"` on the current nav item (via `NAV_PARENT`) | Ported; Blog is also current on the land-vision post (the reference's map only listed its older posts, so the visual diff reports the Blog link's colour there) | `NavMenu.tsx`, `NAV_KEY` in `lib/routes.ts` |
| Router: `document.title` = h1 without trailing `.`/`!` + ` · Zabut the Splendid` | Ported (server-side metadata) | `lib/metadata.ts` |
| Router: instant scroll to top on page change | Ported | `HeaderShell.tsx` |
| Page fade-in on every page change | Kept (CSS animation replays on each page mount) | `layout.css` |
| Mobile menu: button toggles `.open` + `aria-expanded`; any menu link closes it | Ported | `NavMenu.tsx` |
| Header `.scrolled` class after 8px of scroll, re-checked after navigation | Ported | `HeaderShell.tsx` |
| Language switcher: real hrefs, keeps the current page when switching | Ported (links point straight at the same page in the other language) | `NavMenu.tsx` |
| Fundraising (i) popovers: hover (CSS), click/tap toggles one at a time, outside click and Escape close | Ported | `BudgetBreakdown.tsx` |
| Cookie preferences button: shows a placeholder notice for 2.2s | Ported, **not rendered** | `CookiePreferencesButton.tsx` |
| Palette (`data-palette` warm/silver) | Mechanism kept; toggle ported, **not rendered** | `lib/palette.ts`, `PaletteToggle.tsx`, `tokens.css` |
| Build-phase preview switcher (phases 1–3: hero CTA, blog/contact/story texts) | Phase 1 kept as the site's copy; switcher not ported | see below |
| Newsletter fake-submit on `.signup` forms | Not ported | see below |
| Room image sliders, room gallery slider/tiles toggle, stay-hub view toggle | Not ported | see below |
| Booking widget "Check availability" feedback | Not ported | see below |
| Pattern band SVG background (`#patternBand`) | Not ported | see below |
| Home "reuse the Story illustration" (`img[data-copy-illustration]`) | Not needed | see below |

**Not rendered.** The reference script wires a cookie-preferences button
(`#cookiePrefsBtn`) and the CSS carries a silver palette and a `.palette-toggle` style,
but neither button is in the reference markup, so neither appears on the reference
pages. Rendering them would be a visible change, so they are ported as ready-to-use
components that nothing renders yet. The cookie button's placeholder text is in each
language file (`site.behaviours.cookiePreferencesPlaceholder`); it has no label copy
because the reference never had one. The component comments show where to drop them in.

**Not ported, because the reference has nothing for them to act on.** These parts of
the script look for elements that do not exist in any of the three reference pages, so
they never ran:

- the phase switcher looks for `#phaseToggle` / `#phaseBadge`, which are missing, so the
  site is always in phase 1. Its phase-1 texts are identical to the markup, which is what
  the content files contain. The phase 2/3 texts (English only, even in the IT/TR files)
  and the `PHASE_CTA_HREF` link to `#/stay` were not carried over;
- `.signup` forms, `.room-slider`, `.room-gallery`, `.booking-widget`, `#staysGrid`,
  `#patternBand` and `img[data-copy-illustration]` are not in the markup.

Their CSS classes (room sliders, booking widget, occasion tiles, signup form, pattern
band, pathway grid, phase toggle) are still in `components.css` exactly as in the
reference, in case they come back. The orphaned `.stay-*` / `.stays-grid` rules were
removed, as agreed.

**Stay page.** The reference has no Stay page (`#/stay` is not in its router and falls
back to Home), so `/stay` is not generated and returns 404. No visible link in the
reference points to `#/stay`; the only reference to it was `PHASE_CTA_HREF[3]` inside
the unused phase switcher (see above), so no link needed repointing.

## Vision page

`/vision`, `/it/vision`, `/tr/vision`: "What We're Creating", the founder's tour of the
planned spaces (Soglia, the Nido and Dimora lodges, the restaurant, Promessa, Respiro &
Radici, the planned experiences, Bottega delle Radici, Walk the Land). It is linked in the
nav and the footer as Vision / Visione / Vizyon.

- **Content:** `content/vision.ts`. Unlike the rest of the site, all three languages sit
  side by side (`{ en, it, tr }` per field), the shape of a localized Sanity document. The
  types at the top of the file (`VisionPage`, `VisionSection`, `VisionBlock`,
  `VisionImage`) are the future schema. `components/pages/VisionPage.tsx` reads only from
  this file.
- **Copy:** EN and TR are the founder's text, verbatim. IT was translated for the page.
  Alt text, captions, the nav label and the SEO description were written for the site; the
  Turkish versions of those lines are marked `// TR: needs native review`.
- **Images:** renders in `public/vision/` (`01-site-aerial.jpg` …), made from
  `_incoming/vision/` with clean names: the PNG renders converted to JPEG (quality 92,
  no chroma subsampling) at their original pixel size, about 66MB down to 14MB. None was
  resized. They are served as is (image optimization is off). `_incoming/` holds the
  originals and is git-ignored. Sections with no render reuse concept visuals already on the site. Every
  image has `concept: true` and shows a small "Concept" label.
- **Image layout:** galleries of three or more images (Nido, Dimora) get the prototype's
  Slider / Tiles switch (`components/VisionSwitchGallery.tsx`). Tiles show first, with a
  "Click an image to enlarge" hint ("Tap…" on touch screens); picking a tile opens it in the
  slider (arrows, dots, ←/→ keys and swipe). Every other image runs at the
  same size as the slider: 60rem wide, cropped to 16:9.
- **Layout:** built from the site's existing classes; the few new rules are at the end of
  `styles/components.css` under "Vision page", using tokens only (one new token:
  `--size-6000`).

## SEO

Every page has: a title (the reference router's rule), the language's meta description
(the reference has one per language), canonical URL, `hreflang` alternates for `en`,
`it`, `tr` and `x-default` (English), Open Graph (`og:type`, `og:site_name`, `og:title`,
`og:description`, `og:url`, `og:image` 1200×630 with size, `og:locale` and alternates)
and a `summary_large_image` Twitter card. `/sitemap.xml` lists every page in every
language with its alternates, and `/robots.txt` allows everything and points to it. All
absolute URLs come from `lib/site-url.ts` (`https://www.zabutsplendid.com` unless
`NEXT_PUBLIC_SITE_URL` overrides it).

## Verification

With the production build running (`npm run build && npm start`):

```bash
node scripts/verify.mjs                  # screenshots + computed-style diff vs reference/
python3 scripts/compare-screenshots.py   # pixel diff of the screenshot pairs (needs Pillow)
node scripts/verify-behaviour.mjs        # pages/SEO, menu, scroll, language switcher, popovers, signup links, copy fixes
```

`verify.mjs` serves `reference/` locally and loads each page at its old hash route next
to the new route, at 375, 768 and 1440 px, in all three languages (81 pairs). For every
element in the header, the page and the footer it compares tag, classes, text, 33
computed style properties and the element's box (±1px). Text that was changed on
purpose after the port (see *Copy errors*) is reported as "intended", not as an issue.
Both sides run with a desktop Chrome user agent: Google Fonts serves different font
files per user agent, and headless Linux Chromium would otherwise get Linux-hinted files
for the reference only. Options: `--langs=en`, `--only=en:story,it:home`,
`--widths=375`; `OUT_DIR` changes the output folder (default `verification/`,
git-ignored).

`verify-behaviour.mjs` runs every check by default, or selected ones with
`--part=pages,menu,scroll,lang,tips,signup,copy` and `--widths=375,1440`:

- `pages`: every page in EN/IT/TR returns 200, has `<html lang>`, its own `<title>`,
  canonical, hreflang (en, it, tr, x-default), Open Graph and Twitter tags. Every image
  and both icons load, no request fails, there are no console errors, and no internal
  link contains `#/`. `/stay`, `/it/stay` and `/tr/stay` return 404.
- `menu`, `scroll`, `tips`: mobile menu, header `.scrolled`, jump to top on navigation,
  and the fundraising (i) popovers.
- `lang`: the language switcher, from every page to both other languages.
- `signup`: every Fillout link points at the current form for its language, and clicking
  the buttons opens it.
- `copy`: the copy fixes are on the pages.

Set `CHROMIUM_PATH` to use an already-installed Chromium; otherwise run
`npx playwright install chromium` once.

## Differences from the reference

The last full visual run was on 27 September 2026, before the Vision page, the budget
update and the switch to full-size images, so its pixel figures are historical. It
covered all 27 pages of the reference (9 pages × 3 languages) at 375, 768 and 1440 px
(81 pairs); the Vision page has no reference counterpart and is not compared:

- **Computed styles and layout match.** Tag, classes, text, 33 computed properties and
  every element's box (±1px) are identical for every element in the header, page body
  and footer. There are two exceptions:
  - The intended copy fixes. On the IT and TR Story pages at 768 and 1440 px, the
    translated heading wraps onto a second line, so everything below it sits one line
    (53–66px) lower. Nothing else on those pages moved.
  - The fundraising budget, updated on 30 September 2026 to match the "Funding & Use of
    Funds" slide of the investor pitch deck (preliminary costed scope €413,500, plus
    €12,000 for brand, website and pre-opening marketing). Its rows are not compared
    with the reference; the taller table moves everything below it down, which is
    reported as intended. `verify-behaviour.mjs --part=copy` checks the figures and that
    they add up.
  - Two harmless properties from `next/image`: it writes `style="color:transparent"` on
    images (this only colours alt text), and `aspect-ratio` on the story illustration
    and the star, which pins them to the original file's ratio (see below).
- **Pixels.** On that run, pages without photos differed by 0.003–0.03% of pixels and
  pages with photos by up to about 0.8% (image resampling at the time, plus the intended
  copy changes). Photos are now higher-resolution files than the reference's, so photo
  pixels differ by design.
- **Behaviour, SEO and links.** All checks in `verify-behaviour.mjs` pass at 375 and
  1440 px, with no console errors or failed requests.

Other differences:

1. **Image files.** Image optimization is off (`images.unoptimized` in
   `next.config.ts`): every image is served as the file in `public/`, with no resizing or
   recompression, and the browser scales it. The photos and concept visuals were replaced
   by higher-resolution JPEGs of the same pictures (same framing, about 1450–1920px wide,
   300–930KB each); the Vision renders are JPEGs of about 0.6MB each.
2. **Aspect-ratio pin.** Two images sized only by width (the Story illustration and the
   star) carry an inline `aspect-ratio` equal to the file's ratio, so their box has its
   final shape before the file loads.
3. **Trailing slashes.** Canonical and hreflang URLs have no trailing slash (`/it`
   rather than the reference's `/it/`, and the bare domain for the English home page).
   Next.js 308-redirects `/it/` to `/it`, which also covers old links to the language
   roots.
4. **Titles in social cards.** `og:title` and the Twitter title use each page's own
   title. In the reference every page of a language shared one HTML head, so they always
   said "Zabut the Splendid". Description, image and site name are unchanged. The three
   home pages share the title "Zabut the Splendid", as in the reference; every other
   title is unique.
5. **Titles in the static HTML.** Page titles are in the server-rendered HTML instead of
   being set by script after load. The text is the same.
6. **Unknown URLs.** In the reference any unknown hash showed the home page. Unknown
   paths (including `/stay`) now return Next.js's default 404 page.
7. **Fonts.** They are self-hosted through `next/font` instead of loaded from Google's
   CDN: same families, weights and styles. Once loaded they render identically. There
   are three side effects:
   - Google tailors font files to each browser, while `next/font` serves every browser
     the files Google gives desktop Chrome. On unusual platforms (for example headless
     Linux) glyph widths can differ by a pixel or two.
   - `lib/fonts.ts` sets `adjustFontFallback: false`, but Turbopack (the default
     bundler in Next.js 16) ignores that option. For the moment before the web fonts
     arrive, text therefore shows in a metric-adjusted Times New Roman instead of the
     reference's Iowan Old Style / Palatino fallbacks. Building with
     `next build --webpack` would honour the option.
   - A few unused faces are declared (Cormorant 600 italic, Playfair 500–700 italic),
     because `next/font` requests every weight × style combination. Browsers only
     download the faces a page uses.

## Copy errors spotted (not fixed)

Listed only; not fixed. The copy files match the reference text exactly, apart from deliberate
changes made after the port: the IT and TR Story headings are now translated
("Un soggiorno più significativo", "Daha anlamlı bir konaklama"), and the home page
"Persone" pillar now says "Arab heritage" in all three languages, matching the rest of
the site. The fundraising page's partnership button now uses the founder's wording,
"Explore a Partnership" (IT "Esplora una partnership", TR "Ortaklık Olanaklarını Keşfet"),
as on the Vision page. The IT Experiences closing title is now "Stai organizzando qualcosa?"
(EN "Planning something?"). Small grammar fixes in budget tooltips (IT, TR) and image alt
text are not part of the visual comparison. The visual comparison reports the visible texts
as intended differences.

1. **Sign-off not localised.** The journal sign-off "Ayşe Zülal, Alba in Sicily" is
   identical in IT and TR ("Alba in Sicily" is English).
2. **Apostrophes (TR).** The Turkish Story page uses typographic apostrophes (’) in
   "Zabut’un", "Sambuca’da" and similar; the rest of the Turkish site uses straight ones (').
3. **Formal/informal address (IT).** The journal post ends "Benvenuti alla prima pagina
   di Zabut" (plural), while the rest of the Italian site addresses the reader as "tu".
4. **Button capitalisation (EN).** Buttons mix Title Case ("Support the Vision",
   "Explore a Partnership", "Follow the Journey", "Get in Touch", "Join Our Journey") and
   sentence case ("Sign up for updates", "Join the list", "See the budget and how to take
   part"). TR shows the same mix.
5. **"Pitch deck" (IT).** The label is left in English on the Italian fundraising page
   (TR translates it as "Yatırımcı sunumu"). This may be intentional.
6. **Stray comma (EN).** Experiences intro: "Plans are still taking shape, and will
   grow with the place." The comma before "and" is unnecessary.
