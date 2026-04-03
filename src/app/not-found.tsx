import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
      <p className="text-sm font-semibold text-purple-400 uppercase tracking-widest mb-4">
        404
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
        Page not found
      </h1>
      <p className="text-zinc-400 mb-8 max-w-md text-center">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-500 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
