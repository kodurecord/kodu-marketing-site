# Try Kodu — image assets

How it works: each photo renders as a real <img>. Until the .jpg exists at the
path below, a clean "Image needed" placeholder shows (no broken icon, no cartoon,
no SAMPLE wash). Drop the file in at the exact path and it becomes the visual.
Photos carry NO "SAMPLE" overlay. Only synthetic documents get a subtle label.

Photo spec: realistic, fictional/owned/licensed, ~1600×1200 (4:3), JPG, <300 KB.
NO real addresses, faces, license plates, contractor names, or personal data.

## BLUEPRINT SURFACES (primary visible blueprint — already in this folder)
blueprint/floor-plan-realistic.png   ← the Vault/Overview floor plan surface (visible)
blueprint/site-plan-realistic.png    ← the Vault site plan surface (visible)

These PNGs ARE the blueprint the visitor sees. The app renders them as the
surface; clickable markers/hotspots are overlaid on top. The matching vector
drawing is kept only as a fallback that shows if a PNG fails to load. To replace
the blueprint, swap these PNGs (keep the 820×520 aspect ratio so markers align).

## NEEDED — photos (supply these; see the prompt pack in chat)
property/home-exterior.jpg            front exterior of the home (fictional)

systems/hvac-condenser.jpg            outdoor AC condenser unit
systems/water-heater.jpg              tank water heater in garage/utility
systems/water-heater-label.jpg        close-up of the rating/spec plate (optional)
systems/electrical-panel.jpg          open breaker panel
systems/main-water-shutoff.jpg        main water shut-off valve
systems/gas-meter.jpg                 exterior gas meter
systems/irrigation-controller.jpg     sprinkler timer/controller
systems/drainage-outlet.jpg           daylight drainage / sump outlet
systems/smoke-co-detector.jpg         ceiling smoke/CO detector
systems/roof.jpg                      roof / shingles (current condition)
systems/exterior-wall.jpg             exterior wall / siding (optional)

projects/kitchen-before.jpg           kitchen before renovation
projects/kitchen-after.jpg            kitchen after renovation
projects/roof-replacement.jpg         new shingles being installed
projects/drainage-trench.jpg          open trench + perforated pipe
projects/exterior-paint.jpg           freshly painted exterior / siding
projects/fence-before.jpg             weathered fence before
projects/fence-after.jpg              replaced fence after
projects/bathroom-fixture.jpg         new faucet / valve close-up
projects/deck-maintenance.jpg         cleaned & resealed deck

## documents/ (optional)
Synthetic document previews are drawn clean in app.js. To use flat images instead,
drop PNGs here and set the record image to:
{ type:"document", src:"assets/images/documents/<file>.png", label:"Document preview" }
