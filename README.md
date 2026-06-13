# mukunda-ai

Personal portfolio of **Mukunda Rao Katta** — Senior AI/ML Engineer.

**Live:** <https://mukundakatta.dev>

A single-page portfolio that frames the work around production AI systems —
agentic RAG, model-risk guardrails, and cloud data platforms — rather than
screenshots. Dark-first cyberpunk-tech aesthetic with a clean light mode.

## Tech Stack

- **React 19** + **TypeScript** (strict)
- **Vite 8** build pipeline with manual vendor chunking
- **Tailwind CSS 4** (`@tailwindcss/vite`)
- **Framer Motion** for animation, with `prefers-reduced-motion` support
- **lucide-react** + **react-icons** for iconography

## Getting Started

```bash
pnpm install
pnpm dev        # start the dev server with hot reload
pnpm build      # type-check (tsc) + production build to dist/
pnpm preview    # preview the production build
```

## Project Structure

```
mukunda-ai/
├── index.html              # entry HTML — SEO meta, Open Graph, JSON-LD
├── src/
│   ├── main.tsx            # React entry point
│   ├── App.tsx             # section composition
│   ├── index.css           # Tailwind theme + design-system utilities
│   ├── components/
│   │   ├── layout/         # Header, Footer
│   │   ├── sections/       # Hero, Experience, Projects, Skills, …
│   │   └── ui/             # ScrollReveal, MatrixRain, NeuralField, …
│   ├── data/               # content: personal, experience, projects, …
│   └── hooks/              # useTheme
├── public/                 # static assets, sitemap, robots, llms.txt
└── scripts/
    └── refresh_seo_stats.py  # syncs open-source package/PR counts
```

## Content

Site copy lives in `src/data/` as typed modules — editing `personal.ts`,
`experience.ts`, `projects.ts`, `skills.ts`, `certifications.ts`, or `blog.ts`
updates the rendered sections without touching component code.

## SEO Stats Automation

`scripts/refresh_seo_stats.py` pulls live counts from npm, PyPI, crates.io, the
MCP Registry, HuggingFace, and the GitHub API, then rewrites the embedded
numbers in `index.html`, `public/llms.txt`, `public/llms-full.txt`,
`public/packages.html`, and the Projects section. It runs on a schedule via
`.github/workflows/refresh-seo-stats.yml`.

```bash
GH_TOKEN=$(gh auth token) python3 scripts/refresh_seo_stats.py
```
