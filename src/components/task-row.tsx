"use client";

import type { TaskIndexItem, TaskTagFacet } from "@/lib/task-index";
import { formatShortDate } from "@/lib/format";
import { localCloneCommand, taskHandle, taskTitle } from "@/lib/task-display";
import { TagChip } from "@/components/tag-chip";
import { MaturityBadge } from "@/components/maturity-badge";
import { TaskChannelCard } from "@/components/task-channel-card";

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
    <article className="rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-sm transition-all hover:border-brand-200 hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-heading text-xl font-semibold tracking-tight text-slate-900">
              {taskTitle(task)}
            </div>
            {task.maturity ? <MaturityBadge maturity={task.maturity} /> : null}
            {preview ? (
              <span className="rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-900">
                Preview ready
              </span>
            ) : null}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <code className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] text-slate-700">
              {taskHandle(task)}
            </code>
            <code className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] text-slate-700">
              {task.repo}
            </code>
            {(task.tags?.paradigm ?? []).map((value) => (
              <TagChip
                key={`${task.repo}:paradigm:${value}`}
                label={value}
                title={`Filter by paradigm: ${value}`}
                onClick={onTagClick ? () => onTagClick("paradigm", value) : undefined}
              />
            ))}
          </div>

          <div className="mt-3 max-w-3xl text-sm leading-6 text-slate-700">
            {task.short_description || "No description provided."}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-right">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Updated
          </div>
          <div className="mt-1 text-sm font-semibold text-slate-900">
            {formatShortDate(task.last_updated)}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 xl:grid-cols-2">
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
            },
            { type: "button", label: "Expand details", onClick: () => onOpen(task) }
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
        ) : (
          <section className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-4 shadow-sm">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Preview
            </div>
            <div className="mt-2 text-sm font-semibold text-slate-900">No browser preview yet</div>
            <div className="mt-2 text-sm leading-6 text-slate-700">
              The canonical local task is available now. Add an HTML companion later to surface a
              live preview here.
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
