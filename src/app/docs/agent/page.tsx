import { EndpointBlock } from "@/components/endpoint-block";
import { CodeTabs } from "@/components/code-tabs";
import { CodeBlock } from "@/components/code-block";

export default function AgentPage() {
  return (
    <div>
      <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">API Reference</p>
      <h1 className="text-4xl font-bold text-white mb-4">Agent</h1>
      <p className="text-zinc-400 mb-10">
        The Agent API provides autonomous browser automation powered by vision-capable LLMs. Give it a task
        in natural language, and it will iteratively screenshot the browser, reason about what to do, execute
        actions, and repeat until the task is complete. Supports Claude (Anthropic) and GPT-4o (OpenAI).
      </p>

      <h2 className="text-2xl font-bold text-white mb-4">How the Agent Works</h2>
      <CodeBlock code={`1. Create a browser session (stealth: full, viewport: 1280x900)
2. Navigate to the starting URL (if provided)
3. Take a screenshot of the current page
4. Send screenshot + task description to the LLM
5. LLM returns structured actions with reasoning
6. Execute the actions (click, type, scroll, navigate, etc.)
7. Repeat steps 3-6 until:
   - The LLM returns a "done" action with a result
   - The LLM returns a "fail" action with a reason
   - Maximum iterations reached (default: 15, max: 30)
8. Release the session and return the result`} language="text" />

      {/* POST /v1/agent */}
      <h2 className="text-2xl font-bold text-white mt-10 mb-6">Autonomous Agent</h2>
      <EndpointBlock
        method="POST"
        path="/v1/agent"
        description="Run an autonomous agent task. Creates a session automatically, runs the task, and releases the session when done."
        params={[
          { name: "task", type: "string", required: true, description: "Natural language description of the task to perform." },
          { name: "url", type: "string", required: false, description: "Starting URL. The agent navigates here before beginning the task." },
          { name: "provider", type: '"anthropic" | "openai"', required: false, default: '"anthropic"', description: "LLM provider to use." },
          { name: "model", type: "string", required: false, default: '"claude-sonnet-4-20250514" or "gpt-4o"', description: "Model ID. Defaults based on provider." },
          { name: "maxIterations", type: "number", required: false, default: "15", description: "Maximum number of screenshot-action loops (max: 30)." },
          { name: "apiKey", type: "string", required: false, description: "LLM API key. If omitted, uses server-configured ANTHROPIC_API_KEY or OPENAI_API_KEY." },
        ]}
        request={`{
  "task": "Go to Hacker News and find the top post title",
  "url": "https://news.ycombinator.com",
  "provider": "anthropic",
  "model": "claude-sonnet-4-20250514",
  "maxIterations": 10
}`}
        response={`{
  "success": true,
  "result": "The top post is 'Show HN: BrowseFleet - Cloud Browser API'",
  "steps": [
    {
      "iteration": 0,
      "reasoning": "I see the Hacker News homepage. The top post is visible.",
      "actions": [
        { "type": "done", "result": "The top post is 'Show HN: BrowseFleet - Cloud Browser API'" }
      ],
      "screenshot": "<base64-png>"
    }
  ],
  "totalIterations": 1,
  "sessionId": "sess_abc123"
}`}
      >
        <CodeTabs tabs={[
          {
            label: "curl",
            language: "bash",
            code: `curl -X POST https://api.browsefleet.com/v1/agent \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: bf_your_api_key" \\
  -d '{
    "task": "Go to Hacker News and find the top post title",
    "url": "https://news.ycombinator.com",
    "provider": "anthropic",
    "maxIterations": 10
  }'`,
          },
          {
            label: "Node.js",
            language: "typescript",
            code: `const result = await fetch('https://api.browsefleet.com/v1/agent', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'bf_your_api_key',
  },
  body: JSON.stringify({
    task: 'Go to Hacker News and find the top post title',
    url: 'https://news.ycombinator.com',
    provider: 'anthropic',
    maxIterations: 10,
  }),
}).then(r => r.json());

console.log(result.success);  // true
console.log(result.result);   // "The top post is '...'"
console.log(result.totalIterations);`,
          },
          {
            label: "Python",
            language: "python",
            code: `import httpx

result = httpx.post(
    "https://api.browsefleet.com/v1/agent",
    headers={"x-api-key": "bf_your_api_key"},
    json={
        "task": "Go to Hacker News and find the top post title",
        "url": "https://news.ycombinator.com",
        "provider": "anthropic",
        "maxIterations": 10,
    },
).json()

print(result["success"])           # True
print(result["result"])            # "The top post is '...'"
print(result["totalIterations"])   # 1`,
          },
        ]} />
      </EndpointBlock>

      {/* POST /v1/sessions/:id/agent */}
      <h2 className="text-2xl font-bold text-white mt-10 mb-6">Agent on Existing Session</h2>
      <EndpointBlock
        method="POST"
        path="/v1/sessions/:id/agent"
        description="Run an agent task on an already-created session. The session is not released automatically — you control its lifecycle."
        params={[
          { name: "task", type: "string", required: true, description: "Natural language description of the task." },
          { name: "url", type: "string", required: false, description: "URL to navigate to before starting." },
          { name: "provider", type: '"anthropic" | "openai"', required: false, default: '"anthropic"', description: "LLM provider." },
          { name: "model", type: "string", required: false, description: "Model ID." },
          { name: "maxIterations", type: "number", required: false, default: "15", description: "Maximum iterations." },
          { name: "apiKey", type: "string", required: false, description: "LLM API key override." },
        ]}
        request={`{
  "task": "Fill in the contact form with test data and submit it",
  "provider": "anthropic"
}`}
        response={`{
  "success": true,
  "result": "Successfully filled and submitted the contact form",
  "steps": [ ... ],
  "totalIterations": 5
}`}
      >
        <CodeTabs tabs={[
          {
            label: "curl",
            language: "bash",
            code: `# First create a session
SESSION_ID=$(curl -s -X POST https://api.browsefleet.com/v1/sessions \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: bf_your_api_key" \\
  -d '{"stealth":"full"}' | jq -r .id)

# Run agent on the session
curl -X POST "https://api.browsefleet.com/v1/sessions/$SESSION_ID/agent" \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: bf_your_api_key" \\
  -d '{
    "task": "Fill in the contact form with test data and submit it"
  }'

# Release the session when done
curl -X POST "https://api.browsefleet.com/v1/sessions/$SESSION_ID/release" \\
  -H "x-api-key: bf_your_api_key"`,
          },
        ]} />
      </EndpointBlock>

      {/* POST /v1/agent/stream */}
      <h2 className="text-2xl font-bold text-white mt-10 mb-6">Streaming Agent (SSE)</h2>
      <EndpointBlock
        method="POST"
        path="/v1/agent/stream"
        description="Run an agent task with Server-Sent Events streaming. Receive screenshots, reasoning, and actions in real time as the agent works."
        params={[
          { name: "task", type: "string", required: true, description: "Natural language description of the task." },
          { name: "url", type: "string", required: false, description: "Starting URL." },
          { name: "provider", type: '"anthropic" | "openai"', required: false, default: '"anthropic"', description: "LLM provider." },
          { name: "model", type: "string", required: false, description: "Model ID." },
          { name: "maxIterations", type: "number", required: false, default: "15", description: "Maximum iterations." },
          { name: "apiKey", type: "string", required: false, description: "LLM API key override." },
        ]}
      >
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">SSE Event Types</h4>
          <div className="rounded-xl border border-zinc-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900 border-b border-zinc-800">
                <tr>
                  <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Event Type</th>
                  <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Fields</th>
                  <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">screenshot</code></td><td className="px-4 py-3 text-xs text-zinc-400">iteration, screenshot</td><td className="px-4 py-3 text-xs text-zinc-400">Screenshot taken before LLM call</td></tr>
                <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">step</code></td><td className="px-4 py-3 text-xs text-zinc-400">iteration, reasoning, actions</td><td className="px-4 py-3 text-xs text-zinc-400">LLM response with reasoning and planned actions</td></tr>
                <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">done</code></td><td className="px-4 py-3 text-xs text-zinc-400">result, totalIterations</td><td className="px-4 py-3 text-xs text-zinc-400">Task completed successfully</td></tr>
                <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">fail</code></td><td className="px-4 py-3 text-xs text-zinc-400">reason, totalIterations</td><td className="px-4 py-3 text-xs text-zinc-400">Task could not be completed</td></tr>
                <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">error</code></td><td className="px-4 py-3 text-xs text-zinc-400">error, iteration?</td><td className="px-4 py-3 text-xs text-zinc-400">An error occurred</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <CodeBlock code={`data: {"type":"screenshot","iteration":0,"screenshot":"<base64>"}

data: {"type":"step","iteration":0,"reasoning":"I see the HN homepage...","actions":[{"type":"click","x":200,"y":100}]}

data: {"type":"screenshot","iteration":1,"screenshot":"<base64>"}

data: {"type":"step","iteration":1,"reasoning":"I can now see...","actions":[{"type":"done","result":"Found the answer"}]}

data: {"type":"done","result":"Found the answer","totalIterations":2}`} language="text" />
        <div className="mt-4">
          <CodeTabs tabs={[
            {
              label: "Node.js",
              language: "typescript",
              code: `const response = await fetch('https://api.browsefleet.com/v1/agent/stream', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'bf_your_api_key',
  },
  body: JSON.stringify({
    task: 'Find the price of the first product on the page',
    url: 'https://example-shop.com',
  }),
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const text = decoder.decode(value);
  const lines = text.split('\\n');

  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const event = JSON.parse(line.slice(6));
      console.log(event.type, event.reasoning || event.result || '');
    }
  }
}`,
            },
          ]} />
        </div>
      </EndpointBlock>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Supported Providers</h2>
      <div className="rounded-xl border border-zinc-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 border-b border-zinc-800">
            <tr>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Provider</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Default Model</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Env Variable</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            <tr>
              <td className="px-4 py-3 text-xs text-zinc-300">anthropic</td>
              <td className="px-4 py-3"><code className="text-xs text-purple-400">claude-sonnet-4-20250514</code></td>
              <td className="px-4 py-3"><code className="text-xs text-zinc-400">ANTHROPIC_API_KEY</code></td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-xs text-zinc-300">openai</td>
              <td className="px-4 py-3"><code className="text-xs text-purple-400">gpt-4o</code></td>
              <td className="px-4 py-3"><code className="text-xs text-zinc-400">OPENAI_API_KEY</code></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-zinc-400 mt-4">
        You can pass the LLM API key in the request body
        (<code className="text-purple-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">apiKey</code>),
        or configure it on the server via environment variables. Request-level keys take precedence.
      </p>
    </div>
  );
}
