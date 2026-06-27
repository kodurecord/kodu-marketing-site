'use client'

// ── app/sample-record/sampleImages.tsx ───────────────────────────────────────
//
// Synthetic "evidence" imagery for the public sample record.
//
// WHY SYNTHETIC SVG, NOT PHOTOS OR STOCK:
//   A public preview must feel product-real AND be unmistakably fictional with
//   zero real data. Real photos would risk depicting a real property; doctored
//   document scans would risk fake-looking real paperwork. Instead, every image
//   here is a self-contained, flat-fill SVG that reads as believable homeowner
//   proof — an invoice, a warranty, a serial plate, a condenser photo — while
//   containing no real names, addresses, numbers, or personal information.
//   Each carries a small SAMPLE marker so it is never mistaken for real evidence.
//
//   Flat fills only (no gradients / no shared SVG ids) so any number of these
//   can render on one page without id collisions. Colors stay close to the Kodu
//   palette, with a few natural tones reserved for photo-style scenes.
// ─────────────────────────────────────────────────────────────────────────────

import type { ImageKind } from './sampleData'

// Palette — Kodu tokens plus a small set of natural photo tones.
const C = {
  ink: '#1B2A3B',
  sub: '#6B7A8D',
  faint: '#AEB9C6',
  line: '#D7DEE6',
  paper: '#FCFCFA',
  paper2: '#F0F1EC',
  accent: '#2D7DD2',
  accentSoft: '#DCEBFA',
  surface: '#ECEFF3',
  metal: '#AEB6BF',
  metalDark: '#727C87',
  metalLight: '#C9D0D8',
  concrete: '#CDD1D6',
  sky: '#CBDDEE',
  grass: '#A4BC8B',
  grassDark: '#8AA673',
  soil: '#A07C56',
  soilDark: '#7C5E3E',
  gravel: '#BCC0C5',
  wood: '#C39A65',
  woodDark: '#946E40',
  woodWorn: '#A7A293',
  shingle: '#7E8893',
  shingleDark: '#67707A',
  red: '#C0584F',
  green: '#3E9E6E',
  copper: '#BC7A43',
  amber: '#D8A24A',
  cream: '#EDE7DA',
  white: '#FFFFFF',
}

const DOC_KINDS: ImageKind[] = [
  'doc-invoice',
  'doc-receipt',
  'doc-warranty',
  'doc-permit',
  'doc-survey',
  'doc-insurance',
  'doc-checklist',
]

export function isDocKind(kind: ImageKind): boolean {
  return DOC_KINDS.includes(kind)
}

// ── Small primitives ──────────────────────────────────────────────────────────

