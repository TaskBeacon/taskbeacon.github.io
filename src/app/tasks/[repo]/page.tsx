import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CopyButton } from "@/components/copy-button";
import { MaturityBadge } from "@/components/maturity-badge";
import { Markdown } from "@/components/markdown";
import { TaskAccessPanel } from "@/components/task-access-panel";
import { formatShortDate } from "@/lib/format";
import { compactMeta, localCloneCommand, taskHandle, taskTitle } from "@/lib/task-display";
import { findTaskByRepo, getTasks, taskLinks } from "@/lib/task-index";

export const dynamicParams = false;

export function generateStaticParams() {
  return getTasks().map((task) => ({ repo: task.repo }));
}

export function generateMetadata({
  params
}: {
  params: { repo: string };
}): Metadata {
  const task = findTaskByRepo(params.repo);
  if (!task) return { title: "Task" };

  return {
    title: taskTitle(task),
    description: task.short_description
  };
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-800">
      {children}
    </span>
  );
}

export default function TaskPage({ params }: { params: { repo: string } }) {
  const task = findTaskByRepo(params.repo);
  if (!task) notFound();

  const links = taskLinks(task);
  const preview = task.web_variant;
  const readmePath = path.join(
    process.cwd(),
    "public",
    ...task.readme_snapshot_path.replace(/^\/+/, "").split("/")
  );
  const markdown = fs.existsSync(readmePath) ? fs.readFileSync(readmePath, "utf8") : "";

  const quickStart = `git clone ${task.html_url}.git\ncd ${task.repo}\n# Follow the README for local setup and run steps`;
  const localMeta = compactMeta([
    taskHandle(task),
    task.acquisition,
    task.release_tag ? `Release ${task.release_tag}` : null
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
          className="tb-focus-ring rounded-md text-sm font-semibold text-brand-800 hover:underline"
          href="/#explorer"
        >
          Back to explorer
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <a
            className="tb-focus-ring rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-brand-200 hover:bg-brand-50"
            href={links.repo}
            target="_blank"
            rel="noreferrer"
          >
            GitHub Repo
          </a>
          {preview ? (
            <a
              className="tb-focus-ring rounded-lg bg-cta-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cta-600"
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
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {taskTitle(task)}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <code className="rounded-full border border-slate-200 bg-white px-2.5 py-1 font-mono text-[11px] text-slate-700">
              {taskHandle(task)}
            </code>
            <code className="rounded-full border border-slate-200 bg-white px-2.5 py-1 font-mono text-[11px] text-slate-700">
              {task.repo}
            </code>
            {task.maturity ? <MaturityBadge maturity={task.maturity} /> : null}
            {preview ? (
              <span className="rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-900">
                Web preview available
              </span>
            ) : null}
          </div>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
            {task.short_description}
          </p>

          {preview ? (
            <section className="mt-6 rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-cyan-50 p-5 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                Preview path
              </div>
              <div className="mt-2 max-w-3xl text-sm leading-6 text-slate-700">
                This task ships with a matched HTML companion so the browser preview can stay aligned to the canonical local repository.
              </div>
            </section>
          ) : null}

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                Quick start
              </div>
              <div className="mt-1 text-sm text-slate-700">
                Clone locally, then follow the README for install and run instructions.
              </div>
            </div>
            <pre className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-slate-950 p-4 text-xs text-slate-50">
              <code>{quickStart}</code>
            </pre>
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="space-y-4">
            <TaskAccessPanel
              eyebrow="Local / PsyFlow"
              title={taskTitle(task)}
              repo={task.repo}
              description="Canonical repository for local execution, source review, and task modification."
              meta={localMeta || "PsyFlow / TAPS"}
              tone="local"
              actions={[
                { label: "Open Repo", href: links.repo, icon: "github", emphasis: "secondary" },
                { label: "Download", href: links.downloadZip, icon: "download", emphasis: "secondary" }
              ]}
              extraActions={<CopyButton text={localCloneCommand(task)} label="Copy Clone" />}
            />

            {preview ? (
              <TaskAccessPanel
                eyebrow="Preview"
                title={preview.title || taskTitle(task)}
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

            <section className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                Metadata
              </div>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-slate-600">Last updated</div>
                  <div className="font-semibold text-slate-900">
                    {formatShortDate(task.last_updated)}
                  </div>
                </div>

                {task.maturity ? (
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-slate-600">Maturity</div>
                    <MaturityBadge maturity={task.maturity} className="shrink-0" />
                  </div>
                ) : null}

                {task.release_tag ? (
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-slate-600">Release</div>
                    <div className="font-mono text-xs font-semibold text-slate-900">
                      {task.release_tag}
                    </div>
                  </div>
                ) : null}

                {task.acquisition ? (
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-slate-600">Acquisition</div>
                    <div className="font-semibold text-slate-900">{task.acquisition}</div>
                  </div>
                ) : null}

                {task.psyflow_version ? (
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-slate-600">PsyFlow</div>
                    <div className="font-mono text-xs font-semibold text-slate-900">
                      {task.psyflow_version}
                    </div>
                  </div>
                ) : null}

                {typeof task.has_voiceover === "boolean" ? (
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-slate-600">Voiceover</div>
                    <div className="font-semibold text-slate-900">
                      {task.has_voiceover ? "Yes" : "No"}
                    </div>
                  </div>
                ) : null}

                {task.structure ? (
                  <div className="mt-3">
                    <div className="text-slate-600">Structure</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {task.structure.config ? <Pill>config/</Pill> : null}
                      {task.structure.assets ? <Pill>assets/</Pill> : null}
                      {task.structure.src ? <Pill>src/</Pill> : null}
                    </div>
                  </div>
                ) : null}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                Tags
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {(task.tags?.paradigm ?? []).map((value) => (
                  <Pill key={`paradigm:${value}`}>{value}</Pill>
                ))}
                {(task.tags?.response ?? []).map((value) => (
                  <Pill key={`response:${value}`}>{value}</Pill>
                ))}
                {(task.tags?.modality ?? []).map((value) => (
                  <Pill key={`modality:${value}`}>{value}</Pill>
                ))}
                {(task.tags?.language ?? []).map((value) => (
                  <Pill key={`language:${value}`}>{value}</Pill>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-brand-50 p-5 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-700">
                Access notes
              </div>
              <div className="mt-3 text-sm leading-6 text-slate-800">
                Local repositories remain canonical for installation and editing. Preview companions are attached automatically when the indexer finds a matching HTML variant with the same task slug.
              </div>
            </section>
          </div>
        </aside>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white/85 p-8 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-heading text-xl font-semibold tracking-tight text-slate-900">
            README
          </h2>
          <a
            className="tb-focus-ring rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-brand-200 hover:bg-brand-50"
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
              repoFullName={task.full_name}
              defaultBranch={task.default_branch}
              htmlUrl={task.html_url}
            />
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
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
