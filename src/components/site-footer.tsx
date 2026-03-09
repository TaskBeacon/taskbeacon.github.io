import Link from "next/link";
import { tasksPageHref } from "@/lib/routes";

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-[#efe7de]">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="tb-frame bg-[#fff8f0] px-6 py-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="font-heading text-3xl font-bold text-[#25314d]">TaskBeacon</div>
              <div className="mt-3 text-sm leading-7 text-slate-700">
                Canonical PsyFlow tasks, aligned web previews, contribution workflows, and
                framework references in one place.
              </div>
            </div>

            <div className="flex flex-wrap gap-3 text-sm">
              <Link className="tb-focus-ring tb-button-ghost" href={tasksPageHref()}>
                Tasks
              </Link>
              <Link className="tb-focus-ring tb-button-secondary" href="/framework/">
                Framework
              </Link>
              <Link className="tb-focus-ring tb-button-secondary" href="/contribute/">
                Contribute
              </Link>
              <a
                className="tb-focus-ring tb-button-primary"
                href="https://taskbeacon.github.io/psyflow-web"
                target="_blank"
                rel="noreferrer"
              >
                Preview
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <div>Built as a static site with automated index refresh.</div>
            <a href="https://github.com/TaskBeacon" target="_blank" rel="noreferrer">
              GitHub Organization
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
