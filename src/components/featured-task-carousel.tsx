"use client";

import { useEffect, useState } from "react";
import { IconChevronLeft, IconChevronRight, IconPlay } from "@/components/icons";
import { MaturityBadge } from "@/components/maturity-badge";
import { TaskDrawer } from "@/components/task-drawer";
import type { TaskIndexItem } from "@/lib/task-index";
import { formatShortDate } from "@/lib/format";
import { taskHandle, taskTitle } from "@/lib/task-display";
import { useTasksWithHtmlCompanions } from "@/lib/use-html-companions";

export function FeaturedTaskCarousel({
  tasks
}: {
  tasks: TaskIndexItem[];
}) {
  const mergedTasks = useTasksWithHtmlCompanions(tasks);
  const [activeIndex, setActiveIndex] = useState(0);
  const [drawerRepo, setDrawerRepo] = useState<string | null>(null);

  useEffect(() => {
    if (mergedTasks.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % mergedTasks.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [mergedTasks.length]);

  if (mergedTasks.length === 0) {
    return (
      <div className="tb-frame bg-[#fffdf9] p-6">
        <div className="font-heading text-2xl font-bold text-[#25314d]">
          Featured tasks are unavailable in this build.
        </div>
      </div>
    );
  }

  const normalizedActiveIndex = activeIndex % mergedTasks.length;
  const activeTask = mergedTasks[normalizedActiveIndex] ?? mergedTasks[0];
  const preview = activeTask.web_variant;
  const drawerTask = mergedTasks.find((task) => task.repo === drawerRepo) ?? null;

  function goTo(nextIndex: number) {
    const total = mergedTasks.length;
    setActiveIndex(((nextIndex % total) + total) % total);
  }

  return (
    <>
      <div id="featured-task-carousel" className="mx-auto w-full max-w-[620px] lg:w-[620px]">
        <div className="tb-frame overflow-hidden bg-[#fffdf9] p-4 sm:p-6">
          <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
                  Featured Task
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  className="tb-focus-ring rounded-full border-2 border-[#25314d] bg-white p-2.5 shadow-[0_4px_0_#25314d] transition-transform hover:-translate-y-px disabled:translate-y-0 disabled:cursor-default disabled:opacity-50"
                  onClick={() => goTo(activeIndex - 1)}
                  aria-label="Show previous featured task"
                  disabled={mergedTasks.length < 2}
                >
                  <IconChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  className="tb-focus-ring rounded-full border-2 border-[#25314d] bg-white p-2.5 shadow-[0_4px_0_#25314d] transition-transform hover:-translate-y-px disabled:translate-y-0 disabled:cursor-default disabled:opacity-50"
                  onClick={() => goTo(activeIndex + 1)}
                  aria-label="Show next featured task"
                  disabled={mergedTasks.length < 2}
                >
                  <IconChevronRight className="size-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {mergedTasks.map((task, index) => (
                <button
                  key={task.repo}
                  type="button"
                  className={
                    index === normalizedActiveIndex
                      ? "tb-focus-ring rounded-full border-2 border-[#25314d] bg-[#d7ebf6] px-3 py-1.5 text-sm font-bold text-[#25314d] shadow-[0_4px_0_#25314d]"
                      : "tb-focus-ring rounded-full border-2 border-[#25314d] bg-white px-3 py-1.5 text-sm font-bold text-[#25314d]"
                  }
                  onClick={() => setActiveIndex(index)}
                >
                  {task.tags?.paradigm?.[0] ?? taskHandle(task)}
                </button>
              ))}
            </div>

            <div className="tb-frame-soft flex min-h-[320px] w-full flex-col bg-[#f8fcff] p-4 sm:h-[392px] sm:p-6">
              <div className="min-h-[3rem] w-full content-start flex flex-wrap items-center gap-2 text-xs text-slate-600">
                <code className="rounded-full border-2 border-[#25314d] bg-white px-2.5 py-1 font-mono text-[11px] font-semibold text-[#25314d]">
                  {taskHandle(activeTask)}
                </code>
                {activeTask.maturity ? <MaturityBadge maturity={activeTask.maturity} /> : null}
                {preview ? (
                  <span className="rounded-full bg-[#ecffe5] px-3 py-1 text-[11px] font-bold text-[#25314d]">
                    Preview ready
                  </span>
                ) : null}
                <span className="rounded-full bg-[#e2f3fb] px-3 py-1 text-[11px] font-bold text-[#25314d]">
                  {formatShortDate(activeTask.last_updated)}
                </span>
              </div>

              <div
                className="mt-4 min-h-[4.2rem] w-full font-heading text-[1.75rem] font-bold leading-[1.02] text-[#25314d] sm:min-h-[5.1rem] sm:text-[2.45rem] sm:[display:-webkit-box] sm:[-webkit-box-orient:vertical] sm:[-webkit-line-clamp:2] sm:overflow-hidden"
              >
                {taskTitle(activeTask)}
              </div>

              <p
                className="mt-3 min-h-[5.25rem] w-full text-sm leading-6 text-slate-700 sm:min-h-[5.75rem] sm:text-base sm:leading-7 sm:[display:-webkit-box] sm:[-webkit-box-orient:vertical] sm:[-webkit-line-clamp:3] sm:overflow-hidden"
              >
                {activeTask.short_description}
              </p>

              <div className="mt-auto grid w-full grid-cols-2 gap-2 sm:flex sm:flex-row sm:flex-nowrap sm:gap-3">
                <button
                  type="button"
                  className="tb-focus-ring tb-button-primary w-full justify-center px-3 py-3 text-[0.85rem] sm:w-[11.5rem] sm:px-5 sm:py-3 sm:text-sm"
                  onClick={() => setDrawerRepo(activeTask.repo)}
                >
                  Expand details
                </button>
                {preview ? (
                  <a
                    className="tb-focus-ring tb-button-secondary w-full justify-center bg-[#d7ebf6] px-3 py-3 text-[0.85rem] sm:w-[11.5rem] sm:px-5 sm:py-3 sm:text-sm"
                    href={preview.run_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconPlay className="size-4" />
                    Run Preview
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <TaskDrawer task={drawerTask} onClose={() => setDrawerRepo(null)} />
    </>
  );
}
