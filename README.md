# mukunda-ai

Personal portfolio site for **Mukunda Rao Katta** — Senior AI/ML Engineer.

**Live:** <https://mukundakatta.dev>

A single-page, content-driven portfolio built with React 19, Vite, and Tailwind CSS
v4. All page content (experience, projects, skills, certifications, blog posts) is
defined as typed data in `src/data/`, and rendered by self-contained section
components. The site ships a light/dark theme with no flash on load, scroll-triggered
animations via Framer Motion, and a rich set of SEO / structured-data signals in
`index.html`.

## Features

- **Single-page application** with hot-module reload in development.
- **Typed content model** — every section is driven by data in `src/data/*.ts`, so
  updating the site is editing plain TypeScript, not JSX.
- **Light/dark theme** persisted to `localStorage`, with a pre-hydration inline
  script in `index.html` that applies the stored preference before first paint to
  avoid a flash of the wrong theme.
- **Scroll-reveal animations** and an animated stat counter built on
  `IntersectionObserver` + Framer Motion.
- **SEO & LLM discoverability** — Open Graph / Twitter cards, JSON-LD
  (`Person`, `ItemList`, `WebSite`), a sitemap, and `llms.txt` files under `public/`.
- **Chunked production build** — `react-dom`, `framer-motion`, and `react-icons`
  are split into separate vendor chunks (see `vite.config.ts`).

## Tech Stack

- **Runtime:** Node.js, TypeScript
- **UI:** React 19, Framer Motion, lucide-react, react-icons
- **Tooling:** Vite 8, Tailwind CSS v4 (`@tailwindcss/vite`)
- **Package manager:** pnpm

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or newer
- [pnpm](https://pnpm.io/) (the repo ships a `pnpm-lock.yaml`)

### Install & run

```bash
pnpm install
pnpm dev
```

`pnpm dev` starts the Vite dev server (default <http://localhost:5173>) with hot
reload.

## Scripts

| Script           | What it does                                              |
| ---------------- | -------------------------------------------------------- |
| `pnpm dev`       | Start the Vite development server with hot reload.       |
| `pnpm build`     | Type-check with `tsc`, then produce a production bundle. |
| `pnpm typecheck` | Run the TypeScript compiler in no-emit (check) mode.     |
| `pnpm preview`   | Serve the built `dist/` output locally for a final check. |

## Editing Content

The page is assembled in [`src/App.tsx`](src/App.tsx) from section components. None
of the copy lives in the components — it all comes from the typed data modules:

| File                          | Drives                          |
| ----------------------------- | ------------------------------- |
| `src/data/personal.ts`        | Name, tagline, contact, stats   |
| `src/data/experience.ts`      | Work history                    |
| `src/data/projects.ts`        | Featured projects               |
| `src/data/skills.ts`          | Skills / tooling                |
| `src/data/certifications.ts`  | Certifications                  |
| `src/data/blog.ts`            | Blog / writing links            |

To change what the site shows, edit the relevant data file — the matching section
component picks up the change automatically.

## Project Structure

```
mukunda-ai/
├── index.html              # HTML shell + SEO / JSON-LD + pre-hydration theme script
├── package.json
├── tsconfig.json
├── vite.config.ts          # Vite config + manual vendor chunking
├── public/                 # Static assets, sitemap, robots.txt, llms.txt
├── scripts/                # SEO-stats refresh script (run by GitHub Actions)
└── src/
    ├── main.tsx            # React entry point
    ├── App.tsx             # Page composition (exports default `App`)
    ├── index.css           # Tailwind + global styles
    ├── hooks/              # useTheme
    ├── lib/                # utils (cn class-name helper)
    ├── data/              # Typed content model
    └── components/
        ├── layout/         # Header, Footer
        ├── sections/       # Hero, About, Experience, Projects, …
        └── ui/             # Reusable bits (ThemeToggle, ScrollReveal, …)
```

## Continuous Integration

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on every push and pull
request: it installs dependencies with pnpm, type-checks the project, and runs the
production build to guarantee the site compiles. A separate scheduled workflow,
[`refresh-seo-stats.yml`](.github/workflows/refresh-seo-stats.yml), refreshes the SEO
statistics embedded in the page.

## License

[MIT](LICENSE) © Mukunda Rao Katta
