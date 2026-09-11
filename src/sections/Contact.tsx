import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Download, Mail, MapPin, Phone } from 'lucide-react'
import { profile } from '../data/content'
import { LinkedInIcon } from '../components/LinkedInIcon'
import { ButtonLink } from '../components/Button'
import { Reveal } from '../components/Reveal'

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable; the mailto link still works */
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy email address"
      className="grid size-9 shrink-0 place-items-center rounded-full border border-line-2 text-fg-2 transition hover:bg-white/[0.06] hover:text-fg"
    >
      {copied ? <Check className="size-4 text-amber" /> : <Copy className="size-4" />}
    </button>
  )
}

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="container-x">
        <Reveal className="surface-card relative overflow-hidden rounded-3xl p-7 sm:p-12 lg:p-16">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
            <div className="glow-amber absolute -top-56 -right-40 size-[40rem] [@media(hover:hover)]:hidden" />
            <div className="absolute -top-32 -right-24 hidden size-[28rem] rounded-full bg-amber/10 blur-[120px] [@media(hover:hover)]:block" />
          </div>

          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <div>
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-muted tabular-nums">07</span>
                <h2 className="text-4xl leading-none font-medium tracking-tight sm:text-5xl">Contact</h2>
              </div>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-2 md:text-lg">
                I’m interested in engineering internships and research work in manufacturing. Email is the best way to reach me.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={profile.resumeHref} target="_blank" rel="noopener" variant="outline" size="lg">
                  <Download className="size-4" /> Resume (PDF)
                </ButtonLink>
              </div>
            </div>

            <ul className="grid gap-3 self-center">
              <li className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-ink/40 p-4">
                <a href={`mailto:${profile.email}`} className="group flex min-w-0 items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line-2 text-amber">
                    <Mail className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted">Email</span>
                    <span className="block truncate text-sm text-fg group-hover:text-amber-2">{profile.email}</span>
                  </span>
                </a>
                <CopyEmail />
              </li>
              <li>
                <a href={profile.phoneHref} className="group flex items-center gap-3 rounded-2xl border border-line bg-ink/40 p-4 transition hover:border-line-2">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line-2 text-amber">
                    <Phone className="size-4" />
                  </span>
                  <span>
                    <span className="block text-xs text-muted">Phone</span>
                    <span className="block text-sm text-fg group-hover:text-amber-2">{profile.phone}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener"
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-ink/40 p-4 transition hover:border-line-2"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line-2 text-amber">
                      <LinkedInIcon className="size-4" />
                    </span>
                    <span>
                      <span className="block text-xs text-muted">LinkedIn</span>
                      <span className="block text-sm text-fg group-hover:text-amber-2">{profile.linkedinHandle}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="size-4 text-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg" />
                </a>
              </li>
              <li className="flex items-center gap-3 rounded-2xl border border-line bg-ink/40 p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line-2 text-amber">
                  <MapPin className="size-4" />
                </span>
                <span>
                  <span className="block text-xs text-muted">Location</span>
                  <span className="block text-sm text-fg">{profile.location}</span>
                </span>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
