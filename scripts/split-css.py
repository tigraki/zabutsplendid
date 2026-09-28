"""One-off migration helper (kept for reference): splits the reference site's inline
CSS into styles/{base,layout,components}.css and replaces raw values with tokens.
Run: python3 scripts/split-css.py <ref.css> <outdir>"""
import re, sys, collections

src = open(sys.argv[1]).read()
out = sys.argv[2]

# ---------- tiny CSS parser: top-level items, keeps comments attached ----------
def parse(s):
    items, i, pending = [], 0, []
    while i < len(s):
        if s[i].isspace(): i += 1; continue
        if s.startswith('/*', i):
            j = s.index('*/', i) + 2; pending.append(s[i:j]); i = j; continue
        j = s.index('{', i); prelude = s[i:j].strip()
        d, k = 0, j
        while True:
            if s[k] == '{': d += 1
            elif s[k] == '}':
                d -= 1
                if d == 0: break
            k += 1
        body = s[j+1:k]
        if prelude.startswith('@media') or prelude.startswith('@supports'):
            items.append({'comments': pending, 'at': prelude, 'rules': parse(body)})
        else:
            items.append({'comments': pending, 'sel': prelude, 'body': body})
        pending = []; i = k + 1
    return items

items = parse(src)

# ---------- selector classification ----------
LAYOUT = re.compile(r'^(\.wrap|header\.site-nav|\.nav-|nav\.nav-links|\.lang-switch|\.page\b|\.page-intro|section\b|\.section-head|footer|\.foot-)')
BASE = re.compile(r'^(\*|\[hidden\]|html|body|a$|a:focus|img$|::selection|:focus-visible|h1|h2|h3|\.label$|\.italic-line$|hr\.rule)')
def area(sel):
    parts = [p.strip() for p in sel.split(',')]
    kinds = set()
    for p in parts:
        if BASE.match(p): kinds.add('base')
        elif LAYOUT.match(p): kinds.add('layout')
        else: kinds.add('components')
    if len(kinds) == 1: return kinds.pop()
    return 'components'

def drop_stay(sel):
    parts = [p.strip() for p in sel.split(',') if '.stay' not in p]
    return ', '.join(parts)

# ---------- value tokenisation ----------
CLAMPS = {
 'clamp(1.25rem, 4vw, 2rem)': '--gutter',
 'clamp(2rem, 5vw, 3rem)': '--fluid-200-300',
 'clamp(2.5rem, 6vw, 4rem)': '--fluid-250-400',
 'clamp(2.5rem, 6vw, 3.5rem)': '--fluid-250-350',
 'clamp(3rem, 6vw, 4.5rem)': '--fluid-300-450',
 'clamp(1.5rem, 3vh, 2.5rem)': '--fluid-150-250-vh',
 'clamp(1.5rem, 4vw, 2.2rem)': '--fluid-150-220',
 'clamp(1.5rem, 4vw, 3rem)': '--fluid-150-300',
 'clamp(2.5rem, 5vw, 3.5rem)': '--fluid-250-350-slow',
}
DUR = {'.9s': '--dur-rise', '.5s': '--dur-slow', '.35s': '--dur-base', '.3s': '--dur-card', '.25s': '--dur-fast'}
RADIUS = {'0.15rem': '--radius-xs', '0.2rem': '--radius-sm', '0.25rem': '--radius-md', '0.3rem': '--radius-tile',
          '0.4rem': '--radius-lg', '2rem': '--radius-pill', '3rem': '--radius-round'}
BORDER = {'0.0625rem': '--border-hair', '0.125rem': '--border-thick'}
NAMED_SIZE = {'73.75rem': '--container-max'}

tokens = collections.OrderedDict()   # name -> value (generated section)
used_clamps = set()

def num_name(v, unit_len):
    n = float(v[:-unit_len])
    return ('%03d' % round(n * 100)) if n < 10 else str(round(n * 100))

def fn_spans(s, name):
    spans, i = [], 0
    while True:
        j = s.find(name + '(', i)
        if j < 0: return spans
        d, k = 0, j + len(name)
        while True:
            if s[k] == '(': d += 1
            elif s[k] == ')':
                d -= 1
                if d == 0: break
            k += 1
        spans.append((j, k + 1)); i = k + 1

def mixname(expr):
    m = re.match(r'color-mix\(in srgb, var\(--([a-z-]+)\) (\d+)%, (?:var\(--([a-z-]+)\)|(transparent))\)', expr)
    a, pct, b, t = m.groups()
    return '--mix-%s-%02d-%s' % (a, int(pct), b or t)

# count repeated rem sizes (spacing) outside clamps/media to decide what becomes a token
def all_decls(items):
    for it in items:
        if 'rules' in it: yield from all_decls(it['rules'])
        elif not it['sel'].startswith(':root') and not it['sel'].startswith('[data-palette'):
            for d in it['body'].split(';'):
                if ':' in d: yield d.split(':', 1)
def strip_fns(v):
    for name in ('clamp', 'url'):
        for a, b in reversed(fn_spans(v, name)): v = v[:a] + v[b:]
    return v
space_count = collections.Counter()
for prop, val in all_decls(items):
    p = prop.strip()
    if p in ('font-size', 'letter-spacing', 'border-radius', 'font') or p.startswith('border') or p.startswith('outline'): continue
    for m in re.findall(r'-?\d*\.?\d+rem', strip_fns(val)):
        m = m.lstrip('-'); space_count[('0' + m) if m.startswith('.') else m] += 1

