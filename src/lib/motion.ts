import type { Transition, Variants } from 'motion/react'

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

export const springSoft: Transition = { type: 'spring', stiffness: 220, damping: 28, mass: 0.9 }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO, delay: i * 0.08 },
  }),
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' } as const
