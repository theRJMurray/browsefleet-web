import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BrowseFleet roadmap",
  description:
    "Where BrowseFleet is going next. Phases not dates. Read alongside the GitHub Projects board for live status.",
};

const SHIPPED = [
  {
    title: "OSS conversion",
    note: "All four repos (server, Node SDK, Python SDK, marketing site) MIT-licensed and public. Hosted-billing path removed.",
  },
  {
    title: "Operator mode",
    note: "Human-in-the-loop sessions with the agent / human / paused control state machine. Live viewer + event stream over SSE.",
  },
  {
    title: "Vision agent",
    note: "Built-in vision-based agent that takes a natural-language task and drives the browser using Claude or GPT.",
  },
  {
    title: "Profile persistence",
    note: "Persistent Chrome user-data directories for login state across sessions.",
  },
];

const SHIPPING = [
  {
    title: "First public release (v1.0.0)",
    note:
      "Multi-arch Docker image on GHCR, Node SDK on npm with provenance, Python SDK on PyPI via Trusted Publishing. Coordinated launch across all four repos.",
  },
  {
    title: "Show HN",
    note: "Drafted; fires when v1.0.0 publishes cleanly.",
  },
];

const NEXT = [
  {
    title: "OpenAPI 3.0 spec generation",
    note: "Generate openapi.json from the server's zod schemas so the SDKs can be partly auto-generated and third-party clients have a contract to read.",
  },
  {
    title: "More SDK language coverage",
    note: "Go and Rust. Community PRs welcome.",
  },
  {
    title: "Test coverage on the existing SDKs",
    note: "SSE streaming, file upload, profile lifecycle, release_all / release_batch.",
  },
  {
    title: "mkdocs-material site for the Python SDK",
    note: "Currently README + skill.md + docstrings. mkdocs adds searchable HTML reference.",
  },
  {
    title: "First-party Playwright Connect-by-CDP example",
    note: "Today the SDK exposes the websocketUrl and puppeteer-core.connect() is documented; Playwright equivalent should ship as a first-class example.",
  },
];

const NOT_PLANNED = [
  "A hosted SaaS version operated by this project.",
  "Telemetry, phone-home, or auto-update behavior.",
  "Anti-detection improvements aimed specifically at sites that have opted out via robots.txt or ToS.",
  "A built-in admin web UI. SSE endpoints + the SDK are the contract; consumers build their own UIs.",
];

function Card({ title, note }: { title: string; note: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
      <h3 className="text-sm font-semibold text-white mb-2">{title}</h3>
      <p className="text-xs text-zinc-500 leading-relaxed">{note}</p>
    </div>
  );
}

export default function RoadmapPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">
        Roadmap
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-white mb-4">Roadmap</h1>
      <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl mb-12">
        Phases, not dates. We sequence work by what unblocks the most users; we do not publish
        deadlines because we cannot honor them honestly. For live status on individual items, see the
        {" "}
        <Link
          href="https://github.com/theRJMurray/browsefleet/issues"
          className="text-purple-300 hover:text-purple-200 underline underline-offset-4"
        >
          server repo&apos;s Issues
        </Link>
        .
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-5">Shipped</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SHIPPED.map((item) => <Card key={item.title} {...item} />)}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-5">Shipping now</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SHIPPING.map((item) => <Card key={item.title} {...item} />)}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-5">Next</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {NEXT.map((item) => <Card key={item.title} {...item} />)}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-5">Not planned</h2>
        <p className="text-sm text-zinc-400 leading-relaxed mb-4">
          Things we have considered and decided not to do.
        </p>
        <ul className="space-y-2 text-sm text-zinc-300">
          {NOT_PLANNED.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-zinc-600" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-8 text-center">
        <h2 className="text-xl font-bold text-white mb-3">Have an idea?</h2>
        <p className="text-sm text-zinc-400 mb-6 max-w-xl mx-auto">
          Open a Discussion on the server repo. Significant feature proposals should land there
          before code lands.
        </p>
        <Link
          href="https://github.com/theRJMurray/browsefleet/discussions"
          className="inline-block rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-500 transition-colors"
        >
          Open a Discussion
        </Link>
      </section>
    </div>
  );
}
