/**
 * Behaviour, SEO and link checks against the running production build (dev only).
 *
 *   npm run build && npm start
 *   node scripts/verify-behaviour.mjs [--part=pages,menu,scroll,lang,tips,signup,copy] [--widths=375,1440]
 *
 * SITE defaults to http://localhost:3000. Parts can be run separately (all by default):
 *   pages   every page in EN/IT/TR: 200, <html lang>, unique <title>, canonical, hreflang,
 *           Open Graph + Twitter tags, every image and the favicon load, no failed
 *           requests, no console errors, no internal link containing #/; /stay → 404
 *   menu    mobile menu opens/closes, link closes it, aria-current, title on client nav
 *   scroll  header .scrolled on scroll; navigation lands at the top of the new page
 *   lang    language switcher from every page to both other languages lands on the same page
 *   tips    fundraising (i) popovers: click, switch, toggle, outside click, Escape, hover
 *   signup  every Fillout button points at the current form for its language and opens it
 *   copy    copy fixes made after the port are on the pages; budget figures and sums
 * Set CHROMIUM_PATH to use an already-installed Chromium.
 */
import { chromium } from 'playwright';

const SITE = process.env.SITE || 'http://localhost:3000';
const args = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')));
const PARTS = (args.part || 'pages,menu,scroll,lang,tips,signup,copy').split(',');
const WIDTHS = (args.widths || '375,1440').split(',').map(Number);
const LANGS = ['en', 'it', 'tr'];
const SLUGS = ['', '/story', '/experiences', '/fundraising', '/blog', '/blog/land-vision', '/contact', '/privacy', '/terms'];
const path = (lang, slug) => (lang === 'en' ? slug || '/' : `/${lang}${slug}`);
const SIGNUP = (lang) => `https://zabut.fillout.com/signup?lang=${lang}`;
const CANONICAL_BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://zabutsplendid.vercel.app';
// Absolute URL of a site path. The home page is emitted without the trailing slash
// (https://host rather than https://host/); both spell the same URL.
const abs = (p) => CANONICAL_BASE + (p === '/' ? '' : p);

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const results = [];
const consoleErrors = [];
function check(name, ok, detail = '') {
  results.push({ name, ok, detail });
  if (!ok || process.env.VERBOSE) console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  (' + detail + ')' : ''}`);
}
async function open(p, width) {
  const ctx = await browser.newContext({ viewport: { width, height: 800 } });
  const page = await ctx.newPage();
  page.on('console', (m) => m.type() === 'error' && consoleErrors.push(`${p}@${width}: ${m.text()}`));
  page.on('pageerror', (e) => consoleErrors.push(`${p}@${width}: ${e.message}`));
  const res = await page.goto(SITE + p, { waitUntil: 'networkidle' });
  return { ctx, page, res };
}
const cls = async (loc) => (await loc.getAttribute('class')) || '';

