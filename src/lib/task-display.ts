import type { TaskIndexItem, TaskWebVariant } from "@/lib/task-index";

type TaskLike = Pick<TaskIndexItem, "id" | "repo" | "title" | "release_tag" | "acquisition">;
type VariantLike = Pick<TaskWebVariant, "id" | "repo" | "title" | "release_tag" | "acquisition">;

export function taskTitle(task: TaskLike | VariantLike) {
  return String(task.title ?? "").trim() || task.repo;
}

export function taskHandle(task: TaskLike | VariantLike) {
  return String(task.id ?? "").trim() || task.repo;
}

export function localCloneCommand(task: Pick<TaskIndexItem, "html_url">) {
  return `git clone ${task.html_url}.git`;
}

export function compactMeta(parts: Array<string | null | undefined>) {
  return parts
    .map((part) => String(part ?? "").trim())
    .filter(Boolean)
    .join(" / ");
}

export function localSummaryMeta(task: TaskLike) {
  return compactMeta([taskHandle(task), task.release_tag ? `Release ${task.release_tag}` : null]);
}

export function previewSummaryMeta(task: VariantLike) {
  return compactMeta([taskHandle(task), task.release_tag ? `Release ${task.release_tag}` : null]);
}

