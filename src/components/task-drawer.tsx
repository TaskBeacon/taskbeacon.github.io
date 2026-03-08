"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Markdown } from "@/components/markdown";
import { TaskChannelCard } from "@/components/task-channel-card";
import type { TaskIndexItem } from "@/lib/task-index";
import {
  localCloneCommand,
  taskHandle,
  taskTitle
} from "@/lib/task-display";

export function TaskDrawer({
  task,
  onClose
}: {
  task: TaskIndexItem | null;
  onClose: () => void;
}) {
  const [markdownByRepo, setMarkdownByRepo] = useState<Record<string, string>>({});
  const [errorByRepo, setErrorByRepo] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!task) return;

    const repo = task.repo;
    if (markdownByRepo[repo] !== undefined || errorByRepo[repo]) return;

    let cancelled = false;

    fetch(task.readme_snapshot_path)
      .then((response) => {
        if (!response.ok) throw new Error("README snapshot missing");
        return response.text();
      })
      .then((markdown) => {
        if (cancelled) return;
        setMarkdownByRepo((current) => ({ ...current, [repo]: markdown }));
      })
      .catch(() => {
        if (cancelled) return;
        setErrorByRepo((current) => ({ ...current, [repo]: true }));
      });

    return () => {
      cancelled = true;
    };
  }, [errorByRepo, markdownByRepo, task]);

  useEffect(() => {
    if (!task) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, task]);

  if (!task) return null;

  const markdown = markdownByRepo[task.repo];
  const hasError = Boolean(errorByRepo[task.repo]);
  const isLoading = markdown === undefined && !hasError;
  const preview = task.web_variant;

  return (
    <div className="fixed inset-0 z-[70] bg-slate-950/35 backdrop-blur-sm" onClick={onClose}>
      <div
        className="absolute inset-y-0 right-0 w-full max-w-3xl overflow-y-auto border-l border-slate-200 bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${taskTitle(task)} details`}
      >
        <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Task details
              </div>
              <div className="mt-2 font-heading text-2xl font-semibold tracking-tight text-slate-900">
                {taskTitle(task)}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                <code className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] text-slate-700">
                  {taskHandle(task)}
                </code>
                <code className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] text-slate-700">
                  {task.repo}
                </code>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                className="tb-focus-ring rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:border-brand-200 hover:bg-brand-50"
                href={`/tasks/${encodeURIComponent(task.repo)}`}
              >
                Open full page
              </Link>
              <button
                type="button"
                className="tb-focus-ring rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:border-brand-200 hover:bg-brand-50"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6 px-5 py-5">
          <div className="grid gap-3 lg:grid-cols-2">
            <TaskChannelCard
              eyebrow="Local / PsyFlow"
              handle={taskHandle(task)}
              repo={task.repo}
              releaseTag={task.release_tag}
              tone="local"
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
                actions={[
                  { label: "Run Preview", href: preview.run_url, icon: "play", emphasis: "primary" },
                  { label: "Open Repo", href: preview.html_url, icon: "github" }
                ]}
              />
            ) : null}
          </div>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  README snapshot
                </div>
                <div className="mt-1 text-sm text-slate-700">
                  The drawer loads the tracked markdown snapshot on demand, including any task-flow image referenced in the README.
                </div>
              </div>
              <a
                className="tb-focus-ring rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:border-brand-200 hover:bg-brand-50"
                href={task.html_url}
                target="_blank"
                rel="noreferrer"
              >
                View on GitHub
              </a>
            </div>

            {isLoading ? (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
                Loading README snapshot...
              </div>
            ) : hasError ? (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
                README content is not available in this build.
              </div>
            ) : (
              <div className="mt-6">
                <Markdown
                  markdown={markdown ?? ""}
                  repoFullName={task.full_name}
                  defaultBranch={task.default_branch}
                  htmlUrl={task.html_url}
                />
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
