/**
 * Kodu — pilot access request Worker
 * ====================================
 * Cloudflare Worker that accepts POST submissions from the Kodu marketing site
 * and inserts them into the Supabase table `public.pilot_access_requests`.
 *
 * Required environment variables (set via `wrangler secret put` or the
 * Cloudflare dashboard — never commit these to source):
 *
 *   SUPABASE_URL              e.g. https://abcdefghij.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY (server-only, never exposed to browsers)
 *   ALLOWED_ORIGIN            e.g. https://kodurecord.com
 *                             For local testing: http://localhost:8788
 *
 * Endpoints:
 *   POST /  — submit a pilot access request
 *   OPTIONS — CORS preflight
 *   any other method/path → 405 / 404
 */

const TABLE = 'pilot_access_requests';
const LANDING_PAGE_SOURCE = 'cloudflare_marketing_site';
const STATUS_PENDING = 'pending';

// Rate limit: max 3 submissions per IP in any rolling 5-minute window.
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_SECONDS = 300;

// Email validation: pragmatic, not RFC-perfect. Rejects obvious junk; lets
// real-world addresses through (including +aliases, subdomains, hyphens).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default {
  async fetch(request, env, _ctx) {
    const origin = request.headers.get('Origin') || '';
    const allowedOrigin = env.ALLOWED_ORIGIN || '';
    const corsOrigin = origin && origin === allowedOrigin ? origin : '';

    // Preflight
    if (request.method === 'OPTIONS') {
      return preflight(corsOrigin);
    }

    if (request.method !== 'POST') {
      return jsonResponse({ ok: false, error: 'method_not_allowed' }, 405, corsOrigin);
    }

    // Parse body
    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ ok: false, error: 'invalid_json' }, 400, corsOrigin);
    }

    // Validate required fields
    const validation = validateInput(body);
    if (!validation.ok) {
      return jsonResponse({ ok: false, error: validation.error }, 400, corsOrigin);
    }

    const {
      full_name,
      email,
      property_city_state,
      homeowner_status,
      interest_reason,
      notes_text,
    } = validation.fields;

    // Capture metadata
    const ip = request.headers.get('CF-Connecting-IP') || '';
    const userAgent = request.headers.get('User-Agent') || '';

    // Environment check
    if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
      // Don't leak which env var is missing in the response.
      console.error('Worker misconfigured: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing.');
      return jsonResponse({ ok: false, error: 'server_misconfigured' }, 500, corsOrigin);
    }

    // Rate limit (only if we have an IP to key on)
    if (ip) {
      const limited = await isRateLimited(env, ip);
      if (limited) {
        return jsonResponse({ ok: false, error: 'rate_limited' }, 429, corsOrigin);
      }
    }

    // Compose the notes blob — multi-line readable text, key: value.
    const notesPayload = composeNotes({
      property_city_state,
      homeowner_status,
      interest_reason,
      notes_text,
    });

    // Check for existing record by email (case-insensitive).
    let existing;
    try {
      existing = await findByEmail(env, email);
    } catch (err) {
      console.error('Supabase lookup failed:', err);
      return jsonResponse({ ok: false, error: 'upstream_error' }, 502, corsOrigin);
    }

    try {
      if (!existing) {
        // New request — insert.
        await insertRequest(env, {
          email,
          full_name,
          landing_page_source: LANDING_PAGE_SOURCE,
          status: STATUS_PENDING,
          user_agent: userAgent || null,
          ip: ip || null,
          notes: notesPayload,
        });
      } else if (existing.status === STATUS_PENDING) {
        // Pending duplicate — refresh notes with the most recent context so the
        // reviewer sees the latest information the homeowner provided. Do NOT
        // overwrite approved/declined/invited records.
        await updateNotes(env, existing.id, notesPayload);
      }
      // If status is anything other than `pending` (approved, declined, etc.),
      // return calm success and leave the existing row untouched.

      return jsonResponse({ ok: true }, 200, corsOrigin);
    } catch (err) {
      console.error('Supabase write failed:', err);
      return jsonResponse({ ok: false, error: 'upstream_error' }, 502, corsOrigin);
    }
  },
};

// ============================================================================
// Validation
// ============================================================================

