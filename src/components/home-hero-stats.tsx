"use client";

import type { TaskIndexItem } from "@/lib/task-index";
import { taskHasPreview } from "@/lib/html-companions";
import { useTasksWithHtmlCompanions } from "@/lib/use-html-companions";

export function HomeHeroStats({
  tasks,
  skillCount
}: {
  tasks: TaskIndexItem[];
  skillCount: number;
}) {
  const mergedTasks = useTasksWithHtmlCompanions(tasks);
  const previewCount = mergedTasks.filter((task) => taskHasPreview(task)).length;

  return (
    <div className="mt-10 flex flex-wrap gap-8">
      <div>
        <div className="font-heading text-3xl font-bold text-[#25314d]">{mergedTasks.length}+</div>
        <div className="text-sm text-slate-600">Canonical tasks</div>
      </div>
      <div>
        <div className="font-heading text-3xl font-bold text-[#25314d]">{previewCount}+</div>
        <div className="text-sm text-slate-600">Web previews</div>
      </div>
      <div>
        <div className="font-heading text-3xl font-bold text-[#25314d]">{skillCount}</div>
        <div className="text-sm text-slate-600">Automation skills</div>
      </div>
    </div>
  );
}
