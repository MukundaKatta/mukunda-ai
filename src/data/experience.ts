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
    company: 'Southwest Airlines',
    role: 'AI/ML Engineer',
    period: 'Aug 2025 — Present',
    type: 'AI & Automation',
    highlights: [
      'Architected end-to-end ML fault prediction system for aircraft maintenance, serving 5 prediction types across 10,000+ historical records — reducing diagnostic lookup from minutes to sub-second',
      'Led infrastructure migration from SageMaker to Bedrock + OpenSearch Serverless, cutting costs by 78% ($1,740→$371/mo) while improving query latency by 600x',
      'Designed production agentic RAG system with 9-stage pipeline — query routing, semantic caching, hybrid search (FAISS + BM25), cross-encoder re-ranking, self-RAG validation, and hallucination detection — on LangGraph with Bedrock Nova Pro/Micro',
      'Engineered data ingestion pipeline processing 30,000+ KB entries from 7 enterprise sources with 370+ tests and RAGAS evaluation framework',
    ],
    featured: true,
  },
  {
    company: 'GPS IT Solutions',
    role: 'AI/ML Engineer',
    period: 'Jun 2024 — Aug 2025',
    type: 'AI & Automation',
    highlights: [
      'Built end-to-end content generation platform using GPT-4 and RAG with automated compliance validation, producing 10–15 personalized variants per campaign and reducing production time by 40%',
      'Designed AI model risk governance framework with 23 automated evaluation tests — PII detection, bias analysis, hallucination grounding, toxicity scoring — achieving regulatory compliance and 30% faster reviews',
      'Architected FastAPI microservices with FAISS/Pinecone vector search, deployed on Kubernetes with PostgreSQL, AI Firewall, and full observability (Splunk, Dynatrace)',
    ],
    featured: true,
  },
  {
    company: 'Amazon Web Services (AWS)',
    role: 'Software Development Engineer',
    period: 'Aug 2022 — May 2024',
    type: 'Cloud & Infrastructure',
    highlights: [
      'Built and shipped features for AWS Application Manager (Systems Manager) — a production service in the AWS Console serving enterprise customers globally',
      'Owned full-stack delivery: React/TypeScript frontend and Java/Python backend APIs, with rigorous code review and operational excellence on a team of 10–12 engineers',
      'Designed CI/CD pipelines and IaC patterns enabling zero-downtime deployments with high availability for enterprise-scale traffic',
      'Drove operational excellence through on-call rotations, runbook automation, and proactive monitoring',
    ],
    featured: true,
  },
  {
    company: 'Cigna',
    role: 'Data Engineer',
    period: 'Jan 2022 — Aug 2022',
    type: 'Data Engineering',
    highlights: [
      'Led end-to-end migration of healthcare data pipelines from on-prem to AWS, redesigning ETL workflows with Glue and PySpark',
      'Built Python data extraction and transformation frameworks processing large-scale healthcare datasets with automated quality validation',
    ],
  },
  {
    company: 'American Express',
    role: 'Software Engineer',
    period: 'Feb 2017 — Dec 2020',
    type: 'Software Development',
    highlights: [
      'Developed Python backend services and RESTful APIs for enterprise marketing and compliance platforms, handling high-volume transaction data at scale',
      'Built data processing pipelines with PostgreSQL and Oracle, designing automated testing frameworks and CI/CD workflows for reliable multi-service deployments',
      'Collaborated cross-functionally with product and business teams to deliver backend automation tools improving operational efficiency',
    ],
  },
]
