import { useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { ScrollReveal } from '../ui/ScrollReveal'
import { certGroups } from '../../data/certifications'

// Provider -> simple-icons slug (verified)
const providerSlug: Record<string, string> = {
  Anthropic: 'anthropic',
  AWS: 'amazonwebservices',
  Microsoft: 'microsoft',
  Azure: 'microsoftazure',
  GCP: 'googlecloud',
  IBM: 'ibm',
  'LinkedIn Learning': 'linkedin',
}

function ProviderLogo({ provider, color }: { provider: string; color: string }) {
  const slug = providerSlug[provider]
  const [failed, setFailed] = useState(false)

  // Academic providers / fallback: GraduationCap icon in brand color
  if (!slug || failed) {
    return (
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${color}18`, border: `1px solid ${color}35` }}
      >
        <GraduationCap size={16} style={{ color }} />
      </div>
    )
  }

  return (
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-white dark:bg-white/95 p-1.5"
      style={{ boxShadow: `0 0 0 1px ${color}30, 0 4px 12px -4px ${color}40` }}
    >
      <img
        src={`https://cdn.simpleicons.org/${slug}`}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="w-full h-full object-contain"
      />
    </div>
  )
}

export function Certifications() {
  return (
    <section id="certifications" className="relative py-28 px-6 bg-[#faf9f6] dark:bg-black">
      <div className="max-w-5xl mx-auto">
        <SectionHeading kicker="04" title="Certifications" />

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
                className="p-6 md:p-7 rounded-2xl border border-slate-200 dark:border-indigo-400/15 bg-white dark:bg-[#0a0a14]/70 backdrop-blur-sm group"
              >
                <div className="flex items-center gap-3 mb-5">
                  <ProviderLogo provider={group.provider} color={group.color} />
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
