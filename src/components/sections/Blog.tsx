import { motion } from 'framer-motion'
import { Clock, ArrowUpRight, Calendar } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { ScrollReveal } from '../ui/ScrollReveal'
import { MatrixRain } from '../ui/MatrixRain'
import { blogPosts } from '../../data/blog'

export function Blog() {
  return (
    <section id="blog" className="relative py-28 px-6 bg-[#f5f3ec] dark:bg-[#030308] overflow-hidden">
      <div className="absolute inset-0 hidden dark:block">
        <MatrixRain intensity="normal" />
      </div>
      <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)] pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-40 dark:opacity-0" />

      <div className="relative max-w-5xl mx-auto">
        <SectionHeading kicker="07" title="Writing & Insights" />

        <ScrollReveal>
          <p className="text-center text-slate-500 dark:text-slate-400 mb-14 max-w-2xl mx-auto text-lg">
            Technical deep-dives from building production AI systems at scale
          </p>
        </ScrollReveal>

        <div className="space-y-5">
          {blogPosts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.08}>
              <motion.article
                whileHover={{ x: 6 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className={`group lift p-6 md:p-7 rounded-2xl border border-slate-200 dark:border-indigo-400/15 hover:border-indigo-300/70 dark:hover:border-indigo-400/30 bg-white dark:bg-[#0a0a14]/70 backdrop-blur-xl relative overflow-hidden transition-colors dark:shadow-[0_8px_40px_-12px_rgba(99,102,241,0.15)] ${post.url ? 'cursor-pointer' : 'cursor-default'}`}
              >
                {post.url && (
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10"
                    aria-label={`Read: ${post.title}`}
                  />
                )}
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute -top-20 -left-20 w-40 h-40 bg-indigo-500/[0.04] rounded-full blur-[40px]" />
                </div>
                {/* Left accent rail on hover */}
                <span className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-indigo-400 to-violet-500 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out pointer-events-none" />

                <div className="relative">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                        {post.title}
                        {post.url && <ArrowUpRight size={16} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0" />}
                      </h3>
                    </div>
                    {post.featured && (
                      <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-semibold border border-indigo-200 dark:border-indigo-800/50 whitespace-nowrap dark:shadow-[0_0_16px_-6px_rgba(99,102,241,0.5)]">
                        <span className="h-1 w-1 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-slate-50 dark:bg-white/[0.03] text-slate-600 dark:text-slate-300 border border-slate-200/70 dark:border-white/[0.06] font-medium transition-colors group-hover:border-indigo-200/80 dark:group-hover:border-indigo-400/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500 shrink-0 ml-4 nums-tabular">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
