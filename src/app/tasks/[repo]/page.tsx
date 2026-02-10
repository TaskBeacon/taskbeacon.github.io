import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CopyButton } from "@/components/copy-button";
import { MaturityBadge } from "@/components/maturity-badge";
import { Markdown } from "@/components/markdown";
import { formatShortDate } from "@/lib/format";
import { findTaskByRepo, getTasks, taskLinks } from "@/lib/task-index";

export const dynamicParams = false;

export function generateStaticParams() {
  return getTasks().map((t) => ({ repo: t.repo }));
}

export function generateMetadata({
  params
}: {
  params: { repo: string };
}): Metadata {
  const task = findTaskByRepo(params.repo);
  if (!task) return { title: "Task" };

  return {
    title: task.repo,
    description: task.short_description
  };
}

function safeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
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

  const mdPath = path.join(
    process.cwd(),
    "src",
    "data",
    "readmes",
    `${safeFilename(task.repo)}.md`
  );
  const markdown = fs.existsSync(mdPath)
    ? fs.readFileSync(mdPath, "utf8")
    : "";

  const quickStart = `git clone ${task.html_url}.git\ncd ${task.repo}\n# See README for Install/Run instructions`;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          className="tb-focus-ring rounded-md text-sm font-semibold text-brand-800 hover:underline"
          href="/"
        >
          Back to gallery
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
          <a
            className="tb-focus-ring rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-brand-200 hover:bg-brand-50"
            href={links.run}
            target="_blank"
            rel="noreferrer"
          >
            Run Section
          </a>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {task.repo}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
            {task.short_description}
          </p>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Quick Start
                </div>
                <div className="mt-1 text-sm text-slate-700">
                  Copy these commands, then follow the README.
                </div>
              </div>
              <CopyButton text={quickStart} />
            </div>
            <pre className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-slate-950 p-4 text-xs text-slate-50">
              <code>{quickStart}</code>
            </pre>
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="space-y-4">
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
                {(task.tags?.paradigm ?? []).map((t) => (
                  <Pill key={`paradigm:${t}`}>{t}</Pill>
                ))}
                {(task.tags?.response ?? []).map((t) => (
                  <Pill key={`response:${t}`}>{t}</Pill>
                ))}
                {(task.tags?.modality ?? []).map((t) => (
                  <Pill key={`modality:${t}`}>{t}</Pill>
                ))}
                {(task.tags?.language ?? []).map((t) => (
                  <Pill key={`language:${t}`}>{t}</Pill>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-brand-50 p-5 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-700">
                Download
              </div>
              <div className="mt-3 text-sm text-slate-800">Prefer a zip archive?</div>
              <a
                className="tb-focus-ring mt-4 inline-flex w-full items-center justify-center rounded-xl bg-cta-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cta-600"
                href={links.downloadZip}
                target="_blank"
                rel="noreferrer"
              >
                Download ZIP
              </a>
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


