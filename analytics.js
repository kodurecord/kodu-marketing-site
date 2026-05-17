/* ============================================================================
   Kodu — Analytics foundation (analytics.js)
   ----------------------------------------------------------------------------
   Single source of truth for tracking, event emission, and future pixel
   integration. Loaded on every page BEFORE script.js so that the global
   `window.kodu` namespace is available when other scripts try to emit events.

   DESIGN PRINCIPLES
   -----------------
   1. NO NETWORK CALLS BY DEFAULT.
      Events are queued into `window.koduDataLayer` (a plain array) until both
      conditions are met:
        a) A real Pixel ID is configured in PIXELS below (no placeholders).
        b) The user has granted the relevant consent category via
           `window.kodu.setConsent({ analytics: true, marketing: true })`.
      Until then, NO third-party pixel (Meta, Google, TikTok, LinkedIn) is
      contacted in any way. The site remains entirely first-party.

   2. CONSENT-FIRST.
      The default consent state is `{ analytics: false, marketing: false }`.
      The site does not currently render a consent banner; when one is added,
      it should call `window.kodu.setConsent(...)` with the user's choices.
      All previously-queued events will then be flushed to the appropriate
      pixels (if any are configured).

   3. CALM POSTURE.
      No popups, no overlays, no auto-prompts, no growth-hack UX. This file
      defines infrastructure only. It writes nothing to the DOM.

   4. NAMESPACED EVENT NAMES.
      All Kodu events begin with the `kodu_` prefix. This keeps the data layer
      legible if it is ever shared with a future tag manager (GTM, Segment,
      RudderStack, Customer.io, etc.).

   ----------------------------------------------------------------------------
   EVENT MAP
   ----------------------------------------------------------------------------
   Event name                          Fired from                Trigger
   ----------------------------------- ------------------------- ----------------
   kodu_page_view                      analytics.js              page load
   kodu_request_access_started         script.js                 user focuses
                                                                 first form field
   kodu_request_access_submitted       script.js                 Worker returns
                                                                 { ok: true }
   kodu_sample_record_viewed           analytics.js              working-example
                                                                 hero in view
   kodu_transfer_section_viewed        analytics.js              #transfer in view
   kodu_vault_section_viewed           analytics.js              #vault in view
   kodu_blueprint_interaction          analytics.js              floor plan
                                                                 hover/focus
   kodu_cta_clicked                    analytics.js              any .btn click

   Each event payload is a plain object:
     { event, properties: {...}, ts (ISO), page (pathname) }
   Pixel-specific event mappings live in the per-pixel adapters below.
   ----------------------------------------------------------------------------
   FUTURE INTEGRATIONS
   ----------------------------------------------------------------------------
   To enable a pixel:
     1) Replace the empty string in PIXELS.<pixel>.id with the real ID.
     2) Deploy.
     3) When the user grants consent (via a future banner), pixels are loaded
        on-demand and the queued events are replayed.

   To add a new analytics system (e.g. PostHog, Plausible, Mixpanel):
     1) Add an adapter under "// --- Adapters ---" following the pattern.
     2) Add its ID/config slot to PIXELS.
     3) Add the adapter to ADAPTERS so it receives the consent flush.

   ----------------------------------------------------------------------------
   PRIVACY NOTES (for future privacy review)
   ----------------------------------------------------------------------------
   - No cookies are set by this file.
   - No fingerprinting.
   - No IP collection beyond what Cloudflare already sees at edge.
   - No localStorage usage (avoids GDPR/ePrivacy consent triggers).
   - No third-party scripts are loaded until consent is explicit.
   ============================================================================ */

