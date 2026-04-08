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
    role: 'AI/ML Engineer',
    period: 'Jun 2024 — Present',
    type: 'AI & Automation',
    highlights: [
      'Built AI-powered aircraft maintenance fault prediction system (SWA Sidebar) with 5 ML prediction types — ATA codes, failure types, parts, tools, and repair references — trained on 10,000+ historical maintenance records',
      'Migrated prediction pipeline from SageMaker (3 endpoints, ml.m5.2xlarge) to Bedrock Titan Embeddings + OpenSearch Serverless, achieving 78% cost reduction ($1,740 to $371/mo) and 600x faster retrieval vs. manual search',
      'Architected production agentic RAG chatbot with 9-stage pipeline — query routing, semantic caching, hybrid retrieval (FAISS + BM25), cross-encoder re-ranking, self-RAG retry, hallucination grounding, and smart escalation — using Bedrock Nova Pro/Micro and LangGraph',
      'Ingested 30,000+ KB entries from 7 enterprise sources (Excel, Confluence, Jira, PDFs, Teams, ServiceNow, IFS Cloud) with 370+ unit tests and RAGAS evaluation framework',
    ],
    featured: true,
  },
  {
    company: 'Amazon Web Services (AWS)',
    role: 'SDE (Software Development Engineer)',
    period: 'Aug 2022 — May 2024',
    type: 'Cloud & Infrastructure',
    highlights: [
      'Built and maintained AWS Application Manager (part of AWS Systems Manager service) — resource grouping views, CloudFormation integration, runbook automation, and operational dashboards inside the AWS Management Console',
      'Developed React/TypeScript frontend components and Java/Python backend API endpoints on a team of 10-12 engineers',
      'Implemented CI/CD pipelines and delivered features across the full stack for a production AWS service used by enterprise customers',
    ],
    featured: true,
  },
  {
    company: 'Infosys',
    role: 'System Engineer',
    period: 'Feb 2020 — Aug 2022',
    type: 'AI & Data Engineering',
    highlights: [
      'Built GPT-4 + RAG marketing content generator (MCG) at American Express, automating compliant marketing copy with multi-variant creation (10-15 personalized versions per campaign) and 40% faster campaign development',
      'Designed AI model risk governance framework (MRMG) with 23 automated risk evaluation tests — PII detection, bias, hallucination, and toxicity — achieving SR 11-7 regulatory compliance and 30% reduction in AI compliance review time',
      'Implemented FastAPI microservices with FAISS/Pinecone vector search, deployed on Kubernetes (HYDRA) with PostgreSQL, AI Firewall (EAG), Splunk, and Dynatrace for continuous monitoring',
    ],
  },
  {
    company: 'GPS IT Solutions',
    role: 'Data Engineer',
    period: 'Feb 2017 — Jan 2020',
    type: 'Data Engineering',
    highlights: [
      'Led ETL migration from on-prem to AWS cloud for Cigna healthcare data pipelines using AWS Glue and PySpark',
      'Developed Python-based data extraction and transformation frameworks processing large-scale healthcare datasets',
    ],
  },
]
