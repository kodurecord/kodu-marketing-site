/* ============================================
   Kodu Record — shared script
   Used by: index, working-example, request-access, confirmation
   ============================================ */

(function () {
  'use strict';

  // ----- Reveal-on-scroll -----
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });

    els.forEach(function (el) { io.observe(el); });
  }

  // ----- Hero is above the fold; reveal immediately -----
  function revealHero() {
    document.querySelectorAll('.hero .reveal, .we-hero .reveal, .form-page .reveal').forEach(function (el) {
      el.classList.add('in');
    });
  }

  // ----- Coverage bar animation (index hero) -----
  function initCoverageBar() {
    var bar = document.getElementById('coverage-bar');
    if (!bar) return;
    requestAnimationFrame(function () {
      bar.style.width = '52%';
    });
  }

  // ============================================================
  // Request-access form
  // ============================================================
  //
  // Submits to the Cloudflare Worker URL set on the form's
  // `data-endpoint` attribute. On success → confirmation.html.
  // On failure → inline notice with a real message. No fake states.
  // ============================================================

  function initRequestForm() {
    var form = document.getElementById('request-access-form');
    if (!form) return;

    var noticeEl = document.getElementById('form-notice');
    var noticeTextEl = document.getElementById('form-notice-text');
    var submitBtn = document.getElementById('form-submit');

    // Fire kodu_request_access_started once, when the homeowner first
    // engages with the form. We use the 'focusin' event so it counts whether
    // they tab in or click in. Tracked via the centralized layer; if kodu
    // isn't loaded for any reason, this is a no-op.
    var startedFired = false;
    form.addEventListener('focusin', function () {
      if (startedFired) return;
      startedFired = true;
      if (window.kodu && typeof window.kodu.track === 'function') {
        window.kodu.track(window.kodu.EVENTS.REQUEST_ACCESS_STARTED);
      }
    }, { once: false });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      hideNotice();

      var endpoint = (form.getAttribute('data-endpoint') || '').trim();

      // Guard against the unconfigured placeholder. This is what protects
      // against silently dropping submissions before the Worker is wired.
      if (!endpoint || /CHANGE-ME/i.test(endpoint) || !/^https:\/\//.test(endpoint)) {
        showNotice(
          'This form isn\u2019t connected yet. Please email ' +
          '<a href="mailto:hello@kodurecord.com">hello@kodurecord.com</a> ' +
          'and we\u2019ll get you set up directly.'
        );
        return;
      }

      var payload = collectPayload(form);

      // Client-side guard against the most obvious empties before we round-trip.
      var clientError = clientValidate(payload);
      if (clientError) {
        showNotice(clientError);
        return;
      }

      setSubmitting(true);

      fetch(endpoint, {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
            // Fire the conversion event before the redirect. The data layer
            // persists across the navigation only insofar as a pixel has
            // already received the call — events queued without a pixel
            // configured will be lost at navigation, which is the correct
            // behavior (no client-side persistence without consent).
            if (window.kodu && typeof window.kodu.track === 'function') {
              window.kodu.track(window.kodu.EVENTS.REQUEST_ACCESS_SUBMITTED);
            }
            // Success — redirect. Browser will replace this page.
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
        notes:               getStr(fd, 'notes'),
      };
    }

    function getStr(fd, key) {
      var v = fd.get(key);
      return typeof v === 'string' ? v.trim() : '';
    }

    function clientValidate(p) {
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
      // 500, 502, or anything else
      return 'Something went wrong on our end. Please try again shortly, or email ' +
        '<a href="mailto:hello@kodurecord.com">hello@kodurecord.com</a>.';
    }

    function setSubmitting(on) {
      if (!submitBtn) return;
      if (on) {
        submitBtn.disabled = true;
        submitBtn.dataset.originalText = submitBtn.dataset.originalText || submitBtn.textContent;
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
      noticeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function hideNotice() {
      if (!noticeEl) return;
      noticeEl.hidden = true;
    }
  }

  // ----- Init -----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
    document.addEventListener('DOMContentLoaded', initRequestForm);
  } else {
    initReveal();
    initRequestForm();
  }

  window.addEventListener('load', function () {
    revealHero();
    initCoverageBar();
  });
})();
