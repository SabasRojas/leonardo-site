import { motion } from 'motion/react'
import { ArrowUpRight, Download } from 'lucide-react'
import { heroStats, marqueeItems, profile } from '../data/content'
import { Toolpath } from '../components/Toolpath'
import { ButtonLink } from '../components/Button'
import { EASE_OUT_EXPO } from '../lib/motion'

const nameWords = profile.name.split(' ')

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-[calc(6rem+env(safe-area-inset-top))]">
      {/* Backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade-b opacity-60" />
        <div className="absolute -top-40 left-1/3 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-amber/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--color-ink)_100%)]" />
      </div>

      <div className="container-x grid items-center gap-12 pb-16 lg:min-h-[calc(100svh-6rem)] lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pb-10">
        {/* Copy */}
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] font-medium tracking-[-0.035em]">
            <span className="sr-only">{profile.name}</span>
            <span aria-hidden className="flex flex-wrap gap-x-[0.22em]">
              {nameWords.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.15em] -mb-[0.15em] align-top">
                  <motion.span
                    className="inline-block"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.3 + i * 0.08 }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          <motion.p
            className="mt-5 text-lg text-fg-2 md:text-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.7 }}
          >
            Mechanical Engineering, {profile.school}
          </motion.p>

          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-fg-2 md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.85 }}
          >
            {profile.intro}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 1.0 }}
          >
            <ButtonLink href={profile.resumeHref} target="_blank" rel="noopener" variant="outline" size="lg">
              <Download className="size-4" />
              Resume
            </ButtonLink>
            <ButtonLink href={profile.linkedin} target="_blank" rel="noopener" variant="outline" size="lg">
              LinkedIn
              <ArrowUpRight className="size-4" />
            </ButtonLink>
            <a href="#contact" className="ml-1 text-[15px] text-fg-2 underline decoration-line-2 underline-offset-4 transition hover:text-fg hover:decoration-fg/50">
              Contact
            </a>
          </motion.div>

          {/* Stats */}
          <motion.dl
            className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 1.2 }}
          >
            {heroStats.map((s) => (
              <div key={s.label} className="flex flex-col bg-ink/80 px-4 py-4 backdrop-blur-sm sm:px-5">
                <dt className="order-2 mt-1 text-[11px] leading-snug text-muted">{s.label}</dt>
                <dd className="font-display text-2xl font-medium tracking-tight tabular-nums sm:text-[1.65rem]">
                  {s.value}
                  {s.unit && <span className="ml-1 font-mono text-xs font-normal text-amber">{s.unit}</span>}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Toolpath drawing */}
        <motion.div
          className="relative mx-auto w-full max-w-[520px] lg:max-w-none lg:justify-self-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div aria-hidden className="absolute inset-[10%] -z-10 rounded-full bg-amber/5 blur-3xl" />
          <Toolpath className="mx-auto max-h-[70svh] lg:max-h-[calc(100svh-9rem)]" />
        </motion.div>
      </div>

      {/* Machines & software */}
      <motion.div
        className="relative border-y border-line bg-ink-2/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
      >
        <div className="mask-fade-x overflow-hidden py-4">
          <div className="animate-marquee flex w-max gap-10 pr-10 hover:[animation-play-state:paused]">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="flex items-center gap-10 font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
                {item}
                <span className="size-1 rounded-full bg-amber/60" aria-hidden />
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
