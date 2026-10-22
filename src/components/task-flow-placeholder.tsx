"use client";

import { useState } from "react";
import { Modal } from "@/components/modal";
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
  const [expanded, setExpanded] = useState(false);
  const [zoomed, setZoomed] = useState(false);
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
    <>
    <figure
      className={clsx(
        "overflow-hidden rounded-[20px] border-2 border-[#25314d] bg-[#f8fcff] shadow-[0_4px_0_#25314d]",
        className
      )}
    >
      <figcaption className="sr-only">
        {task ? `${taskTitle(task)} flow diagram` : "Task flow diagram"}
      </figcaption>
      <button type="button" onClick={() => setExpanded(true)} aria-label={`Enlarge ${task ? taskTitle(task) : "task"} flow diagram`}
        className={clsx(
          "tb-focus-ring relative grid w-full cursor-zoom-in place-items-center bg-white",
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
        <span className="absolute bottom-2 right-2 rounded-full bg-white/95 px-3 py-1 text-xs font-bold shadow-sm">Enlarge ↗</span>
      </button>
    </figure>
    <Modal open={expanded} onClose={() => { setExpanded(false); setZoomed(false); }} label={`${task ? taskTitle(task) : "Task"} flow diagram`} className="m-auto max-h-[92dvh] w-[94vw] max-w-6xl overflow-auto rounded-[24px] border-2 border-[#25314d] bg-[#fffdf9] p-4 sm:p-6">
      <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 bg-[#fffdf9] pb-4">
        <h2 className="font-heading text-xl font-bold">{task ? taskTitle(task) : "Task"} · Flow</h2>
        <div className="flex gap-3">
          <button type="button" className="tb-focus-ring tb-button-secondary !px-3 !py-2 !text-sm" onClick={() => setZoomed(!zoomed)}>{zoomed ? "Fit image" : "Zoom in"}</button>
          <button type="button" className="tb-focus-ring tb-button-secondary !px-3 !py-2 !text-sm" onClick={() => { setExpanded(false); setZoomed(false); }}>Close diagram</button>
        </div>
      </div>
      <div className="overflow-auto rounded-xl bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageSrc} alt={`${task ? taskTitle(task) : "Task"} flow diagram`} className={zoomed ? "w-[1800px] max-w-none" : "mx-auto max-h-[72dvh] max-w-full object-contain"} />
      </div>
    </Modal>
    </>
  );
}
