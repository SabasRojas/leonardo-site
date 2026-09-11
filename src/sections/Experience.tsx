import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { experience, type Experience as Exp } from '../data/content'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { cn } from '../lib/cn'
import { EASE_OUT_EXPO } from '../lib/motion'

function Entry({ item, index }: { item: Exp; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? item.bullets : item.bullets.slice(0, 3)
  const hasMore = item.bullets.length > 3

  return (
    <Reveal as="li" index={index} className="relative pl-10 sm:pl-14">
      <span aria-hidden className="absolute top-8 left-0 grid size-7 place-items-center sm:left-1">
        <span className={cn('absolute size-3 rounded-full', item.current ? 'bg-amber' : 'bg-muted-2')} />
      </span>

      <article className="surface-card rounded-2xl p-6 transition-colors duration-500 hover:border-line-2 sm:p-8">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-2xl leading-tight font-medium tracking-tight sm:text-[1.7rem]">{item.role}</h3>
            <p className="mt-1 text-fg-2">
              {item.org} <span className="text-muted">· {item.location}</span>
            </p>
          </div>
          <time className="shrink-0 font-mono text-xs tracking-wider text-muted tabular-nums sm:pt-2 sm:text-right">
            {item.start} to {item.end}
          </time>
        </header>

        <ul className="mt-6 space-y-3">
          <AnimatePresence initial={false}>
            {visible.map((b, i) => (
              <motion.li
                key={b.slice(0, 40)}
                initial={i >= 3 ? { opacity: 0, height: 0 } : false}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                className="flex gap-3 overflow-hidden text-[14.5px] leading-relaxed text-fg-2"
              >
                <span aria-hidden className="mt-[0.62em] size-1.5 shrink-0 rounded-full bg-amber/70" />
                <span>{b}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-amber transition hover:text-amber-2"
          >
            {expanded ? 'Show less' : `Show all ${item.bullets.length}`}
            <ChevronDown className={cn('size-3.5 transition-transform duration-300', expanded && 'rotate-180')} />
          </button>
        )}

        <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
          {item.tags.map((t) => (
            <span key={t} className="rounded-md bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-fg-2">
              {t}
            </span>
          ))}
        </div>
      </article>
    </Reveal>
  )
}

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-[0.35] mask-fade-b" />
      <div className="container-x">
        <SectionHeading index="02" title="Experience" />
        <ol className="relative mx-auto max-w-4xl space-y-6">
          <span aria-hidden className="absolute top-10 bottom-10 left-[13px] w-px bg-gradient-to-b from-amber/60 via-line-2 to-transparent sm:left-[17px]" />
          {experience.map((item, i) => (
            <Entry key={item.id} item={item} index={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}
