import { EndpointBlock } from "@/components/endpoint-block";
import { CodeTabs } from "@/components/code-tabs";

export default function FilesPage() {
  return (
    <div>
      <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">API Reference</p>
      <h1 className="text-4xl font-bold text-white mb-4">Files</h1>
      <p className="text-zinc-400 mb-10">
        Upload files to browser sessions (for form submissions) and download files that the browser has
        downloaded during the session. Files are stored temporarily and removed when the session is released.
      </p>

      {/* POST /v1/sessions/:id/files */}
      <h2 className="text-2xl font-bold text-white mb-6">Upload File</h2>
      <EndpointBlock
        method="POST"
        path="/v1/sessions/:id/files"
        description="Upload a file to a session. The file is stored in the session's upload directory and can be used with file input elements. Send as multipart/form-data."
        params={[
          { name: "file", type: "File", required: true, description: "The file to upload (multipart form field)." },
        ]}
        response={`{
  "uploaded": "document.pdf",
  "size": 102400
}`}
      >
        <CodeTabs tabs={[
          {
            label: "curl",
            language: "bash",
            code: `curl -X POST "https://api.browsefleet.com/v1/sessions/sess_abc123/files" \\
  -H "x-api-key: bf_your_api_key" \\
  -F "file=@document.pdf"`,
          },
          {
            label: "Node.js",
            language: "typescript",
            code: `// Using the SDK
const formData = new FormData();
formData.append('file', new Blob([fileBuffer]), 'document.pdf');

await fetch(\`https://api.browsefleet.com/v1/sessions/\${session.id}/files\`, {
  method: 'POST',
  headers: { 'x-api-key': 'bf_your_api_key' },
  body: formData,
});`,
          },
          {
            label: "Python",
            language: "python",
            code: `bf.sessions.upload_file(
    session.id,
    file_name="document.pdf",
    file_data=open("document.pdf", "rb").read(),
)`,
          },
        ]} />
      </EndpointBlock>

      {/* GET /v1/sessions/:id/files */}
      <h2 className="text-2xl font-bold text-white mb-6">List Files</h2>
      <EndpointBlock
        method="GET"
        path="/v1/sessions/:id/files"
        description="List all files associated with a session, including both uploaded files and files downloaded by the browser."
        response={`{
  "files": [
    "uploads/document.pdf",
    "downloads/report.csv"
  ]
}`}
      >
        <CodeTabs tabs={[
          { label: "curl", language: "bash", code: `curl "https://api.browsefleet.com/v1/sessions/sess_abc123/files" \\
  -H "x-api-key: bf_your_api_key"` },
          { label: "Node.js", language: "typescript", code: `const { files } = await bf.sessions.listFiles(session.id);
console.log(files); // ["uploads/document.pdf", "downloads/report.csv"]` },
          { label: "Python", language: "python", code: `files = bf.sessions.list_files(session.id)
print(files)  # ["uploads/document.pdf", "downloads/report.csv"]` },
        ]} />
      </EndpointBlock>

      {/* GET /v1/sessions/:id/files/:name */}
      <h2 className="text-2xl font-bold text-white mb-6">Download File</h2>
      <EndpointBlock
        method="GET"
        path="/v1/sessions/:id/files/:name"
        description="Download a file from a session. Checks both the upload and download directories. Returns the file as binary data with Content-Disposition header."
      >
        <CodeTabs tabs={[
          {
            label: "curl",
            language: "bash",
            code: `curl "https://api.browsefleet.com/v1/sessions/sess_abc123/files/report.csv" \\
  -H "x-api-key: bf_your_api_key" \\
  --output report.csv`,
          },
          {
            label: "Node.js",
            language: "typescript",
            code: `const data = await bf.sessions.downloadFile(session.id, 'report.csv');
writeFileSync('report.csv', Buffer.from(data));`,
          },
          {
            label: "Python",
            language: "python",
            code: `data = bf.sessions.download_file(session.id, "report.csv")
with open("report.csv", "wb") as f:
    f.write(data)`,
          },
        ]} />
      </EndpointBlock>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Use Cases</h2>
      <div className="space-y-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Form file uploads</h3>
          <p className="text-xs text-zinc-400">Upload a file to the session, then use Puppeteer to set the file on an input element.</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Downloading exports</h3>
          <p className="text-xs text-zinc-400">Trigger a download in the browser, then retrieve the file via the files API.</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Data extraction pipelines</h3>
          <p className="text-xs text-zinc-400">Navigate to a site, trigger CSV/Excel export, download the file, and process it programmatically.</p>
        </div>
      </div>
    </div>
  );
}
