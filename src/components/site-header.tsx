import Link from "next/link";

function Mark() {
  return (
    <span className="inline-flex items-center gap-2 font-heading text-sm font-semibold tracking-tight text-slate-900">
      <span className="grid size-7 place-items-center rounded-md border border-brand-200 bg-white shadow-sm">
        <span className="block size-3.5 rounded-sm bg-brand-600" aria-hidden="true" />
      </span>
      TaskBeacon
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 shadow-crisp backdrop-blur supports-[backdrop-filter]:bg-white/70">
          <Link className="tb-focus-ring rounded-md" href="/">
            <Mark />
          </Link>

          <nav className="flex items-center gap-2 text-sm">
            <Link
              className="tb-focus-ring rounded-md px-3 py-2 font-medium text-slate-700 hover:text-slate-900"
              href="/"
            >
              Gallery
            </Link>
            <Link
              className="tb-focus-ring rounded-md px-3 py-2 font-medium text-slate-700 hover:text-slate-900"
              href="/about"
            >
              About
            </Link>
            <Link
              className="tb-focus-ring rounded-md bg-cta-500 px-3 py-2 font-semibold text-white shadow-sm transition-colors hover:bg-cta-600"
              href="/about#contribute"
            >
              Add Your Task
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

