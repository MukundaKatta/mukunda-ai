import { MotionConfig } from 'framer-motion'
import { useTheme } from './hooks/useTheme'
import { Intro } from './components/ui/Intro'
import { CustomCursor } from './components/ui/CustomCursor'
import { CommandPalette } from './components/ui/CommandPalette'
import { ScrollSpyNav } from './components/ui/ScrollSpyNav'
import { BackToTop } from './components/ui/BackToTop'
import { GlobalDynamics } from './components/ui/GlobalDynamics'
import { CinematicDivider } from './components/ui/CinematicDivider'
import { Header } from './components/layout/Header'
import { Hero } from './components/sections/Hero'
import { SystemsMap } from './components/sections/SystemsMap'
import { ImpactBoard } from './components/sections/ImpactBoard'
import { About } from './components/sections/About'
import { WhatIDo } from './components/sections/WhatIDo'
import { Experience } from './components/sections/Experience'
import { Projects } from './components/sections/Projects'
import { Certifications } from './components/sections/Certifications'
import { Education } from './components/sections/Education'
import { Skills } from './components/sections/Skills'
import { Blog } from './components/sections/Blog'
import { Contact } from './components/sections/Contact'
import { LiveSignals } from './components/sections/LiveSignals'
import { Footer } from './components/layout/Footer'

export default function App() {
  const { dark, toggle } = useTheme()

  return (
    <MotionConfig reducedMotion="user">
      <Intro />
      <CustomCursor />
      <CommandPalette dark={dark} toggle={toggle} />
      <div className="min-h-screen bg-[#faf9f6] dark:bg-black text-slate-900 dark:text-slate-100 transition-colors">
        <a
          href="#systems"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header dark={dark} toggle={toggle} />
        <GlobalDynamics />
        <ScrollSpyNav />
        <main>
          <Hero />
          <SystemsMap />
          <ImpactBoard />
          <About />
          <CinematicDivider />
          <WhatIDo />
          <CinematicDivider />
          <Experience />
          <CinematicDivider />
          <Projects />
          <CinematicDivider />
          <Certifications />
          <CinematicDivider />
          <Education />
          <CinematicDivider />
          <Skills />
          <CinematicDivider />
          <Blog />
          <CinematicDivider />
          <Contact />
          <LiveSignals />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </MotionConfig>
  )
}
