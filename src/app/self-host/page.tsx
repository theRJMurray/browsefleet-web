import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Self-host BrowseFleet",
  description:
    "Three production-grade deployment recipes for BrowseFleet: Hetzner CX22 + docker-compose ($4/mo), Fly.io ($15/mo), AWS ECS Fargate ($30/mo).",
};

const RECIPES = [
  {
    title: "Hetzner CX22 + docker-compose",
    cost: "$4/mo",
    sessions: "~10 concurrent",
    audience: "Solo developers, hobby projects, single-tenant pilots.",
    why: "Cheapest path. One small VPS, one docker-compose file, one Caddy line for TLS.",
  },
  {
    title: "Fly.io",
    cost: "$15/mo",
    sessions: "~20 concurrent",
    audience: "Small teams that want zero-ops TLS, restarts, and regional routing.",
    why: "fly.toml + flyctl deploy. Persistent volume for the SQLite DB and profile dir.",
  },
  {
    title: "AWS ECS Fargate",
    cost: "$30/mo",
    sessions: "~25 concurrent",
    audience: "Existing AWS shops, VPC isolation requirements.",
    why: "Standard task definition, EFS for state, ALB in front, IAM-bound secrets.",
  },
];

const CHECKLIST = [
  "API_KEYS set to a non-empty comma-separated list",
  "TLS terminated somewhere in front of port 3000",
  "CDP_EXTERNAL_HOST and CDP_EXTERNAL_SCHEME=wss configured",
  "LOG_LEVEL=info (not debug, not trace)",
  "DATA_DIR on a persistent volume",
  "--shm-size=2g or equivalent on the container",
  "Backups: data/browsefleet.db and data/profiles/ are the only durable state",
];

export default function SelfHostPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">
        Self-host
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
        Run BrowseFleet on your own infrastructure
      </h1>
      <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl mb-12">
        BrowseFleet is MIT licensed and runs as one Node process plus a Chrome child per session,
        backed by SQLite. No external services, no required SaaS dependencies. The full deployment
        reference lives in the{" "}
        <Link
          href="https://github.com/theRJMurray/browsefleet/blob/master/docs/deployment.md"
          className="text-purple-300 hover:text-purple-200 underline underline-offset-4"
        >
          server repo&apos;s docs/deployment.md
        </Link>
        . What follows is the short version.
      </p>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">Pick a recipe</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {RECIPES.map((recipe) => (
            <div
              key={recipe.title}
              className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 flex flex-col"
            >
              <p className="text-xs font-semibold text-purple-400 mb-1">{recipe.cost}</p>
              <h3 className="text-base font-semibold text-white mb-2">{recipe.title}</h3>
              <p className="text-xs text-zinc-500 mb-3">{recipe.sessions}</p>
              <p className="text-sm text-zinc-400 leading-relaxed mb-3">{recipe.audience}</p>
              <p className="text-xs text-zinc-500 leading-relaxed mt-auto">{recipe.why}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-4">The 60-second path</h2>
        <p className="text-sm text-zinc-400 leading-relaxed mb-4">
          Smallest possible self-host. Boots in one command, no TLS, no auth.
        </p>
        <pre className="overflow-x-auto rounded-xl border border-zinc-800 bg-black/50 p-5 text-[13px] leading-relaxed text-zinc-300">
          <code>docker run -p 3000:3000 --shm-size=2g ghcr.io/therjmurray/browsefleet:latest</code>
        </pre>
        <p className="text-sm text-zinc-400 mt-4">
          The container ships with Chromium baked in. The default config is authless and listens on
          0.0.0.0:3000. Fine for localhost; never expose this directly to the internet. Add{" "}
          <code className="text-purple-300 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">API_KEYS</code>{" "}
          and a reverse proxy before going public.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-4">Resource sizing</h2>
        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/50">
              <tr className="text-left text-zinc-400">
                <th className="px-5 py-3 font-medium">Concurrent sessions</th>
                <th className="px-5 py-3 font-medium">Recommended RAM</th>
                <th className="px-5 py-3 font-medium">Recommended vCPU</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50 text-zinc-300">
              <tr>
                <td className="px-5 py-3">5</td>
                <td className="px-5 py-3">2 GB</td>
                <td className="px-5 py-3">1</td>
              </tr>
              <tr>
                <td className="px-5 py-3">10</td>
                <td className="px-5 py-3">4 GB</td>
                <td className="px-5 py-3">2</td>
              </tr>
              <tr>
                <td className="px-5 py-3">30</td>
                <td className="px-5 py-3">12 GB</td>
                <td className="px-5 py-3">4</td>
              </tr>
              <tr>
                <td className="px-5 py-3">50+</td>
                <td className="px-5 py-3">24 GB+</td>
                <td className="px-5 py-3">8+</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-500 mt-3">
          Chromium with stealth wants 200 to 500 MB of RAM per active session under load. The Node
          process itself is ~150 MB.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-4">Production checklist</h2>
        <ul className="space-y-2 text-sm text-zinc-300">
          {CHECKLIST.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-400" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-8 text-center">
        <h2 className="text-xl font-bold text-white mb-3">Need help?</h2>
        <p className="text-sm text-zinc-400 mb-6 max-w-xl mx-auto">
          Open a Discussion on the server repo. The maintainer reads every thread.
        </p>
        <Link
          href="https://github.com/theRJMurray/browsefleet/discussions"
          className="inline-block rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-500 transition-colors"
        >
          Open a Discussion
        </Link>
      </section>
    </div>
  );
}
