/* ============================================================
   KODU ECOSYSTEM — SHARED SCRIPT
   Reveal animations, retargeting hooks, internal-link tracking.
   No external dependencies. Calm by default.
   ============================================================ */

(function () {
  'use strict';

  /* ----- Reveal-on-scroll ----- */
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  window.addEventListener('load', function () {
    document.querySelectorAll('.article-hero .reveal').forEach(function (el) {
      el.classList.add('in');
    });
  });

  /* ----- Retargeting marker -----
     Each page declares a data-retarget attribute on <body>.
     This script reads it and stores the page's retargeting bucket
     in sessionStorage so downstream tooling (ads pixel, Kodu's own
     email layer, etc.) can pick up which content cluster the
     homeowner has touched.

     Tag values follow the map in docs/retargeting-map.md:
       record-foundation, roof-continuity, hvac-continuity,
       insurance-continuity, sale-continuity, inheritance-continuity,
       diy-continuity, appliance-continuity, philosophy
  */
  const retargetTag = document.body && document.body.dataset && document.body.dataset.retarget;
  if (retargetTag) {
    try {
      const key = 'kodu_seen';
      const existing = JSON.parse(sessionStorage.getItem(key) || '[]');
      if (existing.indexOf(retargetTag) === -1) {
        existing.push(retargetTag);
        sessionStorage.setItem(key, JSON.stringify(existing));
      }
    } catch (err) { /* sessionStorage unavailable; silent */ }
  }

  /* ----- Sample-record bridge attention timer -----
     If a reader spends 25+ seconds on the page AND has scrolled
     past 60% of content height, the sample-bridge CTA becomes
     subtly more prominent. No popups, no interruption — just
     a soft visual nudge that the artifact is available.
  */
  const bridge = document.querySelector('.sample-bridge-card');
  if (bridge) {
    let scrolledFar = false;
    let timeReached = false;

    setTimeout(function () { timeReached = true; maybeHighlight(); }, 25000);

    window.addEventListener('scroll', function () {
      const scrollPct = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
      if (scrollPct > 0.6) { scrolledFar = true; maybeHighlight(); }
    }, { passive: true });

    function maybeHighlight() {
      if (scrolledFar && timeReached) {
        bridge.style.transition = 'box-shadow 0.8s ease, border-color 0.8s ease';
        bridge.style.boxShadow = '0 14px 40px -24px rgba(25, 118, 210, 0.35)';
        bridge.style.borderColor = 'rgba(25, 118, 210, 0.35)';
      }
    }
  }
})();
