import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, type PanInfo } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { LightboxContext, type LightboxItem } from './lightbox-context'
import { EASE_OUT_EXPO } from '../lib/motion'

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<LightboxItem[] | null>(null)
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)

  const open = useCallback((next: LightboxItem[], i = 0) => {
    setItems(next)
    setIndex(i)
    setDir(1)
  }, [])

  const close = useCallback(() => setItems(null), [])

  const step = useCallback(
    (delta: number) => {
      if (!items) return
      setDir(delta)
      setIndex((i) => (i + delta + items.length) % items.length)
    },
    [items],
  )

  // Keyboard + scroll lock
  useEffect(() => {
    if (!items) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [items, close, step])

  // Preload neighbors
  useEffect(() => {
    if (!items) return
    for (const d of [1, -1]) {
      const n = items[(index + d + items.length) % items.length]
      if (n) {
        const img = new Image()
        img.src = n.asset.src
      }
    }
  }, [items, index])

  const value = useMemo(() => ({ open }), [open])
  const current = items?.[index]

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 60
    if (info.offset.x < -threshold || info.velocity.x < -500) step(1)
    else if (info.offset.x > threshold || info.velocity.x > 500) step(-1)
  }

  return (
    <LightboxContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {items && current && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            className="fixed inset-0 z-[100] flex flex-col bg-ink/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-3 sm:px-6">
              <span className="font-mono text-xs text-muted tabular-nums">
                {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="grid size-11 place-items-center rounded-full border border-line-2 text-fg-2 transition hover:bg-white/10 hover:text-fg"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Stage */}
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16">
              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      step(-1)
                    }}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-line-2 bg-ink/60 text-fg-2 transition hover:bg-white/10 hover:text-fg sm:grid"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      step(1)
                    }}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-line-2 bg-ink/60 text-fg-2 transition hover:bg-white/10 hover:text-fg sm:grid"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}

              <AnimatePresence mode="popLayout" custom={dir} initial={false}>
                <motion.figure
                  key={current.asset.src}
                  custom={dir}
                  variants={{
                    enter: (d: number) => ({ opacity: 0, x: d * 40, scale: 0.98 }),
                    center: { opacity: 1, x: 0, scale: 1 },
                    exit: (d: number) => ({ opacity: 0, x: d * -40, scale: 0.98 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                  drag={items.length > 1 ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={onDragEnd}
                  onClick={(e) => e.stopPropagation()}
                  className="flex h-full w-full max-w-5xl cursor-grab flex-col items-center justify-center active:cursor-grabbing"
                >
                  <img
                    src={current.asset.src}
                    alt={current.alt}
                    width={current.asset.width}
                    height={current.asset.height}
                    draggable={false}
                    className="max-h-[calc(100dvh-11rem)] w-auto max-w-full select-none rounded-lg object-contain shadow-2xl"
                    style={{ backgroundImage: `url(${current.asset.blur})`, backgroundSize: 'cover' }}
                  />
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* Caption */}
            <div className="px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 text-center">
              <p className="mx-auto max-w-2xl text-sm leading-relaxed text-fg-2">{current.caption ?? current.alt}</p>
              {items.length > 1 && (
                <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-muted-2 uppercase sm:hidden">Swipe to navigate</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  )
}
