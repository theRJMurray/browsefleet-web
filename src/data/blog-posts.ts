export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  publishedAt: string;
  readingTime: number;
  headings: string[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-build-ai-web-agent-2026",
    title: "How to Build an AI Web Agent in 2026",
    metaTitle: "How to Build an AI Web Agent in 2026 | BrowseFleet",
    metaDescription: "Learn to build AI web agents using vision models and cloud browsers. Architecture patterns, code examples, and best practices for Claude and GPT-4o agents.",
    excerpt: "A complete guide to building AI agents that can browse and interact with the real web using vision models, cloud browsers, and the screenshot-action loop.",
    publishedAt: "2026-03-15",
    readingTime: 10,
    headings: [
      "What Are AI Web Agents",
      "The Screenshot-Action Loop",
      "Architecture Patterns",
      "Building Your First Agent with BrowseFleet",
      "Claude vs GPT-4o for Vision-Based Automation",
      "Handling Failures and Edge Cases",
      "Production Deployment",
      "Best Practices",
    ],
    content: `AI web agents are autonomous programs that can browse, interact with, and extract information from websites using the same visual interface that humans use. Instead of parsing HTML or calling APIs, these agents look at screenshots and decide what to click, type, or scroll, just like a person sitting at a computer.

In 2026, this is no longer a research project. Vision-capable language models from Anthropic, OpenAI, and Google can reliably interpret web interfaces and make decisions about how to interact with them. The missing piece has been reliable browser infrastructure. Running headless browsers locally is fragile, gets detected by anti-bot systems, and does not scale. Cloud browser APIs solve this.

## What Are AI Web Agents

An AI web agent is a program that combines three components: a browser (for rendering and interacting with web pages), a vision-capable language model (for understanding what is on the screen and deciding what to do), and an orchestration layer (for managing the loop between the two).

The agent receives a task like "find the cheapest flight from NYC to London on March 20" and then browses the web autonomously to complete it. It navigates to travel sites, fills in search forms, reads results, compares prices, and reports back.

What makes this possible in 2026 is the convergence of three technologies: models like Claude Sonnet and GPT-4o that can accurately interpret screenshots, APIs like Anthropic's Computer Use that formalize the interaction protocol, and cloud browser services like BrowseFleet that provide scalable, stealth browser infrastructure.

## The Screenshot-Action Loop

The core architecture of every AI web agent is the screenshot-action loop:

1. Take a screenshot of the current browser state
2. Send the screenshot to a vision model with the task description
3. The model returns an action (click coordinates, text to type, scroll direction)
4. Execute the action in the browser
5. Take a new screenshot
6. Repeat until the task is complete

This loop is simple in concept but has important nuances in practice. The screenshot must capture enough context for the model to make good decisions. Actions need error handling. What if a click lands on the wrong element? And the loop needs a termination condition so the agent does not run forever.

Here is the basic loop implemented with BrowseFleet and Claude:

\`\`\`typescript
import { BrowseFleet } from 'browsefleet';
import Anthropic from '@anthropic-ai/sdk';

const bf = new BrowseFleet({ apiKey: 'bf_...' });
const anthropic = new Anthropic();

const session = await bf.sessions.create({
  stealth: 'full',
  viewport: { width: 1280, height: 800 },
});

let screenshot = await bf.computer.navigate(session.id, 'https://target-site.com');
let done = false;
const maxSteps = 50;
let step = 0;

while (!done && step < maxSteps) {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: [
        { type: 'image', source: { type: 'base64', media_type: 'image/png', data: screenshot } },
        { type: 'text', text: taskDescription },
      ],
    }],
  });

  const action = parseAction(response);
  if (action.type === 'complete') {
    done = true;
  } else {
    screenshot = await bf.computer.execute(session.id, action);
  }
  step++;
}

await session.close();
\`\`\`

## Architecture Patterns

There are three common patterns for structuring AI web agents:

**Single-model loop.** One model handles both perception (understanding the screenshot) and decision-making (choosing the next action). This is the simplest pattern and works well for straightforward tasks. The code example above uses this pattern.

**Planner-executor split.** A planning model breaks the task into steps, and an execution model handles each step. The planner might use a larger model like Claude Opus or GPT-4 for strategic decisions, while the executor uses a faster model like Claude Sonnet or GPT-4o-mini for individual actions. This pattern is more reliable for complex, multi-step tasks.

**Multi-agent collaboration.** Multiple agents work on different aspects of a task simultaneously. For example, one agent researches pricing on a competitor's site while another checks product availability on a supplier's site. BrowseFleet's concurrent sessions make this practical since each agent gets its own isolated browser session.

The right pattern depends on your use case. Start with the single-model loop and graduate to more complex patterns only when you need them.

## Building Your First Agent with BrowseFleet

Let us build a practical agent that researches a topic on the web and produces a summary. This is a common starting point for AI agent projects.

\`\`\`typescript
import { BrowseFleet } from 'browsefleet';
import Anthropic from '@anthropic-ai/sdk';

const bf = new BrowseFleet({ apiKey: 'bf_...' });
const anthropic = new Anthropic();

async function researchTopic(topic: string): Promise<string> {
  const session = await bf.sessions.create({
    stealth: 'full',
    viewport: { width: 1920, height: 1080 },
  });

  // Step 1: Search for the topic
  let screenshot = await bf.computer.navigate(
    session.id,
    \`https://www.google.com/search?q=\${encodeURIComponent(topic)}\`
  );

  // Step 2: Collect content from top results
  const sources: string[] = [];
  const topResults = 3;

  for (let i = 0; i < topResults; i++) {
    // Ask Claude to find and click the next result
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: 'image/png', data: screenshot } },
          { type: 'text', text: \`Click on search result #\${i + 1}. Return the click coordinates.\` },
        ],
      }],
    });

    const action = parseAction(response);
    screenshot = await bf.computer.execute(session.id, action);

    // Scrape the page content
    const currentUrl = await bf.computer.getUrl(session.id);
    const { markdown } = await bf.scrape(currentUrl);
    sources.push(markdown.slice(0, 2000));

    // Navigate back to search results
    screenshot = await bf.computer.navigate(session.id, 'javascript:history.back()');
  }

  await session.close();

  // Step 3: Synthesize a summary
  const synthesis = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: \`Based on these sources, write a comprehensive summary about "\${topic}":\\n\\n\${sources.map((s, i) => \`Source \${i + 1}:\\n\${s}\`).join('\\n\\n')}\`,
    }],
  });

  return synthesis.content[0].text;
}
\`\`\`

This example demonstrates the key patterns: using BrowseFleet's Computer API for visual navigation, the scrape endpoint for content extraction, and a vision model for decision-making.

## Claude vs GPT-4o for Vision-Based Automation

Both Claude and GPT-4o are capable of driving web agents, but they have different strengths.

**Claude (Sonnet and Opus)** excels at understanding complex layouts, following multi-step instructions, and providing structured output. Anthropic's Computer Use API formalizes the agent interaction protocol, making Claude the most natural fit for web agents. Claude is also better at spatial reasoning, accurately identifying where to click on a page.

**GPT-4o** has strong vision capabilities and is fast. It works well for simple, repetitive tasks where speed matters more than nuanced understanding. GPT-4o-mini is significantly cheaper and can handle straightforward interactions at lower cost.

In practice, many production agents use Claude for complex tasks and GPT-4o-mini for simple, high-volume tasks. BrowseFleet's Computer API works with both. It returns standard base64 screenshots that any vision model can process.

## Handling Failures and Edge Cases

Real-world web agents encounter many failure modes. Here are the most common and how to handle them:

**Page load failures.** Websites time out, return errors, or redirect unexpectedly. Always set a timeout on page loads and implement retry logic with exponential backoff.

**Model misinterpretation.** The vision model sometimes clicks the wrong element or misreads text. Implement validation steps. After an action, check that the page state changed as expected. If not, try an alternative action.

**CAPTCHAs.** Many websites present CAPTCHAs to automated browsers. BrowseFleet's built-in CAPTCHA solving handles reCAPTCHA, hCaptcha, and Turnstile automatically. Enable it with the captchaSolving option.

**Bot detection.** Anti-bot systems detect automated browsers through fingerprinting, behavior analysis, and WebDriver flags. BrowseFleet's stealth mode handles this, but avoid inhuman behavior patterns like clicking at exactly the same coordinates every time or navigating at impossible speeds.

**Infinite loops.** Without a clear termination condition, agents can loop forever. Always set a maximum step count and implement explicit completion detection.

## Production Deployment

Moving from a prototype to a production agent deployment requires attention to several concerns:

**Concurrency.** Production agents often need to handle multiple tasks simultaneously. Use BrowseFleet's concurrent sessions to run multiple agents in parallel, each in an isolated browser environment.

**Cost management.** Vision model API calls are expensive. Optimize by using the smallest model that works for each subtask, reducing screenshot resolution where detail is not needed, and caching results for repeated queries.

**Monitoring.** Log every step of the agent loop: screenshots, model responses, and actions taken. This is essential for debugging when agents fail and for improving agent performance over time.

**Error recovery.** Implement checkpoint-based recovery so agents can resume from the last successful step after a failure, rather than starting over.

## Best Practices

After building dozens of AI web agents, these are the practices that make the biggest difference:

**Start simple.** Begin with a single-model loop and a well-defined task. Add complexity only when the simple approach fails.

**Use stealth mode always.** Even if a site does not seem to block bots today, anti-bot measures change frequently. Running with stealth mode enabled by default prevents surprises in production.

**Combine vision with DOM.** For data extraction, do not rely solely on screenshots. Use BrowseFleet's scrape endpoint to get clean Markdown, then use the model to structure it. This is more reliable and cheaper than asking the model to read data from screenshots.

**Test with real websites.** Synthetic test pages do not capture the complexity of real websites. Test your agents against the actual sites they will interact with in production.

**Set hard limits.** Every agent should have a maximum number of steps, a timeout, and a cost cap. Without these, a confused agent can burn through your API budget in minutes.`,
  },
  {
    slug: "steel-vs-browsefleet-honest-comparison",
    title: "Steel vs BrowseFleet: An Honest Comparison",
    metaTitle: "Steel vs BrowseFleet: An Honest Comparison (2026) | BrowseFleet",
    metaDescription: "An honest, detailed comparison of Steel.dev and BrowseFleet. Features, pricing, self-hosting, and when to use each cloud browser API.",
    excerpt: "A fair, detailed comparison of Steel and BrowseFleet, two cloud browser APIs built for AI agents. We acknowledge Steel's strengths and explain where BrowseFleet differs.",
    publishedAt: "2026-03-18",
    readingTime: 10,
    headings: [
      "Background",
      "Core Architecture",
      "Feature-by-Feature Comparison",
      "Pricing Breakdown",
      "Developer Experience",
      "When to Use Steel",
      "When to Use BrowseFleet",
      "Migration Guide",
    ],
    content: `Steel and BrowseFleet are both cloud browser APIs designed for developers and AI agents. They solve the same core problem (running headless browsers in the cloud without managing infrastructure) but they take different approaches. This comparison is written by the BrowseFleet team, but we have made an effort to be fair and accurate. We will acknowledge where Steel does well.

## Background

Steel.dev launched as a cloud browser API focused on developer experience and AI agent workflows. It has built a solid reputation for reliability and clean API design. The team ships frequently and has a growing community.

BrowseFleet is open-source and self-hostable. It was built with the belief that browser infrastructure should not be a black box. Developers should be able to audit the code, run it on their own servers, and customize it for their needs. BrowseFleet also includes features like built-in CAPTCHA solving and a Computer API that Steel does not offer.

Both are good products. The right choice depends on your specific requirements.

## Core Architecture

**Steel** is a managed cloud service. Your requests go to Steel's infrastructure, which provisions browser instances, manages their lifecycle, and returns results. This is the simpler operational model. You do not manage any infrastructure.

**BrowseFleet** offers both a managed cloud service and self-hosting via Docker. The managed service works the same way as Steel. Self-hosting gives you complete control over the infrastructure, data, and costs.

Both provide CDP WebSocket endpoints for connecting Puppeteer, Playwright, and other browser automation libraries.

## Feature-by-Feature Comparison

**Sessions API.** Both Steel and BrowseFleet provide session management with CDP WebSocket endpoints. Both support connecting Puppeteer and Playwright. BrowseFleet additionally supports Selenium via a compatibility endpoint. The APIs are comparable in functionality.

**Stealth mode.** Both offer stealth capabilities to bypass bot detection. Steel's stealth is reliable and handles most anti-bot systems. BrowseFleet's stealth includes fingerprint spoofing, WebDriver masking, and timezone matching. In our testing, both perform well against common bot detection services.

**CAPTCHA solving.** BrowseFleet includes built-in CAPTCHA solving via 2captcha integration, supporting reCAPTCHA, hCaptcha, and Cloudflare Turnstile. Steel does not include built-in CAPTCHA solving, so you need to integrate a third-party service yourself. This is a meaningful difference if your workflows regularly encounter CAPTCHAs.

**Computer API.** BrowseFleet's Computer API provides click, type, scroll, and navigate actions that return screenshots after every action. This is purpose-built for the AI agent screenshot-action loop used by Claude Computer Use and similar systems. Steel does not have an equivalent, so you would build this on top of their session API using Puppeteer.

**Quick actions.** BrowseFleet offers one-call endpoints for scraping (returns HTML, Markdown, text), screenshots, and PDF generation without creating a session. Steel focuses on session-based workflows; simple tasks still require creating and managing a session.

**Cookie persistence.** BrowseFleet supports saving and restoring browser profiles across sessions, including cookies, localStorage, and auth state. This is useful for maintaining logged-in sessions. Steel handles cookies within a session but does not offer cross-session profile persistence.

**Proxy support.** BrowseFleet supports per-session proxy URLs with SOCKS5 and HTTP authentication. Steel supports proxy configuration but with fewer options.

**Self-hosting.** BrowseFleet is open-source and runs in a single Docker container with no external dependencies. Steel is cloud-only with no self-hosting option. For organizations with data residency requirements, compliance concerns, or a desire to control costs at scale, this is often the deciding factor.

## Pricing Breakdown

Steel's pricing is session-minute based. Plans start around $49/month. There is no free tier for experimentation.

BrowseFleet's pricing:
- Hobby (Free): 5 concurrent sessions, 500 daily requests
- Starter ($29/mo): 10 concurrent sessions, 1,000 daily requests
- Developer ($99/mo): 20 concurrent sessions, unlimited requests
- Pro ($499/mo): 100 concurrent sessions, unlimited requests
- Self-hosted: Free, no limits

For a team running 20 concurrent sessions with moderate usage, BrowseFleet's Developer plan at $99/month is comparable to or cheaper than Steel. At higher concurrency levels, the gap widens in BrowseFleet's favor. Self-hosting eliminates cloud costs entirely. You only pay for your server infrastructure.

## Developer Experience

This is where Steel deserves genuine credit. Their SDK is polished, the documentation is well-written, and the onboarding experience is smooth. If you are evaluating cloud browser APIs for the first time, Steel makes a strong first impression.

BrowseFleet's developer experience is also good. The API is clean, the documentation covers every feature, and there are copy-paste code examples for common use cases. But we acknowledge that Steel has invested heavily in DX and it shows.

Both provide TypeScript SDKs. Both have active communities where you can get help.

## When to Use Steel

Steel is a good choice when:
- You want a fully managed service and do not want to think about infrastructure at all
- You value the polished developer experience and are willing to pay for it
- Your workflows do not require CAPTCHA solving or cross-session cookie persistence
- You do not need to self-host for compliance or cost reasons
- You prefer a cloud-only solution backed by a well-funded company

## When to Use BrowseFleet

BrowseFleet is the better choice when:
- You need self-hosting for data residency, compliance, or cost control
- Your workflows encounter CAPTCHAs that need automatic solving
- You are building AI agents and want the Computer API for the screenshot-action loop
- You want an open-source solution you can audit, customize, and contribute to
- You need a free tier for prototyping and experimentation
- You want per-session proxy configuration with SOCKS5 support
- You need cookie and profile persistence across sessions
- Cost is a concern and you want lower per-session pricing or self-hosting

## Migration Guide

If you are currently using Steel and want to try BrowseFleet, the migration is straightforward because both use standard CDP WebSocket endpoints.

**Step 1: Install the BrowseFleet SDK.**

\`\`\`bash
npm install browsefleet
\`\`\`

**Step 2: Replace the session creation.**

\`\`\`typescript
// Before (Steel)
import Steel from 'steel-sdk';
const steel = new Steel({ apiKey: 'steel_...' });
const session = await steel.sessions.create();
const wsUrl = session.websocketUrl;

// After (BrowseFleet)
import { BrowseFleet } from 'browsefleet';
const bf = new BrowseFleet({ apiKey: 'bf_...' });
const session = await bf.sessions.create({ stealth: 'full' });
const wsUrl = session.websocketUrl;
\`\`\`

**Step 3: Keep your Puppeteer/Playwright code as-is.** Both SDKs provide a standard CDP WebSocket URL, so your browser automation code does not change.

\`\`\`typescript
// This code works with both Steel and BrowseFleet
const browser = await puppeteer.connect({
  browserWSEndpoint: wsUrl,
});
\`\`\`

**Step 4: Take advantage of BrowseFleet features.** Once migrated, you can start using BrowseFleet-specific features like CAPTCHA solving, the Computer API, and cookie persistence.

The migration typically takes 15-30 minutes for a simple project. The main effort is replacing the SDK import and session creation. Everything else stays the same.`,
  },
  {
    slug: "web-scraping-at-scale-definitive-guide",
    title: "Web Scraping at Scale: The Definitive Guide",
    metaTitle: "Web Scraping at Scale: The Definitive Guide (2026) | BrowseFleet",
    metaDescription: "Learn to build scalable web scraping systems with cloud browsers. Architecture, anti-bot bypass, error handling, and production best practices.",
    excerpt: "Everything you need to know about building reliable, large-scale web scraping systems, from architecture decisions to handling failures in production.",
    publishedAt: "2026-03-20",
    readingTime: 12,
    headings: [
      "Why Scraping Is Hard",
      "Architecture for Scale",
      "Choosing Your Approach: Quick Actions vs Sessions",
      "Handling Anti-Bot Protections",
      "Proxy Strategy",
      "Error Handling and Retries",
      "Rate Limiting and Politeness",
      "Data Quality and Validation",
      "Monitoring Your Scraping Pipeline",
      "Cost Optimization",
    ],
    content: `Web scraping at scale is one of the hardest problems in web engineering. A script that works for 10 pages breaks at 1,000. A system that handles 1,000 pages crumbles at 100,000. The challenges are not just technical. They are architectural, operational, and economic.

This guide covers everything you need to build a production scraping system that handles millions of pages reliably.

## Why Scraping Is Hard

Scraping a single page is easy. You fetch the HTML, parse it, extract data. Anyone can do it in 20 lines of code.

Scraping at scale is hard for five reasons:

**Dynamic content.** Over 90% of modern websites render content with JavaScript. A simple HTTP GET returns an empty shell. You need a real browser to render the page, execute JavaScript, and wait for dynamic content to load. This means running headless browsers, which consume 200-500MB of RAM each.

**Anti-bot detection.** Websites use fingerprinting (checking browser properties for inconsistencies), behavioral analysis (detecting inhuman browsing patterns), CAPTCHAs (requiring human verification), and rate limiting (blocking IPs that make too many requests). These systems are sophisticated and constantly evolving.

**Scale challenges.** Each headless browser instance needs significant RAM and CPU. Running 100 concurrent browsers requires careful resource management. Browser instances leak memory, crash, and accumulate state that needs cleanup.

**Content structure changes.** Websites change their HTML structure without notice. A selector that worked yesterday returns nothing today. Your scraping system needs to handle these changes gracefully.

**Reliability.** At scale, everything that can fail will fail. Network errors, timeouts, partial page loads, unexpected redirects, cookie walls, login prompts, and rate limit responses. Your system needs to handle all of these.

## Architecture for Scale

A production scraping system has five components:

**URL queue.** A prioritized queue of URLs to scrape. This can be Redis, PostgreSQL, or a managed queue service. URLs enter the queue from a seed list, sitemap parser, or link extractor. The queue tracks each URL's state (pending, in-progress, completed, failed) and handles retries.

**Browser pool.** A pool of browser sessions managed by BrowseFleet. Instead of running local browsers, you create cloud sessions on demand and release them when done. BrowseFleet handles browser lifecycle, stealth, and isolation.

**Worker processes.** Workers pull URLs from the queue, acquire a browser session, scrape the page, and push extracted data to a storage layer. Workers should be stateless so you can scale them horizontally.

**Data pipeline.** Raw scraped data goes through validation, transformation, and deduplication before being stored. This prevents garbage data from entering your database.

**Monitoring.** Dashboards tracking success rates, error rates, latency, and cost. Alerts when success rates drop below thresholds.

Here is a simplified implementation:

\`\`\`typescript
import { BrowseFleet } from 'browsefleet';
import { Queue } from './queue';
import { DataStore } from './store';

const bf = new BrowseFleet({ apiKey: 'bf_...' });
const queue = new Queue('scrape-urls');
const store = new DataStore();

const CONCURRENCY = 20;

async function worker() {
  while (true) {
    const url = await queue.dequeue();
    if (!url) {
      await sleep(1000);
      continue;
    }

    try {
      // Use quick action for simple pages
      const { markdown, html } = await bf.scrape(url, {
        stealth: 'full',
        timeout: 30000,
      });

      const data = extractData(html);
      await store.save(url, data);
      await queue.complete(url);
    } catch (error) {
      await queue.retry(url, error);
    }
  }
}

// Run workers in parallel
await Promise.all(
  Array.from({ length: CONCURRENCY }, () => worker())
);
\`\`\`

## Choosing Your Approach: Quick Actions vs Sessions

BrowseFleet offers two approaches to scraping, and choosing the right one matters for both cost and reliability.

**Quick actions** (bf.scrape, bf.screenshot, bf.pdf) are single API calls that handle the entire browser lifecycle. You give it a URL, it launches a browser, navigates to the page, extracts content, and returns the result. Quick actions are ideal for simple, single-page scraping where you do not need to interact with the page.

**Sessions** give you a persistent browser that you control via Puppeteer or Playwright. You create a session, connect your automation library, and have full control over navigation, clicks, form filling, and multi-page workflows. Sessions are necessary when you need to log in, paginate, or interact with the page.

The rule of thumb: use quick actions for simple extraction, sessions for complex workflows. Quick actions are cheaper because the browser lifecycle is optimized. Sessions give you more control but cost more because the browser stays running.

## Handling Anti-Bot Protections

Anti-bot systems detect scrapers through several signals:

**Browser fingerprinting.** Real browsers have consistent properties: navigator.webdriver is undefined, WebGL renders correctly, the User-Agent matches the actual browser version. Headless browsers have telltale inconsistencies. BrowseFleet's stealth mode patches all known fingerprint leaks.

**Behavioral analysis.** Real humans scroll, pause, move the mouse, and browse at varying speeds. Bots navigate instantly and interact at inhuman speeds. When using sessions for interactive scraping, add realistic delays and avoid perfectly consistent timing.

**IP reputation.** Data center IPs are flagged by most anti-bot services. Residential and mobile proxies are less suspicious. BrowseFleet's per-session proxy support lets you rotate through residential proxies.

**CAPTCHAs.** When fingerprinting and behavioral analysis are not conclusive, sites present CAPTCHAs. BrowseFleet solves reCAPTCHA, hCaptcha, and Turnstile automatically when CAPTCHA solving is enabled.

\`\`\`typescript
const session = await bf.sessions.create({
  stealth: 'full',
  captchaSolving: true,
  proxy: 'socks5://user:pass@residential-proxy:1080',
});
\`\`\`

## Proxy Strategy

At scale, proxy management is critical. Here are the strategies that work:

**Datacenter proxies** are cheap ($1-5/GB) but easily detected. Use them for sites that do not have aggressive anti-bot measures.

**Residential proxies** use real consumer IP addresses and are much harder to detect. They cost more ($5-15/GB) but are necessary for sites with strong anti-bot systems. Rotate IPs per session to avoid patterns.

**ISP proxies** are datacenter IPs registered with ISPs, offering a middle ground between cost and detection resistance.

**Per-session rotation.** Assign each BrowseFleet session a different proxy to prevent IP correlation between requests. BrowseFleet supports this natively:

\`\`\`typescript
const proxies = ['socks5://proxy1:1080', 'socks5://proxy2:1080', ...];
let proxyIndex = 0;

const session = await bf.sessions.create({
  stealth: 'full',
  proxy: proxies[proxyIndex++ % proxies.length],
});
\`\`\`

## Error Handling and Retries

Every failure mode needs a specific response:

**Timeout errors.** The page did not load within the time limit. Retry with a longer timeout, or flag the URL for investigation if it fails repeatedly.

**HTTP errors (4xx, 5xx).** 403 usually means bot detection, so retry with a different proxy and fresh session. 429 means rate limiting, so back off and retry later. 5xx means the server is struggling, so retry with exponential backoff.

**CAPTCHA failures.** CAPTCHA solving can fail. Retry with a fresh session. If CAPTCHAs persist, the site may require a higher-quality proxy.

**Content validation failures.** The page loaded but the expected data is missing. This could mean the page structure changed, the content is behind a login wall, or the page is a soft block. Log the full HTML for investigation.

Implement a retry budget. Each URL gets 3-5 attempts before being moved to a dead letter queue for manual investigation.

\`\`\`typescript
async function scrapeWithRetry(url: string, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const { markdown } = await bf.scrape(url, {
        stealth: 'full',
        timeout: 30000,
      });
      const data = extractData(markdown);
      if (validateData(data)) return data;
      throw new Error('Validation failed');
    } catch (error) {
      if (attempt === maxRetries - 1) throw error;
      await sleep(Math.pow(2, attempt) * 1000);
    }
  }
}
\`\`\`

## Rate Limiting and Politeness

Aggressive scraping can harm the target site and get you permanently banned. Implement these safeguards:

**Per-domain rate limiting.** Never exceed 1 request per second to a single domain unless you know the site can handle more. BrowseFleet's concurrent sessions make it easy to scrape multiple domains in parallel while respecting per-domain limits.

**robots.txt compliance.** Check robots.txt before scraping. While robots.txt is not legally binding in most jurisdictions, respecting it is good practice and reduces the chance of being blocked.

**Off-peak scraping.** Schedule heavy scraping during the target site's off-peak hours to minimize impact on their infrastructure.

## Data Quality and Validation

Raw scraped data is noisy. Build validation into your pipeline:

**Schema validation.** Define expected data shapes and reject results that do not match. If you expect a price field, verify it is a valid number.

**Deduplication.** The same content can appear at multiple URLs. Hash the extracted data and skip duplicates.

**Freshness tracking.** Track when each piece of data was last scraped. Stale data needs re-scraping.

**Change detection.** Compare new data with previous scrapes. Large unexpected changes may indicate a scraping error rather than a real change.

## Monitoring Your Scraping Pipeline

Monitor these metrics:

**Success rate.** Percentage of URLs that return valid data. Target above 95%. A drop below 90% indicates a systemic issue.

**Error distribution.** Break down failures by type (timeout, HTTP error, validation failure, CAPTCHA). This tells you where to focus optimization.

**Latency.** Average and p99 time per scrape. Increasing latency often predicts upcoming failures.

**Cost per page.** Track browser-hours and API calls per successfully scraped page. Optimize the most expensive patterns.

## Cost Optimization

Scraping at scale can be expensive. Here are the biggest wins:

**Use quick actions for simple pages.** Quick actions are cheaper than sessions because the browser lifecycle is optimized.

**Minimize session duration.** With sessions, close them as soon as you are done. Do not keep sessions idle.

**Cache aggressively.** If a page has not changed (check via HTTP headers or content hash), do not re-scrape it.

**Use the right concurrency.** More concurrent sessions means faster scraping but higher costs. Find the concurrency level that balances speed and budget.

**Self-host for high volume.** If you are scraping millions of pages per month, self-hosting BrowseFleet on your own infrastructure can reduce costs by 80% or more compared to any cloud browser API.`,
  },
  {
    slug: "captcha-solving-for-ai-agents",
    title: "CAPTCHA Solving for AI Agents",
    metaTitle: "CAPTCHA Solving for AI Agents: A Practical Guide | BrowseFleet",
    metaDescription: "How to handle CAPTCHAs in automated browser workflows. Types, solving services, integration with BrowseFleet, and ethical considerations.",
    excerpt: "A practical guide to handling CAPTCHAs in automated browser workflows: the types you will encounter, how solving works, and how to integrate it with your agent.",
    publishedAt: "2026-03-22",
    readingTime: 7,
    headings: [
      "Why CAPTCHAs Exist",
      "Types of CAPTCHAs",
      "How Solving Services Work",
      "Integration with BrowseFleet",
      "Reducing CAPTCHA Frequency",
      "Ethics and Legal Considerations",
    ],
    content: `CAPTCHAs are the most common obstacle that AI agents and scrapers encounter on the web. They are designed to distinguish humans from bots, and they are effective. Without a solving strategy, your automation will fail on a significant percentage of websites.

This guide covers the practical side of CAPTCHA handling: what you will encounter, how to solve them, and how to reduce their frequency.

## Why CAPTCHAs Exist

CAPTCHAs serve a legitimate purpose. They protect websites from spam, credential stuffing, inventory hoarding, and abusive scraping. Sites use them as a last line of defense when other anti-bot measures (fingerprinting, rate limiting, behavioral analysis) are inconclusive.

Understanding why CAPTCHAs appear helps you reduce their frequency. If your automation triggers CAPTCHAs on every request, something else is wrong: your stealth configuration, your request pattern, or your IP reputation.

## Types of CAPTCHAs

**reCAPTCHA v2 (checkbox).** Google's "I'm not a robot" checkbox. It evaluates browser signals and user behavior. If suspicious, it presents image selection challenges ("select all traffic lights"). This is the most common CAPTCHA on the web.

**reCAPTCHA v3 (invisible).** A score-based system that runs invisibly in the background. It assigns each user a score from 0.0 (bot) to 1.0 (human). The website decides what score threshold triggers a challenge. Because it is invisible, you may not realize it is blocking your automation until requests start failing silently.

**hCaptcha.** Similar to reCAPTCHA v2 with image selection challenges. Used by Cloudflare and many sites that want a reCAPTCHA alternative. hCaptcha is increasingly common because it pays website operators for traffic.

**Cloudflare Turnstile.** Cloudflare's lightweight alternative to traditional CAPTCHAs. It usually runs invisibly and presents a visual challenge only when the browser signals are suspicious. Turnstile is fast and less intrusive than reCAPTCHA or hCaptcha.

**Text-based CAPTCHAs.** Distorted text that users must read and type. These are older and less common but still appear on some sites. They are the easiest to solve with OCR.

**Custom CAPTCHAs.** Some sites build their own CAPTCHA systems: slider puzzles, math problems, or drag-and-drop challenges. These require custom solving logic.

## How Solving Services Work

CAPTCHA solving services like 2captcha use a combination of human workers and machine learning to solve CAPTCHAs:

1. Your automation detects a CAPTCHA on the page
2. It sends the CAPTCHA parameters (site key, page URL, CAPTCHA type) to the solving service
3. The service solves the CAPTCHA (typically in 10-30 seconds for reCAPTCHA, 5-15 seconds for hCaptcha)
4. Your automation receives a token
5. You inject the token into the page to bypass the CAPTCHA

The cost is typically $1-3 per 1,000 CAPTCHAs for reCAPTCHA and hCaptcha.

## Integration with BrowseFleet

BrowseFleet includes built-in CAPTCHA solving via 2captcha. When enabled, it automatically detects CAPTCHAs on pages and solves them without any additional code on your part.

\`\`\`typescript
import { BrowseFleet } from 'browsefleet';

const bf = new BrowseFleet({ apiKey: 'bf_...' });

// CAPTCHA solving is handled automatically
const session = await bf.sessions.create({
  stealth: 'full',
  captchaSolving: true,
});

const browser = await puppeteer.connect({
  browserWSEndpoint: session.websocketUrl,
});

const page = await browser.newPage();
await page.goto('https://protected-site.com');

// If a CAPTCHA appears, BrowseFleet solves it automatically
// Your code does not need to handle it

const data = await page.evaluate(() =>
  document.querySelector('.content')?.textContent
);

await session.close();
\`\`\`

For quick actions, CAPTCHA solving works the same way:

\`\`\`typescript
const { markdown } = await bf.scrape(
  'https://protected-site.com/data',
  { stealth: 'full', captchaSolving: true }
);
\`\`\`

BrowseFleet handles the detection, submission to the solving service, and token injection transparently. You do not need to write any CAPTCHA-specific code.

## Reducing CAPTCHA Frequency

Solving CAPTCHAs costs money and adds latency. The best strategy is to reduce how often they appear:

**Use stealth mode.** BrowseFleet's stealth mode patches all known browser fingerprint leaks. Sites present CAPTCHAs when they suspect automation, so good stealth reduces suspicion.

**Use residential proxies.** Datacenter IPs are frequently flagged by CAPTCHA services. Residential proxies have better reputation scores.

**Maintain cookies.** BrowseFleet's cookie persistence feature lets you save and restore browser profiles. A browser with established cookies and browsing history looks less suspicious than a fresh instance.

**Add realistic delays.** Do not navigate at inhuman speeds. Add 1-3 second delays between page loads and interactions. Vary the timing randomly.

**Warm up sessions.** Before visiting the target page, navigate to a few other pages on the same domain. This builds a browsing history that makes the session look more legitimate.

With good stealth, residential proxies, and cookie persistence, most sites will not present CAPTCHAs at all. Solving should be a fallback, not the primary strategy.

## Ethics and Legal Considerations

CAPTCHA solving exists in a gray area. Here are the considerations:

**Terms of service.** Most websites prohibit automated access in their ToS. Using a CAPTCHA solving service to bypass protections may violate these terms. This is a legal and ethical decision you need to make based on your use case.

**Legitimate use cases.** Automated accessibility testing, compliance monitoring, academic research, and price comparison services often have legitimate reasons to access CAPTCHA-protected content.

**Rate and impact.** There is a difference between scraping a site once per day for price monitoring and hammering it with thousands of requests per hour. Respectful automation that does not harm the site's performance is viewed more favorably.

**Alternatives.** Before solving CAPTCHAs, check if the site offers an API, a data feed, or an affiliate program that provides the data you need through official channels. These are always preferable to scraping.

The decision to use CAPTCHA solving should be made thoughtfully, considering the specific use case, the target site's terms of service, and the potential impact on the site and its users.`,
  },
  {
    slug: "self-hosting-browser-infrastructure",
    title: "Self-Hosting Your Browser Infrastructure",
    metaTitle: "Self-Hosting Your Browser Infrastructure with Docker | BrowseFleet",
    metaDescription: "Complete guide to self-hosting BrowseFleet. Docker setup, resource planning, monitoring, scaling, and when self-hosting makes sense.",
    excerpt: "A complete guide to running BrowseFleet on your own infrastructure, from Docker setup to resource planning and monitoring.",
    publishedAt: "2026-03-25",
    readingTime: 7,
    headings: [
      "Why Self-Host",
      "Docker Setup",
      "Resource Planning",
      "Configuration",
      "Monitoring and Alerting",
      "Scaling Strategies",
    ],
    content: `BrowseFleet is fully open-source and designed to run on your own infrastructure. Self-hosting gives you complete control over your data, eliminates per-session cloud costs, and lets you customize the system for your specific needs.

This guide covers everything you need to get BrowseFleet running in production on your own servers.

## Why Self-Host

Self-hosting makes sense in several scenarios:

**Cost.** If you run more than 50 concurrent browser sessions consistently, self-hosting is significantly cheaper than any cloud browser API. A $200/month server can run 50+ concurrent sessions, which would cost $500+ on BrowseFleet's cloud or more on competitors.

**Data privacy.** All browser traffic flows through your infrastructure. No third party sees your scraped data, cookies, or authentication credentials. This matters for compliance-sensitive industries and when handling personal data.

**Customization.** You can modify the BrowseFleet source code to add custom features, change default behaviors, or integrate with internal systems. This is not possible with cloud-only services.

**Latency.** Run BrowseFleet close to your target websites or your application servers to minimize network latency.

**No rate limits.** Cloud plans have concurrency limits and daily request caps. Self-hosted BrowseFleet has no artificial limits. Your only constraint is hardware.

## Docker Setup

BrowseFleet runs as a single Docker container with no external dependencies.

\`\`\`bash
# Pull the latest image
docker pull browsefleet/browsefleet:latest

# Run with default configuration
docker run -d \\
  --name browsefleet \\
  -p 3000:3000 \\
  -e API_KEY=bf_your_secret_key \\
  browsefleet/browsefleet:latest
\`\`\`

For production, use Docker Compose:

\`\`\`yaml
# docker-compose.yml
version: '3.8'

services:
  browsefleet:
    image: browsefleet/browsefleet:latest
    container_name: browsefleet
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - API_KEY=bf_your_secret_key
      - MAX_CONCURRENT_SESSIONS=50
      - SESSION_TIMEOUT=300
      - STEALTH_DEFAULT=full
      - LOG_LEVEL=info
    volumes:
      - browsefleet-data:/data
    shm_size: '2gb'
    deploy:
      resources:
        limits:
          memory: 16G
          cpus: '8'

volumes:
  browsefleet-data:
\`\`\`

The shm_size setting is critical. Chrome uses /dev/shm for shared memory, and the default Docker allocation (64MB) is too small. Set it to at least 2GB for production workloads.

\`\`\`bash
docker compose up -d
\`\`\`

Verify the installation:

\`\`\`bash
curl http://localhost:3000/health
# {"status": "ok", "version": "1.0.0", "sessions": 0}
\`\`\`

## Resource Planning

Each browser session consumes approximately:
- **RAM:** 150-300MB idle, up to 500MB for complex pages
- **CPU:** 0.1-0.5 cores per active session
- **Disk:** 50-100MB for profile data (if using cookie persistence)

Use these numbers to plan your infrastructure:

| Concurrent Sessions | RAM | CPU | Recommended Instance |
|---------------------|-----|-----|---------------------|
| 10 | 8GB | 4 cores | 8GB/4vCPU VM |
| 25 | 16GB | 8 cores | 16GB/8vCPU VM |
| 50 | 32GB | 16 cores | 32GB/16vCPU VM |
| 100 | 64GB | 32 cores | 64GB/32vCPU VM |

These are conservative estimates. BrowseFleet manages browser lifecycle aggressively. Idle sessions are suspended, crashed browsers are cleaned up, and memory is reclaimed when sessions close.

Add 20-30% headroom above your expected peak concurrency to handle spikes without degradation.

## Configuration

BrowseFleet is configured via environment variables:

\`\`\`bash
# Authentication
API_KEY=bf_your_secret_key

# Session limits
MAX_CONCURRENT_SESSIONS=50
SESSION_TIMEOUT=300          # seconds
MAX_SESSION_DURATION=3600    # seconds

# Stealth
STEALTH_DEFAULT=full         # none, basic, full

# CAPTCHA solving (optional)
CAPTCHA_API_KEY=your_2captcha_key
CAPTCHA_PROVIDER=2captcha

# Proxy (optional default proxy)
DEFAULT_PROXY=socks5://user:pass@proxy:1080

# Logging
LOG_LEVEL=info               # debug, info, warn, error
\`\`\`

For CAPTCHA solving, you need a 2captcha API key. The CAPTCHA solving feature is optional. If not configured, CAPTCHAs will not be solved automatically.

## Monitoring and Alerting

BrowseFleet exposes a /metrics endpoint compatible with Prometheus:

\`\`\`bash
curl http://localhost:3000/metrics
\`\`\`

Key metrics to monitor:

**browsefleet_active_sessions** - Current number of active browser sessions. Alert when this approaches MAX_CONCURRENT_SESSIONS.

**browsefleet_session_duration_seconds** - Histogram of session durations. Unusually long sessions may indicate leaked sessions that are not being closed properly.

**browsefleet_memory_usage_bytes** - Total memory used by the BrowseFleet process and its browser instances. Alert at 80% of available RAM.

**browsefleet_request_errors_total** - Counter of failed requests by error type. A spike in errors indicates a systemic issue.

A basic Grafana dashboard showing these four metrics gives you sufficient visibility for most deployments.

## Scaling Strategies

When a single BrowseFleet instance is not enough:

**Vertical scaling.** The simplest approach: use a larger server. BrowseFleet scales well on a single machine up to about 100 concurrent sessions. Beyond that, you hit diminishing returns due to Chrome's memory overhead.

**Horizontal scaling with a load balancer.** Run multiple BrowseFleet instances behind a load balancer. Each instance manages its own pool of browser sessions. The load balancer distributes session creation requests across instances. Use sticky sessions so that once a session is created on an instance, subsequent requests for that session go to the same instance.

\`\`\`yaml
# docker-compose with multiple instances
services:
  browsefleet-1:
    image: browsefleet/browsefleet:latest
    environment:
      - MAX_CONCURRENT_SESSIONS=50
    shm_size: '2gb'

  browsefleet-2:
    image: browsefleet/browsefleet:latest
    environment:
      - MAX_CONCURRENT_SESSIONS=50
    shm_size: '2gb'

  nginx:
    image: nginx
    ports:
      - "3000:3000"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
\`\`\`

**Kubernetes.** For large-scale deployments, run BrowseFleet as a Kubernetes Deployment with horizontal pod autoscaling based on active session count. This is the most operationally complex option but provides the best scalability.

Start with a single instance and scale as your needs grow. Most teams never need more than one instance.`,
  },
  {
    slug: "puppeteer-in-cloud-why-local-browsers-dont-scale",
    title: "Puppeteer in the Cloud: Why Local Browsers Don't Scale",
    metaTitle: "Puppeteer in the Cloud: Why Local Browsers Don't Scale | BrowseFleet",
    metaDescription: "Why running Puppeteer locally breaks at scale. Memory issues, CI/CD problems, and how to migrate to cloud browsers with a one-line code change.",
    excerpt: "Local Puppeteer works fine for prototyping. It breaks when you need concurrency, CI/CD, or production reliability. Here is why and how to fix it.",
    publishedAt: "2026-03-27",
    readingTime: 7,
    headings: [
      "The Local Puppeteer Problem",
      "Memory and Resource Issues",
      "CI/CD Headaches",
      "Concurrency Limits",
      "The One-Line Migration",
      "Performance Comparison",
    ],
    content: `Puppeteer is the most popular library for browser automation in Node.js, with over 90,000 stars on GitHub. It provides a clean API for controlling Chrome and Chromium. For development and prototyping, running Puppeteer locally works fine.

In production, it breaks.

## The Local Puppeteer Problem

Running Puppeteer locally means launching a real Chrome browser process on your machine or server. Chrome is not designed to be a server application. It was built for humans browsing the web on their personal computers. When you try to run it as infrastructure, you hit a wall.

The problems start small. A script that processes 10 pages works perfectly. At 50 pages, you notice occasional crashes. At 200 pages, your server runs out of memory. At 1,000 pages, you need to rethink your entire architecture.

Every team that builds browser automation goes through this progression. The question is not whether local Puppeteer will fail, but when.

## Memory and Resource Issues

Each Chrome instance consumes 150-500MB of RAM depending on the page complexity. A complex single-page application with heavy JavaScript can push this to 800MB or more.

When you run multiple instances concurrently, memory usage multiplies:

| Concurrent Browsers | RAM Usage | Typical Server |
|---------------------|-----------|----------------|
| 1 | 300MB | Any machine |
| 5 | 1.5GB | Manageable |
| 10 | 3GB | Tight on 4GB servers |
| 20 | 6GB | Needs 8GB+ server |
| 50 | 15GB | Needs 32GB server |

But raw memory is not the only issue. Chrome leaks memory over time. Long-running instances accumulate state (cached resources, DOM nodes, JavaScript heap objects) that the garbage collector cannot reclaim. After hours of operation, a Chrome instance that started at 200MB might be using 500MB.

The solution for local Puppeteer is aggressive lifecycle management: kill and restart browser instances regularly, use incognito contexts to isolate pages, and implement watchdog processes that kill runaway browsers. This is complex code that every team writes from scratch.

With BrowseFleet, sessions are isolated and ephemeral by default. Each session starts fresh, and resources are fully reclaimed when the session closes. Memory leaks are not your problem.

## CI/CD Headaches

Running Puppeteer in CI/CD pipelines is a common source of frustration. The typical issues:

**Missing dependencies.** Chrome requires system libraries (libxss, libnss3, libatk-bridge, libgtk, and many more) that are not present in minimal CI containers. Teams maintain custom Dockerfiles or shell scripts that install these dependencies, and they break when CI base images update.

**Different behavior.** Tests that pass locally fail in CI because of font rendering differences, screen resolution, timing issues, or missing GPU acceleration. Developers waste hours debugging tests that only fail in the pipeline.

**Resource constraints.** CI runners have limited RAM and CPU. Running Chrome alongside your application, test framework, and other tools often exceeds the runner's memory limit, causing OOM kills.

**Headless mode quirks.** Chrome's headless mode (the "new headless" and the "old headless") behaves differently from headed mode in subtle ways. Some CSS features render differently, some JavaScript APIs behave differently, and some websites detect headless mode and serve different content.

BrowseFleet eliminates these issues entirely. Your CI pipeline makes HTTP requests to create sessions. It does not need Chrome, its dependencies, or the memory to run it. Tests are more reliable because the browser environment is identical regardless of where the test runs.

\`\`\`yaml
# Before: CI needs Chrome, system deps, lots of RAM
- name: Install Chrome
  run: |
    sudo apt-get update
    sudo apt-get install -y chromium-browser
    # ... 15 more system dependencies

# After: CI just needs network access
- name: Run Tests
  env:
    BROWSEFLEET_API_KEY: \${{ secrets.BF_KEY }}
  run: npm test
\`\`\`

## Concurrency Limits

The hardest problem with local Puppeteer is concurrency. Running multiple browser instances simultaneously requires:

**Process management.** Each Chrome instance is a separate process with multiple child processes (renderer, GPU, utility). Managing this process tree correctly (starting, monitoring, and killing instances) is non-trivial.

**Port management.** Each browser instance needs a unique debugging port. Allocating and recycling ports without conflicts requires careful bookkeeping.

**Resource isolation.** Without proper isolation, one browser instance can starve others of CPU or memory. A page that runs heavy JavaScript can slow down all concurrent browsers.

**Error recovery.** When one instance crashes (and they do crash), you need to clean up its resources, restart it, and retry the failed work without affecting other instances.

BrowseFleet handles all of this. Each session is an isolated browser instance managed by the BrowseFleet server. You create sessions, use them, and close them. The server handles process management, port allocation, resource isolation, and crash recovery.

## The One-Line Migration

The good news: migrating from local Puppeteer to BrowseFleet is trivial. Puppeteer's connect method accepts a WebSocket URL, and BrowseFleet provides one.

\`\`\`typescript
// Before: Local Puppeteer
import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

// After: BrowseFleet
import puppeteer from 'puppeteer-core';
import { BrowseFleet } from 'browsefleet';
const bf = new BrowseFleet({ apiKey: 'bf_...' });
const session = await bf.sessions.create({ stealth: 'full' });
const browser = await puppeteer.connect({
  browserWSEndpoint: session.websocketUrl,
});

// Everything below this line stays exactly the same
const page = await browser.newPage();
await page.goto('https://example.com');
const title = await page.title();
\`\`\`

Note that we switch from puppeteer to puppeteer-core. The full puppeteer package bundles a Chromium binary (300MB+) that you no longer need. puppeteer-core is the library without the browser, which is exactly what you want when connecting to a remote browser.

The rest of your code does not change. Every Puppeteer API (page.goto, page.evaluate, page.screenshot, page.click, page.type) works identically. BrowseFleet provides a standard CDP WebSocket, so Puppeteer cannot tell the difference between a local browser and a cloud browser.

## Performance Comparison

In our benchmarks, BrowseFleet sessions are faster than local Puppeteer for most workloads:

**Session startup.** BrowseFleet starts a new browser session in under 1 second. Local Puppeteer launch takes 2-5 seconds depending on the machine and Chrome version.

**Page load.** Network latency between BrowseFleet and the target website is typically lower than between your local machine and the target, because BrowseFleet servers are in data centers with fast network connections. For most pages, the difference is under 200ms.

**Concurrent performance.** This is where the difference is dramatic. Running 20 concurrent local Puppeteer instances on a 16GB server shows significant degradation. Page loads slow by 2-3x and crashes increase. BrowseFleet handles 20 concurrent sessions without degradation because each session is resource-managed.

**Cost.** Local Puppeteer is "free" but requires server infrastructure. A server capable of running 20 concurrent Chrome instances costs $100-200/month for cloud VMs. BrowseFleet's Developer plan at $99/month provides 20 concurrent sessions without the operational overhead of managing the server.

The performance advantage grows with scale. At 50+ concurrent sessions, managing local browsers becomes a full-time infrastructure problem. BrowseFleet lets you focus on your product instead.`,
  },
  {
    slug: "building-web-scraper-claude-computer-use",
    title: "Building a Web Scraper with Claude Computer Use",
    metaTitle: "Building a Web Scraper with Claude Computer Use | BrowseFleet",
    metaDescription: "Step-by-step tutorial for building a web scraper using Claude Computer Use and BrowseFleet. Vision-based scraping for sites that resist traditional automation.",
    excerpt: "A hands-on tutorial for building a vision-based web scraper using Claude Computer Use and BrowseFleet's Computer API, for sites that resist traditional selectors.",
    publishedAt: "2026-03-29",
    readingTime: 9,
    headings: [
      "What Is Claude Computer Use",
      "When to Use Vision-Based Scraping",
      "Setting Up BrowseFleet's Computer API",
      "Building the Scraper Step by Step",
      "Handling Dynamic Content",
      "A Real-World Example: Extracting Pricing Data",
      "Cost and Performance Considerations",
    ],
    content: `Claude Computer Use is Anthropic's API for letting Claude interact with computer interfaces through screenshots. Instead of parsing HTML or using CSS selectors, Claude looks at a screenshot of a web page and decides what to click, type, or scroll, the same way a human would.

BrowseFleet's Computer API was built specifically for this workflow. Every action you execute returns a screenshot, creating the continuous feedback loop that Claude needs to navigate and interact with websites.

## What Is Claude Computer Use

Computer Use extends Claude's capabilities from text and images to interactive computer interfaces. You send Claude a screenshot of a browser, tell it what you want to accomplish, and it responds with specific actions: click at coordinates (x, y), type "search query", scroll down, press Enter.

The key insight is that Claude does not need to understand HTML structure or CSS selectors. It looks at the page visually and understands the interface the same way a human does. This means it can interact with any website, regardless of how the HTML is structured or whether it uses custom components that resist traditional selectors.

The API protocol is straightforward:
1. You provide a screenshot and a task description
2. Claude analyzes the screenshot and returns an action
3. You execute the action and take a new screenshot
4. Repeat until the task is complete

## When to Use Vision-Based Scraping

Traditional scraping (CSS selectors, XPath, DOM traversal) is faster and cheaper. Use it when you can. Vision-based scraping with Claude Computer Use is the right choice when:

**Selectors are fragile.** Some sites use obfuscated class names (e.g., .css-1a2b3c4), dynamically generated IDs, or deeply nested structures that make selector-based extraction unreliable.

**Content is behind interactions.** Some data only appears after clicking buttons, expanding sections, hovering over elements, or completing multi-step flows. Vision-based agents handle these interactions naturally.

**The site structure changes frequently.** If a site redesigns its HTML every few weeks (common with SPA frameworks), selector-based scrapers break constantly. Vision-based scrapers are resilient to structural changes because they interact with the visual interface, not the DOM.

**You need to scrape many different sites.** Writing and maintaining selectors for dozens of different websites is expensive. A vision-based agent can navigate unfamiliar sites without site-specific code.

## Setting Up BrowseFleet's Computer API

BrowseFleet's Computer API provides four actions that map directly to what Claude needs:

- **navigate(sessionId, url)** - Go to a URL, return screenshot
- **click(sessionId, x, y)** - Click at coordinates, return screenshot
- **type(sessionId, text)** - Type text, return screenshot
- **scroll(sessionId, direction, amount)** - Scroll, return screenshot

Every action returns a base64-encoded PNG screenshot that you can pass directly to Claude.

\`\`\`typescript
import { BrowseFleet } from 'browsefleet';
import Anthropic from '@anthropic-ai/sdk';

const bf = new BrowseFleet({ apiKey: 'bf_...' });
const anthropic = new Anthropic();

// Create a session for Computer Use
const session = await bf.sessions.create({
  stealth: 'full',
  viewport: { width: 1280, height: 800 },
});

// Navigate and get the first screenshot
const screenshot = await bf.computer.navigate(
  session.id,
  'https://target-site.com'
);

// screenshot is a base64 PNG string ready for Claude
\`\`\`

The viewport size matters. Claude's spatial reasoning works best with standard desktop resolutions. We recommend 1280x800 for most tasks. Larger viewports give Claude more context but increase API costs (larger images) and processing time.

## Building the Scraper Step by Step

Let us build a complete vision-based scraper. The task: extract product information from an e-commerce site with complex JavaScript rendering.

\`\`\`typescript
import { BrowseFleet } from 'browsefleet';
import Anthropic from '@anthropic-ai/sdk';

const bf = new BrowseFleet({ apiKey: 'bf_...' });
const anthropic = new Anthropic();

interface Product {
  name: string;
  price: string;
  rating: string;
  description: string;
}

async function scrapeProducts(url: string): Promise<Product[]> {
  const session = await bf.sessions.create({
    stealth: 'full',
    viewport: { width: 1280, height: 800 },
  });

  let screenshot = await bf.computer.navigate(session.id, url);
  const products: Product[] = [];

  // Ask Claude to extract product data from the visible page
  const extractResponse = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{
      role: 'user',
      content: [
        {
          type: 'image',
          source: {
            type: 'base64',
            media_type: 'image/png',
            data: screenshot,
          },
        },
        {
          type: 'text',
          text: 'Extract all product information visible on this page. For each product, provide: name, price, rating, and description. Return as JSON array.',
        },
      ],
    }],
  });

  const pageProducts = JSON.parse(extractResponse.content[0].text);
  products.push(...pageProducts);

  // Check if there is a "next page" button
  const navResponse = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 256,
    messages: [{
      role: 'user',
      content: [
        {
          type: 'image',
          source: {
            type: 'base64',
            media_type: 'image/png',
            data: screenshot,
          },
        },
        {
          type: 'text',
          text: 'Is there a "next page" or pagination button visible? If yes, return the click coordinates as JSON: {"x": number, "y": number}. If no, return {"done": true}.',
        },
      ],
    }],
  });

  const navAction = JSON.parse(navResponse.content[0].text);
  if (!navAction.done) {
    screenshot = await bf.computer.click(
      session.id,
      navAction.x,
      navAction.y
    );
    // Continue extraction on next page...
  }

  await session.close();
  return products;
}
\`\`\`

## Handling Dynamic Content

Many sites load content dynamically: lazy-loaded images, infinite scroll, expandable sections, and AJAX-loaded data. Vision-based scraping handles these naturally:

**Infinite scroll.** Tell Claude to scroll down and check for new content. After each scroll, extract any new data that appeared.

\`\`\`typescript
let previousDataCount = 0;
let currentDataCount = 0;
let scrollAttempts = 0;

do {
  previousDataCount = currentDataCount;

  // Scroll down
  screenshot = await bf.computer.scroll(session.id, 'down', 500);
  await sleep(2000); // Wait for content to load

  // Extract data from current view
  const newData = await extractWithClaude(screenshot);
  allData.push(...newData);
  currentDataCount = allData.length;
  scrollAttempts++;
} while (currentDataCount > previousDataCount && scrollAttempts < 20);
\`\`\`

**Expandable sections.** Ask Claude to identify and click "show more" or "expand" elements, then extract the revealed content.

**Tabs and filters.** Tell Claude to click on each tab or filter option, extract data, then move to the next one. The visual approach makes this trivial. Claude can see the tab bar and knows which tab is currently active.

## A Real-World Example: Extracting Pricing Data

Let us build a practical scraper that extracts pricing data from a SaaS website with a complex pricing page.

\`\`\`typescript
async function scrapePricing(url: string) {
  const session = await bf.sessions.create({
    stealth: 'full',
    viewport: { width: 1920, height: 1080 },
  });

  const screenshot = await bf.computer.navigate(session.id, url);

  // Claude can read pricing tables, feature comparisons,
  // and even pricing calculators from screenshots
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{
      role: 'user',
      content: [
        {
          type: 'image',
          source: {
            type: 'base64',
            media_type: 'image/png',
            data: screenshot,
          },
        },
        {
          type: 'text',
          text: \`Analyze this pricing page and extract all pricing information.
Return structured JSON with:
- plans: array of { name, price, billing_period, features: string[] }
- enterprise: whether there's a custom/enterprise plan
- free_trial: whether a free trial is offered
- notes: any important pricing notes or limitations\`,
        },
      ],
    }],
  });

  await session.close();
  return JSON.parse(response.content[0].text);
}
\`\`\`

This works even on pricing pages with complex layouts, interactive sliders, toggle switches (monthly/annual), and feature comparison matrices. Claude reads the visual layout and extracts the information, regardless of the underlying HTML structure.

## Cost and Performance Considerations

Vision-based scraping is more expensive than traditional scraping:

**API costs.** Each Claude API call with a screenshot costs roughly $0.01-0.03 depending on image size and response length. For a scraping job that requires 10 screenshots per page, that is $0.10-0.30 per page, significantly more than selector-based scraping.

**Latency.** Each screenshot-to-action cycle takes 2-5 seconds (1-2s for the API call, 1-2s for the action and page load). A multi-step scraping workflow might take 30-60 seconds per page.

**When the economics work.** Vision-based scraping makes economic sense when the alternative is spending hours writing and maintaining fragile selectors, or when the data is valuable enough to justify the per-page cost.

**Optimization strategies:**
- Use vision-based scraping only for sites that resist traditional methods
- Combine approaches: use bf.scrape for simple content extraction and Claude for complex interactions
- Reduce screenshot resolution for tasks that do not require fine detail
- Batch extraction: ask Claude to extract all data from one screenshot rather than making multiple calls`,
  },
  {
    slug: "complete-guide-browser-stealth",
    title: "The Complete Guide to Browser Stealth",
    metaTitle: "The Complete Guide to Browser Stealth in 2026 | BrowseFleet",
    metaDescription: "How bot detection works and how to bypass it. Browser fingerprinting, WebDriver detection, behavior analysis, and stealth techniques explained.",
    excerpt: "How websites detect automated browsers and how stealth technology defeats them. Fingerprinting, WebDriver flags, behavioral analysis, and proxy rotation explained.",
    publishedAt: "2026-03-31",
    readingTime: 9,
    headings: [
      "How Bot Detection Works",
      "Browser Fingerprinting",
      "WebDriver Detection",
      "Behavioral Analysis",
      "Stealth Techniques",
      "Proxy Rotation Strategies",
      "Testing Your Stealth Setup",
      "BrowseFleet's Stealth Implementation",
    ],
    content: `Every website you automate is trying to detect that you are not human. Anti-bot systems have become sophisticated, using multiple signals to distinguish real browsers from automated ones. Understanding how detection works is the first step to defeating it.

This guide covers the detection techniques used by anti-bot systems and the stealth techniques that counter them.

## How Bot Detection Works

Anti-bot systems operate on a principle of signal aggregation. No single signal definitively proves a browser is automated. Instead, detection systems collect dozens of signals and compute a risk score. When the score exceeds a threshold, the user is challenged (CAPTCHA) or blocked.

The main detection categories are:
1. Browser fingerprinting (checking browser properties for inconsistencies)
2. WebDriver detection (looking for automation-specific flags)
3. Behavioral analysis (detecting inhuman interaction patterns)
4. Network analysis (checking IP reputation and connection patterns)

A good stealth setup addresses all four categories.

## Browser Fingerprinting

Real browsers have consistent, predictable properties. When you create a Chrome browser with Puppeteer, certain properties differ from a real Chrome browser. Anti-bot systems check these properties for inconsistencies.

**Navigator properties.** navigator.webdriver is true in automated browsers. navigator.plugins is empty. navigator.languages may be inconsistent with the Accept-Language header. navigator.hardwareConcurrency and navigator.deviceMemory may report unrealistic values for the claimed device.

**WebGL fingerprint.** Real GPUs produce distinctive WebGL rendering. Headless Chrome uses a software renderer that produces a different fingerprint. The WebGL vendor and renderer strings also differ.

**Canvas fingerprint.** Drawing to an HTML canvas and reading the pixel data produces a fingerprint that varies by GPU, OS, and browser version. Headless browsers produce fingerprints that do not match any real device.

**Audio fingerprint.** The AudioContext API produces a fingerprint based on the audio processing stack. Headless browsers have different audio characteristics than real browsers.

**Screen properties.** screen.width, screen.height, window.innerWidth, and window.outerWidth should be consistent with each other and with the claimed device. Headless browsers sometimes report 0 for outer dimensions.

**Font enumeration.** Real systems have predictable font sets based on the OS. Headless environments may have minimal or unusual font sets.

Anti-bot services like DataDome, Akamai Bot Manager, and Cloudflare check dozens of these properties simultaneously and cross-reference them for consistency.

## WebDriver Detection

The simplest detection method checks for automation-specific flags:

**navigator.webdriver.** In standard Puppeteer and Playwright, navigator.webdriver returns true. Real browsers return false or undefined. This is the first thing anti-bot scripts check.

**CDP artifacts.** Chrome DevTools Protocol (CDP) adds runtime properties that can be detected. The __cdp_runtime__ property, the presence of Runtime.evaluate in the call stack, and other CDP-specific artifacts.

**Automation extensions.** Puppeteer and Playwright inject extension code that can be detected by examining chrome.runtime properties and the browser's extension list.

**Window properties.** Automation tools add properties to the window object: window.cdc_adoQpoasnfa76pfcZLmcfl_Array (ChromeDriver), window.__playwright_iframe_id__ (Playwright), and similar identifiers.

## Behavioral Analysis

Even with perfect browser fingerprinting, behavioral analysis can catch automated browsers:

**Mouse movement.** Real humans produce smooth, curved mouse movements with acceleration and deceleration. Bots either do not move the mouse at all (jumping directly to click targets) or move it in perfectly straight lines.

**Typing patterns.** Humans type at variable speeds with natural pauses. Bots type at uniform speeds or insert text instantly via JavaScript.

**Navigation patterns.** Humans browse in non-linear patterns. They scroll, pause, go back, open new tabs. Bots follow predetermined paths at consistent speeds.

**Timing.** Humans have variable reaction times. They pause to read content, hesitate before clicking, and take breaks. Bots interact at machine speed with consistent timing.

**Page interaction.** Humans scroll before clicking elements that are below the fold. They move the mouse near a link before clicking it. They sometimes miss click targets and try again. Bots navigate with perfect precision.

## Stealth Techniques

Stealth tools counter detection signals at each level:

**Fingerprint spoofing.** Override navigator properties to match a real browser profile. Set navigator.webdriver to undefined. Populate navigator.plugins with realistic values. Ensure all properties (languages, platform, user agent, device memory, hardware concurrency) are internally consistent.

**WebGL spoofing.** Override WebGL vendor and renderer strings to match a real GPU. Inject noise into canvas and WebGL rendering to produce realistic fingerprints.

**CDP masking.** Remove or mask CDP-specific artifacts. Delete automation properties from the window object. Patch the JavaScript runtime to hide evaluate call stack frames.

**Header management.** Ensure HTTP headers (Accept, Accept-Language, Accept-Encoding, Sec-CH-UA) are consistent with the claimed browser and match the fingerprint profile.

**Timezone matching.** Set the browser's timezone to match the proxy IP's geographic location. Inconsistencies between IP geolocation and browser timezone are a strong bot signal.

The most widely used stealth library is puppeteer-extra-plugin-stealth, which patches 15+ detection vectors. BrowseFleet's stealth mode applies these patches and more.

## Proxy Rotation Strategies

Network-level stealth is equally important:

**IP rotation.** Anti-bot systems track IP addresses. An IP that sends 1,000 requests in an hour is suspicious. Rotate IPs per session or per batch of requests.

**Proxy types and their detection resistance:**

Datacenter proxies ($1-5/GB) are the cheapest but most easily detected. Anti-bot services maintain lists of datacenter IP ranges.

Residential proxies ($5-15/GB) use real consumer IP addresses from ISPs. They are much harder to detect because they look like normal user traffic.

ISP proxies ($3-10/GB) are datacenter IPs registered with ISPs, offering a balance of cost and stealth.

Mobile proxies ($15-30/GB) use mobile carrier IP addresses. They have the best reputation because mobile IPs are shared among many users, making it impractical to block them.

**Geographic consistency.** The proxy IP's location should match the browser's timezone, language, and locale settings. A browser claiming to be in New York but connecting from a Russian IP is suspicious.

**Session-level rotation.** Assign each BrowseFleet session its own proxy. This prevents cross-request correlation. Anti-bot systems cannot link multiple requests from different sessions.

\`\`\`typescript
const session = await bf.sessions.create({
  stealth: 'full',
  proxy: 'socks5://user:pass@residential-proxy:1080',
  timezone: 'America/New_York',
  locale: 'en-US',
});
\`\`\`

## Testing Your Stealth Setup

Before running your automation against target sites, test your stealth configuration:

**Bot detection test sites:**
- bot.sannysoft.com - Tests for common automation flags
- browserleaks.com - Full fingerprint analysis
- pixelscan.net - Cross-references multiple fingerprint signals
- nowsecure.nl - Tests specifically for Chrome DevTools Protocol detection

**Manual verification.** Navigate to your target site and visually inspect whether CAPTCHAs appear, content loads correctly, and the site behaves normally.

**A/B testing.** Run the same scraping job with stealth enabled and disabled. Compare success rates to verify that stealth is making a difference.

## BrowseFleet's Stealth Implementation

BrowseFleet's stealth mode applies a thorough set of patches that address all detection categories:

**Full mode** (stealth: 'full') applies all available stealth patches:
- navigator.webdriver set to undefined
- navigator.plugins populated with realistic data
- navigator.languages matched to locale settings
- WebGL vendor and renderer spoofed
- Canvas fingerprint noise injected
- Chrome runtime properties masked
- CDP artifacts removed
- User-Agent consistent with all other properties
- Timezone matched to proxy geolocation
- Screen properties set to realistic values

**Basic mode** (stealth: 'basic') applies essential patches only:
- navigator.webdriver masking
- User-Agent normalization
- Basic CDP artifact removal

Basic mode is faster (less JavaScript injection) but less effective against sophisticated detection. Use full mode for any site with serious anti-bot measures.

In our testing, BrowseFleet's full stealth mode passes all common bot detection tests and successfully accesses sites protected by Cloudflare, DataDome, and Akamai Bot Manager. No stealth solution is 100% effective against all detection systems, but full mode handles the vast majority of cases.`,
  },
  {
    slug: "programmatic-seo-headless-browsers",
    title: "Programmatic SEO with Headless Browsers",
    metaTitle: "Programmatic SEO with Headless Browsers | BrowseFleet",
    metaDescription: "Use headless browsers for programmatic SEO - competitor analysis, content generation at scale, automated auditing, and visual regression testing.",
    excerpt: "How to use headless browsers for programmatic SEO, from competitor analysis and content auditing to automated screenshot-based visual testing.",
    publishedAt: "2026-04-01",
    readingTime: 7,
    headings: [
      "What Is Programmatic SEO",
      "Using Headless Browsers for pSEO",
      "Competitor Data Collection",
      "Content Auditing at Scale",
      "Automated Visual Audits",
      "Building Your pSEO Pipeline",
    ],
    content: `Programmatic SEO (pSEO) is the practice of creating large numbers of targeted pages algorithmically rather than writing each one by hand. Instead of publishing 10 pages, you publish 1,000, each targeting a specific long-tail keyword, comparison, or use case.

Headless browsers are essential tools for pSEO at every stage: researching competitors, auditing your own content, collecting data for page generation, and testing the visual quality of generated pages.

## What Is Programmatic SEO

Traditional SEO involves writing individual pages optimized for specific keywords. Programmatic SEO takes a different approach: you create templates and data sets, then generate pages programmatically.

Common pSEO patterns:

**Comparison pages.** "Product A vs Product B" for every combination of products in your space. A CRM with 20 competitors can generate 20 comparison pages, each targeting searches like "HubSpot vs Salesforce" or "Pipedrive vs Close."

**Use case pages.** A page for every use case your product serves: "CRM for real estate," "CRM for consultants," "CRM for non-profits." Each page addresses the specific needs and pain points of that audience.

**Integration pages.** A page for every tool your product integrates with: "Product + Slack," "Product + Zapier," "Product + Salesforce." These target searches from users of those tools looking for integrations.

**Location pages.** For local businesses or services: a page for every city, neighborhood, or region you serve.

The key to successful pSEO is content quality. Google's Helpful Content Update penalizes thin, templated content. Each page needs genuine, useful information, not just keyword-stuffed templates.

## Using Headless Browsers for pSEO

Headless browsers power pSEO workflows in several ways:

**Data collection.** Scrape competitor websites, review sites, directories, and databases to collect the data that populates your pSEO templates. BrowseFleet's stealth mode lets you access sites without getting blocked.

**Content rendering verification.** After generating pSEO pages, render them in a real browser to verify that the content looks correct, JavaScript renders properly, and there are no visual issues.

**Automated screenshots.** Take screenshots of every generated page for quality assurance. Visual regression testing catches issues that HTML validation misses.

**SEO auditing.** Crawl your own site to check meta tags, headings, internal links, and content quality at scale.

## Competitor Data Collection

Before writing comparison pages, you need accurate data about competitors. Headless browsers let you scrape competitor websites for pricing, features, and positioning.

\`\`\`typescript
import { BrowseFleet } from 'browsefleet';

const bf = new BrowseFleet({ apiKey: 'bf_...' });

async function collectCompetitorData(competitorUrl: string) {
  // Scrape the pricing page
  const { markdown: pricing } = await bf.scrape(
    \`\${competitorUrl}/pricing\`,
    { stealth: 'full' }
  );

  // Scrape the features page
  const { markdown: features } = await bf.scrape(
    \`\${competitorUrl}/features\`,
    { stealth: 'full' }
  );

  // Take a screenshot for reference
  const screenshot = await bf.screenshot(
    \`\${competitorUrl}/pricing\`,
    { fullPage: true, stealth: 'full' }
  );

  return { pricing, features, screenshot };
}

// Collect data for all competitors
const competitors = [
  'https://competitor-a.com',
  'https://competitor-b.com',
  'https://competitor-c.com',
];

const data = await Promise.all(
  competitors.map(collectCompetitorData)
);
\`\`\`

Use the collected Markdown content to write accurate, detailed comparison pages. The markdown output from BrowseFleet's scrape endpoint is clean and structured, making it easy to extract specific data points.

## Content Auditing at Scale

When you have hundreds of pSEO pages, manual quality checks are impossible. Use headless browsers to audit every page:

\`\`\`typescript
async function auditPage(url: string) {
  const { html, markdown } = await bf.scrape(url);

  // Parse the rendered HTML
  const titleMatch = html.match(/<title>(.*?)<\\/title>/);
  const metaDesc = html.match(
    /<meta name="description" content="(.*?)"/
  );
  const h1s = html.match(/<h1[^>]*>(.*?)<\\/h1>/g) || [];
  const wordCount = markdown.split(/\\s+/).length;

  const issues = [];

  if (!titleMatch || titleMatch[1].length > 60) {
    issues.push('Title missing or too long');
  }
  if (!metaDesc || metaDesc[1].length > 160) {
    issues.push('Meta description missing or too long');
  }
  if (h1s.length !== 1) {
    issues.push(\`Expected 1 H1, found \${h1s.length}\`);
  }
  if (wordCount < 300) {
    issues.push(\`Thin content: only \${wordCount} words\`);
  }

  return { url, issues, wordCount };
}

// Audit all pSEO pages
const urls = generateAllPseoUrls();
const results = await Promise.all(urls.map(auditPage));
const pagesWithIssues = results.filter(r => r.issues.length > 0);
console.log(\`\${pagesWithIssues.length} pages with issues\`);
\`\`\`

## Automated Visual Audits

Content quality is not just about text. The visual presentation matters for user experience and indirectly for SEO (via engagement metrics). Use screenshots to visually audit generated pages:

\`\`\`typescript
async function visualAudit(url: string) {
  const screenshot = await bf.screenshot(url, {
    viewport: { width: 1280, height: 720 },
    fullPage: true,
  });

  // Check for visual issues:
  // - Broken layouts (elements overlapping)
  // - Missing images (alt text showing instead)
  // - Empty sections (large blank areas)
  // - Inconsistent styling

  return { url, screenshot };
}
\`\`\`

For automated visual regression testing, compare screenshots of each page against a baseline. Any significant visual change indicates a potential issue.

## Building Your pSEO Pipeline

A complete pSEO pipeline has four stages:

**Stage 1: Data collection.** Use BrowseFleet to scrape competitor data, industry information, and other data sources. Store the raw data in a structured format.

**Stage 2: Content generation.** Use the collected data to generate page content. This can be template-based (filling in variables) or AI-generated (using an LLM to write unique content for each page). The best approach combines both: templates for structure, AI for unique prose.

**Stage 3: Build and deploy.** Generate the actual pages using your framework (Next.js with generateStaticParams is ideal for this). Deploy to your hosting provider.

**Stage 4: Quality assurance.** Use BrowseFleet to audit every generated page for SEO issues and visual problems. Fix issues and re-deploy. Schedule periodic re-audits to catch regressions.

This pipeline can be fully automated. Run data collection weekly, regenerate content when data changes, deploy automatically, and audit on every deploy.

The combination of BrowseFleet for data collection and quality assurance, and Next.js for static page generation, creates a powerful pSEO system that can produce hundreds of high-quality pages with minimal manual effort.`,
  },
  {
    slug: "from-selenium-to-cloud-browsers-migration-guide",
    title: "From Selenium to Cloud Browsers: A Migration Guide",
    metaTitle: "Migrate from Selenium to Cloud Browsers | BrowseFleet",
    metaDescription: "Step-by-step guide to migrating Selenium test suites and automation to cloud browsers. Less infrastructure, better reliability, same API.",
    excerpt: "A practical guide for teams migrating from Selenium to cloud browsers. Step-by-step instructions, before/after code, and what changes (and what does not).",
    publishedAt: "2026-04-02",
    readingTime: 7,
    headings: [
      "Why Teams Migrate from Selenium",
      "BrowseFleet's Selenium Compatibility",
      "Step-by-Step Migration",
      "Before and After Code Comparison",
      "Handling Browser Drivers",
      "What Changes and What Does Not",
    ],
    content: `Selenium WebDriver has been the standard for browser automation since 2011. Millions of test suites, scraping scripts, and automation workflows are built on it. It works. But managing the infrastructure around it (browser installations, driver versions, grid servers, and Docker containers) has become the bottleneck.

Cloud browsers eliminate that bottleneck. BrowseFleet provides a Selenium-compatible endpoint, so your existing tests work with minimal changes.

## Why Teams Migrate from Selenium

Teams do not leave Selenium because it is a bad tool. They leave because of the infrastructure tax:

**Driver version management.** Selenium requires a browser driver (ChromeDriver, GeckoDriver) that must match the installed browser version exactly. When Chrome auto-updates, ChromeDriver breaks. Teams spend hours debugging version mismatches that have nothing to do with their tests.

**Browser installation.** Each test environment needs a browser installed. CI containers need Chrome, its 20+ system dependencies, and enough memory to run it. Different CI providers have different base images, leading to "works on my machine" problems.

**Selenium Grid.** For parallel testing, teams set up Selenium Grid, a hub-and-node architecture for distributing tests across browser instances. Grid is complex to configure, monitor, and maintain. Node registration, session timeouts, and resource limits all need tuning.

**Docker overhead.** Running Selenium in Docker (via selenium/standalone-chrome or similar images) works but consumes significant resources. Each container needs 512MB-1GB of RAM. Running 20 parallel tests requires 10-20GB of RAM just for browsers.

**Flakiness.** Selenium tests are notoriously flaky. Timing issues, stale element references, and browser crashes cause intermittent failures that erode confidence in the test suite.

## BrowseFleet's Selenium Compatibility

BrowseFleet provides a Remote WebDriver endpoint that accepts standard Selenium connections. Your existing Selenium tests connect to BrowseFleet instead of a local browser or Selenium Grid. The WebDriver protocol is the same. BrowseFleet translates it to CDP internally.

This means:
- No ChromeDriver or GeckoDriver to install or manage
- No browser binaries on the test machine
- No Selenium Grid to set up or maintain
- No Docker containers for browsers

Your tests send WebDriver commands to BrowseFleet's HTTP endpoint. BrowseFleet manages the browser instances, handles lifecycle, and provides stealth and proxy features that Selenium does not offer.

## Step-by-Step Migration

**Step 1: Install the BrowseFleet SDK.** This is optional for Selenium. You can use the Remote WebDriver URL directly. But the SDK makes session management easier.

\`\`\`bash
# Python
pip install browsefleet-python

# Node.js
npm install browsefleet
\`\`\`

**Step 2: Update your WebDriver configuration.** Replace the local driver or Grid URL with BrowseFleet's endpoint.

\`\`\`python
# Python
from browsefleet import BrowseFleet
from selenium import webdriver

bf = BrowseFleet(api_key='bf_...')
session = bf.sessions.create(stealth='full')

# Replace local driver with Remote WebDriver
driver = webdriver.Remote(
    command_executor=session.selenium_url,
    options=webdriver.ChromeOptions(),
)
\`\`\`

**Step 3: Remove browser installation steps from CI.** You no longer need Chrome, ChromeDriver, or their dependencies in your CI pipeline.

\`\`\`yaml
# Before
steps:
  - run: sudo apt-get install -y chromium-browser
  - run: pip install chromedriver-autoinstaller
  - run: python -m pytest tests/

# After
steps:
  - run: pip install browsefleet-python
  - run: python -m pytest tests/
    env:
      BROWSEFLEET_API_KEY: \${{ secrets.BF_KEY }}
\`\`\`

**Step 4: Update teardown.** Close BrowseFleet sessions in your test teardown.

\`\`\`python
def teardown_method(self):
    self.driver.quit()
    self.session.close()  # Clean up BrowseFleet session
\`\`\`

**Step 5: Run your tests.** Your existing Selenium tests should pass without changes to the test logic. The only changes are in the driver setup and teardown.

## Before and After Code Comparison

**Before: Local Selenium with ChromeDriver**

\`\`\`python
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

# Complex setup
options = Options()
options.add_argument('--headless=new')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
options.add_argument('--disable-gpu')

service = Service('/usr/local/bin/chromedriver')
driver = webdriver.Chrome(service=service, options=options)

# Test
driver.get('https://myapp.com')
assert 'My App' in driver.title

driver.quit()
\`\`\`

**After: BrowseFleet**

\`\`\`python
from browsefleet import BrowseFleet
from selenium import webdriver

# Simple setup
bf = BrowseFleet(api_key='bf_...')
session = bf.sessions.create(stealth='full')
driver = webdriver.Remote(
    command_executor=session.selenium_url,
    options=webdriver.ChromeOptions(),
)

# Same test - no changes
driver.get('https://myapp.com')
assert 'My App' in driver.title

driver.quit()
session.close()
\`\`\`

The test logic (everything between setup and teardown) is identical. Only the driver initialization changes.

**Before: Selenium Grid**

\`\`\`python
driver = webdriver.Remote(
    command_executor='http://selenium-hub:4444/wd/hub',
    options=webdriver.ChromeOptions(),
)
\`\`\`

**After: BrowseFleet**

\`\`\`python
driver = webdriver.Remote(
    command_executor=session.selenium_url,
    options=webdriver.ChromeOptions(),
)
\`\`\`

If you are already using Selenium Grid, the migration is a one-line URL change.

## Handling Browser Drivers

One of the biggest advantages of migrating to BrowseFleet is eliminating browser driver management entirely.

With local Selenium, you need:
- The correct Chrome/Firefox version installed
- A matching ChromeDriver/GeckoDriver version
- A mechanism to keep them in sync (chromedriver-autoinstaller, webdriver-manager)
- System dependencies for Chrome (libxss1, libnss3, libatk-bridge2.0-0, etc.)

With BrowseFleet, you need:
- The browsefleet SDK (or just the endpoint URL)
- An API key

That is it. No browser binaries, no driver binaries, no system dependencies. The browser runs on BrowseFleet's infrastructure. Your test machine only needs network access.

## What Changes and What Does Not

**What changes:**
- Driver initialization (local/Grid URL becomes BrowseFleet URL)
- CI pipeline (remove browser installation steps)
- Session cleanup (close BrowseFleet sessions in teardown)
- Infrastructure (no more Grid servers, Docker containers, or browser management)

**What does not change:**
- Test logic (find elements, click, type, assert - all identical)
- Test structure (test classes, setup, teardown patterns)
- Locator strategies (ID, name, CSS, XPath - all supported)
- Assertions (page title, element text, visibility - all work)
- Wait strategies (explicit waits, expected conditions - all work)
- Page Object patterns (your page objects do not change)

The migration is mechanical. Change the setup, keep the tests. Most teams complete it in an afternoon.

**New capabilities after migration:**
- Stealth mode for accessing bot-protected sites
- CAPTCHA solving for automated workflows
- Cookie persistence across test runs
- Per-session proxy support
- Screenshots and PDF generation via API
- Scale to 100 concurrent sessions without infrastructure changes`,
  },
];
