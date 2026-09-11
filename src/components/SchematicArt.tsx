import { motion, useReducedMotion } from 'motion/react'

type Variant = 'lpbf' | 'cfd'

/**
 * Generative "schematic" covers for projects that have no photography:
 * an LPBF layer stack with a scanning laser, and CFD streamlines around a spray.
 */
export function SchematicArt({ variant, className }: { variant: Variant; className?: string }) {
  const reduce = useReducedMotion()
  return variant === 'lpbf' ? <Lpbf reduce={!!reduce} className={className} /> : <Cfd reduce={!!reduce} className={className} />
}

function Lpbf({ reduce, className }: { reduce: boolean; className?: string }) {
  const layers = 14
  return (
    <svg viewBox="0 0 400 300" className={className} role="img" aria-label="Schematic of laser powder bed fusion layers">
      <defs>
        <linearGradient id="lpbf-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgb(255 138 43 / 0.9)" />
          <stop offset="1" stopColor="rgb(255 138 43 / 0)" />
        </linearGradient>
      </defs>
      {/* Build plate */}
      <rect x="60" y="240" width="280" height="14" fill="rgb(255 255 255 / 0.08)" stroke="rgb(255 255 255 / 0.25)" />
      {/* Layers */}
      {Array.from({ length: layers }).map((_, i) => {
        const y = 240 - (i + 1) * 9
        const w = 120 + Math.sin(i * 0.7) * 30 + i * 4
        const x = 200 - w / 2
        return (
          <motion.rect
            key={i}
            x={x}
            y={y}
            width={w}
            height={8}
            fill={`rgb(238 237 232 / ${0.08 + i * 0.03})`}
            stroke="rgb(238 237 232 / 0.3)"
            strokeWidth="0.75"
            initial={reduce ? false : { opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
          />
        )
      })}
      {/* Laser */}
      <motion.g
        initial={false}
        animate={reduce ? {} : { x: [-70, 70, -70] }}
        transition={{ duration: 3.2, ease: 'easeInOut', repeat: Infinity }}
      >
        <line x1="200" y1="20" x2="200" y2={240 - layers * 9} stroke="rgb(255 138 43 / 0.9)" strokeWidth="1.2" />
        <rect x="192" y="8" width="16" height="14" rx="2" fill="rgb(255 255 255 / 0.15)" stroke="rgb(255 255 255 / 0.4)" />
        <circle cx="200" cy={240 - layers * 9} r="6" fill="url(#lpbf-glow)" />
        <circle cx="200" cy={240 - layers * 9} r="2" fill="#fff" />
      </motion.g>
      {/* Powder */}
      {Array.from({ length: 40 }).map((_, i) => (
        <circle
          key={i}
          cx={64 + ((i * 53) % 272)}
          cy={230 - ((i * 29) % 40) - 2}
          r="1"
          fill="rgb(238 237 232 / 0.35)"
        />
      ))}
    </svg>
  )
}

function Cfd({ reduce, className }: { reduce: boolean; className?: string }) {
  const lines = 9
  return (
    <svg viewBox="0 0 400 300" className={className} role="img" aria-label="Schematic of CFD streamlines from a cooling pipe">
      {/* Pipe */}
      <rect x="20" y="130" width="90" height="40" rx="6" fill="rgb(255 255 255 / 0.06)" stroke="rgb(238 237 232 / 0.45)" />
      <line x1="110" y1="140" x2="130" y2="140" stroke="rgb(238 237 232 / 0.45)" />
      <line x1="110" y1="160" x2="130" y2="160" stroke="rgb(238 237 232 / 0.45)" />
      {/* Roll */}
      <circle cx="320" cy="150" r="60" fill="rgb(255 255 255 / 0.04)" stroke="rgb(238 237 232 / 0.4)" />
      <circle cx="320" cy="150" r="10" fill="none" stroke="rgb(238 237 232 / 0.4)" strokeDasharray="3 3" />
      {/* Streamlines */}
      {Array.from({ length: lines }).map((_, i) => {
        const t = i / (lines - 1)
        const spread = (t - 0.5) * 120
        const hue = t < 0.5 ? 'rgb(143 179 217 / 0.8)' : 'rgb(255 138 43 / 0.8)'
        const d = `M130 150 C 190 ${150 + spread * 0.4}, 230 ${150 + spread}, 262 ${150 + spread * 0.9}`
        return (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke={hue}
            strokeWidth="1.2"
            strokeLinecap="round"
            initial={reduce ? { pathLength: 1 } : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.1 + i * 0.07 }}
          />
        )
      })}
      {/* Moving particles along center line */}
      {!reduce &&
        [0, 0.33, 0.66].map((o, i) => (
          <motion.circle
            key={i}
            r="2.2"
            fill="#fff"
            initial={{ offsetDistance: `${o * 100}%` }}
            animate={{ offsetDistance: [`${o * 100}%`, `${o * 100 + 100}%`] }}
            transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
            style={{ offsetPath: 'path("M130 150 C 190 150, 230 150, 262 150")' }}
          />
        ))}
      {/* Legend */}
      <rect x="20" y="250" width="120" height="6" fill="url(#cfd-legend)" />
      <defs>
        <linearGradient id="cfd-legend" x1="0" x2="1">
          <stop offset="0" stopColor="rgb(143 179 217)" />
          <stop offset="1" stopColor="rgb(255 138 43)" />
        </linearGradient>
      </defs>
    </svg>
  )
}
