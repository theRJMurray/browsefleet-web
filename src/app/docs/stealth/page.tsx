import { CodeBlock } from "@/components/code-block";
import { CodeTabs } from "@/components/code-tabs";

export default function StealthPage() {
  return (
    <div>
      <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Guides</p>
      <h1 className="text-4xl font-bold text-white mb-4">Stealth Mode</h1>
      <p className="text-zinc-400 mb-10">
        BrowseFleet includes built-in anti-detection to help your browser sessions pass bot checks.
        Stealth is enabled at the &quot;full&quot; level by default for all sessions and quick actions.
      </p>

      <h2 className="text-2xl font-bold text-white mb-4">Stealth Levels</h2>
      <div className="rounded-xl border border-zinc-800 overflow-hidden mb-10">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 border-b border-zinc-800">
            <tr>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Level</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Description</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Use Case</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            <tr>
              <td className="px-4 py-3"><code className="text-xs text-purple-400">none</code></td>
              <td className="px-4 py-3 text-xs text-zinc-400">No anti-detection. Standard headless Chrome behavior.</td>
              <td className="px-4 py-3 text-xs text-zinc-400">Internal tools, testing environments, sites you control.</td>
            </tr>
            <tr>
              <td className="px-4 py-3"><code className="text-xs text-purple-400">basic</code></td>
              <td className="px-4 py-3 text-xs text-zinc-400">WebDriver flag masking, basic navigator patches.</td>
              <td className="px-4 py-3 text-xs text-zinc-400">Most websites with simple bot detection.</td>
            </tr>
            <tr>
              <td className="px-4 py-3"><code className="text-xs text-purple-400">full</code></td>
              <td className="px-4 py-3 text-xs text-zinc-400">Complete anti-detection suite via puppeteer-extra-plugin-stealth.</td>
              <td className="px-4 py-3 text-xs text-zinc-400">Sites with aggressive bot detection (Cloudflare, DataDome, PerimeterX).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-white mb-4">What &quot;full&quot; Stealth Does</h2>
      <div className="space-y-3 mb-10">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">WebDriver Masking</h3>
          <p className="text-xs text-zinc-400">Removes <code className="text-purple-400 bg-zinc-800 px-1 py-0.5 rounded text-xs">navigator.webdriver</code> flag that identifies headless browsers.</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Chrome Runtime</h3>
          <p className="text-xs text-zinc-400">Injects <code className="text-purple-400 bg-zinc-800 px-1 py-0.5 rounded text-xs">window.chrome</code> runtime object that matches real Chrome browsers.</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Navigator Patches</h3>
          <p className="text-xs text-zinc-400">Patches navigator properties including plugins, languages, platform, and hardware concurrency to match real user profiles.</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">WebGL Fingerprint</h3>
          <p className="text-xs text-zinc-400">Spoofs WebGL vendor and renderer strings to avoid fingerprint-based detection.</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Iframe Protection</h3>
          <p className="text-xs text-zinc-400">Patches contentWindow properties on iframes to prevent cross-frame detection techniques.</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Permission Handling</h3>
          <p className="text-xs text-zinc-400">Overrides Permissions API to return consistent values matching real browsers.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-4">Proxy Support</h2>
      <p className="text-sm text-zinc-400 mb-4">
        Combine stealth mode with proxies for maximum anti-detection effectiveness. BrowseFleet supports
        per-session proxies and a global proxy fallback.
      </p>

      <h3 className="text-lg font-semibold text-white mb-3">Per-Session Proxy</h3>
      <p className="text-sm text-zinc-400 mb-4">
        Pass a <code className="text-purple-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">proxyUrl</code> when creating a session or making a quick action request.
        Supports HTTP, HTTPS, and SOCKS5 protocols with optional authentication.
      </p>
      <CodeTabs tabs={[
        {
          label: "Node.js",
          language: "typescript",
          code: `const session = await bf.sessions.create({
  stealth: 'full',
  proxyUrl: 'socks5://user:pass@proxy.example.com:1080',
});

// Quick actions also support proxy
const result = await bf.scrape('https://example.com', {
  proxyUrl: 'http://user:pass@proxy.example.com:8080',
});`,
        },
        {
          label: "curl",
          language: "bash",
          code: `curl -X POST https://api.browsefleet.com/v1/sessions \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: bf_your_api_key" \\
  -d '{
    "stealth": "full",
    "proxyUrl": "socks5://user:pass@proxy.example.com:1080"
  }'`,
        },
      ]} />

      <h3 className="text-lg font-semibold text-white mt-8 mb-3">Global Proxy</h3>
      <p className="text-sm text-zinc-400 mb-4">
        Set a default proxy for all sessions via the <code className="text-purple-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">PROXY_URL</code> environment variable.
        Per-session proxies override the global setting.
      </p>
      <CodeBlock code={`PROXY_URL=socks5://user:pass@proxy.example.com:1080`} language="bash" />

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Best Practices</h2>
      <div className="space-y-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Use residential proxies</h3>
          <p className="text-xs text-zinc-400">Datacenter IPs are frequently blocklisted. Residential proxies provide real ISP IP addresses that are much harder to detect.</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Set timezone and locale</h3>
          <p className="text-xs text-zinc-400">Match the timezone and locale to the proxy&apos;s geographic location. Mismatches are a detection signal.</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Use profiles for persistence</h3>
          <p className="text-xs text-zinc-400">Browser profiles maintain cookies and localStorage across sessions, making your browser look like a returning user.</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Add natural delays</h3>
          <p className="text-xs text-zinc-400">Use the &quot;wait&quot; action between interactions. Humans don&apos;t click instantly after page loads.</p>
        </div>
      </div>
    </div>
  );
}
