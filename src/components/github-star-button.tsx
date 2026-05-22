import Link from "next/link";

interface GitHubStarButtonProps {
  repo?: string;
  className?: string;
  size?: "sm" | "md";
}

/**
 * GitHub "Star" CTA. Renders as a static link with the GitHub icon and the
 * word "Star on GitHub". We intentionally do not fetch live star counts at
 * build or runtime; that would require a build-time GitHub API token and a
 * client-side fetch on every page load. The link drives users to the repo
 * page where the live count is rendered by GitHub itself.
 */
export function GitHubStarButton({
  repo = "theRJMurray/browsefleet",
  className = "",
  size = "md",
}: GitHubStarButtonProps) {
  const sizing = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";

  return (
    <Link
      href={`https://github.com/${repo}`}
      className={`inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 ${sizing} font-semibold text-zinc-200 transition-colors hover:border-zinc-500 hover:text-white ${className}`}
      aria-label={`Star ${repo} on GitHub`}
    >
      <svg viewBox="0 0 16 16" fill="currentColor" className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} aria-hidden="true">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
      </svg>
      <span>Star on GitHub</span>
    </Link>
  );
}
