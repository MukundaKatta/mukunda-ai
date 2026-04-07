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
    role: 'GenAI Engineer / AI Python Engineer',
    period: 'Jun 2024 — Present',
    type: 'AI & Automation',
    highlights: [
      'Architected GPT-4-powered marketing content generator, reducing content creation time by 40%',
      'Built production RAG pipelines using Vertex AI and BigQuery for intelligent document retrieval across 500K+ enterprise documents',
    ],
    featured: true,
  },
  {
    company: 'Amazon Web Services (AWS)',
    role: 'Software Development Engineer',
    period: 'Aug 2022 — May 2024',
    type: 'Cloud & AI/ML',
    highlights: [
      'Built core AI/ML product features for AWS Bedrock and SageMaker, serving thousands of enterprise customers worldwide',
      'Developed inference APIs and model-serving infrastructure for Amazon Bedrock (Claude, Llama, Titan) at production scale',
      'Engineered SageMaker pipeline components for end-to-end ML workflows, reducing customers\' time-to-production by 40%',
      'Designed RESTful APIs in Python and Java powering Bedrock\'s model management, handling millions of API calls daily with 99.99% availability',
      'Implemented CI/CD pipelines via Jenkins and AWS CodePipeline with canary releases across 15+ AI/ML microservices',
    ],
    featured: true,
  },
  {
    company: 'GSP IT Solutions',
    role: 'Data Engineer',
    period: 'Jan 2022 — Aug 2022',
    type: 'Data Engineering',
    highlights: [
      'Built and optimized ETL pipelines processing large-scale enterprise datasets',
      'Designed data warehouse solutions for analytics and reporting',
    ],
  },
  {
    company: 'Infosys',
    role: 'Data Engineer / Software Engineer',
    period: 'Feb 2017 — Dec 2020',
    type: 'Enterprise Software',
    highlights: [
      'Developed Python-based ETL frameworks processing 10M+ records daily for enterprise clients including Cigna',
      'Built streaming and batch ETL solutions with Apache Beam and PySpark, processing terabytes of healthcare data',
    ],
  },
]