function Bar({ x, y, w, h, c, r = 1.5 }: { x: number; y: number; w: number; h: number; c: string; r?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill={c} />
}

// ── Documents ─────────────────────────────────────────────────────────────────

type DocBody = 'table' | 'receipt' | 'seal' | 'permit' | 'plot' | 'placeholder' | 'checks'

const DOC_CONFIG: Record<string, { label: string; accent: string; body: DocBody }> = {
  'doc-invoice': { label: 'INVOICE', accent: C.accent, body: 'table' },
  'doc-receipt': { label: 'RECEIPT', accent: C.green, body: 'receipt' },
  'doc-warranty': { label: 'WARRANTY', accent: C.copper, body: 'seal' },
  'doc-permit': { label: 'BUILDING PERMIT', accent: '#3E6E9E', body: 'permit' },
  'doc-survey': { label: 'PLAT OF SURVEY', accent: '#5B6B7B', body: 'plot' },
  'doc-insurance': { label: 'POLICY · RESERVED', accent: C.sub, body: 'placeholder' },
  'doc-checklist': { label: 'MAINTENANCE CHECKLIST', accent: C.accent, body: 'checks' },
}

function DocBodyContent({ body, accent }: { body: DocBody; accent: string }) {
  // The page interior spans roughly x:118..282, y:96..256.
  switch (body) {
    case 'table':
      return (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <Bar x={122} y={104 + i * 20} w={96} h={6} c={C.line} />
              <Bar x={236} y={104 + i * 20} w={44} h={6} c={C.faint} />
            </g>
          ))}
          <line x1={122} y1={192} x2={282} y2={192} stroke={C.line} strokeWidth={1} />
          <Bar x={122} y={202} w={60} h={8} c={C.sub} />
          <rect x={224} y={199} width={58} height={16} rx={3} fill={accent} opacity={0.16} />
          <Bar x={232} y={204} w={42} h={7} c={accent} />
          <text x={122} y={236} fontSize={9} fontWeight={700} fill={C.sub} letterSpacing="0.5">
            TOTAL
          </text>
        </g>
      )
    case 'receipt':
      return (
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <Bar x={132} y={102 + i * 16} w={78} h={5} c={C.line} />
              <Bar x={234} y={102 + i * 16} w={30} h={5} c={C.faint} />
            </g>
          ))}
          <line x1={132} y1={188} x2={264} y2={188} stroke={C.line} strokeWidth={1} strokeDasharray="3 3" />
          <Bar x={132} y={198} w={50} h={7} c={C.sub} />
          <Bar x={224} y={198} w={40} h={7} c={C.green} />
          <g transform="translate(198 232)">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <rect key={i} x={i * 7} y={0} width={i % 2 ? 2 : 4} height={20} fill={C.ink} />
            ))}
          </g>
        </g>
      )
    case 'seal':
      return (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <Bar key={i} x={122} y={104 + i * 16} w={i === 3 ? 96 : 150} h={6} c={C.line} />
          ))}
          <Bar x={122} y={176} w={120} h={6} c={C.line} />
          <Bar x={122} y={190} w={88} h={6} c={C.line} />
          {/* embossed seal */}
          <circle cx={250} cy={222} r={26} fill="none" stroke={accent} strokeWidth={2} opacity={0.7} />
          <circle cx={250} cy={222} r={20} fill="none" stroke={accent} strokeWidth={1} opacity={0.5} />
          <path d="M240 222l7 7 14-15" fill="none" stroke={accent} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )
    case 'permit':
      return (
        <g>
          <rect x={120} y={98} width={162} height={20} rx={2} fill={accent} opacity={0.12} />
          <Bar x={126} y={105} w={70} h={7} c={accent} />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <Bar x={122} y={130 + i * 16} w={40} h={6} c={C.faint} />
              <Bar x={172} y={130 + i * 16} w={86} h={6} c={C.line} />
            </g>
          ))}
          {/* approval stamp ring */}
          <circle cx={246} cy={216} r={24} fill="none" stroke={C.red} strokeWidth={2} opacity={0.55} transform="rotate(-12 246 216)" />
          <rect x={228} y={209} width={36} height={14} fill={C.red} opacity={0.1} transform="rotate(-12 246 216)" />
          <path d="M236 216l6 6 12-13" fill="none" stroke={C.red} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" opacity={0.7} />
        </g>
      )
    case 'plot':
      return (
        <g>
          {/* parcel + house footprint */}
          <rect x={130} y={104} width={140} height={104} fill="none" stroke={C.sub} strokeWidth={1.5} />
          <rect x={160} y={130} width={78} height={56} fill={accent} opacity={0.12} stroke={accent} strokeWidth={1} />
          <line x1={130} y1={150} x2={160} y2={150} stroke={C.faint} strokeWidth={1} strokeDasharray="2 2" />
          <line x1={238} y1={150} x2={270} y2={150} stroke={C.faint} strokeWidth={1} strokeDasharray="2 2" />
          {/* dimension ticks */}
          <line x1={130} y1={216} x2={270} y2={216} stroke={C.sub} strokeWidth={1} />
          <line x1={130} y1={213} x2={130} y2={219} stroke={C.sub} strokeWidth={1} />
          <line x1={270} y1={213} x2={270} y2={219} stroke={C.sub} strokeWidth={1} />
          <Bar x={150} y={230} w={100} h={6} c={C.line} />
          {/* north arrow */}
          <path d="M256 96l4 10h-8z" fill={C.sub} />
        </g>
      )
    case 'placeholder':
      return (
        <g>
          <rect x={132} y={120} width={136} height={86} rx={6} fill="none" stroke={C.faint} strokeWidth={1.6} strokeDasharray="5 4" />
          <circle cx={200} cy={150} r={13} fill="none" stroke={C.accent} strokeWidth={1.6} />
          <path d="M200 144v12M194 150h12" stroke={C.accent} strokeWidth={1.6} strokeLinecap="round" />
          <Bar x={166} y={174} w={68} h={6} c={C.line} />
          <Bar x={176} y={186} w={48} h={5} c={C.faint} />
          <text x={200} y={232} fontSize={9} fontWeight={600} fill={C.sub} textAnchor="middle">
            Reserved — add your policy
          </text>
        </g>
      )
    case 'checks':
      return (
        <g>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <rect x={122} y={104 + i * 22} width={11} height={11} rx={2} fill="none" stroke={C.faint} strokeWidth={1.4} />
              {i < 4 && (
                <path
                  d={`M124 ${110 + i * 22}l3 3 5-6`}
                  fill="none"
                  stroke={accent}
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
              <Bar x={142} y={107 + i * 22} w={i % 2 ? 96 : 122} h={6} c={C.line} />
            </g>
          ))}
        </g>
      )
  }
}

