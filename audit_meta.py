import glob, re, os, sys

sys.stdout.reconfigure(encoding='utf-8')
files = sorted(glob.glob('C:/Users/RAJAT/.gemini/antigravity/scratch/shuddhi/*.html'))

print(f'Auditing {len(files)} HTML files...\n')

for filepath in files:
    fname = os.path.basename(filepath)
    with open(filepath, 'r', encoding='utf-8') as f:
        code = f.read()

    # Meta Title
    t = re.search(r'<title>(.*?)</title>', code)
    title = t.group(1) if t else 'MISSING'

    # Meta Desc
    d = re.search(r'<meta\s+name="description"\s+content="(.*?)"', code)
    desc = d.group(1) if d else 'MISSING'

    # Canonical
    c = re.search(r'<link\s+rel="canonical"\s+href="(.*?)"', code)
    canonical = c.group(1) if c else 'MISSING'

    # Favicon
    fav = re.search(r'<link\s+rel="icon"', code)
    has_fav = bool(fav)

    # OG tags
    og_t = re.search(r'<meta\s+property="og:title"', code)
    has_og = bool(og_t)

    # Twitter card
    tw = re.search(r'<meta\s+name="twitter:card"', code)
    has_tw = bool(tw)

    # href="#"
    hash_links = re.findall(r'href="#.*?"', code)

    # Script defer
    script_defer = re.search(r'<script\s+src="script\.js"\s+defer', code)

    print(f'=== {fname} ===')
    print(f'  Title: {title}')
    print(f'  Desc ({len(desc)} chars): {desc}')
    print(f'  Canonical: {canonical}')
    print(f'  Favicon: {has_fav}')
    print(f'  OG Tags: {has_og}')
    print(f'  Twitter Tags: {has_tw}')
    print(f'  Script defer: {bool(script_defer)}')
    print(f'  Hash links (#): {len(hash_links)}')
    print('')
