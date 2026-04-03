"use client";

import { usePathname } from "next/navigation";

const NAV_SECTIONS = [
  {
    title: "Getting Started",
    items: [
      { label: "Overview", href: "/docs" },
      { label: "Quickstart", href: "/docs/quickstart" },
      { label: "Authentication", href: "/docs/authentication" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { label: "Sessions", href: "/docs/sessions" },
      { label: "Scraping", href: "/docs/scraping" },
      { label: "Screenshots", href: "/docs/screenshots" },
      { label: "PDF Generation", href: "/docs/pdf" },
      { label: "Computer API", href: "/docs/computer-api" },
      { label: "Agent", href: "/docs/agent" },
      { label: "CAPTCHA Solving", href: "/docs/captcha" },
      { label: "Profiles", href: "/docs/profiles" },
      { label: "Files", href: "/docs/files" },
      { label: "Billing", href: "/docs/billing" },
    ],
  },
  {
    title: "Guides",
    items: [
      { label: "Stealth Mode", href: "/docs/stealth" },
      { label: "Self-Hosting", href: "/docs/self-hosting" },
      { label: "Error Handling", href: "/docs/errors" },
    ],
  },
  {
    title: "SDKs",
    items: [
      { label: "Node.js & Python", href: "/docs/sdks" },
      { label: "llms.txt", href: "/docs/llms" },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav aria-label="Documentation sidebar" className="w-56 shrink-0 sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto pr-4">
      {NAV_SECTIONS.map((section) => (
        <div key={section.title} className="mb-6">
          <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">
            {section.title}
          </p>
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`block px-3 py-1.5 rounded-lg text-[13px] transition-colors ${
                      isActive
                        ? "text-white bg-zinc-800/80 font-medium"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
