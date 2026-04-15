import type { ComponentType } from 'react'
import { motion } from 'framer-motion'
import {
  SiTypescript, SiPython, SiJavascript, SiGo, SiOpenjdk,
  SiAnthropic, SiOpenai, SiLangchain,
  SiReact, SiNextdotjs, SiExpo, SiTailwindcss,
  SiNodedotjs, SiFastapi, SiFastify,
  SiSnowflake, SiGooglebigquery,
  SiApacheairflow, SiDbt, SiApachespark,
  SiGooglecloud, SiDocker, SiKubernetes, SiTerraform,
  SiPostgresql, SiSupabase, SiRedis, SiFirebase,
  SiOpentelemetry,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa6'
import { VscAzure } from 'react-icons/vsc'
import { SectionHeading } from '../ui/SectionHeading'
import { ScrollReveal } from '../ui/ScrollReveal'
import { skillCategories } from '../../data/skills'

type IconT = ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>

const iconFor: Record<string, IconT> = {
  // Languages
  TypeScript: SiTypescript,
  Python: SiPython,
  JavaScript: SiJavascript,
  Go: SiGo,
  Java: SiOpenjdk,
  // AI / LLM
  Claude: SiAnthropic,
  OpenAI: SiOpenai,
  LangChain: SiLangchain,
  // Frontend
  React: SiReact,
  'Next.js': SiNextdotjs,
  'React Native': SiReact,
  Expo: SiExpo,
  'Tailwind CSS': SiTailwindcss,
  // Backend & APIs
  'Node.js': SiNodedotjs,
  FastAPI: SiFastapi,
  Fastify: SiFastify,
  // Data & ML
  Snowflake: SiSnowflake,
  Redshift: FaAws,
  BigQuery: SiGooglebigquery,
  SageMaker: FaAws,
  Bedrock: FaAws,
  Airflow: SiApacheairflow,
  dbt: SiDbt,
  Spark: SiApachespark,
  PySpark: SiApachespark,
  // Cloud & DevOps
  AWS: FaAws,
  GCP: SiGooglecloud,
  Azure: VscAzure,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  Terraform: SiTerraform,
  // Databases
  PostgreSQL: SiPostgresql,
  Supabase: SiSupabase,
  Redis: SiRedis,
  Firebase: SiFirebase,
  pgvector: SiPostgresql,
  DynamoDB: FaAws,
  // Observability
  OpenTelemetry: SiOpentelemetry,
  CloudWatch: FaAws,
}

function BrandIcon({ label }: { label: string }) {
  const Icon = iconFor[label]
  if (!Icon) return null
  return <Icon size={14} className="shrink-0 opacity-95 text-slate-700 dark:text-slate-200" />
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