function DocScene({ kind }: { kind: ImageKind }) {
  const cfg = DOC_CONFIG[kind] ?? DOC_CONFIG['doc-invoice']
  return (
    <g>
      <rect x={0} y={0} width={400} height={300} fill={C.surface} />
      {/* desk texture hint */}
      <rect x={0} y={232} width={400} height={68} fill="#E4E8ED" />
      {/* page, gently tilted as if photographed on a surface */}
      <g transform="rotate(-2.4 200 150)">
        <rect x={106} y={36} width={188} height={230} rx={3} fill="#00000010" transform="translate(4 5)" />
        <rect x={102} y={32} width={188} height={230} rx={3} fill={C.paper} stroke={C.line} strokeWidth={1} />
        {/* header */}
        <rect x={102} y={32} width={188} height={34} rx={3} fill={cfg.accent} opacity={0.1} />
        <rect x={114} y={42} width={16} height={16} rx={3} fill={cfg.accent} opacity={0.8} />
        <text x={138} y={54} fontSize={10} fontWeight={700} fill={cfg.accent} letterSpacing="0.4">
          {cfg.label}
        </text>
        <Bar x={114} y={74} w={92} h={5} c={C.faint} />
        <Bar x={114} y={84} w={60} h={5} c={C.line} />
        <DocBodyContent body={cfg.body} accent={cfg.accent} />
        {/* watermark */}
        <text
          x={196}
          y={170}
          fontSize={34}
          fontWeight={800}
          fill={C.ink}
          opacity={0.05}
          textAnchor="middle"
          transform="rotate(-18 196 170)"
          letterSpacing="2"
        >
          SAMPLE
        </text>
      </g>
    </g>
  )
}

// ── Photo-style scenes ────────────────────────────────────────────────────────

function Wall({ tone = C.surface }: { tone?: string }) {
  return (
    <g>
      <rect x={0} y={0} width={400} height={300} fill={tone} />
      {[60, 120, 180, 240].map((y) => (
        <line key={y} x1={0} y1={y} x2={400} y2={y} stroke="#00000008" strokeWidth={6} />
      ))}
    </g>
  )
}

function SceneHVAC() {
  return (
    <g>
      <Wall tone="#DDE3EA" />
      <rect x={0} y={232} width={400} height={68} fill={C.concrete} />
      <rect x={86} y={236} width={228} height={14} fill="#B7BCC2" />
      <ellipse cx={200} cy={250} rx={120} ry={10} fill="#00000012" />
      {/* unit */}
      <rect x={120} y={96} width={160} height={150} rx={8} fill={C.metal} stroke={C.metalDark} strokeWidth={2} />
      <rect x={120} y={96} width={160} height={150} rx={8} fill="#FFFFFF" opacity={0.06} />
      {/* fan grille */}
      <circle cx={200} cy={150} r={52} fill="#5B636C" />
      <circle cx={200} cy={150} r={52} fill="none" stroke={C.metalDark} strokeWidth={3} />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2
        return (
          <line
            key={i}
            x1={200 + Math.cos(a) * 12}
            y1={150 + Math.sin(a) * 12}
            x2={200 + Math.cos(a) * 50}
            y2={150 + Math.sin(a) * 50}
            stroke="#7B838C"
            strokeWidth={2}
          />
        )
      })}
      <circle cx={200} cy={150} r={11} fill={C.metalLight} stroke={C.metalDark} strokeWidth={2} />
      {/* side fins */}
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={i} x1={130 + i * 3} y1={200} x2={130 + i * 3} y2={238} stroke="#8A929B" strokeWidth={1} />
      ))}
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={i} x1={228 + i * 3} y1={200} x2={228 + i * 3} y2={238} stroke="#8A929B" strokeWidth={1} />
      ))}
      {/* label + copper lineset */}
      <rect x={176} y={206} width={48} height={20} rx={2} fill={C.metalLight} stroke={C.metalDark} strokeWidth={1} />
      <path d="M280 130c26 0 26 30 40 30" fill="none" stroke={C.copper} strokeWidth={5} strokeLinecap="round" />
      <path d="M280 142c20 0 20 26 40 26" fill="none" stroke={C.copper} strokeWidth={5} strokeLinecap="round" opacity={0.7} />
    </g>
  )
}

function ScenePlate() {
  return (
    <g>
      <rect x={0} y={0} width={400} height={300} fill="#C7CDD3" />
      {/* tank curvature */}
      <rect x={0} y={0} width={70} height={300} fill="#B0B7BE" />
      <rect x={64} y={0} width={10} height={300} fill="#9AA2AA" />
      {/* rating plate */}
      <rect x={104} y={64} width={208} height={172} rx={6} fill={C.metalLight} stroke={C.metalDark} strokeWidth={2} />
      <rect x={104} y={64} width={208} height={28} rx={6} fill={C.ink} />
      <text x={120} y={83} fontSize={11} fontWeight={700} fill="#E8EDF2" letterSpacing="0.5">
        RATING PLATE
      </text>
      {/* barcode */}
      <g transform="translate(120 104)">
        {Array.from({ length: 22 }).map((_, i) => (
          <rect key={i} x={i * 5} y={0} width={i % 3 ? 1.6 : 3} height={26} fill={C.ink} />
        ))}
      </g>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <Bar x={120} y={146 + i * 18} w={48} h={6} c={C.metalDark} />
          <Bar x={180} y={146 + i * 18} w={110} h={6} c="#8C949D" />
        </g>
      ))}
      {[
        [116, 76],
        [300, 76],
        [116, 224],
        [300, 224],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={3} fill={C.metalDark} />
      ))}
    </g>
  )
}

