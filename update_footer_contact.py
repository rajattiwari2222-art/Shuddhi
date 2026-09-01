import glob, os

files = glob.glob('C:/Users/RAJAT/.gemini/antigravity/scratch/shuddhi/*.html')

old_snippet = """        <div>
          <h4 class="footer-links-title">Connect With Us</h4>
          <p class="text-footer-sub margin-bottom-sm">
            Central Lucknow, Uttar Pradesh, India<br>
            WhatsApp Support Available
          </p>
          <div class="footer-social-links">
            <a href="https://instagram.com" target="_blank" rel="noopener">Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noopener">Facebook</a>
          </div>
        </div>"""

new_snippet = """        <div>
          <h4 class="footer-links-title">Connect With Us</h4>
          <p class="text-footer-sub margin-bottom-sm">
            6/316 Jankipuram Extension<br>
            Lucknow, Uttar Pradesh, 226021, India<br>
            Mobile: +91 73553 21473
          </p>
          <div class="footer-social-links">
            <a href="https://wa.me/917355321473" target="_blank" rel="noopener">WhatsApp</a>
            <a href="https://instagram.com" target="_blank" rel="noopener">Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noopener">Facebook</a>
          </div>
        </div>"""

count = 0
for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        code = f.read()
    if old_snippet in code:
        code = code.replace(old_snippet, new_snippet)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(code)
        count += 1
        print(f"Updated footer in: {os.path.basename(filepath)}")

print(f"Updated {count} HTML files successfully.")
