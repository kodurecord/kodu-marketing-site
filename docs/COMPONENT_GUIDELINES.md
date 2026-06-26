# Component Guidelines

This document governs how UI components on the Kodu marketing site are designed, built, and reused. The goal is one consistent component language so that every page feels like the same calm, premium product. Pages are assembled from a small, well-understood set of components — not from one-off markup invented per page.

This document describes principles and patterns. It does not authorize building components or pages; that follows `CONTRIBUTING.md`.

## Principles

1. **Token-driven.** Components consume design tokens (`DESIGN_SYSTEM.md`) for color, type, spacing, radius, and elevation. No hard-coded values.
2. **Reuse over reinvention.** If a pattern exists, use it. New components are added only when no existing one fits, and they become the canonical pattern from then on.
3. **One behavior per pattern.** A given component behaves the same everywhere. No surprising per-page variations of the same thing.
4. **Composition over configuration sprawl.** Prefer composing small, clear pieces over giant components with dozens of flags.
5. **Accessible by default.** Components meet the baseline in `ACCESSIBILITY.md` without each page having to re-solve it.
6. **Calm by construction.** Components default to restraint: generous spacing, soft elevation, rare accent color.

## The component vocabulary

A small, deliberate set. Names are illustrative of intent; the point is that these roles are filled by shared components, not re-implemented per page.

- **Layout primitives** — page container, section, content column. Enforce consistent max widths and the spacing rhythm.
- **Headings and prose** — typographic blocks that apply the type scale and reading measure consistently.
- **Cards** — content containers using card surface, border, radius, and the resting card shadow.
- **Buttons and links** — primary (accent), secondary, and text/link styles. Accent is reserved for primary actions.
- **Navigation** — header nav, section nav, breadcrumbs, footer. Stable and minimal.
- **Callouts / notes** — quiet emphasis blocks. Status colors are used only for genuine status, never for marketing emphasis.
- **Media** — image and figure blocks with required alt text and consistent framing.
- **CTA blocks** — calm invitations to act, never high-pressure banners.

## Variant discipline

- Variants exist only for real, recurring needs (e.g., primary vs secondary button). 
- A new visual variation is not created to make one page "pop." That is design drift.
- If two pages need the same thing, they use the same component, not two near-duplicates.

## Content and components

- Components are presentation; content is governed by `CONTENT_STRATEGY.md` and `WRITING_STYLE_GUIDE.md`. A nicely built component does not excuse off-strategy content.
- CTA components must carry calm, honest copy. No urgency, no fear, no hype — even if the component could technically support a loud banner.
- Comparison and product components describe honestly; they are not built to disparage alternatives.

## States

Every interactive component defines its full set of states consistently:

- default, hover, active, focus-visible, disabled
- loading and empty states where relevant (empty states are calm and helpful, never dead ends)

Focus-visible states are required and clearly visible (see `ACCESSIBILITY.md`). Hover-only affordances are not acceptable on their own.

## Responsiveness

- Components are responsive by design and tested across realistic homeowner devices (phones, tablets, laptops).
- Spacing scales sensibly; the calm, uncrowded feel is preserved on small screens.
- Touch targets are comfortably sized.

## What to avoid

- One-off components that duplicate an existing pattern with slight differences.
- Inline styles or magic values that bypass tokens.
- Dashboard-style density, busy data widgets, or marketplace-style cards.
- Animation or motion used for spectacle. Motion, if used, is subtle, purposeful, and respects reduced-motion preferences.
- Components that imply functionality Kodu does not have.

## Adding or changing a component

- Confirm no existing component fills the role.
- Build it token-driven, accessible, and with a full set of states.
- Document its intended use so it becomes the canonical pattern.
- A new shared component is a small governance decision, reviewed for consistency with the system — not a casual per-page addition.