function ScenePanel() {
  return (
    <g>
      <Wall tone="#D7DCE2" />
      {/* panel box */}
      <rect x={112} y={44} width={176} height={212} rx={4} fill="#9DA5AE" stroke={C.metalDark} strokeWidth={2} />
      {/* open door to the side */}
      <rect x={288} y={44} width={26} height={212} rx={3} fill="#AEB6BE" stroke={C.metalDark} strokeWidth={1.5} />
      <rect x={124} y={56} width={152} height={188} rx={2} fill="#2E3640" />
      {/* center bus */}
      <rect x={196} y={64} width={8} height={172} rx={2} fill="#5A626B" />
      {/* breakers */}
      {Array.from({ length: 11 }).map((_, i) => (
        <g key={`l${i}`}>
          <rect x={132} y={66 + i * 15} width={56} height={11} rx={2} fill={i % 4 === 0 ? '#3C8A5E' : '#414A54'} />
          <rect x={168} y={68 + i * 15} width={8} height={7} rx={1} fill="#1F252C" />
        </g>
      ))}
      {Array.from({ length: 11 }).map((_, i) => (
        <g key={`r${i}`}>
          <rect x={212} y={66 + i * 15} width={56} height={11} rx={2} fill={i % 3 === 0 ? '#B5894A' : '#414A54'} />
          <rect x={224} y={68 + i * 15} width={8} height={7} rx={1} fill="#1F252C" />
        </g>
      ))}
      {/* label strip */}
      <rect x={132} y={234} width={136} height={4} rx={1} fill="#C9D0D8" />
    </g>
  )
}

function SceneShutoff() {
  return (
    <g>
      <Wall tone="#DCE1E7" />
      <rect x={0} y={250} width={400} height={50} fill={C.concrete} />
      {/* pipe */}
      <rect x={188} y={40} width={24} height={230} fill={C.metalLight} stroke={C.metalDark} strokeWidth={2} />
      <rect x={188} y={40} width={8} height={230} fill="#FFFFFF" opacity={0.25} />
      {/* valve body */}
      <rect x={172} y={140} width={56} height={40} rx={6} fill={C.metalDark} />
      {/* red quarter-turn lever */}
      <rect x={150} y={154} width={96} height={12} rx={6} fill={C.red} transform="rotate(-24 200 160)" />
      <circle cx={200} cy={160} r={7} fill="#7E332D" />
      {/* bracket */}
      <rect x={182} y={90} width={36} height={8} rx={2} fill={C.metalDark} />
      {/* gauge */}
      <circle cx={250} cy={120} r={18} fill={C.white} stroke={C.metalDark} strokeWidth={2} />
      <line x1={250} y1={120} x2={258} y2={110} stroke={C.red} strokeWidth={2} strokeLinecap="round" />
      <rect x={244} y={138} width={12} height={18} fill={C.metalLight} stroke={C.metalDark} strokeWidth={1} />
    </g>
  )
}

function SceneGasMeter() {
  return (
    <g>
      <Wall tone="#D9DEE4" />
      <rect x={0} y={250} width={400} height={50} fill={C.grass} />
      {/* risers */}
      <rect x={150} y={150} width={14} height={120} fill={C.amber} stroke="#B07F2E" strokeWidth={1.5} />
      <rect x={236} y={150} width={14} height={120} fill={C.amber} stroke="#B07F2E" strokeWidth={1.5} />
      {/* meter body */}
      <circle cx={200} cy={132} r={58} fill="#E7E2D6" stroke={C.metalDark} strokeWidth={3} />
      <circle cx={200} cy={132} r={58} fill="#FFFFFF" opacity={0.12} />
      {/* regulator dome */}
      <ellipse cx={200} cy={86} rx={30} ry={18} fill={C.metal} stroke={C.metalDark} strokeWidth={2} />
      {/* index dials */}
      {[
        [180, 126],
        [200, 120],
        [220, 126],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={11} fill={C.white} stroke={C.metalDark} strokeWidth={1.5} />
          <line x1={cx} y1={cy} x2={cx + 6} y2={cy - 5} stroke={C.ink} strokeWidth={1.5} strokeLinecap="round" />
        </g>
      ))}
      <rect x={176} y={148} width={48} height={10} rx={2} fill={C.metalLight} stroke={C.metalDark} strokeWidth={1} />
    </g>
  )
}

