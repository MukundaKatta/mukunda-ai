import { motion } from 'framer-motion'
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
    <footer className="relative py-14 px-6 border-t border-slate-200/70 dark:border-indigo-900/30 bg-[#faf9f6] dark:bg-black">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Nav links */}
          <nav className="flex flex-wrap gap-6 justify-center">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex gap-3">
            {[
              { href: personal.github, icon: <GithubIcon size={18} />, label: 'GitHub' },
              { href: personal.linkedin, icon: <LinkedinIcon size={18} />, label: 'LinkedIn' },
              { href: personal.twitter, icon: <TwitterIcon size={18} />, label: 'X' },
            ].map(({ href, icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener"
                whileHover={{ scale: 1.15, y: -2 }}
                className="p-2.5 rounded-full text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                aria-label={label}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/50 text-center">
          <p className="text-sm text-slate-400 dark:text-slate-500">
            &copy; {new Date().getFullYear()} {personal.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
