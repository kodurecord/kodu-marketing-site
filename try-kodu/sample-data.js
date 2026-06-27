const SAMPLE_PROPERTY = {
  name: "The Maple Ridge Home",
  address: "418 Larkfield Way",
  code: "KDU-SC-0418",
  locationLabel: "Greenville, South Carolina",
  type: "Single-family home",
  built: 2008,
  sqft: 2420,
  bedrooms: 4,
  bathrooms: 2.5,
  lotAcres: 0.31,
  recordSince: 2019,
  storyLine: "Everything that has happened to this home, kept in one calm place \u2014 so no one has to guess later."
};
const SAMPLE_RECORDS = [
  // ── Interior ───────────────────────────────────────────────────────────────
  {
    id: "rec-kitchen-permit",
    title: "Kitchen Renovation Permit",
    category: "permit",
    fileType: "PDF",
    layer: "interior",
    area: "kitchen",
    areaLabel: "Kitchen",
    date: "Mar 14, 2021",
    summary: "The county building permit for the 2021 kitchen renovation \u2014 cabinetry, counters, and the updated electrical that went with them.",
    why: 'A permit on file is plain evidence the work was inspected and done to code. Years from now, no one has to wonder whether the kitchen was "just redone" or properly renovated \u2014 the answer is here.',
    proof: ["Permit document (PDF)", "Final inspection sign-off", "Linked to project: Kitchen Renovation"],
    nextAction: "Nothing needed \u2014 this one is complete. Keep the same habit for any future project that requires a permit.",
    image: { type: "doc", kind: "doc-permit", label: "Sample document", docType: "Permit (PDF)" },
    relatedTo: "Project: Kitchen Renovation"
  },
  {
    id: "rec-fridge-receipt",
    title: "Refrigerator Receipt",
    category: "receipt",
    fileType: "PDF",
    layer: "interior",
    area: "kitchen",
    areaLabel: "Kitchen",
    date: "Apr 2, 2021",
    summary: "The purchase receipt for the kitchen refrigerator, with the model and serial number recorded alongside it.",
    why: 'When an appliance acts up, the first questions are always "how old is it?" and "is it still under warranty?" The receipt answers both in seconds instead of a drawer search.',
    proof: ["Receipt (PDF)", "Model + serial recorded", "Linked to system: Refrigerator"],
    nextAction: "Worth adding the owner\u2019s manual or warranty card here too, so the whole appliance lives in one place.",
    image: { type: "doc", kind: "doc-receipt", label: "Sample document", docType: "Receipt (PDF)" },
    relatedTo: "System: Refrigerator"
  },
  {
    id: "rec-plumbing-invoice",
    title: "Plumbing Repair Invoice",
    category: "invoice",
    fileType: "PDF",
    layer: "interior",
    area: "primary-bath",
    areaLabel: "Primary Bath",
    date: "Jul 9, 2023",
    summary: "The invoice for replacing a leaking supply line and shutoff valve under the primary bath vanity.",
    why: "A small repair today is a clue tomorrow. If the same spot ever acts up again, you can see exactly what was done, when, and by whom \u2014 instead of starting from zero.",
    proof: ["Invoice (PDF)", "Before / after photos", "Plumber contact on file"],
    nextAction: "No action now. If anything reappears in this area, this record is the first place to look.",
    image: { type: "doc", kind: "doc-invoice", label: "Sample document", docType: "Invoice (PDF)" },
    relatedTo: "Project: Primary Bath Fixture Update"
  },
  // ── Utility (systems) ────────────────────────────────────────────────────────
  {
    id: "rec-hvac-service",
    title: "HVAC Service Record",
    category: "service",
    fileType: "PDF",
    layer: "utility",
    area: "hvac",
    areaLabel: "HVAC",
    date: "Apr 28, 2024",
    summary: "The spring service visit: coil cleaning, refrigerant check, and a fresh filter on the central system.",
    why: "A clear service history is one of the strongest signs a home has been cared for. It keeps the system efficient, keeps the warranty valid, and tells the next owner the home was never neglected.",
    proof: ["Service report (PDF)", "Technician notes", "Next service window noted"],
    nextAction: "A fall check-up would round out this year. Logging it here keeps the rhythm unbroken.",
    image: { type: "doc", kind: "doc-invoice", label: "Sample document", docType: "Service report (PDF)" },
    relatedTo: "System: HVAC"
  },
  {
    id: "rec-waterheater-warranty",
    title: "Water Heater Warranty",
    category: "warranty",
    fileType: "PDF",
    layer: "utility",
    area: "water-heater",
    areaLabel: "Utility Closet",
    date: "Jun 18, 2019",
    summary: "The manufacturer warranty for the 50-gallon water heater installed during the 2019 move-in updates.",
    why: "Knowing the install date and what\u2019s covered turns a future failure from a panic into a plan. You can see roughly how much life is left instead of guessing on the worst possible day.",
    proof: ["Warranty document (PDF)", "Install date confirmed", "Linked to system: Water Heater"],
    nextAction: "A yearly flush extends its life. Worth a quiet note to budget for replacement in the next few years.",
    image: { type: "doc", kind: "doc-warranty", label: "Sample document", docType: "Warranty (PDF)" },
    relatedTo: "System: Water Heater"
  },
  {
    id: "rec-electrical-panel",
    title: "Electrical Panel Photo",
    category: "photo",
    fileType: "Image",
    layer: "utility",
    area: "electrical",
    areaLabel: "Garage Wall",
    date: "Feb 11, 2024",
    summary: "A clear reference photo of the 200-amp main panel with every breaker label legible.",
    why: "When a breaker trips, you don\u2019t want to be squinting at faded handwriting in the dark. A labeled photo means the answer is on your phone, and it saves any electrician real time later.",
    proof: ["Panel photo (Image)", "Breaker labels legible", "200-amp service noted"],
    nextAction: "If any labels have changed since this photo, a quick re-shoot keeps it accurate.",
    image: { type: "photo", src: "assets/images/systems/electrical-panel.jpg", alt: "Sample electrical panel photo", label: "System photo", fallback: "photo-panel", docType: "Photo" },
    relatedTo: "System: Electrical Panel"
  },
  // ── Exterior ─────────────────────────────────────────────────────────────────
  {
    id: "rec-roof-invoice",
    title: "Roof Replacement Invoice",
    category: "invoice",
    fileType: "PDF",
    layer: "exterior",
    area: "roof",
    areaLabel: "Roof",
    date: "Sep 6, 2022",
    summary: "The full architectural-shingle roof replacement \u2014 tear-off, new underlayment, and new flashing.",
    why: "This is the single most-asked-about exterior record. It fixes the roof\u2019s age, the exact materials, and the workmanship coverage that follows the home through resale and insurance reviews.",
    proof: ["Invoice (PDF)", "Materials + color recorded", "Linked to project: Roof Replacement"],
    nextAction: "Adding a photo of the roof from the yard would complete the picture for the file.",
    image: { type: "doc", kind: "doc-invoice", label: "Sample document", docType: "Invoice (PDF)" },
    relatedTo: "Project: Roof Replacement"
  },
  {
    id: "rec-exterior-paint",
    title: "Exterior Paint Receipt",
    category: "receipt",
    fileType: "PDF",
    layer: "exterior",
    area: "walls",
    areaLabel: "Exterior Walls",
    date: "May 20, 2024",
    summary: "The exterior repaint receipt, with the brand, exact color codes, and finish noted for next time.",
    why: 'A year from now, "what color is the trim?" has a real answer instead of a paint-chip guess. Recorded colors mean every future touch-up matches, and the receipt shows the siding has been protected.',
    proof: ["Receipt (PDF)", "Color codes recorded", "Linked to project: Exterior Repaint"],
    nextAction: "Keep a small note of where leftover paint is stored, so touch-ups are effortless.",
    image: { type: "doc", kind: "doc-receipt", label: "Sample document", docType: "Receipt (PDF)" },
    relatedTo: "Project: Exterior Repaint"
  },
  {
    id: "rec-window-warranty",
    title: "Window Warranty",
    category: "warranty",
    fileType: "PDF",
    layer: "exterior",
    area: "walls",
    areaLabel: "Exterior Walls",
    date: "Aug 30, 2021",
    summary: "The manufacturer warranty for the replacement windows installed on the main level in 2021.",
    why: "Window warranties are often transferable and tied to install date and glass type. Keeping it here means a seal failure or a resale question has its answer ready.",
    proof: ["Warranty document (PDF)", "Install date confirmed", "Glass package recorded"],
    nextAction: "Worth confirming whether the warranty transfers to a future owner \u2014 a small detail that adds value.",
    image: { type: "doc", kind: "doc-warranty", label: "Sample document", docType: "Warranty (PDF)" },
    relatedTo: "Section: Exterior Walls"
  },
  // ── Site & Drainage ──────────────────────────────────────────────────────────
  {
    id: "rec-sprinkler-map",
    title: "Sprinkler Zone Map",
    category: "plan",
    fileType: "PDF",
    layer: "site",
    area: "irrigation",
    areaLabel: "Irrigation",
    date: "May 3, 2023",
    summary: "A diagram of the six irrigation zones with head locations and the controller schedule.",
    why: "When a zone stops working \u2014 or someone digs in the yard \u2014 this map shows exactly where the lines run. No trial-and-error, no guessing where the heads are buried.",
    proof: ["Zone map (PDF)", "6 zones documented", "Controller schedule noted"],
    nextAction: "Before any digging or landscaping, this is the map to check first.",
    image: { type: "doc", kind: "map-sprinkler", label: "Sample document", docType: "Site map (PDF)" },
    relatedTo: "System: Irrigation Controller"
  },
  {
    id: "rec-survey",
    title: "Property Survey",
    category: "plan",
    fileType: "PDF",
    layer: "site",
    area: "boundary",
    areaLabel: "Lot & Boundary",
    date: "Jan 22, 2019",
    summary: "The recorded survey showing the lot boundary, easements, and the home footprint on the 0.31-acre parcel.",
    why: 'Fence lines, setbacks, and "where does the property actually end?" stop being a debate. A survey on file is what settles those questions \u2014 and it\u2019s often requested for projects, refinancing, or a sale.',
    proof: ["Survey document (PDF)", "Easements marked", "Boundary lines confirmed"],
    nextAction: "Worth pulling up before planning a fence, shed, or any structure near a property line.",
    image: { type: "doc", kind: "doc-survey", label: "Sample document", docType: "Survey (PDF)" },
    relatedTo: "Section: Lot & Boundary"
  },
  {
    id: "rec-drainage-photos",
    title: "Drainage Improvement Photos",
    category: "photo",
    fileType: "Image",
    layer: "site",
    area: "drainage",
    areaLabel: "Backyard Drainage",
    date: "Oct 17, 2023",
    summary: "Progress photos of the French drain and regraded swale installed to move water away from the foundation.",
    why: "Water near a foundation is the kind of thing buyers and insurers ask about. These photos show a known issue was actually addressed \u2014 and how \u2014 rather than papered over.",
    proof: ["Progress photos (Image)", "Linked to project: Drainage Improvement", "Regrade documented"],
    nextAction: "A quick look after heavy rain confirms it\u2019s still doing its job. Add a photo if anything changes.",
    image: { type: "photo", src: "assets/images/projects/drainage-trench.jpg", alt: "Sample drainage trench photo", label: "Project photo", fallback: "photo-drainage", docType: "Photo set" },
    relatedTo: "Project: Drainage Improvement"
  },
  // ── Whole-home ────────────────────────────────────────────────────────────────
  {
    id: "rec-insurance",
    title: "Home Insurance Document",
    category: "insurance",
    fileType: "PDF",
    layer: "interior",
    area: "whole-home",
    areaLabel: "Whole Home",
    date: "Placeholder \u2014 not yet on file",
    summary: "A reserved spot for the current homeowner policy and its declarations page. Nothing is stored here yet.",
    why: "The moment you actually need insurance is the worst moment to go hunting for it. Keeping the active policy and claims contact here means it\u2019s one tap away when it matters most.",
    proof: ["Policy document \u2014 reserved", "Renewal date \u2014 to confirm", "Claims contact \u2014 to add"],
    nextAction: "Adding the current declarations page is a one-time step that closes this gap for good.",
    image: { type: "doc", kind: "doc-insurance", label: "Sample document", docType: "PDF \u2014 reserved" },
    relatedTo: "Section: Whole Home"
  },
  {
    id: "rec-maintenance-checklist",
    title: "Annual Maintenance Checklist",
    category: "checklist",
    fileType: "Checklist",
    layer: "interior",
    area: "whole-home",
    areaLabel: "Whole Home",
    date: "Updated Jan 5, 2025",
    summary: "A simple, calm checklist of seasonal tasks built around the systems this home actually has on record.",
    why: 'Most expensive surprises start as small, skipped tasks. Staying a little ahead keeps systems healthy, keeps warranties valid, and replaces "did we ever do that?" with a clear yes or no.',
    proof: ["Seasonal task list", "Tied to systems on record", "Last reviewed Jan 2025"],
    nextAction: "Glance at it at the start of each season \u2014 a few minutes now prevents the costly surprises later.",
    image: { type: "doc", kind: "doc-checklist", label: "Sample document", docType: "Checklist" },
    relatedTo: "Section: Whole Home"
  }
];
const FLOOR_ZONES = [
  { id: "primary-suite", label: "Primary Suite", x: 60, y: 60, w: 240, h: 150 },
  { id: "primary-bath", label: "Primary Bath", x: 60, y: 210, w: 140, h: 120 },
  { id: "bedroom-2", label: "Bedroom 2", x: 60, y: 330, w: 240, h: 150 },
  { id: "living", label: "Living Room", x: 300, y: 60, w: 260, h: 180 },
  { id: "dining", label: "Dining", x: 300, y: 240, w: 130, h: 150 },
  { id: "kitchen", label: "Kitchen", x: 430, y: 240, w: 130, h: 150 },
  { id: "foyer", label: "Foyer", x: 300, y: 390, w: 260, h: 90 },
  { id: "garage", label: "Garage", x: 560, y: 60, w: 200, h: 220 },
  { id: "water-heater", label: "Utility", x: 560, y: 280, w: 100, h: 100 },
  { id: "hvac", label: "HVAC", x: 660, y: 280, w: 100, h: 100 },
  { id: "electrical", label: "Panel", x: 560, y: 380, w: 200, h: 100 }
];
const SITE_ZONES = [
  { id: "boundary", label: "Lot Boundary", x: 30, y: 30, w: 760, h: 460 },
  { id: "roof", label: "Roof", x: 270, y: 150, w: 280, h: 220 },
  { id: "walls", label: "Exterior Walls", x: 250, y: 130, w: 320, h: 260 },
  { id: "irrigation", label: "Front Yard / Irrigation", x: 60, y: 380, w: 700, h: 90 },
  { id: "drainage", label: "Backyard Drainage", x: 60, y: 60, w: 180, h: 360 },
  { id: "driveway", label: "Driveway", x: 600, y: 380, w: 150, h: 90 }
];
const VAULT_LAYERS = [
  {
    id: "interior",
    label: "Interior",
    surface: "floor",
    intro: "The inside anatomy of your home. Select a room to reveal the records connected to it.",
    zoneIds: ["primary-suite", "primary-bath", "bedroom-2", "living", "dining", "kitchen", "foyer", "garage"],
    overview: [
      { label: "Rooms with records", value: "2 of 8" },
      { label: "Most recent", value: "Plumbing repair \xB7 Jul 2023" },
      { label: "Whole-home records", value: "Insurance \xB7 Maintenance" }
    ],
    documents: [
      { name: "Kitchen Permit", type: "PDF" },
      { name: "Refrigerator Receipt", type: "PDF" },
      { name: "Plumbing Invoice", type: "PDF" }
    ]
  },
  {
    id: "exterior",
    label: "Exterior",
    surface: "site",
    intro: "Your property envelope \u2014 roof, walls, and finishes. Select an area to view its records.",
    zoneIds: ["boundary", "walls", "roof", "driveway"],
    overview: [
      { label: "Roof", value: "Architectural shingle \xB7 2022" },
      { label: "Exterior paint", value: "Repainted May 2024" },
      { label: "Coverage", value: "3 records on file" }
    ],
    documents: [
      { name: "Roof Replacement Invoice", type: "PDF" },
      { name: "Exterior Paint Receipt", type: "PDF" },
      { name: "Window Warranty", type: "PDF" }
    ]
  },
  {
    id: "utility",
    label: "Utilities",
    surface: "floor",
    intro: "The systems that quietly keep the home running. Select a system to view its records.",
    zoneIds: ["hvac", "water-heater", "electrical"],
    overview: [
      { label: "HVAC", value: "Serviced Apr 2024" },
      { label: "Water heater", value: "Installed 2019 \xB7 under warranty" },
      { label: "Electrical", value: "200-amp panel \xB7 photo on file" }
    ],
    documents: [
      { name: "HVAC Service Record", type: "PDF" },
      { name: "Water Heater Warranty", type: "PDF" },
      { name: "Electrical Panel Photo", type: "Image" }
    ]
  },
  {
    id: "site",
    label: "Site & Drainage",
    surface: "site",
    intro: "Land, boundary, water, and the systems outside the walls. Select an area to view its records.",
    zoneIds: ["boundary", "drainage", "irrigation"],
    overview: [
      { label: "Survey", value: "Recorded Jan 2019" },
      { label: "Irrigation", value: "6 zones mapped" },
      { label: "Drainage", value: "French drain \xB7 2023" }
    ],
    documents: [
      { name: "Property Survey", type: "PDF" },
      { name: "Sprinkler Zone Map", type: "PDF" },
      { name: "Drainage Photos", type: "Image" }
    ]
  }
];
const SAMPLE_SYSTEMS = [
  {
    id: "sys-roof",
    name: "Roof",
    detail: "Architectural asphalt shingle",
    age: "Replaced 2022 \xB7 ~3 years",
    interval: "Inspect yearly",
    note: "Replacement invoice + materials on file",
    status: "good",
    group: "Major Home Systems",
    why: "With the replacement date and materials recorded, the roof\u2019s real age is never in question.",
    nextAction: "A yearly look from the ground is enough. Add a photo if you ever spot a change.",
    image: { type: "photo", src: "assets/images/systems/roof.jpg", alt: "Sample roof photo", label: "System photo", fallback: "photo-roof", docType: "Photo" }
  },
  {
    id: "sys-hvac",
    name: "HVAC System",
    detail: "Central, installed 2019",
    age: "~6 years",
    interval: "Service twice a year",
    note: "Spring service logged Apr 2024",
    status: "good",
    group: "Major Home Systems",
    why: "An unbroken service history keeps efficiency up, the warranty valid, and surprises down.",
    nextAction: "A fall service would complete this year\u2019s rhythm.",
    image: { type: "photo", src: "assets/images/systems/hvac-condenser.jpg", alt: "Sample HVAC condenser photo", label: "System photo", fallback: "photo-hvac", docType: "Photo" }
  },
  {
    id: "sys-waterheater",
    name: "Water Heater",
    detail: "50-gallon, installed 2019",
    age: "~6 years",
    interval: "Flush yearly",
    note: "Under warranty \xB7 serial plate on file",
    status: "building",
    group: "Major Home Systems",
    why: "The serial plate fixes the model and install date, so a future replacement can be planned, not panicked over.",
    nextAction: "Worth a yearly flush, and a quiet note to budget for replacement down the road.",
    image: { type: "photo", src: "assets/images/systems/water-heater.jpg", alt: "Sample water heater photo", label: "System photo", fallback: "photo-water-heater-plate", docType: "Photo" }
  },
  {
    id: "sys-electrical",
    name: "Electrical Panel",
    detail: "200-amp main panel",
    age: "Original to home",
    interval: "Inspect as needed",
    note: "Labeled panel photo on file",
    status: "good",
    group: "Major Home Systems",
    why: "A labeled panel photo turns a tripped breaker from a guessing game into a ten-second fix.",
    nextAction: "Re-shoot the photo if any labels change.",
    image: { type: "photo", src: "assets/images/systems/electrical-panel.jpg", alt: "Sample electrical panel photo", label: "System photo", fallback: "photo-panel", docType: "Photo" }
  },
  {
    id: "sys-shutoff",
    name: "Main Water Shutoff",
    detail: "Garage wall, quarter-turn valve",
    age: "Original to home",
    interval: "Test yearly",
    note: "Location photo on file",
    status: "good",
    group: "Major Home Systems",
    why: "In a leak, seconds matter. A photo of the exact shutoff location means anyone in the home can stop the water fast.",
    nextAction: "Make sure everyone in the household knows where this is.",
    image: { type: "photo", src: "assets/images/systems/main-water-shutoff.jpg", alt: "Sample main water shut-off photo", label: "System photo", fallback: "photo-shutoff", docType: "Photo" }
  },
  {
    id: "sys-gas",
    name: "Gas Meter",
    detail: "Exterior side wall",
    age: "Original to home",
    interval: "Visual check yearly",
    note: "Location photo on file",
    status: "good",
    group: "Major Home Systems",
    why: "Knowing where the meter and its shutoff are is a basic safety fact worth having on record.",
    nextAction: "No action needed \u2014 good to have on file.",
    image: { type: "photo", src: "assets/images/systems/gas-meter.jpg", alt: "Sample gas meter photo", label: "System photo", fallback: "photo-gas-meter", docType: "Photo" }
  },
  {
    id: "sys-detectors",
    name: "Smoke & CO Detectors",
    detail: "Hardwired, 5 locations",
    age: "Batteries changed 2024",
    interval: "Test twice a year",
    note: "Locations photographed",
    status: "building",
    group: "Major Home Systems",
    why: "A simple record of where detectors are \u2014 and when batteries were changed \u2014 keeps a safety basic from slipping.",
    nextAction: "A battery change each spring and fall keeps this current.",
    image: { type: "photo", src: "assets/images/systems/smoke-co-detector.jpg", alt: "Sample smoke and CO detector photo", label: "System photo", fallback: "photo-detector", docType: "Photo" }
  },
  {
    id: "sys-fridge",
    name: "Refrigerator",
    detail: "Kitchen, purchased 2021",
    age: "~4 years",
    interval: "Clean coils twice a year",
    note: "Receipt + model recorded",
    status: "building",
    group: "Appliances",
    why: "Receipt and model on file make any warranty question quick to answer.",
    nextAction: "Adding the manual would put the whole appliance in one place.",
    image: { type: "doc", kind: "doc-receipt", label: "Sample document", docType: "Receipt (PDF)" }
  },
  {
    id: "sys-drainage",
    name: "Drainage System",
    detail: "French drain + regraded swale",
    age: "Installed 2023",
    interval: "Clear seasonally",
    note: "Outlet + trench photos on file",
    status: "good",
    group: "Exterior & Site",
    why: "Photos prove a known water issue was addressed properly \u2014 a real answer for buyers and insurers.",
    nextAction: "A quick check after heavy rain confirms it\u2019s still working.",
    image: { type: "photo", src: "assets/images/systems/drainage-outlet.jpg", alt: "Sample drainage outlet photo", label: "System photo", fallback: "photo-sump", docType: "Photo" }
  },
  {
    id: "sys-irrigation",
    name: "Irrigation Controller",
    detail: "6-zone timer, garage",
    age: "Installed 2023",
    interval: "Adjust seasonally",
    note: "Controller photo + zone map on file",
    status: "good",
    group: "Exterior & Site",
    why: "The controller photo and zone map together mean a failed zone or a reschedule is straightforward to sort out.",
    nextAction: "Adjust the schedule at each season change.",
    image: { type: "photo", src: "assets/images/systems/irrigation-controller.jpg", alt: "Sample irrigation controller photo", label: "System photo", fallback: "photo-irrigation-controller", docType: "Photo" }
  }
];
const SAMPLE_PROJECTS = [
  {
    id: "proj-kitchen",
    title: "Kitchen Renovation",
    year: "2021",
    section: "Kitchen",
    summary: "New cabinetry, quartz counters, updated lighting, and a refreshed appliance set.",
    records: ["rec-kitchen-permit", "rec-fridge-receipt"],
    value: "Permitted and documented, so the upgrade is provable at resale instead of being taken on faith.",
    nextAction: "Adding a few more finished photos would make this chapter feel complete.",
    gallery: [
      { type: "photo", src: "assets/images/projects/kitchen-before.jpg", alt: "Sample kitchen before-renovation photo", label: "Project photo", fallback: "photo-kitchen-before", caption: "Before \u2014 original kitchen" },
      { type: "photo", src: "assets/images/projects/kitchen-after.jpg", alt: "Sample kitchen after-renovation photo", label: "Project photo", fallback: "photo-kitchen-after", caption: "After \u2014 renovated kitchen" },
      { type: "doc", kind: "doc-permit", label: "Sample document", caption: "Building permit on file" },
      { type: "doc", kind: "doc-receipt", label: "Sample document", caption: "Appliance receipt" }
    ],
    completionNote: "Completed spring 2021 and signed off at final inspection. Permit, appliance receipt, and before/after photos are all on record."
  },
  {
    id: "proj-roof",
    title: "Roof Replacement",
    year: "2022",
    section: "Roof",
    summary: "Full tear-off and architectural-shingle replacement with new flashing and underlayment.",
    records: ["rec-roof-invoice"],
    value: "Resets the roof-age clock and records the workmanship coverage that follows the home.",
    nextAction: "A yard-level roof photo would round out the record.",
    gallery: [
      { type: "photo", src: "assets/images/projects/roof-replacement.jpg", alt: "Sample roof replacement photo", label: "Project photo", fallback: "photo-roof", caption: "New architectural shingles" },
      { type: "doc", kind: "doc-invoice", label: "Sample document", caption: "Replacement invoice" }
    ],
    completionNote: "Completed September 2022. Invoice records the materials, color, and workmanship coverage tied to the home."
  },
  {
    id: "proj-drainage",
    title: "Drainage Improvement",
    year: "2023",
    section: "Backyard Drainage",
    summary: "A French drain and regraded swale to direct water away from the foundation.",
    records: ["rec-drainage-photos"],
    value: "Shows a known water issue was handled properly \u2014 and leaves the proof where it can be found.",
    nextAction: "Re-check after heavy rain; add a photo if anything shifts.",
    gallery: [
      { type: "photo", src: "assets/images/projects/drainage-trench.jpg", alt: "Sample drainage trench photo", label: "Project photo", fallback: "photo-drainage", caption: "Trench & perforated pipe" },
      { type: "photo", src: "assets/images/systems/drainage-outlet.jpg", alt: "Sample drainage outlet photo", label: "System photo", fallback: "photo-sump", caption: "Daylight drainage outlet" }
    ],
    completionNote: "Completed October 2023. Progress photos document the trench, perforated pipe, and the regraded swale."
  },
  {
    id: "proj-paint",
    title: "Exterior Repaint",
    year: "2024",
    section: "Exterior Walls",
    summary: "Full exterior repaint with the exact color codes recorded for future touch-ups.",
    records: ["rec-exterior-paint"],
    value: "Documents upkeep and makes every future touch-up an exact match instead of a guess.",
    nextAction: "Note where the leftover paint is stored so touch-ups stay effortless.",
    gallery: [
      { type: "photo", src: "assets/images/projects/exterior-paint.jpg", alt: "Sample exterior paint colors photo", label: "Project photo", fallback: "swatch-paint", caption: "Selected exterior colors" },
      { type: "doc", kind: "doc-receipt", label: "Sample document", caption: "Paint & labor receipt" }
    ],
    completionNote: "Completed May 2024. Body, trim, and door color codes are recorded on the receipt for exact future matches."
  },
  {
    id: "proj-fence",
    title: "Fence Repair",
    year: "2023",
    section: "Lot & Boundary",
    summary: "Replaced two weathered fence panels and re-set a leaning gate post along the rear line.",
    records: [],
    value: "Keeps the boundary in good shape and documents upkeep along the property line.",
    nextAction: "Worth a yearly look at the posts; add a photo if a panel weathers again.",
    gallery: [
      { type: "photo", src: "assets/images/projects/fence-before.jpg", alt: "Sample fence before-repair photo", label: "Project photo", fallback: "photo-fence-before", caption: "Before \u2014 weathered panels" },
      { type: "photo", src: "assets/images/projects/fence-after.jpg", alt: "Sample fence after-repair photo", label: "Project photo", fallback: "photo-fence-after", caption: "After \u2014 replaced & re-set" }
    ],
    completionNote: "Completed summer 2023. Before/after photos document the replaced panels and the re-set gate post."
  },
  {
    id: "proj-bath",
    title: "Primary Bath Fixture Update",
    year: "2023",
    section: "Primary Bath",
    summary: "Replaced the vanity faucet and the failing supply line and shutoff valve.",
    records: ["rec-plumbing-invoice"],
    value: "Ties the new fixture to the repair invoice, so the work and its warranty are easy to trace.",
    nextAction: "If the area stays dry through the year, nothing more is needed.",
    gallery: [{ type: "photo", src: "assets/images/projects/bathroom-fixture.jpg", alt: "Sample bathroom fixture photo", label: "Project photo", fallback: "photo-bath-fixture", caption: "New faucet & valve" }],
    completionNote: "Completed July 2023 alongside the plumbing repair. Invoice and fixture photo are linked."
  },
  {
    id: "proj-deck",
    title: "Deck Maintenance",
    year: "2024",
    section: "Exterior Walls",
    summary: "Cleaned, sanded high-wear boards, and resealed the rear deck.",
    records: [],
    value: "Recorded upkeep extends the deck\u2019s life and shows the exterior has been cared for.",
    nextAction: "Reseal roughly every two to three years; this record marks the clock.",
    gallery: [{ type: "photo", src: "assets/images/projects/deck-maintenance.jpg", alt: "Sample deck maintenance photo", label: "Project photo", fallback: "photo-deck", caption: "Cleaned & resealed boards" }],
    completionNote: "Completed spring 2024. Photo marks the reseal date so the next one is easy to plan."
  }
];
const SAMPLE_TIMELINE = [
  {
    id: "tl-built",
    date: "2008",
    title: "Home built",
    kind: "Milestone",
    section: "Whole Home",
    what: "The Maple Ridge Home was completed \u2014 a 2,420 sq ft single-family home on a 0.31-acre lot.",
    why: "The first page of the property\u2019s memory. The age of the structure sets expectations for every major system that follows.",
    proof: ["Year of construction on record"]
  },
  {
    id: "tl-purchase",
    records: ["rec-survey"],
    date: "Jan 2019",
    title: "Purchased & move-in updates",
    kind: "Milestone",
    section: "Whole Home",
    what: "Ownership recorded. A new water heater went in and a fresh survey was filed.",
    why: "Anchors the current ownership chapter and locks in install dates that warranties and service planning depend on.",
    proof: ["Property Survey", "Water Heater Warranty"],
    image: { type: "doc", kind: "doc-survey", label: "Sample document" }
  },
  {
    id: "tl-kitchen",
    records: ["rec-kitchen-permit", "rec-fridge-receipt"],
    date: "Mar 2021",
    title: "Kitchen renovation",
    kind: "Project",
    section: "Kitchen",
    what: "A permitted renovation: cabinetry, counters, lighting, and a new refrigerator.",
    why: "A permitted, documented renovation protects the value of the upgrade and answers the resale question before it\u2019s asked.",
    proof: ["Kitchen Renovation Permit", "Refrigerator Receipt"],
    nextAction: "A few finished photos would complete this entry.",
    image: { type: "photo", src: "assets/images/projects/kitchen-after.jpg", alt: "Sample kitchen after-renovation photo", label: "Project photo", fallback: "photo-kitchen-after" }
  },
  {
    id: "tl-roof",
    records: ["rec-roof-invoice"],
    date: "Sep 2022",
    title: "Roof replacement",
    kind: "Project",
    section: "Roof",
    what: "Full architectural-shingle roof replacement with new flashing and underlayment.",
    why: "Resets the roof-age clock and records the workmanship coverage that travels with the home.",
    proof: ["Roof Replacement Invoice"],
    image: { type: "photo", src: "assets/images/projects/roof-replacement.jpg", alt: "Sample roof replacement photo", label: "Project photo", fallback: "photo-roof" }
  },
  {
    id: "tl-drainage",
    records: ["rec-drainage-photos"],
    date: "Oct 2023",
    title: "Backyard drainage improvement",
    kind: "Project",
    section: "Backyard Drainage",
    what: "A French drain and regraded swale installed to direct water away from the foundation.",
    why: "Documents that a known water issue was addressed properly \u2014 one of the things that protects the foundation long-term.",
    proof: ["Drainage Improvement Photos"],
    nextAction: "Check after the next heavy rain and add a photo if anything changes.",
    image: { type: "photo", src: "assets/images/projects/drainage-trench.jpg", alt: "Sample drainage trench photo", label: "Project photo", fallback: "photo-drainage" }
  },
  {
    id: "tl-hvac",
    records: ["rec-hvac-service"],
    date: "Apr 2024",
    title: "HVAC seasonal service",
    kind: "Service",
    section: "HVAC",
    what: "A spring tune-up: coil cleaning, refrigerant check, and a fresh filter.",
    why: "Keeps the system efficient and the warranty intact, and adds another clean entry to the service history.",
    proof: ["HVAC Service Record"],
    nextAction: "A fall check-up would keep the rhythm unbroken.",
    image: { type: "photo", src: "assets/images/systems/hvac-condenser.jpg", alt: "Sample HVAC condenser photo", label: "System photo", fallback: "photo-hvac" }
  },
  {
    id: "tl-paint",
    records: ["rec-exterior-paint"],
    date: "May 2024",
    title: "Exterior repaint",
    kind: "Project",
    section: "Exterior Walls",
    what: "Full exterior repaint with the exact colors written down.",
    why: "Keeps the envelope protected and makes future touch-ups a perfect match instead of a guess.",
    proof: ["Exterior Paint Receipt"],
    image: { type: "photo", src: "assets/images/projects/exterior-paint.jpg", alt: "Sample exterior paint colors photo", label: "Project photo", fallback: "swatch-paint" }
  },
  {
    id: "tl-review",
    records: ["rec-maintenance-checklist", "rec-insurance"],
    date: "Jan 2025",
    title: "Annual maintenance review",
    kind: "Record",
    section: "Whole Home",
    what: "The seasonal checklist refreshed against the systems currently on record.",
    why: "Staying a little ahead prevents most costly surprises and keeps the home\u2019s story current.",
    proof: ["Annual Maintenance Checklist"],
    nextAction: "A quick seasonal glance is all it takes to stay ahead.",
    image: { type: "doc", kind: "doc-checklist", label: "Sample document" }
  }
];
const SAMPLE_GUIDANCE = [
  {
    id: "g-waterheater",
    title: "Why your water heater age matters",
    tag: "Good to know",
    section: "Utilities",
    plain: "Your water heater went in during 2019, which puts it right around mid-life. Most tanks last roughly 8 to 12 years.",
    why: "Knowing the age lets you plan ahead instead of being caught off guard. A replacement you saw coming is almost always cheaper and calmer than an emergency one.",
    next: "No action needed now \u2014 a yearly flush extends its life, and it\u2019s worth budgeting for replacement in a few years."
  },
  {
    id: "g-roof-warranty",
    title: "Keep your roof paperwork close",
    tag: "Recordkeeping",
    section: "Exterior",
    plain: "Your 2022 roof replacement invoice is already on file \u2014 exactly where it should be.",
    why: "Roof documentation is one of the most-requested records at resale and during insurance reviews. Having it ready saves time and quietly supports the home\u2019s value.",
    next: "Nothing to do here. You might add a photo of the roof from the yard for a complete picture."
  },
  {
    id: "g-permit-value",
    title: "Permits protect your renovation value",
    tag: "Value",
    section: "Interior",
    plain: "Your kitchen renovation has its permit on file, so the work shows as inspected and to code.",
    why: "Unpermitted work can raise doubts and lower value at resale. A permit on record removes that doubt and protects what you invested.",
    next: "Already covered. Keep the same habit for any future project that needs a permit."
  },
  {
    id: "g-hvac-interval",
    title: "Confirm your HVAC service rhythm",
    tag: "Maintenance",
    section: "Utilities",
    plain: "Your last logged HVAC service was spring 2024. Central systems do best with a check in spring and again in fall.",
    why: "Regular service keeps efficiency up, lowers the chance of a mid-summer failure, and keeps the manufacturer warranty valid.",
    next: "A fall check-up would complete this year\u2019s rhythm. Logging it here keeps the history unbroken."
  },
  {
    id: "g-insurance",
    title: "Your insurance document isn\u2019t on file yet",
    tag: "Worth a look",
    section: "Whole Home",
    plain: "A spot is reserved for your homeowner policy, but no document is stored there yet.",
    why: "When something happens, you want coverage details and the claims contact in one place \u2014 not buried in old email. It\u2019s a small step that pays off at the worst moment.",
    next: "Adding your current declarations page would complete this part of the record. Calm and one-time."
  }
];
function recordsForLayer(layer) {
  return SAMPLE_RECORDS.filter((r) => r.layer === layer);
}
function recordById(id) {
  return SAMPLE_RECORDS.find((r) => r.id === id);
}
const RECORD_COUNT = SAMPLE_RECORDS.length;
const SYSTEM_COUNT = SAMPLE_SYSTEMS.length;
const PROJECT_COUNT = SAMPLE_PROJECTS.length;
const TIMELINE_COUNT = SAMPLE_TIMELINE.length;
export {
  FLOOR_ZONES,
  PROJECT_COUNT,
  RECORD_COUNT,
  SAMPLE_GUIDANCE,
  SAMPLE_PROJECTS,
  SAMPLE_PROPERTY,
  SAMPLE_RECORDS,
  SAMPLE_SYSTEMS,
  SAMPLE_TIMELINE,
  SITE_ZONES,
  SYSTEM_COUNT,
  TIMELINE_COUNT,
  VAULT_LAYERS,
  recordById,
  recordsForLayer
};
