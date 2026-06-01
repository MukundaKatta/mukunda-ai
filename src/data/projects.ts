export interface Project {
  name: string
  tagline: string
  description: string
  proof: string
  metric: string
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
    description: 'Self-hosted AI assistant with 7 messaging channels (Telegram, Slack, Discord, WhatsApp, SMS, iMessage, Web), semantic memory, extensible plugin SDK, and voice. TypeScript monorepo (pnpm + Turborepo) with Next.js dashboard and React Native mobile app.',
    proof: 'Multi-channel agent runtime with memory, tools, dashboard, and mobile surface.',
    metric: '7 channels',
    tags: ['TypeScript', 'Node.js', 'Next.js', 'Supabase', 'pgvector', 'WebSocket'],
    status: 'open-source',
    github: 'https://github.com/MukundaKatta/karna',
  },
  {
    name: 'MCPForge',
    tagline: 'MCP Server Builder',
    description: 'CLI toolkit to scaffold, test, and deploy Model Context Protocol servers in minutes. Zero-config defaults with progressive complexity disclosure. Built for the Anthropic MCP ecosystem.',
    proof: 'Turns MCP server creation into a repeatable CLI workflow.',
    metric: 'CLI toolkit',
    tags: ['TypeScript', 'MCP', 'CLI', 'Developer Tools'],
    status: 'open-source',
    github: 'https://github.com/MukundaKatta/MCPForge',
  },
  {
    name: 'AgentRAG',
    tagline: 'Modular RAG Pipeline',
    description: 'Provider-agnostic RAG framework with pluggable vector stores, chunking strategies, and retrieval methods. Designed for agentic workflows with clean API boundaries.',
    proof: 'Clean retrieval boundaries for stores, chunking, embeddings, and agent workflows.',
    metric: 'RAG core',
    tags: ['RAG', 'Vector Search', 'Embeddings', 'LLM', 'TypeScript'],
    status: 'open-source',
    github: 'https://github.com/MukundaKatta/AgentRAG',
  },
  {
    name: 'Sadhak',
    tagline: 'AI Job Search Pipeline',
    description: 'AI-powered job search command center built on Claude Code. Automated offer evaluation, resume tailoring, cover letter generation, portal scanning, and application tracking.',
    proof: 'Automates the entire application loop from scan to tailored submission assets.',
    metric: 'End-to-end',
    tags: ['JavaScript', 'Claude Code', 'Automation', 'AI'],
    status: 'open-source',
    github: 'https://github.com/MukundaKatta/sadhak',
  },
  {
    name: 'Astra Agent',
    tagline: 'AI Agent Runtime',
    description: 'Standalone AI agent runtime with tool execution, context management, and multi-model routing. Foundation for building autonomous AI assistants with structured tool use.',
    proof: 'Runtime primitives for tool execution, model routing, and durable context.',
    metric: 'Agent OS',
    tags: ['TypeScript', 'LLM Orchestration', 'Tool Use', 'Agents'],
    status: 'open-source',
    github: 'https://github.com/MukundaKatta/astra-agent',
  },
  {
    name: 'Chetana',
    tagline: 'AI Consciousness Research',
    description: 'Research platform testing AI models against 14 consciousness indicators from 6 scientific theories. Bridging philosophy of mind with empirical AI testing.',
    proof: 'Structured test suite translating theory into measurable model behavior.',
    metric: '14 signals',
    tags: ['TypeScript', 'Python', 'Machine Learning', 'Research'],
    status: 'open-source',
    github: 'https://github.com/MukundaKatta/chetana',
  },
  {
    name: 'Prithvi',
    tagline: 'Container Security Scanner',
    description: 'Container security scanner with vulnerability detection, compliance checks, and automated audits for Docker and cloud-native environments.',
    proof: 'Security checks and audit output for Docker and cloud-native delivery.',
    metric: 'SecOps',
    tags: ['Python', 'Go', 'Docker', 'Security'],
    status: 'open-source',
    github: 'https://github.com/MukundaKatta/prithvi',
  },
  {
    name: 'Amogha Cafe',
    tagline: 'Restaurant Platform',
    description: 'Full-stack Firebase web app with real-time ordering, admin dashboard, kitchen display system, QR dine-in, live order tracking, and payment integration.',
    proof: 'Operational platform spanning customer, kitchen, admin, and payments.',
    metric: 'Live app',
    tags: ['JavaScript', 'Firebase', 'Real-time DB', 'Cloud Functions'],
    status: 'live',
    github: 'https://github.com/MukundaKatta/amogha-cafe',
    live: 'https://amogha-cafe.web.app',
  },
]
