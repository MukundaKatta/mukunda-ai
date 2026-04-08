import { motion } from 'framer-motion'
import { SectionHeading } from '../ui/SectionHeading'
import { ScrollReveal } from '../ui/ScrollReveal'
import { certGroups } from '../../data/certifications'

export function Certifications() {
  return (
    <section id="certifications" className="relative py-28 px-6 bg-white dark:bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <SectionHeading icon="🏅" title="Certifications" />

        <ScrollReveal>
          <p className="text-center text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            <span className="text-3xl font-extrabold gradient-text">{certGroups.reduce((a, g) => a + g.certs.length, 0)}+</span>
            <span className="ml-2">professional certifications across AI, cloud, and data</span>
          </p>
        </ScrollReveal>

        <div className="space-y-5">
          {certGroups.map((group, i) => (
            <ScrollReveal key={group.provider} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="p-6 md:p-7 rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white/90 dark:bg-slate-800/50 backdrop-blur-sm group"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-4 h-4 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: group.color, boxShadow: `0 0 0 4px ${group.color}20` }}
                  />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {group.provider}
                    <span className="ml-2 text-sm font-normal text-slate-400 dark:text-slate-500">({group.certs.length})</span>
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.certs.map((cert, j) => (
                    <motion.span
                      key={cert.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 + j * 0.02 }}
                      whileHover={{ scale: 1.06 }}
                      className="text-xs px-3 py-1.5 rounded-full border font-medium transition-all duration-200 cursor-default"
                      style={{
                        borderColor: `${group.color}25`,
                        color: group.color,
                        backgroundColor: `${group.color}08`,
                      }}
                    >
                      {cert.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
