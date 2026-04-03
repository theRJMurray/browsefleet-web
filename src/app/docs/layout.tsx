import { DocsSidebar } from "@/components/docs-sidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 flex gap-12">
      <DocsSidebar />
      <article className="flex-1 min-w-0">{children}</article>
    </div>
  );
}
