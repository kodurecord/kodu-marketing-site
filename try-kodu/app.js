// ── try-kodu/app.js ───────────────────────────────────────────────────────────
//
// The interactive public demo, in plain JavaScript. No React, no Next, no npm,
// no build, no Supabase, no auth. ES modules only.
//
// Mirrors the real Kodu chrome and Vault grammar:
//   • Top nav: Overview · Vault · Systems · Projects · Timeline · Guidance
//   • Vault is blueprint-first with layer sub-tabs
//   • blueprint organizes · vault stores the evidence ·
//     timeline tells the story · guidance explains what matters
// ─────────────────────────────────────────────────────────────────────────────

import {
  SAMPLE_PROPERTY, SAMPLE_RECORDS, SAMPLE_SYSTEMS, SAMPLE_PROJECTS,
  SAMPLE_TIMELINE, SAMPLE_GUIDANCE, VAULT_LAYERS, FLOOR_ZONES, SITE_ZONES,
  RECORD_COUNT, SYSTEM_COUNT, PROJECT_COUNT, TIMELINE_COUNT, recordById,
} from './sample-data.js'

// ── Evidence imagery (inlined; no separate module) ───────────────────────────
// ── try-kodu/sample-images.js ────────────────────────────────────────────────
//
// Synthetic "evidence" imagery for the public Try Kodu sample record.
// Vanilla ES module — no React, no build. Each function returns an SVG markup
// string. Every artifact is clearly a fictional SAMPLE and contains no real
// data: synthetic documents (invoice / warranty / permit / survey / receipt /
// insurance / checklist), label plates, and flat photo-style scenes.
//
// Flat fills only (no gradients / no shared SVG ids) so any number of these can
// render on one page without id collisions. Colors track the Kodu palette, with
// a few natural tones reserved for photo-style scenes.
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  ink: '#1B2A3B', sub: '#6B7A8D', faint: '#AEB9C6', line: '#D7DEE6',
  paper: '#FCFCFA', paper2: '#F0F1EC', accent: '#2D7DD2', accentSoft: '#DCEBFA',
  surface: '#ECEFF3', metal: '#AEB6BF', metalDark: '#727C87', metalLight: '#C9D0D8',
  concrete: '#CDD1D6', sky: '#CBDDEE', grass: '#A4BC8B', grassDark: '#8AA673',
  soil: '#A07C56', soilDark: '#7C5E3E', gravel: '#BCC0C5', wood: '#C39A65',
  woodDark: '#946E40', woodWorn: '#A7A293', shingle: '#7E8893', shingleDark: '#67707A',
  red: '#C0584F', green: '#3E9E6E', copper: '#BC7A43', amber: '#D8A24A',
  cream: '#EDE7DA', white: '#FFFFFF',
}

const DOC_KINDS = [
  'doc-invoice', 'doc-receipt', 'doc-warranty', 'doc-permit',
  'doc-survey', 'doc-insurance', 'doc-checklist',
]

function isDocKind(kind) {
  return DOC_KINDS.includes(kind)
}

function bar(x, y, w, h, c, r = 1.5) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${c}" />`
}

// ── Documents ─────────────────────────────────────────────────────────────────

const DOC_CONFIG = {
  'doc-invoice': { label: 'INVOICE', accent: C.accent, body: 'table' },
  'doc-receipt': { label: 'RECEIPT', accent: C.green, body: 'receipt' },
  'doc-warranty': { label: 'WARRANTY', accent: C.copper, body: 'seal' },
  'doc-permit': { label: 'BUILDING PERMIT', accent: '#3E6E9E', body: 'permit' },
  'doc-survey': { label: 'PLAT OF SURVEY', accent: '#5B6B7B', body: 'plot' },
  'doc-insurance': { label: 'POLICY · RESERVED', accent: C.sub, body: 'placeholder' },
  'doc-checklist': { label: 'MAINTENANCE CHECKLIST', accent: C.accent, body: 'checks' },
}

function docBodyContent(body, accent) {
  switch (body) {
    case 'table': {
      let s = ''
      for (let i = 0; i < 4; i++) {
        s += bar(122, 104 + i * 20, 96, 6, C.line) + bar(236, 104 + i * 20, 44, 6, C.faint)
      }
      s += `<line x1="122" y1="192" x2="282" y2="192" stroke="${C.line}" stroke-width="1" />`
      s += bar(122, 202, 60, 8, C.sub)
      s += `<rect x="224" y="199" width="58" height="16" rx="3" fill="${accent}" opacity="0.16" />`
      s += bar(232, 204, 42, 7, accent)
      s += `<text x="122" y="236" font-size="9" font-weight="700" fill="${C.sub}" letter-spacing="0.5">TOTAL</text>`
      return s
    }
    case 'receipt': {
      let s = ''
      for (let i = 0; i < 5; i++) {
        s += bar(132, 102 + i * 16, 78, 5, C.line) + bar(234, 102 + i * 16, 30, 5, C.faint)
      }
      s += `<line x1="132" y1="188" x2="264" y2="188" stroke="${C.line}" stroke-width="1" stroke-dasharray="3 3" />`
      s += bar(132, 198, 50, 7, C.sub) + bar(224, 198, 40, 7, C.green)
      s += '<g transform="translate(198 232)">'
      for (let i = 0; i < 9; i++) {
        s += `<rect x="${i * 7}" y="0" width="${i % 2 ? 2 : 4}" height="20" fill="${C.ink}" />`
      }
      s += '</g>'
      return s
    }
    case 'seal': {
      let s = ''
      for (let i = 0; i < 4; i++) s += bar(122, 104 + i * 16, i === 3 ? 96 : 150, 6, C.line)
      s += bar(122, 176, 120, 6, C.line) + bar(122, 190, 88, 6, C.line)
      s += `<circle cx="250" cy="222" r="26" fill="none" stroke="${accent}" stroke-width="2" opacity="0.7" />`
      s += `<circle cx="250" cy="222" r="20" fill="none" stroke="${accent}" stroke-width="1" opacity="0.5" />`
      s += `<path d="M240 222l7 7 14-15" fill="none" stroke="${accent}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />`
      return s
    }
    case 'permit': {
      let s = `<rect x="120" y="98" width="162" height="20" rx="2" fill="${accent}" opacity="0.12" />`
      s += bar(126, 105, 70, 7, accent)
      for (let i = 0; i < 4; i++) {
        s += bar(122, 130 + i * 16, 40, 6, C.faint) + bar(172, 130 + i * 16, 86, 6, C.line)
      }
      s += `<circle cx="246" cy="216" r="24" fill="none" stroke="${C.red}" stroke-width="2" opacity="0.55" transform="rotate(-12 246 216)" />`
      s += `<rect x="228" y="209" width="36" height="14" fill="${C.red}" opacity="0.1" transform="rotate(-12 246 216)" />`
      s += `<path d="M236 216l6 6 12-13" fill="none" stroke="${C.red}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.7" />`
      return s
    }
    case 'plot': {
      let s = `<rect x="130" y="104" width="140" height="104" fill="none" stroke="${C.sub}" stroke-width="1.5" />`
      s += `<rect x="160" y="130" width="78" height="56" fill="${accent}" opacity="0.12" stroke="${accent}" stroke-width="1" />`
      s += `<line x1="130" y1="150" x2="160" y2="150" stroke="${C.faint}" stroke-width="1" stroke-dasharray="2 2" />`
      s += `<line x1="238" y1="150" x2="270" y2="150" stroke="${C.faint}" stroke-width="1" stroke-dasharray="2 2" />`
      s += `<line x1="130" y1="216" x2="270" y2="216" stroke="${C.sub}" stroke-width="1" />`
      s += `<line x1="130" y1="213" x2="130" y2="219" stroke="${C.sub}" stroke-width="1" />`
      s += `<line x1="270" y1="213" x2="270" y2="219" stroke="${C.sub}" stroke-width="1" />`
      s += bar(150, 230, 100, 6, C.line)
      s += `<path d="M256 96l4 10h-8z" fill="${C.sub}" />`
      return s
    }
    case 'placeholder': {
      let s = `<rect x="132" y="120" width="136" height="86" rx="6" fill="none" stroke="${C.faint}" stroke-width="1.6" stroke-dasharray="5 4" />`
      s += `<circle cx="200" cy="150" r="13" fill="none" stroke="${C.accent}" stroke-width="1.6" />`
      s += `<path d="M200 144v12M194 150h12" stroke="${C.accent}" stroke-width="1.6" stroke-linecap="round" />`
      s += bar(166, 174, 68, 6, C.line) + bar(176, 186, 48, 5, C.faint)
      s += `<text x="200" y="232" font-size="9" font-weight="600" fill="${C.sub}" text-anchor="middle">Reserved — add your policy</text>`
      return s
    }
    case 'checks': {
      let s = ''
      for (let i = 0; i < 6; i++) {
        s += `<rect x="122" y="${104 + i * 22}" width="11" height="11" rx="2" fill="none" stroke="${C.faint}" stroke-width="1.4" />`
        if (i < 4) {
          s += `<path d="M124 ${110 + i * 22}l3 3 5-6" fill="none" stroke="${accent}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />`
        }
        s += bar(142, 107 + i * 22, i % 2 ? 96 : 122, 6, C.line)
      }
      return s
    }
    default:
      return ''
  }
}

function docScene(kind) {
  const cfg = DOC_CONFIG[kind] || DOC_CONFIG['doc-invoice']
  return `
    <rect x="0" y="0" width="400" height="300" fill="#E9ECF1" />
    <rect x="0" y="248" width="400" height="52" fill="#DFE4EA" />
    <g transform="rotate(-0.8 200 150)">
      <rect x="104" y="34" width="192" height="234" rx="3" fill="#00000012" transform="translate(3 5)" />
      <rect x="102" y="32" width="192" height="234" rx="3" fill="${C.paper}" stroke="${C.line}" stroke-width="1" />
      <rect x="102" y="32" width="192" height="3" rx="3" fill="#FFFFFF" opacity="0.85" />
      <rect x="102" y="32" width="192" height="36" rx="3" fill="${cfg.accent}" opacity="0.10" />
      <line x1="102" y1="68" x2="294" y2="68" stroke="${cfg.accent}" stroke-width="1" opacity="0.25" />
      <rect x="114" y="42" width="16" height="16" rx="3" fill="${cfg.accent}" opacity="0.85" />
      <text x="138" y="54" font-size="10" font-weight="700" fill="${cfg.accent}" letter-spacing="0.4">${cfg.label}</text>
      ${bar(114, 76, 92, 5, C.faint)}
      ${bar(114, 86, 60, 5, C.line)}
      ${docBodyContent(cfg.body, cfg.accent)}
      <text x="198" y="172" font-size="30" font-weight="800" fill="${C.ink}" opacity="0.04" text-anchor="middle" transform="rotate(-16 198 172)" letter-spacing="2">SAMPLE</text>
    </g>`
}

// ── Photo-style scenes ────────────────────────────────────────────────────────

function wall(tone = C.surface) {
  let lines = ''
  for (const y of [60, 120, 180, 240]) {
    lines += `<line x1="0" y1="${y}" x2="400" y2="${y}" stroke="#00000008" stroke-width="6" />`
  }
  return `<rect x="0" y="0" width="400" height="300" fill="${tone}" />${lines}`
}

