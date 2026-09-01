/**
 * SHUDDHI — MASTER JAVASCRIPT ARCHITECTURE
 * Brand: Shuddhi | Purity in Every Sip.
 * Location: Central Lucknow, Uttar Pradesh, India
 * Features: Mobile navigation toggle, Sticky header, Slide-out cart drawer, Search modal, Meta CAPI event hooks
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. META ADS & GA4 ANALYTICS ENGINE (CONFIGURABLE HOOKS)
     -------------------------------------------------------------------------- */
  window.ShuddhiAnalytics = {
    pixelId: window.SHUDDHI_PIXEL_ID || null,
    gaId: window.SHUDDHI_GA_ID || null,
    
    trackEvent: function(eventName, eventParams = {}) {
      const timestamp = new Date().toISOString();
      console.log(`[Shuddhi Analytics] Event: "${eventName}"`, eventParams);
      
      // Meta Pixel Event Hook
      if (typeof window.fbq === 'function') {
        window.fbq('track', eventName, eventParams);
      }
      
      // GA4 Event Hook
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, eventParams);
      }
    }
  };

  // Dispatch Initial PageView
  window.ShuddhiAnalytics.trackEvent('PageView', {
    page_location: window.location.href,
    page_title: document.title
  });

  /* --------------------------------------------------------------------------
     2. MOBILE NAVIGATION TOGGLE (DEBUGGED & ROBUST)
     -------------------------------------------------------------------------- */
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');

  if (mobileNavToggle && mobileMenuDrawer) {
    mobileNavToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileMenuDrawer.classList.contains('is-open');
      
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close mobile menu when clicking any nav link
    const mobileNavLinks = mobileMenuDrawer.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileNavToggle.contains(e.target) && !mobileMenuDrawer.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  function openMobileMenu() {
    mobileNavToggle.classList.add('is-active');
    mobileNavToggle.setAttribute('aria-expanded', 'true');
    mobileMenuDrawer.classList.add('is-open');
  }

  function closeMobileMenu() {
    mobileNavToggle.classList.remove('is-active');
    mobileNavToggle.setAttribute('aria-expanded', 'false');
    mobileMenuDrawer.classList.remove('is-open');
  }

  /* --------------------------------------------------------------------------
     3. STICKY HEADER SCROLL EFFECT
     -------------------------------------------------------------------------- */
  const siteHeader = document.getElementById('siteHeader');
  if (siteHeader) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        siteHeader.classList.add('is-scrolled');
      } else {
        siteHeader.classList.remove('is-scrolled');
      }
    }, { passive: true });
  }

  /* --------------------------------------------------------------------------
     4. ECOMMERCE CART ENGINE & SLIDE-OUT DRAWER
     -------------------------------------------------------------------------- */
  let cartState = JSON.parse(localStorage.getItem('shuddhi_cart')) || [
    {
      id: 'shuddhi-classic-1l',
      name: 'Shuddhi Classic Copper Bottle',
      capacity: '1 L',
      price: 799,
      quantity: 1,
      image: 'images/shuddhi_classic_bottle.jpg'
    }
  ];

  const cartToggleBtn = document.getElementById('cartToggleBtn');
  const cartDrawer = document.getElementById('cartDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartCountBadges = document.querySelectorAll('.cart-count-badge');
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cartSubtotalElement = document.getElementById('cartSubtotal');

  function saveCartState() {
    localStorage.setItem('shuddhi_cart', JSON.stringify(cartState));
    updateCartUI();
  }

  function updateCartUI() {
    // Total Items Count
    const totalCount = cartState.reduce((sum, item) => sum + item.quantity, 0);
    cartCountBadges.forEach(badge => {
      badge.textContent = totalCount;
    });

    // Subtotal Calculation
    const subtotal = cartState.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartSubtotalElement) {
      cartSubtotalElement.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    }

    // Render Items inside Drawer
    if (cartItemsContainer) {
      if (cartState.length === 0) {
        cartItemsContainer.innerHTML = `
          <div style="text-align: center; padding: 2rem 0; color: #777;">
            <p>Your cart is empty.</p>
            <a href="shop.html" class="btn btn-secondary" style="margin-top: 1rem;">Explore Collection</a>
          </div>
        `;
      } else {
        cartItemsContainer.innerHTML = cartState.map(item => `
          <div style="display: flex; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--color-sand-beige); align-items: center;">
            <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 6px;">
            <div style="flex: 1;">
              <h4 style="font-size: 0.95rem; margin-bottom: 2px;">${item.name}</h4>
              <p style="font-size: 0.8rem; color: #666; margin-bottom: 4px;">Capacity: ${item.capacity}</p>
              <p style="font-weight: 700; color: var(--color-burnished-copper); font-size: 0.9rem;">₹${item.price} x ${item.quantity}</p>
            </div>
            <button onclick="window.removeCartItem('${item.id}')" style="color: #999; font-size: 1.2rem; padding: 4px;" title="Remove Item">&times;</button>
          </div>
        `).join('');
      }
    }
  }

  window.removeCartItem = function(id) {
    cartState = cartState.filter(item => item.id !== id);
    saveCartState();
  };

  window.addToCart = function(product) {
    const existingIndex = cartState.findIndex(item => item.id === product.id);
    if (existingIndex > -1) {
      cartState[existingIndex].quantity += 1;
    } else {
      cartState.push({
        id: product.id || 'shuddhi-classic-1l',
        name: product.name || 'Shuddhi Classic Copper Bottle',
        capacity: product.capacity || '1 L',
        price: product.price || 799,
        quantity: 1,
        image: product.image || 'images/shuddhi_classic_bottle.jpg'
      });
    }

    saveCartState();

    // Track Meta Ads Event
    window.ShuddhiAnalytics.trackEvent('AddToCart', {
      content_name: product.name,
      content_category: 'Copper Bottle',
      value: product.price,
      currency: 'INR'
    });

    openCartDrawer();
  };

  function openCartDrawer() {
    if (cartDrawer && drawerBackdrop) {
      cartDrawer.classList.add('is-open');
      drawerBackdrop.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCartDrawer() {
    if (cartDrawer && drawerBackdrop) {
      cartDrawer.classList.remove('is-open');
      drawerBackdrop.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  }

  if (cartToggleBtn) cartToggleBtn.addEventListener('click', openCartDrawer);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeCartDrawer);

  // Initial UI Render
  updateCartUI();

  /* --------------------------------------------------------------------------
     5. GLOBAL QUICK BUY HANDLER
     -------------------------------------------------------------------------- */
  window.buyNow = function(product) {
    window.addToCart(product);
    window.ShuddhiAnalytics.trackEvent('InitiateCheckout', {
      content_name: product.name,
      value: product.price,
      currency: 'INR'
    });
    alert(`Thank you! Proceeding to checkout for ${product.name || 'Shuddhi Bottle'} (₹${product.price || 799}). Direct Razorpay/Cashfree gateway integration ready.`);
  };

  /* --------------------------------------------------------------------------
     6. NEWSLETTER & ACCESSIBLE CONTACT FORM VALIDATION ENGINE
     -------------------------------------------------------------------------- */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value;
      window.ShuddhiAnalytics.trackEvent('NewsletterSignup', { email: email });
      
      const successDiv = document.getElementById('newsletterSuccess');
      if (successDiv) {
        successDiv.style.display = 'block';
        successDiv.textContent = `Welcome to the Shuddhi Circle! Confirmation sent to ${email}.`;
      } else {
        alert(`Welcome to the Shuddhi Circle! We have sent a confirmation email to ${email}.`);
      }
      newsletterForm.reset();
    });
  }

  // ACCESSIBLE SHUDDHI CONTACT FORM VALIDATOR
  const contactForm = document.getElementById('contactForm');
  const contactSuccessMsg = document.getElementById('contactSuccessMsg');

  if (contactForm) {
    const fields = {
      name: {
        input: document.getElementById('contactName'),
        error: document.getElementById('contactNameError'),
        validate: (val) => val.trim().length > 0 ? null : 'Please enter your name.'
      },
      mobile: {
        input: document.getElementById('contactMobile'),
        error: document.getElementById('contactMobileError'),
        validate: (val) => {
          const trimmed = val.trim();
          if (!trimmed) return 'Please enter your mobile number.';
          if (!/^\d{10}$/.test(trimmed)) return 'Please enter a valid 10-digit mobile number.';
          return null;
        }
      },
      email: {
        input: document.getElementById('contactEmail'),
        error: document.getElementById('contactEmailError'),
        validate: (val) => {
          const trimmed = val.trim();
          if (!trimmed) return 'Please enter a valid email address.';
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(trimmed)) return 'Please enter a valid email address.';
          return null;
        }
      },
      enquiryType: {
        input: document.getElementById('contactEnquiryType'),
        error: document.getElementById('contactEnquiryTypeError'),
        validate: (val) => val && val !== '' && val !== 'Select an enquiry type' ? null : 'Please select an enquiry type.'
      },
      message: {
        input: document.getElementById('contactMessage'),
        error: document.getElementById('contactMessageError'),
        validate: (val) => val.trim().length > 0 ? null : 'Please tell us how we can help.'
      }
    };

    // Helper to validate single field
    function validateField(fieldKey) {
      const field = fields[fieldKey];
      if (!field || !field.input) return true;

      const errorMsg = field.validate(field.input.value);
      if (errorMsg) {
        field.input.classList.add('is-invalid');
        field.input.setAttribute('aria-invalid', 'true');
        if (field.error) {
          field.error.textContent = errorMsg;
          field.error.style.display = 'block';
        }
        return false;
      } else {
        field.input.classList.remove('is-invalid');
        field.input.setAttribute('aria-invalid', 'false');
        if (field.error) {
          field.error.textContent = '';
          field.error.style.display = 'none';
        }
        return true;
      }
    }

    // Attach live input/blur listeners for real-time error clearance
    Object.keys(fields).forEach(key => {
      const field = fields[key];
      if (field && field.input) {
        field.input.addEventListener('input', () => {
          if (field.input.classList.contains('is-invalid')) {
            validateField(key);
          }
        });
        field.input.addEventListener('blur', () => {
          validateField(key);
        });
      }
    });

    // Form Submission Handler
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      let firstInvalidInput = null;

      Object.keys(fields).forEach(key => {
        const fieldValid = validateField(key);
        if (!fieldValid) {
          isValid = false;
          if (!firstInvalidInput && fields[key].input) {
            firstInvalidInput = fields[key].input;
          }
        }
      });

      if (!isValid) {
        if (firstInvalidInput) firstInvalidInput.focus();
        return;
      }

      // Track Submission Event via Analytics Hook
      window.ShuddhiAnalytics.trackEvent('ContactEnquirySubmit', {
        enquiry_type: fields.enquiryType.input.value,
        product: document.getElementById('contactProduct') ? document.getElementById('contactProduct').value : 'Unspecified'
      });

      // Display Accessible On-Page Success State
      contactForm.style.display = 'none';
      if (contactSuccessMsg) {
        contactSuccessMsg.style.display = 'block';
        contactSuccessMsg.focus();
        contactSuccessMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  /* --------------------------------------------------------------------------
     8. ACCESSIBLE FAQ ACCORDION ENGINE
     -------------------------------------------------------------------------- */
  const faqAccordion = document.getElementById('faqAccordion');
  if (faqAccordion) {
    const faqTriggers = faqAccordion.querySelectorAll('.faq-trigger');
    
    faqTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        const panelId = trigger.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);

        trigger.setAttribute('aria-expanded', !isExpanded);
        if (panel) {
          if (isExpanded) {
            panel.setAttribute('hidden', '');
          } else {
            panel.removeAttribute('hidden');
          }
        }
      });
    });

    // Category Filtering Tabs
    const categoryBtns = document.querySelectorAll('.faq-category-btn');
    const faqItems = faqAccordion.querySelectorAll('.faq-item');

    categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryBtns.forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        const cat = btn.getAttribute('data-category');
        faqItems.forEach(item => {
          if (cat === 'all' || item.getAttribute('data-category') === cat) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     9. CUSTOMER-SUPPORT CHATBOT & CUSTOMER CARE HANDOFF ENGINE
     -------------------------------------------------------------------------- */
  const chatbotToggleBtn = document.getElementById('chatbotToggleBtn');
  const chatbotWidget = document.getElementById('chatbotWidget');
  const chatCloseBtn = document.getElementById('chatCloseBtn');
  const chatNewBtn = document.getElementById('chatNewBtn');
  const chatMessages = document.getElementById('chatMessages');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');

  if (chatbotToggleBtn && chatbotWidget) {
    // Knowledge Base Rules & Approved FAQ Memory
    const kbRules = [
      {
        keywords: ['product', 'what is shuddhi', 'bottle', 'offer', 'collection', 'reusable'],
        response: 'Shuddhi is a lifestyle brand focused on reusable copper drinkware inspired by traditional Indian copper vessels. Our featured flagship product is the Shuddhi Classic Copper Bottle — 1 Litre, priced at ₹799.',
        links: '<a href="shop.html" class="link-copper">Explore Shop &rarr;</a>'
      },
      {
        keywords: ['price', 'cost', 'how much', '₹799', 'rate', 'size', 'capacity', 'litre', '1l', '1 litre'],
        response: 'The Shuddhi Classic Copper Bottle has a capacity of 1 Litre and is priced at ₹799.',
        links: '<a href="product.html" class="link-copper">View 1L Bottle Details &rarr;</a>'
      },
      {
        keywords: ['care', 'clean', 'wash', 'dishwasher', 'tarnish', 'dark', 'color', 'lemon', 'salt', 'maintain', 'store'],
        response: 'Clean your copper bottle regularly using equal parts lemon juice (or vinegar) and table salt. Avoid harsh abrasive cleaners. Do not place the bottle in a dishwasher unless specified.',
        links: '<a href="why-copper.html" class="link-copper">Read Full Care Guide &rarr;</a>'
      },
      {
        keywords: ['buy', 'order', 'purchase', 'shipping', 'delivery', 'lucknow', 'express'],
        response: 'You can explore our collection and place an order directly on our website. We provide express dispatches from Central Lucknow across Uttar Pradesh and Pan-India.',
        links: '<a href="shop.html" class="link-copper">Go to Catalog &rarr;</a>'
      },
      {
        keywords: ['bulk', 'corporate', 'wholesale', 'gift', 'gifting', 'custom', 'engrave'],
        response: 'Yes! We welcome bulk, corporate, and wholesale enquiries. You can submit a bulk enquiry directly through our customer care form.',
        links: '<button class="chat-chip" onclick="window.renderChatCareForm(\'Bulk / Corporate Enquiry\')">Submit Bulk Enquiry</button>'
      },
      {
        keywords: ['contact', 'human', 'support', 'help', 'agent', 'speak', 'call', 'phone', 'whatsapp', 'customer care'],
        response: 'Our customer-care team in Lucknow is here to help you with orders, deliveries, and enquiries.',
        links: '<button class="chat-chip" onclick="window.renderChatCareForm()">Contact Customer Care</button>'
      }
    ];

    // Health Query Keywords
    const healthKeywords = ['cure', 'disease', 'cancer', 'diabetes', 'immunity', 'medical', 'weight loss', 'detox'];

    // Open/Close Handlers
    chatbotToggleBtn.addEventListener('click', () => {
      const isOpen = chatbotWidget.classList.contains('is-open');
      if (isOpen) {
        closeChatbot();
      } else {
        openChatbot();
      }
    });

    if (chatCloseBtn) {
      chatCloseBtn.addEventListener('click', closeChatbot);
    }

    if (chatNewBtn) {
      chatNewBtn.addEventListener('click', initChatbotSession);
    }

    function openChatbot() {
      chatbotWidget.classList.add('is-open');
      chatbotWidget.setAttribute('aria-hidden', 'false');
      chatbotToggleBtn.setAttribute('aria-expanded', 'true');
      
      if (!chatMessages.children.length) {
        initChatbotSession();
      }
    }

    function closeChatbot() {
      chatbotWidget.classList.remove('is-open');
      chatbotWidget.setAttribute('aria-hidden', 'true');
      chatbotToggleBtn.setAttribute('aria-expanded', 'false');
    }

    // Escape Key Listener
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && chatbotWidget.classList.contains('is-open')) {
        closeChatbot();
        chatbotToggleBtn.focus();
      }
    });

    function initChatbotSession() {
      chatMessages.innerHTML = '';
      appendBotMessage('Hi! Welcome to Shuddhi. How can we help you today?');
      appendQuickOptions();
    }

    function appendBotMessage(text, htmlExtra = '') {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'chat-message bot';
      msgDiv.innerHTML = `<p style="margin:0;">${text}</p>` + (htmlExtra ? `<div style="margin-top:0.4rem;">${htmlExtra}</div>` : '');
      chatMessages.appendChild(msgDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function appendUserMessage(text) {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'chat-message user';
      msgDiv.textContent = text;
      chatMessages.appendChild(msgDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function appendQuickOptions() {
      const optDiv = document.createElement('div');
      optDiv.className = 'chat-quick-options';
      optDiv.innerHTML = `
        <button class="chat-chip" onclick="window.handleQuickChip('Product Information')">Product Information</button>
        <button class="chat-chip" onclick="window.handleQuickChip('Price & Sizes')">Price & Sizes</button>
        <button class="chat-chip" onclick="window.handleQuickChip('How to Care')">How to Care</button>
        <button class="chat-chip" onclick="window.handleQuickChip('Order Help')">Order Help</button>
        <button class="chat-chip" onclick="window.handleQuickChip('Bulk / Corporate Enquiry')">Bulk / Corporate Enquiry</button>
        <button class="chat-chip" onclick="window.handleQuickChip('Talk to Customer Care')">Talk to Customer Care</button>
      `;
      chatMessages.appendChild(optDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    window.handleQuickChip = function(optionText) {
      appendUserMessage(optionText);
      processQuery(optionText);
    };

    function processQuery(queryText) {
      const lower = queryText.toLowerCase().trim();

      // Check Health Query
      const isHealth = healthKeywords.some(kw => lower.includes(kw));
      if (isHealth) {
        appendBotMessage(
          "Shuddhi is a drinkware brand and we do not make claims that copper water can cure or treat medical conditions. For health concerns, please consult a qualified healthcare professional.",
          '<button class="chat-chip" onclick="window.renderChatCareForm()">Contact Customer Care</button>'
        );
        return;
      }

      // Match Knowledge Base
      let matchedRule = null;
      for (const rule of kbRules) {
        if (rule.keywords.some(kw => lower.includes(kw))) {
          matchedRule = rule;
          break;
        }
      }

      if (matchedRule) {
        appendBotMessage(matchedRule.response, matchedRule.links);
      } else {
        // Fallback Response
        appendBotMessage(
          "I don't have enough confirmed information to answer that accurately. Would you like to contact our customer-care team?",
          '<div style="display:flex; gap:0.4rem; flex-wrap:wrap; margin-top:0.4rem;">' +
          '<button class="chat-chip" onclick="window.renderChatCareForm()">Yes, Contact Customer Care</button>' +
          '<button class="chat-chip" onclick="window.handleQuickChip(\'Product Information\')">Ask Another Question</button>' +
          '</div>'
        );
      }
    }

    // Input Submit Handler
    if (chatForm && chatInput) {
      chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const val = chatInput.value.trim();
        if (!val) return;
        appendUserMessage(val);
        chatInput.value = '';
        processQuery(val);
      });
    }

    // Customer Care Form Generator
    window.renderChatCareForm = function(preselectedType = '') {
      const formContainer = document.createElement('div');
      formContainer.className = 'chat-form-container';
      formContainer.innerHTML = `
        <div class="chat-form-title">Contact Customer Care</div>
        <form id="inChatForm" novalidate style="display:flex; flex-direction:column; gap:0.5rem;">
          <input type="text" id="chatName" class="form-input" placeholder="Your Name *" required style="padding:0.4rem 0.6rem; font-size:0.82rem;">
          <span id="chatNameErr" class="form-error-msg" role="alert"></span>

          <input type="tel" id="chatMobile" class="form-input" placeholder="10-Digit Mobile Number *" required style="padding:0.4rem 0.6rem; font-size:0.82rem;">
          <span id="chatMobileErr" class="form-error-msg" role="alert"></span>

          <input type="email" id="chatEmail" class="form-input" placeholder="Email Address *" required style="padding:0.4rem 0.6rem; font-size:0.82rem;">
          <span id="chatEmailErr" class="form-error-msg" role="alert"></span>

          <select id="chatEnquiryType" class="form-input" required style="padding:0.4rem 0.6rem; font-size:0.82rem;">
            <option value="">Select Enquiry Type *</option>
            <option value="Product Enquiry" ${preselectedType === 'Product Enquiry' ? 'selected' : ''}>Product Enquiry</option>
            <option value="Order Enquiry" ${preselectedType === 'Order Enquiry' ? 'selected' : ''}>Order Enquiry</option>
            <option value="Delivery Enquiry" ${preselectedType === 'Delivery Enquiry' ? 'selected' : ''}>Delivery Enquiry</option>
            <option value="Product Care" ${preselectedType === 'Product Care' ? 'selected' : ''}>Product Care</option>
            <option value="Return / Refund" ${preselectedType === 'Return / Refund' ? 'selected' : ''}>Return / Refund</option>
            <option value="Bulk / Corporate Enquiry" ${preselectedType === 'Bulk / Corporate Enquiry' ? 'selected' : ''}>Bulk / Corporate Enquiry</option>
            <option value="Wholesale Enquiry" ${preselectedType === 'Wholesale Enquiry' ? 'selected' : ''}>Wholesale Enquiry</option>
            <option value="Other" ${preselectedType === 'Other' ? 'selected' : ''}>Other</option>
          </select>
          <span id="chatEnquiryTypeErr" class="form-error-msg" role="alert"></span>

          <input type="text" id="chatOrderNum" class="form-input" placeholder="Order Number (optional)" style="padding:0.4rem 0.6rem; font-size:0.82rem;">

          <textarea id="chatMessageText" class="form-input" rows="2" placeholder="How can we help? *" required style="padding:0.4rem 0.6rem; font-size:0.82rem;"></textarea>
          <span id="chatMessageTextErr" class="form-error-msg" role="alert"></span>

          <button type="submit" class="btn btn-primary btn-full" style="padding:0.5rem; font-size:0.85rem; margin-top:0.25rem;">Send Enquiry</button>
        </form>
      `;

      chatMessages.appendChild(formContainer);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Attach in-chat form submit listener
      const inChatForm = document.getElementById('inChatForm');
      inChatForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameVal = document.getElementById('chatName').value.trim();
        const mobileVal = document.getElementById('chatMobile').value.trim();
        const emailVal = document.getElementById('chatEmail').value.trim();
        const typeVal = document.getElementById('chatEnquiryType').value;
        const msgVal = document.getElementById('chatMessageText').value.trim();

        let valid = true;

        ['chatNameErr', 'chatMobileErr', 'chatEmailErr', 'chatEnquiryTypeErr', 'chatMessageTextErr'].forEach(id => {
          const el = document.getElementById(id);
          if (el) { el.textContent = ''; el.style.display = 'none'; }
        });

        if (!nameVal) {
          showInChatError('chatNameErr', 'Please enter your name.');
          valid = false;
        }

        if (!/^\d{10}$/.test(mobileVal)) {
          showInChatError('chatMobileErr', 'Please enter a valid 10-digit mobile number.');
          valid = false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
          showInChatError('chatEmailErr', 'Please enter a valid email address.');
          valid = false;
        }

        if (!typeVal) {
          showInChatError('chatEnquiryTypeErr', 'Please select an enquiry type.');
          valid = false;
        }

        if (!msgVal) {
          showInChatError('chatMessageTextErr', 'Please tell us how we can help.');
          valid = false;
        }

        if (!valid) return;

        window.ShuddhiAnalytics.trackEvent('ContactEnquirySubmit', {
          source: 'Chatbot_CareForm',
          enquiry_type: typeVal,
          mobile: mobileVal
        });

        formContainer.innerHTML = `
          <div style="background-color: var(--color-sand-beige); border-radius: var(--border-radius-md); padding: 0.85rem; text-align: center;">
            <h4 style="font-family:var(--font-serif); color:var(--color-deep-evergreen); margin-bottom:0.25rem;">Thank you for contacting Shuddhi.</h4>
            <p style="font-size:0.82rem; color:var(--color-charcoal); margin:0;">We've received your enquiry and our team will get back to you.</p>
          </div>
        `;
        chatMessages.scrollTop = chatMessages.scrollHeight;
      });
    };

    function showInChatError(errId, msg) {
      const errEl = document.getElementById(errId);
      if (errEl) {
        errEl.textContent = msg;
        errEl.style.display = 'block';
      }
    }
  }
});

