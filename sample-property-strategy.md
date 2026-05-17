# Sample Property Record — Strategy

The spec for the centerpiece of the entire Kodu ecosystem. This document defines the sample property record that all Batch 1 pages link to, and that Batch 2 will build. Every choice below has been engineered to make the abstraction of "homeowner continuity" become concretely visible in under three minutes.

---

## Why the sample record is the ecosystem's centerpiece

The single moment of conversion in the Kodu funnel is not on an SEO page, not on a pricing page, not on a feature page — it is on the sample property record. This is where:

- Abstraction disappears. The reader sees a real home, with a real address, real systems, real history.
- Usefulness becomes obvious. The reader sees what their own record would look like — and wants one.
- The four-part model becomes furniture. Blueprint, vault, timeline, guidance stop being words and become navigable sections.
- The brand earns the conversion by being credible, not by pitching.

Every Batch 1 page exists to land a reader on the sample property record in a state of emotional readiness. The sample record's job is to convert that readiness into intent.

---

## The archetype: 2707 Trotter Park Ln

The sample record is one specific home, treated with the depth of a documentary subject. Not a generic mock-up. Not three different example homes. One home, fully realized.

### Why one specific home

- **Specificity earns trust.** A real address, a real street, a real story. Generalization is what readers expect; specificity is what they remember.
- **One home shows what a Kodu record actually is.** Multiple sample homes would dilute the demonstration into a feature gallery.
- **The home becomes a character.** Returning readers know it. Internal teams reference it. The home is one of the brand's recurring objects.

### The home itself

- **Address:** 2707 Trotter Park Ln (fictional, treated as real throughout the brand)
- **Year built:** 1962
- **Style:** Ranch
- **Square footage:** 1,840 sq ft
- **Lot:** 0.34 acres
- **Beds / Baths:** 3 / 2
- **Current owners:** The Mercer family, since 2019
- **Previous owners:** Three, going back to original construction
- **Completeness score:** 78% (an honest middle, not a vanity 100%)

### Why these specifics

- **1962 ranch** — common, recognizable, not aspirational. A house most readers can imagine living in.
- **Three previous owners** — enough generations to make continuity meaningful, not so many it becomes confusing.
- **78% completeness** — the most important choice. A 100% record reads as a marketing demo. A 78% record reads as a real home: cared-for, organized, but with the gaps every real record has. The credibility of the entire sample hinges on this number being honest.

---

## Top-level navigation of the sample record

The sample record's left-rail navigation has eight sections. These map directly to the four-part model, with operational refinements.

```
2707 Trotter Park Ln
├── Overview                      ← landing view
├── Blueprint                     ← the physical record
├── Vault                         ← the proof
├── Systems                       ← operational continuity
│   ├── Roof
│   ├── HVAC
│   ├── Water heater
│   ├── Electrical panel
│   ├── Plumbing
│   ├── Windows
│   ├── Foundation
│   └── Exterior
├── Projects                      ← chronological work
│   ├── 2024 — Roof replacement
│   ├── 2023 — Deck rebuild (DIY)
│   ├── 2022 — Kitchen refresh
│   ├── 2021 — HVAC service contract begins
│   ├── 2019 — Move-in
│   ├── ... (older history)
│   └── 1962 — Original construction
├── Timeline                      ← chronological story
├── Guidance                      ← the forward look
└── Transfer                      ← what the next owner sees
```

Persistent right-side panel: the conversion CTA, sized to be visible but not assertive.

---

## The four emotional moments

A reader who spends 4-12 minutes inside the sample record experiences a small sequence of recognitions, each engineered to land on a specific section.

### Moment 1 — Blueprint reveal
The reader opens the Blueprint section and sees an actual floor plan, dimensioned, with shutoff locations marked, room labels, and the 1978 addition shown in a different line weight. Reaction: "Wait, this is a real record."

### Moment 2 — Roof story
The reader opens the Roof system page. The roof was replaced in August 2024 — GAF Timberline HDZ, 25-year warranty, photographed during installation, with the permit and final inspection on file. The previous roof's record is also there: installed 1998, replaced after a hail event in 2024. Two roofs, one continuous record. Reaction: "This is what a roof record should look like."

### Moment 3 — Timeline
The reader scrolls the Timeline. 64 years of events, in chronological order, with the 1978 addition, the 1996 panel upgrade, the 2008 HVAC replacement, the 2019 closing, the 2024 roof. Some events have full documentation; some are noted as "approximate, from county records." The honest mix is the point. Reaction: "This is one continuous home."

### Moment 4 — Transfer
The reader opens the Transfer page and sees a buyer-facing package: systems summary, active warranties, permit chain, maintenance trail, with the private layers redacted. The page reads like a closing document — calm, organized, professional. Reaction: "This is what I'd hand the next owner."

These four moments are the conversion sequence. Two of the four are usually enough; all four are decisive.

---

## The privacy model (public / redacted / hidden)

The sample record is browsable by anyone, but demonstrates the same three-layer privacy that real Kodu records use.

### Public layer — visible to anyone with the link
- Year built, style, square footage, beds, baths, lot size
- Systems and their ages (anonymized identifying details)
- Project list, in summary
- Timeline at the high level
- Transfer-ready package preview

### Redacted layer — visible but with details masked
- Specific addresses on documents are shown as [REDACTED]
- Contractor company names visible; individual phone numbers masked
- Receipt amounts shown; payment method details masked
- Photographs that would identify the family are framed without faces

### Hidden layer — not present in the sample at all
- Family member names
- Anything financial beyond project costs
- Anything security-sensitive (alarm codes, safe locations, key locations)

This three-layer demonstration is its own conversion message: *the record is yours, and you control what anyone else sees.*

