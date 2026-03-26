"use client";

import { IconArrowRight, IconGithub } from "@/components/icons";
import { getIndex } from "@/lib/task-index";
import { taskHasPreview } from "@/lib/html-companions";
import { useTasksWithHtmlCompanions } from "@/lib/use-html-companions";
import { TaskBeaconLogo, TaskBeaconMark } from "@/components/taskbeacon-logo";

export function SiteFooter() {
  const index = getIndex();
  const tasks = useTasksWithHtmlCompanions(index.tasks ?? []);
  const previewCount = tasks.filter((task) => taskHasPreview(task)).length;

  return (
    <footer id="site-footer" className="mt-16 bg-[#efe7de]">
      <div className="mx-auto w-full max-w-7xl px-3 py-10 sm:px-6 lg:px-8">
        <div className="tb-frame bg-[#fff8f0] px-4 py-6 sm:px-6 sm:py-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center">
            <div>
              <TaskBeaconLogo
                className="gap-2 sm:gap-3"
                markClassName="size-8 sm:size-11"
                textClassName="text-[1.45rem] sm:text-3xl"
              />
              <div className="mt-4 max-w-2xl text-sm leading-6 text-slate-700 sm:leading-7">
                Canonical tasks, aligned previews, framework references, and reusable guidance for
                auditable cognitive task development.
              </div>

              <div className="mt-6 grid gap-2 text-sm text-slate-700 sm:flex sm:flex-wrap sm:gap-6">
                <div>{tasks.length} canonical tasks</div>
                <div>{previewCount} web previews</div>
                <div>Index updated {new Date(index.generated_at).toLocaleDateString("en-US")}</div>
              </div>

              <div className="mt-5 text-xs text-slate-600">
                TaskBeacon GitHub organization remains the public source of truth for active repositories.
              </div>
            </div>

            <div className="lg:justify-self-end">
              <a
                className="tb-frame-soft tb-focus-ring group flex w-full items-start justify-center bg-[#eef8ff] px-4 py-5 transition-transform hover:-translate-y-0.5 sm:px-6 sm:py-8"
                href="https://github.com/TaskBeacon"
                target="_blank"
                rel="noreferrer"
                aria-label="Open the TaskBeacon GitHub organization"
              >
                <div className="flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <TaskBeaconMark className="size-16 sm:size-20" />
                  <div className="w-full">
                    <div className="font-heading text-[1.7rem] leading-none text-[#25314d] sm:text-[2.2rem]">
                      TaskBeacon
                    </div>
                    <div className="mt-1 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-slate-500 sm:mt-2 sm:text-sm">
                      Canonical Task Hub
                    </div>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-[#25314d] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#25314d]">
                      <IconGithub className="size-4" />
                      Open GitHub Org
                      <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
