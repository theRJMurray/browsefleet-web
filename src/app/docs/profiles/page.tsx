import { EndpointBlock } from "@/components/endpoint-block";
import { CodeTabs } from "@/components/code-tabs";

export default function ProfilesPage() {
  return (
    <div>
      <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">API Reference</p>
      <h1 className="text-4xl font-bold text-white mb-4">Profiles</h1>
      <p className="text-zinc-400 mb-10">
        Browser profiles persist cookies and localStorage across sessions. Use profiles to maintain
        authenticated state, preferences, and browsing context between separate browser sessions.
      </p>

      <h2 className="text-2xl font-bold text-white mb-4">What Profiles Store</h2>
      <div className="rounded-xl border border-zinc-800 overflow-hidden mb-10">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 border-b border-zinc-800">
            <tr>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Data</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">File</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            <tr><td className="px-4 py-3 text-xs text-zinc-300">Cookies</td><td className="px-4 py-3"><code className="text-xs text-zinc-400">cookies.json</code></td><td className="px-4 py-3 text-xs text-zinc-400">All cookies from the browser session</td></tr>
            <tr><td className="px-4 py-3 text-xs text-zinc-300">localStorage</td><td className="px-4 py-3"><code className="text-xs text-zinc-400">localStorage.json</code></td><td className="px-4 py-3 text-xs text-zinc-400">All localStorage key-value pairs</td></tr>
            <tr><td className="px-4 py-3 text-xs text-zinc-300">Metadata</td><td className="px-4 py-3"><code className="text-xs text-zinc-400">meta.json</code></td><td className="px-4 py-3 text-xs text-zinc-400">Profile ID, name, timestamps</td></tr>
          </tbody>
        </table>
      </div>

      {/* POST /v1/profiles */}
      <h2 className="text-2xl font-bold text-white mb-6">Create Profile</h2>
      <EndpointBlock
        method="POST"
        path="/v1/profiles"
        description="Create a new browser profile."
        params={[
          { name: "name", type: "string", required: true, description: "Human-readable name for the profile." },
        ]}
        request={`{ "name": "My Shopping Account" }`}
        response={`{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "name": "My Shopping Account",
  "createdAt": "2026-04-02T12:00:00.000Z",
  "updatedAt": "2026-04-02T12:00:00.000Z"
}`}
      >
        <CodeTabs tabs={[
          { label: "curl", language: "bash", code: `curl -X POST https://api.browsefleet.com/v1/profiles \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: bf_your_api_key" \\
  -d '{ "name": "My Shopping Account" }'` },
          { label: "Node.js", language: "typescript", code: `const profile = await bf.profiles.create({ name: 'My Shopping Account' });
console.log(profile.id); // "a1b2c3d4-..."` },
          { label: "Python", language: "python", code: `profile = bf.profiles.create("My Shopping Account")
print(profile.id)  # "a1b2c3d4-..."` },
        ]} />
      </EndpointBlock>

      {/* GET /v1/profiles */}
      <h2 className="text-2xl font-bold text-white mb-6">List Profiles</h2>
      <EndpointBlock
        method="GET"
        path="/v1/profiles"
        description="List all browser profiles."
        response={`{
  "profiles": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "name": "My Shopping Account",
      "createdAt": "2026-04-02T12:00:00.000Z",
      "updatedAt": "2026-04-02T12:30:00.000Z"
    }
  ]
}`}
      >
        <CodeTabs tabs={[
          { label: "curl", language: "bash", code: `curl https://api.browsefleet.com/v1/profiles \\
  -H "x-api-key: bf_your_api_key"` },
          { label: "Node.js", language: "typescript", code: `const { profiles } = await bf.profiles.list();
profiles.forEach(p => console.log(p.name));` },
          { label: "Python", language: "python", code: `profiles = bf.profiles.list()
for p in profiles:
    print(p.name)` },
        ]} />
      </EndpointBlock>

      {/* GET /v1/profiles/:id */}
      <h2 className="text-2xl font-bold text-white mb-6">Get Profile</h2>
      <EndpointBlock
        method="GET"
        path="/v1/profiles/:id"
        description="Get a single profile by ID."
        response={`{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "name": "My Shopping Account",
  "createdAt": "2026-04-02T12:00:00.000Z",
  "updatedAt": "2026-04-02T12:30:00.000Z"
}`}
      />

      {/* DELETE /v1/profiles/:id */}
      <h2 className="text-2xl font-bold text-white mb-6">Delete Profile</h2>
      <EndpointBlock
        method="DELETE"
        path="/v1/profiles/:id"
        description="Delete a profile and all its stored data (cookies, localStorage)."
        response={`{ "deleted": true }`}
      >
        <CodeTabs tabs={[
          { label: "curl", language: "bash", code: `curl -X DELETE https://api.browsefleet.com/v1/profiles/PROFILE_ID \\
  -H "x-api-key: bf_your_api_key"` },
          { label: "Node.js", language: "typescript", code: `await bf.profiles.delete('a1b2c3d4-...');` },
          { label: "Python", language: "python", code: `bf.profiles.delete("a1b2c3d4-...")` },
        ]} />
      </EndpointBlock>

      {/* Using profiles with sessions */}
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Using Profiles with Sessions</h2>
      <p className="text-sm text-zinc-400 mb-4">
        Pass the <code className="text-purple-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">profileId</code> when creating a session.
        The session loads the profile&apos;s saved cookies and localStorage. When the session is released,
        cookies are automatically saved back to the profile.
      </p>
      <CodeTabs tabs={[
        {
          label: "Node.js",
          language: "typescript",
          code: `// Create a profile
const profile = await bf.profiles.create({ name: 'GitHub Account' });

// First session: log in and let cookies save
const session1 = await bf.sessions.create({
  profileId: profile.id,
  stealth: 'full',
});
// ... log in to GitHub ...
await bf.sessions.release(session1.id);

// Future sessions: already logged in
const session2 = await bf.sessions.create({
  profileId: profile.id,
  stealth: 'full',
});
// session2 has the saved cookies — you're already authenticated`,
        },
        {
          label: "Python",
          language: "python",
          code: `# Create a profile
profile = bf.profiles.create("GitHub Account")

# First session: log in
session1 = bf.sessions.create(profile_id=profile.id, stealth="full")
# ... log in to GitHub ...
bf.sessions.release(session1.id)

# Future sessions: already authenticated
session2 = bf.sessions.create(profile_id=profile.id, stealth="full")`,
        },
      ]} />
    </div>
  );
}
