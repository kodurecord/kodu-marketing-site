# Funnel Map — Batch 1

How a homeowner moves from an entry source to a Kodu access request, with each of the 10 Batch 1 pages mapped to its funnel position.

---

## The full conversion loop

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                       │
│   ENTRY SOURCE                                                        │
│   ─────────────                                                       │
│                                                                       │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐│
│   │   Search    │  │   Social    │  │   Direct    │  │ Retargeting ││
│   │   (SEO)     │  │   share     │  │   referral  │  │   (return)  ││
│   └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘│
│          │                 │                 │                 │       │
│          └─────────────────┴─────────┬───────┴─────────────────┘       │
│                                      │                                  │
│                                      ▼                                  │
│  ─────────────────────────────────────────────────────────────         │
│                                                                         │
│   STAGE 1 — RECOGNITION                                                 │
│   ─────────────────────                                                 │
│   The homeowner lands on a Batch 1 page that names their problem.      │
│                                                                         │
│   Emotional shift: "That actually happens in my house."                │
│                                                                         │
│   Outcome: 7-9 minute read. Trust established. Curiosity raised.       │
│                                      │                                  │
│                                      ▼                                  │
│  ─────────────────────────────────────────────────────────────         │
│                                                                         │
│   STAGE 2 — EDUCATION                                                   │
│   ──────────────────                                                    │
│   The reader explores 1-2 adjacent pages via "Continue reading."       │
│                                                                         │
│   Emotional shift: "This isn't just one problem — it's structural."    │
│                                                                         │
│   Outcome: 15-25 minute total session. Cluster recognition.            │
│                                      │                                  │
│                                      ▼                                  │
│  ─────────────────────────────────────────────────────────────         │
│                                                                         │
│   STAGE 3 — PRODUCT INEVITABILITY                                       │
│   ──────────────────────────────                                        │
│   The "How Kodu connects" continuity card on each page resolves        │
│   the reader's curiosity by naming the structural answer.              │
│                                                                         │
│   Emotional shift: "Of course something like this should exist."       │
│                                                                         │
│   Outcome: The reader looks for what Kodu actually looks like.         │
│                                      │                                  │
│                                      ▼                                  │
│  ─────────────────────────────────────────────────────────────         │
│                                                                         │
│   STAGE 4 — SAMPLE PROPERTY RECORD  ◄──── (Batch 2)                    │
│   ────────────────────────────────                                      │
│   The reader opens 2707 Trotter Park Ln. Sees a real, partial,         │
│   credible home record. Reads for 4-12 minutes.                        │
│                                                                         │
│   Emotional shift: "I want this for my home."                          │
│                                                                         │
│   Outcome: Conversion intent.                                          │
│                                      │                                  │
│                                      ▼                                  │
│  ─────────────────────────────────────────────────────────────         │
│                                                                         │
│   STAGE 5 — REQUEST ACCESS  ◄──── (Batch 2)                            │
│   ─────────────────────────                                             │
│   First-party signup. Email + property address. No payment yet.        │
│                                                                         │
│   Outcome: Lead captured. Onboarding begins.                           │
│                                                                         │
└──────────────────────────────────────────────────────────────────────┘
```

---

## The five stages, in words

### Stage 1 — Recognition
The first emotional reaction Kodu is engineered for is not curiosity, excitement, or fear. It is the small inward "huh" of a homeowner realizing something is true about their own situation that they hadn't quite named. Every Batch 1 page opens with a lede engineered to produce this reaction within 30 seconds.

### Stage 2 — Education
Once recognition lands, curiosity expands. The reader has time, the page is calm, the next link in the "Continue reading" block is one they want to follow. Most converting sessions involve 2-3 pages, not one. The page-to-page linking is designed to make this exploration feel natural rather than promotional.

### Stage 3 — Product inevitability
By the end of the second or third page, the reader has internalized the four-part Kodu model (blueprint, vault, timeline, guidance) as homeowner wisdom — not as product features. When the "How Kodu connects" card appears on each page, the model is already familiar; Kodu is positioned as the structural answer to a structural problem the reader has now articulated. The product feels inevitable rather than pitched.

### Stage 4 — Sample property record
The single most important page in the entire ecosystem. (Batch 2.) Abstraction collapses into something concrete: a real address, a real partial record, a real 1962 ranch with three previous owners and a 78% completeness score. The reader sees what Kodu actually is. Conversion happens here, not on the SEO pages.

### Stage 5 — Request access
The signup is intentionally light. Email, property address, no payment, no obligation. The conversion has already happened emotionally; the form is just confirmation.

---

## Per-page funnel position

Every Batch 1 page has a primary funnel role.

| Page | Funnel role | Strongest stage |
|------|-------------|-----------------|
| 1. What home records should you keep? | **Entry / Recognition** | Stage 1 |
| 2. Organizing home repair records | Recognition + Education | Stage 1-2 |
| 3. Roof replacement records | Education (system-specific) | Stage 2 |
| 4. HVAC service history | Education (system-specific) | Stage 2 |
| 5. Home insurance documentation | Education (cross-cluster) | Stage 2 |
| 6. Preparing your home record for sale | **Pre-conversion (life event)** | Stage 3 |
| 7. Inheriting a home without records | **Pre-conversion (life event)** | Stage 3 |
| 8. Appliance manuals | Education (lightweight) | Stage 2 |
| 9. Documenting DIY home projects | Education (identity-anchored) | Stage 2 |
| 10. Why homeowners lose property history | **Product inevitability** | Stage 3 |

Pages 6, 7, and 10 are pre-conversion: the reader who lands deep on these is closer to ready than a reader on Pages 3-5. Retargeting prioritizes these buckets accordingly (see `retargeting-map.md`).

---

## Conversion CTAs — restraint by design

Every Batch 1 page exposes exactly two conversion CTAs, identically worded across all 10 pages:

- **Primary:** "Start your record" — links to `/request-access.html`
- **Secondary:** "See a live example" or "Open the sample record" — links to `/sample-property-record.html`

The CTAs appear in three locations on each page:

1. **Top navigation** — Primary CTA only, visible on every scroll position
2. **Continuity card** — Both CTAs, mid-page, contextually anchored to "How Kodu connects"
3. **Sample-record bridge** — Primary "Open the sample record" CTA only, near page bottom

What's not present anywhere on these pages:

- Pop-up CTAs
- Exit-intent modals
- Discount language
- Urgency cues
- Animated buttons
- "Limited time" framing
- Multiple competing CTAs in the same viewport
- Email-gated content
- "Free download" lead magnets

The brand stance is that the conversion happens because the reader has decided it should, not because the page applied pressure. The CTA's job is to be there, calmly, when the decision is made.

---

## Why the sample property record is the conversion engine

The sample record (Batch 2) is the funnel's only true conversion surface. Batch 1 pages establish the problem and seed the model — they almost never convert directly. The conversion happens when an emotionally-primed reader sees a complete record made concrete: a real address, a real partial completeness, real systems, real history.

This means Batch 1's job is not to convert. It is to build the emotional and conceptual readiness that makes Stage 4 land. Every Batch 1 page that gets a reader to the sample record has done its job, even if the reader doesn't sign up that session.

---

## Drop-off points and what to do about them

### Drop-off after Stage 1 (read the page, didn't continue)
Most common drop-off. Reader recognized the problem but isn't ready for the next read. Solution: retargeting, capped at 3 impressions per 2 weeks. The reader returns 1-3 weeks later via retargeting and re-enters the funnel deeper. See `retargeting-map.md`.

### Drop-off after Stage 2 (read 2-3 pages, didn't open sample record)
Reader is interested but didn't yet click through to the sample record. The "How Kodu connects" continuity card and sample-bridge component are the levers here. The script.js attention timer (25s + 60% scroll → subtle visual nudge on the sample-bridge) addresses this without becoming pushy.

### Drop-off at Stage 4 (opened sample record, didn't request access)
Strong reader signal — they saw the thing and didn't yet act. Retargeting moves them to "warm-conversion" cadence. (Defined in Batch 2's retargeting layer.)

### Drop-off at Stage 5 (started request-access form, didn't complete)
Highest-intent drop-off. Short follow-up email after 24 hours. (Defined in Batch 2.)

---

## What this funnel intentionally does NOT include

- **No webinars or live demos.** The sample record replaces them.
- **No email courses or drip sequences before signup.** First-party data is captured at the signup point, not before.
- **No free trial or freemium tier framing.** The product is positioned as a serious working record, not as something to sample.
- **No "speak to sales" or consultation CTA.** Inappropriate for the brand.
- **No social proof carousels of testimonials.** Will exist eventually; not in the entry funnel.
- **No urgency or scarcity framing.** Inconsistent with the brand's calm posture.

These omissions are intentional design choices, not gaps to fill.
