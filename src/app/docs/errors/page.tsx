import { CodeBlock } from "@/components/code-block";

export default function ErrorsPage() {
  return (
    <div>
      <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Guides</p>
      <h1 className="text-4xl font-bold text-white mb-4">Error Handling</h1>
      <p className="text-zinc-400 mb-10">
        All BrowseFleet API errors return a JSON body with an <code className="text-purple-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">error</code> field
        describing what went wrong.
      </p>

      <h2 className="text-2xl font-bold text-white mb-4">Error Response Format</h2>
      <CodeBlock code={`{
  "error": "Human-readable error message"
}`} language="json" />

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">HTTP Status Codes</h2>
      <div className="rounded-xl border border-zinc-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 border-b border-zinc-800">
            <tr>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Status</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Meaning</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">When It Happens</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            <tr><td className="px-4 py-3 text-xs text-emerald-400 font-semibold">200</td><td className="px-4 py-3 text-xs text-zinc-300">OK</td><td className="px-4 py-3 text-xs text-zinc-400">Request succeeded</td></tr>
            <tr><td className="px-4 py-3 text-xs text-emerald-400 font-semibold">201</td><td className="px-4 py-3 text-xs text-zinc-300">Created</td><td className="px-4 py-3 text-xs text-zinc-400">Session or profile created successfully</td></tr>
            <tr><td className="px-4 py-3 text-xs text-amber-400 font-semibold">400</td><td className="px-4 py-3 text-xs text-zinc-300">Bad Request</td><td className="px-4 py-3 text-xs text-zinc-400">Missing required parameter (e.g., url, task, actions)</td></tr>
            <tr><td className="px-4 py-3 text-xs text-amber-400 font-semibold">401</td><td className="px-4 py-3 text-xs text-zinc-300">Unauthorized</td><td className="px-4 py-3 text-xs text-zinc-400">Missing or invalid API key</td></tr>
            <tr><td className="px-4 py-3 text-xs text-amber-400 font-semibold">404</td><td className="px-4 py-3 text-xs text-zinc-300">Not Found</td><td className="px-4 py-3 text-xs text-zinc-400">Session, profile, or file not found</td></tr>
            <tr><td className="px-4 py-3 text-xs text-amber-400 font-semibold">429</td><td className="px-4 py-3 text-xs text-zinc-300">Too Many Requests</td><td className="px-4 py-3 text-xs text-zinc-400">Maximum concurrent sessions reached</td></tr>
            <tr><td className="px-4 py-3 text-xs text-red-400 font-semibold">500</td><td className="px-4 py-3 text-xs text-zinc-300">Internal Server Error</td><td className="px-4 py-3 text-xs text-zinc-400">Browser crashed, navigation failed, or unexpected server error</td></tr>
            <tr><td className="px-4 py-3 text-xs text-red-400 font-semibold">501</td><td className="px-4 py-3 text-xs text-zinc-300">Not Implemented</td><td className="px-4 py-3 text-xs text-zinc-400">Feature not configured (e.g., CAPTCHA solving without CAPTCHA_API_KEY)</td></tr>
            <tr><td className="px-4 py-3 text-xs text-red-400 font-semibold">503</td><td className="px-4 py-3 text-xs text-zinc-300">Service Unavailable</td><td className="px-4 py-3 text-xs text-zinc-400">Stripe not configured (billing endpoints only)</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Common Errors and Solutions</h2>
      <div className="space-y-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold text-amber-400 bg-amber-950/80 border border-amber-800/40 rounded-md px-2 py-0.5">400</span>
            <code className="text-xs text-zinc-300">&quot;url is required&quot;</code>
          </div>
          <p className="text-xs text-zinc-400">The scrape, screenshot, or pdf endpoint was called without a url field in the JSON body.</p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold text-amber-400 bg-amber-950/80 border border-amber-800/40 rounded-md px-2 py-0.5">400</span>
            <code className="text-xs text-zinc-300">&quot;actions array is required&quot;</code>
          </div>
          <p className="text-xs text-zinc-400">The Computer API was called without an actions array, or the array was empty.</p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold text-amber-400 bg-amber-950/80 border border-amber-800/40 rounded-md px-2 py-0.5">400</span>
            <code className="text-xs text-zinc-300">&quot;task is required&quot;</code>
          </div>
          <p className="text-xs text-zinc-400">The agent endpoint was called without a task field.</p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold text-amber-400 bg-amber-950/80 border border-amber-800/40 rounded-md px-2 py-0.5">400</span>
            <code className="text-xs text-zinc-300">&quot;name is required&quot;</code>
          </div>
          <p className="text-xs text-zinc-400">Create profile was called without a name field.</p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold text-amber-400 bg-amber-950/80 border border-amber-800/40 rounded-md px-2 py-0.5">429</span>
            <code className="text-xs text-zinc-300">&quot;Maximum concurrent sessions reached&quot;</code>
          </div>
          <p className="text-xs text-zinc-400">You have hit the MAX_CONCURRENT_SESSIONS limit. Release existing sessions before creating new ones.</p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold text-amber-400 bg-amber-950/80 border border-amber-800/40 rounded-md px-2 py-0.5">404</span>
            <code className="text-xs text-zinc-300">&quot;Session not found&quot;</code>
          </div>
          <p className="text-xs text-zinc-400">The session ID does not exist, or the session has already been released or expired.</p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-800/40 rounded-md px-2 py-0.5">500</span>
            <code className="text-xs text-zinc-300">&quot;Navigation failed: net::ERR_NAME_NOT_RESOLVED&quot;</code>
          </div>
          <p className="text-xs text-zinc-400">The URL could not be resolved. Check that the URL is valid and the DNS name exists.</p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-800/40 rounded-md px-2 py-0.5">500</span>
            <code className="text-xs text-zinc-300">&quot;Navigation timeout of 30000 ms exceeded&quot;</code>
          </div>
          <p className="text-xs text-zinc-400">The page took longer than the timeout to load. Increase the timeout parameter or check if the site is accessible.</p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-800/40 rounded-md px-2 py-0.5">501</span>
            <code className="text-xs text-zinc-300">&quot;CAPTCHA solving not configured. Set CAPTCHA_API_KEY.&quot;</code>
          </div>
          <p className="text-xs text-zinc-400">CAPTCHA solving was requested but no 2captcha API key is configured on the server.</p>
        </div>
      </div>
    </div>
  );
}
