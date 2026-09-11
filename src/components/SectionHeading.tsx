import { cn } from '../lib/cn'
import { Reveal } from './Reveal'

type Props = {
  index: string
  title: string
  description?: string
  className?: string
}

export function SectionHeading({ index, title, description, className }: Props) {
  return (
    <div className={cn('mb-12 md:mb-16', className)}>
      <Reveal className="flex items-baseline gap-4">
        <span className="font-mono text-xs text-muted tabular-nums">{index}</span>
        <h2 className="text-4xl leading-none font-medium tracking-tight sm:text-5xl">{title}</h2>
      </Reveal>
      {description && (
        <Reveal index={1} as="p" className="mt-5 max-w-2xl text-base leading-relaxed text-fg-2 md:text-lg">
          {description}
        </Reveal>
      )}
    </div>
  )
}
