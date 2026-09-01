import glob, os

files = glob.glob('C:/Users/RAJAT/.gemini/antigravity/scratch/shuddhi/*.html')

chatbot_markup = """
  <!-- Floating Customer-Support Chatbot Widget -->
  <button class="chatbot-toggle-btn" id="chatbotToggleBtn" aria-label="Chat with Shuddhi Customer Support" aria-expanded="false" aria-controls="chatbotWidget">
    <span class="chatbot-badge"></span>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
    <span>Chat with Shuddhi</span>
  </button>

  <div class="chatbot-widget" id="chatbotWidget" aria-label="Shuddhi Support Chatbot" role="dialog" aria-hidden="true">
    <div class="chatbot-header">
      <div class="chatbot-header-info">
        <h3 class="chatbot-title">Shuddhi Support</h3>
        <span class="chatbot-subtitle">Purity in Every Sip.</span>
      </div>
      <div class="chatbot-header-actions">
        <button class="chatbot-btn-text" id="chatNewBtn" title="Start New Chat">New Chat</button>
        <button class="chatbot-close-btn" id="chatCloseBtn" aria-label="Close Chat Window">&times;</button>
      </div>
    </div>

    <div class="chatbot-body" id="chatMessages" role="log" aria-live="polite">
      <!-- Dynamic chat message bubbles inserted via script.js -->
    </div>

    <div class="chatbot-footer">
      <form class="chat-input-form" id="chatForm">
        <input type="text" id="chatInput" class="chat-input" placeholder="Ask a question..." aria-label="Type your message" autocomplete="off">
        <button type="submit" class="chat-send-btn" id="chatSendBtn">Send</button>
      </form>
    </div>
  </div>
"""

count = 0
for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        code = f.read()
    if 'id="chatbotToggleBtn"' not in code and '</body>' in code:
        code = code.replace('</body>', chatbot_markup + '\n</body>')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(code)
        count += 1
        print(f"Added chatbot markup to: {os.path.basename(filepath)}")

print(f"Chatbot markup added to {count} HTML files successfully.")
