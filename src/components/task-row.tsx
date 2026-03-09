"use client";

import type { TaskIndexItem, TaskTagFacet } from "@/lib/task-index";
import { formatShortDate } from "@/lib/format";
import { localCloneCommand, taskHandle, taskTitle } from "@/lib/task-display";
import { TagChip } from "@/components/tag-chip";
import { MaturityBadge } from "@/components/maturity-badge";
import { TaskChannelCard } from "@/components/task-channel-card";

function taskInitials(task: TaskIndexItem) {
  return taskTitle(task)
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
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
    <article className="tb-frame bg-[#fffdf9] p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 gap-4">
          <div className="grid size-14 shrink-0 place-items-center rounded-2xl border-2 border-[#25314d] bg-[#b9dceb]">
            <span className="font-heading text-lg font-bold text-[#25314d]">
              {taskInitials(task)}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <div className="font-heading text-2xl font-bold leading-tight text-[#25314d]">
                {taskTitle(task)}
              </div>
              {task.maturity ? <MaturityBadge maturity={task.maturity} /> : null}
              {preview ? (
                <span className="rounded-full bg-[#ecffe5] px-3 py-1 text-[11px] font-bold text-[#25314d]">
                  Preview ready
                </span>
              ) : null}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <code className="rounded-full border-2 border-[#25314d] bg-white px-2.5 py-1 font-mono text-[11px] font-semibold text-[#25314d]">
                {taskHandle(task)}
              </code>
              <code className="rounded-full border-2 border-[#25314d] bg-white px-2.5 py-1 font-mono text-[11px] font-semibold text-[#25314d]">
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

            <div className="mt-3 max-w-3xl text-sm leading-6 text-slate-700">
              {task.short_description || "No description provided."}
            </div>
          </div>
        </div>

        <div className="rounded-full bg-[#e2f3fb] px-4 py-2 text-sm font-bold text-[#25314d]">
          Updated {formatShortDate(task.last_updated)}
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <TaskChannelCard
          eyebrow="Local / PsyFlow"
          handle={taskHandle(task)}
          repo={task.repo}
          releaseTag={task.release_tag}
          tone="local"
          size="compact"
          actions={[
            { type: "button", label: "Expand details", emphasis: "primary", onClick: () => onOpen(task) },
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
        ) : (
          <section className="tb-frame-soft bg-[#fff8f0] p-4">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Preview
            </div>
            <div className="mt-2 font-heading text-xl font-bold text-[#25314d]">
              No browser preview yet
            </div>
            <div className="mt-2 text-sm leading-6 text-slate-700">
              The canonical local task is ready now. Attach an HTML companion later to surface a
              runnable preview here.
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
