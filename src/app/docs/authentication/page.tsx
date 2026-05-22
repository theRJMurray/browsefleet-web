import { CodeBlock } from "@/components/code-block";
import { CodeTabs } from "@/components/code-tabs";
import Link from "next/link";

export default function AuthenticationPage() {
  return (
    <div>
      <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Getting Started</p>
      <h1 className="text-4xl font-bold text-white mb-4">Authentication</h1>
      <p className="text-zinc-400 mb-10">
        BrowseFleet runs without authentication by default. When you set the{" "}
        <code className="text-purple-300 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">API_KEYS</code>{" "}
        environment variable, every request must carry a matching{" "}
        <code className="text-purple-300 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">x-api-key</code> header.
      </p>

      <h2 className="text-2xl font-bold text-white mb-4">Configuring keys</h2>
      <p className="text-sm text-zinc-400 mb-4">
        Set{" "}
        <code className="text-purple-300 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">API_KEYS</code>{" "}
        on the server to a comma-separated list of secrets. If the variable is empty or unset,
        authentication is disabled and all requests are accepted; only do this on a host bound to
        localhost or behind another auth layer.
      </p>
      <CodeBlock
        code={`# Authentication on, two valid keys
API_KEYS=bf_key_one,bf_key_two

# Authentication off (default; only safe on localhost)
API_KEYS=`}
        language="bash"
      />
      <p className="text-sm text-zinc-400 mt-4">
        Generate keys however you want. The server treats them as opaque strings. A common pattern:
        prefix with{" "}
        <code className="text-purple-300 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">bf_</code> and
        append 32 hex characters, e.g.{" "}
        <code className="text-purple-300 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">
          bf_a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
        </code>.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">REST requests</h2>
      <p className="text-sm text-zinc-400 mb-4">
        Pass the key in the{" "}
        <code className="text-purple-300 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">x-api-key</code>{" "}
        header on every request. The SDKs read it from{" "}
        <code className="text-purple-300 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">BROWSEFLEET_API_KEY</code> if you do not pass it explicitly.
      </p>
      <CodeTabs tabs={[
        {
          label: "curl",
          language: "bash",
          code: `curl http://localhost:3000/v1/sessions \\
  -H "x-api-key: bf_your_api_key"`,
        },
        {
          label: "Node.js",
          language: "typescript",
          code: `import { BrowseFleet } from 'browsefleet';

const bf = new BrowseFleet({
  baseUrl: 'http://localhost:3000',
  apiKey: process.env.BROWSEFLEET_API_KEY,
});`,
        },
        {
          label: "Python",
          language: "python",
          code: `from browsefleet import BrowseFleet

bf = BrowseFleet(
    base_url="http://localhost:3000",
    api_key=os.environ.get("BROWSEFLEET_API_KEY"),
)`,
        },
      ]} />

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">CDP WebSocket</h2>
      <p className="text-sm text-zinc-400 mb-4">
        For CDP connections, pass the key as a query parameter. Use the{" "}
        <code className="text-purple-300 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">websocketUrl</code>{" "}
        the create-session endpoint returns; the SDKs construct it correctly for you.
      </p>
      <CodeBlock
        code={`ws://localhost:3000/cdp/SESSION_ID?apiKey=bf_your_api_key`}
        language="text"
      />

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Rate limits</h2>
      <p className="text-sm text-zinc-400 mb-4">
        Rate limits are in-memory and configured server-side. There is no tier ladder; one host, one
        bucket per API key (or per IP when authless). Defaults are conservative; tune them in your
        deployment config if you need to.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Error responses</h2>
      <div className="space-y-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">401 Unauthorized</h3>
          <p className="text-xs text-zinc-400 mb-2">
            Authentication is enabled and the request is missing or has an invalid key.
          </p>
          <CodeBlock code={`{ "error": "Invalid API key" }`} language="json" />
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">429 Too Many Requests</h3>
          <p className="text-xs text-zinc-400 mb-2">
            Rate-limit hit, or{" "}
            <code className="text-purple-300 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">
              MAX_CONCURRENT_SESSIONS
            </code>{" "}
            reached.
          </p>
          <CodeBlock code={`{ "error": "Maximum concurrent sessions reached" }`} language="json" />
        </div>
      </div>

      <p className="text-sm text-zinc-400 mt-10">
        Deploying to production? See the{" "}
        <Link href="/self-host" className="text-purple-300 underline underline-offset-4">
          self-host guide
        </Link>{" "}
        for the full hardening checklist (TLS termination, reverse proxy, secret rotation).
      </p>
    </div>
  );
}
