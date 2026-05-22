"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/docs", label: "Docs" },
  { href: "/self-host", label: "Self-host" },
  { href: "/sdks", label: "SDKs" },
  { href: "/comparison", label: "Comparison" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "https://github.com/theRJMurray/browsefleet", label: "Star on GitHub", external: true, cta: true },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex flex-col justify-center items-center w-10 h-10 gap-1.5"
      >
        <span
          className={`block h-0.5 w-5 bg-zinc-400 transition-transform ${
            open ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-5 bg-zinc-400 transition-opacity ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-5 bg-zinc-400 transition-transform ${
            open ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute top-16 left-0 right-0 border-b border-zinc-800/50 bg-zinc-900">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const className = link.cta
                ? "block px-3 py-2.5 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors rounded-lg hover:bg-zinc-800/50"
                : "block px-3 py-2.5 text-sm text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800/50";
              if (link.external) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={className}
                  >
                    {link.label}
                  </a>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={className}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