function SceneController() {
  return (
    <g>
      <Wall tone="#DDE2E8" />
      {/* box */}
      <rect x={120} y={66} width={160} height={168} rx={10} fill={C.cream} stroke="#B8AF99" strokeWidth={2} />
      <rect x={120} y={66} width={160} height={32} rx={10} fill="#D9D1BD" />
      {/* screen */}
      <rect x={140} y={110} width={120} height={44} rx={4} fill="#1F2A2E" />
      <Bar x={150} y={120} w={48} h={8} c="#5FE0A8" r={2} />
      <Bar x={150} y={134} w={84} h={5} c="#3C8C6A" r={2} />
      {/* dial */}
      <circle cx={166} cy={188} r={20} fill={C.white} stroke="#B8AF99" strokeWidth={2} />
      <line x1={166} y1={188} x2={166} y2={172} stroke={C.ink} strokeWidth={2} strokeLinecap="round" />
      {/* zone buttons */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={206 + (i % 3) * 22} y={172 + Math.floor(i / 3) * 22} width={16} height={16} rx={3} fill={i === 0 ? C.accent : C.white} stroke="#B8AF99" strokeWidth={1.4} />
      ))}
      {/* conduit */}
      <rect x={190} y={234} width={20} height={40} fill={C.metalLight} stroke={C.metalDark} strokeWidth={1.5} />
    </g>
  )
}

function SceneSump() {
  return (
    <g>
      <rect x={0} y={0} width={400} height={300} fill={C.grass} />
      <rect x={0} y={150} width={400} height={150} fill={C.grassDark} />
      {/* gravel bed */}
      <ellipse cx={200} cy={210} rx={150} ry={56} fill={C.gravel} />
      {Array.from({ length: 40 }).map((_, i) => (
        <circle
          key={i}
          cx={70 + ((i * 37) % 260)}
          cy={180 + ((i * 53) % 70)}
          r={3 + (i % 3)}
          fill={i % 2 ? '#A9ADB2' : '#C7CBCF'}
        />
      ))}
      {/* PVC outlet */}
      <ellipse cx={200} cy={196} rx={34} ry={20} fill="#3A4047" />
      <ellipse cx={200} cy={196} rx={34} ry={20} fill="none" stroke={C.white} strokeWidth={5} />
      <ellipse cx={200} cy={194} rx={22} ry={12} fill="#21262B" />
      {/* trickle */}
      <path d="M200 206c-4 14-2 30 2 44" fill="none" stroke="#9FBEC9" strokeWidth={4} strokeLinecap="round" opacity={0.7} />
    </g>
  )
}

function SceneDetector() {
  return (
    <g>
      <rect x={0} y={0} width={400} height={300} fill="#EDEFF2" />
      {/* ceiling corner shadow */}
      <path d="M0 0L120 0L0 90Z" fill="#00000008" />
      {/* detector disk */}
      <circle cx={200} cy={150} r={78} fill={C.white} stroke="#D4D9DF" strokeWidth={2} />
      <circle cx={200} cy={150} r={78} fill="#000000" opacity={0.03} />
      {/* vents */}
      {Array.from({ length: 18 }).map((_, i) => {
        const a = (i / 18) * Math.PI * 2
        return (
          <line
            key={i}
            x1={200 + Math.cos(a) * 40}
            y1={150 + Math.sin(a) * 40}
            x2={200 + Math.cos(a) * 64}
            y2={150 + Math.sin(a) * 64}
            stroke="#C2C8CF"
            strokeWidth={4}
            strokeLinecap="round"
          />
        )
      })}
      <circle cx={200} cy={150} r={30} fill="#F4F6F8" stroke="#D4D9DF" strokeWidth={1.5} />
      {/* test button + LED */}
      <circle cx={200} cy={150} r={12} fill="#E2E6EA" stroke="#C2C8CF" strokeWidth={1.5} />
      <circle cx={222} cy={126} r={5} fill={C.green} />
      <circle cx={222} cy={126} r={9} fill={C.green} opacity={0.25} />
    </g>
  )
}

function SceneRoof() {
  return (
    <g>
      <rect x={0} y={0} width={400} height={120} fill={C.sky} />
      <ellipse cx={300} cy={50} rx={50} ry={20} fill="#FFFFFF" opacity={0.5} />
      <ellipse cx={90} cy={40} rx={40} ry={16} fill="#FFFFFF" opacity={0.4} />
      {/* roof plane */}
      <path d="M40 250L200 96L360 250Z" fill={C.shingle} />
      {/* shingle rows */}
      {Array.from({ length: 9 }).map((_, row) => {
        const y = 250 - row * 17
        return (
          <g key={row}>
            <line x1={56 + row * 16} y1={y} x2={344 - row * 16} y2={y} stroke={C.shingleDark} strokeWidth={2} />
            {Array.from({ length: 16 }).map((_, i) => {
              const span = 344 - row * 16 - (56 + row * 16)
              const x = 56 + row * 16 + (i / 16) * span + (row % 2 ? span / 32 : 0)
              return <line key={i} x1={x} y1={y} x2={x} y2={y - 14} stroke={C.shingleDark} strokeWidth={1} opacity={0.6} />
            })}
          </g>
        )
      })}
      {/* ridge */}
      <path d="M40 250L200 96L360 250" fill="none" stroke="#565E68" strokeWidth={3} />
      <line x1={196} y1={100} x2={196} y2={96} stroke="#565E68" strokeWidth={4} />
      {/* fascia */}
      <rect x={40} y={250} width={320} height={10} fill="#E3E6EA" />
    </g>
  )
}

