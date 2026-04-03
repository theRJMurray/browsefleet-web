import { EndpointBlock } from "@/components/endpoint-block";
import { CodeTabs } from "@/components/code-tabs";

export default function PdfPage() {
  return (
    <div>
      <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">API Reference</p>
      <h1 className="text-4xl font-bold text-white mb-4">PDF Generation</h1>
      <p className="text-zinc-400 mb-10">
        Generate PDFs from any URL using a real browser engine. Supports paper format, orientation,
        margins, and background printing. Returns the PDF as binary data.
      </p>

      <EndpointBlock
        method="POST"
        path="/v1/pdf"
        description="Generate a PDF from a URL."
        params={[
          { name: "url", type: "string", required: true, description: "The URL to render as PDF." },
          { name: "format", type: '"A4" | "Letter" | "Legal"', required: false, default: '"A4"', description: "Paper format." },
          { name: "landscape", type: "boolean", required: false, default: "false", description: "Landscape orientation." },
          { name: "printBackground", type: "boolean", required: false, default: "true", description: "Include background colors and images." },
          { name: "margin", type: "object", required: false, default: '{ top: "1cm", right: "1cm", bottom: "1cm", left: "1cm" }', description: "Page margins. Each value is a CSS length (e.g., '1cm', '0.5in')." },
          { name: "waitFor", type: "string | number", required: false, description: "CSS selector to wait for, or milliseconds to wait after page load." },
          { name: "proxyUrl", type: "string", required: false, description: "Proxy URL for this request." },
          { name: "stealth", type: '"none" | "basic" | "full"', required: false, default: '"full"', description: "Anti-detection level." },
          { name: "timeout", type: "number", required: false, default: "30000", description: "Navigation timeout in milliseconds." },
        ]}
        request={`{
  "url": "https://example.com",
  "format": "A4",
  "landscape": false,
  "printBackground": true,
  "margin": {
    "top": "2cm",
    "right": "1.5cm",
    "bottom": "2cm",
    "left": "1.5cm"
  }
}`}
      >
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Response</h4>
          <p className="text-sm text-zinc-400">
            Returns binary PDF data with <code className="text-purple-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">Content-Type: application/pdf</code> and
            <code className="text-purple-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">Content-Disposition: inline; filename=&quot;page.pdf&quot;</code>.
          </p>
        </div>
        <CodeTabs tabs={[
          {
            label: "curl",
            language: "bash",
            code: `curl -X POST https://api.browsefleet.com/v1/pdf \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: bf_your_api_key" \\
  -d '{
    "url": "https://example.com",
    "format": "A4",
    "printBackground": true
  }' --output page.pdf`,
          },
          {
            label: "Node.js",
            language: "typescript",
            code: `import { writeFileSync } from 'fs';

const pdfBuffer = await bf.pdf('https://example.com', {
  format: 'A4',
  landscape: false,
  printBackground: true,
  margin: { top: '2cm', bottom: '2cm', left: '1.5cm', right: '1.5cm' },
});

writeFileSync('page.pdf', Buffer.from(pdfBuffer));`,
          },
          {
            label: "Python",
            language: "python",
            code: `pdf_bytes = bf.pdf(
    "https://example.com",
    format="A4",
    landscape=False,
    print_background=True,
    margin={"top": "2cm", "bottom": "2cm", "left": "1.5cm", "right": "1.5cm"},
)

with open("page.pdf", "wb") as f:
    f.write(pdf_bytes)`,
          },
        ]} />
      </EndpointBlock>
    </div>
  );
}