---

## Conversion mechanics within the sample record

The sample record converts via three mechanisms, none of them aggressive.

### 1. Persistent sidebar CTA
A small panel on the right rail, visible throughout the sample record:

> **Start your own record**
> Free to begin. Two minutes to start. No payment required.
> [Start your record]

This is the only persistent CTA. It does not animate, expand, or follow scroll position.

### 2. Contextual asks at three specific pages

- **Roof page bottom:** "See what your own roof record could look like." → start
- **Timeline bottom:** "Your home has a timeline like this. Build it." → start
- **Transfer page bottom:** "Prepare your own home's transfer package." → start

These are the three pages where the emotional moment lands hardest. The contextual CTA captures the lift.

### 3. Scroll-depth and time-on-page signal
The shared `script.js` attention timer (already implemented for Batch 1) operates here as well: 25+ seconds on the Transfer page, or 45+ seconds total on the sample record, slightly elevates the sidebar CTA's visual weight without animation.

---

## What the sample record explicitly does NOT include

- **No "demo" framing.** It is not labeled as a demo, sample, or example version of the product. It is presented as a real home's record, because functionally that's exactly what it is.
- **No "request a demo" CTA.** The product has no sales motion. The signup is self-serve.
- **No comparison to competitors.** The sample record stands on its own merits.
- **No testimonial overlays.** Quotes about the product don't belong in a record of a home.
- **No "what makes Kodu different" feature lists.** The record itself is the feature list.
- **No upsell prompts inside the sample record.** All CTAs go to the same neutral start-your-record flow.
- **No watermark or "Sample" badge.** The realism is the point.

---

## Performance and credibility requirements

The sample record is the highest-stakes page in the ecosystem. Its execution standards are higher than any other page.

### Visual quality
- Photographs (when included) should be commissioned documentary stills, not stock photography. Until commissioned photography is available, the page uses architectural SVG illustrations in the same style as Batch 1.
- The floor plan in the Blueprint section should be drafted to architectural standards — clean line weights, accurate dimensions, properly labeled rooms.
- Document scans (closing documents, permits, receipts) should look like real document scans, with the same texture, paper warmth, and aging a real document has after years in a drawer.

### Loading performance
- First contentful paint < 1.0s on a fast connection.
- Largest contentful paint < 2.0s.
- The sidebar CTA loads with the page, not after.
- All photographs lazy-load below the fold.

### Browsability
- Every section navigable in under one click from the Overview.
- Direct deep links to every system and project (so retargeting can land on, for example, the Roof page directly).
- Mobile experience is first-class — many readers will hit this from a phone after seeing a retargeting unit.

### Credibility
- Every number on the page must be consistent across sections. The roof age on the Roof system page must match the date on the Timeline must match the date in the 2024 project page.
- The completeness score (78%) must be visibly derivable: the reader should be able to see what's missing as well as what's present.
- The gaps in the record (the things marked "approximate" or "from county records") should be visible. Hiding the gaps would undermine the entire credibility argument.

---

## How Batch 1 sets up the sample record

Every Batch 1 page already references 2707 Trotter Park Ln by name in its sample-bridge component, with content tailored to the page's topic:

- Page 1 (records overview) → "the four categories made concrete"
- Page 2 (organizing) → "the four piles, built out"
- Page 3 (roof) → "a complete roof record"
- Page 4 (HVAC) → "seven years of service history"
- Page 5 (insurance) → "a record that already supports a claim"
- Page 6 (selling) → "a sale-ready record on demand"
- Page 7 (inheritance) → "a record built from partial information"
- Page 8 (appliances) → "the kitchen, as recorded"
- Page 9 (DIY) → "a DIY project that reads as real"
- Page 10 (philosophy) → "what continuity looks like when the structure exists"

These ten framings function as ten distinct entry points to the sample record. Each one promises a specific aspect of what the record demonstrates, and each one delivers when the reader clicks through.

---

## Build sequence for Batch 2

The sample record is the entire Batch 2 deliverable. Its build sequence:

1. **Overview page** — the entry. The home, the headline, the navigation. The first impression.
2. **Blueprint page** — the visual centerpiece. The floor plan is the hardest single asset in the entire ecosystem and should be commissioned first.
3. **Roof system page** — the strongest individual moment. The retargeting bucket with the highest commercial intent.
4. **Timeline page** — the emotional centerpiece. 64 years of events.
5. **Transfer page** — the conversion peak. The "I want this" moment.
6. **Remaining system pages** — Water heater, HVAC, panel, plumbing, windows, foundation, exterior.
7. **Remaining project pages** — 12 projects in chronological order.
8. **Guidance page** — the forward look.
9. **Vault page** — the proof aggregation.
10. **Request access page** — the signup. Minimal. Email + property address.

A complete Batch 2 is approximately 25-30 distinct pages of equivalent depth to Batch 1's 10. It is a substantial build. It is also the single most leveraged build in the entire roadmap, because every Batch 1 page links to it and every retargeting flow eventually terminates there.

---

## Maintenance after launch

The sample record is a living document. Two maintenance practices:

### Quarterly seasonal update
Once per quarter, the Mercer family "adds to" their record — a service visit, a small repair, a seasonal maintenance note. Returning visitors see the record growing over time, which reinforces the message that a Kodu record is a continuous working document, not a frozen artifact.

### Annual major event
Once per year, the record receives one larger update — a system upgrade, a deferred repair, an insurance event. This becomes lightweight editorial content for social channels and a story that long-time readers follow.

The cumulative effect over two years is a sample record that, by the time most prospective customers see it, has the depth and texture of a real home that has been documented for two-plus years — because it has been.