function sceneHVAC() {
  let fan = ''
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2
    fan += `<line x1="${200 + Math.cos(a) * 12}" y1="${150 + Math.sin(a) * 12}" x2="${200 + Math.cos(a) * 50}" y2="${150 + Math.sin(a) * 50}" stroke="#7B838C" stroke-width="2" />`
  }
  let fins = ''
  for (let i = 0; i < 14; i++) fins += `<line x1="${130 + i * 3}" y1="200" x2="${130 + i * 3}" y2="238" stroke="#8A929B" stroke-width="1" />`
  for (let i = 0; i < 14; i++) fins += `<line x1="${228 + i * 3}" y1="200" x2="${228 + i * 3}" y2="238" stroke="#8A929B" stroke-width="1" />`
  return `
    ${wall('#DDE3EA')}
    <rect x="0" y="232" width="400" height="68" fill="${C.concrete}" />
    <rect x="86" y="236" width="228" height="14" fill="#B7BCC2" />
    <ellipse cx="200" cy="250" rx="120" ry="10" fill="#00000012" />
    <rect x="120" y="96" width="160" height="150" rx="8" fill="${C.metal}" stroke="${C.metalDark}" stroke-width="2" />
    <rect x="120" y="96" width="160" height="150" rx="8" fill="#FFFFFF" opacity="0.06" />
    <circle cx="200" cy="150" r="52" fill="#5B636C" />
    <circle cx="200" cy="150" r="52" fill="none" stroke="${C.metalDark}" stroke-width="3" />
    ${fan}
    <circle cx="200" cy="150" r="11" fill="${C.metalLight}" stroke="${C.metalDark}" stroke-width="2" />
    ${fins}
    <rect x="176" y="206" width="48" height="20" rx="2" fill="${C.metalLight}" stroke="${C.metalDark}" stroke-width="1" />
    <path d="M280 130c26 0 26 30 40 30" fill="none" stroke="${C.copper}" stroke-width="5" stroke-linecap="round" />
    <path d="M280 142c20 0 20 26 40 26" fill="none" stroke="${C.copper}" stroke-width="5" stroke-linecap="round" opacity="0.7" />`
}

function scenePlate() {
  let bars = ''
  for (let i = 0; i < 22; i++) bars += `<rect x="${i * 5}" y="0" width="${i % 3 ? 1.6 : 3}" height="26" fill="${C.ink}" />`
  let rows = ''
  for (let i = 0; i < 4; i++) rows += bar(120, 146 + i * 18, 48, 6, C.metalDark) + bar(180, 146 + i * 18, 110, 6, '#8C949D')
  let screws = ''
  for (const [cx, cy] of [[116, 76], [300, 76], [116, 224], [300, 224]]) {
    screws += `<circle cx="${cx}" cy="${cy}" r="3" fill="${C.metalDark}" />`
  }
  return `
    <rect x="0" y="0" width="400" height="300" fill="#C7CDD3" />
    <rect x="0" y="0" width="70" height="300" fill="#B0B7BE" />
    <rect x="64" y="0" width="10" height="300" fill="#9AA2AA" />
    <rect x="104" y="64" width="208" height="172" rx="6" fill="${C.metalLight}" stroke="${C.metalDark}" stroke-width="2" />
    <rect x="104" y="64" width="208" height="28" rx="6" fill="${C.ink}" />
    <text x="120" y="83" font-size="11" font-weight="700" fill="#E8EDF2" letter-spacing="0.5">RATING PLATE</text>
    <g transform="translate(120 104)">${bars}</g>
    ${rows}${screws}`
}

function scenePanel() {
  let left = ''
  for (let i = 0; i < 11; i++) {
    left += `<rect x="132" y="${66 + i * 15}" width="56" height="11" rx="2" fill="${i % 4 === 0 ? '#3C8A5E' : '#414A54'}" />`
    left += `<rect x="168" y="${68 + i * 15}" width="8" height="7" rx="1" fill="#1F252C" />`
  }
  let right = ''
  for (let i = 0; i < 11; i++) {
    right += `<rect x="212" y="${66 + i * 15}" width="56" height="11" rx="2" fill="${i % 3 === 0 ? '#B5894A' : '#414A54'}" />`
    right += `<rect x="224" y="${68 + i * 15}" width="8" height="7" rx="1" fill="#1F252C" />`
  }
  return `
    ${wall('#D7DCE2')}
    <rect x="112" y="44" width="176" height="212" rx="4" fill="#9DA5AE" stroke="${C.metalDark}" stroke-width="2" />
    <rect x="288" y="44" width="26" height="212" rx="3" fill="#AEB6BE" stroke="${C.metalDark}" stroke-width="1.5" />
    <rect x="124" y="56" width="152" height="188" rx="2" fill="#2E3640" />
    <rect x="196" y="64" width="8" height="172" rx="2" fill="#5A626B" />
    ${left}${right}
    <rect x="132" y="234" width="136" height="4" rx="1" fill="#C9D0D8" />`
}

function sceneShutoff() {
  return `
    ${wall('#DCE1E7')}
    <rect x="0" y="250" width="400" height="50" fill="${C.concrete}" />
    <rect x="188" y="40" width="24" height="230" fill="${C.metalLight}" stroke="${C.metalDark}" stroke-width="2" />
    <rect x="188" y="40" width="8" height="230" fill="#FFFFFF" opacity="0.25" />
    <rect x="172" y="140" width="56" height="40" rx="6" fill="${C.metalDark}" />
    <rect x="150" y="154" width="96" height="12" rx="6" fill="${C.red}" transform="rotate(-24 200 160)" />
    <circle cx="200" cy="160" r="7" fill="#7E332D" />
    <rect x="182" y="90" width="36" height="8" rx="2" fill="${C.metalDark}" />
    <circle cx="250" cy="120" r="18" fill="${C.white}" stroke="${C.metalDark}" stroke-width="2" />
    <line x1="250" y1="120" x2="258" y2="110" stroke="${C.red}" stroke-width="2" stroke-linecap="round" />
    <rect x="244" y="138" width="12" height="18" fill="${C.metalLight}" stroke="${C.metalDark}" stroke-width="1" />`
}

function sceneGasMeter() {
  let dials = ''
  for (const [cx, cy] of [[180, 126], [200, 120], [220, 126]]) {
    dials += `<circle cx="${cx}" cy="${cy}" r="11" fill="${C.white}" stroke="${C.metalDark}" stroke-width="1.5" />`
    dials += `<line x1="${cx}" y1="${cy}" x2="${cx + 6}" y2="${cy - 5}" stroke="${C.ink}" stroke-width="1.5" stroke-linecap="round" />`
  }
  return `
    ${wall('#D9DEE4')}
    <rect x="0" y="250" width="400" height="50" fill="${C.grass}" />
    <rect x="150" y="150" width="14" height="120" fill="${C.amber}" stroke="#B07F2E" stroke-width="1.5" />
    <rect x="236" y="150" width="14" height="120" fill="${C.amber}" stroke="#B07F2E" stroke-width="1.5" />
    <circle cx="200" cy="132" r="58" fill="#E7E2D6" stroke="${C.metalDark}" stroke-width="3" />
    <circle cx="200" cy="132" r="58" fill="#FFFFFF" opacity="0.12" />
    <ellipse cx="200" cy="86" rx="30" ry="18" fill="${C.metal}" stroke="${C.metalDark}" stroke-width="2" />
    ${dials}
    <rect x="176" y="148" width="48" height="10" rx="2" fill="${C.metalLight}" stroke="${C.metalDark}" stroke-width="1" />`
}

function sceneController() {
  let zones = ''
  for (let i = 0; i < 6; i++) {
    zones += `<rect x="${206 + (i % 3) * 22}" y="${172 + Math.floor(i / 3) * 22}" width="16" height="16" rx="3" fill="${i === 0 ? C.accent : C.white}" stroke="#B8AF99" stroke-width="1.4" />`
  }
  return `
    ${wall('#DDE2E8')}
    <rect x="120" y="66" width="160" height="168" rx="10" fill="${C.cream}" stroke="#B8AF99" stroke-width="2" />
    <rect x="120" y="66" width="160" height="32" rx="10" fill="#D9D1BD" />
    <rect x="140" y="110" width="120" height="44" rx="4" fill="#1F2A2E" />
    ${bar(150, 120, 48, 8, '#5FE0A8', 2)}
    ${bar(150, 134, 84, 5, '#3C8C6A', 2)}
    <circle cx="166" cy="188" r="20" fill="${C.white}" stroke="#B8AF99" stroke-width="2" />
    <line x1="166" y1="188" x2="166" y2="172" stroke="${C.ink}" stroke-width="2" stroke-linecap="round" />
    ${zones}
    <rect x="190" y="234" width="20" height="40" fill="${C.metalLight}" stroke="${C.metalDark}" stroke-width="1.5" />`
}

function sceneSump() {
  let rocks = ''
  for (let i = 0; i < 40; i++) {
    rocks += `<circle cx="${70 + ((i * 37) % 260)}" cy="${180 + ((i * 53) % 70)}" r="${3 + (i % 3)}" fill="${i % 2 ? '#A9ADB2' : '#C7CBCF'}" />`
  }
  return `
    <rect x="0" y="0" width="400" height="300" fill="${C.grass}" />
    <rect x="0" y="150" width="400" height="150" fill="${C.grassDark}" />
    <ellipse cx="200" cy="210" rx="150" ry="56" fill="${C.gravel}" />
    ${rocks}
    <ellipse cx="200" cy="196" rx="34" ry="20" fill="#3A4047" />
    <ellipse cx="200" cy="196" rx="34" ry="20" fill="none" stroke="${C.white}" stroke-width="5" />
    <ellipse cx="200" cy="194" rx="22" ry="12" fill="#21262B" />
    <path d="M200 206c-4 14-2 30 2 44" fill="none" stroke="#9FBEC9" stroke-width="4" stroke-linecap="round" opacity="0.7" />`
}

function sceneDetector() {
  let vents = ''
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2
    vents += `<line x1="${200 + Math.cos(a) * 40}" y1="${150 + Math.sin(a) * 40}" x2="${200 + Math.cos(a) * 64}" y2="${150 + Math.sin(a) * 64}" stroke="#C2C8CF" stroke-width="4" stroke-linecap="round" />`
  }
  return `
    <rect x="0" y="0" width="400" height="300" fill="#EDEFF2" />
    <path d="M0 0L120 0L0 90Z" fill="#00000008" />
    <circle cx="200" cy="150" r="78" fill="${C.white}" stroke="#D4D9DF" stroke-width="2" />
    <circle cx="200" cy="150" r="78" fill="#000000" opacity="0.03" />
    ${vents}
    <circle cx="200" cy="150" r="30" fill="#F4F6F8" stroke="#D4D9DF" stroke-width="1.5" />
    <circle cx="200" cy="150" r="12" fill="#E2E6EA" stroke="#C2C8CF" stroke-width="1.5" />
    <circle cx="222" cy="126" r="5" fill="${C.green}" />
    <circle cx="222" cy="126" r="9" fill="${C.green}" opacity="0.25" />`
}

function sceneRoof() {
  let rows = ''
  for (let row = 0; row < 9; row++) {
    const y = 250 - row * 17
    rows += `<line x1="${56 + row * 16}" y1="${y}" x2="${344 - row * 16}" y2="${y}" stroke="${C.shingleDark}" stroke-width="2" />`
    const span = 344 - row * 16 - (56 + row * 16)
    for (let i = 0; i < 16; i++) {
      const x = 56 + row * 16 + (i / 16) * span + (row % 2 ? span / 32 : 0)
      rows += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y - 14}" stroke="${C.shingleDark}" stroke-width="1" opacity="0.6" />`
    }
  }
  return `
    <rect x="0" y="0" width="400" height="120" fill="${C.sky}" />
    <ellipse cx="300" cy="50" rx="50" ry="20" fill="#FFFFFF" opacity="0.5" />
    <ellipse cx="90" cy="40" rx="40" ry="16" fill="#FFFFFF" opacity="0.4" />
    <path d="M40 250L200 96L360 250Z" fill="${C.shingle}" />
    ${rows}
    <path d="M40 250L200 96L360 250" fill="none" stroke="#565E68" stroke-width="3" />
    <line x1="196" y1="100" x2="196" y2="96" stroke="#565E68" stroke-width="4" />
    <rect x="40" y="250" width="320" height="10" fill="#E3E6EA" />`
}