(function () {
  'use strict';

  // ==========================================================================
  // 1. Pixel configuration — placeholders only. Replace IDs to enable.
  // ==========================================================================
  //
  // IMPORTANT: leaving these as empty strings is the correct unconfigured
  // state. The loader checks for a non-empty, non-placeholder value before
  // it will ever load a third-party script.
  //
  // Pre-launch convention: an empty string means "not yet configured —
  // do not load this pixel under any circumstances."
  //
  var PIXELS = {
    // Meta (Facebook) Pixel — https://www.facebook.com/business/help/952192354843755
    // TODO: paste your Meta Pixel ID here when ready (e.g. '1234567890123456').
    meta: { id: '' },

    // Google Ads — conversion ID looks like 'AW-1234567890'.
    // (Use Google Analytics 4 measurement ID 'G-XXXXXXXXXX' instead if you
    //  want GA4 page-view + event reporting in addition to Ads.)
    // TODO: paste your Google Ads / GA4 ID here when ready.
    google: { id: '' },

    // TikTok Pixel — https://ads.tiktok.com/marketing_api/docs?id=1739585702922241
    // TODO: paste your TikTok Pixel ID here when ready.
    tiktok: { id: '' },

    // LinkedIn Insight — Partner ID is a short numeric string.
    // https://business.linkedin.com/marketing-solutions/insight-tag
    // TODO: paste your LinkedIn Partner ID here when ready.
    linkedin: { id: '' },
  };

  // Per-event mappings for the standard pixel event vocabularies.
  // When the kodu_* event fires AND the pixel is configured AND consent is
  // granted, the adapter translates and forwards.
  var EVENT_MAP = {
    // Meta standard events: PageView, Lead, ViewContent, Contact, etc.
    meta: {
      kodu_page_view:                'PageView',
      kodu_request_access_started:   'InitiateCheckout',
      kodu_request_access_submitted: 'Lead',
      kodu_sample_record_viewed:     'ViewContent',
      kodu_transfer_section_viewed:  'ViewContent',
      kodu_vault_section_viewed:     'ViewContent',
      kodu_cta_clicked:              null, // not forwarded by default
      kodu_blueprint_interaction:    null,
    },
    // Google Ads / GA4 event names: page_view, generate_lead, etc.
    google: {
      kodu_page_view:                'page_view',
      kodu_request_access_started:   'begin_checkout',
      kodu_request_access_submitted: 'generate_lead',
      kodu_sample_record_viewed:     'view_item',
      kodu_transfer_section_viewed:  'view_item',
      kodu_vault_section_viewed:     'view_item',
      kodu_cta_clicked:              'select_content',
      kodu_blueprint_interaction:    null,
    },
    // TikTok event names: ViewContent, SubmitForm, etc.
    tiktok: {
      kodu_page_view:                null, // page-view is automatic for TikTok
      kodu_request_access_started:   'ClickButton',
      kodu_request_access_submitted: 'SubmitForm',
      kodu_sample_record_viewed:     'ViewContent',
      kodu_transfer_section_viewed:  'ViewContent',
      kodu_vault_section_viewed:     'ViewContent',
      kodu_cta_clicked:              'ClickButton',
      kodu_blueprint_interaction:    null,
    },
    // LinkedIn doesn't have a rich event vocabulary; conversions are tracked
    // by ID in the campaign manager. The adapter just notes pixel-fire moments.
    linkedin: {
      kodu_request_access_submitted: 'lead',
    },
  };

  // ==========================================================================
  // 2. Global data layer
  // ==========================================================================
  //
  // A plain array. Events are pushed here unconditionally. Anything reading
  // the data layer (a future tag manager, a debug console session, an analyst
  // tailing the page) can rely on it being populated regardless of consent.
  // Only the NETWORK fan-out is consent-gated, not the in-memory log.
  //
  window.koduDataLayer = window.koduDataLayer || [];

  // ==========================================================================
  // 3. Consent state
  // ==========================================================================
  //
  // Default to nothing granted. When a consent banner is added, it should call
  // `window.kodu.setConsent({ analytics: true, marketing: true })` once the
  // user has chosen — and the queue will flush.
  //
  // No persistence: the consent state lives only for this page load. When a
  // banner is added it will need to persist this decision (cookie or
  // localStorage); that decision should be made deliberately at banner-design
  // time, not assumed here.
  //
  var consent = { analytics: false, marketing: false };
  var pixelsLoaded = { meta: false, google: false, tiktok: false, linkedin: false };

  // ==========================================================================
  // 4. Public API — window.kodu
  // ==========================================================================
  var kodu = {
    /**
     * Emit a tracked event. Always safe to call.
     * @param {string} eventName  one of the kodu_* constants
     * @param {object} [properties]  optional event-specific properties
     */
    track: function (eventName, properties) {
      if (typeof eventName !== 'string' || !eventName) return;
      var payload = {
        event: eventName,
        properties: properties || {},
        ts: new Date().toISOString(),
        page: (window.location && window.location.pathname) || '',
      };
      window.koduDataLayer.push(payload);
      forwardToAdapters(payload);
    },

    /**
     * Update consent. Triggers pixel loading + queued-event flush.
     * @param {object} next  { analytics?: boolean, marketing?: boolean }
     */
    setConsent: function (next) {
      if (!next || typeof next !== 'object') return;
      var changed = false;
      if (typeof next.analytics === 'boolean' && next.analytics !== consent.analytics) {
        consent.analytics = next.analytics;
        changed = true;
      }
      if (typeof next.marketing === 'boolean' && next.marketing !== consent.marketing) {
        consent.marketing = next.marketing;
        changed = true;
      }
      if (!changed) return;
      loadPixelsForConsent();
      flushQueue();
    },

    /** Read the current in-memory consent state. */
    getConsent: function () {
      return { analytics: consent.analytics, marketing: consent.marketing };
    },

    /** Read the in-memory event log (useful for debugging in console). */
    getDataLayer: function () {
      return window.koduDataLayer.slice();
    },

    /**
     * For ad-hoc CTA tracking — attach to any element by adding
     * `data-track="cta_name"` in markup. The script.js layer wires this.
     */
    EVENTS: {
      PAGE_VIEW:                'kodu_page_view',
      REQUEST_ACCESS_STARTED:   'kodu_request_access_started',
      REQUEST_ACCESS_SUBMITTED: 'kodu_request_access_submitted',
      SAMPLE_RECORD_VIEWED:     'kodu_sample_record_viewed',
      TRANSFER_SECTION_VIEWED:  'kodu_transfer_section_viewed',
      VAULT_SECTION_VIEWED:     'kodu_vault_section_viewed',
      BLUEPRINT_INTERACTION:    'kodu_blueprint_interaction',
      CTA_CLICKED:              'kodu_cta_clicked',
    },
  };

  window.kodu = kodu;

  // ==========================================================================
  // 5. Adapters — one per third-party pixel.
  // ==========================================================================
  //
  // Each adapter has:
  //   .key       : key into PIXELS
  //   .needs     : 'analytics' | 'marketing' — which consent category gates it
  //   .load()    : lazily inject the third-party script tag
  //   .forward(payload) : translate + fire the event on the pixel
  //
  // Adapters never call .load() themselves; the consent layer calls .load()
  // once consent is granted AND a real ID is set. After .load(), .forward()
  // is called for any queued and future events.
  //
  var ADAPTERS = [
    {
      key: 'meta',
      needs: 'marketing',
      load: function () {
        // Standard Meta Pixel snippet (consent-gated). Loads fbevents.js
        // and initializes with the configured ID. No-op if ID not set.
        var id = PIXELS.meta.id;
        if (!id) return;
        // The official snippet, lightly trimmed.
        // eslint-disable-next-line
        !function (f, b, e, v, n, t, s) {
          if (f.fbq) return; n = f.fbq = function () {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
          };
          if (!f._fbq) f._fbq = n;
          n.push = n; n.loaded = !0; n.version = '2.0';
          n.queue = []; t = b.createElement(e); t.async = !0;
          t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
        }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
        window.fbq('init', id);
        // Note: PageView is sent explicitly via the kodu_page_view forward.
      },
      forward: function (payload) {
        if (!window.fbq) return;
        var mapped = (EVENT_MAP.meta || {})[payload.event];
        if (!mapped) return;
        window.fbq('track', mapped);
      },
    },

    {
      key: 'google',
      needs: 'analytics',
      load: function () {
        var id = PIXELS.google.id;
        if (!id) return;
        // Loads gtag.js with the configured ID.
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
        document.head.appendChild(s);
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', id, { send_page_view: false });
        // We send page_view ourselves via the forward layer so it stays in
        // step with kodu_page_view.
      },
      forward: function (payload) {
        if (!window.gtag) return;
        var mapped = (EVENT_MAP.google || {})[payload.event];
        if (!mapped) return;
        window.gtag('event', mapped, payload.properties || {});
      },
    },

    {
      key: 'tiktok',
      needs: 'marketing',
      load: function () {
        var id = PIXELS.tiktok.id;
        if (!id) return;
        // Standard TikTok Pixel snippet (consent-gated).
        // eslint-disable-next-line
        !function (w, d, t) {
          w.TiktokAnalyticsObject = t;
          var ttq = w[t] = w[t] || [];
          ttq.methods = ['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie'];
          ttq.setAndDefer = function (a, b) { a[b] = function () { a.push([b].concat(Array.prototype.slice.call(arguments, 0))); }; };
          for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
          ttq.instance = function (a) {
            var b = ttq._i[a] || [];
            for (var c = 0; c < ttq.methods.length; c++) ttq.setAndDefer(b, ttq.methods[c]);
            return b;
          };
          ttq.load = function (a, b) {
            var c = 'https://analytics.tiktok.com/i18n/pixel/events.js';
            ttq._i = ttq._i || {}; ttq._i[a] = []; ttq._i[a]._u = c;
            ttq._t = ttq._t || {}; ttq._t[a] = +new Date();
            ttq._o = ttq._o || {}; ttq._o[a] = b || {};
            var e = document.createElement('script'); e.type = 'text/javascript'; e.async = !0; e.src = c + '?sdkid=' + a + '&lib=' + t;
            var f = document.getElementsByTagName('script')[0]; f.parentNode.insertBefore(e, f);
          };
          ttq.load(id);
        }(window, document, 'ttq');
      },
      forward: function (payload) {
        if (!window.ttq) return;
        var mapped = (EVENT_MAP.tiktok || {})[payload.event];
        if (!mapped) return;
        window.ttq.track(mapped, payload.properties || {});
      },
    },

    {
      key: 'linkedin',
      needs: 'marketing',
      load: function () {
        var id = PIXELS.linkedin.id;
        if (!id) return;
        window._linkedin_partner_id = id;
        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
        window._linkedin_data_partner_ids.push(id);
        // eslint-disable-next-line
        (function (l) {
          if (!l) { window.lintrk = function (a, b) { window.lintrk.q.push([a, b]); }; window.lintrk.q = []; }
          var s = document.getElementsByTagName('script')[0];
          var b = document.createElement('script');
          b.type = 'text/javascript'; b.async = true;
          b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
          s.parentNode.insertBefore(b, s);
        })(window.lintrk);
      },
      forward: function (payload) {
        if (!window.lintrk) return;
        var mapped = (EVENT_MAP.linkedin || {})[payload.event];
        if (!mapped) return;
        // LinkedIn's track() takes a numeric conversion ID; the EVENT_MAP
        // entry above is a placeholder. Replace with real IDs in PIXELS
        // when the conversions are configured in Campaign Manager.
        window.lintrk('track', { conversion_id: mapped });
      },
    },
  ];

  // ==========================================================================
  // 6. Internal: forward, load, flush
  // ==========================================================================

  function forwardToAdapters(payload) {
    for (var i = 0; i < ADAPTERS.length; i++) {
      var a = ADAPTERS[i];
      if (!consent[a.needs]) continue;
      if (!PIXELS[a.key].id) continue;
      if (!pixelsLoaded[a.key]) continue;
      try { a.forward(payload); }
      catch (err) { /* never let an adapter break the page */ }
    }
  }

  function loadPixelsForConsent() {
    for (var i = 0; i < ADAPTERS.length; i++) {
      var a = ADAPTERS[i];
      if (pixelsLoaded[a.key]) continue;
      if (!consent[a.needs]) continue;
      if (!PIXELS[a.key].id) continue;
      try { a.load(); pixelsLoaded[a.key] = true; }
      catch (err) { /* swallow: never break the page over a pixel */ }
    }
  }

  function flushQueue() {
    // Replay every queued event through the adapters. Adapters that were
    // already firing will get the events they missed; adapters that just
    // loaded will catch up to the current state.
    var snapshot = window.koduDataLayer.slice();
    for (var i = 0; i < snapshot.length; i++) {
      forwardToAdapters(snapshot[i]);
    }
  }

  // ==========================================================================
  // 7. Auto-fired events: page view, section in-view, sample-record viewed,
  //    CTA clicks, blueprint interaction
  // ==========================================================================

  function firePageView() {
    var path = (window.location && window.location.pathname) || '';
    kodu.track(kodu.EVENTS.PAGE_VIEW, { path: path });

    // The working-example page IS the sample property record, so we treat
    // entering it as a sample-record view.
    if (/working-example\.html$/i.test(path) || path === '/working-example') {
      kodu.track(kodu.EVENTS.SAMPLE_RECORD_VIEWED);
    }
  }

  function bindSectionViewers() {
    if (!('IntersectionObserver' in window)) return;
    var targets = [
      { id: 'vault',    event: kodu.EVENTS.VAULT_SECTION_VIEWED },
      { id: 'transfer', event: kodu.EVENTS.TRANSFER_SECTION_VIEWED },
    ];
    var seen = {};
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (!e.isIntersecting) continue;
        var id = e.target.id;
        if (seen[id]) continue;
        for (var j = 0; j < targets.length; j++) {
          if (targets[j].id === id) {
            seen[id] = true;
            kodu.track(targets[j].event, { section: id });
            io.unobserve(e.target);
            break;
          }
        }
      }
    }, { threshold: 0.25 });

    for (var k = 0; k < targets.length; k++) {
      var el = document.getElementById(targets[k].id);
      if (el) io.observe(el);
    }
  }

  function bindCtaClicks() {
    // Any element with `data-track="..."` becomes a tracked CTA.
    // Also: any .btn-primary anywhere on the site auto-fires kodu_cta_clicked
    // with its label, since those are the named conversion paths.
    document.addEventListener('click', function (ev) {
      var el = ev.target;
      // Walk up to find the nearest button/link with track intent.
      while (el && el !== document.body) {
        var dt = el.getAttribute && el.getAttribute('data-track');
        var isPrimaryBtn = el.classList && el.classList.contains('btn-primary');
        if (dt) {
          kodu.track(kodu.EVENTS.CTA_CLICKED, {
            label: dt,
            href: el.getAttribute('href') || null,
          });
          return;
        }
        if (isPrimaryBtn) {
          kodu.track(kodu.EVENTS.CTA_CLICKED, {
            label: (el.textContent || '').trim().slice(0, 60),
            href: el.getAttribute('href') || null,
          });
          return;
        }
        el = el.parentElement;
      }
    }, true /* capture */);
  }

  function bindBlueprintInteraction() {
    // The floor plan is non-interactive in the static preview; we still want
    // to know when a homeowner pauses over it (signals genuine interest).
    // Fires at most once per page load.
    var fp = document.querySelector('.floorplan');
    if (!fp) return;
    var fired = false;
    function fire() {
      if (fired) return;
      fired = true;
      kodu.track(kodu.EVENTS.BLUEPRINT_INTERACTION);
      fp.removeEventListener('mouseenter', fire);
      fp.removeEventListener('focusin', fire);
      fp.removeEventListener('touchstart', fire);
    }
    fp.addEventListener('mouseenter', fire, { passive: true });
    fp.addEventListener('focusin', fire);
    fp.addEventListener('touchstart', fire, { passive: true });
  }

  // ==========================================================================
  // 8. Boot
  // ==========================================================================

  function boot() {
    firePageView();
    bindSectionViewers();
    bindCtaClicks();
    bindBlueprintInteraction();

    // TEMPORARY consent default (PRE-LAUNCH ONLY):
    //
    // Until a consent banner ships, we keep consent OFF by default. This means
    // events accumulate in `window.koduDataLayer` for in-session inspection
    // but no third-party pixel is contacted — which is the safe default and
    // matches Kodu's stated privacy posture.
    //
    // To enable analytics in a region where consent is not legally required
    // (or for internal testing), uncomment the line below. Do NOT enable
    // marketing-grade pixels (Meta/TikTok/LinkedIn) this way in EU/UK/CA
    // jurisdictions without an explicit banner.
    //
    // window.kodu.setConsent({ analytics: true, marketing: false });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
