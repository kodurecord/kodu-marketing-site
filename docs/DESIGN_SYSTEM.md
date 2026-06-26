# Design System

This document defines the visual language of the Kodu marketing site. The site must feel like the same product as the Kodu application: one calm, premium, intentional design system across everything a homeowner sees. No page should look like a separate app, and nothing here should drift toward generic SaaS-dashboard styling.

The tokens below are the canonical Kodu design tokens. The marketing site uses these values so that the site and the product share one identity. Tokens are the source of truth; do not hard-code raw values in pages or components.

## Design intent

- **Calm.** Generous whitespace, restrained color, no visual shouting.
- **Premium.** Quiet confidence over decoration. Precision in spacing and alignment reads as quality.
- **Trustworthy.** The look reinforces privacy and permanence, never urgency or hype.
- **Homeowner-first.** Approachable, never technical or industrial.

## Color tokens

Surfaces and backgrounds:

| Token | Value | Use |
|---|---|---|
| `--k-bg-page` | `#EEF2F6` | Page background |
| `--k-bg-surface` | `#F2F5F9` | Section / panel surface |
| `--k-bg-card` | `#FFFFFF` | Cards, primary content blocks |
| `--k-bg-card-subtle` | `#FAFBFD` | Subtle nested surfaces |
| `--k-bg-dark` | `#0F1C2E` | Dark sections, footer |
| `--k-bg-dark-raised` | `#162436` | Raised elements on dark |
| `--k-vault-mist` | `#EFF2F7` | Vault-themed surface / drafting-grid backdrop |

Text:

| Token | Value | Use |
|---|---|---|
| `--k-text-primary` | `#1B2A3B` | Headings, primary copy |
| `--k-text-secondary` | `#6B7A8D` | Supporting copy |
| `--k-text-tertiary` | `#9AAABB` | Captions, metadata |
| `--k-text-disabled` | `#B8C4CE` | Disabled |
| `--k-text-on-dark` | `#F0F4F8` | Text on dark surfaces |
| `--k-text-on-dark-muted` | `#8BA0B8` | Muted text on dark |
| `--k-text-on-dark-subtle` | `#4A6278` | Subtle text on dark |

Accent (used sparingly — accent is for genuine emphasis and primary actions, not decoration):

| Token | Value | Use |
|---|---|---|
| `--k-accent` | `#2D7DD2` | Primary action, key emphasis |
| `--k-accent-hover` | `#2468B5` | Hover state |
| `--k-accent-light` | `#E8F1FB` | Tinted backgrounds |
| `--k-accent-border` | `#B8D4F0` | Accent borders |

Status (used only for true status, never for marketing color):

| Token | Value |
|---|---|
| `--k-verified-text` / `--k-verified-bg` / `--k-verified-border` | `#1D6B4E` / `#D4EDE3` / `#A8D9C4` |
| `--k-error-text` / `--k-error-bg` / `--k-error-border` | `#DC2626` / `#FEF2F2` / `#FCA5A5` |
| `--k-warn-text` / `--k-warn-bg` / `--k-warn-border` | `#92400E` / `#FFFBEB` / `#FCD34D` |

Borders:

| Token | Value |
|---|---|
| `--k-border` | `rgba(0,0,0,0.07)` |
| `--k-border-medium` | `rgba(0,0,0,0.12)` |
| `--k-border-strong` | `rgba(0,0,0,0.18)` |

## Typography

- Family: `Inter`, with `system-ui` fallback (`--font-sans`). Weights 300–700 are available; use 400/500 for body and 600 for headings. Avoid 700 except where real emphasis is warranted.
- Base body size follows the app baseline (~`0.875rem` root) with a comfortable line-height of `1.6` for reading.
- Headings inherit `--k-text-primary` unless intentionally overridden.
- Marketing pages may use a larger reading size than the dense app UI, but the family, weights, and color tokens stay identical so the brand voice in type is consistent.
- Restraint: a small, deliberate type scale. Do not introduce one-off sizes per page.

## Spacing

- Spacing uses a **4px base unit**. All margins, padding, and gaps are multiples of 4px.
- Prefer a consistent rhythm (e.g., 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64) rather than arbitrary values.
- Generous vertical spacing between sections is part of the calm, premium feel. Do not crowd content.

## Radius

| Token | Value |
|---|---|
| `--k-radius-sm` | `6px` |
| `--k-radius-md` | `10px` |
| `--k-radius-lg` | `14px` |
| `--k-radius-xl` | `18px` |
| `--k-radius-pill` | `9999px` |

Use the medium/large radii for cards and content blocks; pill only for chips and small controls.

## Elevation

| Token | Value | Use |
|---|---|---|
| `--k-shadow-card` | `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)` | Resting cards |
| `--k-shadow-raised` | `0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)` | Hover / raised |
| `--k-shadow-modal` | `0 20px 48px rgba(0,0,0,0.14), 0 8px 16px rgba(0,0,0,0.08)` | Overlays |

Shadows are soft and shallow. Heavy or high-contrast shadows read as generic SaaS and are not used.

## Imagery and visual motifs

- The blueprint / drafting-grid motif (paired with `--k-vault-mist`) is the signature Kodu texture. Use it as a quiet backdrop, never as loud decoration.
- Imagery favors real homes and real records over abstract stock illustration or busy 3D art.
- No stock-photo clichés (handshakes, generic happy customers), no fear imagery (damage, disaster).

## Do and do not

Do:
- Drive everything from tokens.
- Keep accent color rare and meaningful.
- Maintain alignment and consistent spacing rhythm.
- Let whitespace carry the premium feel.

Do not:
- Introduce new colors, fonts, or one-off sizes outside the token set.
- Use gradients, neon, or high-saturation marketing color.
- Style pages to feel like dashboards, marketplaces, or developer tools.
- Let any page drift from the shared system.

Any proposed addition to the token set is a governance change, reviewed against the goal of one universal Kodu design system.
