export interface BlogPost {
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  slug: string
  url?: string
  featured?: boolean
}

export const blogPosts: BlogPost[] = [
  {
    title: 'Building a 9-Stage Agentic RAG Pipeline with LangGraph',
    excerpt: 'How I designed a production RAG system with intelligent query routing, semantic caching, hybrid search, cross-encoder re-ranking, and self-RAG validation — cutting retrieval latency by 600x.',
    date: '2025-03-15',
    readTime: '12 min',
    tags: ['RAG', 'LangGraph', 'AI Architecture'],
    slug: 'agentic-rag-pipeline',
    featured: true,
  },
  {
    title: 'SageMaker to Bedrock: How We Cut ML Infrastructure Costs by 78%',
    excerpt: 'A practical guide to migrating from SageMaker endpoints to Bedrock Titan Embeddings + OpenSearch Serverless — from $1,740/mo to $371/mo with better performance.',
    date: '2025-02-20',
    readTime: '8 min',
    tags: ['AWS', 'Cost Optimization', 'ML Ops'],
    slug: 'sagemaker-to-bedrock-migration',
    featured: true,
  },
  {
    title: 'AI Model Risk Governance: 23 Automated Tests for Production LLMs',
    excerpt: 'Building a comprehensive evaluation framework with PII detection, bias analysis, hallucination grounding, and toxicity scoring for enterprise AI compliance.',
    date: '2025-01-10',
    readTime: '10 min',
    tags: ['AI Safety', 'Governance', 'Enterprise AI'],
    slug: 'ai-model-risk-governance',
    featured: true,
  },
  {
    title: 'Lessons from 2 Years as an SDE at AWS',
    excerpt: 'What I learned about operational excellence, ownership, and building at scale while shipping features for AWS Systems Manager used by enterprise customers globally.',
    date: '2024-06-15',
    readTime: '7 min',
    tags: ['AWS', 'Career', 'Engineering Culture'],
    slug: 'lessons-from-aws',
  },
]
