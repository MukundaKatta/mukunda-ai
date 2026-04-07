import { SectionHeading } from '../ui/SectionHeading'
import { ScrollReveal } from '../ui/ScrollReveal'
import { certGroups } from '../../data/certifications'

export function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-5xl mx-auto">
        <SectionHeading icon="🏅" title="Certifications" />
        <div className="space-y-8">
          {certGroups.map((group, i) => (
            <ScrollReveal key={group.provider} delay={i * 0.08}>
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: group.color }}
                  />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {group.provider}
                    <span className="ml-2 text-sm font-normal text-slate-400">({group.certs.length})</span>
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.certs.map((cert) => (
                    <span
                      key={cert.name}
                      className="text-xs px-3 py-1.5 rounded-full border font-medium"
                      style={{
                        borderColor: `${group.color}40`,
                        color: group.color,
                        backgroundColor: `${group.color}10`,
                      }}
                    >
                      {cert.name}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
