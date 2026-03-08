import Link from "next/link";
import { tasksPageHref } from "@/lib/routes";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white/70">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-slate-700">
            <div className="font-heading font-semibold text-slate-900">
              TaskBeacon
            </div>
            <div className="mt-1">
              Community-maintained PsyFlow and TAPS tasks with aligned browser previews.
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Link
              className="tb-focus-ring rounded-md px-3 py-2 font-medium text-slate-700 hover:text-slate-900"
              href={tasksPageHref()}
            >
              Tasks
            </Link>
            <Link
              className="tb-focus-ring rounded-md px-3 py-2 font-medium text-slate-700 hover:text-slate-900"
              href="/framework/"
            >
              Framework
            </Link>
            <Link
              className="tb-focus-ring rounded-md px-3 py-2 font-medium text-slate-700 hover:text-slate-900"
              href="/contribute/"
            >
              Contribute
            </Link>
            <a
              className="tb-focus-ring rounded-md px-3 py-2 font-medium text-slate-700 hover:text-slate-900"
              href="https://github.com/TaskBeacon"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Org
            </a>
            <a
              className="tb-focus-ring rounded-md px-3 py-2 font-medium text-slate-700 hover:text-slate-900"
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
