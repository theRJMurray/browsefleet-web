---
title: BrowseFleet marketing site
---

# browsefleet-web

The marketing and documentation site for [BrowseFleet](https://github.com/theRJMurray/browsefleet), an open-source browser API for automation and AI agents.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20-43853d.svg)](./.nvmrc)
[![Built with Next.js](https://img.shields.io/badge/built%20with-next.js-000000.svg)](https://nextjs.org)

Next.js 15 (App Router) + Tailwind, configured for static export and Vercel deployment. Open source so contributors can fix copy and docs via PR, and so anyone curious about the project can read the site that pitches them on it. This repository is the website source; running it does not start a BrowseFleet API server.

> **Working in this repo with an AI agent?** Read [`skill.md`](./skill.md) first. It teaches Claude Code, Cursor, Aider, or any coding agent how to set up, build, and contribute to this site with no further instruction.

## Quick start

```bash
git clone https://github.com/theRJMurray/browsefleet-web.git
cd browsefleet-web
npm install
npm run dev
# open http://localhost:3000
```

## Sibling repos

- [`browsefleet`](https://github.com/theRJMurray/browsefleet), the API server.
- [`browsefleet-node`](https://github.com/theRJMurray/browsefleet-node), the Node.js SDK.
- [`browsefleet-python`](https://github.com/theRJMurray/browsefleet-python), the Python SDK.

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) and [`skill.md`](./skill.md). Conventional Commits, squash-merge, base branch `master`.

## Security

Do not file security issues publicly. See [`SECURITY.md`](./SECURITY.md).

## License

MIT. See [`LICENSE`](./LICENSE).
