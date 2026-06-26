# Accessibility

Accessibility is a baseline requirement for every page and component on the Kodu marketing site, not an enhancement. A calm, premium, trustworthy product is usable by everyone. This document defines the standard every page must meet before it ships.

## Standard

The site targets **WCAG 2.1 Level AA** as its baseline. AA is the minimum; where AAA is reasonable (for example, stronger text contrast), prefer it. Meeting this standard is part of the definition of "done" for any page or component.

## Semantic structure

- Use correct, semantic HTML: real headings, lists, buttons, links, and landmarks. Do not rebuild native elements out of generic containers.
- One logical `h1` per page, with headings in correct descending order. Heading order is also an SEO and AI-extraction asset (see `SEO_AI_STRATEGY.md`).
- Use landmark regions (header, nav, main, footer) so assistive technology can navigate the page.
- Links navigate; buttons perform actions. Do not swap their roles.

## Color and contrast

- Body text meets at least the AA contrast ratio against its background; aim higher for long-form reading.
- Do not rely on color alone to convey meaning. Pair status color with text or an icon (this also matters because Kodu's status tokens are reserved for genuine status).
- The calm, low-contrast aesthetic must never drop below the contrast minimums. Premium restraint does not override legibility — verify with the actual tokens in `DESIGN_SYSTEM.md`.

## Keyboard

- Every interactive element is reachable and operable by keyboard alone, in a logical order.
- Focus is always visible. A clear, consistent focus-visible style is required on all interactive elements; never remove focus outlines without replacing them with something equally visible.
- No keyboard traps. Overlays and menus can be opened, operated, and dismissed by keyboard.

## Images and media

- Every meaningful image has descriptive alt text in homeowner language. Decorative images have empty alt attributes so screen readers skip them.
- Do not embed important information only inside an image where it cannot be read as text.
- Any video or animated content provides controls and does not autoplay sound.

## Motion

- Respect the user's reduced-motion preference; provide a calm, motion-free experience when it is set.
- Motion is subtle and purposeful by default (this is also a component rule). Nothing flashes or moves in a way that could be distracting or harmful.

## Forms and interactive content

- Every input has a programmatically associated, visible label.
- Errors are announced clearly, described in plain language, and never communicated by color alone.
- Inputs and controls have comfortably sized touch targets.

## Reading and language

- Content uses plain homeowner language (see `WRITING_STYLE_GUIDE.md`), which is itself an accessibility benefit.
- The page declares its language. Text resizes and reflows without breaking layout or losing content.
- Line length and line-height support comfortable reading.

## Testing expectations

Before a page ships, verify:

- Keyboard-only navigation through the whole page, with visible focus throughout.
- Screen-reader pass to confirm headings, landmarks, links, labels, and alt text make sense.
- Contrast checks on real token combinations, including text on dark surfaces.
- Reduced-motion behavior.
- Responsive behavior and text zoom up to at least 200% without loss of content or function.

Automated checks help but do not replace manual keyboard and screen-reader testing.

## Accountability

Accessibility issues are treated like functional bugs, not cosmetic polish. A page that fails the baseline is not ready to publish. This standard is part of the review checklist in `CONTRIBUTING.md`.
