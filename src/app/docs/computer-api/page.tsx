import { EndpointBlock } from "@/components/endpoint-block";
import { CodeTabs } from "@/components/code-tabs";
import { CodeBlock } from "@/components/code-block";

export default function ComputerApiPage() {
  return (
    <div>
      <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">API Reference</p>
      <h1 className="text-4xl font-bold text-white mb-4">Computer API</h1>
      <p className="text-zinc-400 mb-10">
        The Computer API lets you interact with browser sessions through structured actions. Click, type, scroll,
        navigate, and take screenshots. Every action returns a screenshot of the resulting browser state,
        making it ideal for AI agents that use vision models.
      </p>

      <EndpointBlock
        method="POST"
        path="/v1/sessions/:id/actions"
        description="Execute one or more browser actions on an active session."
        params={[
          { name: "actions", type: "BrowserAction[]", required: true, description: "Array of actions to execute sequentially. Each action returns a result." },
        ]}
        request={`{
  "actions": [
    { "type": "navigate", "url": "https://example.com" },
    { "type": "screenshot" },
    { "type": "click", "x": 200, "y": 350 },
    { "type": "type", "text": "hello world" },
    { "type": "press_key", "key": "Enter" },
    { "type": "screenshot" }
  ]
}`}
        response={`{
  "results": [
    { "type": "navigate", "success": true, "screenshot": "<base64-png>" },
    { "type": "screenshot", "success": true, "screenshot": "<base64-png>" },
    { "type": "click", "success": true, "screenshot": "<base64-png>" },
    { "type": "type", "success": true, "screenshot": "<base64-png>" },
    { "type": "press_key", "success": true, "screenshot": "<base64-png>" },
    { "type": "screenshot", "success": true, "screenshot": "<base64-png>" }
  ]
}`}
      >
        <CodeTabs tabs={[
          {
            label: "curl",
            language: "bash",
            code: `curl -X POST https://api.browsefleet.com/v1/sessions/sess_abc123/actions \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: bf_your_api_key" \\
  -d '{
    "actions": [
      { "type": "navigate", "url": "https://example.com" },
      { "type": "screenshot" }
    ]
  }'`,
          },
          {
            label: "Node.js",
            language: "typescript",
            code: `const result = await bf.sessions.actions(session.id, [
  { type: 'navigate', url: 'https://example.com' },
  { type: 'screenshot' },
  { type: 'click', x: 200, y: 350 },
  { type: 'type', text: 'hello world' },
  { type: 'press_key', key: 'Enter' },
  { type: 'screenshot' },
]);

// Each result has: type, success, screenshot (base64), error?
for (const r of result.results) {
  console.log(r.type, r.success);
}`,
          },
          {
            label: "Python",
            language: "python",
            code: `result = bf.sessions.actions(session.id, [
    {"type": "navigate", "url": "https://example.com"},
    {"type": "screenshot"},
    {"type": "click", "x": 200, "y": 350},
    {"type": "type", "text": "hello world"},
    {"type": "press_key", "key": "Enter"},
    {"type": "screenshot"},
])

for r in result.results:
    print(r.type, r.success)`,
          },
        ]} />
      </EndpointBlock>

      <h2 className="text-2xl font-bold text-white mt-10 mb-6">Action Types</h2>

      <div className="space-y-6">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-2">screenshot</h3>
          <p className="text-xs text-zinc-400 mb-3">Capture a PNG screenshot of the current page state.</p>
          <CodeBlock code={`{ "type": "screenshot" }`} language="json" />
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-2">click</h3>
          <p className="text-xs text-zinc-400 mb-3">Click at the specified coordinates. Returns a screenshot after the click.</p>
          <div className="rounded-xl border border-zinc-800 overflow-hidden mb-3">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900 border-b border-zinc-800">
                <tr>
                  <th className="text-left px-4 py-2 text-[10px] font-semibold text-zinc-500 uppercase">Field</th>
                  <th className="text-left px-4 py-2 text-[10px] font-semibold text-zinc-500 uppercase">Type</th>
                  <th className="text-left px-4 py-2 text-[10px] font-semibold text-zinc-500 uppercase">Required</th>
                  <th className="text-left px-4 py-2 text-[10px] font-semibold text-zinc-500 uppercase">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                <tr><td className="px-4 py-2"><code className="text-xs text-purple-400">x</code></td><td className="px-4 py-2 text-xs text-zinc-400">number</td><td className="px-4 py-2 text-xs text-zinc-500">Yes</td><td className="px-4 py-2 text-xs text-zinc-400">X coordinate in pixels</td></tr>
                <tr><td className="px-4 py-2"><code className="text-xs text-purple-400">y</code></td><td className="px-4 py-2 text-xs text-zinc-400">number</td><td className="px-4 py-2 text-xs text-zinc-500">Yes</td><td className="px-4 py-2 text-xs text-zinc-400">Y coordinate in pixels</td></tr>
                <tr><td className="px-4 py-2"><code className="text-xs text-purple-400">button</code></td><td className="px-4 py-2 text-xs text-zinc-400">&quot;left&quot; | &quot;right&quot; | &quot;middle&quot;</td><td className="px-4 py-2 text-xs text-zinc-500">No</td><td className="px-4 py-2 text-xs text-zinc-400">Mouse button (default: &quot;left&quot;)</td></tr>
                <tr><td className="px-4 py-2"><code className="text-xs text-purple-400">clickCount</code></td><td className="px-4 py-2 text-xs text-zinc-400">number</td><td className="px-4 py-2 text-xs text-zinc-500">No</td><td className="px-4 py-2 text-xs text-zinc-400">Number of clicks (default: 1, use 2 for double-click)</td></tr>
              </tbody>
            </table>
          </div>
          <CodeBlock code={`{ "type": "click", "x": 500, "y": 300, "button": "left", "clickCount": 1 }`} language="json" />
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-2">type</h3>
          <p className="text-xs text-zinc-400 mb-3">Type text into the currently focused element. Characters are typed with a 30ms delay for realism.</p>
          <div className="rounded-xl border border-zinc-800 overflow-hidden mb-3">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900 border-b border-zinc-800">
                <tr>
                  <th className="text-left px-4 py-2 text-[10px] font-semibold text-zinc-500 uppercase">Field</th>
                  <th className="text-left px-4 py-2 text-[10px] font-semibold text-zinc-500 uppercase">Type</th>
                  <th className="text-left px-4 py-2 text-[10px] font-semibold text-zinc-500 uppercase">Required</th>
                  <th className="text-left px-4 py-2 text-[10px] font-semibold text-zinc-500 uppercase">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                <tr><td className="px-4 py-2"><code className="text-xs text-purple-400">text</code></td><td className="px-4 py-2 text-xs text-zinc-400">string</td><td className="px-4 py-2 text-xs text-zinc-500">Yes</td><td className="px-4 py-2 text-xs text-zinc-400">Text to type</td></tr>
              </tbody>
            </table>
          </div>
          <CodeBlock code={`{ "type": "type", "text": "hello world" }`} language="json" />
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-2">press_key</h3>
          <p className="text-xs text-zinc-400 mb-3">Press a keyboard key. Supports all Puppeteer key names (Enter, Tab, Escape, ArrowDown, etc.).</p>
          <div className="rounded-xl border border-zinc-800 overflow-hidden mb-3">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900 border-b border-zinc-800">
                <tr>
                  <th className="text-left px-4 py-2 text-[10px] font-semibold text-zinc-500 uppercase">Field</th>
                  <th className="text-left px-4 py-2 text-[10px] font-semibold text-zinc-500 uppercase">Type</th>
                  <th className="text-left px-4 py-2 text-[10px] font-semibold text-zinc-500 uppercase">Required</th>
                  <th className="text-left px-4 py-2 text-[10px] font-semibold text-zinc-500 uppercase">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                <tr><td className="px-4 py-2"><code className="text-xs text-purple-400">key</code></td><td className="px-4 py-2 text-xs text-zinc-400">string</td><td className="px-4 py-2 text-xs text-zinc-500">Yes</td><td className="px-4 py-2 text-xs text-zinc-400">Key name (e.g. &quot;Enter&quot;, &quot;Tab&quot;, &quot;Escape&quot;)</td></tr>
              </tbody>
            </table>
          </div>
          <CodeBlock code={`{ "type": "press_key", "key": "Enter" }`} language="json" />
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-2">scroll</h3>
          <p className="text-xs text-zinc-400 mb-3">Scroll the page by the specified delta. Waits 500ms after scrolling for content to load.</p>
          <div className="rounded-xl border border-zinc-800 overflow-hidden mb-3">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900 border-b border-zinc-800">
                <tr>
                  <th className="text-left px-4 py-2 text-[10px] font-semibold text-zinc-500 uppercase">Field</th>
                  <th className="text-left px-4 py-2 text-[10px] font-semibold text-zinc-500 uppercase">Type</th>
                  <th className="text-left px-4 py-2 text-[10px] font-semibold text-zinc-500 uppercase">Required</th>
                  <th className="text-left px-4 py-2 text-[10px] font-semibold text-zinc-500 uppercase">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                <tr><td className="px-4 py-2"><code className="text-xs text-purple-400">deltaX</code></td><td className="px-4 py-2 text-xs text-zinc-400">number</td><td className="px-4 py-2 text-xs text-zinc-500">No</td><td className="px-4 py-2 text-xs text-zinc-400">Horizontal scroll pixels (default: 0)</td></tr>
                <tr><td className="px-4 py-2"><code className="text-xs text-purple-400">deltaY</code></td><td className="px-4 py-2 text-xs text-zinc-400">number</td><td className="px-4 py-2 text-xs text-zinc-500">No</td><td className="px-4 py-2 text-xs text-zinc-400">Vertical scroll pixels (default: 0, positive = down)</td></tr>
              </tbody>
            </table>
          </div>
          <CodeBlock code={`{ "type": "scroll", "deltaX": 0, "deltaY": 500 }`} language="json" />
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-2">move_mouse</h3>
          <p className="text-xs text-zinc-400 mb-3">Move the mouse cursor to the specified coordinates without clicking.</p>
          <CodeBlock code={`{ "type": "move_mouse", "x": 500, "y": 300 }`} language="json" />
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-2">wait</h3>
          <p className="text-xs text-zinc-400 mb-3">Wait for the specified duration before continuing. Maximum 30 seconds.</p>
          <CodeBlock code={`{ "type": "wait", "duration": 2000 }`} language="json" />
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-2">navigate</h3>
          <p className="text-xs text-zinc-400 mb-3">Navigate the browser to a new URL. Waits for network idle before completing.</p>
          <CodeBlock code={`{ "type": "navigate", "url": "https://example.com/page" }`} language="json" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">AI Agent Integration</h2>
      <p className="text-sm text-zinc-400 mb-4">
        The Computer API is designed for integration with vision-capable LLMs. The typical loop is:
        take a screenshot, send it to the LLM for analysis, execute the LLM&apos;s recommended actions,
        take another screenshot, and repeat.
      </p>

      <CodeTabs tabs={[
        {
          label: "Claude Computer Use",
          language: "typescript",
          code: `import Anthropic from '@anthropic-ai/sdk';
import { BrowseFleet } from 'browsefleet';

const bf = new BrowseFleet({ apiKey: 'bf_...' });
const anthropic = new Anthropic();

const session = await bf.sessions.create({ stealth: 'full' });

// Navigate and get initial screenshot
let result = await bf.sessions.actions(session.id, [
  { type: 'navigate', url: 'https://example.com' },
  { type: 'screenshot' },
]);

let screenshot = result.results[1].screenshot;

// Send to Claude for analysis
const response = await anthropic.messages.create({
  model: 'claude-sonnet-4-20250514',
  max_tokens: 1024,
  messages: [{
    role: 'user',
    content: [
      { type: 'image', source: { type: 'base64', media_type: 'image/png', data: screenshot } },
      { type: 'text', text: 'Click the "Learn More" link on this page.' },
    ],
  }],
});

// Parse Claude's response and execute actions
// ... parse coordinates from response ...
await bf.sessions.actions(session.id, [
  { type: 'click', x: parsedX, y: parsedY },
  { type: 'screenshot' },
]);`,
        },
        {
          label: "GPT-4o",
          language: "typescript",
          code: `import OpenAI from 'openai';
import { BrowseFleet } from 'browsefleet';

const bf = new BrowseFleet({ apiKey: 'bf_...' });
const openai = new OpenAI();

const session = await bf.sessions.create({ stealth: 'full' });

let result = await bf.sessions.actions(session.id, [
  { type: 'navigate', url: 'https://example.com' },
  { type: 'screenshot' },
]);

const screenshot = result.results[1].screenshot;

const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [{
    role: 'user',
    content: [
      { type: 'image_url', image_url: { url: \`data:image/png;base64,\${screenshot}\` } },
      { type: 'text', text: 'What should I click to navigate to the about page?' },
    ],
  }],
});`,
        },
      ]} />
    </div>
  );
}
