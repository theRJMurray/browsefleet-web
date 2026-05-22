import { useCases } from "@/data/use-cases";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return useCases.map((uc) => ({ slug: uc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const uc = useCases.find((u) => u.slug === slug);
  if (!uc) return {};
  return {
    title: `${uc.title} with BrowseFleet — Cloud Browser API`,
    description: `Use BrowseFleet for ${uc.title.toLowerCase()}. ${uc.description.slice(0, 120)}`,
    openGraph: {
      title: `${uc.title} with BrowseFleet`,
      description: uc.description,
    },
  };
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const uc = useCases.find((u) => u.slug === slug);
  if (!uc) notFound();

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-16">
          <p className="text-sm font-semibold text-purple-400 uppercase tracking-widest mb-4">
            Use Case
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
            {uc.title} with BrowseFleet
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
            {uc.description}
          </p>
        </div>
      </section>

      {/* Problem */}
      <section className="border-b border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-white mb-4">The Problem</h2>
          <p className="text-zinc-400 leading-relaxed">{uc.problem}</p>
        </div>
      </section>

      {/* Solution */}
      <section className="border-b border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-white mb-4">The Solution</h2>
          <p className="text-zinc-400 leading-relaxed mb-8">{uc.solution}</p>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/50">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-[10px] text-zinc-600">example.ts</span>
            </div>
            <pre className="p-5 text-[13px] leading-relaxed text-zinc-300 overflow-x-auto">
              <code>{uc.codeExample}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Features Used */}
      <section className="border-b border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            Features Used
          </h2>
          <div className="flex flex-wrap gap-3">
            {uc.featuresUsed.map((feature) => (
              <span
                key={feature}
                className="rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-300"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-white mb-6">Benefits</h2>
          <ul className="space-y-3">
            {uc.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-400" />
                <span className="text-sm text-zinc-400">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Internal links */}
      <section className="border-b border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-white mb-6">Learn More</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/docs/quickstart"
              className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 hover:border-zinc-600 transition-colors"
            >
              <p className="text-sm font-semibold text-white mb-1">Quickstart Guide</p>
              <p className="text-xs text-zinc-500">Get up and running in 2 minutes</p>
            </Link>
            <Link
              href="/docs/sessions"
              className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 hover:border-zinc-600 transition-colors"
            >
              <p className="text-sm font-semibold text-white mb-1">Sessions API</p>
              <p className="text-xs text-zinc-500">Full reference for browser sessions</p>
            </Link>
            <Link
              href="/docs/stealth"
              className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 hover:border-zinc-600 transition-colors"
            >
              <p className="text-sm font-semibold text-white mb-1">Stealth Mode</p>
              <p className="text-xs text-zinc-500">Anti-detection configuration</p>
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 hover:border-zinc-600 transition-colors"
            >
              <p className="text-sm font-semibold text-white mb-1">Pricing</p>
              <p className="text-xs text-zinc-500">Plans starting with a free tier</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start building today</h2>
          <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
            BrowseFleet is open source and MIT licensed. One docker command to a working server; you host it.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="https://github.com/theRJMurray/browsefleet"
              className="rounded-lg bg-purple-600 px-8 py-3 text-sm font-semibold text-white hover:bg-purple-500 transition-colors"
            >
              Star on GitHub
            </a>
            <Link
              href="/self-host"
              className="rounded-lg border border-zinc-700 px-8 py-3 text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
            >
              Self-host guide
            </Link>
            <Link
              href="/docs"
              className="rounded-lg border border-zinc-700 px-8 py-3 text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
            >
              Documentation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
