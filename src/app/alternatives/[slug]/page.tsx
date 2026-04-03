import { alternatives } from "@/data/alternatives";
import type { Metadata } from "next";

export function generateStaticParams() {
  return alternatives.map((alt) => ({ slug: alt.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const alt = alternatives.find((a) => a.slug === slug);
  if (!alt) return {};
  return {
    title: `BrowseFleet vs ${alt.name} — Cloud Browser API Comparison`,
    description: `Honest comparison of BrowseFleet and ${alt.name}. Features, pricing, self-hosting, and when to use each cloud browser API.`,
    openGraph: {
      title: `BrowseFleet vs ${alt.name}`,
      description: `Detailed comparison of BrowseFleet and ${alt.name} for browser automation and AI agents.`,
    },
  };
}

function FeatureRow({
  feature,
  browsefleet,
  competitor,
}: {
  feature: string;
  browsefleet: string;
  competitor: string;
}) {
  return (
    <tr className="border-b border-zinc-800/50">
      <td className="py-3 pr-4 text-sm font-medium text-white">{feature}</td>
      <td className="py-3 px-4 text-sm text-zinc-400">{browsefleet}</td>
      <td className="py-3 pl-4 text-sm text-zinc-400">{competitor}</td>
    </tr>
  );
}

export default async function AlternativePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const alt = alternatives.find((a) => a.slug === slug);
  if (!alt) return <div>Not found</div>;

  const featureEntries = Object.entries(alt.features);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-16">
          <p className="text-sm font-semibold text-purple-400 uppercase tracking-widest mb-4">
            Comparison
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
            BrowseFleet vs {alt.name}
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
            {alt.description}
          </p>
        </div>
      </section>

      {/* Side-by-side summary */}
      <section className="border-b border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
              <p className="text-sm font-semibold text-purple-400 uppercase tracking-widest mb-3">
                {alt.name} Strengths
              </p>
              <ul className="space-y-2">
                {alt.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-zinc-500" />
                    <span className="text-sm text-zinc-400">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-purple-500/30 bg-purple-950/10 p-6">
              <p className="text-sm font-semibold text-purple-400 uppercase tracking-widest mb-3">
                Where BrowseFleet Wins
              </p>
              <ul className="space-y-2">
                {alt.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-400" />
                    <span className="text-sm text-zinc-400">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="border-b border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-white mb-8">
            Feature Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="pb-3 pr-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Feature
                  </th>
                  <th className="pb-3 px-4 text-left text-xs font-semibold text-purple-400 uppercase tracking-wider">
                    BrowseFleet
                  </th>
                  <th className="pb-3 pl-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    {alt.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {featureEntries.map(([feature, values]) => (
                  <FeatureRow
                    key={feature}
                    feature={feature}
                    browsefleet={values.browsefleet}
                    competitor={values.competitor}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing comparison */}
      <section className="border-b border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-white mb-4">
            Pricing Comparison
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            {alt.pricingComparison}
          </p>
        </div>
      </section>

      {/* Verdict */}
      <section className="border-b border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-white mb-4">Verdict</h2>
          <p className="text-zinc-400 leading-relaxed">{alt.verdict}</p>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to try BrowseFleet?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
            Get started in under 2 minutes with a free tier. No credit card
            required.
          </p>
          <div className="flex items-center justify-center gap-4">
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
