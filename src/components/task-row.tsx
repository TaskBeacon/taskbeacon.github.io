"use client";

import Link from "next/link";
import type { TaskIndexItem, TaskTagFacet } from "@/lib/task-index";
import { taskLinks } from "@/lib/task-index";
import { formatShortDate } from "@/lib/format";
import { TagChip } from "@/components/tag-chip";
import { MaturityBadge } from "@/components/maturity-badge";
import { CopyButton } from "@/components/copy-button";
import { IconArrowRight, IconDownload, IconGithub } from "@/components/icons";

export function TaskRow({
  task,
  onTagClick
}: {
  task: TaskIndexItem;
  onTagClick?: (facet: TaskTagFacet, value: string) => void;
}) {
  const links = taskLinks(task);
  const cloneCmd = `git clone ${task.html_url}.git`;

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm transition-colors hover:border-brand-200 hover:bg-white">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              className="tb-focus-ring rounded-md font-heading text-base font-semibold tracking-tight text-slate-900 hover:text-brand-900"
              href={`/tasks/${encodeURIComponent(task.repo)}`}
            >
              {task.repo}
            </Link>
            <IconArrowRight className="size-4 text-slate-400 transition-colors group-hover:text-brand-700" />
            {task.maturity ? <MaturityBadge maturity={task.maturity} /> : null}
          </div>

          <div className="mt-2 text-sm leading-6 text-slate-700">
            {task.short_description || "No description provided."}
          </div>

          {(task.tags?.paradigm ?? []).length > 0 ? (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Paradigm
              </div>
              <div className="flex flex-wrap gap-2">
                {(task.tags?.paradigm ?? []).map((v) => (
                  <TagChip
                    key={`paradigm:${v}`}
                    label={v}
                    title={`Filter by paradigm: ${v}`}
                    onClick={onTagClick ? () => onTagClick("paradigm", v) : undefined}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="shrink-0 text-right">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Updated
          </div>
          <div className="mt-1 text-sm font-semibold text-slate-800">
            {formatShortDate(task.last_updated)}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <a
          className="tb-focus-ring inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:border-brand-200 hover:bg-brand-50"
          href={links.repo}
          target="_blank"
          rel="noreferrer"
        >
          <IconGithub className="size-4" />
          Repo
        </a>
        <a
          className="tb-focus-ring inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:border-brand-200 hover:bg-brand-50"
          href={links.downloadZip}
          target="_blank"
          rel="noreferrer"
        >
          <IconDownload className="size-4" />
          Download
        </a>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
        <code className="overflow-x-auto text-xs font-semibold text-slate-800">
          {cloneCmd}
        </code>
        <CopyButton text={cloneCmd} label="Copy clone" />
      </div>
    </div>
  );
}
