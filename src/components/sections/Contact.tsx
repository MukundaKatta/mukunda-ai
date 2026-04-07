import { Mail, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons'
import { ScrollReveal } from '../ui/ScrollReveal'
import { personal } from '../../data/personal'

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-white dark:bg-slate-950">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Let's talk
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-3">
            Open to remote roles — {personal.availableFor.join(', ')}
          </p>
          <p className="flex items-center justify-center gap-1.5 text-slate-400 mb-10">
            <MapPin size={16} />
            {personal.location}
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-colors shadow-md"
            >
              <Mail size={18} /> Contact
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors bg-white dark:bg-slate-800"
            >
              <LinkedinIcon size={18} /> LinkedIn
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors bg-white dark:bg-slate-800"
            >
              <GithubIcon size={18} /> GitHub
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
