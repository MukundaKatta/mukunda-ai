export interface Experience {
  company: string
  role: string
  period: string
  type: string
  highlights: string[]
  featured?: boolean
}

export const experiences: Experience[] = [
  {
    company: 'GPS IT Solutions',
    role: 'GenAI Engineer',
    period: 'Jun 2024 — Present',
    type: 'AI & Automation',
    highlights: [
      'Architected GPT-4-powered marketing content generator with brand-voice compliance, reducing content creation time by 40%',
      'Built production RAG pipelines on Vertex AI + BigQuery for intelligent retrieval across 500K+ enterprise documents with sub-second latency',
      'Designed LLM evaluation harnesses (GPT-4, Claude, Gemini) with A/B testing, accelerating GenAI feature development by 30%',
    ],
    featured: true,
  },
  {
    company: 'Amazon Web Services (AWS)',
    role: 'Software Development Engineer',
    period: 'Aug 2022 — May 2024',
    type: 'Cloud & AI/ML',
    highlights: [
      'Built inference APIs for AWS Bedrock (Claude, Llama, Titan) handling millions of daily calls with 99.99% availability',
      'Engineered SageMaker pipeline components for end-to-end ML workflows, cutting customer time-to-production by 40%',
      'Designed model management APIs in Python and Java powering Bedrock\'s multi-model infrastructure at scale',
      'Built telemetry and observability pipelines for AI/ML workloads, reducing mean-time-to-detection by 35%',
      'Implemented CI/CD with canary releases across 15+ microservices, achieving zero-downtime deployments',
    ],
    featured: true,
  },
  {
    company: 'GSP IT Solutions',
    role: 'Data Engineer',
    period: 'Jan 2022 — Aug 2022',
    type: 'Data Engineering',
    highlights: [
      'Architected HIPAA-compliant data warehouse on AWS Redshift consolidating 12+ source systems for 200+ business users',
      'Designed Apache Airflow DAGs orchestrating 50+ daily data pipelines with automated quality checks and SLA monitoring',
      'Migrated legacy on-prem ETL to cloud-native services (AWS Glue, Lambda, Step Functions), reducing costs by 60%',
    ],
  },
  {
    company: 'Infosys',
    role: 'Data Engineer / Software Engineer',
    period: 'Feb 2017 — Dec 2020',
    type: 'Enterprise Software',
    highlights: [
      'Developed Python-based ETL frameworks processing 10M+ records daily for Fortune 100 healthcare clients including Cigna',
      'Led migration of legacy ETL (SSIS/Oracle) to Snowflake, reducing query times by 70% and accelerating pipeline development by 40%',
      'Built streaming and batch ETL solutions with Apache Beam and PySpark, processing terabytes of healthcare data',
    ],
  },
]
