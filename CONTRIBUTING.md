# Contributing to browsefleet-web

Thanks for the PR. This is the marketing site for [BrowseFleet](https://browsefleet.com).

## TL;DR

1. Read [`skill.md`](./skill.md) for the exact commands.
2. Fork, branch off `master`, run `npm run lint && npm run build`, commit with Conventional Commits, open a PR.
3. CI runs the same checks.

## What makes a good PR here

- **Copy fixes, docs additions, typos**: small focused PRs, merge fast.
- **New page or section**: open an Issue first so we can align on scope and information architecture before you write Tailwind.
- **Component changes**: keep them small. The site uses inline Tailwind, no design-system library. Match the existing visual vocabulary (zinc backgrounds, purple accents, single-pixel borders).

## What we will not accept

- Adding analytics SDKs (Google Analytics, Segment, Mixpanel, etc.). The site is silent.
- Hosted-product framing (pricing tiers, billing CTAs, "sign up", "free trial"). BrowseFleet is self-hosted OSS; the site's job is to make that clear.
- Aesthetic-only refactors that touch many files.
- Tailwind class soup expanding past ~6 utilities per element without a refactor proposal.

## Conventions

- TypeScript, strict mode.
- Tailwind classes inline, no `clsx` / `cn` helpers (intentional simplicity).
- File names: lowercase, hyphens for spaces (`hero-browser-animation.tsx`).
- Components live in `src/components/`. Pages live in `src/app/<route>/page.tsx` using the Next.js App Router.

## Security

Do not file security issues publicly. See [`SECURITY.md`](./SECURITY.md).

## License

By submitting, your contribution is MIT licensed.
