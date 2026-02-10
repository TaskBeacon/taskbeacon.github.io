"use client";

import Link from "next/link";
import type { TaskIndexItem, TaskTagFacet } from "@/lib/task-index";
import { taskLinks } from "@/lib/task-index";
import { formatShortDate } from "@/lib/format";
import { TagChip } from "@/components/tag-chip";
import { MaturityBadge } from "@/components/maturity-badge";
import { IconArrowRight, IconDownload, IconGithub, IconPlay } from "@/components/icons";

function TagRow({
  label,
  facet,
  values,
  onTagClick
}: {
  label: string;
  facet: TaskTagFacet;
  values: string[];
  onTagClick?: (facet: TaskTagFacet, value: string) => void;
}) {
  if (!values || values.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {values.map((v) => (
          <TagChip
            key={`${facet}:${v}`}
            label={v}
            title={`Filter by ${facet}: ${v}`}
            onClick={onTagClick ? () => onTagClick(facet, v) : undefined}
          />
        ))}
      </div>
    </div>
  );
}

export function TaskCard({
  task,
  onTagClick
}: {
  task: TaskIndexItem;
  onTagClick?: (facet: TaskTagFacet, value: string) => void;
}) {
  const links = taskLinks(task);

  return (
    <div className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm transition-colors hover:border-brand-200 hover:bg-white">
      <div className="flex items-start justify-between gap-4">
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

      <div className="mt-4 flex flex-col gap-3">
        <TagRow label="Paradigm" facet="paradigm" values={task.tags?.paradigm ?? []} onTagClick={onTagClick} />
        <TagRow label="Response" facet="response" values={task.tags?.response ?? []} onTagClick={onTagClick} />
        <TagRow label="Modality" facet="modality" values={task.tags?.modality ?? []} onTagClick={onTagClick} />
        <TagRow label="Language" facet="language" values={task.tags?.language ?? []} onTagClick={onTagClick} />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
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
          href={links.run}
          target="_blank"
          rel="noreferrer"
        >
          <IconPlay className="size-4" />
          Run
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

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          Clone
        </div>
        <pre className="mt-2 overflow-x-auto text-xs text-slate-800">
          <code>{`git clone ${task.html_url}.git`}</code>
        </pre>
      </div>
    </div>
  );
}
