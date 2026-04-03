import { EndpointBlock } from "@/components/endpoint-block";
import { CodeTabs } from "@/components/code-tabs";
import { CodeBlock } from "@/components/code-block";

export default function CaptchaPage() {
  return (
    <div>
      <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">API Reference</p>
      <h1 className="text-4xl font-bold text-white mb-4">CAPTCHA Solving</h1>
      <p className="text-zinc-400 mb-10">
        BrowseFleet integrates with 2captcha to automatically detect and solve CAPTCHAs on pages within
        active sessions. Supports reCAPTCHA v2, hCaptcha, and Cloudflare Turnstile.
      </p>

      <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
      <CodeBlock code={`1. Call the solve endpoint on a session with a CAPTCHA-protected page
2. BrowseFleet scans the page DOM for CAPTCHA elements
3. Detects the CAPTCHA type (reCAPTCHA, hCaptcha, or Turnstile)
4. Extracts the site key from the data-sitekey attribute
5. Submits the challenge to 2captcha API
6. Polls for the solution (up to 120 seconds)
7. Injects the solution token into the page
8. Triggers any callback functions registered by the CAPTCHA`} language="text" />

      <EndpointBlock
        method="POST"
        path="/v1/sessions/:id/captcha/solve"
        description="Detect and solve a CAPTCHA on the current page of an active session."
        params={[
          { name: "type", type: '"auto" | "recaptcha" | "hcaptcha" | "turnstile"', required: false, default: '"auto"', description: "CAPTCHA type to solve. Use 'auto' to detect automatically." },
        ]}
        request={`{
  "type": "auto"
}`}
        response={`{
  "success": true,
  "type": "recaptcha",
  "duration": 23450
}`}
      >
        <CodeTabs tabs={[
          {
            label: "curl",
            language: "bash",
            code: `# First navigate to the page with the CAPTCHA
curl -X POST "https://api.browsefleet.com/v1/sessions/sess_abc123/actions" \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: bf_your_api_key" \\
  -d '{"actions": [{"type": "navigate", "url": "https://site-with-captcha.com"}]}'

# Then solve the CAPTCHA
curl -X POST "https://api.browsefleet.com/v1/sessions/sess_abc123/captcha/solve" \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: bf_your_api_key" \\
  -d '{"type": "auto"}'`,
          },
          {
            label: "Node.js",
            language: "typescript",
            code: `const session = await bf.sessions.create({ stealth: 'full' });

// Navigate to the page
await bf.sessions.actions(session.id, [
  { type: 'navigate', url: 'https://site-with-captcha.com' },
]);

// Solve the CAPTCHA
const result = await bf.sessions.solveCaptcha(session.id, {
  type: 'auto',
});

console.log(result.success);   // true
console.log(result.type);      // "recaptcha"
console.log(result.duration);  // 23450 (ms)

// Continue interacting with the page
await bf.sessions.actions(session.id, [
  { type: 'click', x: 400, y: 500 },  // Click submit button
]);`,
          },
          {
            label: "Python",
            language: "python",
            code: `session = bf.sessions.create(stealth="full")

# Navigate to the page
bf.sessions.actions(session.id, [
    {"type": "navigate", "url": "https://site-with-captcha.com"},
])

# Solve the CAPTCHA
result = bf.sessions.solve_captcha(session.id, type="auto")

print(result.success)    # True
print(result.type)       # "recaptcha"
print(result.duration)   # 23450 (ms)`,
          },
        ]} />
      </EndpointBlock>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Supported CAPTCHA Types</h2>
      <div className="rounded-xl border border-zinc-800 overflow-hidden mb-10">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 border-b border-zinc-800">
            <tr>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Type</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Detection Method</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Solution Method</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            <tr>
              <td className="px-4 py-3 text-xs text-zinc-300">reCAPTCHA v2</td>
              <td className="px-4 py-3 text-xs text-zinc-400">Detects g-recaptcha elements and data-sitekey</td>
              <td className="px-4 py-3 text-xs text-zinc-400">Token injected into #g-recaptcha-response, callbacks triggered</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-xs text-zinc-300">hCaptcha</td>
              <td className="px-4 py-3 text-xs text-zinc-400">Detects h-captcha elements and data-sitekey</td>
              <td className="px-4 py-3 text-xs text-zinc-400">Token injected via 2captcha hCaptcha handler</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-xs text-zinc-300">Cloudflare Turnstile</td>
              <td className="px-4 py-3 text-xs text-zinc-400">Detects cf-turnstile elements and data-sitekey</td>
              <td className="px-4 py-3 text-xs text-zinc-400">Token injected via 2captcha Turnstile handler</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-white mb-4">Configuration</h2>
      <p className="text-sm text-zinc-400 mb-4">
        CAPTCHA solving requires a 2captcha API key. Set it via environment variable:
      </p>
      <CodeBlock code={`CAPTCHA_API_KEY=your_2captcha_api_key
CAPTCHA_PROVIDER=2captcha`} language="bash" />
      <p className="text-sm text-zinc-400 mt-4">
        If no CAPTCHA API key is configured, the solve endpoint returns HTTP 501 with an error message.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Error Responses</h2>
      <div className="space-y-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">No CAPTCHA detected</h3>
          <CodeBlock code={`{ "success": false, "type": "none", "duration": 50, "error": "No CAPTCHA detected on page" }`} language="json" />
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Solve timeout</h3>
          <CodeBlock code={`{ "success": false, "type": "recaptcha", "duration": 120000, "error": "CAPTCHA solve timed out" }`} language="json" />
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Not configured</h3>
          <p className="text-xs text-zinc-400">HTTP 501:</p>
          <CodeBlock code={`{ "error": "CAPTCHA solving not configured. Set CAPTCHA_API_KEY." }`} language="json" />
        </div>
      </div>
    </div>
  );
}
