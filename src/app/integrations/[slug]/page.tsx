import { integrations } from "@/data/integrations";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return integrations.map((int) => ({ slug: int.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const int = integrations.find((i) => i.slug === slug);
  if (!int) return {};
  return {
    title: `BrowseFleet + ${int.name} — Integration Guide`,
    description: `Connect ${int.name} to BrowseFleet cloud browsers. Installation, code examples, and supported features.`,
    openGraph: {
      title: `BrowseFleet + ${int.name}`,
      description: int.description.slice(0, 160),
    },
  };
}

export default async function IntegrationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const int = integrations.find((i) => i.slug === slug);
  if (!int) notFound();

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-16">
          <p className="text-sm font-semibold text-purple-400 uppercase tracking-widest mb-4">
            Integration
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
            BrowseFleet + {int.name}
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
            {int.description}
          </p>
        </div>
      </section>

      {/* Installation */}
      <section className="border-b border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-white mb-6">Installation</h2>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/50">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-[10px] text-zinc-600">terminal</span>
            </div>
            <pre className="p-5 text-[13px] leading-relaxed text-zinc-300 overflow-x-auto">
              <code>{int.installation}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Code example */}
      <section className="border-b border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            Code Example
          </h2>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/50">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-[10px] text-zinc-600">example</span>
            </div>
            <pre className="p-5 text-[13px] leading-relaxed text-zinc-300 overflow-x-auto">
              <code>{int.codeExample}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Features supported */}
      <section className="border-b border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            Supported Features
          </h2>
          <ul className="space-y-3">
            {int.featuresSupported.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-400" />
                <span className="text-sm text-zinc-400">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Related links */}
      <section className="border-b border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-white mb-6">Related</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/docs/quickstart"
              className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 hover:border-zinc-600 transition-colors"
            >
              <p className="text-sm font-semibold text-white mb-1">Quickstart</p>
              <p className="text-xs text-zinc-500">Get started in 2 minutes</p>
            </Link>
            <Link
              href="/docs/sessions"
              className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 hover:border-zinc-600 transition-colors"
            >
              <p className="text-sm font-semibold text-white mb-1">Sessions API</p>
              <p className="text-xs text-zinc-500">Full session reference</p>
            </Link>
            <Link
              href="/docs/sdks"
              className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 hover:border-zinc-600 transition-colors"
            >
              <p className="text-sm font-semibold text-white mb-1">SDKs</p>
              <p className="text-xs text-zinc-500">Language-specific SDKs</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Try BrowseFleet with {int.name}
          </h2>
          <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
            Free tier includes 500 daily requests. Connect {int.name} in minutes.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/docs/quickstart"
              className="rounded-lg bg-purple-600 px-8 py-3 text-sm font-semibold text-white hover:bg-purple-500 transition-colors"
            >
              Get Started
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