// ---------------------------------------------------------------- pages
if (PARTS.includes('pages')) {
  const titles = new Map();
  for (const width of WIDTHS) {
    for (const lang of LANGS) {
      for (const slug of SLUGS) {
        const p = path(lang, slug);
        const ctx = await browser.newContext({ viewport: { width, height: 800 } });
        const page = await ctx.newPage();
        const failed = [];
        page.on('console', (m) => m.type() === 'error' && consoleErrors.push(`${p}@${width}: ${m.text()}`));
        page.on('pageerror', (e) => consoleErrors.push(`${p}@${width}: ${e.message}`));
        page.on('response', (r) => r.status() >= 400 && failed.push(`${r.status()} ${r.url()}`));
        page.on('requestfailed', (r) => failed.push(`failed ${r.url()}`));
        const res = await page.goto(SITE + p, { waitUntil: 'networkidle' });
        const tag = `[${width}] ${p}`;
        check(`${tag} → 200`, res.status() === 200, String(res.status()));
        // load every lazy image, then confirm each one decoded
        await page.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach((i) => (i.loading = 'eager')));
        await page.waitForFunction(() => [...document.images].every((i) => i.complete), null, { timeout: 15000 }).catch(() => {});
        const broken = await page.$$eval('img', (imgs) => imgs.filter((i) => !i.naturalWidth).map((i) => i.currentSrc || i.src));
        check(`${tag} all images load`, broken.length === 0, broken.join(', '));
        const icons = await page.$$eval('link[rel="icon"], link[rel="apple-touch-icon"]', (ls) => ls.map((l) => l.href));
        for (const href of icons) {
          const r = await page.request.get(href);
          check(`${tag} icon ${new URL(href).pathname} loads`, r.status() === 200 && (r.headers()['content-type'] || '').startsWith('image/'), String(r.status()));
        }
        check(`${tag} favicon + apple-touch icon declared`, icons.length === 2, String(icons.length));
        check(`${tag} no failed requests`, failed.length === 0, failed.join(', '));
        if (width === WIDTHS[WIDTHS.length - 1]) {
          const head = await page.evaluate(() => {
            const attr = (sel, a = 'content') => document.querySelector(sel)?.getAttribute(a) ?? null;
            const alts = {};
            document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((l) => (alts[l.getAttribute('hreflang')] = l.getAttribute('href')));
            return {
              lang: document.documentElement.lang,
              title: document.title,
              canonical: attr('link[rel="canonical"]', 'href'),
              alts,
              og: ['og:title', 'og:description', 'og:url', 'og:image', 'og:type', 'og:site_name', 'og:locale'].map((k) => [k, attr(`meta[property="${k}"]`)]),
              twitter: attr('meta[name="twitter:card"]'),
              description: attr('meta[name="description"]'),
              hashLinks: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')).filter((h) => h.includes('#/')),
            };
          });
          check(`${p} <html lang="${lang}">`, head.lang === lang, head.lang);
          check(`${p} has a title`, !!head.title, head.title);
          titles.set(p, head.title);
          check(`${p} canonical`, head.canonical === abs(p), head.canonical ?? 'missing');
          const want = { en: path('en', slug), it: path('it', slug), tr: path('tr', slug), 'x-default': path('en', slug) };
          const okAlts = Object.entries(want).every(([k, v]) => head.alts[k] === abs(v));
          check(`${p} hreflang en/it/tr/x-default`, okAlts && Object.keys(head.alts).length === 4, JSON.stringify(head.alts));
          const missing = head.og.filter(([, v]) => !v).map(([k]) => k);
          check(`${p} Open Graph tags`, missing.length === 0, missing.join(', '));
          check(`${p} og:url = canonical, og:title = title`, head.og.find(([k]) => k === 'og:url')[1] === head.canonical && head.og.find(([k]) => k === 'og:title')[1] === head.title);
          check(`${p} twitter:card summary_large_image`, head.twitter === 'summary_large_image', head.twitter ?? 'missing');
          check(`${p} meta description`, !!head.description);
          check(`${p} no internal link contains #/`, head.hashLinks.length === 0, head.hashLinks.join(', '));
        }
        await ctx.close();
      }
    }
  }
  // Titles are unique within each language. The three home pages share the site name,
  // exactly as in the reference (its router used the site name for home in every language).
  for (const lang of LANGS) {
    const own = [...titles].filter(([p]) => p === path(lang, '') || (lang === 'en' ? !/^\/(it|tr)(\/|$)/.test(p) : p.startsWith(`/${lang}`)));
    const vals = own.map(([, t]) => t);
    const dup = vals.filter((t, i, a) => a.indexOf(t) !== i);
    check(`${lang}: every page has its own <title> (${vals.length} pages)`, dup.length === 0 && vals.length === SLUGS.length, dup.join(' | '));
  }
  const ctx = await browser.newContext();
  for (const p of ['/stay', '/it/stay', '/tr/stay']) {
    const r = await ctx.request.get(SITE + p, { maxRedirects: 0 });
    check(`${p} → 404`, r.status() === 404, String(r.status()));
  }
  await ctx.close();
}