function SceneDrainage() {
  return (
    <g>
      {/* soil cross-section */}
      <rect x={0} y={0} width={400} height={60} fill={C.grass} />
      <rect x={0} y={54} width={400} height={246} fill={C.soil} />
      <rect x={0} y={120} width={400} height={180} fill={C.soilDark} opacity={0.5} />
      {/* trench */}
      <path d="M150 60L120 250H280L250 60Z" fill="#6E5337" />
      {/* filter fabric */}
      <path d="M150 60L122 240" fill="none" stroke="#D9D2C2" strokeWidth={3} opacity={0.8} />
      <path d="M250 60L278 240" fill="none" stroke="#D9D2C2" strokeWidth={3} opacity={0.8} />
      {/* gravel */}
      {Array.from({ length: 46 }).map((_, i) => (
        <circle
          key={i}
          cx={140 + ((i * 29) % 120)}
          cy={150 + ((i * 41) % 90)}
          r={3 + (i % 3)}
          fill={i % 2 ? '#AEB2B7' : '#C7CBCF'}
        />
      ))}
      {/* perforated pipe */}
      <ellipse cx={200} cy={228} rx={30} ry={16} fill="#2E3338" />
      <ellipse cx={200} cy={228} rx={30} ry={16} fill="none" stroke="#11151A" strokeWidth={2} />
      {[182, 200, 218].map((cx) => (
        <circle key={cx} cx={cx} cy={222} r={2.4} fill="#11151A" />
      ))}
    </g>
  )
}

function SceneFence({ worn }: { worn: boolean }) {
  const board = worn ? C.woodWorn : C.wood
  const boardDark = worn ? '#8C8678' : C.woodDark
  return (
    <g>
      <rect x={0} y={0} width={400} height={300} fill={C.sky} />
      <rect x={0} y={236} width={400} height={64} fill={C.grass} />
      {/* rails */}
      <rect x={20} y={108} width={360} height={12} fill={boardDark} />
      <rect x={20} y={196} width={360} height={12} fill={boardDark} />
      {/* pickets */}
      {Array.from({ length: 11 }).map((_, i) => {
        const x = 28 + i * 32
        const lean = worn && i === 7 ? 6 : 0
        const missing = worn && i === 3
        if (missing) return null
        return (
          <g key={i} transform={`rotate(${lean} ${x + 11} 236)`}>
            <rect x={x} y={76} width={22} height={164} rx={2} fill={board} stroke={boardDark} strokeWidth={1} />
            <path d={`M${x} 76L${x + 11} 66L${x + 22} 76Z`} fill={board} stroke={boardDark} strokeWidth={1} />
            {worn && i % 2 === 0 && <line x1={x + 5} y1={90} x2={x + 5} y2={230} stroke="#7E796C" strokeWidth={1} opacity={0.6} />}
          </g>
        )
      })}
      {/* gate post */}
      <rect x={356} y={66} width={16} height={174} rx={2} fill={boardDark} transform={worn ? 'rotate(3 364 236)' : undefined} />
    </g>
  )
}

function SceneDeck() {
  return (
    <g>
      <rect x={0} y={0} width={400} height={110} fill={C.sky} />
      <rect x={0} y={96} width={400} height={40} fill={C.grass} />
      {/* deck surface in perspective */}
      <path d="M30 250L370 250L320 130L80 130Z" fill={C.wood} />
      {Array.from({ length: 8 }).map((_, i) => {
        const t = i / 8
        const yTop = 130
        const yBot = 250
        const y = yTop + t * (yBot - yTop)
        const xl = 80 - t * 50
        const xr = 320 + t * 50
        return <line key={i} x1={xl} y1={y} x2={xr} y2={y} stroke={C.woodDark} strokeWidth={1.5} opacity={0.7} />
      })}
      {/* railing */}
      <rect x={74} y={104} width={8} height={130} fill={C.woodDark} />
      <rect x={318} y={104} width={8} height={130} fill={C.woodDark} />
      <rect x={74} y={104} width={252} height={8} fill={C.woodDark} />
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} x={92 + i * 26} y={112} width={4} height={50} fill={C.woodDark} opacity={0.8} />
      ))}
    </g>
  )
}

