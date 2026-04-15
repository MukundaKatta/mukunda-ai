import { motion } from 'framer-motion'
import { SectionHeading } from '../ui/SectionHeading'
import { ScrollReveal } from '../ui/ScrollReveal'
import { skillCategories } from '../../data/skills'

// Map skill label -> simple-icons slug. Items without a brand icon
// (generic concepts like "RAG", "Agents", "CI/CD") render as text only.
const iconSlug: Record<string, string> = {
  // Languages
  TypeScript: 'typescript',
  Python: 'python',
  JavaScript: 'javascript',
  Go: 'go',
  Java: 'openjdk',
  // AI / LLM
  Claude: 'anthropic',
  OpenAI: 'openai',
  LangChain: 'langchain',
  // Frontend
  React: 'react',
  'Next.js': 'nextdotjs',
  'React Native': 'react',
  Expo: 'expo',
  'Tailwind CSS': 'tailwindcss',
  // Backend & APIs
  'Node.js': 'nodedotjs',
  FastAPI: 'fastapi',
  Fastify: 'fastify',
  // Data & ML
  Snowflake: 'snowflake',
  Redshift: 'amazonredshift',
  BigQuery: 'googlebigquery',
  SageMaker: 'amazonaws',
  Bedrock: 'amazonaws',
  Airflow: 'apacheairflow',
  dbt: 'dbt',
  Spark: 'apachespark',
  PySpark: 'apachespark',
  // Cloud & DevOps
  AWS: 'amazonaws',
  GCP: 'googlecloud',
  Azure: 'microsoftazure',
  Docker: 'docker',
  Kubernetes: 'kubernetes',
  Terraform: 'terraform',
  // Databases
  PostgreSQL: 'postgresql',
  Supabase: 'supabase',
  Redis: 'redis',
  Firebase: 'firebase',
  pgvector: 'postgresql',
  DynamoDB: 'amazondynamodb',
  // Observability
  OpenTelemetry: 'opentelemetry',
  CloudWatch: 'amazonaws',
}

function BrandIcon({ label }: { label: string }) {
  const slug = iconSlug[label]
  if (!slug) return null
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}`}
      alt=""
      aria-hidden
      loading="lazy"
      decoding="async"
      className="w-3.5 h-3.5 shrink-0 opacity-90 group-hover:opacity-100 transition-opacity"
    />
  )
}

export function Skills() {
  return (
    <section id="skills" className="relative py-28 px-6 bg-[#faf9f6] dark:bg-black">
      <div className="max-w-6xl mx-auto">
        <SectionHeading kicker="06" title="Tech Stack" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, i) => (
            <ScrollReveal key={cat.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="group p-6 rounded-2xl border border-slate-200/80 dark:border-indigo-400/15 bg-white dark:bg-black/40 backdrop-blur-sm hover:border-indigo-300 dark:hover:border-indigo-400/40 transition-all duration-300 h-full"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">
                    {cat.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((item, j) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 + j * 0.02, duration: 0.3 }}
                      className="inline-flex items-center gap-1.5 text-sm px-2.5 py-1 rounded-md font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/[0.06] cursor-default"
                    >
                      <BrandIcon label={item} />
                      {item}
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
