"""One-off migration helper (kept for reference): pulls every string out of the
reference HTML files and writes content/{en,it,tr}.ts. Copy is taken verbatim.
Run: python3 scripts/extract-content.py <reference dir>"""
import sys, json, re
from bs4 import BeautifulSoup, NavigableString

ref = sys.argv[1]
FILES = {'en': 'index.html', 'it': 'it/index.html', 'tr': 'tr/index.html'}
OG = {'en': 'en_US', 'it': 'it_IT', 'tr': 'tr_TR'}

def t(el):
    return el.get_text()

def own_text(el):
    """Text of an element excluding child elements (e.g. dt label without the note span)."""
    return ''.join(c for c in el.contents if isinstance(c, NavigableString)).strip()

def rich(p):
    out = ''
    for c in p.contents:
        if isinstance(c, NavigableString): out += str(c)
        elif c.name == 'a' and c['href'].startswith('mailto:'): out += '{email}'
        else: raise SystemExit('unexpected inline ' + str(c))
    return out

def article(container, stop=None):
    opening, sections, cur = [], [], None
    for el in container.find_all(recursive=False):
        if el.name == 'p':
            (cur['paragraphs'] if cur else opening).append(t(el))
        elif el.name == 'h3':
            cur = {'title': t(el), 'paragraphs': []}; sections.append(cur)
        elif el.name == 'span' and 'italic-line' in el['class']:
            cur['italicLine'] = t(el)
    return {'opening': opening, 'sections': sections}

def page(soup, name):
    return soup.select_one('.page[data-page="%s"]' % name)

def intro(pg):
    pi = pg.select_one('.page-intro')
    return {'label': t(pi.select_one(':scope > div.label')), 'title': t(pi.h1), 'intro': t(pi.p)}

ALT_SRC = {
    'homeTerra': 'home-terra', 'privateEvents': 'exp-private-events', 'weddings': 'exp-weddings',
    'retreats': 'exp-retreats', 'workshops': 'exp-workshops', 'table': 'exp-table', 'land': 'exp-land',
    'fundTable': 'fund-table',
}
BUDGET_IDS = ['property', 'guestHouses', 'weddingSetting', 'entrance', 'restaurants', 'bathrooms',
              'digital', 'contingency', 'seed', 'transport', 'company', 'total']
OFFERS = ['weddings', 'privateEvents', 'retreats', 'workshops', 'table', 'land']

