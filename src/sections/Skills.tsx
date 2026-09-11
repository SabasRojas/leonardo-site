import { skillGroups } from '../data/content'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading index="06" title="Skills" />

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          {skillGroups.map((g, i) => (
            <Reveal key={g.id} index={i} className="surface-card rounded-2xl p-6 transition-colors duration-500 hover:border-line-2 sm:p-8">
              <h3 className="text-xl font-medium tracking-tight sm:text-2xl">{g.title}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li key={s} className="rounded-lg border border-line bg-white/[0.02] px-3 py-1.5 text-[13px] text-fg-2 transition-colors duration-300 hover:border-amber/50 hover:text-fg">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
