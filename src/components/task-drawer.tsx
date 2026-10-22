"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/modal";
import { taskSummary } from "@/lib/task-catalog";
import { Markdown } from "@/components/markdown";
import { TaskChannelCard } from "@/components/task-channel-card";
import { TaskFlowPlaceholder } from "@/components/task-flow-placeholder";
import type { TaskIndexItem } from "@/lib/task-index";
import { taskDetailHref } from "@/lib/routes";
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
        if (!response.ok) throw new Error("Task guide missing");
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

  if (!task) return null;

  const markdown = markdownByRepo[task.repo];
  const hasError = Boolean(errorByRepo[task.repo]);
  const isLoading = markdown === undefined && !hasError;
  const preview = task.web_variant;
  const taskRepo = task.repo;

  function openFullPage() {
    window.location.assign(taskDetailHref(taskRepo));
  }

  return (
    <Modal open={Boolean(task)} onClose={onClose} label={`${taskTitle(task)} details`}
      className="m-0 ml-auto h-dvh max-h-dvh w-full max-w-3xl overflow-y-auto border-0 border-l-2 border-[#25314d] bg-[#f4efe9] p-0">
        <div className="sticky top-0 z-10 border-b-2 border-[#25314d] bg-[#fffdf9]/95 px-5 py-4 backdrop-blur">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Task details
              </div>
              <div className="mt-2 font-heading text-2xl font-bold leading-tight text-[#25314d]">
                {taskTitle(task)}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                <code className="rounded-full border-2 border-[#25314d] bg-white px-2.5 py-1 font-mono text-[11px] font-bold text-[#25314d]">
                  {taskHandle(task)}
                </code>
                <code className="rounded-full border-2 border-[#25314d] bg-white px-2.5 py-1 font-mono text-[11px] font-bold text-[#25314d]">
                  {task.repo}
                </code>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="tb-focus-ring rounded-[14px] border-2 border-[#25314d] bg-white px-3 py-2 text-sm font-bold text-[#25314d] hover:bg-[#eef8ff]"
                onClick={openFullPage}
              >
                Open full page
              </button>
              <button
                type="button"
                className="tb-focus-ring rounded-[14px] border-2 border-[#25314d] bg-white px-3 py-2 text-sm font-bold text-[#25314d] hover:bg-[#eef8ff]"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6 px-5 py-5">
          <p className="text-sm leading-7 text-slate-700">{taskSummary(task)}</p>
          <TaskFlowPlaceholder task={task} />

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

          <section className="tb-frame-soft bg-[#fffdf9] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  Task guide
                </div>
                <div className="mt-1 text-sm text-slate-700">
                  Read the procedure, setup instructions and configuration notes.
                </div>
              </div>
              <a
                className="tb-focus-ring rounded-[14px] border-2 border-[#25314d] bg-white px-3 py-2 text-sm font-bold text-[#25314d] hover:bg-[#eef8ff]"
                href={task.html_url}
                target="_blank"
                rel="noreferrer"
              >
                View on GitHub
              </a>
            </div>

            {isLoading ? (
              <div className="mt-6 space-y-3 rounded-[18px] border-2 border-[#25314d]/20 bg-[#f8fcff] p-5">
                <div className="h-4 w-44 animate-pulse rounded-full bg-[#d9edf6]" />
                <div className="h-3 w-full animate-pulse rounded-full bg-[#e9f4f8]" />
                <div className="h-3 w-5/6 animate-pulse rounded-full bg-[#e9f4f8]" />
                <div className="mt-5 h-28 animate-pulse rounded-[16px] bg-white" />
              </div>
            ) : hasError ? (
              <div className="mt-6 rounded-[18px] border-2 border-[#25314d]/20 bg-[#f8fcff] p-5 text-sm text-slate-700">
                The task guide could not be loaded. Use “View on GitHub” to read it in the repository.
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
    </Modal>
  );
}
