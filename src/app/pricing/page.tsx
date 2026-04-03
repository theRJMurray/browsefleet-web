import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — BrowseFleet",
  description:
    "Simple, usage-based pricing for cloud browser sessions. Free tier with 500 requests per day. No hidden fees. Self-host for free.",
  openGraph: {
    title: "BrowseFleet Pricing",
    description:
      "Usage-based pricing for cloud browser sessions. Free tier included. Self-host for free.",
  },
};

const TIERS = [
  { name: "Hobby", price: "Free", rate: "$0.10/hr", sessions: "5 concurrent", daily: "500 requests", highlight: false },
  { name: "Starter", price: "$29", rate: "$0.10/hr", sessions: "10 concurrent", daily: "1,000 requests", highlight: false },
  { name: "Developer", price: "$99", rate: "$0.08/hr", sessions: "20 concurrent", daily: "Unlimited", highlight: true },
  { name: "Pro", price: "$499", rate: "$0.05/hr", sessions: "100 concurrent", daily: "Unlimited", highlight: false },
];

export default function PricingPage() {
  return (
    <div>
      <section className="border-b border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">
          <p className="text-sm font-semibold text-purple-400 uppercase tracking-widest mb-4">
            Pricing
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
            Simple, usage-based pricing
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
            Pay per browser-hour. No hidden fees. Every plan includes stealth mode, CAPTCHA solving,
            and CDP WebSocket access. Self-host for free.
          </p>
        </div>
      </section>

      <section>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-xl border p-6 ${
                  tier.highlight
                    ? "border-purple-500/50 bg-purple-950/20"
                    : "border-zinc-800 bg-zinc-900/30"
                }`}
              >
                {tier.highlight && (
                  <p className="text-[10px] font-semibold text-purple-400 uppercase tracking-widest mb-3">Most Popular</p>
                )}
                <p className="text-sm font-semibold text-white">{tier.name}</p>
                <p className="text-3xl font-bold text-white mt-2">
                  {tier.price}<span className="text-sm font-normal text-zinc-500">/mo</span>
                </p>
                <p className="text-xs text-purple-400 mt-1">{tier.rate} browser time</p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-zinc-600" />
                    <p className="text-xs text-zinc-400">{tier.sessions}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-zinc-600" />
                    <p className="text-xs text-zinc-400">{tier.daily}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-zinc-600" />
                    <p className="text-xs text-zinc-400">Stealth mode</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-zinc-600" />
                    <p className="text-xs text-zinc-400">CDP WebSocket</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-zinc-600" />
                    <p className="text-xs text-zinc-400">CAPTCHA solving</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-zinc-600" />
                    <p className="text-xs text-zinc-400">Proxy support</p>
                  </div>
                </div>
                <Link
                  href="/dashboard"
                  className={`block text-center mt-6 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                    tier.highlight
                      ? "bg-purple-600 text-white hover:bg-purple-500"
                      : "border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-xl border border-zinc-800 bg-zinc-900/30 p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-3">Self-Host for Free</h2>
            <p className="text-sm text-zinc-400 max-w-xl mx-auto mb-6">
              Run BrowseFleet on your own infrastructure with no usage limits. Single Docker container,
              no external dependencies. Full access to every feature.
            </p>
            <Link
              href="/docs/self-hosting"
              className="inline-block rounded-lg border border-zinc-700 px-6 py-2.5 text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
            >
              Self-Hosting Guide
            </Link>
          </div>

          <div className="mt-16">
            <h2 className="text-xl font-bold text-white mb-6 text-center">Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
                <h3 className="text-sm font-semibold text-white mb-2">What counts as a browser-hour?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  A browser-hour is one browser session running for one hour. A session that runs for 30 minutes
                  costs half a browser-hour. Quick actions (scrape, screenshot, PDF) are billed at the same rate
                  based on session duration.
                </p>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
                <h3 className="text-sm font-semibold text-white mb-2">Can I switch plans?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Yes. Upgrade or downgrade at any time. Changes take effect on your next billing cycle.
                  No long-term contracts or cancellation fees.
                </p>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
                <h3 className="text-sm font-semibold text-white mb-2">Is the self-hosted version feature-complete?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Yes. The self-hosted version includes every feature: sessions, stealth, CAPTCHA solving,
                  Computer API, agent, profiles, and quick actions. No features are gated behind the cloud version.
                </p>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
                <h3 className="text-sm font-semibold text-white mb-2">Do you offer enterprise plans?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  For teams needing more than 100 concurrent sessions, dedicated infrastructure, or custom SLAs,
                  reach out and we will put together a plan that fits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
            Free tier includes 500 requests per day and 5 concurrent sessions. No credit card required.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/dashboard" className="rounded-lg bg-purple-600 px-8 py-3 text-sm font-semibold text-white hover:bg-purple-500 transition-colors">
              Start Free
            </Link>
            <Link href="/docs" className="rounded-lg border border-zinc-700 px-8 py-3 text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors">
              Documentation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
