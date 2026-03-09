import Link from "next/link";
import { tasksPageHref } from "@/lib/routes";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/70 bg-white/75 backdrop-blur">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-slate-700">
            <div className="font-heading font-semibold text-slate-900">
              TaskBeacon
            </div>
            <div className="mt-1 max-w-xl">
              Community-maintained PsyFlow and TAPS tasks with aligned browser previews.
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Link
              className="tb-focus-ring rounded-full px-3 py-2 font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-800"
              href={tasksPageHref()}
            >
              Tasks
            </Link>
            <Link
              className="tb-focus-ring rounded-full px-3 py-2 font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-800"
              href="/framework/"
            >
              Framework
            </Link>
            <Link
              className="tb-focus-ring rounded-full px-3 py-2 font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-800"
              href="/contribute/"
            >
              Contribute
            </Link>
            <a
              className="tb-focus-ring rounded-full px-3 py-2 font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-800"
              href="https://github.com/TaskBeacon"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Org
            </a>
            <a
              className="tb-focus-ring rounded-full bg-gradient-to-r from-cta-500 to-cta-600 px-3 py-2 font-semibold text-white shadow-[0_10px_24px_rgba(245,158,11,0.22)]"
              href="https://taskbeacon.github.io/psyflow-web"
              target="_blank"
              rel="noreferrer"
            >
              Preview
            </a>
          </div>
        </div>

        <div className="mt-8 text-xs text-slate-600">
          Built as a static site. Index refresh is automated via GitHub Actions.
        </div>
      </div>
    </footer>
  );
}
