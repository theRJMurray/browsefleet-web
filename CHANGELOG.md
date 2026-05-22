# Changelog

All notable changes to the BrowseFleet marketing site. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- LICENSE (MIT), CODE_OF_CONDUCT.md (Contributor Covenant 2.1), SECURITY.md, CONTRIBUTING.md.
- `skill.md` at the repo root for AI coding agents.
- `.github/` issue templates, PR template, CODEOWNERS, FUNDING placeholder, dependabot.
- `.editorconfig`, `.nvmrc` (22), `.gitattributes` (LF).
- GitHub Actions: `ci.yml` (lint + build on Node 20+22), `skill-smoke.yml`, `pr-title.yml`.
- New pages: `/self-host`, `/comparison`, `/roadmap`, `/sdks`.
- New components: `GitHubStarButton`, `RepoCard`.

### Changed

- Homepage rewritten from hosted-product framing to self-hosted OSS positioning. Hero CTA changed from "Get Started" / "Dashboard" to "Star on GitHub" / "Run locally".
- Pricing page rewritten from 4 hosted tiers to a single "Free, you host it" page, with a costed self-hosting table and a Sponsors CTA.
- Nav: replaced "Dashboard" button with a GitHub star CTA. Added `/self-host` and `/sdks` to the main navigation.
- Footer: dropped `/dashboard`, added MIT badge, license link, contributors link, and direct repo links for all four OSS repos.
- `layout.tsx` metadata + JSON-LD updated to drop the `AggregateOffer` pricing and emphasize the OSS positioning.

### Removed

- Hosted-product call-to-action references throughout the site copy.
