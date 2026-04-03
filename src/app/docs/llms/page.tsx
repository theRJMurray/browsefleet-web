const LLMS_TEXT = `# BrowseFleet API Reference (llms.txt)
# Complete API documentation for AI agents and LLMs.
# Base URL: https://api.browsefleet.com
# Authentication: x-api-key header with key starting with "bf_"

## Authentication
All requests require the x-api-key header:
  x-api-key: bf_your_api_key
WebSocket connections use query param:
  ws://host/cdp/SESSION_ID?apiKey=bf_your_api_key

## Sessions

### POST /v1/sessions — Create a browser session
Request body (JSON):
  sessionId?:  string              — Custom session ID
  proxyUrl?:   string              — HTTP or SOCKS5 proxy URL
  stealth?:    "none"|"basic"|"full" — Anti-detection level (default: "full")
  userAgent?:  string              — Custom User-Agent
  viewport?:   {width, height}     — Viewport in px (default: 1920x1080)
  timeout?:    number              — Session timeout in ms (default: 1800000, max: 86400000)
  profileId?:  string              — Browser profile ID for persistent cookies
  blockAds?:   boolean             — Block ads (default: false)
  cookies?:    [{name, value, domain, path?}]
  timezone?:   string              — e.g. "America/New_York"
  locale?:     string              — e.g. "en-US"
  headers?:    {key: value}        — Custom headers for all page requests

Response (201):
  {
    "id": "string",
    "status": "active",
    "websocketUrl": "ws://host/cdp/SESSION_ID",
    "viewerUrl": "string",
    "createdAt": "ISO8601",
    "expiresAt": "ISO8601",
    "timeout": number,
    "stealth": "string",
    "viewport": {"width": number, "height": number},
    "proxyUrl?": "string",
    "profileId?": "string"
  }

### GET /v1/sessions — List active sessions
Response: { "sessions": [Session], "count": number }

### GET /v1/sessions/:id — Get session details
Response: Session object

### POST /v1/sessions/:id/release — Release (close) a session
Response: { "released": true }

### POST /v1/sessions/release — Release batch or all sessions
Request body: { "ids?": ["id1", "id2"] }  — omit ids to release all
Response: { "released": number }

### CDP WebSocket — ws://host/cdp/SESSION_ID
Connect Puppeteer: puppeteer.connect({ browserWSEndpoint: session.websocketUrl })
Connect Playwright: chromium.connectOverCDP(session.websocketUrl)

## Scraping

### POST /v1/scrape — Scrape a URL to structured content
Request body (JSON):
  url:       string              — Required. URL to scrape.
  waitFor?:  string|number       — CSS selector or ms to wait
  headers?:  {key: value}        — Custom request headers
  cookies?:  [{name, value, domain}]
  proxyUrl?: string              — Proxy URL
  stealth?:  "none"|"basic"|"full"
  timeout?:  number              — Navigation timeout ms (default: 30000)

Response (200):
  {
    "url": "string",
    "statusCode": number,
    "title": "string",
    "html": "string",
    "cleanedHtml": "string",
    "markdown": "string",
    "readability": "string",
    "links": [{"href": "string", "text": "string"}],
    "metadata": {"description?": "string", "ogImage?": "string", "canonical?": "string"}
  }

## Screenshots

### POST /v1/screenshot — Screenshot a URL
Request body (JSON):
  url:       string              — Required. URL to screenshot.
  fullPage?: boolean             — Full page capture (default: false)
  viewport?: {width, height}     — Viewport in px
  quality?:  number              — JPEG/WebP quality 1-100
  format?:   "png"|"jpeg"|"webp" — Image format (default: "png")
  waitFor?:  string|number
  proxyUrl?: string
  stealth?:  "none"|"basic"|"full"
  timeout?:  number

Response: Binary image (Content-Type: image/png|jpeg|webp)
  OR with Accept: application/json header:
  { "screenshot": "base64-string", "format": "png" }

## PDF

### POST /v1/pdf — Generate PDF from URL
Request body (JSON):
  url:              string              — Required.
  format?:          "A4"|"Letter"|"Legal" — Paper format (default: "A4")
  landscape?:       boolean             — Landscape (default: false)
  printBackground?: boolean             — Include backgrounds (default: true)
  margin?:          {top?, right?, bottom?, left?} — CSS lengths e.g. "1cm"
  waitFor?:         string|number
  proxyUrl?:        string
  stealth?:         "none"|"basic"|"full"
  timeout?:         number

Response: Binary PDF (Content-Type: application/pdf)

## Computer API

### POST /v1/sessions/:id/actions — Execute browser actions
Request body (JSON):
  actions: BrowserAction[]

BrowserAction types:
  { "type": "screenshot" }
  { "type": "click", "x": number, "y": number, "button?": "left"|"right"|"middle", "clickCount?": number }
  { "type": "type", "text": "string" }
  { "type": "press_key", "key": "string" }  — "Enter", "Tab", "Escape", "ArrowDown", etc.
  { "type": "scroll", "deltaX?": number, "deltaY?": number }
  { "type": "move_mouse", "x": number, "y": number }
  { "type": "wait", "duration": number }  — milliseconds, max 30000
  { "type": "navigate", "url": "string" }

Response (200):
  {
    "results": [
      { "type": "string", "success": boolean, "screenshot?": "base64-png", "error?": "string" }
    ]
  }

Note: click, type, press_key, scroll, navigate, and screenshot actions return a screenshot in the result.

## Agent

### POST /v1/agent — Autonomous browser agent
Creates a session, runs the task with an LLM, releases the session.
Request body (JSON):
  task:           string              — Required. Natural language task.
  url?:           string              — Starting URL
  provider?:      "anthropic"|"openai" — LLM provider (default: "anthropic")
  model?:         string              — Model ID (default: claude-sonnet-4-20250514 or gpt-4o)
  maxIterations?: number              — Max loops (default: 15, max: 30)
  apiKey?:        string              — LLM API key (overrides server env)

Response (200):
  {
    "success": boolean,
    "result?": "string",
    "error?": "string",
    "steps": [{"iteration": number, "reasoning": "string", "actions": [], "screenshot?": "base64"}],
    "totalIterations": number,
    "sessionId": "string"
  }

### POST /v1/sessions/:id/agent — Agent on existing session
Same request/response as POST /v1/agent but uses an existing session. Session is NOT released.

### POST /v1/agent/stream — SSE streaming agent
Same request as POST /v1/agent.
Response: text/event-stream with events:
  data: {"type":"screenshot","iteration":0,"screenshot":"base64"}
  data: {"type":"step","iteration":0,"reasoning":"...","actions":[...]}
  data: {"type":"done","result":"...","totalIterations":1}
  data: {"type":"fail","reason":"...","totalIterations":1}
  data: {"type":"error","error":"..."}

## CAPTCHA

### POST /v1/sessions/:id/captcha/solve — Solve CAPTCHA on page
Request body: { "type?": "auto"|"recaptcha"|"hcaptcha"|"turnstile" }
Response: { "success": boolean, "type": "string", "duration": number, "error?": "string" }
Requires CAPTCHA_API_KEY env var (2captcha). Returns 501 if not configured.

## Profiles

### POST /v1/profiles — Create profile
Request: { "name": "string" }
Response (201): { "id", "name", "createdAt", "updatedAt" }

### GET /v1/profiles — List profiles
Response: { "profiles": [Profile] }

### GET /v1/profiles/:id — Get profile
Response: Profile

### DELETE /v1/profiles/:id — Delete profile
Response: { "deleted": true }

Usage: Pass profileId when creating a session to load/save cookies automatically.

## Files

### POST /v1/sessions/:id/files — Upload file (multipart/form-data)
Field: file (binary)
Response: { "uploaded": "filename", "size": number }

### GET /v1/sessions/:id/files — List files
Response: { "files": ["uploads/file.pdf", "downloads/export.csv"] }

### GET /v1/sessions/:id/files/:name — Download file
Response: Binary file data

## Billing

### GET /v1/usage — Usage statistics
Response: {
  "totalSessions": number,
  "activeSessions": number,
  "totalBrowserHours": number,
  "todayBrowserHours": number,
  "todayApiCalls": number,
  "daily": [{"date", "sessions", "browserHours", "apiCalls"}],
  "currentPeriod?": {"start": "ISO8601", "end": "ISO8601"}
}

### POST /v1/billing/checkout — Create Stripe checkout session
### POST /v1/billing/portal — Create Stripe customer portal session

## Health

### GET /health — Health check
Response: { "status": "ok" }

## Error Format
All errors: { "error": "message" }
Status codes: 400 (bad request), 401 (unauthorized), 404 (not found), 429 (rate limited), 500 (server error), 501 (not configured), 503 (service unavailable)

## SDK Examples

### Node.js
\`\`\`
import { BrowseFleet } from 'browsefleet';
const bf = new BrowseFleet({ apiKey: 'bf_...' });

// Sessions
const session = await bf.sessions.create({ stealth: 'full' });
await bf.sessions.release(session.id);

// Quick actions
const { markdown } = await bf.scrape('https://example.com');
const imgBuf = await bf.screenshot('https://example.com', { fullPage: true });
const pdfBuf = await bf.pdf('https://example.com', { format: 'A4' });

// Computer API
const result = await bf.sessions.actions(session.id, [
  { type: 'navigate', url: 'https://example.com' },
  { type: 'click', x: 200, y: 300 },
  { type: 'type', text: 'search query' },
  { type: 'press_key', key: 'Enter' },
  { type: 'screenshot' },
]);

// Profiles
const profile = await bf.profiles.create({ name: 'test' });
const s = await bf.sessions.create({ profileId: profile.id });
\`\`\`

### Python
\`\`\`
from browsefleet import BrowseFleet
bf = BrowseFleet(api_key="bf_...", base_url="https://api.browsefleet.com")

session = bf.sessions.create(stealth="full")
result = bf.scrape("https://example.com")
print(result.markdown)
bf.sessions.release(session.id)
\`\`\`

### curl
\`\`\`
# Create session
curl -X POST https://api.browsefleet.com/v1/sessions -H "Content-Type: application/json" -H "x-api-key: bf_key" -d '{"stealth":"full"}'

# Scrape
curl -X POST https://api.browsefleet.com/v1/scrape -H "Content-Type: application/json" -H "x-api-key: bf_key" -d '{"url":"https://example.com"}'

# Screenshot
curl -X POST https://api.browsefleet.com/v1/screenshot -H "Content-Type: application/json" -H "x-api-key: bf_key" -d '{"url":"https://example.com"}' --output screenshot.png

# Computer API
curl -X POST https://api.browsefleet.com/v1/sessions/SESSION_ID/actions -H "Content-Type: application/json" -H "x-api-key: bf_key" -d '{"actions":[{"type":"screenshot"}]}'

# Agent
curl -X POST https://api.browsefleet.com/v1/agent -H "Content-Type: application/json" -H "x-api-key: bf_key" -d '{"task":"Find the price","url":"https://example.com"}'
\`\`\`
`;

export default function LlmsPage() {
  return (
    <div>
      <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Reference</p>
      <h1 className="text-4xl font-bold text-white mb-4">llms.txt</h1>
      <p className="text-zinc-400 mb-6">
        Complete API reference in a single plain-text document, optimized for consumption by LLMs and AI agents.
        An AI agent reading this page should be able to use every BrowseFleet endpoint with zero other context.
      </p>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
        <div className="px-4 py-2 border-b border-zinc-800/50">
          <span className="text-[10px] text-zinc-600 uppercase tracking-wider">llms.txt</span>
        </div>
        <pre className="p-5 text-[12px] leading-relaxed text-zinc-300 overflow-x-auto whitespace-pre-wrap">
          {LLMS_TEXT}
        </pre>
      </div>
    </div>
  );
}
