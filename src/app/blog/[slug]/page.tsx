import { blogPosts } from "@/data/blog-posts";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: { type: string; content: string; id?: string }[] = [];
  let currentBlock: string[] = [];
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push({ type: "code", content: currentBlock.join("\n") });
        currentBlock = [];
        inCodeBlock = false;
      } else {
        if (currentBlock.length > 0) {
          elements.push({ type: "text", content: currentBlock.join("\n") });
          currentBlock = [];
        }
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      currentBlock.push(line);
      continue;
    }

    if (line.startsWith("### ")) {
      if (currentBlock.length > 0) {
        elements.push({ type: "text", content: currentBlock.join("\n") });
        currentBlock = [];
      }
      const heading = line.replace("### ", "");
      const id = heading.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      elements.push({ type: "h3", content: heading, id });
      continue;
    }

    if (line.startsWith("## ")) {
      if (currentBlock.length > 0) {
        elements.push({ type: "text", content: currentBlock.join("\n") });
        currentBlock = [];
      }
      const heading = line.replace("## ", "");
      const id = heading.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      elements.push({ type: "h2", content: heading, id });
      continue;
    }

    if (line.startsWith("**") && line.endsWith("**")) {
      if (currentBlock.length > 0) {
        elements.push({ type: "text", content: currentBlock.join("\n") });
        currentBlock = [];
      }
      elements.push({
        type: "bold-line",
        content: line.replace(/^\*\*/, "").replace(/\*\*$/, ""),
      });
      continue;
    }

    currentBlock.push(line);
  }

  if (currentBlock.length > 0) {
    elements.push({
      type: inCodeBlock ? "code" : "text",
      content: currentBlock.join("\n"),
    });
  }

  return elements.map((el, i) => {
    if (el.type === "h2") {
      return (
        <h2
          key={i}
          id={el.id}
          className="text-2xl font-bold text-white mt-12 mb-4"
        >
          {el.content}
        </h2>
      );
    }

    if (el.type === "h3") {
      return (
        <h3
          key={i}
          id={el.id}
          className="text-xl font-bold text-white mt-8 mb-3"
        >
          {el.content}
        </h3>
      );
    }

    if (el.type === "code") {
      return (
        <div
          key={i}
          className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden my-6"
        >
          <pre className="p-5 text-[13px] leading-relaxed text-zinc-300 overflow-x-auto">
            <code>{el.content}</code>
          </pre>
        </div>
      );
    }

    if (el.type === "bold-line") {
      return (
        <p key={i} className="text-sm font-semibold text-white mt-4 mb-2">
          {el.content}
        </p>
      );
    }

    // Text block — split into paragraphs
    const paragraphs = el.content
      .split("\n\n")
      .filter((p) => p.trim().length > 0);
    return paragraphs.map((para, j) => {
      const trimmed = para.trim();
      if (trimmed.startsWith("| ")) {
        // Simple table rendering
        const rows = trimmed.split("\n").filter((r) => !r.match(/^\|[\s-|]+$/));
        return (
          <div key={`${i}-${j}`} className="overflow-x-auto my-6">
            <table className="w-full text-sm">
              <tbody>
                {rows.map((row, ri) => {
                  const cells = row
                    .split("|")
                    .filter((c) => c.trim().length > 0);
                  return (
                    <tr key={ri} className="border-b border-zinc-800/50">
                      {cells.map((cell, ci) => (
                        <td
                          key={ci}
                          className={`py-2 px-3 ${
                            ri === 0
                              ? "font-semibold text-zinc-300"
                              : "text-zinc-400"
                          }`}
                        >
                          {cell.trim()}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      }

      // Inline formatting helper
      function applyInlineFormatting(text: string) {
        return text
          .replace(
            /\*\*(.*?)\*\*/g,
            '<strong class="text-white font-semibold">$1</strong>'
          )
          .replace(
            /`([^`]+)`/g,
            '<code class="text-purple-300 text-[13px] bg-zinc-800/50 px-1.5 py-0.5 rounded">$1</code>'
          )
          .replace(
            /\[([^\]]+)\]\(([^)]+)\)/g,
            '<a href="$2" class="text-purple-400 hover:text-purple-300 underline underline-offset-2">$1</a>'
          );
      }

      const formatted = applyInlineFormatting(trimmed);

      // Numbered list
      if (/^\d+\.\s/.test(trimmed)) {
        const items = trimmed.split("\n").filter((l) => /^\d+\.\s/.test(l));
        return (
          <ol key={`${i}-${j}`} className="space-y-2 my-4 list-decimal list-inside">
            {items.map((item, ii) => (
              <li
                key={ii}
                className="text-sm text-zinc-400 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: applyInlineFormatting(item.replace(/^\d+\.\s/, "")),
                }}
              />
            ))}
          </ol>
        );
      }

      if (trimmed.startsWith("- ")) {
        const items = trimmed.split("\n").filter((l) => l.startsWith("- "));
        return (
          <ul key={`${i}-${j}`} className="space-y-2 my-4">
            {items.map((item, ii) => (
              <li key={ii} className="flex items-start gap-2">
                <span className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-zinc-500" />
                <span
                  className="text-sm text-zinc-400 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: applyInlineFormatting(item.replace(/^- /, "")),
                  }}
                />
              </li>
            ))}
          </ul>
        );
      }

      return (
        <p
          key={`${i}-${j}`}
          className="text-zinc-400 leading-relaxed my-4"
          dangerouslySetInnerHTML={{ __html: formatted }}
        />
      );
    });
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div>
      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            datePublished: post.publishedAt,
            author: { "@type": "Organization", name: "BrowseFleet" },
            publisher: { "@type": "Organization", name: "BrowseFleet" },
          }),
        }}
      />

      {/* Header */}
      <section className="border-b border-zinc-800/50">
        <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
          <Link
            href="/blog"
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-6 block"
          >
            Back to Blog
          </Link>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-500">
              {formatDate(post.publishedAt)}
            </span>
            <span className="text-sm text-zinc-700">|</span>
            <span className="text-sm text-zinc-500">
              {post.readingTime} min read
            </span>
          </div>
        </div>
      </section>

      {/* Table of contents */}
      <section className="border-b border-zinc-800/50">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
            Table of Contents
          </p>
          <nav className="space-y-1.5">
            {post.headings.map((heading) => {
              const id = heading.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className="block text-sm text-zinc-500 hover:text-white transition-colors"
                >
                  {heading}
                </a>
              );
            })}
          </nav>
        </div>
      </section>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        {renderContent(post.content)}
      </article>

      {/* Related posts */}
      <section className="border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="text-xl font-bold text-white mb-6">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {blogPosts
              .filter((p) => p.slug !== post.slug)
              .slice(0, 4)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 hover:border-zinc-600 transition-colors"
                >
                  <p className="text-sm font-semibold text-white mb-1">
                    {relatedPost.title}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {relatedPost.readingTime} min read
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to try BrowseFleet?
          </h2>
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
