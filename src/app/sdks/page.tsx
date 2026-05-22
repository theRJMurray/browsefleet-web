import Link from "next/link";
import type { Metadata } from "next";
import { RepoCard, REPOS } from "@/components/repo-card";

export const metadata: Metadata = {
  title: "BrowseFleet SDKs",
  description:
    "Official Node.js and Python SDKs for BrowseFleet. Sync + async, full type hints, native fetch / httpx.",
};

export default function SDKsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">
        SDKs
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-white mb-4">Official SDKs</h1>
      <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl mb-12">
        Thin REST wrappers over the BrowseFleet server. Both SDKs ship with full operator-mode
        coverage, typed errors, auto-retry on 429 / 5xx, and env-var fallback for{" "}
        <code className="text-purple-300 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">BROWSEFLEET_URL</code>{" "}
        and{" "}
        <code className="text-purple-300 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">BROWSEFLEET_API_KEY</code>.
      </p>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
        <RepoCard repo={REPOS.node} />
        <RepoCard repo={REPOS.python} />
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-5">Node + TypeScript</h2>
        <pre className="overflow-x-auto rounded-xl border border-zinc-800 bg-black/50 p-5 text-[13px] leading-relaxed text-zinc-300">
          <code>{`import { BrowseFleet } from 'browsefleet';

const bf = new BrowseFleet({
  baseUrl: 'http://localhost:3000',
  apiKey: process.env.BROWSEFLEET_API_KEY, // optional when server is authless
});

const { markdown, title } = await bf.scrape('https://example.com');
console.log(title, markdown.slice(0, 200));`}</code>
        </pre>
        <p className="text-xs text-zinc-500 mt-3">
          Dual ESM + CJS, zero runtime dependencies, full TypeScript types. Node 18+.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-5">Python</h2>
        <pre className="overflow-x-auto rounded-xl border border-zinc-800 bg-black/50 p-5 text-[13px] leading-relaxed text-zinc-300">
          <code>{`from browsefleet import BrowseFleet

with BrowseFleet(base_url="http://localhost:3000") as bf:
    page = bf.scrape("https://example.com")
    print(page.title, page.markdown[:200])`}</code>
        </pre>
        <p className="text-xs text-zinc-500 mt-3">
          Sync{" "}
          <code className="text-purple-300 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">BrowseFleet</code>{" "}
          and async{" "}
          <code className="text-purple-300 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">AsyncBrowseFleet</code>.
          One runtime dependency:{" "}
          <code className="text-purple-300 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">httpx</code>.
          Python 3.10+.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-5">What ships in both</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-zinc-300">
          {[
            "Sessions: create, list, get, release, control (agent / human / paused), actions",
            "Quick actions: scrape, screenshot, pdf",
            "Profiles: persistent Chrome user-data dirs",
            "Agent: vision-based natural-language tasks",
            "Files: upload, download, list per session",
            "CAPTCHA: 2captcha-backed solve endpoint",
            "Typed errors: AuthError, NotFoundError, RateLimitError, ValidationError, ServerError",
            "Live + event SSE streams",
          ].map((line) => (
            <li key={line} className="flex items-start gap-3">
              <span className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-400" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-8 text-center">
        <h2 className="text-xl font-bold text-white mb-3">Want a different language?</h2>
        <p className="text-sm text-zinc-400 mb-6 max-w-xl mx-auto">
          The REST surface is small and the OpenAPI schema is on the roadmap. SDKs in Go, Rust,
          Ruby, or anywhere else are welcome contributions; open a Discussion to coordinate before
          you start.
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
