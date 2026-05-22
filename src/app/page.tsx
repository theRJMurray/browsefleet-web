import Link from "next/link";
import { HeroBrowserAnimation } from "@/components/hero-browser-animation";
import { RepoCard, REPOS } from "@/components/repo-card";

const FEATURES = [
  {
    title: "Sessions API",
    description:
      "Launch managed browser sessions over REST. Connect with Puppeteer, Playwright, or Selenium through the CDP WebSocket proxy.",
  },
  {
    title: "Stealth by default",
    description:
      "puppeteer-extra-plugin-stealth baked in plus per-session randomized viewport, user agent, and platform fingerprints.",
  },
  {
    title: "Quick actions",
    description:
      "One-call scrape, screenshot, or PDF. Returns cleaned HTML, markdown, readability text, and link metadata.",
  },
  {
    title: "Computer API",
    description:
      "Click, type, scroll, navigate. Designed for Claude, GPT, and Gemini Computer Use. Every action returns a screenshot.",
  },
  {
    title: "Operator mode",
    description:
      "Sessions can start in human control, let a real person log in, then hand off to an agent via the control state machine.",
  },
  {
    title: "Profile persistence",
    description:
      "Persistent Chrome user-data directories. Logins, cookies, and storage survive across sessions.",
  },
  {
    title: "Built-in vision agent",
    description:
      "Take a natural-language task. The agent screenshots, reasons with Claude or GPT, picks an action, executes, repeats.",
  },
  {
    title: "Self-hosted, MIT-licensed",
    description:
      "One Node process, one SQLite file, one Docker container. Runs on a $4/mo Hetzner box. No external services.",
  },
];

const CODE_EXAMPLE = `import { BrowseFleet } from 'browsefleet';
import puppeteer from 'puppeteer-core';

const bf = new BrowseFleet({
  baseUrl: 'http://localhost:3000', // or your self-hosted URL
});

// Quick action: scrape a page (no session bookkeeping)
const { markdown } = await bf.scrape('https://example.com');

// Persistent session: connect Puppeteer over the CDP proxy
const session = await bf.sessions.create({ stealth: 'full' });
const browser = await puppeteer.connect({
  browserWSEndpoint: session.websocketUrl,
});
const page = await browser.newPage();
await page.goto('https://example.com');

await bf.sessions.release(session.id);`;

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-purple-400 uppercase tracking-widest mb-4">
                Open-source cloud browser API
              </p>
              <h1 className="text-5xl font-bold tracking-tight text-white leading-tight mb-6">
                Self-hosted browsers for
                <br />
                AI agents and developers
              </h1>
              <p className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-xl">
                BrowseFleet runs a fleet of stealthed headless Chrome instances behind a single REST
                API. Sessions, scrape, screenshot, PDF, profile persistence, human-in-the-loop
                control. MIT licensed. You host it.
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <a
                  href="https://github.com/theRJMurray/browsefleet"
                  className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-500 transition-colors"
                  aria-label="Star theRJMurray/browsefleet on GitHub"
                >
                  <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  Star on GitHub
                </a>
                <Link
                  href="/self-host"
                  className="rounded-lg border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
                >
                  Run it locally
                </Link>
                <Link
                  href="/docs"
                  className="rounded-lg border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
                >
                  Read the docs
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <HeroBrowserAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="border-t border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">
                One integration, two patterns
              </p>
              <h2 className="text-3xl font-bold text-white mb-4">
                Use the SDK or connect Puppeteer directly
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Quick actions for one-shot scrape / screenshot / PDF. Sessions when you need a
                persistent browser. The session response returns a CDP WebSocket URL, so any
                automation library that speaks CDP plugs in unchanged.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-purple-400" />
                  <p className="text-sm text-zinc-400">Sessions start in under a second on a warm host</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-purple-400" />
                  <p className="text-sm text-zinc-400">Stealth defaults pass standard bot-detection fingerprint pages</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-purple-400" />
                  <p className="text-sm text-zinc-400">Cap the pool at any concurrency your host can sustain</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/50">
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                <span className="ml-2 text-[10px] text-zinc-600">example.ts</span>
              </div>
              <pre className="p-5 text-[13px] leading-relaxed text-zinc-300 overflow-x-auto">
                <code>{CODE_EXAMPLE}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-3xl font-bold text-white">Everything in one repo</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
                <h3 className="text-sm font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Repos */}
      <section className="border-t border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">
              Four repos, all MIT
            </p>
            <h2 className="text-3xl font-bold text-white">Server, SDKs, and this site</h2>
            <p className="text-sm text-zinc-500 mt-3 max-w-2xl mx-auto">
              The full project lives in the open. Server, both SDKs, and the marketing site you are
              reading are all public on GitHub.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <RepoCard repo={REPOS.server} />
            <RepoCard repo={REPOS.node} />
            <RepoCard repo={REPOS.python} />
            <RepoCard repo={REPOS.web} />
          </div>
        </div>
      </section>

      {/* Pricing strip */}
      <section className="border-t border-zinc-800/50" id="pricing">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-3xl font-bold text-white">Free. You host it.</h2>
          <p className="text-zinc-400 leading-relaxed mt-4 max-w-xl mx-auto mb-8">
            BrowseFleet is MIT licensed. There is no hosted SaaS to subscribe to. You run the Docker
            image on a $4-per-month VPS, or scale up; that is the entire cost model.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/pricing"
              className="rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-500 transition-colors"
            >
              Read the pricing page
            </Link>
            <Link
              href="/self-host"
              className="rounded-lg border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
            >
              Self-host recipes
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to run a fleet?</h2>
          <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
            One docker command to a working local server. Five minutes to a deployed VPS.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="https://github.com/theRJMurray/browsefleet"
              className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-8 py-3 text-sm font-semibold text-white hover:bg-purple-500 transition-colors"
              aria-label="Star theRJMurray/browsefleet on GitHub"
            >
              <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              Star on GitHub
            </a>
            <Link
              href="/self-host"
              className="rounded-lg border border-zinc-700 px-8 py-3 text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
            >
              Self-host guide
            </Link>
            <Link
              href="/docs"
              className="rounded-lg border border-zinc-700 px-8 py-3 text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
            >
              Documentation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
