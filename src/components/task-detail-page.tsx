"use client";

import Link from "next/link";

import { CopyButton } from "@/components/copy-button";
import { MaturityBadge } from "@/components/maturity-badge";
import { Markdown } from "@/components/markdown";
import { TaskAccessPanel } from "@/components/task-access-panel";
import { TaskFlowPlaceholder } from "@/components/task-flow-placeholder";
import { formatShortDate } from "@/lib/format";
import { compactMeta, localCloneCommand, taskHandle, taskTitle } from "@/lib/task-display";
import type { TaskIndexItem } from "@/lib/task-index";
import { taskLinks } from "@/lib/task-index";
import { tasksPageHref } from "@/lib/routes";
import { useTaskWithHtmlCompanion } from "@/lib/use-html-companions";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border-2 border-[#25314d] bg-white px-3 py-1 text-xs font-bold text-[#25314d]">
      {children}
    </span>
  );
}

export function TaskDetailPage({
  task,
  markdown
}: {
  task: TaskIndexItem;
  markdown: string;
}) {
  const mergedTask = useTaskWithHtmlCompanion(task);
  const links = taskLinks(mergedTask);
  const preview = mergedTask.web_variant;
  const quickStart = `git clone ${mergedTask.html_url}.git\ncd ${mergedTask.repo}\n# Follow the README for local setup and run steps`;
  const localMeta = compactMeta([
    taskHandle(mergedTask),
    mergedTask.acquisition,
    mergedTask.release_tag ? `Release ${mergedTask.release_tag}` : null
  ]);
  const previewMeta = preview
    ? compactMeta([
        taskHandle(preview),
        preview.acquisition,
        preview.release_tag ? `Release ${preview.release_tag}` : null
      ])
    : null;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          className="tb-focus-ring rounded-full border-2 border-[#25314d] bg-white px-4 py-2 text-sm font-bold text-[#25314d] shadow-[0_3px_0_#25314d] hover:bg-[#eef8ff]"
          href={tasksPageHref()}
        >
          Back to tasks
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <a
            className="tb-focus-ring rounded-[14px] border-2 border-[#25314d] bg-white px-3 py-2 text-sm font-bold text-[#25314d] hover:bg-[#eef8ff]"
            href={links.repo}
            target="_blank"
            rel="noreferrer"
          >
            GitHub Repo
          </a>
          {preview ? (
            <a
              className="tb-focus-ring rounded-[14px] border-2 border-[#25314d] bg-[#39d95d] px-3 py-2 text-sm font-bold text-[#25314d] shadow-[0_3px_0_#25314d] hover:bg-[#2fb651] hover:text-white"
              href={preview.run_url}
              target="_blank"
              rel="noreferrer"
            >
              Run Preview
            </a>
          ) : null}
        </div>
      </div>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="tb-section-chip bg-[#f5c1b5]">Task dossier</div>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-[0.95] text-[#25314d] sm:text-5xl">
            {taskTitle(mergedTask)}
          </h1>
          <div className="tb-meta-rail mt-5">
            <code className="rounded-full border border-slate-200 bg-white px-2.5 py-1 font-mono text-[11px] text-slate-700">
              {taskHandle(mergedTask)}
            </code>
            <code className="rounded-full border-2 border-[#25314d] bg-white px-2.5 py-1 font-mono text-[11px] font-bold text-[#25314d]">
              {mergedTask.repo}
            </code>
            {mergedTask.maturity ? <MaturityBadge maturity={mergedTask.maturity} /> : null}
            {preview ? (
              <span className="rounded-full border-2 border-[#25314d] bg-[#ecffe5] px-3 py-1 text-[11px] font-bold text-[#25314d]">
                Web preview available
              </span>
            ) : null}
            <span className="rounded-full border-2 border-[#25314d] bg-white px-3 py-1 text-[11px] font-bold text-[#25314d]">
              Updated {formatShortDate(mergedTask.last_updated)}
            </span>
          </div>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
            {mergedTask.short_description}
          </p>

          <TaskFlowPlaceholder task={mergedTask} className="mt-6" />

          {preview ? (
            <section className="tb-surface mt-6 p-5">
              <div className="text-xs font-bold uppercase tracking-wide text-slate-600">
                Preview path
              </div>
              <div className="mt-2 max-w-3xl text-sm leading-6 text-slate-700">
                This task ships with a matched HTML companion so the browser preview can stay aligned to the canonical local repository.
              </div>
            </section>
          ) : null}

          <div className="tb-frame-soft mt-6 bg-[#fffdf9] p-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-wide text-slate-600">
                Quick start
              </div>
              <div className="mt-1 text-sm text-slate-700">
                Clone locally, then follow the README for install and run instructions.
              </div>
            </div>
            <pre className="mt-4 overflow-x-auto rounded-[18px] border-2 border-[#25314d] bg-[#172033] p-4 text-xs text-slate-50">
              <code>{quickStart}</code>
            </pre>
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="space-y-4">
            <TaskAccessPanel
              eyebrow="Local / PsyFlow"
              title={taskTitle(mergedTask)}
              repo={mergedTask.repo}
              description="Canonical repository for local execution, source review, and task modification."
              meta={localMeta || "PsyFlow / TAPS"}
              tone="local"
              actions={[
                { label: "Open Repo", href: links.repo, icon: "github", emphasis: "secondary" },
                { label: "Download", href: links.downloadZip, icon: "download", emphasis: "secondary" }
              ]}
              extraActions={<CopyButton text={localCloneCommand(mergedTask)} label="Copy Clone" />}
            />

            {preview ? (
              <TaskAccessPanel
                eyebrow="Preview"
                title={preview.title || taskTitle(mergedTask)}
                repo={preview.repo}
                description={
                  preview.short_description ||
                  "Browser companion for quick walkthroughs, README validation, and participant-facing previews."
                }
                meta={previewMeta}
                tone="web"
                actions={[
                  { label: "Run Preview", href: preview.run_url, icon: "play", emphasis: "primary" },
                  { label: "Open Repo", href: preview.html_url, icon: "github", emphasis: "secondary" }
                ]}
              />
            ) : null}

            <section className="tb-frame-soft bg-[#fffdf9] p-5">
              <div className="text-xs font-bold uppercase tracking-wide text-slate-600">
                Metadata
              </div>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-slate-600">Last updated</div>
                  <div className="font-bold text-[#25314d]">
                    {formatShortDate(mergedTask.last_updated)}
                  </div>
                </div>

                {mergedTask.maturity ? (
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-slate-600">Maturity</div>
                    <MaturityBadge maturity={mergedTask.maturity} className="shrink-0" />
                  </div>
                ) : null}

                {mergedTask.release_tag ? (
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-slate-600">Release</div>
                    <div className="font-mono text-xs font-bold text-[#25314d]">
                      {mergedTask.release_tag}
                    </div>
                  </div>
                ) : null}

                {mergedTask.acquisition ? (
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-slate-600">Acquisition</div>
                    <div className="font-bold text-[#25314d]">{mergedTask.acquisition}</div>
                  </div>
                ) : null}

                {mergedTask.psyflow_version ? (
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-slate-600">PsyFlow</div>
                    <div className="font-mono text-xs font-bold text-[#25314d]">
                      {mergedTask.psyflow_version}
                    </div>
                  </div>
                ) : null}

                {typeof mergedTask.has_voiceover === "boolean" ? (
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-slate-600">Voiceover</div>
                    <div className="font-bold text-[#25314d]">
                      {mergedTask.has_voiceover ? "Yes" : "No"}
                    </div>
                  </div>
                ) : null}

                {mergedTask.structure ? (
                  <div className="mt-3">
                    <div className="text-slate-600">Structure</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {mergedTask.structure.config ? <Pill>config/</Pill> : null}
                      {mergedTask.structure.assets ? <Pill>assets/</Pill> : null}
                      {mergedTask.structure.src ? <Pill>src/</Pill> : null}
                    </div>
                  </div>
                ) : null}
              </div>
            </section>

            <section className="tb-frame-soft bg-[#fffdf9] p-5">
              <div className="text-xs font-bold uppercase tracking-wide text-slate-600">
                Tags
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {(mergedTask.tags?.paradigm ?? []).map((value) => (
                  <Pill key={`paradigm:${value}`}>{value}</Pill>
                ))}
                {(mergedTask.tags?.response ?? []).map((value) => (
                  <Pill key={`response:${value}`}>{value}</Pill>
                ))}
                {(mergedTask.tags?.modality ?? []).map((value) => (
                  <Pill key={`modality:${value}`}>{value}</Pill>
                ))}
                {(mergedTask.tags?.language ?? []).map((value) => (
                  <Pill key={`language:${value}`}>{value}</Pill>
                ))}
              </div>
            </section>

            <section className="tb-surface bg-[#eef8ff] p-5">
              <div className="text-xs font-bold uppercase tracking-wide text-slate-700">
                Access notes
              </div>
              <div className="mt-3 text-sm leading-6 text-slate-800">
                Local repositories remain canonical for installation and editing. Preview companions are attached at runtime from the shared psyflow-web manifest when a matching HTML variant exists.
              </div>
            </section>
          </div>
        </aside>
      </section>

      <section className="tb-frame bg-[#fffdf9] p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-heading text-2xl font-bold text-[#25314d]">
            README
          </h2>
          <a
            className="tb-focus-ring rounded-[14px] border-2 border-[#25314d] bg-white px-3 py-2 text-sm font-bold text-[#25314d] hover:bg-[#eef8ff]"
            href={links.repo}
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub
          </a>
        </div>

        {markdown ? (
          <div className="mt-6">
            <Markdown
              markdown={markdown}
              repoFullName={mergedTask.full_name}
              defaultBranch={mergedTask.default_branch}
              htmlUrl={mergedTask.html_url}
            />
          </div>
        ) : (
          <div className="mt-6 rounded-[18px] border-2 border-[#25314d] bg-white p-5 text-sm text-slate-700">
            README content is not available in this build.
            <div className="mt-2">
              Open the repo directly:{" "}
              <a
                className="underline"
                href={links.repo}
                target="_blank"
                rel="noreferrer"
              >
                GitHub Repo
              </a>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
