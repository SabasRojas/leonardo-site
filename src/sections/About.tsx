import { images, profile } from '../data/content'
import { Img } from '../components/Img'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

export function About() {
  const facts = [
    ['Age', String(profile.age)],
    ['Based in', profile.location],
    ['Degree', `${profile.degree}, ${profile.schoolShort}`],
    ['Graduating', profile.graduation],
    ['GPA', `${profile.gpa} / 4.00`],
    ['Languages', profile.languages.join(', ')],
  ]

  return (
    <section id="about" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading index="01" title="About" />

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <div className="mx-auto max-w-sm lg:max-w-none">
              <Img
                asset={images.portrait}
                alt={`Portrait of ${profile.name}`}
                className="aspect-square rounded-2xl border border-line"
                priority
              />
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                {facts.map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-muted">{k}</dt>
                    <dd className="mt-0.5 text-fg">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            {profile.about.map((p, i) => (
              <Reveal key={i} index={i} as="p" className={i === 0 ? 'text-lg leading-relaxed text-fg md:text-xl' : 'text-base leading-relaxed text-fg-2 md:text-lg'}>
                {p}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
