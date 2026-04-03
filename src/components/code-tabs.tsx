"use client";

import { useState } from "react";

interface Tab {
  label: string;
  language: string;
  code: string;
}

export function CodeTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
      <div className="flex border-b border-zinc-800/50">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`px-4 py-2 text-[11px] font-medium uppercase tracking-wider transition-colors ${
              i === active
                ? "text-purple-400 border-b-2 border-purple-400 bg-zinc-900/80"
                : "text-zinc-600 hover:text-zinc-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <pre className="p-5 text-[13px] leading-relaxed text-zinc-300 overflow-x-auto">
        <code>{tabs[active].code}</code>
      </pre>
    </div>
  );
}
