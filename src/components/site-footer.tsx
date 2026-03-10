import Link from "next/link";
import { getIndex } from "@/lib/task-index";

export function SiteFooter() {
  const index = getIndex();
  const tasks = index.tasks ?? [];
  const previewCount = tasks.filter((task) => task.web_variant).length;

  return (
    <footer className="mt-16 bg-[#efe7de]">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="tb-frame bg-[#fff8f0] px-6 py-8">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="max-w-2xl">
              <div className="font-heading text-3xl font-bold text-[#25314d]">TaskBeacon</div>
              <div className="mt-3 text-sm leading-7 text-slate-700">
                Canonical tasks, aligned previews, framework references, and automation-ready
                workflows for reusable cognitive task development.
              </div>
              <div className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                Static index updated {new Date(index.generated_at).toLocaleDateString("en-US")}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <article className="tb-frame-soft bg-white p-4">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  Catalog
                </div>
                <div className="mt-3 font-heading text-2xl font-bold text-[#25314d]">
                  {tasks.length} tasks, {previewCount} previews
                </div>
                <div className="mt-2 text-sm leading-6 text-slate-700">
                  Open the explorer when you need the full catalog, filters, and README-backed details.
                </div>
                <div className="mt-4">
                  <Link className="tb-focus-ring tb-button-secondary" href="/tasks/">
                    Open Tasks
                  </Link>
                </div>
              </article>

              <article className="tb-frame-soft bg-white p-4">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  Standards
                </div>
                <div className="mt-3 font-heading text-2xl font-bold text-[#25314d]">
                  TAPS, PsyFlow, psyflow-web
                </div>
                <div className="mt-2 text-sm leading-6 text-slate-700">
                  Read the structure standard, then move into the local and web runtime layers.
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    className="tb-focus-ring tb-button-ghost"
                    href="https://github.com/TaskBeacon/taskbeacon.github.io/blob/main/source/taps.md"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read TAPS
                  </a>
                  <Link className="tb-focus-ring tb-button-secondary" href="/framework/">
                    Framework
                  </Link>
                </div>
              </article>

              <article className="tb-frame-soft bg-white p-4">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  Build
                </div>
                <div className="mt-3 font-heading text-2xl font-bold text-[#25314d]">
                  Skills, tutorials, contribution
                </div>
                <div className="mt-2 text-sm leading-6 text-slate-700">
                  Move from setup to localization, plotting, translation, and contribution without leaving the ecosystem.
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    className="tb-focus-ring tb-button-ghost"
                    href="https://github.com/TaskBeacon/skills"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Browse Skills
                  </a>
                  <Link className="tb-focus-ring tb-button-secondary" href="/contribute/">
                    Contribute
                  </Link>
                </div>
              </article>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <div>TaskBeacon GitHub organization remains the public source of truth for active repositories.</div>
            <a href="https://github.com/TaskBeacon" target="_blank" rel="noreferrer">
              Open GitHub Organization
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
