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
    company: 'Southwest Airlines (via GPS IT Solutions)',
    role: 'AI/ML Engineer',
    period: 'Aug 2025 — Present',
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
    company: 'GPS IT Solutions',
    role: 'AI/ML Engineer',
    period: 'Jun 2024 — Aug 2025',
    type: 'AI & Automation',
    highlights: [
      'Built GPT-4 + RAG content generation platform with automated compliance validation, producing multi-variant personalized content (10-15 versions per campaign) and reducing content creation time by 40%',
      'Designed AI model risk governance framework with 23 automated evaluation tests — PII detection, bias/stereotype detection, hallucination grounding, toxicity analysis — achieving regulatory compliance and 30% reduction in review cycles',
      'Implemented FastAPI microservices with FAISS/Pinecone vector search, deployed on Kubernetes with PostgreSQL, AI Firewall, Splunk, and Dynatrace for continuous monitoring',
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
    company: 'GPS IT Solutions',
    role: 'Data Engineer',
    period: 'Jan 2022 — Aug 2022',
    type: 'Data Engineering',
    highlights: [
      'Led ETL migration from on-prem to AWS cloud for Cigna healthcare data pipelines using AWS Glue and PySpark',
      'Developed Python-based data extraction and transformation frameworks processing large-scale healthcare datasets',
    ],
  },
  {
    company: 'Infosys',
    role: 'System Engineer',
    period: 'Feb 2017 — Dec 2020',
    type: 'Software Development',
    highlights: [
      'Developed Python-based backend services and automation tools for American Express marketing and compliance platforms',
      'Built RESTful APIs and data processing pipelines handling high-volume transaction data with PostgreSQL and Oracle databases',
      'Implemented automated testing frameworks and CI/CD workflows, improving deployment reliability across multiple application services',
    ],
  },
]
