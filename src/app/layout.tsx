import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";
import { GitHubStarButton } from "@/components/github-star-button";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://browsefleet.com"),
  title: "BrowseFleet, the open-source cloud browser API for AI agents",
  description:
    "Self-hosted cloud browser API. MIT licensed. Sessions, scrape, screenshot, PDF, stealth, profile persistence, human-in-the-loop control behind one REST endpoint you operate.",
  openGraph: {
    title: "BrowseFleet, the open-source cloud browser API for AI agents",
    description:
      "Self-hosted cloud browser API. MIT licensed. You host it. Built for AI agents and developers.",
    siteName: "BrowseFleet",
    type: "website",
    url: "https://browsefleet.com",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareSourceCode",
      name: "BrowseFleet",
      description:
        "Open-source cloud browser API for AI agents and developers. Self-hosted; MIT licensed.",
      codeRepository: "https://github.com/theRJMurray/browsefleet",
      programmingLanguage: ["TypeScript", "Python"],
      license: "https://opensource.org/licenses/MIT",
      url: "https://browsefleet.com",
    },
    {
      "@type": "Organization",
      name: "BrowseFleet",
      url: "https://browsefleet.com",
      sameAs: [
        "https://github.com/theRJMurray/browsefleet",
        "https://github.com/theRJMurray/browsefleet-node",
        "https://github.com/theRJMurray/browsefleet-python",
        "https://github.com/theRJMurray/browsefleet-web",
      ],
    },
  ],
};

function Nav() {
  return (
    <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight text-white">
          BrowseFleet
        </Link>
        <div className="hidden md:flex items-center gap-7">
          <Link href="/docs" className="text-sm text-zinc-400 hover:text-white transition-colors">
            Docs
          </Link>
          <Link href="/self-host" className="text-sm text-zinc-400 hover:text-white transition-colors">
            Self-host
          </Link>
          <Link href="/sdks" className="text-sm text-zinc-400 hover:text-white transition-colors">
            SDKs
          </Link>
          <Link href="/comparison" className="text-sm text-zinc-400 hover:text-white transition-colors">
            Comparison
          </Link>
          <Link href="/pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="/blog" className="text-sm text-zinc-400 hover:text-white transition-colors">
            Blog
          </Link>
          <GitHubStarButton size="sm" />
        </div>
        <MobileNav />
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer aria-label="Footer" className="border-t border-zinc-800/50 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Project</p>
            <div className="space-y-2.5">
              <Link href="/self-host" className="block text-sm text-zinc-500 hover:text-white transition-colors">Self-host</Link>
              <Link href="/sdks" className="block text-sm text-zinc-500 hover:text-white transition-colors">SDKs</Link>
              <Link href="/comparison" className="block text-sm text-zinc-500 hover:text-white transition-colors">Comparison</Link>
              <Link href="/roadmap" className="block text-sm text-zinc-500 hover:text-white transition-colors">Roadmap</Link>
              <Link href="/pricing" className="block text-sm text-zinc-500 hover:text-white transition-colors">Pricing</Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Docs</p>
            <div className="space-y-2.5">
              <Link href="/docs" className="block text-sm text-zinc-500 hover:text-white transition-colors">Documentation</Link>
              <Link href="/docs/quickstart" className="block text-sm text-zinc-500 hover:text-white transition-colors">Quickstart</Link>
              <Link href="/docs/sessions" className="block text-sm text-zinc-500 hover:text-white transition-colors">Sessions</Link>
              <Link href="/docs/computer-api" className="block text-sm text-zinc-500 hover:text-white transition-colors">Computer API</Link>
              <Link href="/docs/agent" className="block text-sm text-zinc-500 hover:text-white transition-colors">Agent</Link>
              <Link href="/blog" className="block text-sm text-zinc-500 hover:text-white transition-colors">Blog</Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Repos</p>
            <div className="space-y-2.5">
              <a href="https://github.com/theRJMurray/browsefleet" className="block text-sm text-zinc-500 hover:text-white transition-colors">Server</a>
              <a href="https://github.com/theRJMurray/browsefleet-node" className="block text-sm text-zinc-500 hover:text-white transition-colors">Node SDK</a>
              <a href="https://github.com/theRJMurray/browsefleet-python" className="block text-sm text-zinc-500 hover:text-white transition-colors">Python SDK</a>
              <a href="https://github.com/theRJMurray/browsefleet-web" className="block text-sm text-zinc-500 hover:text-white transition-colors">This site</a>
              <a href="https://github.com/theRJMurray/browsefleet/discussions" className="block text-sm text-zinc-500 hover:text-white transition-colors">Discussions</a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Comparisons</p>
            <div className="space-y-2.5">
              <Link href="/alternatives/steel" className="block text-sm text-zinc-500 hover:text-white transition-colors">vs Steel</Link>
              <Link href="/alternatives/browserbase" className="block text-sm text-zinc-500 hover:text-white transition-colors">vs Browserbase</Link>
              <Link href="/alternatives/apify" className="block text-sm text-zinc-500 hover:text-white transition-colors">vs Apify</Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Open source</p>
            <div className="space-y-2.5">
              <a href="https://github.com/theRJMurray/browsefleet/blob/master/LICENSE" className="block text-sm text-zinc-500 hover:text-white transition-colors">MIT License</a>
              <a href="https://github.com/theRJMurray/browsefleet/blob/master/CONTRIBUTING.md" className="block text-sm text-zinc-500 hover:text-white transition-colors">Contributing</a>
              <a href="https://github.com/theRJMurray/browsefleet/blob/master/SECURITY.md" className="block text-sm text-zinc-500 hover:text-white transition-colors">Security</a>
              <a href="https://github.com/theRJMurray/browsefleet/graphs/contributors" className="block text-sm text-zinc-500 hover:text-white transition-colors">Contributors</a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800/50 py-6">
        <p className="text-center text-[11px] text-zinc-600">
          BrowseFleet, MIT licensed.{" "}
          <a
            href="https://github.com/theRJMurray/browsefleet"
            className="text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Star on GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
