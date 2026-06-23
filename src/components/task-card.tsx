"use client";

import Link from "next/link";
import type { TaskIndexItem, TaskTagFacet } from "@/lib/task-index";
import { formatShortDate } from "@/lib/format";
import { localCloneCommand, taskHandle, taskTitle } from "@/lib/task-display";
import { TagChip } from "@/components/tag-chip";
import { MaturityBadge } from "@/components/maturity-badge";
import { TaskChannelCard } from "@/components/task-channel-card";
import { TaskFlowPlaceholder } from "@/components/task-flow-placeholder";
import { taskDetailHref } from "@/lib/routes";

function allTags(task: TaskIndexItem) {
  return [
    ...(task.tags?.paradigm ?? []).map((value) => ({ facet: "paradigm" as const, value })),
    ...(task.tags?.response ?? []).map((value) => ({ facet: "response" as const, value })),
    ...(task.tags?.modality ?? []).map((value) => ({ facet: "modality" as const, value })),
    ...(task.tags?.language ?? []).map((value) => ({ facet: "language" as const, value }))
  ];
}

export function TaskCard({
  task,
  onTagClick,
  onOpen
}: {
  task: TaskIndexItem;
  onTagClick?: (facet: TaskTagFacet, value: string) => void;
  onOpen: (task: TaskIndexItem) => void;
}) {
  const preview = task.web_variant;
  const tags = allTags(task);

  return (
    <article className="tb-frame group relative overflow-hidden bg-[#fffdf9] p-6 transition-transform hover:-translate-y-0.5">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-[#d9edf6] via-transparent to-[#ecffe5] opacity-80" />

      <div className="relative">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              {preview ? "Task + browser preview" : "Task template"}
            </div>
            <Link
              className="tb-focus-ring mt-3 inline-block rounded-md font-heading text-2xl font-bold leading-tight text-[#25314d] hover:text-[#1b6f86]"
              href={taskDetailHref(task.repo)}
            >
              {taskTitle(task)}
            </Link>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <code className="rounded-full border border-slate-200 bg-white px-2.5 py-1 font-mono text-[11px] text-slate-700">
                {taskHandle(task)}
              </code>
              <code className="rounded-full border border-slate-200 bg-white px-2.5 py-1 font-mono text-[11px] text-slate-700">
                {task.repo}
              </code>
              {task.maturity ? <MaturityBadge maturity={task.maturity} /> : null}
            </div>
          </div>

          <div className="rounded-[18px] border-2 border-[#25314d] bg-white px-4 py-3 text-right shadow-[0_3px_0_#25314d]">
            <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
              Updated
            </div>
            <div className="mt-1 text-sm font-bold text-[#25314d]">
              {formatShortDate(task.last_updated)}
            </div>
          </div>
        </div>

        <p className="mt-5 text-sm leading-6 text-slate-700">
          {task.short_description || "No description provided."}
        </p>

        {tags.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map(({ facet, value }) => (
              <TagChip
                key={`${task.repo}:${facet}:${value}`}
                label={value}
                title={`Filter by ${facet}: ${value}`}
                onClick={onTagClick ? () => onTagClick(facet, value) : undefined}
              />
            ))}
          </div>
        ) : null}

        <div className="mt-6">
          <TaskFlowPlaceholder task={task} />
        </div>

        <div className="mt-6 grid gap-3">
          <TaskChannelCard
            eyebrow="Local / PsyFlow"
            handle={taskHandle(task)}
            repo={task.repo}
            releaseTag={task.release_tag}
            tone="local"
            size="compact"
            actions={[
              { type: "copy", label: "Copy Clone", text: localCloneCommand(task) },
              { label: "Open Repo", href: task.html_url, icon: "github" },
              {
                label: "Download",
                href: `${task.html_url}/archive/refs/heads/${task.default_branch}.zip`,
                icon: "download"
              }
            ]}
          />

          {preview ? (
            <TaskChannelCard
              eyebrow="Preview"
              handle={taskHandle(preview)}
              repo={preview.repo}
              releaseTag={preview.release_tag}
              tone="web"
              size="compact"
              actions={[
                { label: "Run Preview", href: preview.run_url, icon: "play", emphasis: "primary" },
                { label: "Open Repo", href: preview.html_url, icon: "github" }
              ]}
            />
          ) : null}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            className="tb-focus-ring tb-button-primary"
            onClick={() => onOpen(task)}
          >
            Expand details
          </button>
          <Link
            className="tb-focus-ring tb-button-secondary"
            href={taskDetailHref(task.repo)}
          >
            Open full page
          </Link>
        </div>
      </div>
    </article>
  );
}