function SceneBath() {
  return (
    <g>
      <rect x={0} y={0} width={400} height={300} fill="#E7ECF0" />
      {/* tiled wall */}
      {Array.from({ length: 6 }).map((_, r) =>
        Array.from({ length: 8 }).map((_, c2) => (
          <rect key={`${r}-${c2}`} x={c2 * 52} y={r * 26} width={50} height={24} fill="#F1F4F7" stroke="#DCE2E8" strokeWidth={1} />
        )),
      )}
      {/* vanity counter */}
      <rect x={60} y={196} width={280} height={20} rx={3} fill="#D9CDBD" />
      <rect x={70} y={216} width={260} height={70} fill="#C7B79F" />
      {/* sink basin */}
      <ellipse cx={200} cy={206} rx={70} ry={16} fill="#FBFCFD" stroke="#C7CDD3" strokeWidth={2} />
      <ellipse cx={200} cy={206} rx={52} ry={10} fill="#E9EDF1" />
      {/* faucet */}
      <path d="M200 196v-40c0-16 22-16 22 0" fill="none" stroke={C.metal} strokeWidth={7} strokeLinecap="round" />
      <rect x={184} y={186} width={12} height={12} rx={2} fill={C.metalDark} />
      <rect x={216} y={150} width={10} height={8} rx={2} fill={C.metalDark} />
      {/* mirror */}
      <rect x={150} y={40} width={100} height={84} rx={4} fill="#DCE7EE" stroke="#C7CDD3" strokeWidth={2} />
    </g>
  )
}

function SceneKitchen({ after }: { after: boolean }) {
  const cabinet = after ? '#E8EBEE' : '#6E5A45'
  const cabinetEdge = after ? '#CFD5DB' : '#52432F'
  const counter = after ? '#D7DCE1' : '#7A7E82'
  const wall = after ? '#EAF0F4' : '#C9C2B4'
  const floor = after ? '#D9CFC0' : '#A89578'
  return (
    <g>
      <rect x={0} y={0} width={400} height={300} fill={wall} />
      <rect x={0} y={232} width={400} height={68} fill={floor} />
      {/* upper cabinets */}
      <rect x={30} y={40} width={150} height={56} fill={cabinet} stroke={cabinetEdge} strokeWidth={2} />
      <line x1={105} y1={40} x2={105} y2={96} stroke={cabinetEdge} strokeWidth={2} />
      {/* counter */}
      <rect x={20} y={150} width={250} height={16} fill={counter} />
      {/* lower cabinets */}
      <rect x={30} y={166} width={240} height={72} fill={cabinet} stroke={cabinetEdge} strokeWidth={2} />
      {[70, 130, 190].map((x) => (
        <line key={x} x1={x} y1={166} x2={x} y2={238} stroke={cabinetEdge} strokeWidth={2} />
      ))}
      {/* handles */}
      {[50, 110, 170, 230].map((x) => (
        <rect key={x} x={x} y={176} width={4} height={14} rx={2} fill={after ? '#9AA6B2' : '#3C3024'} />
      ))}
      {/* island (after only) or table (before) */}
      {after ? (
        <g>
          <rect x={286} y={150} width={94} height={16} fill={counter} />
          <rect x={296} y={166} width={74} height={72} fill={cabinet} stroke={cabinetEdge} strokeWidth={2} />
          {/* pendant lights */}
          <line x1={320} y1={40} x2={320} y2={64} stroke="#9AA6B2" strokeWidth={2} />
          <circle cx={320} cy={70} r={7} fill={C.amber} />
          <line x1={350} y1={40} x2={350} y2={64} stroke="#9AA6B2" strokeWidth={2} />
          <circle cx={350} cy={70} r={7} fill={C.amber} />
        </g>
      ) : (
        <g>
          <rect x={300} y={186} width={70} height={8} fill="#6E5A45" />
          <rect x={306} y={194} width={6} height={44} fill="#52432F" />
          <rect x={358} y={194} width={6} height={44} fill="#52432F" />
        </g>
      )}
      {/* window */}
      <rect x={290} y={60} width={80} height={70} fill={after ? '#CFE3F0' : '#A9B7A0'} stroke={cabinetEdge} strokeWidth={2} />
      <line x1={330} y1={60} x2={330} y2={130} stroke={cabinetEdge} strokeWidth={2} />
      <line x1={290} y1={95} x2={370} y2={95} stroke={cabinetEdge} strokeWidth={2} />
    </g>
  )
}

function SceneSwatch() {
  const swatches = [
    { c: '#5B6B7B', label: 'Body' },
    { c: '#E9E4D8', label: 'Trim' },
    { c: '#7C3B3B', label: 'Door' },
  ]
  return (
    <g>
      <rect x={0} y={0} width={400} height={300} fill="#EFEFEC" />
      {swatches.map((s, i) => {
        const x = 50 + i * 108
        return (
          <g key={i}>
            <rect x={x} y={54} width={84} height={150} rx={4} fill={s.c} stroke="#00000018" strokeWidth={1} />
            <rect x={x} y={172} width={84} height={32} rx={0} fill="#000000" opacity={0.12} />
            <rect x={x} y={214} width={84} height={30} rx={3} fill={C.white} stroke={C.line} strokeWidth={1} />
            <Bar x={x + 12} y={222} w={40} h={5} c={C.sub} />
            <Bar x={x + 12} y={232} w={58} h={5} c={C.line} />
            <text x={x + 8} y={70} fontSize={10} fontWeight={700} fill={i === 1 ? C.sub : '#FFFFFF'}>
              {s.label}
            </text>
          </g>
        )
      })}
      {/* brush */}
      <rect x={300} y={196} width={60} height={12} rx={3} fill={C.woodDark} transform="rotate(-24 330 202)" />
      <rect x={344} y={188} width={22} height={20} rx={2} fill={C.metalLight} transform="rotate(-24 355 198)" />
    </g>
  )
}

