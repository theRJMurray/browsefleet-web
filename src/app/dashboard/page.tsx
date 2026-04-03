export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-white mb-4">Dashboard</h1>
      <p className="text-zinc-400 mb-8">
        Manage your API keys, monitor usage, and view your billing.
      </p>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-12 text-center">
        <p className="text-2xl font-bold text-white mb-3">Coming Soon</p>
        <p className="text-sm text-zinc-500 mb-6">
          The self-serve dashboard is under development. For now, contact us to get your API key.
        </p>
        <a
          href="mailto:rj@browsefleet.com"
          className="inline-block rounded-lg bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-purple-500 transition-colors"
        >
          Request API Key
        </a>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Quick Start</p>
          <p className="text-sm text-zinc-400">
            Set your API key as an environment variable:
          </p>
          <code className="block mt-2 text-xs text-purple-400 bg-zinc-900 rounded p-2">
            export BROWSEFLEET_API_KEY=bf_...
          </code>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">API Base URL</p>
          <p className="text-sm text-zinc-400 mb-2">
            Point your SDK to:
          </p>
          <code className="block text-xs text-purple-400 bg-zinc-900 rounded p-2">
            https://api.browsefleet.com
          </code>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Self-Host</p>
          <p className="text-sm text-zinc-400 mb-2">
            Run your own instance:
          </p>
          <code className="block text-xs text-purple-400 bg-zinc-900 rounded p-2">
            docker run -p 3000:3000 browsefleet
          </code>
        </div>
      </div>
    </div>
  );
}
