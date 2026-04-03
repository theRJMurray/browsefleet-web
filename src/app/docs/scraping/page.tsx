import { EndpointBlock } from "@/components/endpoint-block";
import { CodeTabs } from "@/components/code-tabs";

export default function ScrapingPage() {
  return (
    <div>
      <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">API Reference</p>
      <h1 className="text-4xl font-bold text-white mb-4">Scraping</h1>
      <p className="text-zinc-400 mb-10">
        The scrape endpoint loads a URL in a headless browser and extracts structured content. Returns raw HTML,
        cleaned HTML, markdown, readability text, links, and page metadata. No session management required.
      </p>

      <EndpointBlock
        method="POST"
        path="/v1/scrape"
        description="Scrape a URL and extract structured content."
        params={[
          { name: "url", type: "string", required: true, description: "The URL to scrape." },
          { name: "waitFor", type: "string | number", required: false, description: "CSS selector to wait for, or milliseconds to wait after page load." },
          { name: "headers", type: "Record<string, string>", required: false, description: "Custom HTTP headers to set on the page request." },
          { name: "cookies", type: "Cookie[]", required: false, description: "Cookies to inject before navigation. Each: { name, value, domain }." },
          { name: "proxyUrl", type: "string", required: false, description: "Proxy URL for this request (HTTP or SOCKS5)." },
          { name: "stealth", type: '"none" | "basic" | "full"', required: false, default: '"full"', description: "Anti-detection level." },
          { name: "timeout", type: "number", required: false, default: "30000", description: "Navigation timeout in milliseconds." },
        ]}
        request={`{
  "url": "https://example.com",
  "waitFor": 2000,
  "stealth": "full",
  "headers": {
    "Accept-Language": "en-US"
  }
}`}
        response={`{
  "url": "https://example.com/",
  "statusCode": 200,
  "title": "Example Domain",
  "html": "<!doctype html>\\n<html>\\n<head>...",
  "cleanedHtml": "<h1>Example Domain</h1>\\n<p>This domain is for use in...",
  "markdown": "# Example Domain\\n\\nThis domain is for use in illustrative examples...",
  "readability": "Example Domain\\n\\nThis domain is for use in illustrative examples in documents.",
  "links": [
    { "href": "https://www.iana.org/domains/example", "text": "More information..." }
  ],
  "metadata": {
    "description": "Example domain for documentation",
    "ogImage": null,
    "canonical": "https://example.com/"
  }
}`}
      >
        <CodeTabs tabs={[
          {
            label: "curl",
            language: "bash",
            code: `curl -X POST https://api.browsefleet.com/v1/scrape \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: bf_your_api_key" \\
  -d '{
    "url": "https://example.com",
    "waitFor": 2000
  }'`,
          },
          {
            label: "Node.js",
            language: "typescript",
            code: `const result = await bf.scrape('https://example.com', {
  waitFor: 2000,
});

console.log(result.title);       // "Example Domain"
console.log(result.markdown);    // "# Example Domain\\n\\n..."
console.log(result.statusCode);  // 200
console.log(result.links);       // [{ href: "...", text: "..." }]
console.log(result.metadata);    // { description: "...", ogImage: "...", canonical: "..." }`,
          },
          {
            label: "Python",
            language: "python",
            code: `result = bf.scrape("https://example.com", wait_for=2000)

print(result.title)        # "Example Domain"
print(result.markdown)     # "# Example Domain\\n\\n..."
print(result.status_code)  # 200
print(result.links)        # [{"href": "...", "text": "..."}]
print(result.metadata)     # {"description": "...", "og_image": "..."}`,
          },
        ]} />
      </EndpointBlock>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Response Fields</h2>
      <div className="rounded-xl border border-zinc-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 border-b border-zinc-800">
            <tr>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Field</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Type</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">url</code></td><td className="px-4 py-3 text-xs text-zinc-400">string</td><td className="px-4 py-3 text-xs text-zinc-400">Final URL after redirects</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">statusCode</code></td><td className="px-4 py-3 text-xs text-zinc-400">number</td><td className="px-4 py-3 text-xs text-zinc-400">HTTP status code of the page</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">title</code></td><td className="px-4 py-3 text-xs text-zinc-400">string</td><td className="px-4 py-3 text-xs text-zinc-400">Page title from the document</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">html</code></td><td className="px-4 py-3 text-xs text-zinc-400">string</td><td className="px-4 py-3 text-xs text-zinc-400">Full raw HTML of the page</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">cleanedHtml</code></td><td className="px-4 py-3 text-xs text-zinc-400">string</td><td className="px-4 py-3 text-xs text-zinc-400">HTML with scripts, styles, and non-content elements removed</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">markdown</code></td><td className="px-4 py-3 text-xs text-zinc-400">string</td><td className="px-4 py-3 text-xs text-zinc-400">Page content converted to Markdown</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">readability</code></td><td className="px-4 py-3 text-xs text-zinc-400">string</td><td className="px-4 py-3 text-xs text-zinc-400">Plain text extracted via readability algorithm</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">links</code></td><td className="px-4 py-3 text-xs text-zinc-400">Array</td><td className="px-4 py-3 text-xs text-zinc-400">All links on the page, each with href and text</td></tr>
            <tr><td className="px-4 py-3"><code className="text-xs text-purple-400">metadata</code></td><td className="px-4 py-3 text-xs text-zinc-400">object</td><td className="px-4 py-3 text-xs text-zinc-400">Page metadata: description, ogImage, canonical</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Scrape vs Sessions</h2>
      <div className="rounded-xl border border-zinc-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 border-b border-zinc-800">
            <tr>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Use Case</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Recommended</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            <tr><td className="px-4 py-3 text-xs text-zinc-400">Extract content from a single URL</td><td className="px-4 py-3 text-xs text-zinc-300">Scrape endpoint</td></tr>
            <tr><td className="px-4 py-3 text-xs text-zinc-400">Navigate through multiple pages</td><td className="px-4 py-3 text-xs text-zinc-300">Session + Puppeteer</td></tr>
            <tr><td className="px-4 py-3 text-xs text-zinc-400">Fill forms and interact with UI</td><td className="px-4 py-3 text-xs text-zinc-300">Session + Computer API</td></tr>
            <tr><td className="px-4 py-3 text-xs text-zinc-400">One-off screenshot or PDF</td><td className="px-4 py-3 text-xs text-zinc-300">Quick action endpoints</td></tr>
            <tr><td className="px-4 py-3 text-xs text-zinc-400">Long-running automation</td><td className="px-4 py-3 text-xs text-zinc-300">Session with extended timeout</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
