# Information Architecture

This document defines how the Kodu marketing site is structured: how pages are grouped, named, linked, and navigated. The goal is an ecosystem a homeowner can move through intuitively, where every page has an obvious place and an obvious relationship to the rest.

It governs structure only. It does not authorize building pages — page creation follows the process in `CONTRIBUTING.md`.

## Structural principles

1. **Organize around the homeowner's questions, not around the org chart.** Sections map to what a homeowner wants to understand, not to internal teams or product modules.
2. **Shallow over deep.** A homeowner should reach any meaningful page in two or three clicks. Avoid deep nesting that hides content.
3. **One home for each idea.** Each concept has a single canonical page. Other pages link to it rather than re-explaining it. This prevents duplication and keeps the record of truth singular.
4. **Teach-first paths.** Navigation should lead with learning (guides, concepts) and let product pages sit alongside, not in front of, the teaching.
5. **Stable URLs.** Slugs are durable. We do not churn URLs for cosmetic reasons; when a URL must change, it redirects.

## Top-level structure

The site is organized into a small number of durable sections. This is the intended shape; exact navigation labels are a design decision, but the grouping logic is governed here.

- **Home** — Explains what Kodu is and the core idea (the living record of a property) in plain language.
- **How it works** — The product model: the blueprint organizes the property, the vault stores the evidence, the timeline tells the story, the guidance explains what matters.
- **Learn** — The teaching library: guides and concept pages organized by the part of the property or the homeowner task they address.
- **Why Kodu** — Concept and comparison pages covering the five pillars (property memory, proof, privacy, homeowner control, transfer readiness) and honest comparisons to the things Kodu is confused with.
- **Pricing** — Plain, calm explanation of trial and subscription terms.
- **Trust & privacy** — How privacy, access, and homeowner control actually work.
- **Glossary / reference** — Short factual definitions.

Sections are added rarely and only when a genuine new grouping of homeowner questions emerges. Adding a top-level section is a governance decision, not a routine content task.

## Foundation learning path

The first Kodu Knowledge Ecosystem path introduces the category in sequence.
These pages should read as connected chapters, not isolated articles.

| Order | Page | Route | Target homeowner question | Page purpose | Primary audience | Emotional goal | Next-page CTA | Kodu connection level |
|---|---|---|---|---|---|---|---|---|
| 1 | What Is a Home Property Record? | `/learn/what-is-a-home-property-record` | What is a home property record, and why should I keep one? | Define the category in homeowner language. | New and existing homeowners who know their records are scattered. | Recognition: "My home does have a record." | Learn why every home has a history | Light. |
| 2 | Every Home Has a Story | `/learn/every-home-has-a-story` | What does it mean that my home has a history? | Show that repairs, warranties, photos, projects, and decisions form a living story. | Homeowners beginning to think beyond folders and receipts. | Connection: "The work I do on my home matters over time." | See why homeowners lose that story | Very light. |
| 3 | Why Homeowners Lose Their Property History | `/learn/why-homeowners-lose-property-history` | Why is it so easy to lose track of home records? | Explain the scattered-record problem without fear. | Homeowners with email, paper, photos, and memory spread across places. | Relief: "The problem is normal and solvable." | So where should all of this live? | Moderate. |
| 4 | How Kodu Creates Your Property's Memory | `/learn/how-kodu-creates-your-property-memory` | How does Kodu help my home keep its memory? | Explain the Kodu model through property memory, proof, privacy, and continuity. | Qualified homeowners who understand the problem and want a system. | Confidence: "There is a structure for this." | Explore inside a Kodu property record | Strong. |
| 5 | Inside a Kodu Property Record | `/learn/inside-a-kodu-property-record` | What does a Kodu property record actually contain? | Show the app-inspired record: profile, vault, systems, projects, timeline, guidance. | Homeowners considering request access. | Clarity: "I can picture my home in this." | Request access calmly | Direct. |

Each page in this sequence should:

- Answer only its own homeowner question.
- Link forward to the next chapter.
- Link backward only when it helps orientation.
- Avoid re-explaining the entire product model.
- Use request-access as a calm secondary path until the reader reaches a
  product-specific chapter.

## Content grouping inside "Learn"

The teaching library mirrors the full property boundary — not just the inside of the house. Grouping reflects the real anatomy and lifecycle of a property:

- Land and site, survey and boundary
- Grading, drainage, irrigation
- Landscaping, hardscape, fences and gates
- Outdoor structures
- Exterior envelope, roof and drainage
- Utilities
- Interior systems and appliances
- Projects, remodels, and improvements
- Documents that cut across all of the above (receipts, warranties, permits, plans, photos, insurance, maintenance records)

This grouping is intentionally the same mental model the product uses, so the marketing site and the product feel like one continuous experience.

## Expansion libraries

After the foundation path, new pages should be organized into durable libraries
inside the existing top-level structure rather than creating new top-level
sections casually.

- **Property Records** - Core definitions, comparisons, proof, privacy, transfer
  readiness, and the private homeowner property record category.
- **Maintenance** - Routine care, seasonal tasks, service records, and proof of
  upkeep.
- **Systems** - HVAC, plumbing, electrical, roof, water heater, appliances,
  drainage, irrigation, exterior systems, and safety systems.
- **Projects** - Repairs, remodels, improvements, permits, budgets, photos, and
  timelines.
- **Insurance** - Documentation, photos, receipts, maintenance proof, and claim
  support without promising insurance outcomes.
- **Buying & Selling** - New-owner setup, seller preparation, inherited homes,
  transfer readiness, and what records should move with the home.
- **Homeowner Knowledge** - Plain-language reference pages for documents,
  terms, records, and decisions homeowners encounter.
- **Kodu Education** - Product-specific education for readers who already
  understand the category and need to see how Kodu works.

System-library pages should consistently explain:

- How the system works.
- What homeowners should know.
- What records matter.
- What proof should be saved.
- What future owners should inherit.

System pages are homeowner education pages, not contractor operations pages.

## URL and slug conventions

- Lowercase, hyphen-separated, no trailing slashes enforced consistently with the site's existing convention.
- Slugs describe the content in homeowner language: `/learn/appliance-warranties`, not `/learn/post-4471`.
- Section prefixes are stable: guides live under a learning prefix, concept pages under their section.
- No dates in evergreen slugs. Evergreen content should not look stale because of a URL.
- Avoid stacking more than two path segments after the section. Deep paths signal an IA problem.

## Linking strategy

- **Canonical concept linking:** when a page mentions a core concept (e.g., transfer readiness), it links to that concept's canonical page rather than re-explaining it.
- **Lateral teaching links:** guides link to closely related guides so a homeowner can follow a natural thread (a roof guide links to a drainage guide).
- **Upward links:** detailed pages link back to their section overview so a reader can widen their view.
- **Restraint:** link where it genuinely helps the reader. Do not pack pages with links for SEO reasons; that conflicts with the calm, teach-first standard.

## Navigation rules

- Primary navigation stays small and stable. It reflects the top-level structure, not every page.
- Every page exposes where it sits (its section) so the reader is never lost.
- Search or browse should let a homeowner find content by the part of the property they care about.
- No dead ends: every content page offers at least one natural next step (a related guide, the section overview, or the relevant concept).
- In the foundation sequence, the primary in-page CTA should point to the next
  chapter, not default to request access.

## What IA must protect

- The single-canonical-page rule, to prevent duplicate, drifting explanations.
- The teach-first ordering, so product pages never crowd out learning.
- The full-property mental model, so the site never narrows into "rooms inside a house."
- URL stability, so links and search equity are not thrown away.

## Relationship to the app

The marketing site is a separate property from the application, but it must feel like the same product. The IA mirrors the product's organizing model (blueprint / vault / timeline / guidance) so that a homeowner who reads the site and then enters the product encounters a continuous, recognizable structure.
