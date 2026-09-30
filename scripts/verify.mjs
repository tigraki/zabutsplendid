/**
 * Visual + behavioural verification against the reference site (dev only).
 *
 *   npm run build && npm start            # Next site on :3000 (or set SITE)
 *   node scripts/verify.mjs [--langs=en,it] [--only=en:story] [--widths=375,768,1440]
 *
 * - serves reference/ on :3200 and loads each page at its old hash route;
 * - screenshots the same page of the Next site at 375 / 768 / 1440 px;
 * - compares computed styles + boxes of every element in header, page and footer;
 * - writes screenshots and report.json to verification/ (git-ignored).
 * Pixel diffs are computed by scripts/compare-screenshots.py.
 *
 * Uses the `playwright` dev dependency. Set CHROMIUM_PATH to use a preinstalled browser.
 */
import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const SITE = process.env.SITE || 'http://localhost:3000';
const REF_PORT = Number(process.env.REF_PORT) || 3200;
const REF = `http://localhost:${REF_PORT}`;
const OUT = process.env.OUT_DIR || path.join(ROOT, 'verification');
const args = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')));
const WIDTHS = (args.widths || '375,768,1440').split(',').map(Number);
// Google Fonts serves different font files per user agent. The reference loads its fonts from
// Google at runtime, while next/font downloads them once at build time with a desktop Chrome
// user agent. Headless Chromium on Linux would get Linux-hinted files for the reference only,
// with slightly different glyph widths, so both sides use a desktop Chrome UA.
const UA = process.env.VERIFY_UA ||
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';
const LANGS = (args.langs || 'en,it,tr').split(',');
const PAGES = {
  home: '',
  fundraising: 'fundraising',
  story: 'story',
  experiences: 'experiences',
  blog: 'blog',
  'post-land-vision': 'blog/land-vision',
  contact: 'contact',
  privacy: 'privacy',
  terms: 'terms',
};

// ---------- static server for reference/ ----------
const TYPES = { '.html': 'text/html; charset=utf-8', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, REF).pathname);
  if (p.endsWith('/')) p += 'index.html';
  const file = path.join(ROOT, 'reference', p);
  if (!file.startsWith(path.join(ROOT, 'reference')) || !fs.existsSync(file)) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(REF_PORT, r));

const refUrl = (lang, key) => `${REF}/${lang === 'en' ? '' : lang + '/'}${key === 'home' ? '' : '#/' + key}`;
const siteUrl = (lang, key) => {
  const prefix = lang === 'en' ? '' : '/' + lang;
  return `${SITE}${prefix}${PAGES[key] ? '/' + PAGES[key] : ''}` || '/';
};

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY, bypass: 'localhost,127.0.0.1' } : undefined,
});

async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
  // load lazy images up front, then scroll through and back to the top
  await page.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach((i) => (i.loading = 'eager')));
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await page.waitForFunction(() => [...document.images].every((i) => i.complete), null, { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1600); // entrance animations (.9s + delays) finish
}

const PROPS = [
  'display', 'position', 'font-size', 'font-weight', 'font-style', 'line-height', 'letter-spacing', 'color',
  'background-color', 'text-transform', 'text-align', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right',
  'padding-top', 'padding-bottom', 'padding-left', 'padding-right', 'border-top-width', 'border-top-color',
  'border-bottom-width', 'border-bottom-color', 'border-radius', 'opacity', 'grid-template-columns', 'gap',
  'max-width', 'text-decoration-line', 'box-shadow', 'object-fit', 'aspect-ratio', 'visibility',
];

function snapshot(page) {
  return page.evaluate((PROPS) => {
    const roots = [document.querySelector('header'), document.querySelector('.page:not([hidden])'), document.querySelector('footer')];
    const out = [];
    for (const root of roots) {
      const walk = (el, depth) => {
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        const style = {};
        for (const p of PROPS) style[p] = cs.getPropertyValue(p);
        const text = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').replace(/\s+/g, ' ').trim();
        const dl = document.querySelector('.fund-breakdown');
        out.push({
          // budget rows (inside the table) and everything after the table, for the
          // intended budget update (see BUDGET_CHANGED below)
          inBudget: !!dl && dl !== el && dl.contains(el),
          afterBudget: !!dl && !!(dl.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) && !dl.contains(el),
          isBudget: dl === el,
          tag: el.tagName.toLowerCase(),
          cls: (el.getAttribute('class') || '').replace(/\s*\bscrolled\b/, ''),
          depth,
          text,
          box: [r.x, r.y + window.scrollY, r.width, r.height].map((v) => Math.round(v * 10) / 10),
          style,
        });
        for (const c of el.children) walk(c, depth + 1);
      };
      walk(root, 0);
    }
    return out;
  }, PROPS);
}

// Copy changed on purpose after the port (see README). Differences in these texts, and in
// the size of the element that holds them, are reported as "intended", not as issues.
const INTENDED_TEXT = [
  'Un soggiorno più significativo',
  'Daha anlamlı bir konaklama',
  "Two distinct dining experiences inspired by Sicilian cuisine and Sambuca's Arab heritage.",
  "Due esperienze gastronomiche distinte, ispirate alla cucina siciliana e all'eredità araba di Sambuca.",
  "Sicilya mutfağından ve Sambuca'nın Arap mirasından ilham alan iki ayrı yeme-içme deneyimi.",
];

