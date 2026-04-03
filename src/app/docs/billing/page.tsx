import { EndpointBlock } from "@/components/endpoint-block";
import { CodeTabs } from "@/components/code-tabs";
import { CodeBlock } from "@/components/code-block";

export default function BillingPage() {
  return (
    <div>
      <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">API Reference</p>
      <h1 className="text-4xl font-bold text-white mb-4">Billing</h1>
      <p className="text-zinc-400 mb-10">
        BrowseFleet uses metered billing powered by Stripe. You are charged per browser-hour of active session time.
        Self-hosted instances can run without Stripe configuration.
      </p>

      <h2 className="text-2xl font-bold text-white mb-4">Pricing Tiers</h2>
      <div className="rounded-xl border border-zinc-800 overflow-hidden mb-10">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 border-b border-zinc-800">
            <tr>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Tier</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Base Price</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Rate</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Concurrent Sessions</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Daily Requests</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            <tr><td className="px-4 py-3 text-xs text-zinc-300">Hobby</td><td className="px-4 py-3 text-xs text-zinc-400">Free</td><td className="px-4 py-3 text-xs text-zinc-400">$0.10/hr</td><td className="px-4 py-3 text-xs text-zinc-400">5</td><td className="px-4 py-3 text-xs text-zinc-400">500</td></tr>
            <tr><td className="px-4 py-3 text-xs text-zinc-300">Starter</td><td className="px-4 py-3 text-xs text-zinc-400">$29/mo</td><td className="px-4 py-3 text-xs text-zinc-400">$0.10/hr</td><td className="px-4 py-3 text-xs text-zinc-400">10</td><td className="px-4 py-3 text-xs text-zinc-400">1,000</td></tr>
            <tr><td className="px-4 py-3 text-xs text-zinc-300">Developer</td><td className="px-4 py-3 text-xs text-zinc-400">$99/mo</td><td className="px-4 py-3 text-xs text-zinc-400">$0.08/hr</td><td className="px-4 py-3 text-xs text-zinc-400">20</td><td className="px-4 py-3 text-xs text-zinc-400">Unlimited</td></tr>
            <tr><td className="px-4 py-3 text-xs text-zinc-300">Pro</td><td className="px-4 py-3 text-xs text-zinc-400">$499/mo</td><td className="px-4 py-3 text-xs text-zinc-400">$0.05/hr</td><td className="px-4 py-3 text-xs text-zinc-400">100</td><td className="px-4 py-3 text-xs text-zinc-400">Unlimited</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-white mb-4">How Metered Billing Works</h2>
      <p className="text-sm text-zinc-400 mb-4">
        BrowseFleet tracks the duration of each browser session. When a session is released or expires, the total
        time is recorded as &quot;browser hours&quot; and reported to Stripe as a metered usage event. You are billed at the end
        of each billing cycle for total browser hours consumed.
      </p>

      {/* GET /v1/usage */}
      <h2 className="text-2xl font-bold text-white mt-10 mb-6">Usage Statistics</h2>
      <EndpointBlock
        method="GET"
        path="/v1/usage"
        description="Get usage statistics for the authenticated API key. Shows total sessions, browser hours, and daily breakdown."
        response={`{
  "totalSessions": 1250,
  "activeSessions": 3,
  "totalBrowserHours": 456.7,
  "todayBrowserHours": 12.3,
  "todayApiCalls": 89,
  "daily": [
    {
      "date": "2026-04-02",
      "sessions": 45,
      "browserHours": 12.3,
      "apiCalls": 89
    },
    {
      "date": "2026-04-01",
      "sessions": 52,
      "browserHours": 15.1,
      "apiCalls": 102
    }
  ],
  "currentPeriod": {
    "start": "2026-04-01T00:00:00.000Z",
    "end": "2026-05-01T00:00:00.000Z"
  }
}`}
      >
        <CodeTabs tabs={[
          { label: "curl", language: "bash", code: `curl https://api.browsefleet.com/v1/usage \\
  -H "x-api-key: bf_your_api_key"` },
          { label: "Node.js", language: "typescript", code: `const stats = await bf.usage();
console.log(\`Total: \${stats.totalBrowserHours} hours\`);
console.log(\`Today: \${stats.todayBrowserHours} hours\`);
console.log(\`Active: \${stats.activeSessions} sessions\`);` },
          { label: "Python", language: "python", code: `stats = bf.usage()
print(f"Total: {stats.total_browser_hours} hours")
print(f"Today: {stats.today_browser_hours} hours")
print(f"Active: {stats.active_sessions} sessions")` },
        ]} />
      </EndpointBlock>

      {/* Stripe endpoints */}
      <h2 className="text-2xl font-bold text-white mt-10 mb-6">Stripe Integration Endpoints</h2>

      <EndpointBlock
        method="POST"
        path="/v1/billing/checkout"
        description="Create a Stripe Checkout session for new subscription signup. Returns a URL to redirect the user to Stripe's hosted checkout page."
        params={[
          { name: "successUrl", type: "string", required: false, description: "URL to redirect to after successful checkout." },
          { name: "cancelUrl", type: "string", required: false, description: "URL to redirect to if checkout is cancelled." },
        ]}
        response={`{
  "checkoutUrl": "https://checkout.stripe.com/c/pay/cs_...",
  "sessionId": "cs_live_..."
}`}
      />

      <EndpointBlock
        method="POST"
        path="/v1/billing/portal"
        description="Create a Stripe Customer Portal session for managing subscription, payment methods, and invoices."
        params={[
          { name: "returnUrl", type: "string", required: false, description: "URL to redirect to after leaving the portal." },
        ]}
        response={`{
  "portalUrl": "https://billing.stripe.com/p/session/..."
}`}
      />

      <EndpointBlock
        method="POST"
        path="/v1/billing/webhook"
        description="Stripe webhook endpoint. Handles checkout.session.completed (creates API key), customer.subscription.deleted (deactivates key), and invoice.payment_failed (deactivates key). Requires stripe-signature header."
      />

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Self-Hosted Billing</h2>
      <p className="text-sm text-zinc-400 mb-4">
        Stripe integration is optional. If STRIPE_SECRET_KEY is not set, billing endpoints return HTTP 503
        and usage is still tracked locally in SQLite but not reported to Stripe. You can use the usage
        endpoint for your own billing implementation.
      </p>
    </div>
  );
}
