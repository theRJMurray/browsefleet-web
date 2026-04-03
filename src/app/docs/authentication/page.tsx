import { CodeBlock } from "@/components/code-block";
import { CodeTabs } from "@/components/code-tabs";

export default function AuthenticationPage() {
  return (
    <div>
      <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Getting Started</p>
      <h1 className="text-4xl font-bold text-white mb-4">Authentication</h1>
      <p className="text-zinc-400 mb-10">
        All API requests require authentication via an API key. Self-hosted instances can optionally run without authentication.
      </p>

      <h2 className="text-2xl font-bold text-white mb-4">API Key Format</h2>
      <p className="text-sm text-zinc-400 mb-4">
        API keys are prefixed with <code className="text-purple-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">bf_</code> followed by 32 hexadecimal characters.
        Keys are generated when you sign up or when a Stripe subscription is created via the webhook.
      </p>
      <CodeBlock code="bf_a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4" language="text" />

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Header Authentication</h2>
      <p className="text-sm text-zinc-400 mb-4">
        Pass your API key in the <code className="text-purple-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">x-api-key</code> header on every REST API request.
      </p>
      <CodeTabs tabs={[
        {
          label: "curl",
          language: "bash",
          code: `curl https://api.browsefleet.com/v1/sessions \\
  -H "x-api-key: bf_your_api_key"`,
        },
        {
          label: "Node.js",
          language: "typescript",
          code: `import { BrowseFleet } from 'browsefleet';

const bf = new BrowseFleet({
  apiKey: 'bf_your_api_key',
});

// All subsequent requests are authenticated automatically`,
        },
        {
          label: "Python",
          language: "python",
          code: `from browsefleet import BrowseFleet

bf = BrowseFleet(
    api_key="bf_your_api_key",
    base_url="https://api.browsefleet.com",
)

# All subsequent requests are authenticated automatically`,
        },
      ]} />

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">WebSocket Authentication</h2>
      <p className="text-sm text-zinc-400 mb-4">
        For CDP WebSocket connections, pass your API key as a query parameter. The session ID is part of the URL path.
      </p>
      <CodeBlock
        code={`ws://api.browsefleet.com/cdp/SESSION_ID?apiKey=bf_your_api_key`}
        language="text"
      />
      <p className="text-sm text-zinc-400 mt-4">
        When connecting with Puppeteer or Playwright, use the <code className="text-purple-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">websocketUrl</code> returned
        by the create session endpoint. The URL already includes the correct path.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Rate Limits</h2>
      <p className="text-sm text-zinc-400 mb-4">
        Rate limits vary by tier. Exceeding limits returns HTTP 429 with a JSON error body.
      </p>
      <div className="rounded-xl border border-zinc-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 border-b border-zinc-800">
            <tr>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Tier</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Concurrent Sessions</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Daily Requests</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            <tr><td className="px-4 py-3 text-xs text-zinc-300">Hobby</td><td className="px-4 py-3 text-xs text-zinc-400">5</td><td className="px-4 py-3 text-xs text-zinc-400">500</td></tr>
            <tr><td className="px-4 py-3 text-xs text-zinc-300">Starter</td><td className="px-4 py-3 text-xs text-zinc-400">10</td><td className="px-4 py-3 text-xs text-zinc-400">1,000</td></tr>
            <tr><td className="px-4 py-3 text-xs text-zinc-300">Developer</td><td className="px-4 py-3 text-xs text-zinc-400">20</td><td className="px-4 py-3 text-xs text-zinc-400">Unlimited</td></tr>
            <tr><td className="px-4 py-3 text-xs text-zinc-300">Pro</td><td className="px-4 py-3 text-xs text-zinc-400">100</td><td className="px-4 py-3 text-xs text-zinc-400">Unlimited</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Error Responses</h2>
      <div className="space-y-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">401 Unauthorized</h3>
          <p className="text-xs text-zinc-400 mb-2">Returned when the API key is missing, invalid, or deactivated.</p>
          <CodeBlock code={`{ "error": "Invalid API key" }`} language="json" />
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">429 Too Many Requests</h3>
          <p className="text-xs text-zinc-400 mb-2">Returned when you exceed concurrent session limits or daily request quotas.</p>
          <CodeBlock code={`{ "error": "Maximum concurrent sessions reached" }`} language="json" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Self-Hosted Authentication</h2>
      <p className="text-sm text-zinc-400 mb-4">
        For self-hosted instances, set the <code className="text-purple-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">API_KEYS</code> environment variable
        to a comma-separated list of valid keys. If left empty, authentication is disabled and all requests are allowed.
      </p>
      <CodeBlock
        code={`# Enable authentication with two keys
API_KEYS=bf_key_one,bf_key_two

# Disable authentication (open access)
API_KEYS=`}
        language="bash"
      />
    </div>
  );
}