// The fundraising budget was updated on purpose after the port (new figures and an extra
// "Subtotal of items estimated so far" row). Its rows are not compared; the table growing
// taller, and everything below it moving down by the same amount, is reported as intended.
function diffSnapshots(a, b) {
  const issues = [];
  if (b.some((e) => e.isBudget)) {
    a = a.filter((e) => !e.inBudget);
    b = b.filter((e) => !e.inBudget);
  }
  if (a.length !== b.length) issues.push(`element count ${a.length} vs ${b.length}`);
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) {
    const x = a[i], y = b[i];
    const label = `${x.tag}.${x.cls.split(' ').join('.')}`;
    if (x.tag !== y.tag || x.cls !== y.cls) {
      issues.push(`#${i} structure ${label} vs ${y.tag}.${y.cls}`);
      break;
    }
    const intended = INTENDED_TEXT.includes(y.text) && x.text !== y.text;
    if (intended) issues.push(`intended: #${i} ${label} text "${x.text}" → "${y.text}"`);
    else if (x.text !== y.text) issues.push(`#${i} ${label} text "${x.text}" vs "${y.text}"`);
    for (const p of Object.keys(x.style)) {
      if (x.style[p] === y.style[p]) continue;
      // next/image sets style="color:transparent" (invisible on borderless images) and
      // width/height attributes (aspect-ratio "auto w / h"); neither changes the layout,
      // which the box check below confirms.
      if (x.tag === 'img' && /color$/.test(p)) continue;
      // SiteImage `exactRatio` / Spark pin the original file's ratio inline (README, differences #2).
      if (x.tag === 'img' && p === 'aspect-ratio' && x.style[p] === 'auto' && /^(auto )?\d+ \/ \d+$/.test(y.style[p])) continue;
      issues.push(`#${i} ${label} ${p}: ${x.style[p]} vs ${y.style[p]}`);
    }
    const budgetShift =
      (y.isBudget && Math.abs(x.box[0] - y.box[0]) <= 1 && Math.abs(x.box[1] - y.box[1]) <= 1 && Math.abs(x.box[2] - y.box[2]) <= 1) ||
      (y.afterBudget && [0, 2, 3].every((k) => Math.abs(x.box[k] - y.box[k]) <= 1)) ||
      // containers that hold the table grow by the same amount
      (!y.afterBudget && !y.isBudget && [0, 1, 2].every((k) => Math.abs(x.box[k] - y.box[k]) <= 1) && y.box[3] > x.box[3] && b.some((e) => e.isBudget));
    if (x.box.some((v, k) => Math.abs(v - y.box[k]) > 1)) issues.push(`${intended || budgetShift ? 'intended: ' : ''}#${i} ${label} box ${x.box} vs ${y.box}`);
  }
  return issues;
}

fs.mkdirSync(path.join(OUT, 'shots'), { recursive: true });
const report = { pages: [], behaviours: [], links: [] };
const consoleErrors = [];

const only = args.only ? args.only.split(',') : null;
for (const lang of LANGS) {
  for (const key of Object.keys(PAGES)) {
    if (only && !only.includes(`${lang}:${key}`)) continue;
    for (const width of WIDTHS) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1, userAgent: UA });
      const ref = await ctx.newPage();
      const site = await ctx.newPage();
      site.on('console', (m) => m.type() === 'error' && consoleErrors.push(`${lang}:${key}@${width} ${m.text()}`));
      site.on('pageerror', (e) => consoleErrors.push(`${lang}:${key}@${width} ${e.message}`));
      await ref.goto(refUrl(lang, key), { waitUntil: 'networkidle' });
      await site.goto(siteUrl(lang, key), { waitUntil: 'networkidle' });
      await Promise.all([settle(ref), settle(site)]);
      const name = `${lang}-${key}-${width}`;
      await ref.screenshot({ path: path.join(OUT, 'shots', `${name}-ref.png`), fullPage: true });
      await site.screenshot({ path: path.join(OUT, 'shots', `${name}-new.png`), fullPage: true });
      const all = diffSnapshots(await snapshot(ref), await snapshot(site));
      const titles = [await ref.title(), await site.title()];
      if (titles[0] !== titles[1]) {
        const intendedTitle = INTENDED_TEXT.some((t) => titles[1].startsWith(t + ' · '));
        all.unshift(`${intendedTitle ? 'intended: ' : ''}title "${titles[0]}" vs "${titles[1]}"`);
      }
      const issues = all.filter((i) => !i.startsWith('intended: '));
      const intended = all.filter((i) => i.startsWith('intended: '));
      report.pages.push({ name, issues, intended });
      console.log(name, issues.length ? `${issues.length} issues` : 'OK', intended.length ? `(${intended.length} intended)` : '');
      await ctx.close();
    }
  }
}
report.consoleErrors = consoleErrors;
fs.writeFileSync(path.join(OUT, args.langs ? `report-${args.langs.replace(/,/g, '-')}.json` : 'report.json'), JSON.stringify(report, null, 2));
await browser.close();
server.close();
