import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/85 p-10 text-center shadow-sm">
      <h1 className="font-heading text-2xl font-semibold tracking-tight text-slate-900">
        Page not found
      </h1>
      <p className="mt-3 text-sm text-slate-700">
        The page you requested does not exist. If you followed a task link, the index may be outdated.
      </p>
      <div className="mt-6">
        <Link
          className="tb-focus-ring inline-flex items-center justify-center rounded-xl bg-cta-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cta-600"
          href="/"
        >
          Go to gallery
        </Link>
      </div>
    </div>
  );
}
