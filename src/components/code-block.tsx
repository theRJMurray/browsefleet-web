export function CodeBlock({ code, language, filename }: { code: string; language?: string; filename?: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
      {(filename || language) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800/50">
          <span className="text-[10px] text-zinc-600 uppercase tracking-wider">{filename || language}</span>
        </div>
      )}
      <pre className="p-5 text-[13px] leading-relaxed text-zinc-300 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}
