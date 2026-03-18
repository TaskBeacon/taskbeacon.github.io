"use client";

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
              <div className="tb-frame-soft flex w-full items-start justify-center bg-[#eef8ff] px-4 py-5 sm:px-6 sm:py-8">
                <div className="flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <TaskBeaconMark className="size-16 sm:size-20" />
                  <div>
                    <div className="font-heading text-[1.7rem] leading-none text-[#25314d] sm:text-[2.2rem]">
                      TaskBeacon
                    </div>
                    <div className="mt-1 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-slate-500 sm:mt-2 sm:text-sm">
                      Canonical Task Hub
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
