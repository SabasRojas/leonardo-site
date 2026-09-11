import { awards, images, type Award } from '../data/content'
import { Img } from '../components/Img'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { useLightbox } from '../components/lightbox-context'
import { cn } from '../lib/cn'

function AwardCard({ award, index }: { award: Award; index: number }) {
  const { open } = useLightbox()
  const asset = award.image ? images[award.image] : null
  const isPlace = /^\d/.test(award.place)

  return (
    <Reveal as="li" index={index}>
      <article
        className={cn(
          'surface-card group relative flex h-full flex-col overflow-hidden rounded-2xl transition-colors duration-500 hover:border-line-2',
          award.featured && asset && 'md:flex-row',
        )}
      >
        {asset && (
          <button
            type="button"
            onClick={() => open([{ asset, alt: `${award.place}, ${award.title}`, caption: `${award.place}, ${award.title}` }])}
            className={cn('relative block overflow-hidden text-left', award.featured ? 'aspect-[16/10] md:aspect-auto md:w-[46%]' : 'aspect-[16/10]')}
            aria-label={`Open award photo: ${award.title}`}
          >
            <Img
              asset={asset}
              alt={`${award.place}, ${award.title}`}
              className="h-full w-full"
              imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
            />
          </button>
        )}

        <div className="relative flex flex-1 flex-col p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <span
              className={cn(
                'font-display leading-none font-medium tracking-tight',
                isPlace ? 'text-gradient-amber text-6xl sm:text-7xl' : 'text-2xl text-fg sm:text-3xl',
              )}
            >
              {award.place}
            </span>
            <span className="font-mono text-xs text-muted tabular-nums">{award.year}</span>
          </div>
          <h3 className="mt-5 text-xl leading-tight font-medium tracking-tight sm:text-2xl">{award.title}</h3>
          {award.org && <p className="mt-1 text-sm text-fg-2">{award.org}</p>}
          <p className="mt-4 text-[14.5px] leading-relaxed text-fg-2">{award.description}</p>
        </div>
      </article>
    </Reveal>
  )
}

export function Awards() {
  return (
    <section id="awards" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading index="04" title="Awards" />
        <ul className="grid gap-4 sm:gap-5 lg:grid-cols-2">
          {awards.map((a, i) => (
            <AwardCard key={a.id} award={a} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}
