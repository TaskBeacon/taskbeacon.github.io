"use client";

import Link from "next/link";
import type { TaskIndexItem } from "@/lib/task-index";
import { taskHandle, taskTitle } from "@/lib/task-display";
import { MaturityBadge } from "@/components/maturity-badge";
import { IconPlay } from "@/components/icons";
import { taskDetailHref } from "@/lib/routes";
import { rememberGalleryScroll } from "@/lib/gallery-state";
import { taskDomains, taskSummary } from "@/lib/task-catalog";
import { TaskFlowPlaceholder } from "@/components/task-flow-placeholder";

export function TaskRow({ task, returnHref = "/tasks/" }: { task: TaskIndexItem; returnHref?: string }) {
  const preview = task.web_variant;
  const detailHref = `${taskDetailHref(task.repo)}?${new URLSearchParams({ returnTo: returnHref })}`;
  const tags = [...taskDomains(task), ...(task.tags?.language ?? [])].slice(0, 3);
  const rememberPosition = () => rememberGalleryScroll(returnHref);

  return (
    <article className="tb-content-card p-4 sm:p-5">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <code className="font-mono text-[11px]">{taskHandle(task)}</code>
            {task.maturity ? <MaturityBadge maturity={task.maturity} /> : null}
          </div>
          <h2 className="font-heading text-2xl font-bold leading-tight text-[#25314d]">
            <Link className="tb-focus-ring rounded-lg hover:text-[#1b6f86]" href={detailHref} onClick={rememberPosition}>
              {taskTitle(task)}
            </Link>
          </h2>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-700">
            {taskSummary(task)}
          </p>
          {tags.length ? <p className="mt-2 text-xs leading-5 text-slate-500">{tags.join(" · ")}</p> : null}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {preview ? (
              <a className="tb-focus-ring tb-button-primary !px-4 !py-2.5 !text-sm" href={preview.run_url} target="_blank" rel="noreferrer">
                <IconPlay className="size-4" /> Run Preview
              </a>
            ) : null}
            <Link className="tb-focus-ring tb-button-secondary !px-4 !py-2.5 !text-sm" href={detailHref} onClick={rememberPosition}>
              View details
            </Link>
            {!preview ? <span className="text-xs text-slate-500">No web preview yet</span> : null}
          </div>
        </div>
        {task.task_flow?.thumb ? (
          <TaskFlowPlaceholder task={task} compact className="w-full shrink-0 sm:w-60 xl:w-72" />
        ) : null}
      </div>
    </article>
  );
}