// ---------------------------------------------------------------- menu
if (PARTS.includes('menu')) {
  for (const width of WIDTHS) {
    const { ctx, page } = await open('/', width);
    const nav = page.locator('#navLinks');
    const btn = page.locator('#navToggle');
    if (width > 880) {
      check(`[${width}] desktop: menu button hidden, links visible`, !(await btn.isVisible()) && (await page.locator('#navLinks a[data-nav="story"]').isVisible()));
      await page.locator('#navLinks a[data-nav="story"]').click();
    } else {
      check(`[${width}] menu starts closed`, (await cls(nav)) === 'nav-links' && (await btn.getAttribute('aria-expanded')) === 'false' && !(await page.locator('#navLinks a[data-nav="story"]').isVisible()));
      await btn.click();
      await page.waitForTimeout(450);
      check(`[${width}] menu opens`, (await cls(nav)).includes('open') && (await btn.getAttribute('aria-expanded')) === 'true' && (await page.locator('#navLinks a[data-nav="story"]').isVisible()));
      await btn.click();
      await page.waitForTimeout(450);
      check(`[${width}] menu closes on second tap`, !(await cls(nav)).includes('open') && !(await page.locator('#navLinks a[data-nav="story"]').isVisible()));
      await btn.click();
      await page.waitForTimeout(450);
      await page.locator('#navLinks a[data-nav="story"]').click();
    }
    await page.waitForURL(SITE + '/story');
    await page.waitForTimeout(450);
    check(`[${width}] nav link navigates${width > 880 ? '' : ' and closes the menu'}`, !(await cls(nav)).includes('open') && (await btn.getAttribute('aria-expanded')) === 'false');
    check(`[${width}] aria-current follows page`, (await page.locator('#navLinks a[data-nav][aria-current="page"]').getAttribute('data-nav')) === 'story');
    check(`[${width}] title updates on client navigation`, (await page.title()) === 'A more meaningful stay · Zabut the Splendid', await page.title());
    await ctx.close();
  }
}

// ---------------------------------------------------------------- scroll
if (PARTS.includes('scroll')) {
  for (const width of WIDTHS) {
    const { ctx, page } = await open('/story', width);
    const header = page.locator('header.site-nav');
    check(`[${width}] header not .scrolled at top`, !(await cls(header)).includes('scrolled'));
    await page.evaluate(() => window.scrollTo({ top: 600, behavior: 'instant' }));
    await page.waitForTimeout(200);
    check(`[${width}] header gets .scrolled on scroll`, (await cls(header)).includes('scrolled'));
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
    await page.waitForTimeout(200);
    await page.locator('footer a[href="/experiences"]').click();
    await page.waitForURL(SITE + '/experiences');
    await page.waitForTimeout(400);
    const y = await page.evaluate(() => window.scrollY);
    check(`[${width}] navigation jumps to the top of the new page`, y === 0, `scrollY=${y}`);
    check(`[${width}] header .scrolled cleared at top`, !(await cls(header)).includes('scrolled'));
    await ctx.close();
  }
}

// ---------------------------------------------------------------- lang
if (PARTS.includes('lang')) {
  for (const width of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width, height: 800 } });
    const page = await ctx.newPage();
    page.on('pageerror', (e) => consoleErrors.push(`lang@${width}: ${e.message}`));
    for (const from of LANGS) {
      for (const slug of SLUGS) {
        for (const to of LANGS.filter((l) => l !== from)) {
          await page.goto(SITE + path(from, slug), { waitUntil: 'domcontentloaded' });
          if (width <= 880) {
            await page.locator('#navToggle').click();
            await page.waitForTimeout(400);
          }
          await page.locator(`.lang-switch a[hreflang="${to}"]`).click();
          await page.waitForURL(SITE + path(to, slug));
          const htmlLang = await page.evaluate(() => document.documentElement.lang);
          const cur = await page.locator('.lang-switch a[aria-current="page"]').getAttribute('hreflang');
          check(`[${width}] ${path(from, slug)} → ${to}: ${path(to, slug)}`, htmlLang === to && cur === to, `html lang=${htmlLang}`);
        }
      }
    }
    await ctx.close();
  }
}

