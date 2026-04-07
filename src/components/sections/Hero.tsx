import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../ui/SocialIcons'
import { TypeWriter } from '../ui/TypeWriter'
import { personal } from '../../data/personal'

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Avatar */}
        <div className="relative shrink-0 animate-[fadeScale_0.6s_ease-out_both]">
          <div className="w-52 h-52 md:w-64 md:h-64 rounded-full glow-ring p-1.5 bg-gradient-to-br from-teal-500 to-cyan-500">
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-50 dark:bg-slate-800">
              <img
                src="/avatar.jpg"
                alt={personal.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-5xl font-bold gradient-text">MK</div>`
                }}
              />
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900">
            <span className="text-white text-sm">✓</span>
          </div>
        </div>

        {/* Text */}
        <div className="text-center md:text-left animate-[fadeSlide_0.6s_ease-out_0.2s_both]">
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-2">
            Hi, I'm{' '}
            <a href={personal.github} target="_blank" rel="noopener" className="text-teal-600 dark:text-teal-400 font-semibold hover:underline">
              {personal.handle}
            </a>,
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3">
            <TypeWriter words={personal.roles} className="gradient-text" />
          </h1>

          <p className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6">
            {personal.tagline}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8">
            {personal.badges.map((badge) => (
              <span
                key={badge}
                className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:border-teal-400 transition-colors"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex gap-4 justify-center md:justify-start">
            {[
              { href: personal.github, icon: <GithubIcon size={20} />, label: 'GitHub' },
              { href: personal.linkedin, icon: <LinkedinIcon size={20} />, label: 'LinkedIn' },
              { href: personal.twitter, icon: <TwitterIcon size={20} />, label: 'X' },
              { href: `mailto:${personal.email}`, icon: <Mail size={20} />, label: 'Email' },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener"
                className="p-3 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-400 transition-colors bg-white dark:bg-slate-800"
                aria-label={label}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
