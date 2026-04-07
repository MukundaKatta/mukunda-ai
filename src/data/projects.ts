export interface Project {
  name: string
  tagline: string
  description: string
  tags: string[]
  status: 'open-source' | 'live' | 'private' | 'building'
  github?: string
  live?: string
  stars?: number
}

export const projects: Project[] = [
  {
    name: 'Karna',
    tagline: 'AI Agent Platform',
    description: 'Self-hosted personal AI assistant with 7 messaging channels (Telegram, Slack, Discord, WhatsApp, SMS, iMessage, Webchat), extensible skills, semantic memory, and voice support. TypeScript/Node.js monorepo with Next.js dashboard.',
    tags: ['TypeScript', 'Node.js', 'Supabase', 'pgvector'],
    status: 'open-source',
    github: 'https://github.com/MukundaKatta/karna',
  },
  {
    name: 'Amogha Cafe',
    tagline: 'Restaurant Platform',
    description: 'Premium full-stack Firebase web app with real-time ordering, admin dashboard, kitchen display system, QR dine-in, live order tracking, and payment integration.',
    tags: ['JavaScript', 'Firebase', 'Real-time DB', 'Cloud Functions'],
    status: 'live',
    github: 'https://github.com/MukundaKatta/amogha-cafe',
    live: 'https://amogha-cafe.web.app',
  },
  {
    name: 'CareerSavvy',
    tagline: 'AI Job Platform',
    description: 'Three-repo job search platform: React job seeker portal, employer/recruiter portal, and Python backend on GCP Cloud Functions. End-to-end hiring pipeline with AI-powered matching.',
    tags: ['React', 'Python', 'GCP', 'Cloud Functions'],
    status: 'private',
  },
  {
    name: 'Sadhak',
    tagline: 'AI Job Search Pipeline',
    description: 'AI-powered job search command center built on Claude Code. Offer evaluation, resume tailoring, cover letter generation, portal scanning, batch processing, and application tracking.',
    tags: ['JavaScript', 'Playwright', 'Claude Code Skills'],
    status: 'open-source',
    github: 'https://github.com/MukundaKatta/sadhak',
  },
  {
    name: 'Chetana',
    tagline: 'AI Consciousness Research',
    description: 'AI consciousness research platform. Test AI models against 14 consciousness indicators from 6 scientific theories. Bridging philosophy of mind with empirical AI testing.',
    tags: ['TypeScript', 'Python', 'Machine Learning', 'Research'],
    status: 'open-source',
    github: 'https://github.com/MukundaKatta/chetana',
  },
  {
    name: 'Astra Agent',
    tagline: 'AI Agent Framework',
    description: 'Standalone AI agent runtime with tool execution, context management, and multi-model routing. Foundation for building autonomous AI assistants.',
    tags: ['TypeScript', 'LLM Orchestration', 'Tool Use'],
    status: 'open-source',
    github: 'https://github.com/MukundaKatta/astra-agent',
  },
  {
    name: 'AgentRAG',
    tagline: 'RAG Pipeline Framework',
    description: 'Modular RAG pipeline for AI agents — chunking, embedding, retrieval, and reranking with pluggable vector stores. Built for agentic workflows.',
    tags: ['RAG', 'Vector Search', 'Embeddings', 'LLM'],
    status: 'open-source',
    github: 'https://github.com/MukundaKatta/AgentRAG',
  },
  {
    name: 'MCPForge',
    tagline: 'MCP Server Builder',
    description: 'Build, test, and deploy Model Context Protocol servers in minutes. Scaffolding, hot-reload dev server, and registry publishing for the MCP ecosystem.',
    tags: ['MCP', 'TypeScript', 'Developer Tools'],
    status: 'open-source',
    github: 'https://github.com/MukundaKatta/MCPForge',
  },
  {
    name: 'Prithvi',
    tagline: 'Container Security Scanner',
    description: 'Container security scanner with vulnerability detection, compliance checks, and automated security audits for Docker and cloud-native environments.',
    tags: ['Python', 'Go', 'Docker', 'Security'],
    status: 'open-source',
    github: 'https://github.com/MukundaKatta/prithvi',
  },
  {
    name: 'RNHT',
    tagline: 'Temple Community Platform',
    description: 'Rudra Narayana Hindu Temple — full-featured community platform for events, donations, priest scheduling, member management, and temple communications.',
    tags: ['TypeScript', 'React', 'Full Stack'],
    status: 'open-source',
    github: 'https://github.com/MukundaKatta/rnht',
  },
]
