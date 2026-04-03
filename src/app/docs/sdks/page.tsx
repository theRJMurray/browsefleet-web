import { CodeBlock } from "@/components/code-block";
import { CodeTabs } from "@/components/code-tabs";

export default function SdksPage() {
  return (
    <div>
      <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">SDKs</p>
      <h1 className="text-4xl font-bold text-white mb-4">Node.js and Python SDKs</h1>
      <p className="text-zinc-400 mb-10">
        Official client libraries for Node.js and Python. Both SDKs provide typed interfaces
        for every endpoint, automatic error handling, and binary response support.
      </p>

      {/* Node.js SDK */}
      <h2 className="text-2xl font-bold text-white mb-4">Node.js SDK</h2>
      <CodeBlock code="npm install browsefleet" language="bash" />

      <h3 className="text-lg font-semibold text-white mt-8 mb-3">Initialization</h3>
      <CodeBlock code={`import { BrowseFleet } from 'browsefleet';

const bf = new BrowseFleet({
  apiKey: 'bf_your_api_key',            // Required
  baseUrl: 'https://api.browsefleet.com', // Optional (default)
  timeout: 60000,                        // Optional, ms (default: 60000)
});`} language="typescript" />

      <h3 className="text-lg font-semibold text-white mt-8 mb-3">Methods Reference</h3>
      <div className="rounded-xl border border-zinc-800 overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 border-b border-zinc-800">
            <tr>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Method</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Return Type</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.sessions.create(opts?)</code></td><td className="px-4 py-3 text-xs text-zinc-400">Session</td><td className="px-4 py-3 text-xs text-zinc-400">Create a browser session</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.sessions.list()</code></td><td className="px-4 py-3 text-xs text-zinc-400">SessionList</td><td className="px-4 py-3 text-xs text-zinc-400">List active sessions</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.sessions.get(id)</code></td><td className="px-4 py-3 text-xs text-zinc-400">Session</td><td className="px-4 py-3 text-xs text-zinc-400">Get session by ID</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.sessions.release(id)</code></td><td className="px-4 py-3 text-xs text-zinc-400">{`{ released }`}</td><td className="px-4 py-3 text-xs text-zinc-400">Release a session</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.sessions.releaseAll(ids?)</code></td><td className="px-4 py-3 text-xs text-zinc-400">{`{ released }`}</td><td className="px-4 py-3 text-xs text-zinc-400">Release batch or all</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.sessions.actions(id, actions)</code></td><td className="px-4 py-3 text-xs text-zinc-400">ActionResponse</td><td className="px-4 py-3 text-xs text-zinc-400">Execute Computer API actions</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.sessions.solveCaptcha(id, opts?)</code></td><td className="px-4 py-3 text-xs text-zinc-400">CaptchaSolveResponse</td><td className="px-4 py-3 text-xs text-zinc-400">Solve CAPTCHA on page</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.sessions.listFiles(id)</code></td><td className="px-4 py-3 text-xs text-zinc-400">FileListResponse</td><td className="px-4 py-3 text-xs text-zinc-400">List session files</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.sessions.downloadFile(id, name)</code></td><td className="px-4 py-3 text-xs text-zinc-400">ArrayBuffer</td><td className="px-4 py-3 text-xs text-zinc-400">Download a file</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.profiles.create(opts)</code></td><td className="px-4 py-3 text-xs text-zinc-400">Profile</td><td className="px-4 py-3 text-xs text-zinc-400">Create a profile</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.profiles.list()</code></td><td className="px-4 py-3 text-xs text-zinc-400">ProfileList</td><td className="px-4 py-3 text-xs text-zinc-400">List all profiles</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.profiles.get(id)</code></td><td className="px-4 py-3 text-xs text-zinc-400">Profile</td><td className="px-4 py-3 text-xs text-zinc-400">Get profile by ID</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.profiles.delete(id)</code></td><td className="px-4 py-3 text-xs text-zinc-400">{`{ deleted }`}</td><td className="px-4 py-3 text-xs text-zinc-400">Delete a profile</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.scrape(url, opts?)</code></td><td className="px-4 py-3 text-xs text-zinc-400">ScrapeResponse</td><td className="px-4 py-3 text-xs text-zinc-400">Scrape URL to content</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.screenshot(url, opts?)</code></td><td className="px-4 py-3 text-xs text-zinc-400">ArrayBuffer</td><td className="px-4 py-3 text-xs text-zinc-400">Screenshot URL</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.pdf(url, opts?)</code></td><td className="px-4 py-3 text-xs text-zinc-400">ArrayBuffer</td><td className="px-4 py-3 text-xs text-zinc-400">Generate PDF</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.usage()</code></td><td className="px-4 py-3 text-xs text-zinc-400">UsageStats</td><td className="px-4 py-3 text-xs text-zinc-400">Get usage statistics</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.health()</code></td><td className="px-4 py-3 text-xs text-zinc-400">boolean</td><td className="px-4 py-3 text-xs text-zinc-400">Health check</td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-semibold text-white mt-8 mb-3">Error Handling</h3>
      <CodeBlock code={`import { BrowseFleet, AuthError, NotFoundError, RateLimitError, BrowseFleetError } from 'browsefleet';

try {
  const session = await bf.sessions.get('invalid-id');
} catch (err) {
  if (err instanceof AuthError) {
    console.error('Invalid API key');
  } else if (err instanceof NotFoundError) {
    console.error('Session not found');
  } else if (err instanceof RateLimitError) {
    console.error('Rate limited — retry later');
  } else if (err instanceof BrowseFleetError) {
    console.error(\`API error \${err.status}: \${err.message}\`);
  }
}`} language="typescript" />

      {/* Python SDK */}
      <h2 className="text-2xl font-bold text-white mt-16 mb-4">Python SDK</h2>
      <CodeBlock code="pip install browsefleet" language="bash" />

      <h3 className="text-lg font-semibold text-white mt-8 mb-3">Initialization</h3>
      <CodeBlock code={`from browsefleet import BrowseFleet

bf = BrowseFleet(
    api_key="bf_your_api_key",
    base_url="https://api.browsefleet.com",  # Required
    timeout=60.0,                             # Optional, seconds (default: 60)
)

# Supports context manager
with BrowseFleet(api_key="bf_...", base_url="https://api.browsefleet.com") as bf:
    session = bf.sessions.create(stealth="full")
    # bf.close() called automatically`} language="python" />

      <h3 className="text-lg font-semibold text-white mt-8 mb-3">Methods Reference</h3>
      <div className="rounded-xl border border-zinc-800 overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 border-b border-zinc-800">
            <tr>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Method</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Return Type</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.sessions.create(**kwargs)</code></td><td className="px-4 py-3 text-xs text-zinc-400">Session</td><td className="px-4 py-3 text-xs text-zinc-400">Create a browser session</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.sessions.list()</code></td><td className="px-4 py-3 text-xs text-zinc-400">list[Session]</td><td className="px-4 py-3 text-xs text-zinc-400">List active sessions</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.sessions.get(id)</code></td><td className="px-4 py-3 text-xs text-zinc-400">Session</td><td className="px-4 py-3 text-xs text-zinc-400">Get session by ID</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.sessions.release(id)</code></td><td className="px-4 py-3 text-xs text-zinc-400">bool</td><td className="px-4 py-3 text-xs text-zinc-400">Release a session</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.sessions.release_all()</code></td><td className="px-4 py-3 text-xs text-zinc-400">int</td><td className="px-4 py-3 text-xs text-zinc-400">Release all sessions</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.sessions.release_batch(ids)</code></td><td className="px-4 py-3 text-xs text-zinc-400">int</td><td className="px-4 py-3 text-xs text-zinc-400">Release multiple sessions</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.sessions.actions(id, actions)</code></td><td className="px-4 py-3 text-xs text-zinc-400">ActionResponse</td><td className="px-4 py-3 text-xs text-zinc-400">Execute Computer API actions</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.sessions.solve_captcha(id, type)</code></td><td className="px-4 py-3 text-xs text-zinc-400">CaptchaResult</td><td className="px-4 py-3 text-xs text-zinc-400">Solve CAPTCHA</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.sessions.upload_file(id, name, data)</code></td><td className="px-4 py-3 text-xs text-zinc-400">dict</td><td className="px-4 py-3 text-xs text-zinc-400">Upload file</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.sessions.list_files(id)</code></td><td className="px-4 py-3 text-xs text-zinc-400">list[str]</td><td className="px-4 py-3 text-xs text-zinc-400">List session files</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.sessions.download_file(id, name)</code></td><td className="px-4 py-3 text-xs text-zinc-400">bytes</td><td className="px-4 py-3 text-xs text-zinc-400">Download a file</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.profiles.create(name)</code></td><td className="px-4 py-3 text-xs text-zinc-400">Profile</td><td className="px-4 py-3 text-xs text-zinc-400">Create a profile</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.profiles.list()</code></td><td className="px-4 py-3 text-xs text-zinc-400">list[Profile]</td><td className="px-4 py-3 text-xs text-zinc-400">List profiles</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.profiles.get(id)</code></td><td className="px-4 py-3 text-xs text-zinc-400">Profile</td><td className="px-4 py-3 text-xs text-zinc-400">Get profile</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.profiles.delete(id)</code></td><td className="px-4 py-3 text-xs text-zinc-400">bool</td><td className="px-4 py-3 text-xs text-zinc-400">Delete profile</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.scrape(url, **kwargs)</code></td><td className="px-4 py-3 text-xs text-zinc-400">ScrapeResult</td><td className="px-4 py-3 text-xs text-zinc-400">Scrape URL</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.screenshot(url, **kwargs)</code></td><td className="px-4 py-3 text-xs text-zinc-400">bytes</td><td className="px-4 py-3 text-xs text-zinc-400">Screenshot URL</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.pdf(url, **kwargs)</code></td><td className="px-4 py-3 text-xs text-zinc-400">bytes</td><td className="px-4 py-3 text-xs text-zinc-400">Generate PDF</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.usage()</code></td><td className="px-4 py-3 text-xs text-zinc-400">UsageStats</td><td className="px-4 py-3 text-xs text-zinc-400">Get usage</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">bf.health()</code></td><td className="px-4 py-3 text-xs text-zinc-400">dict</td><td className="px-4 py-3 text-xs text-zinc-400">Health check</td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-semibold text-white mt-8 mb-3">Error Handling</h3>
      <CodeBlock code={`from browsefleet.errors import (
    BrowseFleetError,
    AuthError,
    NotFoundError,
    RateLimitError,
    ValidationError,
    ServerError,
)

try:
    session = bf.sessions.get("invalid-id")
except AuthError:
    print("Invalid API key")
except NotFoundError:
    print("Session not found")
except RateLimitError:
    print("Rate limited")
except BrowseFleetError as e:
    print(f"API error {e.status}: {e.message}")`} language="python" />

      {/* Building Your Own */}
      <h2 className="text-2xl font-bold text-white mt-16 mb-4">Building Your Own SDK</h2>
      <p className="text-sm text-zinc-400 mb-4">
        BrowseFleet exposes a standard REST API. You can build clients in any language:
      </p>
      <div className="space-y-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">REST API</h3>
          <p className="text-xs text-zinc-400">JSON request/response on all endpoints. Authentication via x-api-key header. Error responses use the format {`{ "error": "message" }`}.</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">CDP WebSocket</h3>
          <p className="text-xs text-zinc-400">Standard Chrome DevTools Protocol over WebSocket. Connect to ws://host/cdp/SESSION_ID. BrowseFleet transparently proxies all CDP messages.</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Binary Responses</h3>
          <p className="text-xs text-zinc-400">Screenshot and PDF endpoints return binary data by default. Send Accept: application/json to get base64 JSON instead.</p>
        </div>
      </div>
    </div>
  );
}
