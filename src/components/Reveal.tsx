import { motion, type HTMLMotionProps } from 'motion/react'
import { fadeUp, viewportOnce } from '../lib/motion'

type Props = HTMLMotionProps<'div'> & {
  /** Stagger index, multiplies the base delay. */
  index?: number
  as?: 'div' | 'section' | 'article' | 'li' | 'span' | 'p' | 'h2' | 'h3'
}

/** Scroll-triggered reveal with a soft blur-up. Respects reduced motion via MotionConfig. */
export function Reveal({ index = 0, as = 'div', children, ...rest }: Props) {
  const Comp = motion[as] as typeof motion.div
  return (
    <Comp variants={fadeUp} custom={index} initial="hidden" whileInView="show" viewport={viewportOnce} {...rest}>
      {children}
    </Comp>
  )
}
