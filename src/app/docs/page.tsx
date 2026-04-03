const ENDPOINTS = [
  { method: "POST", path: "/v1/sessions", description: "Create a new browser session" },
  { method: "GET", path: "/v1/sessions", description: "List all active sessions" },
  { method: "GET", path: "/v1/sessions/:id", description: "Get session details" },
  { method: "POST", path: "/v1/sessions/:id/release", description: "Release a session" },
  { method: "POST", path: "/v1/sessions/release", description: "Release all or batch sessions" },
  { method: "WS", path: "/cdp/:sessionId", description: "CDP WebSocket proxy" },
  { method: "POST", path: "/v1/scrape", description: "Scrape URL to HTML/markdown/text" },
  { method: "POST", path: "/v1/screenshot", description: "Screenshot URL to PNG/JPEG" },
  { method: "POST", path: "/v1/pdf", description: "Generate PDF from URL" },
  { method: "POST", path: "/v1/sessions/:id/actions", description: "Computer API (click, type, scroll)" },
  { method: "POST", path: "/v1/sessions/:id/captcha/solve", description: "Solve CAPTCHA on page" },
  { method: "POST", path: "/v1/profiles", description: "Create browser profile" },
  { method: "GET", path: "/v1/profiles", description: "List profiles" },
  { method: "DELETE", path: "/v1/profiles/:id", description: "Delete profile" },
  { method: "POST", path: "/v1/sessions/:id/files", description: "Upload file to session" },
  { method: "GET", path: "/v1/sessions/:id/files/:name", description: "Download file from session" },
  { method: "GET", path: "/v1/sessions/:id/live", description: "SSE live session viewer" },
  { method: "GET", path: "/v1/usage", description: "Usage statistics" },
  { method: "GET", path: "/health", description: "Health check" },
];

const METHOD_COLORS: Record<string, string> = {
  GET: "text-emerald-400 bg-emerald-950",
  POST: "text-blue-400 bg-blue-950",
  DELETE: "text-red-400 bg-red-950",
  WS: "text-purple-400 bg-purple-950",
};

const INSTALL_EXAMPLES = [
  { lang: "Node.js", code: "npm install browsefleet" },
  { lang: "Python", code: "pip install browsefleet" },
  { lang: "Docker", code: "docker run -p 3000:3000 --shm-size=2g ghcr.io/therj/browsefleet" },
];

const SESSION_EXAMPLE = `// Create a session
const response = await fetch('https://api.browsefleet.com/v1/sessions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'bf_your_api_key',
  },
  body: JSON.stringify({
    stealth: 'full',
    viewport: { width: 1920, height: 1080 },
    timeout: 3600000, // 1 hour
  }),
});

const session = await response.json();
// session.websocketUrl → ws://api.browsefleet.com/cdp/session-id
// session.id → "abc-123-..."
// session.expiresAt → "2026-04-02T..."`;

const SCRAPE_EXAMPLE = `// Quick scrape — no session needed
const response = await fetch('https://api.browsefleet.com/v1/scrape', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'bf_your_api_key',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    waitFor: 2000,
  }),
});

const data = await response.json();
// data.markdown → "# Example Domain\\n\\nThis domain is..."
// data.title → "Example Domain"
// data.links → [{ href: "...", text: "..." }]
// data.metadata → { description: "...", ogImage: "..." }`;

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Documentation</p>
      <h1 className="text-4xl font-bold text-white mb-4">BrowseFleet API Reference</h1>
      <p className="text-zinc-400 mb-12">
        Complete reference for the BrowseFleet REST API and CDP WebSocket proxy.
      </p>

      {/* Installation */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">Installation</h2>
        <div className="space-y-3">
          {INSTALL_EXAMPLES.map((ex) => (
            <div key={ex.lang} className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 flex items-center justify-between">
              <code className="text-sm text-zinc-300">{ex.code}</code>
              <span className="text-[10px] text-zinc-600 uppercase">{ex.lang}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Authentication */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-4">Authentication</h2>
        <p className="text-sm text-zinc-400 mb-4">
          Include your API key in the <code className="text-purple-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">x-api-key</code> header on every request.
          For WebSocket connections, pass it as a query parameter: <code className="text-purple-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">?apiKey=bf_...</code>
        </p>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
          <code className="text-sm text-zinc-300">{"curl -H 'x-api-key: bf_your_key' https://api.browsefleet.com/v1/sessions"}</code>
        </div>
      </section>

      {/* Session Example */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-4">Create a Session</h2>
        <p className="text-sm text-zinc-400 mb-4">
          Sessions are managed browser instances. Create one, connect via CDP, and control the browser.
        </p>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
          <div className="px-4 py-2 border-b border-zinc-800/50">
            <span className="text-[10px] text-zinc-600">POST /v1/sessions</span>
          </div>
          <pre className="p-5 text-[13px] leading-relaxed text-zinc-300 overflow-x-auto">
            <code>{SESSION_EXAMPLE}</code>
          </pre>
        </div>
      </section>

      {/* Scrape Example */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-4">Quick Scrape</h2>
        <p className="text-sm text-zinc-400 mb-4">
          Scrape any URL and get back cleaned HTML, markdown, readability text, links, and metadata. No session needed.
        </p>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
          <div className="px-4 py-2 border-b border-zinc-800/50">
            <span className="text-[10px] text-zinc-600">POST /v1/scrape</span>
          </div>
          <pre className="p-5 text-[13px] leading-relaxed text-zinc-300 overflow-x-auto">
            <code>{SCRAPE_EXAMPLE}</code>
          </pre>
        </div>
      </section>

      {/* All Endpoints */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">All Endpoints</h2>
        <div className="rounded-xl border border-zinc-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900 border-b border-zinc-800">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500 uppercase">Method</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500 uppercase">Path</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500 uppercase">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {ENDPOINTS.map((ep) => (
                <tr key={ep.path + ep.method} className="hover:bg-zinc-900/60 transition-colors">
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold ${METHOD_COLORS[ep.method] ?? "text-zinc-400 bg-zinc-800"}`}>
                      {ep.method}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-zinc-300">{ep.path}</code>
                  </td>
                  <td className="px-4 py-3 text-xs text-zinc-500">{ep.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
