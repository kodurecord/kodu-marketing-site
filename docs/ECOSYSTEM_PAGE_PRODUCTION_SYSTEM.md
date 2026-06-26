# Kodu Ecosystem Page Production System

This document governs recurring production of Kodu ecosystem pages after the
first 10 pages have been approved. It turns the standards in `docs/` into a
repeatable weekly workflow for creating 5 to 15 high-quality pages without
turning the site into a volume-content machine.

When this document conflicts with `CONTENT_STRATEGY.md`, `CONTENT_STRATEGY.md`
wins.

## Purpose

Kodu ecosystem pages should attract the right homeowner audience, answer real
homeowner questions, teach before selling, and guide qualified visitors toward
`request-access.html` calmly.

The system is designed to preserve:

- Kodu's identity as a private homeowner property record platform.
- The five reinforcement pillars: property memory, proof, privacy, homeowner
  control, and transfer readiness.
- The existing information architecture and design system.
- Page-by-page review before production publishing.

## Activation Gate

Do not use this weekly production cadence until the first 10 ecosystem pages
have been reviewed and approved.

Before weekly production begins, confirm:

- The first 10 pages answer real homeowner questions.
- The reusable page pattern has been validated visually and editorially.
- The visual language matches the Kodu app and marketing system.
- The request-access path is calm and clear.
- The team agrees that the page system is ready to scale.

If these conditions are not met, keep producing pages one at a time.

## Weekly Capacity

Produce 5 to 15 pages per week only when quality can be maintained.

Use this range:

- **5 pages:** complex guides, new visual patterns, or high editorial risk.
- **8 to 10 pages:** normal weekly production with familiar layouts.
- **11 to 15 pages:** only for low-risk pages using proven page patterns and
  already-approved related-guide structures.

Do not let page count override usefulness, accuracy, accessibility, or review.

## Required Page Brief

Create a page brief before writing or building each page.

```txt
Page title:
Proposed route:
Content type:
Homeowner question:
Target audience:
Primary pillar:
Supporting pillars:
Search intent:
Canonical concept, if any:
Related existing pages:
Related planned pages:
Kodu product claims needed:
Visual plan:
CTA plan:
FAQ candidates:
Risks or assumptions:
```

The brief must pass this test before work starts:

- It answers one real homeowner question.
- It names at least one reinforcement pillar.
- It has a stable IA placement.
- It does not duplicate an existing canonical page.
- It does not require unsupported product claims.

## Required Page Pattern

Each ecosystem page should include:

1. Hero with image or app-style visual.
2. Short answer block near the top.
3. Visual proof or story section.
4. Practical homeowner checklist.
5. "When this matters" section.
6. "How Kodu helps" section.
7. FAQ.
8. Related guides.
9. Calm CTA to `request-access.html`.

This is a pattern, not a rigid template. Sections may be combined or reordered
when the homeowner question is better served that way, but the page must still
answer early, teach clearly, and provide a natural next step.

## Visual Requirements

Every page must include:

- At least one hero visual.
- At least two supporting image or video placeholders.
- At least one checklist, folder, evidence, or property-record visual.
- At least one Kodu app-inspired visual using top navigation only.
- Meaningful alt text for every meaningful image.

Do not use:

- Fake sidebar UI unless the real Kodu product uses that sidebar pattern.
- Random stock-photo-feeling images.
- Browser chrome, dev badges, or screenshots that expose development tools.
- New fonts, new palettes, or one-off design-system changes.
- Loud gradients, fear imagery, or generic SaaS dashboard visuals.

Prefer:

- Real homes, real records, organized documents, receipts, warranties, repair
  proof, timelines, floor-plan or blueprint motifs, and app-inspired record
  surfaces.
- Visuals that feel like the Kodu app and the marketing site belong to the same
  product.
- Project-local assets stored under a page-specific folder such as
  `assets/learn/<page-slug>/`.

## Writing Rules

Every page must:

- Use homeowner language.
- Lead with a direct answer.
- Explain the practical value before mentioning Kodu.
- Make Kodu the natural next step without hard selling.
- Use "Kodu helps," "Kodu is built to," or "Kodu is designed to" for product
  connection language.

Avoid:

- Hype, fear, urgency, and exaggerated outcomes.
- Public-records framing.
- Generic SaaS language.
- Contractor-first or marketplace language.
- Unsupported claims about home value, savings, insurance outcomes, or legal
  protection.

