export interface Integration {
  slug: string;
  name: string;
  description: string;
  installation: string;
  codeExample: string;
  featuresSupported: string[];
}

export const integrations: Integration[] = [
  {
    slug: "puppeteer",
    name: "Puppeteer",
    description: "Puppeteer is Google's official Node.js library for controlling Chrome and Chromium. BrowseFleet provides a CDP WebSocket endpoint that Puppeteer can connect to directly, letting you move from local to cloud browsers with a single line change. All Puppeteer APIs work as expected — page navigation, DOM manipulation, screenshots, PDF generation, and network interception.",
    installation: `npm install puppeteer-core browsefleet`,
    codeExample: `import { BrowseFleet } from 'browsefleet';
import puppeteer from 'puppeteer-core';

const bf = new BrowseFleet({ apiKey: 'bf_...' });

// Create a cloud browser session
const session = await bf.sessions.create({
  stealth: 'full',
  viewport: { width: 1920, height: 1080 },
});

// Connect Puppeteer — the only line that changes
const browser = await puppeteer.connect({
  browserWSEndpoint: session.websocketUrl,
});

// Use Puppeteer exactly as you would locally
const page = await browser.newPage();
await page.goto('https://example.com');

const title = await page.title();
console.log('Page title:', title);

// Screenshots
await page.screenshot({ path: 'screenshot.png' });

// PDF generation
await page.pdf({ path: 'page.pdf', format: 'A4' });

// DOM extraction
const data = await page.evaluate(() => ({
  heading: document.querySelector('h1')?.textContent,
  links: Array.from(document.querySelectorAll('a'))
    .map(a => a.href),
}));

await browser.close();
await session.close();`,
    featuresSupported: [
      "Full CDP WebSocket connectivity",
      "Page navigation and interaction",
      "Screenshot capture (viewport and full-page)",
      "PDF generation with formatting options",
      "DOM evaluation and data extraction",
      "Network request interception",
      "Cookie management",
      "File upload and download",
      "Multi-page and multi-tab workflows",
      "Stealth mode with fingerprint spoofing",
    ],
  },
  {
    slug: "playwright",
    name: "Playwright",
    description: "Playwright is Microsoft's cross-browser automation library supporting Chromium, Firefox, and WebKit. BrowseFleet provides a CDP endpoint that Playwright's Chromium driver can connect to using connectOverCDP. Your existing Playwright test suites and automation scripts work without modification — just change the connection URL.",
    installation: `npm install playwright browsefleet`,
    codeExample: `import { BrowseFleet } from 'browsefleet';
import { chromium } from 'playwright';

const bf = new BrowseFleet({ apiKey: 'bf_...' });

// Create a cloud browser session
const session = await bf.sessions.create({
  stealth: 'full',
  viewport: { width: 1280, height: 720 },
});

// Connect Playwright via CDP
const browser = await chromium.connectOverCDP(
  session.websocketUrl
);

const context = browser.contexts()[0];
const page = context.pages()[0] || await context.newPage();

await page.goto('https://example.com');

// Playwright's locator API works perfectly
await page.getByRole('button', { name: 'Sign In' }).click();
await page.getByLabel('Email').fill('user@example.com');
await page.getByLabel('Password').fill('password');
await page.getByRole('button', { name: 'Submit' }).click();

// Wait for navigation
await page.waitForURL('**/dashboard');

// Extract data using Playwright's API
const items = await page.locator('.item').allTextContents();
console.log('Items:', items);

await browser.close();
await session.close();`,
    featuresSupported: [
      "CDP connectivity via connectOverCDP",
      "Full Playwright locator API",
      "Auto-waiting and smart assertions",
      "Network interception and mocking",
      "Screenshot and video recording",
      "Multi-context browser sessions",
      "Tracing and debugging tools",
      "File upload and download handling",
      "Stealth mode integration",
      "Compatible with Playwright Test runner",
    ],
  },
  {
    slug: "selenium",
    name: "Selenium",
    description: "Selenium WebDriver is the most widely-used browser automation framework. BrowseFleet provides a Selenium-compatible endpoint that works with existing WebDriver configurations. Teams with large Selenium test suites can migrate to cloud browsers without rewriting tests — just update the remote WebDriver URL.",
    installation: `pip install selenium browsefleet-python
# or
npm install selenium-webdriver browsefleet`,
    codeExample: `# Python example
from selenium import webdriver
from selenium.webdriver.common.by import By
from browsefleet import BrowseFleet

bf = BrowseFleet(api_key='bf_...')

# Create a cloud browser session
session = bf.sessions.create(stealth='full')

# Connect Selenium via Remote WebDriver
options = webdriver.ChromeOptions()
driver = webdriver.Remote(
    command_executor=session.selenium_url,
    options=options,
)

# Use Selenium exactly as before
driver.get('https://example.com')

# Find elements and interact
search = driver.find_element(By.NAME, 'q')
search.send_keys('cloud browsers')
search.submit()

# Extract results
results = driver.find_elements(By.CSS_SELECTOR, '.result')
for result in results:
    title = result.find_element(By.TAG_NAME, 'h3').text
    print(f'Result: {title}')

# Screenshots
driver.save_screenshot('results.png')

driver.quit()
session.close()`,
    featuresSupported: [
      "Selenium Remote WebDriver compatibility",
      "Works with Python, Java, C#, Ruby, JavaScript",
      "Element finding with all locator strategies",
      "Form interaction and submission",
      "Screenshot capture",
      "Cookie management",
      "Window and frame switching",
      "Alert handling",
      "Stealth mode via session configuration",
      "Drop-in replacement for existing test suites",
    ],
  },
  {
    slug: "langchain",
    name: "LangChain",
    description: "LangChain is the most popular framework for building LLM applications. BrowseFleet integrates as a tool provider, giving LangChain agents the ability to browse the web, extract content, and interact with websites. Use BrowseFleet's scrape and screenshot endpoints as LangChain tools for retrieval-augmented generation with live web data.",
    installation: `pip install langchain browsefleet-python
# or
npm install langchain browsefleet`,
    codeExample: `import { BrowseFleet } from 'browsefleet';
import { ChatOpenAI } from '@langchain/openai';
import { Tool } from 'langchain/tools';
import { AgentExecutor, createOpenAIFunctionsAgent } from 'langchain/agents';

const bf = new BrowseFleet({ apiKey: 'bf_...' });

// Create BrowseFleet tools for LangChain
const scrapeTool = new Tool({
  name: 'web_scrape',
  description: 'Scrape a URL and return its content as markdown',
  func: async (url: string) => {
    const { markdown } = await bf.scrape(url, { stealth: 'full' });
    return markdown;
  },
});

const screenshotTool = new Tool({
  name: 'web_screenshot',
  description: 'Take a screenshot of a URL',
  func: async (url: string) => {
    const screenshot = await bf.screenshot(url);
    return \`Screenshot saved: \${screenshot.url}\`;
  },
});

// Create a LangChain agent with web browsing tools
const model = new ChatOpenAI({ model: 'gpt-4o' });
const tools = [scrapeTool, screenshotTool];

const agent = await createOpenAIFunctionsAgent({
  llm: model,
  tools,
  prompt: agentPrompt,
});

const executor = new AgentExecutor({ agent, tools });

const result = await executor.invoke({
  input: 'Research the top 3 cloud browser APIs and compare their pricing',
});

console.log(result.output);`,
    featuresSupported: [
      "Scrape tool for content extraction",
      "Screenshot tool for visual context",
      "Compatible with LangChain agents and chains",
      "Works with OpenAI, Anthropic, and other LLM providers",
      "Stealth scraping for protected sites",
      "Markdown output ideal for LLM context windows",
      "Session-based tools for interactive browsing",
      "Custom tool definitions for specific workflows",
    ],
  },
  {
    slug: "browser-use",
    name: "Browser Use",
    description: "Browser Use is an open-source library for building AI browser agents that can interact with web pages using vision and DOM understanding. BrowseFleet provides the cloud browser infrastructure that Browser Use connects to, handling session management, stealth, and scaling while Browser Use handles the AI agent logic.",
    installation: `pip install browser-use browsefleet-python`,
    codeExample: `from browser_use import Agent, Browser
from browsefleet import BrowseFleet
from langchain_openai import ChatOpenAI

bf = BrowseFleet(api_key='bf_...')

# Create a BrowseFleet session for Browser Use
session = bf.sessions.create(
    stealth='full',
    viewport={'width': 1920, 'height': 1080},
)

# Connect Browser Use to BrowseFleet's cloud browser
browser = Browser(
    cdp_url=session.websocket_url,
)

# Create an AI agent
agent = Agent(
    task="Go to Amazon, search for 'mechanical keyboard', "
         "find the best-rated one under $100, and return "
         "the product name, price, and rating.",
    llm=ChatOpenAI(model='gpt-4o'),
    browser=browser,
)

# Run the agent
result = await agent.run()
print(result)

# Clean up
session.close()`,
    featuresSupported: [
      "CDP WebSocket connection for Browser Use agents",
      "Stealth mode prevents detection during agent tasks",
      "Cloud scaling for concurrent agent sessions",
      "Cookie persistence for authenticated agent workflows",
      "Proxy support for geo-targeted browsing",
      "Automatic session cleanup",
      "Compatible with all Browser Use agent types",
      "Vision-based and DOM-based interaction support",
    ],
  },
  {
    slug: "claude-computer-use",
    name: "Claude Computer Use",
    description: "Claude Computer Use is Anthropic's API for letting Claude interact with computer interfaces through screenshots and actions. BrowseFleet's Computer API is purpose-built for this workflow — every action returns a screenshot that feeds directly into Claude's vision model for the next decision.",
    installation: `npm install @anthropic-ai/sdk browsefleet`,
    codeExample: `import Anthropic from '@anthropic-ai/sdk';
import { BrowseFleet } from 'browsefleet';

const bf = new BrowseFleet({ apiKey: 'bf_...' });
const anthropic = new Anthropic();

// Create a session optimized for Computer Use
const session = await bf.sessions.create({
  stealth: 'full',
  viewport: { width: 1280, height: 800 },
});

// Get initial screenshot
let screenshot = await bf.computer.navigate(
  session.id,
  'https://booking.example.com'
);

// Claude Computer Use loop
const messages = [];
let taskComplete = false;

while (!taskComplete) {
  messages.push({
    role: 'user',
    content: [
      {
        type: 'image',
        source: { type: 'base64', media_type: 'image/png', data: screenshot },
      },
      {
        type: 'text',
        text: 'Book a table for 2 at 7pm this Friday. Fill in the reservation form.',
      },
    ],
  });

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages,
  });

  const action = parseClaudeAction(response);

  if (action.type === 'done') {
    taskComplete = true;
  } else {
    // Execute action and get next screenshot
    screenshot = await bf.computer.execute(session.id, action);
  }
}

await session.close();`,
    featuresSupported: [
      "Computer API returns screenshots after every action",
      "Click, type, scroll, and navigate actions",
      "Optimized screenshot format for Claude's vision model",
      "Session persistence across multi-step interactions",
      "Stealth mode for accessing real websites",
      "Viewport configuration matching Claude's requirements",
      "Action history tracking for debugging",
      "Automatic session cleanup on completion",
    ],
  },
  {
    slug: "openai",
    name: "OpenAI",
    description: "OpenAI's GPT-4o and GPT-4o-mini models support vision-based understanding of web pages. BrowseFleet provides screenshots and page content that you can pass to OpenAI's API for web understanding, data extraction, and automated analysis. Combine BrowseFleet's browser control with OpenAI's language understanding for powerful web automation.",
    installation: `npm install openai browsefleet`,
    codeExample: `import OpenAI from 'openai';
import { BrowseFleet } from 'browsefleet';

const bf = new BrowseFleet({ apiKey: 'bf_...' });
const openai = new OpenAI();

// Screenshot a page for visual analysis
const screenshot = await bf.screenshot(
  'https://competitor.example.com/pricing',
  { stealth: 'full', fullPage: true }
);

// Use GPT-4o to analyze the pricing page
const analysis = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [{
    role: 'user',
    content: [
      {
        type: 'image_url',
        image_url: { url: \`data:image/png;base64,\${screenshot.base64}\` },
      },
      {
        type: 'text',
        text: 'Analyze this pricing page. Extract all plan names, prices, and key features into structured JSON.',
      },
    ],
  }],
});

const pricingData = JSON.parse(
  analysis.choices[0].message.content
);

// Or use scrape + text completion for content analysis
const { markdown } = await bf.scrape(
  'https://blog.example.com/latest-post',
  { stealth: 'full' }
);

const summary = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [{
    role: 'user',
    content: \`Summarize this article in 3 bullet points:\\n\\n\${markdown}\`,
  }],
});

console.log(summary.choices[0].message.content);`,
    featuresSupported: [
      "Screenshots for GPT-4o vision analysis",
      "Markdown content extraction for text completions",
      "Stealth browsing for accessing protected content",
      "Batch processing with concurrent sessions",
      "Full-page screenshots for comprehensive analysis",
      "Integration with OpenAI function calling",
      "Compatible with GPT-4o and GPT-4o-mini",
      "Cost-effective content extraction pipeline",
    ],
  },
  {
    slug: "crewai",
    name: "CrewAI",
    description: "CrewAI is a framework for orchestrating multiple AI agents working together. BrowseFleet provides the web browsing tools that CrewAI agents need to research, extract data, and interact with websites. Give your CrewAI crews the ability to browse the real web with stealth and scale.",
    installation: `pip install crewai browsefleet-python`,
    codeExample: `from crewai import Agent, Task, Crew
from crewai.tools import tool
from browsefleet import BrowseFleet

bf = BrowseFleet(api_key='bf_...')

@tool
def scrape_website(url: str) -> str:
    """Scrape a website and return its content as markdown."""
    result = bf.scrape(url, stealth='full')
    return result['markdown']

@tool
def take_screenshot(url: str) -> str:
    """Take a screenshot of a website."""
    result = bf.screenshot(url, stealth='full')
    return f"Screenshot saved: {result['url']}"

# Create specialized agents
researcher = Agent(
    role='Web Researcher',
    goal='Research competitor products and pricing',
    tools=[scrape_website, take_screenshot],
    verbose=True,
)

analyst = Agent(
    role='Market Analyst',
    goal='Analyze research data and produce insights',
    verbose=True,
)

# Define tasks
research_task = Task(
    description='Research the top 5 cloud browser APIs. '
                'Visit each pricing page and features page. '
                'Extract all relevant data.',
    agent=researcher,
)

analysis_task = Task(
    description='Analyze the research data and produce a '
                'competitive analysis report with pricing '
                'comparison and feature matrix.',
    agent=analyst,
)

# Run the crew
crew = Crew(
    agents=[researcher, analyst],
    tasks=[research_task, analysis_task],
)

result = crew.kickoff()
print(result)`,
    featuresSupported: [
      "Custom CrewAI tools for web scraping",
      "Screenshot tools for visual research",
      "Stealth mode for accessing any website",
      "Multi-agent concurrent browsing sessions",
      "Markdown output ideal for agent context",
      "Proxy rotation for large-scale research",
      "Compatible with CrewAI's tool decorator pattern",
      "Session management for multi-step agent workflows",
    ],
  },
];
