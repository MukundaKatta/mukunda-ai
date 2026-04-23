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
                className={`group p-6 md:p-7 rounded-2xl border border-slate-200 dark:border-indigo-400/15 bg-white/90 dark:bg-[#0a0a14]/70 backdrop-blur-xl relative overflow-hidden dark:shadow-[0_8px_40px_-12px_rgba(99,102,241,0.15)] ${post.url ? 'cursor-pointer' : 'cursor-default'}`}
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
                  <div className="absolute -top-20 -left-20 w-40 h-40 bg-indigo-500/[0.05] rounded-full blur-[40px]" />
                </div>

                <div className="relative">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                        {post.title}
                        {post.url && <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />}
                      </h3>
                    </div>
                    {post.featured && (
                      <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium border border-indigo-200 dark:border-indigo-800/50 whitespace-nowrap">
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
                        <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-600/50 font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500 shrink-0 ml-4">
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
