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
    items: ['Claude', 'OpenAI', 'LangChain', 'RAG', 'MCP', 'Embeddings', 'Agents', 'Prompt Engineering'],
  },
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'React Native', 'Expo', 'Tailwind CSS'],
  },
  {
    title: 'Backend & APIs',
    items: ['Node.js', 'FastAPI', 'Fastify', 'WebSocket', 'REST APIs', 'SDK Design'],
  },
  {
    title: 'Data & ML',
    items: ['Snowflake', 'Redshift', 'BigQuery', 'SageMaker', 'Bedrock', 'Airflow', 'dbt', 'Spark', 'PySpark'],
  },
  {
    title: 'Cloud & DevOps',
    items: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
  },
  {
    title: 'Databases',
    items: ['PostgreSQL', 'Supabase', 'Redis', 'Firebase', 'pgvector', 'DynamoDB'],
  },
  {
    title: 'Observability & Quality',
    items: ['OpenTelemetry', 'CloudWatch', 'Data Validation', 'Monitoring', 'Telemetry'],
  },
]

export const whatIDo = [
  {
    title: 'AI Agent Development',
    description: 'Multi-channel AI assistants, agentic workflows, LLM orchestration, tool execution, and semantic memory',
    icon: 'Bot',
  },
  {
    title: 'AI/ML Infrastructure',
    description: 'Inference APIs, model serving, LLM evaluation, RAG pipelines, and AI observability at production scale',
    icon: 'Layers',
  },
  {
    title: 'Data Engineering',
    description: 'ETL/ELT pipelines, cloud data warehouses (Snowflake, Redshift, BigQuery), Airflow orchestration, 10M+ records/day',
    icon: 'Database',
  },
  {
    title: 'SDK & Developer Tools',
    description: 'TypeScript SDK design, plugin frameworks, MCP tooling, CLI tools, and developer experience engineering',
    icon: 'Code',
  },
  {
    title: 'Cloud & DevOps',
    description: 'AWS, GCP, Azure infrastructure. Docker, Kubernetes, Terraform, CI/CD with zero-downtime deployments',
    icon: 'Cloud',
  },
  {
    title: 'Open Source',
    description: 'AI agent frameworks, MCP tools, RAG pipelines, and developer tooling — all open-source and community-driven',
    icon: 'GitBranch',
  },
]
