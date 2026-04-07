import { ChevronDown, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../ui/SocialIcons'
import { TypeWriter } from '../ui/TypeWriter'
import { personal } from '../../data/personal'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 gradient-mesh overflow-hidden">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-50" />

      <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
        {/* Avatar */}
        <div className="relative shrink-0 animate-[fadeScale_0.8s_ease-out_both]">
          <div className="w-56 h-56 md:w-72 md:h-72 rounded-full glow-ring p-2 bg-gradient-to-br from-teal-500 to-cyan-500">
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-50 dark:bg-slate-800">
              <img
                src="/avatar.jpg"
                alt={personal.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-6xl font-bold gradient-text">MK</div>`
                }}
              />
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-11 h-11 bg-teal-600 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-950 shadow-lg">
            <span className="text-white text-sm font-bold">✓</span>
          </div>
        </div>

        {/* Text */}
        <div className="text-center md:text-left animate-[fadeSlide_0.8s_ease-out_0.15s_both]">
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-3">
            Hi, I'm{' '}
            <a href={personal.github} target="_blank" rel="noopener" className="text-teal-600 dark:text-teal-400 font-semibold hover:underline">
              {personal.handle}
            </a>,
          </p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight">
            <TypeWriter words={personal.roles} className="gradient-text" />
          </h1>

          <p className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-8">
            {personal.tagline}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8">
            {personal.badges.map((badge) => (
              <span
                key={badge}
                className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-200"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex gap-3 justify-center md:justify-start">
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
                className="p-3 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-400 hover:shadow-md transition-all duration-200 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
                aria-label={label}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-[fadeUp_1s_ease-out_1s_both]">
        <a href="#about" className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-teal-500 transition-colors">
          <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
          <ChevronDown size={20} className="animate-[scroll-bounce_2s_ease-in-out_infinite]" />
        </a>
      </div>
    </section>
  )
}
