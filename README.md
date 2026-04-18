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

Pushes to `main` trigger the GitHub Action at `.github/workflows/deploy.yml`, which deploys to Cloudflare Pages.

Required repo secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Glitterplaatje

`/geef-mij-een-glitterplaatje` pulls a day-appropriate Dutch glitter GIF from deelplaatjes.nl via `/api/glitterplaatje`. Works on Cloudflare Pages Functions (no PHP needed).