// ---------------------------------------------------------------- tips
if (PARTS.includes('tips')) {
  for (const width of WIDTHS) {
    for (const lang of LANGS) {
      const { ctx, page } = await open(path(lang, '/fundraising'), width);
      const [b1, b2] = [page.locator('.info[aria-controls="tip-digital"]'), page.locator('.info[aria-controls="tip-subtotal"]')];
      const [t1, t2] = [page.locator('#tip-digital'), page.locator('#tip-subtotal')];
      const tap = (b) => b.evaluate((el) => el.click()); // the open tip may cover the next button
      const tag = `[${width}] ${lang} popovers:`;
      check(`${tag} hidden initially`, !(await t1.isVisible()) && !(await t2.isVisible()));
      await b1.click();
      await page.mouse.move(0, 0);
      check(`${tag} click opens`, (await t1.isVisible()) && (await b1.getAttribute('aria-expanded')) === 'true');
      await tap(b2);
      check(`${tag} opening another closes the first`, !(await t1.isVisible()) && (await t2.isVisible()) && (await b1.getAttribute('aria-expanded')) === 'false');
      await tap(b2);
      check(`${tag} second click closes`, !(await t2.isVisible()) && (await b2.getAttribute('aria-expanded')) === 'false');
      await tap(b1);
      await page.mouse.click(5, 400);
      check(`${tag} click elsewhere closes`, !(await t1.isVisible()));
      await tap(b1);
      await page.keyboard.press('Escape');
      check(`${tag} Escape closes`, !(await t1.isVisible()));
      if (width > 880) {
        await b2.hover();
        check(`${tag} hover shows tip`, await t2.isVisible());
      }
      await ctx.close();
    }
  }
}

// ---------------------------------------------------------------- signup
if (PARTS.includes('signup')) {
  // every Fillout link on every page points at the current form for its language
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 800 } });
  const page = await ctx.newPage();
  for (const lang of LANGS) {
    for (const slug of SLUGS) {
      await page.goto(SITE + path(lang, slug), { waitUntil: 'domcontentloaded' });
      const hrefs = await page.$$eval('a[href*="fillout"]', (as) => as.map((a) => a.getAttribute('href')));
      const wrong = hrefs.filter((h) => h !== SIGNUP(lang));
      check(`${path(lang, slug)} ${hrefs.length} Fillout link(s) → ${SIGNUP(lang)}`, hrefs.length > 0 && wrong.length === 0, wrong.join(', '));
    }
  }
  await ctx.close();
  // clicking them opens the form
  const BUTTONS = [
    ['', '.hero-ctas a.cta-outline', 'home "Sign up for updates"'],
    ['/fundraising', '.fund-cta-row a.cta:not(.cta-outline)', 'fundraising "Discuss a Partnership"'],
    ['/fundraising', '.deck-note a.text-link', 'fundraising "Join the list"'],
    ['/story', '.story-copy > a.cta', 'story "Join Our Journey"'],
    ['/experiences', '.offer-close a.cta-outline', 'experiences "Sign up for updates"'],
    ['/contact', '.form-block a.cta', 'contact "Sign up for updates"'],
    ['', 'footer .foot-news a.text-link', 'footer "Join the list"'],
  ];
  for (const width of WIDTHS) {
    for (const lang of LANGS) {
      for (const [slug, sel, label] of BUTTONS) {
        const c = await browser.newContext({ viewport: { width, height: 800 } });
        const p = await c.newPage();
        await p.goto(SITE + path(lang, slug), { waitUntil: 'domcontentloaded' });
        const [resp] = await Promise.all([
          p.waitForNavigation({ url: /zabut\.fillout\.com/, waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => null),
          p.locator(sel).first().click(),
        ]);
        let status = resp ? resp.status() : 0;
        let note = '';
        // Fillout's servers occasionally answer a burst of automated requests with a 404;
        // one reload tells a flaky answer apart from a wrong link.
        if (resp && status !== 200 && p.url() === SIGNUP(lang)) {
          status = (await p.reload({ waitUntil: 'domcontentloaded' }))?.status() ?? 0;
          note = ` (first load answered ${resp.status()}, reload ${status})`;
          if (status === 200) console.log(`note: [${width}] ${lang} ${label}${note}`);
        }
        const ok = status === 200 && p.url() === SIGNUP(lang);
        check(`[${width}] ${lang} ${label} opens ${SIGNUP(lang)}`, ok, resp ? `${status} ${p.url()}${note}` : `no navigation (${p.url()})`);
        await c.close();
      }
    }
  }
}

