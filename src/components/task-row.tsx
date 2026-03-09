"use client";

import type { TaskIndexItem, TaskTagFacet } from "@/lib/task-index";
import { formatShortDate } from "@/lib/format";
import { localCloneCommand, taskHandle, taskTitle } from "@/lib/task-display";
import { TagChip } from "@/components/tag-chip";
import { MaturityBadge } from "@/components/maturity-badge";
import { CopyButton } from "@/components/copy-button";
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
  tone
}: {
  href: string;
  label: string;
  icon: keyof typeof ACTION_ICONS;
  tone: "local" | "preview" | "preview-primary";
}) {
  const Icon = ACTION_ICONS[icon];

  return (
    <a
      className={clsx(
        "tb-focus-ring",
        tone === "preview-primary"
          ? "tb-button-primary"
          : tone === "preview"
            ? "tb-button-ghost bg-[#ffe2d8]"
            : "tb-button-secondary bg-[#b9dceb]"
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
  onTagClick,
  onOpen
}: {
  task: TaskIndexItem;
  onTagClick?: (facet: TaskTagFacet, value: string) => void;
  onOpen: (task: TaskIndexItem) => void;
}) {
  const preview = task.web_variant;

  return (
    <article className="tb-frame bg-[#fffdf9] p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <div className="min-w-0 font-heading text-[2rem] font-bold leading-[0.95] text-[#25314d] sm:text-[2.35rem]">
              {taskTitle(task)}
            </div>
            {task.maturity ? <MaturityBadge maturity={task.maturity} /> : null}
            {preview ? (
              <span className="rounded-full bg-[#ecffe5] px-3 py-1 text-[11px] font-bold text-[#25314d]">
                Preview ready
              </span>
            ) : null}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <code className="rounded-full border-2 border-[#25314d] bg-white px-2.5 py-1 font-mono text-[11px] font-semibold text-[#25314d]">
              {taskHandle(task)}
            </code>
            <code className="break-all rounded-full border-2 border-[#25314d] bg-white px-2.5 py-1 font-mono text-[11px] font-semibold text-[#25314d]">
              {task.repo}
            </code>
            {(task.tags?.paradigm ?? []).map((value) => (
              <TagChip
                key={`${task.repo}:paradigm:${value}`}
                label={value}
                title={`Filter by task type: ${value}`}
                onClick={onTagClick ? () => onTagClick("paradigm", value) : undefined}
              />
            ))}
          </div>
        </div>

        <div className="self-start rounded-full bg-[#e2f3fb] px-4 py-2 text-sm font-bold text-[#25314d]">
          Updated {formatShortDate(task.last_updated)}
        </div>
      </div>

      <div className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
        {task.short_description || "No description provided."}
      </div>

      <section className="mt-6 tb-frame-soft bg-[#fffdf9] p-4 sm:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Task Information
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
              <code className="rounded-full border-2 border-[#25314d] bg-white px-2.5 py-1 font-mono text-[11px] font-semibold text-[#25314d]">
                Local {taskHandle(task)}
              </code>
              {preview?.id ? (
                <code className="rounded-full border-2 border-[#25314d] bg-[#fff8f0] px-2.5 py-1 font-mono text-[11px] font-semibold text-[#25314d]">
                  Preview {preview.id}
                </code>
              ) : null}
              {task.release_tag ? (
                <span className="rounded-full bg-[#ecffe5] px-3 py-1 text-[11px] font-bold text-[#25314d]">
                  Release {task.release_tag}
                </span>
              ) : null}
            </div>
          </div>

          <button
            type="button"
            className="tb-focus-ring tb-button-primary w-full md:w-auto"
            onClick={() => onOpen(task)}
          >
            Expand details
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div className="rounded-[20px] border-2 border-[#25314d] bg-[#eef8ff] p-4 shadow-[0_4px_0_#25314d]">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Local / PsyFlow
            </div>
            <div className="mt-2 text-sm leading-6 text-slate-700">
              Canonical repository for local execution, review, and extension.
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <CopyButton
                text={localCloneCommand(task)}
                label="Copy Clone"
                className="bg-[#b9dceb] text-[#25314d]"
              />
              <ActionLink href={task.html_url} label="Open Repo" icon="github" tone="local" />
              <ActionLink
                href={`${task.html_url}/archive/refs/heads/${task.default_branch}.zip`}
                label="Download"
                icon="download"
                tone="local"
              />
            </div>
          </div>

          {preview ? (
            <div className="rounded-[20px] border-2 border-[#25314d] bg-[#fff3ec] p-4 shadow-[0_4px_0_#25314d]">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Preview
              </div>
              <div className="mt-2 text-sm leading-6 text-slate-700">
                Browser walkthrough for quick validation of task flow and participant-facing screens.
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <ActionLink
                  href={preview.run_url}
                  label="Run Preview"
                  icon="play"
                  tone="preview-primary"
                />
                <ActionLink
                  href={preview.html_url}
                  label="Preview Repo"
                  icon="github"
                  tone="preview"
                />
              </div>
            </div>
          ) : (
            <div className="rounded-[20px] border-2 border-[#25314d] bg-[#fff8f0] p-4 shadow-[0_4px_0_#25314d]">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Preview
              </div>
              <div className="mt-2 text-sm leading-6 text-slate-700">
                No browser preview is attached yet. The local repository remains the canonical source
                for installation and review.
              </div>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
