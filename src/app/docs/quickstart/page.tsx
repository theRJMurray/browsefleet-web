const STEPS = [
  {
    title: "1. Get your API key",
    description: "Sign up at browsefleet.com/dashboard. Your API key starts with bf_.",
    code: `export BROWSEFLEET_API_KEY=bf_your_api_key`,
  },
  {
    title: "2. Install the SDK",
    description: "Install the BrowseFleet SDK for your language.",
    code: `# Node.js
npm install browsefleet puppeteer-core

# Python
pip install browsefleet`,
  },
  {
    title: "3. Create a session and connect",
    description: "Launch a cloud browser and connect your automation tool.",
    code: `import { BrowseFleet } from 'browsefleet';
import puppeteer from 'puppeteer-core';

const bf = new BrowseFleet({
  apiKey: process.env.BROWSEFLEET_API_KEY,
});

// Create a stealth browser session
const session = await bf.sessions.create({
  stealth: 'full',
});

// Connect Puppeteer to the cloud browser
const browser = await puppeteer.connect({
  browserWSEndpoint: session.websocketUrl,
});

// Use it like a normal Puppeteer browser
const page = await browser.newPage();
await page.goto('https://example.com');
const title = await page.title();
console.log('Page title:', title);

// Clean up
await browser.disconnect();
await bf.sessions.release(session.id);`,
  },
  {
    title: "4. Or use quick actions",
    description: "For simple tasks, skip sessions entirely.",
    code: `// Scrape a page to markdown
const { markdown, title, links } = await bf.scrape('https://example.com');
console.log(markdown);

// Take a screenshot
const screenshot = await bf.screenshot('https://example.com', {
  fullPage: true,
});
// screenshot is a Buffer (PNG)

// Generate a PDF
const pdf = await bf.pdf('https://example.com', {
  format: 'A4',
});`,
  },
  {
    title: "5. Use the Computer API for AI agents",
    description: "Let your AI agent interact with web pages visually.",
    code: `const session = await bf.sessions.create();

// Navigate and get a screenshot
const result = await bf.sessions.actions(session.id, [
  { type: 'navigate', url: 'https://example.com' },
  { type: 'screenshot' },
]);

// The screenshot is base64 PNG — send it to your LLM
const screenshot = result.results[1].screenshot;

// Execute actions based on LLM response
await bf.sessions.actions(session.id, [
  { type: 'click', x: 200, y: 350 },
  { type: 'type', text: 'Hello world' },
  { type: 'press_key', key: 'Enter' },
  { type: 'screenshot' },
]);`,
  },
];

export default function QuickstartPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Getting Started</p>
      <h1 className="text-4xl font-bold text-white mb-4">Quickstart</h1>
      <p className="text-zinc-400 mb-12">
        Go from zero to cloud browser automation in under 2 minutes.
      </p>

      <div className="space-y-12">
        {STEPS.map((step) => (
          <section key={step.title}>
            <h2 className="text-xl font-bold text-white mb-2">{step.title}</h2>
            <p className="text-sm text-zinc-400 mb-4">{step.description}</p>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
              <pre className="p-5 text-[13px] leading-relaxed text-zinc-300 overflow-x-auto">
                <code>{step.code}</code>
              </pre>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 rounded-xl border border-zinc-800 bg-zinc-900/30 p-8 text-center">
        <h3 className="text-xl font-bold text-white mb-3">Need help?</h3>
        <p className="text-sm text-zinc-400 mb-6">
          Check out the full API reference or reach out to us.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a href="/docs" className="rounded-lg bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-purple-500 transition-colors">
            API Reference
          </a>
          <a href="https://github.com/theRJMurray/browsefleet" className="rounded-lg border border-zinc-700 px-6 py-2.5 text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors">
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