function validateInput(body) {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'invalid_payload' };
  }

  const full_name = trimStr(body.full_name);
  const email = trimStr(body.email).toLowerCase();
  const property_city_state = trimStr(body.property_city_state);
  const homeowner_status = trimStr(body.homeowner_status);
  const interest_reason = trimStr(body.interest_reason);
  const notes_text = trimStr(body.notes);

  if (!full_name || full_name.length < 2 || full_name.length > 120) {
    return { ok: false, error: 'invalid_full_name' };
  }
  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return { ok: false, error: 'invalid_email' };
  }
  if (!property_city_state || property_city_state.length > 200) {
    return { ok: false, error: 'invalid_property_city_state' };
  }
  if (!homeowner_status || homeowner_status.length > 80) {
    return { ok: false, error: 'invalid_homeowner_status' };
  }
  if (!interest_reason || interest_reason.length > 80) {
    return { ok: false, error: 'invalid_interest_reason' };
  }
  if (notes_text.length > 2000) {
    return { ok: false, error: 'notes_too_long' };
  }

  return {
    ok: true,
    fields: {
      full_name,
      email,
      property_city_state,
      homeowner_status,
      interest_reason,
      notes_text,
    },
  };
}

function trimStr(v) {
  if (typeof v !== 'string') return '';
  return v.trim();
}

// ============================================================================
// Notes payload — readable multi-line text
// ============================================================================

function composeNotes({ property_city_state, homeowner_status, interest_reason, notes_text }) {
  const lines = [
    `Property city/state: ${property_city_state}`,
    `Homeowner status: ${homeowner_status}`,
    `What brought them to Kodu: ${interest_reason}`,
  ];
  if (notes_text) {
    lines.push('');
    lines.push('Message:');
    lines.push(notes_text);
  }
  return lines.join('\n');
}

// ============================================================================
// Supabase REST helpers
// ============================================================================

function supabaseHeaders(env) {
  return {
    'apikey': env.SUPABASE_SERVICE_ROLE_KEY,
    'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
    'Content-Type': 'application/json',
  };
}

async function findByEmail(env, email) {
  const url = new URL(`${env.SUPABASE_URL}/rest/v1/${TABLE}`);
  url.searchParams.set('select', 'id,status,notes');
  url.searchParams.set('email', `eq.${email}`);
  url.searchParams.set('limit', '1');

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: supabaseHeaders(env),
  });

  if (!res.ok) {
    throw new Error(`Supabase findByEmail failed: ${res.status} ${await safeText(res)}`);
  }

  const rows = await res.json();
  return Array.isArray(rows) && rows.length ? rows[0] : null;
}

async function insertRequest(env, row) {
  const url = `${env.SUPABASE_URL}/rest/v1/${TABLE}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      ...supabaseHeaders(env),
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    throw new Error(`Supabase insert failed: ${res.status} ${await safeText(res)}`);
  }
}

async function updateNotes(env, id, notesPayload) {
  const url = new URL(`${env.SUPABASE_URL}/rest/v1/${TABLE}`);
  url.searchParams.set('id', `eq.${id}`);

  const res = await fetch(url.toString(), {
    method: 'PATCH',
    headers: {
      ...supabaseHeaders(env),
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify({ notes: notesPayload }),
  });

  if (!res.ok) {
    throw new Error(`Supabase updateNotes failed: ${res.status} ${await safeText(res)}`);
  }
}

// ============================================================================
// Rate limit — Supabase-backed window check
// ============================================================================

async function isRateLimited(env, ip) {
  const sinceISO = new Date(Date.now() - RATE_LIMIT_WINDOW_SECONDS * 1000).toISOString();

  const url = new URL(`${env.SUPABASE_URL}/rest/v1/${TABLE}`);
  url.searchParams.set('select', 'id');
  url.searchParams.set('ip', `eq.${ip}`);
  url.searchParams.set('created_at', `gte.${sinceISO}`);
  url.searchParams.set('limit', String(RATE_LIMIT_MAX + 1));

  try {
    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        ...supabaseHeaders(env),
        // Use Prefer: count=exact would require parsing Content-Range; the row
        // count from the body is simpler and bounded by `limit`.
      },
    });

    if (!res.ok) {
      // If the rate-limit lookup itself fails, fail open rather than blocking
      // legitimate submissions.
      console.error('Rate limit lookup failed:', res.status, await safeText(res));
      return false;
    }

    const rows = await res.json();
    return Array.isArray(rows) && rows.length >= RATE_LIMIT_MAX;
  } catch (err) {
    console.error('Rate limit lookup threw:', err);
    return false;
  }
}

// ============================================================================
// Response helpers
// ============================================================================

function corsHeaders(corsOrigin) {
  const h = {};
  if (corsOrigin) {
    h['Access-Control-Allow-Origin'] = corsOrigin;
    h['Vary'] = 'Origin';
  }
  return h;
}

function preflight(corsOrigin) {
  if (!corsOrigin) {
    return new Response(null, { status: 403 });
  }
  return new Response(null, {
    status: 204,
    headers: {
      ...corsHeaders(corsOrigin),
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}

function jsonResponse(body, status, corsOrigin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...corsHeaders(corsOrigin),
    },
  });
}

async function safeText(res) {
  try {
    return await res.text();
  } catch {
    return '';
  }
}
