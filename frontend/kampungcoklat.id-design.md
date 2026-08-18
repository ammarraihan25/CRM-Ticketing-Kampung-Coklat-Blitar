---
version: alpha
name: Kampung Coklat
description: A warm, tourism-forward light system with rich cocoa browns and an energetic amber accent.
colors:
  primary: "#2C1A13"
  primary-60: "#5A4034"
  primary-20: "#C9B3A8"
  secondary: "#F29727"
  secondary-60: "#FFB04D"
  neutral: "#FFFFFF"
  surface: "#FFFDF9"
  on-surface: "#2C1A13"
  border: "#E5E7EB"
  muted: "#6B5A52"
  error: "#C2412D"
typography:
  headline-display:
    fontFamily: Jost
    fontSize: 60px
    fontWeight: 700
    lineHeight: 60px
    letterSpacing: 0px
  headline-lg:
    fontFamily: Jost
    fontSize: 46px
    fontWeight: 700
    lineHeight: 50px
    letterSpacing: 0px
  headline-md:
    fontFamily: Jost
    fontSize: 35px
    fontWeight: 500
    lineHeight: 50px
    letterSpacing: 0px
  headline-sm:
    fontFamily: Jost
    fontSize: 26px
    fontWeight: 500
    lineHeight: 43px
    letterSpacing: 0px
  body-lg:
    fontFamily: Jost
    fontSize: 20px
    fontWeight: 400
    lineHeight: 32px
    letterSpacing: 0px
  body-md:
    fontFamily: Jost
    fontSize: 16px
    fontWeight: 400
    lineHeight: 26px
    letterSpacing: 0px
  body-sm:
    fontFamily: Jost
    fontSize: 14px
    fontWeight: 400
    lineHeight: 22px
    letterSpacing: 0px
  label-lg:
    fontFamily: Jost
    fontSize: 18px
    fontWeight: 500
    lineHeight: 24px
    letterSpacing: 0px
  label-md:
    fontFamily: Jost
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0px
  label-sm:
    fontFamily: Jost
    fontSize: 14px
    fontWeight: 300
    lineHeight: 20px
    letterSpacing: 0px
  nav-link:
    fontFamily: Jost
    fontSize: 18px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0px
  hero-kicker:
    fontFamily: Jost
    fontSize: 16px
    fontWeight: 500
    lineHeight: 20px
    letterSpacing: 0px
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
spacing:
  xs: 2px
  sm: 10px
  md: 20px
  lg: 36px
  xl: 110px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    height: "40px"
  button-secondary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    height: "40px"
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.none}"
    padding: "0px"
    height: "auto"
  card:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "16px"
  input:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
    height: "40px"
---

# Kampung Coklat

## Overview
Kampung Coklat feels welcoming, family-friendly, and tourism-oriented, with a strong sense of place rooted in warm cocoa tones and bright amber highlights. The interface is energetic but not loud: it uses large, confident headings, clear navigation, and generous white space to keep the experience readable for visitors of all ages. The visual tone balances cultural destination branding with a straightforward, practical layout for browsing news, facilities, and products.

