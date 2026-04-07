import { useTheme } from './hooks/useTheme'
import { ThemeToggle } from './components/ui/ThemeToggle'
import { Hero } from './components/sections/Hero'
import { WhatIDo } from './components/sections/WhatIDo'
import { Experience } from './components/sections/Experience'
import { Projects } from './components/sections/Projects'
import { Certifications } from './components/sections/Certifications'
import { Education } from './components/sections/Education'
import { Skills } from './components/sections/Skills'
import { Contact } from './components/sections/Contact'
import { Footer } from './components/layout/Footer'

export default function App() {
  const { dark, toggle } = useTheme()

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <ThemeToggle dark={dark} toggle={toggle} />
      <main>
        <Hero />
        <WhatIDo />
        <Experience />
        <Projects />
        <Certifications />
        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