// ---------------------------------------------------------------- copy
if (PARTS.includes('copy')) {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const expect = [
    ['/it/story', '.page-intro h1', 'Un soggiorno più significativo'],
    ['/tr/story', '.page-intro h1', 'Daha anlamlı bir konaklama'],
    ['/', '.pillar:nth-child(2) p', "Two distinct dining experiences inspired by Sicilian cuisine and Sambuca's Arab heritage."],
    ['/it', '.pillar:nth-child(2) p', "Due esperienze gastronomiche distinte, ispirate alla cucina siciliana e all'eredità araba di Sambuca."],
    ['/tr', '.pillar:nth-child(2) p', "Sicilya mutfağından ve Sambuca'nın Arap mirasından ilham alan iki ayrı yeme-içme deneyimi."],
  ];
  for (const [p, sel, text] of expect) {
    await page.goto(SITE + p);
    const got = (await page.locator(sel).textContent())?.trim();
    check(`${p} shows "${text}"`, got === text, got);
  }
  for (const [p, t] of [['/it/story', 'Un soggiorno più significativo · Zabut the Splendid'], ['/tr/story', 'Daha anlamlı bir konaklama · Zabut the Splendid']]) {
    await page.goto(SITE + p);
    check(`${p} <title> "${t}"`, (await page.title()) === t, await page.title());
  }
  // fundraising budget: figures per language, and the sums add up
  const BUDGET = {
    en: ['€96,000', '€186,000', '€35,000', '€15,000', '€6,000', '€5,500', '€343,500', '€45,000', '€388,500', '€25,000', '€413,500', '€12,000', 'Quote pending', 'Quote pending', 'Quote pending', 'To be budgeted', 'To be confirmed'],
    it: ['€96.000', '€186.000', '€35.000', '€15.000', '€6.000', '€5.500', '€343.500', '€45.000', '€388.500', '€25.000', '€413.500', '€12.000', 'Preventivo in attesa', 'Preventivo in attesa', 'Preventivo in attesa', 'Da mettere a budget', 'Da confermare'],
    tr: ['96.000 €', '186.000 €', '35.000 €', '15.000 €', '6.000 €', '5.500 €', '343.500 €', '45.000 €', '388.500 €', '25.000 €', '413.500 €', '12.000 €', 'Teklif bekleniyor', 'Teklif bekleniyor', 'Teklif bekleniyor', 'Bütçelenecek', 'Netleşecek'],
  };
  for (const lang of LANGS) {
    await page.goto(SITE + path(lang, '/fundraising'));
    const values = await page.$$eval('.fund-row > dd:not(.tip)', (dds) => dds.map((d) => d.textContent.trim()));
    check(`${lang} budget figures`, JSON.stringify(values) === JSON.stringify(BUDGET[lang]), values.join(' | '));
    const n = values.map((v) => Number(v.replace(/[^0-9]/g, '')));
    // same distribution as the pitch deck's "Funding & Use of Funds" slide
    const guestOk = n.slice(0, 6).reduce((a, b) => a + b, 0) === n[6] && n[6] === 343500;
    const propOk = n[6] + n[7] === n[8] && n[8] === 388500;
    const scopeOk = n[8] + n[9] === n[10] && n[10] === 413500;
    check(`${lang} budget sums: lodges + shared = 343,500; + property = 388,500; + transport = 413,500`, guestOk && propOk && scopeOk);
    const sub = page.locator('.fund-row.fund-items-subtotal');
    check(`${lang} subtotal rows are plain rows with strong text`, (await sub.count()) === 2 &&
      (await sub.evaluateAll((rows) => rows.every((r) => getComputedStyle(r.querySelector('dt')).fontWeight === '600' && getComputedStyle(r).backgroundColor === 'rgba(0, 0, 0, 0)'))));
  }
  for (const p of ['/', '/it', '/tr']) {
    await page.goto(SITE + p);
    const body = await page.locator('main').textContent();
    check(`${p} no "Zabut heritage" wording left`, !/Zabut heritage|eredità di Zabut|Zabut mirası/.test(body));
  }
  await ctx.close();
}

check('no console errors', consoleErrors.length === 0, consoleErrors.join(' | '));
await browser.close();
const failed = results.filter((r) => !r.ok).length;
console.log(`\n[${PARTS.join(',')}] ${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
