import { MotionConfig } from 'motion/react'
import { LightboxProvider } from './components/Lightbox'
import { Nav } from './sections/Nav'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Experience } from './sections/Experience'
import { Work } from './sections/Work'
import { Awards } from './sections/Awards'
import { Gallery } from './sections/Gallery'
import { Skills } from './sections/Skills'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LightboxProvider>
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-full focus:bg-amber focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Nav />
        <main>
          <Hero />
          <About />
          <Experience />
          <Work />
          <Awards />
          <Gallery />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </LightboxProvider>
    </MotionConfig>
  )
}
