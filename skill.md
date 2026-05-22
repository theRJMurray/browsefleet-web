# Working in browsefleet-web with a coding agent

This file is read by AI coding agents that land in this repo. It contains the exact setup, run, build, and contribution steps for the marketing site at browsefleet.com. Read it once.

## What this repo is

This is the **marketing site** for [BrowseFleet](https://github.com/theRJMurray/browsefleet). It is a Next.js 15 app (App Router) deployed to Vercel as a static export. It is not the BrowseFleet server.

If you need to change the API surface, fix server behavior, or update SDK examples, you are in the wrong repo. Go to:
- [`theRJMurray/browsefleet`](https://github.com/theRJMurray/browsefleet) (server)
- [`theRJMurray/browsefleet-node`](https://github.com/theRJMurray/browsefleet-node) (Node SDK)
- [`theRJMurray/browsefleet-python`](https://github.com/theRJMurray/browsefleet-python) (Python SDK)

## TL;DR for the impatient agent

```bash
git clone https://github.com/theRJMurray/browsefleet-web.git
cd browsefleet-web
npm install
npm run dev
# open http://localhost:3000
```

Then:

```bash
npm run lint   # eslint
npm run build  # Next.js build + static export to out/
```

## Important: this is NOT the Next.js you may have seen

The repo carries a top-level `AGENTS.md` (referenced by `CLAUDE.md`) noting that the Next.js version here may differ from your training data. Before adding a feature that touches Server Components, route handlers, or middleware, check `node_modules/next/dist/docs/` or the upstream Next 15 docs for the actual API shape.

## Required tools and versions

| Tool | Minimum | Why |
|------|---------|-----|
| Node.js | 20 (22 recommended) | Next 15 requires 18.18+; CI runs 20 + 22. |
| npm | 10+ | Bundled with Node. |

## First-time setup

```bash
git clone https://github.com/theRJMurray/browsefleet-web.git
cd browsefleet-web
nvm use     # reads .nvmrc -> Node 22
npm install
```

Expected: 20 to 40 seconds.

## Running the project

```bash
npm run dev   # Next dev server, hot reload, http://localhost:3000
npm run build # Build + static export to out/
npm run start # Serve the dev build (rarely needed; we are static-exported)
npm run lint  # eslint with eslint-config-next
```

The site is configured for static export (`vercel.json` + `next.config.ts`). The output in `out/` is what Vercel publishes.

## Verifying it works

```bash
npm run build
test -f out/index.html              # homepage rendered
test -f out/pricing/index.html      # pricing rendered
test -f out/self-host/index.html    # self-host page rendered (Phase 6)
test -f out/comparison/index.html   # comparison page (Phase 6)
test -f out/sdks/index.html         # SDKs page (Phase 6)
```

## Project layout

```
browsefleet-web/
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── layout.tsx             # Nav + Footer + JSON-LD
│   │   ├── page.tsx               # Homepage
│   │   ├── globals.css            # Tailwind base
│   │   ├── pricing/page.tsx
│   │   ├── self-host/page.tsx     # (Phase 6)
│   │   ├── comparison/page.tsx    # (Phase 6)
│   │   ├── roadmap/page.tsx       # (Phase 6)
│   │   ├── sdks/page.tsx          # (Phase 6)
│   │   ├── docs/...               # docs pages (per-section)
│   │   ├── blog/...               # blog
│   │   ├── alternatives/...
│   │   ├── use-cases/...
│   │   └── integrations/...
│   ├── components/                # shared React components
│   └── data/                      # static content (blog posts, etc.)
├── public/                        # static assets
├── out/                           # build output (gitignored)
├── package.json
├── next.config.ts
├── tailwind.config.js
├── vercel.json
├── README.md
└── skill.md                       # this file
```

## Common tasks

### Add a new page

1. Create `src/app/<route>/page.tsx` exporting a default React component.
2. Add a link in `src/app/layout.tsx` Nav or Footer.
3. `npm run build` to confirm the route is statically generated (`out/<route>/index.html`).

### Add a new component

1. Create `src/components/<name>.tsx`. Match the existing style: inline Tailwind classes, no `clsx` / `cn` helpers, no design-system library.
2. Import in the page that uses it via `@/components/<name>`.

### Update the homepage

`src/app/page.tsx`. The hero, features list, code sample, pricing strip, and CTA are all in the same file. Keep edits surgical; the file is intentionally one place.

### Update Nav / Footer

`src/app/layout.tsx`. The Nav and Footer are component functions in the same file. Both render in every layout.

## Linting

```bash
npm run lint
```

Uses `eslint-config-next`. No prettier; relies on the eslint Next preset + author discipline. Match nearby code formatting.

## Branching, commits, PRs

- Base branch: `master`. Branch off, target master.
- Branch names: `feat/<short>`, `fix/<short>`, `docs/<short>`.
- Commits: Conventional Commits. Enforced by `.github/workflows/pr-title.yml`.
- PRs squash-merge.
- CI: `ci.yml` (lint + build on Node 20 + 22), `skill-smoke.yml`, `pr-title.yml`.

## Vercel deployment

Vercel deploys from this repo. The production domain is `browsefleet.com`. Preview deployments fire on every PR.

Environment variables: none required at build time. If you add one, document it in `.env.example` and add it to the Vercel project's env settings via the dashboard (not in this repo).

## Don't do

- Don't add Google Analytics, Segment, Mixpanel, or any analytics SDK. The site is silent.
- Don't add a hosted-product CTA ("Sign up", "Start free trial", pricing tiers). BrowseFleet is self-hosted OSS. The site's job is to make that clear.
- Don't add a CSS framework alongside Tailwind. Tailwind is the whole story.
- Don't break the static export. Avoid `getServerSideProps`-style patterns, `unstable_*` APIs, or middleware. Everything must render at build time.

## Where to ask

- Bugs in the site: Issue on this repo.
- Server questions: [server repo](https://github.com/theRJMurray/browsefleet).
- General discussion: [Discussions on the server repo](https://github.com/theRJMurray/browsefleet/discussions).

---

_Last updated as part of OSS Phase 6 (2026-05-22). Linked from the README's AI Agent banner._
