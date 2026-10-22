"use client";

import Link from "next/link";
import type { TaskIndexItem } from "@/lib/task-index";
import { taskHandle, taskTitle } from "@/lib/task-display";
import { MaturityBadge } from "@/components/maturity-badge";
import { IconPlay } from "@/components/icons";
import { taskDetailHref } from "@/lib/routes";
import { rememberGalleryScroll } from "@/lib/gallery-state";
import { taskDomains, taskSummary } from "@/lib/task-catalog";

export function TaskRow({ task, returnHref = "/tasks/" }: { task: TaskIndexItem; returnHref?: string }) {
  const preview = task.web_variant;
  const detailHref = `${taskDetailHref(task.repo)}?${new URLSearchParams({ returnTo: returnHref })}`;
  const tags = [...taskDomains(task), ...(task.tags?.language ?? [])].slice(0, 3);
  const rememberPosition = () => rememberGalleryScroll(returnHref);

  return (
    <article className="tb-content-card p-4 sm:p-5">
      <div className="flex items-start gap-5">
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
        </div>
        {task.task_flow?.thumb ? (
          <Link href={detailHref} onClick={rememberPosition}
            className="tb-focus-ring hidden w-36 shrink-0 overflow-hidden rounded-[16px] border-2 border-[#25314d]/25 bg-white sm:block xl:w-44"
            aria-label={`View ${taskTitle(task)} flow and details`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={task.task_flow.thumb} alt="" loading="lazy" decoding="async" className="aspect-[16/10] w-full object-contain p-2" />
          </Link>
        ) : null}
      </div>
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
    </article>
  );
}
