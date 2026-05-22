import type { Metadata } from "next";
import Link from "next/link";
import { GitHubStarButton } from "@/components/github-star-button";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "BrowseFleet is free and open source under MIT. You host it. Self-hosting cost breakdown plus how to support development.",
};

const SELF_HOST_COSTS = [
  {
    host: "Hetzner CX22",
    cost: "~$4/mo",
    sessions: "~10 concurrent",
    note: "Smallest VPS that comfortably runs the default pool. Best dollar-per-session.",
  },
  {
    host: "Fly.io performance-2x",
    cost: "~$15/mo",
    sessions: "~20 concurrent",
    note: "Managed TLS, restarts, regional routing. Zero ops.",
  },
  {
    host: "AWS ECS Fargate (1 task)",
    cost: "~$30/mo",
    sessions: "~25 concurrent",
    note: "Standard task definition, EFS volume, ALB in front.",
  },
  {
    host: "Dedicated 24GB box",
    cost: "~$40/mo",
    sessions: "50+ concurrent",
    note: "Hetzner CCX23 or equivalent. The cheapest path past 30 sessions.",
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">
        Pricing
      </p>
      <h1 className="text-5xl font-bold tracking-tight text-white mb-6">Free. You host it.</h1>
      <p className="text-lg text-zinc-400 leading-relaxed mb-12">
        BrowseFleet is MIT licensed. There is no hosted offering operated by this project, no
        per-browser-hour billing, no usage cap. You run the Docker image on infrastructure you
        control; the only cost is your VPS.
      </p>

      <section className="mb-16 rounded-xl border border-zinc-800 bg-zinc-900/30 p-8">
        <h2 className="text-2xl font-bold text-white mb-4">What you pay</h2>
        <p className="text-sm text-zinc-400 leading-relaxed mb-6">
          Your hosting bill. That is it. The image is published to GHCR, both SDKs are on npm and
          PyPI; pulling and installing is free.
        </p>
        <div className="overflow-x-auto rounded-lg border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/50">
              <tr className="text-left text-zinc-400">
                <th className="px-5 py-3 font-medium">Host</th>
                <th className="px-5 py-3 font-medium">Roughly</th>
                <th className="px-5 py-3 font-medium">Concurrent sessions</th>
                <th className="px-5 py-3 font-medium">When to pick it</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50 text-zinc-300">
              {SELF_HOST_COSTS.map((row) => (
                <tr key={row.host}>
                  <td className="px-5 py-3 font-medium text-white">{row.host}</td>
                  <td className="px-5 py-3 text-purple-300">{row.cost}</td>
                  <td className="px-5 py-3">{row.sessions}</td>
                  <td className="px-5 py-3 text-zinc-400">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-4">What you don&apos;t pay</h2>
        <ul className="space-y-3 text-sm text-zinc-300">
          {[
            "No per-browser-hour metering.",
            "No seat licenses.",
            "No paid tier for stealth, agent, or operator mode (all in the base image).",
            "No support contract required to run the project.",
            "No CLA, no copyright assignment when you contribute.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-400" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-4">If you want a hosted version</h2>
        <p className="text-sm text-zinc-400 leading-relaxed mb-4">
          This project does not run one. Two paths that work today:
        </p>
        <ul className="space-y-3 text-sm text-zinc-300">
          <li className="flex items-start gap-3">
            <span className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-zinc-600" />
            <span className="leading-relaxed">
              Spin up the Docker image on Fly.io or Railway and point the SDK at it. You are the
              host; takes about 10 minutes.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-zinc-600" />
            <span className="leading-relaxed">
              Use{" "}
              <Link
                href="/comparison"
                className="text-purple-300 hover:text-purple-200 underline underline-offset-4"
              >
                a hosted competitor
              </Link>{" "}
              like Steel.dev or Browserbase. The honest comparison is on the comparison page.
            </span>
          </li>
        </ul>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-4">Supporting development</h2>
        <p className="text-sm text-zinc-400 leading-relaxed mb-6">
          The project is maintained by one person. The two things that help most:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
            <h3 className="text-base font-semibold text-white mb-2">Star and share</h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              The single highest-leverage thing. GitHub stars drive discovery, which drives
              contributors, which drives the project forward.
            </p>
            <GitHubStarButton />
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
            <h3 className="text-base font-semibold text-white mb-2">Contribute</h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Bugs, docs, examples, SDK methods, new language SDKs. Read the CONTRIBUTING file in
              any of the four repos.
            </p>
            <Link
              href="https://github.com/theRJMurray/browsefleet/blob/master/CONTRIBUTING.md"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-500 hover:text-white"
            >
              Contributing guide
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-8 text-center">
        <h2 className="text-xl font-bold text-white mb-3">Read the deployment guide</h2>
        <p className="text-sm text-zinc-400 mb-6 max-w-xl mx-auto">
          Step-by-step recipes for Hetzner, Fly.io, and AWS ECS, plus a production checklist.
        </p>
        <Link
          href="/self-host"
          className="inline-block rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-500 transition-colors"
        >
          Self-host guide
        </Link>
      </section>
    </div>
  );
}
