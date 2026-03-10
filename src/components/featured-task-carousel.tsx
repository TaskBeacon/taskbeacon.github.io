"use client";

import { useEffect, useState } from "react";
import { IconChevronLeft, IconChevronRight, IconPlay } from "@/components/icons";
import { MaturityBadge } from "@/components/maturity-badge";
import { TaskDrawer } from "@/components/task-drawer";
import type { TaskIndexItem } from "@/lib/task-index";
import { formatShortDate } from "@/lib/format";
import { taskHandle, taskTitle } from "@/lib/task-display";

export function FeaturedTaskCarousel({
  tasks
}: {
  tasks: TaskIndexItem[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [drawerRepo, setDrawerRepo] = useState<string | null>(null);

  useEffect(() => {
    if (tasks.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % tasks.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [tasks.length]);

  if (tasks.length === 0) {
    return (
      <div className="tb-frame bg-[#fffdf9] p-6">
        <div className="font-heading text-2xl font-bold text-[#25314d]">
          Featured tasks are unavailable in this build.
        </div>
      </div>
    );
  }

  const activeTask = tasks[activeIndex] ?? tasks[0];
  const preview = activeTask.web_variant;
  const drawerTask = tasks.find((task) => task.repo === drawerRepo) ?? null;

  function goTo(nextIndex: number) {
    const total = tasks.length;
    setActiveIndex(((nextIndex % total) + total) % total);
  }

  return (
    <>
      <div className="relative tb-frame bg-[#fffdf9] px-6 py-8">
        <button
          type="button"
          className="tb-focus-ring absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border-2 border-[#25314d] bg-white p-3 shadow-[0_4px_0_#25314d] lg:-left-5"
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Show previous featured task"
        >
          <IconChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          className="tb-focus-ring absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border-2 border-[#25314d] bg-white p-3 shadow-[0_4px_0_#25314d] lg:-right-5"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Show next featured task"
        >
          <IconChevronRight className="size-4" />
        </button>

        <div className="flex flex-wrap justify-center gap-2">
          {tasks.map((task, index) => (
            <button
              key={task.repo}
              type="button"
              className={
                index === activeIndex
                  ? "tb-focus-ring rounded-full border-2 border-[#25314d] bg-[#d7ebf6] px-3 py-1.5 text-sm font-bold text-[#25314d] shadow-[0_4px_0_#25314d]"
                  : "tb-focus-ring rounded-full border-2 border-[#25314d] bg-white px-3 py-1.5 text-sm font-bold text-[#25314d]"
              }
              onClick={() => setActiveIndex(index)}
            >
              {task.tags?.paradigm?.[0] ?? taskHandle(task)}
            </button>
          ))}
        </div>

        <div className="mt-5 tb-frame-soft bg-[#f8fcff] p-5 sm:px-8">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
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

          <div className="mt-4 font-heading text-3xl font-bold leading-tight text-[#25314d]">
            {taskTitle(activeTask)}
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-700 sm:text-base">
            {activeTask.short_description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              className="tb-focus-ring tb-button-primary"
              onClick={() => setDrawerRepo(activeTask.repo)}
            >
              Expand details
            </button>
            {preview ? (
              <a
                className="tb-focus-ring tb-button-secondary bg-[#d7ebf6]"
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

      <TaskDrawer task={drawerTask} onClose={() => setDrawerRepo(null)} />
    </>
  );
}
