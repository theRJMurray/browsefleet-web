import { EndpointBlock } from "@/components/endpoint-block";
import { CodeTabs } from "@/components/code-tabs";

export default function ScreenshotsPage() {
  return (
    <div>
      <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">API Reference</p>
      <h1 className="text-4xl font-bold text-white mb-4">Screenshots</h1>
      <p className="text-zinc-400 mb-10">
        Capture screenshots of any URL with a single API call. Returns the image as binary data (PNG, JPEG, or WebP)
        or as base64 JSON depending on the Accept header. No session management required.
      </p>

      <EndpointBlock
        method="POST"
        path="/v1/screenshot"
        description="Take a screenshot of a URL."
        params={[
          { name: "url", type: "string", required: true, description: "The URL to screenshot." },
          { name: "fullPage", type: "boolean", required: false, default: "false", description: "Capture the full scrollable page instead of just the viewport." },
          { name: "viewport", type: "{ width, height }", required: false, default: "{ 1920, 1080 }", description: "Viewport dimensions in pixels." },
          { name: "quality", type: "number", required: false, description: "JPEG/WebP quality (1-100). Only applies to jpeg and webp formats." },
          { name: "format", type: '"png" | "jpeg" | "webp"', required: false, default: '"png"', description: "Image format." },
          { name: "waitFor", type: "string | number", required: false, description: "CSS selector to wait for, or milliseconds to wait after page load." },
          { name: "proxyUrl", type: "string", required: false, description: "Proxy URL for this request." },
          { name: "stealth", type: '"none" | "basic" | "full"', required: false, default: '"full"', description: "Anti-detection level." },
          { name: "timeout", type: "number", required: false, default: "30000", description: "Navigation timeout in milliseconds." },
        ]}
        request={`{
  "url": "https://example.com",
  "fullPage": true,
  "format": "png",
  "viewport": { "width": 1440, "height": 900 }
}`}
      >
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Response</h4>
          <p className="text-sm text-zinc-400 mb-2">
            By default, returns binary image data with the appropriate Content-Type header
            (<code className="text-purple-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">image/png</code>,
            <code className="text-purple-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">image/jpeg</code>, or
            <code className="text-purple-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">image/webp</code>).
          </p>
          <p className="text-sm text-zinc-400 mb-2">
            If the request includes <code className="text-purple-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">Accept: application/json</code>,
            returns a JSON object with the screenshot as a base64-encoded string:
          </p>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
            <pre className="p-5 text-[13px] leading-relaxed text-zinc-300 overflow-x-auto">
              <code>{`{
  "screenshot": "<base64-encoded-image>",
  "format": "png"
}`}</code>
            </pre>
          </div>
        </div>
        <CodeTabs tabs={[
          {
            label: "curl",
            language: "bash",
            code: `# Save as file
curl -X POST https://api.browsefleet.com/v1/screenshot \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: bf_your_api_key" \\
  -d '{ "url": "https://example.com", "fullPage": true }' \\
  --output screenshot.png

# Get as base64 JSON
curl -X POST https://api.browsefleet.com/v1/screenshot \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json" \\
  -H "x-api-key: bf_your_api_key" \\
  -d '{ "url": "https://example.com" }'`,
          },
          {
            label: "Node.js",
            language: "typescript",
            code: `import { writeFileSync } from 'fs';

// Returns ArrayBuffer
const imageBuffer = await bf.screenshot('https://example.com', {
  fullPage: true,
  format: 'png',
  viewport: { width: 1440, height: 900 },
});

writeFileSync('screenshot.png', Buffer.from(imageBuffer));`,
          },
          {
            label: "Python",
            language: "python",
            code: `# Returns bytes
image_bytes = bf.screenshot(
    "https://example.com",
    full_page=True,
    format="png",
    viewport={"width": 1440, "height": 900},
)

with open("screenshot.png", "wb") as f:
    f.write(image_bytes)`,
          },
        ]} />
      </EndpointBlock>
    </div>
  );
}
