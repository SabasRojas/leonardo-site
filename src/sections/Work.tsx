import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, X } from 'lucide-react'
import { images, projects, type Project } from '../data/content'
import { Img } from '../components/Img'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SchematicArt } from '../components/SchematicArt'
import { useLightbox } from '../components/lightbox-context'
import { cn } from '../lib/cn'
import { EASE_OUT_EXPO } from '../lib/motion'

function Cover({ project, className, imgClassName }: { project: Project; className?: string; imgClassName?: string }) {
  if (project.cover) {
    return <Img asset={images[project.cover]} alt={`${project.title}, ${project.subtitle}`} className={className} imgClassName={imgClassName} />
  }
  return (
    <span className={cn('relative grid place-items-center overflow-hidden bg-surface-2 bg-grid-fine', className)}>
      <span aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(255_138_43_/_0.12),transparent_60%)]" />
      <SchematicArt variant={project.id === 'multitool' ? 'lpbf' : 'cfd'} className="relative h-full w-full p-4" />
    </span>
  )
}

function ProjectCard({ project, featured, onOpen, index }: { project: Project; featured?: boolean; onOpen: () => void; index: number }) {
  return (
    <Reveal as="li" index={index % 3} className={cn(featured && 'md:col-span-2')}>
      <button
        type="button"
        onClick={onOpen}
        className="group surface-card relative flex h-full w-full flex-col overflow-hidden rounded-2xl text-left transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-line-2"
        aria-label={`Open project: ${project.title}`}
      >
        <span className={cn('relative block overflow-hidden', featured ? 'aspect-[16/10] md:aspect-[21/9]' : 'aspect-[4/3]')}>
          <Cover project={project} className="h-full w-full" imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]" />
          <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
          <span className="absolute top-4 left-4 rounded-full bg-ink/80 px-2.5 py-1 font-mono text-[10px] tracking-[0.2em] text-fg-2 [@media(hover:hover)]:bg-ink/70 [@media(hover:hover)]:backdrop-blur">
            {project.index}
          </span>
          <span className="absolute top-4 right-4 grid size-9 translate-y-1 place-items-center rounded-full bg-fg text-ink opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="size-4" />
          </span>
        </span>

        <span className="flex flex-1 flex-col p-5 sm:p-6">
          <span className="flex items-start justify-between gap-4">
            <span>
              <span className={cn('block leading-tight font-medium tracking-tight font-display', featured ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-[1.35rem]')}>
                {project.title}
              </span>
              <span className="mt-1.5 block text-sm leading-snug text-fg-2">{project.subtitle}</span>
            </span>
            <span className="shrink-0 pt-1 font-mono text-[11px] text-muted tabular-nums">{project.year}</span>
          </span>
          <span className="mt-auto block pt-5 text-xs text-muted">{project.org}</span>
        </span>
      </button>
    </Reveal>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { open } = useLightbox()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const items = project.images.map((k) => ({ asset: images[k], alt: `${project.title}, ${project.subtitle}`, caption: project.title }))

  return (
    <motion.div
      className="fixed inset-0 z-[95] flex items-end justify-center bg-ink/90 sm:items-center sm:p-6 [@media(hover:hover)]:bg-ink/80 [@media(hover:hover)]:backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`project-${project.id}-title`}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        className="relative flex max-h-[92dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl border border-line-2 bg-surface shadow-2xl sm:rounded-3xl"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-8">
          <span className="text-sm text-muted">
            {project.org} · {project.year}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project"
            className="grid size-10 place-items-center rounded-full border border-line-2 text-fg-2 transition hover:bg-white/10 hover:text-fg"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="no-scrollbar min-h-0 overflow-y-auto overscroll-contain">
          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            <div>
              {project.images.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {project.images.map((k, i) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => open(items, i)}
                      className={cn(
                        'group relative overflow-hidden rounded-xl border border-line bg-surface-2',
                        i === 0 ? 'col-span-2 aspect-[16/10]' : 'aspect-[4/3]',
                      )}
                      aria-label={`Open image ${i + 1} of ${project.images.length}`}
                    >
                      <Img
                        asset={images[k]}
                        alt={`${project.title}, view ${i + 1}`}
                        className="h-full w-full"
                        imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                        priority={i === 0}
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <Cover project={project} className="aspect-[4/3] rounded-xl border border-line" />
              )}
            </div>

            <div className="flex flex-col">
              <h3 id={`project-${project.id}-title`} className="text-3xl leading-[1.05] font-medium tracking-tight sm:text-4xl">
                {project.title}
              </h3>
              <p className="mt-2 text-fg-2">{project.subtitle}</p>
              <p className="mt-6 text-[15px] leading-relaxed text-fg">{project.description}</p>

              <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t border-line pt-6 text-sm">
                {project.specs.map((s) => (
                  <div key={s.label} className="contents">
                    <dt className="text-muted">{s.label}</dt>
                    <dd className="text-fg-2">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Work() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <section id="work" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading index="03" title="Work" description="Parts I have designed, machined, or post-processed. Open a project for photos and details." />

        <ul className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} featured={i === 0} index={i} onOpen={() => setActive(p)} />
          ))}
        </ul>
      </div>

      <AnimatePresence>{active && <ProjectModal key={active.id} project={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </section>
  )
}
