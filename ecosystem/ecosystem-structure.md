# Ecosystem Structure Map

The shape of the Kodu homeowner continuity knowledge ecosystem, and where Batch 1 sits inside it.

---

## Current state (Batch 1, delivered)

```
kodu-ecosystem/
├── styles.css
├── script.js
│
├── what-home-records-should-you-keep.html
│
├── homeowners/
│   ├── organizing-home-records.html
│   ├── preparing-to-sell.html
│   ├── inherited-home.html
│   ├── documenting-diy-home-projects.html
│   └── why-homeowners-lose-property-history.html
│
├── systems/
│   ├── roof-records.html
│   ├── hvac-history.html
│   └── appliance-manuals.html
│
└── insurance/
    └── home-insurance-documentation.html
```

## URL map (Batch 1)

| # | URL | Page | Retarget tag |
|---|-----|------|--------------|
| 1 | `/what-home-records-should-you-keep` | What home records should you keep? | `record-foundation` |
| 2 | `/organizing-home-repair-records` | Organizing home repair records from scratch | `record-foundation` |
| 3 | `/roof-replacement-records` | Roof replacement records: what to keep and why | `roof-continuity` |
| 4 | `/hvac-service-history` | HVAC service history: a calm method | `hvac-continuity` |
| 5 | `/home-insurance-documentation` | Home insurance documentation, prepared calmly | `insurance-continuity` |
| 6 | `/preparing-your-home-record-for-sale` | Preparing your home record for sale | `sale-continuity` |
| 7 | `/inheriting-a-home-without-records` | Inheriting a home without records | `inheritance-continuity` |
| 8 | `/appliance-manuals-and-home-records` | Appliance manuals and what they're really for | `appliance-continuity` |
| 9 | `/documenting-diy-home-projects` | Documenting DIY home projects | `diy-continuity` |
| 10 | `/why-homeowners-lose-property-history` | Why homeowners lose property history | `philosophy` |

Note: directory paths in the filesystem (`/homeowners/inherited-home.html`) differ from the production URLs (`/inheriting-a-home-without-records`). The canonical URL in each page's `<link rel="canonical">` reflects the production URL; the production server should rewrite or route accordingly.

---

## Where Batch 1 sits in the larger ecosystem

Batch 1 is the **recognition + education** foundation. The remaining batches build the **conversion infrastructure** and the **authority layer**.

```
KODU ECOSYSTEM (full scope, multi-batch)
│
├── [BATCH 1] Recognition + Education          ← delivered
│   └── 10 pages: the home record problem
│
├── [BATCH 2] Sample Property Record           ← centerpiece of the funnel
│   ├── /sample-property-record.html
│   │   ├── Overview
│   │   ├── Blueprint
│   │   ├── Vault
│   │   ├── Systems (8 sub-pages)
│   │   ├── Projects (12 sub-pages)
│   │   ├── Timeline
│   │   ├── Guidance
│   │   └── Transfer
│   └── /request-access.html
│
├── [BATCH 3] Homeowner Type Pages             ← audience segmentation
│   ├── /new-homeowners.html
│   ├── /long-term-homeowners.html
│   ├── /multi-property-owners.html
│   └── /selling-soon.html
│
├── [BATCH 4] Deep System Pages                ← second-tier SEO
│   ├── /systems/water-heater-records.html
│   ├── /systems/electrical-panel-records.html
│   ├── /systems/plumbing-records.html
│   ├── /systems/windows-records.html
│   └── /systems/foundation-records.html
│
├── [BATCH 5] Transfer + Continuity Infrastructure   ← brand-defining
│   ├── /transfer/at-sale-checklist.html
│   ├── /transfer/what-to-leave-the-next-owner.html
│   ├── /transfer/inherited-home-day-one.html
│   └── /transfer/multi-generational-homes.html
│
├── [BATCH 6] Guidance Library                 ← the forward look
│   ├── /guidance/seasonal-maintenance.html
│   ├── /guidance/system-end-of-life-planning.html
│   └── /guidance/warranty-calendar.html
│
└── [BATCH 7] Long-form Editorial              ← authority + audience
    ├── /editorial/the-record-of-a-home.html
    ├── /editorial/the-anatomy-of-a-well-kept-home.html
    └── /editorial/three-generations-one-house.html
```

Batch 2 (sample property record) is the highest-priority next deliverable. The Batch 1 pages all link forward to it. Without Batch 2, the conversion loop is incomplete.

---

## Categorical hierarchy

The ecosystem organizes around six top-level categories. Batch 1 establishes five of them.

```
HOME RECORDS         ← Batch 1: Page 1 (entry node)
├── HOMEOWNERS       ← Batch 1: Pages 2, 6, 7, 9, 10
├── SYSTEMS          ← Batch 1: Pages 3, 4, 8
├── INSURANCE        ← Batch 1: Page 5
├── TRANSFER         ← Batch 5 (not yet built)
└── GUIDANCE         ← Batch 6 (not yet built)
```

Every page in the ecosystem belongs to exactly one category. The `--eyebrow` value on each page declares its category. Category boundaries are stable; pages do not change category over time.

---

## Subdomain and URL strategy

All Batch 1 pages live at the apex domain. No subdomains. No category prefixes in the URL.

- **Good:** `/roof-replacement-records`
- **Avoid:** `/blog/roof-replacement-records`, `/help/roof-replacement-records`, `/category/systems/roof-replacement-records`

This URL strategy reflects the brand's stance: these are not blog posts. They are reference pages of a continuity platform. The URL should read as documentation, not as marketing.

---

## File naming conventions

Within the filesystem, files are organized under subdirectories for clarity (`/homeowners/`, `/systems/`, `/insurance/`). The subdirectory does not appear in the production URL — it's a build-time organization aid.

File names use kebab-case, descriptive of content, no dates in the filename.

- **Good:** `roof-records.html`, `inherited-home.html`
- **Avoid:** `roof_records.html`, `RoofRecords.html`, `roof-records-2026.html`

---

## Asset organization (future)

Image and video assets are not part of Batch 1. When they're added in subsequent batches, the structure should be:

```
assets/
├── images/
│   ├── illustrations/        ← architectural SVGs
│   ├── photographs/          ← documentary stills
│   ├── document-previews/    ← scanned-paper looks
│   └── icons/                ← UI icons
├── video/
│   ├── short-form/           ← 30-90s vertical
│   ├── carousel-frames/      ← Instagram exports
│   └── long-form/            ← documentary pieces
└── fonts/                    ← (Inter loaded via Google Fonts; no local fonts yet)
```

Each Batch 1 page contains one or more `.figure-placeholder` blocks identifying the image that will eventually replace it. The placeholder text describes the image specification.
