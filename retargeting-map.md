# Retargeting Map — Batch 1

Per-bucket retargeting strategy for the 9 retargeting tags emitted by Batch 1 pages. Every retargeting flow respects the same cap and the same tonal restraint.

---

## Universal rules

These apply to every retargeting bucket and override any bucket-specific guidance:

1. **Hard cap: 3 impressions per 2 weeks per bucket.** After 3 exposures, the bucket goes dormant for the user for ≥14 days.
2. **No "you left" or "still thinking about" framing.** The brand does not chase. The retargeting unit is a continuation of the homeowner's curiosity, not a reminder of unfinished business.
3. **No discount, promotion, or urgency creative.** Kodu does not retarget with price. The product is the same price for the first impression and the third.
4. **No animated or motion-heavy creative.** Static, calm, documentary-quality imagery. SVG illustrations match the on-site visual standard.
5. **Frequency-cap aggregator behavior:** if a user has been seen on 3+ Batch 1 buckets, retargeting frequency is reduced ecosystem-wide rather than additive. The most recently triggered bucket takes precedence; older buckets pause.
6. **No retargeting if a user has visited the request-access page.** They are already a captured lead and move to the email layer (Batch 2).

---

## The retargeting bucket signal

Every Batch 1 page declares its bucket via `<body data-retarget="...">`. The shared `script.js` reads this on page load and persists it in `sessionStorage` under the key `kodu_seen`. Downstream pixel and email integrations read from this session signal.

The 9 buckets currently in use:

```
record-foundation       — Pages 1, 2 (the umbrella records cluster)
roof-continuity         — Page 3
hvac-continuity         — Page 4
insurance-continuity    — Page 5
sale-continuity         — Page 6
inheritance-continuity  — Page 7
appliance-continuity    — Page 8
diy-continuity          — Page 9
philosophy              — Page 10
```

---

## Bucket — `record-foundation`

### Trigger
Page 1 or Page 2 viewed (the homeowner is recognizing the general problem but hasn't yet identified a specific system or life event).

### Reader state
Curiosity stage. Generalist concern. Hasn't anchored to a specific use case.

### Retargeting objective
Deepen the recognition. Move the reader toward a system page (Roof, HVAC) or a life-event page (Inheriting, Preparing to sell) where the conversion psychology is stronger.

### Creative direction
A single, calm illustration of a drawer, a binder, or a stack of receipts — depicting the problem they just read about. Headline echoes the page's language: *"The drawer is not a record. The drawer is the absence of one."* CTA: *"See what a record actually looks like."*

### Destination
Sample property record. (Direct to the conversion engine — this reader is already abstract; concreteness is what they need.)

### Cadence
3 impressions over 14 days. Then dormant.

---

## Bucket — `roof-continuity`

### Trigger
Page 3 (roof replacement records) viewed.

### Reader state
System-specific concern. Likely either: (a) recently had roof work done, (b) considering roof work, (c) has had insurance friction about a roof, or (d) preparing to sell a home with a recently replaced roof.

### Retargeting objective
Reinforce the roof-specific narrative. Move toward sample record's roof page (when Batch 2 ships, a deep-linkable view of the sample record's roof system).

### Creative direction
Architectural illustration of a roof with subtle shingle texture. Headline: *"A roof has a story. Keep it."* CTA: *"See a complete roof record."*

### Destination
Sample property record (eventually deep-linked to the roof system view).

### Cadence
3 impressions over 14 days.

### Cross-bucket logic
If user also hit `insurance-continuity`, the next impression uses creative from the insurance bucket instead (cross-pollinating the two clusters that most often co-occur in serious homeowner concern).

---

## Bucket — `hvac-continuity`

### Trigger
Page 4 (HVAC service history) viewed.

### Reader state
System-specific. Often homeowner who just had service done and noticed they have no organized record of past visits, or homeowner whose system is aging and they're starting to track it.

### Retargeting objective
Reinforce the "three-minute practice" framing. Move toward sample record's HVAC system view.

### Creative direction
Architectural illustration of an outdoor condenser unit with subtle dimensional drawing details. Headline: *"Seven years of service. One record."* CTA: *"See an HVAC record built right."*

### Destination
Sample property record.

### Cadence
3 impressions over 14 days.

---

## Bucket — `insurance-continuity`

### Trigger
Page 5 (home insurance documentation) viewed.

### Reader state
Renewal-adjacent or claim-adjacent. Either preparing for a renewal, recovering from a claim experience, or thinking about coverage gaps after a recent event.

### Retargeting objective
Reinforce the "calm, not fear-based" positioning. Move toward how the sample record produces insurance-ready documentation as a byproduct.

### Creative direction
Documentary photograph of a folder of papers being closed — implied competence, calm. Headline: *"An adjuster's job is easier when the records exist."* CTA: *"See a record that already supports a claim."*

### Destination
Sample property record.

### Cadence
3 impressions over 14 days.

### Important constraint
This bucket is the highest risk for tonal slip. Insurance creative is full of fear language; Kodu's must not be. Every insurance retargeting unit must read calmer than the page it points to.

---

## Bucket — `sale-continuity`

### Trigger
Page 6 (preparing your home record for sale) viewed.

