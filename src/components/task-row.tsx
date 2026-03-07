"use client";

import Link from "next/link";
import type { TaskIndexItem, TaskTagFacet } from "@/lib/task-index";
import { taskLinks } from "@/lib/task-index";
import { formatShortDate } from "@/lib/format";
import { TagChip } from "@/components/tag-chip";
import { MaturityBadge } from "@/components/maturity-badge";
import { CopyButton } from "@/components/copy-button";
import { TaskAccessPanel } from "@/components/task-access-panel";

function taskTitle(task: TaskIndexItem) {
  return String(task.title ?? "").trim() || task.repo;
}

function localMeta(task: TaskIndexItem) {
  const parts = [];
  if (task.acquisition) parts.push(task.acquisition);
  if (task.release_tag) parts.push(`Release ${task.release_tag}`);
  return parts.join(" • ") || "PsyFlow/TAPS";
}

function webMeta(task: NonNullable<TaskIndexItem["web_variant"]>) {
  const parts = ["HTML preview"];
  if (task.acquisition) parts.push(task.acquisition);
  if (task.release_tag) parts.push(`Release ${task.release_tag}`);
  return parts.join(" • ");
}

export function TaskRow({
  task,
  onTagClick
}: {
  task: TaskIndexItem;
  onTagClick?: (facet: TaskTagFacet, value: string) => void;
}) {
  const links = taskLinks(task);
  const cloneCmd = `git clone ${task.html_url}.git`;
  const webVariant = task.web_variant;

  return (
    <article className="group rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm transition-all hover:border-brand-200 hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              className="tb-focus-ring rounded-md font-heading text-xl font-semibold tracking-tight text-slate-900 hover:text-brand-900"
              href={`/tasks/${encodeURIComponent(task.repo)}`}
            >
              {taskTitle(task)}
            </Link>
            {task.maturity ? <MaturityBadge maturity={task.maturity} /> : null}
            {webVariant ? (
              <span className="rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-900">
                Web preview
              </span>
            ) : null}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
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
        <TaskAccessPanel
          eyebrow="Local Task"
          title={taskTitle(task)}
          repo={task.repo}
          description="Canonical local repository for installation, review, and modification."
          meta={localMeta(task)}
          tone="local"
          actions={[
            { label: "Run Guide", href: links.run, icon: "play", emphasis: "secondary" },
            { label: "Repo", href: links.repo, icon: "github", emphasis: "secondary" },
            { label: "Download", href: links.downloadZip, icon: "download", emphasis: "secondary" }
          ]}
        />

        {webVariant ? (
          <TaskAccessPanel
            eyebrow="Web Preview"
            title={webVariant.title || taskTitle(task)}
            repo={webVariant.repo}
            description={
              webVariant.short_description ||
              "Matched browser companion for live walkthroughs and participant-facing previews."
            }
            meta={webMeta(webVariant)}
            tone="web"
            actions={[
              { label: "Run Preview", href: webVariant.run_url, icon: "play", emphasis: "primary" },
              { label: "Repo", href: webVariant.html_url, icon: "github", emphasis: "secondary" },
              { label: "Download", href: webVariant.download_zip, icon: "download", emphasis: "secondary" }
            ]}
          />
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
        <code className="overflow-x-auto text-xs font-semibold text-slate-800">
          {cloneCmd}
        </code>
        <CopyButton text={cloneCmd} label="Copy clone" />
      </div>
    </article>
  );
}
