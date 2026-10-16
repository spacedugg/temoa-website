"""Check the built HTML, topic links and generated covers. Run after npm run build."""
import json
import re
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
BUILD = ROOT / '.next/server/app'
BASE = 'https://www.temoa.de'
errors = []

class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.meta = {}; self.links = []; self.anchors = []; self.ids = []; self.h1 = 0
        self.images = []; self.scripts = []; self.script = None; self.lang = None
        self.feed(source)
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'html': self.lang = a.get('lang')
        if tag == 'h1': self.h1 += 1
        if a.get('id'): self.ids.append(a['id'])
        if tag == 'meta': self.meta[a.get('property', a.get('name'))] = a.get('content')
        if tag == 'link': self.links.append(a)
        if tag == 'a': self.anchors.append(a.get('href', ''))
        if tag == 'img': self.images.append(a)
        if tag == 'script' and a.get('type') == 'application/ld+json': self.script = ''
    def handle_data(self, data):
        if self.script is not None: self.script += data
    def handle_endtag(self, tag):
        if tag == 'script' and self.script is not None:
            self.scripts.append(json.loads(self.script)); self.script = None

def check(condition, message):
    if not condition: errors.append(message)

slugs = [p.stem.split('_', 1)[1] for p in sorted((ROOT / 'content/blog').glob('[0-9]*_*.md'))]
policy = json.loads((ROOT / 'content/blog-editorial-policy.json').read_text())
retired = set(policy['retiredArticles'])
active = set(slugs) - retired
alt = json.loads((ROOT / 'content/blog-cover-alt.json').read_text())
for slug in slugs:
    check((ROOT / f'public/blog/covers/{slug}.webp').exists(), f'Missing cover: {slug}')
    check(all(alt.get(slug, {}).get(locale) for locale in ['de', 'en']), f'Missing image description: {slug}')

pages = {}
for locale in ['de', 'en']:
    for file in (BUILD / locale).rglob('*.html'):
        relative = file.relative_to(BUILD / locale).with_suffix('').as_posix()
        path = ('/en' if locale == 'en' else '') + '/' + relative
        page = Page(file.read_text()); pages[path] = page
        if relative.startswith('blog/'):
            check(page.h1 == 1, f'{path}: H1 count {page.h1}')
            check(page.lang == locale, f'{path}: language')
            canonical = next((a.get('href') for a in page.links if a.get('rel') == 'canonical'), None)
            check(canonical == BASE + path, f'{path}: canonical {canonical}')
            check(page.meta.get('description'), f'{path}: missing description')
            check(len(page.ids) == len(set(page.ids)), f'{path}: duplicate IDs')
            for href in page.anchors:
                if href.startswith('#'): check(href[1:] in page.ids, f'{path}: broken section link {href}')
            for language in ['de', 'en', 'x-default']:
                check(any(a.get('hreflang') == language for a in page.links), f'{path}: missing hreflang {language}')
            slug = relative.split('/')[-1]
            if slug in slugs:
                image = BASE + f'/blog/covers/{slug}.webp'
                check(page.meta.get('og:image') == image, f'{path}: incorrect social image')
                check(page.meta.get('og:url') == BASE + path, f'{path}: incorrect social URL')
                check(page.meta.get('og:type') == 'article', f'{path}: incorrect social type')
                if slug not in retired: check(any(data.get('@type') == 'BlogPosting' and data.get('image') == image for data in page.scripts if isinstance(data, dict)), f'{path}: article schema image')
                check(any(f'/blog/covers/{slug}.webp' in a.get('src','') or f'%2Fblog%2Fcovers%2F{slug}.webp' in a.get('src','') for a in page.images), f'{path}: visible cover missing')

# Editorial guardrail: consumer-intent URLs cannot leak back into acquisition paths.
for path, page in pages.items():
    slug = path.rsplit('/', 1)[-1]
    if slug in retired:
        check('noindex' in page.meta.get('robots', ''), f'{path}: retired article can be indexed')
        continue
    if '/blog' in path:
        check('noindex' not in page.meta.get('robots', ''), f'{path}: active page incorrectly noindexed')
        prefix = '/en' if path.startswith('/en/') else ''
        check(prefix + '/gespraech-vereinbaren' in page.anchors, f'{path}: missing contact path')
        check(prefix + '/blog/grundlagen' in page.anchors, f'{path}: missing basics path')
    for href in page.anchors:
        target = urlsplit(href).path
        check(not any(target == prefix + '/blog/' + old for old in retired for prefix in ['', '/en']), f'{path}: promotes retired article {target}')
        check(not target.endswith('/blog/kategorie/operativ-service'), f'{path}: promotes retired category')

# Topic entry points must resolve to existing pages, including cross-category recommendations.
for path, page in pages.items():
    if '/blog/kategorie/' in path or path.endswith(('/blog/vergleiche', '/blog/grundlagen')):
        for href in page.anchors:
            if not href.startswith('/') or href.startswith('//'): continue
            target = urlsplit(href).path
            if target in ['/', '/en']: continue
            # Legal pages in the English footer deliberately point to German originals.
            plain = target.removeprefix('/en') if target.startswith('/en/') else target
            compiled_route = '/[locale]' + plain + '/page'
            app_routes = json.loads((BUILD.parent / 'app-paths-manifest.json').read_text())
            check(target in pages or compiled_route in app_routes, f'{path}: unresolved internal link {target}')


sitemap = ET.fromstring((BUILD / 'sitemap.xml.body').read_text())
ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9', 'x': 'http://www.w3.org/1999/xhtml'}
urls = {item.find('s:loc', ns).text: item for item in sitemap}
check(len(urls) == len(list(sitemap)), 'Duplicate sitemap URLs')
for locale in ['de', 'en']:
    prefix = '/en' if locale == 'en' else ''
    for slug in active:
        url = BASE + prefix + '/blog/' + slug
        check(url in urls, f'Missing sitemap URL: {url}')
    check(BASE + prefix + '/blog/vergleiche' in urls, 'Missing comparisons sitemap URL')
    check(BASE + prefix + '/blog/grundlagen' in urls, 'Missing basics sitemap URL')
    for slug in retired:
        check(BASE + prefix + '/blog/' + slug not in urls, f'Retired article in sitemap: {slug}')
    check(BASE + prefix + '/blog/kategorie/operativ-service' not in urls, 'Retired category in sitemap')
    for slug, service, case in [('acos-erklaert', '/leistungen/ppc-advertising', '/ergebnisse/vitaworld'), ('a-plus-content', '/leistungen/listing-seo', '/ergebnisse/bachgold')]:
        page = pages[prefix + '/blog/' + slug]
        check(prefix + service in page.anchors and prefix + case in page.anchors, f'{slug}: missing relevant service/case')
    check(prefix + '/design-beispiele' in pages[prefix + '/blog/a-plus-content'].anchors, 'Content article missing design examples')
for url, item in urls.items():
    for alternate in item.findall('x:link', ns):
        check(alternate.get('href') in urls, f'Sitemap alternate without canonical entry: {alternate.get("href")}')

report = {'active_articles_per_language': len(active), 'retired_articles_per_language': len(retired), 'built_pages_checked': len(pages), 'sitemap_urls': len(urls), 'errors': errors}
print(json.dumps(report, ensure_ascii=False, indent=2))
raise SystemExit(bool(errors))
