import { useTheme } from './hooks/useTheme'
import { ThemeToggle } from './components/ui/ThemeToggle'
import { BackToTop } from './components/ui/BackToTop'
import { Header } from './components/layout/Header'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { WhatIDo } from './components/sections/WhatIDo'
import { Experience } from './components/sections/Experience'
import { Projects } from './components/sections/Projects'
import { Certifications } from './components/sections/Certifications'
import { Education } from './components/sections/Education'
import { Skills } from './components/sections/Skills'
import { Blog } from './components/sections/Blog'
import { Contact } from './components/sections/Contact'
import { Footer } from './components/layout/Footer'

export default function App() {
  const { dark, toggle } = useTheme()

  return (
    <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-slate-100 transition-colors">
      <Header />
      <ThemeToggle dark={dark} toggle={toggle} />
      <main>
        <Hero />
        <About />
        <div className="section-divider" />
        <WhatIDo />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Certifications />
        <div className="section-divider" />
        <Education />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Blog />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
