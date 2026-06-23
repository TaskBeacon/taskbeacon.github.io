import clsx from "@/components/utils/clsx";
import type { TaskIndexItem } from "@/lib/task-index";
import { taskTitle } from "@/lib/task-display";

export function TaskFlowPlaceholder({
  task,
  compact = false,
  className
}: {
  task?: TaskIndexItem;
  compact?: boolean;
  className?: string;
}) {
  const imageSrc = task?.task_flow?.thumb ?? null;

  if (!imageSrc) {
    return (
      <section
        className={clsx(
          "rounded-[20px] border-2 border-dashed border-[#25314d]/30 bg-[#f8fcff] p-4",
          compact ? "min-h-[9rem]" : "min-h-[11rem]",
          className
        )}
      >
        <div className="flex h-full min-h-[7rem] flex-col justify-between">
          <div>
            <div className="max-w-[34ch] text-sm leading-6 text-slate-700">
              Flow diagram not published in the task repository yet.
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
            <span className="h-px flex-1 bg-[#25314d]/20" />
            README linked
          </div>
        </div>
      </section>
    );
  }

  return (
    <figure
      className={clsx(
        "overflow-hidden rounded-[20px] border-2 border-[#25314d] bg-[#f8fcff] shadow-[0_4px_0_#25314d]",
        className
      )}
    >
      <figcaption className="sr-only">
        {task ? `${taskTitle(task)} flow diagram` : "Task flow diagram"}
      </figcaption>
      <div
        className={clsx(
          "grid place-items-center bg-white",
          compact ? "aspect-[16/9] p-2" : "aspect-[16/9] p-3"
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={`${task ? taskTitle(task) : "Task"} flow diagram`}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
          decoding="async"
          fetchPriority={compact ? "low" : "auto"}
        />
      </div>
    </figure>
  );
}
