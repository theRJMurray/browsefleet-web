import { audiences } from "@/data/audiences";
import type { Metadata } from "next";

export function generateStaticParams() {
  return audiences.map((aud) => ({ slug: aud.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const aud = audiences.find((a) => a.slug === slug);
  if (!aud) return {};
  return {
    title: `BrowseFleet for ${aud.title} — Cloud Browser API`,
    description: `BrowseFleet helps ${aud.title.toLowerCase()} with cloud browser automation. ${aud.description.slice(0, 100)}`,
    openGraph: {
      title: `BrowseFleet for ${aud.title}`,
      description: aud.description.slice(0, 160),
    },
  };
}

export default async function AudiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const aud = audiences.find((a) => a.slug === slug);
  if (!aud) return <div>Not found</div>;

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-16">
          <p className="text-sm font-semibold text-purple-400 uppercase tracking-widest mb-4">
            Built For You
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
            BrowseFleet for {aud.title}
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
            {aud.description}
          </p>
        </div>
      </section>

      {/* Pain points */}
      <section className="border-b border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            The Challenges You Face
          </h2>
          <ul className="space-y-4">
            {aud.painPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-zinc-500" />
                <span className="text-sm text-zinc-400 leading-relaxed">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How BrowseFleet helps */}
      <section className="border-b border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            How BrowseFleet Helps
          </h2>
          <ul className="space-y-4">
            {aud.howBrowseFleetHelps.map((help, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-400" />
                <span className="text-sm text-zinc-400 leading-relaxed">
                  {help}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Relevant features */}
      <section className="border-b border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            Relevant Features
          </h2>
          <div className="flex flex-wrap gap-3">
            {aud.relevantFeatures.map((feature) => (
              <a
                key={feature}
                href={`/docs/${feature.toLowerCase().replace(/\s+/g, "-")}`}
                className="rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
              >
                {feature}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Related pages */}
      <section className="border-b border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-white mb-6">Explore</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="/use-cases/web-scraping"
              className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 hover:border-zinc-600 transition-colors"
            >
              <p className="text-sm font-semibold text-white mb-1">Web Scraping</p>
              <p className="text-xs text-zinc-500">Extract data from any website at scale</p>
            </a>
            <a
              href="/use-cases/ai-agents"
              className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 hover:border-zinc-600 transition-colors"
            >
              <p className="text-sm font-semibold text-white mb-1">AI Web Agents</p>
              <p className="text-xs text-zinc-500">Build agents that browse the web</p>
            </a>
            <a
              href="/integrations/puppeteer"
              className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 hover:border-zinc-600 transition-colors"
            >
              <p className="text-sm font-semibold text-white mb-1">Puppeteer Integration</p>
              <p className="text-xs text-zinc-500">One-line connection to cloud browsers</p>
            </a>
            <a
              href="/blog"
              className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 hover:border-zinc-600 transition-colors"
            >
              <p className="text-sm font-semibold text-white mb-1">Blog</p>
              <p className="text-xs text-zinc-500">Guides, tutorials, and best practices</p>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{aud.cta}</h2>
          <div className="flex items-center justify-center gap-4 mt-8">
            <a
              href="/docs/quickstart"
              className="rounded-lg bg-purple-600 px-8 py-3 text-sm font-semibold text-white hover:bg-purple-500 transition-colors"
            >
              Get Started
            </a>
            <a
              href="/pricing"
              className="rounded-lg border border-zinc-700 px-8 py-3 text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
