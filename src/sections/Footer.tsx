import { ArrowUp } from 'lucide-react'
import { navLinks, profile } from '../data/content'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative border-t border-line">
      <div className="container-x flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <a href="#top" className="font-display text-lg font-medium tracking-tight">
            {profile.name}
          </a>
          <p className="mt-1 text-sm text-muted">© {year}</p>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-fg-2" aria-label="Footer">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-fg">
              {l.label}
            </a>
          ))}
          <a href={profile.linkedin} target="_blank" rel="noopener" className="transition hover:text-fg">
            LinkedIn
          </a>
        </nav>

        <a
          href="#top"
          className="inline-flex h-10 items-center gap-2 self-start rounded-full border border-line-2 px-4 text-sm text-fg-2 transition hover:border-fg/40 hover:text-fg md:self-auto"
        >
          Top <ArrowUp className="size-3.5" />
        </a>
      </div>
    </footer>
  )
}
