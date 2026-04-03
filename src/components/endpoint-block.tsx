import { ParamTable, type Param } from "./param-table";

const METHOD_STYLES: Record<string, string> = {
  GET: "text-emerald-400 bg-emerald-950/80 border-emerald-800/40",
  POST: "text-blue-400 bg-blue-950/80 border-blue-800/40",
  DELETE: "text-red-400 bg-red-950/80 border-red-800/40",
  PUT: "text-amber-400 bg-amber-950/80 border-amber-800/40",
  PATCH: "text-orange-400 bg-orange-950/80 border-orange-800/40",
  WS: "text-purple-400 bg-purple-950/80 border-purple-800/40",
};

export function EndpointBlock({
  method,
  path,
  description,
  params,
  request,
  response,
  children,
}: {
  method: string;
  path: string;
  description?: string;
  params?: Param[];
  request?: string;
  response?: string;
  children?: React.ReactNode;
}) {
  const style = METHOD_STYLES[method] ?? "text-zinc-400 bg-zinc-800 border-zinc-700";
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-3">
        <span className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-bold ${style}`}>
          {method}
        </span>
        <code className="text-sm text-white font-medium">{path}</code>
      </div>
      {description && <p className="text-sm text-zinc-400 mb-4">{description}</p>}
      {params && params.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Parameters</h4>
          <ParamTable params={params} />
        </div>
      )}
      {request && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Request Body</h4>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
            <pre className="p-5 text-[13px] leading-relaxed text-zinc-300 overflow-x-auto">
              <code>{request}</code>
            </pre>
          </div>
        </div>
      )}
      {response && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Response</h4>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
            <pre className="p-5 text-[13px] leading-relaxed text-zinc-300 overflow-x-auto">
              <code>{response}</code>
            </pre>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
