import Link from "next/link";
import { HeroBrowserAnimation } from "@/components/hero-browser-animation";

const FEATURES = [
  {
    title: "Sessions API",
    description: "Launch managed browser sessions via API. Connect with Puppeteer, Playwright, or Selenium through CDP WebSocket.",
  },
  {
    title: "Stealth Mode",
    description: "Built-in anti-detection with fingerprint spoofing, WebDriver masking, and timezone matching. Pass bot checks by default.",
  },
  {
    title: "Quick Actions",
    description: "One-call scrape, screenshot, or PDF. Returns cleaned HTML, markdown, and readability-optimized text.",
  },
  {
    title: "Computer API",
    description: "Click, type, scroll, navigate. Built for Claude, GPT, and Gemini Computer Use. Every action returns a screenshot.",
  },
  {
    title: "CAPTCHA Solving",
    description: "Automatic CAPTCHA detection and solving via 2captcha integration. reCAPTCHA, hCaptcha, and Turnstile supported.",
  },
  {
    title: "Proxy Support",
    description: "Per-session proxy URLs with SOCKS5 and HTTP support. Built-in proxy authentication handling.",
  },
  {
    title: "Cookie Persistence",
    description: "Save and restore browser profiles across sessions. Cookies, localStorage, and auth state persist automatically.",
  },
  {
    title: "Self-Hostable",
    description: "Run BrowseFleet on your own infrastructure. Single Docker container, no external dependencies.",
  },
];

const TIERS = [
  { name: "Hobby", price: "Free", rate: "$0.10/hr", sessions: "5 concurrent", daily: "500 requests", highlight: false },
  { name: "Starter", price: "$29", rate: "$0.10/hr", sessions: "10 concurrent", daily: "1,000 requests", highlight: false },
  { name: "Developer", price: "$99", rate: "$0.08/hr", sessions: "20 concurrent", daily: "Unlimited", highlight: true },
  { name: "Pro", price: "$499", rate: "$0.05/hr", sessions: "100 concurrent", daily: "Unlimited", highlight: false },
];

const CODE_EXAMPLE = `import { BrowseFleet } from 'browsefleet';
import puppeteer from 'puppeteer-core';

const bf = new BrowseFleet({ apiKey: 'bf_...' });

// Launch a stealth browser session
const session = await bf.sessions.create({
  stealth: 'full',
  viewport: { width: 1920, height: 1080 },
});

// Connect Puppeteer to the cloud browser
const browser = await puppeteer.connect({
  browserWSEndpoint: session.websocketUrl,
});

const page = await browser.newPage();
await page.goto('https://example.com');

// Or use quick actions — no session needed
const { markdown } = await bf.scrape('https://example.com');
console.log(markdown);`;

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-purple-400 uppercase tracking-widest mb-4">
                Cloud Browser API
              </p>
              <h1 className="text-5xl font-bold tracking-tight text-white leading-tight mb-6">
                Headless browsers for
                <br />
                AI agents and developers
              </h1>
              <p className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-xl">
                Launch managed browser sessions in the cloud. Connect with Puppeteer, Playwright, or Selenium.
                Built-in stealth, CAPTCHA solving, and proxy rotation.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="/docs/quickstart"
                  className="rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-500 transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  href="/docs"
                  className="rounded-lg border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
                >
                  Read the Docs
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <HeroBrowserAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="border-t border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">One-Line Integration</p>
              <h2 className="text-3xl font-bold text-white mb-4">Connect your existing tools</h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                BrowseFleet returns a standard CDP WebSocket URL. Connect any browser automation library
                you already use. One line to switch from local to cloud.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-purple-400" />
                  <p className="text-sm text-zinc-400">Sessions start in under 1 second</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-purple-400" />
                  <p className="text-sm text-zinc-400">Run up to 100 concurrent browsers</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-purple-400" />
                  <p className="text-sm text-zinc-400">Stealth mode passes all bot detection</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/50">
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                <span className="ml-2 text-[10px] text-zinc-600">example.ts</span>
              </div>
              <pre className="p-5 text-[13px] leading-relaxed text-zinc-300 overflow-x-auto">
                <code>{CODE_EXAMPLE}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-3xl font-bold text-white">Everything you need for browser automation</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
                <h3 className="text-sm font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-zinc-800/50" id="pricing">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="text-3xl font-bold text-white">Simple, usage-based pricing</h2>
            <p className="text-sm text-zinc-500 mt-3">Pay per browser-hour. No hidden fees. Self-host for free.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
                <p className="text-3xl font-bold text-white mt-2">{tier.price}<span className="text-sm font-normal text-zinc-500">/mo</span></p>
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
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to automate the web?</h2>
          <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
            Get started in under 2 minutes. Free tier includes 500 requests per day.
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
