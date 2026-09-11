import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { cn } from '../lib/cn'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { EASE_OUT_EXPO } from '../lib/motion'

/**
 * Top-down CAM view of a fixture plate being machined: roughing passes in
 * the pockets and bores, a finishing contour around the part, and a tool that
 * runs the whole program on loop. Everything draws itself in like a CAM
 * simulation.
 */

// Geometry (user units; 48 px = 1 in, tool Ø0.5 in = 24 px)
const C = 300
const PART_R = 225
const POCKET = [
  { x: 130, y: 130 },
  { x: 350, y: 350 },
] as const
const POCKET_W = 120
const BORE = [
  { cx: 410, cy: 190 },
  { cx: 190, cy: 410 },
] as const
const BORE_R = 48
const OFFSETS = [14, 28, 42] as const

const rr = (x: number, y: number, w: number, r: number) =>
  `M${x + r} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + w - r} Q${x + w} ${y + w} ${x + w - r} ${y + w} H${x + r} Q${x} ${y + w} ${x} ${y + w - r} V${y + r} Q${x} ${y} ${x + r} ${y} Z`

const circ = (cx: number, cy: number, r: number) => `M${cx + r} ${cy} A${r} ${r} 0 1 1 ${cx - r} ${cy} A${r} ${r} 0 1 1 ${cx + r} ${cy}`

// The program the tool runs, in order.
const PROGRAM = [
  rr(POCKET[0].x + 14, POCKET[0].y + 14, POCKET_W - 28, 10),
  'M220 300 H380 M300 220 V380',
  circ(BORE[0].cx, BORE[0].cy, BORE_R - 12),
  rr(POCKET[1].x + 14, POCKET[1].y + 14, POCKET_W - 28, 10),
  circ(BORE[1].cx, BORE[1].cy, BORE_R - 12),
  circ(C, C, PART_R + 12),
].join(' ')

// Animation timeline (seconds) : the order a CAM program would run.
const T = {
  part: 0.4,
  bolts: [0.9, 1.0, 1.1, 1.2],
  boltCross: 1.6,
  pockets: [
    { outline: 1.6, offsets: [1.8, 1.95, 2.1] },
    { outline: 2.25, offsets: [2.45, 2.6, 2.75] },
  ],
  bores: [
    { outline: 2.9, offsets: [3.1, 3.22, 3.34] },
    { outline: 3.46, offsets: [3.66, 3.78, 3.9] },
  ],
  cross: [4.0, 4.2],
  crossPass: 4.4,
  contour: 4.7,
  dim: 5.3,
  dimExt: 5.7,
  legend: 5.9,
  tool: 1.2,
} as const

// Spark particles thrown from the cutting point (offsets in px, seconds).
const SPARKS = [
  { dx: 30, dy: -14, dur: 0.55, delay: 0.0, r: 1.8, c: '#ffb35c' },
  { dx: -26, dy: -20, dur: 0.5, delay: 0.12, r: 1.4, c: '#ff8a2b' },
  { dx: 22, dy: 24, dur: 0.6, delay: 0.24, r: 1.6, c: '#fff' },
  { dx: -30, dy: 10, dur: 0.45, delay: 0.34, r: 1.3, c: '#ffb35c' },
  { dx: 14, dy: -30, dur: 0.65, delay: 0.46, r: 1.7, c: '#ff8a2b' },
  { dx: -16, dy: 28, dur: 0.5, delay: 0.58, r: 1.4, c: '#fff' },
  { dx: 34, dy: 6, dur: 0.55, delay: 0.7, r: 1.5, c: '#ffb35c' },
  { dx: -8, dy: -26, dur: 0.45, delay: 0.82, r: 1.2, c: '#ff8a2b' },
  { dx: 26, dy: 18, dur: 0.5, delay: 0.9, r: 1.4, c: '#ffb35c' },
  { dx: -22, dy: -8, dur: 0.6, delay: 1.0, r: 1.5, c: '#fff' },
] as const

