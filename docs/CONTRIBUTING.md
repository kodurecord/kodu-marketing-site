# Contributing

This document defines how work gets proposed, reviewed, and shipped on the Kodu marketing site. It exists to keep the ecosystem consistent, accurate, and calm as it grows, and to prevent drift, sprawl, and avoidable breakage. It is the process layer over the standards in the rest of `docs/`.

## Read first

Before contributing anything, read the documents that govern the work you're doing:

- `CONTENT_STRATEGY.md` — what we publish and why (the parent document).
- `INFORMATION_ARCHITECTURE.md` — where content lives and how it links.
- `WRITING_STYLE_GUIDE.md` — how Kodu sounds.
- `SEO_AI_STRATEGY.md` — how content is discovered honestly.
- `DESIGN_SYSTEM.md` and `COMPONENT_GUIDELINES.md` — how things look and are built.
- `ACCESSIBILITY.md` — the baseline every page must meet.

When any contribution conflicts with `CONTENT_STRATEGY.md`, that document wins.

## Guardrails (do not cross without explicit approval)

These boundaries protect the project from scope creep and breakage:

- Do not modify application pages or product source from this repo's marketing work.
- Do not modify routes or routing behavior without an approved IA change.
- Do not modify Cloudflare or other infrastructure/deploy configuration as part of content work.
- Do not change package or dependency files casually; new dependencies require a clear reason and approval.
- Do not build new pages ahead of an approved brief and IA placement.
- Do not introduce new design tokens, components, or top-level sections without governance review.

Changes that touch these areas are separate, deliberate decisions — not bundled into content or styling work.

## The content workflow

1. **Brief.** Every new page starts with a short brief that names:
   - the one real homeowner question the page answers,
   - the pillar(s) it reinforces (property memory, proof, privacy, homeowner control, transfer readiness),
   - its placement in the IA (section and slug),
   - the content type.
   A brief that cannot name a real question or a pillar is not ready.
2. **Draft.** Write to the style guide. Lead with the direct answer. Keep claims supportable.
3. **Review.** Check against the review checklist below.
4. **Ship.** Merge only after the checklist passes.

## Review checklist

Every content or page change is reviewed against all of the following:

- **Question:** Does the page answer one real homeowner question, clearly and early?
- **Pillars:** Does it reinforce at least one of the five pillars?
- **Identity:** Does it represent Kodu accurately — private homeowner property record, not public search, storage, CRM, marketplace, or generic SaaS?
- **Voice:** Calm, honest, plain, homeowner language? No hype, fear, urgency, or jargon? (`WRITING_STYLE_GUIDE.md`)
- **Claims:** Is every product and outcome claim true and supportable today?
- **IA:** Correct section, stable slug, sensible links, single canonical page for each concept? (`INFORMATION_ARCHITECTURE.md`)
- **Design:** Token-driven, consistent with the system, no one-off styling? (`DESIGN_SYSTEM.md`)
- **Components:** Reuses existing patterns; any new component is justified and documented? (`COMPONENT_GUIDELINES.md`)
- **SEO/AI:** Accurate metadata, honest structured data that matches the page, no manipulative tactics? (`SEO_AI_STRATEGY.md`)
- **Accessibility:** Meets the WCAG AA baseline, keyboard and screen-reader tested? (`ACCESSIBILITY.md`)
- **Guardrails:** No out-of-scope changes to app pages, routes, infra config, or packages?

A change that fails any item is not ready to merge.

## Pull requests

- Keep PRs focused. One page, one component, or one documentation change per PR where practical. Do not bundle unrelated changes.
- The PR description states what changed, which homeowner question/pillar it serves, and which checklist items were verified.
- Documentation changes that alter governance (this folder) are reviewed with extra care, because they change the rules everything else follows.

## Quality over speed

Kodu is built quality-first. A smaller number of excellent, accurate, accessible pages serves the brand better than a large number of shallow ones. It is always acceptable to slow down to get a page right, and never acceptable to ship hype, fear, unsupported claims, or broken accessibility to move faster.

## When something doesn't fit the rules

If a genuinely good idea seems to require breaking a rule here, raise it as a governance discussion and change the rule deliberately — do not quietly work around it. The value of these documents is that they are actually followed.
