# ericlandheer.nl

Personal site for Eric Landheer — Groningen-based full stack engineer.

## Stack

- **Nuxt 3** (compat v4) — hybrid SSR/SSG
- **Tailwind CSS** — dark-first design system
- **GSAP + ScrollTrigger** — scroll-driven reveals
- **Lenis** — smooth scroll
- **motion-v** — declarative component animations
- **Nuxt Icon** — Iconify on demand
- **Cloudflare Pages** — deploy target

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build

```bash
npm run build        # Nitro output for Cloudflare Pages
npm run preview
```

## Content

Career, education, skills and projects are hardcoded in `data/`. Edit and ship.

## Deploy

Deployed on **Coolify** (VPS). Coolify watches the `main` branch and rebuilds via the included `Dockerfile` on every push.

Locally, a production build runs with:

```bash
npm run build
npm run start        # node .output/server/index.mjs
```

### Optional env vars

- `GITHUB_TOKEN` — raises `/api/repos` from the 60 req/hr anonymous GitHub rate limit to 5000 req/hr authenticated.
- `NITRO_PRESET` — override the default `node-server` preset if you ever redeploy to an edge runtime (e.g. `cloudflare-pages`).

## Glitterplaatje

`/geef-mij-een-glitterplaatje` pulls a day-appropriate Dutch glitter GIF from deelplaatjes.nl via `/api/glitterplaatje`. Works on Cloudflare Pages Functions (no PHP needed).
