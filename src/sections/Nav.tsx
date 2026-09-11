import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navLinks, profile } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'
import { cn } from '../lib/cn'
import { EASE_OUT_EXPO } from '../lib/motion'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollYProgress, scrollY } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.4 })

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  const ids = useMemo(() => navLinks.map((l) => l.href.slice(1)), [])
  const active = useActiveSection(ids)

  // Close the drawer on resize to desktop & lock scroll while open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('resize', onResize)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      {/* Scroll progress */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[80] h-px origin-left bg-gradient-to-r from-amber via-amber-2 to-amber"
        style={{ scaleX: progress }}
      />

      <header className="fixed inset-x-0 top-0 z-[70] pt-[env(safe-area-inset-top)]">
        <motion.div
          className="container-x flex items-center justify-between py-3 transition-[padding] duration-500"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.2 }}
        >
          <div
            className={cn(
              'flex w-full items-center justify-between rounded-full px-2 pl-4 transition-all duration-500 ease-[var(--ease-out-expo)]',
              scrolled ? 'glass h-13' : 'h-14 border border-transparent',
            )}
          >
            {/* Wordmark */}
            <a href="#top" className="group flex items-center gap-3" aria-label="Back to top">
              <span className="relative grid size-8 place-items-center rounded-full border border-line-2 font-display text-[11px] font-semibold tracking-tight text-fg">
                {profile.initials}
                <span className="absolute inset-0 rounded-full border border-amber/0 transition duration-500 group-hover:border-amber/60" />
              </span>
              <span className="hidden font-display text-sm font-medium tracking-tight sm:block">{profile.name}</span>
            </a>

            {/* Desktop links */}
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
              {navLinks.map((l) => {
                const isActive = active === l.href.slice(1)
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    className={cn(
                      'relative rounded-full px-3 py-2 text-[13px] font-medium tracking-tight transition-colors duration-300 xl:px-3.5',
                      isActive ? 'text-fg' : 'text-fg-2 hover:text-fg',
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/[0.07]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </a>
                )
              })}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={profile.resumeHref}
                target="_blank"
                rel="noopener"
                className="hidden h-9 items-center gap-1.5 rounded-full bg-fg px-4 text-[13px] font-medium text-ink transition hover:bg-amber-2 sm:inline-flex"
              >
                Resume
                <ArrowUpRight className="size-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                className="grid size-10 place-items-center rounded-full text-fg-2 transition hover:bg-white/[0.06] hover:text-fg lg:hidden"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col bg-ink/[0.97] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="container-x flex h-[calc(3.5rem+env(safe-area-inset-top))] items-center justify-between pt-[env(safe-area-inset-top)]">
              <span className="font-display text-sm font-medium">{profile.name}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-full border border-line-2 text-fg-2 transition hover:bg-white/10 hover:text-fg"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="container-x mt-6 flex flex-1 flex-col" aria-label="Mobile">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.05 + i * 0.05 }}
                  className="group flex items-center justify-between border-b border-line py-5 font-display text-3xl font-medium tracking-tight text-fg-2 transition hover:text-fg"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-muted tabular-nums">0{i + 1}</span>
                    {l.label}
                  </span>
                  <ArrowUpRight className="size-6 -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                </motion.a>
              ))}

              <motion.div
                className="mt-auto flex flex-col gap-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-8"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.45 }}
              >
                <a
                  href={profile.resumeHref}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-amber font-medium text-ink"
                >
                  Download Resume <ArrowUpRight className="size-4" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line-2 font-medium"
                >
                  LinkedIn <ArrowUpRight className="size-4" />
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
