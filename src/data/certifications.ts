export interface Certification {
  name: string
  provider: string
  year: number
}

export interface CertGroup {
  provider: string
  color: string
  certs: Certification[]
}

export const certGroups: CertGroup[] = [
  {
    provider: 'Anthropic',
    color: '#D97706',
    certs: [
      { name: 'MCP Advanced Topics', provider: 'Anthropic', year: 2025 },
      { name: 'Claude with Amazon Bedrock', provider: 'Anthropic', year: 2025 },
      { name: 'Claude with Vertex AI', provider: 'Anthropic', year: 2025 },
      { name: 'Introduction to MCP', provider: 'Anthropic', year: 2025 },
      { name: 'Claude Code in Action', provider: 'Anthropic', year: 2025 },
      { name: 'Building with Claude API', provider: 'Anthropic', year: 2025 },
      { name: 'Intro to Agent Skills', provider: 'Anthropic', year: 2025 },
      { name: 'Intro to Subagents', provider: 'Anthropic', year: 2025 },
      { name: 'AI Fluency: Framework & Foundations', provider: 'Anthropic', year: 2025 },
      { name: 'Claude 101', provider: 'Anthropic', year: 2025 },
    ],
  },
  {
    provider: 'AWS',
    color: '#F59E0B',
    certs: [
      { name: 'Solutions Architect Professional', provider: 'AWS', year: 2024 },
      { name: 'AWS ML Specialty', provider: 'AWS', year: 2024 },
      { name: 'DevOps Engineer Professional', provider: 'AWS', year: 2024 },
      { name: 'AWS Generative AI Applications', provider: 'AWS', year: 2024 },
      { name: 'AWS Services for AI Solutions', provider: 'AWS', year: 2024 },
      { name: 'AI Fundamentals & the Cloud', provider: 'AWS', year: 2024 },
      { name: 'Amazon Q for Software Dev', provider: 'AWS', year: 2024 },
    ],
  },
  {
    provider: 'Microsoft',
    color: '#3B82F6',
    certs: [
      { name: 'Generative AI for Software Devs', provider: 'Microsoft', year: 2024 },
      { name: 'GitHub Copilot Productivity', provider: 'Microsoft', year: 2024 },
      { name: 'Copilot for Project Management', provider: 'Microsoft', year: 2024 },
      { name: 'Intro to GenAI for Developers', provider: 'Microsoft', year: 2024 },
      { name: 'Copilot & VS Code Workflow', provider: 'Microsoft', year: 2024 },
    ],
  },
  {
    provider: 'Azure',
    color: '#0EA5E9',
    certs: [
      { name: 'Azure Data Engineer Associate', provider: 'Azure', year: 2023 },
      { name: 'Azure Fundamentals', provider: 'Azure', year: 2023 },
    ],
  },
  {
    provider: 'GCP',
    color: '#10B981',
    certs: [
      { name: 'GCP Cloud Architect', provider: 'GCP', year: 2024 },
      { name: 'Advanced Terraform with GCP', provider: 'GCP', year: 2024 },
      { name: 'Build & Deploy Agent with Reasoning Engine', provider: 'Google Cloud', year: 2024 },
    ],
  },
  {
    provider: 'Stanford / Wharton',
    color: '#8B5CF6',
    certs: [
      { name: 'Machine Learning', provider: 'Stanford University', year: 2023 },
      { name: 'Introduction to Statistics', provider: 'Stanford University', year: 2023 },
      { name: 'Business Analytics', provider: 'UPenn (Wharton)', year: 2023 },
      { name: 'Customer Analytics', provider: 'UPenn (Wharton)', year: 2023 },
      { name: 'People Analytics', provider: 'UPenn (Wharton)', year: 2023 },
    ],
  },
  {
    provider: 'IBM',
    color: '#6366F1',
    certs: [
      { name: 'Cybersecurity Tools & Attacks', provider: 'IBM', year: 2023 },
    ],
  },
  {
    provider: 'LinkedIn Learning',
    color: '#0077B5',
    certs: [
      { name: 'Deep Learning: Image Recognition', provider: 'LinkedIn Learning', year: 2023 },
      { name: 'Deep Learning with TensorFlow', provider: 'LinkedIn Learning', year: 2023 },
      { name: 'Deep Learning with Keras', provider: 'LinkedIn Learning', year: 2023 },
      { name: 'NLP with Python for ML', provider: 'LinkedIn Learning', year: 2023 },
      { name: 'Training Neural Networks', provider: 'LinkedIn Learning', year: 2023 },
      { name: 'Apache Spark Essential', provider: 'LinkedIn Learning', year: 2023 },
    ],
  },
]