def tok(name, value):
    if name in tokens and tokens[name] != value: raise SystemExit('token clash ' + name)
    tokens[name] = value
    return 'var(%s)' % name

def tokenise_value(prop, val):
    p = prop.strip()
    # color-mix -> named colour tokens
    for a, b in reversed(fn_spans(val, 'color-mix')):
        e = val[a:b]; val = val[:a] + tok(mixname(e), e) + val[b:]
    # repeated clamps -> named fluid tokens; single-use clamps stay literal and are protected
    protected = []
    for a, b in reversed(fn_spans(val, 'clamp')):
        e = val[a:b]
        if e in CLAMPS:
            val = val[:a] + tok(CLAMPS[e], e) + val[b:]
        else:
            protected.append(e); val = val[:a] + '\x00%d\x00' % (len(protected) - 1) + val[b:]
    for a, b in reversed(fn_spans(val, 'url')):
        protected.append(val[a:b]); val = val[:a] + '\x00%d\x00' % (len(protected) - 1) + val[b:]
    # durations
    def dur(m):
        v = m.group(0); return tok(DUR[v], v) if v in DUR else v
    if p.startswith('transition') or p.startswith('animation'):
        val = re.sub(r'(?<![\d.])\.\d+s\b', dur, val)
        val = re.sub(r'(?<![\d.\w])0s\b', '0s', val)
    # line-height
    if p == 'line-height':
        v = val.strip(); val = tok('--lh-' + ('%03d' % round(float(v) * 100)), v)
    # rem / em values
    def rem(m):
        neg, v = m.group(1), m.group(2)
        if v.startswith('.'): v = '0' + v
        if p in ('font-size',) or p == 'font':
            ref = tok('--fs-' + num_name(v, 3), v)
        elif p == 'border-radius':
            ref = tok(RADIUS[v], v)
        elif (p.startswith('border') or p.startswith('outline')) and v in BORDER:
            ref = tok(BORDER[v], v)
        elif v in NAMED_SIZE:
            ref = tok(NAMED_SIZE[v], v)
        elif space_count[v] >= 2:
            ref = tok(('--size-' if float(v[:-3]) >= 5 else '--space-') + num_name(v, 3), v)
        else:
            return m.group(0)
        return 'calc(-1 * %s)' % ref if neg else ref
    val = re.sub(r'(-?)(?<![\w.])(\d*\.?\d+rem)', lambda m: rem(m) if True else '', val)
    if p == 'letter-spacing':
        v = val.strip()
        if v.endswith('em') and not v.startswith('var'):
            val = ' ' + tok('--track-caps' if v == '0.22em' else '--track-' + ('neg-' if v.startswith('-') else '') + '%03d' % round(float(v.lstrip('-')[:-2]) * 1000), v)
    for i, e in enumerate(protected): val = val.replace('\x00%d\x00' % i, e)
    return val

def tokenise_body(body):
    out = []
    for d in body.split(';'):
        if ':' in d and not d.strip().startswith('/*'):
            prop, val = d.split(':', 1)
            out.append(prop + ':' + tokenise_value(prop, val))
        else:
            out.append(d)
    return ';'.join(out)

def tokenise_keyframes_body(body):
    return re.sub(r'\{([^}]*)\}', lambda m: '{' + tokenise_body(m.group(1)) + '}', body)

# ---------- emit ----------
files = {'base': [], 'layout': [], 'components': []}
def render_rule(it, indent=''):
    body = it['body']
    if it['sel'].startswith('@keyframes'):
        body = tokenise_keyframes_body(body)
    else:
        body = tokenise_body(body)
    com = ''.join(indent + c + '\n' for c in it['comments'])
    return com + indent + it['sel'] + '{' + body + '}\n'

for it in items:
    if 'rules' in it:
        by = collections.OrderedDict()
        for r in it['rules']:
            sel = drop_stay(r['sel'])
            if not sel: continue
            r = dict(r, sel=sel)
            a = 'base' if it['at'].startswith('@media (prefers-reduced-motion') or it['at'].startswith('@media (min-width: 1') else area(sel)
            by.setdefault(a, []).append(r)
        first = True
        for a, rules in by.items():
            com = ''.join(c + '\n' for c in it['comments']) if first else ''
            first = False
            files[a].append(com + it['at'] + '{\n' + ''.join(render_rule(r, '  ') for r in rules) + '}\n')
        continue
    sel = it['sel']
    if sel.startswith(':root') or sel.startswith('[data-palette'): continue
    if sel.startswith('@keyframes'):
        files['base'].append(render_rule(it)); continue
    sel = drop_stay(sel)
    if not sel: continue
    it = dict(it, sel=sel)
    files[area(sel)].append(render_rule(it))

HEAD = {
 'base': '/* Base: reset, document defaults, typography primitives, keyframes.\n   Ported 1:1 from the reference inline stylesheet; source order preserved. */\n\n',
 'layout': '/* Layout: page container, header/nav, page shell, page intros, footer.\n   Ported 1:1 from the reference inline stylesheet; source order preserved. */\n\n',
 'components': '/* Components: everything that lives inside a page.\n   Ported 1:1 from the reference inline stylesheet; source order preserved.\n   Media-query breakpoints stay literal (custom properties are not allowed there). */\n\n',
}
for k, v in files.items():
    open('%s/%s.css' % (out, k), 'w').write(HEAD[k] + '\n'.join(v))

def sortkey(kv):
    return kv[0]
open(out + '/_generated-tokens.css', 'w').write(
    '\n'.join('  %s: %s;' % (k, v) for k, v in sorted(tokens.items(), key=sortkey)) + '\n')
print(len(tokens), 'tokens')
