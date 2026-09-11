import { gallery, images } from '../data/content'
import { Img } from '../components/Img'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { useLightbox } from '../components/lightbox-context'

export function Gallery() {
  const { open } = useLightbox()
  const items = gallery.map((g) => ({ asset: images[g.key], alt: g.caption, caption: g.caption }))

  return (
    <section id="gallery" className="relative scroll-mt-24 py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="container-x">
        <SectionHeading index="05" title="Gallery" />

        <ul className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4 [column-fill:_balance]">
          {gallery.map((g, i) => (
            <Reveal as="li" key={g.key} index={i % 4} className="mb-3 break-inside-avoid sm:mb-4">
              <button
                type="button"
                onClick={() => open(items, i)}
                className="group relative block w-full overflow-hidden rounded-xl border border-line bg-surface-2 text-left transition-[border-color,transform] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-line-2"
                aria-label={`Open: ${g.caption}`}
              >
                <Img
                  asset={images[g.key]}
                  alt={g.caption}
                  className="w-full"
                  imgClassName="h-auto transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                />
                {/* Touch devices never hover, so the caption stays visible there. */}
                <span className="pointer-events-none absolute inset-x-0 bottom-0 block bg-gradient-to-t from-ink/90 to-transparent p-3 pt-10 text-[11px] leading-snug text-fg transition-opacity duration-500 sm:text-[13px] [@media(hover:hover)]:p-4 [@media(hover:hover)]:text-[13px] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100">
                  {g.caption}
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