function SceneSprinkler() {
  const zones = [
    { x: 60, y: 56, w: 120, h: 80 },
    { x: 188, y: 56, w: 152, h: 80 },
    { x: 60, y: 200, w: 110, h: 64 },
    { x: 230, y: 200, w: 110, h: 64 },
  ]
  return (
    <g>
      <rect x={0} y={0} width={400} height={300} fill="#EAF1EA" />
      <rect x={30} y={36} width={340} height={232} fill="none" stroke={C.grassDark} strokeWidth={2} />
      {/* house footprint */}
      <rect x={150} y={146} width={100} height={48} fill={C.accent} opacity={0.12} stroke={C.accent} strokeWidth={1.5} />
      <text x={200} y={174} fontSize={9} fontWeight={600} fill={C.accent} textAnchor="middle">
        House
      </text>
      {/* zones */}
      {zones.map((z, i) => (
        <g key={i}>
          <rect x={z.x} y={z.y} width={z.w} height={z.h} fill={C.grass} opacity={0.35} stroke={C.grassDark} strokeWidth={1} strokeDasharray="4 3" />
          <text x={z.x + 6} y={z.y + 14} fontSize={9} fontWeight={700} fill={C.grassDark}>
            Z{i + 1}
          </text>
          {/* heads + spray */}
          {[
            [z.x + z.w * 0.3, z.y + z.h * 0.6],
            [z.x + z.w * 0.72, z.y + z.h * 0.45],
          ].map(([cx, cy], j) => (
            <g key={j}>
              <circle cx={cx} cy={cy} r={12} fill="none" stroke={C.accent} strokeWidth={1} opacity={0.4} />
              <circle cx={cx} cy={cy} r={3} fill={C.accent} />
            </g>
          ))}
        </g>
      ))}
      {/* controller */}
      <rect x={300} y={150} width={26} height={20} rx={2} fill={C.cream} stroke="#B8AF99" strokeWidth={1.5} />
      {/* north arrow */}
      <path d="M352 50l5 12h-10z" fill={C.sub} />
      <text x={352} y={74} fontSize={8} fill={C.sub} textAnchor="middle">
        N
      </text>
    </g>
  )
}

function renderScene(kind: ImageKind) {
  if (isDocKind(kind)) return <DocScene kind={kind} />
  switch (kind) {
    case 'photo-hvac':
      return <SceneHVAC />
    case 'photo-water-heater-plate':
      return <ScenePlate />
    case 'photo-panel':
      return <ScenePanel />
    case 'photo-shutoff':
      return <SceneShutoff />
    case 'photo-gas-meter':
      return <SceneGasMeter />
    case 'photo-irrigation-controller':
      return <SceneController />
    case 'photo-sump':
      return <SceneSump />
    case 'photo-detector':
      return <SceneDetector />
    case 'photo-roof':
      return <SceneRoof />
    case 'photo-drainage':
      return <SceneDrainage />
    case 'photo-fence-before':
      return <SceneFence worn={true} />
    case 'photo-fence-after':
      return <SceneFence worn={false} />
    case 'photo-deck':
      return <SceneDeck />
    case 'photo-bath-fixture':
      return <SceneBath />
    case 'photo-kitchen-before':
      return <SceneKitchen after={false} />
    case 'photo-kitchen-after':
      return <SceneKitchen after={true} />
    case 'swatch-paint':
      return <SceneSwatch />
    case 'map-sprinkler':
      return <SceneSprinkler />
    default:
      return <DocScene kind="doc-invoice" />
  }
}

// ── Public component ──────────────────────────────────────────────────────────

export function SampleEvidence({
  kind,
  dateLabel,
  showStamp = true,
}: {
  kind: ImageKind
  dateLabel?: string
  showStamp?: boolean
}) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-k-bg-surface">
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="block w-full h-full"
        role="img"
        aria-label="Sample evidence image"
      >
        {renderScene(kind)}
      </svg>
      {showStamp && (
        <span className="absolute right-2 top-2 inline-flex items-center h-5 px-1.5 rounded-k-pill bg-black/55 text-white text-[10px] font-semibold tracking-wide">
          SAMPLE
        </span>
      )}
      {dateLabel && (
        <span className="absolute left-2 bottom-2 inline-flex items-center h-5 px-1.5 rounded-k-sm bg-black/55 text-white text-[10px] font-medium tabular-nums">
          {dateLabel}
        </span>
      )}
    </div>
  )
}