def extract(lang, html):
    s = BeautifulSoup(html, 'lxml')
    head = s.head
    # ---- images alt ----
    alts = {}
    for img in s.select('img[alt]'):
        src = img['src']
        for k, stem in ALT_SRC.items():
            if stem in src:
                if k in alts and alts[k] != img['alt']: raise SystemExit('alt mismatch ' + k)
                alts[k] = img['alt']
    alts['mark'] = s.select_one('.nav-brand img')['alt']
    assert s.select_one('footer .foot-brand img')['alt'] == alts['mark']
    alts['markHero'] = s.select_one('#heroMark')['alt']
    alts['panorama'] = s.select_one('img.panorama')['alt']
    alts['storyIllustration'] = page(s, 'story').select_one('figure img')['alt']
    order = ['mark', 'markHero', 'homeTerra', 'privateEvents', 'weddings', 'retreats', 'workshops', 'table', 'land', 'fundTable', 'panorama', 'storyIllustration']
    alts = {k: alts[k] for k in order}

    nav = {a['data-nav']: t(a) for a in s.select('nav.nav-links a[data-nav]')}
    foot = s.footer
    cols = foot.select('.foot-col')
    script = s.find_all('script')[-1].string
    cookie = re.search(r"cookieBtn\.textContent = (['\"])(.*?)\1;", script).group(2)
    site = {
        'meta': {
            'siteName': head.select_one('meta[property="og:site_name"]')['content'],
            'description': head.select_one('meta[name="description"]')['content'],
            'ogLocale': OG[lang],
        },
        'header': {
            'menuButtonLabel': s.select_one('#navToggle')['aria-label'],
            'languageSwitcherLabel': s.select_one('.lang-switch')['aria-label'],
        },
        'nav': {k: nav[k] for k in ['fundraising', 'story', 'experiences', 'blog', 'contact']},
        'footer': {
            'country': t(foot.select('.foot-place > span')[-1]),
            'newsletter': {
                'title': t(foot.select_one('.foot-news .foot-col-title')),
                'text': t(foot.select_one('.foot-news p')),
                'linkLabel': own_text(foot.select_one('.foot-news a')),
            },
            'columns': {k: t(c.select_one('.foot-col-title')) for k, c in zip(['explore', 'contact', 'follow', 'legal'], cols)},
            'instagramLabel': t(cols[2].a),
            'privacyLabel': t(cols[3].select('a')[0]),
            'termsLabel': t(cols[3].select('a')[1]),
        },
        'images': alts,
        'behaviours': {'cookiePreferencesPlaceholder': cookie},
    }
    # footer explore labels must equal nav labels
    assert [t(a) for a in cols[0].select('a')] == [nav[k] for k in ['fundraising', 'story', 'experiences', 'blog']]

    # ---- home ----
    h = page(s, 'home')
    ctas = h.select('.hero-ctas a')
    home = {
        'place': {'country': t(h.select('.hero .place > span')[-1])},
        'hero': {'primaryCta': t(ctas[0]), 'secondaryCta': t(ctas[1])},
        'essence': t(h.select_one('.essence .label')),
        'project': {
            'label': t(h.select_one('.project-head .label')),
            'title': t(h.select_one('.project-head h2')),
            'lead': [t(p) for p in h.select('.project-lead p')],
            'pillars': {k: t(p.p) for k, p in zip(['terra', 'persone', 'storie'], h.select('.pillar'))},
            'caption': t(h.select_one('.pillars-caption')),
            'cta': t(h.select_one('.project-link')),
        },
        'location': {'title': t(h.select_one('.location h2'))},
    }
    # ---- fundraising ----
    f = page(s, 'fundraising')
    rows = {}
    frows = f.select('.fund-row')
    assert len(frows) == len(BUDGET_IDS)
    pending = total = None
    for rid, r in zip(BUDGET_IDS, frows):
        dt = r.dt
        row = {'label': own_text(dt)}
        note = dt.select_one('.fund-note')
        if note: row['note'] = t(note)
        tip = r.select_one('dd.tip')
        if tip: row['tip'] = t(tip)
        rows[rid] = row
        dd = r.select('dd')[0]
        if 'fund-pending' in r['class']: pending = t(dd)
        if 'fund-total' in r['class']: total = t(dd)
    amount = t(frows[0].dd)
    currency = {'symbol': '€', 'position': 'before' if amount.startswith('€') else 'after',
                'groupSeparator': '.' if '.' in amount else ','}
    story_blocks = f.select('.story .body-copy')
    fund = dict(intro(f), **{
        'figureCaption': t(f.select_one('figcaption')),
        'budget': {
            'title': t(f.select_one('.fund-section-head')),
            'rows': rows,
            'pendingValue': pending,
            'totalValue': total,
            'infoButtonLabel': f.select_one('.info')['aria-label'],
            'currency': currency,
        },
        'deckNote': {
            'label': t(f.select_one('.deck-note .label')),
            'text': t(f.select_one('.deck-note p')),
            'linkLabel': own_text(f.select_one('.deck-note a')),
        },
        'support': {'title': t(story_blocks[0].h3), 'paragraphs': [t(p) for p in story_blocks[0].select('p')]},
        'primaryCta': t(f.select('.fund-cta-row a')[0]),
        'secondaryCta': t(f.select('.fund-cta-row a')[1]),
        'closing': t(story_blocks[1].p),
    })
    # ---- story ----
    st = page(s, 'story')
    story = dict(intro(st), **{
        'figureCaption': t(st.select_one('figcaption')),
        'body': article(st.select_one('.story-copy')),
        'cta': t(st.select_one('.story-copy > a.cta')),
        'pullQuote': t(st.select_one('.pull-quote p')),
    })
    # ---- experiences ----
    ex = page(s, 'experiences')
    exp = dict(intro(ex), **{
        'offers': {k: {'title': t(o.h3), 'text': t(o.p)} for k, o in zip(OFFERS, ex.select('.offer'))},
        'caption': t(ex.select_one('.offer-caption')),
        'close': {
            'title': t(ex.select_one('.offer-close h2')),
            'text': t(ex.select_one('.offer-close p')),
            'primaryCta': t(ex.select('.offer-close .fund-cta-row a')[0]),
            'secondaryCta': t(ex.select('.offer-close .fund-cta-row a')[1]),
        },
    })
    # ---- blog + post ----
    b = page(s, 'blog')
    post = page(s, 'post-land-vision')
    blog = dict(intro(b), allPostsLabel=t(post.select_one('.back-link')))
    row = b.select_one('.blog-row')
    body = post.select_one('.body-copy')
    postc = {
        'title': t(post.h1),
        'summary': t(post.select_one('.page-intro p')),
        'body': article(body),
        'signoff': {'name': t(body.select_one('.signoff-name')), 'role': t(body.select_one('.signoff-role'))},
    }
    assert t(row.h3) == postc['title'] and t(row.p) == postc['summary']
    meta_label = t(post.select_one('.page-intro div.label'))
    assert meta_label.startswith(blog['label'] + ' · '), meta_label
    # ---- contact ----
    c = page(s, 'contact')
    labels = c.select('.contact-details .label')
    contact = dict(intro(c), signupCta=t(c.select_one('.form-block a')), emailLabel=t(labels[0]), followLabel=t(labels[1]))
    # ---- legal ----
    def legal(name):
        pg = page(s, name)
        return {'label': t(pg.select_one('.page-intro .label')), 'title': t(pg.h1),
                'paragraphs': [rich(p) for p in pg.select('.body-copy p')]}
    return {
        'site': site,
        'pages': {'home': home, 'fundraising': fund, 'story': story, 'experiences': exp, 'blog': blog,
                  'contact': contact, 'privacy': legal('privacy'), 'terms': legal('terms')},
        'posts': {'land-vision': postc},
        '_dates': {'blog': t(row.select_one('.blog-date')), 'post': meta_label.split(' · ', 1)[1]},
    }

