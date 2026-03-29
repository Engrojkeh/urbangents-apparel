# Design System: High-End Editorial Luxury

## 1. Overview & Creative North Star

### Creative North Star: "The Modern Atelier"
This design system is built on the philosophy of "The Modern Atelier"—a digital experience that mirrors the exclusivity of a private tailoring suite. We reject the "template" aesthetic of standard e-commerce in favor of a **High-End Editorial** approach.

The system breaks away from rigid, boxed layouts by utilizing **intentional asymmetry** and **tonal depth**. We treat the screen not as a flat surface, but as a layered canvas where elements overlap, breathe, and interact with light. The goal is to evoke a sense of permanence and craftsmanship through generous "dark space," sophisticated serif typography, and a color palette that feels metallic and organic rather than digital.

---

## 2. Colors

The palette is rooted in deep, earthy tones contrasted against metallic golds.

### Tonal Foundations
- **Background Dark (`#171210`)**: Used for the deepest immersive moments, like full-page heroes or footer anchors.
- **Background Primary (`#3d342f`)**: The standard canvas color. A deep, warm grayish-brown that feels more premium than pure black.
- **Background Secondary (`#2c2522`)**: Used for containers, cards, and sectioning to provide subtle contrast against the primary background.

### The "No-Line" Rule
**Strict Mandate:** Designers are prohibited from using 1px solid borders for sectioning or containment. 
- Boundaries must be defined through **Background Color Shifts**. For example, a `surface-container-low` section sitting on a `surface` background provides all the structural definition needed.
- Use the **Surface Hierarchy** (`Lowest` to `Highest`) to create depth. To separate a product card from a section, shift the card’s background color by one tier rather than drawing a line around it.

### Signature Textures & Glassmorphism
- **The Glass Rule:** For floating elements (navigation bars, overlays, modals), use semi-transparent background colors with a `backdrop-blur` of 12px-20px. This allows the rich background tones to bleed through, creating an integrated, "frosted" feel.
- **Metallic Gradients:** Main CTAs should utilize a subtle linear gradient from `primary` (`#e1c298`) to `primary-container` (`#a88c66`) at a 135-degree angle. This mimics the way light hits brushed gold.

---

## 3. Typography

The typography strategy is a dialogue between heritage and modernity.

### Font Families
- **Display & Headlines: Moglan (Serif)**
  Used for main titles, brand statements, and hero sections. Moglan carries high-contrast strokes that evoke high-fashion mastheads.
- **Body & Titles: Montserrat (Sans-serif)**
  Used for product descriptions, navigation, and functional text. It provides a clean, modern counter-balance to the serif headers.

### Scale & Hierarchy
- **Display-LG (3.5rem / Moglan):** For "Hero" moments only. Use with generous leading and occasional letter-spacing (tracking) for an airy, editorial feel.
- **Headline-MD (1.75rem / Moglan):** For section headers like "New Arrivals" or "Our Story."
- **Body-MD (0.875rem / Montserrat):** Standard readability. Increase line-height to 1.6 for longer descriptions to maintain the "luxurious spacing" principle.
- **Label-SM (0.6875rem / Montserrat):** All-caps with increased letter-spacing for micro-copy, tags, or "View All" links.

---

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved through **Tonal Layering** rather than traditional drop shadows.
- Place a `surface-container-lowest` card on a `surface-container-low` section to create a "recessed" look.
- Place a `surface-bright` element on a `surface-dim` background to create a "lifted" look.

### Ambient Shadows
When a physical lift is required (e.g., a floating "Add to Cart" button):
- **Shadow Property:** 0px 20px 40px rgba(0, 0, 0, 0.4).
- Shadows must be extra-diffused with large blur values and low-opacity.
- For non-black surfaces, the shadow color should be a darker tint of the background color itself, mimicking how light actually behaves in a physical environment.

### The "Ghost Border" Fallback
If a boundary is required for accessibility (e.g., input fields), use a **Ghost Border**:
- Color: `outline-variant` (`#4e453c`)
- Opacity: 15% - 20%
- Never use 100% opaque borders; they shatter the "Modern Atelier" aesthetic.

---

## 5. Components

### Buttons
- **Shape:** Pill-shaped (Roundedness: `full`).
- **Primary:** Metallic gradient background (`primary` to `primary-container`) with `on-primary` (`#402d0f`) text.
- **Secondary:** Transparent background with a "Ghost Border" and `text-primary` label.
- **Tertiary:** Text-only with an underline that only appears on hover, using a 1px transition.

### Input Fields (Form Elegance)
- **Style:** No boxes. Use a thin bottom border (`outline-variant` at 20% opacity).
- **Floating Labels:** Labels should sit within the bottom border and transition upward and shrink in size upon focus, using the `primary` gold color for the active state.

### Cards & Product Grids
- **Asymmetry:** In product grids, alternate the aspect ratio of images (e.g., some 4:5, others 1:1) and use the Spacing Scale (`16` or `20`) to create wide, intentional gaps.
- **Dividers:** Forbid the use of divider lines. Use vertical white space (`10` or `12` from the scale) to separate product categories.
- **Overlapping Elements:** Allow product titles or "New" badges to slightly overlap the edge of the image container to break the "grid-lock" feel.

### Additional Luxury Components
- **The "Curator" Cursor:** A custom circular cursor (`accent` color, 10% opacity) that expands when hovering over clickable images.
- **Micro-interactions:** Elements should fade in with a slight upward slide (20px) to give a "lifting" sensation as the user scrolls.

---

## 6. Do’s and Don’ts

### Do:
- **Use "Dark Space":** Whitespace isn't just empty; it's a luxury. Use the high end of the spacing scale (`20`, `24`) between sections.
- **Embrace Asymmetry:** Offset text blocks from the center. Let an image take up 60% of the width while text takes up 30%, leaving 10% as a "breathing gap."
- **Layer with Glass:** Use backdrop blurs for navigation to keep the user grounded in the content they are scrolling past.

### Don’t:
- **No Sharp Corners:** Avoid 0px border-radii. Even subtle containers should use at least the `sm` (`0.5rem`) or `DEFAULT` (`1rem`) tokens.
- **No Pure White:** Never use `#FFFFFF` for text. Always use `text-primary` (`#f8e3b4`) or `text-secondary` (`#c9bda5`) to keep the "golden hour" warmth.
- **No Grid-Lock:** Don't align everything to a perfect 12-column grid. Let elements "float" and overlap to maintain the editorial feel.
- **No Standard Dividers:** Never use a horizontal line to separate sections. Use color shifts or spacing.