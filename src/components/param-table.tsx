export interface Param {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
}

export function ParamTable({ params }: { params: Param[] }) {
  return (
    <div className="rounded-xl border border-zinc-800 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-zinc-900 border-b border-zinc-800">
          <tr>
            <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Name</th>
            <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Type</th>
            <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Required</th>
            <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Default</th>
            <th className="text-left px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/60">
          {params.map((p) => (
            <tr key={p.name} className="hover:bg-zinc-900/60 transition-colors">
              <td className="px-4 py-3">
                <code className="text-xs text-purple-400">{p.name}</code>
              </td>
              <td className="px-4 py-3">
                <code className="text-xs text-zinc-400">{p.type}</code>
              </td>
              <td className="px-4 py-3 text-xs text-zinc-500">{p.required ? "Yes" : "No"}</td>
              <td className="px-4 py-3">
                <code className="text-xs text-zinc-500">{p.default ?? "—"}</code>
              </td>
              <td className="px-4 py-3 text-xs text-zinc-400">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
