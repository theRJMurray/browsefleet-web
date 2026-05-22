import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BrowseFleet vs Steel, Browserbase, raw Playwright",
  description:
    "Honest comparison of BrowseFleet against Steel.dev, Browserbase, and using Puppeteer or Playwright directly. Includes what each does better than us.",
};

const ROWS: Array<{ label: string; bf: string; steel: string; browserbase: string; raw: string }> = [
  { label: "License", bf: "MIT", steel: "Apache 2.0", browserbase: "Proprietary", raw: "MIT (the libs)" },
  { label: "Self-host", bf: "Yes (default)", steel: "Yes (open core)", browserbase: "No", raw: "You build it" },
  { label: "Hosted SaaS", bf: "No", steel: "Yes", browserbase: "Yes", raw: "No" },
  { label: "Stealth", bf: "Yes", steel: "Yes", browserbase: "Yes", raw: "Bring your own" },
  { label: "Profile persistence", bf: "Yes", steel: "Yes", browserbase: "Yes", raw: "Bring your own" },
  { label: "Human-in-the-loop control", bf: "Yes (operator mode)", steel: "Partial", browserbase: "No", raw: "Bring your own" },
  { label: "AI agent layer", bf: "Yes (built in)", steel: "Yes (separate product)", browserbase: "Stagehand SDK", raw: "Bring your own" },
  { label: "Official SDKs", bf: "Node, Python", steel: "Node, Python", browserbase: "Node, Python", raw: "Native" },
  { label: "CDP passthrough", bf: "Yes", steel: "Yes", browserbase: "Yes", raw: "Direct" },
  { label: "Price (hosted)", bf: "n/a", steel: "~$99/mo + browser-hours", browserbase: "~$99/mo + browser-hours", raw: "Infra only" },
  { label: "Price (self-hosted)", bf: "Infra only", steel: "Infra only", browserbase: "n/a", raw: "Infra only" },
];

export default function ComparisonPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">
        Comparison
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
        BrowseFleet vs the alternatives
      </h1>
      <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl mb-10">
        Honest comparison. Each alternative does at least one thing better than us; we are explicit
        about what. The longer-form discussion of when to pick each lives in the{" "}
        <Link
          href="https://github.com/theRJMurray/browsefleet/blob/master/docs/comparison.md"
          className="text-purple-300 hover:text-purple-200 underline underline-offset-4"
        >
          server repo&apos;s docs/comparison.md
        </Link>
        .
      </p>

      <div className="overflow-x-auto rounded-xl border border-zinc-800 mb-16">
        <table className="w-full text-sm min-w-[800px]">
          <thead className="bg-zinc-900/50">
            <tr className="text-left text-zinc-400">
              <th className="px-5 py-3 font-medium"></th>
              <th className="px-5 py-3 font-medium text-purple-300">BrowseFleet</th>
              <th className="px-5 py-3 font-medium">Steel.dev</th>
              <th className="px-5 py-3 font-medium">Browserbase</th>
              <th className="px-5 py-3 font-medium">Raw Playwright / Puppeteer</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50 text-zinc-300">
            {ROWS.map((row) => (
              <tr key={row.label}>
                <td className="px-5 py-3 text-zinc-400">{row.label}</td>
                <td className="px-5 py-3">{row.bf}</td>
                <td className="px-5 py-3">{row.steel}</td>
                <td className="px-5 py-3">{row.browserbase}</td>
                <td className="px-5 py-3">{row.raw}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Pick Steel.dev when</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            You want hosted and you do not want to be in the infrastructure business. You are
            willing to pay a per-browser-hour price.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Pick Browserbase when</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            You are funded, you do not want to operate infrastructure, you want SOC2 today, and
            you want a polished operator dashboard.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Pick raw Playwright / Puppeteer when</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Small project, one process, one language, no operator-mode requirement, willing to
            write the lifecycle and stealth setup yourself.
          </p>
        </div>
        <div className="rounded-xl border border-purple-500/50 bg-purple-950/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Pick BrowseFleet when</h3>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Multiple consumers, multiple languages, want operator mode for free, want stealth tuned
            and randomized for free, budget-constrained, audit-required, or you simply prefer to own
            the artifact you depend on.
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-8 text-center">
        <h2 className="text-xl font-bold text-white mb-3">Read the longer version</h2>
        <p className="text-sm text-zinc-400 mb-6 max-w-xl mx-auto">
          The full comparison page in the server repo includes per-feature breakdowns and a list of
          what is NOT a fair comparison (Apify, Selenium Grid, raw headless Chrome).
        </p>
        <Link
          href="https://github.com/theRJMurray/browsefleet/blob/master/docs/comparison.md"
          className="inline-block rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-500 transition-colors"
        >
          docs/comparison.md
        </Link>
      </section>
    </div>
  );
}
