# Kodu Ecosystem — Batch 1

**The Home Record Problem.** The foundation cluster of the Kodu homeowner continuity knowledge ecosystem.

---

## What this batch contains

Batch 1 is the recognition-and-education foundation that every later batch builds on. It explains why Kodu needs to exist, without ever raising its voice. Every page connects to the sample property record. Every page seeds the four-part Kodu model (blueprint, vault, timeline, guidance) as homeowner wisdom rather than product pitch.

```
kodu-ecosystem/
├── README.md                                  ← you are here
├── styles.css                                 ← canonical stylesheet (all pages)
├── script.js                                  ← shared JS: reveal, retargeting hooks
│
├── what-home-records-should-you-keep.html     ← Page 1  (entry node)
│
├── homeowners/
│   ├── organizing-home-records.html           ← Page 2
│   ├── preparing-to-sell.html                 ← Page 6
│   ├── inherited-home.html                    ← Page 7
│   ├── documenting-diy-home-projects.html     ← Page 9
│   └── why-homeowners-lose-property-history.html  ← Page 10 (philosophical foundation)
│
├── systems/
│   ├── roof-records.html                      ← Page 3
│   ├── hvac-history.html                      ← Page 4
│   └── appliance-manuals.html                 ← Page 8
│
├── insurance/
│   └── home-insurance-documentation.html      ← Page 5
│
└── docs/
    ├── _page-template.html                    ← canonical structural template
    ├── ecosystem-structure.md                  ← folder map, URL map, ecosystem hierarchy
    ├── internal-linking-map.md                 ← page-to-page link graph
    ├── funnel-map.md                           ← entry → page → sample record → access
    ├── retargeting-map.md                      ← per-bucket retargeting flows
    ├── sample-property-strategy.md             ← centerpiece artifact strategy
    └── sitemap.xml                             ← machine-readable sitemap
```

---

## How the 10 pages relate to each other

Three structural nodes carry the weight of the cluster:

- **Entry node** — `what-home-records-should-you-keep.html`. The single strongest SEO + emotional entry point. Every other page links upstream to it for context.
- **Philosophical foundation** — `homeowners/why-homeowners-lose-property-history.html`. The page that names the structural problem. Every other page resolves into it.
- **Conversion bridge** — every page links downstream to the sample property record (built in Batch 2). The sample record is the conversion engine.

Detailed link graph is in `docs/internal-linking-map.md`.

---

## How to use this batch

These pages are production-ready HTML. To deploy:

1. Upload the entire folder to the document root of `kodu.com` (or staging).
2. Update the `<link rel="canonical">` URLs on each page if the production domain differs.
3. Wire the `data-retarget` attribute on `<body>` to the ad platform of choice; the tags are listed in `docs/retargeting-map.md`.
4. Replace the placeholder image figures with real assets when available. The `.figure-placeholder` blocks identify what each image should be.
5. Build Batch 2 (the sample property record) — the funnel does not complete without it.

---

## What is NOT in this batch (intentionally)

Per the directive, Batch 1 deliberately excludes:

- Kodu Certified Home
- Advanced scoring or completeness algorithms
- Transfer infrastructure pages
- Insurability systems
- Public-data enrichment layers
- Deep interactive blueprints
- The sample property record itself (Batch 2)
- The request-access flow (Batch 2)

These come later. Batch 1's job is recognition, education, and trust. The conversion machinery is built once that foundation exists.

---

## Tone and visual standard

Every page in this batch inherits the visual and tonal standard of `kodu-homepage.html`:

- The same restrained palette (`--brand: #1976d2`, `--ink: #1a2333`, `--slate: #5a6478`).
- The same Inter type stack at the same weights.
- The same architectural illustration style.
- The same copy register: observational, calm, written as homeowner wisdom rather than product pitch.
- The same restrained CTAs ("Start your record" / "See a live example") — never urgent, never incentivized, never animated.

What is avoided across every page: fear language, urgency, exclamation points, "you might be losing money," contractor-bro framing, generic productivity hacks, blog-spam tone, lead-gen language. None of this appears anywhere in the batch.

---

## Build provenance

Pages were generated from two artifacts kept for reproducibility (not part of the deliverable):

- `build_pages.py` — the canonical page builder (nav, footer, sample-bridge, chrome).
- `page_specs_part1.py` + `page_specs_part2.py` — the per-page content specs.

To regenerate or extend, the same builder can produce additional pages in the same visual standard. The `docs/_page-template.html` file documents the token structure for new pages.
