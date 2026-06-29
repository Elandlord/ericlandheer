# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Update site to reflect joining Simplicate

## [1.2.0] - 2026-05-10

### Changed

- Make Skills tabs more fun and tighten ASCII portrait

## [1.1.0] - 2026-04-27

### Added

- Syntax highlighting for code examples in Skills tabs

### Changed

- Make site mobile-proof
- Trim hero nav badge, soften copy, bolden contact heading
- Show language-accurate code examples in Skills section
- Layer command.center aesthetic on top of personal site
- Rebuild site from dev-tool design handoff

## [1.0.0] - 2026-04-18

### Added

- Coolify deploy setup: node-server preset and Dockerfile
- Portrait follows the cursor across the whole page
- Agile Scrum Group logo and two new Lab cards
- Expand certifications: Laravel verify link, Scrum Master, Anglia C1
- Card-flip between Village/Office views and North Star callout
- Pixel Agents village and office screenshots
- Pixel Agents village/office tabs, Qlic role, and Laravel certification
- Simplicate logo, Pixel Agents screenshot, and PeterPrint Scrum Master
- Currently Building lab section

### Changed

- Replace EL logo tile with terminal-style wordmark
- Rebuild site as Nuxt 3 (compat v4), dropping Laravel and blog
- Modernize layout and homepage UI
- Address review feedback: scroll reveals, data, logos, glitterplaatje

### Fixed

- Regenerate package-lock.json to fix `npm ci` in Docker build
- Clip portrait highlight and shadow to the image silhouette
- Clarify PeterPrint role: Scrum Master was real, add code review
- Fix MEN description: was Eric's own company, not a job
- Add permanent redirects for removed blog routes

### Removed

- Remove Cloudflare Pages deploy workflow (migrating to Coolify)
- Remove blog routes

## [0.x] - Pre-2026 (Legacy Laravel site)

Laravel-based personal site. Content updates, skill additions, glitterplaatjes,
blog search, and UI tweaks from 2021 through early 2026.

[Unreleased]: https://github.com/Elandlord/website/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/Elandlord/website/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/Elandlord/website/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/Elandlord/website/compare/v0.x...v1.0.0
