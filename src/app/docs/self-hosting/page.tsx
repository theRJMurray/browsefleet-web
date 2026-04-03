import { CodeBlock } from "@/components/code-block";

export default function SelfHostingPage() {
  return (
    <div>
      <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Guides</p>
      <h1 className="text-4xl font-bold text-white mb-4">Self-Hosting</h1>
      <p className="text-zinc-400 mb-10">
        BrowseFleet is fully open-source and designed to run on your own infrastructure.
        A single Docker container includes everything: the API server, Chrome, and all dependencies.
      </p>

      <h2 className="text-2xl font-bold text-white mb-4">Quick Start with Docker</h2>
      <CodeBlock code={`docker run -d \\
  --name browsefleet \\
  -p 3000:3000 \\
  --shm-size=2g \\
  -e API_KEYS=bf_your_secret_key \\
  -e MAX_CONCURRENT_SESSIONS=10 \\
  -v browsefleet-data:/data \\
  ghcr.io/therj/browsefleet`} language="bash" />

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Docker Compose</h2>
      <CodeBlock code={`services:
  browsefleet:
    image: ghcr.io/therj/browsefleet
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - HOST=0.0.0.0
      - API_KEYS=bf_your_secret_key
      - MAX_CONCURRENT_SESSIONS=30
      - STEALTH_DEFAULT=full
      - LOG_LEVEL=info
      - CHROME_PATH=/usr/bin/chromium
      - DATA_DIR=/data
      - CDP_EXTERNAL_HOST=your-server.example.com
      - CDP_EXTERNAL_PORT=3000
      - CDP_EXTERNAL_SCHEME=ws
    volumes:
      - browsefleet-data:/data
    shm_size: '2gb'
    deploy:
      resources:
        limits:
          memory: 8G
    restart: unless-stopped

volumes:
  browsefleet-data:`} language="yaml" />

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Environment Variables</h2>
      <div className="rounded-xl border border-zinc-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 border-b border-zinc-800">
            <tr>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Variable</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Default</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">PORT</code></td><td className="px-4 py-3 text-xs text-zinc-400">3000</td><td className="px-4 py-3 text-xs text-zinc-400">HTTP server port</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">HOST</code></td><td className="px-4 py-3 text-xs text-zinc-400">0.0.0.0</td><td className="px-4 py-3 text-xs text-zinc-400">Server bind address</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">API_KEYS</code></td><td className="px-4 py-3 text-xs text-zinc-400">(empty)</td><td className="px-4 py-3 text-xs text-zinc-400">Comma-separated API keys. Empty disables auth.</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">MAX_CONCURRENT_SESSIONS</code></td><td className="px-4 py-3 text-xs text-zinc-400">30</td><td className="px-4 py-3 text-xs text-zinc-400">Maximum number of browser sessions at once</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">DEFAULT_SESSION_TIMEOUT</code></td><td className="px-4 py-3 text-xs text-zinc-400">1800000</td><td className="px-4 py-3 text-xs text-zinc-400">Default session timeout in ms (30 minutes)</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">MAX_SESSION_TIMEOUT</code></td><td className="px-4 py-3 text-xs text-zinc-400">86400000</td><td className="px-4 py-3 text-xs text-zinc-400">Maximum allowed session timeout in ms (24 hours)</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">CHROME_PATH</code></td><td className="px-4 py-3 text-xs text-zinc-400">(auto-detect)</td><td className="px-4 py-3 text-xs text-zinc-400">Path to Chrome/Chromium binary</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">STEALTH_DEFAULT</code></td><td className="px-4 py-3 text-xs text-zinc-400">full</td><td className="px-4 py-3 text-xs text-zinc-400">Default stealth level: none, basic, or full</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">PROXY_URL</code></td><td className="px-4 py-3 text-xs text-zinc-400">(empty)</td><td className="px-4 py-3 text-xs text-zinc-400">Global proxy URL (HTTP or SOCKS5)</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">CAPTCHA_API_KEY</code></td><td className="px-4 py-3 text-xs text-zinc-400">(empty)</td><td className="px-4 py-3 text-xs text-zinc-400">2captcha API key for CAPTCHA solving</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">CAPTCHA_PROVIDER</code></td><td className="px-4 py-3 text-xs text-zinc-400">2captcha</td><td className="px-4 py-3 text-xs text-zinc-400">CAPTCHA provider (2captcha or anticaptcha)</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">CDP_EXTERNAL_HOST</code></td><td className="px-4 py-3 text-xs text-zinc-400">localhost</td><td className="px-4 py-3 text-xs text-zinc-400">Hostname for client-facing CDP WebSocket URLs</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">CDP_EXTERNAL_PORT</code></td><td className="px-4 py-3 text-xs text-zinc-400">3000</td><td className="px-4 py-3 text-xs text-zinc-400">Port for client-facing CDP WebSocket URLs</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">CDP_EXTERNAL_SCHEME</code></td><td className="px-4 py-3 text-xs text-zinc-400">ws</td><td className="px-4 py-3 text-xs text-zinc-400">WebSocket scheme: ws or wss</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">STRIPE_SECRET_KEY</code></td><td className="px-4 py-3 text-xs text-zinc-400">(empty)</td><td className="px-4 py-3 text-xs text-zinc-400">Stripe secret key for metered billing</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">STRIPE_WEBHOOK_SECRET</code></td><td className="px-4 py-3 text-xs text-zinc-400">(empty)</td><td className="px-4 py-3 text-xs text-zinc-400">Stripe webhook signing secret</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">STRIPE_PRICE_ID</code></td><td className="px-4 py-3 text-xs text-zinc-400">(empty)</td><td className="px-4 py-3 text-xs text-zinc-400">Stripe Price ID for the subscription product</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">STRIPE_METER_EVENT_NAME</code></td><td className="px-4 py-3 text-xs text-zinc-400">browser_hours</td><td className="px-4 py-3 text-xs text-zinc-400">Stripe metered billing event name</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">ANTHROPIC_API_KEY</code></td><td className="px-4 py-3 text-xs text-zinc-400">(empty)</td><td className="px-4 py-3 text-xs text-zinc-400">Anthropic API key for the Agent endpoint</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">OPENAI_API_KEY</code></td><td className="px-4 py-3 text-xs text-zinc-400">(empty)</td><td className="px-4 py-3 text-xs text-zinc-400">OpenAI API key for the Agent endpoint</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">DATA_DIR</code></td><td className="px-4 py-3 text-xs text-zinc-400">./data</td><td className="px-4 py-3 text-xs text-zinc-400">Directory for SQLite DB, profiles, temp files</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">LOG_LEVEL</code></td><td className="px-4 py-3 text-xs text-zinc-400">info</td><td className="px-4 py-3 text-xs text-zinc-400">Log level: trace, debug, info, warn, error, fatal</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Resource Requirements</h2>
      <div className="rounded-xl border border-zinc-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 border-b border-zinc-800">
            <tr>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Resource</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Minimum</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Recommended</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            <tr><td className="px-4 py-3 text-xs text-zinc-300">RAM per session</td><td className="px-4 py-3 text-xs text-zinc-400">150 MB</td><td className="px-4 py-3 text-xs text-zinc-400">300 MB</td><td className="px-4 py-3 text-xs text-zinc-400">Depends on page complexity</td></tr>
            <tr><td className="px-4 py-3 text-xs text-zinc-300">RAM total (10 sessions)</td><td className="px-4 py-3 text-xs text-zinc-400">2 GB</td><td className="px-4 py-3 text-xs text-zinc-400">4 GB</td><td className="px-4 py-3 text-xs text-zinc-400">Plus base OS and Node.js overhead</td></tr>
            <tr><td className="px-4 py-3 text-xs text-zinc-300">RAM total (30 sessions)</td><td className="px-4 py-3 text-xs text-zinc-400">6 GB</td><td className="px-4 py-3 text-xs text-zinc-400">12 GB</td><td className="px-4 py-3 text-xs text-zinc-400">For production workloads</td></tr>
            <tr><td className="px-4 py-3 text-xs text-zinc-300">CPU</td><td className="px-4 py-3 text-xs text-zinc-400">2 cores</td><td className="px-4 py-3 text-xs text-zinc-400">4+ cores</td><td className="px-4 py-3 text-xs text-zinc-400">Chrome is CPU-intensive for rendering</td></tr>
            <tr><td className="px-4 py-3 text-xs text-zinc-300">Disk</td><td className="px-4 py-3 text-xs text-zinc-400">2 GB</td><td className="px-4 py-3 text-xs text-zinc-400">10 GB</td><td className="px-4 py-3 text-xs text-zinc-400">Profiles, temp files, SQLite DB</td></tr>
            <tr><td className="px-4 py-3 text-xs text-zinc-300">shm_size</td><td className="px-4 py-3 text-xs text-zinc-400">512 MB</td><td className="px-4 py-3 text-xs text-zinc-400">2 GB</td><td className="px-4 py-3 text-xs text-zinc-400">Chrome uses /dev/shm for rendering</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Scaling</h2>
      <p className="text-sm text-zinc-400 mb-4">
        BrowseFleet runs as a single process managing multiple Chrome tabs. For higher concurrency:
      </p>
      <div className="space-y-3 mb-10">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Vertical scaling</h3>
          <p className="text-xs text-zinc-400">Increase MAX_CONCURRENT_SESSIONS and add more RAM/CPU. A 64GB machine can comfortably run 100+ sessions.</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Horizontal scaling</h3>
          <p className="text-xs text-zinc-400">Run multiple BrowseFleet instances behind a load balancer. Each instance is stateless for quick actions. Sessions are pinned to their instance.</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">CDP WebSocket routing</h3>
          <p className="text-xs text-zinc-400">If running multiple instances, route CDP WebSocket connections to the instance that owns the session. Use sticky sessions or encode the instance ID in the session ID.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-4">Health Check</h2>
      <p className="text-sm text-zinc-400 mb-4">
        The <code className="text-purple-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">GET /health</code> endpoint
        returns HTTP 200 when the server is ready. The Docker image includes a built-in HEALTHCHECK
        that polls this endpoint every 30 seconds.
      </p>
      <CodeBlock code={`curl http://localhost:3000/health
# { "status": "ok" }`} language="bash" />
    </div>
  );
}
