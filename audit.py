import glob, re, os, sys

# Set stdout encoding to utf-8
sys.stdout.reconfigure(encoding='utf-8')

html_files = sorted(glob.glob('C:/Users/RAJAT/.gemini/antigravity/scratch/shuddhi/*.html'))

print(f"Total HTML Files Found: {len(html_files)}\n")

titles = {}
descs = {}
headers = {}
footers = {}

for filepath in html_files:
    filename = os.path.basename(filepath)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Title
    t_match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE)
    title = t_match.group(1) if t_match else 'MISSING'
    titles[filename] = title

    # Meta desc
    d_match = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', content, re.IGNORECASE)
    desc = d_match.group(1) if d_match else 'MISSING'
    descs[filename] = desc

    # Header snippet (normalize nav links active state to check structural equivalence)
    h_match = re.search(r'(<header.*?</header>)', content, re.IGNORECASE | re.DOTALL)
    if h_match:
        h_text = h_match.group(1).strip()
        # Remove active class for structural comparison
        h_norm = re.sub(r'\s*is-active', '', h_text)
        headers[filename] = h_norm
    else:
        headers[filename] = 'MISSING'

    # Footer snippet
    f_match = re.search(r'(<footer.*?</footer>)', content, re.IGNORECASE | re.DOTALL)
    footers[filename] = f_match.group(1).strip() if f_match else 'MISSING'

    # H1 count
    h1s = re.findall(r'<h1[\s>](.*?)</h1>', content, re.IGNORECASE | re.DOTALL)

    # Img alt missing or empty
    imgs = re.findall(r'<img[^>]*>', content, re.IGNORECASE)
    missing_alt = []
    for img in imgs:
        if 'alt=' not in img.lower():
            missing_alt.append(img)
        else:
            # Check if alt is empty alt=""
            alt_val = re.search(r'alt=["\'](.*?)["\']', img, re.IGNORECASE)
            if not alt_val or alt_val.group(1).strip() == '':
                missing_alt.append(img)

    # Inline style attributes
    styles = re.findall(r'style=["\'](.*?)["\']', content, re.IGNORECASE)

    # Check for hardcoded hex colors or pixel sizes in inline styles
    hardcoded_styles = []
    for s in styles:
        if re.search(r'#([0-9a-fA-F]{3,6})|rgba?\(|\b\d+px\b', s):
            hardcoded_styles.append(s)

    # Internal links
    links = re.findall(r'href=["\'](.*?)["\']', content, re.IGNORECASE)
    broken = []
    for link in links:
        if link.endswith('.html') and not link.startswith('http'):
            target_path = os.path.join('C:/Users/RAJAT/.gemini/antigravity/scratch/shuddhi/', link)
            if not os.path.exists(target_path):
                broken.append(link)

    print('='*50)
    print(f'FILE: {filename}')
    print(f'  Title: {title}')
    print(f'  Meta Desc: {desc}')
    print(f'  H1 Count: {len(h1s)}')
    for h in h1s:
        # Clean tags inside H1
        clean_h1 = re.sub(r'<[^>]+>', '', h).strip()
        print(f'    H1 text: {clean_h1}')
    print(f'  Missing/Empty Alt Images Count: {len(missing_alt)}')
    print(f'  Total Inline Style Attrs: {len(styles)}')
    print(f'  Hardcoded Colors/Sizes in Styles: {len(hardcoded_styles)}')
    if hardcoded_styles:
        print(f'  Sample Hardcoded Styles: {hardcoded_styles[:5]}')
    print(f'  Broken Links: {broken}')

# Header / Footer Inconsistencies Check
print('\n' + '='*50)
print('HEADER / FOOTER CONSISTENCY AUDIT')
header_set = set(headers.values())
footer_set = set(footers.values())
print(f'Unique Header Structures (Normalized Active Links): {len(header_set)}')
if len(header_set) > 1:
    print('Header Structural Differences Detected!')

print(f'Unique Footer Structures: {len(footer_set)}')
if len(footer_set) > 1:
    print('Footer Structural Differences Detected!')

# Duplicate Titles / Descs Check
print('\n' + '='*50)
print('TITLE & META DESC DUPLICATE AUDIT')
title_counts = {}
for file, title in titles.items():
    title_counts[title] = title_counts.get(title, []) + [file]

for title, files in title_counts.items():
    if len(files) > 1:
        print(f'DUPLICATE TITLE "{title}": {files}')
    else:
        print(f'UNIQUE TITLE [{files[0]}]: {title}')

print('')
desc_counts = {}
for file, desc in descs.items():
    desc_counts[desc] = desc_counts.get(desc, []) + [file]

for desc, files in desc_counts.items():
    if len(files) > 1:
        print(f'DUPLICATE META DESC "{desc}": {files}')
