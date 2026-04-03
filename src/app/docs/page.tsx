import { CodeBlock } from "@/components/code-block";

const ARCHITECTURE = `Client (Puppeteer / Playwright / SDK)
  |
  |  HTTPS / WebSocket
  v
+----------------------------------------------+
|              BrowseFleet Server               |
|                                               |
|  +----------+  +-----------+  +------------+  |
|  | REST API |  | CDP Proxy |  | Agent Loop |  |
|  | (Hono)   |  | (WS)     |  | (LLM)      |  |
|  +----+-----+  +-----+-----+  +-----+------+  |
|       |              |              |          |
|  +----+--------------+--------------+------+   |
|  |           Browser Pool Manager          |   |
|  +----+-------+-------+-------+-------+----+   |
|       |       |       |       |       |        |
|     [Tab]   [Tab]   [Tab]   [Tab]   [Tab]      |
|       Chrome Process (puppeteer-core)          |
+----------------------------------------------+
  |
  |  SQLite (usage tracking, API keys)
  v
+----------------------------------------------+
|  /data — profiles, cookies, file uploads     |
+----------------------------------------------+`;

export default function DocsPage() {
  return (
    <div>
      <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Documentation</p>
      <h1 className="text-4xl font-bold text-white mb-4">BrowseFleet</h1>
      <p className="text-lg text-zinc-400 mb-10 leading-relaxed">
        Open-source cloud browser API for AI agents and developers. Launch managed browser sessions,
        scrape content, take screenshots, generate PDFs, solve CAPTCHAs, and automate the web
        through a simple REST API and CDP WebSocket proxy.
      </p>

      <h2 className="text-2xl font-bold text-white mb-4">Key Concepts</h2>
      <div className="space-y-4 mb-10">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Sessions</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            A session is a managed browser instance running in the cloud. You create sessions via the API,
            connect to them over CDP WebSocket with Puppeteer, Playwright, or Selenium, and release them when done.
            Sessions have configurable timeouts, viewports, stealth settings, and proxy support.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Quick Actions</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            For simple one-off tasks, BrowseFleet provides quick action endpoints that handle the full
            browser lifecycle automatically. Scrape a URL to markdown, take a screenshot, or generate a PDF
            with a single API call. No session management required.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Computer API</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            The Computer API lets you interact with browser sessions through click, type, scroll, and
            navigate actions. Every action returns a screenshot, making it ideal for AI agents that
            use vision models (Claude Computer Use, GPT-4o, Gemini) to understand and interact with web pages.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Agent</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            The autonomous agent endpoint accepts a task in natural language and uses an LLM (Claude or GPT-4o)
            to iteratively screenshot, reason, and act until the task is complete. Supports both blocking
            and SSE streaming modes.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Profiles</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Browser profiles persist cookies and localStorage across sessions. Create a profile, use it
            with a session to log in to a site, and future sessions with the same profile will maintain
            the authenticated state.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-4">Architecture</h2>
      <p className="text-sm text-zinc-400 mb-4">
        BrowseFleet is a single Node.js process managing Chrome instances via puppeteer-core. The REST API
        is served by Hono. CDP WebSocket connections are proxied transparently to browser tabs.
      </p>
      <CodeBlock code={ARCHITECTURE} language="text" />

      <div className="mt-10 grid grid-cols-2 gap-4">
        <a href="/docs/quickstart" className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 hover:border-purple-600/50 transition-colors">
          <h3 className="text-sm font-semibold text-white mb-1">Quickstart</h3>
          <p className="text-xs text-zinc-500">Get up and running in under 2 minutes.</p>
        </a>
        <a href="/docs/sessions" className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 hover:border-purple-600/50 transition-colors">
          <h3 className="text-sm font-semibold text-white mb-1">Sessions API</h3>
          <p className="text-xs text-zinc-500">Full session lifecycle reference.</p>
        </a>
        <a href="/docs/sdks" className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 hover:border-purple-600/50 transition-colors">
          <h3 className="text-sm font-semibold text-white mb-1">SDKs</h3>
          <p className="text-xs text-zinc-500">Node.js and Python client libraries.</p>
        </a>
        <a href="/docs/self-hosting" className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 hover:border-purple-600/50 transition-colors">
          <h3 className="text-sm font-semibold text-white mb-1">Self-Hosting</h3>
          <p className="text-xs text-zinc-500">Deploy BrowseFleet on your own infrastructure.</p>
        </a>
      </div>
    </div>
  );
}
