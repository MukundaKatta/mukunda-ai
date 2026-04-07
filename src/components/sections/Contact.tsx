import { Mail, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons'
import { ScrollReveal } from '../ui/ScrollReveal'
import { personal } from '../../data/personal'

export function Contact() {
  return (
    <section id="contact" className="relative py-28 px-6 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-emerald-50/50 to-white dark:from-slate-900 dark:via-emerald-950/20 dark:to-slate-950" />
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="relative max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for opportunities
          </div>

          <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6">
            Let's talk
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-300 mb-3 max-w-xl mx-auto">
            Looking for a remote role where I can build production-ready AI systems and ship real impact.
          </p>

          <p className="flex items-center justify-center gap-1.5 text-slate-400 dark:text-slate-500 mb-10">
            <MapPin size={16} />
            {personal.location}
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all duration-200 shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/30 hover:-translate-y-0.5"
            >
              <Mail size={18} /> Get in Touch
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 px-8 py-3.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:-translate-y-0.5"
            >
              <LinkedinIcon size={18} /> LinkedIn
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 px-8 py-3.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:-translate-y-0.5"
            >
              <GithubIcon size={18} /> GitHub
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
