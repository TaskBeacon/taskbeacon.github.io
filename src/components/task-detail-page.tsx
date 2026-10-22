"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { galleryReturnHref, subscribeGalleryLocation } from "@/lib/gallery-state";
import { CopyButton } from "@/components/copy-button";
import { MaturityBadge } from "@/components/maturity-badge";
import { Markdown } from "@/components/markdown";
import { TaskFlowPlaceholder } from "@/components/task-flow-placeholder";
import { formatShortDate } from "@/lib/format";
import { localCloneCommand, taskHandle, taskTitle } from "@/lib/task-display";
import { taskDomains, taskSummary, maturityDescription } from "@/lib/task-catalog";
import { documentationHeadings } from "@/lib/documentation-headings";
import type { TaskIndexItem } from "@/lib/task-index";
import { taskLinks } from "@/lib/task-index";
import { tasksPageHref } from "@/lib/routes";
import { useTaskWithHtmlCompanion } from "@/lib/use-html-companions";

export function TaskDetailPage({ task, markdown }: { task: TaskIndexItem; markdown: string }) {
  const mergedTask = useTaskWithHtmlCompanion(task);
  const returnHref = useSyncExternalStore(subscribeGalleryLocation, () => galleryReturnHref(window.location.search), tasksPageHref);
  const links = taskLinks(mergedTask);
  const preview = mergedTask.web_variant;
  const contents = documentationHeadings(markdown);
  const language = mergedTask.tags.language.join(", ") || "See task guide";
  const response = mergedTask.tags.response.join(", ") || "See procedure and configuration";
  const quickStart = `${localCloneCommand(mergedTask)}\ncd ${mergedTask.repo}`;
  return (
    <div className="space-y-8 pt-4">
      <Link className="tb-focus-ring inline-block rounded-lg text-sm font-bold text-[#25314d] underline underline-offset-4" href={returnHref} scroll={false}>← Back to tasks</Link>
      <section>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500"><code>{taskHandle(mergedTask)}</code><span>{taskDomains(mergedTask).join(" · ")}</span></div>
        <h1 className="mt-3 max-w-4xl font-heading text-4xl font-bold leading-tight text-[#25314d] sm:text-5xl">{taskTitle(mergedTask)}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">{taskSummary(mergedTask)}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {preview ? <a className="tb-focus-ring tb-button-primary" href={preview.run_url} target="_blank" rel="noreferrer">Run Preview ↗</a> : null}
          <a className="tb-focus-ring tb-button-secondary" href="#run-locally">Run locally</a>
          <a className="tb-focus-ring self-center rounded-lg px-2 py-3 text-sm font-bold underline underline-offset-4" href={links.repo} target="_blank" rel="noreferrer">Source on GitHub ↗</a>
        </div>
      </section>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-8">
          <section className="tb-content-card p-5 sm:p-6" aria-label="Task essentials">
            <h2 className="font-heading text-2xl font-bold">Before you start</h2>
            <dl className="mt-5 grid gap-5 sm:grid-cols-2">
              {[['Task language', language], ['Responses', response], ['Acquisition', mergedTask.acquisition || mergedTask.tags.modality.join(', ') || 'See task guide'], ['Version', mergedTask.release_tag || 'See repository']].map(([label,value]) => (
                <div key={label}><dt className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</dt><dd className="mt-1 text-sm leading-6 text-slate-700">{value}</dd></div>
              ))}
            </dl>
            {mergedTask.maturity ? <div className="mt-5 border-t border-[#25314d]/15 pt-4"><MaturityBadge maturity={mergedTask.maturity} /><p className="mt-2 text-sm leading-6 text-slate-600">{maturityDescription(mergedTask.maturity)}</p></div> : null}
            {preview ? <p className="mt-4 text-sm leading-6 text-slate-600">Use the browser preview to explore the procedure. Review the local setup and task documentation before collecting research data.</p> : null}
          </section>
          <section id="task-flow">
            <h2 className="mb-4 font-heading text-2xl font-bold">Task flow</h2>
            <TaskFlowPlaceholder task={mergedTask} />
          </section>
          <section id="run-locally" className="tb-content-card p-5 sm:p-6">
            <h2 className="font-heading text-2xl font-bold">Run locally</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Get the task package, then follow its installation and run instructions in the guide below.</p>
            <pre className="mt-4 overflow-auto rounded-[16px] bg-[#172033] p-4 text-xs leading-6 text-slate-50"><code>{quickStart}</code></pre>
            <div className="mt-4 flex flex-wrap items-center gap-4"><CopyButton text={quickStart} label="Copy commands" /><a className="tb-focus-ring rounded-lg text-sm font-bold underline underline-offset-4" href={links.downloadZip}>Download task ZIP</a><Link className="tb-focus-ring rounded-lg text-sm underline underline-offset-4" href="/tutorial/getting-started/">Setup tutorial</Link></div>
            {preview ? <details className="mt-5 border-t border-[#25314d]/15 pt-4 text-sm"><summary className="tb-focus-ring cursor-pointer rounded-lg font-bold">Browser preview source</summary><p className="mt-2 leading-6 text-slate-600">Use this separate browser implementation when adapting the preview.</p><div className="mt-3 flex flex-wrap gap-4"><a className="tb-focus-ring rounded underline" href={preview.html_url} target="_blank" rel="noreferrer">Preview repository ↗</a><a className="tb-focus-ring rounded underline" href={`${preview.html_url}/archive/refs/heads/${preview.default_branch}.zip`}>Download preview ZIP</a></div></details> : null}
          </section>
          <section id="task-guide" className="tb-content-card p-5 sm:p-8">
            <h2 className="font-heading text-2xl font-bold">Task guide</h2>
            <p className="mt-2 text-xs text-slate-500">Repository updated {formatShortDate(mergedTask.last_updated)} · Maintainer documentation</p>
            {markdown ? <div className="mt-6"><Markdown markdown={markdown} repoFullName={mergedTask.full_name} defaultBranch={mergedTask.default_branch} htmlUrl={mergedTask.html_url} /></div> : <p className="mt-4 text-sm">The guide is unavailable here. <a className="underline" href={links.repo}>Read it on GitHub.</a></p>}
          </section>
        </div>
        <aside className="order-first lg:order-last">
          <nav aria-label="On this page" className="tb-content-card p-5 lg:sticky lg:top-32">
            <h2 className="text-sm font-bold">On this page</h2>
            <div className="mt-3 flex flex-wrap gap-3 text-sm lg:flex-col">
              <a className="tb-focus-ring rounded hover:underline" href="#task-flow">Task flow</a>
              <a className="tb-focus-ring rounded hover:underline" href="#run-locally">Run locally</a>
              <a className="tb-focus-ring rounded hover:underline" href="#task-guide">Task guide</a>
            </div>
            {contents.length > 0 ? <details className="mt-4 text-sm"><summary className="tb-focus-ring cursor-pointer rounded text-slate-500">Guide sections</summary><ul className="mt-3 max-h-64 space-y-3 overflow-auto pr-2">{contents.map((heading) => <li key={heading.id}><a className="tb-focus-ring rounded text-slate-600 hover:text-[#25314d] hover:underline" href={`#${heading.id}`}>{heading.title}</a></li>)}</ul></details> : null}
          </nav>
        </aside>
      </div>
    </div>
  );
}