function sceneDrainage() {
  let gravel = ''
  for (let i = 0; i < 46; i++) {
    gravel += `<circle cx="${140 + ((i * 29) % 120)}" cy="${150 + ((i * 41) % 90)}" r="${3 + (i % 3)}" fill="${i % 2 ? '#AEB2B7' : '#C7CBCF'}" />`
  }
  let holes = ''
  for (const cx of [182, 200, 218]) holes += `<circle cx="${cx}" cy="222" r="2.4" fill="#11151A" />`
  return `
    <rect x="0" y="0" width="400" height="60" fill="${C.grass}" />
    <rect x="0" y="54" width="400" height="246" fill="${C.soil}" />
    <rect x="0" y="120" width="400" height="180" fill="${C.soilDark}" opacity="0.5" />
    <path d="M150 60L120 250H280L250 60Z" fill="#6E5337" />
    <path d="M150 60L122 240" fill="none" stroke="#D9D2C2" stroke-width="3" opacity="0.8" />
    <path d="M250 60L278 240" fill="none" stroke="#D9D2C2" stroke-width="3" opacity="0.8" />
    ${gravel}
    <ellipse cx="200" cy="228" rx="30" ry="16" fill="#2E3338" />
    <ellipse cx="200" cy="228" rx="30" ry="16" fill="none" stroke="#11151A" stroke-width="2" />
    ${holes}`
}

function sceneFence(worn) {
  const board = worn ? C.woodWorn : C.wood
  const boardDark = worn ? '#8C8678' : C.woodDark
  let pickets = ''
  for (let i = 0; i < 11; i++) {
    const x = 28 + i * 32
    const lean = worn && i === 7 ? 6 : 0
    const missing = worn && i === 3
    if (missing) continue
    const grain = worn && i % 2 === 0 ? `<line x1="${x + 5}" y1="90" x2="${x + 5}" y2="230" stroke="#7E796C" stroke-width="1" opacity="0.6" />` : ''
    pickets += `<g transform="rotate(${lean} ${x + 11} 236)">
      <rect x="${x}" y="76" width="22" height="164" rx="2" fill="${board}" stroke="${boardDark}" stroke-width="1" />
      <path d="M${x} 76L${x + 11} 66L${x + 22} 76Z" fill="${board}" stroke="${boardDark}" stroke-width="1" />
      ${grain}
    </g>`
  }
  const gatePost = worn
    ? `<rect x="356" y="66" width="16" height="174" rx="2" fill="${boardDark}" transform="rotate(3 364 236)" />`
    : `<rect x="356" y="66" width="16" height="174" rx="2" fill="${boardDark}" />`
  return `
    <rect x="0" y="0" width="400" height="300" fill="${C.sky}" />
    <rect x="0" y="236" width="400" height="64" fill="${C.grass}" />
    <rect x="20" y="108" width="360" height="12" fill="${boardDark}" />
    <rect x="20" y="196" width="360" height="12" fill="${boardDark}" />
    ${pickets}${gatePost}`
}

function sceneDeck() {
  let boards = ''
  for (let i = 0; i < 8; i++) {
    const t = i / 8
    const y = 130 + t * 120
    const xl = 80 - t * 50
    const xr = 320 + t * 50
    boards += `<line x1="${xl}" y1="${y}" x2="${xr}" y2="${y}" stroke="${C.woodDark}" stroke-width="1.5" opacity="0.7" />`
  }
  let balusters = ''
  for (let i = 0; i < 9; i++) balusters += `<rect x="${92 + i * 26}" y="112" width="4" height="50" fill="${C.woodDark}" opacity="0.8" />`
  return `
    <rect x="0" y="0" width="400" height="110" fill="${C.sky}" />
    <rect x="0" y="96" width="400" height="40" fill="${C.grass}" />
    <path d="M30 250L370 250L320 130L80 130Z" fill="${C.wood}" />
    ${boards}
    <rect x="74" y="104" width="8" height="130" fill="${C.woodDark}" />
    <rect x="318" y="104" width="8" height="130" fill="${C.woodDark}" />
    <rect x="74" y="104" width="252" height="8" fill="${C.woodDark}" />
    ${balusters}`
}

function sceneBath() {
  let tiles = ''
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 8; c++) {
      tiles += `<rect x="${c * 52}" y="${r * 26}" width="50" height="24" fill="#F1F4F7" stroke="#DCE2E8" stroke-width="1" />`
    }
  }
  return `
    <rect x="0" y="0" width="400" height="300" fill="#E7ECF0" />
    ${tiles}
    <rect x="60" y="196" width="280" height="20" rx="3" fill="#D9CDBD" />
    <rect x="70" y="216" width="260" height="70" fill="#C7B79F" />
    <ellipse cx="200" cy="206" rx="70" ry="16" fill="#FBFCFD" stroke="#C7CDD3" stroke-width="2" />
    <ellipse cx="200" cy="206" rx="52" ry="10" fill="#E9EDF1" />
    <path d="M200 196v-40c0-16 22-16 22 0" fill="none" stroke="${C.metal}" stroke-width="7" stroke-linecap="round" />
    <rect x="184" y="186" width="12" height="12" rx="2" fill="${C.metalDark}" />
    <rect x="216" y="150" width="10" height="8" rx="2" fill="${C.metalDark}" />
    <rect x="150" y="40" width="100" height="84" rx="4" fill="#DCE7EE" stroke="#C7CDD3" stroke-width="2" />`
}

function sceneKitchen(after) {
  const cabinet = after ? '#E8EBEE' : '#6E5A45'
  const cabinetEdge = after ? '#CFD5DB' : '#52432F'
  const counter = after ? '#D7DCE1' : '#7A7E82'
  const wallC = after ? '#EAF0F4' : '#C9C2B4'
  const floor = after ? '#D9CFC0' : '#A89578'
  let lowerDiv = ''
  for (const x of [70, 130, 190]) lowerDiv += `<line x1="${x}" y1="166" x2="${x}" y2="238" stroke="${cabinetEdge}" stroke-width="2" />`
  let handles = ''
  for (const x of [50, 110, 170, 230]) handles += `<rect x="${x}" y="176" width="4" height="14" rx="2" fill="${after ? '#9AA6B2' : '#3C3024'}" />`
  const islandOrTable = after
    ? `<rect x="286" y="150" width="94" height="16" fill="${counter}" />
       <rect x="296" y="166" width="74" height="72" fill="${cabinet}" stroke="${cabinetEdge}" stroke-width="2" />
       <line x1="320" y1="40" x2="320" y2="64" stroke="#9AA6B2" stroke-width="2" /><circle cx="320" cy="70" r="7" fill="${C.amber}" />
       <line x1="350" y1="40" x2="350" y2="64" stroke="#9AA6B2" stroke-width="2" /><circle cx="350" cy="70" r="7" fill="${C.amber}" />`
    : `<rect x="300" y="186" width="70" height="8" fill="#6E5A45" />
       <rect x="306" y="194" width="6" height="44" fill="#52432F" />
       <rect x="358" y="194" width="6" height="44" fill="#52432F" />`
  return `
    <rect x="0" y="0" width="400" height="300" fill="${wallC}" />
    <rect x="0" y="232" width="400" height="68" fill="${floor}" />
    <rect x="30" y="40" width="150" height="56" fill="${cabinet}" stroke="${cabinetEdge}" stroke-width="2" />
    <line x1="105" y1="40" x2="105" y2="96" stroke="${cabinetEdge}" stroke-width="2" />
    <rect x="20" y="150" width="250" height="16" fill="${counter}" />
    <rect x="30" y="166" width="240" height="72" fill="${cabinet}" stroke="${cabinetEdge}" stroke-width="2" />
    ${lowerDiv}${handles}${islandOrTable}
    <rect x="290" y="60" width="80" height="70" fill="${after ? '#CFE3F0' : '#A9B7A0'}" stroke="${cabinetEdge}" stroke-width="2" />
    <line x1="330" y1="60" x2="330" y2="130" stroke="${cabinetEdge}" stroke-width="2" />
    <line x1="290" y1="95" x2="370" y2="95" stroke="${cabinetEdge}" stroke-width="2" />`
}

function sceneSwatch() {
  const swatches = [
    { c: '#5B6B7B', label: 'Body' },
    { c: '#E9E4D8', label: 'Trim' },
    { c: '#7C3B3B', label: 'Door' },
  ]
  let s = `<rect x="0" y="0" width="400" height="300" fill="#EFEFEC" />`
  swatches.forEach((sw, i) => {
    const x = 50 + i * 108
    s += `<rect x="${x}" y="54" width="84" height="150" rx="4" fill="${sw.c}" stroke="#00000018" stroke-width="1" />`
    s += `<rect x="${x}" y="172" width="84" height="32" fill="#000000" opacity="0.12" />`
    s += `<rect x="${x}" y="214" width="84" height="30" rx="3" fill="${C.white}" stroke="${C.line}" stroke-width="1" />`
    s += bar(x + 12, 222, 40, 5, C.sub) + bar(x + 12, 232, 58, 5, C.line)
    s += `<text x="${x + 8}" y="70" font-size="10" font-weight="700" fill="${i === 1 ? C.sub : '#FFFFFF'}">${sw.label}</text>`
  })
  s += `<rect x="300" y="196" width="60" height="12" rx="3" fill="${C.woodDark}" transform="rotate(-24 330 202)" />`
  s += `<rect x="344" y="188" width="22" height="20" rx="2" fill="${C.metalLight}" transform="rotate(-24 355 198)" />`
  return s
}

function sceneSprinkler() {
  const zones = [
    { x: 60, y: 56, w: 120, h: 80 },
    { x: 188, y: 56, w: 152, h: 80 },
    { x: 60, y: 200, w: 110, h: 64 },
    { x: 230, y: 200, w: 110, h: 64 },
  ]
  let z = ''
  zones.forEach((zn, i) => {
    z += `<rect x="${zn.x}" y="${zn.y}" width="${zn.w}" height="${zn.h}" fill="${C.grass}" opacity="0.35" stroke="${C.grassDark}" stroke-width="1" stroke-dasharray="4 3" />`
    z += `<text x="${zn.x + 6}" y="${zn.y + 14}" font-size="9" font-weight="700" fill="${C.grassDark}">Z${i + 1}</text>`
    const heads = [[zn.x + zn.w * 0.3, zn.y + zn.h * 0.6], [zn.x + zn.w * 0.72, zn.y + zn.h * 0.45]]
    heads.forEach(([cx, cy]) => {
      z += `<circle cx="${cx}" cy="${cy}" r="12" fill="none" stroke="${C.accent}" stroke-width="1" opacity="0.4" />`
      z += `<circle cx="${cx}" cy="${cy}" r="3" fill="${C.accent}" />`
    })
  })
  return `
    <rect x="0" y="0" width="400" height="300" fill="#EAF1EA" />
    <rect x="30" y="36" width="340" height="232" fill="none" stroke="${C.grassDark}" stroke-width="2" />
    <rect x="150" y="146" width="100" height="48" fill="${C.accent}" opacity="0.12" stroke="${C.accent}" stroke-width="1.5" />
    <text x="200" y="174" font-size="9" font-weight="600" fill="${C.accent}" text-anchor="middle">House</text>
    ${z}
    <rect x="300" y="150" width="26" height="20" rx="2" fill="${C.cream}" stroke="#B8AF99" stroke-width="1.5" />
    <path d="M352 50l5 12h-10z" fill="${C.sub}" />
    <text x="352" y="74" font-size="8" fill="${C.sub}" text-anchor="middle">N</text>`
}

