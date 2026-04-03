import { EndpointBlock } from "@/components/endpoint-block";
import { CodeTabs } from "@/components/code-tabs";
import { CodeBlock } from "@/components/code-block";

export default function SessionsPage() {
  return (
    <div>
      <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">API Reference</p>
      <h1 className="text-4xl font-bold text-white mb-4">Sessions</h1>
      <p className="text-zinc-400 mb-10">
        Sessions are managed browser instances running in the cloud. Create a session, connect to it via CDP WebSocket,
        control the browser, and release it when done.
      </p>

      <h2 className="text-2xl font-bold text-white mb-4">Session Lifecycle</h2>
      <CodeBlock code={`created → active → released (manual) or expired (timeout)`} language="text" />
      <p className="text-sm text-zinc-400 mt-4 mb-10">
        Sessions start as <code className="text-purple-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">active</code> immediately upon creation.
        They become <code className="text-purple-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">released</code> when explicitly closed, or
        <code className="text-purple-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">expired</code> when the timeout elapses.
        If an error occurs during browser launch, the status is <code className="text-purple-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">error</code>.
      </p>

      {/* POST /v1/sessions */}
      <h2 className="text-2xl font-bold text-white mb-6">Create Session</h2>
      <EndpointBlock
        method="POST"
        path="/v1/sessions"
        description="Launch a new managed browser session."
        params={[
          { name: "sessionId", type: "string", required: false, description: "Custom session ID. Auto-generated if omitted." },
          { name: "proxyUrl", type: "string", required: false, description: "Proxy URL for this session (HTTP or SOCKS5). Overrides the global PROXY_URL." },
          { name: "stealth", type: '"none" | "basic" | "full"', required: false, default: '"full"', description: "Anti-detection level." },
          { name: "userAgent", type: "string", required: false, description: "Custom User-Agent string." },
          { name: "viewport", type: "{ width, height }", required: false, default: "{ 1920, 1080 }", description: "Browser viewport dimensions in pixels." },
          { name: "timeout", type: "number", required: false, default: "1800000", description: "Session timeout in milliseconds (max 86400000 = 24h)." },
          { name: "profileId", type: "string", required: false, description: "Browser profile ID. Loads saved cookies and localStorage." },
          { name: "blockAds", type: "boolean", required: false, default: "false", description: "Block ads and trackers." },
          { name: "cookies", type: "Cookie[]", required: false, description: "Cookies to inject. Each: { name, value, domain, path? }." },
          { name: "timezone", type: "string", required: false, description: "Timezone override, e.g. 'America/New_York'." },
          { name: "locale", type: "string", required: false, description: "Locale override, e.g. 'en-US'." },
          { name: "headers", type: "Record<string, string>", required: false, description: "Custom headers to set on all page requests." },
        ]}
        request={`{
  "stealth": "full",
  "viewport": { "width": 1920, "height": 1080 },
  "timeout": 3600000,
  "proxyUrl": "socks5://user:pass@proxy.example.com:1080"
}`}
        response={`{
  "id": "sess_abc123def456",
  "status": "active",
  "websocketUrl": "ws://api.browsefleet.com/cdp/sess_abc123def456",
  "viewerUrl": "https://api.browsefleet.com/v1/sessions/sess_abc123def456/live",
  "createdAt": "2026-04-02T12:00:00.000Z",
  "expiresAt": "2026-04-02T13:00:00.000Z",
  "timeout": 3600000,
  "stealth": "full",
  "viewport": { "width": 1920, "height": 1080 }
}`}
      >
        <CodeTabs tabs={[
          {
            label: "curl",
            language: "bash",
            code: `curl -X POST https://api.browsefleet.com/v1/sessions \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: bf_your_api_key" \\
  -d '{
    "stealth": "full",
    "viewport": { "width": 1920, "height": 1080 },
    "timeout": 3600000
  }'`,
          },
          {
            label: "Node.js",
            language: "typescript",
            code: `const session = await bf.sessions.create({
  stealth: 'full',
  viewport: { width: 1920, height: 1080 },
  timeout: 3600000,
});
console.log(session.websocketUrl);`,
          },
          {
            label: "Python",
            language: "python",
            code: `session = bf.sessions.create(
    stealth="full",
    viewport={"width": 1920, "height": 1080},
    timeout=3600000,
)
print(session.websocket_url)`,
          },
        ]} />
      </EndpointBlock>

      {/* GET /v1/sessions */}
      <h2 className="text-2xl font-bold text-white mb-6">List Sessions</h2>
      <EndpointBlock
        method="GET"
        path="/v1/sessions"
        description="List all active browser sessions."
        response={`{
  "sessions": [
    {
      "id": "sess_abc123",
      "status": "active",
      "websocketUrl": "ws://api.browsefleet.com/cdp/sess_abc123",
      "viewerUrl": "https://api.browsefleet.com/v1/sessions/sess_abc123/live",
      "createdAt": "2026-04-02T12:00:00.000Z",
      "expiresAt": "2026-04-02T12:30:00.000Z",
      "timeout": 1800000,
      "stealth": "full",
      "viewport": { "width": 1920, "height": 1080 }
    }
  ],
  "count": 1
}`}
      >
        <CodeTabs tabs={[
          { label: "curl", language: "bash", code: `curl https://api.browsefleet.com/v1/sessions \\
  -H "x-api-key: bf_your_api_key"` },
          { label: "Node.js", language: "typescript", code: `const { sessions, count } = await bf.sessions.list();
console.log(\`\${count} active sessions\`);` },
          { label: "Python", language: "python", code: `sessions = bf.sessions.list()
print(f"{len(sessions)} active sessions")` },
        ]} />
      </EndpointBlock>

      {/* GET /v1/sessions/:id */}
      <h2 className="text-2xl font-bold text-white mb-6">Get Session</h2>
      <EndpointBlock
        method="GET"
        path="/v1/sessions/:id"
        description="Get details of a specific session by ID."
        response={`{
  "id": "sess_abc123",
  "status": "active",
  "websocketUrl": "ws://api.browsefleet.com/cdp/sess_abc123",
  "viewerUrl": "https://api.browsefleet.com/v1/sessions/sess_abc123/live",
  "createdAt": "2026-04-02T12:00:00.000Z",
  "expiresAt": "2026-04-02T12:30:00.000Z",
  "timeout": 1800000,
  "stealth": "full",
  "viewport": { "width": 1920, "height": 1080 }
}`}
      >
        <CodeTabs tabs={[
          { label: "curl", language: "bash", code: `curl https://api.browsefleet.com/v1/sessions/sess_abc123 \\
  -H "x-api-key: bf_your_api_key"` },
          { label: "Node.js", language: "typescript", code: `const session = await bf.sessions.get('sess_abc123');
console.log(session.status); // "active"` },
          { label: "Python", language: "python", code: `session = bf.sessions.get("sess_abc123")
print(session.status)  # "active"` },
        ]} />
      </EndpointBlock>

      {/* POST /v1/sessions/:id/release */}
      <h2 className="text-2xl font-bold text-white mb-6">Release Session</h2>
      <EndpointBlock
        method="POST"
        path="/v1/sessions/:id/release"
        description="Release (close) a single session. The browser process is terminated and resources are freed."
        response={`{ "released": true }`}
      >
        <CodeTabs tabs={[
          { label: "curl", language: "bash", code: `curl -X POST https://api.browsefleet.com/v1/sessions/sess_abc123/release \\
  -H "x-api-key: bf_your_api_key"` },
          { label: "Node.js", language: "typescript", code: `await bf.sessions.release('sess_abc123');` },
          { label: "Python", language: "python", code: `bf.sessions.release("sess_abc123")` },
        ]} />
      </EndpointBlock>

      {/* POST /v1/sessions/release */}
      <h2 className="text-2xl font-bold text-white mb-6">Release Batch</h2>
      <EndpointBlock
        method="POST"
        path="/v1/sessions/release"
        description="Release multiple sessions at once, or all sessions if no IDs are provided."
        params={[
          { name: "ids", type: "string[]", required: false, description: "Array of session IDs to release. If omitted, releases all active sessions." },
        ]}
        request={`{
  "ids": ["sess_abc123", "sess_def456"]
}`}
        response={`{ "released": 2 }`}
      >
        <CodeTabs tabs={[
          { label: "curl", language: "bash", code: `# Release specific sessions
curl -X POST https://api.browsefleet.com/v1/sessions/release \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: bf_your_api_key" \\
  -d '{ "ids": ["sess_abc123", "sess_def456"] }'

# Release all sessions
curl -X POST https://api.browsefleet.com/v1/sessions/release \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: bf_your_api_key" \\
  -d '{}'` },
          { label: "Node.js", language: "typescript", code: `// Release specific sessions
await bf.sessions.releaseAll(['sess_abc123', 'sess_def456']);

// Release all sessions
await bf.sessions.releaseAll();` },
          { label: "Python", language: "python", code: `# Release specific sessions
bf.sessions.release_batch(["sess_abc123", "sess_def456"])

# Release all sessions
bf.sessions.release_all()` },
        ]} />
      </EndpointBlock>

      {/* CDP WebSocket */}
      <h2 className="text-2xl font-bold text-white mb-4">CDP WebSocket Connection</h2>
      <p className="text-sm text-zinc-400 mb-4">
        After creating a session, use the <code className="text-purple-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">websocketUrl</code> to connect
        any CDP-compatible tool. BrowseFleet transparently proxies the Chrome DevTools Protocol between your client and the browser.
      </p>
      <CodeTabs tabs={[
        {
          label: "Puppeteer",
          language: "typescript",
          code: `import puppeteer from 'puppeteer-core';

const browser = await puppeteer.connect({
  browserWSEndpoint: session.websocketUrl,
});
const page = await browser.newPage();
await page.goto('https://example.com');

// ... use the page normally ...

await browser.disconnect();`,
        },
        {
          label: "Playwright",
          language: "typescript",
          code: `import { chromium } from 'playwright';

const browser = await chromium.connectOverCDP(session.websocketUrl);
const context = browser.contexts()[0];
const page = context.pages()[0] || await context.newPage();
await page.goto('https://example.com');

await browser.close();`,
        },
        {
          label: "Selenium",
          language: "python",
          code: `from selenium import webdriver

options = webdriver.ChromeOptions()
options.debugger_address = "api.browsefleet.com/cdp/SESSION_ID"

driver = webdriver.Remote(
    command_executor="...",
    options=options,
)
driver.get("https://example.com")`,
        },
      ]} />

      {/* Live Viewer */}
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Live Viewer (SSE)</h2>
      <EndpointBlock
        method="GET"
        path="/v1/sessions/:id/live"
        description="Server-Sent Events stream of JPEG screenshots at 2fps. Useful for debugging and monitoring sessions in real time. Streams for up to 5 minutes."
        response={`data: { "screenshot": "<base64-jpeg>" }

data: { "screenshot": "<base64-jpeg>" }

...`}
      />

      {/* Session Response Schema */}
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Session Object Schema</h2>
      <div className="rounded-xl border border-zinc-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 border-b border-zinc-800">
            <tr>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Field</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Type</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">id</code></td><td className="px-4 py-3 text-xs text-zinc-400">string</td><td className="px-4 py-3 text-xs text-zinc-400">Unique session identifier</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">status</code></td><td className="px-4 py-3 text-xs text-zinc-400">string</td><td className="px-4 py-3 text-xs text-zinc-400">&quot;active&quot; | &quot;released&quot; | &quot;expired&quot; | &quot;error&quot;</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">websocketUrl</code></td><td className="px-4 py-3 text-xs text-zinc-400">string</td><td className="px-4 py-3 text-xs text-zinc-400">CDP WebSocket URL for connecting automation tools</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">viewerUrl</code></td><td className="px-4 py-3 text-xs text-zinc-400">string</td><td className="px-4 py-3 text-xs text-zinc-400">URL for the live session viewer (SSE)</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">createdAt</code></td><td className="px-4 py-3 text-xs text-zinc-400">string</td><td className="px-4 py-3 text-xs text-zinc-400">ISO 8601 creation timestamp</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">expiresAt</code></td><td className="px-4 py-3 text-xs text-zinc-400">string</td><td className="px-4 py-3 text-xs text-zinc-400">ISO 8601 expiration timestamp</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">timeout</code></td><td className="px-4 py-3 text-xs text-zinc-400">number</td><td className="px-4 py-3 text-xs text-zinc-400">Session timeout in milliseconds</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">stealth</code></td><td className="px-4 py-3 text-xs text-zinc-400">string</td><td className="px-4 py-3 text-xs text-zinc-400">Stealth level used</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">viewport</code></td><td className="px-4 py-3 text-xs text-zinc-400">object</td><td className="px-4 py-3 text-xs text-zinc-400">Viewport dimensions (width, height)</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">proxyUrl</code></td><td className="px-4 py-3 text-xs text-zinc-400">string?</td><td className="px-4 py-3 text-xs text-zinc-400">Proxy URL if configured</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">profileId</code></td><td className="px-4 py-3 text-xs text-zinc-400">string?</td><td className="px-4 py-3 text-xs text-zinc-400">Browser profile ID if used</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
