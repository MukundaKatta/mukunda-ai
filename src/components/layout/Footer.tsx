import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../ui/SocialIcons'
import { personal } from '../../data/personal'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-slate-200/70 dark:border-indigo-900/20 bg-[#faf9f6] dark:bg-black">
      <div className="max-w-5xl mx-auto">
        {/* Top — brand + description */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-10">
          <div className="text-center md:text-left">
            <a href="#" className="text-xl font-extrabold gradient-text-premium tracking-tight">
              MK
            </a>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xs">
              Senior AI/ML Engineer building production AI systems and developer tools.
            </p>
          </div>

          {/* Nav links — pill style */}
          <nav className="flex flex-wrap gap-2 justify-center md:justify-end">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm px-3.5 py-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-indigo-900/30 to-transparent mb-8" />

        {/* Bottom — social + copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
            &copy; {new Date().getFullYear()} {personal.name}
            <span className="text-slate-300 dark:text-slate-600">·</span>
            Built with <Heart size={12} className="text-indigo-500 inline" />
          </p>

          <div className="flex gap-2">
            {[
              { href: personal.github, icon: <GithubIcon size={16} />, label: 'GitHub' },
              { href: personal.linkedin, icon: <LinkedinIcon size={16} />, label: 'LinkedIn' },
              { href: personal.twitter, icon: <TwitterIcon size={16} />, label: 'X' },
            ].map(({ href, icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener"
                whileHover={{ y: -2 }}
                className="neon-tile w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-300"
                aria-label={label}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