## Colors
- **Primary (#2C1A13):** A deep cocoa brown used for body text, major headings, outlines, and button backgrounds. It establishes the brand’s earthy, chocolate-first personality.
- **Secondary (#F29727):** A vivid amber-orange accent used for active navigation, emphasis, and small highlights. It adds warmth and a lively tourist-spot energy without overpowering the page.
- **Secondary-60 (#FFB04D):** A lighter golden variant for hover states, subtle emphasis, or layered accents.
- **Primary-60 (#5A4034):** A softened brown for secondary text or supportive tonal surfaces when a less dominant dark is needed.
- **Primary-20 (#C9B3A8):** A pale cocoa tint that can support dividers, subtle backgrounds, or quiet UI framing.
- **Neutral (#FFFFFF):** The main page background and card base, creating clarity against the strong brown content color.
- **Surface (#FFFDF9):** A warm off-white surface tone that can be used where pure white feels too stark.
- **On-surface (#2C1A13):** The default readable foreground on light backgrounds.
- **Border (#E5E7EB):** A neutral divider/border tone for cards and form fields when structure is needed without heavy contrast.
- **Muted (#6B5A52):** Reserved for secondary information, helper text, or less prominent navigation labels.
- **Error (#C2412D):** A restrained red for validation and destructive states; it should remain rare.

## Typography
The system is built around Jost, which gives the site a modern, rounded, approachable sans-serif character. Headings are bold and compact, with `headline-display` at 60px and `headline-lg` at 46px carrying the visual weight of hero messages and section titles. Mid-level headings stay friendly rather than sharp, using medium weights in `headline-md` and `headline-sm` for content blocks, promos, and subsection structure.

Body copy remains legible and calm through `body-lg` and `body-md`, with comfortable line heights suited to informational tourism content. Labels and navigation rely on lighter, concise treatments such as `label-md`, `label-sm`, and `nav-link`; the observed UI does not use uppercase-heavy branding, so letter spacing stays neutral and tight rather than expanded. The overall typographic rhythm is simple, bold, and highly readable.

## Layout & Spacing
The page uses a broad, centered editorial layout with large hero imagery followed by spacious content sections and card grids. Section padding feels generous, especially in the transition from the hero to the white content area, and the spacing scale is clearly stepped rather than dense: `xs` for tiny visual adjustments, `sm` and `md` for common gaps, `lg` for section separation, and `xl` for major vertical breathing room. Cards and content blocks sit in a regular grid with comfortable gutters, reinforcing a tourism brochure feel rather than a compact dashboard.

Navigation is horizontally distributed across the top with enough room between items to avoid crowding. Content sections should keep generous side padding and avoid overly narrow containers; the visual language favors openness, large imagery, and prominent headlines over dense information packing.

## Elevation & Depth
The interface is mostly flat and relies on contrast, layering, and imagery rather than dramatic shadows. Depth is created by the darkened hero overlay, the white content section below it, and simple bordered cards rather than pronounced elevation effects. The available `sm` shadow should be used sparingly for subtle separation only; most components should remain crisp and clean.

Borders are light and structural, not decorative. This keeps the design feeling approachable and maintains focus on photography, headlines, and brand colors rather than on heavy UI chrome.

## Shapes
The shape language is soft and modestly rounded. `rounded.sm` at 4px is the default for interactive controls, giving buttons and inputs a tidy, practical feel. Cards can step up to `rounded.md` for a slightly friendlier presentation, but the system should avoid large pill shapes except for special cases like badges or fully rounded avatars. Overall, the geometry feels orderly, simple, and slightly softened rather than playful.

## Components
Buttons are restrained and functional. Use `button-primary` for the main action: it should appear as a filled cocoa-brown button with white text, 40px height, and compact 8px/16px padding. `button-secondary` should invert the treatment with a white background and brown border/text for less dominant actions. `button-link` is reserved for utility actions or inline navigation; it should remain unboxed and lightweight. Hover states should stay subtle, with the amber accent used for emphasis rather than large fills.

Cards should use a white background, `rounded.md`, and a simple 1px border with comfortable 16px padding. They should feel like content containers, not floating panels. Keep card content aligned cleanly with image-first layouts when showcasing announcements, product highlights, or news teasers.

Inputs should be calm and accessible, with a white background, 4px radius, subtle border, and 40px minimum height. Focus states can use the amber accent as a thin outline or glow, but should not become visually noisy. Placeholder and helper text should stay muted to preserve hierarchy.

Navigation links are important brand carriers: they use the Jost family, moderate sizing, and an amber active state. The active item may be underlined or otherwise emphasized, but the effect should remain slim and elegant. For content lists, keep spacing airy and align text blocks to the same left edge for clarity.

## Do's and Don'ts
- Do keep the brand warm and earthy with cocoa browns as the primary anchor.
- Do use the amber accent sparingly to highlight active or important states.
- Do preserve generous whitespace and avoid compressing the layout.
- Do keep typography bold, clean, and highly readable, especially in headlines.
- Do use simple borders and light structure for cards and form fields.
- Don't introduce heavy shadows, glassmorphism, or glossy effects.
- Don't replace the Jost-based typographic system with condensed or decorative fonts.
- Don't overcrowd the header or content grids with tight spacing or too many competing accents.