import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BrowseFleet — Cloud Browser API for AI Agents",
  description: "Open-source headless browser API. Launch cloud browsers, scrape content, and automate the web. Built for AI agents and developers.",
};

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="text-lg font-bold tracking-tight text-white">
          BrowseFleet
        </a>
        <div className="flex items-center gap-8">
          <a href="/docs" className="text-sm text-zinc-400 hover:text-white transition-colors">Docs</a>
          <a href="/pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">Pricing</a>
          <a href="https://github.com/theRJMurray/browsefleet" className="text-sm text-zinc-400 hover:text-white transition-colors">GitHub</a>
          <a href="/dashboard" className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-500 transition-colors">
            Dashboard
          </a>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-4 gap-8">
        <div>
          <p className="text-sm font-bold text-white mb-3">BrowseFleet</p>
          <p className="text-xs text-zinc-500">Cloud browser API for AI agents and developers.</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Product</p>
          <div className="space-y-2">
            <a href="/docs" className="block text-xs text-zinc-500 hover:text-white transition-colors">Documentation</a>
            <a href="/pricing" className="block text-xs text-zinc-500 hover:text-white transition-colors">Pricing</a>
            <a href="/docs/quickstart" className="block text-xs text-zinc-500 hover:text-white transition-colors">Quickstart</a>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Resources</p>
          <div className="space-y-2">
            <a href="https://github.com/theRJMurray/browsefleet" className="block text-xs text-zinc-500 hover:text-white transition-colors">GitHub</a>
            <a href="/docs/quickstart" className="block text-xs text-zinc-500 hover:text-white transition-colors">Self-Hosting</a>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Legal</p>
          <div className="space-y-2">
            <a href="/privacy" className="block text-xs text-zinc-500 hover:text-white transition-colors">Privacy</a>
            <a href="/terms" className="block text-xs text-zinc-500 hover:text-white transition-colors">Terms</a>
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
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
