import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../ui/SocialIcons'
import { personal } from '../../data/personal'

const navLinks = [
  { label: 'Systems', href: '#systems' },
  { label: 'Proof', href: '#proof' },
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
            <a href="#" className="text-xl font-extrabold gradient-text-premium glow-text tracking-tight">
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
                className="link-underline text-sm px-1 py-1.5 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-indigo-900/40 to-transparent" />
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />
        </div>

        {/* Bottom — social + copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400 dark:text-slate-500 flex items-center gap-1.5 nums-tabular">
            &copy; {new Date().getFullYear()} {personal.name}
            <span className="text-slate-300 dark:text-slate-600">·</span>
            Built with <Heart size={12} className="text-indigo-500 inline transition-transform hover:scale-125 hover:fill-indigo-500" />
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
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.92 }}
                className="neon-tile shine w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
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
