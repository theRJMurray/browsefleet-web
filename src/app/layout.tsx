import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://browsefleet.com"),
  title: "BrowseFleet — Cloud Browser API for AI Agents",
  description:
    "Open-source headless browser API. Launch cloud browsers, scrape content, and automate the web. Built for AI agents and developers.",
  openGraph: {
    title: "BrowseFleet — Cloud Browser API for AI Agents",
    description:
      "Open-source headless browser API. Launch cloud browsers, scrape content, and automate the web.",
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
      "@type": "SoftwareApplication",
      name: "BrowseFleet",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      description:
        "Open-source cloud browser API for AI agents and developers. Launch managed browser sessions, scrape content, and automate the web.",
      url: "https://browsefleet.com",
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "0",
        highPrice: "499",
        priceCurrency: "USD",
        offerCount: "4",
      },
      featureList: [
        "Cloud browser sessions via CDP WebSocket",
        "Stealth mode with fingerprint spoofing",
        "Built-in CAPTCHA solving",
        "Computer API for AI agents",
        "Web scraping with Markdown output",
        "Screenshot and PDF generation",
        "Self-hosting via Docker",
      ],
    },
    {
      "@type": "Organization",
      name: "BrowseFleet",
      url: "https://browsefleet.com",
      sameAs: ["https://github.com/theRJMurray/browsefleet"],
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
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/docs"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Docs
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/blog"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Blog
          </Link>
          <a
            href="https://github.com/theRJMurray/browsefleet"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <Link
            href="/dashboard"
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-500 transition-colors"
          >
            Dashboard
          </Link>
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {/* Product */}
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">
              Product
            </p>
            <div className="space-y-2.5">
              <Link
                href="/docs/sessions"
                className="block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Sessions API
              </Link>
              <Link
                href="/docs/scraping"
                className="block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Scraping
              </Link>
              <Link
                href="/docs/screenshots"
                className="block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Screenshots
              </Link>
              <Link
                href="/docs/computer-api"
                className="block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Computer API
              </Link>
              <Link
                href="/docs/agent"
                className="block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Agent API
              </Link>
              <Link
                href="/docs/profiles"
                className="block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Profiles
              </Link>
              <Link
                href="/pricing"
                className="block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Pricing
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">
              Resources
            </p>
            <div className="space-y-2.5">
              <Link
                href="/docs"
                className="block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Documentation
              </Link>
              <Link
                href="/docs/quickstart"
                className="block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Quickstart
              </Link>
              <Link
                href="/docs/self-hosting"
                className="block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Self-Hosting
              </Link>
              <Link
                href="/docs/sdks"
                className="block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                SDKs
              </Link>
              <Link
                href="/blog"
                className="block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Comparisons */}
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">
              Comparisons
            </p>
            <div className="space-y-2.5">
              <Link
                href="/alternatives/steel"
                className="block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                vs Steel
              </Link>
              <Link
                href="/alternatives/browserbase"
                className="block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                vs Browserbase
              </Link>
              <Link
                href="/alternatives/apify"
                className="block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                vs Apify
              </Link>
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">
              Use Cases
            </p>
            <div className="space-y-2.5">
              <Link
                href="/use-cases/web-scraping"
                className="block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Web Scraping
              </Link>
              <Link
                href="/use-cases/ai-agents"
                className="block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                AI Agents
              </Link>
              <Link
                href="/use-cases/lead-generation"
                className="block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Lead Generation
              </Link>
              <Link
                href="/use-cases/price-monitoring"
                className="block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Price Monitoring
              </Link>
              <Link
                href="/use-cases/data-extraction"
                className="block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Data Extraction
              </Link>
            </div>
          </div>

          {/* Integrations */}
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">
              Integrations
            </p>
            <div className="space-y-2.5">
              <Link
                href="/integrations/puppeteer"
                className="block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Puppeteer
              </Link>
              <Link
                href="/integrations/playwright"
                className="block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Playwright
              </Link>
              <Link
                href="/integrations/selenium"
                className="block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Selenium
              </Link>
              <Link
                href="/integrations/claude-computer-use"
                className="block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Claude Computer Use
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">
              Company
            </p>
            <div className="space-y-2.5">
              <Link
                href="/blog"
                className="block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/pricing"
                className="block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/dashboard"
                className="block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <a
                href="https://github.com/theRJMurray/browsefleet"
                className="block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800/50 py-6">
        <p className="text-center text-[10px] text-zinc-700">BrowseFleet</p>
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