### Reader state
**Strongest commercial intent in the entire ecosystem.** This reader is somewhere between 30 days and 18 months from listing a home. They are actively preparing.

### Retargeting objective
Move directly to sample record and request-access. This is a near-term conversion candidate.

### Creative direction
Documentary photograph of a home from the curb, calm light. Headline: *"A record ready for sale, the day you decide to list."* CTA: *"Start your record."*

### Destination
Request access (skipping the sample record on impressions 2-3 since this reader is closest to action).

### Cadence
3 impressions over 14 days. After the third, this reader moves into an email nurture (Batch 2 territory).

---

## Bucket — `inheritance-continuity`

### Trigger
Page 7 (inheriting a home without records) viewed.

### Reader state
Emotionally significant. This reader is grieving, transitioning, or supporting someone who is. The retargeting must be exceptionally restrained.

### Retargeting objective
Stay present without pressing. Reinforce that the work doesn't need to happen this week.

### Creative direction
A single architectural illustration of a house at dusk, lights off — calm, not somber. Headline: *"The record begins where you are."* CTA: *"See a record built from partial information."*

### Destination
Sample property record (the sample record's inheritance demonstration is what this reader needs to see).

### Cadence
**Reduced cap: 2 impressions over 14 days, not 3.** Given the emotional context, frequency is dialed down universally for this bucket.

### Important constraint
This is the only bucket where the creative may NOT mention "your home" — this reader's relationship to the home is complicated. Use "the home" or "the property" instead.

---

## Bucket — `appliance-continuity`

### Trigger
Page 8 (appliance manuals) viewed.

### Reader state
Light interest. Came in for a small, organizational question. Often the lowest commercial intent in Batch 1.

### Retargeting objective
Move toward the broader records cluster — this reader's actual concern is bigger than appliance manuals, they just don't know it yet.

### Creative direction
A close-up illustration of a data plate on an appliance. Headline: *"Five items per appliance. One record per home."* CTA: *"See what a complete home record looks like."*

### Destination
Page 1 (`what-home-records-should-you-keep`), not the sample record. This bucket needs more education before sample-record exposure makes sense.

### Cadence
3 impressions over 14 days. Lowest creative investment of any bucket — this is volume-driven traffic, not high-intent.

---

## Bucket — `diy-continuity`

### Trigger
Page 9 (documenting DIY home projects) viewed.

### Reader state
Identity-anchored. This reader thinks of themselves as someone who does work on their own home. Strong ownership psychology.

### Retargeting objective
Reinforce that DIY work, documented well, counts as much as contractor work. Lead toward the sample record's DIY project demonstration (the 2023 deck rebuild).

### Creative direction
A photograph or illustration of an open project with documentation visible — a notebook on a sawhorse, a phone propped up taking a wall photo. Headline: *"DIY, recorded the way a contractor would record it."* CTA: *"See a DIY project that reads as real."*

### Destination
Sample property record (deck rebuild page when Batch 2 ships).

### Cadence
3 impressions over 14 days.

---

## Bucket — `philosophy`

### Trigger
Page 10 (why homeowners lose property history) viewed.

### Reader state
**Highest-quality reader in the funnel.** A reader who reads a 9-minute philosophical foundation page is engaged at a level most marketing-funnel readers never reach.

### Retargeting objective
Treat this reader as nearly converted. Move directly to sample record, and after one impression, directly to request access.

### Creative direction
A wide architectural illustration of a home in elevation — drafted, formal, restrained. Headline: *"The structural answer to a structural problem."* CTA: *"Open the sample record."*

### Destination
Sample property record (impression 1), request access (impressions 2-3).

### Cadence
3 impressions over 14 days.

### Important note
This is the bucket worth the highest creative investment. A reader who read Page 10 is most receptive to the brand's most considered messaging. Production quality on this bucket's retargeting unit should be highest.

---

## Cross-bucket prioritization

When a user has touched multiple buckets, the prioritization order for next-impression is:

```
1. philosophy          (highest-intent reader)
2. sale-continuity     (highest commercial intent)
3. inheritance-continuity   (highest emotional weight; capped at 2)
4. record-foundation   (umbrella)
5. roof-continuity / hvac-continuity / insurance-continuity   (system-specific)
6. diy-continuity
7. appliance-continuity (lowest commercial intent)
```

The most recently triggered bucket wins ties.

---

## What this retargeting layer is NOT

- Not a remarketing campaign of generic display ads.
- Not a competitive bidding strategy targeted at specific competitors.
- Not a discount-trigger based on user behavior.
- Not a fear-based "you didn't finish setting up" reminder loop.
- Not an email harvesting funnel.

It is the natural continuation of the page the reader was reading, delivered at the rate of about one calm reminder per week, capped, and dignified.

---

## Implementation notes

The current `script.js` writes the bucket signal to `sessionStorage`. Production deployment will need:

1. A real ad platform pixel that reads the signal (Meta, Google, LinkedIn).
2. A server-side bucket store (so the cap persists across sessions).
3. A creative library of static SVG / WebP units that match the on-site visual standard.
4. A simple suppression list keyed on visiting `/request-access.html`.

None of the above is part of Batch 1's deliverable — Batch 1 ships the signal source. The pixel and creative layers are operational concerns for the deploy team.