## SEO and AI Requirements

Each page must include:

- Accurate page title.
- Accurate meta description.
- One clear definition or answer near the top.
- Semantic heading order with one `h1`.
- FAQ schema only when the visible FAQ is real and useful.
- Internal links that genuinely help the reader.

Do not create thin pages, doorway pages, keyword-stuffed headings, or structured
data that does not match visible content.

## Weekly Workflow

Use this workflow for each page.

1. **Read docs.** Read the governing docs before the weekly batch and re-check
   them whenever a page raises a governance question:
   - `CONTENT_STRATEGY.md`
   - `INFORMATION_ARCHITECTURE.md`
   - `WRITING_STYLE_GUIDE.md`
   - `SEO_AI_STRATEGY.md`
   - `DESIGN_SYSTEM.md`
   - `COMPONENT_GUIDELINES.md`
   - `ACCESSIBILITY.md`
   - `CONTRIBUTING.md`
2. **Create the brief.** Fill out the required page brief and confirm the
   question, pillar, route, and visual plan.
3. **Build one page.** Build only the page currently approved. Do not build the
   rest of the batch in the same change.
4. **Reuse existing styles and components.** Use the established page layout,
   cards, media blocks, app-inspired visual language, footer, nav, and CTA
   patterns. Add scoped styles only when existing patterns cannot support the
   page.
5. **Add metadata and schema.** Add title, description, and FAQ schema when
   appropriate.
6. **Link related pages.** Add restrained related-guide links. Use placeholders
   only when the IA supports planned pages and label them clearly.
7. **Run validation.** Validate semantic structure, local asset references,
   metadata, FAQ schema, accessibility basics, and CSS integrity.
8. **Commit.** Commit only the current page and its required assets/styles.
9. **Push branch.** Push the branch so Cloudflare Pages can create a preview.
10. **Check preview.** Confirm whether a Cloudflare preview is available. Do
    not publish directly to production.
11. **Stop for review.** Report the required page output and wait for approval
    before the next page.

## Validation Checklist

Before reporting a page as ready, verify:

- One `h1`.
- Logical heading order.
- Semantic `main`, sections, nav, and footer.
- All local `href` and `src` references resolve.
- All meaningful images have alt text.
- FAQ schema parses and matches visible FAQ.
- CTA links point to `request-access.html`.
- No global style changes unless required and reported.
- No package, Cloudflare, Supabase, Mailgun, or app-code changes.
- The page works at desktop and mobile widths.
- The page still sounds calm when read aloud.

For the current static site, a lightweight local validation may check:

- HTML file exists at the intended route.
- `h1` count.
- FAQ count.
- image count.
- JSON-LD parsing.
- local reference resolution.
- CSS brace balance.

Run the site's normal build command when the repo has one. If the site remains
buildless static HTML, report that no package build command exists.

## Commit and Preview Rules

Keep each page in its own commit where practical.

Commit message format:

```txt
Add <page title> ecosystem page
```

The commit should include only:

- The page file.
- Page-specific assets.
- Minimal scoped style additions.
- Minimal navigation or related-link updates if required.

After pushing, use the Cloudflare Pages preview for review when available.
Do not publish 5 to 15 pages directly to production without review.

## Required Output After Each Page

Report:

```txt
Page title:
Route:
Homeowner question answered:
Target audience:
Files created:
Files modified:
Visuals added:
CTA placement:
Validation result:
Cloudflare preview status:
Assumptions:
```

If validation or preview is not available, say why clearly.

## Weekly Batch Planning

Before starting a weekly batch, make a short batch plan:

```txt
Week:
Planned page count:
Theme:
Pages:
  1. Title - question - pillar - route
  2. Title - question - pillar - route
Risks:
Dependencies:
```

The batch plan is only a planning artifact. Approval of a batch plan does not
authorize publishing every page to production.

## Stop Conditions

Stop and ask for review when:

- A page would require a new top-level IA section.
- A page duplicates a canonical concept.
- A product claim cannot be verified.
- The page needs new shared components or design tokens.
- The page would touch application code, Cloudflare config, email, Supabase, or
  package/dependency files.
- The page cannot meet accessibility or validation requirements.
- The Cloudflare preview fails and the cause is not obvious.

Quality stays ahead of cadence.
