import { blogPosts } from "@/data/blog-posts";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — BrowseFleet",
  description:
    "Technical guides, tutorials, and best practices for browser automation, web scraping, and AI agents.",
  openGraph: {
    title: "BrowseFleet Blog",
    description:
      "Technical guides for browser automation, web scraping, and AI agents.",
  },
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div>
      <section className="border-b border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-16">
          <p className="text-sm font-semibold text-purple-400 uppercase tracking-widest mb-4">
            Blog
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
            Guides, tutorials, and best practices
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
            Technical content for developers building with cloud browsers, web
            scraping, and AI agents.
          </p>
        </div>
      </section>

      <section>
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 gap-6">
            {sortedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 hover:border-zinc-600 transition-colors block"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs text-zinc-500">
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="text-xs text-zinc-700">|</span>
                  <span className="text-xs text-zinc-500">
                    {post.readingTime} min read
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-white mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