export function Toolpath({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const ref = useRef<SVGSVGElement>(null)
  // Stop the looping tool + sparks once the hero is off screen: no point
  // burning a phone's battery animating something nobody is looking at.
  const inView = useInView(ref, { margin: '150px' })
  const coarse = useMediaQuery('(pointer: coarse)')
  const sparks = coarse ? SPARKS.slice(0, 4) : SPARKS
  const running = inView && !reduce

  const draw = (delay: number, dur = 1) => ({
    initial: reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { pathLength: { duration: dur, ease: EASE_OUT_EXPO, delay }, opacity: { duration: 0.2, delay } },
  })
  const appear = (delay: number) => ({
    initial: reduce ? { opacity: 1 } : { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.7, ease: EASE_OUT_EXPO, delay },
  })

  const part = 'rgb(238 237 232 / 0.85)'
  const faint = 'rgb(238 237 232 / 0.22)'
  const rough = 'rgb(143 179 217 / 0.75)'
  const finish = 'rgb(255 138 43 / 0.95)'
  const mono = { fontFamily: 'var(--font-mono)' } as const

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 600"
      fill="none"
      className={cn('block h-auto w-full', className)}
      role="img"
      aria-label="CAM simulation of a fixture plate being machined: pocket roughing, bores, and a finishing contour"
    >
      <defs>
        <pattern id="tp-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0V48" stroke="rgb(238 237 232 / 0.06)" strokeWidth="1" />
        </pattern>
        <marker id="tp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0.8 L10 5 L0 9.2 z" fill={finish} />
        </marker>
        <radialGradient id="tp-glow">
          <stop offset="0" stopColor="rgb(255 138 43 / 0.55)" />
          <stop offset="1" stopColor="rgb(255 138 43 / 0)" />
        </radialGradient>
      </defs>

      {/* Stock */}
      <motion.rect x="50" y="50" width="500" height="500" rx="8" fill="url(#tp-grid)" {...appear(0.1)} />
      <motion.rect x="50" y="50" width="500" height="500" rx="8" stroke={faint} strokeWidth="1" strokeDasharray="6 6" {...appear(0.1)} />

      {/* Part outline */}
      <motion.circle cx={C} cy={C} r={PART_R} stroke={part} strokeWidth="1.5" {...draw(T.part, 1.6)} />

      {/* Bolt holes */}
      {[0, 90, 180, 270].map((deg, i) => {
        const a = (deg * Math.PI) / 180
        const x = C + Math.cos(a) * 195
        const y = C + Math.sin(a) * 195
        return (
          <g key={deg}>
            <motion.circle cx={x} cy={y} r="9" stroke={part} strokeWidth="1.2" {...draw(T.bolts[i], 0.5)} />
            <motion.path d={`M${x - 14} ${y} H${x + 14} M${x} ${y - 14} V${y + 14}`} stroke={faint} strokeWidth="1" {...appear(T.boltCross)} />
          </g>
        )
      })}

      {/* Pockets: outline + roughing offsets */}
      {POCKET.map((p, i) => (
        <g key={i}>
          <motion.path d={rr(p.x, p.y, POCKET_W, 18)} stroke={part} strokeWidth="1.5" {...draw(T.pockets[i].outline, 0.9)} />
          {OFFSETS.map((o, j) => (
            <motion.path key={o} d={rr(p.x + o, p.y + o, POCKET_W - 2 * o, Math.max(4, 18 - o))} stroke={rough} strokeWidth="1" {...draw(T.pockets[i].offsets[j], 0.7)} />
          ))}
        </g>
      ))}

      {/* Bores: outline + spiral */}
      {BORE.map((b, i) => (
        <g key={i}>
          <motion.circle cx={b.cx} cy={b.cy} r={BORE_R} stroke={part} strokeWidth="1.5" {...draw(T.bores[i].outline, 0.8)} />
          {[12, 24, 36].map((o, j) => (
            <motion.circle key={o} cx={b.cx} cy={b.cy} r={BORE_R - o} stroke={rough} strokeWidth="1" {...draw(T.bores[i].offsets[j], 0.6)} />
          ))}
        </g>
      ))}

      {/* Cross slot: outline + centerline pass */}
      <motion.rect x="205" y="285" width="190" height="30" rx="15" stroke={part} strokeWidth="1.5" {...draw(T.cross[0], 0.8)} />
      <motion.rect x="285" y="205" width="30" height="190" rx="15" stroke={part} strokeWidth="1.5" {...draw(T.cross[1], 0.8)} />
      <motion.path d="M220 300 H380 M300 220 V380" stroke={rough} strokeWidth="1" {...draw(T.crossPass, 0.8)} />

      {/* Finishing contour */}
      <motion.circle cx={C} cy={C} r={PART_R + 12} stroke={finish} strokeWidth="1.25" {...draw(T.contour, 2)} />

      {/* Dimension across the part */}
      <motion.line x1={C - PART_R} y1="572" x2={C + PART_R} y2="572" stroke={finish} strokeWidth="1" markerStart="url(#tp-arrow)" markerEnd="url(#tp-arrow)" {...draw(T.dim, 1)} />
      <motion.line x1={C - PART_R} y1={C + PART_R} x2={C - PART_R} y2="580" stroke={finish} strokeWidth="0.75" strokeDasharray="3 3" {...appear(T.dimExt)} />
      <motion.line x1={C + PART_R} y1={C + PART_R} x2={C + PART_R} y2="580" stroke={finish} strokeWidth="0.75" strokeDasharray="3 3" {...appear(T.dimExt)} />
      <motion.text x={C} y="566" fill={finish} fontSize="11" style={mono} textAnchor="middle" letterSpacing="1.5" {...appear(T.dimExt)}>
        Ø9.375 ±0.005
      </motion.text>

      {/* Tool legend */}
      <motion.g {...appear(T.legend)}>
        <circle cx="66" cy="34" r="6" stroke={part} strokeWidth="1" />
        <path d="M60 34H72M66 28V40" stroke={part} strokeWidth="0.8" />
        <text x="80" y="38" fill={faint} fontSize="10" style={mono} letterSpacing="1.5">
          Ø0.500 END MILL
        </text>
        <path d="M400 34h24" stroke={rough} strokeWidth="1.5" />
        <text x="430" y="38" fill={faint} fontSize="10" style={mono} letterSpacing="1.5">
          ROUGH
        </text>
        <path d="M490 34h24" stroke={finish} strokeWidth="1.5" />
        <text x="520" y="38" fill={faint} fontSize="10" style={mono} letterSpacing="1.5">
          FINISH
        </text>
      </motion.g>

      {/* Tool running the program, throwing sparks at the cut */}
      {running && (
        <motion.g
          style={{ offsetPath: `path("${PROGRAM}")`, offsetRotate: '0deg' }}
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: 1 }}
          transition={{
            offsetDistance: { duration: 40, ease: 'linear', repeat: Infinity, delay: T.tool },
            opacity: { duration: 0.5, delay: T.tool },
          }}
        >
          {/* Sparks: short-lived particles flying out of the cutting point */}
          {sparks.map((s, i) => (
            <motion.circle
              key={i}
              r={s.r}
              fill={s.c}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ x: [0, s.dx], y: [0, s.dy], opacity: [0.95, 0] }}
              transition={{ duration: s.dur, ease: 'easeOut', repeat: Infinity, delay: T.tool + s.delay }}
            />
          ))}
          <circle r="26" fill="url(#tp-glow)" />
          <circle r="12" stroke="#fff" strokeWidth="1.25" fill="rgb(7 8 10 / 0.6)" />
          <path d="M-18 0H18M0 -18V18" stroke="rgb(255 255 255 / 0.7)" strokeWidth="0.9" />
        </motion.g>
      )}
    </svg>
  )
}