function renderScene(kind) {
  if (isDocKind(kind)) return docScene(kind)
  switch (kind) {
    case 'photo-hvac': return sceneHVAC()
    case 'photo-water-heater-plate': return scenePlate()
    case 'photo-panel': return scenePanel()
    case 'photo-shutoff': return sceneShutoff()
    case 'photo-gas-meter': return sceneGasMeter()
    case 'photo-irrigation-controller': return sceneController()
    case 'photo-sump': return sceneSump()
    case 'photo-detector': return sceneDetector()
    case 'photo-roof': return sceneRoof()
    case 'photo-drainage': return sceneDrainage()
    case 'photo-fence-before': return sceneFence(true)
    case 'photo-fence-after': return sceneFence(false)
    case 'photo-deck': return sceneDeck()
    case 'photo-bath-fixture': return sceneBath()
    case 'photo-kitchen-before': return sceneKitchen(false)
    case 'photo-kitchen-after': return sceneKitchen(true)
    case 'swatch-paint': return sceneSwatch()
    case 'map-sprinkler': return sceneSprinkler()
    default: return docScene('doc-invoice')
  }
}

// ── Media: realistic photo (primary) with graceful SVG fallback, or doc preview
//
// A photo descriptor renders a real <img> as the primary visual; if the asset
// file is not present yet, onerror removes the <img> and the SVG beneath it
// shows through — so the page is never broken while photos are being added.
// A doc descriptor renders the document-preview SVG (acceptable for fake docs).

function evidenceFrame(inner, { label, dateLabel } = {}) {
  const tag = label ? `<span class="k-evidence__label k-evidence__label--soft">${esc(label)}</span>` : ''
  const ts = dateLabel ? `<span class="k-timestamp">${esc(dateLabel)}</span>` : ''
  return `<div class="k-evidence">${inner}${tag}${ts}</div>`
}
function docSVG(kind) {
  return `<svg class="k-evidence__svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Sample document preview">${renderScene(kind)}</svg>`
}
function imageNeeded() {
  return `<div class="k-imgneeded"><span class="k-imgneeded__icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M21 16l-5-5L5 20"/></svg></span><span>Image needed</span></div>`
}
// image: photo  -> { type:"photo", src, alt }            (real <img>, else "Image needed")
//        document-> { type:"document"|"doc", src?, kind?, label? }  (image OR clean synthetic preview)
// No "SAMPLE" wash on photos — the page-level sample notice is enough.
function evidenceHTML(image, opts = {}) {
  if (!image) return ''
  const isPhoto = image.type === 'photo'
  const isDocImg = (image.type === 'document' || image.type === 'doc') && image.src
  if (isPhoto || isDocImg) {
    const img = `<img class="k-photo" src="${esc(image.src)}" alt="${esc(image.alt || 'Property photo')}" loading="lazy" decoding="async" onerror="this.remove()" />`
    return `<div class="k-evidence">${imageNeeded()}${img}</div>`
  }
  // synthetic document preview — subtle "Sample document" label, no SAMPLE wash
  return evidenceFrame(docSVG(image.kind || 'doc-invoice'), { label: image.label || 'Sample document', dateLabel: opts.dateLabel })
}

// Where the demo's "create your record" CTAs send visitors. On the marketing
// site, point this at your real signup / request-access URL when ready.
const REQUEST_ACCESS_URL = '/'

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'vault', label: 'Vault' },
  { id: 'systems', label: 'Systems' },
  { id: 'projects', label: 'Projects' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'guidance', label: 'Guidance' },
]

const CATEGORY_META = {
  warranty: { label: 'Warranty', dot: 'var(--k-verified-text)' },
  permit: { label: 'Permit', dot: 'var(--k-accent)' },
  service: { label: 'Service', dot: '#3E7CA8' },
  invoice: { label: 'Invoice', dot: '#4A6278' },
  receipt: { label: 'Receipt', dot: '#6B7A8D' },
  photo: { label: 'Photo', dot: '#7E6CA8' },
  plan: { label: 'Plan', dot: 'var(--k-accent)' },
  insurance: { label: 'Insurance', dot: 'var(--k-verified-text)' },
  inspection: { label: 'Inspection', dot: 'var(--k-warn-text)' },
  checklist: { label: 'Checklist', dot: '#4A6278' },
}

