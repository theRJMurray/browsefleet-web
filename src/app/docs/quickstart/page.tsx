import { CodeTabs } from "@/components/code-tabs";

export default function QuickstartPage() {
  return (
    <div>
      <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Getting Started</p>
      <h1 className="text-4xl font-bold text-white mb-4">Quickstart</h1>
      <p className="text-zinc-400 mb-12">
        Go from zero to cloud browser automation in under 2 minutes.
      </p>

      {/* Step 1 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-2">1. Get your API key</h2>
        <p className="text-sm text-zinc-400 mb-4">
          Sign up at browsefleet.com/dashboard. Your API key starts with <code className="text-purple-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">bf_</code>.
          For self-hosted instances, set the <code className="text-purple-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">API_KEYS</code> environment variable.
        </p>
        <CodeTabs tabs={[
          { label: "Environment", language: "bash", code: "export BROWSEFLEET_API_KEY=bf_your_api_key" },
        ]} />
      </section>

      {/* Step 2 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-2">2. Install the SDK</h2>
        <p className="text-sm text-zinc-400 mb-4">
          Install the BrowseFleet client library for your language, or use curl directly.
        </p>
        <CodeTabs tabs={[
          { label: "Node.js", language: "bash", code: "npm install browsefleet puppeteer-core" },
          { label: "Python", language: "bash", code: "pip install browsefleet" },
          { label: "Docker", language: "bash", code: "docker run -p 3000:3000 --shm-size=2g ghcr.io/therj/browsefleet" },
        ]} />
      </section>

      {/* Step 3 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-2">3. Create a session</h2>
        <p className="text-sm text-zinc-400 mb-4">
          Launch a cloud browser and get a CDP WebSocket URL to connect your automation tools.
        </p>
        <CodeTabs tabs={[
          {
            label: "curl",
            language: "bash",
            code: `curl -X POST https://api.browsefleet.com/v1/sessions \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: bf_your_api_key" \\
  -d '{
    "stealth": "full",
    "viewport": { "width": 1920, "height": 1080 }
  }'

# Response:
# {
#   "id": "sess_abc123",
#   "status": "active",
#   "websocketUrl": "ws://api.browsefleet.com/cdp/sess_abc123",
#   "viewerUrl": "https://api.browsefleet.com/v1/sessions/sess_abc123/live",
#   "createdAt": "2026-04-02T12:00:00.000Z",
#   "expiresAt": "2026-04-02T12:30:00.000Z",
#   "timeout": 1800000,
#   "stealth": "full",
#   "viewport": { "width": 1920, "height": 1080 }
# }`,
          },
          {
            label: "Node.js",
            language: "typescript",
            code: `import { BrowseFleet } from 'browsefleet';

const bf = new BrowseFleet({
  apiKey: process.env.BROWSEFLEET_API_KEY,
});

const session = await bf.sessions.create({
  stealth: 'full',
  viewport: { width: 1920, height: 1080 },
});

console.log(session.id);           // "sess_abc123"
console.log(session.websocketUrl); // "ws://..."`,
          },
          {
            label: "Python",
            language: "python",
            code: `from browsefleet import BrowseFleet

bf = BrowseFleet(
    api_key="bf_your_api_key",
    base_url="https://api.browsefleet.com",
)

session = bf.sessions.create(stealth="full")
print(session.id)            # "sess_abc123"
print(session.websocket_url) # "ws://..."`,
          },
        ]} />
      </section>

      {/* Step 4 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-2">4. Connect Puppeteer</h2>
        <p className="text-sm text-zinc-400 mb-4">
          Use the CDP WebSocket URL to connect Puppeteer, Playwright, or any CDP-compatible tool.
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
const title = await page.title();
console.log(title); // "Example Domain"

await browser.disconnect();
await bf.sessions.release(session.id);`,
          },
          {
            label: "Playwright",
            language: "typescript",
            code: `import { chromium } from 'playwright';

const browser = await chromium.connectOverCDP(session.websocketUrl);
const page = await browser.newPage();
await page.goto('https://example.com');

const title = await page.title();
console.log(title);

await browser.close();`,
          },
        ]} />
      </section>

      {/* Step 5 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-2">5. Scrape a page</h2>
        <p className="text-sm text-zinc-400 mb-4">
          Or skip sessions entirely and use the quick scrape endpoint for one-off tasks.
        </p>
        <CodeTabs tabs={[
          {
            label: "curl",
            language: "bash",
            code: `curl -X POST https://api.browsefleet.com/v1/scrape \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: bf_your_api_key" \\
  -d '{ "url": "https://example.com" }'

# Returns: { url, statusCode, title, html, cleanedHtml, markdown, readability, links, metadata }`,
          },
          {
            label: "Node.js",
            language: "typescript",
            code: `const result = await bf.scrape('https://example.com');
console.log(result.title);    // "Example Domain"
console.log(result.markdown); // "# Example Domain\\n\\n..."
console.log(result.links);    // [{ href: "...", text: "..." }]`,
          },
          {
            label: "Python",
            language: "python",
            code: `result = bf.scrape("https://example.com")
print(result.title)    # "Example Domain"
print(result.markdown) # "# Example Domain\\n\\n..."
print(result.links)    # [{"href": "...", "text": "..."}]`,
          },
        ]} />
      </section>

      {/* Step 6 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-2">6. Take a screenshot</h2>
        <p className="text-sm text-zinc-400 mb-4">
          Capture a full-page screenshot with a single call.
        </p>
        <CodeTabs tabs={[
          {
            label: "curl",
            language: "bash",
            code: `curl -X POST https://api.browsefleet.com/v1/screenshot \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: bf_your_api_key" \\
  -d '{ "url": "https://example.com", "fullPage": true }' \\
  --output screenshot.png`,
          },
          {
            label: "Node.js",
            language: "typescript",
            code: `import { writeFileSync } from 'fs';

const imageBuffer = await bf.screenshot('https://example.com', {
  fullPage: true,
  format: 'png',
});
writeFileSync('screenshot.png', Buffer.from(imageBuffer));`,
          },
          {
            label: "Python",
            language: "python",
            code: `image_bytes = bf.screenshot("https://example.com", full_page=True)
with open("screenshot.png", "wb") as f:
    f.write(image_bytes)`,
          },
        ]} />
      </section>

      <div className="mt-16 rounded-xl border border-zinc-800 bg-zinc-900/30 p-8 text-center">
        <h3 className="text-xl font-bold text-white mb-3">Next steps</h3>
        <p className="text-sm text-zinc-400 mb-6">
          Explore the full API reference for sessions, computer API, agents, and more.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a href="/docs/sessions" className="rounded-lg bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-purple-500 transition-colors">
            Sessions API
          </a>
          <a href="/docs/computer-api" className="rounded-lg border border-zinc-700 px-6 py-2.5 text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors">
            Computer API
          </a>
        </div>
      </div>
    </div>
  );
}
