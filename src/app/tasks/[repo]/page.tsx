import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TaskDetailPage } from "@/components/task-detail-page";
import { findTaskByRepo, getTasks } from "@/lib/task-index";
import { taskTitle } from "@/lib/task-display";

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

export default function TaskPage({ params }: { params: { repo: string } }) {
  const task = findTaskByRepo(params.repo);
  if (!task) notFound();

  const readmePath = path.join(
    process.cwd(),
    "public",
    ...task.readme_snapshot_path.replace(/^\/+/, "").split("/")
  );
  const markdown = fs.existsSync(readmePath) ? fs.readFileSync(readmePath, "utf8") : "";

  return <TaskDetailPage task={task} markdown={markdown} />;
}