// ── State ─────────────────────────────────────────────────────────────────────
const state = {
  section: 'overview',
  layer: 'interior',
  zone: null,
  scale: 1,
  journey: { blueprint: false, record: false, timeline: false, guidance: false },
  guideDismissed: false,
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
const $ = (id) => document.getElementById(id)

function goRequestAccess() {
  window.location.assign(REQUEST_ACCESS_URL)
}
function markStep(k) {
  if (!state.journey[k]) { state.journey[k] = true; renderGuide() }
}

// ── Glyphs ────────────────────────────────────────────────────────────────────
const G = {
  home: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 8l6-5 6 5v6a1 1 0 01-1 1h-3v-4H7v4H4a1 1 0 01-1-1V8z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
  shield: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1l5 2v3c0 3-2 5-5 6-3-1-5-3-5-6V3l5-2z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>',
  bell: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 7a4 4 0 018 0c0 4 1.5 5 1.5 5h-11S5 11 5 7z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M7.5 14.5a1.5 1.5 0 003 0" stroke="currentColor" stroke-width="1.3"/></svg>',
  arrow: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  close: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  file: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 2h6l4 4v8H3V2z" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linejoin="round"/><path d="M9 2v4h4" stroke="currentColor" stroke-width="1.4" fill="none"/></svg>',
  compass: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.4"/><path d="M10.5 5.5L9 9l-3.5 1.5L7 7l3.5-1.5z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" fill="none"/></svg>',
  plus: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
}
function categoryGlyph() {
  return '<svg width="34" height="34" viewBox="0 0 34 34" fill="none"><rect x="7" y="5" width="20" height="24" rx="2" stroke="currentColor" stroke-width="1.3"/><path d="M11 11h12M11 15h12M11 19h8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>'
}

// ── Blueprint ─────────────────────────────────────────────────────────────────
function buildMarkers(records, zones) {
  const byZone = new Map(); const out = []
  for (const r of records) {
    const z = zones.find((zz) => zz.id === r.area); if (!z) continue
    const n = byZone.get(z.id) || 0; byZone.set(z.id, n + 1)
    const offset = n === 0 ? 0 : (n % 2 === 1 ? 16 : -16)
    out.push({ cx: z.x + z.w / 2 + offset, cy: z.y + z.h / 2 - 18 })
  }
  return out
}
function blueprintSVG(zones, markers, selected, zoneAction) {
  const zoneEls = zones.map((z) => `
    <g>
      <rect class="k-zone${z.id === selected ? ' is-selected' : ''}" data-action="${zoneAction}" data-zone="${z.id}" x="${z.x}" y="${z.y}" width="${z.w}" height="${z.h}" rx="6"></rect>
      <text class="k-zone__label" x="${z.x + 10}" y="${z.y + 22}">${esc(z.label)}</text>
    </g>`).join('')
  const markerEls = markers.map((m) => `<g><circle class="k-marker__ring" cx="${m.cx}" cy="${m.cy}" r="7"></circle><circle class="k-marker__dot" cx="${m.cx}" cy="${m.cy}" r="3"></circle></g>`).join('')
  return `
    <div class="k-blueprint">
      <div class="k-blueprint__grid"></div>
      <svg viewBox="0 0 820 520" role="img" aria-label="Property blueprint">
        <g style="transform: scale(${state.scale}); transform-origin: center; transition: transform .2s;">${zoneEls}${markerEls}</g>
      </svg>
      <div class="k-zoom">
        <button type="button" data-action="zoom-in" aria-label="Zoom in">+</button>
        <button type="button" data-action="zoom-out" aria-label="Zoom out">&minus;</button>
      </div>
    </div>`
}

// ── Realistic architectural plans (hand-built vector, not boxes) ──────────────
//
// floorPlanSVG / sitePlanSVG draw true architectural drawings: poché walls with
// real thickness, door swings, windows, fixtures, dimension strings and labelled
// rooms. Transparent hotspots (from the zone table) keep every area clickable and
// numbered record markers sit on top. viewBox 0 0 820 520 matches the zone coords.

const PLAN = { wall: '#2B3E55', floor: '#FCFDFE', floor2: '#F4F7FB', soft: '#DCE3EC', glass: '#9FBBD6', fix: '#C6D0DC', label: '#5C6B7E', dim: '#9AA8B8' }
const MARKER_PALETTE = ['#2D7DD2', '#E08A2B', '#3FA66A', '#7C5CC4', '#2C8E8E', '#C0504D']

function planSegs(a, b, gaps) {
  const g = [...(gaps || [])].sort((m, n) => m[0] - n[0])
  const out = []; let cur = a
  for (const [s, e] of g) { if (s > cur) out.push([cur, Math.min(s, b)]); cur = Math.max(cur, e) }
  if (cur < b) out.push([cur, b])
  return out
}
function wallH(x1, x2, y, th, gaps) { return planSegs(x1, x2, gaps).map(([s, e]) => `<rect x="${s}" y="${y - th / 2}" width="${e - s}" height="${th}" fill="${PLAN.wall}"/>`).join('') }
function wallV(y1, y2, x, th, gaps) { return planSegs(y1, y2, gaps).map(([s, e]) => `<rect x="${x - th / 2}" y="${s}" width="${th}" height="${e - s}" fill="${PLAN.wall}"/>`).join('') }
function winH(x1, x2, y) { return `<rect x="${x1}" y="${y - 4.5}" width="${x2 - x1}" height="9" fill="${PLAN.floor}"/><line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${PLAN.glass}" stroke-width="2"/>` }
function winV(y1, y2, x) { return `<rect x="${x - 4.5}" y="${y1}" width="9" height="${y2 - y1}" fill="${PLAN.floor}"/><line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${PLAN.glass}" stroke-width="2"/>` }
function door(x, y, r, a0) { // quarter-circle swing + leaf
  const a1 = a0 + 90
  const x1 = x + r * Math.cos(a0 * Math.PI / 180), y1 = y + r * Math.sin(a0 * Math.PI / 180)
  const x2 = x + r * Math.cos(a1 * Math.PI / 180), y2 = y + r * Math.sin(a1 * Math.PI / 180)
  return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${PLAN.soft}" stroke-width="1.4"/><line x1="${x}" y1="${y}" x2="${x1.toFixed(1)}" y2="${y1.toFixed(1)}" stroke="${PLAN.wall}" stroke-width="2"/>`
}

// Image-backed blueprint: the PNG is the surface; the vector drawing sits beneath
// as a graceful fallback (shown only if the PNG is missing); the marker/hotspot
// overlay sits on top and stays interactive. Swap the PNG anytime — markers are
// positioned in the same 820×520 space, so they keep aligning.
function planSurface(kind, drawing, overlay) {
  const src = kind === 'floor' ? 'assets/images/blueprint/floor-plan-realistic.png' : 'assets/images/blueprint/site-plan-realistic.png'
  const label = kind === 'floor' ? 'Property floor plan' : 'Property site plan'
  return `
    <div class="k-blueprint">
      <div class="k-plan" style="transform: scale(${state.scale}); transform-origin: center; transition: transform .2s;">
        <div class="k-plan__base">${drawing}</div>
        <img class="k-plan__img" src="${src}" alt="${label}" loading="lazy" decoding="async" onerror="this.remove()" />
        ${overlay}
      </div>
      <div class="k-zoom">
        <button type="button" data-action="zoom-in" aria-label="Zoom in">+</button>
        <button type="button" data-action="zoom-out" aria-label="Zoom out">&minus;</button>
      </div>
    </div>`
}

function floorPlanSVG(zones, records, selected, zoneAction) {
  const counts = new Map()
  for (const r of records) counts.set(r.area, (counts.get(r.area) || 0) + 1)
  const T = 9, t = 5

  // ── Exterior shell (interior clear 60–760 × 60–480) ──
  const exTop = wallH(60, 760, 60, T, [[150, 215], [365, 445], [620, 705]])
  const exBot = wallH(60, 760, 480, T, [[120, 185], [330, 405], [600, 660]])
  const exL = wallV(60, 480, 60, T, [[105, 160], [370, 435]])
  const exR = wallV(60, 480, 760, T, [[105, 245]])
  const windows = [
    winH(150, 215, 60), winH(365, 445, 60), winH(620, 705, 60),
    winH(120, 185, 480), winH(330, 405, 480),
    winV(105, 160, 60), winV(370, 435, 60),
  ].join('')
  const garageDoor = `<line x1="760" y1="105" x2="760" y2="245" stroke="${PLAN.wall}" stroke-width="2.5" stroke-dasharray="8 6"/>`

  // ── Interior partitions (door gaps in brackets) ──
  const part = [
    wallV(60, 480, 300, t, [[120, 152], [430, 470]]),          // left wing | middle
    wallV(60, 480, 560, t, [[318, 356]]),                       // middle | right (kitchen→utility)
    wallH(60, 300, 210, t, [[72, 110], [232, 272]]),            // suite | bath + W.I.C.
    wallH(60, 300, 330, t, []),                                 // bath row | bedroom 2
    wallV(210, 330, 200, t, []),                                // bath | closet
    wallH(300, 560, 240, t, [[330, 525]]),                      // living | dining/kitchen (open)
    wallV(240, 390, 430, t, [[300, 348]]),                      // dining | kitchen (cased opening)
    wallH(300, 560, 390, t, [[330, 382]]),                      // dining/kitchen | foyer
    wallH(560, 760, 280, t, [[588, 640]]),                      // garage | utility
    wallV(280, 380, 660, t, []),                                // utility | hvac
    wallH(560, 760, 380, t, [[598, 648]]),                      // utility | panel/laundry
  ].join('')

  const doors = [
    door(110, 210, 32, 90),    // suite → bath
    door(232, 210, 30, 90),    // suite → walk-in closet
    door(152, 300, 30, 180),   // hall/living → suite
    door(430, 300, 30, 0),     // middle → bedroom 2
    door(382, 390, 28, 270),   // kitchen → foyer
    door(588, 280, 26, 0),     // garage → utility
    door(600, 480, 42, 270),   // front entry door (swings in)
  ].join('')

  // ── Fixtures (thin, light line-work) ──
  const fixtures = `
    <g fill="none" stroke="${PLAN.fix}" stroke-width="1.4" stroke-linejoin="round">
      <!-- primary suite: bed + nightstands -->
      <rect x="108" y="74" width="120" height="80" rx="6"/>
      <rect x="120" y="78" width="44" height="22" rx="3"/><rect x="172" y="78" width="44" height="22" rx="3"/>
      <rect x="92" y="74" width="14" height="22" rx="2"/><rect x="230" y="74" width="14" height="22" rx="2"/>
      <!-- walk-in closet shelving -->
      <line x1="206" y1="222" x2="294" y2="222"/><line x1="206" y1="232" x2="294" y2="232"/>
      <!-- primary bath: double vanity, toilet, tub, shower -->
      <rect x="66" y="216" width="80" height="20" rx="2"/><circle cx="86" cy="226" r="5"/><circle cx="126" cy="226" r="5"/>
      <rect x="158" y="216" width="22" height="18" rx="3"/>
      <rect x="66" y="296" width="86" height="28" rx="10"/>
      <rect x="160" y="284" width="34" height="40" rx="2"/><path d="M160 284l34 40"/>
      <!-- bedroom 2: bed -->
      <rect x="96" y="346" width="120" height="78" rx="6"/>
      <rect x="108" y="350" width="44" height="22" rx="3"/><rect x="160" y="350" width="44" height="22" rx="3"/>
      <!-- living: sectional sofa + rug hint -->
      <rect x="318" y="92" width="40" height="120" rx="6"/><rect x="318" y="180" width="150" height="32" rx="6"/>
      <!-- dining: table + chairs -->
      <rect x="332" y="280" width="66" height="74" rx="10"/>
      <rect x="344" y="266" width="18" height="10" rx="2"/><rect x="368" y="266" width="18" height="10" rx="2"/>
      <rect x="344" y="358" width="18" height="10" rx="2"/><rect x="368" y="358" width="18" height="10" rx="2"/>
      <!-- kitchen: perimeter counter, sink, range, fridge, island -->
      <rect x="438" y="246" width="116" height="22" rx="2"/>
      <rect x="532" y="246" width="22" height="120" rx="2"/>
      <circle cx="494" cy="257" r="7"/>
      <rect x="536" y="286" width="14" height="40" rx="2"/><circle cx="543" cy="297" r="4"/><circle cx="543" cy="315" r="4"/>
      <rect x="438" y="338" width="28" height="28" rx="2"/>
      <rect x="458" y="300" width="62" height="34" rx="3"/>
      <!-- foyer: coat closet -->
      <rect x="516" y="396" width="38" height="26" rx="2"/><line x1="516" y1="409" x2="554" y2="409"/>
      <!-- garage: two cars -->
      <rect x="576" y="80" width="74" height="156" rx="12"/><rect x="668" y="80" width="74" height="156" rx="12"/>
      <!-- utility: water heater + furnace -->
      <circle cx="588" cy="332" r="16"/><rect x="612" y="316" width="36" height="48" rx="3"/>
      <!-- hvac: air handler -->
      <rect x="676" y="300" width="62" height="56" rx="3"/><line x1="676" y1="328" x2="738" y2="328"/>
      <!-- panel + laundry -->
      <rect x="722" y="392" width="26" height="40" rx="2"/>
      <rect x="572" y="394" width="34" height="34" rx="3"/><circle cx="589" cy="411" r="9"/>
      <rect x="612" y="394" width="34" height="34" rx="3"/><circle cx="629" cy="411" r="9"/>
    </g>`

  // ── Labels (centered, modest tracking, placed clear of fixtures) ──
  const L = [
    ['PRIMARY SUITE', 180, 190, 11], ['PRIMARY BATH', 122, 262, 9], ['W.I.C.', 250, 280, 8],
    ['BEDROOM 2', 180, 462, 11], ['LIVING ROOM', 430, 122, 12], ['DINING', 365, 378, 10],
    ['KITCHEN', 489, 380, 10], ['FOYER', 408, 445, 10], ['GARAGE', 660, 172, 11],
    ['UTILITY', 608, 372, 8], ['HVAC', 707, 372, 8], ['PANEL', 678, 460, 8],
  ]
  const labels = L.map(([s, x, y, fs]) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${fs}" font-weight="600" fill="${PLAN.label}" letter-spacing="0.4">${s}</text>`).join('')

  // ── Overall dimension strings (subtle) ──
  const dims = `
    <g stroke="${PLAN.dim}" stroke-width="1" fill="${PLAN.dim}" font-size="9">
      <line x1="60" y1="40" x2="760" y2="40"/><line x1="60" y1="36" x2="60" y2="44"/><line x1="760" y1="36" x2="760" y2="44"/>
      <text x="410" y="36" text-anchor="middle" fill="${PLAN.dim}">58'-0"</text>
      <line x1="40" y1="60" x2="40" y2="480"/><line x1="36" y1="60" x2="44" y2="60"/><line x1="36" y1="480" x2="44" y2="480"/>
      <text x="32" y="272" text-anchor="middle" fill="${PLAN.dim}" transform="rotate(-90 32 272)">36'-0"</text>
    </g>`

  // ── Interactive overlay: hotspots + numbered markers (from zones) ──
  const hot = zones.map((z) => `<rect class="k-hot${z.id === selected ? ' is-selected' : ''}" fill="transparent" data-action="${zoneAction}" data-zone="${z.id}" x="${z.x}" y="${z.y}" width="${z.w}" height="${z.h}"></rect>`).join('')
  const markers = zones.map((z, i) => {
    const n = counts.get(z.id) || 0
    if (!n) return ''
    const cx = z.x + Math.min(30, z.w / 2), cy = z.y + 26
    const c = MARKER_PALETTE[i % MARKER_PALETTE.length]
    return `<g class="k-pin"><circle cx="${cx}" cy="${cy}" r="13" fill="#fff"/><circle cx="${cx}" cy="${cy}" r="13" fill="${c}" opacity="0.16"/><circle cx="${cx}" cy="${cy}" r="10.5" fill="${c}"/><text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">${n}</text></g>`
  }).join('')

  const drawing = `<svg class="k-plan__draw" viewBox="0 0 820 520" role="img" aria-label="Floor plan drawing"><rect x="60" y="60" width="700" height="420" fill="${PLAN.floor}"/>${dims}${exTop}${exBot}${exL}${exR}${windows}${garageDoor}${part}${doors}${fixtures}${labels}</svg>`
  const overlay = `<svg class="k-plan__overlay" viewBox="0 0 820 520" role="img" aria-label="Record markers">${hot}${markers}</svg>`
  return planSurface('floor', drawing, overlay)
}

function sitePlanSVG(zones, records, selected, zoneAction) {
  const counts = new Map()
  for (const r of records) counts.set(r.area, (counts.get(r.area) || 0) + 1)
  const hot = zones.map((z) => `<rect class="k-hot${z.id === selected ? ' is-selected' : ''}" fill="transparent" data-action="${zoneAction}" data-zone="${z.id}" x="${z.x}" y="${z.y}" width="${z.w}" height="${z.h}"></rect>`).join('')
  const markers = zones.map((z, i) => {
    const n = counts.get(z.id) || 0
    if (!n) return ''
    const cx = z.x + Math.min(34, z.w / 2), cy = z.y + 28
    const c = MARKER_PALETTE[i % MARKER_PALETTE.length]
    return `<g class="k-pin"><circle cx="${cx}" cy="${cy}" r="14" fill="#fff"/><circle cx="${cx}" cy="${cy}" r="11" fill="${c}"/><text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">${n}</text></g>`
  }).join('')
  const labels = zones.filter((z) => z.id !== 'walls' && z.id !== 'roof').map((z) => {
    return `<text x="${z.x + 12}" y="${z.y + 20}" font-size="11" font-weight="600" fill="${PLAN.label}" letter-spacing="0.4">${esc(z.label.toUpperCase())}</text>`
  }).join('')
  const drawing = `<svg class="k-plan__draw" viewBox="0 0 820 520" role="img" aria-label="Site plan drawing"><rect x="30" y="30" width="760" height="460" fill="#F1F6F0"/><rect x="30" y="30" width="760" height="460" fill="none" stroke="${PLAN.dim}" stroke-width="1.5" stroke-dasharray="8 6"/><rect x="250" y="130" width="320" height="240" rx="3" fill="${PLAN.floor}" stroke="${PLAN.wall}" stroke-width="3"/><rect x="270" y="150" width="280" height="200" fill="none" stroke="${PLAN.soft}" stroke-width="1.2"/><text x="410" y="255" text-anchor="middle" font-size="12" font-weight="600" fill="${PLAN.label}" letter-spacing="1">RESIDENCE</text><rect x="600" y="370" width="150" height="110" fill="#E7E3DA"/><path d="M60 420 Q200 410 400 420 T740 425" fill="none" stroke="#7FA8C9" stroke-width="2.5" stroke-dasharray="3 6"/><g fill="#86B57A"><circle cx="120" cy="110" r="22"/><circle cx="690" cy="120" r="20"/><circle cx="120" cy="430" r="18"/></g>${labels}</svg>`
  const overlay = `<svg class="k-plan__overlay" viewBox="0 0 820 520" role="img" aria-label="Record markers">${hot}${markers}</svg>`
  return planSurface('site', drawing, overlay)
}

// ── Shared bits ───────────────────────────────────────────────────────────────
function hero(eyebrow, title, sub, shield = true) {
  return `<div class="k-hero">
    ${eyebrow ? `<p class="k-hero__eyebrow">${esc(eyebrow)}</p>` : ''}
    <div class="k-hero__titlerow"><h1 class="k-hero__title">${esc(title)}</h1>${shield ? `<span class="k-hero__shield">${G.shield}</span>` : ''}</div>
    ${sub ? `<p class="k-hero__sub">${esc(sub)}</p>` : ''}
  </div>`
}
function recordCard(r) {
  const m = CATEGORY_META[r.category]
  const media = r.image
    ? evidenceHTML(r.image, { showStamp: true })
    : `<div class="k-reccard__fallback">${categoryGlyph()}</div>`
  return `<button type="button" class="k-reccard" data-action="open-record" data-id="${r.id}">
    <div class="k-reccard__media">${media}
      <span class="k-catpill"><span class="k-catpill__dot" style="background:${m.dot}"></span>${esc(m.label)}</span>
    </div>
    <div class="k-reccard__body">
      <p class="k-reccard__title">${esc(r.title)}</p>
      <p class="k-reccard__meta">${esc(r.areaLabel)}</p>
      <p class="k-reccard__date">${esc(r.date)}</p>
    </div>
  </button>`
}

// ── Sections ──────────────────────────────────────────────────────────────────
function overviewSection() {
  const p = SAMPLE_PROPERTY
  const interiorMarkers = buildMarkers(SAMPLE_RECORDS.filter((r) => r.layer === 'interior'), FLOOR_ZONES)

  const facts = [
    ['Property type', p.type],
    ['Year built', String(p.built)],
    ['Size', `${p.sqft.toLocaleString()} sq ft`],
    ['Bedrooms', String(p.bedrooms)],
    ['Bathrooms', String(p.bathrooms)],
    ['Lot', `${p.lotAcres} acres`],
  ]

  // Record completeness — derived honestly from how many of each layer's areas
  // have at least one record on file. No invented metrics.
  const coverage = VAULT_LAYERS.map((l) => {
    const zones = (l.surface === 'floor' ? FLOOR_ZONES : SITE_ZONES).filter((z) => l.zoneIds.includes(z.id))
    const recs = SAMPLE_RECORDS.filter((r) => r.layer === l.id)
    const covered = new Set(recs.map((r) => r.area)).size
    const pct = zones.length ? Math.round((covered / zones.length) * 100) : 0
    return { label: l.label, pct }
  })
  const overall = Math.round(coverage.reduce((a, c) => a + c.pct, 0) / coverage.length)

  const recent = SAMPLE_TIMELINE.slice(-4).reverse()
  const important = ['permit', 'warranty', 'insurance', 'survey']
    .map((cat) => SAMPLE_RECORDS.find((r) => r.category === cat))
    .filter(Boolean)
  const nextSys = SAMPLE_SYSTEMS.find((s) => s.status !== 'good' && s.nextAction)
    || SAMPLE_SYSTEMS.find((s) => s.nextAction)

  const counts = [
    ['Documents in the vault', RECORD_COUNT, 'vault'],
    ['Systems & appliances', SYSTEM_COUNT, 'systems'],
    ['Projects logged', PROJECT_COUNT, 'projects'],
    ['Timeline events', TIMELINE_COUNT, 'timeline'],
  ]
  const clock = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="6.5" stroke="currentColor" stroke-width="1.4"/><path d="M9 5.5V9l2.5 1.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  const bulb = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2.5a4.5 4.5 0 00-2.6 8.2c.5.4.8.9.9 1.5h3.4c.1-.6.4-1.1.9-1.5A4.5 4.5 0 009 2.5z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M7.3 15h3.4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>'
  const model = [
    { t: 'The blueprint', d: 'organizes the property', to: 'vault', g: G.home },
    { t: 'The vault', d: 'stores the evidence', to: 'vault', g: G.file },
    { t: 'The timeline', d: 'tells the story', to: 'timeline', g: clock },
    { t: 'The guidance', d: 'explains what matters', to: 'guidance', g: bulb },
  ]

  return `<div class="k-section k-anim-slide">
    <div class="k-phero">
      <div class="k-phero__media">${evidenceHTML({ type: 'photo', src: 'assets/images/property/home-exterior.jpg', alt: 'Sample home exterior' })}</div>
      <div class="k-phero__body">
        <p class="k-hero__eyebrow">Private Kodu Record</p>
        <h1 class="k-phero__addr">${esc(p.address || p.name)}</h1>
        <p class="k-phero__loc">${esc(p.locationLabel)} · ${esc(p.type)} · Built ${p.built}</p>
        <div class="k-phero__badges">
          <span class="k-badge k-badge--verified">${G.shield} Verified</span>
          <span class="k-badge k-badge--owner">${G.shield} Owner</span>
          <span class="k-badge k-badge--private">Private · Sample data</span>
        </div>
      </div>
    </div>

    <div class="k-rail k-rail--overview">
      <div class="k-card k-card--xl">
        ${floorPlanSVG(FLOOR_ZONES, SAMPLE_RECORDS.filter((r) => r.layer === 'interior' || r.layer === 'utility'), null, 'overview-zone')}
        <div class="k-blueprint__caption">
          <p>The blueprint organizes the property. Select a room to open the records connected to it.</p>
          <button type="button" class="k-textlink" data-action="nav" data-section="vault">Open the vault ${G.arrow}</button>
        </div>
      </div>
      <div class="k-stack-md">
        <div class="k-railcard">
          <p class="k-railcard__title">Home snapshot</p>
          <div class="k-snapgrid">
            ${facts.map(([k, v]) => `<div><p class="k-snap__k">${esc(k)}</p><p class="k-snap__v">${esc(v)}</p></div>`).join('')}
          </div>
        </div>
        <div class="k-railcard">
          <p class="k-railcard__title">Record completeness</p>
          <div class="k-cov__overall"><span class="k-cov__num">${overall}%</span><span class="k-cov__cap">of the property has records on file</span></div>
          <div class="k-cov">
            ${coverage.map((c) => `<div class="k-covbar"><span class="k-covbar__k">${esc(c.label)}</span><span class="k-covbar__track"><span class="k-covbar__fill" style="width:${c.pct}%"></span></span><span class="k-covbar__v">${c.pct}%</span></div>`).join('')}
          </div>
        </div>
      </div>
    </div>

    <div>
      <p class="k-strip-head__label" style="margin-bottom:12px">How Kodu organizes this home</p>
      <div class="k-modelrow">
        ${model.map((m) => `<button type="button" class="k-modelcard k-modelcard--icon" data-action="nav" data-section="${m.to}"><span class="k-modelcard__icon">${m.g}</span><p class="k-modelcard__t">${esc(m.t)}</p><p class="k-modelcard__d">${esc(m.d)}</p></button>`).join('')}
      </div>
    </div>

    <div class="k-rail">
      <div class="k-railcard">
        <div class="k-cardhead"><p class="k-railcard__title" style="margin:0">Recent activity</p><button type="button" class="k-textlink" data-action="nav" data-section="timeline">Full timeline ${G.arrow}</button></div>
        <div class="k-actlist">
          ${recent.map((e) => `<button type="button" class="k-actrow" data-action="open-event" data-id="${e.id}"><span class="k-tlkind k-tlkind--${e.kind.toLowerCase()}">${esc(e.kind)}</span><span class="k-actrow__main"><span class="k-actrow__t">${esc(e.title)}</span><span class="k-actrow__d">${esc(e.date)}</span></span><span class="k-actrow__go">${G.arrow}</span></button>`).join('')}
        </div>
      </div>
      <div class="k-railcard">
        <div class="k-cardhead"><p class="k-railcard__title" style="margin:0">Important records</p><button type="button" class="k-textlink" data-action="nav" data-section="vault">All records ${G.arrow}</button></div>
        <div class="k-reclist">
          ${important.map((r) => `<button type="button" class="k-reclink" data-action="open-record" data-id="${r.id}"><span class="k-reclink__dot" style="background:${CATEGORY_META[r.category].dot}"></span><span class="k-reclink__main"><span class="k-reclink__t">${esc(r.title)}</span><span class="k-reclink__d">${esc(CATEGORY_META[r.category].label)} · ${esc(r.date)}</span></span><span class="k-reclink__go">${G.file}</span></button>`).join('')}
        </div>
      </div>
    </div>

    ${nextSys ? `<div class="k-next">
      <span class="k-next__icon">${bulb}</span>
      <div class="k-next__main">
        <p class="k-next__label">Suggested next step</p>
        <p class="k-next__text"><strong>${esc(nextSys.name)}.</strong> ${esc(nextSys.nextAction)}</p>
      </div>
      <button type="button" class="k-next__cta" data-action="open-system" data-id="${nextSys.id}">Review ${G.arrow}</button>
    </div>` : ''}

    <div class="k-railcard">
      <p class="k-railcard__title">Continue exploring this record</p>
      <div class="k-countgrid">
        ${counts.map(([k, v, to]) => `<button type="button" class="k-countbtn" data-action="nav" data-section="${to}"><span class="k-countbtn__k">${esc(k)}</span><span class="k-countbtn__v">${v}</span></button>`).join('')}
      </div>
    </div>
  </div>`
}

function vaultSection() {
  const cfg = VAULT_LAYERS.find((l) => l.id === state.layer)
  const source = cfg.surface === 'floor' ? FLOOR_ZONES : SITE_ZONES
  const zones = source.filter((z) => cfg.zoneIds.includes(z.id))
  const layerRecords = SAMPLE_RECORDS.filter((r) => r.layer === state.layer)
  const markers = buildMarkers(layerRecords, zones)
  const visible = state.zone ? layerRecords.filter((r) => r.area === state.zone) : layerRecords
  const selectedLabel = state.zone ? (zones.find((z) => z.id === state.zone)?.label ?? null) : null

  const railTop = selectedLabel
    ? `<div class="k-stack-sm">
        <p class="k-msection__b" style="font-size:12px">Showing records connected to this area.</p>
        <button type="button" class="k-textlink" data-action="clear-zone">Clear selection</button>
      </div>`
    : cfg.overview.map((o) => `<div class="k-railrow"><span class="k-railrow__k">${esc(o.label)}</span><span class="k-railrow__v">${esc(o.value)}</span></div>`).join('')

  const strip = visible.length
    ? `<div class="k-recgrid">
        ${visible.map(recordCard).join('')}
        <button type="button" class="k-storecard" data-action="cta-primary">
          <span class="k-storecard__plus">${G.plus}</span>
          <span class="k-storecard__label">Store a ${esc(cfg.label.toLowerCase())} record in this area</span>
        </button>
      </div>`
    : `<div class="k-empty"><p>No records in this area yet.</p><button type="button" class="k-textlink" style="margin-top:8px" data-action="clear-zone">View all ${esc(cfg.label.toLowerCase())} records</button></div>`

  return `<div class="k-section k-anim-slide">
    ${hero(null, 'Vault', cfg.intro)}
    <div class="k-pillrow">
      ${VAULT_LAYERS.map((l) => `<button type="button" class="k-pill${l.id === state.layer ? ' is-active' : ''}" data-action="set-layer" data-layer="${l.id}">${esc(l.label)}</button>`).join('')}
    </div>
    <div class="k-rail">
      ${cfg.surface === 'floor' ? floorPlanSVG(zones, layerRecords, state.zone, 'vault-zone') : sitePlanSVG(zones, layerRecords, state.zone, 'vault-zone')}
      <div class="k-stack-md">
        <div class="k-railcard">
          <p class="k-railcard__title">${esc(selectedLabel || `${cfg.label} overview`)}</p>
          <div>${railTop}</div>
        </div>
        <div class="k-railcard">
          <p class="k-railcard__title">Documents</p>
          <div>${cfg.documents.map((d) => `<div class="k-doc">${G.file}<div style="min-width:0"><p class="k-doc__name">${esc(d.name)}</p><p class="k-doc__type">${esc(d.type)}</p></div></div>`).join('')}</div>
        </div>
      </div>
    </div>
    <div class="k-stack-sm">
      <div class="k-strip-head">
        <p class="k-strip-head__label">${esc(cfg.label)} records <span class="k-strip-head__count">${visible.length}</span></p>
        <span class="k-strip-head__sort">Sort: Newest</span>
      </div>
      ${strip}
    </div>
  </div>`
}

function systemsSection() {
  const groups = ['Major Home Systems', 'Appliances', 'Exterior & Site']
  const statusMeta = {
    good: { label: 'Well documented', color: 'var(--k-verified-text)' },
    building: { label: 'Records building', color: 'var(--k-accent)' },
    attention: { label: 'Worth a look', color: 'var(--k-warn-text)' },
  }
  const blocks = groups.map((group) => {
    const items = SAMPLE_SYSTEMS.filter((s) => s.group === group)
    if (!items.length) return ''
    return `<div class="k-stack-sm">
      <div class="k-grouphead"><span class="k-grouphead__bar"></span><p class="k-grouphead__t">${esc(group)}</p></div>
      <div class="k-sysgrid">
        ${items.map((s) => {
          const st = statusMeta[s.status]
          const media = s.image ? `<div class="k-syscard__media">${evidenceHTML(s.image, { showStamp: true })}</div>` : ''
          return `<button type="button" class="k-syscard" data-action="open-system" data-id="${s.id}">
            ${media}
            <div class="k-syscard__body">
              <p class="k-syscard__name">${esc(s.name)}</p>
              <p class="k-syscard__detail">${esc(s.detail)}</p>
              <p class="k-syscard__age">${esc(s.age)}</p>
              <p class="k-syscard__interval">${esc(s.interval)}</p>
              <div class="k-syscard__status"><span class="k-statusdot" style="background:${st.color}"></span><span>${esc(st.label)}</span></div>
            </div>
          </button>`
        }).join('')}
      </div>
    </div>`
  }).join('')
  return `<div class="k-section k-anim-slide">
    ${hero('Home Systems', 'Systems & Appliances', 'The big-ticket systems and appliances on record — what they are, how old, and what is documented.')}
    ${blocks}
  </div>`
}

function projectsSection() {
  return `<div class="k-section k-anim-slide">
    ${hero('Improvements', 'Projects', 'Renovations and improvements, each tied to the records that prove the work was done.')}
    <div class="k-projgrid">
      ${SAMPLE_PROJECTS.map((p) => {
        const media = p.gallery && p.gallery.length
          ? `<div class="k-projcard__media">${evidenceHTML(p.gallery[0], { showStamp: true })}${p.gallery.length > 1 ? `<span class="k-projcard__badge">${p.gallery.length} images</span>` : ''}</div>`
          : ''
        const recs = p.records.length
          ? p.records.map((id) => { const r = recordById(id); if (!r) return ''; return `<span class="k-recchip"><span class="k-recchip__dot" style="background:${CATEGORY_META[r.category].dot}"></span>${esc(r.title)}</span>` }).join('')
          : '<span class="k-projcard__none">Documented by project photos</span>'
        return `<button type="button" class="k-projcard" data-action="open-project" data-id="${p.id}">
          ${media}
          <div class="k-projcard__body">
            <div class="k-projcard__top"><p class="k-projcard__title">${esc(p.title)}</p><span class="k-projcard__year">${esc(p.year)}</span></div>
            <p class="k-projcard__summary">${esc(p.summary)}</p>
            <div class="k-projcard__rec">${recs}</div>
          </div>
        </button>`
      }).join('')}
    </div>
  </div>`
}

function timelineSection() {
  const dateParts = (d) => {
    const m = String(d).match(/^([A-Za-z]{3,})\s+(\d{4})$/)
    return m ? { top: m[1], bot: m[2] } : { top: String(d), bot: '' }
  }
  return `<div class="k-section k-anim-slide">
    ${hero('History', 'Timeline', 'The story of the home, in order — what happened, why it matters, and the proof behind each moment.')}
    <div class="k-tl">
      ${SAMPLE_TIMELINE.map((e) => {
        const dp = dateParts(e.date)
        const thumb = e.image ? `<div class="k-tlcard__thumb">${evidenceHTML(e.image, { showStamp: false })}</div>` : ''
        const proof = (e.proof || []).slice(0, 2).map((pf) => `<span class="k-proofchip">${G.file}${esc(pf)}</span>`).join('')
        const sectionChip = e.section ? `<span class="k-proofchip k-proofchip--ghost">${esc(e.section)}</span>` : ''
        return `<div class="k-tlrow">
          <div class="k-tlrail">
            <span class="k-tlrail__top">${esc(dp.top)}</span>
            ${dp.bot ? `<span class="k-tlrail__bot">${esc(dp.bot)}</span>` : ''}
          </div>
          <div class="k-tltrack"><span class="k-tltrack__dot"></span></div>
          <button type="button" class="k-tlcard k-tlcard--lg" data-action="open-event" data-id="${e.id}">
            <div class="k-tlcard__top">
              <span class="k-tlkind k-tlkind--${e.kind.toLowerCase()}">${esc(e.kind)}</span>
              <span class="k-tlcard__open">What happened · why it matters · the proof ${G.arrow}</span>
            </div>
            <div class="k-tlcard__row">
              <div class="k-tlcard__main">
                <p class="k-tlcard__title">${esc(e.title)}</p>
                <p class="k-tlcard__what">${esc(e.what)}</p>
                <div class="k-tlcard__proof">${proof}${sectionChip}</div>
              </div>
              ${thumb}
            </div>
          </button>
        </div>`
      }).join('')}
    </div>
  </div>`
}

function guidanceSection() {
  return `<div class="k-section k-anim-slide">
    ${hero('Learn your home', 'Guidance', 'Calm, plain-language notes about what matters for this home — never alarmist, always explained.')}
    <div class="k-guidegrid">
      ${SAMPLE_GUIDANCE.map((g) => `<button type="button" class="k-guidecard" data-action="open-guidance" data-id="${g.id}">
        <span class="k-tag">${esc(g.tag)}</span>
        <p class="k-guidecard__title">${esc(g.title)}</p>
        <p class="k-guidecard__plain">${esc(g.plain)}</p>
        <span class="k-guidecard__more">Why this matters ${G.arrow}</span>
      </button>`).join('')}
    </div>
  </div>`
}

function sectionHTML() {
  switch (state.section) {
    case 'overview': return overviewSection()
    case 'vault': return vaultSection()
    case 'systems': return systemsSection()
    case 'projects': return projectsSection()
    case 'timeline': return timelineSection()
    case 'guidance': return guidanceSection()
    default: return overviewSection()
  }
}

// ── Chrome (banner, nav, cta, footer) ─────────────────────────────────────────
function chromeHTML() {
  const nav = NAV_ITEMS.map((n) => `<button type="button" class="k-nav__item${n.id === state.section ? ' is-active' : ''}" data-action="nav" data-section="${n.id}">${esc(n.label)}</button>`).join('')
  return `
    <div class="k-banner">
      <div class="k-banner__inner">${G.shield}<p class="k-banner__text">This is a sample Kodu record built with fictional property data. Your real property record is private and controlled by verified access.</p></div>
    </div>
    <nav class="k-nav">
      <div class="k-nav__inner">
        <span class="k-wordmark">Kodu <span>Record</span></span>
        <div class="k-nav__items">${nav}</div>
        <div class="k-nav__right">
          <button type="button" class="k-nav__cta" data-action="cta-primary">Create your record</button>
          <span class="k-nav__bell">${G.bell}</span>
          <span class="k-avatar">MR</span>
        </div>
      </div>
    </nav>
    <main class="k-container k-main" id="tk-main">${sectionHTML()}
      <div class="k-cta">
        <p class="k-cta__eyebrow">Your home, on the record</p>
        <h2 class="k-cta__title">Start your home&rsquo;s private memory.</h2>
        <p class="k-cta__sub">Everything you just explored — kept private, owned by you, and ready when it matters. Kodu is invite-only while we are in early access.</p>
        <div class="k-cta__actions">
          <button type="button" class="k-cta__primary" data-action="cta-primary">Create your private property record ${G.arrow}</button>
          <button type="button" class="k-cta__secondary" data-action="cta-secondary">Explore how Kodu organizes proof</button>
        </div>
        <p class="k-cta__fine">No public profiles. No public search.</p>
      </div>
    </main>
    <footer class="k-footer">
      <div class="k-footer__inner">
        <span class="k-footer__mark">Kodu <span>Record</span></span>
        <p class="k-footer__fine">Sample data shown for demonstration. Private by design — your record is yours alone.</p>
      </div>
    </footer>`
}

// ── Modals ────────────────────────────────────────────────────────────────────
function metaRowsHTML(rows) {
  if (!rows || !rows.length) return ''
  return `<div class="k-metagrid">${rows.map((r) => `<div style="min-width:0"><p class="k-metagrid__k">${esc(r.label)}</p><p class="k-metagrid__v">${esc(r.value)}</p></div>`).join('')}</div>`
}
function sectionsHTML(sections) {
  return sections.map((s) => `<div>
    <p class="k-msection__h">${esc(s.heading)}</p>
    ${s.body ? `<p class="k-msection__b">${esc(s.body)}</p>` : ''}
    ${s.items ? `<ul class="k-mlist">${s.items.map((it) => `<li>${G.file}${esc(it)}</li>`).join('')}</ul>` : ''}
  </div>`).join('')
}
function modalShell({ pill, title, meta, mediaHTML, metaRows, sections, extraHTML }) {
  return `<div class="k-modal-overlay" data-action="close-modal-bg">
    <div class="k-modal-scrim"></div>
    <div class="k-modal k-anim-slide" role="dialog" aria-modal="true" aria-label="${esc(title)}">
      <div class="k-modal__header">
        <div style="min-width:0">
          ${pill ? `<span class="k-modal__pill"><span class="k-catpill__dot" style="background:${pill.dot}"></span>${esc(pill.label)}</span>` : ''}
          <h2 class="k-modal__title">${esc(title)}</h2>
          ${meta ? `<p class="k-modal__meta">${esc(meta)}</p>` : ''}
        </div>
        <button type="button" class="k-modal__close" data-action="close-modal" aria-label="Close">${G.close}</button>
      </div>
      ${mediaHTML ? `<div class="k-modal__mediawrap"><div class="k-modal__media">${mediaHTML}</div>${metaRowsHTML(metaRows)}</div>` : ''}
      <div class="k-modal__body">
        ${sectionsHTML(sections)}
        ${extraHTML || ''}
      </div>
      <div class="k-modal__footer">
        <p>Sample record</p>
        <button type="button" class="k-modal__cta" data-action="cta-primary">Start your private record ${G.arrow}</button>
      </div>
    </div>
  </div>`
}

function openModal(html) {
  $('tk-modal-root').innerHTML = html
  document.body.style.overflow = 'hidden'
}
function closeModal() {
  $('tk-modal-root').innerHTML = ''
  document.body.style.overflow = ''
}

function recordModalHTML(r) {
  const sections = [
    { heading: 'What this is', body: r.summary },
    { heading: 'Why it matters', body: r.why },
    { heading: 'Where the proof lives', items: r.proof },
  ]
  if (r.nextAction) sections.push({ heading: 'Suggested next step', body: r.nextAction })
  const metaRows = r.image ? [
    { label: 'Document type', value: r.image.docType },
    { label: 'Section', value: r.areaLabel },
    ...(r.relatedTo ? [{ label: 'Related', value: r.relatedTo }] : []),
    { label: 'Date', value: r.date },
  ] : null
  return modalShell({
    pill: { label: CATEGORY_META[r.category].label, dot: CATEGORY_META[r.category].dot },
    title: r.title, meta: `${r.areaLabel} · ${r.date}`,
    mediaHTML: r.image ? evidenceHTML(r.image, { dateLabel: r.date, showStamp: true }) : null,
    metaRows, sections,
  })
}
function systemModalHTML(s) {
  const sections = [
    { heading: 'Age', body: s.age },
    { heading: 'Recommended service', body: s.interval },
    { heading: 'On record', body: s.note },
  ]
  if (s.why) sections.push({ heading: 'Why it matters', body: s.why })
  if (s.nextAction) sections.push({ heading: 'Suggested next step', body: s.nextAction })
  const metaRows = s.image ? [
    { label: 'Document type', value: s.image.docType },
    { label: 'Group', value: s.group },
    { label: 'Age', value: s.age },
    { label: 'On record', value: s.note },
  ] : null
  return modalShell({
    pill: { label: s.group, dot: 'var(--k-accent)' },
    title: s.name, meta: s.detail,
    mediaHTML: s.image ? evidenceHTML(s.image, { showStamp: true }) : null,
    metaRows, sections,
  })
}
function projectModalHTML(p) {
  const sections = [
    { heading: 'What was done', body: p.summary },
    { heading: 'Why it matters', body: p.value },
  ]
  if (p.completionNote) sections.push({ heading: 'Completion note', body: p.completionNote })
  sections.push({
    heading: 'Linked records',
    items: p.records.length ? p.records.map((id) => recordById(id)?.title ?? id) : ['Documented by the project gallery'],
  })
  if (p.nextAction) sections.push({ heading: 'Suggested next step', body: p.nextAction })
  const metaRows = [
    { label: 'Section', value: p.section },
    { label: 'Year', value: p.year },
    ...(p.gallery ? [{ label: 'Gallery', value: `${p.gallery.length} images` }] : []),
    { label: 'Linked records', value: String(p.records.length) },
  ]
  const gallery = p.gallery && p.gallery.length
    ? `<div><p class="k-msection__h">Project gallery</p><div class="k-pgallery">${p.gallery.map((g) => `<figure><div class="k-pgallery__media">${evidenceHTML(g, { showStamp: false })}</div><figcaption>${esc(g.caption)}</figcaption></figure>`).join('')}</div></div>`
    : ''
  const tlRows = [`<div class="k-ptl"><span class="k-ptl__dot k-ptl__dot--solid"></span><p class="k-ptl__t">Project completed</p><p class="k-ptl__d">${esc(p.year)}</p></div>`]
    .concat(p.records.map((id) => { const r = recordById(id); if (!r) return ''; return `<div class="k-ptl"><span class="k-ptl__dot k-ptl__dot--ring"></span><p class="k-ptl__t">${esc(r.title)}</p><p class="k-ptl__d">${esc(r.date)}</p></div>` }))
    .join('')
  const timeline = `<div><p class="k-msection__h">Project timeline</p><div class="k-ptimeline"><span class="k-ptimeline__line"></span><div>${tlRows}</div></div></div>`
  return modalShell({
    pill: { label: `Project · ${p.year}`, dot: 'var(--k-accent)' },
    title: p.title, meta: p.section,
    mediaHTML: p.gallery && p.gallery.length ? evidenceHTML(p.gallery[0], { showStamp: true }) : null,
    metaRows, sections, extraHTML: `<div class="k-modal__body" style="padding:0">${gallery}${timeline}</div>`,
  })
}
function eventModalHTML(e) {
  const sections = [
    { heading: 'What happened', body: e.what },
    { heading: 'Why it matters', body: e.why },
    { heading: 'The proof behind it', items: e.proof },
  ]
  if (e.nextAction) sections.push({ heading: 'Suggested next step', body: e.nextAction })
  const related = (e.records || []).map((id) => recordById(id)).filter(Boolean)
  const relatedHTML = related.length
    ? `<div class="k-modal__body" style="padding-top:0"><p class="k-msection__h">Related records</p><div class="k-reclist">${related.map((r) => `<button type="button" class="k-reclink" data-action="open-record" data-id="${r.id}"><span class="k-reclink__dot" style="background:${CATEGORY_META[r.category].dot}"></span><span class="k-reclink__main"><span class="k-reclink__t">${esc(r.title)}</span><span class="k-reclink__d">${esc(CATEGORY_META[r.category].label)} · ${esc(r.date)}</span></span><span class="k-reclink__go">${G.file}</span></button>`).join('')}</div></div>`
    : ''
  const metaRows = [
    { label: 'Event type', value: e.kind },
    { label: 'Section', value: e.section },
    { label: 'Date', value: e.date },
    ...(e.image ? [{ label: 'Attached', value: e.image.type === 'photo' ? 'Photo' : 'Document' }] : []),
  ]
  return modalShell({
    pill: { label: e.kind, dot: 'var(--k-accent)' },
    title: e.title, meta: `${e.section} · ${e.date}`,
    mediaHTML: e.image ? evidenceHTML(e.image, { dateLabel: e.date }) : null,
    metaRows, sections, extraHTML: relatedHTML,
  })
}
function guidanceModalHTML(g) {
  return modalShell({
    pill: { label: g.tag, dot: 'var(--k-verified-text)' },
    title: g.title, meta: g.section,
    sections: [
      { heading: 'In plain language', body: g.plain },
      { heading: 'Why it matters', body: g.why },
      { heading: 'A calm next step', body: g.next },
    ],
  })
}

// ── Journey guide ─────────────────────────────────────────────────────────────
function renderGuide() {
  const root = $('tk-guide-root')
  if (state.guideDismissed) { root.innerHTML = ''; return }
  const steps = [
    { id: 'blueprint', text: 'Select a room on the blueprint — the property\u2019s structure is what organizes its records.', actionLabel: 'Go to the blueprint', to: 'overview' },
    { id: 'record', text: 'Open a record to see the proof behind it — the receipt, permit, or photo.', actionLabel: 'Open the vault', to: 'vault' },
    { id: 'timeline', text: 'Open a timeline event to see the home\u2019s story, in order.', actionLabel: 'Go to the timeline', to: 'timeline' },
    { id: 'guidance', text: 'Read a guidance note to understand what matters for this home — and why.', actionLabel: 'Go to guidance', to: 'guidance' },
  ]
  const completed = steps.filter((s) => state.journey[s.id]).length
  const isFinal = completed >= steps.length
  const active = isFinal ? null : steps[completed]
  const total = steps.length + 1
  const text = active ? active.text : 'That\u2019s Kodu — a calm, private memory for everything about a home.'
  const dots = Array.from({ length: total }).map((_, i) => `<span class="k-guide__dot ${i <= completed ? 'k-guide__dot--on' : 'k-guide__dot--off'}"></span>`).join('')
  const actionHTML = isFinal
    ? `<button type="button" class="k-guide__cta" data-action="cta-primary">Create your private property record ${G.arrow}</button>`
    : `<button type="button" class="k-guide__action" data-action="guide-go" data-to="${active.to}">${esc(active.actionLabel)} ${G.arrow}</button>`
  root.innerHTML = `<div class="k-guide"><div class="k-guide__card k-anim-slide">
    <div class="k-guide__row">
      <span class="k-guide__icon">${G.compass}</span>
      <div class="k-guide__main">
        <p class="k-guide__step">A quiet walkthrough · Step ${completed + 1} of ${total}</p>
        <p class="k-guide__text">${esc(text)}</p>
        <div class="k-guide__dots">${dots}</div>
        <div class="k-guide__actions">${actionHTML}</div>
      </div>
      <button type="button" class="k-guide__dismiss" data-action="guide-dismiss" aria-label="Dismiss walkthrough">${G.close}</button>
    </div>
  </div></div>`
}

// ── Render + navigation ───────────────────────────────────────────────────────
function renderChrome() {
  $('tk-root').innerHTML = chromeHTML()
}
function navigate(section) {
  state.section = section
  window.scrollTo({ top: 0, behavior: 'smooth' })
  renderChrome(); renderGuide()
}
function goToVaultZone(layer, zone) {
  if (zone) markStep('blueprint')
  state.section = 'vault'; state.layer = layer; state.zone = zone
  window.scrollTo({ top: 0, behavior: 'smooth' })
  renderChrome(); renderGuide()
}

// ── Event wiring (delegation) ─────────────────────────────────────────────────
function onClick(ev) {
  const t = ev.target.closest('[data-action]')
  if (!t) return
  const a = t.getAttribute('data-action')
  switch (a) {
    case 'nav': navigate(t.getAttribute('data-section')); break
    case 'set-layer': state.layer = t.getAttribute('data-layer'); state.zone = null; renderChrome(); break
    case 'clear-zone': state.zone = null; renderChrome(); break
    case 'vault-zone': {
      const z = t.getAttribute('data-zone'); markStep('blueprint')
      state.zone = state.zone === z ? null : z; renderChrome(); renderGuide(); break
    }
    case 'overview-zone': {
      const z = t.getAttribute('data-zone')
      const utility = ['hvac', 'water-heater', 'electrical']
      goToVaultZone(utility.includes(z) ? 'utility' : 'interior', z); break
    }
    case 'zoom-in': state.scale = Math.min(2, +(state.scale + 0.15).toFixed(2)); renderChrome(); break
    case 'zoom-out': state.scale = Math.max(0.6, +(state.scale - 0.15).toFixed(2)); renderChrome(); break
    case 'open-record': { const r = recordById(t.getAttribute('data-id')); if (r) { markStep('record'); openModal(recordModalHTML(r)) } break }
    case 'open-system': { const s = SAMPLE_SYSTEMS.find((x) => x.id === t.getAttribute('data-id')); if (s) openModal(systemModalHTML(s)); break }
    case 'open-project': { const p = SAMPLE_PROJECTS.find((x) => x.id === t.getAttribute('data-id')); if (p) openModal(projectModalHTML(p)); break }
    case 'open-event': { const e = SAMPLE_TIMELINE.find((x) => x.id === t.getAttribute('data-id')); if (e) { markStep('timeline'); openModal(eventModalHTML(e)) } break }
    case 'open-guidance': { const g = SAMPLE_GUIDANCE.find((x) => x.id === t.getAttribute('data-id')); if (g) { markStep('guidance'); openModal(guidanceModalHTML(g)) } break }
    case 'guide-go': navigate(t.getAttribute('data-to')); break
    case 'guide-dismiss': state.guideDismissed = true; renderGuide(); break
    case 'cta-primary': goRequestAccess(); break
    case 'cta-secondary': navigate('vault'); break
    case 'close-modal': closeModal(); break
    case 'close-modal-bg': if (ev.target.classList.contains('k-modal-overlay') || ev.target.classList.contains('k-modal-scrim')) closeModal(); break
  }
}

export function initTryKodu() {
  renderChrome()
  renderGuide()
  document.addEventListener('click', onClick)
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal() })
}

if (typeof document !== 'undefined' && document.getElementById('tk-root')) {
  initTryKodu()
}
