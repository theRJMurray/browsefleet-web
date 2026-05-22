import Link from "next/link";

export interface RepoCardData {
  name: string;
  slug: string;
  language: string;
  description: string;
  installCommand?: string;
}

export const REPOS: Record<string, RepoCardData> = {
  server: {
    name: "browsefleet",
    slug: "browsefleet",
    language: "TypeScript",
    description:
      "Self-hosted cloud browser API. Sessions, scrape, screenshot, PDF, stealth, profile persistence, human-in-the-loop control behind one REST endpoint.",
    installCommand: "docker run -p 3000:3000 --shm-size=2g ghcr.io/therjmurray/browsefleet:latest",
  },
  node: {
    name: "browsefleet (Node SDK)",
    slug: "browsefleet-node",
    language: "TypeScript",
    description:
      "Official Node.js SDK. Sync + dual ESM/CJS. Zero runtime dependencies. Full TypeScript types.",
    installCommand: "npm install browsefleet",
  },
  python: {
    name: "browsefleet (Python SDK)",
    slug: "browsefleet-python",
    language: "Python",
    description: "Official Python SDK. Sync + async clients. py.typed. httpx under the hood.",
    installCommand: "pip install browsefleet",
  },
  web: {
    name: "browsefleet-web",
    slug: "browsefleet-web",
    language: "TypeScript",
    description: "The marketing site (this site).",
  },
};

export function RepoCard({ repo }: { repo: RepoCardData }) {
  const href = `https://github.com/theRJMurray/${repo.slug}`;
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
      <div className="flex items-start justify-between gap-4 mb-3">
        <Link
          href={href}
          className="text-base font-semibold text-white hover:text-purple-300 transition-colors"
        >
          {repo.name}
        </Link>
        <span className="shrink-0 text-[10px] uppercase tracking-wider text-zinc-500">
          {repo.language}
        </span>
      </div>
      <p className="text-sm text-zinc-400 leading-relaxed mb-4">{repo.description}</p>
      {repo.installCommand && (
        <pre className="overflow-x-auto rounded-md border border-zinc-800 bg-black/50 p-3 text-[12px] leading-relaxed text-zinc-300">
          <code>{repo.installCommand}</code>
        </pre>
      )}
      <div className="mt-4 flex items-center gap-3">
        <Link href={href} className="text-xs text-zinc-500 hover:text-white transition-colors">
          View on GitHub
        </Link>
        <Link
          href={`${href}/blob/master/README.md`}
          className="text-xs text-zinc-500 hover:text-white transition-colors"
        >
          README
        </Link>
        <Link
          href={`${href}/blob/master/skill.md`}
          className="text-xs text-zinc-500 hover:text-white transition-colors"
        >
          skill.md
        </Link>
      </div>
    </div>
  );
}
