export interface Audience {
  slug: string;
  title: string;
  description: string;
  painPoints: string[];
  howBrowseFleetHelps: string[];
  relevantFeatures: string[];
  cta: string;
}

export const audiences: Audience[] = [
  {
    slug: "developers",
    title: "Developers",
    description: "BrowseFleet is built by developers, for developers. It provides a clean API, standard protocols, and zero-config setup so you can focus on building your product instead of managing browser infrastructure. Connect your existing Puppeteer or Playwright code with a single line change and get cloud browsers with stealth, CAPTCHA solving, and scaling included.",
    painPoints: [
      "Local headless browsers crash, consume excessive RAM, and behave differently across environments",
      "Setting up stealth, proxies, and CAPTCHA solving requires integrating multiple libraries and services",
      "CI/CD browser testing is fragile — tests pass locally but fail in pipelines due to environment differences",
      "Scaling from 1 to 100 concurrent browsers requires infrastructure engineering that distracts from product work",
      "Browser automation libraries have steep learning curves and poor documentation for advanced features",
    ],
    howBrowseFleetHelps: [
      "One-line integration: replace your local browser connection with a BrowseFleet WebSocket URL and everything else stays the same",
      "Stealth, CAPTCHA solving, and proxy rotation are built in — no additional libraries or services to configure",
      "Consistent browser environment eliminates flaky tests and environment-specific bugs",
      "Scale to 100 concurrent sessions without provisioning servers or managing containers",
      "Comprehensive documentation with copy-paste code examples for every feature",
      "Open-source and self-hostable — audit the code, contribute fixes, run it on your infrastructure",
    ],
    relevantFeatures: ["Sessions API", "Quick Actions", "Stealth Mode", "Self-Hosting", "SDKs"],
    cta: "Get your API key and launch your first cloud browser in under 2 minutes.",
  },
  {
    slug: "ai-engineers",
    title: "AI Engineers",
    description: "BrowseFleet was designed for the AI agent era. The Computer API provides the screenshot-action loop that vision-based agents need, with every action returning a screenshot you can pass directly to Claude, GPT-4o, or Gemini. Build agents that browse, interact with, and extract information from the real web without worrying about bot detection or browser infrastructure.",
    painPoints: [
      "Vision-based agents need screenshots after every action, but most browser tools were not built for this workflow",
      "Bot detection blocks AI agents from accessing real websites, breaking production agent deployments",
      "Session management for concurrent agents is complex — each agent needs isolated state, cookies, and proxies",
      "Existing browser automation tools lack AI-specific APIs for the screenshot-to-action loop",
      "Scaling agent deployments requires managing browser infrastructure instead of improving agent logic",
    ],
    howBrowseFleetHelps: [
      "Computer API returns a screenshot after every click, type, and scroll — purpose-built for the agent loop",
      "Agent API provides higher-level abstractions for common agent patterns",
      "Stealth mode prevents bot detection, letting agents interact with real websites",
      "Cookie persistence enables agents to maintain authenticated sessions across runs",
      "Works with Claude Computer Use, GPT-4o vision, Browser Use, LangChain, and CrewAI",
      "Scale to hundreds of concurrent agent sessions with per-session isolation",
    ],
    relevantFeatures: ["Computer API", "Agent API", "Stealth Mode", "Cookie Persistence", "Sessions API"],
    cta: "Build your first AI web agent with BrowseFleet's Computer API.",
  },
  {
    slug: "startups",
    title: "Startups",
    description: "Startups need to move fast without burning runway on infrastructure. BrowseFleet provides production-ready browser automation with a generous free tier, simple per-hour pricing, and zero infrastructure overhead. Build scraping pipelines, AI agents, or automated testing without hiring a DevOps engineer or managing Docker containers.",
    painPoints: [
      "Limited engineering bandwidth means every hour spent on infrastructure is an hour not spent on the product",
      "Browser automation infrastructure is expensive to build and maintain — servers, Docker, monitoring, scaling",
      "Uncertain usage patterns make fixed-cost services risky when you are pre-revenue or early-stage",
      "Enterprise browser tools are too expensive and complex for a small team",
      "Self-hosting sounds appealing but requires DevOps expertise that small teams rarely have",
    ],
    howBrowseFleetHelps: [
      "Free Hobby tier with 500 daily requests lets you validate your idea before spending money",
      "Pay-per-hour billing means you only pay for what you use — no minimum commitments",
      "Zero infrastructure overhead: no servers to provision, containers to manage, or browsers to update",
      "Starter plan at $29/month is affordable for early-stage startups",
      "Graduate to self-hosting when you hit scale, with no vendor lock-in — the code is open-source",
      "Simple API means your team can integrate in hours, not weeks",
    ],
    relevantFeatures: ["Sessions API", "Quick Actions", "Self-Hosting", "Stealth Mode", "CAPTCHA Solving"],
    cta: "Start free and scale as you grow. No credit card required.",
  },
  {
    slug: "data-teams",
    title: "Data Teams",
    description: "Data teams need reliable, scalable web data collection pipelines. BrowseFleet provides the browser infrastructure for scraping JavaScript-rendered pages, extracting structured data, and monitoring websites at scale. Built-in stealth and proxy rotation handle anti-bot protections so your data pipelines do not break.",
    painPoints: [
      "JavaScript-heavy websites require full browser rendering that simple HTTP clients cannot handle",
      "Anti-bot protections break data pipelines with CAPTCHAs, IP bans, and fingerprint detection",
      "Scaling data collection requires managing browser pools, proxy rotation, and retry logic",
      "Data quality suffers when scrapers get blocked or return incomplete content",
      "Building and maintaining scraping infrastructure is a full-time job that distracts from analysis",
    ],
    howBrowseFleetHelps: [
      "Cloud browsers render JavaScript-heavy pages exactly as a real browser would",
      "Stealth mode and CAPTCHA solving prevent pipeline disruptions from anti-bot measures",
      "Per-session proxy rotation avoids IP bans and rate limiting",
      "Quick-action scrape endpoint returns clean Markdown, HTML, and text in a single call",
      "Scale to 100 concurrent browsers for parallel data collection",
      "Self-hosting option for data teams with compliance or data residency requirements",
    ],
    relevantFeatures: ["Quick Actions", "Sessions API", "Stealth Mode", "CAPTCHA Solving", "Proxy Support"],
    cta: "Build reliable data collection pipelines with cloud browsers.",
  },
  {
    slug: "qa-teams",
    title: "QA Teams",
    description: "QA teams need consistent, reliable browser environments for automated testing. BrowseFleet eliminates the browser installation and maintenance burden, provides identical environments across all test runs, and enables parallel test execution with up to 100 concurrent sessions. Your Playwright and Selenium test suites work without modification.",
    painPoints: [
      "Browser version mismatches between dev machines, CI/CD, and staging cause false test failures",
      "Running browsers in CI/CD containers is resource-intensive and slow to start",
      "Parallel test execution requires managing browser pools and dealing with port conflicts",
      "Screenshot-based visual regression testing needs consistent rendering across environments",
      "Maintaining browser binaries, drivers, and dependencies is an ongoing maintenance burden",
    ],
    howBrowseFleetHelps: [
      "Identical browser environment for every test run — no more environment-specific flakiness",
      "Sessions start in under 1 second, faster than spinning up local browser instances",
      "Run up to 100 tests in parallel with isolated, concurrent browser sessions",
      "Screenshot API provides consistent screenshots for visual regression testing",
      "Works with Playwright, Selenium, and Puppeteer — no test rewrites needed",
      "No browser binaries, drivers, or dependencies to install or maintain",
    ],
    relevantFeatures: ["Sessions API", "Screenshots", "Cookie Persistence", "Self-Hosting"],
    cta: "Run your test suite on cloud browsers. No infrastructure changes needed.",
  },
];
