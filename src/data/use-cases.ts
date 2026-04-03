export interface UseCase {
  slug: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  featuresUsed: string[];
  codeExample: string;
  benefits: string[];
}

export const useCases: UseCase[] = [
  {
    slug: "web-scraping",
    title: "Web Scraping",
    description: "Extract structured data from any website at scale using cloud browsers with built-in stealth and proxy rotation.",
    problem: "Modern websites use JavaScript rendering, anti-bot detection, and CAPTCHAs to prevent scraping. Running headless browsers locally does not scale. Each instance consumes 200-500MB of RAM, crashes under load, and gets blocked by fingerprint detection. Managing proxies, retries, and browser lifecycle adds weeks of engineering work.",
    solution: "BrowseFleet handles the hard parts of scraping. Launch cloud browser sessions with stealth mode enabled by default, connect your existing Puppeteer or Playwright code with a one-line change, and let BrowseFleet manage browser lifecycle, proxy rotation, and CAPTCHA solving. For simple pages, use the quick-action scrape endpoint that returns cleaned HTML, Markdown, and readability-optimized text in a single API call.",
    featuresUsed: ["Sessions API", "Stealth Mode", "Quick Actions", "CAPTCHA Solving", "Proxy Support"],
    codeExample: `import { BrowseFleet } from 'browsefleet';

const bf = new BrowseFleet({ apiKey: 'bf_...' });

// Quick scrape - one call, no session needed
const { markdown, html, text } = await bf.scrape(
  'https://example.com/products',
  { stealth: 'full' }
);

// Or use a full session for multi-page scraping
const session = await bf.sessions.create({
  stealth: 'full',
  proxy: 'socks5://user:pass@proxy:1080',
});

const browser = await puppeteer.connect({
  browserWSEndpoint: session.websocketUrl,
});

const page = await browser.newPage();
for (const url of productUrls) {
  await page.goto(url);
  const data = await page.evaluate(() => ({
    title: document.querySelector('h1')?.textContent,
    price: document.querySelector('.price')?.textContent,
  }));
  results.push(data);
}

await session.close();`,
    benefits: [
      "Scrape JavaScript-heavy sites without managing browsers",
      "Built-in stealth bypasses most anti-bot detection",
      "Per-session proxies prevent IP blocking",
      "CAPTCHA solving handles reCAPTCHA, hCaptcha, and Turnstile",
      "Quick actions return clean Markdown for simple pages",
      "Scale to 100 concurrent browsers without infrastructure work",
    ],
  },
  {
    slug: "ai-agents",
    title: "AI Web Agents",
    description: "Build AI agents that can browse, interact with, and extract information from the web using vision-based automation.",
    problem: "AI agents need to interact with real websites: clicking buttons, filling forms, reading content, and navigating multi-step workflows. Local browsers crash, get detected as bots, and cannot handle the concurrency needed for production agent deployments. Existing tools were not designed for the screenshot-to-action loop that vision-based agents require.",
    solution: "BrowseFleet's Computer API was built specifically for AI agents. Every action (click, type, scroll) returns a screenshot that you can pass directly to Claude, GPT-4o, or Gemini for the next decision. Sessions start in under a second, stealth mode prevents detection, and the Agent API provides a higher-level interface for common agent patterns.",
    featuresUsed: ["Computer API", "Agent API", "Sessions API", "Stealth Mode", "Cookie Persistence"],
    codeExample: `import { BrowseFleet } from 'browsefleet';
import Anthropic from '@anthropic-ai/sdk';

const bf = new BrowseFleet({ apiKey: 'bf_...' });
const anthropic = new Anthropic();

// Create a session for the agent
const session = await bf.sessions.create({
  stealth: 'full',
  viewport: { width: 1920, height: 1080 },
});

// Navigate and get initial screenshot
let screenshot = await bf.computer.navigate(
  session.id,
  'https://example.com'
);

// Agent loop: screenshot → LLM → action → screenshot
while (!done) {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    messages: [{
      role: 'user',
      content: [
        { type: 'image', source: { type: 'base64', data: screenshot } },
        { type: 'text', text: 'Click the search button and type "cloud browsers"' },
      ],
    }],
  });

  // Execute the action, get next screenshot
  screenshot = await bf.computer.execute(
    session.id,
    parseAction(response)
  );
}`,
    benefits: [
      "Computer API returns screenshots after every action",
      "Compatible with Claude, GPT-4o, and Gemini vision models",
      "Sub-second session startup for responsive agents",
      "Stealth mode prevents bot detection during agent workflows",
      "Cookie persistence lets agents resume authenticated sessions",
      "Scale to hundreds of concurrent agent sessions",
    ],
  },
  {
    slug: "automated-testing",
    title: "Automated Testing",
    description: "Run browser-based tests in the cloud without maintaining local browser installations or CI/CD infrastructure.",
    problem: "Browser testing in CI/CD pipelines is painful. Local browser binaries break between versions, Docker containers consume huge amounts of RAM, and tests that pass locally fail in CI because of timing issues, missing fonts, or resolution differences. Maintaining a fleet of test browsers is a full-time job.",
    solution: "BrowseFleet provides consistent, isolated browser sessions for every test run. Connect your existing test framework via CDP WebSocket, run tests in parallel across dozens of concurrent sessions, and get identical results every time. No more flaky tests caused by local browser inconsistencies.",
    featuresUsed: ["Sessions API", "Screenshots", "Cookie Persistence"],
    codeExample: `import { BrowseFleet } from 'browsefleet';
import { test, expect } from '@playwright/test';

const bf = new BrowseFleet({ apiKey: 'bf_...' });

test('user can complete checkout', async () => {
  const session = await bf.sessions.create({
    viewport: { width: 1280, height: 720 },
  });

  const browser = await chromium.connectOverCDP(
    session.websocketUrl
  );
  const page = await browser.newPage();

  await page.goto('https://myapp.com/shop');
  await page.click('[data-testid="add-to-cart"]');
  await page.click('[data-testid="checkout"]');

  // Screenshot on failure for debugging
  const screenshot = await bf.screenshot(page.url());

  await expect(page.locator('.order-confirmation'))
    .toBeVisible();

  await session.close();
});`,
    benefits: [
      "Consistent browser environment across all test runs",
      "Parallel execution with up to 100 concurrent sessions",
      "No local browser installation or maintenance",
      "Screenshots for debugging failed tests",
      "Works with Playwright, Puppeteer, and Selenium",
      "Eliminates flaky tests caused by environment differences",
    ],
  },
  {
    slug: "price-monitoring",
    title: "Price Monitoring",
    description: "Track prices across competitor websites and marketplaces in real-time with cloud browsers that bypass anti-scraping defenses.",
    problem: "E-commerce sites aggressively block price scrapers with CAPTCHAs, IP bans, and fingerprint detection. Prices change frequently, requiring continuous monitoring across hundreds or thousands of product pages. Local scraping setups cannot handle the volume, and getting blocked means missing critical price changes.",
    solution: "BrowseFleet's stealth mode and proxy rotation let you monitor prices without getting blocked. Schedule scraping jobs that run across concurrent sessions, solve CAPTCHAs automatically, and rotate proxies per session. The quick-action scrape endpoint extracts clean data from product pages in a single call.",
    featuresUsed: ["Sessions API", "Stealth Mode", "CAPTCHA Solving", "Proxy Support", "Quick Actions"],
    codeExample: `import { BrowseFleet } from 'browsefleet';

const bf = new BrowseFleet({ apiKey: 'bf_...' });

const products = [
  'https://store.example.com/product/abc',
  'https://store.example.com/product/def',
  // ... hundreds of URLs
];

// Monitor prices in parallel
const results = await Promise.all(
  products.map(async (url) => {
    const session = await bf.sessions.create({
      stealth: 'full',
      proxy: getNextProxy(),
    });

    const browser = await puppeteer.connect({
      browserWSEndpoint: session.websocketUrl,
    });

    const page = await browser.newPage();
    await page.goto(url);

    const price = await page.evaluate(() =>
      document.querySelector('.price')?.textContent
    );

    await session.close();
    return { url, price, timestamp: Date.now() };
  })
);

// Compare with previous prices
const changes = detectPriceChanges(results);
if (changes.length > 0) notify(changes);`,
    benefits: [
      "Stealth mode bypasses anti-scraping defenses",
      "Concurrent sessions for monitoring thousands of products",
      "Automatic CAPTCHA solving prevents interruptions",
      "Per-session proxies avoid IP bans",
      "Consistent data extraction from JavaScript-rendered pages",
      "Cost-effective per-hour billing for continuous monitoring",
    ],
  },
  {
    slug: "lead-generation",
    title: "Lead Generation",
    description: "Extract business information, contact details, and company data from websites and directories for sales outreach.",
    problem: "Lead generation requires scraping business directories, company websites, and professional networks. These sites have aggressive anti-bot measures, rate limiting, and CAPTCHAs. Building and maintaining scraping infrastructure for lead gen is expensive and fragile, especially when sources change their HTML structure frequently.",
    solution: "BrowseFleet provides the browser infrastructure for reliable lead extraction. Use stealth sessions to browse directories without detection, solve CAPTCHAs automatically, and persist cookies to maintain authenticated access to professional networks. The quick-action scrape endpoint extracts clean text from company websites for AI-powered enrichment.",
    featuresUsed: ["Sessions API", "Stealth Mode", "CAPTCHA Solving", "Cookie Persistence", "Quick Actions"],
    codeExample: `import { BrowseFleet } from 'browsefleet';

const bf = new BrowseFleet({ apiKey: 'bf_...' });

// Create a persistent profile for authenticated sessions
const session = await bf.sessions.create({
  stealth: 'full',
  profile: 'lead-gen-profile',
  proxy: 'socks5://user:pass@proxy:1080',
});

const browser = await puppeteer.connect({
  browserWSEndpoint: session.websocketUrl,
});

const page = await browser.newPage();

// Navigate to business directory
await page.goto('https://directory.example.com/search?q=saas');

// Extract business listings
const leads = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('.listing')).map(el => ({
    name: el.querySelector('.name')?.textContent?.trim(),
    website: el.querySelector('.website a')?.getAttribute('href'),
    email: el.querySelector('.email')?.textContent?.trim(),
    phone: el.querySelector('.phone')?.textContent?.trim(),
  }));
});

// Enrich each lead by scraping their website
for (const lead of leads) {
  if (lead.website) {
    const { text } = await bf.scrape(lead.website);
    lead.description = text.slice(0, 500);
  }
}

await session.close();`,
    benefits: [
      "Stealth mode prevents detection on directories and networks",
      "Cookie persistence maintains authenticated sessions",
      "CAPTCHA solving handles access barriers automatically",
      "Quick actions extract clean text for AI-powered enrichment",
      "Per-session proxies avoid rate limiting",
      "Scale lead extraction across concurrent sessions",
    ],
  },
  {
    slug: "social-media-automation",
    title: "Social Media Automation",
    description: "Automate social media workflows including content posting, engagement monitoring, and audience research across platforms.",
    problem: "Social media APIs are restrictive, expensive, and often missing features available in the web interface. Platform-specific rate limits, authentication requirements, and anti-automation measures make it difficult to build reliable social media tools. Official APIs also lag behind new features by months or years.",
    solution: "BrowseFleet lets you interact with social media platforms through their web interfaces using stealth browser sessions. Cookie persistence maintains logged-in sessions, the Computer API handles complex interactions, and stealth mode prevents automation detection. Build workflows that use the full web interface, not just the limited API.",
    featuresUsed: ["Sessions API", "Computer API", "Stealth Mode", "Cookie Persistence", "Proxy Support"],
    codeExample: `import { BrowseFleet } from 'browsefleet';

const bf = new BrowseFleet({ apiKey: 'bf_...' });

// Resume authenticated session with saved cookies
const session = await bf.sessions.create({
  stealth: 'full',
  profile: 'social-account-1',
  proxy: 'socks5://user:pass@residential:1080',
});

const browser = await puppeteer.connect({
  browserWSEndpoint: session.websocketUrl,
});

const page = await browser.newPage();
await page.goto('https://social-platform.com/feed');

// Monitor engagement on recent posts
const posts = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('.post')).map(post => ({
    text: post.querySelector('.content')?.textContent,
    likes: post.querySelector('.likes')?.textContent,
    comments: post.querySelector('.comments')?.textContent,
    timestamp: post.querySelector('.timestamp')?.textContent,
  }));
});

// Cookies persist for next session
await session.close();`,
    benefits: [
      "Access full web interface features not available via API",
      "Cookie persistence maintains authenticated sessions",
      "Stealth mode prevents automation detection",
      "Computer API handles complex UI interactions",
      "Residential proxies via per-session proxy configuration",
      "No API rate limits or restrictive terms of service",
    ],
  },
  {
    slug: "seo-auditing",
    title: "SEO Auditing",
    description: "Audit websites for SEO issues by rendering pages in real browsers, checking Core Web Vitals, and analyzing rendered HTML.",
    problem: "SEO auditing requires rendering pages like a real browser to see JavaScript-generated content, check meta tags after client-side rendering, measure page load performance, and take screenshots for visual regression testing. Simple HTTP requests miss JavaScript-rendered content that search engines actually index.",
    solution: "BrowseFleet provides real browser sessions that render pages exactly as search engines see them. Use the quick-action scrape endpoint to extract rendered HTML and text, take screenshots of rendered pages, and measure load performance. Run audits across hundreds of pages in parallel using concurrent sessions.",
    featuresUsed: ["Quick Actions", "Screenshots", "Sessions API"],
    codeExample: `import { BrowseFleet } from 'browsefleet';

const bf = new BrowseFleet({ apiKey: 'bf_...' });

const pagesToAudit = [
  'https://mysite.com/',
  'https://mysite.com/about',
  'https://mysite.com/products',
  // ... all pages from sitemap
];

const auditResults = await Promise.all(
  pagesToAudit.map(async (url) => {
    // Get rendered HTML and text
    const { html, text } = await bf.scrape(url);

    // Take screenshot for visual audit
    const screenshot = await bf.screenshot(url, {
      fullPage: true,
      viewport: { width: 1280, height: 720 },
    });

    // Parse SEO elements from rendered HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    return {
      url,
      title: doc.querySelector('title')?.textContent,
      metaDescription: doc.querySelector('meta[name="description"]')?.getAttribute('content'),
      h1Count: doc.querySelectorAll('h1').length,
      imgWithoutAlt: doc.querySelectorAll('img:not([alt])').length,
      wordCount: text.split(/\\s+/).length,
      screenshot,
    };
  })
);

// Generate audit report
const issues = auditResults.filter(r =>
  !r.title || !r.metaDescription || r.h1Count !== 1
);`,
    benefits: [
      "Render pages in real browsers to see what search engines see",
      "Parallel auditing of hundreds of pages",
      "Screenshots for visual regression testing",
      "Extract rendered HTML including JavaScript-generated content",
      "No browser installation or maintenance",
      "Cost-effective per-hour billing for bulk audits",
    ],
  },
  {
    slug: "form-filling",
    title: "Form Filling and Submission",
    description: "Automate form filling, data entry, and multi-step form submissions across websites with cloud browsers.",
    problem: "Automating form submissions requires handling dynamic form fields, CAPTCHA challenges, multi-step wizards, file uploads, and complex validation. Anti-bot measures detect automation tools, and forms often change their structure without notice. Running local browsers for form automation does not scale.",
    solution: "BrowseFleet's sessions provide full browser control for form automation. Use Puppeteer or Playwright to fill forms, handle dynamic fields, and submit data. Built-in CAPTCHA solving handles challenges automatically, and stealth mode prevents detection. Cookie persistence lets you maintain logged-in sessions for authenticated form workflows.",
    featuresUsed: ["Sessions API", "CAPTCHA Solving", "Stealth Mode", "Computer API", "Cookie Persistence"],
    codeExample: `import { BrowseFleet } from 'browsefleet';

const bf = new BrowseFleet({ apiKey: 'bf_...' });

const session = await bf.sessions.create({
  stealth: 'full',
  captchaSolving: true,
});

const browser = await puppeteer.connect({
  browserWSEndpoint: session.websocketUrl,
});

const page = await browser.newPage();
await page.goto('https://portal.example.com/application');

// Fill multi-step form
await page.type('#first-name', 'Jane');
await page.type('#last-name', 'Smith');
await page.type('#email', 'jane@company.com');
await page.select('#country', 'US');

// Upload document
const fileInput = await page.$('input[type="file"]');
await fileInput?.uploadFile('./documents/resume.pdf');

// CAPTCHAs are solved automatically
await page.click('#submit-button');

// Wait for confirmation
await page.waitForSelector('.confirmation-message');
const confirmation = await page.evaluate(() =>
  document.querySelector('.confirmation-message')?.textContent
);

await session.close();`,
    benefits: [
      "Full browser control for complex form interactions",
      "Automatic CAPTCHA solving removes submission barriers",
      "Stealth mode prevents bot detection on form pages",
      "Handle file uploads, dropdowns, and dynamic fields",
      "Cookie persistence for multi-session form workflows",
      "Computer API for forms that resist traditional automation",
    ],
  },
  {
    slug: "data-extraction",
    title: "Data Extraction",
    description: "Extract structured data from websites, documents, and web applications using cloud browsers with AI-powered content parsing.",
    problem: "Valuable data is locked in websites, web applications, and online documents that resist simple HTTP scraping. JavaScript-rendered content, authentication walls, paginated results, and complex layouts make extraction difficult. Building reliable extraction pipelines requires significant engineering effort.",
    solution: "BrowseFleet combines cloud browser sessions with quick-action endpoints for flexible data extraction. Use sessions for complex multi-step extractions that require navigation and interaction, or use the scrape endpoint for simple pages. The Markdown output from quick actions is ideal for feeding into LLMs for structured data extraction.",
    featuresUsed: ["Quick Actions", "Sessions API", "Stealth Mode", "Computer API"],
    codeExample: `import { BrowseFleet } from 'browsefleet';
import Anthropic from '@anthropic-ai/sdk';

const bf = new BrowseFleet({ apiKey: 'bf_...' });
const anthropic = new Anthropic();

// Simple extraction via quick action
const { markdown } = await bf.scrape(
  'https://company.example.com/about'
);

// Use LLM to extract structured data from markdown
const response = await anthropic.messages.create({
  model: 'claude-sonnet-4-20250514',
  messages: [{
    role: 'user',
    content: \`Extract structured data from this page:

\${markdown}

Return JSON with: company_name, founded_year,
employee_count, headquarters, description\`,
  }],
});

const companyData = JSON.parse(
  response.content[0].text
);

// Complex extraction with session for paginated data
const session = await bf.sessions.create({ stealth: 'full' });
const browser = await puppeteer.connect({
  browserWSEndpoint: session.websocketUrl,
});

const page = await browser.newPage();
let allResults = [];

await page.goto('https://data.example.com/results');
while (true) {
  const pageData = await page.evaluate(() => /* extract */);
  allResults.push(...pageData);

  const nextBtn = await page.$('.next-page:not([disabled])');
  if (!nextBtn) break;
  await nextBtn.click();
  await page.waitForNavigation();
}

await session.close();`,
    benefits: [
      "Markdown output is ideal for LLM-powered extraction",
      "Handle JavaScript-rendered content that HTTP clients miss",
      "Navigate paginated results with full session control",
      "Stealth mode bypasses anti-scraping protections",
      "Quick actions for simple pages, sessions for complex ones",
      "Scale extraction with concurrent browser sessions",
    ],
  },
  {
    slug: "competitive-intelligence",
    title: "Competitive Intelligence",
    description: "Monitor competitor websites, pricing, features, and content changes to stay ahead in your market.",
    problem: "Tracking competitors requires monitoring multiple websites for pricing changes, new features, content updates, and strategic shifts. Manual monitoring is time-consuming and unreliable. Competitors actively block automated monitoring with bot detection, and their sites often require JavaScript rendering to see the actual content.",
    solution: "BrowseFleet enables automated competitive monitoring by providing stealth browser sessions that can access competitor sites without detection. Take periodic screenshots for visual change detection, scrape pricing pages and feature lists, and use the Markdown output with LLMs to summarize changes and generate intelligence reports.",
    featuresUsed: ["Sessions API", "Screenshots", "Quick Actions", "Stealth Mode", "Proxy Support"],
    codeExample: `import { BrowseFleet } from 'browsefleet';

const bf = new BrowseFleet({ apiKey: 'bf_...' });

const competitors = [
  {
    name: 'Competitor A',
    pricingUrl: 'https://competitor-a.com/pricing',
    featuresUrl: 'https://competitor-a.com/features',
  },
  // ... more competitors
];

for (const competitor of competitors) {
  // Screenshot pricing page for visual diff
  const pricingScreenshot = await bf.screenshot(
    competitor.pricingUrl,
    { fullPage: true, stealth: 'full' }
  );

  // Extract pricing data as markdown
  const { markdown: pricing } = await bf.scrape(
    competitor.pricingUrl,
    { stealth: 'full' }
  );

  // Extract features
  const { markdown: features } = await bf.scrape(
    competitor.featuresUrl,
    { stealth: 'full' }
  );

  // Compare with last snapshot
  const changes = await diffWithPrevious(
    competitor.name,
    { pricing, features, pricingScreenshot }
  );

  if (changes.length > 0) {
    // Use LLM to summarize changes
    const summary = await summarizeChanges(changes);
    await notifyTeam(competitor.name, summary);
  }

  // Store current snapshot
  await saveSnapshot(competitor.name, {
    pricing, features, pricingScreenshot
  });
}`,
    benefits: [
      "Stealth mode accesses competitor sites without detection",
      "Screenshots enable visual change detection",
      "Markdown output feeds into LLM-powered analysis",
      "Parallel monitoring of multiple competitors",
      "Per-session proxies prevent IP blocking",
      "Automated scheduling for continuous monitoring",
    ],
  },
];
