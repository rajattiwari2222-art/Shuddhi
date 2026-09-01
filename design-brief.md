# Shuddhi — Design Brief & Visual Identity System

**Brand Name**: Shuddhi  
**Tagline**: "Purity in Every Sip."  
**Brand Values**: Purity • Sustainability • Wellness • Indian Tradition • Premium Craftsmanship • Modern Living  
**File**: `design-brief.md`  

---

## 1. Executive Summary & Design Philosophy
Shuddhi is a premium D2C Indian wellness and sustainable lifestyle brand specialising in handcrafted pure copper water bottles. The visual design system communicates elegance, warmth, purity, and authenticity. Rather than feeling like a generic e-commerce template, the website delivers an editorial, modern Indian D2C experience with high whitespace, serif typography, natural textures, and subtle copper accents.

---

## 2. Brand Colour Palette

### Primary & Dark Tones
- **Primary**: `Forest Green` — `#23483A`  
  *Use for*: Primary CTA buttons, main navigation, major headings, active states, sustainability sections.
- **Dark Neutral / Primary Dark**: `Deep Evergreen` — `#16352B`  
  *Use for*: Footer background, dark feature blocks, hero overlays, button hover states, premium contrast.
- **Dark Text**: `Charcoal` — `#252525`  
  *Use for*: Body paragraphs, product descriptions, nav text, blog copy. *(Avoid pure #000000)*.

### Accent Tones
- **Accent**: `Rich Copper` — `#B66A3C`  
  *Use for*: Brand logo highlights, product badges, icon accents, borders, sub-heading highlights.
- **Secondary Accent**: `Burnished Copper` — `#7A3F24`  
  *Use for*: Product prices, founder quote typography, secondary headings, special hover states.

### Neutrals & Badges
- **Neutral 1 (Primary Background)**: `Warm Ivory Cream` — `#F7F1E5`  
  *Use for*: Main canvas, hero background, product grids, blog background. *(Creates warmth & purity)*.
- **Neutral 2 (Secondary Background)**: `Sand Beige` — `#E8DCC8`  
  *Use for*: Product cards, feature containers, FAQ accordion items, subtle section dividers.
- **Supporting Badge Neutral**: `Muted Sage` — `#A8B5A0`  
  *Use for*: Botanical graphic cues, eco-conscious badges, sustainability icons.

### Colour Ratio Hierarchy
- **60%** — Warm Ivory Cream (`#F7F1E5`)
- **20%** — Forest Green (`#23483A`)
- **10%** — Rich Copper (`#B66A3C`)
- **5%** — Sand Beige (`#E8DCC8`)
- **5%** — Muted Sage (`#A8B5A0`)
*(Deep Evergreen `#16352B` and Burnished Copper `#7A3F24` used selectively for high-contrast elements)*.

---

## 3. Typography System & Type Scale

The site utilizes exactly **two Google Fonts**:
1. **Display / Headlines / Editorial**: `Cormorant Garamond` (Weights: 400, 500, 600)
2. **Body copy / UI / E-commerce**: `DM Sans` (Weights: 400, 500, 600, 700)

### Type Scale Breakdown

| Element | Font Family | Mobile Size | Desktop Size | Weight | Line Height | Color |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **H1 (Hero)** | Cormorant Garamond | `38px - 44px` | `56px - 64px` | 600 | 1.08 - 1.15 | `#16352B` (Deep Evergreen) |
| **H2 (Major Section)** | Cormorant Garamond | `30px - 36px` | `42px - 48px` | 600 | 1.15 | `#16352B` (Deep Evergreen) |
| **H3 (Subsection)** | Cormorant Garamond | `24px - 28px` | `28px - 34px` | 600 | 1.20 | `#23483A` (Forest Green) |
| **H4 (Card/Feature Title)** | DM Sans | `18px - 20px` | `20px - 24px` | 600 | 1.30 | `#16352B` (Deep Evergreen) |
| **Body (Paragraph)** | DM Sans | `15px - 17px` | `16px - 18px` | 400 | 1.60 - 1.75 | `#252525` (Charcoal) |
| **Small Text / Badges** | DM Sans | `11px - 12px` | `12px - 13px` | 600 | 1.20 | `#F7F1E5` on `#B66A3C` / `#23483A` |
| **Product Price** | DM Sans | `18px - 20px` | `18px - 22px` | 700 | 1.20 | `#7A3F24` (Burnished Copper) |
| **Founder Quote** | Cormorant Garamond | `22px - 26px` | `28px - 36px` | 500 | 1.30 | `#7A3F24` (Burnished Copper) |

*Note: Maximum reading line-width for body copy is capped at ~650px–750px for optimal readability.*

---

## 4. Spacing Scale

Designed on a flexible 4px/8px incremental grid using CSS custom properties (`rem` and fluid `clamp()`):

- `space-xs` (4px / 0.25rem) — Tight component gaps, badge padding
- `space-sm` (8px / 0.5rem) — Element margins, button inline padding
- `space-md` (16px / 1rem) — Content padding, card interior spacing
- `space-lg` (24px / 1.5rem) — Grid column gaps, container padding
- `space-xl` (32px / 2rem) — Sub-section gaps, mobile section padding
- `space-2xl` (48px / 3rem) — Card section separation
- `space-3xl` (64px - 80px / 4-5rem) — Major homepage section vertical padding
- `space-4xl` (96px - 120px / 6-7.5rem) — Hero & major landmark padding on desktop

---

## 5. UI Component Specifications (Described in Words)

### Buttons
- **Primary Button ("SHOP NOW", "ADD TO CART")**:
  - *Appearance*: Solid Forest Green (`#23483A`) background with Warm Ivory Cream (`#F7F1E5`) uppercase text. Slightly rounded corners (border-radius: `6px`), medium inline padding (14px 28px), font weight 600 in DM Sans, subtle uppercase tracking (1px).
  - *Hover State*: Smooth transition to Deep Evergreen (`#16352B`) background with a soft micro-lift shadow (`0 4px 12px rgba(22, 53, 43, 0.15)`).
- **Secondary Button ("EXPLORE COLLECTION", "DISCOVER SHUDDHI")**:
  - *Appearance*: Transparent background with a solid Rich Copper (`#B66A3C`) 1.5px border and Burnished Copper (`#7A3F24`) uppercase text.
  - *Hover State*: Background fills with Rich Copper (`#B66A3C`) and text changes to Warm Ivory Cream (`#F7F1E5`).

### Cards (Product & Feature Cards)
- *Appearance*: Clean rectangular container with a background of Sand Beige (`#E8DCC8`) or pure off-white cream (`#FFFFFF`), rounded corners (border-radius: `12px`), and a subtle 1px border in Sand Beige (`#E8DCC8`).
- *Content Layout*: Top high-resolution product visual with warm soft lighting, followed by product name in DM Sans 600, capacity badge (e.g. `1 LITRE`), short benefit text, price in Burnished Copper (`#7A3F24`), and quick action CTA buttons.
- *Hover State*: Subtle 4px upward translation with a soft elevated shadow (`0 10px 25px rgba(37, 37, 37, 0.06)`).

### Form Fields (Newsletter & Address Inputs)
- *Appearance*: Clean input fields with Warm Ivory Cream (`#F7F1E5`) or white background, 1px solid border in Sand Beige (`#E8DCC8`), inner padding (12px 16px), text color in Charcoal (`#252525`), and placeholder text in muted gray (`#888888`).
- *Focus State*: 1.5px border transition to Forest Green (`#23483A`) or Rich Copper (`#B66A3C`) with zero harsh outer outline, creating a smooth tactile typing experience.

---

## 6. Responsive Breakpoints (Mobile First)

1. **Mobile (Default Base)**: `320px – 767px`
   - Single column layout, full-width buttons, collapsible hamburger drawer navigation, tight vertical padding (32px–48px per section).
2. **Tablet**: `768px – 1023px`
   - Two-column grid layouts for product cards, side-by-side hero features, expanded navigation bar.
3. **Desktop**: `1024px – 1279px`
   - Multi-column grids (3–4 product cards), side-by-side founder story with image, sticky desktop header, generous whitespace (64px–80px per section).
4. **Large Desktop / Widescreen**: `1280px+`
   - Maximum content container width capped at `1280px` centered on screen with auto side margins.

---

## 7. Implementation Guidelines

- **Shared CSS**: All rules will be written in a single mobile-first stylesheet [`style.css`](file:///C:/Users/RAJAT/.gemini/antigravity/scratch/shuddhi/style.css).
- **Shared JavaScript**: All interactivity (cart drawer, navigation, filter tabs, dynamic care tabs) will be in a single script [`script.js`](file:///C:/Users/RAJAT/.gemini/antigravity/scratch/shuddhi/script.js).
- **Zero Frameworks**: Plain Semantic HTML5, CSS3, and modern Vanilla JS only.
- **Font Imports**: Standard Google Fonts link tag for `Cormorant Garamond` and `DM Sans`.
