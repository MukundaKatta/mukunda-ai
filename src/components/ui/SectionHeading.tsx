import { ScrollReveal } from './ScrollReveal'

export function SectionHeading({ icon, title }: { icon: string; title: string }) {
  return (
    <ScrollReveal>
      <div className="flex items-center gap-3 mb-10">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{title}</h2>
      </div>
    </ScrollReveal>
  )
}
