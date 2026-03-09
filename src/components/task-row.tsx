"use client";

import type { TaskIndexItem } from "@/lib/task-index";
import { formatShortDate } from "@/lib/format";
import { taskHandle, taskTitle } from "@/lib/task-display";
import { MaturityBadge } from "@/components/maturity-badge";
import { IconDownload, IconGithub, IconPlay } from "@/components/icons";
import clsx from "@/components/utils/clsx";

const ACTION_ICONS = {
  download: IconDownload,
  github: IconGithub,
  play: IconPlay
} as const;

function ActionLink({
  href,
  label,
  icon,
  tone = "local",
  className
}: {
  href: string;
  label: string;
  icon: keyof typeof ACTION_ICONS;
  tone?: "local" | "preview" | "preview-primary";
  className?: string;
}) {
  const Icon = ACTION_ICONS[icon];

  return (
    <a
      className={clsx(
        "tb-focus-ring",
        tone === "preview-primary"
          ? "tb-button-primary"
          : tone === "preview"
            ? "tb-button-ghost bg-[#ffe9de]"
            : "tb-button-secondary bg-[#d7ebf6]",
        className
      )}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <Icon className="size-4" />
      {label}
    </a>
  );
}

export function TaskRow({
  task,
  onOpen
}: {
  task: TaskIndexItem;
  onOpen: (task: TaskIndexItem) => void;
}) {
  const preview = task.web_variant;

  return (
    <article className="tb-frame bg-[#fffdf9] p-4 sm:p-5">
      <div className="min-w-0">
        <h2 className="min-w-0 font-heading text-[2rem] font-bold leading-[0.95] text-[#25314d] sm:text-[2.35rem]">
          {taskTitle(task)}
        </h2>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-600">
          <code className="rounded-full border-2 border-[#25314d] bg-white px-2.5 py-1 font-mono text-[11px] font-semibold text-[#25314d]">
            {taskHandle(task)}
          </code>
          {task.maturity ? <MaturityBadge maturity={task.maturity} /> : null}
          {preview ? (
            <span className="rounded-full bg-[#ecffe5] px-3 py-1 text-[11px] font-bold text-[#25314d]">
              Preview ready
            </span>
          ) : null}
          <span className="rounded-full bg-[#e2f3fb] px-4 py-2 text-[11px] font-bold text-[#25314d]">
            {formatShortDate(task.last_updated)}
          </span>
        </div>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-start">
        <p className="max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
          {task.short_description || "No description provided."}
        </p>

        <div className="flex flex-wrap gap-2 xl:flex-col xl:items-end">
          <button
            type="button"
            className="tb-focus-ring tb-button-primary min-w-[190px] whitespace-nowrap"
            onClick={() => onOpen(task)}
          >
            Expand details
          </button>
          {preview ? (
            <ActionLink
              href={preview.run_url}
              label="Run Preview"
              icon="play"
              tone="preview-primary"
              className="min-w-[190px] whitespace-nowrap justify-center"
            />
          ) : null}
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 sm:min-w-[88px]">
            PsyFlow
          </div>
          <div className="flex flex-wrap gap-2">
            <ActionLink href={task.html_url} label="Task Repo" icon="github" tone="local" />
            <ActionLink
              href={`${task.html_url}/archive/refs/heads/${task.default_branch}.zip`}
              label="Download"
              icon="download"
              tone="local"
            />
          </div>
        </div>

        {preview ? (
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 sm:min-w-[88px]">
              Preview
            </div>
            <div className="flex flex-wrap gap-2">
              <ActionLink
                href={preview.html_url}
                label="Preview Repo"
                icon="github"
                tone="preview"
              />
              <ActionLink
                href={`${preview.html_url}/archive/refs/heads/${preview.default_branch}.zip`}
                label="Download"
                icon="download"
                tone="preview"
              />
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}
