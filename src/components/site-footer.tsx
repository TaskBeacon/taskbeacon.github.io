import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white/70">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-slate-700">
            <div className="font-heading font-semibold text-slate-900">
              TaskBeacon Task Gallery
            </div>
            <div className="mt-1">
              Community-maintained PsyFlow/TAPS task templates.
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <a
              className="tb-focus-ring rounded-md px-3 py-2 font-medium text-slate-700 hover:text-slate-900"
              href="https://github.com/TaskBeacon"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Org
            </a>
            <Link
              className="tb-focus-ring rounded-md px-3 py-2 font-medium text-slate-700 hover:text-slate-900"
              href="/about"
            >
              Contribute
            </Link>
          </div>
        </div>

        <div className="mt-8 text-xs text-slate-600">
          Built as a static site. Index refresh is automated via GitHub Actions.
        </div>
      </div>
    </footer>
  );
}

