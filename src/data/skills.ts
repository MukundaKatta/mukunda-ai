export interface SkillCategory {
  title: string
  items: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    items: ['TypeScript', 'Python', 'JavaScript', 'Go', 'Java', 'SQL'],
  },
  {
    title: 'AI / LLM',
    items: ['Claude', 'OpenAI', 'LangChain', 'RAG', 'MCP', 'Embeddings'],
  },
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'React Native', 'Expo', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'FastAPI', 'Supabase', 'PostgreSQL', 'Redis', 'Firebase'],
  },
  {
    title: 'Cloud & DevOps',
    items: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
  },
  {
    title: 'Data & ML',
    items: ['SageMaker', 'Bedrock', 'Spark', 'Airflow', 'PySpark', 'pgvector'],
  },
]

export const whatIDo = [
  {
    title: 'AI Agent Development',
    description: 'Multi-channel AI assistants, agentic workflows, LLM orchestration & tool use',
    icon: 'Bot',
  },
  {
    title: 'Full Stack Engineering',
    description: 'End-to-end web & mobile apps — TypeScript, React, Next.js, Node.js, Firebase',
    icon: 'Layers',
  },
  {
    title: 'Data & ML Engineering',
    description: 'RAG pipelines, ETL frameworks, SageMaker, Bedrock, model serving at scale',
    icon: 'Database',
  },
  {
    title: 'Cloud & DevOps',
    description: 'GCP Cloud Functions, Docker, Supabase, CI/CD pipelines, infrastructure as code',
    icon: 'Cloud',
  },
  {
    title: 'LLMOps & Agentic Workflows',
    description: 'Observability, evals, tool execution, context management, multi-model routing',
    icon: 'Workflow',
  },
  {
    title: 'Open Source',
    description: '669+ repositories, AI agent frameworks, MCP tools, and community contributions',
    icon: 'GitBranch',
  },
]
