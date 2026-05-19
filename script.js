/* ============================================
   Kodu Record — shared script
   Used by: index, working-example, request-access, confirmation
   ============================================ */

(function () {
  'use strict';

  // -----------------------------------------------------------------
  // 1. Reveal-on-scroll
  //    Observes every .reveal element. Adds .visible when in viewport.
  //    Delay classes (.reveal-d1, .reveal-d2, .reveal-d3) are handled
  //    by styles.css transitions; this script only toggles visibility.
  //    If IntersectionObserver is unavailable, mark all visible
  //    immediately so no content is hidden by failure mode.
  // -----------------------------------------------------------------
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      forEach(els, function (el) {
        el.classList.add('visible');
        el.classList.add('in'); // legacy in case styles.css uses .in
      });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      forEach(entries, function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.classList.add('in'); // legacy in case styles.css uses .in
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });

    forEach(els, function (el) { io.observe(el); });
  }

  // Hero is above the fold on every page that has one — reveal
  // immediately on load so it never appears blank to the reader.
  function revealHero() {
    forEach(
      document.querySelectorAll('.hero .reveal, .we-hero .reveal, .form-page .reveal, .confirm-page .reveal'),
      function (el) {
        el.classList.add('visible');
        el.classList.add('in');
      }
    );
  }

  // -----------------------------------------------------------------
  // 2. Homepage coverage bar
  //    If #coverage-bar exists (index.html only), animate it to its
  //    target width. The element has width: 0% in styles.css and
  //    transitions on width over 1.4s — the animation is purely
  //    CSS-driven. We only set the target width.
  //    If the element doesn't exist, no-op.
  // -----------------------------------------------------------------
  function initCoverageBar() {
    var bar = document.getElementById('coverage-bar');
    if (!bar) return;

    // Defer to the next frame so the browser has time to compute
    // the initial 0% width before transitioning to the target.
    requestAnimationFrame(function () {
      bar.style.width = '52%';
    });
  }

  // -----------------------------------------------------------------
  // 3. Request-access form
  //    Submits to the Cloudflare Worker URL on data-endpoint.
  //    On success → confirmation.html. On failure → inline notice.
  //
  //    Wiring guards (in priority order):
  //      a. Form not present → no-op.
  //      b. data-wired="false" → block, show calm notice, no POST.
  //      c. Endpoint missing or contains CHANGE-ME → block, show notice.
  //      d. Otherwise → POST JSON, await response, branch on result.
  // -----------------------------------------------------------------
  function initRequestForm() {
    var form = document.getElementById('request-access-form');
    if (!form) return;

    var noticeEl = document.getElementById('form-notice');
    var noticeTextEl = document.getElementById('form-notice-text');
    var submitBtn = document.getElementById('form-submit');

    // Fire request-access-started once when the homeowner first
    // engages with the form (tab or click). No-op if analytics
    // is not loaded.
    var startedFired = false;
    form.addEventListener('focusin', function () {
      if (startedFired) return;
      startedFired = true;
      track('request_access_started');
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      hideNotice();

      var wiredAttr = form.getAttribute('data-wired');
      var endpoint = (form.getAttribute('data-endpoint') || '').trim();

      // Explicit kill switch — overrides everything else.
      if (wiredAttr === 'false') {
        showNotice(
          'The request form is paused for maintenance. Please email ' +
          '<a href="mailto:hello@kodurecord.com">hello@kodurecord.com</a> ' +
          'and we\u2019ll respond directly.'
        );
        return;
      }

      // Endpoint guard — protects against silent drops before the
      // Worker is wired up.
      if (!endpoint || /CHANGE-ME/i.test(endpoint) || !/^https:\/\//.test(endpoint)) {
        showNotice(
          'This form isn\u2019t connected yet. Please email ' +
          '<a href="mailto:hello@kodurecord.com">hello@kodurecord.com</a> ' +
          'and we\u2019ll get you set up directly.'
        );
        return;
      }

      var payload = collectPayload(form);
      var clientError = validatePayload(payload);
      if (clientError) {
        showNotice(clientError);
        return;
      }

      setSubmitting(true);

      var endpointUrl = endpoint;

      fetch(endpointUrl, {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          return res.json().catch(function () {
            return { ok: false, error: 'invalid_response' };
          }).then(function (body) {
            return { status: res.status, body: body };
          });
        })
        .then(function (result) {
          if (result.status === 200 && result.body && result.body.ok === true) {
            // Fire the conversion event before navigating away.
            track('request_access_submitted');
            window.location.href = 'confirmation.html';
            return;
          }
          setSubmitting(false);
          showNotice(messageForError(result.status, result.body && result.body.error));
        })
        .catch(function () {
          setSubmitting(false);
          showNotice(
            'We couldn\u2019t reach the server. Please check your connection ' +
            'and try again, or email ' +
            '<a href="mailto:hello@kodurecord.com">hello@kodurecord.com</a>.'
          );
        });
    });

    function collectPayload(formEl) {
      var fd = new FormData(formEl);
      return {
        full_name:           getStr(fd, 'full_name'),
        email:               getStr(fd, 'email'),
        property_city_state: getStr(fd, 'property_city_state'),
        homeowner_status:    getStr(fd, 'homeowner_status'),
        interest_reason:     getStr(fd, 'interest_reason'),
        notes:               getStr(fd, 'notes')
      };
    }

    function getStr(fd, key) {
      var v = fd.get(key);
      return typeof v === 'string' ? v.trim() : '';
    }

    function validatePayload(p) {
      if (!p.full_name || p.full_name.length < 2) {
        return 'Please enter your full name.';
      }
      if (!p.email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(p.email)) {
        return 'Please enter a valid email address.';
      }
      if (!p.property_city_state) {
        return 'Please enter the city and state of your property.';
      }
      if (!p.homeowner_status) {
        return 'Please choose a homeowner status.';
      }
      if (!p.interest_reason) {
        return 'Please tell us what brought you to Kodu.';
      }
      return null;
    }

    function messageForError(status, code) {
      if (status === 429 || code === 'rate_limited') {
        return 'You\u2019ve submitted a few requests in a short period. Please wait a few minutes and try again.';
      }
      if (status === 400 || (code && code.indexOf('invalid_') === 0)) {
        return 'Some of the information looks incomplete. Please review the form and try again.';
      }
      return 'Something went wrong on our end. Please try again shortly, or email ' +
        '<a href="mailto:hello@kodurecord.com">hello@kodurecord.com</a>.';
    }

    function setSubmitting(on) {
      if (!submitBtn) return;
      if (on) {
        submitBtn.disabled = true;
        if (!submitBtn.dataset.originalText) {
          submitBtn.dataset.originalText = submitBtn.textContent;
        }
        submitBtn.textContent = 'Sending\u2026';
        submitBtn.style.opacity = '0.7';
        submitBtn.style.cursor = 'wait';
      } else {
        submitBtn.disabled = false;
        if (submitBtn.dataset.originalText) {
          submitBtn.textContent = submitBtn.dataset.originalText;
        }
        submitBtn.style.opacity = '';
        submitBtn.style.cursor = '';
      }
    }

    function showNotice(html) {
      if (!noticeEl || !noticeTextEl) return;
      noticeTextEl.innerHTML = html;
      noticeEl.hidden = false;
      try {
        noticeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } catch (_e) { /* older browsers: silent */ }
    }

    function hideNotice() {
      if (!noticeEl) return;
      noticeEl.hidden = true;
    }
  }

  // -----------------------------------------------------------------
  // 4. Analytics — soft hooks to window.koduTrack
  //    If analytics.js exposes window.koduTrack (or the legacy
  //    window.kodu.track shape), forward our four events to it.
  //    If neither is present, every call is a silent no-op — the
  //    page never breaks because analytics is unavailable.
  // -----------------------------------------------------------------
  function track(eventName, props) {
    try {
      if (typeof window.koduTrack === 'function') {
        window.koduTrack(eventName, props || {});
        return;
      }
      if (window.kodu && typeof window.kodu.track === 'function') {
        window.kodu.track(eventName, props || {});
        return;
      }
    } catch (_err) {
      /* analytics must never break the page */
    }
  }

  // Page-view fires once per load, after the document has loaded
  // enough to know its title and pathname.
  function trackPageView() {
    track('page_view', {
      path: (window.location && window.location.pathname) || '',
      title: document.title || ''
    });
  }

  // Delegated CTA click handler — any anchor with the .btn class
  // counts as a CTA. We pass label + href so analytics.js can
  // attribute clicks without us hard-coding any specific button.
  function initCtaTracking() {
    document.addEventListener('click', function (e) {
      var el = e.target;
      while (el && el !== document.body) {
        if (el.tagName === 'A' && el.classList && el.classList.contains('btn')) {
          var label = (el.textContent || '').trim().replace(/\s+/g, ' ');
          var href = el.getAttribute('href') || '';
          track('cta_click', { label: label, href: href });
          return;
        }
        el = el.parentNode;
      }
    }, true);
  }

  // -----------------------------------------------------------------
  // Helpers
  // -----------------------------------------------------------------
  function forEach(list, fn) {
    for (var i = 0; i < list.length; i++) fn(list[i], i);
  }

  // -----------------------------------------------------------------
  // Init
  // -----------------------------------------------------------------
  function onReady() {
    initReveal();
    initRequestForm();
    initCtaTracking();
    trackPageView();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }

  window.addEventListener('load', function () {
    revealHero();
    initCoverageBar();
  });
})();