def ts(v, ind=0):
    pad = '  ' * ind
    if isinstance(v, dict):
        if not v: return '{}'
        items = []
        for k, x in v.items():
            key = k if re.match(r'^[A-Za-z_]\w*$', k) else json.dumps(k)
            items.append('%s  %s: %s,' % (pad, key, ts(x, ind + 1)))
        return '{\n' + '\n'.join(items) + '\n' + pad + '}'
    if isinstance(v, list):
        return '[\n' + '\n'.join('%s  %s,' % (pad, ts(x, ind + 1)) for x in v) + '\n' + pad + ']'
    return json.dumps(v, ensure_ascii=False)

NAMES = {'en': 'English', 'it': 'Italian', 'tr': 'Turkish'}
for lang, f in FILES.items():
    data = extract(lang, open(ref + '/' + f, encoding='utf-8').read())
    dates = data.pop('_dates')
    print(lang, dates)
    open('content/%s.ts' % lang, 'w', encoding='utf-8').write(
        "import type { SiteContent } from './types';\n\n"
        "/** %s copy. Taken verbatim from reference/%s; do not edit wording here without\n"
        " * checking the other languages keep the same shape (enforced by SiteContent). */\n"
        "export const %s: SiteContent = %s;\n" % (NAMES[lang], f, lang, ts(data)))
